#!/usr/bin/env bash
# One-time host setup for rootless AvaClaw in Podman: creates the avaclaw
# user, builds the image, loads it into that user's Podman store, and installs
# the launch script. Run from repo root with sudo capability.
#
# Usage: ./setup-podman.sh [--quadlet|--container]
#   --quadlet   Install systemd Quadlet so the container runs as a user service
#   --container Only install user + image + launch script; you start the container manually (default)
#   Or set AVACLAW_PODMAN_QUADLET=1 (or 0) to choose without a flag.
#
# After this, start the gateway manually:
#   ./scripts/run-avaclaw-podman.sh launch
#   ./scripts/run-avaclaw-podman.sh launch setup   # onboarding wizard
# Or as the avaclaw user: sudo -u avaclaw /home/avaclaw/run-avaclaw-podman.sh
# If you used --quadlet, you can also: sudo systemctl --machine avaclaw@ --user start avaclaw.service
set -euo pipefail

AVACLAW_USER="${AVACLAW_PODMAN_USER:-avaclaw}"
REPO_PATH="${AVACLAW_REPO_PATH:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
RUN_SCRIPT_SRC="$REPO_PATH/scripts/run-avaclaw-podman.sh"
QUADLET_TEMPLATE="$REPO_PATH/scripts/podman/avaclaw.container.in"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing dependency: $1" >&2
    exit 1
  fi
}

is_writable_dir() {
  local dir="$1"
  [[ -n "$dir" && -d "$dir" && ! -L "$dir" && -w "$dir" && -x "$dir" ]]
}

is_safe_tmp_base() {
  local dir="$1"
  local mode=""
  local owner=""
  is_writable_dir "$dir" || return 1
  mode="$(stat -Lc '%a' "$dir" 2>/dev/null || true)"
  if [[ -n "$mode" ]]; then
    local perm=$((8#$mode))
    if (( (perm & 0022) != 0 && (perm & 01000) == 0 )); then
      return 1
    fi
  fi
  if is_root; then
    owner="$(stat -Lc '%u' "$dir" 2>/dev/null || true)"
    if [[ -n "$owner" && "$owner" != "0" ]]; then
      return 1
    fi
  fi
  return 0
}

resolve_image_tmp_dir() {
  if ! is_root && is_safe_tmp_base "${TMPDIR:-}"; then
    printf '%s' "$TMPDIR"
    return 0
  fi
  if is_safe_tmp_base "/var/tmp"; then
    printf '%s' "/var/tmp"
    return 0
  fi
  if is_safe_tmp_base "/tmp"; then
    printf '%s' "/tmp"
    return 0
  fi
  printf '%s' "/tmp"
}

is_root() { [[ "$(id -u)" -eq 0 ]]; }

run_root() {
  if is_root; then
    "$@"
  else
    sudo "$@"
  fi
}

run_as_user() {
  # When switching users, the caller's cwd may be inaccessible to the target
  # user (e.g. a private home dir). Wrap in a subshell that cd's to a
  # world-traversable directory so sudo/runuser don't fail with "cannot chdir".
  # TODO: replace with fully rootless podman build to eliminate the need for
  # user-switching entirely.
  local user="$1"
  shift
  if command -v sudo >/dev/null 2>&1; then
    ( cd /tmp 2>/dev/null || cd /; sudo -u "$user" "$@" )
  elif is_root && command -v runuser >/dev/null 2>&1; then
    ( cd /tmp 2>/dev/null || cd /; runuser -u "$user" -- "$@" )
  else
    echo "Need sudo (or root+runuser) to run commands as $user." >&2
    exit 1
  fi
}

run_as_avaclaw() {
  # Avoid root writes into $AVACLAW_HOME (symlink/hardlink/TOCTOU footguns).
  # Anything under the target user's home should be created/modified as that user.
  run_as_user "$AVACLAW_USER" env HOME="$AVACLAW_HOME" "$@"
}

escape_sed_replacement_pipe_delim() {
  # Escape replacement metacharacters for sed "s|...|...|g" replacement text.
  printf '%s' "$1" | sed -e 's/[\\&|]/\\&/g'
}

# Quadlet: opt-in via --quadlet or AVACLAW_PODMAN_QUADLET=1
INSTALL_QUADLET=false
for arg in "$@"; do
  case "$arg" in
    --quadlet)   INSTALL_QUADLET=true ;;
    --container) INSTALL_QUADLET=false ;;
  esac
done
if [[ -n "${AVACLAW_PODMAN_QUADLET:-}" ]]; then
  case "${AVACLAW_PODMAN_QUADLET,,}" in
    1|yes|true)  INSTALL_QUADLET=true ;;
    0|no|false) INSTALL_QUADLET=false ;;
  esac
fi

require_cmd podman
if ! is_root; then
  require_cmd sudo
fi
if [[ ! -f "$REPO_PATH/Dockerfile" ]]; then
  echo "Dockerfile not found at $REPO_PATH. Set AVACLAW_REPO_PATH to the repo root." >&2
  exit 1
fi
if [[ ! -f "$RUN_SCRIPT_SRC" ]]; then
  echo "Launch script not found at $RUN_SCRIPT_SRC." >&2
  exit 1
