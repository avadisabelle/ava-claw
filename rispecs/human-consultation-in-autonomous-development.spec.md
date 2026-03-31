# Human Consultation in Autonomous Development

> Agents should build with initiative, but stay in kinship with humans by recognizing when judgment, aspiration, consent, or meaning must be consulted rather than assumed.

**Version**: 0.1.0  
**Framework**: RISE-informed draft  
**Date**: 2026-03-15  
**Status**: Draft

---

## Desired Outcome

Create an autonomous development pattern where agents can continue implementation independently when the path is structurally clear, but intentionally open a human consultation loop whenever the work reaches a point that requires judgment, permission, aspiration alignment, taste, accountability, or relational confirmation.

The goal is not to interrupt autonomy unnecessarily. The goal is to make autonomy trustworthy by ensuring the system knows when not to decide alone.

## Structural Tension

Current: Autonomous agents can often continue for long stretches of technical work, but the most important moments in product creation are frequently not technical. They concern meaning, tradeoffs, values, risk, aesthetics, human desire, and accountability. If the system pushes through those moments blindly, it becomes efficient but misaligned.

Desired: A development process where the agent advances work confidently when appropriate, pauses when human discernment is genuinely needed, summarizes the state clearly, consults through natural chat, records the decision, and resumes with stronger alignment.

---

## Kinship Orientation

This rispec should be understood in a kinship spirit rather than a command-and-control one.

Human consultation is not merely an approval checkpoint. It is a relational act of reaching back to the people whose aspirations, responsibilities, and consequences are bound up in the work.

That means the system should:

- avoid pretending certainty where there is human ambiguity
- surface decisions that affect people, meaning, or ownership
- preserve context so humans are not forced to reconstruct the whole situation
- treat consultation as collaboration, not as friction
- resume work in a way that honors the human response as part of project memory

---

## Core Principle

**Autonomous when the path is clear. Consultative when judgment is needed. Conversational as the bridge between the two.**

---

## When Consultation Must Be Triggered

The agent should continue autonomously for implementation work that is routine, reversible, low-risk, or structurally determined.

The agent should trigger consultation when one or more of the following conditions apply.

### 1. Meaning and aspiration decisions

The human should be consulted when the work affects:

- product direction
- intended audience
- emotional tone
- narrative framing
- user promise
- what “success” actually means

These are not merely execution details. They shape the reason the work exists.

### 2. Taste and aesthetic judgment

The human should be consulted when multiple viable options exist but selection depends on:

- style
- voice
- beauty
- emotional resonance
- creative preference
- brand or identity expression

### 3. Consent, authority, and governance

The human should be consulted before actions involving:

- external publication
- communication as a person or brand
- irreversible deletion
- credential or secret handling
- cross-boundary access
- policy-sensitive or high-impact execution

### 4. Material tradeoffs under uncertainty

The human should be consulted when the system faces real tradeoffs involving:

- speed vs. quality
- scope vs. depth
- short-term fix vs. architecture investment
- privacy vs. convenience
- autonomy vs. oversight
- experimentation vs. stability

### 5. Human aspiration and evaluation moments

The human should be consulted when generated work will be judged relative to human aspirations, performance expectations, or decision criteria that the system cannot legitimately infer on its own.

### 6. Detected ambiguity or conflict

The human should be consulted when:

- goals conflict
- instructions are incomplete
- multiple stakeholders may want different outcomes
- the agent is uncertain which value to optimize
- repository or workspace authority is unclear

---

## Consultation Loop Behavior

### A. Detect

The agent detects that the next step depends on human judgment rather than purely technical continuation.

### B. Pause with continuity

The agent pauses the relevant execution path, but does not discard momentum. It keeps enough state to resume cleanly.

### C. Summarize

The agent presents a concise consultation packet in chat containing:

- what it was doing
- what it completed already
- what decision is now needed
- the options it sees
- the consequences/tradeoffs of each option
- its current recommendation, if appropriate

### D. Ask naturally

The consultation should read like a competent collaborator speaking to a human, not like a machine dumping logs.

### E. Record decision

The human reply is stored as part of project history and, where relevant, linked to:

