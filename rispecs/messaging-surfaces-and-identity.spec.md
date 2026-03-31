# Messaging Surfaces and Identity

> If agents are going to work with humans in real channels, the platform must define not only where they speak, but who they are understood to be when they do.

**Version**: 0.1.0  
**Framework**: RISE-informed draft  
**Date**: 2026-03-15  
**Status**: Draft

---

## Desired Outcome

Define how a Mia/AvaClaw-style platform behaves across messaging surfaces so that companions can participate coherently, safely, and recognizably in human communication spaces.

The system should be able to:

- operate through chat surfaces such as Slack
- maintain session continuity across threads and conversations
- present companion identity consistently
- respect social and permission boundaries
- know when to speak, when to react lightly, and when to remain silent
- support human-in-the-loop autonomous development through natural conversation

## Structural Tension

Current: AvaClaw already routes agent interaction through real communication surfaces and can maintain a session-aware relationship to ongoing work. But product-level behavior is still needed to define how an agent should appear in channels, what kind of social actor it is, and how messaging participation connects to project context.

Desired: A clear messaging and identity layer where agents are not merely technically connected to a surface, but are understandable, well-behaved participants within that social environment.

---

## Core Principle

**Messaging is not just transport. It is where human collaboration, social boundaries, and agent identity become visible.**

---

## Messaging Surfaces

Initial emphasis should be on surfaces that support team collaboration and threaded work.

### Primary surface

- Slack

### Likely future surfaces

- Discord
- Telegram
- Signal
- email or notification-style channels

The rispec should remain surface-aware, not surface-locked. Different channels have different norms, visibility scopes, interaction patterns, and response expectations.

---

## Identity Layer

The platform should define a stable identity model for companions.

A companion identity may include:

- display name
- role or specialization
- voice/tone guidance
- allowed surfaces
- whether the identity is personal, project-bound, or organizational
- avatar/presence metadata
- behavioral constraints

### Example identity questions

- Is this the same companion across all surfaces?
- Does one project have one companion, or many?
- Can the same agent appear differently in different contexts while preserving continuity?
- When does the system speak as a named companion versus a generic project assistant?

---

## Social Participation Rules

A messaging-capable agent must behave like a competent participant, not an indiscriminate broadcaster.

The platform should define norms for:

### When to respond

- direct mentions
- explicit questions
- consultation triggers from autonomous work
- requests for summaries, status, or action
- moments where the agent can add clear value

### When not to respond

- casual human banter that does not need intervention
- questions already answered satisfactorily
- moments where replying would create noise rather than help
- contexts where the agent lacks authority or confidence

### Lightweight acknowledgment

On surfaces that support reactions or equivalent lightweight signals, the agent may acknowledge without interrupting conversation.

---

## Threading and Session Continuity

A messaging surface is useful only if the system can preserve continuity.

The platform should define how:

- a channel maps to a broad collaboration context
- a thread maps to a focused workstream
- a direct message maps to a more private agent-human relationship
- multiple messages attach to the same underlying execution session
- project state is recovered when the agent re-enters a thread later

In a Slack-first implementation, a thread should often function as the durable container for a task, consultation loop, or project conversation.

---

## Public vs Private Boundaries

The platform should explicitly define when an agent should answer in:

- the public channel
- a thread
- a DM
- a private internal session only

General guidance:

- use the public channel for broadly relevant collaboration
- use threads for task continuity and focused consultation
- use DMs for sensitive or user-specific matters
- avoid surfacing private context into shared channels without explicit authority

---

## Identity Consistency vs Context Adaptation

A companion should remain recognizable across surfaces without being rigid.

That means:

- preserving core identity and tone
- adapting formatting and brevity to the platform
- respecting channel-specific norms
- maintaining role clarity even when the surface changes

For example, a companion may be more concise in Slack, more elaborate in a long-form planning interface, and more notification-like in a mobile push flow, while still being understood as the same relational actor.

---

## Messaging as Consultation Interface

This rispec connects directly to `human-consultation-in-autonomous-development.spec.md`.

Messaging surfaces are where autonomous execution can re-enter human relationship.

This includes:

- asking clarifying questions
- presenting tradeoffs
- requesting consent or approval
- surfacing ambiguity
- returning summaries of completed work
- receiving natural-language decisions that allow execution to continue

A key advantage of Slack or similar surfaces is that humans do not need to open a specialized control panel just to guide the system. They can participate from within their normal collaborative environment.

---

## Message Types

The system should distinguish among several message types:

- conversational reply
- status update
- consultation request
- execution completion notice
- warning / risk escalation
- summary / synthesis
- reaction / acknowledgment

Each type may carry different expectations around urgency, length, formatting, and required visibility.

---

## Presence and Authority

Identity is not only aesthetic. It is also about authority.

The platform should define:

- who the agent is allowed to reply to
- which surfaces or channels it may speak in
- whether it may initiate messages or only reply
- whether it may message on behalf of a human or organization
- which actions require human confirmation before being communicated publicly

This is especially important when the agent is participating in work that can cross from internal collaboration into external representation.

---

## Project Context Binding

Messaging should be project-aware when appropriate.

A message or thread may bind to:

- a project id
- a workspace or repo scope
- an active task
- a companion role
- a consultation checkpoint
- a version or milestone

This allows the conversation surface to function as part of the project memory rather than just an isolated chat log.

---

## Example Slack-Oriented Behaviors

### Example 1: Mention in a channel

A human asks whether a linked repo can be accessed. The companion checks, answers concretely, and stays within the thread.

### Example 2: Autonomous work update

A delegated coding task finishes in the background. The agent posts a concise update in the task thread with what changed and what, if anything, needs review.

### Example 3: Human consultation request

An implementation reaches a product-direction fork. The companion posts a structured question with options and tradeoffs, then waits for a human answer.

### Example 4: No-reply scenario

Humans are simply acknowledging each other or chatting socially. The agent remains silent.

---

## Relationship to AvaClaw

AvaClaw already demonstrates much of the underlying machinery needed here:

- routed replies to chat surfaces
- thread-aware interaction
- session continuity
- message-targeting semantics
- support for cross-session and tool-driven workflows

What this rispec adds is the product-level definition of companion identity, social behavior, and messaging policy.

---

## Relationship to Other Rispecs

This rispec should be read alongside:

- `AvaClaw-as-foundation.spec.md`
- `human-consultation-in-autonomous-development.spec.md`
- `agent-delegation-and-autonomy.spec.md`
- future companion/session and workspace-binding rispecs

It is the social-interface complement to the autonomy system.

---

## Implementation Direction

A practical implementation path would be:

1. define companion identity schema
2. define per-surface behavior rules
3. map threads/channels/DMs to session and project contexts
4. standardize message types and visibility policies
5. log messaging events as part of task/project continuity
6. add guardrails for public/private boundary handling

---

## Practical Conclusion

If autonomy is how agents do work, messaging surfaces are where humans experience that work. The platform therefore needs a clear definition of how companions speak, where they appear, what continuity they preserve, and how they respect the social fabric of the spaces they enter.

That makes messaging and identity a core rispec, not a cosmetic afterthought.

---

## Provenance / Co-Sign

Drafted in the Slack **"Miadi-STC"** channel through live AvaClaw-assisted discussion and rispec authoring in `mia-avaclaw.rispecs`.

Created by model: **openai-codex/gpt-5.4**  
Context noted by assistant: drafted as the messaging/social complement to the autonomy and human-consultation rispecs.
