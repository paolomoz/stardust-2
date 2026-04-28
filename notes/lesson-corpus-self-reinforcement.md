# Lesson corpus / self-reinforcement pipeline

A capture of the 2026-04-28 architectural read on whether stardust
can self-improve from a corpus of per-run lessons. **Not implemented.**
Documented for future reference. The user's chosen first move is to
collect 10 human-reviewed runs before any pipeline automation.

---

## Why this came up

Three independent runs produced structured feedback files in the same
shape, with notable cross-run overlap on the failure modes:

| source file | run | shape |
|---|---|---|
| `tmp/st2-11-bac/stardust/self-reinforcement.md` | Virgin Atlantic, 3 variants | 12 numbered `L-NNN` lessons, prevention-rule + applied-fix + where-rule-should-live mapping table |
| `tmp/st2-12-virginatlantic/stardust/feedback.md` | Adobe for Business, 3 variants | 9 `R1-FNN` findings, detector-vs-LLM split, run telemetry table |
| `tmp/st2-13-vitamix/stardust/feedback/prototype-lessons-2026-04-28-vitamix.md` | Vitamix, 3 variants | 15 lessons, formal `stardust.lesson.v1` schema, pipeline ingestion notes |

The same root failures appear across unrelated brands — heading
skips, two-primary-CTAs-in-hero, vague CTA labels, invented stats
while `unsourcedContent: []` lies, decorative gradients on locked
grounds, category-reflex hero imagery (airline=sky, fintech=blue+chart).
That's the precondition for a corpus to be useful: if every run
produced unique failures, there'd be nothing to reinforce against.

## The proposed shape (deferred)

Three-tier deployment of the corpus, increasing automation, decreasing
trust:

```
TIER 1 — Spec-tighten         human-curated      durable
   Lessons that map to a spec section land there as contracts.
   F1's "Where each rule should live" table is the playbook.

TIER 2 — Detector rules        auto-detect        warn/refuse
   Mechanical lessons (regex / AST / DOM-walk) become
   deterministic checks in prototype Phase 2.5.
   P0 → refuse. P1 → warn. P2/P3 → advise.

TIER 3 — LLM rubric            corpus appended    advisory
   Lesson titles + triggers appended to Assessment A's prompt
   as a "known-issues checklist". Reviewer reports per-item
   match in the critique output. Never auto-refuses.
```

## Lesson buckets observed

| bucket | examples | notes |
|---|---|---|
| **Mechanical-detectable** | em dashes, heading skips, AA contrast, dead-anchor-in-nav, fake-input-with-blink, gradient-on-locked-ground, vague-CTA-text, heading-uniqueness | Highest tractability. Tier 2 candidates. |
| **Brief-time-checkable** | hero-metric template, category-cliché image, editorial-fold-cardinality, voice-proof-point | Needs schema additions to direct's outputs. |
| **Subjective / context-dependent** | generic premium tone, narrative throughline, working-memory load on tile grids, credibility anchoring | LLM-only. Tier 3, never auto-gate. |

## What's harder than the corpus suggests

1. **Trigger predicates aren't all as mechanical as they look.**
   "Hero descendants matching `.btn-primary`" — what counts as the
   hero region? Header? `[data-section="hero"]`? First viewport?
   Most triggers carry one of these contextual fudges.
2. **Lesson shadows are real.** F3's L-013/L-014 explicitly document
   them — applying L-012's "drop uppercase on long strings" fix
   exposes 11px tertiary text to L-014's `tiny-text` rule. Naive
   auto-appliers oscillate. Corpus needs lesson-ordering and
   dependency edges.
3. **Lessons have brand-context overrides.** F1-L004 was applied to
   variant A only; B and C kept the cliché as ambient. Encoding
   "warn on hit, refuse only on context X" is harder than a flat
   refuse.
4. **False positives compound with corpus size.** F2's R1-F07/F08
   (detector blind spots producing white-on-white false positives)
   shows this curve already starting. After 100 lessons recall
   improves but precision falls.
5. **Lessons reflect the agent's biases, not user taste.** The
   corpus self-selects — agent-as-critic flags what agent-as-renderer
   did wrong; both halves are the same model. Human-override
   lessons need explicit higher weight, otherwise the corpus
   amplifies its own blind spots.

## Concrete first steps (when this revives)

1. **Lock the schema.** F3's `stardust.lesson.v1` is the cleanest;
   add F2's run-telemetry fields (incidence, fixed-on-pass-N,
   false-positive-rate). Land at
   `skills/stardust/reference/lesson-schema.md`.
2. **Define the corpus location.** Per-run dated lesson files
   (`stardust/lessons/<YYYY-MM-DD>-<slug>.md`) + a synthesised
   `lessons-corpus.md` that the pipeline reads.
3. **Build the dedup + merge layer.** Same `id` across runs merges:
   `incidence` count goes up, `observed-in` expands. Detect
   "observed in ≥3 runs with `caught-by: detector`" → promote to
   automatic gate. ~50 lines of Python.
