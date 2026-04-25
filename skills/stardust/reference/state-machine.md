# State machine

Stardust tracks state per page so multi-page redesigns can be incremental
and resumable. The state file is `stardust/state.json`. It is written by
`extract`, `direct`, `prototype`, and `migrate`, and read by `stardust`
(the master) for the state report.

---

## File: `stardust/state.json`

```json
{
  "_provenance": {
    "writtenBy": "stardust:<sub-command>",
    "writtenAt": "<ISO timestamp>",
    "stardustVersion": "0.2.0"
  },
  "site": {
    "originUrl": "https://example.com",
    "extractedAt": "<ISO timestamp>",
    "pageCap": 25,
    "totalDiscovered": 38,
    "crawled": 25
  },
  "direction": {
    "resolvedAt": "<ISO timestamp>",
    "phrase": "<verbatim user phrase>",
    "directionFile": "stardust/direction.md"
  },
  "pages": [
    {
      "slug": "home",
      "url": "https://example.com/",
      "title": "Example Home",
      "status": "approved",
      "history": [
        { "status": "extracted",   "at": "..." },
        { "status": "directed",    "at": "..." },
        { "status": "prototyped",  "at": "..." },
        { "status": "approved",    "at": "..." }
      ],
      "stale": false,
      "staleReason": null,
      "currentStatePath": "stardust/current/pages/home.json",
      "prototypePath":    "stardust/prototypes/home.html",
      "migratedPath":     null
    }
  ]
}
```

Top-level keys: `_provenance`, `site`, `direction`, `pages`. Always in
that order. `_provenance` is always the first key.

---

## Page lifecycle states

A page moves linearly through these states. It can be marked **stale**
at any non-terminal state when direction changes; `stale: true` does not
move the state, it flags it.

| State        | Meaning                                                                 | Set by                  |
|--------------|-------------------------------------------------------------------------|-------------------------|
| `extracted`  | Crawled and parsed. `current/pages/<slug>.json` exists.                 | `stardust:extract`      |
| `directed`   | Direction `direction.md` resolved; this page is in scope of the direction. | `stardust:direct`     |
| `prototyped` | A before/after prototype exists at `prototypes/<slug>.html`.            | `stardust:prototype`    |
| `approved`   | The user explicitly approved the prototype.                             | `stardust:prototype`    |
| `migrated`   | Final redesigned static HTML written to `migrated/<slug>.html`.         | `stardust:migrate`      |

**Linearity rule.** A page never moves backward. Re-running `prototype`
after `approved` does not demote — it produces a new prototype with a
new history entry, and the user must re-approve to advance.

---

## "Stale on direction change" rule

When `$stardust direct` resolves a new direction that differs from the
prior one, every page in `prototyped`, `approved`, or `migrated` state
**must** be flagged with `stale: true` and `staleReason: "direction
changed at <timestamp>"`. The state itself does not change — the
artifact on disk is still valid, just out of step with the latest
direction.

Stardust **never** auto-re-runs prototype or migrate on stale pages.
The user opts in:

- `$stardust prototype` with no args operates only on **non-stale**
  pages, plus shows a count of stale ones with a hint to use
  `$stardust prototype --refresh-stale`.
- `$stardust prototype --refresh-stale` re-prototypes every stale page.
- `$stardust prototype <slug>` always operates on the named page,
  stale or not.
- Same flags for `migrate`.

When a stale page is successfully re-prototyped or re-migrated, clear
its `stale` flag and append the new history entry.

---

## State report (rendered by `$stardust` with no args)

```
stardust state
==============

Site:        https://example.com (extracted 2026-04-25, 25/38 pages)
Direction:   "make it more expressive for a young audience"
             (resolved 2026-04-25, see stardust/direction.md)

Pages
-----
  ✓ migrated   home, about, pricing
  ✓ approved   features, contact
  · prototyped blog, docs/index
    directed   docs/api, docs/guide
    extracted  (15 more)

Stale: 2 pages (home, about) — direction changed since they were migrated.
       Re-run with `$stardust migrate --refresh-stale` to update.

Recommended next: $stardust prototype features
                  (5 directed pages waiting; closest to migration)
```

The recommended next step uses these heuristics, in order:

1. If no `extracted` data → recommend `$stardust extract`.
2. If extracted but no direction → recommend `$stardust direct`.
3. If stale pages exist and the user just changed direction →
   surface them but don't auto-recommend a refresh.
4. If `directed` pages exist → recommend `$stardust prototype`.
5. If `approved` pages exist that aren't migrated → recommend
   `$stardust migrate`.
6. Otherwise the redesign is complete; recommend a final
   `$impeccable critique` against `migrated/`.

---

## Concurrency

Stardust does not own a long-running process. Every sub-command reads
`state.json` at start, writes once at end. If two sub-commands run
concurrently from different shells, last-write-wins. Document this in
the `extract` and `migrate` SKILL.md files; do not try to lock.

---

## Schema versioning

The schema version is implicit in `_provenance.stardustVersion`. If
stardust later changes the schema, write a one-shot migrator under
`skills/stardust/scripts/migrate-state.mjs` and call it from setup.