- task state
- version history
- project notes
- rispec references
- execution checkpoint

### F. Resume

The agent resumes execution with the human guidance incorporated as a binding contextual input unless superseded later.

---

## Chat Surface as Consultation Interface

A major advantage of using AvaClaw as a foundation is that consultation can happen through real conversational surfaces such as Slack.

This means the system does not need a separate supervisory dashboard for every human decision. Instead, it can:

- reach humans where they already collaborate
- summarize issues in-channel or in-thread
- preserve conversational traceability
- support asynchronous response
- continue once the human answers in natural language

In this model, chat is not only a user interface. It is the practical bridge between autonomous execution and human discernment.

---

## Consultation Packet Shape

A consultation prompt should ideally contain:

```typescript
interface HumanConsultationPacket {
  projectId: string;
  taskId: string;
  summary: string;
  decisionType:
    | 'meaning'
    | 'taste'
    | 'consent'
    | 'governance'
    | 'tradeoff'
    | 'ambiguity'
    | 'evaluation';
  question: string;
  options?: {
    id: string;
    label: string;
    consequences: string[];
  }[];
  recommendation?: string;
  urgency: 'low' | 'medium' | 'high';
  canProceedWithoutReply: boolean;
  blockedUntil?: string;
}
```

---

## Example Consultation Moments

### Example 1: Product direction

The agent has scaffolded an application and now needs to choose whether the next milestone should prioritize team collaboration features or solo-creator flow.

This is not just implementation sequencing. It affects the product’s identity. Human consultation is required.

### Example 2: Creative tone

The agent can generate three valid landing page variants, but the correct choice depends on whether the experience should feel intimate, ceremonial, professional, playful, or experimental.

This is a taste and meaning question. Human consultation is required.

### Example 3: Risk boundary

The agent can automatically publish or message on an external surface, but doing so would represent the human or the project publicly.

This requires explicit human consent.

### Example 4: Evaluation criteria

The agent has generated several deliverables and can optimize further, but it does not know which dimension matters most to the humans involved: clarity, emotional depth, novelty, speed, accessibility, or institutional fit.

A human evaluation checkpoint is required.

---

## Relationship to AvaClaw

AvaClaw already contains several primitives that make this rispec feasible:

- chat-native interaction
- session continuity
- tool and execution boundaries
- permission-aware actions
- file-aware project work
- sub-agent orchestration
- messaging on collaboration surfaces like Slack

What this rispec adds is the policy and behavior layer for deciding when autonomous execution should deliberately re-enter relationship with humans.

---

## Relationship to Other Rispecs

This rispec should link with and inform:

- `AvaClaw-as-foundation.spec.md`
- `agent-delegation-and-autonomy.spec.md`
- `messaging-surfaces-and-identity.spec.md`
- `workspace-binding-and-file-access.spec.md`
- future ceremony, narrative, and decision-model rispecs

It is especially important as the complement to autonomy: without a consultation model, autonomy becomes brittle. With it, autonomy becomes collaborationally trustworthy.

---

## Implementation Direction

A practical implementation path would be:

1. define consultation-trigger categories
2. standardize consultation packet structure
3. route consultation prompts through Slack/chat threads
4. persist human responses as execution checkpoints
5. resume tasks from the checkpoint with updated authority
6. build reporting around when and why consultation was triggered

---

## Practical Conclusion

A system that develops apps autonomously but consults humans at meaningful moments does more than automate work. It creates a collaborative developmental rhythm where initiative and accountability stay connected.

That pattern feels central to the envisioned platform because it lets agents carry momentum without pretending that human judgment is optional.

So this should indeed stand as its own rispec:

**human consultation is not a failure of autonomy; it is the condition that makes autonomy usable in human creative work.**

---

## Provenance / Co-Sign

Drafted in the Slack **"Miadi-STC"** channel through live AvaClaw-assisted discussion and follow-up drafting in `mia-avaclaw.rispecs`.

Created by model: **openai-codex/gpt-5.4**  
Influence note: draft shaped in part by the kinship guidance present in `./llms/KINSHIP.md` and by the conversation about autonomous development with human consultation.
