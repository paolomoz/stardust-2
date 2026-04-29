# Brand-faithful default — implementation plan

**Date:** 2026-04-29
**Status:** in flight
**Origin:** dogfood session against `theroadhome.org` produced 3 wildly
divergent rebrand-shaped variants when the user prompt was a typical
migration / refresh ask. Variants A/B/C each invented a fresh seed
(Pentagram + NYT Opinion / Charity:Water + Patagonia / Liquid Death +
Mschf) — none recognisable as The Road Home. The user pointed at a
prior prompt that produced correct brand-faithful output (`brand.html`
from the public site) and asked: what should land in the spec so the
default does the right thing without the user having to write that prompt?

## Diagnosis

Five load-bearing pieces of the user's working prompt, each mapping to a
default the current `stardust:direct` skill gets wrong for the
migration / refresh use case:

| Load-bearing piece | Today | Why it failed |
|---|---|---|
| Mode A activation | Explicit signals only ("keep typography", `brand-faithful` constraint) | "Make it more modern" doesn't trip those signals → rolls full divergence seed |
| Improvements artifact (`<slug>-improvements.md`) | Doesn't exist | Variant A has no specific brief; "modernize" with no observed weaknesses lets each variant invent its own claim |
| Variant role contract | Multi-variant not specified; agent improvises | Each variant becomes a fresh-seed rebrand exploration, not a refresh-of-this-brand |
| Density floor + IA-priority | Soft default; no hard floor; no IA-priority preservation rule | Variant C drifted to 120px section padding and replaced the dense recipient-audience IA with billboard-scale type |
| C-cliff anti-pattern | Not in anti-toolbox | Variant C reads as "B but more brutalist" — published failure mode |

## Default flip rationale

The current default is *creative redesign*; rebrand-shaped output for
ambiguous phrases. The proposal is to flip:

- **Default = brand-faithful (Mode A)** when extract has data.
- **Rebrand = explicit opt-in** via phrase signals or an explicit flag.

Asymmetric on purpose: the safer outcome catches the common case
(the typical stardust use case is a presales refresh of an existing
site), and the riskier outcome (rebrand) requires the user to name it
out loud.

## Changes by file

### 1. `skills/direct/SKILL.md`

#### a. Inputs

Add `--rebrand` flag — explicit opt-out from Mode A regardless of
captured signal. Symmetric with `--re-direct`. Phrase-trigger detection
remains primary; flag is for ambiguous phrases.

#### b. Setup

Add brand-signal check after step 3 (read `_brand-extraction.json`):
classify the captured surface as `signal-strong` / `signal-thin` /
`signal-absent`. Drives Mode-detection precedence in Phase 2.

#### c. Phase 2 — Mode-detection precedence (new sub-section, before Mode A)

3-tier precedence. Most important addition:

> 1. **Site migration / refresh (default).** If
>    `stardust/current/_brand-extraction.json` is `signal-strong`
>    (palette ≥ 3 colors AND ≥ 1 captured type family), the
>    default mode is **Mode A — Brand-faithful**. The user's
>    phrase ("make it modern", "stunning", "design fatigue cure")
>    does not override this. Brand-faithful inheritance is about
>    *identity*, not *current execution*.
> 2. **Rebrand (explicit opt-in).** Mode A turns off when the
>    user's phrase contains a rebrand signal (`rebrand`, `new
>    brand`, `clean slate`, `start over`, `from scratch`,
>    `replace the brand`, `not brand-faithful`, `editorial
>    reimagination`) OR `--rebrand` is passed.
> 3. **Brand-faithful + targeted exploration.** When the user
>    requests N variants, only variant A is locked to strict Mode A.
>    Variants B+ may amplify one captured trait but cannot introduce
>    a new font, a new color outside the captured surface, or a
>    different register from PRODUCT.md.

#### d. Phase 2 — Mode A definition (extension)

Add image-reuse contract to the existing Mode A procedure:

> Captured images are reused via their public URLs (or local
> copies in `stardust/current/assets/media/`) **at the same
> semantic position** as on the source site. Hero stays hero.
> Story image stays story image. Product card image stays
> product card image. The only legitimate deviations are:
> (1) the captured image is broken; (2) the brand-review
> flagged it as a stock-photography tension; (3) the
> improvements list explicitly notes a crop / positioning fix.

#### e. Phase 2.5 — Improvements list (new phase)

Mandatory artifact `stardust/prototypes/<slug>-improvements.md`
written before any variant. 3–5 specific weaknesses; categories
listed (dated patterns, cluttered IA, contrast/a11y, cliché
conventions, missed opportunities). Items must be specific — "the
hero needs work" is not an item; "Hero photo cropped to 280×180
in a 1440-wide viewport when source supports 16:9 full-bleed" is.

Empty list = stopping condition (d).

#### f. Phase 2.5 — Multi-variant fork (new sub-section)

Variant role contract:

| Slot | Role | Brief |
|---|---|---|
| A | Faithful + improvements — "tomorrow's version" | Same IA, same sequence, same composition; apply every item from improvements list exactly. Risk-averse green-light. |
| B | One captured trait amplified | Pick a captured trait; justify in shape brief (which trait, in service of which personality move). |
| C+ | Different captured trait amplified | Different from B. Forbidden definitions: "B but more", "bolder fonts", "more empty space". |

**Variant differentiation contract** — each pair must differ by ≥2
changes (sequence, presence, layout, IA priority). "Barely different"
= refusal condition.

**C-cliff failure mode** — naming as a render-refusal.

#### g. Failure modes — extend with three new conditions

- **(b) Insufficient brand signal for N variants** — fewer than 3
  distinct moves to amplify → refuse N≥3, propose 1 or 2.
- **(c) Hard rule conflict** — Mode A pin + phrase requiring
  violation → name the conflict, ask which the user meant.
- **(d) Empty improvements list** — variant A has no brief →
  stop, surface that the captured site is at a high execution
  level on observable dimensions and propose reduced scope.

### 2. `skills/stardust/reference/intent-dimensions.md`

#### a. § 4 Density — hardening

Add a hard floor for brand-register multi-audience sites:

> When the extracted page inventory shows >5 sections OR >2
> audience tracks, per-variant `sectionPadding.desktop` is bounded
> at ≤64px and ≥40px. Editorial-airy (96px+) is opt-in only.

#### b. New § 8 IA-priority preservation (Mode A constraint)

When the captured page shows commercial-conversion or
crisis-affordance signals (>3 product cards above fold, configurator,
commerce-verb primary CTA, search/filter row, crisis affordance in
first viewport), variants must NOT replace that IA priority with a
generic full-width hero. Failure to preserve = refusal condition.

### 3. `skills/stardust/reference/divergence-toolkit.md`

Add new entries to the anti-toolbox list (§ 1):

- **Structural moves**: `Hero text on photographic background without contrast scrim`
- **Multi-variant moves** (new subsection):
  - `C-cliff overshoot` — variant defined as "previous-but-more"
  - `Anonymous middle variant` — B without declared captured-trait amplification
- **Voice-rule moves**: `Editorial-register vocabulary applied to non-editorial brands`
- **Universal hardening**: `Fabricated content` — stats / addresses / customer logos / quotes invented to fill design space; placeholders mandatory

## Acceptance

A user running `extract → direct "make this site more modern, 3 variants"`
on `theroadhome.org` should now:

1. Get an `<slug>-improvements.md` artifact written before any variant.
2. See the plan declare **Mode A active** (palette + type pinned to
   captured) — not a divergence seed roll.
3. See variant A described as "today's site, tomorrow" with
   explicit per-improvement citations.
4. See variants B and C each declare which captured trait they
   amplify (and which captured trait — not which external reference).
5. See `sectionPadding.desktop` bounded at ≤64px on every variant.
6. See the crisis-line affordance preserved in the first viewport
   on all three variants (IA-priority preservation triggered by the
   recipient-audience signal in the captured surface).
7. Be told to opt in via the rebrand keywords or `--rebrand` if
   they wanted the previous (creative-redesign) behavior.

A user who *does* say `rebrand` / `new brand` / `clean slate` gets
the current creative-redesign behavior unchanged.

## Implementation order

1. Plan note (this file). [in flight]
2. `direct/SKILL.md` — default flip + Mode-detection precedence + image-reuse.
3. `direct/SKILL.md` — Phase 2.5 improvements list + Multi-variant fork.
4. `direct/SKILL.md` — failure modes (b)(c)(d).
5. `intent-dimensions.md` — § 4 hardening + new § 8.
6. `divergence-toolkit.md` — anti-toolbox additions.
7. Verify cross-references and re-read each edited section.

## Out of scope for this pass

- Updating prototype/SKILL.md to consume the improvements list and
  cite items per variant. Will follow once the direct-side spec is
  stable.
- Updating `direction-format.md` to add a `mode` field and a
  `variantRoles[]` block. Schema migration will follow.
- Writing the F-002 placeholder visual signature standard the user
  referenced. (Not present in repo; opening as a separate note.)
- Updating `intent-examples.md` with a worked brand-faithful refresh
  example. The new defaults make most existing examples (which assume
  divergence-seed roll) misleading; rewriting the corpus is its own
  project.
