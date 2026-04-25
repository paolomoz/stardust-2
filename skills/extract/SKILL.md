---
name: stardust:extract
description: Crawl an existing website (capped, multi-page) and seed stardust/current/ with PRODUCT.md, DESIGN.md, DESIGN.json, a per-page inventory, and the consolidated brand surface.
---

# stardust:extract

Crawl an existing website, parse each page, extract the brand surface,
and produce a stardust-formatted snapshot of the current state under
`stardust/current/`. The output describes what the site **is**; later
sub-commands consume it to decide what it **should be**.

This skill is **descriptive**: it does not invent direction, it does not
critique, and it does not modify the live site. It writes only under
`stardust/current/` and updates `stardust/state.json`.

## Inputs

- `<url>` — required. The origin to crawl. Examples: `https://example.com`,
  `https://example.com/shop`. A path narrows the same-origin crawl to
  that subtree.
- `--cap <N>` — optional. Override the default 25-page cap.
- `--pages <slug,slug,...>` — optional. Restrict the crawl to specific
  paths (slugs derived per `reference/ia-extraction.md`).
- `--refresh <slug>` — optional. Re-extract one page that already exists
  in `state.json`.
- `--single` — optional. Equivalent to `--cap 1`. Useful for testing.

## Setup

Run the master skill's setup procedure first
(`skills/stardust/SKILL.md` § Setup): impeccable dep check, context
loader, state read.

Additional checks for this sub-command:

1. **Playwright availability.** The extraction step needs a real
   browser. Detect Playwright in this order: a Playwright MCP server,
   then `npx playwright`. If neither is available, stop and tell the
   user how to install Playwright.
2. **Origin collision.** If `stardust/state.json` already records
   `site.originUrl` and the new `<url>` is a different origin, stop and
   ask before clobbering. Stardust does not silently mix two sites in
   one project.

## Procedure

### Phase 1 — Discovery

Discover the page inventory before crawling. Procedure in
`reference/ia-extraction.md`. In summary:

1. Fetch `<origin>/sitemap.xml`, then `<origin>/sitemap_index.xml`,
   then check `robots.txt` for `Sitemap:` directives.
2. If no sitemap is reachable, run a same-origin BFS crawl from
   `<url>`, depth-limited to 3, link-extracting from rendered HTML.
3. Filter the discovered URL list: same origin only, exclude
   `mailto:`, `tel:`, anchor-only links, query-only variations,
   common asset paths (`.css`, `.js`, `.pdf`, image extensions).
4. De-duplicate trailing-slash variations.
5. Apply the cap (default 25, or `--cap`). If discovered count
   exceeds the cap, **show the full list and the cut**, and ask the
   user before proceeding:

   ```
   Discovered 38 pages on https://example.com (sitemap.xml).
   Cap is 25. Proceeding with the 25 highest-priority pages:
     - / (home)
     - /about
     - /pricing
     ... 22 more

   Cut (13 pages): /blog/post-1, /blog/post-2, ...

   Reply "go" to proceed, "all" to lift the cap, or list slugs to
   include manually.
   ```

   Priority heuristic: index page first; then sitemap-declared
   priority; then shorter URL paths; then alphabetical.

6. Write the discovered list to `stardust/current/_crawl-log.json`
   (created if absent) with `_provenance` and the full discovery
   reasoning. This is an audit trail, not a state file.

### Phase 2 — Per-page extraction

For each page in the cap-respecting list, render with Playwright
following `reference/playwright-recipe.md`:

- Viewport 1440 × 900 @ 2× DPR
- Wait for `networkidle`, then 1.5 s grace period
- Disable animations via `prefers-reduced-motion: reduce`

Capture per page (full schema in `reference/current-state-schema.md`):

- Page metadata (title, meta description, OG tags, theme-color)
- Semantic structure: heading outline, landmark roles, sections
- Content: visible text per section, CTA labels and href targets,
  link inventory (internal vs external)
- Per-section computed style summary: dominant colors, font families
  in use, spacing rhythm, border-radius, shadows
- Media inventory: img/srcset with original URLs and intrinsic
  dimensions, inline SVG count, video/iframe presence
- Interactive elements: forms (with field types), buttons, modals
  detected by ARIA roles

Save to `stardust/current/pages/<slug>.json` with `_provenance` as the
first key. Save referenced media to `stardust/current/assets/media/`
preserving basename plus a short content hash.

Mark the page `extracted` in `state.json` immediately after each
successful page write. If a page fails, record the error in
`_crawl-log.json` and continue — extraction is best-effort per page.

### Phase 3 — Brand-surface extraction

Run once, against the user-designated landing page (default: the home
page or whichever page the user pointed `<url>` at). Produces
`stardust/current/_brand-extraction.json` per
`reference/brand-surface.md`. Captures:

- **Logo** by the v1 priority chain: inline SVG → `<img>` with
  logo-ish class/id → `apple-touch-icon` → `og:image` → favicon →
  synthesized placeholder. Save to `stardust/current/assets/logo.<ext>`.
- **Palette** — aggregate computed colors across the home page
  (background, text, accents, borders, hovers). Frequency-sort,
  cluster near-duplicates, emit a role-named list (background, surface,
  text, primary, secondary, accent).
