---
name: stardust:extract
description: Crawl an existing website (capped, multi-page) and seed stardust/current/ with PRODUCT.md, DESIGN.md, DESIGN.json, and a per-page inventory.
---

# stardust:extract

> **Phase 1 — not yet implemented.**
> This skill is scaffolded but its body lands in the next stardust phase.

## Planned scope

Crawl the existing website (URL or local path), capped at a user-confirmed
page count (default 25), parse each page's structure and content, extract
the brand surface (logo, palette, type, motifs) using the v1 Playwright
recipe, and seed:

- `stardust/current/PRODUCT.md` (via `$impeccable teach` against extracted brand)
- `stardust/current/DESIGN.md` + `DESIGN.json` (via `$impeccable document` against extracted tokens)
- `stardust/current/pages/<slug>.json` per page
- `stardust/current/assets/` for logo + media

Plus updates to `stardust/state.json` marking each crawled page as
`extracted`.

See `skills/stardust/reference/artifact-map.md` for the artifact contract
this skill must honour.
