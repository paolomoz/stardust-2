# Human review pass 2 — 2026-04-28

Second batch of human-taste feedback. Tests the v1 prompt
(`notes/presales-prompt-template-2026-04-28.md` v1) against:

- **3 retests** of pass-1 brands (Festool, Virgin Atlantic, The Road
  Home) to see if v1 moves the needle on the original failure modes
- **7 new brands** (Phase 1 of `notes/review-queue-2026-04-28.md` +
  Patagonia from Phase 2) to gather fresh signal under v1

**Reviewer:** paolomoz
**Date:** 2026-04-28
**Run setup:** 10 fresh project directories, one Claude Code session
each, v1 prompt verbatim. Plugin cache reflects today's commits.

## Verbatim feedback (as written)

> festool A and B are great, C is too bold, especially font too heavy
> and too airy. it's good to provide an exploratory option so the
> prototypes don't look too AI generated; but need to find a way to
> make it different but more beautiful than C.
>
> virginatlantic, this second test is not good. the UIs are poor and
> not engaging; the previous test was much better
> (st2-11-bac/home-{A,B,C}-proposed.html).
>
> theroadhome the best is st2-16/home-B-proposed.html just a bit too
> font biggy, st2-16/home-C-proposed.html is too airy and too big
> fonts.
>
> glossier home-A-proposed.html is the best but we would have to see
> if the brand owners want a less obvious design,
> home-C-proposed.html is good but only if the brand wants so much
> airy which is not great for my taste, home-B-proposed.html looks
> more anonymous it would be interesting to give some more creative
> ideas while staying on brand.
>
> oatly all nice ideas, since the original design is quite unique it
> is good to give new ideas. **Good to always keep one variant as a
> better reskin of the original**, in general there could be more
> content even in variant C.
>
> polestar: all way too empty and airy and none of the variants
> respects the original focus on product selection and configuration
> all 3 have a full width hero which is clearly boring in this case.
>
> onemedical A and B are not bad but too airy and to obvious, the
> original site looks a template and our generated variants are
> close to that; **respecting the brand should include remove boring
> design while respecting some identity**; C is not at all a corporate
> level website, not just bold, also not very professional.
>
> vanguard all A B C are good; a bit too plain which come from the
> original page so in this case we could be a bit more creative.
>
> aman: all 3 variants looking very much like the original website;
> in this case it would be hard to say "we made it better" so at
> least we need to try something different and **maybe 1 variant be
> as close as possible to the original just with the identifiable
> small improvements**.
>
> Patagonia: A and B are barely different, C is just a bit bolder
> fonts; the variants are good, probably better than the original
> website or equivalent. In this case a good approach could be
> similar to aman: **1 variant very close to the original with the
> identified improvements and the other 2 exploring new directions**.

## Per-brand verdict

| brand | output | notable |
|---|---|---|
| Festool (RETEST) | A and B great, C overshoots | **better than pass-1** ("plain / AI generated" is gone for A and B) |
| Virgin Atlantic (RETEST) | "UIs poor, not engaging" | **regression vs pass-1** — st2-11-bac was better |
| The Road Home (RETEST) | B is the best (just font-biggy), C overshoots | better than pass-1 (which was "similar to festool plain") |
| Glossier | A good, B "anonymous", C too airy | mixed |
| Oatly | all nice ideas, good direction; suggests "always keep 1 reskin" | mixed-positive (framework signal) |
| Polestar | all 3 ignore product-selection IA, full-width hero is "boring" | failure on IA |
| One Medical | A/B too airy/obvious, C "not corporate, not professional" | failure |
| Vanguard | all good but plain | acceptable but flat |
| Aman | all too close to original, no migration story | failure (different mode) |
| Patagonia | A and B "barely different", C "just bolder fonts" | mixed (framework signal) |

**Strict scorecard for v1 retests:** 2 better (Festool, TheRoadHome),
1 regression (Virgin Atlantic). Not a clean validation pass.

## Patterns extracted (six new + reframings of pass-1 patterns)

### P-1 · The "C cliff" — Bold variant consistently overshoots

Across Festool, The Road Home, Glossier, One Medical: variant C gets
resolved as "120pt+ fonts + 96px+ padding + extreme airy" rather than
"stronger commitment to one specific element."

The v1 prompt's Bold framing was supposed to push *one element*
further; the agent pushes *every* element further. User: *"need to
find a way to make it different but more beautiful than C."*

### P-2 · The "B trap" — Compositional Shift produces anonymous output

Glossier B "looks more anonymous." Patagonia A and B "barely
different."

The middle variant is structurally hardest: "rearrange IA, same
tokens" gives the agent no visual signature to anchor on, so it
defaults to generic.

### P-3 · L-A density still over-airs (recurrence)

Pass-1 already named this. v1 added a "density calibrated to brand
register" clause. **Still recurring** on Festool C, TheRoadHome C,
Glossier C, Polestar (all 3), One Medical A and B.

The prompt clause isn't sticky. The constraint needs to be harder
than a soft directive.

### P-4 · NEW: Brand-faithful ≠ preserving mediocrity

One Medical: *"the original site looks a template and our generated
variants are close to that; respecting the brand should include
remove boring design while respecting some identity."*