- **Type** — font families in use with their weights, sizes, and
  computed line-heights. Identify the heading family vs body family.
- **Motifs** — signature border-radius (mode across non-zero values),
  shadow stack (top 3 distinct), gradient inventory, common patterns
  (chip, badge, card, hero-with-image).
- **Voice samples** — first paragraph of body copy, the hero headline,
  3 representative CTA labels, a representative link list. Used by
  `direct` later but extracted now so the network round-trip is over.

Do not invent values. Every captured value cites a source selector or
URL in `_brand-extraction.json` for traceability.

### Phase 4 — Seed `stardust/current/PRODUCT.md` and `DESIGN.md`

The current-state PRODUCT.md and DESIGN.md are **descriptive, not
authored** — there is no interview to run because the user is not
defining intent here, the agent is describing the existing site. Write
them directly using impeccable's format specs:

- For PRODUCT.md, follow the section structure in impeccable's
  `reference/teach.md`. Populate `Register` from the brand surface
  (sites that read as marketing/landing → `brand`; tools/dashboards →
  `product`; ambiguous → `brand` with a note). Populate `Users`,
  `Product Purpose`, `Brand Personality`, `Anti-references`, and
  `Design Principles` from the captured copy and the brand surface.
  Where the agent must infer, mark the section with `_provenance:
  inferred` and a one-line basis sentence.
- For DESIGN.md and DESIGN.json, follow the format spec in
  impeccable's `reference/document.md`. Populate frontmatter
  (`colors`, `typography`, `rounded`, `spacing`, `components`) from
  the captured tokens. The `extensions` block of DESIGN.json carries
  v1's `componentStyle`, `motifs`, and `voice` arrays so nothing is
  lost.

Stardust does **not** invoke `$impeccable teach` or `$impeccable
document` for the current-state files: those commands write to project
root (the *target*) and run an interview. Stardust authors the
descriptive snapshot directly. The format spec from impeccable is the
contract; the runtime command is not.

The target-state PRODUCT.md and DESIGN.md at the project root are
written by `$stardust direct` in Phase 2 of the pipeline, not here.

### Phase 5 — Update state and report

After all Phase 2-4 writes succeed:

1. Update `stardust/state.json` (schema in
   `skills/stardust/reference/state-machine.md`):
   - `site.originUrl`, `site.extractedAt`, `site.pageCap`,
     `site.totalDiscovered`, `site.crawled`
   - `pages[]` — one entry per crawled page with `status: "extracted"`,
     filled `currentStatePath`, empty `prototypePath` and `migratedPath`
2. Print a one-screen summary:
   ```
   Extracted https://example.com (25/38 pages, sitemap.xml)

   stardust/current/
     PRODUCT.md            (register: brand, inferred from landing)
     DESIGN.md             (5 colors, 2 type families, 3 motifs)
     pages/                (25 files)
     assets/logo.svg       (extracted from inline SVG)
     _brand-extraction.json
     _crawl-log.json

   Next: $stardust direct  (resolve a redesign direction)
   ```

## Outputs

| Path                                        | Purpose                                             |
|---------------------------------------------|-----------------------------------------------------|
| `stardust/current/PRODUCT.md`               | Descriptive strategy of the existing site (impeccable format) |
| `stardust/current/DESIGN.md`                | Descriptive visual system (Stitch format)           |
| `stardust/current/DESIGN.json`              | Sidecar with extensions for motifs, voice, components |
| `stardust/current/pages/<slug>.json`        | Per-page parsed structure + content                 |
| `stardust/current/assets/logo.<ext>`        | Extracted logo                                      |
| `stardust/current/assets/media/`            | Extracted media referenced by pages                 |
| `stardust/current/_brand-extraction.json`   | Consolidated brand surface (palette, type, motifs, voice) |
| `stardust/current/_crawl-log.json`          | Discovery + crawl audit trail                       |
| `stardust/state.json`                       | Updated with site + per-page status                 |

## Concurrency

Per `state-machine.md`: stardust does not lock. Two concurrent extracts
on the same project are last-write-wins. Document this in the user
report; do not engineer around it.

## Failure modes

- **Network failure mid-crawl.** Continue, record in `_crawl-log.json`,
  end with a partial state. State.json reflects only successfully
  extracted pages. User can re-run; already-extracted pages are
  skipped unless `--refresh <slug>`.
- **Login wall.** Do not attempt to authenticate. If the home page
  redirects to a login screen, capture that one page, mark the rest as
  unreachable, and ask the user how to proceed (provide cookies via
  Playwright config, change the entry URL, or scope to public pages).
- **JavaScript-only content.** Playwright already handles this. If
  `networkidle` never fires (infinite analytics polling), fall back
  to a 10 s hard timeout and capture what is rendered.

## References

- `reference/playwright-recipe.md` — viewport, capture list, logo locator chain.
- `reference/ia-extraction.md` — sitemap + BFS crawl + cap procedure.
- `reference/current-state-schema.md` — per-page JSON schema.
- `reference/brand-surface.md` — consolidated brand-surface schema.
- `skills/stardust/reference/state-machine.md` — state.json contract.
- `skills/stardust/reference/artifact-map.md` — provenance shape.
