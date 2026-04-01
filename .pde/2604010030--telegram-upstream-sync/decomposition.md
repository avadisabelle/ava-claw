# PDE Decomposition: Telegram Fix + Upstream Sync

## Primary Intent

Fix Telegram plugin "extension entry escapes package directory: ./index.ts" error, bump/publish patch, then sync remaining upstream changes.

## Two-Phase Delivery

1. **Phase 1 (Patch)**: Fix Telegram boundary escape error → bump → publish
2. **Phase 2 (Sync)**: Bring in remaining upstream changes from mia-openclaw

## Key Findings from Investigation

### The Error

- `resolvePackageEntrySource` in `src/plugins/discovery.ts` calls `openBoundaryFileSync` with the package dir as root and `./index.ts` as entry
- When `openBoundaryFileSync` returns `!opened.ok`, the error message is always "extension entry escapes package directory" regardless of actual failure reason
- The file physically exists at `extensions/telegram/index.ts` with no symlinks (confirmed via readlink/stat)

### Upstream Changes (already fetched as upstream/main)

- Plugin manifest renamed: `avaclaw.plugin.json` → `openclaw.plugin.json`
- Package.json restructured: new dependencies (grammy, grammyjs), new metadata fields, `openclaw` key instead of `avaclaw`
- index.ts rewritten: uses `defineChannelPluginEntry` from new SDK
- New files: api.ts, runtime-api.ts, test-api.ts, test-support.ts, setup-entry.ts, channel-config-api.ts
- SDK imports changed from relative `../../../src/` paths to `openclaw/plugin-sdk/*` package imports
- Token resolution fix for binding-created accountIds (issue #53876)
- Webhook rate limiting added
- Thread bindings persistence refactored (queue-based)
- Tests updated throughout