Vanguard, Polestar, One Medical share this shape: when the captured
site is template-like or bland, brand-faithful inheritance shouldn't
hold the redesign to that level. Identity yes; current execution no.

### P-5 · NEW: IA priorities are part of brand-faithful (Polestar)

Polestar's site leads with product-selection-and-configuration. v1
prototypes all lead with a generic full-width hero. The IA priority
of the existing site is part of brand-faithful inheritance, not just
the visual tokens.

This is a category of failure the v1 prompt doesn't address:
"hero-first by reflex" overrides actual brand IA.

### P-6 · NEW: When the original is excellent, "better" is hard to claim

Aman: *"hard to say we made it better."* Patagonia: *"variants are
good, probably better than the original."*

Variants that look exactly like the original don't justify migration.
The user's two phrasings (Aman + Patagonia) converge on the same
fix: **at least one variant must claim specific named improvements
over the original.**

## Cross-pass-1 link

| pass-1 lesson | pass-2 status |
|---|---|
| L-A · "too airy / too much vertical space" | **persists** (P-3 above) — v1 prompt clause didn't fix it |
| L-B · variant convergence | **persists in new form** (P-2 B-trap, P-1 C-cliff). v1's Conservative/Compositional/Bold framework partly worked but produces new failure modes (anonymous middle, overshooting end). |
| L-C · image scarcity / placement failure | not specifically called out this batch — reduced or unchanged |
| L-D · "need more character" / generic premium | partially fixed — Vanguard "too plain" (P-4) still flags it, but festool A/B and theroadhome B feel character-having |
| L-E · big-font overshoot for enterprise | **expanded into P-1** — overshoot isn't only enterprise; it's universal across brands |
| L-G · brand-faithful color hallucination | not flagged this batch |
| L-I · register mismatch | not flagged this batch (no editorial-named variants observed) |

## The headline insight

The user articulated the v2 framework twice — once on Oatly, once
on Aman/Patagonia:

> *"Good to always keep one variant as a better reskin of the
> original."*
>
> *"1 variant very close to the original with the identified
> improvements and the other 2 exploring new directions."*

This is structurally stronger than v1's Conservative/Compositional/
Bold because it requires the agent to:

1. **Identify specific improvements** before render (not "modernise
   tokens" — *which* tokens, *why*, traceable to a captured weakness)
2. **Make "better" provable** for the brand team — variant A says "we
   kept everything, plus these 5 specific fixes"
3. **Drop the Bold-overshoot trap** — variants B and C are "new
   directions," not "more extreme" of variant A

## v1 prompt verdict

**Mixed signal. Lock to v2 needed.**

- 2 retests improved (Festool, The Road Home)
- 1 retest **regressed** (Virgin Atlantic)
- 4 new-brand failures (Polestar, One Medical, Aman, Glossier-mixed)
- 3 new-brand acceptable-but-flat (Oatly, Vanguard, Patagonia)

The user's framework reframing is the load-bearing fix. v2 prompt
lands at `notes/presales-prompt-template-2026-04-28.md` (same file,
v2 supersedes v1).

## Forward to v2

Three structural changes in v2:

1. **Variant framework rebuilt:** A=Faithful+identified-improvements,
   B/C=New directions. Replaces Conservative/Compositional/Bold.
2. **`<slug>-improvements.md` artifact** required before render —
   forces an explicit list of weaknesses; gives variant A a
   concrete brief.
3. **Hard constraints** (not soft defaults): density refusal threshold,
   IA-priority preservation, "brand-faithful ≠ preserving mediocrity"
   clause.

Plus carry forward v1's anti-list (hero contrast, fabricated content,
generic premium copy, register mismatch).

## Process notes

- **Free-form prose worked again** — same as pass 1. No schema
  imposed. Pattern extraction is mechanical against the corpus the
  user produces.
- **Retest design was the right call.** Without retests, we'd have no
  baseline; without baseline, we can't tell whether new-brand failures
  are v1's fault or just hard cases. Continue the pattern: every
  prompt iteration retests at least 2-3 known brands.
- **Sample size warning:** 3 retests × 1 v1 prompt = 3 datapoints.
  Virgin Atlantic regressing alone could be variance. But the *new*
  failures (P-1 to P-6) are observed across multiple unrelated
  brands and converge on consistent patterns. The framework signal
  is robust even if specific verdicts are noisy.

## Next checkpoints

| at total runs | action |
|---|---|
| **17 (current)** | Lock v2 prompt. Don't proceed until v2 lands. |
| **22 (= +5 v2 runs)** | Compare v2 outputs against v1 baseline (these 7) on P-1 through P-6. Pass if 4+/6 patterns improve. |
| **30** | Original target. Proceed if v2 passes the 22-checkpoint. |

## Cross-references

- v1 prompt (now superseded): `notes/presales-prompt-template-2026-04-28.md` v1 section
- v2 prompt (current): same file, v2 section
- Pass 1: `notes/human-review-2026-04-28-pass1.md`
- Variant convergence (the load-bearing finding from pass 1, partially
  addressed in v1, fully restructured in v2): `notes/variant-convergence.md`
- Review queue: `notes/review-queue-2026-04-28.md`
- Deferred lesson-corpus pipeline:
  `notes/lesson-corpus-self-reinforcement.md`
