# Brand-review template

The contract for `stardust/current/brand-review.html` — the
self-contained visual artifact emitted at the end of `extract`. The
review is the **first surface a human can eyeball** to verify the
extraction before committing to a redesign direction. It exists to
catch misreads cheaply (re-extract is fast; re-direct + re-prototype
is not).

The review is **descriptive, not prescriptive**. It describes what
the existing site is. The prescriptive equivalent — Do's / Don'ts on
the *target* — lives on the brand board emitted later in the pipeline
by `direct`. The two have the same shape, different mode.

---

## Output

```
stardust/current/brand-review.html
```

Self-contained: embedded CSS, no external JavaScript, no analytics, no
external font loads (use the brand's own captured `font-family` stacks
with system fallbacks; if the brand font is hosted on a CDN the
proposal already references, link to it directly — the review may be
viewed offline). Sticky section nav so reviewers can jump.

The page **renders in the brand's own captured colors and fonts**,
not in a generic shell. The reviewer should feel like they're looking
at *this site's* brand-review, not a stardust template applied to it.

---

## Source artifacts

The template reads from:

| input | role |
|---|---|
| `stardust/current/PRODUCT.md` | Voice, personas, content pillars, register, brand personality |
| `stardust/current/DESIGN.md` | Frontmatter tokens (colors, typography, rounded, spacing) |
| `stardust/current/DESIGN.json` | `extensions` block — motifs, voice, componentStyle, systemComponents, scaleAudit |
| `stardust/current/_brand-extraction.json` | Palette, type, motifs, system components, voice, register, embed-dominated pages |
| `stardust/current/pages/<slug>.json` | Per-page data: heading outlines, CTAs, components inventory, embedDominance, cssCustomProperties |
| `stardust/current/_crawl-log.json` | Coverage data: pages crawled, filtered, wait summary |
| `stardust/current/assets/screenshots/<slug>.png` | Thumbnails strip |
| `stardust/current/assets/logo.<ext>` | Masthead logo |

**Never invent.** Every value rendered must trace back to one of
these files. When data is missing for a section, omit the section —
do not fabricate placeholders. Empty sections are themselves a signal
worth surfacing in the coverage callout.

---

## Section contract

Render in this exact order. Sections marked `*` are current-state
additions absent from the v1 target board.

1. **Coverage callout `*`** — the very top. "Extracted N of M pages
   (~X% DESIGN coverage)" + a one-line list of page-types not
   covered. The reviewer sees what's missing before they trust
   anything below.
2. **Masthead** — site name, tagline (from PRODUCT.md or
   `og:site_name`), logo, origin URL, extraction timestamp.
3. **Coverage thumbnails strip `*`** — viewport screenshot row of
   every extracted page (already on disk per
   `playwright-recipe.md` § Capture list (14)). Each thumbnail
   labelled with slug + an `observed/inferred/synthesized` badge if
   the page contributed to a non-mechanical section below.
4. **Color palette** — render each palette entry as a swatch with
   value, role, occurrences, `usedAs` chips, and the top 3 source
   pages. Pure black/white kept verbatim (per
   `brand-surface.md` § Palette aggregation rules).
5. **Typography** — heading family, body family, mono family if any.
   Render real samples ("The quick brown fox" + numerals + symbols)
   in each family at each captured size. Show `scaleAudit.kind` —
   "modular (major-third, 1.250)" or "ad-hoc" with the observed
   ratios listed.
