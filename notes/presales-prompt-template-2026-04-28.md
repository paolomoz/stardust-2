# Presales prompt template

**Status:** v1 · 2026-04-28 · evolves with the review queue

The prompt the user invokes when running stardust against a brand
in the 30-brand review baseline. Anchors on the presales context
explicitly so "better" doesn't get resolved as abstract aesthetic
improvement.

## Use

Substitute `<URL>` with the brand's home-page URL. Paste verbatim
as the first user message in a fresh Claude Code session in the
project directory.

## v1 — current

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

Each section combats a specific failure mode surfaced by pass 1
(`notes/human-review-2026-04-28-pass1.md`).

| clause | combats | source |
|---|---|---|
| "presales tool / design fatigue / willingness to migrate" | "make it better" being too abstract; the agent reaching for Pentagram-editorial improvement when the brand needs a recognisable refresh | reframing of the original goal |
| "Stays recognisably the brand: no invented colours, no fonts outside the captured surface" | L-G (cream colour invented on BAC/A) | pass 1 |
| "photography reused in the same semantic positions" | L-C (image scarcity, mis-placement) | pass 1 |
| "Density calibrated to the brand's actual register — not editorial-airy by default" | L-A (too airy / vertical space) — names the failure mode explicitly | pass 1; D-6 spec change wasn't sticky enough |
| "Three variants, each a different refresh strategy (not three reskins)" | L-B (variant convergence) — the load-bearing finding | `notes/variant-convergence.md` |
| Conservative / Compositional / Bold framing | gives the agent a non-token vocabulary for differentiation; gives the customer's brand team a risk-gradient self-selection | pass 1 + presales context |
| "Hero text on photographic backgrounds without contrast scrim" | L-F (BAC/A hero unreadable on image) | pass 1 |
| "96px+ section padding on multi-section brand pages" | L-A re-stated with a concrete threshold | pass 1 |
| "Fabricated stats, addresses, customer logos … placeholders with F-002 signature" | F-002 (content sourcing) — recurrent across runs | F-002 / earlier session |
| "every variant must satisfy at least one specific tone trait from PRODUCT.md Brand Personality" | L-D ("need more character"), recurrence of BAC L-012 | pass 1 + `notes/lesson-corpus-self-reinforcement.md` |
| "Editorial-register treatment for product-commerce brands" | L-I (Vitamix variants named atelier / mise-en-place — wrong register) | pass 1 |
| "Stop and ask if … insufficient signal to differentiate three variants meaningfully" | counterbalances "proceed autonomously"; better one strong variant than three weak ones | new — implicit in L-B |

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

- **v1 · 2026-04-28** — initial. Combats the 5 cross-project
  patterns from `notes/human-review-2026-04-28-pass1.md` (L-A
  through L-E) plus 4 single-project findings (L-F, L-G, L-I,
  L-J). Presales framing made explicit. Conservative /
  Compositional / Bold variant strategy added.

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
