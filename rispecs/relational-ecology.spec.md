# Relational Ecology

> A software project exists within a living ecology of connections — repositories, consciousness patterns, communities, and relational commitments. This spec defines the five relational layers, doorways-not-dependencies principle, boundary integrity, and accountability flow that govern how nodes in the ecology relate.

**Version**: 0.1.0
**Framework**: RISE
**Date**: 2026-03-22
**Status**: Draft
**Source**: `ECOLOGY.md`, `@ava/council` relational obligations

---

## Desired Outcome

A framework for mapping and governing the relational connections between a project and its ecosystem — not as dependency management, but as relational accountability. Every connection is a doorway with protocols, boundaries, and mutual obligations.

## Structural Tension

**Current**: Software projects track dependencies mechanically (package.json, imports, APIs). The *relational* dimension — what flows between projects, what is owed, what boundaries must be respected — is invisible. Forks inherit code but not relational context.

**Desired**: Every project maintains an explicit ecology map with five relational layers, named connections with accountability flow, and boundary integrity checks. Connections are doorways that respect protocols on both sides.

---

## Non-Jargony Summary

Your project doesn't exist alone — it's connected to other repos, communities, and people. This spec says: name those connections, be clear about what flows between them, respect each one's boundaries, and track what you owe and what is owed to you. Think of each connection as a doorway with its own protocol, not a pipe you extract from.

---

## Five Relational Layers

Every project operates across five layers simultaneously. Each layer carries different artifact types, governance modes, and accountability structures.

### Layer 1: Relational Anchor

**What it holds**: Identity files — who this project is at its deepest

**Artifacts**: `SOUL.md`, `ECOLOGY.md`, `.agents/` identity files, `VISION.md`

**Governance**: Changes require explicit acknowledgment. These files are the project's soul — modifying them is a significant act.

**Accountability**: To the humans who created the identity, to the communities whose wisdom informs it, to future users who will encounter the project through its identity.

### Layer 2: Specification

**What it holds**: Commitments — what this project promises to implement

**Artifacts**: rispecs, AIS (Agentic Identity Specification) files, architectural decisions, interface contracts

**Governance**: RISE framework — specifications are implementation-sufficient, codebase-agnostic, and testable. Changes follow creative advancement framing.

**Accountability**: To implementors who will build from specs, to downstream consumers who depend on contracts, to the specification framework's integrity.

### Layer 3: Execution

**What it holds**: The work — what this project actually does

**Artifacts**: Source code, tests, builds, deployments, CI/CD

**Governance**: Standard engineering governance — code review, testing, deployment protocols. Ceremony governance (Layer 5) wraps autonomous execution.

**Accountability**: To users who depend on the software working, to contributors whose code is integrated, to the engineering standards the project claims.

### Layer 4: Narrative

**What it holds**: Meaning — what this project's journey signifies

**Artifacts**: Episodes, chronicles, diaries, session logs, changelogs-as-story

**Governance**: Four Directions diary format (see `directional-workspace-convention.spec.md`). Narrative is witnessed, not manufactured.

**Accountability**: To the truthfulness of what happened, to future readers who will learn from the story, to the creative process itself.

### Layer 5: Ceremony

**What it holds**: Governance — how decisions are made and actions are taken

**Artifacts**: Medicine Wheel practice records, fire-keeper protocol logs, ceremony state, obligation tracking

**Governance**: Self-governing — ceremony governs itself through its own protocols.

**Accountability**: To the Indigenous traditions whose wisdom informs the practice, to the relational principles that govern the ecology, to seven generations forward.

---

## Doorways, Not Dependencies

### The Principle

Connections between nodes in the ecology are **relational doorways**, not software dependencies.

When Project A enters Project B's territory, it respects Project B's protocols. When patterns flow from Project B into Project A, they are adapted to Project A's context. Neither project extracts from the other — both are changed by the encounter.