6. **Voice** — heroHeadline, heroSubcopy, firstParagraph, ctaSamples,
   navItems, footerHeadings. Render as actual prose blocks, not
   bullet lists. Tone guess shown as a tag, not a claim ("guess:
   professional-warm" with evidence string).
7. **Tensions `*`** — see § Tensions below. **Positioned right after
   Voice and before Motifs** so the reviewer sees what to argue with
   before the visual deep dive.
8. **Motifs** — primary/secondary/pill border-radius with example
   blocks rendered at each radius. Shadow stack — render three
   sample boxes with shadows applied. Gradient inventory rendered as
   gradient strips. Patterns listed with `evidence` strings.
9. **Components** — render representative samples from
   `componentStyle`: primary button, secondary button, ghost button,
   card, input. Each rendered live (in HTML/CSS) with the captured
   token values. This is the highest-density "does this look like
   the site?" check.
10. **System components `*`** — for each entry in
    `_brand-extraction.json` § systemComponents, render the verbatim
    `exampleBlock` with a `appears on N/M pages` badge and the list
    of pages it appears on. The reviewer immediately sees what
    repeats across the site.
11. **Spacing & shape** — `baseUnit`, `scale[]`, `sectionPadding`,
    `containerMaxWidth`, `gridGap`. Render the scale as a row of
    boxes whose widths reflect each value.
12. **Photography / imagery** — sample 6–12 images from
    `media.images[]` across pages. Show alt text under each — sites
    with empty `alt` everywhere are themselves a tension.
13. **Content pillars** — extracted from `PRODUCT.md`'s structure;
    render the pillars as the navigation of a typical page-type tour.
14. **Personas** — from `PRODUCT.md`. Mark with `inferred` badge if
    PRODUCT.md derived them rather than the site stating them.
15. **Logo & favicons** — masthead logo at multiple sizes (32, 64,
    256), favicon at 16/32, dark-on-light and light-on-dark
    backgrounds. Flag with a tension if only one variant captured
    (`brand-surface.md`'s logo locator stops at first hit).
16. **Embed-dominated pages `*`** — section appears only when one or
    more pages have `embedDominance.dominated: true`. Render the
    screenshot at thumbnail size with a link to the iframe `src` and
    a callout: "primary content lives in a third-party embed —
    visual style not captured."

For each section, render only if the source data exists. Missing
sections do **not** error — they're omitted, and the coverage
callout (§1) reflects what's missing.

---

## Badges

Every section header carries one or more badges signalling provenance:

| badge | meaning |
|---|---|
| `observed` | Frequency-counted from CSS across ≥3 pages. High confidence. |
| `home-only` | Sourced from a single page (the home page). Lower confidence; biased toward hero/CTA-heavy markup. |
| `cross-page` | Aggregated across all extracted pages. High confidence. |
| `inferred` | The agent read raw data and made a judgment call (e.g. tone guess, persona). Lowest confidence; reviewer should challenge. |
| `synthesized` | The data was constructed from extracted inputs into a higher-level claim (e.g. `register: brand`, `scaleAudit.kind: ad-hoc`). |

Badges drive the reviewer's trust. The masthead carries no badge.
Sections sourced from `_brand-extraction.json` carry the badge that
field's aggregation scope dictates (per
`brand-surface.md` § Aggregation scope).

---

## Tensions

Descriptive observations of where the existing site internally
contradicts itself. **These are not prescriptions.** They are the
explicit decision agenda for `direct`. The naming is deliberate:

- **Target board** (post-`direct`) → "Do's and Don'ts" — prescriptive.
- **Current-state review** (this artifact) → "Tensions" — descriptive.

Same shape, different mode.

### Detector rules

Each rule produces zero or more tension cards. Detection is
**mechanical** — no LLM reasoning required for the baseline. The agent
may add nuanced tensions on top, but the review never ships without
the mechanical baseline.

| ID | Rule | Source field | Trigger | Card copy template |
|---|---|---|---|---|
| `T-scale` | Type scale is non-modular | `_brand-extraction.json#type.scaleAudit.kind` | `=== "ad-hoc"` | "Type scale is ad-hoc ({sizes joined by →}, no consistent ratio). Direct will need to decide whether the target adopts a modular scale." |
| `T-radius-vocab` | Multiple small radii in use | `_brand-extraction.json#motifs.borderRadius.occurrences` | More than 2 distinct values < 16px each with ≥10 occurrences | "Radius vocabulary is fragmented: {list of radii with counts}. Direct will need to pick a single small-radius value or accept the variance." |
| `T-cta-vocab` | CTA copy fragmented across semantic siblings | aggregated `pages/*.json#ctas[].label` | ≥2 distinct labels from the same CTA-equivalence bucket appear (see § CTA equivalence buckets) | "CTA voice is fragmented: {labels with counts}. Direct will need to pick a canonical voice for see-more / read-more / learn-more affordances." |
| `T-link-content-free` | Content-free link labels in use | aggregated `pages/*.json#links.internal[].text` and `external` | Any of `{ "here", "click here", "read this", "more", "this" }` appears as link text ≥1× | "Content-free link labels found: {labels with counts and example pages}. Accessibility issue — screen readers and crawlers cannot tell what these point to." |
| `T-logo-variants` | Single logo variant captured | `_brand-extraction.json#logo` | Always emits — current locator chain only captures first hit | "Only one logo variant captured ({source}). The redesign will need a monochrome / inverted / SVG variant set; direct should plan that." |
| `T-color-imbalance` | Palette color used for text only or fill only | `_brand-extraction.json#palette[].usedAs` | Any color (excluding pure black, pure white, and `text-primary`/`text-secondary` roles) where `usedAs` contains only `["text"]` or only `["background"]` | "Color {value} ({role}) appears as {usedAs[0]} only — never as {missing contexts}. Direct will need to decide: drop, expand, or keep as accent." |
| `T-no-tokens` | Site ships no design tokens | aggregated `pages/*.json#cssCustomProperties` | Empty across every page | "No CSS custom properties defined. The current site has no design-token layer; the migration target will introduce tokens, which is a structural change worth calling out to the user." |
| `T-embed-dominance` | Embed-dominated page exists | `pages/*.json#embedDominance.dominated` | True on ≥1 page | "Page(s) {slug list} have primary content inside a cross-origin embed ({src host}); brand-surface tokens for those pages were not captured. Direct will need to decide whether the redesign targets the host page or the embed surface." |
| `T-img-alt-empty` | Empty `alt` text widespread | aggregated `pages/*.json#media.images[].alt` | ≥30% of images have empty or whitespace-only `alt` | "{N}% of images carry empty alt text. Accessibility issue and a content-sourcing decision for direct." |
| `T-nav-conflict` | Two top-nav items compete for the same audience action | aggregated `pages/*.json#landmarks[?role==banner|navigation]` heading-sequence | ≥2 nav items whose labels match an action-conflict pair (see § Action-conflict pairs) | "Top-nav contains both {label A} and {label B}; these typically compete for the same user moment. Direct should resolve which is primary." |
| `T-temporal-mark` | Logo or visible site element references a time-bound campaign | `_brand-extraction.json#logo.sourceSelector` + alt + `voice.heroHeadline` | Substring match against `{ "anniversary", "centennial", "20XX edition", "year-in-review" }` (case-insensitive) | "A temporal mark was detected ({matched substring}). Direct will need to decide whether the redesign carries the temporal flag forward or returns to an evergreen brand." |

When a rule's data is unavailable (e.g. crawl too small for
cross-page detection), skip the rule silently. The Tensions section
is allowed to be empty — that itself is a signal about either the
site or the crawl scope.

