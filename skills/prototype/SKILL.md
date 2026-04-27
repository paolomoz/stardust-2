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

## Delegation mechanic

`prototype` does **not** author `<slug>-proposed.html` directly. The
heavy creative lift is delegated to `$impeccable craft`, the
in-browser iteration to `$impeccable live`, and (when needed) the
structural plan to `$impeccable shape`. Spelling out the mechanic
matters because the carve-out documented in
`skills/stardust/reference/artifact-map.md` (where stardust authors
`PRODUCT.md`, `DESIGN.md`, `DESIGN.json`, `current/PRODUCT.md`,
`current/DESIGN.md` directly, treating impeccable's references as
*format specs*, not runtime commands) is **load-bearing for those
five files only**. It does NOT extend to:

- `stardust/prototypes/<slug>-proposed.html` — must be authored by
  `$impeccable craft`, not by stardust direct authoring.
- Iteration on the proposed file — must be driven through
  `$impeccable live` (or a chat-driven invocation of an explicit
  impeccable command per the iteration paths section).
- Structural planning when a page is complex enough to need it —
  `$impeccable shape`.

The proximate cause of content fabrication
(`STARDUST-FEEDBACK.md F-002`) was the agent over-generalizing the
direct-authoring carve-out to the proposed HTML. Don't.

### Invoking impeccable

When stardust runs in a Claude Code skill context (impeccable
exposed as the `impeccable:impeccable` Skill, not as a CLI), invoke
impeccable via the Skill tool with the sub-command and its args
mirroring the slash-command form:

```
Skill {
  skill: "impeccable:impeccable",
  args: "craft <feature-description>"
}
```

Sub-commands referenced from this skill are all routed through the
same Skill: `craft`, `shape`, `live`, plus the iteration commands
(`bolder`, `quieter`, `distill`, `polish`, `colorize`, `typeset`,
`layout`, `adapt`, `animate`, `delight`, `overdrive`, `impeccable`).

When impeccable is **not** available (CLI-only environments,
plugin uninstalled, sandbox without skill access):

1. Stop and tell the user impeccable is required for prototype
   rendering. Recommend installing the impeccable plugin.
2. Do NOT fall back to direct authoring of `<slug>-proposed.html`.
   The validation contract craft enforces (anti-toolbox audit,
   divergence rules, type ratios, content sourcing hierarchy) is
   not reproducible by direct authoring; falling back silently
   ships unverified output.
3. The only allowed exception is `--no-impeccable` passed
   explicitly. In that mode, stardust authors a placeholder
   proposed file with `renderedVia: stardust-direct (impeccable
   unavailable, --no-impeccable)` in provenance and **every
   non-trivial section** wrapped in the placeholder visual signature
   per `reference/before-after-shell.md` § Content sourcing
   hierarchy. The output is a sketch, not a deliverable; migrate
   refuses to ship it without `--allow-placeholder`.

Stardust's job inside Phase 2 is therefore:

- Compose the inputs craft needs (page content from
  `current/pages/<slug>.json`, target spec from `DESIGN.md` /
  `DESIGN.json`, hard constraints from `direction.md`, content
  sourcing rules from `reference/before-after-shell.md` § Content
  sourcing hierarchy).
- Invoke craft via the Skill tool.
- Validate the result against the contract (`:root` block, data
  attributes, divergence audit, impeccable hard rules, content
  sourcing). If validation fails, refuse to write — never paper over
  craft output the agent thinks is "close enough."

The proposed file is whatever craft writes plus the validation
report; it is not stardust's authored artifact.

## Procedure

### Phase 1 — Plan the prototype (page-shape brief)

For each page in scope:

1. Read `stardust/current/pages/<slug>.json` for the page's structure
   and content.
2. Read `stardust/current/_brand-extraction.json` for system
   components and cross-promo data (the page's site-wide repeated
   surfaces).
3. Read `stardust/direction.md` Active section for the resolved
   direction, divergence inputs, and command sequence.
