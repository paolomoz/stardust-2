<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-28T10:15:00Z
  readArtifacts:
    - stardust/state.json
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/pages/home.json
  synthesizedInputs: []
  stardustVersion: 0.2.0
-->
---
title: "Mode A brand-faithful presales redesign of oatly.com homepage; three differentiated variants"
resolvedAt: 2026-04-28T10:15:00Z
toolkitVersion: "v1.0 (stardust v2)"
schemaVersion: 1
mode: brand-faithful
---

# Active direction (2026-04-28T10:15:00Z)

## Phrase

> Mode A brand-faithful presales redesign of oatly.com homepage. Pin
> palette and typography to captured surface. Three differentiated
> variant theses: A conservative refresh (same IA, modernised tokens),
> B compositional shift (same brand surface, different homepage
> thesis), C bold direction (push one element further while staying
> recognisably Oatly). Each variant must have a distinct compositional
> thesis. Use captured assets and tokens; placeholder for any
> synthesized content per F-002.

## Restatement

The redesign refreshes Oatly's homepage for a presales conversation
with the customer's brand team. The Oatly brand surface is locked:
captured palette (cream, white, pure black, the seven brand pastels
and the cream-yellow #fdcf85), captured typography (the seven custom
typefaces with their fluid clamp scale), and captured motifs
(grid-paper background, hand-drawn iconography, sharp 0px corners,
irreverent voice, italic-serif hero claim). Three variants, each with
a different refresh strategy — not three reskins of the same layout.
Density stays brand-tight (packed, ~48px sections), not editorial.

## Movements

- **register** — `brand` (inherited from `current/PRODUCT.md`)
- **expressive axis** — `committed` (already; held)
- **tone** — `irreverent-direct-anti-corporate` (held; not softened)
- **density** — `packed` (~48px sections); the captured
  homepage runs at ~20px (very tight); presales prototypes need to
  add content surface so 48px is the brand-faithful balance
- **distinctiveness** — `distinctive` (held); variant C explicitly
  pushes toward `singular`
- **audience** — Oatly's existing audience (plant-milk consumers +
  baristas + skeptics + brand-loyal fans); held
- **constraints** —
  - `brand-faithful` (Mode A active)
  - palette pinned to `_brand-extraction.json#palette`
  - typography pinned to `_brand-extraction.json#type`
  - photography reused via captured public URLs in same semantic
    positions (the homepage captured ZERO product photography — every
    image we have is brand-system, og fallback, or hand-drawn icon —
    so prototype must use F-002 placeholder treatment for any
    photography position the design demands)
  - density brand-tight, not editorial
  - render ≥3 differentiated variants per the brief

## Gaps and questions

None. The brief is unusually well-specified — it ships its own three
variant theses (A/B/C) and pins Mode A. The captured surface has
sufficient signal to differentiate. No question slot is burned.

## Anchor references

- (none) — Oatly is its own anchor. The captured surface is the
  reference set.

## Anti-references

- The Generic-2026-SaaS silhouette (toolkit § 1) — explicitly
  guardrailed. Brand-tight density, no SaaS hero gradient, no
  rounded-tile feature grid, no "trusted by" logo strip, no card
  shadows.
- Editorial-airy / Pentagram-cool register — the brand is louder and
  scrappier than that. The 96px+ section padding cliché is forbidden.
- Polished CPG marketing register — no glossy product hero with claim
  badges, no "shop now" wall of SKU.
- AI-generated premium-feeling copy — every variant must satisfy at
  least one tone trait from `current/PRODUCT.md` § Tone signature
  (TRAIT-1 second-person-with-wink, TRAIT-2 orthographic-looseness,
  TRAIT-3 self-aware-format-play).
- Editorial-register vocabulary for the variants' product-commerce
  positions ("atelier", "mise-en-place", "the table" etc.) — Oatly's
  voice is direct and ranty, not Anthropologie-curated.

## Divergence inputs

