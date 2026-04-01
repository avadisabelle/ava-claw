---
summary: "Uninstall AvaClaw completely (CLI, service, state, workspace)"
read_when:
  - You want to remove AvaClaw from a machine
  - The gateway service is still running after uninstall
title: "Uninstall"
---

# Uninstall

Two paths:

- **Easy path** if `avaclaw` is still installed.
- **Manual service removal** if the CLI is gone but the service is still running.

## Easy path (CLI still installed)

Recommended: use the built-in uninstaller:

```bash
avaclaw uninstall
```

Non-interactive (automation / npx):

```bash
avaclaw uninstall --all --yes --non-interactive
npx -y avaclaw uninstall --all --yes --non-interactive
```

Manual steps (same result):

1. Stop the gateway service:

```bash
avaclaw gateway stop
```

2. Uninstall the gateway service (launchd/systemd/schtasks):

```bash
avaclaw gateway uninstall
```

3. Delete state + config:

```bash
rm -rf "${AVACLAW_STATE_DIR:-$HOME/.avaclaw}"
```

If you set `AVACLAW_CONFIG_PATH` to a custom location outside the state dir, delete that file too.

4. Delete your workspace (optional, removes agent files):

```bash
rm -rf ~/.avaclaw/workspace
```

5. Remove the CLI install (pick the one you used):

```bash
npm rm -g avaclaw
pnpm remove -g avaclaw
bun remove -g avaclaw
```

6. If you installed the macOS app:

```bash
rm -rf /Applications/AvaClaw.app
```

Notes:

- If you used profiles (`--profile` / `AVACLAW_PROFILE`), repeat step 3 for each state dir (defaults are `~/.avaclaw-<profile>`).
- In remote mode, the state dir lives on the **gateway host**, so run steps 1-4 there too.

## Manual service removal (CLI not installed)

Use this if the gateway service keeps running but `avaclaw` is missing.

### macOS (launchd)

Default label is `ai.avaclaw.gateway` (or `ai.avaclaw.<profile>`; legacy `com.avaclaw.*` may still exist):

```bash
launchctl bootout gui/$UID/ai.avaclaw.gateway
rm -f ~/Library/LaunchAgents/ai.avaclaw.gateway.plist
```

If you used a profile, replace the label and plist name with `ai.avaclaw.<profile>`. Remove any legacy `com.avaclaw.*` plists if present.

### Linux (systemd user unit)

Default unit name is `avaclaw-gateway.service` (or `avaclaw-gateway-<profile>.service`):

```bash
systemctl --user disable --now avaclaw-gateway.service
rm -f ~/.config/systemd/user/avaclaw-gateway.service
systemctl --user daemon-reload
```

### Windows (Scheduled Task)

Default task name is `AvaClaw Gateway` (or `AvaClaw Gateway (<profile>)`).
The task script lives under your state dir.

```powershell
schtasks /Delete /F /TN "AvaClaw Gateway"
Remove-Item -Force "$env:USERPROFILE\.avaclaw\gateway.cmd"
```

If you used a profile, delete the matching task name and `~\.avaclaw-<profile>\gateway.cmd`.

## Normal install vs source checkout

### Normal install (install.sh / npm / pnpm / bun)

If you used `https://avaclaw.ai/install.sh` or `install.ps1`, the CLI was installed with `npm install -g avaclaw@latest`.
Remove it with `npm rm -g avaclaw` (or `pnpm remove -g` / `bun remove -g` if you installed that way).

### Source checkout (git clone)

If you run from a repo checkout (`git clone` + `avaclaw ...` / `bun run avaclaw ...`):

1. Uninstall the gateway service **before** deleting the repo (use the easy path above or manual service removal).
2. Delete the repo directory.
3. Remove state + workspace as shown above.
