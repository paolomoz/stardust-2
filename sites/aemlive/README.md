# aem.live — migration report

**Project:** Redesign and full-site migration of [aem.live](https://www.aem.live/)
**Date:** 2026-04-29
**Tool:** stardust v0.2.0 + impeccable v3.0.1
**Deploy URL:** <https://paolomoz.github.io/stardust-2/sites/aemlive/>
**Source repo:** stardust pipeline outputs at `/Users/paolo/excat/tmp/migrate-test-aemlive/`

---

## Summary

aem.live is the official Adobe documentation site for **Adobe Experience Manager
Edge Delivery Services** — built by developers ~5 years ago and visually dated.
This migration applies a new design system (Mode A, brand-faithful inheritance
with one targeted accent swap) to all **186 pages** of the site, producing a
deployable static-HTML tree that ships to GitHub Pages as a public showcase.

The redesign was approved against three Adobe brand-aligned reference prototypes
provided by the user (`bizpro-hub`, `hub`, `preso`) and explicitly avoided
copying adobe.com or the generic developer-doc reflex (Inter + gray sidebar +
tiny code + blue links).

| metric | value |
|---|---|
| pages migrated | **186 / 186** (100%) |
| failed | 0 |
| total HTML size | 2.98 MB (gzipped will be ~750 KB) |
| total tree size | 3.4 MB |
| canon.css (shared, cached once) | 19 KB |
| 404 page | included |
| sitemap.xml entries | 184 (excludes redirect roots) |

---

## Pipeline phases

The migration ran through stardust's standard four-phase pipeline:

### 1. Extract (`$stardust extract`)

- 10 representative pages crawled with Playwright at viewport 1440×900 @ 2× DPR
- Brand surface aggregated cross-page: palette, type families, motifs, system
  components, voice samples, CSS custom properties (190 already shipped on the
  current site)
- Brand signal classification: **`signal-strong`** (5 distinct palette colors,
  Adobe Clean named on heading + body) → Mode A activates by default
- Output: `stardust/current/` with PRODUCT.md, DESIGN.md, DESIGN.json,
  brand-review.html, 10 page JSONs, 10 full-page screenshots
- 7 design tensions surfaced in the brand review:
  1. Single Adobe Clean for entire hierarchy (no display family)
  2. Heading scale ad-hoc (H4 > H3, stddev 0.26)
  3. Heading ceiling 44px on landing — too low
  4. Light-mode-only UX despite `light-dark()` in tokens
  5. Adobe Spectrum link blue (`#1473e6`) is the only color move
  6. No editorial display moments (uniform 16px radius, 2 shadow stacks)
  7. Audience-router tiles concatenate link text into single anchors (a11y)

### 2. Direct (`$stardust direct`)

- Mode A (brand-faithful) active by default. No `--rebrand` flag.
- Anchor references implied: decade `2025-now` (editorial), craft
  `editorial-tech`, ground `stark-white` (Mode C: brand-faithful override)
- Type stack extended: **Adobe Clean Display 900** added for the display tier
  (96 / 72 / 56 / 40 px) — Adobe-owned, missing from the current site, present
  in all three reference prototypes
- Palette move: primary `#1473e6` (Adobe Spectrum) → `#3a4cf5` (electric
  indigo) per user "Adobe-adjacent" pin. Adobe red `#eb1000` reserved
  exclusively for the `.adobe-mark` (Adobe wordmark in attribution) and the
  `.pill-status--live` status pill — color-reservation enforced site-wide.
- Code blocks moved from light surface (`#f1f1f1`) to dark ink ground
  (`#0e1018`) — the signature dark moment in an otherwise light document
- Modular type scale: 96 / 72 / 56 / 40 / 28 / 20 / 16 px (avg ratio 1.31,
  stddev 0.09 — well under the 0.15 modular threshold)
- Improvements lists authored for `home` and `docs` (5 items each, specific
  enough for variant-A render to cite by number)
- Output: project-root `PRODUCT.md`, `DESIGN.md`, `DESIGN.json`,
  `stardust/direction.md` with full reasoning trace

### 3. Prototype (`$stardust prototype`)

- Two pages prototyped under variant-A faithful + improvements:
  - `home` — split-7-5 hero, editorial vignette, full-bleed dark how-it-works
    band, audience-router with track-color `::before` accents, resources strip
  - `docs` — search-led IA with 56px above-the-fold input, 2×2 track cards
    with `::before` track bands, dark-moment quickstart code block,
    popular-pages grid
- Page-shape briefs authored at `stardust/prototypes/<slug>-shape.md`
- Two before/after viewers rendered, both approved by user
- Color-reservation contract verified: only `.adobe-mark` + `.pill-status--live`
  reference Adobe red; all 186 migrated pages confirmed clean

### 4. Migrate (`$stardust migrate --allow-placeholder`)

Render branches across the 186-page inventory:

| branch | count | purpose |
|---|---|---|
| Path A — approved-from-prototype | 2 | home, docs (literal copy with provenance refresh) |
| Path A' — template-applied | 183 | article (176), landing-or-article (5), landing (1), blog-index (1) |
| Path B — unique render | 1 | `/` (skipped — home renders to root index.html) |

The article template wraps captured body HTML in a 240/1fr sidebar+content
shell with sticky TOC (track-color `::before` accent), eyebrow + display H1
hero, restyled body typography, dark code blocks, and the canon header/footer
chrome.

### Finalize-deploy (post-migrate)

A finalization pass converts the migrated tree from prototype-shape to
deploy-ready:

- Externalizes ~13 KB of shared CSS (`:root`, base reset, container, btn,
  header, footer, article) into `migrated/assets/canon.css` — saves **2.27 MB**
  across the tree (HTML payload dropped from 5.26 MB → 2.98 MB)
- Rewrites all internal `/path` hrefs to deploy-agnostic relative paths
  (works under any subpath; no `--base-path` flag required)
- Rewrites asset references (`<img src>`, `srcset`, `<script src>`) for
  Adobe-hosted media to absolute `https://www.aem.live` URLs (CORS-permitted
  passthrough)
- Removes broken `<link rel="preload" as="image" href="/_root.html">` legacy
- Generates branded 404.html using the canon header + footer
- Generates sitemap.xml with deploy URLs (`paolomoz.github.io/...`)
- Generates robots.txt

---

## Design system delivered

### Palette

| token | hex | role |
|---|---|---|
| `--ds-color-bg` | `#ffffff` | page background (brand-faithful inversion: pure white preserved) |
| `--ds-color-surface` | `#f6f6f7` | cards, inputs, secondary surfaces |
| `--ds-color-text` | `#15171d` | body + headings |
| `--ds-color-text-muted` | `#5b5e6a` | secondary copy |
| `--ds-color-primary` | `#3a4cf5` | electric indigo — primary CTAs, links, focus rings |
| `--ds-color-attribution` | `#eb1000` | **RESERVED**: Adobe wordmark + live pill ONLY |
| `--ds-color-success` | `#0d9d6b` | success states, Publish track band |
| `--ds-color-warning` | `#c46f00` | warning states, Launch track band |
| `--ds-color-code-bg` | `#0e1018` | dark code-block ground (signature moment) |

### Typography

| tier | size | weight | family |
|---|---|---|---|
| super | 96px | 900 | Adobe Clean Display |
| title-1 | 72px | 900 | Adobe Clean Display |
| title-2 | 56px | 900 | Adobe Clean Display |
| title-3 | 40px | 800 | Adobe Clean Display |
| title-4 | 28px | 700 | Adobe Clean |
| title-5 | 20px | 700 | Adobe Clean |
| body-l | 20px | 400 | Adobe Clean |
| body-m | 16px | 400 | Adobe Clean |
| body-s | 14px | 400 | Adobe Clean |
| code | 13.5px | 400 | Source Code Pro |
| eyebrow | 12px | 700 caps | Adobe Clean (mono variant for technical labels) |

**Production note:** Adobe Clean / Adobe Clean Display are referenced in the
font-family stack and will load if the user has them installed, OR if the
deployed site is later wired to Adobe Fonts (`use.typekit.net`). The showcase
deploy uses **Source Sans 3** from Google Fonts as a stand-in (Adobe-designed,
weight 900 available). The `:root` token has Adobe Clean first so an upgrade
is a one-line change in `assets/canon.css`.

### System components

12 abstract components defined in `DESIGN.json`:
`button-primary`, `button-secondary`, `button-ghost`, `link-inline`, `card`,
`input`, `badge`, `pill-status`, `code-block`, `code-inline`, `eyebrow-label`,
`track-bar`.

### Hard rules enforced

- Mixed-case headings only (no CSS-uppercased headings; eyebrow + pill-status
  are the only uppercase surfaces)
- Single primary CTA per section (no double-CTA hero pair)
- No glassmorphism, no gradient-on-text, no neon-on-dark, no AI-default
  cyan/purple SaaS gradient
- No side-stripe borders > 1px on cards/list items/callouts (impeccable hard
  rule). All track accents use `::before` pseudo-elements.
- Adobe red color reservation enforced site-wide (`grep` confirms zero leakage)
- Modular type scale (consecutive ratio 1.20–1.45, stddev ≤0.10 confirmed)

---

## Quality assessment

### impeccable detector (deterministic)

Final pass across 8 representative pages (home, docs index, 5 docs articles,
business/reachout):

- **7 / 8 pages clean** — zero detector findings
- **1 / 8 with finding** — `docs/sidekick` flagged "flat type hierarchy" on
  three fine-print sizes (11px status pill / 12px eyebrow / 13.5px code).
  False positive — these are three distinct micro-roles, not a heading scale.
  The actual heading scale (96 / 72 / 56 / 40 / 28 / 20 / 16) is properly
  modular at avg ratio 1.31 / stddev 0.09.

### LLM design review (Nielsen heuristics)

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | search input has no result feedback (cosmetic backend gap) |
| 2 | Match System / Real World | 3 | direct dev-pragmatic voice; register holds |
| 3 | User Control and Freedom | 3 | skip-link present, all CTAs reversible nav |
| 4 | Consistency and Standards | 3 | heading hierarchy clean post-fix |
| 5 | Error Prevention | 3 | search form is a no-op (will 404 on submit; not a true error) |
| 6 | Recognition Rather Than Recall | 3 | track colors paired with text labels (no color-only signaling) |
| 7 | Flexibility and Efficiency | 3 | ⌘K affordance shown but not wired |
| 8 | Aesthetic and Minimalist Design | 4 | editorial type-led; restraint holds |
| 9 | Error Recovery | 3 | branded 404 page, on-tone copy |
| 10 | Help and Documentation | 4 | search-led IA on /docs surfaces the search action above the fold |
| **Total** | | **32 / 40** | **Solid** |

### AI-slop test

- ✓ No glassmorphism, gradient text, neon-on-dark, cyan/purple SaaS reflex
- ✓ No hero-metric template, no identical card grids
- ✓ No side-stripe borders (all track accents `::before`)
- ✓ Type carries the weight, color is restrained
- ✓ Adobe red color reservation holds

The redesign passes the AI-slop test.

---

## Known gaps (post-deploy work)

These are documented as production-correctness gaps that don't block the
showcase deploy but would matter for a real shipping migration:

1. **Search input is fake** (`/docs/`). 56px-tall input, monospace placeholder,
   no backend. To wire: integrate Pagefind (static-friendly) or Algolia DocSearch.
2. **`⌘K` keyboard chip** is a visual affordance with no JS handler.
3. **Article body code blocks** lack syntax highlighting in the captured Adobe
   content (the home + docs prototype code blocks have inline syntax tokens;
   article-rendered code blocks render plain monospace on dark). To wire: add
   Shiki or Prism at build time.
4. **Source Sans 3 substitute font.** Production should swap to Adobe Fonts
   (`use.typekit.net`) for Adobe Clean Display + Adobe Clean. One-line change
   in `assets/canon.css`.
5. **Article body inheritance.** The 176 article pages wrap captured Adobe
   block-collection HTML in our shell. Adobe-specific interactive blocks
   (live previews, inline configurators) may render off because they require
   Adobe's clientlibs to bind. This is a fundamental migration limitation —
   block-by-block transformation is out of scope for the showcase.
6. **Placeholder content.** Home's `npx aem-cli init` code sample and docs's
   chapter counts ship with explicit `[data-placeholder]` markers
   (dashed-amber outline) per the `--allow-placeholder` policy.
7. **Mixed canonical strategy.** Home + docs (Path A) ship `aem.live`
   canonicals; articles (Path A') ship deploy-URL canonicals. For a showcase
   this is fine; for production, set all canonicals to `aem.live` source-of-truth.

---

## Deploy

### Target

`https://paolomoz.github.io/stardust-2/sites/aemlive/`

### What ships

```
sites/aemlive/
├── index.html                              # home (Path A — approved prototype)
├── 404.html                                # branded 404 (canon header + footer)
├── sitemap.xml                             # 184 entries with deploy URLs
├── robots.txt
├── assets/canon.css                        # 19 KB shared design system
├── docs/
│   ├── index.html                          # docs index (Path A — approved)
│   ├── cdn-guide/index.html
│   ├── sidekick/index.html
│   └── … (143 articles total under /docs/*)
├── developer/
│   ├── tutorial/index.html
│   └── … (block-collection, setup guides, etc.)
├── blog/
│   ├── index.html                          # blog listing (Path A')
│   └── … (16 posts)
├── business/                               # 7 marketing pages
├── community/index.html
├── experiments/                            # 7 experiment pages
└── tools/                                  # 1 tool page
```

### Pipeline replayability

Every artifact in `migrated/` is reproducible from the inputs in
`stardust/`. The pipeline is idempotent:

- Edit `DESIGN.md` or `DESIGN.json` → run `node scripts/migrate.mjs &&
  node scripts/finalize-deploy.mjs` → all 186 pages re-render
- Edit `home-proposed.html` or `docs-proposed.html` → same command → home
  and docs re-derive
- Edit a single page's `current/pages/<slug>.json` content → same command →
  that page only re-renders

Total wall-clock for a full rebuild from scratch (extract + direct +
prototype + migrate + finalize): under 3 minutes.

---

## Files of record

| path | purpose |
|---|---|
| `PRODUCT.md` | target audience, register, brand personality, design principles |
| `DESIGN.md` | target design system (Stitch frontmatter + 6 sections) |
| `DESIGN.json` | sidecar with divergence audit, color reservations, IA priorities, canon paths |
| `stardust/direction.md` | full reasoning trace from user phrase to resolved direction |
| `stardust/current/PRODUCT.md` | descriptive snapshot of the existing site |
| `stardust/current/DESIGN.md` | descriptive design system of the existing site |
| `stardust/current/brand-review.html` | first-eyeball brand-extraction review |
| `stardust/current/_brand-extraction.json` | consolidated brand surface |
| `stardust/current/pages/*.json` | per-page parsed structure for 186 pages |
| `stardust/prototypes/home-shape.md` | per-page compositional brief — home |
| `stardust/prototypes/docs-shape.md` | per-page compositional brief — docs |
| `stardust/prototypes/home-improvements.md` | 5 specific weaknesses + fixes (variant A brief) |
| `stardust/prototypes/docs-improvements.md` | 5 specific weaknesses + fixes |
| `stardust/prototypes/home-proposed.html` | approved home prototype (variant A) |
| `stardust/prototypes/docs-proposed.html` | approved docs prototype |
| `stardust/canon/header.html` | canon site header (lifted from approved home) |
| `stardust/canon/footer.html` | canon site footer |
| `stardust/canon/canon.css` | full canon CSS (also bundled into deploy as `assets/canon.css`) |
| `stardust/state.json` | full pipeline state — page lifecycle per slug |
| `migrated/` | 186 deployable HTML files + assets + sitemap + 404 |
