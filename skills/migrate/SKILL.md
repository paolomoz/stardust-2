---
name: stardust:migrate
description: Apply the approved target DESIGN.md to every page in the inventory, producing a deployable static HTML site. Per-page, incremental, idempotent, content-preserving by default.
---

# stardust:migrate

Apply the target spec authored by `direct` and validated by
`prototype` to every page in the inventory. Produces a self-contained,
deployable static HTML site under `stardust/migrated/`. Per-page,
incremental, idempotent.

`migrate` is the final stardust phase. Output is platform-agnostic
HTML — downstream conversion (AEM EDS, a CMS, a framework) is the
job of a separate plugin that consumes `migrated/` plus
project-root `DESIGN.md`.

## Inputs

- `<slug>` — optional positional. Migrate just this page. Without
  it, migrate every page in the inventory whose status is `directed`,
  `prototyped`, or `approved` (and not `stale`).
- `--refresh-stale` — re-migrate every page flagged `stale` by a
  direction change. Default behaviour without this flag is to skip
  stale pages and surface the count.
- `--all` — migrate every page including stale ones.
- `--force` — re-migrate every page even if the idempotent skip
  would skip them. Useful after a manual edit to a migrated file the
  user wants to overwrite.
- `--require-approved` — refuse to migrate any non-`approved` page.
  Default behaviour migrates `directed` pages too (using the
  no-prototype render path); this flag flips that off for users who
  want to lock in approval-gating.

## Setup

1. Run the master skill's setup
   (`skills/stardust/SKILL.md` § Setup).
2. Verify `stardust/state.json` exists with at least one `directed`
   page. Otherwise recommend `$stardust direct` and stop.
3. Verify project-root `DESIGN.md` and `DESIGN.json` exist. Otherwise
   recommend `$stardust direct` and stop.
4. Verify `stardust/direction.md` has an active (not pending)
   direction.
5. Read `state.json.pages[]` and partition into:
   - `inScope`: status `directed`, `prototyped`, or `approved`,
     `stale: false` (or `--all` / `--refresh-stale` / explicit `<slug>`).
   - `skipped`: everything else, with reason captured.

## Procedure

### Phase 1 — Plan

Print the plan before doing anything else, and wait for confirmation
when the scope is large:

```
migrate plan
============

In scope: 25 pages (5 approved, 20 directed-no-prototype)
Skipped:  0 stale, 0 unscoped

Render path A (approved)         home, about, pricing, features, contact
Render path B (no prototype)     blog, blog__post-1, blog__post-2, ...

DESIGN.md sha:    1a2b3c4
DESIGN.json sha:  5d6e7f8

Output:           stardust/migrated/
Idempotent skip:  enabled (run with --force to override)

Reply "go" to proceed.
```

For 1-3 pages or `<slug>` invocation, skip the confirmation and run.

### Phase 2 — Per-page render

For each page in scope, follow `reference/migration-procedure.md`:

- **Idempotent skip check** first. If the migrated file exists, read
  its provenance. If `designMd` / `designJson` / `sourceCurrent` /
  `sourceProposed` shas all match the current files, mark the page
  `unchanged` and continue. Skipped pages are reported but no
  state.json change.
- **Render path** branches on whether
  `stardust/prototypes/<slug>-proposed.html` exists:
  - **Path A (approved with proposed file).** Take the proposed
    body and structural data attributes verbatim; refresh the
    `:root` block from latest DESIGN.md.
  - **Path B (directed without prototype).** Render from scratch
    using `current/pages/<slug>.json` IA + DESIGN.json components.
    Map landmark `purpose` → component selection per the procedure.
- **Apply content-preservation rules** per
  `reference/content-preservation.md`. Internal link rewriting,
  asset path rewriting, form schema preservation, drop-list (analytics
  tags, chat widgets, A/B harnesses), heading hierarchy fix-ups.
- **Compute the output path** per `migration-procedure.md` §
  Output path mapping. Slug → nested `index.html` for portable static
  hosting.
- **Validate** per `migration-procedure.md` § Validation. If the
  page fails validation, skip it, record the failure, continue to
  the next page. Do not abort the whole run.
- **Write** the migrated file. Provenance block as the first child
  of `<head>`.

### Phase 3 — Asset migration

Once page-level migration is done, ensure
`stardust/migrated/assets/` is consistent:

1. Copy `stardust/current/assets/logo.<ext>` to
   `stardust/migrated/assets/logo.<ext>` (only if missing or stale).
2. Copy each referenced media file from
   `stardust/current/assets/media/` to
   `stardust/migrated/assets/media/` (only the files referenced by
   migrated pages; unreferenced media is not copied).
3. Copy the favicon from
   `stardust/current/assets/favicon.<ext>` if present, else use the
   logo as a fallback.
4. Add a minimal `stardust/migrated/robots.txt` and
   `stardust/migrated/sitemap.xml` derived from the migrated page
   inventory.

Asset migration is idempotent — files are content-hashed and copied
only when missing.

