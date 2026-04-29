---
name: stardust:direct
description: Resolve the user's redesign intent into a target PRODUCT.md, DESIGN.md / DESIGN.json, and stardust/direction.md with full reasoning trace.
---

# stardust:direct

Resolve the user's freeform redesign intent into a complete **target
specification**: project-root `PRODUCT.md` and `DESIGN.md` (impeccable
format), a `DESIGN.json` sidecar with the divergence audit trail, and a
`stardust/direction.md` with the full reasoning trace.

`direct` produces the spec against which `prototype` and `migrate`
operate. It never writes prototypes or migrates pages — those are
downstream sub-commands.

## Inputs

- `<phrase>` — optional positional. The user's freeform intent
  ("make it better", "more Linear less Salesforce", "feel more premium
  on a small screen"). If omitted, ask the user for one.
- `--re-direct` — optional. Replace the current direction with a new
  one. Triggers stale-flagging on prototyped / approved / migrated
  pages per `skills/stardust/reference/state-machine.md`. Default
  behaviour without the flag is additive: if a direction already
  exists, the agent asks before replacing.
- `--prep` — optional. Run in **migrate-prep mode**: confirm the
  type catalog, finalize the module catalog, capture color
  reservations and brand-level metadata defaults, re-evaluate
  direction against the wider crawl. See § Prep mode below.
  Typically invoked via the `prepare-migration` orchestrator.

## Setup

1. Run the master skill's setup
   (`skills/stardust/SKILL.md` § Setup) — hard impeccable dep check,
   context loader, state read.
2. Verify `stardust/state.json` exists and contains at least one
   `extracted` page. If not, stop and recommend
   `$stardust extract <url>` first.
3. Read `stardust/current/_brand-extraction.json`. If absent, stop —
   extract did not complete brand-surface extraction; re-run extract.
4. Read `stardust/direction.md` if present. If a prior direction
   exists and `--re-direct` was not passed, ask whether the user wants
   to refine the existing direction or replace it.

## Procedure

### Phase 1 — Reasoning

Run the full intent-reasoning procedure from
`skills/stardust/reference/intent-reasoning.md`. Steps 1-6: restate
the phrase in dimensional vocabulary, identify movement, identify
gaps, ask **at most two** clarifying questions, map to an impeccable
command sequence, show the plan to the user.

Worked examples in
`skills/stardust/reference/intent-examples.md` calibrate the style.
Hard ceiling on questions: two per turn, no exceptions.

#### Density tuning (one-shot, only when unmoved)

When the user's phrase does **not** move the `density` axis (per
`reference/intent-dimensions.md` § 4), and the resolved register is
`brand`, ask one short follow-up — count it within the two-question
ceiling:

> Density tuning — (a) airy (NYT-Opinion-tier breathing, ~96px
> section padding), (b) balanced (calm but compact, ~64–72px),
> (c) packed (data-dense, ~40–48px). Default for brand-register
> sites with multi-audience IA is **(b) balanced**; pick (a) only
> when the page is editorial-led with deep per-section density.

If the user answers, stamp the chosen tier in `direction.md` §
Movements as `density: <tier>`. If unanswered, default to
**balanced** (not airy) for brand register and stamp
`density: balanced (default)`.

Skip this question entirely when:
- The user's phrase already moved `density` (any of "make it
  denser", "more breathing room", "compact", "tight", "spacious"
  count as movement).
- The register is `product` (default `packed` per § 4).
- The register is `ambiguous` and resolving it earlier in the
  reasoning is the higher-value question — defer density to the
  next turn rather than burning a question slot.

The tier propagates to `DESIGN.md`'s `spacing.sectionPadding`
deterministically per `intent-dimensions.md` § 4: airy = 96px,
balanced = 64px, packed = 48px. Phase 4 picks the value from this
stamp without re-asking.

Wait for the user's confirmation (`"go"`, or a correction to the
plan) before moving on.

### Phase 2 — Resolve the divergence inputs

Once the plan is confirmed, resolve the divergence-toolkit inputs
from `skills/stardust/reference/divergence-toolkit.md`. Before
rolling the seed, check for two **mode-shifting conditions** that
narrow what the toolkit needs to do:

#### Mode A — Brand-faithful mode

Triggered when the user pinned **both** type and palette (via
explicit phrase: "keep typography and palette", "preserve the
existing brand", "brand-faithful redesign"; or via constraints
listing both as anchors).

In this mode, direct does **not** roll the type or palette
dimensions of the seed — they are already locked. Going through
the motions of font-deck and palette picks would be ceremony,
producing `picked_by = "user-constraint"` records that don't
reflect any real choice.

The mode procedure:

1. Record `font_deck.name = "brand-inherited"` and
   `font_deck.picked_by = "user-constraint"`. Do not invoke
   `reference/palette-picker.md`.
2. Record `palette.source = "inherited from _brand-extraction.json"`
   and `palette.picked_by = "user-constraint"`. Apply role-renaming
   per toolkit § 4 if the inherited names violate the brand-native
   rule (this is still useful — role renaming is presentational,
   not a divergence choice).
3. **Still roll** the seed for the **non-locked** dimensions
   (decade, register, ground-family-as-applicable per Mode C
   below). These dimensions still drive divergence — the visual
   register and the era can shift even when type and palette are
   pinned.
4. Auto-emit the `brand_faithful_inversions[]` block in
   `extensions.divergence` per
   `reference/direction-format.md` § Brand-faithful inversions.
   The list is mostly mechanical (see § Brand-faithful inversions
   in direction-format.md for the canonical patterns).
5. Surface in the user report which dimensions had teeth and
   which were inert:

   ```
   Divergence (brand-faithful mode):
     decade           ✓ rolled    → 2025-now
     craft            ✓ rolled    → Riso print
     register         ✓ rolled    → Memoir-adjacent
     ground-family    inherited   → stark-white (brand-native)
     font deck        inherited   → existing site stack
     palette          inherited   → existing 5-color set
   ```

Mode A activates automatically when the resolved direction's
constraints list contains `brand-faithful` AND explicit type AND
palette anchors, OR when the user's phrase contains "keep
typography" / "preserve the palette" / equivalent. The agent
surfaces "switching to brand-faithful mode" in the plan it shows
the user before executing — the user can correct (e.g. "actually
let me move the palette") before it locks.

#### Mode B — Anchor-reference precedence

When the user provides anchor references (Q1/Q2 answers like
"Pentagram nonprofits, This American Life, NYT Opinion longform"),
those references **already imply** seed dimensions. Pentagram
implies decade `2025-now` editorial. This American Life implies
register `Memoir`-adjacent. Rolling those dimensions
deterministically and getting an accidental alignment is fragile —
the agent then has to retro-justify the alignment in
`direction.md`.

Precedence rule:

1. If anchor references are present, extract their implied
   dimensions:
   - **Decade** from era of the references (Pentagram → 2025-now;
     vintage Penguin → 1960s).
   - **Craft** from medium of the references (TAL → audio editorial
     ≠ a craft per se, but Bandcamp → web-print hybrid; Riso-print
     anthology → Riso).
   - **Register** from cultural reference set (Memoir, Tabloid,
     Catalogue, etc.).
   - **Ground-family** from typical ground of those references
     (NYT Opinion → cream/parchment; Pentagram nonprofit →
     stark-white or monochrome-tint).
2. Mark each implied dimension as
   `picked_by = "anchor-reference: <ref-name>"`.
3. Roll the seed only for **un-implied** dimensions.
4. Record the anchor → dimension mapping in
   `extensions.divergence.seed.anchors[]`.

Mode B can compose with Mode A: anchor-references narrow the seed,
brand-faithful constraints lock type/palette, the remaining roll
is whatever the anchors didn't already imply.

#### Mode C — Brand-faithful ground-family override

When Mode A is active **and** the seed's `ground_family` roll
disagrees with the brand's existing ground (e.g. seed rolled
`monochrome-tint` but the brand's captured background is
`#ffffff` stark-white), the brand's ground wins. The seed roll is
not discarded — it informs the **alt-section surface** instead
(per `divergence-toolkit.md` § 4 Color roles). Record the override
in `extensions.divergence.seed.ground_family.override` with one
of three reasons:

- `brand-faithful` — Mode A active and brand has a fixed ground.
- `print-paper` — manual override for print/paper categories
  (existing toolkit rule).
- `direction-driven` — seed wins (default; no override).

The three reasons are mutually exclusive; surface the chosen one
in the user report.

#### Default mode (no constraints)

When neither Mode A nor Mode B applies, follow the standard
procedure:

- **Seed.** Roll the 4-dimension seed (decade × craft × register ×
  ground-family) using the deterministic MD5 picker per § 2 of the
  toolkit. Record `picked_by`.
- **Font deck.** Pick from the 10 named decks per § 3. When the
  seed strongly implies a deck (e.g. `1977 + letterpress + tabloid`
  → `retro-italian`) use the implied deck; otherwise pick
  deterministically from the hash.
- **Palette.** If the resolved direction moves the color-energy
  axis or names the existing palette as part of the problem, run
  the palette picker
  (`skills/direct/reference/palette-picker.md`). Otherwise inherit
  the existing palette from
  `stardust/current/_brand-extraction.json`, applying role-renaming
  per toolkit § 4 if the inherited names violate the brand-native
  rule.

#### Always run

- **Anti-toolbox audit.** Regardless of mode, run the self-audit
  (toolkit § 1 Enforcement + Self-audit) on the resolved direction.
  Each anti-toolbox hit needs a brand-specific justification or it
  is removed.

Record every resolution in `DESIGN.json.extensions.divergence` per
the v2 storage shape at the bottom of `divergence-toolkit.md`.

### Phase 3 — Author target PRODUCT.md

Write `PRODUCT.md` at the project root using impeccable's
`reference/teach.md` as the **format spec** (not as a runtime command
to invoke). Direct authoring is intentional: by the time `direct`
runs, every answer impeccable's interview would surface has already
been resolved through stardust's intent-reasoning + divergence
resolution above.

Sections to populate:

- **Register** — from the resolved direction's `register` axis.
- **Users** — from the resolved audience tuple plus tone signals from
  the extracted brand surface.
- **Product Purpose** — from the user's phrase + extracted hero copy
  + resolved tone, written as a one-line value statement followed by
  one-line scope.
- **Brand Personality** — derived from resolved expressive axis +
  tone + reference set. Weight axes the user explicitly moved over
  inherited values.
- **Anti-references** — the user's stated anti-refs **plus** any
  anti-toolbox guardrails relevant to the resolved direction
  (e.g. "modernise" triggers the Generic-2026-SaaS silhouette
  guardrail; list it explicitly so prototype and polish enforce it).
- **Design Principles** — 3-5, each mapping to a specific axis
  movement. Format: one verb-led principle, one-line elaboration.
- **Accessibility & Inclusion** — populated when the constraint set
  includes `a11y-first`, `RTL-required`, or similar. Otherwise
  inherit impeccable's defaults.

Where a section cannot be populated with confidence from inputs,
mark it `<!-- _provenance: inferred -->` with a one-line basis
sentence. Never invent strategy.

### Phase 4 — Author target DESIGN.md and DESIGN.json (site-level only)

Write `DESIGN.md` at the project root using impeccable's
`reference/document.md` as the format spec — Stitch YAML frontmatter
plus the 6 canonical sections in fixed order.

**Site-level only.** Per `STARDUST-FEEDBACK.md F-015`, `direct`
authors the design **system**, not page-level deployments. Page-
specific composition decisions live in
`stardust/prototypes/<slug>-shape.md` written by `prototype`
Phase 1 — see `skills/prototype/reference/page-shape-brief.md`.

The boundary is **abstract role vs literal deployment**:

| In DESIGN.md / DESIGN.json (site system) | In `<slug>-shape.md` (page deployment) |
|---|---|
| Token vocabulary (colors, typography, spacing, radii) | Per-page section list and order |
| Voice rules ("Mixed-Case-Headlines"), anti-refs | Literal copy per section (sourced from current/pages/<slug>.json) |
| Anti-toolbox audit, divergence trace | Page-specific layout decisions ("hero is 5/3 split on home") |
| Abstract component vocabulary: `button-primary`, `button-secondary`, `card`, `input`, `badge`, `link` (default treatment, density, sizing — NO page-specific dimensions or content) | Section-level component dimensions (`the211Panel` at 320×260 with dock points per viewport) |
| Named system-component **roles** (a `header` exists, a `footer` exists, a `cta-band` pattern exists) | System-component **deployment** (literal tile labels in fixed order, link targets, copy variants) |
| Default visual treatment for each abstract component | Per-page composition (statRow with literal "100 YEARS · 18,400 PEOPLE HOUSED · …") |
| Voice samples (do/don't, tone exemplars) | Per-page interaction model and key states |

Concrete examples of items that **must not** appear in DESIGN.md /
DESIGN.json:

- Literal tile labels for any system-component pattern.
- Section-level pixel dimensions, dock points, breakpoint-specific
  widths.
- Stat numbers, addresses, quotes, named-person references.
- "On home, the hero is X" — that's a home-page deployment.
- Per-page copy variants ("on the donate page the CTA reads Y").

If a redesign demands a section-level dimension or a literal label
that feels site-wide ("every page has a 211 panel docked at the
bottom-right"), encode it as an **abstract role** in DESIGN.json
(e.g. `extensions.systemComponentRoles.persistent-help` with
purpose / position-class but no literal copy or dimensions) and let
each page's shape brief specify the deployment.

Token sources:

- **`colors`** — from the picked palette (palette-picker.md output)
  or the inherited palette with role-renaming. Role names must
  satisfy toolkit § 4 (brand-native, no `Primary` / `Secondary` /
  `Alarm` etc. as sole role names).
- **`typography`** — from the chosen font deck. Sizes scaled by the
  resolved expressive axis (drenched → ratio ≥ 1.333; committed →
  ratio 1.25; restrained → ratio 1.125-1.2). Heading vs body
  assignments inherit from the deck.
- **`rounded`** — derived from extracted brand-surface
  `borderRadius.primary` mode, unless the direction moves
  distinctiveness toward `singular` (in which case re-derive from the
  font deck's tonal cousins).
- **`spacing`** — 4pt base scale; `sectionPadding` propagated from
  the density tier stamped in Phase 1 (`reference/intent-dimensions.md`
  § 4):
  - `airy` → `sectionPadding.desktop: 96px`, `tablet: 72px`, `mobile: 48px`
  - `balanced` → `sectionPadding.desktop: 64px`, `tablet: 48px`, `mobile: 32px`  ← brand-register default
  - `packed` → `sectionPadding.desktop: 48px`, `tablet: 36px`, `mobile: 24px`  ← product-register default

  The agent does **not** re-ask the density question here — the tier
  was resolved in Phase 1 (asked once when the phrase didn't move
  the axis, defaulted to balanced for brand register if unanswered).
  Pick the value deterministically from the stamp.
- **`components`** — 4-6 canonical components (`button-primary`,
  `button-secondary`, `card`, `input`, `badge`, `link`) populated
  from extracted brand-surface `componentStyle`, with values
  adjusted for direction movements.

Write `DESIGN.json` (schemaVersion 2) with:

- `extensions.colorMeta`, `typographyMeta`, `shadows`, `motion`,
  `breakpoints` — filled from the same sources as DESIGN.md.
- `extensions.divergence` — full audit trail per the v2 storage shape
  in `divergence-toolkit.md`. Includes the brand-faithful inversion
  log (per `reference/direction-format.md` § Divergence inputs)
  capturing pure-color or hex-format retentions.
- `extensions.componentStyle` — the **abstract** v1 fields
  (`buttons`, `cards`, `inputs`, `dualCTAPattern`). **Default**
  treatment per component, no per-page dimensions or literal copy.
- `extensions.systemComponentRoles` — the **abstract roles** for
  named cross-page patterns (e.g. `persistent-help`, `cta-band`,
  `header`, `footer`). Each role carries purpose, position class,
  and any site-wide constraint — **not** literal copy, dimensions,
  or per-viewport dock points (those are page-deployment, in
  `<slug>-shape.md`).
- `extensions.voice` — sampled DOs and DON'Ts derived from
  `_brand-extraction.json` voice samples + the resolved tone.
- `narrative.northStar`, `overview`, `keyCharacteristics`, `rules`,
  `dos`, `donts` — derived from the resolved direction. Toolkit § 7
  Optional House Standards land here in `narrative.rules[]`.

Every component HTML/CSS snippet in `components[]` must be
self-contained, use `ds-` class prefixes, and respect impeccable's
hard rules (OKLCH only, no pure black/white, no glassmorphism, no
side stripes, no gradient text, ≥ 1.25 type ratio for brand
register).

### Phase 5 — Write direction.md and update state

Write `stardust/direction.md` per
`skills/direct/reference/direction-format.md`. The full reasoning
trace: phrase, restatement, movements, gaps, questions and answers,
resolved axes, divergence inputs, command sequence proposed, user
confirmation, every assumption that defaulted in. Re-directs append
to the file as a new section; prior direction stays as history.

Update `stardust/state.json`:

- `direction.resolvedAt` = now
- `direction.phrase` = the user's verbatim phrase
- `direction.directionFile` = `"stardust/direction.md"`
- For each page in scope: `status` `extracted` → `directed`
- On `--re-direct`, for each page already in `prototyped` /
  `approved` / `migrated`: set `stale: true` and
  `staleReason: "direction changed at <ts>"`. Do not change the
  status itself; the on-disk artifact is still valid, just out of
  step.

Print a one-screen summary report and recommend the next step:

```
direction resolved
==================

Phrase:    "make it more expressive for a young audience"
Audience:  Gen Z college / first-job (resolved via Q1)
Register:  brand (inherited from current/PRODUCT.md)

Movements:
  expressive axis    restrained -> committed
  distinctiveness    familiar  -> distinctive
  tone               serious   -> playful
  density            (unchanged)
  audience           (resolved: Gen Z college / first-job)

Divergence:
  seed         1970s x Riso print x zine x monochrome-tint
  font deck    zine-maximalist
  palette      "Brutalist Dawn" (picked from library)

Wrote:
  PRODUCT.md, DESIGN.md, DESIGN.json
  stardust/direction.md

State:
  25 pages: extracted -> directed
  0 stale prototypes (none exist yet)

Next: $stardust prototype  (defaults to home page)
```

## Outputs

| Path                        | Purpose                                            |
|-----------------------------|----------------------------------------------------|
| `PRODUCT.md`                | Target strategy (impeccable format).               |
| `DESIGN.md`                 | Target visual system (Stitch frontmatter + 6 sections). |
| `DESIGN.json`               | Sidecar with extensions (divergence, componentStyle, voice) and narrative. |
| `stardust/direction.md`     | Resolved direction + full reasoning trace.         |
| `stardust/state.json`       | Updated with direction + per-page status changes.  |

## Failure modes

- **No extracted state.** Abort and recommend `$stardust extract`.
- **Phrase too vague even after two questions.** Persist the partial
  reasoning to `stardust/direction.md` under a `# Pending` section,
  ask the user to refine further, do **not** write `PRODUCT.md` /
  `DESIGN.md` / `DESIGN.json` from incomplete reasoning.
- **Re-direct with prior approved or migrated pages.** Always confirm
  before stale-flagging. The flag is visible to the user and
  reversible (clearing happens automatically on successful re-run of
  prototype or migrate), but a re-direct invalidates work the user
  may have signed off on.
- **Anti-toolbox audit removes too many moves.** If the resolved
  direction collapses to defaults after the audit strips
  unjustifiable hits, surface this to the user and re-prompt for
  reference anchors before writing tokens.

## Prep mode (--prep)

When invoked with `--prep`, direct runs an extended pass that
finalizes the inventory data structures migrate consumes.
Discovery-mode runs are unchanged: intent reasoning, divergence-
toolkit resolution, target-spec authoring.

`--prep` adds five things on top of the standard procedure:

### 1. Type catalog confirmation

Surface the page-type catalog inferred by `extract --prep` (in
`state.json.pages[].type`). Show counts per type and a sample of
slugs per type:

```
Page types from extract:
  landing  1   (home)
  article  84  (news/post-2026-04-15-housing-summit, news/post-2026-04-08-..., ...)
  listing  6   (news, programs, events, ...)
  program  12  (programs/shelter, programs/case-management, ...)
  form     3   (donate, contact, volunteer)
  static   18  (about, team, financials, ...)
  unique   3   (404, search, faq)

Confirm catalog (yes / refine "<phrase>")?
```

User can confirm or refine. Refinements: rename a type, split a
type into finer-grained ones (e.g., `article-feature` vs.
`article-press`), merge two types, mark specific pages as
`unique`. Updates land in `state.json.pages[].type`.

### 2. Module catalog finalization

Surface the module candidates proposed by `extract --prep`
(`DESIGN.json.extensions.modules[]` with `status: candidate`).
For each candidate:

```
hotline-211 (5 instances)
  Slot candidates: phone, hours, headline, cta-label
  Found in: home, get-help, donate, news, programs

  Confirm? (name "<id>" / promote / prune / refine slots)
```

User actions per candidate:

- **Confirm.** Promote `status: candidate → confirmed`. Module
  ID, slots, defaults are accepted as-is.
- **Rename.** Change the auto-generated ID to a brand-native name.
- **Prune.** Remove from the catalog (the candidate was a
  spurious match; instances will render as inline content).
- **Refine slots.** Mark slots required, set defaults, add or
  remove slots, adjust types.

Confirmed modules become the catalog migrate consumes.

### 3. Color reservations

If the resolved direction reserves any color to a specific
module/lockup (e.g., centennial-red `#DC323D` reserved to the
`trh-100-lockup` module), capture in
`DESIGN.json.extensions.colorReservations[]`:

```json
[
  { "color": "#DC323D", "reservedFor": ["module:trh-100-lockup"] }
]
```

Migrate validates that reserved colors appear only in their
declared contexts; violations refuse the page.

### 4. Wider direction re-evaluation

Discovery mode resolved direction against a 5-page sample. Prep
mode has the full inventory. Re-read the broader content surface
and check:

- Does the resolved register still hold? (e.g., did discovery
  miss a service-led section that pulls toward a different
  register?)
- Are there new tensions surfaced by the wider crawl that affect
  direction?
- Do any anti-references need updating?

If the re-evaluation surfaces a meaningful divergence from the
discovery-mode direction, surface to the user. If the user wants
to re-direct, they run `$stardust direct --re-direct` separately;
the prep run itself is non-destructive.

### 5. Site-level metadata defaults

Capture brand-level metadata defaults in
`DESIGN.json.extensions.metadata`:

- `siteName` — brand name (typically from `<title>` patterns or
  `og:site_name`)
- `defaultOgImage` — default OG image when a page doesn't have
  its own
- `themeColor` — typically already in DESIGN.md
- `organization` — `Organization` JSON-LD entry (name, url,
  logo, sameAs)
- `locale` — default locale

These are composed with per-page metadata at migrate time. See
`skills/migrate/reference/metadata-and-jsonld.md` for the
composition rules.

### Prep summary

```
direct --prep complete
======================

Type catalog:        confirmed (7 types, 127 pages)
Module catalog:      confirmed (8 modules, slot vocabularies set)
Color reservations:  1 (#DC323D reserved to trh-100-lockup)
Brand metadata:      set (siteName, defaultOgImage, themeColor, organization, locale)
Direction:           no change (wider crawl confirmed)

Next: $stardust prototype --prep  (fill template gaps, write canon)
```

Default mode is unchanged.

## References

- `skills/stardust/reference/intent-dimensions.md` — the 7 axes.
- `skills/stardust/reference/intent-reasoning.md` — the procedure.
- `skills/stardust/reference/intent-examples.md` — worked examples.
- `skills/stardust/reference/impeccable-command-map.md` — when to
  reach for each impeccable command (used when building the plan).
- `skills/stardust/reference/divergence-toolkit.md` — anti-mediocrity
  inputs and the v2 storage shape for the audit trail.
- `skills/stardust/reference/artifact-map.md` — provenance shape.
- `reference/direction-format.md` — schema for `stardust/direction.md`.
- `reference/palette-picker.md` — palette resolution procedure.