4. **Encode the 5–8 highest-frequency mechanical lessons as
   detector rules first.** Don't ship 30+ at once. The current
   short-list from the three corpora: heading skips, em dashes,
   fake-input-with-blink, gradient-on-locked-ground, vague CTA
   labels, two-primary-CTAs-in-hero, dead-anchor-in-nav, AA
   contrast on body text.
5. **Make Phase 2.5 critique findings cite the lesson ID they
   match.** Every finding tagged with `matched-lesson: L-NNN`.
   Over many runs you get an empirical histogram of which lessons
   fire most — that drives Tier 1 promotions.
6. **Add a `lesson-shadow` registry.** Lesson L-XXX
   `triggers-also: [L-YYY]` so auto-fixers don't oscillate.
7. **Add a `humanOverride` field.** When a user disagrees with a
   detector finding (`"keep this gradient — intentional"`), record
   it. Future runs on the same project respect the override. This
   stops the corpus from becoming a thicket of false positives.

Estimated effort when picked up: ~1 day for schema + dedup +
seed corpus + Phase 2.5 wiring; ~2 days more to ship the first
batch of detector rules.

## Decision

**Not implementing now.** The user is starting **10 human reviews
as first pass** to build the empirical baseline before any pipeline
automation. Right call — the corpus shape (and which lessons recur)
is what determines whether the 3-tier deployment makes sense, and
that signal needs more than 3 runs to be reliable.

## Revisit triggers

Pick this back up when one of:

- **10+ human-reviewed lesson files exist.** Critical mass for the
  dedup layer to be worth building.
- **The same lesson is observed in ≥5 runs with the same
  `caught-by` classification.** That lesson is a Tier 2 candidate
  by empirical signal, not architectural guess.
- **A run produces a critique finding that an earlier run already
  surfaced as a lesson.** Direct evidence the corpus would have
  prevented the failure if it had been wired in.
- **A user explicitly asks the agent to "remember the lesson from
  the X run."** That's a usability gap that auto-injecting the
  corpus would close.
- **A non-Claude model produces wildly different lessons on the
  same input.** Disagreement between models on the corpus is
  evidence the agent-bias risk is real and worth weight-encoding.

## What NOT to do

- **Don't aim for autonomous self-improvement.** Tier 1 is
  human-driven; Tier 2 auto-detects but humans curate promotions;
  Tier 3 is LLM-rubric advisory. Full autonomy invites Goodhart's
  law (agents render to the rule, lose design taste).
- **Don't auto-merge new lessons.** Each new lesson should be
  reviewable. Stardust's brand promise is "every visual decision
  has a provenance" — a corpus that grows opaquely violates that.
- **Don't load the full corpus at every phase.** Lessons should be
  filterable by phase / register / brand-context. Otherwise context
  cost grows with the corpus.

## Source files (reference)

The three agent-self-critique corpora that drove the original
analysis live outside this repo (in user's `tmp/` projects). When
this revives, copy them into a corpus seed at
`skills/stardust/reference/lesson-corpus-seed-2026-04-28/`
so the analysis is reproducible.

```
/Users/paolo/excat/tmp/st2-11-bac/stardust/self-reinforcement.md
/Users/paolo/excat/tmp/st2-12-virginatlantic/stardust/feedback.md
/Users/paolo/excat/tmp/st2-13-vitamix/stardust/feedback/prototype-lessons-2026-04-28-vitamix.md
```

These three are the v0 of `stardust.lesson.v1` even if the schema
isn't yet locked.

## Human-review corpus (in this repo)

In addition to the agent-self-critique files above, human-taste
reviews are now collected in this repo:

- **`notes/human-review-2026-04-28-pass1.md`** — first batch, 9
  projects reviewed in free-form prose, 5 cross-project patterns
  extracted (L-A through L-E), 5 single-project findings tracked
  (L-F through L-J). Reviewer: paolomoz.

The first batch surfaced one finding important enough to warrant
its own dedicated note:

- **`notes/variant-convergence.md`** — captures L-B "variants
  look like reskins" as a structural problem, not a refinement.
  Multi-variant ideation is the load-bearing feature at risk;
  the convergence pattern recurs across 4 unrelated brands.
  Highest-leverage candidate for spec-tightening when this
  pipeline revives.

**Plan:** continue collecting human reviews to a target of 20–30
total (diverse across register × industry × complexity, not just
B2B fintech homepages). Schema stays free-form prose for the
first ~10 reviews; lock `stardust.lesson.v1` only when natural
patterns have surfaced. See the parent note's checkpoints
(15 / 25–30 / stop) for cadence.

**Recurrence signal already present.** BAC's earlier
self-critique L-012 ("Generic Premium-airline tone") recurred
on fiserv / festool / st2-5 in the human-review pass. Same
brand's L-003 ("booking widget rendered as static spans")
recurred on the SAME project's same prototype. Both because
the corpus pipeline is deferred — predicted, observed, and the
strongest argument for the pipeline being valuable when wired
in.
