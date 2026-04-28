<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-28T16:18:00Z
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/DESIGN.json
    - stardust/current/_brand-extraction.json
  synthesizedInputs:
    - Mode A brand-faithful resolution
  stardustVersion: 0.2.0
-->
---

# § 1 · Direction (resolved 2026-04-28)

## Verbatim phrase

> Brand-faithful Mode A. Palette pinned (black ink, white surface,
> no invented colors in chrome — neon accents stay inside captured
> product photography). Typography pinned (Acumin Pro / Acumin Pro
> Condensed only, no fonts outside captured surface). Single-page
> redesign of the home. Density: commercial-dense (sectionPadding
> desktop ≤ 64px, ≥ 40px). IA-priority: PRESERVE the product grid
> above the fold and the SHOP / ADD TO CART verbs as primary. Plan
> three variants A/B/C that differ by ≥ 2 changes each.

## Restatement (dimensional)

| axis              | movement                                                                |
|-------------------|-------------------------------------------------------------------------|
| register          | inherited (brand-led commerce + editorial campaign overlay)             |
| audience          | inherited (US brand-loyal consumer + first-time visitor + B2B retailer) |
| expressive        | committed → committed (already loud; tighten the system, don't dampen)  |
| distinctiveness   | distinctive (already) → singular (push display scale, photographic full-bleed) |
| density           | balanced (commercial-dense, ≤ 64px desktop section padding) — pinned    |
| tone              | bold-direct + horror-comedy → unchanged                                 |
| color-energy      | locked (B&W chrome; neon stays in photography)                          |

## Movements

- **Density** stamped: `balanced` (commercial-dense; sectionPadding
  desktop = 64px). Refused editorial-airy default per user
  constraint and per `intent-dimensions.md` § 4 brand-register
  rule.
- **IA priority preserved.** Product grid above the fold + SHOP
  CTAs in primary position is brand-faithful inheritance, not
  optional. The captured site has > 3 product cards above the
  fold and `shop` is the primary verb — IA-preservation rule
  triggers.
- **Display scale moved up.** Captured site is ad-hoc; redesign
  locks a 1.333 modular scale and pushes D1 to 120-180px on
  desktop. The brand's load-bearing visual move is condensed-bold
  caps; let it work at full size.
- **Manifesto is proportionate.** Captured site renders the
  anti-plastic statement at body-copy scale on a thumbnail
  background image. Redesign moves it to D1/D2 display type on
  invert-bg, full-bleed.
- **Photography uncropped.** Captured campaign photos (Pop-Tarts,
  Country Club, Death Peddlers, Tony Hawk) render at thumbnail
  size in the carousel. Redesign serves them at the resolution
  they were shot for.
- **Hard 0px corners enforced everywhere.** Captured chrome has
  residual 5px / 2px from default Shopify theme. Redesign drops
  every non-pill radius to 0.

## Gaps & questions

None asked. Phrase fully specifies Mode A constraints. Density
tier `balanced` was not asked because the user explicitly
constrained sectionPadding desktop ≤ 64 and ≥ 40 — that maps
directly to balanced (64) per `intent-dimensions.md` § 4.

## Divergence inputs (Mode A)

| dimension       | source                  | value                                  |
|-----------------|-------------------------|----------------------------------------|
| decade          | rolled                  | 2025-now (contemporary)                |
| craft           | rolled                  | contemporary-poster                    |
| register        | rolled                  | brand-led commerce + editorial overlay |
| ground-family   | brand-faithful override | stark-white (#ffffff)                  |
| font deck       | inherited               | Acumin Pro / Acumin Pro Condensed      |
| palette         | inherited               | as captured (B&W + grays)              |

Anti-toolbox audit retained 3 brand-faithful inversions:
- pure-color (#000 / #fff) allowed,
- hex format retained (OKLCH not enforced — Shopify theme
  consistency),
- 0px radius enforced (already brand).

## Three variant directions (briefs for prototype)

The improvements list is the **load-bearing artifact for variant A**
and is written separately at
`stardust/prototypes/home-improvements.md` before any prototype is
rendered. The summaries below reference that list.

### A · Faithful + identified improvements
> "This is what your site should be tomorrow."

Same IA, same composition, same primary section sequence as captured.
Apply every weakness fix from `home-improvements.md` exactly — no
embellishment, no creative reach. The variant a risk-averse
stakeholder green-lights.

Section sequence (matches captured):
1. Header
2. Hero (single static — kill autoplay carousel, retain rotation
   via static featured slide; fix scrim, full-bleed photography)
3. Product grid (catalog above fold; tighten typography, render
   cans larger)
4. Manifesto strip (proportionate display, full-bleed invert)
5. Killer Merch grid
6. Dual end CTA (JOIN THE CLUB / SELL LIQUID DEATH)
7. Footer

### B · Catalog amplified — "the cans ARE the brand"
> "What if we leaned into the contact-sheet posture?"

Brand trait amplified: the captured site has 18+ products above the
fold; this is the strongest signal in the IA. Variant B doubles
down on catalog density: the page feels like a press-sheet of
tallboys, with editorial campaign photography stitched between
columns rather than on top.

Section sequence (≥ 2 changes from A):
1. Header
2. **Marquee tagline strip** (MURDER YOUR THIRST as horizontal
   typography marquee — replaces the carousel hero entirely; the
   tagline is the hero)  ← **change 1: hero replaced by marquee**
3. **Catalog wall** (full product grid — 6 columns, 24+ cards
   visible, can-size hero per card, neon graphics shouting through
   white background)  ← **change 2: hero photo demoted, catalog
   promoted to position #2**
4. Editorial campaign break (one campaign photo full-bleed at 1440px
   between catalog rows — Pop-Tarts collab or Tony Hawk)  ← change 3
5. Manifesto strip (same as A)
6. Merch grid (smaller, 4 columns)
7. Dual end CTA (retained)
8. Footer

### C · Manifesto-first — "voice and stance as spine"
> "What if we leaned into the editorial-poster posture?"

Brand trait amplified: the death-comedy voice + anti-plastic stance
+ campaign photography are the three things ONLY Liquid Death has.
Variant C structures the page as alternating voice gestures and
commerce, like a magazine with a shop bound in.

Section sequence (≥ 2 changes from A AND from B):
1. Header
2. **Hero quote panel** (full-bleed photography behind a black
   manifesto-style display caps overlay: "MURDER YOUR THIRST")
   — same first impression as A but the manifesto sentence is
   inside the hero, not buried after the catalog  ← change 1
3. **Featured commerce row** (3 hero SKUs at full size, not the
   full grid — energy line, sparkling water OG, iced tea — with
   shop-the-line CTAs)  ← change 2: catalog dispersed, not dumped
4. **Manifesto poster** (full-bleed PLASTIC RECYCLING IS A MYTH at
   D1 display, dominates a viewport — proportionate to brand DNA)
5. **Catalog rail** (the dense product grid lives here as a
   horizontally-scrollable rail — still on-page, still complete,
   still SHOP NOW per card; just no longer the dominant block)
6. **Editorial campaign break** (Country Club / Death Peddlers
   editorial spread)
7. Killer Merch (smaller, 3 columns)
8. Dual end CTA (retained)
9. Footer

Note: section count is higher than A/B by one editorial moment,
but per the brief's "C is not 'B but more'" guardrail, this is a
different hierarchy (story-led pacing) not just amplification.

### Variant differentiation check (brief constraint: ≥ 2 changes)

| pair | changes |
|---|---|
| A vs B | (1) hero replaced by tagline marquee, (2) catalog promoted to position 2 + amplified, (3) editorial photo break inserted between catalog rows |
| A vs C | (1) manifesto moved into hero, (2) catalog dispersed into featured-3 + horizontal rail, (3) full-bleed manifesto poster added as dominant viewport |
| B vs C | (1) tagline marquee in B vs hero quote panel in C, (2) catalog wall in B vs catalog rail in C, (3) editorial break placement |

All three pairs differ by ≥ 2 changes. ✓

### Hard rules applying to all three

- Density ≤ 64px desktop section padding, ≥ 40px (refuse airy).
- IA priority preserved: product grid present, SHOP / ADD TO CART
  primary, dual end CTA retained.
- Captured photography reused via public liquiddeath.com CDN URLs in
  the same semantic positions (hero stays hero, product image stays
  product image, campaign image stays campaign image).
- Hero text on photography MUST have a scrim.
- No invented colors in chrome (neons stay in photography).
- No fonts outside Acumin Pro / Acumin Pro Condensed.
- No fabricated stats, addresses, customer logos, quotes —
  placeholders use the F-002 visual signature.
- Variant C must NOT overshoot (no 200pt fonts, no editorial-airy
  padding, no atelier vocabulary).

## Resolved command sequence

1. Write target `PRODUCT.md`, `DESIGN.md`, `DESIGN.json` (this
   phase, complete).
2. Write `stardust/prototypes/home-improvements.md` (load-bearing
   artifact for variant A; consumed by all 3 variant briefs).
3. Render prototypes:
   - `stardust/prototypes/home-a.html` — variant A
   - `stardust/prototypes/home-b.html` — variant B
   - `stardust/prototypes/home-c.html` — variant C
   - `stardust/prototypes/home.html` — viewer/comparator across A/B/C + before
   - per-variant shape briefs: `home-a-shape.md`, `home-b-shape.md`,
     `home-c-shape.md`.

## Confirmation

User instructed "PROCEED. Run all phases without stopping for
confirmation." No clarifying questions outstanding.
