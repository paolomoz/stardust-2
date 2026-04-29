# Presales prompt template

**Status:** v2 · 2026-04-28 · evolves with the review queue

The prompt the user invokes when running stardust against a brand
in the 30-brand review baseline. Anchors on the presales context
explicitly so "better" doesn't get resolved as abstract aesthetic
improvement.

## Use

Substitute `<URL>` with the brand's home-page URL. Paste verbatim
as the first user message in a fresh Claude Code session in the
project directory.

## v2 — current

```
Redesign this home page for presales: <URL>

GOAL. This is a presales tool. The customer is a brand owner who
hasn't refreshed their site in 2–5 years and feels design fatigue.
We're showing them a brand-faithful refresh — clearly better than
what they have today, that they still recognise as themselves.
Not a rebrand. Not editorial reimagination. The success criterion
is that the customer's design team reacts "yes, that's us,
refreshed" and feels motivated to migrate to our platform.

WHAT "BETTER" MEANS HERE:
- Modernises tired patterns while preserving the brand's signature
  moves (the things the brand team would defend)
- Addresses actual weaknesses in the existing site (dated grids,
  cluttered IA, contrast failures, predictable conventions)
- Stays recognisably the brand: no invented colours, no fonts
  outside the captured surface, photography reused in the same
  semantic positions
- Brand-faithful inheritance is about IDENTITY, not current
  EXECUTION. If the captured site is template-like, the refreshed
  variant should still apply ALL listed improvements — honoring the
  brand means honoring its identity, not its current execution.

PROCESS. Extract → direct → identify-improvements → prototype × 3.
Brand-faithful Mode A: palette + typography pinned.

BEFORE RENDERING ANY VARIANT, write
`stardust/prototypes/<slug>-improvements.md` listing 3–5 specific
weaknesses observed in the captured site:

  - dated patterns the design world has moved past (specific:
    "centered hero with stock photo + double CTA in primary blue
    is the SaaS template circa 2019")
  - cluttered IA / unclear hierarchy / weak CTAs / redundant
    sections
  - contrast failures, accessibility gaps, density issues
  - cliché conventions the brand could move past while staying
    recognisably itself
  - missed opportunities the existing site doesn't capitalise on
    (e.g. "the captured photography is excellent but the layout
    crops it to thumbnail-size")

This list is the LOAD-BEARING ARTIFACT for variant A. Without
specifics, "make it better" has no claim. Save the file before
rendering — it gets read by all 3 variant briefs.

THREE VARIANTS, EACH SERVING A DIFFERENT QUESTION:

  A · Faithful + identified improvements
      "This is what your site should be tomorrow."
      Same IA, same composition, same primary section sequence.
      Apply the listed improvements EXACTLY — no extras, no
      embellishment, no creative reach. The brand team should react
      "yes, that's us, with the obvious fixes." This variant is the
      one a risk-averse stakeholder green-lights.

  B · New direction 1
      "What if we leaned into <X>?"
      Pick one specific direction the brand hasn't fully explored —
      a different IA priority, a different motif emphasis, a
      different voice register that's STILL within the captured
      brand surface. Justify the choice in one sentence in the
      shape brief: WHICH captured trait is being amplified.

  C · New direction 2
      "What if we leaned into <Y>?"
      Different from B. Must serve the brand differently. Possible
      directions: different photography treatment, different content
      hierarchy (e.g. story-led vs product-led), different motif
      vocabulary from the captured surface, different rhythm of
      pace.

      NOT "bolder fonts." NOT "more empty space." NOT "everything
      from B but more." These overshoot patterns produce the C-cliff
      failure mode where C reads as unprofessional, not as a
      defensible third proposition.

CONSTRAINTS THAT APPLY TO ALL THREE VARIANTS:

  - Brand-faithful Mode A: palette + typography pinned. No invented
    colours. No fonts outside the captured surface.

  - Captured images reused via their public URLs in the same
    semantic positions. Hero stays hero. Story image stays story
    image. Product image stays product image. This is part of
    brand-faithful inheritance, not just a content rule.

  - **Density: REFUSE editorial-airy by default.** For brand-register
    sites with > 5 sections, sectionPadding.desktop must be ≤ 64px
    and ≥ 40px on EVERY variant including C. Editorial-airy (96px+)
    is opt-in only via explicit user instruction or direction.md
    note. Tighter density (48–56px) is preferred when the existing
    site has multi-audience IA or commercial conversion priority.

  - **IA-priority preservation.** When the captured page has any of:
      • > 3 product cards above the fold
      • a configurator component
      • primary CTA verb is "buy" / "configure" / "shop" / "find your"
      • a search/filter row in the hero
    THEN the variants must NOT replace that with a generic
    full-width hero. The IA priority of the existing site is part
    of brand-faithful inheritance. A variant that hides the brand's
    own conversion path under brand-typography polish is a failure.

  - Variant differentiation: each variant's section sequence must
    differ from the others by ≥ 2 changes (order, presence,
    layout-strategy, IA priority). "Variants A and B are barely
    different" is a published failure mode and grounds for refusing
    render.

AVOID:
  - Hero text on photographic backgrounds without a contrast scrim
  - Variant C overshoot: 120pt+ fonts, 96px+ padding everywhere,
    "extreme airy" as a substitute for an actual direction
  - Generic "premium-feeling" copy — every variant must satisfy at
    least one specific tone trait from the captured PRODUCT.md
    Brand Personality
  - Editorial-register treatment for product-commerce brands (e.g.
    naming variants "atelier" / "mise-en-place" — the agent's reach
    for editorial vocabulary regardless of the brand's actual
    register)
  - Fabricated stats, addresses, customer logos, or quotes — use
    placeholders with the F-002 visual signature
  - "Anonymous" middle variant: B must declare its specific direction
    and what captured brand trait it amplifies. "B leans into IA
    rearrangement" is not enough — WHICH IA, in service of WHICH
    brand trait?

PROCEED. Run all phases without stopping for confirmation. Stop
and ask only if:
  (a) extraction fails (site unreachable, structure unparseable)
  (b) the captured brand surface has insufficient signal to
      differentiate three variants meaningfully — better one
      strong variant than three weak ones
  (c) a hard rule conflict makes the brand-faithful constraint
      impossible (e.g. captured palette has a single colour)
  (d) the improvements list comes back empty — if you can't name
      3 specific weaknesses in the captured site, variant A has
      no brief, and the whole presales claim ("better") fails.
      Stop and surface this honestly.
```

