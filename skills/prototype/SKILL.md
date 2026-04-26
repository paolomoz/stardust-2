---
name: stardust:prototype
description: Render before/after side-by-side prototypes per page; iterate via $impeccable craft and $impeccable live. Per-page, idempotent, stale-aware.
---

# stardust:prototype

For each `directed` page, render a **proposed redesign** (a self-contained
static HTML file) and a **before/after viewer** that loads the current
page and the proposed redesign side-by-side. Iterate the proposed file
via `$impeccable live`. Mark `approved` once the user signs off.

`prototype` is not a renderer of its own design — it composes the
target spec written by `direct` (`PRODUCT.md`, `DESIGN.md`,
`DESIGN.json`, `stardust/direction.md`) onto the page content captured
by `extract` (`stardust/current/pages/<slug>.json`). Visual creativity
is delegated to `$impeccable craft` and `$impeccable live`.

## Inputs

- `<slug>` — optional positional. Prototype just this page. Without
  it, prototype every `directed` page that is not `stale`.
- `--refresh-stale` — re-prototype every page flagged `stale` by a
  direction change. Default behaviour without this flag is to skip
  stale pages and surface the count.
- `--all` — prototype every `directed` page including stale ones.
- `--no-iterate` — write the initial proposed render and the viewer,
  open the viewer in the browser, but **do not** invoke
  `$impeccable live`. The user iterates manually later.

## Setup

1. Run the master skill's setup
   (`skills/stardust/SKILL.md` § Setup).
2. Verify `stardust/state.json` exists and contains at least one
   `directed` page. If not, recommend `$stardust direct` and stop.
3. Verify the project-root `DESIGN.md` and `DESIGN.json` exist. If
   not, the direction was not fully authored — recommend
   `$stardust direct` and stop.
4. Verify `stardust/direction.md` has an active (not pending)
   direction. Pending directions block prototype.
5. Read `stardust/current/DESIGN.md` (the descriptive snapshot of the
   existing site, used by the viewer's CURRENT side fallback path).

## Procedure

### Phase 1 — Plan the prototype

For each page in scope:

1. Read `stardust/current/pages/<slug>.json` for the page's structure
   and content.
2. Read `stardust/direction.md` Active section for the resolved
   direction, divergence inputs, and command sequence.
3. Read project-root `DESIGN.md` + `DESIGN.json` for target tokens
   and components.
4. Decide whether a structural plan is needed. The default is **no** —
   `direction.md` has the brief-equivalent info already. Invoke
   `$impeccable shape stardust/current/pages/<slug>.json` only when
   the user asks for an explicit shape pass or when the page is
   structurally complex (>= 8 sections, multiple forms, deep
   nesting).

### Phase 2 — Render the proposed page

Render `stardust/prototypes/<slug>-proposed.html` per
`reference/before-after-shell.md` § Required structure. Hard
requirements there:

- `:root` token block as the first content of the first `<style>`
  (per `skills/stardust/reference/token-contract.md`).
- Structural data attributes on every section (per
  `skills/stardust/reference/data-attributes.md`).
- Provenance block as the first child of `<head>`.
- Self-contained: no external CSS, no external JS.
- Content preserved from the current page (hero copy, CTAs, nav,
  body) unless `direction.md` authorises content changes.

Delegate the heavy creative lift to `$impeccable craft`:

- Pass the page content and the resolved direction as the feature
  description.
- Reference DESIGN.md / DESIGN.json as the design system.
- Pass `direction.md` § Anti-references and § Divergence inputs as
  hard constraints (so craft does not silently veer off the resolved
  direction).
- Skip craft's "north star mock" generation step (direction.md is the
  brief). Skip craft's "shape" call (already done if Phase 1 needed
  it).

After craft returns, validate the output:

- `:root` block present and complete (token-contract.md).
- Data attributes on every section (data-attributes.md).
- Anti-toolbox audit clean (each hit justified per divergence-toolkit.md
  § 1; record audit results in `DESIGN.json.extensions.divergence.anti_toolbox_hits`
  with the audit's amendments noted).
- Impeccable hard rules respected (OKLCH, type ratio ≥ 1.25, no
  reflex slop).

If validation fails, do not write the file. Surface the failure to
the user with the specific rule violated and a suggested fix.

### Phase 3 — Compose the viewer

Render `stardust/prototypes/<slug>.html` per
`reference/before-after-shell.md` § `<slug>.html`. Two-iframe layout,
header strip with action buttons, footer strip with direction title.

Resolve the CURRENT iframe source per the resolution order in the
reference: live URL first, screenshot fallback, landmarks-text
fallback. Resolve the PROPOSED iframe source as a relative path to
`<slug>-proposed.html`.

### Phase 4 — Open and iterate

1. Open the viewer in the default browser
   (`open` macOS, `xdg-open` Linux, `start ""` Windows). Skip in
   pipeline-automation mode.
2. Mark the page `prototyped` in `state.json` (this transition does
   not require approval — the prototype exists, it just is not
   approved yet).
3. If `--no-iterate` was passed, stop here and report the prototype
   path.
4. Otherwise, invoke `$impeccable live` against
   `<slug>-proposed.html`. Configure live's `config.json` to point at
   the proposed file as a static HTML page (multi-page glob mode per
   impeccable live's setup).
5. Stream live events (generate / accept / discard / prefetch /
   timeout / exit) as documented in impeccable's `reference/live.md`.
   Stardust's role here is the **agent driving live's poll loop** —
   plan three distinct variants per `generate`, edit the proposed
   file accordingly, write the param values, etc. Live's reference is
   authoritative for the iteration mechanics.
6. On every `accept`, run live's carbonize cleanup (move CSS to the
   stylesheet inside the page, bake param values, remove markers).
   Append a new provenance entry with `iteratedVia: impeccable:live
   (sessionId: <id>)`.

#### Iteration paths

Refinement after the initial render can take three forms. They are
not mutually exclusive — a single page can move through all three
across its lifetime.

1. **Live picker (default).** The user clicks an element + an action
   inside `$impeccable live`'s browser picker. Live emits a
   `generate` event with `action ∈ {bolder, quieter, distill, polish,
   typeset, colorize, layout, adapt, animate, delight, overdrive,
   impeccable, <freeform>}`. The agent (driving the poll loop) plans
   three variants for that element and writes them into
   `<slug>-proposed.html`. Live owns the action vocabulary at this
   level; stardust does not re-implement it.

2. **Chat-driven (when not in live).** The user gives a refinement
   phrase in chat — *"make the hero bolder for home"*, *"tighten the
   cup-note grid"*, *"less corporate"*. The agent:
   - Reads the phrase against
     `skills/stardust/reference/intent-dimensions.md` to identify
     which axes it moves.
   - Consults
     `skills/stardust/reference/impeccable-command-map.md` to pick
     the matching impeccable command (often `bolder`, `quieter`,
     `distill`, `typeset`, `colorize`, or `layout`).
   - Shows the resolved plan to the user before executing.
   - Runs the chosen command against `<slug>-proposed.html` (or a
     specific section within it, when the phrase scopes one).
   - Re-validates per Phase 2 (`:root` block, data attributes,
     anti-toolbox audit clean, impeccable hard rules) and updates
     the proposed file's provenance.

3. **Direct impeccable invocation.** The user runs an impeccable
   command directly — `$impeccable bolder
   stardust/prototypes/home-proposed.html`. Stardust isn't in the
   loop; the viewer iframes whatever's on disk. This is fine and
   documented as a supported escape hatch.

The "open and reasoned" principle from the master skill applies to
path 2: the agent reasons publicly about the phrase before running
any command, and never silently maps a refinement to a fixed
command.

### Phase 5 — Approval

Approval is **explicit**. Stardust does not auto-approve.

The user signals approval by clicking the "Approve" button in the
viewer header (which posts a message the agent listens for) or by
saying "approve home" / "approve" in the conversation.

On approval:

1. Verify the proposed file's provenance block lists the *current
   active* `direction.md` (defensive check — if the direction changed
   during iteration, the user must re-prototype against the new
   direction first).
2. Mark the page `approved` in `state.json`. Append a
   `{ status: "approved", at: <ts> }` history entry.
3. Clear any `stale` flag on the page.
4. Print:
   ```
   home: approved
     proposed: stardust/prototypes/home-proposed.html
     viewer:   stardust/prototypes/home.html

   Next: $stardust migrate home  (write final redesigned static HTML)
   ```

If multiple pages are in flight, approval is per-page; the user can
approve some and continue iterating on others.

### Stale handling

When `direction.md` changes, the prototype's `againstDirection`
provenance becomes outdated and `state.json` flags the page
`stale: true`. Default behaviour:

- `$stardust prototype` (no slug) skips stale pages and reports the
  count: `2 stale pages (home, about) — re-run with --refresh-stale.`
- `$stardust prototype home` operates on `home` even if stale.
- `$stardust prototype --refresh-stale` re-prototypes every stale
  page.

When a stale page is successfully re-prototyped, clear its `stale`
flag and update `againstDirection` to the new active direction.

## Outputs

| Path                                          | Purpose                                       |
|-----------------------------------------------|-----------------------------------------------|
| `stardust/prototypes/<slug>.html`             | Before/after viewer (user-facing review surface). |
| `stardust/prototypes/<slug>-proposed.html`    | Proposed redesign (live-mode iteration target, migration source). |
| `stardust/prototypes/<slug>-proposed-stash-<ts>.html` | (Optional) Prior proposed version, when user clicks "Stash". |
| `stardust/state.json`                         | Updated with page status and approval history. |
| `DESIGN.json`                                 | Updated with `extensions.divergence.anti_toolbox_hits` and any audit amendments from this prototype's render. |

## Failure modes

- **No directed pages.** Recommend `$stardust direct` and stop.
- **Pending direction.** Refuse to run; the user must resolve the
  direction first.
- **Validation failure (:root block missing, data attributes missing,
  unjustified anti-toolbox hit, impeccable rule violation).** Do not
  write the file. Surface the specific failure and a suggested fix.
- **Live URL unreachable for the CURRENT iframe.** Fall back to
  screenshot, then to landmarks text. Note the fallback in the viewer
  header strip.
- **`$impeccable live` not available.** Fall back to `--no-iterate`
  behaviour and tell the user the iteration step requires impeccable
  live.

## Concurrency

Per `state-machine.md`: stardust does not lock. Two concurrent
`prototype` runs on different slugs are safe. Two on the same slug
are last-write-wins; warn the user if they explicitly try.

## References

- `reference/before-after-shell.md` — viewer + proposed file
  schemas and required structure.
- `skills/stardust/reference/token-contract.md` — `:root` token
  block (cross-cutting, used by prototype + migrate).
- `skills/stardust/reference/data-attributes.md` — structural data
  attribute vocabulary (cross-cutting, used by prototype + migrate).
- `skills/stardust/reference/divergence-toolkit.md` —
  anti-mediocrity rules consumed during render and live iteration.
- `skills/stardust/reference/intent-dimensions.md` — the 7-axis
  vocabulary used to read a chat-driven refinement phrase
  (iteration path 2).
- `skills/stardust/reference/impeccable-command-map.md` — when to
  reach for each impeccable command. Consulted during chat-driven
  iteration (path 2) to pick the command for a refinement phrase.
- `skills/stardust/reference/state-machine.md` — page lifecycle
  and stale rules.
- `skills/stardust/reference/artifact-map.md` — provenance shape.
- impeccable's `reference/craft.md` and `reference/live.md` — the
  underlying impeccable commands stardust delegates to.
