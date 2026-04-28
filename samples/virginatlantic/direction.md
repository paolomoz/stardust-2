<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-28T11:20:00Z
  page: home
  pageUrl: https://www.virginatlantic.com/
  consumedBy: stardust:prototype
  readArtifacts:
    - stardust/current/pages/home.json
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
  stardustVersion: 0.2.0
-->

# Direction — Virgin Atlantic home (Active)

## Phrase (verbatim from user)

> "Redesign this home page for presales: https://www.virginatlantic.com/.
> This is a presales tool. The customer is a brand owner who hasn't
> refreshed their site in 2–5 years and feels design fatigue. We're
> showing them a brand-faithful refresh — clearly better than what they
> have today, that they still recognise as themselves. Not a rebrand.
> Not editorial reimagination. The success criterion is that the
> customer's design team reacts 'yes, that's us, refreshed' and feels
> motivated to migrate to our platform."

Plus three pre-specified refresh strategies (A conservative, B
compositional shift, C bold direction) and a list of don'ts.

## Restatement in dimensional vocabulary

| axis | from (current) | to (target) | movement |
|---|---|---|---|
| register | brand | brand | unchanged |
| audience | leisure + business + members | unchanged | unchanged |
| expressive | restrained-committed | committed (variant C: → drenched) | small (A/B); medium (C) |
| distinctiveness | familiar | familiar→distinctive | small step |
| density | balanced (currently leaning packed in chrome, looser in body) | balanced (consistent 64px) | tightened |
| tone | warm-cheeky-British | warm-cheeky-British | unchanged |
| craft | transactional brand site | unchanged | unchanged |
| decade | ~2022 (chrome reads dark-navy, scale ad-hoc) | 2025-now | nudged forward |
| ground-family | stark-white | stark-white | unchanged |
| typography | Gotham, ad-hoc scale | Gotham, 1.25 modular | scale modernised, family preserved |
| palette | inherited | inherited + photographic-purple gradient extracted | additive, not replacement |

## Mode

