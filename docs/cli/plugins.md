---
summary: "CLI reference for `avaclaw plugins` (list, install, uninstall, enable/disable, doctor)"
read_when:
  - You want to install or manage Gateway plugins or compatible bundles
  - You want to debug plugin load failures
title: "plugins"
---

# `avaclaw plugins`

Manage Gateway plugins/extensions and compatible bundles.

Related:

- Plugin system: [Plugins](/tools/plugin)
- Bundle compatibility: [Plugin bundles](/plugins/bundles)
- Plugin manifest + schema: [Plugin manifest](/plugins/manifest)
- Security hardening: [Security](/gateway/security)

## Commands

```bash
avaclaw plugins list
avaclaw plugins info <id>
avaclaw plugins enable <id>
avaclaw plugins disable <id>
avaclaw plugins uninstall <id>
avaclaw plugins doctor
avaclaw plugins update <id>
avaclaw plugins update --all
```

Bundled plugins ship with AvaClaw but start disabled. Use `plugins enable` to
activate them.

Native AvaClaw plugins must ship `avaclaw.plugin.json` with an inline JSON
Schema (`configSchema`, even if empty). Compatible bundles use their own bundle
manifests instead.

`plugins list` shows `Format: avaclaw` or `Format: bundle`. Verbose list/info
output also shows the bundle subtype (`codex`, `claude`, or `cursor`) plus detected bundle
capabilities.

### Install

```bash
avaclaw plugins install <path-or-spec>
avaclaw plugins install <npm-spec> --pin
```

Security note: treat plugin installs like running code. Prefer pinned versions.

Npm specs are **registry-only** (package name + optional **exact version** or
**dist-tag**). Git/URL/file specs and semver ranges are rejected. Dependency
installs run with `--ignore-scripts` for safety.

Bare specs and `@latest` stay on the stable track. If npm resolves either of
those to a prerelease, AvaClaw stops and asks you to opt in explicitly with a
prerelease tag such as `@beta`/`@rc` or an exact prerelease version such as
`@1.2.3-beta.4`.

If a bare install spec matches a bundled plugin id (for example `diffs`), AvaClaw
installs the bundled plugin directly. To install an npm package with the same
name, use an explicit scoped spec (for example `@scope/diffs`).

Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.

For local paths and archives, AvaClaw auto-detects:

- native AvaClaw plugins (`avaclaw.plugin.json`)
- Codex-compatible bundles (`.codex-plugin/plugin.json`)
- Claude-compatible bundles (`.claude-plugin/plugin.json` or the default Claude
  component layout)
- Cursor-compatible bundles (`.cursor-plugin/plugin.json`)

Compatible bundles install into the normal extensions root and participate in
the same list/info/enable/disable flow. Today, bundle skills, Claude
command-skills, Claude `settings.json` defaults, Cursor command-skills, and compatible Codex hook
directories are supported; other detected bundle capabilities are shown in
diagnostics/info but are not yet wired into runtime execution.

Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

```bash
avaclaw plugins install -l ./my-plugin
```

Use `--pin` on npm installs to save the resolved exact spec (`name@version`) in
`plugins.installs` while keeping the default behavior unpinned.

### Uninstall

```bash
avaclaw plugins uninstall <id>
avaclaw plugins uninstall <id> --dry-run
avaclaw plugins uninstall <id> --keep-files
```

`uninstall` removes plugin records from `plugins.entries`, `plugins.installs`,
the plugin allowlist, and linked `plugins.load.paths` entries when applicable.
For active memory plugins, the memory slot resets to `memory-core`.

By default, uninstall also removes the plugin install directory under the active
state dir extensions root (`$AVACLAW_STATE_DIR/extensions/<id>`). Use
`--keep-files` to keep files on disk.

`--keep-config` is supported as a deprecated alias for `--keep-files`.

### Update

```bash
avaclaw plugins update <id>
avaclaw plugins update --all
avaclaw plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).

When a stored integrity hash exists and the fetched artifact hash changes,
AvaClaw prints a warning and asks for confirmation before proceeding. Use
global `--yes` to bypass prompts in CI/non-interactive runs.
