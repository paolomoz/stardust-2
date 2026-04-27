# Before/after shell

Stardust's prototype output is **two files per page**, written under
`stardust/prototypes/`:

```
stardust/prototypes/
├── <slug>.html             # the viewer (before/after side-by-side)
└── <slug>-proposed.html    # the proposed redesign on its own
```

The viewer is the user-facing artifact. The proposed file is the
isolated redesign — what `$impeccable live` iterates on, what `migrate`
later re-derives from DESIGN.md.

Two files because:
- **Live mode targets a single file.** `$impeccable live` injects its
  picker into a running page. A standalone `<slug>-proposed.html`
  gives it a clean target.
- **Approval clarity.** The user reviews the viewer; the artifact that
  carries the design decisions is the proposed file.
- **Migration source.** `migrate` reads the proposed file's `:root`
  block and structural data attributes to seed the migrated page,
  even though it re-renders from DESIGN.md (the proposed file is the
  agent's record of what it intended).

---

## `<slug>.html` — the viewer

A self-contained HTML file that loads the current and proposed pages
side-by-side in iframes. No external CSS, no external JS, no
analytics, no fonts.

### Layout

- Two-column flex layout, 50/50 by default.
- Header strip (~48px) with: page slug, side labels ("CURRENT" left,
  "PROPOSED" right), action buttons ("swap sides", "approve",
  "stash"), provenance link.
- Footer strip (~32px) with the resolved direction title (one line)
  and a link to `stardust/direction.md`.
- Body fills the remaining height with two `<iframe>`s.
- A divider between iframes is draggable (CSS resize). The user can
  shift the split.

### Iframes

**Left (CURRENT).**
Source resolution order:
1. Live URL from `state.json` (`pages[<slug>].url`). Default. Loads in
   a sandboxed iframe with `sandbox="allow-scripts allow-same-origin"`.
2. If the live URL is unreachable (offline run, login wall), fall
   back to the screenshot at
   `stardust/current/assets/screenshots/<slug>.png` displayed at
   1:1 in an `<img>` (not an iframe).
3. If neither is available, render an empty state with the page's
   captured `landmarks` summary as a text-only outline.

**Right (PROPOSED).**
Source: `srcdoc` of the relative path to `<slug>-proposed.html` (or
direct iframe src when served by `$impeccable live`'s helper server).
Always reachable; lives next to the viewer on disk.

Both iframes inherit the viewport from the parent page, so the design
is reviewed at the user's actual screen width — not at a fixed 1440px.

### Provenance

First child of `<head>`:

```html
<!-- stardust:provenance
  writtenBy:        stardust:prototype
  writtenAt:        2026-04-25T16:42:00Z
  page:             home
  pageUrl:          https://example.com/
  proposedFile:     ./home-proposed.html
  againstDirection: stardust/direction.md (Active 2026-04-25T15:42:00Z)
  readArtifacts:
    - stardust/current/pages/home.json
    - DESIGN.md
    - DESIGN.json
  synthesizedInputs: []
  stardustVersion:  0.2.0
-->
```

### Action buttons (header strip)

- **Swap sides.** Toggles which iframe is left vs right. Helpful
  when comparing big visual moves — sometimes the new design "feels"
  bigger when it's on the right; swap to check.
- **Approve.** Marks this prototype `approved` in `state.json`. The
  agent confirms before writing.
- **Stash.** Saves the current `<slug>-proposed.html` as
  `<slug>-proposed-stash-<ts>.html` so the next iteration starts
  fresh without losing this version.
- **Open in `$impeccable live`.** A copy-paste command snippet for
  starting an iteration session against `<slug>-proposed.html`.

The action buttons are HTML buttons with inline JS that posts to
`window.parent` or copies a command to the clipboard — they do not
require a server.

---

## `<slug>-proposed.html` — the proposed redesign

A complete, self-contained HTML page. The thing the user is
ultimately approving.

### Required structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- stardust:provenance ... -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><!-- page title from current/pages/<slug>.json --></title>
  <style>
    /* The :root token contract — see skills/stardust/reference/token-contract.md */
    :root { ... }
    /* component-level styles, derived from DESIGN.json components */
    /* ... */
  </style>
</head>
<body>
  <header data-section="..." data-intent="..." data-layout="..."> ... </header>
  <main>
    <section data-section="hero" data-intent="..." data-layout="..."> ... </section>
    <section data-section="..." ...> ... </section>
  </main>
  <footer data-section="footer" data-intent="..." data-layout="..."> ... </footer>
</body>
</html>
```

### Hard requirements

The proposed file must satisfy:

1. **Self-contained.** No external CSS, no external JS. Fonts: prefer
   system stack; if a custom face is needed (the chosen font deck
   includes it), inline the `@font-face` with a Google Fonts CSS
   `@import` is acceptable for prototyping but not for migrate
   output.
2. **`:root` token block** as the first content of the first
   `<style>`. See `skills/stardust/reference/token-contract.md`.
3. **Structural data attributes** on every section. See
   `skills/stardust/reference/data-attributes.md`.
4. **Provenance comment** as the first child of `<head>`.
5. **Divergence audit clean.** Every anti-toolbox hit (per
   `skills/stardust/reference/divergence-toolkit.md` § 1) appears in
   `DESIGN.json.extensions.divergence.anti_toolbox_hits` with a
   brand-specific justification.
6. **Impeccable hard rules respected.** OKLCH colors, no pure
   `#000`/`#fff`, no glassmorphism reflex, no gradient text, no side
   stripes > 1px, no skipped headings, type ratio ≥ 1.25 for brand
   register.
7. **Content preserved from the current page.** Hero copy, CTAs,
   navigation labels, body copy come from `current/pages/<slug>.json`.
   The redesign changes how content is presented, not what content is
   present, unless `direction.md` explicitly authorises content
   changes. See § Content sourcing hierarchy below for the exact
   contract — including how to handle content the new design
   *demands* but the page *does not provide* (stat rows, addresses,
   testimonial quotes, etc.).

### Content sourcing hierarchy

Every literal value rendered into `<slug>-proposed.html` — every
heading, paragraph, CTA label, statistic, address, quote, name,
phone number, hours, tax ID, link target — must come from one of
the **allowed sources** below, or be rendered with the **mandatory
PLACEHOLDER signature**.

This section exists because the v0.2 prototype produced fabricated
content (`STARDUST-FEEDBACK.md F-002`): an invented stat row, an
invented street address, an invented tax ID, and a memoir quote
attributed to a real person who never said it. For a real nonprofit
or any production site this is a serious harm — invented content
looks authoritative once rendered.

#### Allowed sources, in priority order

1. **`stardust/current/pages/<slug>.json`** — the captured page.
   Use values verbatim. Headings, body copy, CTA labels, navigation
   labels, link targets, alt text, form fields all live here.
2. **`stardust/current/_brand-extraction.json`'s voice samples** —
   `voice.heroHeadline`, `voice.firstParagraph`, `voice.ctaSamples`,
   `voice.navItems`, `voice.footerHeadings`. Used when a page's own
   JSON lacks a value the design demands and the brand-surface
   sample is the closest authentic source.
3. **`stardust/direction.md` § Pages in scope content**, if direction
   explicitly authorises new content (e.g. a renamed CTA, a
   shortened tagline). Direction must spell out the change verbatim
   — not just "rewrite the hero in playful tone."
4. **None of the above.** Render with the PLACEHOLDER signature
   (next subsection). Do not invent.

The agent **must not invent** any of the following without
explicit user-confirmed direction-document authorisation:

- Numerical statistics (people served, dollars raised, years in
  operation, percentages, counts).
- Postal addresses, suite numbers, floor numbers.
- Phone numbers, email addresses.
- Tax IDs, registration numbers, license numbers, EINs.
- Quotes, testimonials, named persons' words.
- Hours of operation, holiday schedules, event dates.
- Awards, certifications, partnership names.
- Pricing, plan names, feature lists not in the captured page.

These categories are the most consequential to invent and the most
likely to be demanded by a redesign template (stat rows,
testimonial cards, contact panels, pricing tables) without the
captured page providing them.

#### PLACEHOLDER visual signature (mandatory)

When the new design demands content the captured page does not
provide, render it as a placeholder element with **all** of:

- A `2px dashed var(--accent)` outline.
- A monospace eyebrow text reading
  `PLACEHOLDER · <type>` where `<type>` is one of:
  `stat | address | quote | tax-id | phone | email | hours | award | price | other`.
- A distinct background tint (e.g. `var(--surface-alt)` with
  `opacity: 0.7`).
- A short example or shape hint inside (e.g. `e.g. 18,400 people
  housed`) to communicate the slot's intent — but clearly marked
  as illustrative, not factual.
- HTML annotation:

  ```html
  <span data-placeholder="true"
        data-placeholder-type="stat"
        data-placeholder-source="design demanded by T-stat-row-pattern; not in current/pages/home.json">
    <span class="placeholder-eyebrow">PLACEHOLDER · stat</span>
    <span class="placeholder-shape">e.g. 18,400 people housed</span>
  </span>
  ```

The visual signature is not optional and must remain visible in
screenshots. The reviewer must be unable to mistake a placeholder
for real content.

#### Provenance log of unsourced content

Add an `unsourcedContent[]` array to the proposed file's provenance
listing every placeholder element rendered, with the reason:

```yaml
unsourcedContent:
  - selector: "section[data-section=\"stats\"] .stat:nth-child(1)"
    type: stat
    reason: "design demanded stat row; current/pages/home.json provides no statistics"
  - selector: "footer address"
    type: address
    reason: "design demanded contact address; current/pages/home.json has only nav links"
  - selector: ".testimonial blockquote"
    type: quote
    reason: "design demanded testimonial card; voice samples include names but no quoted text"
```

This list is the canonical record of what needs to be sourced
before the prototype becomes a production deliverable.

#### Migrate guard

`migrate` reads the proposed file's `unsourcedContent[]` and the
DOM's `[data-placeholder]` elements. If any are present, migrate
**refuses to ship** unless `--allow-placeholder` is passed
explicitly. Without the flag, migrate prints the unsourced list
and exits with a non-zero status. With the flag, migrate ships the
placeholders verbatim into the final HTML — the user has explicitly
acknowledged that the deployable site will contain placeholder
markers visible to end users. Spec for the migrate guard lives in
`skills/migrate/SKILL.md` § Failure modes.

### Provenance

```html
<!-- stardust:provenance
  writtenBy:         stardust:prototype  (or stardust:prototype/iterate after live edits)
  writtenAt:         2026-04-25T16:42:00Z
  page:              home
  pageUrl:           https://example.com/
  iteratedVia:       impeccable:live (sessionId: abc123)
  againstDirection:  stardust/direction.md (Active 2026-04-25T15:42:00Z)
  readArtifacts:
    - stardust/current/pages/home.json
    - DESIGN.md
    - DESIGN.json
  divergenceVersion: v1.0 (stardust v2)
  fontDeck:          zine-maximalist
  paletteSource:     library:Brutalist Dawn (recommended_index=2, picked_index=2)
  unsourcedContent: []   # populated when design demands content the page doesn't provide; see § Content sourcing hierarchy
  stardustVersion:   0.2.0
-->
```

`iteratedVia` is added after the first `$impeccable live` accept;
absent on the initial render. `unsourcedContent[]` lists placeholder
elements per § Content sourcing hierarchy.

---

## How they're written

`$stardust prototype <slug>` writes both files in a single pass:

1. Render `<slug>-proposed.html` first (the heavy lift).
2. Then write `<slug>.html` (the viewer) referencing the proposed
   file by relative path.

Re-iterations rewrite `<slug>-proposed.html` only; the viewer file is
unchanged unless the page slug or proposed filename changes.

---

## Stale handling

When `direction.md` changes, the prototype's provenance comment lists
a `againstDirection` that is no longer the active direction.
`state.json` flags the page `stale: true`. The viewer surfaces this
in the header strip:

```
[STALE] direction changed at 2026-04-26T09:00:00Z
        run: $stardust prototype <slug> --refresh-stale
```

The user can still open and review a stale prototype — it is a valid
artifact representing the prior direction. They opt into refreshing.
