# Phase boundary refactor: extract = brand only

A capture of the architectural discussion from 2026-04-26 about
narrowing extract's responsibility to brand-surface extraction only,
with discovery and per-page IA work moving to migrate (and
on-demand to prototype).

This is not implemented. Documented here for future reference.
The current implementation (commit 3f19d50) ships full per-page
extraction during Phase 1.

---

## The responsibility leak (current state)

`extract` currently does three different jobs at once:

1. **Discovery** — sitemap → BFS → cap → confirmation
2. **Per-page IA + content** — Playwright on all in-scope pages
3. **Brand-surface extraction** — once on the home page

Each has a different cost profile and a different downstream
consumer:

| Job | Cost | Used by |
|---|---|---|
| Discovery | Cheap if sitemap exists (~2s); slow if BFS fallback needed (~2-5min) | migrate (renders every page) |
| Per-page IA | Heavy — Playwright per page (~10-12s × N) | prototype + migrate |
| Brand surface | Moderate — one Playwright pass | direct (intent reasoning anchors) |

The three jobs collapse into one phase today. The user pays the full
cost regardless of intent. A user who only wants a brand audit (no
migration) waits 5+ minutes for work they will not use.

## The proposed split

```
Today:
  extract  = discover + per-page-IA + brand-surface
  direct   = intent → tokens
  prototype= per-page render (reads pre-extracted JSON)
  migrate  = per-page render (reads pre-extracted JSON)

Refactored:
  extract  = brand surface from 3 representative pages (only)
  direct   = intent → tokens                            (unchanged)
  prototype<url> = lazy ensure-extracted + render
  migrate  = discover (all) + lazy ensure-extracted + render
```

## Extract becomes truly minimal

Inputs: `<url>` (origin/landing) + optional `--brand-from
<url>,<url>,<url>` override.

Procedure:

1. **Pick 3 representative pages** — default heuristic = home + top 2
   most-prominent links in the home's `<header>`/`<nav>` (ranked by
   proximity to the brand mark, above the fold).
2. **Playwright on those 3 pages** — full per-page capture.
3. **Aggregate brand surface** across the 3 — cross-page palette
   frequency clustering (ΔE < 5 in Lab), type union with majority
   role assignment, motif union, voice union.
4. **Author** `current/PRODUCT.md`, `current/DESIGN.md`,
   `_brand-board.html`.
5. **Update state.json** — 3 pages added with `{ status: "seen",
   brandSampled: true, extracted: true }`.

**Target wall-clock: ~30-45s** (one home render + 2 inner pages +
brand-board emission). No discovery, no sitemap fetch, no BFS.

## Discovery moves to migrate

```
$stardust migrate
  Phase 0 — Discover (only runs here, only if no slug arg)
    • Try sitemap.xml → sitemap_index → robots.txt Sitemap directive
    • Fallback: BFS (with static-fetch + cheerio optimization)
    • Show kept/cut, confirm, write _crawl-log.json
  Phase 1 — ensure-extracted in parallel for all in-scope pages
  Phase 2 — render each migrated/<slug>/index.html
  Phase 3 — assets + sitemap + robots
  Phase 4 — state update + report
```

For `$stardust migrate <slug>` (single page): Phase 0 is replaced by
discovering that one URL only.

## Prototype becomes URL-driven

```
$stardust prototype <url-or-slug>
  Phase 1 — Ensure page is in state.json
    If <slug> known: use existing entry
    If <url> new: derive slug, add { status: "seen" }
  Phase 2 — ensure-extracted (lazy Playwright)
  Phase 3 — render proposed + viewer
  Phase 4 — open + iterate via $impeccable live
  Phase 5 — approval
```

The user types a URL (or slug if already in state). They're not
picking from a pre-discovered list — they know their own site.

## State.json grows incrementally

Pages enter state.json the first time anything touches them:

| Trigger | Pages added |
|---|---|
| `$stardust extract` | The 3 brand-sampled pages |
| `$stardust prototype <url>` | That one page (if not already there) |
| `$stardust migrate` (no slug) | All discovered pages |
| `$stardust migrate <url>` | That one page |

Each page tracks linear status (`seen → prototyped → approved →
migrated`) plus orthogonal flags (`brandSampled`, `extracted`).

## Direction is now site-wide

Old `direction.md`:
```
## Pages in scope
home, about, pricing, features, contact
```

New `direction.md`:
```
## Pages in scope
Site-wide. The resolved direction applies to every page rendered by
prototype or migrate against this direction. Pages are added to
state.json as they're acted on.
```

No upfront inventory commitment. Direction is a stance, not a list.

## Files affected by the refactor (8-10)

