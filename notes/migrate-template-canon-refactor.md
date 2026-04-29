# migrate refactor — template / canon / module architecture

**Status:** design plan, ready for implementation
**Authored:** 2026-04-29
**Predecessor:** `skills/migrate/SKILL.md` (current)

---

## Goal

Refine the `migrate` step so it can take a multi-page site that has been
extracted and partially prototyped and produce a coherent deployable
static HTML site. Today's spec handles single-slug-at-a-time rendering
with a rigid Path A / Path B branch; it produces a Frankenstein output
when only some pages are prototyped, has no template/module reuse
mechanism, and treats every per-slug render as independent.

This refactor introduces:

- A two-step cascade (`prepare-migration` then `migrate`) that defers
  heavy work to the migrate-readiness moment.
- Page typing, brand modules, slot vocabulary, and a design canon
  derived from approved prototypes — the data structure that lets
  migrate make consistent cross-template/cross-page decisions.
- LLM-judgment-driven rendering with explicit deviation logging,
  replacing the rigid `purpose → component` mapping.
- A richer markup contract (`data-*` vocabulary) and JSON sidecars
  that pave the road for downstream conversion (EDS, CMS, framework
  plugins).

## Two-mode picture

**Discovery mode (today's default).** Extract a sample, direct an
intent, prototype representative archetypes. Cheap, lean, presales-
oriented. **Unchanged by this refactor.**

**Migrate-prep mode.** Entered explicitly when the user commits to
migrate. The cascade re-runs upstream phases with `--prep` flags to
build the data structure migrate consumes:

1. `extract --prep` — full inventory, page typing, module candidate
   detection, typed content slots.
2. `direct --prep` — type catalog confirmation, module promotion,
   wider direction re-evaluation.
3. `prototype --prep` — fill template gaps; write design canon back
   into `DESIGN.json` on first approval.
4. Assets prep — favicon variants, font downloads.
5. `migrate` — render every page using template + module + canon
   guidance with LLM judgment and explicit deviation logging.

User triggers prep via `$stardust prepare-migration`; migrate is a
separate explicit step.

## Decisions locked

| # | Decision |
|---|----------|
| 1 | Two-step cascade: `prepare-migration` → `migrate` (explicit boundary) |
| 2 | Each prep phase ends with summary; user confirms or refines before next phase |
| 3 | `migrationDecisions[]` array per migrated page in provenance |
| 4 | Module detection auto-runs during `extract --prep` |
| 5 | Modules flat-only (no nesting), per-site, in `DESIGN.json.extensions.modules[]` |
| 6 | Canon-author defaults to home; `--canon-from <slug>` overrides |
| 7 | Canon auto-updates on home re-approval; downstream stale-flagged |
| 8 | Canon deviations allowed with provenance log; user audits |
| 9 | New `data-*`: `data-template`, `data-module`, `data-slot`, `data-canon`, `data-deviation`, `data-bespoke` |
| 10 | `<slug>.meta.json` sidecar per migrated page with full reasoning trace |
| 11 | Module IDs deterministic (slug + content hash), stable across re-runs |
| 12 | `data-canon` at container level, not leaf level |
| 13 | `data-slot` in HTML (not JSON-only); container-level; locally scoped to nearest parent template/module |
| 14 | Bespoke per-instance slots allowed via `data-bespoke` + provenance log |
| 15 | Auto-suggest module-slot promotion at 3 instances |
| 16 | Bespoke scope: slots only — no full bespoke modules |
| 17 | JSON-LD always emitted when page-type is known |
| 18 | Canonical preserved unless `state.json.site.deployUrl` is set; then rewrite |
| 19 | Favicon variants generated during prep (apple-touch-icon, manifest sizes) |
| 20 | Robots default `index,follow`; preserve explicit `noindex` |
| 21 | `prepare-migration` is thin orchestrator; existing skills add `--prep` modes |
| 22 | Brand-faithful inversions (per `DESIGN.json.extensions.divergence.brand_faithful_inversions`) lift corresponding impeccable hard rules from validation |
| 23 | Internal links always rewritten to migrated tree; missing slugs marked broken (forces inventory completeness; broken-link report is the signal) |
| 24 | Fonts: download to `migrated/assets/fonts/` during prep; external + warning in discovery mode |
| 25 | Color reservations enforced via `DESIGN.json.extensions.colorReservations[]` validator |

## Data model additions

### `state.json`

```json
{
  "pages": [
    {
      "slug": "news__post-housing-summit",
      "url": "https://theroadhome.org/news/housing-summit",
      "status": "directed",
      "type": "article",
      "stale": false
    }
  ],
  "site": {
    "originUrl": "https://theroadhome.org",
    "deployUrl": null
  }
}
```

`type` is set during `extract --prep`; user-confirmable in
`direct --prep`. Initial values: `landing | article | listing |
program | form | static | unique`. The catalog is per-site; `unique`
is the escape hatch.

### `DESIGN.json.extensions`

```json
{
  "modules": [
    {
      "id": "hotline-211",
      "slots": [
        { "name": "phone",     "type": "text", "required": true,  "default": "211" },
        { "name": "hours",     "type": "text", "required": false },
        { "name": "headline",  "type": "text", "required": true },
        { "name": "cta-label", "type": "text", "required": true,  "default": "Find help" }
      ],
      "canonicalRendering": "<aside data-module=\"hotline-211\">...</aside>"
    }
  ],
  "canon": {
    "sourceSlug": "home",
    "approvedAt": "2026-04-28T16:40:00Z",
    "header": "<header>...</header>",
    "footer": "<footer>...</footer>",
    "buttonLanguage": "...",
    "cardLanguage": "...",
    "sectionPadding": "56px",
    "densityTier": "balanced",
    "typeRhythm": { "scale": 1.25, "lineHeights": { "..." : "..." } },
    "compositionalMoves": ["12-col-asymmetric-grid"]
  },
  "colorReservations": [
    { "color": "#DC323D", "reservedFor": ["module:trh-100-lockup"] }
  ],
  "metadata": {
    "siteName": "The Road Home",
    "defaultOgImage": "/assets/og-default.jpg",
    "themeColor": "#008192",
    "organization": {
      "@type": "Organization",
      "name": "The Road Home",
      "url": "https://theroadhome.org",
      "logo": "/assets/logo.svg"
    },
    "locale": "en-US"
  }
}
```

### `current/pages/<slug>.json § metadata`

Extracted verbatim from the live page's `<head>`:

```json
{
  "metadata": {
    "title": "...",
    "description": "...",
    "og": { "title": "...", "description": "...", "image": "...", "type": "..." },
    "twitter": { "card": "summary_large_image", "title": "..." },
    "canonical": "https://...",
    "robots": "index,follow",
    "lang": "en-US",
    "dir": "ltr"
  }
}
```

### Migrated artifact tree

```
stardust/migrated/
  index.html                              # home
  about/index.html
  about.meta.json                         # sidecar — same shape per page
  news/post-housing-summit/index.html
  news/post-housing-summit.meta.json
  assets/
    logo.svg
    favicon.svg
    favicon-512.png                       # NEW: variants generated during prep
    apple-touch-icon.png
    media/...
    fonts/...                             # NEW: downloaded during prep
  robots.txt
  sitemap.xml
```

Sidecar shape:

```json
{
  "slug": "news__post-housing-summit",
  "template": "article",
  "modules": ["hotline-211", "stat-trio", "donate-band"],
  "slotsFilled": ["article-headline", "article-byline", "article-body", "related-stories"],
  "canonShas": { "header": "...", "footer": "..." },
  "deviations": [],
  "migrationDecisions": [...],
  "metadata": { "..." : "..." },
  "jsonLd": { "@type": "Article", "headline": "...", "..." : "..." }
}
```

## The `prepare-migration` cascade

Thin orchestrator at `skills/prepare-migration/SKILL.md`. Calls
existing skills' `--prep` modes in sequence with confirmation gates.

```
$stardust prepare-migration

Phase 1 — extract --prep
   ├─ Crawl full inventory (cap lifted)
   ├─ Junk-filter and dedupe
   ├─ Type-tag each page (LLM judgment: URL pattern + content shape)
   ├─ Detect module candidates by structural recurrence
   ├─ Capture typed content slots per page
   └─ Summary: N pages typed (table), K module candidates proposed
      → User confirms or refines

Phase 2 — direct --prep
   ├─ Surface type catalog for confirmation
   ├─ Surface module candidates for naming and promotion
   ├─ Re-evaluate direction against the wider crawl (any new tensions?)
   └─ Summary: type catalog finalized, module catalog finalized
      → User confirms

Phase 3 — prototype --prep
   ├─ For each page-type lacking an approved archetype: generate variants
   ├─ Inherit canon from already-approved prototypes
   ├─ User picks one per type
   ├─ On first approval: extract canon and write back to DESIGN.json
   ├─ On subsequent approvals: extend canon if novel patterns earned
   └─ Summary: every in-scope page-type has an approved archetype
      → User confirms

Phase 4 — assets prep
   ├─ Generate favicon variants from canonical favicon
   ├─ Download font files referenced by canon @font-face rules
   └─ Summary: assets pipeline ready

Migrate-readiness: confirmed
   → User runs `$stardust migrate`
```

Each phase is **incremental and idempotent**: re-running prep doesn't
redo completed work unless inputs changed.

## The `migrate` procedure (per-page)

1. **Idempotent skip check** (sha-compare against last migration:
   designMd, designJson, sourceCurrent, canon, modules referenced).
2. **Render branch selection** by LLM judgment:
   - **Path A** — page is itself `approved` → use its proposed.html
     verbatim, refresh `:root` from latest DESIGN.md.
   - **Path A′** *(new)* — page is `directed` and a sibling of its
     `type` is approved → fork the sibling's structure, inject this
     page's typed content into matching slots; adapt where content
     doesn't fit cleanly; log every adaptation.
   - **Path B** *(new shape)* — page typed `unique` or no template
     match → render as one-off using DESIGN.md/json + brand modules +
     canon. No template-conformance enforcement; canon chrome and
     module rendering still apply.
3. **Module rendering**: for each section in the rendered output,
   match by content shape against the module catalog. If a match,
   render via the module's canonical structure with this page's slot
   values; bespoke slots marked `data-bespoke` and logged.
4. **Canon application**: chrome (header, footer, nav) emitted from
   canon verbatim. Deviations marked with `data-deviation` and
   `migrationDecisions[]` entry.
5. **Content preservation**: existing rules unchanged (preserve
   verbatim, transform with rules, drop the drop-list).
6. **Internal link rewriting**: every same-host link rewritten to
   migrated tree path; missing slugs marked
   `data-broken-link="true"` and surfaced in run summary. Always.
7. **Metadata composition**: per the metadata categories below;
   JSON-LD always emitted when page-type is known.
8. **Validation** (contracts strict, shape soft — see § Validation).
9. **Write** HTML + JSON sidecar.
10. **Update state**.

Run summary surfaces:
- N migrated, K unchanged (idempotent skip), F failed
- M pages with non-trivial migration decisions (one-line "why" each)
- L broken internal links (target slugs listed; recommend extract)
- B bespoke slots crossing the promotion threshold (recommend
  `prepare-migration --refine-module`)

## Markup contract

| Attribute | Where | Purpose |
|---|---|---|
| `data-template="<id>"` | `<body>` or `<main>` | Page-type signal |
| `data-section="<id>"` | `<section>` (existing) | Section identity |
| `data-purpose="<id>"` | `<section>` (existing) | Section semantic role |
| `data-module="<id>"` | Module root element | Module-instance marker |
| `data-slot="<name>"` | Slot containers | Content-slot identity (locally scoped) |
| `data-canon` | Chrome containers | "Came from canon — preserve verbatim downstream" |
| `data-deviation="<reason>"` | Element that broke canon | Deliberate deviation marker |
| `data-bespoke` | Bespoke slot containers | Slot not in module catalog |
| `data-broken-link="true"` | `<a>` whose target slug is missing | Surfaced in run summary |

Slot names are local to the nearest parent `data-template` /
`data-module`. So `<div data-module="hotline-211"><span
data-slot="phone">211</span></div>` — `phone` resolves in the
`hotline-211` namespace.

## Provenance — `migrationDecisions[]` schema

Per migrated page, the sidecar JSON carries an array of decisions.
Kinds:

```json
[
  {
    "kind": "template-applied",
    "template": "article",
    "siblingSource": "stardust/prototypes/news__post-housing-summit-proposed.html",
    "reason": "Direct slot mapping; no adaptation needed"
  },
  {
    "kind": "template-adapted",
    "template": "article",
    "adaptations": [
      { "what": "extra video embed", "where": "after article-body slot", "via": "overflow region" }
    ],
    "reason": "Content carries a video module not present in the canonical article template"
  },
  {
    "kind": "module-bespoke-slot",
    "module": "hotline-211",
    "slot": "state",
    "value": "Utah",
    "reason": "Home instance carries a state qualifier"
  },
  {
    "kind": "canon-deviation",
    "where": "header",
    "what": "Added sticky reading-progress bar",
    "reason": "Article template needs reading-progress for long-form content"
  },
  {
    "kind": "metadata-override",
    "field": "og.image",
    "value": "/assets/news-summit-og.jpg",
    "reason": "Page has a custom OG image extracted from current; overrides brand default"
  },
  {
    "kind": "unique-render",
    "reason": "Page typed `unique`; no matching template. Composed from DESIGN.json components + canon chrome"
  }
]
```

The HTML provenance block stays as today (one comment in `<head>`)
with a pointer to the sidecar for the full trace.

## Metadata composition

| Category | Source | Examples |
|---|---|---|
| **System-fixed** | Migrate emits identical | `charset`, `viewport`, manifest link |
| **Brand-level** | `DESIGN.json.extensions.metadata` | `theme-color`, `og:site_name`, default OG image, Organization JSON-LD |
| **Page-specific, preserved** | `current/pages/<slug>.json § metadata` | `<title>`, `description`, `og:*`, `twitter:*`, `lang`, `dir`, page-specific OG image, explicit `noindex` |
| **Page-specific, derived** | Computed at migrate time | `<link rel="canonical">` (rewritten if `deployUrl`), JSON-LD (from page-type + slots), sitemap entry |
| **Stripped** | Drop list | GTM, FB Pixel, Hotjar, OneTrust, all marketing-stack tags |

JSON-LD generation by page-type: `landing` → none (or `WebSite`);
`article` → `Article`; `listing` → `ItemList`; `program` → custom
schema or `Service`; `static (about/team)` → extends Organization.

## Validation contracts

**Strict (refuse-on-fail):**
- `:root` block at top of first `<style>` (token contract)
- Required `data-*` attributes present (template at minimum;
  section/canon as applicable)
- Provenance block present in `<head>`
- Required slots filled per template / module catalog
- Color reservations not violated
- Impeccable hard rules respected, **with brand-faithful inversions
  applied** per `DESIGN.json.extensions.divergence.brand_faithful_inversions`
- Output path collisions refused

**Soft (log + surface, don't refuse):**
- Template-conformance shape (deviations expected and logged)
- Bespoke slots (logged; promotion auto-suggested at 3+)
- Canon deviations (logged with reason)
- Broken internal links (logged; surfaced in run summary)
- Content overflow (logged; placed in overflow region)

## Files to write / modify

**New skills:**
- `skills/prepare-migration/SKILL.md` — orchestration shell

**New reference docs:**
- `skills/migrate/reference/template-and-module-rendering.md` — Path
  A′ details, slot injection, deviation policy, validation against
  canon, `unique` page rendering checklist
- `skills/migrate/reference/metadata-and-jsonld.md` — head
  composition, JSON-LD generation per page-type, canonical strategy

**Migrate skill updates:**
- `skills/migrate/SKILL.md` — re-spec for three-branch render path,
  judgment-friendly procedure, JSON sidecar output, run summary
  format, new flags
- `skills/migrate/reference/migration-procedure.md` — per-page
  reasoning trace, slot/module/template handling, validation
  contracts, idempotent skip across new artifacts
- `skills/migrate/reference/content-preservation.md` — light edits
  for metadata categorization (delegate to new doc), internal-link
  policy (always rewrite, flag broken), font handling

**Existing skills (add `--prep` modes):**
- `skills/extract/SKILL.md` — full inventory, page typing, module
  candidate detection, typed slot capture, prep summary format
- `skills/direct/SKILL.md` — type catalog confirmation, module
  promotion, prep summary format
- `skills/prototype/SKILL.md` — fill template gaps, write canon back
  to `DESIGN.json` on approval, extend canon on subsequent
  approvals, prep summary format

**Cross-cutting reference docs:**
- `skills/stardust/reference/data-attributes.md` — add new vocabulary
  (`data-template`, `data-module`, `data-slot`, `data-canon`,
  `data-deviation`, `data-bespoke`, `data-broken-link`)
- `skills/stardust/reference/state-machine.md` — `type` field on
  pages, stale-flagging cascade for canon updates, prep-mode
  state transitions
- `skills/stardust/reference/artifact-map.md` — module catalog,
  canon block, JSON sidecar shape, color reservations,
  per-page metadata schema

**New eval:**
- `evals/migrate-multi-template/task.md` — multi-template scenario
  (home + article + listing approved; rest are directed); validates
  Path A′, module reuse, canon enforcement, broken-link reporting,
  bespoke-slot promotion suggestion

## Implementation order

1. **State machine + page typing** — minimal first step, gates
   everything else.
2. **`extract --prep`** — module detection, type inference, prep
   summary format.
3. **`direct --prep`** — confirmation flows, type catalog, module
   catalog finalization.
4. **`prototype --prep` + canon write-back** — most novel piece;
   includes the canon-extraction logic on first approval.
5. **Migrate three-branch refactor** — consumes everything above.
6. **Sidecar JSON + JSON-LD emission**.
7. **Validation refactor** — brand-faithful inversion handling,
   color reservations, soft-shape policy.
8. **`prepare-migration` orchestrator** — thin layer once underlying
   `--prep` modes exist.
9. **New eval + dogfood on theroadhome.org** with the existing 23
   prototypes as seed.

## Open items deferred to implementation

- **Per-page metadata override mechanism shape.** Decided lazy ("only
  when user asks"); concrete syntax (`current/pages/<slug>.json §
  metadata.override`?) to be specified at implementation time.
- **`unique` page rendering checklist.** When a page is typed
  `unique`, what's the LLM's checklist for composing it from
  primitives + canon? Lives in
  `template-and-module-rendering.md`.
- **Canon graduation policy.** When does a novel pattern from a
  later-prototyped template earn its way into canon vs. stay as a
  module? Default rule: novel reusable lockups → modules; novel
  system-level treatments (e.g., a new section-padding tier) →
  canon, requires user confirmation.
- **Sitemap content for partial migrate.** Probably only migrated
  pages, with broken-link report covering gaps. Edge case for
  presales tools where sitemap may be misleading.

## Open follow-ups (post-implementation)

- **Cross-site module library.** Currently per-site; future could
  share modules (211 panel as a nonprofit-sector reusable).
- **Schema.org JSON-LD coverage expansion.** Today's plan covers
  Article, ItemList, Organization. Add FAQPage, Event,
  BreadcrumbList, HowTo, Service as page types warrant.
- **Multi-language sites.** `<link rel="alternate" hreflang="...">`
  cross-references between page-language siblings. Out of scope
  today; design for additivity.
- **Slot type expansion.** Current types: text, link, image, list,
  cta, rich-text. Future: video, audio, embed, dataviz.
- **Deploy integration.** Today migrate stops at static HTML output.
  A separate plugin handles deploy; could integrate via
  `deployUrl` + a `deploy` sub-command.
