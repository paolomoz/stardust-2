---
name: stardust:migrate
description: Apply the approved target DESIGN.md to every page in the inventory, producing a redesigned static HTML site. Per-page, incremental, idempotent.
---

# stardust:migrate

> **Phase 4 — not yet implemented.**
> This skill is scaffolded but its body lands in the next stardust phase.

## Planned scope

For each `approved` page (or the named `<slug>` if specified):

1. Read `stardust/current/pages/<slug>.json` for source structure +
   content.
2. Read the target `DESIGN.md` + `DESIGN.json` at the project root.
3. Render the page from scratch using the target tokens and components,
   preserving content (copy, media, links, IA roles).
4. Annotate the output with structural data attributes (`data-section`,
   `data-intent`, `data-layout`) so downstream tools have a stable
   handoff.
5. Write `stardust/migrated/<slug>.html` with a stardust provenance
   block.
6. Mark the page `migrated` in `state.json`.

Re-runs are idempotent — re-running on a `migrated` page produces the
same output unless DESIGN.md or the page's source has changed. Direction
changes flag affected migrated pages as `stale` rather than
auto-re-running them; `--refresh-stale` opts in.

The migration target is platform-agnostic static HTML. Conversion to
AEM EDS, another CMS, or a framework is out of scope; a separate
downstream skill consumes `migrated/*.html` plus the project-root
`DESIGN.md` for that.

See `skills/stardust/reference/artifact-map.md` for the artifact
contract this skill must honour.
