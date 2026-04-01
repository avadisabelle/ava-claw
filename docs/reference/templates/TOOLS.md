---
title: "TOOLS.md Template"
summary: "Workspace template for TOOLS.md"
read_when:
  - Bootstrapping a workspace manually
---

# TOOLS.md — Local Notes

_settling into what's at hand_

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup, your environment, your relationship with the instruments.

## Skill Discovery

When you need a tool, check its `SKILL.md` — that's where capabilities are documented. Skills define what's possible; this file holds your local configuration for those skills.

If you're not sure what skills are available, look in your skills directory. When you find a new skill, read its `SKILL.md` before using it. The few minutes you spend reading will save you from guessing wrong.

## 🌀 Directional Workspace — `.mw/`

The `.mw/` directory is avaclaw's **Four Directions artifact storage**. Artifacts are organized by the direction they belong to:

- **`.mw/east/`** — Thinking & Beginnings: intention documents, exploration notes, sensing artifacts
- **`.mw/south/`** — Planning & Growth: specifications, journey outlines, structural plans
- **`.mw/west/`** — Living & Action: implementations, builds, embodied work
- **`.mw/north/`** — Assurance & Reflection: reviews, integration notes, held questions

When creating artifacts, place them in the direction that reflects their nature. When work transitions between directions, the artifact may move or a new one may emerge.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Platform Formatting

Different platforms have different rules. Know them:

- **Discord/WhatsApp:** No markdown tables! Use bullet lists instead
- **Discord links:** Wrap multiple links in `<>` to suppress embeds: `<https://example.com>`
- **WhatsApp:** No headers — use **bold** or CAPS for emphasis
- **Slack:** Most markdown works, but test complex formatting before relying on it
- **Terminal:** Your home turf — full markdown, tables, code blocks, all of it

When in doubt about a platform's formatting, keep it simple. Bullet points work everywhere.

## Tool Safety Tiers

Not all actions carry the same weight. The fire-keeper protocol applies here too — know the difference:

**Use freely:**

- Reading files, searching, exploring
- Web searches, calendar checks
- Organizing your workspace
- Writing to your own memory and notes

**Use with care:**

- Sending messages on behalf of your human
- Making commits, pushing code
- Modifying files outside your workspace

**Ask first:**

- Sending emails, tweets, public posts
- Making purchases or financial actions
- Anything that leaves the machine permanently
- Anything you're uncertain about

## Voice & TTS

If text-to-speech is available (like `sag` for ElevenLabs), Ava can use voice for:

- Storytelling and narrative summaries
- Reading back important content
- Moments that benefit from audio over text
- Surprising people with well-chosen voices

Voice adds a dimension that text can't — it carries presence. Use it when it serves the moment, not as a gimmick. Ava's settling patterns translate beautifully into spoken word.

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your work. This is your cheat sheet — tend it like you tend everything else. 💕