**Mode A (brand-faithful) is active.** Type and palette are pinned
per the user's explicit constraint. Mode A inverts the brand's
defaults below.

- **seed** — `Oatly|2026-04-28` deterministic roll, narrowed by Mode A:
  - `decade` — held at `2020s` (the brand is contemporary; nostalgic
    motifs are nostalgia-as-irony, not period setting)
  - `craft` — `letterpress + risographed magazine` (the brand's
    actual print register; aligns with the captured stamps and
    grid-paper texture)
  - `register` — `Memoir-adjacent` (Oatly's voice is essayistic,
    second-person, ranty — closer to Memoir than Tabloid or
    Catalogue)
  - `ground-family` — `stark-white` for base; `cream` (#FFFEF6) for
    alt-section surfaces. Override reason: `brand-faithful`
- **picked_by** — `user-constraint` for type+palette;
  `deterministic` for register/craft
- **font deck** — `brand-inherited` (the seven captured Oatly families
  with documented system-fallbacks per `current/DESIGN.md`)
- **palette** — `inherited from _brand-extraction.json` with
  role-renaming applied (`primary-yellow` is the canonical brand
  voice, not `accent`; `text-primary` is `#000000` per Oatly's
  hard-corner aesthetic)
- **anti-toolbox audit** — 0 hits. Brand explicitly preserves sharp
  corners, pure-black/white, fluid spacing, no shadows.

### Brand-faithful inversions

The captured Oatly surface intentionally violates several agent-default
reflexes. Per Mode A, these are inverted on purpose:

- **pure-white retention** — `#ffffff` retained as page ground
  (Oatly canonical; the homepage is white). The "no pure black/white"
  impeccable rule is inverted per brand-faithful direction.
- **pure-black retention** — `#000000` retained as primary text and
  icon stroke (Oatly canonical; pure black on cream is the brand's
  signature contrast). The "no pure black/white" rule is inverted
  per brand-faithful direction.
- **hex format retention** — Color tokens retained in hex
  (`#000000`, `#fdcf85`, `#FFFEF6`, etc.) per the captured surface.
  OKLCH applies to net-new authoring; this is inheritance.
- **sharp 0px corner retention** — All corners 0px on cards, inputs,
  buttons, window chrome, taskbar, folders, files. The agent-default
  reflex toward 8–12px rounded is inverted per brand-faithful
  direction.
- **all-uppercase nav retention** — Nav items rendered uppercase
  (`PRODUCTS`, `TASTEBUDS`, `NEWS`, `SUSTAINABILITY`, `HEALTH` —
  observed at 100% of nav labels, 0% of headings). Sentence-case
  reflex is inverted **for navigation only**; headlines stay
  sentence-case as in the captured hero.
- **saturated-color retention** — `#fdcf85` (Oatly cream-yellow)
  retained as the brand's primary surface accent for any non-default
  section background. The agent-default reflex toward
  tinted-neutral primaries is inverted.
- **photo treatment retention** — Captured homepage has no photography;
  any added photography in B/C must read as untreated documentary
  (no premium gloss, no overlay tints, no wide-angle lifestyle
  vignettes). The agent-default "use a polished editorial photo"
  is inverted toward grainy / honest reproduction. **F-002 placeholder
  signature** for any required-but-uncaptured photo position.
- **fluid spacing retention** — `clamp()` and `vw`-based spacing
  retained per brand tokens. The agent-default reflex toward
  fixed-rem spacing tokens is inverted per brand-faithful direction.

## Variant theses (load-bearing for prototype)

Each variant must declare a **distinct compositional thesis**. Three
near-identical variants is a failure per the brief.

### A · Conservative refresh — "yes, that's our quirky homepage, refined"

- **Thesis.** Same IA, same section order. Sharper execution of the
  desktop-OS metaphor: refined hand-drawn iconography, calibrated
  grid-paper line weight, deliberate hover/click affordances, better
  contrast between idle/active states, refined window chrome.
- **What changes.** Tokens — typography selected from the brand's
  full deck (italic Tinny Serif Pro for the centered claim, Margo
  Pro Regular for window chrome). Iconography sharpened. Subtle
  cursor change on folder hover. The START taskbar gets a clearer
  affordance (border treatment, focus ring respecting brand
  fluidity). One subtle accent: a small cream-yellow `#fdcf85`
  accent on a single piece of furniture (e.g. a "highlighted folder"
  state).
- **What does NOT change.** IA, section order, page concept, grid
  paper, sharp corners, irreverent voice, troll-domain folders,
  italic-serif claim, taskbar START, monochrome dominance.
- **Why this option.** This is the option a risk-averse stakeholder
  picks — recognisably their homepage, just better.

### B · Compositional shift — "we're rethinking how the page works"

- **Thesis.** Replace the desktop-OS metaphor with a
  conventional-but-still-Oatly content-led homepage. Same brand
  surface (cream + white + black + signature pastels, the seven
  custom families with their system fallbacks, hand-drawn
  iconography surfacing as small accents, sharp 0px corners,
  irreverent voice). Different IA: header → ranty hero → product
  showcase → sustainability stat strip → news/Tastebuds → OatFinder
  → footer.
- **What changes.** The homepage thesis. The desktop pastiche is
  retired in favour of content surface. Adds product photography
  positions (F-002 placeholder), adds stat strip (placeholder
  numbers in F-002 signature), adds news/tastebuds 3-up (placeholder
  copy), adds OatFinder text-input panel.
- **What does NOT change.** Brand surface (palette, typography,
  motifs). Voice register stays ranty / second-person / orthographic
  looseness. The Oatly logo, the cream-yellow accent, the hand-drawn
  iconography all surface as smaller-scale accents on the new layout.
- **Why this option.** The "audience-led / JTBD-led" homepage. Asks
  whether the brand's most loyal customers want a destination that
  helps them buy / find / understand the brand instead of a creative
  front-door experience.

### C · Bold direction — "are we ready to be more distinctive?"

- **Pushed element.** Copy register × typography. The homepage
  becomes a manifesto-poster — text-led, like Oatly's own packaging
  copy applied to web. Massive `Bjorn Serif Pro` / `Girdo Black Pro`
  declarative headlines (uses the unused `xxl` token at 11.5rem).
  Long-form ranty paragraphs in `Margo Pro Regular` set tight to a
  narrow measure. `Tinny Serif Pro` italic asides as
  margin-handwritten notes. `Petra Antikva Pro` for stamp-style
  callouts. The grid-paper background remains as ground for the
  whole essay.
- **What changes.** Type scale pushed to xxl on hero. Copy density
  pushed to packaging-essay register (multiple paragraphs of
  philosophical-irreverent oat content). Mixes 3-4 typefaces in
  intentional contrast (the brand owns 7; using 3-4 is a
  characteristically Oatly move). Layout: a single long manifesto
  page — header → giant declaration → essay → product as small
  illustration → claim stamps → footer.
- **What does NOT change.** Brand palette (cream + black + signature
  yellow as a single accent stripe; pastels held in reserve). Sharp
  0px corners. Hand-drawn iconography. The brand's own typeface
  system (no foreign typefaces; no editorial-cool typesetting that
  isn't Oatly). Voice stays anti-corporate.
- **Why this option.** Forces the conversation: "your packaging
  literally reads like this — your homepage could too." The most
  distinctive option, surfacing what stronger commitment would look
  like.

## Command sequence (proposed)

1. `$stardust direct` — write direction + tokens (this command)
2. `$stardust prototype home --variants 3` — render before/after for
   the homepage with three differentiated variants
3. `$impeccable critique stardust/prototypes/` — verify the variants
   landed without slop and remain distinctly Oatly

(Migrate is out of scope for presales — the prototypes are the
deliverable the customer reviews.)

## User confirmation

> "PROCEED. Run all phases without stopping for confirmation."
> (explicit override of confirmation gate per brief)

## Pages in scope

- `home` (the only page extracted; presales scope is single-page)
