#!/usr/bin/env bash
set -euo pipefail

cd /repo

export AVACLAW_STATE_DIR="/tmp/avaclaw-test"
export AVACLAW_CONFIG_PATH="${AVACLAW_STATE_DIR}/avaclaw.json"

echo "==> Build"
pnpm build

echo "==> Seed state"
mkdir -p "${AVACLAW_STATE_DIR}/credentials"
mkdir -p "${AVACLAW_STATE_DIR}/agents/main/sessions"
echo '{}' >"${AVACLAW_CONFIG_PATH}"
echo 'creds' >"${AVACLAW_STATE_DIR}/credentials/marker.txt"
echo 'session' >"${AVACLAW_STATE_DIR}/agents/main/sessions/sessions.json"

echo "==> Reset (config+creds+sessions)"
pnpm avaclaw reset --scope config+creds+sessions --yes --non-interactive

test ! -f "${AVACLAW_CONFIG_PATH}"
test ! -d "${AVACLAW_STATE_DIR}/credentials"
test ! -d "${AVACLAW_STATE_DIR}/agents/main/sessions"

echo "==> Recreate minimal config"
mkdir -p "${AVACLAW_STATE_DIR}/credentials"
echo '{}' >"${AVACLAW_CONFIG_PATH}"

echo "==> Uninstall (state only)"
pnpm avaclaw uninstall --state --yes --non-interactive

test ! -d "${AVACLAW_STATE_DIR}"

echo "OK"
