---
name: pattern-lifecycle-tracker
description: "Track the Seed→Sprout→Tree maturation lifecycle for all instruments with active signals or positions. Shows where each instrument stands in its pattern development, key metrics, and what needs to happen for advancement to the next stage."
metadata: { "avaclaw": { "emoji": "🌳", "requires": { "env": ["JGT_DATA_MCP_URL"] } } }
---

# Pattern Lifecycle Tracker — Seed → Sprout → Tree

Trading patterns are alive. They are born as seeds (a signal appears), they sprout (a position opens and begins growing), and if tended well, they become trees (mature, profitable positions with confirmed momentum). This skill tracks where every instrument stands in its lifecycle and what it needs to mature.

## Lifecycle Stages

| Stage       | Symbol | Definition                             | Key Criteria                                                                     |
| ----------- | ------ | -------------------------------------- | -------------------------------------------------------------------------------- |
| **Seed**    | 🌱     | Signal detected, no position yet       | Fractal confirmed, alligator aligned, AO divergence present — but no entry taken |
| **Sprout**  | 🌿     | Position opened, early growth phase    | Entry executed, position open, in early bars — still fragile, not yet confirmed  |
| **Sapling** | 🌲🌱   | Position profitable, momentum building | In profit, AO confirming, alligator feeding — needs sustained movement           |
| **Tree**    | 🌳     | Mature, profitable, self-sustaining    | Well in profit, stop moved to breakeven or better, momentum sustained            |
| **Fallen**  | 🍂     | Stopped out or closed                  | Position closed — becomes a seed for a journal entry                             |
| **Dormant** | 💤     | Signal present but conditions not met  | Fractal exists but alligator asleep or opposing momentum                         |

---

## Data Gathering Protocol

Retrieve current state using:

1. **`get_instrument_list`** (jgt-data-mcp) — full list of tracked instruments
2. **`get_analysis_status`** (jgt-analysis-mcp) — active positions and signal states
3. **`query_analysis`** (jgt-analysis-mcp) — recent signal events per instrument
4. **`get_williams_dimensions`** (jgt-data-mcp) — AO, AC, fractal state per instrument
5. **`get_alligator_alignment`** (jgt-data-mcp) — alligator state per instrument
6. **`get_market_data`** (jgt-data-mcp) — current price, recent bars
7. **`get_perspective`** (jgt-data-mcp) — overall perspective alignment

If jgt-analysis-mcp is unavailable, work from MCP data alone and note the gap.

---

## Classification Logic

For each instrument, assign lifecycle stage:

**Seed** if:

- Fractal signal is confirmed (via `get_williams_dimensions`)
- Alligator is aligned with signal direction (via `get_alligator_alignment`)
- No open position exists (via `get_analysis_status`)

**Dormant** if:

- Fractal signal exists but alligator is sleeping (intertwined lines)
- Or momentum (AO) contradicts signal direction

**Sprout** if:

- Position is open AND in profit < 1× risk (or less than 20 bars old)
- Alligator still feeding

**Sapling** if:

- Position is open AND in profit 1–2× risk
- AO momentum confirmed

**Tree** if:

- Position is open AND in profit > 2× risk
- Stop at breakeven or better
- Alligator still feeding or beginning to close

**Fallen** if:

- Position recently closed (last session)
- Document outcome for journal

---

## Output Format

```
╔═══════════════════════════════════════════════════╗
║         🌳 PATTERN LIFECYCLE DASHBOARD             ║
║         [timestamp]                               ║
╚═══════════════════════════════════════════════════╝

🌳 TREES (Mature / Protected)
───────────────────────────────
[INSTRUMENT] [TF] [DIR]
  Stage: Tree 🌳
  Entry: [price] | Current: [price] | P&L: +[X]R
  Stop: [price] (at/above breakeven)
  Alligator: Feeding [direction]
  Momentum: AO [value], [bars] bars sustained

  [repeat for each tree]

🌲🌱 SAPLINGS (Growing / Building)
───────────────────────────────
[INSTRUMENT] [TF] [DIR]
  Stage: Sapling 🌲🌱
  Entry: [price] | Current: [price] | P&L: +[X]R
  Key watch: [what must hold for this to become a tree]

  [repeat for each sapling]

🌿 SPROUTS (Open / Early)
───────────────────────────────
[INSTRUMENT] [TF] [DIR]
  Stage: Sprout 🌿
  Entry: [price] | Current: [price] | P&L: [+/-X]R
  Bars open: [N] | Risk: [amount]
  Caution: [any early warning signs]

  [repeat for each sprout]

🌱 SEEDS (Signals / Awaiting Entry)
───────────────────────────────
[INSTRUMENT] [TF] [DIR]
  Stage: Seed 🌱
  Signal: [fractal break / pending / AO divergence]
  Alligator: [alignment state]
  Entry trigger: [what would trigger entry]

  [repeat for each seed]

💤 DORMANT (Signals / Conditions Not Met)
───────────────────────────────
[INSTRUMENT]: [brief reason dormant]
  [repeat for each dormant]

🍂 RECENTLY FALLEN (Closed This Session)
───────────────────────────────
[INSTRUMENT]: [outcome] — [brief note]
  [repeat for each fallen]

─────────────────────────────────────────
LIFECYCLE SUMMARY
  Trees:    [N] | Saplings: [N]
  Sprouts:  [N] | Seeds:    [N]
  Dormant:  [N] | Fallen:   [N]

GARDEN DENSITY: [N] active positions
RIPEST FOR ATTENTION: [1–2 instruments most worth watching]
─────────────────────────────────────────
```

---

## Advancement Recommendations

After the dashboard, add brief guidance:

- **Which seeds are closest to sprouting?** (alligator just awakening, AO building)
- **Which sprouts need protection?** (move stop, watch closely)
- **Which trees are showing signs of closing?** (alligator beginning to intertwine)

Keep this section concise — one line per instrument worthy of note.
