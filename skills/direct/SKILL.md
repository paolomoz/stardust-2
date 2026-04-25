---
name: stardust:direct
description: Resolve the user's redesign intent into a target PRODUCT.md, DESIGN.md / DESIGN.json, and stardust/direction.md with full reasoning trace.
---

# stardust:direct

Resolve the user's freeform redesign intent into a complete **target
specification**: project-root `PRODUCT.md` and `DESIGN.md` (impeccable
format), a `DESIGN.json` sidecar with the divergence audit trail, and a
`stardust/direction.md` with the full reasoning trace.

`direct` produces the spec against which `prototype` and `migrate`
operate. It never writes prototypes or migrates pages — those are
downstream sub-commands.

## Inputs

- `<phrase>` — optional positional. The user's freeform intent
  ("make it better", "more Linear less Salesforce", "feel more premium
  on a small screen"). If omitted, ask the user for one.
- `--re-direct` — optional. Replace the current direction with a new
  one. Triggers stale-flagging on prototyped / approved / migrated
  pages per `skills/stardust/reference/state-machine.md`. Default
  behaviour without the flag is additive: if a direction already
  exists, the agent asks before replacing.

## Setup

1. Run the master skill's setup
   (`skills/stardust/SKILL.md` § Setup) — hard impeccable dep check,
   context loader, state read.
2. Verify `stardust/state.json` exists and contains at least one
   `extracted` page. If not, stop and recommend
   `$stardust extract <url>` first.
3. Read `stardust/current/_brand-extraction.json`. If absent, stop —
   extract did not complete brand-surface extraction; re-run extract.
4. Read `stardust/direction.md` if present. If a prior direction
   exists and `--re-direct` was not passed, ask whether the user wants
   to refine the existing direction or replace it.

## Procedure

### Phase 1 — Reasoning

Run the full intent-reasoning procedure from
`skills/stardust/reference/intent-reasoning.md`. Steps 1-6: restate
the phrase in dimensional vocabulary, identify movement, identify
gaps, ask **at most two** clarifying questions, map to an impeccable
command sequence, show the plan to the user.

Worked examples in
`skills/stardust/reference/intent-examples.md` calibrate the style.
Hard ceiling on questions: two per turn, no exceptions.

Wait for the user's confirmation (`"go"`, or a correction to the
plan) before moving on.

### Phase 2 — Resolve the divergence inputs

Once the plan is confirmed, resolve the divergence-toolkit inputs
from `skills/stardust/reference/divergence-toolkit.md`:

- **Seed.** Roll the 4-dimension seed (decade × craft × register ×
  ground-family) using the deterministic MD5 picker per § 2 of the
  toolkit, **unless** the user supplied anchor references strong
  enough to skip the seed. Record `picked_by` accordingly.
- **Font deck.** Pick from the 10 named decks per § 3. When the seed
  strongly implies a deck (e.g. `1977 + letterpress + tabloid` →
  `retro-italian`) use the implied deck; otherwise pick
  deterministically from the hash.
- **Palette.** If the resolved direction moves the color-energy axis
  or names the existing palette as part of the problem, run the
  palette picker
  (`skills/direct/reference/palette-picker.md`). Otherwise inherit
  the existing palette from
  `stardust/current/_brand-extraction.json`, applying role-renaming
  per toolkit § 4 if the inherited names violate the brand-native
  rule.
- **Anti-toolbox audit.** Run the self-audit (toolkit § 1
  Enforcement + Self-audit) on the resolved direction. Each
  anti-toolbox hit needs a brand-specific justification or it is
  removed.

Record every resolution in `DESIGN.json.extensions.divergence` per
the v2 storage shape at the bottom of `divergence-toolkit.md`.

### Phase 3 — Author target PRODUCT.md

Write `PRODUCT.md` at the project root using impeccable's
`reference/teach.md` as the **format spec** (not as a runtime command
to invoke). Direct authoring is intentional: by the time `direct`
runs, every answer impeccable's interview would surface has already
been resolved through stardust's intent-reasoning + divergence
resolution above.

Sections to populate:

- **Register** — from the resolved direction's `register` axis.
- **Users** — from the resolved audience tuple plus tone signals from
  the extracted brand surface.
- **Product Purpose** — from the user's phrase + extracted hero copy
  + resolved tone, written as a one-line value statement followed by
  one-line scope.
- **Brand Personality** — derived from resolved expressive axis +
  tone + reference set. Weight axes the user explicitly moved over
  inherited values.
- **Anti-references** — the user's stated anti-refs **plus** any
  anti-toolbox guardrails relevant to the resolved direction
  (e.g. "modernise" triggers the Generic-2026-SaaS silhouette
  guardrail; list it explicitly so prototype and polish enforce it).
- **Design Principles** — 3-5, each mapping to a specific axis
  movement. Format: one verb-led principle, one-line elaboration.
- **Accessibility & Inclusion** — populated when the constraint set
  includes `a11y-first`, `RTL-required`, or similar. Otherwise
  inherit impeccable's defaults.

Where a section cannot be populated with confidence from inputs,
mark it `<!-- _provenance: inferred -->` with a one-line basis
sentence. Never invent strategy.

### Phase 4 — Author target DESIGN.md and DESIGN.json

Write `DESIGN.md` at the project root using impeccable's
`reference/document.md` as the format spec — Stitch YAML frontmatter
plus the 6 canonical sections in fixed order.

Token sources:

- **`colors`** — from the picked palette (palette-picker.md output)
  or the inherited palette with role-renaming. Role names must
  satisfy toolkit § 4 (brand-native, no `Primary` / `Secondary` /
  `Alarm` etc. as sole role names).
