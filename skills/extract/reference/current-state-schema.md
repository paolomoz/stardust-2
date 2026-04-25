# Per-page JSON schema

The shape of `stardust/current/pages/<slug>.json`. Every page extracted
by Phase 2 of `extract` writes one of these. Downstream sub-commands
(`direct`, `prototype`, `migrate`) consume it.

The file is JSON because every consumer is non-human. It carries a
`_provenance` first key per the artifact-map convention.

---

## Top-level shape

```json
{
  "_provenance": {
    "writtenBy": "stardust:extract",
    "writtenAt": "2026-04-25T13:42:00Z",
    "readArtifacts": ["https://example.com/about"],
    "synthesizedInputs": [],
    "stardustVersion": "0.2.0"
  },
  "slug": "about",
  "url": "https://example.com/about",
  "finalUrl": "https://example.com/about/",
  "title": "About Example",
  "metaDescription": "...",
  "og": {
    "title": "...",
    "description": "...",
    "image": "https://example.com/og-about.jpg",
    "type": "website",
    "siteName": "Example"
  },
  "themeColor": { "light": "#ffffff", "dark": "#0a0a0a" },
  "language": "en",

  "headings": [ /* see § Headings */ ],
  "landmarks": [ /* see § Landmarks */ ],
  "ctas": [ /* see § CTAs */ ],
  "links": { "internal": [], "external": [] },
  "media": { /* see § Media */ },
  "forms": [ /* see § Forms */ ],
  "widgets": { /* see § Widgets */ },
  "perSectionStyle": [ /* see § Per-section style */ ],

  "screenshot": "stardust/current/assets/screenshots/about.png",

  "stats": {
    "wordCount": 612,
    "ctaCount": 4,
    "internalLinkCount": 18,
    "externalLinkCount": 3,
    "imageCount": 7
  }
}
```

---

## § Headings

Document order. Computed style snapshot of the heading itself.

```json
{
  "level": 2,
  "text": "Our story",
  "id": "story",
  "domPath": "main > section:nth-child(2) > h2",
  "style": {
    "fontFamily": "Inter, system-ui",
    "fontWeight": 600,
    "fontSize": "clamp(2rem, 5vw, 3.5rem)",
    "lineHeight": 1.1,
    "letterSpacing": "-0.02em",
    "color": "rgb(15, 18, 23)"
  }
}
```

## § Landmarks

One entry per `header`, `nav`, `main`, `aside`, `footer` plus
ARIA-role'd equivalents. The structure each landmark contains is in
`children[]` with a flat list of section-level descendants — not the
full DOM tree, just enough to map IA.

```json
{
  "tag": "main",
  "role": "main",
  "id": null,
  "classes": [],
  "innerText": "...",
  "children": [
    {
      "tag": "section",
      "role": null,
      "id": "hero",
      "classes": ["hero", "hero--dark"],
      "purpose": "hero",          // heuristic: "hero" | "feature-list" | "social-proof" | "cta-band" | "footer-nav" | "form" | "rich-text" | "unknown"
      "headlineRef": 0,            // index into headings[] if any
      "innerTextSummary": "first 240 chars",
      "wordCount": 87
    }
  ]
}
```

`purpose` is a **heuristic guess**, not ground truth. Helps `direct`
and `prototype` reason about IA without re-parsing. When unsure, emit
`"unknown"` — never invent.

## § CTAs

Every visually-button-like element. Captured per `playwright-recipe.md`
§ Capture list (8).

```json
{
  "label": "Start free trial",
  "href": "/signup",
  "tag": "a",
  "domPath": "main > section.hero > a.btn-primary",
  "style": {
    "backgroundColor": "rgb(20, 122, 255)",
    "color": "rgb(255, 255, 255)",
    "fontFamily": "Inter, system-ui",
    "fontWeight": 600,
    "borderRadius": "8px",
    "padding": "12px 24px",
    "boxShadow": "0 1px 2px rgba(0,0,0,0.06)"
  },
  "appearsAbove": "fold"          // "fold" | "below-fold"
}
```

## § Links

Two arrays: `internal` (same host) and `external`. Each entry:

```json
{ "href": "/pricing", "text": "Pricing", "domPath": "header > nav > a:nth-child(2)" }
```

De-duplicate by `(href, text)`. Keep the first occurrence's `domPath`.

## § Media

```json
{
  "images": [
    {
      "src": "https://example.com/img/hero.jpg",
      "srcset": "...",
      "alt": "Two engineers at a whiteboard",
      "naturalWidth": 2400,
      "naturalHeight": 1600,
      "localPath": "stardust/current/assets/media/hero-a3f9.jpg"
    }
  ],
  "inlineSvgs": [
    { "viewBox": "0 0 24 24", "domPath": "...", "markupHash": "sha256:..." }
  ],
  "videos": [],
  "iframes": [
    { "src": "https://www.youtube.com/embed/...", "title": "Demo" }
  ]
}
```

`localPath` is set only for media stardust successfully downloaded.
Failed downloads have `localPath: null` and a `downloadError` field.

## § Forms

```json
{
  "action": "/api/contact",
  "method": "post",
  "fields": [
    { "type": "email", "name": "email", "label": "Your email", "required": true },
    { "type": "textarea", "name": "message", "label": "Message", "required": true }
  ],
  "thirdParty": null               // or "stripe" | "calendly" | "typeform" | "mailchimp" | ...
}
```

## § Widgets

```json
{
  "modals": [{ "trigger": "button.open-pricing", "domPath": "..." }],
  "accordions": [{ "domPath": "...", "itemCount": 6 }],
  "tabs": [{ "domPath": "...", "tabCount": 3 }]
}
```

Empty arrays are valid; missing keys are not.

## § Per-section style

One entry per direct child of `main` (or per section landmark for
non-`main`-using sites). The numbers feed `_brand-extraction.json` so
brand-surface aggregation has a stable input.

```json
{
  "sectionRef": "main > section:nth-child(1)",
  "purpose": "hero",
  "background": { "color": "rgb(8, 12, 20)", "hasImage": true, "hasGradient": false },
  "text": { "dominantColor": "rgb(255, 255, 255)" },
  "spacing": { "paddingBlock": "96px", "paddingInline": "48px", "gap": "24px" },
  "borderRadius": "12px",
  "fontFamilies": ["Inter", "Söhne"],
  "shadowsUsed": ["0 4px 16px rgba(0,0,0,0.12)"]
}
```

---

## Required vs optional

Every top-level key listed above is **required** to be present in the
JSON. Missing data within a key is represented by an empty array,
empty object, or explicit `null` — never by omitting the key. This
keeps consumers simple.

The exceptions: `og`, `themeColor`, `forms`, `widgets` may be empty
objects. Empty arrays for `headings`, `landmarks`, `ctas`, `links.*`
are valid (and unusual — log a warning).

## Versioning

The schema version is implicit in
`_provenance.stardustVersion`. If the schema evolves, downstream
consumers branch on the version. Backward-compatible additions do not
require a version bump.
