<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-04-28T00:00:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/pages/home.json
  synthesizedInputs:
    - user-phrase
  stardustVersion: 0.2.0
-->

# stardust direction — Aman home page refresh (presales)

## Active

### Phrase (verbatim)

> Redesign this home page for presales. This is a presales tool. The
> customer is a brand owner who hasn't refreshed their site in 2–5 years
> and feels design fatigue. Brand-faithful refresh — clearly better than
> what they have today, that they still recognise as themselves. Not a
> rebrand. Not editorial reimagination. Three variants with distinct
> refresh strategies.

### Restatement (dimensional)

| axis | resolution | source |
|---|---|---|
| register | `brand` | inherited from `current/PRODUCT.md` |
| expressive axis | `committed` (unchanged — already committed) | inherited |
| tone | `serious-soulful` (unchanged) | inherited |
| density | `balanced` (64–80px desktop section padding) | user explicitly forbade 96px+ "AI-airy-editorial" cliché — this resolves to balanced |
| distinctiveness | `distinctive` (unchanged) | user forbade "rebrand" — distinctive, not singular |
| audience | HNW travellers + the customer's own design team | from extract + presales-tool framing |
| constraints | `brand-faithful` (Mode A) — palette and typography pinned to captured surface; reuse captured imagery at public URLs in same semantic positions; no fabricated stats/quotes/customer-logos | user explicit |

### Movement vs current

Token-level only. No axis moves. The refresh is **calibration** at the
system level (scale tightening, token vocabulary, motif precision) plus
**three distinct compositional theses** at the page level.

### Gaps and clarifying questions

