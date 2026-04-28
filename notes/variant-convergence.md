# Variant convergence — multi-variant ideation produces reskins

A capture of the load-bearing finding from the 2026-04-28 first-pass
human review. Every other lesson is a refinement; this one is the
multi-variant ideation feature failing at its core promise.

**Status:** documented, not implemented. The lesson-corpus pipeline
is deferred (see `notes/lesson-corpus-self-reinforcement.md`); this
is one of the highest-leverage candidates for spec-tightening when
that work revives.

---

## The finding

The multi-variant ideation feature (P-1 from the earlier feedback
log) is supposed to produce **distinct compositional theses** —
one variant per dominant seed dimension (decade-dominant /
register-dominant / craft-dominant), per
`divergence-toolkit.md § 2.5`.

What actually ships across runs is "**same template, different
tokens × N**." Variants are distinguishable by palette + type, but
their section sequences, layout strategies, and IA shapes are
identical or near-identical.

**Empirical evidence (2026-04-28 review):**

| brand | variants observed | reviewer judgment |
|---|---|---|
| Festool (st2-10) | 3 (product-led / heritage-led / service-led) | "all clean and aligned with brand tokens but very plain, standard layout patterns, feels AI generated" |
| The Road Home (st2-5) | 3 (A v1, B, C) | A and B "similar comments as festool" (i.e. plain / reskin); C had nice ideas |
| Fiserv (st2-6) | 3 (A/B/C) | "good prototypes, need more character (as almost all prototypes built with stardust so far)" |
| Vitamix (st2-13) | 3 (atelier/mise-en-place/workhorse) | A "looks like a landing page or a blog. wrong typography, big fonts, too much empty space"; B and C "similar, better, but needs more content and less free space" |

**12+ prototypes across 4 unrelated brands** show the same failure
mode. This is not random — it's a systematic gap.

---

## Why it happens (likely diagnosis)

The seed-dimension dominance contract from
`divergence-toolkit.md § 2.5` is documented as guidance but not
enforced as a structural difference between variants:

1. **Variant theses are recorded but not load-bearing.** When the
   page-shape brief (`<slug>-shape-<id>.md`) declares
   `dominantDimension: decade`, that field exists for downstream
   consumers but doesn't gate render-time decisions. The agent
   reads it as a label, not a contract.

2. **The agent reaches for the same compositional pattern by
   default.** Hero → 3-up grid → testimonial → CTA-band → footer.
   This pattern is a strong attractor regardless of what the
   dominant dimension is. Without an explicit brief-time check
   that forces structural divergence, the agent converges.

3. **Variant differentiation lives in tokens, not composition.**
   Different palette role assignments, different type-ratio
   choices, different motif emphasis — these are all token-level.
   Composition (section sequence, layout strategy, IA shape)
   stays largely invariant.

4. **Token-level diff is the cheap variant.** It's faster to
   ship and easier to validate. Compositional divergence is
   harder — it requires the agent to make different IA bets per
   variant, which is the actual creative lift.

---

## What this undermines

- **The multi-variant ideation feature's premise.** If three
  variants look like reskins, there's no reason to render three.
  One variant + token swatches in a brand-board would communicate
  the same information at a quarter of the cost.

- **The showcase's value.** Multi-variant samples in
  `samples/<slug>/` advertise "distinct theses per variant"; a
  showcase reader who clicks through and sees three reskins
  doesn't return.

- **The user's iteration loop.** "Pick a variant" is meaningful
  when variants are genuinely different propositions. When
  they're reskins, the user is picking colors, not directions.

---

## What would fix it (in order of tractability)

### Tier 1 — Spec-tighten (low effort, immediate)

Update `divergence-toolkit.md § 2.5` and
`prototype/reference/page-shape-brief.md` to make the
dominant-dimension contract explicit and enforceable:

> Variants whose `<slug>-shape-<id>.md` declares the same
> `dominantDimension` value, OR whose section sequences differ
> only in token assignment, are not multi-variant ideations —
> they are reskins. Phase 1 must reject the brief and restart
> ideation with explicit composition-level differentiation.

Add concrete examples per dominant dimension:

- **decade-dominant**: variant differentiates by *era's compositional
  conventions* — 1970s magazine = asymmetric editorial split,
  2025-now = full-bleed video hero with sticky chrome, etc.
- **register-dominant**: variant differentiates by *IA shape* —
  brand register = audience-grid + brand storytelling, product
  register = feature matrix + side-by-side comparison.
- **craft-dominant**: variant differentiates by *signature motif
  deployment* — Riso = misregistered overlap, letterpress = hard-
  edged offset blocks, swiss = grid lockup with extreme
  whitespace.

This alone won't catch all reskins, but it gives the agent a
non-token vocabulary for differentiation.

### Tier 2 — Brief-time validation (medium effort, requires Phase 1.5 in prototype)

Before invoking craft for variant N+1, validate the per-variant
shape briefs:

1. Each `<slug>-shape-<id>.md` must declare a distinct
   `dominantDimension` value (no two variants share it).
2. Each variant must declare a `compositionDelta` field listing
   ≥ 2 ways the section sequence or layout strategy diverges
   from the primary variant. Examples:
   - `compositionDelta: ["section-order: hero ↔ stats", "layout: 3-up-grid → vertical-narrative"]`
3. If `compositionDelta` is empty or trivial, refuse the brief
   and restart Phase 1.

The validator is mechanical: parse the briefs, diff their section
sequences, compare layout strategies. If the diff is ≤ N
non-token differences, fail.

### Tier 3 — LLM rubric augmentation (cheap, advisory)

In Phase 2.5 critique, append a rubric question to Assessment A:

> Looking at these N variants side by side: are they distinct
> compositional theses, or token reskins of the same layout?
> Cite specific section orderings or IA differences if distinct.

Reviewer reports `convergent` / `differentiated` / `mixed`.
Surfaces in the report; doesn't gate.

Tier 3 alone is insufficient (advisory only) but combined with
Tier 1 it gives the agent a feedback signal without locking it in.

---

## Why this is the highest-leverage finding

Most lessons are **refinements** — one CTA placement issue, one
color choice, one density miscalibration. Fixing them improves
output by 5-10% per fix.

This one is **structural** — fixing it changes whether the
multi-variant feature is worth shipping at all. If three variants
genuinely propose three different compositional theses, the
feature is doing its job. If three variants are reskins, the
feature is theater.

The leverage ratio is roughly **10× the next-most-frequent
finding**. Worth fixing first when the lesson-corpus pipeline
revives.

---

## Cross-references

- **Original concept**: `STARDUST-FEEDBACK.md` P-1 (variant
  ideation as a first-class step), referenced in earlier session
- **Dimension-dominance contract**:
  `skills/stardust/reference/divergence-toolkit.md § 2.5`
- **Brief format**:
  `skills/prototype/reference/page-shape-brief.md`
- **First-pass evidence**:
  `notes/human-review-2026-04-28-pass1.md` § L-B
- **Deferred-pipeline parent**:
  `notes/lesson-corpus-self-reinforcement.md`

---

## Decision

**Track. Don't implement.** Tier 1 (spec edits) is small enough
to ship right now, but per the user's plan to gather 20–30 human
reviews before any pipeline automation, this stays in the
deferred-ideas pile until either:

- A second batch of human reviews confirms the convergence
  pattern recurs across more brands (likely, given current
  evidence)
- Or a single project's variants converge so badly that the
  user explicitly asks for the fix

When implemented, the order of operations should be:
1. Land Tier 1 first (spec edits to divergence-toolkit and
   page-shape-brief)
2. Run 2-3 multi-variant projects post-Tier-1 to see if the
   pattern abates
3. If still recurring, ship Tier 2 (brief-time validator)
4. Tier 3 (LLM rubric augmentation) lands whenever — it's
   cheap and additive

## Revisit triggers

- **Second human review batch** (target +6 brands, total ~15)
  confirms convergence pattern recurs
- **A user explicitly notes** "variants are too similar" or
  equivalent on a specific run
- **A multi-variant sample submission** to the showcase gets
  rejected by a reviewer for thesis-redundancy
- **The lesson-corpus pipeline ships** and this lesson is in
  the top-3 most-recurrent findings
