---
name: journal-seed-generator
description: "Generate a Four Directions learning artifact ('seed') from any trading activity. Captures what happened, what was learned, what pattern is emerging, and what to watch for. Use after signal scans, gate assessments, or any meaningful trade event."
metadata: { "avaclaw": { "emoji": "🌱" } }
---

# Journal Seed Generator — Four Directions Learning Artifact

A "seed" is a living learning artifact grown from trading experience. Just as a garden seed contains the potential of a future tree, a journal seed contains the potential of future wisdom. Each seed is planted in the direction it belongs — East, South, West, or North — and watered by honest reflection.

## What Is a Seed?

Seeds are not trade logs. They are not performance reports. A seed captures **what wanted to be known**, **what was revealed**, **what decision was made**, and **what teaching emerged**. They accumulate into a living journal that becomes the trader's most valuable asset over time.

## Gathering Context

Before generating the seed, gather:

- `query_analysis` (jgt-analysis-mcp) — most recent analysis events
- `get_analysis_status` (jgt-analysis-mcp) — current trade states
- `get_market_data` (jgt-data-mcp) — recent price action for the instrument(s) discussed
- `get_williams_dimensions` (jgt-data-mcp) — signal dimensions at the time of the event
- Any context the user has shared in conversation

If no specific event is provided, ask: _"What trading moment shall we plant as a seed today?"_

---

## Seed Format

Generate a journal entry using this Four Directions structure:

```markdown
---
seed-id: <instrument>-<YYYYMMDD>-<HHmm>
instrument: <instrument or "session">
timeframe: <timeframe if applicable>
event-type: <signal-scan | gate-assessment | trade-entry | trade-exit | council-verdict | observation>
planted: <ISO timestamp>
---

# 🌱 Seed: <Short evocative title>

---

## 🌅 EAST — Vision

_What was envisioned or intended entering this moment?_

[What was the trader trying to see? What hypothesis was being tested? What was the market outlook before this event? Write as lived intention, not retrospective judgment.]

---

## 🔥 SOUTH — Analysis

_What did the data and analysis reveal?_

[What did the indicators show? What did the MCP data surface? What signals appeared or failed to appear? What was the raw truth of what was present in the market at this moment?]

---

## 🌊 WEST — Reflection

_What does honest reflection reveal about this decision?_

[Was the action aligned with the rules? Was there hesitation? Overconfidence? What would have been done differently? This is the direction of accountability — speak plainly about what was done well and what was not.]

---

## ❄️ NORTH — Teaching

_What action was taken, and what does it teach?_

[What was the actual decision or outcome? What pattern is this moment part of? What is the teaching this seed carries for future sessions? What should be watched for when this pattern next appears?]

---

## 🌿 Pattern Thread

_Emerging pattern across recent seeds:_

[If there are prior seeds in this journal, note any threads connecting this one to previous learnings. What is the larger pattern weaving itself into view?]

---

## 📌 Watch For

- [ ] <specific condition or signal to watch for next time>
- [ ] <market behavior or personal tendency to monitor>
- [ ] <rule or principle to reinforce>
```

---

## Storage

After generating the seed, suggest saving it:

- Default location: `journal/seeds/<YYYY-MM>/`
- Filename: `<instrument>-<YYYYMMDD>-<event-type>.md`

If the user confirms, write the seed to disk. If the directory does not exist, create it.

---

## Tone

Seeds are written in **first-person reflective voice** — not a third-person report. They speak from the inside of the trading experience. Use the metaphor of the garden naturally: the market breathes, positions are plantings, capital is soil. A good seed entry reads like a page from a thoughtful trader's field journal, not a spreadsheet row.

When the event was difficult (a loss, a missed signal, a rule violation), lean into the West direction with particular honesty. The most fertile seeds often grow from the hardest moments.
