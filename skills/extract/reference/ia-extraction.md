# IA extraction (sitemap + crawl)

How `extract` discovers the page inventory before crawling. This phase
runs **before** Playwright touches a single page; the goal is to know
the shape of the site so the user can confirm scope and the cap.

---

## Discovery order

1. **`<origin>/sitemap.xml`** — fetch with a `User-Agent: stardust/0.2`
   header. If 200 and well-formed XML, parse `<url><loc>` entries.
   Capture optional `<priority>` and `<lastmod>` for sorting.
2. **`<origin>/sitemap_index.xml`** — if (1) is missing or returns
   the index variant, parse all referenced sitemaps and concatenate.
3. **`<origin>/robots.txt`** — parse for `Sitemap:` directives. If
   present and pointing at a different URL than (1) or (2), fetch it.
4. **BFS crawl** — fallback when no sitemap is reachable. Start from
   `<url>`, render with Playwright (same recipe as Phase 2 but only
   capturing `<a href>` and document title), enqueue same-origin
   internal links. Depth-limit 3, breadth-limit 200 visited URLs
   regardless of cap (so we have something to prioritise from). De-dup
   trailing slashes and `?utm_*`-style tracking params.

If multiple discovery sources return overlapping URLs, prefer
sitemap-declared metadata (priority, lastmod) over crawl order.

## Filtering

Discard URLs that match:

- Different origin or different host.
- Non-HTTP scheme (`mailto:`, `tel:`, `javascript:`, `#`-only).
- Common asset extensions: `.css`, `.js`, `.json`, `.xml`, `.txt`,
  `.pdf`, `.zip`, image extensions (`.png`, `.jpg`, `.jpeg`, `.gif`,
  `.webp`, `.avif`, `.svg` if served as media not page).
- Pagination (`?page=`, `/page/N/`) past page 1.
- API endpoints: paths starting with `/api/`, `/wp-json/`,
  `/.well-known/`.
- Common tracking variants — strip `utm_*`, `gclid`, `fbclid`,
  `mc_*` and treat the canonical URL as the page.

Keep but flag separately:

- Auth-walled paths (heuristic: paths containing `/account`,
  `/dashboard`, `/admin`, `/login`, `/signin`). Listed in
  `_crawl-log.json` under `requiresAuth[]`. Not crawled by default.

## Slug derivation

Slugs are filesystem-friendly identifiers used as keys in `state.json`,
filenames in `current/pages/<slug>.json`, and `prototypes/<slug>.html`.

Algorithm:

1. Take the URL path. Drop leading and trailing slashes.
2. If empty → slug is `home`.
3. Replace `/` with `__`. Example: `/blog/post-one` → `blog__post-one`.
4. Lowercase, ASCII-only, replace any non-`[a-z0-9_-]` with `-`.
5. Collapse runs of `-`. Trim leading/trailing `-`.
6. If the result is empty after normalisation → fall back to a hash
   of the URL prefixed with `_`.
7. If two URLs collapse to the same slug, suffix `-2`, `-3`, etc., in
   discovery order.

The slug is purely a filesystem name. The original URL is always
preserved in `state.json` and per-page JSON.

## Priority for the cap

When discovered count exceeds the cap, the agent must show the user
the full list and the cut. Sort by:

1. Index page (path = `/` or empty) always first.
2. Sitemap `<priority>` descending if present.
3. Sitemap `<lastmod>` descending if priority is tied or absent.
4. Path depth ascending (shorter = more important).
5. Alphabetical.

Present the kept list and the cut list as two columns in the
confirmation message. The user can:

- Reply `go` to accept.
- Reply `all` to lift the cap (still warn if discovered > 100).
- Reply with explicit slugs (`include: about, pricing` or
  `exclude: blog`) to override.

Capture the user's choice in `_crawl-log.json` under
`discovery.userChoice` for the audit trail.

## `_crawl-log.json` shape

```json
{
  "_provenance": { "writtenBy": "stardust:extract", "writtenAt": "...", "stardustVersion": "0.2.0" },
  "discovery": {
    "source": "sitemap.xml",
    "sourceUrl": "https://example.com/sitemap.xml",
    "fetchedAt": "...",
    "discoveredCount": 38,
    "filteredCount": 33,
    "cappedAt": 25,
    "userChoice": "go",
    "kept": [
      { "url": "https://example.com/", "slug": "home", "priority": 1.0, "lastmod": "2026-04-12" }
    ],
    "cut": [
      { "url": "https://example.com/blog/post-1", "slug": "blog__post-1", "reason": "below cap" }
    ],
    "requiresAuth": []
  },
  "crawl": {
    "startedAt": "...",
    "finishedAt": "...",
    "successes": 24,
    "failures": [
      { "slug": "contact", "url": "...", "errorClass": "TimeoutError", "message": "...", "at": "..." }
    ]
  }
}
```

This file is descriptive and append-only. Re-running `extract` adds a
new top-level entry under `runs[]` rather than overwriting.

## Incremental re-runs

The user may run `$stardust extract` again on the same site to add new
pages or refresh existing ones.

- Default behaviour: skip URLs whose slug is already in `state.json`
  with status `extracted` or beyond. Crawl only newly discovered URLs.
- `--refresh <slug>` re-extracts a single named page even if already
  extracted. The new per-page JSON overwrites, but state.json
  preserves the page's full lifecycle history.
- `--refresh-all` re-extracts every page in the cap. Rare; ask the
  user to confirm.
- A re-run that resolves a different `originUrl` is rejected (see
  `extract` SKILL.md § Setup, "Origin collision").

## Multi-locale and i18n

Sites with multiple language variants (`/en/`, `/de/`, `?locale=fr`):
v2 extracts the default locale only. Cross-locale crawl is out of
scope and would inflate the cap predictably. The user can run
multiple stardust projects per locale if needed; the SKILL.md should
mention this in the user report.
