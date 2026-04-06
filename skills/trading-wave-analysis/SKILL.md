---
name: trading-wave-analysis
description: "Stores, queries, and aligns Elliott Wave counts across multiple timeframes using jgt-analysis-intelligence MCP tools. Use when a user shares wave analysis, asks about wave alignment, or wants entry proposals based on wave structure."
metadata: { "avaclaw": { "emoji": "🌊", "requires": { "env": ["JGT_ANALYSIS_MCP_URL"] } } }
---

# Trading Wave Analysis — Elliott Wave Intelligence

This skill feeds the analysis intelligence layer. The MCP tools exist; this skill teaches Ava when and how to use them. Every wave count stored becomes part of the multi-timeframe alignment picture. Every alignment query reveals whether the waves agree or conflict.

"We make money waiting." Wave analysis is not prediction — it is orientation. Know where you are in the structure, and the trade finds you.

## Elliott Wave Domain Knowledge

### Wave Degrees (largest → smallest)

Grand Supercycle → Supercycle → Cycle → Primary → Intermediate → Minor → Minute → Minuette → Sub-Minuette

### Timeframe Ranks

| Timeframe | Rank | Typical Wave Degree     |
| --------- | ---- | ----------------------- |
| M1 (MN1)  | 1    | Cycle / Primary         |
| W1        | 2    | Primary / Intermediate  |
| D1        | 3    | Intermediate / Minor    |
| H4        | 4    | Minor / Minute          |
| H1        | 5    | Minute / Minuette       |
| m30       | 6    | Minuette                |
| m15       | 7    | Minuette / Sub-Minuette |
| m5        | 8    | Sub-Minuette            |

### Optimal Entry Points

| Wave Position         | Entry Quality | Rationale                             |
| --------------------- | ------------- | ------------------------------------- |
| Wave 1 start          | ★★★★★         | Earliest trend reversal signal        |
| End of Wave A         | ★★★★          | Corrective leg exhaustion             |
| B → C transition      | ★★★★          | Confirmation of corrective completion |
| C of 2 → Wave 3 start | ★★★★★         | Highest-conviction trend continuation |
| Wave 4 → Wave 5       | ★★★           | Late trend, reduced reward potential  |

### Impulse vs. Corrective

- **Impulse** (5-wave): Waves 1-2-3-4-5 in trend direction. Wave 3 is never the shortest. Wave 4 does not overlap Wave 1 territory.
- **Corrective** (3-wave): A-B-C against the trend. Can be zigzag, flat, triangle, or complex combination.

---

## MCP Tools Used

All calls route through **jgt-analysis-mcp** (:8091):

| Tool                     | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `ingest_analysis`        | Store a new wave count artifact            |
| `check_wave_alignment`   | Multi-TF alignment score for an instrument |
| `get_wave_positions`     | Current wave positions by instrument       |
| `analyze_wave_structure` | Batch analysis across timeframes           |
| `propose_fdb_entry`      | Propose entry when alignment is strong     |
| `invalidate_wave_count`  | Mark a stale or invalidated wave count     |

---

## Workflow

### Action 1 — Store Wave Count

**When**: User shares an Elliott Wave observation.

Parse the user's message to extract:

- `instrument` — e.g., EURUSD
- `timeframe` — e.g., H4
- `wave_label` — e.g., "Wave 3" or "C of 2"
- `wave_degree` — e.g., Minor, Intermediate
- `wave_type` — `impulse` or `corrective`
- `direction` — `bullish` or `bearish`
- `target_price` — if mentioned (e.g., 1.1450)
- `invalidation_level` — if mentioned (e.g., "invalidated below 1.0800")
- `confidence` — infer from language: "I think" → 0.6, "clearly" → 0.9, default 0.75

Call via jgt-analysis-mcp:

```
ingest_analysis({
  artifact_type: "wave_count",
  instrument: "<INST>",
  timeframe: "<TF>",
  data: {
    wave_label: "<LABEL>",
    wave_degree: "<DEGREE>",
    wave_type: "<TYPE>",
    direction: "<DIR>",
    target_price: <PRICE or null>,
    invalidation_level: <LEVEL or null>,
    confidence: <0.0-1.0>
  },
  source: "human_analysis"
})
```

Confirm storage with a brief acknowledgment. Show what was stored.

### Action 2 — Check Alignment

**When**: User asks about alignment, readiness, or entry viability for an instrument.

Call via jgt-analysis-mcp:

```
check_wave_alignment({
  instrument: "<INST>"
})
```

The tool returns:

- `alignment_score` — 0.0 to 1.0
- `timeframes_analyzed` — list of TFs with wave counts
- `dominant_direction` — bullish / bearish / conflicted
- `conflicts` — any TFs in disagreement
- `wave_positions` — current wave label per TF

Render the alignment report:

```
═══════════════════════════════════════
🌊 WAVE ALIGNMENT — EURUSD
───────────────────────────────────────
 W1  │ Wave 3 Impulse ↑  │ Intermediate │ 0.90
 D1  │ Wave 5 Impulse ↑  │ Minor        │ 0.85
 H4  │ Wave C Corrective ↓│ Minute       │ 0.70
 H1  │ Wave 2 Impulse ↑  │ Minuette     │ 0.65
───────────────────────────────────────
 Alignment Score  : 0.78
 Dominant Direction: BULLISH
 Conflicts        : H4 corrective ↓ vs W1/D1 impulse ↑
───────────────────────────────────────
 READING: HTF impulse intact. H4 correction
 likely completing — watch for C termination
 as Wave 3 entry on H4.
═══════════════════════════════════════
```

**Alignment Score Interpretation**:

- `≥ 0.85` — Strong alignment. All timeframes agree. High-conviction setup.
- `0.70 – 0.84` — Moderate alignment. Minor conflicts. Proceed with awareness.
- `0.50 – 0.69` — Weak alignment. Significant TF conflict. Wait for resolution.
- `< 0.50` — No alignment. Waves in disagreement. Do not enter.

### Action 3 — Get Wave Positions

**When**: User asks "where are we?" or "show wave positions" for an instrument.

Call via jgt-analysis-mcp:

```
get_wave_positions({
  instrument: "<INST>"
})
```

Render a multi-timeframe wave position table:

```
🌊 WAVE POSITIONS — EURUSD
──────────────────────────────────────
 TF  │ Wave    │ Type       │ Dir │ Age    │ Confidence
 W1  │ Wave 3  │ Impulse    │ ↑   │ 12w    │ 0.90
 D1  │ Wave 5  │ Impulse    │ ↑   │ 8d     │ 0.85
 H4  │ Wave C  │ Corrective │ ↓   │ 3d     │ 0.70
 H1  │ Wave 2  │ Impulse    │ ↑   │ 6h     │ 0.65
──────────────────────────────────────
 Last updated: [timestamps per TF]
```

Flag any stale counts (age > expected for that timeframe rank).

### Action 4 — Propose Entry

**When**: Alignment score ≥ 0.70 and user asks "should I enter?" or "propose trade" or after showing a strong alignment.

Call via jgt-analysis-mcp:

```
propose_fdb_entry({
  instrument: "<INST>"
})
```

The tool returns:

- `proposed_entry` — price level
- `stop_loss` — based on wave invalidation
- `take_profit` — based on wave target
- `risk_reward` — calculated R:R
- `wave_basis` — which wave position justifies entry
- `confidence` — aggregate confidence

Render the proposal:

```
═══════════════════════════════════════
🌊 ENTRY PROPOSAL — EURUSD LONG
───────────────────────────────────────
 Entry        : 1.0920 (market)
 Stop Loss    : 1.0785 (Wave 2 low)
 Take Profit  : 1.1250 (Wave 3 target)
 Risk:Reward  : 1 : 2.4
───────────────────────────────────────
 Wave Basis   : C of 2 completing → Wave 3
 Alignment    : 0.82 (3/4 TFs bullish)
 Confidence   : 0.78
───────────────────────────────────────
 ⚠ Invalidation: Below 1.0785 cancels
   this wave count. Run invalidate if hit.
═══════════════════════════════════════
```

**Important**: If alignment < 0.70, do NOT propose entry. Instead explain what needs to align and suggest waiting.

### Action 5 — Invalidate Stale Count

**When**: User reports structure invalidation ("wave count busted", "broke below invalidation", "structure failed") or when reviewing positions that have hit invalidation levels.

Call via jgt-analysis-mcp:

```
invalidate_wave_count({
  instrument: "<INST>",
  timeframe: "<TF>",
  reason: "<why the count is invalidated>"
})
```

After invalidation:

1. Confirm which count was invalidated
2. Automatically run `get_wave_positions` to show remaining valid counts
3. Suggest re-analysis: "The [TF] wave count has been invalidated. Consider re-labeling after the structure settles."

### Action 6 — Batch Wave Structure Analysis

**When**: User asks for a full wave overview across instruments or a deep structural scan.

Call via jgt-analysis-mcp:

```
analyze_wave_structure({
  instruments: ["EURUSD", "GBPUSD", "USDJPY"],
  timeframes: ["W1", "D1", "H4"]
})
```

