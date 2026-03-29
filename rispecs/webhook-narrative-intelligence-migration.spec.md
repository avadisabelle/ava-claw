# Webhook Narrative Intelligence — Migration from Miadi to OpenClaw

> What the Miadi platform built as server-side intelligence, and how OpenClaw's existing webhook + hooks infrastructure can receive it.

**Version**: 0.1.0  
**Framework**: RISE v1.2  
**Date**: 2026-03-29  
**Status**: Draft  
**Ref**: miadisabelle/workspace-openclaw#48 | jgwill/Miadi#226

---

## Desired Outcome

When a GitHub event occurs (push, issue created, label applied, STC bot mention), OpenClaw receives it through its webhook hooks system, transforms the payload through a narrative intelligence layer, and either:
- Spawns an isolated agent turn that produces context, missions, or STC file updates
- Wakes the main agent session with enriched narrative context
- Delivers a summary to any messaging channel (Telegram, Discord, etc.)

The developer's workspace stays alive — repos auto-pulled, rispecs indexed, STC files updated — without needing to maintain a separate Next.js server.

## Structural Tension

**Current Reality**: The Miadi platform (`/a/src/Miadi`) built a working webhook pipeline:
```
GitHub → POST /api/workflow/webhook → GitHubWebhookETL → Redis → .github-hooks/{event} → scripts
```
This works but lives inside a Next.js app that is being sunset. The intelligence scripts (`miette_newsession_context.sh`, `miette_claude_plan_perspective_claude.sh`, `narrative_processor.sh`) run `claude --print` non-interactively to produce context. The push hook auto-pulls repos. The STC hooks append observations to workspace files. But: Guillaume never reached the full vision — the pipeline is partially complete and the server is hard to maintain.

**Desired State**: The same intelligence lives inside OpenClaw's existing webhook system — no custom server needed. OpenClaw's `hooks.mappings` + `transform.module` replace the ETL layer. OpenClaw's `/hooks/agent` replaces spawning bash scripts that call `claude --print`. OpenClaw's delivery system replaces "nothing" — Miadi never had multi-channel delivery of webhook intelligence.

---

## What Miadi Built (Inventory of Intelligence)

### Working Webhook Hooks (`.github-hooks/`)

| Hook | What It Does | Status |
|------|-------------|--------|
| `push` | Auto-clones/pulls `/workspace/repos/{owner}/{repo}`, triggers narrative processor | ✅ Working |
| `newsessionuuid` | Pre-launch context: decomposes prompt, creates CONTEXT.md + MISSION before session starts | ✅ Partially working |
| `issues` | Three-universe analysis (Engineer/Ceremony/Story) on issue events, milestone handler | ✅ Working |
| `issue_comment` | Processes comments on issues | ✅ Basic |
| `stc` | Unified STC handler — resolves workspace, processes STC files | ⚠️ Partially working |
| `stcgoal` | Appends goal observations from GitHub events to STCGOAL.md | ⚠️ Partially working |
| `stcissue` | Appends issue observations to STCISSUE.md | ⚠️ Partially working |
| `stcmastery` | Appends mastery observations to STCMASTERY.md | ⚠️ Partially working |
| `label` | Processes label events | ✅ Basic |
| `installation` | Handles GitHub App installation (auto-clone) | ✅ Working |
| `pde-received` | Processes PDE decomposition webhooks | ⚠️ Experimental |

### Intelligence Scripts (`/scripts/`)

| Script | What It Does | How It Works |
|--------|-------------|-------------|
| `miette_newsession_context.sh` | Before a Claude session starts, reads the prompt, decomposes it, creates CONTEXT.md and MISSION.md | Runs `claude --print` non-interactively with a carefully crafted prompt |
| `miette_claude_plan_perspective_claude.sh` | After a plan is created, generates Mia's structured summary + Miette's narrative echo + creates STC | Runs `claude --print` on the plan file |
| `generate_milestone_context.sh` | For milestone-bound issues, clones repo, generates comprehensive analysis context | Orchestrates Claude Code for milestone analysis |
| `narrative_processor.sh` | Three-universe analysis on any webhook event (Engineer/Ceremony/Story perspectives) | Background process, creates story beats in Redis + Langfuse traces |
| `mino-bimaadizi-daa-stc.sh` | Ceremony-safe STC bot processing with recursion guard (Ojibwe-informed DSL seed) | Never completed — seed of Indigenous-informed state encoding |

### API Endpoints Worth Preserving (as contracts)

| Endpoint | Purpose | Migration Path |
|----------|---------|---------------|
| `POST /api/workflow/webhook` | GitHub webhook receiver + ETL | → `POST /hooks/github` (OpenClaw mapped hook) |
| `GET /api/stc/workspaces` | Resolve repo → local workspace path | → OpenClaw workspace config or skill |
| `GET /api/stc/charts` | List STC charts | → coaia-narrative CLI or MCP tool |
| `POST /api/pde/decompose` | PDE decomposition | → miaco CLI or pi-mono extension tool |
| `GET /api/pde/list` | List PDE sessions | → `.pde/` filesystem scan |
| `POST /api/ceremony/webhook` | Ceremony event processing | → OpenClaw hook with ceremony transform |