## v1 — superseded by v2 above

```
Redesign this home page for presales: <URL>

GOAL. This is a presales tool. The customer is a brand owner who
hasn't refreshed their site in 2–5 years and feels design fatigue.
We're showing them a brand-faithful refresh — clearly better than
what they have today, that they still recognise as themselves.
Not a rebrand. Not editorial reimagination. The success criterion
is that the customer's design team reacts "yes, that's us,
refreshed" and feels motivated to migrate to our platform.

WHAT "BETTER" MEANS HERE:
- Modernises tired patterns while preserving the brand's signature
  moves (the things the brand team would defend)
- Addresses actual weaknesses in the existing site (dated grids,
  cluttered IA, contrast failures, predictable conventions)
- Stays recognisably the brand: no invented colours, no fonts
  outside the captured surface, photography reused in the same
  semantic positions (hero stays hero)
- Density calibrated to the brand's actual register — not
  editorial-airy by default. Most production brand sites are
  considerably tighter than Pentagram-style cases.

PROCESS. Extract → direct → prototype × 3 variants. Brand-faithful
Mode A: palette and typography pinned to the captured surface.
Re-use captured images via their public URLs in the same semantic
positions.

THREE VARIANTS, EACH A DIFFERENT REFRESH STRATEGY (not three
reskins of the same layout):

  A · Conservative refresh
      Same IA, same section order. Modernised tokens — refined
      type scale, tighter spacing rhythm, sharper motif precision.
      The low-risk option a risk-averse stakeholder would pick.

  B · Compositional shift
      Same palette and typography. Different IA — rearranged
      section order, different content hierarchy, possibly a
      different homepage thesis (e.g. JTBD-led vs audience-led).
      The "we're rethinking how the page works" option.

  C · Bold direction
      Pushes one element (typography scale, photography treatment,
      motif language, copy register) further while staying
      recognisably the brand. The "are we ready to be more
      distinctive?" option that surfaces what stronger commitment
      would look like.

Each variant must declare a distinct compositional thesis in its
shape brief. Three variants whose section sequences are identical
or near-identical is a failure — render only when each variant
proposes a meaningfully different refresh strategy.

AVOID:
- Hero text on photographic backgrounds without contrast scrim
- 96px+ section padding on multi-section brand pages (the
  "AI-generated airy editorial" cliché — most brand sites need
  48–64px)
- Fabricated stats, addresses, customer logos, or quotes — use
  placeholders with the F-002 visual signature when content the
  design demands isn't in the captured page
- Generic "premium-feeling" copy — every variant must satisfy at
  least one specific tone trait from the captured PRODUCT.md
  Brand Personality
- Editorial-register treatment for product-commerce brands
  (e.g. naming variants "atelier" / "mise-en-place" — the agent's
  reach for editorial vocabulary regardless of the brand's
  actual register)

PROCEED. Run all phases without stopping for confirmation. Stop
and ask only if:
  (a) extraction fails (site unreachable, structure unparseable)
  (b) the captured brand surface has insufficient signal to
      differentiate three variants meaningfully — better one
      strong variant than three weak ones
  (c) a hard rule conflict makes the brand-faithful constraint
      impossible (e.g. captured palette has a single colour)
```