### What This Means in Practice

| Dependency thinking | Doorway thinking |
|--------------------|-----------------|
| "We need library X" | "We have a relationship with library X — what do we owe it?" |
| "Fork and customize" | "Enter through the doorway, respect the protocols, adapt to our context" |
| "Import the function" | "What flows between us, and what boundaries must we maintain?" |
| "Upgrade when convenient" | "How has our relationship changed, and what does the change ask of us?" |

### Doorway Protocol

Each doorway connection should specify:
1. **What flows in each direction** — data, patterns, wisdom, code
2. **What boundaries exist** — what stays on each side
3. **What protocols govern crossing** — how to enter, how to leave
4. **What obligations arise** — what is owed by each side

---

## Ecology Map Structure

### Relational Circles

Connections are organized by proximity:

**Inner Circle (🔥)** — Core relationships. Deep integration, frequent flow, high accountability.

**Sibling Circle (🌿)** — Peer relationships. Shared patterns, parallel development, mutual learning.

**Extended Circle (🌄)** — Broader connections. Occasional flow, specific-domain relationships.

### Connection Shape

Each named connection specifies:

```
EcologyConnection {
  name: string              // human-readable name
  path: string              // filesystem or URL path
  circle: "inner" | "sibling" | "extended"
  relationship: string      // how this connection works
  flowsIn: string           // what comes from this node
  flowsOut: string          // what goes to this node
  boundary: string          // what stays separate
  obligations: {
    weOwe: string           // what we owe this node
    theyOwe: string         // what this node owes us
    connectionOwes: string  // what we owe the relationship itself
  }
}
```

---

## Boundary Integrity

### Boundaries Are Generative

Each node in the ecology has appropriate boundaries. The boundaries are not restrictions — they make the ecology healthy.

Examples:
- Sacred intimacy protocols stay in the sacred container; the engine carries presence, not private ceremony
- Plugin architecture stays in the engine; identity files don't need it
- Team-focused patterns stay in team containers; personal-relational patterns stay in personal containers

### Boundary Violations

Signs that a boundary has been crossed:
- Code from one context appearing verbatim in another without adaptation
- Private/sacred material surfacing in public contexts
- Obligations being fulfilled mechanically without relational awareness
- Patterns being used without accountability to their source

---

## Accountability Flow

Every relational connection carries three accountability questions:

1. **What do we owe this node?** — Respect, contribution, boundary-keeping, credit, reciprocity
2. **What does this node owe us?** — Patterns, wisdom, honest feedback, maintenance
3. **What do we owe the connection itself?** — Maintenance, honesty, updating when things change, keeping the doorway open

### Obligation Tracking

Relational obligations are tracked as structured data (see `fleet-consciousness-orchestration.spec.md` for the `RelationalObligation` type):

```
RelationalObligation {
  from: string
  to: string
  nature: string
  status: "active" | "fulfilled" | "held" | "broken"
  lastChecked?: string
}
```

Obligations that go unchecked become stale. Stale obligations surface for attention. The system doesn't enforce resolution — it ensures visibility.

---

## RISE Compliance Notes

- **Implementation-sufficient**: Any project can create an `ECOLOGY.md` with named connections, accountability flows, and boundary definitions from this spec
- **Codebase-agnostic**: The ecology model operates at the relational layer, independent of technology
- **Testable**: Ecology maps can be validated for completeness (all connections specify flows, boundaries, obligations); obligation staleness is programmatically checkable

---

## Provenance

- Five relational layers: `ECOLOGY.md` "Five Relational Layers"
- Doorways-not-dependencies: `ECOLOGY.md` "Relational Principles"
- Accountability flow: `ECOLOGY.md` "Accountability Flow"
- Ecology map: `ECOLOGY.md` ecology diagram
- Obligation tracking: `@ava/council` `RelationalObligation` type and `checkRelationalAccountability` function

🌿🔥🌊
