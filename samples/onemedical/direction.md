<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-28T16:13:00Z
  readArtifacts:
    - stardust/state.json
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
  synthesizedInputs: []
  stardustVersion: 0.2.0
-->
---
title: "presales: brand-faithful refresh of the OneMedical home, with three variants A/B/C"
resolvedAt: 2026-04-28T16:13:00Z
toolkitVersion: "v1.0 (stardust v2)"
schemaVersion: 1
mode: "A — brand-faithful (palette + typography pinned)"
---

# Active direction (2026-04-28T16:13:00Z)

## Phrase

> Redesign the OneMedical home page for presales. The customer is a brand owner who hasn't refreshed their site in 2-5 years and feels design fatigue. We're showing them a brand-faithful refresh — clearly better than what they have today, that they still recognise as themselves. Not a rebrand. Not editorial reimagination. Three variants: A faithful + improvements, B new direction 1, C new direction 2. Brand-faithful Mode A: palette + typography pinned.

## Restatement

The redesign moves OneMedical's home from a familiar, ad-hoc-scale, multi-CTA-redundant 2020-template execution toward a tighter, more confident commercial brand surface. The brand identity (jade + melon + cream palette, GT Super Display + Ginto, pill CTAs, rotating-services h2 signature) is preserved verbatim. Density stays balanced (sectionPadding desktop 56px) — the brief explicitly REFUSES editorial-airy. Three variants serve three presales questions: A is the green-light option, B and C amplify two distinct captured traits to provoke a creative discussion.

## Movements

- **register** — `brand` (inherited from `current/PRODUCT.md`)
- **expressive axis** — pinned (Mode A — palette and typography locked)
- **tone** — pinned (warm-direct, encyclopedic-but-human, optimistic)
- **density** — `airy (96px)` → `balanced (56px desktop)` — moved by user brief; explicit REFUSE editorial-airy
- **distinctiveness** — `familiar (template-execution)` → `distinctive (brand identity surfaced)` — same brand, same content, sharper execution
- **audience** — unchanged (consumer + employer-benefits buyer)
- **constraints** — `brand-faithful Mode A`, `images-reused-in-semantic-position`, `IA-priority-preserved`, `no-fabricated-stats-customer-logos-quotes`

## Gaps and questions

None — the user brief was sufficiently specific. Density (balanced) and Mode A (brand-faithful) were both explicitly stated.

## Anchor references

- (none stated by user)
- The Generic-2026-SaaS silhouette is explicitly listed as anti-reference.

## Anti-references

- The Generic-2026-SaaS silhouette (toolkit § 1) — full-bleed gradient hero, single h1, three feature columns below, dark-mode-by-reflex.
- Clinical/medical aesthetic (slate / navy / blue-and-white hospital).
- Big-pharma corporate B2B (slate backgrounds, glass-tower stock, "innovation in healthcare" register).
- Telehealth-app SaaS (purple-cyan gradient, abstract geometry, chatbot-led hero).
- Editorial-airy reflex (96px+ section padding) — REFUSED by brief.
- Editorial-vocabulary naming reach ("atelier", "mise-en-place", etc.) — anti-pattern called out by brief.

## Divergence inputs

- **mode** — `A — brand-faithful` (palette + typography pinned)
- **seed** — `OneMedical|2026-04-28` MD5: `2020s-now × modern-editorial-warm × consumer-healthcare-warm × stark-white-with-cream-alt`
  - decade: 2020s-now (consumer healthcare brand surface, captured 2026)
  - craft: modern-editorial-warm (serif display + soft photography)
  - register: consumer-healthcare-warm (inherited from current)
  - ground-family: stark-white with cream alt-section
  - **picked_by** — inherited from captured / user-constraint
- **font deck** — `brand-inherited` (GT Super Display + Ginto), picked_by: user-constraint
- **palette** — `inherited from _brand-extraction.json` (jade / deep-jade / emerald / melon / hero-blue / cream / ink), picked_by: user-constraint
- **anti-toolbox audit** — 1 hit (Sticky top navigation), justified by inherited site convention + healthcare consumer page conversion path
- **brand-faithful inversions:**
  - `#ffffff` retained as page ground (existing brand decision; #fff is canonical for OneMedical). The 'no pure black/white' impeccable rule is inverted per brand-faithful direction.
  - Color tokens retained in hex format (matches captured brand surface). OKLCH applies to new authoring; this is inheritance.
  - Saturated jade `#005450` retained as the primary brand color (existing canonical voice). The agent-default reflex toward tinted-neutral primaries is inverted per brand-faithful direction.
  - Sharp 0px corners on cards softened to 4px (a brand-faithful nudge that matches the 36px pill family). The agent-default reflex toward 8-12px rounded is held back per brand-faithful direction.

## Three variants — proposition matrix

| variant | role | what's amplified | what's NOT |
|---|---|---|---|
| **A** | green-light option | Identified improvements applied EXACTLY: tighter type scale, contrast scrim on hero, fewer CTAs, photo-led card upgrade, token contract. Same IA, same composition. | No creative reach. No new sections. No new IA. The "yes-that's-us" variant. |
| **B** | "What if we leaned into the encyclopedic-but-human voice?" | The rotating-services h2 — the brand's most ownable pattern — is promoted to a hero/section-anchor surface. The conditions list becomes a navigable browse surface with the warm-direct voice doing more work. | NOT bolder fonts, NOT more padding. Same brand surface, IA reorganised around the conditions-first voice trait. |
| **C** | "What if we leaned into the photography as a lead?" | The captured photography (Meditation, Exam Room, Pharmacy, App-on-phone, Video poster) becomes the hierarchy carrier — full-bleed photo-led sections, photo-with-caption editorial pacing rather than icon-grid pacing. Story-led rather than feature-led. | NOT extreme airy, NOT 120pt fonts. Photo-led hierarchy with the same density envelope (56px desktop). |

Variant differentiation: A retains the captured 11-section sequence; B reorders so conditions-browse rises into the hero context (≥2 changes); C drops the icon-grid in favour of photo-led pacing and merges 2 cta-bands into one (≥2 changes).

## Command sequence (proposed)

1. `$stardust direct` — write target PRODUCT.md / DESIGN.md / DESIGN.json / direction.md (this command).
2. Author `stardust/prototypes/home-improvements.md` — load-bearing weakness list, read by all 3 variant briefs.
3. For each variant in [A, B, C]:
   - Author `stardust/prototypes/home-{a,b,c}-shape.md` — page-shape brief naming the section sequence and the variant-specific amplification.
   - Render `stardust/prototypes/home-{a,b,c}-proposed.html` — direct authoring (impeccable not available as a runtime skill in this environment per setup; we honor the format-spec contract instead).
4. Compose viewer at `stardust/prototypes/home.html` — three iframes side-by-side rather than two, given the presales brief.

## User confirmation

> "PROCEED. Run all phases without stopping for confirmation." — explicit in user brief.

## Pages in scope

- `home` (the only extracted page; the redesign is single-page per the presales brief)