## Per-clause rationale (lesson traceability)

Each clause combats a specific failure mode. Sources: pass 1
(`notes/human-review-2026-04-28-pass1.md`) and pass 2
(`notes/human-review-2026-04-28-pass2.md`).

### v2-specific clauses (new in v2)

| clause | combats | source |
|---|---|---|
| **`<slug>-improvements.md` artifact required before render** | Aman/Patagonia "no migration story", Vanguard "too plain", One Medical "preserves template-bland" | pass 2 P-4 + P-6 |
| Variant A = Faithful + identified improvements (load-bearing) | makes "we made it better" provable to the brand team; gives variant A a concrete brief | pass 2 user insight (verbatim from Oatly + Aman + Patagonia commentary) |
| Variants B and C = New directions, each amplifying one captured brand trait | replaces v1's Conservative/Compositional/Bold which produced anonymous-B + overshooting-C | pass 2 P-1 (C cliff) + P-2 (B trap) |
| "B must declare which captured brand trait it amplifies" | combats the B-trap "anonymous middle" | pass 2 P-2 |
| "C: NOT bolder fonts, NOT more empty space, NOT B-but-more" | combats the C-cliff overshoot | pass 2 P-1 |
| **REFUSE editorial-airy by default for brand-register sites with > 5 sections** | upgrades v1's soft "calibrated to register" to a hard refusal | pass 2 P-3 (L-A still recurs after v1 + D-6) |
| **IA-priority preservation** for product/configurator/commerce IA | combats Polestar full-width-hero failure | pass 2 P-5 |
| "Brand-faithful inheritance is about IDENTITY, not current EXECUTION" | unblocks the "brand ≠ boring" trap; signals that improving on a template is part of fidelity | pass 2 P-4 |
| Variant differentiation: ≥ 2 changes between section sequences | makes "Patagonia A and B barely different" a refusable condition | pass 2 P-2 (Patagonia) + variant-convergence.md |
| Stop-and-ask condition (d): improvements list empty | the presales claim fails honestly rather than producing a featureless variant A | pass 2 — new |

### v1 clauses carried forward

| clause | combats | source |
|---|---|---|
| "presales tool / design fatigue / willingness to migrate" | "make it better" being too abstract | original reframe |
| "Stays recognisably the brand: no invented colours, no fonts outside the captured surface" | L-G (cream colour invented on BAC/A) | pass 1 |
| "photography reused in the same semantic positions" — now framed as part of brand-faithful inheritance | L-C (image scarcity / placement failure) | pass 1 |
| "Hero text on photographic backgrounds without contrast scrim" | L-F | pass 1 |
| "Fabricated stats, addresses, customer logos … placeholders with F-002 signature" | F-002 (content sourcing) | earlier sessions |
| "every variant must satisfy at least one specific tone trait from PRODUCT.md Brand Personality" | L-D / BAC L-012 ("need more character") | pass 1 |
| "Editorial-register treatment for product-commerce brands" | L-I (Vitamix wrong register) | pass 1 |
| "Stop and ask if … insufficient signal to differentiate three variants meaningfully" | counterbalances "proceed autonomously" | v1 |

