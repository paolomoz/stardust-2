# Playwright recipe

The exact browser configuration and capture list every page extraction
must use. Carried forward from stardust v1's brand-extract recipe with
adjustments for multi-page operation.

The agent invokes Playwright via the Playwright MCP server if available,
otherwise via `npx playwright` from the Bash tool. Either way, the
parameters below are mandatory.

---

## Browser configuration

```
browser:        chromium
viewport:       1440 × 900
deviceScaleFactor: 2
colorScheme:    light       (capture again with "dark" only if direction.md needs it later)
locale:         en-US       (override per-page if site Content-Language differs)
reducedMotion:  reduce      (so animation transforms don't pollute computed styles)
javaScriptEnabled: true
ignoreHTTPSErrors: true     (some staging hosts ship invalid certs)
```

## Navigation

```
goto(url, { waitUntil: "networkidle", timeout: 30000 })
wait 1500 ms                 // grace period for late JS paints
scroll the page to bottom in three steps with 500 ms pauses between
scroll back to top
```

The grace period catches lazy-loaded hero media, fonts that swap after
networkidle, and analytics-blocked late paints. The scroll-to-bottom
pass triggers IntersectionObserver-driven content (carousels, fold-in
sections, lazy images) so it lands in the captured DOM.

## Hard timeout

If `networkidle` never fires (infinite analytics polling, websocket
keepalive), fall back to a 10 s hard timeout and capture whatever is
rendered. Note the fallback in `_crawl-log.json`.

## Capture list

For each page, capture:

1. **Final URL after redirects** — the resolved canonical URL.
2. **Document title** and `<meta name="description">`.
3. **OpenGraph tags** — `og:title`, `og:description`, `og:image`,
   `og:type`, `og:site_name`.
4. **Theme color** — `<meta name="theme-color">`, both `media="(prefers-color-scheme: light)"` and `dark` if present.
5. **Heading outline** — every `h1`-`h6` in document order with text
   and computed font-family, font-weight, font-size, line-height,
   letter-spacing, color.
6. **Landmark structure** — every `header`, `nav`, `main`, `aside`,
   `footer`, plus elements with `role="banner|navigation|main|complementary|contentinfo|region"`. For each: tag, role, id, class, child element count.
7. **Visible text per landmark** — innerText, normalised whitespace.
8. **CTA inventory** — every `button`, `[role="button"]`, and `<a>`
   that visually presents as a button (background-color != transparent,
   `border-radius > 2px`, padding > 4 px). Capture: label, href if any,
   computed background-color, color, font-family, font-weight,
   border-radius, padding, box-shadow.
9. **Link inventory** — every `<a href>`. Classify internal vs
   external by host. Strip query and fragment for de-dup.
10. **Per-section style summary** — for each landmark, compute:
    - dominant background-color (most pixels weighted)
    - dominant text color
    - aggregate spacing (mode of `padding-block`, `padding-inline`,
      `gap`, `margin-block`)
    - dominant border-radius (mode of non-zero values across direct
      children)
11. **Media inventory** — for every `<img>`: src, srcset, alt,
    naturalWidth, naturalHeight. For every inline SVG: serialized
    markup hash + viewBox. For every `<video>` and `<iframe>`: src and
    poster.
12. **Form inventory** — for every `<form>`: action, method, list of
    fields with type and name; whether it's wired to an obvious
    third-party (Stripe, Calendly, Typeform, Mailchimp).
13. **Interactive widgets** — modals (open `<dialog>`, `[role="dialog"]`),
    accordions (`<details>`, ARIA-driven), tabs (`role="tablist"`).
14. **Page screenshot** — full-page PNG saved as
    `stardust/current/assets/screenshots/<slug>.png`. Used by `direct`
    later when the user wants to point at a specific section.

## Logo locator chain

For the brand-surface pass (Phase 3 of `extract`), find the logo in
this exact priority order. Stop at the first hit.

1. **Inline SVG** — first `<svg>` inside `header`, `[role="banner"]`,
   or `nav` that is not an icon (heuristic: width or viewBox-derived
   width ≥ 60 px and contains `<text>` or has `aria-label` matching
   the brand name).
2. **`<img>` with logo-ish identifier** — `img` whose `src`, `alt`,
   `class`, or `id` contains `logo`, `brand`, or the brand name slug
   (case-insensitive). Inside `header`, `[role="banner"]`, or `nav`.
3. **`apple-touch-icon`** — `<link rel="apple-touch-icon">` href.
   Resolve relative to base URL.
4. **`og:image`** — `<meta property="og:image">` content.
5. **Favicon** — `<link rel="icon">` href, then `/favicon.ico`,
   then `/favicon.svg`. Skip if dimensions ≤ 32 × 32 (too small to
   serve as logo).
6. **Synthesized placeholder** — final fallback. A 256 × 256 SVG
   containing the brand-name initials in the dominant text color on
   the dominant background. Mark `synthesized: true` in
   `_brand-extraction.json` with a one-line basis.

For each non-synthesized hit, save the asset to
`stardust/current/assets/logo.<ext>` preserving its original format
(SVG > PNG > JPG > ICO). If the hit is inline SVG, serialize and save
as `logo.svg`.

Logo variants (`logo-white.svg`, `logo-mono.svg`) are not extracted in
v2 — they are derived later by `direct` if the redesign needs them.

## What NOT to capture

- Per-element computed styles for every node. Too noisy. Only the
  per-section summary in (10) above.
- Screenshots of every viewport size. Just 1440 × 900 in this phase;
  responsive checks happen in `prototype` and `migrate`.
- Network HAR. Out of scope.
- Cookies, localStorage, sessionStorage. Out of scope.
- Anything that would require authentication.

## Failure isolation

A failure on one page must not abort the crawl. Record the error
(URL, error class, error message, timestamp) in `_crawl-log.json`
under `failures[]` and continue with the next page. The skill's final
state report counts successes vs failures.
