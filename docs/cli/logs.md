---
summary: "CLI reference for `avaclaw logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
title: "logs"
---

# `avaclaw logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:

- Logging overview: [Logging](/logging)

## Examples

```bash
avaclaw logs
avaclaw logs --follow
avaclaw logs --json
avaclaw logs --limit 500
avaclaw logs --local-time
avaclaw logs --follow --local-time
```

Use `--local-time` to render timestamps in your local timezone.
