---
name: stardust:direct
description: Resolve the user's redesign intent (open phrase) into a target PRODUCT.md, DESIGN.md, and stardust/direction.md with full reasoning trace.
---

# stardust:direct

> **Phase 2 — not yet implemented.**
> This skill is scaffolded but its body lands in the next stardust phase.

## Planned scope

Run the intent reasoning procedure
(`skills/stardust/reference/intent-reasoning.md`) on the user's freeform
phrase, ask up to two clarifying questions, build a plan, get
confirmation, then:

- Write `stardust/direction.md` with the resolved axes, the chosen
  command sequence, and the full reasoning trace.
- Seed `PRODUCT.md` at the project root via `$impeccable teach`.
- Seed `DESIGN.md` and `DESIGN.json` at the project root via
  `$impeccable document`.
- Update `stardust/state.json` — mark in-scope pages as `directed`,
  flag previously-prototyped or migrated pages as `stale` if direction
  changed.

Carries forward from v1: the divergence toolkit and the 127-palette
library + picker. Both will live under `skills/direct/reference/` once
this skill is implemented.

See `skills/stardust/reference/artifact-map.md` for the artifact
contract this skill must honour.
