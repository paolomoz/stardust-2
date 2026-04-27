<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape (retrofit)
  writtenAt:        2026-04-27T19:00:00Z
  page:             home
  pageUrl:          https://aurora-coffee.example.com/
  againstDirection: stardust/direction.md (Active 2026-04-26T13:15:00Z)
  consumedBy:       impeccable:craft (already invoked at 2026-04-26T13:45:00Z; see home-proposed.html provenance)
  readArtifacts:
    - stardust/current/pages/home.json
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
  retrofitNote: |
    This brief was authored retroactively as part of the F-015 site/page split
    migration (commit subject: "demo/fixture: F-015 retrofit of home-shape.md").
    The proposed HTML (home-proposed.html) was rendered before the brief existed;
    the brief documents the page-level decisions already encoded in that file so
    a future reader can read the deployment in prose, not just by inspecting CSS
    selectors. Future pages in this fixture would be brief-first.
  stardustVersion:  0.2.0
-->
---
slug: home
url: https://aurora-coffee.example.com/
register: brand
---

# Page shape: home

The Aurora Coffee home page deploys the Vintage Cottage Charm
system (per project-root `DESIGN.md`) as a six-section editorial
sequence. The composition decisions below are home-page-specific —
the same DESIGN.md drives every other page in the inventory but
each gets its own `<slug>-shape.md` describing its own deployment.

## Sections (in render order)

1. **masthead** (system-component role: `header`) — site-wide nav.
   Composition for this page: contained width, Ground background,
   wordmark left ("Aurora Coffee" in display family), 4 nav links
   right (Beans · Subscriptions · Wholesale · Story), `Shop`
   button-primary on the far right. No second row.
2. **hero** — full-bleed Ground surface; split-media on wider
   viewports, stacked at <768px. Headline left in `riso-display`
   treatment ("Send-it nine ways from Sunday."), tagline below in
   body family, two CTAs (`Subscribe` button-primary,
   `Shop beans` button-secondary). Right column: a single
   product card showing this week's roast bag with farm name +
   country + cup notes + roast date in `pill-meta` chips.
3. **this-week** — split-media, 5/3 ratio (text 5, image 3) at
   ≥1024px, stacked below. Heading "What's in the kitchen this
   week", body paragraph + a `pill-meta` row showing 3 origins.
   Right column: editorial photo of the roaster.
4. **how** — split-media inverted 5/3 (image 3, text 5). Heading
   "How we got here", two paragraphs + one inline marginalia
   annotation in Homemade Apple ("First sack: a 6 kg sample from
   Cumbal."). Sage whole-section surface (per DESIGN.md voice
   rule: Sage as surface, not stripe).
5. **cup-notes** — 3-column grid at ≥768px, stacked below. Three
   cup-note cards (Ethiopia · Yirgacheffe · Aleta Wondo;
   Colombia · Cundinamarca · Cumbal; Guatemala · Huehuetenango ·
   La Bolsa), each with a `pill-meta` "Single origin" tag, roast
   date in Special Elite, and a 2-line tasting note.
6. **cta-band** — full-bleed Rose surface, two-line heading + one
   button-primary inverted (Ground background, Rose text). Sits
   above the footer. Replaces the conventional newsletter signup
   in the trailing position.
7. **footer** (system-component role: `footer`) — site-wide.
   Three-column layout: Shop · Stories · Hello. Marginalia in
   Homemade Apple in the third column ("Find us at the South
   Yard market, Saturdays.") — second of the page's two
   marginalia per DESIGN.md voice rule.

## Layout strategy

- Density: airy at 8pt base scale per DESIGN.md `spacing`.
- Container max-width: 1180px (per DESIGN.json `breakpoints`).
- Full-bleed sections (hero, cta-band) extend to viewport edges.
- Split-media sections alternate orientation: `this-week` is 5/3
  text-left; `how` flips to 5/3 text-right (image-left). The
  alternation is the editorial-split rule from DESIGN.md § 5.
- Marginalia in Homemade Apple appears **exactly twice** on this
  page: once in the `how` section's body, once in the footer. Per
  DESIGN.md voice rule "Set marginalia in Homemade Apple where a
  footnote would go. Twice per page maximum."

## Key states

- Default — described above.
- Empty (no this-week roast) — replace `this-week` section with a
  one-line CTA "Subscribe to be first when the next sack lands."
  in body family. Not invoked in this run; specified for migrate's
  Path B render-from-scratch path if home is later re-migrated
  without an active product.
- Loading / Error — N/A for static content.

## Interaction model

- Masthead `Shop` CTA → `/shop`.
- Hero CTAs: `Subscribe` → `/subscribe`, `Shop beans` → `/shop`.
- Cup-note cards — click expands a `<details>` pane inline with
  the full tasting note (no modal, no JS). CSS-only.
- CTA-band button → `/subscribe`.
- Footer marginalia — non-interactive prose.

## Data attributes

- `header[data-section="masthead"][data-intent="orient"][data-layout="contained"]`
- `section[data-section="hero"][data-intent="emotional hook"][data-layout="full-bleed"]`
- `section[data-section="this-week"][data-intent="value proposition"][data-layout="split-media"][data-items="1"]`
- `section[data-section="how"][data-intent="build trust"][data-layout="split-media"][data-items="1"]`
- `section[data-section="cup-notes"][data-intent="discovery"][data-layout="grid"][data-items="3"]`
- `section[data-section="cta-band"][data-intent="drive action"][data-layout="full-bleed"]`
- `footer[data-section="footer"][data-intent="orient"][data-layout="contained"]`

## Unsourced content (placeholder list)

(none) — every literal value rendered in `home-proposed.html` is
sourced from `current/pages/home.json` (heading, body copy, CTA
labels, nav labels), `_brand-extraction.json`'s voice samples
(cup-note tasting notes), or direction-authorised content edits
(the explicit "Send-it nine ways from Sunday." headline, recorded
in `direction.md`).

The home page does not deploy a stat row, contact panel, or
testimonial card — sections that would otherwise demand fabricated
content. If a future iteration adds those, every fabricated value
must enter `_provenance.unsourcedContent[]` with the placeholder
visual signature per `before-after-shell.md` § Content sourcing
hierarchy.

## Open questions for craft

(none currently outstanding — the original render at
`home-proposed.html` resolved them)

Reference questions resolved during the original render:

- Q: Should the marginalia render in display family or script
  family?
  A: Script (Homemade Apple), per DESIGN.md voice rule. Resolved.
- Q: Should the cup-note grid be 3-up at desktop only, or also at
  tablet?
  A: 3-up at ≥768px, stacked below. Resolved per the layout
  strategy above.
