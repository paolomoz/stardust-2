# Brand surface

The shape of `stardust/current/_brand-extraction.json` and the
procedure that produces it. Run once per `extract` invocation, against
the user-designated landing page.

The brand surface is the descriptive ground truth for **what the
existing site looks and feels like at the brand level**. It is the
input both to direct authoring of `stardust/current/PRODUCT.md` and
`DESIGN.md` (Phase 4 of `extract`) and to the `direct` sub-command
when it later reasons about how far to move from the current brand.

Stardust **does not invent** brand-surface values. Every value is
either captured directly from the page or aggregated from captured
values, and carries a source citation.

---

## File shape

```json
{
  "_provenance": {
    "writtenBy": "stardust:extract",
    "writtenAt": "2026-04-25T13:50:00Z",
    "readArtifacts": [
      "https://example.com/",
      "stardust/current/pages/home.json"
    ],
    "synthesizedInputs": [],
    "stardustVersion": "0.2.0"
  },
  "site": {
    "name": "Example",
    "tagline": "...",
    "originUrl": "https://example.com"
  },
  "logo": { /* see § Logo */ },
  "palette": [ /* see § Palette */ ],
  "type": { /* see § Type */ },
  "spacing": { /* see § Spacing */ },
  "motifs": { /* see § Motifs */ },
  "componentStyle": { /* see § Component style */ },
  "voice": { /* see § Voice */ },
  "register": "brand"             // "brand" | "product" | "ambiguous"
}
```

---

## § Logo

```json
{
  "source": "inline-svg",          // one of: inline-svg | img | apple-touch-icon | og-image | favicon | synthesized
  "sourceSelector": "header svg",  // CSS selector or URL — null only for synthesized
  "localPath": "stardust/current/assets/logo.svg",
  "format": "svg",                 // svg | png | jpg | ico
  "intrinsicWidth": 180,
  "intrinsicHeight": 32,
  "synthesized": false,
  "synthesizedBasis": null         // e.g. "Brand initials EX, derived from page title"
}
```

Locator priority chain in `playwright-recipe.md` § Logo locator chain.
First hit wins.

## § Palette

Aggregated computed colors from across the home page. Frequency-sorted,
near-duplicates clustered, role-named.

```json
[
  {
    "role": "background",
    "value": "#ffffff",
    "occurrences": 3421,           // pixels weighted by element area
    "sourceSelectors": ["body", ".container", ".hero"]
  },
  {
    "role": "text-primary",
    "value": "#0f1217",
    "occurrences": 894,
    "sourceSelectors": ["h1", "h2", "p"]
  },
  {
    "role": "primary",
    "value": "#147aff",
    "occurrences": 412,
    "sourceSelectors": [".btn-primary", "a"]
  },
  {
    "role": "surface",
    "value": "#f7f8fa",
    "occurrences": 280,
    "sourceSelectors": [".card", "section.alt"]
  },
  {
    "role": "border",
    "value": "#e5e7eb",
    "occurrences": 156,
    "sourceSelectors": [".card", "input"]
  }
]
```

Aggregation rules:

- Cluster colors within `ΔE < 5` (CIE76 in Lab space) and pick the
  most frequent member as the cluster representative.
- Pure `#000` and `#fff` are kept verbatim — do **not** silently tint
  them. Stardust's job here is descriptive, not corrective. The
  divergence toolkit (in `direct`) will flag pure black/white when
  the redesign target rejects them.
- Role names are heuristic: most-frequent background-color → `background`;
  most-frequent text color → `text-primary`; most-frequent
  background-color on `[role="button"]` and `.btn-*` → `primary`; etc.
  When a role can't be assigned, use `accent-N` with `N` ascending.
- Cap the palette at 8 entries. If the site uses more, keep the top 8
  by occurrences and record the dropped colors in `_provenance.notes`.

## § Type

```json
{
  "headingFamily": {
    "name": "Söhne",
    "stack": "\"Söhne\", system-ui, sans-serif",
    "weights": [400, 600, 700],
    "sizes": ["clamp(2rem, 5vw, 3.5rem)", "2.25rem", "1.75rem"],
    "lineHeights": [1.1, 1.15, 1.2],
    "letterSpacing": ["-0.02em", "-0.015em", "-0.01em"],
    "sourceSelectors": ["h1", "h2"]
  },
  "bodyFamily": {
    "name": "Inter",
    "stack": "\"Inter\", system-ui, sans-serif",
    "weights": [400, 500],
    "sizes": ["1rem", "0.9375rem", "0.8125rem"],
    "lineHeights": [1.5, 1.55, 1.4],
    "letterSpacing": ["normal"],
    "sourceSelectors": ["p", "li", "label"]
  },
  "monoFamily": null,
  "scaleRatio": 1.25,              // computed from heading sizes; null if non-modular
  "loadStrategy": "swap"            // detected from font-display in @font-face rules
}
```

