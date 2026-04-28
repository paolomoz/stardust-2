# Human review pass 1 — 2026-04-28

First batch of human-taste feedback across the prototypes generated
in the `tmp/st2-*` test projects. Free-form prose by design — no
schema imposed yet (per
`notes/lesson-corpus-self-reinforcement.md` § Decision: lock the
schema after 10+ reviews exist, not before).

The user's plan: 20–30 reviews total, diverse across register /
industry / complexity, before any pipeline automation.

**Reviewer:** paolomoz
**Date:** 2026-04-28
**Projects in scope:** 9 of the 13 `tmp/st2-*` directories (others
have no prototypes or are not yet reviewable).

---

## Verbatim feedback (as written)

> festool prototypes (st2-10-festool/stardust/prototypes/home-a-product-led-proposed.html and others) are all clean and aligned with brand tokens but they are very "plain", using standard layout patterns and feels AI generated. This might be fine for the brand and based on the existing website but worth tracking.
>
> Virgin Atlantic: st2-11-bac/stardust/prototypes/home-A-proposed.html is good, issues: hero text is not readable on top of the image, is the cream color background part of the brand palette or was that invented? there is a lot of vertical empty space, the booking form is not finished, needs more work. Typography is great.
>
> st2-11-bac/stardust/prototypes/home-B-proposed.html is good, there are some chips that look AI generated.
>
> st2-11-bac/stardust/prototypes/home-C-proposed.html is a great alternative, but probably too much for an enterprise brand (unless the brand team wants to go bold). maybe we could just avoid such big font size (120+ on desktop) to make it look slightly more standard.
>
> st2-12-virginatlantic/stardust/prototypes/home-proposed-a.html good typography but way too much empty vertical space and almost no images.
>
> st2-12-virginatlantic/stardust/prototypes/home-proposed-b.html too much vertical space, too much white, needs more images and used images are barely visible in their block (not centered).
>
> st2-12-virginatlantic/stardust/prototypes/home-proposed-c.html same.
>
> st2-13-vitamix/stardust/prototypes/home-variant-a-atelier.html not on brand, not a sophisticated product website, looks more like a landing page or a blog. wrong typography, big fonts, too much empty space.
>
> st2-13-vitamix/stardust/prototypes/home-variant-b-mise-en-place.html similar, better, but needs more content and less free space.
>
> st2-13-vitamix/stardust/prototypes/home-variant-c-workhorse.html some nice ideas to change, but same issues as previous one.
>
> The Road Home st2-5/stardust/prototypes/home-proposed-A-v1.html and st2-5/stardust/prototypes/home-proposed-B.html similar comments as festool. st2-5/stardust/prototypes/home-proposed-C.html has nice ideas for change.
>
> fiserv, good prototypes, need more character (as almost all prototypes built with stardust so far).
>
> st2-7/stardust/prototypes were built without enough context so not reviewable, st2-8/ as well.

---

## Patterns extracted (first pass)

Five recurring cross-project patterns + four single-project findings,
with frequency counts. Project tags below use the directory slug.

### L-A · Density — "too airy / too much vertical space"

- **observed in**: virgin-atlantic-bac/A, virginatlantic/A,B,C, vitamix/A,B (6 prototypes)
- **note**: Recurring **after** D-6 flipped the brand-register default from `airy` (96px) to `balanced` (64px). Either:
  - The default is still too generous for these brands → may need a fourth tier `balanced-tight` (~48–56px)
  - The default is right but the agent isn't picking it (defaults aren't sticky)
  - Or "airy" leaks in via per-section padding, not just `sectionPadding`
- **severity**: P1
- **caught-by**: human (no detector for vertical-rhythm density)
- **provisional fix-recipe**: investigate which DESIGN.md `sectionPadding` actually shipped on the affected projects; if not 64px, agent isn't reading the stamp; if 64px, the threshold itself needs re-calibration.

### L-B · Variant convergence — "variants look like reskins"

- **observed in**: festool (all 3), st2-5/A,B, fiserv (all 3), vitamix (all 3) — **12+ prototypes across 4 brands**
- **note**: This is the load-bearing finding. The multi-variant ideation feature's whole premise is that each variant lets one seed dimension dominate (per `divergence-toolkit.md § 2.5`). What actually ships is "same template + different tokens × 3". Tier 1 spec-tighten or Tier 2 brief-time-check. See `notes/variant-convergence.md` for the dedicated treatment.
- **severity**: **P0** — undermines the feature itself
- **caught-by**: human (deterministic detection is hard; brief-time validation is the path)

### L-C · Image scarcity / placement failure

- **observed in**: virginatlantic/A,B,C ("almost no images" / "barely visible in their block, not centered")
- **note**: X-1 (CSS background capture) addressed *capture* but not *deployment*. Even when images are captured, the prototype renders them at wrong sizes / positions / counts. The page-shape-brief's "Image map" concept proposed in earlier feedback (P-5 from `STARDUST-FEEDBACK.md`) was never implemented.
- **severity**: P1
- **caught-by**: human

### L-D · "Need more character" — generic premium tone

