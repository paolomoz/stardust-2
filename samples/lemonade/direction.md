---
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-04-28
  source:
    - user phrase
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/_brand-extraction.json
  stardustVersion: 0.2.0
  mode: brand-faithful-A
---

# Direction — Lemonade presales refresh

## User phrase (verbatim)
> Redesign this home page for presales. The customer is a brand
> owner who hasn't refreshed their site in 2–5 years and feels
> design fatigue. Show them a brand-faithful refresh — clearly
> better than what they have today, that they still recognise as
> themselves. Brand-faithful Mode A: palette + typography pinned.
> Three variants: A faithful + identified improvements, B + C new
> directions. Density floor 40–64px. IA-priority preserved.
> Captured images reused via public URLs in the same semantic
> positions.

## Restatement (dimensional vocabulary)

```
Reading the phrase:
  • register:        brand                       [pinned]
  • expressive axis: PINNED via Mode A           [inherited]
  • tone:            inherited from captured
                     (playful + confident + values-led)
  • density:         user-pinned 56/40
                     (between toolkit balanced=64 and packed=48)
  • distinctiveness: brand-faithful
                     (familiar→distinctive via execution moves)
  • audience:        brand owner's design team viewing presales
                     refresh
  • constraints:     [brand-faithful, IA-priority-preserved
                      (11 entry points stay structural),
                      images-reused-in-semantic-position,
                      no-editorial-airy]
```

## Movements

| dimension | move | direction |
|---|---|---|
| register | pinned | brand |
| expressive axis | pinned | inherited (Mode A) |
| tone | inherited | playful + confident + values-led |
| density | pinned | 56px desktop / 40px mobile (refused airy) |
| distinctiveness | execution-only | familiar → distinctive |
| audience | resolved | brand-owner design team (presales) |

## Gaps

None — the user's brief specified every dimension that meaningfully
moves a presales-context redesign.

## Clarifying questions

None asked. The brief was prescriptive on every axis, including
density (the dimension the toolkit usually defaults).

## Mode resolution

**Mode A — Brand-faithful active.** User-constraint pins both type
and palette. Direct does not roll the type or palette dimensions
of the seed; they are inherited verbatim from
`stardust/current/_brand-extraction.json`.

**Mode B — Anchor-reference precedence not active.** No anchor
references provided.

**Mode C — Ground-family override active.** The captured ground is
`#ffffff` stark-white. Override reason: `brand-faithful` —
captured ground wins over toolkit reflex.

## Divergence inputs

```
Divergence (brand-faithful mode):
  decade           ✓ rolled    → 2025-now (presales is a 2026 refresh)
  craft            inherited   → illustrated line-art
                                 (Lemonade's signature SVG vocabulary)
  register         pinned      → commercial-brand
  ground-family    inherited   → stark-white (Mode C override)
  font deck        inherited   → Lato + Merriweather + Dancing Script
  palette          inherited   → pink #ff0083 + neutrals + 15-color
                                 latent rainbow
```

## Brand-faithful inversions (auto-recorded)

| Toolkit rule | Inverted? | Reason |
|---|---|---|
| OKLCH-only color values | yes | Lemonade ships hex via CSS custom properties; converting loses traceability |
| Avoid pure white #ffffff ground | yes | captured ground is exactly #ffffff |
| Avoid pure #161616 surface | yes | captured footer is #161616 |
| Sentence-case CTAs | no | captured uses ALL-CAPS; refresh applies sentence case as a listed improvement, not a toolkit reflex |

## Anti-toolbox audit

| check | result |
|---|---|
| no-cyan-purple-gradient-saas | pass — pink #ff0083 only ignition |
| no-dark-mode-reflex | pass — light ground captured |
| no-glassmorphism | pass — no captured glass |
| no-side-stripes | pass |
| no-gradient-text | pass |
| type-ratio-≥1.25-brand | pass — average 1.27, H1→H2 = 1.4 |
| no-editorial-airy-default | pass — sectionPadding.desktop=56px |
| no-fabricated-stats | pending — variants must use placeholders only |

## Plan (executed)

```
Commands run, in order:
  1. Mode A audit + brand-faithful inversion log — recorded in
     DESIGN.json.extensions.divergence.
  2. Authored target PRODUCT.md (impeccable teach format,
     direct-authored — no interview).
  3. Authored target DESIGN.md (Stitch frontmatter + 6 sections,
     site-level only per F-015).
  4. Authored DESIGN.json schemaVersion 2 with extensions
     (divergence, componentStyle, systemComponentRoles, voice,
     narrative, imageUrls).
  5. Wrote stardust/direction.md (this file).
  6. Updated stardust/state.json: home extracted → directed.

Pages affected: home (the only extracted page).
Pages flagged stale: none (no prior prototypes).

Next: $stardust prototype  (3 variants per the user brief)
```

## 3-variant brief (preview — full variant briefs authored by `prototype`)

Per the user brief, three variants must each serve a different
question. Each inherits the system (palette, typography, imagery,
density, sentence-case CTAs) and differs in ≥ 2 of: section
sequence, layout strategy, IA priority emphasis, motif weighting.

### A — Faithful + identified improvements
Same IA, same primary section sequence as captured. Applies a
closed list of 5 improvements (authored next as
`stardust/prototypes/home-improvements.md`). Risk-averse
stakeholder green-lights this.

### B — Illustration-led
Amplifies captured trait: **the illustrated character vocabulary**.
The captured site under-crops its strongest brand asset (the
line-art houses, pets, cars). B promotes illustration to the
section-defining structural device — the hero is illustration-first
with copy as caption rather than monument; bundles are
illustration-driven cards; illustrations stitch sections together
rhythmically.

### C — Rainbow product taxonomy
Amplifies captured trait: **the latent rainbow palette**. Lemonade
ships 15+ named secondary colors in tokens but the home renders
~85% monochrome. C surfaces the rainbow as the structural device
for product distinction — each of the 5 products gets a tinted
surface (renters=pink, home=algae, car=boston blue, pet=salomie,
life=lavender). The rainbow becomes IA wayfinding, not decoration.

## Artifacts written

| Path | Status |
|---|---|
| `PRODUCT.md` (project root) | ✓ written |
| `DESIGN.md` (project root) | ✓ written |
| `DESIGN.json` (project root) | ✓ written |
| `stardust/direction.md` | ✓ written (this file) |
| `stardust/state.json` | ✓ updated (home directed) |