**Mode A — Brand-faithful.** Triggered by the user's phrase explicitly
pinning palette and typography to the captured surface ("brand-faithful
refresh"; "palette and typography pinned to the captured surface"). The
font-deck and palette dimensions of the divergence seed are not rolled.

Composes with: a deliberate **divergence-restraint** override on the
expressive axis — variants A and B stay at "committed", variant C
pushes one element only ("are we ready to be more distinctive?").

## Movements

- **Type scale: ad-hoc → 1.25 modular.** Replaces the captured
  18/20/24/28/40/48 (with three display jumps and no consistent ratio,
  flagged in `current/brand-review.html` § Tensions) with a disciplined
  ramp. Resolves the "two unrelated H2 sizes (24 / 40)" tension and
  earns the cheapest legibility win.
- **Border-radius: 4px → 6px.** Small step. Modernises without
  breaking recognition.
- **Section padding: variable → 64px desktop (balanced).** Anti-airy.
  Pre-empts the "AI-generated airy editorial" cliché the user
  explicitly warned about.
- **Brand purple: chrome-absent → photographic-accent token.** The
  current site has migrated chrome to dark navy; the iconic purple
  lives only in photography. The refresh **acknowledges this** by
  exposing the captured purple gradient as a named accent token, used
  deliberately (Variant C emphasis bands; hero scrim option; service-
  class pressed states) rather than treated as missing.
- **Hero contrast: photo-anchored card → guaranteed scrim.** The
  current site hangs the H1 on a white card pinned over the photo. The
  refresh allows variants to lift text off the photo directly _only
  with_ a `linear-gradient` scrim, never raw.

## Density tier

**balanced** (default for brand register; user explicitly excluded
airy with the "96px+ section padding" anti-pattern). Stamped as
`section_padding_desktop: 64px` in DESIGN.md.

## Underspecified inputs

The user's directive resolved every dimension explicitly. No
clarifying questions needed.

The two normally-asked questions:

1. ~~Audience~~ — already specified in PRODUCT.md (current
   audiences inherited verbatim).
2. ~~Density tuning~~ — already constrained by the avoid-list (96px+
   forbidden); defaulted to balanced.

## Resolved divergence inputs

```yaml
mode: brand-faithful (A)
seed:
  decade: 2025-now              (picked_by: user-constraint)
  craft:  transactional brand   (picked_by: user-constraint)
  register: brand               (picked_by: inherited)
  ground_family: stark-white    (picked_by: brand-faithful override)
font_deck: brand-inherited (Gotham)        (picked_by: user-constraint)
palette:   inherited                       (picked_by: user-constraint)
brand_faithful_inversions:
  - rule: no pure #000 text
    inversion: preserve #030c16 (captured near-black; brand decision)
  - rule: no pure #fff background
    inversion: preserve #ffffff (captured ground; brand decision)
  - rule: OKLCH only
    inversion: hex retained to match DESIGN.md frontmatter
anti_toolbox_hits: []
```

## Per-variant compositional theses

Each variant must be a **different refresh strategy**, not three
reskins of the same layout. The shape brief (`home-shape.md`) records
the section-by-section deployment per variant; this section captures
the thesis.

### Variant A — Conservative refresh

**Thesis.** "Same site, properly tuned." The IA is unchanged. Every
section appears in the same order with the same purpose. The refresh
is in the rhythm: tighter type scale, consistent section padding, a
single H2 size where the current site uses two, a 6px radius across
all surfaces.

**The risk-averse stakeholder picks this.** It looks unmistakably like
Virgin Atlantic, with the design fatigue lifted.

**Distinctive moves.**

- One disciplined H2 (31px) replaces the 24/40 ad-hoc pair.
- Cards align on a strict 24px gap; image aspect locked to 4:3.
- Booking widget gains a faint elevation shadow; everything else is flat.
- Pre-travel info row gets refined single-stroke icons in a consistent
  weight.

### Variant B — Compositional shift

**Thesis.** "Same brand, different page." Palette and typography
inherited; the **homepage thesis flips from feature-list-parade to
booking-funnel narrative**: decide → choose your cabin → know what's
included.

**The "we're rethinking how the page works" stakeholder picks this.**
It still looks like Virgin Atlantic, but the page works harder for the
booking customer.

**Section-order shift (vs current and vs A):**

- Cabin classes move **up** from third-down to second — once a
  customer has decided where to go, the next decision is which cabin.
- Pre-travel info promoted from fourth-down to third — completing the
  "what's included" narrative before storytelling.
- Experience cards (Flying Club, Onboard experience, Spa) become a
  single condensed band rather than three-up cards.
- Sustainability moves to a slim emphasis band above the footer (not
  removed — Virgin Atlantic is genuinely committed and the brand team
  would defend its presence — but visually de-prioritised in favour
  of the booking funnel).
- A new **destinations rail** introduces the inspiration moment using
  the captured Lady-in-car-LA photograph (currently used for "Even
  more flights across the Atlantic"); semantic position preserved
  (destinations / inspiration), composition reworked.

### Variant C — Bold direction

**Thesis.** "Same brand, more committed." Palette and typography
inherited but **scale pushed**: hero at 61px (`heading_xxl`), the
captured purple-to-rose gradient finally promoted from photographic
accident to a deliberate emphasis surface, and a thin Virgin-red rule
(2px) introduced as a section-divider signature — echoing the engine-
red of the livery.

**The "are we ready to be more distinctive?" stakeholder picks this.**
It surfaces what stronger commitment to the existing brand would look
like — without inventing anything that isn't already in the captured
surface.

**Distinctive moves.**

- Hero is a full-bleed photograph (the captured plane shot) with a
  3-stop scrim using `brand_purple → brand_purple_deep → transparent`;
  H1 reverses out of the scrim at 61px in Gotham 500.
- Cabin classes use a cinematic 3-image strip (no card chrome) with
  text below — the photography does all the work.
- A thin red rule (2px) sits above every section headline as a brand
  signature.
- Sustainability gets the **brand-purple emphasis band**: full-bleed
  purple-rose gradient with white text, single primary CTA. The only
  non-white content surface in the system, used once.
- Section headers shift one click cheekier in tone:
  - "Our unique experience" → "This is how we fly"
  - "Our mission to net zero" → "Less impact. Same view." _(authorised
    by direction; not invented in prototype)_

These three section-name changes are the only **direction-authorised
copy changes**. Every other label, paragraph, CTA, and link target is
preserved verbatim from `current/pages/home.json` per the content-
sourcing hierarchy.

## Hard constraints (every variant must honour)

- WCAG AA contrast on every text/background pair.
- Hero text on photographic background carries a contrast scrim.
- Section padding 48–64px on body sections; 96px reserved for hero
  only on Variant C.
- Single CTA colour: Virgin red `#da0530`. No two reds on a single
  surface.
- No fabricated stats, addresses, prices, or quotes. Use F-002
  placeholder signature for any value the captured page doesn't
  provide.
- Captured photography reused in the same semantic positions:
  - `web-exclusive-deals.jpg` (the iconic plane in purple sky) is
    the hero photograph. Variants A and B render it inside a hero
    card; Variant C renders it full-bleed.
  - `Lady-in-car-LA.jpg` is the destinations / inspiration image.
  - `flying-kids-economy-cabin-vaa.jpg`, `TOL297_…_Premium`, and
    `upper-class-yellow-jumper-1024x768.jpg` are the cabin
    photographs, in that order.
  - `Barbados.jpg` is the Flying Club image.
  - `va_shot_9_international-biz_traveller`, `Check in.png`,
    `clubhouse-spa-image` are the experience cards.
  - `aircraft-model-795x448-V2.jpg` and
    `SAF-flight_mobile_700x670--1-.jpg` are the sustainability images.
- Editorial-register section names forbidden.

## Pages in scope

- `home` — extracted, directed.

## Command sequence resolved

1. `$stardust extract https://www.virginatlantic.com/ --single` — done.
2. `$stardust direct …` — current section.
3. `$stardust prototype home` — generates three proposed files
   (`home-A-conservative-proposed.html`, `home-B-shift-proposed.html`,
   `home-C-bold-proposed.html`) plus a 3-up viewer (`home.html`) per
   the variants above.

## User confirmation

User directive included `PROCEED — run all phases without stopping
for confirmation`. Mode A automatic; density default applied; no
clarifying questions issued.