fi

generate_token_hex_32() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 32
    return 0
  fi
  if command -v python3 >/dev/null 2>&1; then
    python3 - <<'PY'
import secrets
print(secrets.token_hex(32))
PY
    return 0
  fi
  if command -v od >/dev/null 2>&1; then
    # 32 random bytes -> 64 lowercase hex chars
    od -An -N32 -tx1 /dev/urandom | tr -d " \n"
    return 0
  fi
  echo "Missing dependency: need openssl or python3 (or od) to generate AVACLAW_GATEWAY_TOKEN." >&2
  exit 1
}

user_exists() {
  local user="$1"
  if command -v getent >/dev/null 2>&1; then
    getent passwd "$user" >/dev/null 2>&1 && return 0
  fi
  id -u "$user" >/dev/null 2>&1
}

resolve_user_home() {
  local user="$1"
  local home=""
  if command -v getent >/dev/null 2>&1; then
    home="$(getent passwd "$user" 2>/dev/null | cut -d: -f6 || true)"
  fi
  if [[ -z "$home" && -f /etc/passwd ]]; then
    home="$(awk -F: -v u="$user" '$1==u {print $6}' /etc/passwd 2>/dev/null || true)"
  fi
  if [[ -z "$home" ]]; then
    home="/home/$user"
  fi
  printf '%s' "$home"
}

resolve_nologin_shell() {
  for cand in /usr/sbin/nologin /sbin/nologin /usr/bin/nologin /bin/false; do
    if [[ -x "$cand" ]]; then
      printf '%s' "$cand"
      return 0
    fi
  done
  printf '%s' "/usr/sbin/nologin"
}

# Create avaclaw user (non-login, with home) if missing
if ! user_exists "$AVACLAW_USER"; then
  NOLOGIN_SHELL="$(resolve_nologin_shell)"
  echo "Creating user $AVACLAW_USER ($NOLOGIN_SHELL, with home)..."
  if command -v useradd >/dev/null 2>&1; then
    run_root useradd -m -s "$NOLOGIN_SHELL" "$AVACLAW_USER"
  elif command -v adduser >/dev/null 2>&1; then
    # Debian/Ubuntu: adduser supports --disabled-password/--gecos. Busybox adduser differs.
    run_root adduser --disabled-password --gecos "" --shell "$NOLOGIN_SHELL" "$AVACLAW_USER"
  else
    echo "Neither useradd nor adduser found, cannot create user $AVACLAW_USER." >&2
    exit 1
  fi
else
  echo "User $AVACLAW_USER already exists."
fi

AVACLAW_HOME="$(resolve_user_home "$AVACLAW_USER")"
AVACLAW_UID="$(id -u "$AVACLAW_USER" 2>/dev/null || true)"
AVACLAW_CONFIG="$AVACLAW_HOME/.avaclaw"
LAUNCH_SCRIPT_DST="$AVACLAW_HOME/run-avaclaw-podman.sh"

# Prefer systemd user services (Quadlet) for production. Enable lingering early so rootless Podman can run
# without an interactive login.
if command -v loginctl &>/dev/null; then
  run_root loginctl enable-linger "$AVACLAW_USER" 2>/dev/null || true
fi
if [[ -n "${AVACLAW_UID:-}" && -d /run/user ]] && command -v systemctl &>/dev/null; then
  run_root systemctl start "user@${AVACLAW_UID}.service" 2>/dev/null || true
fi

# Rootless Podman needs subuid/subgid for the run user
if ! grep -q "^${AVACLAW_USER}:" /etc/subuid 2>/dev/null; then
  echo "Warning: $AVACLAW_USER has no subuid range. Rootless Podman may fail." >&2
  echo "  Add a line to /etc/subuid and /etc/subgid, e.g.: $AVACLAW_USER:100000:65536" >&2
fi

echo "Creating $AVACLAW_CONFIG and workspace..."
run_as_avaclaw mkdir -p "$AVACLAW_CONFIG/workspace"
run_as_avaclaw chmod 700 "$AVACLAW_CONFIG" "$AVACLAW_CONFIG/workspace" 2>/dev/null || true

ENV_FILE="$AVACLAW_CONFIG/.env"
if run_as_avaclaw test -f "$ENV_FILE"; then
  if ! run_as_avaclaw grep -q '^AVACLAW_GATEWAY_TOKEN=' "$ENV_FILE" 2>/dev/null; then
    TOKEN="$(generate_token_hex_32)"
    printf 'AVACLAW_GATEWAY_TOKEN=%s\n' "$TOKEN" | run_as_avaclaw tee -a "$ENV_FILE" >/dev/null
    echo "Added AVACLAW_GATEWAY_TOKEN to $ENV_FILE."
  fi
  run_as_avaclaw chmod 600 "$ENV_FILE" 2>/dev/null || true
else
  TOKEN="$(generate_token_hex_32)"
  printf 'AVACLAW_GATEWAY_TOKEN=%s\n' "$TOKEN" | run_as_avaclaw tee "$ENV_FILE" >/dev/null
  run_as_avaclaw chmod 600 "$ENV_FILE" 2>/dev/null || true
  echo "Created $ENV_FILE with new token."
