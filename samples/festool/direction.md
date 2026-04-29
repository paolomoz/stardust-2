---
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-04-28T11:14:00Z
  basis: User-supplied phrase + explicit Mode A constraint + explicit three-variant brief.
  inputs: stardust/current/_brand-extraction.json, stardust/current/PRODUCT.md, stardust/current/DESIGN.md
  stardustVersion: 0.2.0
---

# Direction

## Phrase (verbatim)

> Redesign this home page for presales. Brand-faithful Mode A. Three
> variants: A Conservative refresh, B Compositional shift, C Bold
> direction. Avoid hero text without scrim, 96px+ padding, fabricated
> content, generic copy, editorial register for product-commerce
> brands. Proceed without confirmation.

## Restatement (dimensional)

- **register**: brand (inherited from current/PRODUCT.md)
- **expressive axis**: committed (held; hard rule against editorial
  register for product-commerce brands)
- **tone**: serious / technical-precise (held)
- **density**: balanced (default for brand-register multi-audience IA;
  hard rule against ≥96px padding)
- **distinctiveness**: variants stratify on this axis
  - A: familiar (refined)
  - B: distinctive (re-IA)
  - C: distinctive → singular on one element
- **audience**: working tradespeople, mid-career, plus aftermarket
  service users and trade buyers (inherited)
- **constraints**: `brand-faithful`, `scrim-on-photo-hero`,
  `no-fabricated-content`, `density ≤ balanced`,
  `no-editorial-register`

## Movements vs holds

| dimension | held / moved | source |
|---|---|---|
| typography | held verbatim | Mode A |
| palette | held verbatim | Mode A |
| photography | held — same URLs, same semantic positions | user instruction |
| heading scale | refined (ad-hoc → major-third 1.25) | weakness in current site |
| spacing rhythm | refined (4-pt scale) | weakness in current site |
| section padding | balanced 64px (was undefined / variable) | hard rule |
| hero contrast | scrim required on every photo hero | hard rule |
| IA | A=held / B=moved / C=held | variant strategy |
| component vocabulary | refined; same archetypes | brand-faithful |

## Divergence (Mode A)

```
decade           inherited   → 2024-now (current)
craft            inherited   → industrial / engineering
register         inherited   → brand
ground-family    inherited   → stark white (#ffffff)
font deck        inherited   → DINWebPro single-family
palette          inherited   → captured 12-role palette
density tier     resolved    → balanced (64px desktop, 48 tablet, 32 mobile)
scale            refined     → major-third (1.25), inside captured pixel range
```

Brand-faithful inversions auto-emitted:

- `pure-color: white #ffffff` retained — Mode A.
- `pure-color: navy #191e2b` retained — Mode A (it's the captured
  ink, not pure black).
- `hex-format` colors retained — Mode A; the brand surface ships hex,
  not OKLCH.
- `non-modular-scale` overridden in target — the captured ad-hoc scale
  is a weakness, not a brand asset; refined to major-third.

## Three variants — compositional theses

Each variant **must** propose a meaningfully different refresh
strategy. Identical or near-identical section sequences across
variants would be a failure per the user brief.

### A — Conservative refresh

**Thesis: Same IA, modernised tokens.** Hero → New products →
Brand teaser pair → Discover Festool grid → #festoolme → Service
band → Service strip + long copy → Footer. Same section order,
same content allocation, same dual-CTA pattern. The shifts:

- Hero text moves to a left-rail block over a contrast scrim;
  product name leads, value follows.
- Heading scale snaps to a major-third (1.25) modular ratio.
- "Discover Festool" 6-up grid gets size hierarchy: one feature
  tile spans 2 cells, the other four are single cells.
- Service band keeps the green field but tightens the copy
  block and adds a service tile preview row inside the band.
- Long-form SEO copy moves to a single readable column with
  drop initials, instead of two flat columns.

This is the option a risk-averse brand stakeholder would pick.
Almost nothing the legal team would push back on.

### B — Compositional shift

**Thesis: JTBD-led ("What are you doing today?"), not
marketing-led.** Same palette, same type, same photography pool.
**Different section order and different homepage thesis.** The home
opens with a job-to-be-done router (Cordless · Sanding · Dust
extraction · Mobility · Service), not a single hero campaign.

Sequence:

1. **Job router** — six job cards in a `2×3` grid. Each card opens
   the appropriate category page. The current "Tabless" cordless
   campaign moves to be the first job-card's accompanying detail
   panel inside the cordless route, not the page-wide hero.
2. **What's new for the trade** — same 4-up product strip from
   variant A, but the eyebrow reads "Released this season" with
   a date.
3. **Service-equal band** — green band for warranty registration
   moves up above the brand teaser (because for owners, this is
   the most-used surface).
4. **Brand & heritage** — the 100-year teaser + We Movie
   compressed into a single full-bleed band with a sub-line, not
   a two-tile arrangement.
5. **Discover routes** — the 6-up VIP grid restated as four
   topic routes (Dust-free working, 18V system, Mobility,
   Floor laying) with a tighter caption-led tile, not a photo-led tile.
6. **#festoolme** — kept but compressed to one row with a "see
   the wall" link.
7. **Trade utility strip** — Downloads, Supplier portal, Country,
   Contact, Press, Systainer labels.
8. **Footer**.

This is the "we're rethinking how the page works" option.

### C — Bold direction

**Thesis: Push typographic scale and the green motif.** Same
palette, same type, same photography. One element pushed:
typography goes drenched on H1, the green motif extends into a
ground-line treatment that anchors the hero and the SERVICE band
into one continuous brand frame.

Specific moves:

- **Hero H1 at 96px / 1.0** with a 13px `#cd272d` eyebrow above.
  H1 becomes the dominant brand asset on the fold.
- **Green ground-line motif** — a 4px `#23aa08` rule appears at
  the bottom of the hero scrim, the top of the SERVICE band, and
  under the brand mark in the header. Reads as a continuous
  brand line you scroll past.
- **Asymmetric two-column hero** — left column: oversized H1 +
  short subhead + primary CTA. Right column: full-bleed
  photograph (the same `18v-2160x768.webp` cropped right). The
  fold is split 5:7 in favour of the photo.
- **New products as a stacked carousel with a marquee** —
  product name as an oversized 44px tile-side label, scrolling
  horizontally with a visible track.
- **Service band reframed as a "Festool Owner" panel** — same
  green field, but the headline pushes toward direct address:
  "Own a Festool? Register for warranty all-inclusive."
- The rest of the page stays variant-A composition.

This is the "are we ready to be more distinctive?" option. It
asks: how far can we push DIN at scale and the brand green
without leaving the brand?

## Plan (commands proposed)

1. `stardust:prototype home --variant A` — render variant A
   (conservative refresh).
2. `stardust:prototype home --variant B` — render variant B
   (compositional shift).
3. `stardust:prototype home --variant C` — render variant C
   (bold direction).

No `$impeccable critique` or `$impeccable polish` runs because the
user's brief said "render only when each variant proposes a
meaningfully different refresh strategy" — the differentiation has
been resolved here, not at polish time.

## Pages affected

- `home` (extracted → directed)
