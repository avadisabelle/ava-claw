# ava-claw-zalouser

AvaClaw extension for Zalo Personal Account messaging via native `zca-js` integration.

> **Warning:** Using Zalo automation may result in account suspension or ban. Use at your own risk. This is an unofficial integration.

## Features

- Channel plugin integration with onboarding + QR login
- In-process listener/sender via `zca-js` (no external CLI)
- Multi-account support
- Agent tool integration (`zalouser`)
- DM/group policy support

## Prerequisites

- AvaClaw Gateway
- Zalo mobile app (for QR login)

No external `zca`, `openzca`, or `zca-cli` binary is required.

## Install

### Option A: npm

```bash
avaclaw plugins install ava-claw-zalouser
```

### Option B: local source checkout

```bash
avaclaw plugins install ./extensions/zalouser
cd ./extensions/zalouser && pnpm install
```

Restart the Gateway after install.

## Quick start

### Login (QR)

```bash
avaclaw channels login --channel zalouser
```

Scan the QR code with the Zalo app on your phone.

### Enable channel

```yaml
channels:
  zalouser:
    enabled: true
    dmPolicy: pairing # pairing | allowlist | open | disabled
```

### Send a message

```bash
avaclaw message send --channel zalouser --target <threadId> --message "Hello from AvaClaw"
```

## Configuration

Basic:

```yaml
channels:
  zalouser:
    enabled: true
    dmPolicy: pairing
```

Multi-account:

```yaml
channels:
  zalouser:
    enabled: true
    defaultAccount: default
    accounts:
      default:
        enabled: true
        profile: default
      work:
        enabled: true
        profile: work
```

## Useful commands

```bash
avaclaw channels login --channel zalouser
avaclaw channels login --channel zalouser --account work
avaclaw channels status --probe
avaclaw channels logout --channel zalouser

avaclaw directory self --channel zalouser
avaclaw directory peers list --channel zalouser --query "name"
avaclaw directory groups list --channel zalouser --query "work"
avaclaw directory groups members --channel zalouser --group-id <id>
```

## Agent tool

The extension registers a `zalouser` tool for AI agents.

Available actions: `send`, `image`, `link`, `friends`, `groups`, `me`, `status`

## Troubleshooting

- Login not persisted: `avaclaw channels logout --channel zalouser && avaclaw channels login --channel zalouser`
- Probe status: `avaclaw channels status --probe`
- Name resolution issues (allowlist/groups): use numeric IDs or exact Zalo names

## Credits

Built on [zca-js](https://github.com/RFS-ADRENO/zca-js).