None. The user's brief specifies all axes — including the constraint set,
the avoidance list, the variant strategy, and the success criterion ("the
customer's design team reacts 'yes, that's us, refreshed'"). No
clarifying questions warranted.

### Mode

**Mode A — Brand-faithful** (auto-activated). Triggers on user pinning
both palette and typography to the captured surface. Implications:

- Type and palette dimensions of the divergence seed are **inherited**,
  not rolled. `font_deck.name = "brand-inherited"`,
  `palette.source = "inherited from _brand-extraction.json"`.
- Decade and register dimensions are still rolled — they inform variant
  flavour without changing tokens.
- Mode C ground-family override active: brand's cream
  (`#F3EEE7`) wins over any seed roll. Reason: `brand-faithful`.
- Auto-emit `brand_faithful_inversions[]` listing the captured-surface
  values that survive the refresh untouched.

### Divergence resolution

| dimension | mode | resolution | basis |
|---|---|---|---|
| decade | rolled | `2025-now` (deterministic from "Aman\|2026-04-28" hash) | seed |
| craft | rolled | `Photogram` | seed — atmospheric photography is already the brand's core craft, this aligns |
| register | rolled | `Travel agency brochure` | seed — aligns with the existing "destinations" IA |
| ground-family | brand-faithful override | `cream` (`#F3EEE7`) | reason: `brand-faithful` |
| font_deck | inherited | `brand-inherited` (Lyon + Whitney SSm) | Mode A |
| palette | inherited | `_brand-extraction.json` palette | Mode A |

### Anti-toolbox audit

The refresh deliberately avoids the user's enumerated avoidance list,
each of which intersects an anti-toolbox default:

| avoid | toolkit move it intersects | how this direction respects it |
|---|---|---|
| Hero text on photographic backgrounds without contrast scrim | "Generic-2026-SaaS silhouette" element | Hero on every variant either keeps Aman's no-overlay-text approach OR adds a captured-surface scrim and a centred lockup. No contrasted text floating over imagery. |
| 96px+ section padding | "AI-airy-editorial" cliché (anti-toolbox-adjacent) | Section padding capped at 80px desktop; default 64px. |
| Fabricated stats / addresses / customer logos / quotes | "Stat-callout bar" | Variants do not introduce a stat-callout bar. The captured "35 hotels and resorts in 20 countries" line is rendered verbatim where used. |
| Generic "premium-feeling" copy | (voice-rule rather than toolbox) | Every variant satisfies ≥1 captured Brand Personality trait (soulful · elemental · understated · warm · quiet directive). |
| Editorial vocabulary clichés ("atelier", "mise-en-place") | (voice-rule rather than toolbox) | Eyebrow / headline / body lexicon is sourced from the captured page. No agent-generated editorial flourishes. |

No unjustified anti-toolbox hits. No off-toolbox moves invented.

### Brand-faithful inversions (auto-emitted)

Captured-surface values that survive untouched:

- **Cream ground** `#F3EEE7` — substrate of the brand. Inherited.
- **Centred-wordmark header** (Menu·Search · ĀMAN · Lang·Reserve). Inherited.
- **Lyon serif + Whitney sans pairing** at weight 400 only. Inherited.
- **0px border-radius**. Inherited (square is brand).
- **No-shadow depth model**. Inherited.
- **"Discover more" underlined inline link** as secondary CTA. Inherited.
- **Eyebrow → Headline → 1–2 sentence body → Discover more** card stack. Inherited.
- **Photography at full-bleed or 1:1 / 4:5 / 5:4 framing, no filter**. Inherited.

### Three-variant compositional strategy

Each variant declares a distinct compositional thesis. Section sequences
across variants are intentionally non-overlapping in 1+ dimension.

#### Variant A · Conservative refresh ("Calibration")

**Thesis:** Same page, made more precise. The customer's design team
sees their own site, sharper.

- IA: identical to current (Hero · Seasonal Feature · Twin Propositions ·
  Audience Carousel · World-of-Aman · Footer).
- Token moves: clean modular type scale (10/12/14/16/20/24/30/40);
  spacing pinned to 8pt; section padding 64px desktop; type tracking
  audited for optical balance.
- Composition moves: the captured carousel ("Seasonal Experiences", 4–5
  slides) becomes a **visible 4-card grid** — Tension T-3 fix. Hairline
  rules promoted from incidental to first-class dividers.
- Photography unchanged: same images, same semantic positions.
- Risk: low. Stakeholder-friendly first preview.
- Dominant divergence dimension: **decade** (2025-now precision —
  expressed as the cleaned scale and the carousel-to-grid promotion).

#### Variant B · Compositional shift ("Audience-led")

**Thesis:** Re-thread the page around *how guests choose* rather than
*what's new this season*. Decision-first homepage.

- IA: rearranged. Hero → **Where will Aman take you?** (the 4 captured
  audience entry tiles: In the City · To the Wilds · At Water's Edge ·
  Aman Villas — promoted from middle of page to first decision moment) →
  **Currently at Aman** (a paired feature combining "Summer's Warm
  Embrace" and "A Novak Djokovic Programme" under one shared "Currently"
  eyebrow) → **The World of Aman** (kept, but with the captured
  brand-statement line "35 hotels and resorts in 20 countries" promoted
  to its own measured strip preceding it) → Footer.
- Token moves: same as variant A (cleaned modular scale, 64px padding).
- Composition moves: the captured 4-card carousel is split — the four
  audience tiles move to top decision; the fifth ("Detoxification
  Programmes by Novak Djokovic") merges into the Currently feature.
- Photography unchanged: same captured imagery in matching new positions.
- Risk: medium. Forces the customer to confront whether their homepage
  thesis is news-led or decision-led.
- Dominant divergence dimension: **register** (Travel agency brochure →
  destination-finder structure dominates).

#### Variant C · Bold direction ("Typographic confidence")

**Thesis:** Let the wordmark's confidence carry the rest of the page.
Bigger Lyon, fewer sections, more space for each.

- IA: compressed. Hero · Currently at Aman (display feature) · Where in
  the World (4-tile audience grid) · World of Aman · Footer. Five
  sections instead of six.
- Token moves: type scale extended at the top — display headlines reach
  64–80px on desktop (vs current 31px max). Body and chrome stay at
  current scale. Optical letter-spacing tightened on display only.
- Composition moves: each section gets one big serif moment instead of
  a stack of equal-weight card titles. Cards inside sections still use
  the captured 20px Lyon, but section headlines are display-class.
  Section padding drops to 56px desktop (slightly tighter, since the
  type itself does the breathing).
- Photography unchanged: same captured imagery, same ratios.
- Risk: high. Asks "are we ready to be more distinctive?" — surfaces
  what stronger commitment looks like.
- Dominant divergence dimension: **decade** (2025-now display-typography
  ambition).

### Plan (executed without confirmation per user instruction)

1. ✅ `extract` — completed (single-page scope: home).
2. ✅ `direct` — this artifact.
3. → `prototype --all-variants` — render three differentiated proposed
   files, each with its own page-shape brief.

The default `prototype` flow is one proposed-per-page; here we render
three theses as three independent files (`home-A-proposed.html`,
`home-B-proposed.html`, `home-C-proposed.html`) plus a single viewer
(`home.html`) with a variant switcher.

### Assumptions

1. The user's three-variant brief takes precedence over the default
   single-prototype-per-page workflow.
2. Captured imagery is **reused at public URLs** per Mode A — variants
   reference `https://www.aman.com/sites/default/files/...` directly so
   prototypes render against real Aman photography.
3. Footer is **abbreviated** in all three prototypes — the captured
   footer carries 70+ destination links which would dominate any
   presales screenshot. The shape brief notes this as a deliberate
   abbreviation, not fabrication.
4. The brand-extraction shows zero CSS custom properties at `:root`
   on aman.com today (Tension T-2). The refresh introduces a token
   layer per the `:root` token contract — this is itself a refresh
   improvement and shows up across all three variants.
