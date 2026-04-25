---
name: stardust:prototype
description: Render before/after side-by-side prototypes per page and iterate via $impeccable craft and $impeccable live.
---

# stardust:prototype

> **Phase 3 — not yet implemented.**
> This skill is scaffolded but its body lands in the next stardust phase.

## Planned scope

For each `directed` page (or the named `<slug>` if specified), produce
`stardust/prototypes/<slug>.html`: a self-contained side-by-side view of
the current page (left iframe, rendered against
`stardust/current/DESIGN.md`) and the proposed redesign (right iframe,
rendered against the project-root target `DESIGN.md` after running
`$impeccable craft`).

Iteration delegates fully to `$impeccable live`. Approval moves the
page to `approved` in `state.json`.

`--refresh-stale` re-prototypes pages flagged stale by a direction
change. Default behaviour is to skip stale pages with a hint.

Carries forward from v1: the `:root` token contract on the right-side
rendering, and the structural data attributes (`data-section`,
`data-intent`, `data-layout`) on the redesigned markup so downstream
migration tools (and a future EDS skill) can map structure.

See `skills/stardust/reference/artifact-map.md` for the artifact
contract this skill must honour.
