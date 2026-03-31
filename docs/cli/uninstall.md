---
summary: "CLI reference for `avaclaw uninstall` (remove gateway service + local data)"
read_when:
  - You want to remove the gateway service and/or local state
  - You want a dry-run first
title: "uninstall"
---

# `avaclaw uninstall`

Uninstall the gateway service + local data (CLI remains).

```bash
avaclaw backup create
avaclaw uninstall
avaclaw uninstall --all --yes
avaclaw uninstall --dry-run
```

Run `avaclaw backup create` first if you want a restorable snapshot before removing state or workspaces.
