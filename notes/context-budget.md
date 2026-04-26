# Context budget analysis (stardust v2 @ commit fbd2437)

A capture of the context-cost audit from 2026-04-26. Documents the
current per-step token cost of stardust's flow, identifies the
heaviest files, and proposes lazy-loading edits — **none of which
are implemented yet**. Kept for reference.

This is not a runtime spec; it is a design note.

---

## Per-file weight (chars/4 estimate, narrative only)

Top files, narrative content (markdown):

| Tokens | File |
|---:|---|
| 7,537 | `skills/stardust/reference/divergence-toolkit.md` |
| 3,124 | `skills/prototype/SKILL.md` |
| 2,913 | `skills/direct/SKILL.md` |
| 2,749 | `skills/extract/SKILL.md` |
| 2,646 | `skills/migrate/SKILL.md` |
| 2,553 | `skills/direct/reference/palette-picker.md` |
| 2,526 | `skills/stardust/reference/intent-examples.md` |
| 2,237 | `skills/extract/reference/brand-surface.md` |
| 2,150 | `skills/migrate/reference/migration-procedure.md` |
| 2,025 | `skills/stardust/reference/artifact-map.md` |
| 1,939 | `skills/prototype/reference/before-after-shell.md` |
| 1,660 | `skills/stardust/reference/impeccable-command-map.md` |

Per-skill totals (SKILL.md + reference/, all narrative):

| Skill | Tokens |
|---|---:|
| stardust (master) | 21,997 |
| extract | 9,426 |
| direct | 7,625 |
| prototype | 5,063 |
| migrate | 6,709 |
| **Total narrative** | **~50,820** |

Plus the data file `palettes/library.json` = **15,899 tokens**
(needed only when the picker runs).

---

## Per-step budget — current (eager loading)

For an end-to-end 5-page redesign in a single Claude Code session.
Numbers include the agent's own reasoning, tool-call results, file
reads, and outputs — not just up-front loads.

| Step | Adds | Cumulative |
|---|---:|---:|
| Master setup + impeccable handshake | 2K | 2K |
| `$stardust extract <url>` (5 pages crawled) | 50K | **52K** |
| `$stardust direct "<phrase>"` (with palette pick) | 60K | **112K** |
| `$stardust prototype home` (initial render) | 50K | **162K** |
| `$impeccable live` (one iteration round on home) | 50K | **212K** — **over 200K** |

**Implication:** the first prototype iteration blows the 200K
context. Multi-page redesigns currently require the user to break
across sessions. The state machine in `state.json` is designed for
exactly this — sub-commands resume from on-disk state — but lazy
loading would extend single-session reach.

---

## What's needed per phase (within `direct`, the heavyweight)

| direct phase | Genuinely needs | Skippable in best case |
|---|---|---|
| Setup | master + state.json + `_brand-extraction.json` | — |
| Phase 1 (Reasoning) | `intent-reasoning` + `intent-dimensions` + `intent-examples` + `impeccable-command-map` (~7K) | examples can be skipped if reasoning is straightforward |
| Phase 2 (Divergence) | `divergence-toolkit` (~7.5K) | `palette-picker` (2.5K) and **library.json** (16K) only when palette changes |
| Phase 3 (Author PRODUCT.md) | impeccable's `teach.md` as format spec | — |
| Phase 4 (Author DESIGN.md) | impeccable's `document.md` + register ref + `divergence-toolkit` § 4 (already loaded) | — |
| Phase 5 (state + report) | `direction-format` + `state-machine` (~3K) | — |

If a user's intent inherits the existing palette (no palette
change), `direct` can run on **~30K** instead of **~46K** — a ~35%
reduction by skipping `palette-picker.md` + `library.json`.

---

## Proposed edits (not implemented; ranked by ROI)

### A — "Load when" column on every References section (highest ROI, low effort)

Convert each SKILL.md's bottom References list from a flat bullet
list to a table with a "Load when" column. Five SKILL.md files.

```
| Reference                 | Load when                                        |
|---------------------------|--------------------------------------------------|
| `intent-reasoning.md`     | Phase 1 (always)                                 |
| `intent-examples.md`      | Phase 1 (consult only on phrase ambiguity)       |
| `divergence-toolkit.md`   | Phase 2 (always)                                 |
| `palette-picker.md`       | Phase 2 (only when palette change is in scope)   |
| `palettes/library.json`   | Phase 2 (only when running picker)               |
| `direction-format.md`     | Phase 5 (always)                                 |
```

