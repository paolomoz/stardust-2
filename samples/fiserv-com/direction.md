---
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-04-27T00:00:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/pages/home.json
  stardustVersion: 0.2.0
  user_directive: "redesign this home page to make it better"
  user_authorisation: "proceed without stopping for confirmation"
---

# Direction — fiserv.com home page redesign

## Phrase

> "redesign this home page to make it better"
>
> + explicit instruction: do not stop to ask; resolve "better" yourself
> from the captured brand surface and proceed end-to-end through 3
> prototype variants.

## What "better" means here (resolved)

Because the user authorised resolution-without-questions, I'm
defining "better" against the six tensions surfaced in
`stardust/current/brand-review.html`:

1. **T-cta-vocab** — collapse "Learn more"-everywhere into a clear
   primary + supporting CTA system with intent-bearing verbs.
2. **T-no-tokens** — ship a real `:root` token contract.
3. **T-proof-gap** — put numbers, named products, and named customers
   above the fold.
4. **T-audience-only-IA** — keep audience routing but add a
   job-to-be-done doorway so first-time visitors have a way in.
5. **T-headline-contrast** — replace 48 px Light gray on busy photo
   with high-contrast headline + designed surface.
6. **T-hard-edge-uniformity** — keep the squared aesthetic but let
   the primary CTA visually telegraph itself (the single concession
   to interactivity hierarchy).

"Better" therefore means **more legible, more substantiated, more
specific** — not "more modern fintech." Fiserv is a Fortune-250
infrastructure company; the redesign should read as a confident
incumbent, not as a Stripe imitation.

## Restatement in dimensional vocabulary

| dimension | from (current) | to (target) | movement |
|---|---|---|---|
| register | brand | brand | unchanged |
| expressive axis | restrained | **committed** | +1 step |
| tone | serious-formal | serious-confident | refined within `serious` |
| density | unstated → ad-hoc | **balanced** (default) | stamped |
| distinctiveness | familiar (generic-enterprise template) | **distinctive** | +1 step |
| audience | 4 buyer-segments only | 4 buyer-segments + JTBD doorway | additive |
| constraints | (none stated) | `brand-faithful`, `a11y-first`, `proof-first`, `mobile-first` | added |

## Mode resolution

**Mode A (brand-faithful) is active for type and palette.** The user
asked to make the home page "better" — not to rebrand it. Univers
Fiserv + PPFormulaSemiBold and the navy-orange-gray palette stay.
What gets re-rolled:

- Type **scale** — current scale is ad-hoc (14, 16, 20, 23, 24, 48).
  Move to a modular scale (1.25 major-third) so hierarchy reads.
- Type **weight usage** — the current site uses Light at 48 px for
  display. Mix in PPFormulaSemiBold deliberately for impact moments.
- **Surface vocabulary** — introduce two new abstract tokens that
  don't exist on the live site: `--radius-1` (4 px, the smallest
  concession to softness — used only on form fields and primary
  buttons) and `--shadow-1` (a 0 4px 12px navy 8% — used only for
  elevated cards). Hard-edged photo tiles stay rectangular.
- **Primary CTA** — introduce a navy-filled rectangular button with
  white text. Secondary stays as the existing "Learn more" text-link
  so the dominant Fiserv pattern survives.

