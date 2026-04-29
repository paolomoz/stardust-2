---
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-04-28T12:05:00Z
  stardustVersion: 0.2.0
  source: user phrase + stardust/current/_brand-extraction.json
  basedOn:
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/DESIGN.json
    - stardust/current/_brand-extraction.json
---

# Direction — Polestar homepage refresh (presales)

## Phrase (verbatim)

> Redesign this home page for presales: https://www.polestar.com/us/.
> Brand-faithful Mode A. Palette and typography pinned to the captured
> surface. Re-use captured images in the same semantic positions.
> Three variants, each a different refresh strategy: A · Conservative
> refresh; B · Compositional shift; C · Bold direction. The customer's
> design team should react "yes, that's us, refreshed".

## Restatement (dimensional)

| axis             | value                                       | source                   |
|------------------|---------------------------------------------|--------------------------|
| register         | brand                                       | inherited (current/PRODUCT.md) |
| expressive axis  | restrained (pinned)                         | Polestar's signature is restraint |
| tone             | declarative-serious (pinned)                | "Choose better." "Sustainability." |
| density          | **balanced** (48–64px section padding)      | user constraint          |
| distinctiveness  | familiar → distinctive                      | "clearly better than what they have today" |
| audience         | premium-EV intenders + Tesla switchers + sustainability-led | inherited |
| constraints      | brand-faithful · same images same positions · hero must have contrast scrim · F-002 placeholders for fabricated content · no editorial register · 48–64px not 96px+ | user-stated |

## Movements (vs current state)

```
distinctiveness    familiar  -> distinctive   (the refresh itself)
density            (unchanged · stamped balanced per user)
expressive axis    (pinned restrained)
tone               (pinned declarative-serious)
register           (pinned brand)
typography         (pinned — Polestar Unica + system fallback)
palette            (pinned — 11 brand tokens inherited)
```

The redesign moves a single dimension: distinctiveness, from
"familiar refresh of itself" to "more deliberate, sharper, more
clearly authored". It does not move expressive axis (still
restrained), tone (still declarative), or density (still
balanced/tight). This is **what brand-faithful Mode A means in
practice**: the unmoved axes do most of the work.

## Mode resolution

- **Mode A (brand-faithful)** — ACTIVE. User explicitly pinned type
  and palette. The seed does not roll those dimensions.
- **Mode B (anchor-reference)** — INACTIVE. No external anchors
  named.
- **Mode C (ground-family override)** — N/A under Mode A; brand
  ground is `signalWhite` and is locked.

### Brand-faithful inversions (auto-emitted)

The following anti-toolbox rules are **inverted** under Mode A
because the brand's captured surface predates and supersedes the
toolkit's defaults:

- `pure-black-allowed` — Polestar's `graphiteBlack` (#101820) is the
  brand's near-black. The toolkit normally forbids `#000000`; we
  allow brand-canonical near-black.
- `hex-format-retained` — brand tokens stored as hex (`#ECECE7`),
  not converted to OKLCH. The brand ships hex; production CSS will
  follow.
- `flat-hierarchy-allowed` — h1/h2/h3 may all render at 30px /
  weight 400. The toolkit normally forbids equal-size siblings;
  Polestar's flat hierarchy is signature.
- `single-typeface-allowed` — toolkit normally encourages a display
  + body pairing; Polestar uses one family across all roles.
- `radius-zero-allowed` — toolkit normally forbids 0px on
  interactive elements; Polestar's CTAs are sharp by signature.
- `no-shadow-allowed` — toolkit normally requires a shadow scale
  for elevation; Polestar uses 1px inset hairline borders instead.

### Divergence summary

```
Divergence (brand-faithful mode):
  decade           inherited  -> 2024+ (Polestar's design language is current)
  craft            inherited  -> Scandinavian-modernist auto-OEM
  register         pinned     -> brand
  ground-family    inherited  -> signalWhite (#ECECE7) brand-native
  font deck        inherited  -> "Polestar Unica" (custom)
  palette          inherited  -> 11-token brand set
```

## Three variants — compositional theses

The three variants are required to declare distinct refresh
strategies. Each variant's thesis below names its single most
load-bearing claim.

### Variant A · Conservative refresh

**Thesis:** *"The refresh Polestar's own design team would ship if
asked to update the existing site without changing what it argues."*

- **IA** — identical to current (hero → incentive → Polestar 4 card → Polestar 3 card → Polestar 2 card → sustainability → charging strip → newsletter → footer).
- **What changes** — token precision. The current site's flat 30px
  hierarchy is preserved as a deliberate move (not removed) but the
  scale gains one **earned** display tier reserved for the hero
  ("Polestar 4. Choose better." renders at 56px / weight 400 in
  Variant A; everything else stays at 30/24/16/14/12). Type
  rhythm, vertical scan, and section transitions get sharper. Hero
  gains a legible contrast scrim. Section padding is calibrated
  exactly on a 4pt grid (64 / 48 / 32). Hairline borders are made
  consistent at `graphiteBlack15`.