4. Read project-root `DESIGN.md` + `DESIGN.json` for the target
   site system — tokens, abstract component vocabulary, named
   system-component roles. The site system tells the agent *what
   the design language is*; this Phase decides *how it deploys to
   this specific page*.
5. **Author `stardust/prototypes/<slug>-shape.md`** — the per-page
   compositional brief. Format spec:
   `reference/page-shape-brief.md`. The brief carries the section
   list, layout strategy, key states, interaction model, structural
   data attributes, and the unsourced-content list (bridge to the
   F-002 placeholder contract). Author directly — no interview, no
   impeccable invocation; this is stardust's reasoning about how
   the system deploys to this page given this content.
6. Show the brief to the user and wait for confirmation before
   moving to Phase 2. The user can edit the brief in place
   (rearrange sections, kill open questions, change composition
   decisions); re-rendering Phase 2 will rebuild the proposed file
   from the edited brief.

`$impeccable shape` is **not** invoked in v0.2 (see
`reference/page-shape-brief.md` § Authoring procedure for the
rationale; revisit if per-page hand-authoring proves insufficient
across sites — `STARDUST-FEEDBACK.md F-016`).

The brief decouples site-level concerns (in DESIGN.md) from
page-level deployment (per-page brief). A direction change
invalidates the system; existing briefs are content-aware-stale
only when the system change makes their composition impossible.
This recalibration of stale-flagging is documented in
`skills/stardust/reference/state-machine.md` § Stale flagging.

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
- **Content sourcing hierarchy** (`reference/before-after-shell.md`
  § Content sourcing hierarchy): every literal value rendered must
  come from `current/pages/<slug>.json`, then voice samples, then
  direction-authorised changes — or be rendered with the mandatory
  PLACEHOLDER visual signature. Stats, addresses, quotes, tax IDs,
  hours, prices, named-person words must never be invented. The
  proposed file's `_provenance.unsourcedContent[]` lists every
  placeholder so migrate can refuse to ship unverified content.

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
- **Content sourcing scan** — every literal value in the rendered
  output traces to one of the allowed sources
  (`reference/before-after-shell.md` § Content sourcing hierarchy).
  Any value that doesn't is either wrapped in a `[data-placeholder]`
  element with the mandatory visual signature, or the validation
  fails. Build the `_provenance.unsourcedContent[]` list during
  this scan.

If validation fails, do not write the file. Surface the failure to
the user with the specific rule violated and a suggested fix.

### Phase 3 — Compose the viewer

Render `stardust/prototypes/<slug>.html` per
`reference/before-after-shell.md` § `<slug>.html`. Two-iframe layout,
header strip with action buttons, footer strip with direction title.

Resolve the CURRENT pane source per the resolution order in the
reference: screenshot first (default — always works), live URL via
"Try live" toggle (opt-in), landmarks-text fallback only when the
screenshot is missing. Resolve the PROPOSED iframe source as a
relative path to `<slug>-proposed.html`.

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
| `stardust/prototypes/<slug>-shape.md`         | Per-page compositional brief (Phase 1 output, craft input). |
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
- **CURRENT pane has no screenshot.** Fall through to live URL (if
  the screenshot file is missing post-extract), then to landmarks
  text. Note the fallback in the viewer header strip. The default
  pane source is the screenshot per `reference/before-after-shell.md`
  § Iframes; the live URL is opt-in via the "Try live" toggle for
  CSP reasons (`STARDUST-FEEDBACK.md F-001`).
- **`$impeccable live` not available.** Fall back to `--no-iterate`
  behaviour and tell the user the iteration step requires impeccable
  live.

## Concurrency

Per `state-machine.md`: stardust does not lock. Two concurrent
`prototype` runs on different slugs are safe. Two on the same slug
are last-write-wins; warn the user if they explicitly try.

## References

- `reference/page-shape-brief.md` — per-page compositional brief
  format (Phase 1 output, craft input). Page-level deployment
  decisions live here; site-level system decisions live in
  DESIGN.md.
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