---

## What OpenClaw Already Provides

### Webhook Ingress (`docs/automation/webhook.md`)

OpenClaw's webhook system maps directly onto what Miadi needed:

| Miadi Need | OpenClaw Feature | How |
|-----------|-----------------|-----|
| Receive GitHub webhooks | `POST /hooks/<name>` mapped endpoints | `hooks.mappings` config with `match.path` or `match.source` |
| ETL transform payload | `transform.module` in mapping config | Custom TypeScript module loaded from `hooks.transformsDir` |
| Spawn agent with context | `POST /hooks/agent` — isolated agent turn | `action: "agent"` in mapping, with `message`, `sessionKey`, `model` |
| Wake main session | `POST /hooks/wake` — system event | `action: "wake"` in mapping, with `text` and `mode` |
| Auth | Bearer token, rate limiting | `hooks.token` config |
| Multi-channel delivery | `deliver: true` + `channel` + `to` | Agent response → WhatsApp, Telegram, Discord, Slack, etc. |

### Internal Hooks (`docs/automation/hooks.md`)

OpenClaw's internal hook events map onto miadi-code's lifecycle:

| miadi-code Event | OpenClaw Hook Event | Use Case |
|-----------------|--------------------|---------| 
| `newsessionuuid` | `command:new` | Pre-launch context generation when `/new` is issued |
| Session compaction | `session:compact:before/after` | Save narrative state before compaction |
| Agent bootstrap | `agent:bootstrap` | Inject STC files, rispecs, KINSHIP.md as bootstrap context |
| Message received | `message:received` | Process incoming messages through three-universe lens |
| Gateway startup | `gateway:startup` | Run `BOOT.md` — initialize workspace, check STC state |

### Hook Packs (npm installable)

A `miadi-hooks` npm package could bundle all the narrative intelligence:

```
miadi-hooks/
├── HOOK.md                    # Pack metadata
├── package.json               # openclaw.hooks: [...]
├── hooks/
│   ├── github-webhook/        # GitHub event → narrative processing
│   │   ├── HOOK.md
│   │   ├── handler.ts         # Mapped webhook handler
│   │   └── transforms/
│   │       ├── push.ts        # Auto-pull + narrative processor
│   │       ├── issues.ts      # Three-universe issue analysis
│   │       └── stc.ts         # STC file processing
│   ├── session-narrative/     # Session lifecycle narrative
│   │   ├── HOOK.md
│   │   └── handler.ts         # command:new → context generation
│   └── ceremony-bootstrap/    # Inject ceremony context
│       ├── HOOK.md
│       └── handler.ts         # agent:bootstrap → STC files + rispecs
└── transforms/
    └── github-etl.ts          # Shared ETL logic (from Miadi's GitHubWebhookETL)
```

Install: `openclaw hooks install miadi-hooks`

---

## What PDE Replaced (The Scripts Were Seeds)

The intelligence scripts are not being "ported" — they **germinated** patterns that PDE and the Mighty Eagle agent topology now embody natively.

| Old Script | What It Really Was | What Replaces It | Agent Role |
|-----------|-------------------|-----------------|------------|
| `miette_newsession_context.sh` | Sacred Preparation — decompose before acting | **PDE Decompose** as first act of every agent chain | Scout (East 90°) |
| `miette_claude_plan_perspective_claude.sh` | Reflection — dual perspective (Mia structured + Miette narrative) | **Miette Echo** (live, per-response) + **Wisdom Keeper** agent (end-of-cycle) | Wisdom Keeper (North 0°) |
| `narrative_processor.sh` | Three-universe event analysis | **Three-universe system prompt** in pi-mono extensions OR OpenClaw hook transform | All agents (prompt-level) |
| `generate_milestone_context.sh` | Pre-load context for milestone work | **Structural Inquiry** phase — agents fan out to read files, search QMD | Planner + Specialist agents (South 180°) |

The tracing/memory that these scripts created (Langfuse traces, MISSION.md, Redis storage) is now handled by:
- **PDE output** (`.pde/{uuid}.json` + `.md`) — structured, queryable decompositions
- **QMD** (7309 vectors, 2751 files) — semantic memory across all repos
- **STC** (coaia-narrative) — structural tension tracking
- **`.mw/` workspace** — directional storage per ceremony phase

The beloved `miette_perspective.md` aesthetic — Mia's structured summary + Miette's emotional read — could become an **OpenClaw hook handler**: on `session:compact:after` or plan detection, generate the dual-perspective document.

See: `/a/src/Miadi/rispecs/github-hooks/MIGRATION.md` section "What PDE Replaced" for the full analysis.

---

## Mighty Eagle Agent Topology