- **`typography`** — from the chosen font deck. Sizes scaled by the
  resolved expressive axis (drenched → ratio ≥ 1.333; committed →
  ratio 1.25; restrained → ratio 1.125-1.2). Heading vs body
  assignments inherit from the deck.
- **`rounded`** — derived from extracted brand-surface
  `borderRadius.primary` mode, unless the direction moves
  distinctiveness toward `singular` (in which case re-derive from the
  font deck's tonal cousins).
- **`spacing`** — 4pt base scale unless density is pinned: `packed`
  → tighter scale (mode at 4-12px), `airy` → 8pt base scale (mode at
  16-32px).
- **`components`** — 4-6 canonical components (`button-primary`,
  `button-secondary`, `card`, `input`, `badge`, `link`) populated
  from extracted brand-surface `componentStyle`, with values
  adjusted for direction movements.

Write `DESIGN.json` (schemaVersion 2) with:

- `extensions.colorMeta`, `typographyMeta`, `shadows`, `motion`,
  `breakpoints` — filled from the same sources as DESIGN.md.
- `extensions.divergence` — full audit trail per the v2 storage shape
  in `divergence-toolkit.md`.
- `extensions.componentStyle` — the v1 fields preserved (`buttons`,
  `cards`, `inputs`, `dualCTAPattern`) so downstream tools have the
  per-component style table.
- `extensions.voice` — sampled DOs and DON'Ts derived from
  `_brand-extraction.json` voice samples + the resolved tone.
- `narrative.northStar`, `overview`, `keyCharacteristics`, `rules`,
  `dos`, `donts` — derived from the resolved direction. Toolkit § 7
  Optional House Standards land here in `narrative.rules[]`.

Every component HTML/CSS snippet in `components[]` must be
self-contained, use `ds-` class prefixes, and respect impeccable's
hard rules (OKLCH only, no pure black/white, no glassmorphism, no
side stripes, no gradient text, ≥ 1.25 type ratio for brand
register).

### Phase 5 — Write direction.md and update state

Write `stardust/direction.md` per
`skills/direct/reference/direction-format.md`. The full reasoning
trace: phrase, restatement, movements, gaps, questions and answers,
resolved axes, divergence inputs, command sequence proposed, user
confirmation, every assumption that defaulted in. Re-directs append
to the file as a new section; prior direction stays as history.

Update `stardust/state.json`:

- `direction.resolvedAt` = now
- `direction.phrase` = the user's verbatim phrase
- `direction.directionFile` = `"stardust/direction.md"`
- For each page in scope: `status` `extracted` → `directed`
- On `--re-direct`, for each page already in `prototyped` /
  `approved` / `migrated`: set `stale: true` and
  `staleReason: "direction changed at <ts>"`. Do not change the
  status itself; the on-disk artifact is still valid, just out of
  step.

Print a one-screen summary report and recommend the next step:

```
direction resolved
==================

Phrase:    "make it more expressive for a young audience"
Audience:  Gen Z college / first-job (resolved via Q1)
Register:  brand (inherited from current/PRODUCT.md)

Movements:
  expressive axis    restrained -> committed
  distinctiveness    familiar  -> distinctive
  tone               serious   -> playful
  density            (unchanged)
  audience           (resolved: Gen Z college / first-job)

Divergence:
  seed         1970s x Riso print x zine x monochrome-tint
  font deck    zine-maximalist
  palette      "Brutalist Dawn" (picked from library)

Wrote:
  PRODUCT.md, DESIGN.md, DESIGN.json
  stardust/direction.md

State:
  25 pages: extracted -> directed
  0 stale prototypes (none exist yet)

Next: $stardust prototype  (defaults to home page)
```

## Outputs

| Path                        | Purpose                                            |
|-----------------------------|----------------------------------------------------|
| `PRODUCT.md`                | Target strategy (impeccable format).               |
| `DESIGN.md`                 | Target visual system (Stitch frontmatter + 6 sections). |
| `DESIGN.json`               | Sidecar with extensions (divergence, componentStyle, voice) and narrative. |
| `stardust/direction.md`     | Resolved direction + full reasoning trace.         |
| `stardust/state.json`       | Updated with direction + per-page status changes.  |

## Failure modes

- **No extracted state.** Abort and recommend `$stardust extract`.
- **Phrase too vague even after two questions.** Persist the partial
  reasoning to `stardust/direction.md` under a `# Pending` section,
  ask the user to refine further, do **not** write `PRODUCT.md` /
  `DESIGN.md` / `DESIGN.json` from incomplete reasoning.
- **Re-direct with prior approved or migrated pages.** Always confirm
  before stale-flagging. The flag is visible to the user and
  reversible (clearing happens automatically on successful re-run of
  prototype or migrate), but a re-direct invalidates work the user
  may have signed off on.
- **Anti-toolbox audit removes too many moves.** If the resolved
  direction collapses to defaults after the audit strips
  unjustifiable hits, surface this to the user and re-prompt for
  reference anchors before writing tokens.

## References

- `skills/stardust/reference/intent-dimensions.md` — the 7 axes.
- `skills/stardust/reference/intent-reasoning.md` — the procedure.
- `skills/stardust/reference/intent-examples.md` — worked examples.
- `skills/stardust/reference/impeccable-command-map.md` — when to
  reach for each impeccable command (used when building the plan).
- `skills/stardust/reference/divergence-toolkit.md` — anti-mediocrity
  inputs and the v2 storage shape for the audit trail.
- `skills/stardust/reference/artifact-map.md` — provenance shape.
- `reference/direction-format.md` — schema for `stardust/direction.md`.
- `reference/palette-picker.md` — palette resolution procedure.