- **observed in**: fiserv (all), st2-5 (implied), festool (implied via "AI generated")
- **note**: **Recurrence** of `BAC L-012` from `tmp/st2-11-bac/.../self-reinforcement.md` ("Generic Premium-airline tone that could be any carrier"). The earlier corpus didn't get fed back into subsequent runs — predictable, since the lesson-corpus pipeline is deferred. Strongest possible argument that the pipeline would be valuable when wired in.
- **severity**: P1
- **caught-by**: human; LLM-rubric can score this with a "satisfies a PRODUCT.md tone trait" check

### L-E · Big-font overshoot for enterprise register

- **observed in**: virgin-atlantic-bac/C (120+px on desktop "too much for an enterprise brand")
- **note**: When the resolved direction is `expressive: committed` or `expressive: drenched`, the agent reaches for very-large display fonts. For enterprise / B2B brands the calibration overshoots. Possibly tie display-font upper bound to `register × audience` rather than just expressive axis.
- **severity**: P2
- **caught-by**: human

---

## Single-project findings (worth tracking, generalisability TBD)

### L-F · Hero overlay contrast on image

- **project**: virgin-atlantic-bac/A
- **detail**: hero text not readable on top of image. AA contrast detector currently only covers solid-color backgrounds; image-overlaid text needs scrim/overlay to maintain legibility.
- **severity**: P0 (accessibility)
- **caught-by**: human; deterministic detector candidate (compute average luminance under text region + scrim presence check)

### L-G · Brand-faithful color hallucination

- **project**: virgin-atlantic-bac/A
- **detail**: cream background introduced — not in captured palette. Brand-faithful Mode A should have surfaced this in the inversion log; didn't.
- **severity**: P1
- **caught-by**: human; deterministic detector candidate (verify every used `:root` color appears in `_brand-extraction.json#palette[]` OR is documented in `extensions.divergence.brand_faithful_inversions`)

### L-H · Specific UI elements read as AI cliché

- **project**: virgin-atlantic-bac/B
- **detail**: chips look AI generated. Adds to the L-D "generic" tell.
- **severity**: P2
- **caught-by**: human (LLM judgment); hard to make deterministic

### L-I · Register mismatch — wrong tone for the actual brand

- **project**: vitamix (all 3 variants named "atelier", "mise-en-place", "workhorse" — editorial register names)
- **detail**: Vitamix is a product-commerce brand; the agent picked an editorial register from vibe rather than from the captured brand surface. Variants read as a blog/landing-page rather than a product site.
- **severity**: P1
- **caught-by**: human; brief-time-checkable (Phase 1 should validate variant register against `current/PRODUCT.md` register, not just resolve from direction)

### L-J · Insufficient context produces unreviewable output

- **projects**: st2-7, st2-8 ("built without enough context so not reviewable")
- **detail**: Process finding. Phase 1 should refuse to proceed when extract+direct artefacts are insufficient (e.g. `_brand-extraction.json` missing fields, captured pages count too small).
- **severity**: P1 (process)
- **caught-by**: human; Setup-precondition gap. Could fold into the doctor precondition check in `prototype/SKILL.md` § Setup if that step were re-added (currently only on extract / direct / migrate).

---

## Cross-corpus link

| earlier corpus lesson | this batch | recurred? |
|---|---|---|
| BAC L-012 "Generic Premium-airline tone" | L-D ("need more character" on fiserv, st2-5, festool) | **yes** — across 3+ unrelated brands |
| BAC L-001 "Phase 2.5 critique skipped silently" | not observed in this batch (different failure axis) | indeterminate |
| BAC L-003 "Booking widget rendered with static spans" | virgin-atlantic-bac/A "booking form is not finished" | **yes** — same project, lesson didn't auto-apply |
| Adobe R1-F03 "Direction layered an absolute-ban into a brief" | not directly observed | indeterminate |
| Vitamix L-001 "Two competing primary CTAs in hero" | not flagged by reviewer | indeterminate (worth checking) |

The fact that **BAC L-003 "booking widget not interactive"** is still surfacing in the SAME project on the SAME prototype demonstrates the lesson didn't get auto-applied. Predictable — corpus pipeline deferred — but worth flagging as evidence the pipeline is needed.

---

## Process notes

- **Format worked.** Free-form prose was faster to write than YAML and carries enough structure (project · variant · verdict · specific issues) to extract patterns mechanically. Don't impose a schema for the next several reviews.
- **Diversity matters more than count.** The current 9 projects skew brand-register / marketing-homepage. Future reviews should expand into: product-register (SaaS dashboards, dev tools), e-commerce, healthcare, education, complex-IA sites with deep navigation. A diverse 20 beats a homogeneous 50.
- **Reviewer-bias asymmetry.** The user catches blind spots the agent can't see in itself (variant convergence, "AI-generated" feel, image-placement failures). One human review ≈ 3-5 self-critiques in lesson-discovery value.

---

## Next checkpoints

| checkpoint | total brands | action |
|---|---|---|
| 15 | +6 more | Confirm L-A through L-E recur; lock in Tier 1 spec-tightenings with empirical backing |
| 25–30 | +16–21 more | Tier 2 detector promotion threshold for recurring lessons (≥5 independent observations) |
| stop pushing | beyond 30 | Diminishing returns. Long-tail patterns better surfaced by real user complaints than speculative review |

---

*This file is the seed for the lesson corpus. When `notes/lesson-corpus-self-reinforcement.md` revives, this is review #1 of the planned 10+. Future reviews should follow the same structure: verbatim prose first, patterns extracted second, single-project findings tracked separately, cross-corpus links surfaced explicitly.*