### Phase 4 — State and report

Update `state.json`:

- For each successfully migrated page: `status` advances to
  `migrated`, append `{ status: "migrated", at: <ts> }` to history,
  clear any `stale` flag, set `migratedPath` to the output path.
- For pages skipped via idempotent skip: leave state unchanged.
- For pages that failed validation: leave state unchanged, log the
  failure in `state.json.lastRun.failures[]` for visibility.

Print a one-screen summary:

```
migrate complete
================

 22 migrated         home, about, pricing, features, contact, ...
  3 unchanged        blog, blog__post-3, blog__post-7  (idempotent skip)
  0 failed
  0 stale skipped

Output:  stardust/migrated/  (22 pages, 47 assets, 612 KB)

Next:
  - Review:    open stardust/migrated/index.html in a browser
  - Audit:     $impeccable critique stardust/migrated/
  - Deploy:    upload stardust/migrated/ to any static host
  - Refine:    edit DESIGN.md or run $stardust direct --re-direct,
               then re-run $stardust migrate
```

## Outputs

| Path                                              | Purpose                                                |
|---------------------------------------------------|--------------------------------------------------------|
| `stardust/migrated/<slug-path>/index.html`        | Migrated page (one per slug, nested for URL fidelity). |
| `stardust/migrated/index.html`                    | The home page (special case).                          |
| `stardust/migrated/assets/logo.<ext>`             | Brand logo.                                            |
| `stardust/migrated/assets/media/...`              | Referenced page media.                                 |
| `stardust/migrated/assets/favicon.<ext>`          | Favicon (extracted or logo-derived).                   |
| `stardust/migrated/robots.txt`                    | Minimal robots.txt.                                    |
| `stardust/migrated/sitemap.xml`                   | Sitemap derived from the migrated page inventory.      |
| `stardust/state.json`                             | Updated with `migrated` status and migration history.  |

## Idempotent and incremental

The whole pipeline is built around two properties:

- **Idempotent.** Re-running `$stardust migrate` with no changes
  produces zero file writes. Every page is sha-compared and skipped.
- **Incremental.** Migrating 5 pages today and 20 pages tomorrow
  works. Migrating 1 page in isolation works. The migrated tree is
  always the union of every successful migration to date.

These properties hold even when DESIGN.md is edited mid-run: the
edit changes the DESIGN.md sha, so the next migrate run re-renders
every affected page (which is most of them — DESIGN.md governs every
page's tokens).

## Stale handling

When `direction.md` changes after some pages have been migrated:

- Affected pages are flagged `stale: true` in state.json by `direct`.
- `$stardust migrate` (no flags) skips stale pages and reports the
  count.
- `$stardust migrate --refresh-stale` re-migrates each stale page,
  clearing the flag on success.
- `$stardust migrate <slug>` always operates on the named page,
  stale or not.

The user is the one who decides whether stale pages should be
refreshed — direction changes don't invalidate prior migrated work,
they just mark it as out-of-step with the latest direction.

## Failure modes

- **No directed pages.** Recommend `$stardust direct` and stop.
- **No DESIGN.md or DESIGN.json.** Direction was never authored;
  recommend `$stardust direct`.
- **Pending direction.** Refuse; user must resolve direction first.
- **Validation failure on a single page.** Skip that page, continue
  the run, log the failure under `state.json.lastRun.failures[]`. Do
  not abort.
- **Asset copy failure.** Continue the run; record the missing
  asset in the affected page's `provenance.contentDeviations[]`. The
  migrated page's `<img src>` keeps the original absolute URL as a
  fallback.
- **Output path collision.** Two slugs that map to the same output
  path (rare; happens when a slug includes a name that's also a
  segment in another slug). Refuse to write the second one and surface
  to the user — manual slug rename needed.

## What migrate does NOT do

- Critique or audit the migrated output. Run
  `$impeccable critique stardust/migrated/` after migration if you
  want a quality assessment.
- Deploy. Stardust does not push, upload, or modify origin.
- Generate AEM EDS, a CMS payload, or framework components. The
  output is platform-agnostic static HTML; downstream conversion is a
  separate plugin's job.
- Re-fetch the live site. The whole pipeline is offline after
  Phase 1 of `extract`.
- Run `$impeccable live` or any iteration loop. Iteration belongs to
  `prototype`; migrate consumes the result.

## References

- `reference/migration-procedure.md` — per-page render procedure,
  output path mapping, validation, provenance shape, idempotent skip.
- `reference/content-preservation.md` — what's kept, transformed,
  and dropped; internal link rewriting; asset path rewriting; form
  handling.
- `skills/stardust/reference/token-contract.md` — `:root` block
  refreshed from DESIGN.md on every render.
- `skills/stardust/reference/data-attributes.md` — structural
  attributes preserved on every section.
- `skills/stardust/reference/state-machine.md` — page lifecycle
  and stale rules.
- `skills/stardust/reference/artifact-map.md` — provenance shape
  for migrated artifacts.
