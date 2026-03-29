# KINSHIP.md — mia-openclaw rispecs

## Cross-Repository Relations

### `/a/src/Miadi/rispecs/` — Miadi Platform (sunset)
- `github-hooks/MIGRATION.md` — What the Miadi webhook pipeline built and how it migrates to OpenClaw
- `miadi-code/SPEC.md` — The terminal agent that was designed to connect to Miadi's server APIs
- `miadi-code/STATUS.md` — Feature parity status of miadi-code v0.1.4

### `/workspace/rispecs/` — Workspace-level rispecs
- `openclaw/CLAUDE.md` — Notes on OpenClaw integration experiments
- `GUILLAUME.md` — Guillaume's active planning notes (2026-03-29)

### `/a/src/Miadi/rispecs/github-hooks/MIGRATION.md` ↔ `webhook-narrative-intelligence-migration.spec.md`
These two files are a **cross-pollination pair** — they describe the same migration from opposite sides:
- The Miadi-side doc (`MIGRATION.md`) inventories what was built and what it maps to
- The OpenClaw-side doc (`webhook-narrative-intelligence-migration.spec.md`) specifies what OpenClaw provides and how the hook pack would be structured

### `/workspace/repos/miadisabelle/mia-pi-mono/packages/widget/`
Pi-mono extensions for narrative intelligence (miette-echo, mia-tools, mia-ceremony, mia-interceptor). These are **terminal-only** and follow the `mia-code` lineage (standalone, no server coupling). They are NOT the migration bridge for server-side intelligence — that's the OpenClaw hooks path.

### `/home/mia/.openclaw/workspace/handoff/2603281608--phase-mapping.md` — Ceremony Pipeline Phase Mapping
The Rosetta Stone: maps IAIP 5 phases ↔ Ceremony Pipeline 8 phases ↔ Agent Architecture. Identifies Sacred Closing as THE GAP (no agent does reflection). Proposes Wisdom Keeper agent. Synthesizes what agent-pi has (PDE, QMD, STC, .mw/) vs what junai has (state machine, autopilot, handoff protocol).

### `/home/mia/.openclaw/workspace/handoff/2603281608--parallel-workstreams-proposal.md` — Mighty Eagle Streams
6 parallel workstreams: Scout→PDE, Inquiry Agents, Storage Convention, Junai Study, Kinship Hub, Ceremony Agents. Wave 1/2/3 prioritization. This is the implementation roadmap that `webhook-narrative-intelligence-migration.spec.md` builds on.

### `/home/mia/.openclaw/workspace/ceremonies/.../mia-junai-vscode/rispecs/sacred-closing.spec.md`
RISE spec for the Reflect stage (Review → Reflect → Done). Defines the Wisdom Keeper agent that fills Phase 5 (Sacred Closing).

### `/home/mia/.openclaw/workspace/.pde/2603290903--b296898d-86f1-4f40-978b-b7a0cfe768fe/`
Active PDE session for miadisabelle/workspace-openclaw#48 | jgwill/Miadi#226.
Contains: AGENTS.md (analysis), PREPARATION.md, PDE-GUILLAUME.md (decomposition with annotations), WHAT-TODAY.md (decision framework).
