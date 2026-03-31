# Agent Delegation and Autonomy

> A useful agent system should know when to act directly, when to delegate, when to coordinate peers, and when to pause for human consultation.

**Version**: 0.1.0  
**Framework**: RISE-informed draft  
**Date**: 2026-03-15  
**Status**: Draft

---

## Desired Outcome

Establish a delegation and autonomy model for a Mia/AvaClaw-style platform where agents can:

- execute work directly when appropriate
- delegate bounded tasks to specialized sub-agents
- coordinate multi-step and multi-agent efforts
- remain accountable to human guidance and project intent
- escalate to consultation when autonomy reaches a judgment boundary

The goal is not maximum autonomy at all times. The goal is effective, bounded, legible autonomy.

## Structural Tension

Current: AvaClaw already provides meaningful primitives for agent execution, session continuity, tool use, background work, and spawned sub-agents. But those primitives need a clearer conceptual model if they are to support a larger platform with companion roles, project semantics, and multiple pathways of autonomous work.

Desired: A rispec-defined autonomy framework where delegation is intentional, authority is scoped, task boundaries are visible, and humans can understand which agent is doing what, why, and with what freedom.

---

## Core Principle

**Autonomy should increase throughput without dissolving accountability. Delegation should create clarity, not mystery.**

---

## Autonomy Levels

A practical model is to define distinct autonomy levels for agent work.

### Level 0 — Conversational Assistance

The agent explains, summarizes, suggests, and answers, but does not take action on files, tools, or external systems.

### Level 1 — Tool-Assisted Execution

The agent can act directly on local tools and files within allowed boundaries, but stays within a single execution path and does not delegate.

### Level 2 — Bounded Delegation

The agent may spawn or route work to a specialized sub-agent for a clearly scoped task such as:

- implementing a feature
- reviewing a code area
- producing a draft spec
- running a focused investigation

The parent agent remains responsible for summarizing and integrating the result.

### Level 3 — Coordinated Multi-Agent Work

The agent may orchestrate multiple delegated tasks across specialized agents, merge findings, reconcile results, and return a coherent project update.

### Level 4 — Extended Autonomous Flow

The agent may continue through a longer work cycle with multiple steps, retries, and bounded decisions, but must still obey consultation triggers when human judgment, consent, or aspiration alignment becomes necessary.

---

## Delegation Triggers

Delegation should not happen merely because an agent can delegate. It should happen when delegation improves structural clarity.

The parent agent should consider delegation when:

### 1. Specialized competence is needed

A task is better handled by a more focused coding, research, review, or synthesis agent.

### 2. Parallel work is beneficial

Multiple subproblems can be explored independently and later reconciled.

### 3. Context separation improves quality

A large task should be split so each delegated effort can work with a narrower frame and lower confusion.

### 4. Long-running execution is needed

The work involves background implementation, iterative tool use, or extended command execution.

### 5. Distinct roles should remain legible

One agent should stay user-facing while another performs the implementation or investigative work.

---

## Delegation Boundaries

Every delegated task should be bounded by explicit scope.

A delegated task should define:

- objective
- expected output
- files or project area in scope
- authority boundaries
- whether edits are allowed
- whether external actions are allowed
- stop conditions
- return format

This prevents delegation from becoming vague “go figure it out” behavior.

---

## Parent-Agent Responsibilities

When delegation occurs, the parent agent remains accountable for:

- selecting the right delegate
- passing a clear task frame
- keeping the human informed at the right level
- reviewing returned outputs
- integrating or rejecting delegated work
- deciding whether human consultation is needed before continuation

Delegation is not abdication.

---

## Child-Agent Responsibilities

A delegated agent should:

- stay within the assigned scope
- report uncertainty rather than invent authority
- produce legible outputs
- avoid leaking into unrelated project areas
- return enough context for reintegration
- stop when boundaries are reached

The delegated agent is a temporary specialist, not an independent sovereign.

---

## Delegation Packet Shape

```typescript
interface DelegationPacket {
  taskId: string;
  parentSessionId: string;
  delegateRole: 'coder' | 'researcher' | 'reviewer' | 'planner' | 'synthesizer';
  objective: string;
  projectId?: string;
  scope: {
    paths?: string[];
    repos?: string[];
    surfaces?: string[];
  };
  authority: {
    mayEditFiles: boolean;
    mayRunCommands: boolean;
    mayUseNetwork: boolean;
    mayMessageHumans: boolean;
    mayDelegateFurther: boolean;
  };
  deliverables: string[];
  stopConditions: string[];
}
```

---

## Relationship to Human Consultation

This rispec should be paired closely with `human-consultation-in-autonomous-development.spec.md`.

The key rule is:

- delegation is for specialized execution
- consultation is for human judgment

A delegated agent may discover the need for consultation, but it should not silently decide matters that belong to humans. It should return the boundary upward or trigger the agreed consultation loop.

---

## Multi-Agent Patterns

### 1. Research → Synthesis

One agent gathers information, another synthesizes it for human review.

### 2. Build → Review

One agent implements changes, another reviews or validates them before presentation.

### 3. Draft → Integrate

One or more agents produce candidate specs or artifacts, while the parent agent merges and reconciles them.

### 4. Surface Agent → Worker Agent

A user-facing companion remains in conversation while background implementation proceeds through delegated workers.

### 5. Parallel Exploration → Human Decision

Multiple delegated agents explore options; the parent agent frames the tradeoff and consults a human before continuation.

---

## Autonomy Guardrails

The autonomy system should preserve the following guardrails:

### Legibility

Humans should be able to understand:

- which agent acted
- what it was allowed to do
- what it actually did
- why delegation happened

### Reversibility

Prefer delegated actions that are reviewable, restorable, or easy to checkpoint.

### Scoped authority

Do not give every delegate broad powers by default.

### Human escalation

When meaning, consent, taste, or governance is in play, route back to human consultation.

### Session continuity

Delegated work should remain linked to the parent task and project context.

---

## AvaClaw Mapping

AvaClaw already contains relevant primitives for this rispec, including:

- background execution
- spawned sub-agents
- ACP coding sessions
- session-aware orchestration
- tool boundaries and approval flows
- project/workspace access patterns

This rispec does not invent delegation from nothing. It organizes those capabilities into a platform-facing autonomy model.

---

## Relationship to Companion Roles

In a Mia Platform context, companion identity may influence how delegation feels.

Examples:

- one companion may stay relational and user-facing
- another may specialize in structural/code execution
- another may serve as reviewer, archivist, or witness

The key is that role expression should not obscure authority boundaries. Personality can shape the interaction, but execution rights must remain explicit.

---

## Implementation Direction

A practical implementation path would be:

1. define autonomy levels and default policies
2. standardize delegation packets
3. log parent/child task lineage
4. persist delegated results with project linkage
5. connect delegation outcomes to consultation checkpoints
6. surface autonomy state in chat and project status views

---

## Practical Conclusion

A strong platform will not rely on a single monolithic agent doing everything. It will support a layered ecology of action:

- direct execution when simple
- delegation when specialization helps
- orchestration when complexity grows
- consultation when judgment belongs to humans

That makes delegation and autonomy a foundational rispec for any serious AvaClaw-derived creative platform.

---

## Provenance / Co-Sign

Drafted in the Slack **"Miadi-STC"** channel through live AvaClaw-assisted discussion and rispec authoring in `mia-avaclaw.rispecs`.

Created by model: **openai-codex/gpt-5.4**  
Context noted by assistant: follows and complements the previously drafted foundation and human-consultation rispecs.