- **Variant compositional thesis sentence:** "Same argument,
  delivered crisper."

### Variant B · Compositional shift

**Thesis:** *"Sustainability isn't section five — it's the
homepage's first claim. The product line is the proof, not the
argument."*

- **IA reordered** — sustainability headline moves to the top
  (immediately after the hero) and frames the rest of the page.
  Order becomes: hero (Polestar 4, "Choose better.") → sustainability
  thesis statement (above the LCA-report image) → model line as
  "the proof" → incentive (Tesla owners $14,000) → charging →
  newsletter → footer.
- **What does not change** — palette, typography, photography assets
  (used in the *same* semantic positions: editorial-full-bleed photos
  stay editorial; product side-views stay model-card), CTA treatment.
- **Why this is a refresh, not a rebrand** — Polestar already says
  "Choose better." in their hero. Variant B simply makes the page's
  IA *agree* with the headline. The current page's contradiction —
  ethically-loaded headline followed by Tesla incentive followed by
  product cards followed by, finally, the sustainability section —
  is what makes the homepage feel slightly older than its voice.
- **Variant compositional thesis sentence:** "The headline already
  says it; the page should too."

### Variant C · Bold direction

**Thesis:** *"What if Polestar's restraint were a setup for
selectively committed display moments — one element pushed, the
rest held."*

- **One element pushed: typography scale.** Polestar currently caps
  headlines at 30px on a desktop hero. Variant C introduces a
  display tier at **96px / weight 400** — used **three times only**
  on the homepage (hero, sustainability claim, closing statement).
  Body type, secondary headings, and CTA weight stay exactly where
  they are. The bold move is **commitment to display in a few
  places**, not bigness everywhere.
- **What does not change** — palette, typeface, photography,
  CTA weight, sharp corners, hairline elevation. Density stays
  balanced (sections do not become editorial-airy; padding stays at
  64–80px not 96+).
- **Why this stays brand-faithful** — Polestar's *intentional*
  restraint is only legible when a moment of commitment frames it.
  The current site has restraint everywhere, which can read as
  evenly muted. Variant C earns the restraint by deploying a few
  selected display moments. The 96px headline still uses Polestar
  Unica at weight 400. No colour change. No new motif.
- **Variant compositional thesis sentence:** "Restraint with three
  earned exclamation marks."

## Plan

```
Plan
====

I read the intent as: a brand-faithful refresh of Polestar's homepage,
holding palette and typography fixed and varying only what the three
strategies explicitly call for.

Assumptions (defaults applied, correct if needed):
  - density: balanced (48–64px section padding, not airy)
  - audience: same tuple as current/PRODUCT.md
  - photography: reused from captured page in same semantic positions
  - F-002 placeholders used wherever new content the design demands
    isn't in the captured page

Commands I'll run, in order:
  1. (already done) stardust:extract  — captured brand surface
  2. stardust:direct                  — write target PRODUCT, DESIGN, direction (this phase)
  3. stardust:prototype --variants 3  — render A, B, C side-by-side per variant

Pages affected: home (only).
Pages that will be marked stale: none (none prototyped yet).
```

## Risk audit (against the user's AVOID list)

| Avoid                                                        | How each variant mitigates                                                  |
|--------------------------------------------------------------|------------------------------------------------------------------------------|
| Hero text on photo without contrast scrim                    | All three variants apply a `graphiteBlack` 0–60% gradient scrim at hero base or a solid signalWhite block under the headline. |
| 96px+ section padding (editorial-airy cliché)                | All three variants cap section padding at 80px desktop / 56px tablet / 32px mobile. Density is "balanced", not airy. |
| Fabricated stats / addresses / customer logos / quotes       | Where the design demands content not in the captured page (e.g. Variant B sustainability stats), use F-002 placeholders rendered in monospace italic with `[…]` marks. |
| Generic "premium-feeling" copy                               | Each variant satisfies at least one specific tone trait from current/PRODUCT.md: A → "restrained · auditable"; B → "ethically confident · declarative"; C → "anti-bombast turned punctuative". |
| Editorial register for product-commerce brands               | None of the three variants names sections "atelier" / "mise-en-place" / similar. Section labels are commerce-direct ("Order Polestar 4", "Sustainability", "Charging"). |

## State

- Direction resolved.
- 1 page transitions: `extracted` → `directed` (slug: `home`).
- 0 stale prototypes.

## Next

`stardust:prototype` — render A, B, C side-by-side as three
brand-faithful homepage refreshes.
