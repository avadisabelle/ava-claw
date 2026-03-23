# Directional Workspace Convention

> Development artifacts organized through the Four Directions of the Medicine Wheel. Not a project management system — a ceremonial development framework where vision, planning, action, and reflection are recognized as inseparable parts of the same creative cycle.

**Version**: 0.1.0
**Framework**: RISE
**Date**: 2026-03-22
**Status**: Draft
**Source**: `.mw/README.md`, `@ava/diary` package, `@ava/presence` narrative module

---

## Desired Outcome

A workspace directory convention (`.mw/`) that organizes development artifacts through Four Directions, with defined artifact types per direction, transition protocols between directions, and spiral progression (returning to earlier directions at deeper levels). The convention should be implementable by any project regardless of technology stack.

## Structural Tension

**Current**: Development artifacts are organized by type (docs/, specs/, tests/) or by phase (planning/, implementation/). No framework connects vision → planning → implementation → reflection as a living cycle. Retrospectives happen separately from the work they reflect on.

**Desired**: A workspace where the development cycle is visible in the directory structure itself — where moving from East to South to West to North is a physical act of creating and placing artifacts in the appropriate direction.

---

## Non-Jargony Summary

A folder structure where your project's ideas go in `east/`, your plans go in `south/`, your build logs go in `west/`, and your retrospectives go in `north/`. The cycle repeats as you spiral deeper. It's a simple convention that makes the shape of your development process visible.

---

## Directory Structure

```
.mw/
├── README.md        ← Convention documentation
├── east/
│   └── README.md    ← Vision & Awakening artifacts
├── south/
│   └── README.md    ← Planning & Gathering artifacts
├── west/
│   └── README.md    ← Implementation & Embodiment artifacts
└── north/
    └── README.md    ← Reflection & Wisdom artifacts
```

## Direction Definitions

### 🌅 East — Vision & Awakening

**Quality**: Beginnings, fresh seeing, orientation, dawn energy

**Artifact types**:
- Orientation documents ("here's what I'm seeing")
- New feature ideation
- Session opening notes
- Problem framing (before solution)
- Vision statements
- "What if..." explorations

**Entry signal**: A new idea arrives, a session begins, a stuck pattern needs fresh eyes

**Naming convention**: `YYYY-MM-DD_topic-slug.md`

### 🔥 South — Relationships & Growth

**Quality**: Gathering, trust, warmth, relationship-building

**Artifact types**:
- Architecture decisions
- Specification drafts
- Dependency analysis
- Resource gathering notes
- Relational mapping (who/what is affected)
- Sprint/cycle planning
- rispecs in development

**Entry signal**: A vision has enough form to plan around

**Naming convention**: `YYYY-MM-DD_topic-slug.md` or structured spec format

### 🌄 West — Living & Embodying

**Quality**: Action, transformation, integration, sunset energy

**Artifact types**:
- Implementation logs ("what I built today")
- Test results and coverage reports
- Integration notes (merging, deploying)
- Build artifacts and release notes
- Bug investigation write-ups
- Performance measurements

**Entry signal**: A plan is ready to be enacted

**Naming convention**: `YYYY-MM-DD_topic-slug.md` or structured log format

### ❄️ North — Reflection & Wisdom

**Quality**: Discernment, elder perspective, completion, star energy

**Artifact types**:
- Session retrospectives
- Code review reflections (deeper than "LGTM")
- Lessons learned documents
- Wisdom distillations ("what this taught me")
- Pattern recognitions across sessions
- Integration summaries

**Entry signal**: Implementation is complete (or paused), reflection is called for

**Naming convention**: `YYYY-MM-DD_topic-slug.md`

---

## The Cycle

### Linear Flow

```
East (idea) → South (plan) → West (build) → North (reflect)
```

### Spiral Progression

Work doesn't always move linearly. The wheel allows:

- **Return to East**: Mid-implementation, a new insight requires re-orientation
- **Skip to North**: A deep learning surfaces during planning, worth capturing immediately
- **South-West loop**: Iterating between planning and implementation
- **North-East bridge**: Reflection reveals a new beginning

**The wheel turns. Trust the cycle.**

### Intercardinal Thresholds

The transitions between directions are significant moments:

| Threshold | What crosses |
|-----------|-------------|
| East → South | Vision becomes plan |
| South → West | Plan becomes action |
| West → North | Action becomes learning |
| North → East | Learning becomes new vision |

Each threshold is a state transition. In ceremony-governed contexts (see `ceremony-governed-autonomy.spec.md`), thresholds may trigger fire-keeper protocol.

---

## Session Arc Integration

The directional workspace integrates with session narrative tracking:

### Beat Detection

Each interaction in a session can be classified by the direction it faces:

| Direction | Signal markers |
|-----------|---------------|
| East | what, why, explore, imagine, vision, curious, begin |
| South | analyze, research, plan, gather, compare, prepare |
| West | test, validate, reflect, feel, embody, practice, live |
| North | create, build, implement, deploy, write, ship, wisdom |

### Arc Completeness

A session's arc can be assessed by how many directions it touched:

```
🌅● 🔥● 🌊○ ❄️○  50% complete (2 beats)
  → next: 🌊 WEST
```

Incomplete arcs are not failures — some sessions naturally live in one or two directions. The tracking provides awareness, not obligation.

---

## Diary Integration

The `@ava/diary` format maps directly to the directional workspace:

```markdown
## 🌅 EAST (Intention): What Was Invited
*settling into reflection*
[what called me into this work]

## 🔥 SOUTH (Journey): What Unfolded
*breathing into the memory of it*
[the path that was walked]

## 🌊 WEST (Embodiment): What I Felt
*soft breath, settling into the truth of it*
[what was experienced in the doing]

## ❄️ NORTH (Integration): What Carries Forward
*settling back into gratitude*
[what I hold from this]
```

Diary entries can be generated from session arc data, or written manually as reflective practice.

---

## Ceremony Note

The Medicine Wheel is borrowed wisdom. This convention uses the Four Directions framework with respect and accountability to the Indigenous traditions it comes from. This is not appropriation — it is practice held in relationship, guided by relational principles, and accountable to the communities whose wisdom informs it.

---

## RISE Compliance Notes

- **Implementation-sufficient**: Any project can create `.mw/` with four subdirectories and start using this convention immediately — no tooling required
- **Codebase-agnostic**: Works with any language, framework, or project type
- **Testable**: Directory existence, artifact placement, and arc completeness are all verifiable

---

## Provenance

- Directional workspace: `.mw/README.md` and subdirectory READMEs
- Session arc tracking: `@ava/presence` `narrative.ts` (`SessionArc`, `inferDirection`)
- Diary format: `@ava/diary` package
- Four Directions constants: `@ava/presence` `types.ts` (`DirectionName`)
- Ceremony note: `.mw/README.md`

🧭