| File | Change |
|---|---|
| `skills/extract/SKILL.md` | Rewritten: 5-phase procedure becomes brand-only |
| `skills/extract/reference/playwright-recipe.md` | **Move** to `skills/stardust/reference/playwright-recipe.md` |
| `skills/extract/reference/current-state-schema.md` | **Move** to `skills/stardust/reference/current-state-schema.md` |
| `skills/extract/reference/brand-surface.md` | Update for multi-page aggregation |
| `skills/extract/reference/ia-extraction.md` | **Move** to `skills/migrate/reference/ia-extraction.md` (discovery is migrate's concern) |
| `skills/stardust/reference/state-machine.md` | Update lifecycle for incremental growth + flags |
| `skills/stardust/reference/artifact-map.md` | `pages/<slug>.json` listed as **lazy** + brand-board added |
| `skills/prototype/SKILL.md` | Phase 1 prepended with "Ensure-extracted (slug or URL)" |
| `skills/migrate/SKILL.md` | Phase 0 added (discovery); Phase 2 prepended with "Ensure-extracted in parallel" |
| `skills/direct/reference/direction-format.md` | "Pages in scope" simplified to site-wide |
| **New** `skills/stardust/reference/ensure-extracted.md` | Shared lazy-extraction procedure |
| **New** `skills/extract/reference/brand-aggregation.md` | Multi-page brand-surface aggregation logic |

## Trade-offs

What's better:
- Extract is fast (~30-45s) and laser-focused
- Cost is paid where the value is (when migrating, when prototyping)
- The brand board is a standalone deliverable for users who only want
  a brand audit
- Cleaner mental model: each phase has one job
- direct is decoupled from page inventory — direction is a stance

What's costlier:
- 8-10 files touched in the refactor
- Discovery moves: users who liked seeing the page inventory after
  extract no longer get that affordance until migrate
- prototype + migrate get heavier (one extra step at the front)
- Slight increase in per-page wall-clock during prototype/migrate
  runs (the lazy extract step)

What stays the same:
- Brand surface fidelity (better, with multi-page aggregation)
- prototype + migrate output quality
- State machine semantics from the user's POV (just incremental, not all-at-once)

## Three open questions to settle before shipping

1. **Should extract surface a quick sitemap-based inventory as
   informational?** ("FYI, your site has ~30 pages discoverable.")
   Pro: keeps the user oriented. Con: defeats the "extract is fast"
   promise if sitemap fetch + parse is included.
2. **Brand-sample picker — heuristic or ask?** Default: home + top 2
   nav-linked. Alternative: render home, show user the nav links,
   ask "which 2 should I sample?". Less friction with heuristic;
   more accuracy with the question. Probably default heuristic +
   `--brand-from` override.
3. **Discovery in migrate — what's the BFS fallback cost?** With
   static-fetch + cheerio optimization, BFS becomes much cheaper
   than full Playwright BFS. Worth implementing this first; it
   changes the math on whether discovery is "fast enough" to live
   anywhere.

## Decision

As of 2026-04-26: **the refactor is NOT implemented**. The
analysis is documented here for future reference. The current model
(commit 3f19d50) does full per-page extraction during Phase 1 and
ships discovery as part of extract.

Revisit when:

- A real user reports that extract feels too heavy for the
  brand-only case (e.g., they wanted a brand audit and waited 5
  minutes for migration prep they didn't use).
- A real user prototypes a single page and notices the per-page
  extraction was already done eagerly (wasted on the other 24).
- A specific eval (likely `extract-multipage`) becomes inconsistent
  with the spec because real-world targets without sitemaps make BFS
  the bottleneck.
- The multi-page brand-surface aggregation gets implemented (it's a
  prerequisite of this refactor — covered in its own future
  refactor, since it affects extract regardless of this larger
  reorganisation).

Until then, the simpler one-job-per-phase model lives here as a
plan, ready to ship when usage signals say it's time.

## Migration plan (if shipping later)

If/when this refactor ships, the recommended commit sequence:

1. **Multi-page brand-surface aggregation** (smaller, prerequisite).
   Update `extract/reference/brand-surface.md` to describe
   aggregation across N pages; update extract Phase 3 to aggregate.
   Keep extract's discovery + per-page-IA scope unchanged.
2. **Promote shared references to master level**. Move
   `playwright-recipe.md` and `current-state-schema.md` from
   `skills/extract/reference/` to `skills/stardust/reference/`.
   Update citations.
3. **Add ensure-extracted procedure** at master level. Document the
   shared lazy-extraction primitive.
4. **Update prototype + migrate** to call ensure-extracted. Keep
   extract still doing eager per-page work (so nothing breaks).
5. **Move discovery to migrate**. Drop per-page work from extract.
   Update extract SKILL.md, ia-extraction reference, state-machine.
   This is the big breaking change.
6. **Update direct + state-machine + artifact-map** for site-wide
   direction and incremental state growth.
7. **Update evals** — `extract-multipage` becomes
   `extract-brand-only` or similar; new evals for `migrate
   --discovery` and `prototype <url>`.

Each step is independently shippable; the breaking change is only at
step 5. Earlier steps are additive.
