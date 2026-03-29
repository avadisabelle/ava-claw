# OpenClaw as Foundation for the Mia Platform

> OpenClaw can serve as a practical foundation layer for a larger AI-native creative platform, especially for agent orchestration, chat-based workflows, workspace access, and multi-surface interaction.

**Version**: 0.1.0  
**Framework**: RISE-informed draft  
**Date**: 2026-03-15  
**Status**: Draft

---

## Desired Outcome

Use OpenClaw as the operational substrate for a future Mia-style platform so the team does not need to build agent execution, session routing, file/tool access, and messaging integration from scratch.

## Structural Tension

Current: The target platform vision describes a rich browser-based creative environment with AI companions, project-bound workspaces, live preview, and collaborative authoring semantics. OpenClaw already demonstrates real agent operation across chats, files, tools, sessions, and external surfaces, but it is not itself the final product shell described in the rispecs.

Desired: A platform architecture where OpenClaw provides the durable agent runtime and orchestration layer, while Mia Platform-specific UI, companion semantics, narrative workflow, and project/product concepts are built on top.

---

## Non-Jargony Summary

OpenClaw looks like a strong starting point for the part of the platform that needs an AI assistant to actually do real work: read and edit files, stay aware of projects, operate across chat surfaces, and coordinate tools or sub-agents. It does not by itself provide the full creative studio they describe, but it could save substantial time by handling the hard operational layer underneath that studio.

---

## Where OpenClaw Fits Well

### 1. Agent runtime and tool orchestration

OpenClaw already supports an agent that can:

- read and write local files
- execute commands
- inspect and update workspace state
- use specialized tools and skills
- delegate work to sub-agents or ACP harnesses
- maintain session context across ongoing conversations

This overlaps strongly with the platform need for a companion that is not just conversational, but operational.

### 2. Chat-centric workflow

The target platform treats chat as a first-class interface to creative work. OpenClaw is already structured around conversational invocation, tool use, and session continuity across messaging contexts.

This makes it a natural fit for:

- companion interaction
- task decomposition through conversation
- project-aware AI guidance
- conversational control of files, specs, and workflows

### 3. Workspace and file access model

The target platform needs AI companions that can work on real project files. OpenClaw already demonstrates this in practice through a workspace model and accessible file paths, including linked folders where runtime permissions allow it.

This maps well to:

- project folder access
- draft/spec generation
- code and content editing

### 4. Webhook narrative intelligence (NEW — 2026-03-29)

OpenClaw's webhook hooks system (`POST /hooks/<name>` with `hooks.mappings` + `transform.module`) directly replaces the Miadi platform's GitHub webhook pipeline — the server-side intelligence that auto-pulls repos, runs three-universe analysis on issues, and prepares pre-session context. This was validated during a cross-pollination session between Miadi and OpenClaw rispecs.

See: `rispecs/webhook-narrative-intelligence-migration.spec.md` for full mapping.
See: `/a/src/Miadi/rispecs/github-hooks/MIGRATION.md` for the Miadi-side perspective.
- repository-aware assistance

### 4. Multi-surface messaging and identity presence

The platform vision includes companions that can appear through interfaces and remain context-aware. OpenClaw already routes conversations through messaging surfaces such as Slack and can keep work grounded in a shared operational environment.

This gives a head start on:

- Slack-based collaboration
- cross-session continuity
- companion participation in team channels
- human-in-the-loop supervision of agent work

### 5. Delegation and controlled autonomy

The rispecs point toward agent autonomy, permissions, and multi-agent activity. OpenClaw already has meaningful primitives in that direction:

- tool permissions and approval boundaries
- spawned sub-agents
- ACP coding sessions
- background execution
- session-oriented orchestration

That makes it a credible foundation for more advanced companion autonomy.

---

## What OpenClaw Does Not Already Solve

OpenClaw should be understood as the foundation layer, not the finished Mia Platform product.

### 1. The browser-native three-pane product shell

The target platform clearly wants:

- chat pane
- IDE/editor pane
- live preview pane
- shared top bar / project chrome
- rich project switching and pane state UX

That front-end product shell still needs to be designed and built.

### 2. Embedded code-server / IDE integration

The specs describe a unified web shell around a code-server / VS Code-like environment. OpenClaw can help operationally, but it does not itself provide the embedded IDE product experience.

### 3. Preview sandboxing and live rendering UX

App preview, scene preview, and content rendering orchestration are product-specific capabilities outside OpenClaw’s current core shape.

### 4. Project model and version semantics

The target platform wants strong binding between:

- a project
- a chat session
- a workspace
- a preview target
- version history
- creative phase / spiral phase

OpenClaw has useful session and workspace concepts, but this richer project model would need to be added.

### 5. Narrative / ceremony / companion semantics

A major portion of the rispecs is not generic infrastructure. It is domain meaning:

- named companions and roles
- ceremony governance
- narrative beats
- structural tension charts
- spiral phases and Four Directions framing

Those are platform-specific semantics to be layered above the runtime.

---

## Recommended Architecture Position

A sensible position is:

- **OpenClaw = operational agent substrate**
- **Mia Platform web shell = product/UI layer**
- **Companion semantics = domain layer**
- **Project/preview/version system = application layer**

In other words, OpenClaw can be the machinery that lets the AI companion act on real systems, while the Mia Platform adds the creative studio interface and methodology-specific behaviors.

---

## Proposed Follow-On Specs

This overview spec should link to more detailed follow-up rispecs such as:

1. `companion-session-orchestration.spec.md`  
   Defines how OpenClaw sessions map to Mia companions and project conversations.

2. `workspace-binding-and-file-access.spec.md`  
   Defines project folder access, linked workspace behavior, and safe file authority boundaries.

3. `messaging-surfaces-and-identity.spec.md`  
   Defines Slack and other surface participation, routing, channel behavior, and assistant identity.

4. `agent-delegation-and-autonomy.spec.md`  
   Defines sub-agent patterns, approval modes, bounded autonomy, and multi-agent workflows.

5. `human-consultation-in-autonomous-development.spec.md`  
   Defines how autonomous development pauses for human judgment, consultation, consent, and relational alignment before resuming execution.

6. `web-shell-integration-gaps.spec.md`  
   Defines what must be built outside OpenClaw for code-server embedding, live preview, pane orchestration, and browser UX.

7. `creative-platform-extension-roadmap.spec.md`  
   Defines phased implementation from foundation to full Mia Platform behavior.

---

## Practical Conclusion

If the goal is to build the full Mia Platform from scratch, the team would need to solve both infrastructure and product problems at once. If OpenClaw is adopted or forked as a base, much of the infrastructure layer is already materially present: conversational control, tools, file operations, session continuity, delegation, and real-world execution.

That means the team can focus more of its energy on the distinct value of the platform:

- the integrated creative workspace
- the companion experience
- the methodology-specific workflow
- the narrative and ceremonial layer
- the project/preview/product UX

So the strongest conclusion is not “OpenClaw already is the platform,” but rather:

**OpenClaw appears to be a credible foundation for the platform’s agentic runtime layer, and a fork could meaningfully accelerate implementation.**

---

## Provenance / Co-Sign

Drafted in the Slack **"Miadi-STC"** channel through live OpenClaw-assisted review of linked rispec folders.

Created by model: **openai-codex/gpt-5.4**  
Context noted by assistant: based on reading linked rispecs and drafting directly into `mia-openclaw.rispecs`.