Identify heading vs body by which family appears in the heading
outline (`pages/<slug>.json` § Headings) most often. If only one
family is in use, set both `headingFamily` and `bodyFamily` to it
with disjoint weights.

## § Spacing

```json
{
  "baseUnit": 4,                   // 4 | 8 — inferred from mode of paddings/gaps
  "scale": [4, 8, 12, 16, 24, 32, 48, 64, 96],
  "sectionPadding": "96px",
  "containerMaxWidth": "1280px",
  "gridGap": "24px"
}
```

If the existing site lacks rhythm (paddings are arbitrary, no
detectable scale), set `scale: []` and `baseUnit: null` — the
divergence toolkit will flag this in `direct`.

## § Motifs

Signature visual moves the existing site uses repeatedly.

```json
{
  "borderRadius": {
    "primary": "8px",              // mode of non-zero border-radii on cards/buttons
    "secondary": "16px",
    "pill": "9999px"
  },
  "shadows": [
    { "value": "0 1px 2px rgba(0,0,0,0.06)", "uses": "buttons" },
    { "value": "0 4px 16px rgba(0,0,0,0.08)", "uses": "cards" },
    { "value": "0 24px 48px rgba(0,0,0,0.12)", "uses": "modals" }
  ],
  "gradients": [
    { "value": "linear-gradient(135deg, #147aff 0%, #6b21ff 100%)", "uses": "hero-background" }
  ],
  "patterns": [
    { "name": "card-grid",         "evidence": "3 sections use 3-column repeat-cards" },
    { "name": "hero-with-image",   "evidence": "home hero uses split-half image+copy" },
    { "name": "social-proof-strip", "evidence": "logo strip after hero" }
  ]
}
```

Patterns is the open-ended one. Common values to watch for: `card-grid`,
`hero-with-image`, `hero-with-illustration`, `feature-3up`, `feature-list`,
`stat-row`, `pricing-3up`, `social-proof-logos`, `testimonial-carousel`,
`cta-band`, `footer-mega`, `nav-mega`. Add new pattern names freely;
this is descriptive.

## § Component style

The v1 fields, preserved so nothing is lost when DESIGN.json's
`extensions` block carries them forward.

```json
{
  "buttons": {
    "primary": {
      "background": "#147aff",
      "color": "#ffffff",
      "borderRadius": "8px",
      "padding": "12px 24px",
      "fontWeight": 600,
      "shadow": "0 1px 2px rgba(0,0,0,0.06)",
      "hoverDelta": "lighten 6%"
    },
    "secondary": { /* ... */ },
    "ghost": { /* ... */ }
  },
  "dualCTAPattern": "primary-then-secondary-link",  // observed if both appear together; null otherwise
  "cards": { "background": "#f7f8fa", "borderRadius": "12px", "padding": "24px", "shadow": null, "border": "1px solid #e5e7eb" },
  "inputs": { "borderRadius": "8px", "padding": "10px 12px", "border": "1px solid #d1d5db", "focusRing": "0 0 0 3px rgba(20,122,255,0.2)" }
}
```

## § Voice

Sampled copy from the home page. Used by `direct` to reason about
tone moves and to seed the `voice.examples.do/dont` arrays in
DESIGN.json.

```json
{
  "heroHeadline": "Build, ship, and own your work",
  "heroSubcopy": "...",
  "primaryCTALabel": "Start free trial",
  "ctaSamples": ["Start free trial", "Talk to sales", "See pricing", "Read the docs"],
  "navItems": ["Product", "Pricing", "Customers", "Docs", "Sign in"],
  "footerHeadings": ["Product", "Company", "Resources", "Legal"],
  "firstParagraph": "...",
  "tone": {
    "guess": "professional-warm",  // descriptive guess; one of: professional-warm | professional-formal | playful-bright | playful-dry | technical-precise | aspirational | bold-direct | other
    "evidence": "short sentences, second-person address, no jargon"
  }
}
```

The `tone.guess` is a heuristic — never present it as ground truth in
the user report. `direct` will use it as one of several signals, not
as a fact.

## § Register

```json
"register": "brand"
```

One of `brand`, `product`, `ambiguous`. Heuristic:

- `brand` if landing-page indicators dominate: hero with marketing
  copy, social proof, pricing, signup CTA above the fold, no
  authentication required to see the page.
- `product` if tool indicators dominate: data tables, navigation
  optimized for known features, requires auth, contains widgets like
  filters and sort.
- `ambiguous` if both appear or neither dominates. Stardust will ask
  the user in `direct` rather than guess.

---

## What this file is **not**

- A definition of what the brand should be. That's the *target*
  PRODUCT.md and DESIGN.md, written by `direct`.
- A critique. No judgement, no scores. `critique` belongs to
  impeccable.
- A migration spec. The brand surface describes; it does not
  prescribe.
