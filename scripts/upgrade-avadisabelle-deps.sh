#!/usr/bin/env bash
# Upgrade all @avadisabelle/ dependencies in ava-claw to latest and install.
#
# Usage:
#   ./scripts/upgrade-avadisabelle-deps.sh          # upgrade + install
#   ./scripts/upgrade-avadisabelle-deps.sh --dry-run # show what would change

set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

# Collect @avadisabelle/ deps from package.json (dependencies only, skip overrides/pnpm)
PKGS=$(jq -r '.dependencies // {} | keys[] | select(startswith("@avadisabelle/"))' package.json)

if [[ -z "$PKGS" ]]; then
  echo "No @avadisabelle/ dependencies found in package.json"
  exit 0
fi

echo "=== @avadisabelle/ packages to upgrade ==="
CHANGED=false
for pkg in $PKGS; do
  CURRENT=$(jq -r ".dependencies[\"$pkg\"]" package.json)
  LATEST=$(npm view "$pkg" version 2>/dev/null || echo "???")
  if [[ "$CURRENT" == "^$LATEST" ]]; then
    echo "  $pkg: $CURRENT (already latest)"
  else
    echo "  $pkg: $CURRENT -> ^$LATEST"
    CHANGED=true
  fi
done

if ! $CHANGED; then
  echo -e "\nAll @avadisabelle/ deps already at latest."
  exit 0
fi

if $DRY_RUN; then
  echo -e "\n(dry-run, stopping here)"
  exit 0
fi

echo -e "\n=== Updating package.json ==="
for pkg in $PKGS; do
  LATEST=$(npm view "$pkg" version 2>/dev/null)
  if [[ -z "$LATEST" ]]; then
    echo "  WARN: could not resolve latest for $pkg, skipping"
    continue
  fi
  # Update package.json in-place with jq
  jq ".dependencies[\"$pkg\"] = \"^$LATEST\"" package.json > package.json.tmp \
    && mv package.json.tmp package.json
  echo "  $pkg -> ^$LATEST"
done

echo -e "\n=== Running pnpm install ==="
pnpm install

echo -e "\n=== Done ==="
