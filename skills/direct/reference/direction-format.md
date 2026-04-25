# Direction format

Schema for `stardust/direction.md`. Written by `$stardust direct`,
read by every other sub-command (`prototype`, `migrate`, and the master
`$stardust` state report).

The file is **append-only** in normal use: the most recent direction is
the active one, prior directions are kept as history. A `--re-direct`
prepends a new active section; a refinement appends to the active
section as a sub-section.

---

## Top-level shape

```markdown
<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-25T15:42:00Z
  readArtifacts:
    - stardust/state.json
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
  synthesizedInputs: []
  stardustVersion: 0.2.0
-->
---
title: "make it more expressive for a young audience"
resolvedAt: 2026-04-25T15:42:00Z
toolkitVersion: "v1.0 (stardust v2)"
schemaVersion: 1
---

# Active direction (2026-04-25T15:42:00Z)

## Phrase

> make it more expressive for a young audience

## Restatement

One paragraph in dimensional vocabulary. ~80 words. Plain English,
no jargon.

## Movements

- **register** — `brand` (inherited from `current/PRODUCT.md`)
- **expressive axis** — `restrained` → `committed` (moved by phrase)
- **tone** — `serious` → `playful` (implied by "young")
- **density** — unchanged
- **distinctiveness** — `familiar` → `distinctive` (implied by
  "expressive")
- **audience** — Gen Z college / first-job (resolved via Q1)
- **constraints** — none stated

## Gaps and questions

1. **Q:** Sharpen "young" — pick the closest: (a) Gen Z college /
   first-job, (b) millennial professionals 25-35, (c) digital-native
   parents 30-40, (d) other.
   **A:** (a) — Gen Z college / first-job.

2. **Q:** Should the design feel native to a specific cultural
   reference set? (Examples: indie publishing, gaming, streetwear,
   K-pop visual culture.) Optional.
   **A:** "skip"

(or `## Gaps and questions\n\nNone — phrase was sufficiently
specific.`)

## Anchor references

- (none)

## Anti-references

- The Generic-2026-SaaS silhouette (toolkit § 1) — explicitly
  guardrailed because "expressive" is the most common AI-default
  trigger for it.

## Divergence inputs

- **seed** — `Example Brand|2026-04-25` MD5 →
  `1970s × Riso print × zine × monochrome-tint`
- **picked_by** — `deterministic`
- **font deck** — `zine-maximalist`
- **palette** — `Brutalist Dawn` (picked from library, source:
  `https://coolors.co/...`); recommended_index = 2, picked_index = 2
- **anti-toolbox audit** — 1 hit (Sticky top navigation),
  justified by inherited site convention

## Command sequence (proposed)

1. `$stardust direct` (this command — write the direction + tokens)
2. `$impeccable shape stardust/current/home.json` — Design Brief
   anchored on the resolved audience
3. `$impeccable craft` — primary expressive pass
4. `$impeccable colorize` — palette swap to "Brutalist Dawn"
5. `$impeccable typeset` — apply zine-maximalist deck
6. `$impeccable critique` — verify the move landed without slop
7. `$impeccable polish` — final pre-ship pass

## User confirmation

> "go"

## Pages in scope

- `home`, `about`, `pricing`, `features`, `contact` (the 5 pages
  marked `extracted` and not `requiresAuth`)

(or `all 25 extracted pages` for whole-site directions)

---

# History

## Prior direction (2026-04-22T11:10:00Z) — superseded

(prior `# Active direction` block, demoted to `## Prior direction`
with a `superseded` marker, when a `--re-direct` happens)

```

---

## Required vs optional sections

Required in every direction (active or historical):

- `## Phrase`
- `## Restatement`
- `## Movements`
- `## Divergence inputs` — at minimum `seed`, `font deck`, `palette`
- `## Command sequence (proposed)`
- `## User confirmation`
- `## Pages in scope`

Optional (omit cleanly when not applicable):

- `## Gaps and questions` — omit when the agent asked nothing
- `## Anchor references` — omit when none
- `## Anti-references` — never omit; if no explicit anti-refs, write
  `(none)` so the reader sees the agent considered the question

## Re-direct procedure

When the user runs `$stardust direct --re-direct`:

1. Read existing `direction.md`. If present, demote `# Active
   direction` to `## Prior direction (<resolvedAt>) — superseded`
   under a new `# History` section (or append to existing one).
2. Write the new `# Active direction (<new ts>)` block at the top
   of the file (after the YAML frontmatter, before `# History`).
3. Update YAML frontmatter `title` and `resolvedAt` to the new
   values; preserve `schemaVersion`.

A refinement (no `--re-direct`, user clarifies an existing direction)
appends a `### Refinement (<ts>)` block under the active direction
with the delta only — what changed and why. The original
`# Active direction` block is preserved.

## Pending direction (incomplete reasoning)

When `direct` cannot resolve the phrase even after two questions, do
not write the active direction. Instead, write a `# Pending
direction (<ts>)` section containing only `## Phrase`, `## Reasoning
so far`, and `## Open questions` (the questions still unanswered).
The user resolves later by re-running `direct` with more context.

State.json `direction.resolvedAt` stays `null` while a pending
direction is the latest entry. Sub-commands that require a resolved
direction (`prototype`, `migrate`) refuse to run.

## Why markdown rather than JSON

`direction.md` is the most human-facing artifact stardust writes —
the user reads it, reviews it, and may edit it directly to refine
the direction. Markdown with light structure beats JSON for this. The
fields downstream tools need (movements, divergence inputs, command
sequence) are surfaced via consistent headings rather than parsed
strictly; tools that need machine-readable state read
`stardust/state.json` and `DESIGN.json.extensions.divergence`
instead.
