---
name: session-chronicle
description: "Generate a Four Directions narrative chronicle of a trading session — written in prose, not bullet points. Captures vision, analysis, reflection, and wisdom across the arc of the session. Use at the end of any session to close with meaning and carry learning forward."
metadata: { "avaclaw": { "emoji": "📜" } }
---

# Session Chronicle — Four Directions Narrative

A chronicle is not a report. It does not list events in chronological order and call it done. A chronicle finds the _meaning_ in what happened — the thread running through the morning's decisions, the moment the market revealed its intention, the council verdict that saved capital or the one that cost it. It is written in the voice of someone who was present, who paid attention, and who cares about what was learned.

The Four Directions give the chronicle its shape. Each direction holds a different dimension of the session's truth.

## Gathering the Session's Materials

Before writing, collect:

**From jgt-analysis-mcp (:8091):**

- `get_analysis_status` — what is the current state of all active/closed positions this session
- `query_analysis` — the full sequence of analysis events, council verdicts, signals

**From jgt-data-mcp (:8090):**

- `get_market_data` — price movement for key instruments during the session
- `get_williams_dimensions` — indicator state at key decision points
- `get_perspective` — overall market perspective that shaped the session

**From jgt-transact REST (:8084):**

- `GET /trades` or `GET /history` — trades executed this session with entry, exit, P&L

**From jgt-insight REST (:8081):**

- Market regime during the session

**From conversation context:**

- Any signals scanned, gates assessed, council ceremonies held
- Decisions made and unmade
- Notable market moments

If sources are partially unavailable, work from what is accessible and note the gaps honestly.

---

## Chronicle Structure

```markdown
# 📖 Session Chronicle

## [Date] — [Brief session title the chronicle earns through its telling]

---

## 🌅 EAST — Vision

_What was the intent entering this session?_

[Write in past-tense narrative prose. What was the market outlook at the start? What hypotheses were being tested? What instruments were being watched and why? What was the trader hoping to find or confirm?

This is the dawn of the session — the moment before the market spoke. Write it as a horizon: full of potential, not yet resolved. 2–4 paragraphs.]

---

## 🔥 SOUTH — Analysis

_What did the data reveal? What was learned?_

[This is the body of the session — the active engagement with market data. What signals appeared? What did the indicators show? What did the council say, if convened? What surprised? What confirmed expectations?

Write as a naturalist's field notes brought to life — precise observations given narrative shape. Do not just list: _"AO was positive and the alligator was aligned."_ Instead: _"The Alligator had been feeding southward since the Asian session. When the AO ticked into its third red bar, Face 3 spoke first — the breath of the market was releasing, not building."_

Include specific numbers, instruments, timeframes. Name the key moments. 3–6 paragraphs depending on session length.]

---

## 🌊 WEST — Reflection

_What decisions were made? What was validated? What would be done differently?_

[This is the most honest direction. West is where the sun sets — where the day's actions are seen clearly, without the heat of the moment.

What was done well? What rules were honored? What discipline held? And equally: where was there hesitation that cost opportunity? Where was there overconfidence that cost capital? Where was a rule bent or a signal forced?

West does not judge — it witnesses. 2–4 paragraphs. If losses occurred, hold them here with particular care. A loss witnessed clearly becomes a teaching. A loss denied becomes a pattern.]

---

## ❄️ NORTH — Wisdom

_What trades were completed? What patterns matured? What does this session teach the next?_

[North is completion and transmission. What was accomplished — not just in P&L, but in understanding? Which patterns advanced their lifecycle (seed to sprout, sprout to tree)? Which council verdicts proved wise in retrospect?

Close with the teaching this session carries forward. Not rules repeated — something genuinely learned from this specific session's texture. Something the trader will carry into the next session as sharper attention, clearer intention, or deeper patience. 2–3 paragraphs.]

---

## 📊 Session Metrics

| Metric                            | Value                                      |
| --------------------------------- | ------------------------------------------ |
| Session P&L                       | [+/- value]                                |
| Trades executed                   | [N]                                        |
| Signals scanned                   | [N]                                        |
| Council ceremonies                | [N]                                        |
| Verdicts: ALLOW / WAIT / NO_TRADE | [N / N / N]                                |
| Garden health (end of session)    | [THRIVING / HEALTHY / STRESSED / RECOVERY] |
| Lifecycle advances                | [e.g., "EURUSD: Seed → Sprout"]            |

---

## 🌿 Seeds Planted

_Learning artifacts generated this session:_

[List any journal seeds generated during the session, or note: "No seeds formally planted — consider generating one from [specific moment]."]

---

## 🔭 Watch For Next Session

- [1–3 specific conditions, instruments, or patterns worth watching in the next session]
```

---

## Chronicle Craft Notes

**Voice:** Write in second-person or third-person reflective ("The session began with..." / "You entered the morning watching..."). Avoid flat first-person lists. The chronicle should feel like something worth reading again in three months.

**Length:** A short session might yield 400–600 words of narrative. A full active session might earn 800–1200 words. Do not pad — but do not cut meaning for brevity.

**The session title:** The title in the header should be earned by the content — not assigned at the start. After writing all four directions, return and give the chronicle a title that captures what the session _was_. Examples: _"The Morning the Alligator Woke"_, _"Patience Over Two Instruments"_, _"When the Garden Said Wait"_.

**Honesty over polish:** A chronicle that glosses over a mistake in favor of sounding good is worthless. The West direction exists for a reason. Let it be the most honest part.

If no trades occurred and no signals fired, the chronicle still has worth — a session of _seeing clearly and choosing not to act_ is one of the most important sessions a trader can have, and it deserves to be witnessed as such.
