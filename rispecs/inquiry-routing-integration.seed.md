# SEED — Inquiry Routing Integration for ava-claw

> Status: 🌱 Seed (future-oriented, not an implementation spec)
> Upstream: `ava-langchain-inquiry-routing@0.1.0`, `ava-langgraph-inquiry-routing-engine@0.1.0`

## Desired Outcome

ava-claw's agentic presence layer consumes the inquiry-routing engine to transform user interactions into structured, relationally-grounded inquiries before dispatching to knowledge channels. When a user prompt arrives, ava-claw decomposes it via PDE, then routes the resulting inquiries through the `InquiryRoutingGraph` — honoring `ceremony_hold` when the content touches Indigenous/ceremonial domains.

## Current Reality

- ava-claw handles prompt decomposition but dispatches to tools/agents without structured inquiry routing
- Routing decisions are made per-turn by the agent, not by a keyword-classified pipeline
- No relational accountability gate exists in the agentic flow

## Structural Tension

ava-claw has _agency_ (the ability to act) but lacks _discernment infrastructure_ (structured inquiry routing with relational gates). The tension between autonomous action and accountable inquiry resolves through integrating the inquiry-routing engine as a pre-dispatch stage.

## Integration Path

1. **Add peer dependencies:**
   - `ava-langchain-inquiry-routing: >=0.1.0`
   - `ava-langgraph-inquiry-routing-engine: >=0.1.0`

2. **Pre-dispatch hook:** After PDE decomposition, invoke `InquiryRoutingGraph.invoke(decomposition)` to produce `InquiryRoutingState`

3. **Ceremony gate:** When `state.ceremonyRequired === true`, pause and surface to user before proceeding

4. **Dispatch payloads:** Use `state.dispatchPayloads` (typed `FormattedDispatch[]`) to feed QMD, deep-search, or workspace-scan tools

5. **State persistence:** Store `StoredInquiryRoutingSession` alongside existing session metadata

## RISE Compliance

| Phase                | Status                                                            |
| -------------------- | ----------------------------------------------------------------- |
| **R**everse-engineer | 🌱 Pending — analyze ava-claw's current dispatch patterns         |
| **I**ntent-extract   | 🌱 Seed — intent is structured pre-dispatch with relational gates |
| **S**pecify          | 🌱 This seed                                                      |
| **E**xport           | ⏳ Not started                                                    |