fi

# The gateway refuses to start unless gateway.mode=local is set in config.
# Make first-run non-interactive; users can run the wizard later to configure channels/providers.
AVACLAW_JSON="$AVACLAW_CONFIG/avaclaw.json"
if ! run_as_avaclaw test -f "$AVACLAW_JSON"; then
  printf '%s\n' '{ gateway: { mode: "local" } }' | run_as_avaclaw tee "$AVACLAW_JSON" >/dev/null
  run_as_avaclaw chmod 600 "$AVACLAW_JSON" 2>/dev/null || true
  echo "Created $AVACLAW_JSON (minimal gateway.mode=local)."
fi

echo "Building image from $REPO_PATH..."
BUILD_ARGS=()
[[ -n "${AVACLAW_DOCKER_APT_PACKAGES:-}" ]] && BUILD_ARGS+=(--build-arg "AVACLAW_DOCKER_APT_PACKAGES=${AVACLAW_DOCKER_APT_PACKAGES}")
[[ -n "${AVACLAW_EXTENSIONS:-}" ]] && BUILD_ARGS+=(--build-arg "AVACLAW_EXTENSIONS=${AVACLAW_EXTENSIONS}")
podman build ${BUILD_ARGS[@]+"${BUILD_ARGS[@]}"} -t avaclaw:local -f "$REPO_PATH/Dockerfile" "$REPO_PATH"

echo "Loading image into $AVACLAW_USER's Podman store..."
TMP_IMAGE_DIR="$(resolve_image_tmp_dir)"
echo "Using temporary image dir: $TMP_IMAGE_DIR"
TMP_STAGE_DIR="$(mktemp -d -p "$TMP_IMAGE_DIR" avaclaw-image.XXXXXX)"
TMP_IMAGE="$TMP_STAGE_DIR/image.tar"
chmod 700 "$TMP_STAGE_DIR"
trap 'rm -rf "$TMP_STAGE_DIR"' EXIT
podman save avaclaw:local -o "$TMP_IMAGE"
chmod 600 "$TMP_IMAGE"
# Stream the image into the target user's podman load so private temp directories
# do not need to be traversable by $AVACLAW_USER.
cat "$TMP_IMAGE" | run_as_user "$AVACLAW_USER" env HOME="$AVACLAW_HOME" podman load
rm -rf "$TMP_STAGE_DIR"
trap - EXIT

echo "Copying launch script to $LAUNCH_SCRIPT_DST..."
run_root cat "$RUN_SCRIPT_SRC" | run_as_avaclaw tee "$LAUNCH_SCRIPT_DST" >/dev/null
run_as_avaclaw chmod 755 "$LAUNCH_SCRIPT_DST"

# Optionally install systemd quadlet for avaclaw user (rootless Podman + systemd)
QUADLET_DIR="$AVACLAW_HOME/.config/containers/systemd"
if [[ "$INSTALL_QUADLET" == true && -f "$QUADLET_TEMPLATE" ]]; then
  echo "Installing systemd quadlet for $AVACLAW_USER..."
  run_as_avaclaw mkdir -p "$QUADLET_DIR"
  AVACLAW_HOME_SED="$(escape_sed_replacement_pipe_delim "$AVACLAW_HOME")"
  sed "s|{{AVACLAW_HOME}}|$AVACLAW_HOME_SED|g" "$QUADLET_TEMPLATE" | run_as_avaclaw tee "$QUADLET_DIR/avaclaw.container" >/dev/null
  run_as_avaclaw chmod 700 "$AVACLAW_HOME/.config" "$AVACLAW_HOME/.config/containers" "$QUADLET_DIR" 2>/dev/null || true
  run_as_avaclaw chmod 600 "$QUADLET_DIR/avaclaw.container" 2>/dev/null || true
  if command -v systemctl &>/dev/null; then
    run_root systemctl --machine "${AVACLAW_USER}@" --user daemon-reload 2>/dev/null || true
    run_root systemctl --machine "${AVACLAW_USER}@" --user enable avaclaw.service 2>/dev/null || true
    run_root systemctl --machine "${AVACLAW_USER}@" --user start avaclaw.service 2>/dev/null || true
  fi
fi

echo ""
echo "Setup complete. Start the gateway:"
echo "  $RUN_SCRIPT_SRC launch"
echo "  $RUN_SCRIPT_SRC launch setup   # onboarding wizard"
echo "Or as $AVACLAW_USER (e.g. from cron):"
echo "  sudo -u $AVACLAW_USER $LAUNCH_SCRIPT_DST"
echo "  sudo -u $AVACLAW_USER $LAUNCH_SCRIPT_DST setup"
if [[ "$INSTALL_QUADLET" == true ]]; then
  echo "Or use systemd (quadlet):"
  echo "  sudo systemctl --machine ${AVACLAW_USER}@ --user start avaclaw.service"
  echo "  sudo systemctl --machine ${AVACLAW_USER}@ --user status avaclaw.service"
else
  echo "To install systemd quadlet later: $0 --quadlet"
fi
