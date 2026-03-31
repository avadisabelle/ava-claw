---
summary: "CLI reference for `avaclaw reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
title: "reset"
---

# `avaclaw reset`

Reset local config/state (keeps the CLI installed).

```bash
avaclaw backup create
avaclaw reset
avaclaw reset --dry-run
avaclaw reset --scope config+creds+sessions --yes --non-interactive
```

Run `avaclaw backup create` first if you want a restorable snapshot before removing local state.