### Card layout

Each tension card renders as:

```
[badge: T-scale | observed]
Type scale is ad-hoc

14 → 18 → 20 → 32 → 45 → 60, no consistent ratio.
Direct will need to decide whether the target adopts a modular scale.

Source: _brand-extraction.json § type.scaleAudit
```

Three lines maximum: the rule title, the data + decision-prompt, the
source citation. No fluff.

### CTA equivalence buckets

Closed list (v0.2). If a CTA label matches one of these buckets and
≥2 distinct labels in the same bucket appear, emit `T-cta-vocab`.

| bucket | members |
|---|---|
| `see-more` | `see more`, `learn more`, `more info`, `more`, `read more`, `view more`, `discover more`, `explore` |
| `start` | `get started`, `start now`, `start free`, `try it`, `try now`, `try free`, `try for free`, `begin` |
| `contact` | `contact`, `contact us`, `get in touch`, `talk to us`, `reach out`, `say hello` |
| `buy` | `buy now`, `purchase`, `order now`, `order`, `add to cart`, `checkout` |
| `signup` | `sign up`, `signup`, `create account`, `register`, `join`, `subscribe` |
| `donate` | `donate`, `donate now`, `give`, `give now`, `support us`, `contribute` |
| `vague-here` | `here`, `click here`, `read this`, `this`, `more` (also flagged by `T-link-content-free` as content-free) |

