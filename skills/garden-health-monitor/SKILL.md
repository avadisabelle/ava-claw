---
name: garden-health-monitor
description: "Capital-as-soil stewardship report — monitors portfolio health using the garden metaphor. Tracks soil health (capital/margin), planting density (open positions), weather (market regime), and growth rate (P&L trajectory). Use before planting new trades or when checking overall risk posture."
metadata: { "avaclaw": { "emoji": "🌿", "requires": { "env": ["JGT_DATA_MCP_URL"] } } }
---

# Garden Health Monitor — Capital-as-Soil Stewardship

The trading portfolio is not a spreadsheet. It is a living garden. Capital is the soil — the living medium in which all growth is possible. Open positions are plantings — seeds becoming sprouts becoming trees. Market conditions are the weather — sometimes favorable, sometimes hostile. This skill reads the health of the garden as a whole, before any new planting is considered.

A garden that is overplanted, in poor soil, or facing a storm is not a garden ready to receive new seeds. This monitor tells the truth about the garden's current state.

## Data Sources

Gather from all available sources:

**Positions & Capital (jgt-transact REST :8084)**

- `GET /positions` — all open positions with entry, current P&L, risk
- `GET /account` — account balance, equity, margin used, free margin
- `GET /summary` — aggregate P&L, drawdown metrics

**Market Regime (jgt-insight REST :8081)**

- `GET /regime` — current market regime (trending / ranging / volatile)
- `GET /conditions` — market condition assessment

**Market State (jgt-data-mcp :8090)**

- `get_market_data` — recent price action for open instruments
- `get_alligator_alignment` — are the alligators still feeding?
- `get_perspective` — overall multi-instrument perspective

**Analysis State (jgt-analysis-mcp :8091)**

- `get_analysis_status` — which signals are active
- `query_analysis` — recent analysis events

If REST endpoints are unavailable, note the gap and work from available MCP data.

---

## Garden Health Metrics

### 1. Soil Health (Capital State)

The soil is the foundation. Without healthy soil, nothing grows well.

| Metric             | Healthy | Caution | Critical |
| ------------------ | ------- | ------- | -------- |
| Margin utilization | < 30%   | 30–60%  | > 60%    |
| Drawdown from peak | < 5%    | 5–15%   | > 15%    |
| Free margin ratio  | > 70%   | 40–70%  | < 40%    |
| Consecutive losses | 0–1     | 2–3     | 4+       |

### 2. Planting Density (Position Concentration)

The garden can be overplanted — too many positions competing for the same soil and sunlight.

| Metric                          | Healthy | Caution | Critical |
| ------------------------------- | ------- | ------- | -------- |
| Total open positions            | 1–3     | 4–6     | 7+       |
| Correlated pairs open           | 0–1     | 2       | 3+       |
| Single instrument concentration | < 30%   | 30–50%  | > 50%    |
| Positions without stops         | 0       | —       | Any      |

### 3. Weather (Market Regime)

Weather you can plant into vs. weather that destroys young plants.

| Regime                | Planting Stance                                 |
| --------------------- | ----------------------------------------------- |
| Trending (aligned)    | Favorable — plant in trend direction            |
| Trending (counter)    | Hostile — avoid counter-trend seeds             |
| Ranging               | Cautious — scalps only, no trend positions      |
| Volatile / Whipsaw    | Dangerous — close young positions, no new seeds |
| Pre-news / Event risk | Wait — soil is unstable                         |

### 4. Growth Rate (P&L Trajectory)

Is the garden growing or contracting?

- Session P&L direction (up / flat / down)
- Win rate over last 10 trades
- Average R multiple (reward vs. risk realized)
- Open position aggregate P&L (unrealized)

---

## Output Format

```
╔═══════════════════════════════════════════════════╗
║           🌱 GARDEN HEALTH REPORT                  ║
║           [timestamp]                             ║
╚═══════════════════════════════════════════════════╝

🌍 SOIL HEALTH
─────────────────────────────
  Account Equity:    [value]
  Free Margin:       [value] ([%] utilization)
  Drawdown:          [%] from peak ([value])
  Soil Status:       [FERTILE / ADEQUATE / DEPLETED / CRITICAL]

  Soil Reading: [1–2 sentences on capital state]

🌿 PLANTING DENSITY
─────────────────────────────
  Open Positions:    [N]
  Active Instruments: [list]
  Correlated Pairs:  [any correlated groupings]
  Total Risk Open:   [aggregate risk in R or currency]
  Density Status:    [SPARSE / HEALTHY / DENSE / OVERCROWDED]

  Planting Reading: [1–2 sentences on concentration]

🌦️ WEATHER (Market Regime)
─────────────────────────────
  Regime:            [TRENDING / RANGING / VOLATILE]
  Direction Bias:    [BULLISH / BEARISH / NEUTRAL]
  Upcoming Events:   [any known high-impact news]
  Weather Status:    [FAVORABLE / MIXED / HOSTILE]

  Weather Reading: [1–2 sentences on conditions]

📈 GROWTH RATE
─────────────────────────────
  Session P&L:       [+/- value]
  Open P&L:          [+/- value]
  Recent Win Rate:   [%] (last [N] trades)
  Avg R Multiple:    [value]
  Momentum:          [GROWING / STABLE / DECLINING]

─────────────────────────────────────────
OVERALL GARDEN HEALTH: [THRIVING / HEALTHY / STRESSED / RECOVERY / CLOSED]

RECOMMENDATION:
  [PLANT] — Garden is ready to receive new seeds
  [TEND]  — Focus on existing positions; no new plantings
  [PRUNE] — Consider closing weakest positions to reduce density
  [WAIT]  — Conditions hostile; hold and observe
  [CLOSE] — Serious drawdown or adverse regime; protect capital
─────────────────────────────────────────

GARDEN KEEPER'S NOTE:
[2–3 sentences in the voice of Face 4 — the Garden Keeper — offering honest stewardship counsel. Use garden metaphor naturally. Be direct about what the garden needs.]
```

---

## Interpretation Guidance

The Garden Keeper (Face 4 of the Ava Council) is the voice of this report. After displaying the metrics, always close with the Garden Keeper's Note — a human-voice assessment that synthesizes all four health dimensions into actionable stewardship advice.

If RECOMMENDATION is CLOSE or RECOVERY, the Garden Keeper speaks with particular gravity. Capital drawdown is not just a number — it is the soil thinning. Recovery requires patience more than action.

If any data source is unavailable, note it clearly and work from what is accessible. An incomplete garden health check is still better than none.