## What's deliberately NOT in the prompt

- **Tone / industry hints.** The prompt is brand-agnostic by design. The agent extracts tone from the captured surface; injecting tone hints in the prompt would bias every brand toward the same tone.
- **Specific section structures.** "Hero, then audience grid, then …" would create the very convergence we're trying to combat. Variants must propose their own structures.
- **Numeric targets** (palette colours = N, sections = N, etc.). These would make the prompt brittle. The agent should infer from the captured site + the variant strategy.
- **Reviewer / approval flow.** Out of scope — the user will review the rendered output by eye. The prompt's job is to get good first-render output.
- **Critique / Phase 2.5 instructions.** Already in the skill (post-render gate). Re-stating in the prompt is redundant.

## When to revise

Trigger an update to this template (creating v2) when:

- 3+ reviews in the next batch (Phase 1 onward) surface a failure
  mode the prompt didn't combat. Add a clause.
- 3+ reviews surface false-positives where the prompt was *too*
  prescriptive (e.g. "Conservative refresh" forces the same shape
  on every brand). Loosen a clause.
- The lesson-corpus pipeline ships and the prompt's anti-list can
  be replaced with reference to the corpus (e.g. "obey lessons
  in `lesson-corpus.md` flagged severity P0/P1").
- The user runs a non-presales scenario (e.g. internal design
  exploration) — fork into a separate template.

## Version history

- **v2 · 2026-04-28** — supersedes v1 after pass-2 review surfaced
  mixed signal (2 retests improved, 1 regressed; 4 new-brand
  failures, 3 acceptable-but-flat).

  Three structural changes:

  (a) **Variant framework rebuilt**:
        A = Faithful + identified improvements (load-bearing)
        B = New direction 1 (amplifies a specific captured trait)
        C = New direction 2 (different from B, NOT "bolder")
      Replaces v1's Conservative/Compositional/Bold which produced
      the "C cliff" (overshoot) and "B trap" (anonymous middle).

  (b) **`<slug>-improvements.md` artifact** now required before
      rendering. 3–5 named weaknesses in the captured site.
      Forces an explicit basis for variant A; makes "we made it
      better" provable.

  (c) **Hard constraints** replace soft defaults:
      • REFUSE editorial-airy on brand-register pages with > 5
        sections (L-A persistence)
      • IA-priority preservation for product/configurator/commerce
        IA (Polestar failure)
      • Variant differentiation: ≥ 2 changes between section
        sequences (Patagonia A/B "barely different")
      • Brand-faithful inheritance is about identity, not current
        execution (One Medical / Vanguard "preserve mediocrity"
        trap)

  Carries forward v1's anti-list (hero contrast, fabricated content,
  generic premium copy, register mismatch).

  Source: `notes/human-review-2026-04-28-pass2.md` patterns P-1
  through P-6.

- **v1 · 2026-04-28** — initial. Combats the 5 cross-project
  patterns from `notes/human-review-2026-04-28-pass1.md` (L-A
  through L-E) plus 4 single-project findings (L-F, L-G, L-I,
  L-J). Presales framing made explicit. Conservative /
  Compositional / Bold variant strategy added.

  **Result (per pass 2 retests):** mixed signal. Festool and The
  Road Home improved; Virgin Atlantic regressed. New-brand runs
  surfaced 6 patterns the v1 framework didn't address (P-1 to
  P-6). Replaced by v2.

## Cross-references

- Review queue: `notes/review-queue-2026-04-28.md` (the 30
  brands)
- Pass 1 review: `notes/human-review-2026-04-28-pass1.md` (the
  source of every clause's rationale)
- Convergence finding: `notes/variant-convergence.md` (the
  load-bearing reason for the variant differentiation strategy)
- Deferred pipeline: `notes/lesson-corpus-self-reinforcement.md`
  (when this template's anti-list can be retired in favour of
  corpus reference)