Match is case-insensitive, leading/trailing whitespace stripped.
Fuzzy matching (edit-distance, embeddings) is **out of scope for v0.2**
— the closed list catches the obvious cases without producing
false-positive tensions.

### Action-conflict pairs

Closed list. If both labels in a pair appear in the site's top
navigation, emit `T-nav-conflict`. The pairs encode a known UX
tension where two CTAs compete for the same user moment.

| pair | rationale |
|---|---|
| `donate` ↔ `crisis` / `get help` / `find help` | nonprofit: giver vs receiver overlap on the home nav |
| `pricing` ↔ `contact sales` | self-serve vs assisted-sales path competing |
| `sign up` ↔ `start free trial` | semantic redundancy (one signal, two phrasings) |
| `book a demo` ↔ `talk to sales` | redundancy as above |
| `sign in` ↔ `log in` | label inconsistency on the same auth action |

This list is **explicitly small** in v0.2. Add to it when a real run
surfaces another pair worth catching.

---

## Styling rules

The review is a single HTML file. Constraints:

- **No external JavaScript.** Sticky nav uses CSS `position: sticky`.
  Tab-like navigation between sections is anchor-link based.
- **No external font loads** unless the brand already loads them on
  the live site — in which case use the same `<link>` the live site
  uses (read from a representative page). Otherwise, use the captured
  font stacks with system fallbacks.
- **Embedded CSS only.** No external stylesheets. The `<style>` block
  goes in `<head>`.
- **Render in the brand's own colors and typography.** The page
  background is the captured `palette[role="background"]`, body text
  is `palette[role="text-primary"]`, headings use `type.headingFamily.stack`,
  body uses `type.bodyFamily.stack`. The review feels like the site.
- **Sticky table of contents** down the left side at ≥1024px wide;
  collapses to a top-bar on narrower viewports.
- **Print-friendly.** A reviewer should be able to print it to PDF
  and have all sections paginate cleanly.

### Color contrast

If the captured `text-primary` on `background` fails WCAG AA
(contrast ratio < 4.5:1), the template overrides with
`#0f1217` on `#ffffff` for the review's body copy and surfaces a
tension card (`T-contrast`, not in the rule table above — the
template adds this contextually because it directly affects the
review's own readability).

---

## What this artifact is not

- A **target brand board.** That's `direct`'s output later in the
  pipeline. The current-state review describes; the target board
  prescribes.
- A **critique.** The Tensions are forced decisions for `direct`,
  not value judgments. "Type scale is ad-hoc" is not "type scale is
  bad" — it's "the redesign target must take a position on this."
- A **migration spec.** The review describes the existing surface; it
  does not propose how to change it.
- An **interactive tool.** No JS, no live editing. The review is read,
  reasoned about, and used as the basis for a conversation with
  `direct`.

---

## Open issues for v0.3

Tracked here so we don't lose them:

- **Fuzzy CTA clustering.** Edit-distance or embedding-based — would
  catch `start your trial today` ↔ `try it free` which the closed
  list misses.
- **Cross-locale tensions.** Multi-locale sites currently extract
  one locale only; tensions across locales are out of scope until
  multi-locale crawl is in.
- **DOM-fingerprint cross-page detection.** The current heading-sequence
  diff (`brand-surface.md` § System components) misses repeated blocks
  that share structure but vary in copy. Full DOM-fingerprint diff
  would catch them.
- **Animation/motion capture.** Animations are disabled during
  extraction (`reducedMotion: reduce`); the review can't surface
  motion tensions until animation capture is in scope.