Render a consolidated wave map showing all instruments × timeframes with alignment scores.

---

## Trigger Phrases

| Intent           | Example Phrases                                                    |
| ---------------- | ------------------------------------------------------------------ |
| Store wave count | "EURUSD H4 is in Wave 3 impulse up, targeting 1.1450"              |
|                  | "I see Wave C completing on D1 GBPUSD"                             |
|                  | "Mark USDJPY W1 as Wave 5 bearish"                                 |
| Check alignment  | "Is EURUSD aligned?", "Wave alignment GBPUSD"                      |
|                  | "Should I enter EURUSD?", "Are the waves agreeing?"                |
|                  | "Check multi-TF alignment for gold"                                |
| Get positions    | "Where are we on EURUSD?", "Show wave positions"                   |
|                  | "What's the wave count?", "Wave map USDJPY"                        |
| Propose entry    | "Propose trade EURUSD", "Entry suggestion based on waves"          |
|                  | "Give me an entry on GBPUSD", "Wave-based entry"                   |
| Invalidate count | "Wave count busted on H4 EURUSD", "Invalidate the D1 count"        |
|                  | "EURUSD broke below invalidation", "Structure failed on GBPJPY H4" |
| Batch analysis   | "Full wave scan", "Wave structure all instruments"                 |
|                  | "Multi-instrument wave overview"                                   |

---

## Examples

**User**: "EURUSD H4 is in Wave 3 of an impulse, target 1.1450, invalidation below 1.0800"

→ Parse: instrument=EURUSD, timeframe=H4, wave_label=Wave 3, wave_type=impulse, direction=bullish, target_price=1.1450, invalidation_level=1.0800, confidence=0.75
→ Call `ingest_analysis` with extracted data
→ Response: "Stored EURUSD H4 Wave 3 impulse ↑ (target 1.1450, invalidation 1.0800, confidence 0.75). The intelligence layer now has this count for alignment calculations."

**User**: "Is EURUSD aligned for a long?"

→ Call `check_wave_alignment({ instrument: "EURUSD" })`
→ Render alignment table with score
→ If score ≥ 0.70: "Alignment at 0.82 — moderate-to-strong. W1/D1/H1 agree bullish. H4 corrective but may be completing. Want me to propose an entry?"
→ If score < 0.50: "Alignment at 0.42 — waves in conflict. D1 and H4 disagree. Wait for the H4 correction to resolve before considering entry."

**User**: "Where are we on GBPUSD?"

→ Call `get_wave_positions({ instrument: "GBPUSD" })`
→ Render multi-TF position table
→ Flag any stale counts or missing timeframes: "No H1 count on file — consider updating after reviewing the intraday structure."

**User**: "Wave count busted on EURUSD H4 — price broke below 1.0800"

→ Call `invalidate_wave_count({ instrument: "EURUSD", timeframe: "H4", reason: "Price broke below 1.0800 invalidation level" })`
→ Confirm: "EURUSD H4 wave count invalidated. Reason: price broke below 1.0800."
→ Auto-call `get_wave_positions` to show remaining valid counts
→ Suggest: "The H4 structure needs re-labeling. Higher timeframe counts (W1, D1) remain valid. Wait for new structure to form on H4 before re-counting."

**User**: "Propose trade EURUSD"

→ First call `check_wave_alignment({ instrument: "EURUSD" })` to verify alignment
→ If score ≥ 0.70: call `propose_fdb_entry({ instrument: "EURUSD" })` and render proposal card
→ If score < 0.70: "Alignment is at 0.58 — not strong enough for a wave-based entry. The D1 and H4 counts conflict. Wait for resolution. We make money waiting."

**User**: "Full wave scan"

→ Call `analyze_wave_structure` with full instrument list and W1/D1/H4 timeframes
→ Render consolidated wave map
→ Highlight instruments with alignment ≥ 0.70: "EURUSD (0.82) and XAUUSD (0.76) show the strongest wave alignment. Consider these for deeper analysis."

---

## Integration Notes

- This skill **feeds** the analysis intelligence layer. The more wave counts stored, the better the alignment picture. Encourage regular wave count updates.
- After a strong alignment result, suggest running `trading-gate-assessment` for the full ARIANE Four Faces evaluation before executing.
- After an entry proposal, suggest `trading-order-execution` to place the trade.
- Pair with `trading-htf-analysis` for Alligator-based structure context alongside wave counts.
- Wave counts are **human-sourced observations**, not automated predictions. The system stores what Guillaume sees. Evaluation is always human-triggered.
- If MCP tool calls fail, report the failure clearly and suggest checking `jgt-analysis-mcp` status via `mcp-diagnostics` skill.
