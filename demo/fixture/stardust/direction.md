<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-26T13:15:00Z
  readArtifacts:
    - stardust/state.json
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
  synthesizedInputs: []
  stardustVersion: 0.2.0
-->
---
title: "make it more expressive for a young audience"
resolvedAt: 2026-04-26T13:15:00Z
toolkitVersion: "v1.0 (stardust v2)"
schemaVersion: 1
---

# Active direction (2026-04-26T13:15:00Z)

## Phrase

> make it more expressive for a young audience

## Restatement

Move Aurora Coffee's brand surface from the **familiar SaaS-cafe
template** it currently inhabits (Inter on cream, blue accent,
three-feature card grid, friendly-warm marketing voice) toward a
**distinctive, committed, playful** identity built for **Gen Z
college and first-job buyers** — readers who pattern-match indie zine
publications, riso prints, and Bandcamp / Are.na visual culture more
than they pattern-match Stripe / Linear / Notion.

## Movements

- **register** — `brand` (inherited from `current/PRODUCT.md`)
- **expressive axis** — `restrained` → `committed`
- **tone** — `professional-warm` → `playful` (warm-playful, not loud)
- **density** — unchanged (`balanced`)
- **distinctiveness** — `familiar` → `distinctive`
- **audience** — Gen Z college / first-job, urban, design-aware,
  weekend-baristas (resolved via Q1)
- **constraints** — none stated

## Gaps and questions

1. **Q:** Sharpen "young" — pick the closest: (a) Gen Z college /
   first-job, (b) millennial professionals 25-35, (c) digital-native
   parents 30-40, (d) other.
   **A:** (a) — Gen Z college / first-job.

2. **Q:** Should the design feel native to a specific cultural
   reference set? (Examples: indie publishing, riso print, gaming,
   streetwear.) Optional.
   **A:** Indie publishing + riso print.

## Anchor references

- Indie publishing aesthetic (Drawn & Quarterly, McSweeney's print,
  Are.na collections).
- Riso-print color treatment — limited palette, off-register feel,
  flat fills.
- Bandcamp's editorial-density-without-being-hostile information
  layout.

## Anti-references

- The Generic-2026-SaaS silhouette (divergence-toolkit § 1) —
  oversized sans-serif hero + two-button CTA pair + sticky top-nav.
  This is the trap "expressive" most often falls into. Explicitly
  guardrailed.
- Cream-by-default ground (toolkit § 1, palette-family moves) —
  Aurora is *not* in print/paper/publishing as its category, so the
  cream-rebrand bar is not met. The seed routes us to
  `monochrome-tint` instead.
- Unmodified Tailwind blue (#3B82F6) — current accent, treated as
  category convention to break.
- Three-up feature card grid — treated as the legacy IA to break.

## Divergence inputs

- **seed input** — `Aurora Coffee|2026-04-26`
- **seed quadruple** — `1970s × Riso print × zine × monochrome-tint`
- **picked_by** — `deterministic`
- **font deck** — `zine-maximalist` (Homemade Apple · Special Elite ·
  Abril Fatface · Bungee Shade · DM Serif Display) — implied by the
  zine register dimension
- **palette** — `Vintage Cottage Charm` (picked from library v0.6.0)
  - source: <https://coolors.co/54494b-f1f7ed-91c7b1-b33951-e3d081>
  - hexes: `#54494B` (ink) · `#F1F7ED` (ground) · `#91C7B1` (sage) ·
    `#B33951` (rose, anchor) · `#E3D081` (mustard)
  - recommended_index = picked_index = 1 (deterministic from
    `MD5(description + 2026-04-26)`)
- **anti-toolbox audit** — 1 hit (Hard non-blur drop shadow on
  display headlines), justified: "the riso-print register requires
  flat-fill misregistration as its signature; the offset shadow
  reads as the print-bleed, not as the assistant's stencil reflex"

## Command sequence (proposed)

1. `$stardust direct` (this command — write the resolved direction
   and target tokens)
2. `$impeccable shape stardust/current/pages/home.json` — Design
   Brief anchored on the Gen Z first-job audience and the indie
   publishing reference set
3. `$impeccable craft` — primary expressive pass, render against the
   resolved tokens
4. `$impeccable typeset` — apply the zine-maximalist deck;
   load-bearing for distinctiveness
5. `$impeccable colorize` — apply Vintage Cottage Charm; rose as
   primary CTA (replacing blue), sage as secondary surface,
   mustard as third accent
6. `$impeccable critique` — verify the move landed without slipping
   into the Generic-2026-SaaS guardrail or the cream-default trap
7. `$impeccable polish` — final pre-ship pass aligned with target
   DESIGN.md

## User confirmation

> "go"

## Pages in scope

`home`, `menu`, `about` (all 3 extracted pages — whole-site
direction)
