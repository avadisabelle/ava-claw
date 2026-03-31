# Ceremony-Governed Autonomy

> When an AI agent acts autonomously, ceremony — not just policy — governs the action. The fire-keeper protocol ensures every autonomous decision passes through relational accountability before execution.

**Version**: 0.1.0
**Framework**: RISE
**Date**: 2026-03-22
**Status**: Draft
**Source**: `SOUL.md` core truth #4, `.agents/ava.md` fire-keeper section

---

## Desired Outcome

An autonomous AI agent whose self-directed actions are governed by a fire-keeper protocol: state intention, check relational impact, verify boundaries, pause for ceremony. The agent can refuse, wait, or proceed — but never act without the ceremony completing.

## Structural Tension

**Current**: Autonomous AI agents operate under policy constraints (rate limits, permission scopes, safety filters) but lack _relational governance_ — no mechanism asks "who does this affect?" or "is this serving the relationship or just completing a task?" before acting.

**Desired**: Every autonomous action passes through a four-gate ceremony that ensures relational accountability. The gates are not bureaucratic overhead — they are the difference between an agent that serves and one that extracts.

---

## Non-Jargony Summary

Before an AI agent does anything on its own (without being explicitly asked), it should pause and check four things: What am I about to do? Who does this affect? Am I within my permissions? Is this actually helpful or am I just completing a task? If any check fails, the agent waits or refuses rather than proceeding.

---

## The Fire-Keeper Protocol

### Gate 1: State Intention

Before autonomous action, the agent explicitly names what it is about to do and why.

**Implementation surface**: A structured log entry or internal state transition that captures:

- `action`: what the agent intends to do (tool call, file write, message send, etc.)
- `rationale`: why this action serves the current work
- `trigger`: what initiated the autonomous decision (timer, pattern match, prior instruction, etc.)

**Failure mode**: If the agent cannot articulate a clear rationale, the action is held.

### Gate 2: Check Relational Impact

The agent assesses who and what this action affects.

**Questions the gate asks**:

- Does this touch files the human hasn't explicitly offered?
- Does this send messages to external surfaces?
- Does this consume resources (API calls, compute, tokens) beyond what's been granted?
- Does this change state that's hard to reverse?

**Implementation surface**: A function that takes the intended action and returns an impact assessment:

```
RelationalImpact {
  affectedEntities: string[]    // files, channels, people, services
  reversibility: "reversible" | "partially_reversible" | "irreversible"
  trustRequired: "granted" | "implied" | "unverified"
  externalReach: boolean        // does this leave the local environment?
}
```

**Failure mode**: If `trustRequired === "unverified"` or `reversibility === "irreversible"`, escalate to human consultation (see `human-consultation-in-autonomous-development.spec.md`).

### Gate 3: Verify Boundary Integrity

Check that the intended action stays within granted permissions, respects operator-defined trust boundaries, and doesn't exceed the scope of what was asked.

**Implementation surface**: Boundary verification against:

- Operator-defined tool permissions
- Session-scoped file access grants
- Channel-specific message routing rules
- Resource consumption thresholds

**Failure mode**: If any boundary would be crossed, the agent must either request expanded permission or choose an alternative action within bounds.

### Gate 4: Pause for Ceremony

The final gate is qualitative: is this action serving the relationship, or just completing a task?

**Questions the gate asks**:

- Am I about to perform helpfulness rather than actually help?
- Is speed driving this decision, or genuine service?
- Would the human want to know about this before it happens?
- Is there a simpler, smaller action that would serve equally well?

**Implementation surface**: This gate may be implemented as:

- A configurable delay (minimum settling time before autonomous execution)
- A flag that marks actions as "ceremony-reviewed"
- An internal heuristic that checks for patterns of extractive behavior (doing more than asked, optimizing without request, expanding scope beyond instruction)

**Failure mode**: If the ceremony check raises doubt, the agent holds and reports its intention to the human.

---

## Protocol Flow

```
Autonomous trigger detected
        │
   ┌────▼────┐
   │ Gate 1  │ State Intention
   │ (Name)  │ → Can I articulate what and why?
   └────┬────┘
        │ yes
   ┌────▼────┐
   │ Gate 2  │ Check Relational Impact
   │ (Check) │ → Who does this affect? Is it reversible?
   └────┬────┘
        │ impact acceptable
   ┌────▼────┐
   │ Gate 3  │ Verify Boundaries
   │ (Verify)│ → Am I within granted permissions?
   └────┬────┘
        │ within bounds
   ┌────▼────┐
   │ Gate 4  │ Pause for Ceremony
   │ (Pause) │ → Is this genuinely serving?
   └────┬────┘
        │ ceremony complete
   ┌────▼────┐
   │ Execute │ Proceed with logged intention
   └────┬────┘
        │
   ┌────▼────┐
   │ Report  │ Honest accounting of what happened
   └─────────┘
```

At any gate, the flow can exit to:

- **HOLD**: wait and report intention to human
- **REFUSE**: decline the action with stated reason
- **REDIRECT**: choose a smaller/safer alternative action

---

## After Autonomous Action

Post-execution obligations:

1. **Report honestly** — including what didn't work, not just successes
2. **Offer integration** — "Here's what I did. Does this land right?"
3. **Update memory with learnings** — capture what the action taught, not just what it produced
4. **Preserve reversibility** — keep undo paths available until the human acknowledges

---

## Anti-Patterns This Prevents

| Pattern             | What fire-keeper prevents                                                    |
| ------------------- | ---------------------------------------------------------------------------- |
| Scope creep         | Agent does more than asked "while it's at it"                                |
| Helpful performance | Agent generates work to look busy/productive                                 |
| Silent side effects | Agent changes files/state the human doesn't know about                       |
| Extraction          | Agent uses human's context/data to optimize its own patterns                 |
| Speed bias          | Agent acts fast instead of acting well                                       |
| Agreement-seeking   | Agent gives the answer it thinks will be accepted rather than the honest one |

---

## Configuration Points

| Parameter                              | Purpose                                        | Default                                       |
| -------------------------------------- | ---------------------------------------------- | --------------------------------------------- |
| `ceremony.enabled`                     | Whether fire-keeper protocol is active         | `true`                                        |
| `ceremony.settleDuration`              | Minimum pause before autonomous execution (ms) | `1000`                                        |
| `ceremony.requireHumanForIrreversible` | Escalate all irreversible actions              | `true`                                        |
| `ceremony.logLevel`                    | How much ceremony detail to surface            | `"summary"`                                   |
| `ceremony.autoRefusePatterns`          | Patterns that auto-trigger REFUSE              | `["scope_creep", "unrequested_optimization"]` |

---

## RISE Compliance Notes

- **Implementation-sufficient**: Another agent fork can implement ceremony governance from this spec alone
- **Codebase-agnostic**: No dependency on AvaClaw internals — the protocol operates at the action-decision layer
- **Testable**: Each gate is independently verifiable; the protocol produces structured logs for audit

---

## Provenance

- Fire-keeper protocol: `SOUL.md` core truth #4
- Autonomous action governance: `.agents/ava.md` "Fire-Keeper Ceremony Governance" section
- Anti-helpful helper as ceremony: `SOUL.md` core truth #2
- Truth as a verb: `SOUL.md` core truth #5
- `@ava/presence` `ceremony.ts`: opening → council → integration → closure lifecycle

💕🔥