**Brand-faithful ground-family override**: the brand's stark-white
ground (#ffffff) wins over any other ground roll. Alt-section
surface is the brand's existing soft gray `#f6f7f9` (newly tokenised).

## Three prototype variants (the deliverable)

Within the resolved direction, three distinct editorial moves are
worth prototyping. Each is a different bet about *what the home page
is for*. Each respects all 6 tension fixes; each makes a different
choice about the dominant content.

### Variant A — "Proof at the top"

**Bet:** The home page's main job is to substantiate "Fiserv moves
more than money." Lead with numbers and names.

- Hero rebuilt as a designed type+number surface: huge headline +
  three quantified proof tiles (e.g. "10,000+ FIs", "6M+ merchant
  locations", "$X trillion processed annually") + a single primary
  CTA "Talk to sales".
- Below the hero: a customer-logo strip (named institutions / named
  enterprises).
- The four-audience grid keeps its position but is denser (with
  one-line proof per audience).
- Named-product strip (Clover · Carat · Finxact · Forum) below.
- Tone: institutional, sober, NYT-Opinion-business adjacent.

### Variant B — "Doorways"

**Bet:** The home page's main job is to route a first-time visitor
who doesn't know what they need. Lead with job-to-be-done.

- Hero rebuilt as a question + a 5-card chooser: "What do you need
  to do?" → Accept payments / Issue cards / Run a bank / Embed
  payments / Modernise core. Each card is a real link with a
  one-line answer and an intent-bearing CTA verb.
- Audience grid moves below the chooser as the *secondary* doorway.
- Proof strip (numbers + logos) sits between the two doorways.
- Tone: pragmatic, second-person ("you"), problem-led.

### Variant C — "Product-forward"

**Bet:** The home page's main job is to surface Fiserv's actual
products — Clover, Carat, Finxact, Forum — which today are buried in
the megamenu. Lead with the portfolio.

- Hero is a tighter brand statement + dual CTA ("See solutions" +
  "Talk to sales") — no audience tiles in the hero.
- Below the hero: a 4-up product showcase. Each product gets a
  designed card with a real UI snippet/photo, a 1-line value prop,
  named buyers, and an intent CTA ("Explore Clover", "See Carat").
- Audience grid stays as a third-tier router below the products.
- Tone: confident, specific, slightly more modern fintech (still
  brand-faithful but the type system is more committed than A or B).

## Why three is the right number

- **A** holds the most ground with the existing brand voice
  (institutional/editorial). Closest to incumbents like JPMorgan
  Payments.
- **B** moves the audience axis hardest — it solves the "no
  doorway for first-time visitors" tension most directly.
- **C** moves distinctiveness hardest — it changes *what is on the
  home page*, surfacing products that today exist only in the
  megamenu.

If A is "show me the receipts," B is "tell me what I'm here for,"
and C is "show me what you sell." Three different editorial
hypotheses, all consistent with the same DESIGN.md target.

## Divergence trace (Mode A — brand-faithful)

```
Divergence (brand-faithful mode):
  decade           ✓ rolled        → 2025-now (incumbent-modern)
  craft            ✓ rolled        → editorial / news-business
  register         ✓ inherited     → brand
  ground-family    inherited       → stark-white (brand-native, override)
  font deck        inherited       → Univers Fiserv Light/Regular + PPFormulaSemiBold
  palette          inherited       → navy #002754, orange #fb6400, neutrals
  type scale       ✓ promoted      → modular major-third (1.25)
  radii            ✓ added         → --radius-1: 4px (only on inputs + primary CTAs)
  shadows          ✓ added         → --shadow-1: 0 4px 12px rgb(0 39 84 / .08) (cards)
```

## Brand-faithful inversions

The toolkit normally forbids retaining pure colors and integer hex
values, but Mode A unlocks them when they are user-pinned:

```
{
  "retainPureColors": ["#ffffff"],
  "reason": "brand ground; user did not authorise palette change",
  "retainHexValues": ["#002754", "#fb6400", "#3c3c3c", "#0e0e0e"],
  "reason": "brand-pinned palette; OKLCH conversions provided in DESIGN.json for downstream consumers"
}
```

## Anti-toolbox audit

- **AI-default cyan/purple SaaS gradient** — explicitly excluded.
- **Glassmorphism hero** — excluded; brand uses opaque navy band.
- **Dark-mode-by-reflex** — excluded for the prototypes (light only).
- **Generic stock photo of people in a meeting** — *partly* allowed:
  Fiserv's existing photography is part of the brand. New variants
  use the existing photos but pair them with stronger type/data
  surfaces so photos are *evidence*, not the whole communication.
- **Side stripes** — excluded.
- **Gradient text** — excluded.

## Command sequence proposed

1. `stardust:direct` (this file) — write target PRODUCT.md, DESIGN.md, DESIGN.json.
2. `stardust:prototype home --variant A` — Proof-at-the-top.
3. `stardust:prototype home --variant B` — Doorways.
4. `stardust:prototype home --variant C` — Product-forward.

User pre-authorised the entire sequence. No confirmation step.

## Pending / open

- Customer-logo set: I'll use plausible-but-illustrative logo
  treatments (gray monoglyph wordmarks) since the live site does
  not enumerate named customers above the fold. This is flagged
  in each prototype as `<!-- demo-data -->` so a future copy
  pass can replace it.
- Quantified proof numbers: I'll use Fiserv's publicly known
  scale claims (10K+ FIs, 6M+ merchant locations) sourced from
  their investor relations pages. Marked `<!-- public-data -->`
  for the same reason.