From the ceremony pipeline mapping (miadisabelle/workspace-openclaw#46, commits 347a779 + b41ab58), the agent architecture that lives inside OpenClaw:

```
IAIP Phase           → OpenClaw Implementation         → Hook/Event
───────────────────────────────────────────────────────────────────
Sacred Preparation   → Scout agent runs PDE             → command:new / webhook trigger
Opening Circle       → Planner generates inquiry        → agent:bootstrap (inject .mw/ context)
Active Ceremony      → Builder/Specialist fan-out       → /hooks/agent (isolated turns)
Integration          → Reviewer + MMOT evaluation       → session:compact:before
Sacred Closing       → Wisdom Keeper (THE GAP to fill)  → session:compact:after / custom hook
```

Agent types in OpenClaw context:
- **Main-pipeline**: Scout → Planner → Builder → Reviewer → Wisdom Keeper (via agent chain or sequential hook runs)
- **Specialist-branch**: Web search, Academic, GitHub, QMD semantic (fan out via `/hooks/agent` isolated turns during Active Ceremony)
- **Utility**: QMD indexer (cron or `gateway:startup`), STC manager (webhook transform), ceremony-governor (relational quality — Stream E)

---

## Migration Flow (Vision)

### Phase 1: GitHub Push → Auto-Pull (proven pattern)
```
GitHub push event
    → POST /hooks/github (mapped)
    → transforms/push.ts:
        - Parse payload (branch, commits, pusher)
        - git pull /workspace/repos/{owner}/{repo}
        - Log to workspace
    → Response: "✅ {repo} updated, {n} commits pulled"
```

### Phase 2: Issue Events → Three-Universe Analysis
```
GitHub issue event  
    → POST /hooks/github (mapped, match.source: "issues")
    → transforms/issues.ts:
        - Extract issue metadata
        - Format three-universe prompt (Engineer/Ceremony/Story)
    → /hooks/agent (isolated turn):
        - Agent analyzes issue through three lenses
        - Creates story beat
        - Updates STC if workspace mapped
    → deliver: true → Telegram/Discord notification
```

### Phase 3: Session Lifecycle → Narrative Context
```
User issues /new in OpenClaw
    → command:new hook fires
    → session-narrative handler:
        - Read previous session context
        - Generate MISSION.md for new session
        - Decompose prompt via PDE
        - Inject as bootstrap context
    → Agent starts with full narrative awareness
```

### Phase 4: STC Bot Processing
```
GitHub issue comment mentioning @stcgoal
    → POST /hooks/github (mapped, match.source: "stc")
    → transforms/stc.ts:
        - Detect which STC bot was mentioned
        - Resolve workspace path
        - Append observation to STCGOAL.md / STCISSUE.md / STCMASTERY.md
    → /hooks/agent (optional):
        - Agent reviews updated STC file
        - Suggests next action steps
    → deliver: true → notify developer
```

---

## KINSHIP

| Related Location | What It Contains | Relationship |
|-----------------|-----------------|-------------|
| `/a/src/Miadi/.github-hooks/` | Original webhook handlers (bash) | Source of intelligence being migrated |
| `/a/src/Miadi/scripts/` | Intelligence scripts (miette_*, narrative_*) | Source of agent prompts and patterns |
| `/a/src/Miadi/rispecs/` | Original RISE specs for miadi-code and platform | Cross-reference: updated with OpenClaw migration notes |
| `/a/src/Miadi/rispecs/github-hooks/` | Stub — to be upgraded with migration reference |  |
| `/a/src/Miadi/app/api/workflow/webhook/route.ts` | Original webhook receiver + ETL | Reference implementation for transform modules |
| `/a/src/Miadi/lib/github-webhook-etl.ts` | ETL transform logic | Port to `transforms/github-etl.ts` |
| `/a/src/Miadi/lib/stc-bot-detector.ts` | STC bot mention detection | Port to `transforms/stc.ts` |
| `/workspace/repos/miadisabelle/mia-pi-mono/packages/widget/` | Pi-mono extensions (mia-tools, miette-echo, mia-ceremony) | Different lineage — terminal-only, no server coupling |
| `/a/src/mia-code/widget/` | Same as above (symlinked) | ⚠️ NOT the migration bridge — see distinction document |
| `/home/mia/.openclaw/workspace/.pde/2603290903--b296898d-86f1-4f40-978b-b7a0cfe768fe/` | This PDE session's working documents | Active planning |
| `/workspace/rispecs/` | Workspace-level rispecs including OpenClaw evaluation | Cross-reference |
| `docs/automation/webhook.md` | OpenClaw webhook documentation | The infrastructure this spec builds on |
| `docs/automation/hooks.md` | OpenClaw internal hooks documentation | The lifecycle events this spec maps onto |

---

*This rispec was written during a cross-pollination session between the Miadi platform (`/a/src/Miadi`) and the MiaOpenClaw fork (`/workspace/repos/miadisabelle/mia-openclaw`). The knowledge flows both ways — see the corresponding update in `/a/src/Miadi/rispecs/` for the Miadi-side perspective.*
