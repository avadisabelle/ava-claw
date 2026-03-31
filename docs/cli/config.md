---
summary: "CLI reference for `avaclaw config` (get/set/unset/file/validate)"
read_when:
  - You want to read or edit config non-interactively
title: "config"
---

# `avaclaw config`

Config helpers: get/set/unset/validate values by path and print the active
config file. Run without a subcommand to open
the configure wizard (same as `avaclaw configure`).

## Examples

```bash
avaclaw config file
avaclaw config get browser.executablePath
avaclaw config set browser.executablePath "/usr/bin/google-chrome"
avaclaw config set agents.defaults.heartbeat.every "2h"
avaclaw config set agents.list[0].tools.exec.node "node-id-or-name"
avaclaw config unset tools.web.search.apiKey
avaclaw config validate
avaclaw config validate --json
```

## Paths

Paths use dot or bracket notation:

```bash
avaclaw config get agents.defaults.workspace
avaclaw config get agents.list[0].id
```

Use the agent list index to target a specific agent:

```bash
avaclaw config get agents.list
avaclaw config set agents.list[1].tools.exec.node "node-id-or-name"
```

## Values

Values are parsed as JSON5 when possible; otherwise they are treated as strings.
Use `--strict-json` to require JSON5 parsing. `--json` remains supported as a legacy alias.

```bash
avaclaw config set agents.defaults.heartbeat.every "0m"
avaclaw config set gateway.port 19001 --strict-json
avaclaw config set channels.whatsapp.groups '["*"]' --strict-json
```

## Subcommands

- `config file`: Print the active config file path (resolved from `AVACLAW_CONFIG_PATH` or default location).

Restart the gateway after edits.

## Validate

Validate the current config against the active schema without starting the
gateway.

```bash
avaclaw config validate
avaclaw config validate --json
```
