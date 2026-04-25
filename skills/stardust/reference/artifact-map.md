# Artifact map

Every file stardust reads or writes, who owns it, what it contains, and
how its provenance block is shaped.

---

## Project root (impeccable's format — stardust authors directly)

| Path             | Format owner | Stardust writes when                                         | Stardust reads when                    |
|------------------|--------------|--------------------------------------------------------------|----------------------------------------|
| `PRODUCT.md`     | impeccable   | `$stardust direct` authors it from the resolved direction    | every sub-command (target strategy)    |
| `DESIGN.md`      | impeccable   | `$stardust direct` authors it from the resolved direction + brand surface | `prototype`, `migrate`     |
| `DESIGN.json`    | impeccable   | `$stardust direct` authors it from the resolved direction + brand surface | `prototype`, `migrate`     |
| `AGENTS.md`      | impeccable   | never (read-only for stardust)                               | every sub-command (Design Context)     |

Stardust authors `PRODUCT.md`, `DESIGN.md`, and `DESIGN.json` **directly**,
treating impeccable's `reference/teach.md` and `reference/document.md` as
**format specs** rather than runtime commands. Reasoning: by the time
`$stardust direct` runs, the user has already gone through stardust's
intent-reasoning interview — re-running impeccable's interview would
duplicate questions. The resolved direction in `stardust/direction.md`
carries every answer impeccable's interviews would surface.

Users who want impeccable to validate or refine the project-root files
can run `$impeccable teach` or `$impeccable document` directly at any
time; stardust does not own those commands and will not interfere.

The same direct-authoring pattern is used for the descriptive files
under `stardust/current/` written by `$stardust extract`.

---

## `stardust/` (stardust's territory)

```
stardust/
├── state.json                        # state machine (state-machine.md)
├── direction.md                      # resolved intent + reasoning trace
├── current/
│   ├── PRODUCT.md                    # impeccable-format strategy of the EXISTING site
│   ├── DESIGN.md                     # impeccable-format visual system of the EXISTING site
│   ├── DESIGN.json                   # sidecar
│   ├── pages/
│   │   └── <slug>.json               # per-page parsed structure + content
│   └── assets/
│       ├── logo.<ext>                # extracted logo
│       └── media/                    # extracted images, with original URLs
├── prototypes/
│   ├── <slug>.html                   # before/after viewer (user-facing review surface)
│   └── <slug>-proposed.html          # proposed redesign on its own (live-mode iteration target, migration source)
└── migrated/
    └── <slug>.html                   # final redesigned static HTML page
```

### `stardust/state.json`
Owner: every stardust sub-command. Schema in `state-machine.md`.

### `stardust/direction.md`
Owner: `$stardust direct`. The full reasoning trace for the resolved
direction, written using the format in
`skills/direct/reference/direction-format.md`. The agent appends a new
section every time direction changes.

### `stardust/current/PRODUCT.md` and `DESIGN.md`
Owner: `$stardust extract`. Authored by `$impeccable teach` /
`$impeccable document` against the extracted site, but seeded by
stardust. These files describe what *is*, not what *should be*.

### `stardust/current/pages/<slug>.json`
Owner: `$stardust extract`. Per-page parsed model. Schema lives in
`skills/extract/reference/current-state-schema.md` (Phase 1).

### `stardust/current/assets/`
Owner: `$stardust extract`. Logo + media extracted from the live site.
Filenames preserve the source basename plus a hash to avoid collisions.

### `stardust/prototypes/<slug>.html` and `<slug>-proposed.html`
Owner: `$stardust prototype`. Two files per page (see
`skills/prototype/reference/before-after-shell.md` for the contract):

- **`<slug>.html`** — the **viewer**. Self-contained HTML with two
  iframes side-by-side: left = current page (live URL, screenshot
  fallback, or landmarks-text fallback), right = the proposed
  redesign (loaded from `<slug>-proposed.html`). Header strip with
  swap/approve/stash/live-mode actions. The user-facing review
  surface.
- **`<slug>-proposed.html`** — the **proposed redesign on its own**.
  Self-contained, complete HTML page rendered against the target
  `DESIGN.md`. The file `$impeccable live` iterates on; the file
  `$stardust migrate` later re-derives from for the final migrated
  page.

Both carry provenance blocks in `<head>`. The proposed file's
provenance lists the active direction it was rendered against; when
direction changes, the page is flagged `stale` in `state.json` and
the viewer surfaces the staleness in the header strip.

### `stardust/migrated/<slug>.html`
Owner: `$stardust migrate`. Final redesigned static page. No iframe
shell — just the redesigned page itself. Provenance block in HEAD.

---

## Provenance shapes

Stardust uses three provenance shapes depending on the file type, the
same convention as v1 and as impeccable's loader expects.

### HTML files
First child of `<head>`:

```html
<!-- stardust:provenance
  writtenBy:        stardust:prototype
  writtenAt:        2026-04-25T15:42:00Z
  againstDirection: stardust/direction.md#section-2
  readArtifacts:
    - stardust/current/pages/home.json
    - DESIGN.md
    - DESIGN.json
  synthesizedInputs: []
  stardustVersion:  0.2.0
-->
```

### Markdown files
First line, before any frontmatter:

```markdown
<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-25T14:10:00Z
  ...
-->
---
```

### JSON files
First top-level key (`_provenance`):

```json
{
  "_provenance": {
    "writtenBy": "stardust:extract",
    "writtenAt": "2026-04-25T13:00:00Z",
    "readArtifacts": ["https://example.com/"],
    "synthesizedInputs": [],
    "stardustVersion": "0.2.0"
  },
  "...": "..."
}
```

---

## Read-vs-write discipline

- **Read order** for any sub-command: `state.json` first, then
  `direction.md`, then the impeccable target files at the project root,
  then anything from `stardust/current/` it specifically needs.
- **Write order** for any sub-command: write all artifacts first, then
  update `state.json` last. If a write fails, the `state.json` update
  is skipped so the next run sees a consistent prior state.
- **Provenance is mandatory.** Any artifact without a provenance block
  is treated as user-edited and stardust will not silently overwrite it.
  When stardust detects a provenance-less artifact in a path it owns,
  it asks the user before proceeding.
