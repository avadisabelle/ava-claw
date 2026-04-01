---
name: mcp-diagnostics
description: "Test connectivity to all MCP servers and REST services in the ava-code stack. Reports which services are up, which tools respond, approximate latency, and suggests fixes for failures. Run when services seem unreachable or to verify stack health before a session."
metadata: { "avaclaw": { "emoji": "🔍" } }
---

# MCP Diagnostics — Stack Connectivity Check

Before the council can deliberate, the instruments must be tuned. This skill systematically checks every service in the ava-code stack, reports status with latency, and offers concrete remediation for any failures.

## Services to Check

| Service                   | Type | Host:Port | Ping Method                     |
| ------------------------- | ---- | --------- | ------------------------------- |
| jgt-data-server           | REST | :8080     | `GET /health`                   |
| jgt-data-mcp              | MCP  | :8090     | `get_instrument_list` tool call |
| jgt-analysis-intelligence | REST | :8085     | `GET /health`                   |
| jgt-analysis-mcp          | MCP  | :8091     | `get_analysis_status` tool call |
| jgt-strategy-api          | REST | :8083     | `GET /health`                   |
| jgt-transact              | REST | :8084     | `GET /health`                   |
| jgt-insight               | REST | :8081     | `GET /health`                   |

---

## Diagnostic Protocol

### Step 1 — REST Health Checks

For each REST service, use `curl` with a short timeout:

```bash
curl -s -o /dev/null -w "%{http_code} %{time_total}s" --connect-timeout 3 --max-time 5 http://localhost:<PORT>/health
```

Accept: 200 = UP, 4xx = UP (service running but auth/routing issue), connection refused / timeout = DOWN.

For services without a `/health` endpoint, try `/` or `/status`.

### Step 2 — MCP Tool Checks

For jgt-data-mcp (:8090): Call `get_instrument_list` — a lightweight read that confirms the MCP server is accepting tool calls and the data pipeline is connected.

For jgt-analysis-mcp (:8091): Call `get_analysis_status` — confirms the analysis MCP is live and can query its state.

Note the response time for each MCP call.

### Step 3 — Functional Verification (if all up)

If all services are reachable, do a quick functional chain:

1. `get_instrument_list` → pick first instrument
2. `get_market_data` for that instrument → confirms data pipeline
3. `get_alligator_alignment` for that instrument → confirms Williams indicators
4. `get_analysis_status` → confirms analysis state is queryable

This confirms not just connectivity but end-to-end data flow.

---

## Output Format

```
╔═══════════════════════════════════════════════════╗
║          🔧 MCP STACK DIAGNOSTICS                  ║
║          [timestamp]                              ║
╚═══════════════════════════════════════════════════╝

REST SERVICES
─────────────────────────────────────────────────────
  jgt-data-server        :8080   [✅ UP  | ❌ DOWN | ⚠️  DEGRADED]   [latency]
  jgt-analysis-intel     :8085   [✅ UP  | ❌ DOWN | ⚠️  DEGRADED]   [latency]
  jgt-strategy-api       :8083   [✅ UP  | ❌ DOWN | ⚠️  DEGRADED]   [latency]
  jgt-transact           :8084   [✅ UP  | ❌ DOWN | ⚠️  DEGRADED]   [latency]
  jgt-insight            :8081   [✅ UP  | ❌ DOWN | ⚠️  DEGRADED]   [latency]

MCP SERVERS
─────────────────────────────────────────────────────
  jgt-data-mcp           :8090   [✅ UP  | ❌ DOWN | ⚠️  DEGRADED]   [latency]
    Tool tested: get_instrument_list
    Instruments found: [N] — [first few names]

  jgt-analysis-mcp       :8091   [✅ UP  | ❌ DOWN | ⚠️  DEGRADED]   [latency]
    Tool tested: get_analysis_status
    Active states: [brief summary or "no active states"]

FUNCTIONAL CHAIN (if all UP)
─────────────────────────────────────────────────────
  Data pipeline:    [✅ FLOWING | ❌ BROKEN | ⚠️  PARTIAL]
  Analysis chain:   [✅ ACTIVE  | ❌ BROKEN | ⚠️  PARTIAL]
  Notes: [any anomalies in functional test]

─────────────────────────────────────────────────────
STACK STATUS: [🟢 ALL SYSTEMS GO | 🟡 PARTIAL | 🔴 DEGRADED | ⛔ CRITICAL]

Services UP:   [N/7]
Services DOWN: [list]
```

---

## Remediation Guidance

For each failed service, suggest a concrete fix:

**Connection refused (port not responding):**

> Service is not running. Check: `ps aux | grep <service-name>` to see if process is alive. Restart with the appropriate service command or Docker container.

**Timeout (port open but no response):**

> Service may be starting up, overloaded, or deadlocked. Check service logs for errors. Allow 30 seconds and retry.

**4xx HTTP response:**

> Service is running but request failed. Check auth headers, endpoint paths, or API version mismatch. Inspect `/health` vs `/api/health`.

**MCP tool call fails:**

> MCP server is unreachable or the tool is not registered. Verify the MCP server config in `.mcp.json` — ensure the correct port and transport are configured. Restart the MCP server.

**Data pipeline broken (get_market_data fails):**

> The data server may be running but the underlying data feed is disconnected. Check `get_scheduler_status` (jgt-data-mcp) to see if the data scheduler is running.

---

## Quick Diagnostic Commands

Provide these as copy-paste commands the user can run directly if needed:

```bash
# Check all REST services at once
for port in 8080 8081 8083 8084 8085; do
  echo -n "Port $port: "
  curl -s -o /dev/null -w "%{http_code}\n" --connect-timeout 2 http://localhost:$port/health
done

# Check if MCP ports are listening
for port in 8090 8091; do
  echo -n "MCP port $port: "
  nc -zv localhost $port 2>&1 | tail -1
done
```

Close with a one-line stack verdict and recommendation for whether it is safe to begin a trading session.
