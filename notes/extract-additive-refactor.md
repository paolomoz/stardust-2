# Additive refactor: prepare for the brand-only split without committing to it

A trimmed plan extracted from `notes/extract-scope-refactor.md` (the
"brand-only extract" note). That larger refactor is **deferred** —
it has too much surface area (14–16 files post-#1–17) and depends on
user-pain signals we have not observed.

This note covers the **additive** subset of that plan — steps 2, 3,
4 from the migration plan. Each is independently shippable, none
break behavior, and together they set the architecture up so the
breaking-change steps (5–7) can be flipped later without redesign.

The additive refactor itself **does not narrow extract's scope**.
Extract still discovers, still extracts every page in the cap, still
emits the brand surface and brand-review. What changes:

- Two reference files move from `skills/extract/reference/` to
  `skills/stardust/reference/` to reflect that they're shared across
  sub-commands.
- A new master-level reference documents the lazy-extraction
  contract.
- `prototype` and `migrate` adopt that contract via an idempotent
  guard ("ensure-extracted before render"), so when extract one day
  becomes brand-only, those sub-commands already know how to fill
  in the missing per-page data on demand.

This is preparation, not commitment. If we never ship the brand-only
refactor, the additive moves still pay for themselves: shared refs
in the right place, an explicit contract for lazy extraction, and
two sub-commands whose behavior is more honest about what data they
need.

---

## Why these three steps are safe to ship now

| step | breaks behavior? | reverts cleanly? | depends on user signal? |
|---|---|---|---|
| 2. Promote shared refs | No | Yes (file move + citation update) | No |
| 3. Document ensure-extracted | No | Yes (delete the file) | No |
| 4. Wire prototype + migrate to call it | No (idempotent: pages already extracted skip the call) | Yes (revert the wiring edits) | No |

Each step is a pure architectural cleanup with zero user-visible
consequences. The breaking-change steps from the parent doc (5–7:
extract scope cut, discovery move) are NOT in this plan.

---

## Step 2: Promote shared references to master level

Two reference files in `skills/extract/reference/` are read by
multiple sub-commands. Today they live in `extract`'s tree because
that's the sub-command that authored them, but every other
sub-command needs them too.

| file | currently | reads from extract? | reads from prototype? | reads from migrate? |
|---|---|---|---|---|
| `playwright-recipe.md` | `skills/extract/reference/` | Yes — Phase 2 capture | Yes — when re-rendering live `<iframe>` source falls back to a fresh capture | Yes — when migrate Path B re-renders without a proposed file, it re-reads landmark structure |
| `current-state-schema.md` | `skills/extract/reference/` | Yes — Phase 2 schema authoring | Yes — `pages/<slug>.json` is the input to the proposed-page render | Yes — migrate consumes the same JSON |

Move both to `skills/stardust/reference/` and update citations
across the codebase.

### Files affected by the move

| file | edit kind |
|---|---|
| `skills/stardust/reference/playwright-recipe.md` | **New location** (was `skills/extract/reference/playwright-recipe.md`) |
| `skills/stardust/reference/current-state-schema.md` | **New location** (was `skills/extract/reference/current-state-schema.md`) |
| `skills/extract/SKILL.md` | Update References section + every inline citation |
| `skills/extract/reference/brand-surface.md` | Update inline citations |
| `skills/extract/reference/brand-review-template.md` | Update inline citations |
| `skills/extract/reference/ia-extraction.md` | Update one citation under § Junk-page filter (currently cites the schema file) |
| `skills/prototype/SKILL.md` | Add the two refs to References (currently absent) |
| `skills/prototype/reference/before-after-shell.md` | Add citation to playwright-recipe for fallback re-capture |
| `skills/migrate/SKILL.md` | Add the two refs to References (currently absent) |
| `skills/migrate/reference/migration-procedure.md` | Add citations to both |
| `skills/stardust/reference/artifact-map.md` | Update path of `pages/<slug>.json` schema citation |

Approximately 11 files, all citation edits except the two file moves.

### Verification

After the move, running:

```
grep -rn "skills/extract/reference/playwright-recipe.md" skills/
grep -rn "skills/extract/reference/current-state-schema.md" skills/
```

should return no hits. Every citation must point at the new
master-level path.

### Effort

Mechanical. ~30 min of careful citation updates. No design
decisions.

---

## Step 3: Document the `ensure-extracted` contract

Add a new reference file:
`skills/stardust/reference/ensure-extracted.md`.

This file specifies the **lazy-extraction primitive** — the
procedure any sub-command can call to guarantee that
`stardust/current/pages/<slug>.json` exists for a given slug or URL,
extracting it on demand if it does not. Today extract is the only
producer; in the additive model, prototype and migrate become
on-demand consumers that can request a missing page.

### File contents (sketch)

```markdown
# ensure-extracted

The procedure any sub-command calls when it needs
`stardust/current/pages/<slug>.json` to exist for a given slug or
URL. Idempotent: if the page is already extracted (state.json says
so AND the JSON file exists AND its provenance is current), the
procedure is a no-op.

## Inputs

- `<slug-or-url>` — required. If a slug, look up the URL in
  state.json. If a URL, derive the slug per ia-extraction § Slug
  derivation and add to state.json with status "seen".

## Procedure

1. **State check.** If state.json's entry for this slug has
   `status` ≥ `extracted` AND `currentStatePath` resolves to an
   existing file AND the file's `_provenance.stardustVersion`
   matches the current version, return immediately.
2. **Lazy extract.** Otherwise, run the Phase 2 procedure from
   `skills/extract/SKILL.md` for this single page (per
   `skills/stardust/reference/playwright-recipe.md` and
   `skills/stardust/reference/current-state-schema.md`).
3. **Update state.** Mark the slug `extracted` in state.json with
   `currentStatePath` pointing at the new JSON.
4. **Skip brand-surface.** This procedure does NOT trigger
   brand-surface aggregation, the brand-review render, or any
   Phase 4–6 work — those are extract's responsibility, not the
   caller's.

## Caller obligations

- The caller must have run extract at least once on this site
  (state.json must exist with `site.originUrl` set), so the
  brand-surface and current/PRODUCT.md / DESIGN.md anchors exist.
- The caller surfaces "extracted on demand" in its own report so
  the user knows a Playwright session ran outside extract's
  Phase 2.

## Concurrency

Two callers requesting the same slug at the same time race; this
matches the rest of stardust's last-write-wins concurrency model
(per `state-machine.md`). The probability of two simultaneous
ensure-extracted calls on the same slug from a single Claude
session is ~zero, so we do not lock.
```

### Files affected

| file | edit kind |
|---|---|
| `skills/stardust/reference/ensure-extracted.md` | **New** |
| `skills/stardust/SKILL.md` | Add to References (master skill cites it for sub-command awareness) |

### Effort

Small. The reference file is ~60 lines once polished. No code, just
a procedure spec.

---

## Step 4: Wire prototype + migrate to call ensure-extracted

Today, prototype and migrate **assume** the per-page JSON exists
because extract has already produced it. That assumption holds in
the current eager-extract model, but it's silent — neither
sub-command checks. If a future user runs `$stardust prototype
<url>` against a slug extract didn't cover, the failure is a missing
file, not a graceful "let me extract that for you."

Add an explicit guard at the start of each sub-command's main work
phase: `ensure-extracted(slug)`. In the current eager model the
guard is always a no-op (the page is already extracted), so user
behavior does not change. When extract is later narrowed (steps
5–7 of the parent refactor), the same guard automatically picks up
the lazy-extraction work.

### Prototype edits

| location | edit |
|---|---|
| `skills/prototype/SKILL.md` § Procedure, Phase 1 | Prepend a sub-step: "Before any render work, run the `ensure-extracted` procedure (`skills/stardust/reference/ensure-extracted.md`) for the target slug. In the eager-extract model this is always a no-op; the guard exists so a future scope change to extract is invisible to prototype's caller." |
| `skills/prototype/SKILL.md` Inputs | No change. The slug input is already required. |
| `skills/prototype/SKILL.md` Failure modes | Add: "Page never extracted and ensure-extracted lazy fetch fails — same handling as a Phase 2 failure during extract: record under `_crawl-log.json` and report to user. Do not write a half-rendered prototype." |

### Migrate edits

| location | edit |
|---|---|
| `skills/migrate/SKILL.md` § Procedure, before Phase 2 (Per-page render) | Add a step: "For each slug to migrate, run `ensure-extracted` first. Pages already extracted skip; pages missing are extracted in parallel before render begins." |
| `skills/migrate/SKILL.md` Failure modes | Same addition as prototype: lazy-extract failure handled per `_crawl-log.json`. |

### Why this is safe today

The guard is idempotent (state-check first, return immediately when
already extracted). Every page extract has produced is already
extracted. So in the current eager model, the guard fires zero
Playwright runs and adds zero wall-clock time.

### Effort

Trivial — four edits across two SKILL.md files. ~10 minutes.

---

## What this plan deliberately does NOT do

- **Does not narrow extract's scope.** Extract still discovers,
  extracts every page in the cap, and emits the full brand surface
  + review. Step 5 of the parent refactor (extract = 3-page brand
  sample) is deferred.
- **Does not move discovery to migrate.** Step 6 of the parent
  refactor is deferred. `ia-extraction.md` stays in
  `skills/extract/reference/`.
- **Does not change direction-format to site-wide.** Step 7 of the
  parent refactor is deferred.
- **Does not change state.json semantics.** Pages still enter
  state.json as `extracted` after extract's Phase 2; we are not
  introducing the `seen` / `brandSampled` orthogonal flags from the
  parent refactor.

These are the breaking changes. They wait for a real user signal
(extract feels too heavy, or per-page work is observed wasted on
un-prototyped pages, or an eval becomes inconsistent because BFS
discovery is too slow).

---

## Sequencing

The three steps are independent enough to ship in any order, but
the natural order is 2 → 3 → 4:

1. **Step 2 first** — moves the shared refs. After this, both
   sub-commands and the new `ensure-extracted` doc cite a stable
   master-level path.
2. **Step 3 next** — adds the contract. Cites the now-master-level
   refs.
3. **Step 4 last** — wires prototype + migrate to call the
   contract.

All three could land in a single commit ("additive: prepare for
brand-only extract") or three commits, depending on review
preference. Single commit is fine — none of the steps stand alone
as a feature.

---

## Revisit conditions

After this additive refactor lands, the parent `extract-scope-refactor.md`
plan still applies for steps 5–7. Revisit when one of:

- A real user reports extract too heavy for the brand-only path
  (the doc's revisit trigger #1).
- An eval surfaces per-page work wasted on un-prototyped pages
  (revisit trigger #2).
- Discovery / per-page maintenance burden in `extract` becomes a
  concrete pain point (revisit trigger #3).

Trigger #4 (multi-page brand-surface aggregation) has already
shipped (commit `e36c6cc`, May 2026 — proposal #4 from
STARDUST_IMPROVEMENTS.md), so cross it off the parent doc when
shipping this additive plan.