Estimated savings on a typical `direct` run with no palette change:
**~15K tokens (33% of direct's narrative cost)**.

### B — Cite references in-line at each phase, not just at the bottom (medium ROI, low effort)

Already partially done. Tighten so each phase explicitly says "Read
`X` now" at the moment it's needed, instead of "per `X`" mentions
that read as static citations.

### C — Shard `palettes/library.json` by ground family (highest data-side ROI, medium effort)

Today the picker reads the whole 16K library. The descriptor
classifier resolves a `ground_family` first. If the picker reads
only the matching family file:

| Ground family | Palette count | Estimated tokens |
|---|---:|---:|
| `cream` | 5 | ~600 |
| `dark` | 20 | ~2,500 |
| `monochrome-tint` | 13 | ~1,600 |
| `pale-gray` | 5 | ~600 |
| `saturated` | 78 | ~10,000 |
| `stark-white` | 6 | ~750 |

For most directions (which route to `monochrome-tint`, `dark`, or
`cream`), this saves **~13-15K tokens**. Cost: re-shard the library
into 6 files + an index, update `palette-picker.md` to load
conditionally. The current `library.json` becomes the index/manifest.

### D — Don't split `divergence-toolkit.md` (low ROI, high cost — recommend NOT)

Tempting to split the 7.5K toolkit into per-section files, but Phase
2 of `direct` needs §§ 1-3, 5, 7 anyway (most of it). The split
would only save ~1-2K tokens at the cost of fragmenting a tightly
coupled document.

### E — Move `intent-examples.md` (2.5K) from "always loaded" to "consult on demand" (medium ROI, low effort)

The 10 worked examples are calibration, not procedure. Mark
explicitly as "load only if Phase 1 step 1 (Restate) produces
uncertainty about which axes the phrase moves."

### F — Eager-load reduction on `prototype` for the initial render (medium ROI, low effort)

`prototype` currently advertises path-2 (chat-driven refinement)
machinery in its References. For an initial render with no path-2
use, `intent-dimensions.md` + `impeccable-command-map.md` aren't
needed. Mark them as "load only when entering iteration path 2."

---

## Per-step budget — projected with A + E + F + C

| Step | Adds | Cumulative |
|---|---:|---:|
| Master setup | 2K | 2K |
| `$stardust extract <url>` | 50K | **52K** |
| `$stardust direct "<phrase>"` (sharded library, lazy refs) | 30K | **82K** |
| `$stardust prototype home` (initial render, path-2 refs not loaded) | 40K | **122K** |
| `$impeccable live` (one iteration on home) | 50K | **172K** |
| `$stardust prototype about` (refs cached) | 20K | **192K** |
| `$stardust migrate` | tight; near ceiling | possibly OK |

The same flow fits **single-page-end-to-end with iteration**
comfortably. Even fits a second page's initial render. Migrate would
land near the ceiling.

---

## What "faster" actually means

Lazy loading is mostly about **fitting** the flow in a session, not
wall-clock speed.

| Effect | Magnitude | Notes |
|---|---|---|
| Time-to-first-token | -100-300ms per turn | Smaller prompts → slightly faster decode start |
| Per-token output cost | -10-25% | For paid API users; consumer quota spends slower |
| Single-turn quality | marginal | Smaller focused context can improve precision; mostly noise |
| **Context fit** | **decisive** | Difference between "fits in session" vs "needs split" |

Users perceive "faster" mostly as "I didn't hit the context limit",
not as "tokens stream faster".

---

## Architectural framing

Two distinct levers solve two distinct problems:

- **State machine** (`state.json` + per-page artifacts) — the answer
  for session boundaries. Stardust is designed so any sub-command can
  resume from on-disk state, so the realistic end-to-end pattern
  splits across sessions:
  ```
  Session 1:  extract + direct
  Session 2:  prototype home + iterate
  Session N:  migrate
  ```
  This works today, with no edits.

- **Lazy loading** (the edits proposed above) — the answer for
  single-session headroom. Lets the user do more in one session
  before hitting 200K, but does not eliminate session boundaries for
  a full multi-page redesign.

Both are valid. The state machine is the more fundamental lever.

---

## Decision

As of 2026-04-26: **edits A through F are NOT implemented**. The
analysis is documented here for future reference. Revisit when:

- Real users report hitting context limits in single-session flows.
- A specific phase (likely `direct` or `prototype`) becomes the
  bottleneck in eval runs.
- The library grows substantially beyond v0.6.0's 127 palettes
  (resharding becomes more compelling).

---

## How to update this analysis

If you want to refresh the per-file token table, run from the repo
root:

```sh
for f in skills/stardust/SKILL.md skills/stardust/reference/*.md \
         skills/extract/SKILL.md skills/extract/reference/*.md \
         skills/direct/SKILL.md skills/direct/reference/*.md \
         skills/prototype/SKILL.md skills/prototype/reference/*.md \
         skills/migrate/SKILL.md skills/migrate/reference/*.md; do
  bytes=$(wc -c < "$f")
  printf "%6d tok  %s\n" $((bytes / 4)) "${f#skills/}"
done | sort -nr
```

The chars/4 heuristic underestimates compared to actual Anthropic
tokenization on prose by ~10-15%, so treat the numbers as a lower
bound. For a precise count, run the files through Anthropic's
`anthropic.tokenize` API.
