<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-28T09:25:00Z
  readArtifacts:
    - stardust/state.json
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
  synthesizedInputs: [divergence-seed]
  stardustVersion: 0.2.0
-->
---
title: "brand-faithful presales refresh — keep the brand, fix the surface"
resolvedAt: 2026-04-28T09:25:00Z
toolkitVersion: "v1.0 (stardust v2)"
schemaVersion: 1
mode: "Mode A (brand-faithful)"
---

# Active direction (2026-04-28T09:25:00Z)

## Phrase

> Brand-faithful Mode A — palette and typography pinned to captured surface. This is a presales tool. Customer is The Road Home. The customer's design team has 2–5 year design fatigue and wants a brand-faithful refresh that they will recognise as themselves. Not a rebrand.

## Restatement

We are showing The Road Home's design team a refresh of their existing home page that they recognise as **theirs, refreshed**. Not a new brand, not editorial reimagination. Palette and typography are pinned to what we captured. The signature mannerisms — alliterative tagline, ALL-CAPS declarative headings, pill CTAs, BW story portraiture, the road motif, the TRH-100 lockup, the three-doors IA — are preserved. Six tensions surfaced in extraction (hero scrim, IA collision, CTA fragmentation, ad-hoc scale, two-banner-color confusion, zero tokens) are addressed. Density stays at the brand's actual register (48–64px section padding), not the AI-default editorial-airy 96+. Three variants explore different refresh strategies (A conservative, B compositional shift, C bold) so the customer's design team has range, not a single proposal.

## Movements

- **register** — `brand` (inherited from `stardust/current/PRODUCT.md`); civic-institutional nonprofit, multi-audience landing
- **expressive axis** — `restrained → committed` (slight). The captured surface is restrained-balanced; the refresh commits a touch more (a major-third type scale, an explicit hero-scrim system, a clearer banner-color semantic). It does **not** become "drenched" or "expressive."
- **tone** — unchanged. Direct, civic, alliterative, empathetic.
- **density** — `balanced` (stamped explicitly; 48–64px section padding, not 96+). The user's brief named density as a constraint; defaulting to airy would be the AI-cliché failure mode.
- **distinctiveness** — unchanged. The brand is already distinctive in its category (civic-institutional, alliterative, BW story portraiture). The refresh sharpens the signature, doesn't push it further. (Variant C explores the "more distinctive" question.)
- **audience** — unchanged. Three audiences in parallel (people in crisis · donors · volunteers/partners) plus the implicit stewards.
- **constraints** — `brand-faithful (Mode A)`, palette pinned, type pinned, photography reused in same semantic positions, density: balanced (stamped).

## Gaps and questions

None — the user's brief explicitly resolved every dimension that would normally be a question. Density was named (`48–64px, not 96+`); register is inherited; audience is captured; expressive movement is bounded by `brand-faithful`. The standard density question is **skipped** because the user pre-stamped it.

## Anchor references

- (none — Mode A is anchored to the captured brand surface itself)

## Anti-references

- **Generic-2026-SaaS silhouette** (toolkit § 1) — explicitly guardrailed. Civic nonprofit must not read as Linear/Notion/Stripe landing page.
- **Editorial-airy / Pentagram-cause** — section padding 96+ rejected. The user named this directly: "most production brand sites are considerably tighter than Pentagram-style cases."
- **Cream-family page ground** — banned (toolkit § 1). Brand is `#FFFFFF` stark-white; no rebrand-as-vellum/kami/oatmeal permitted.
- **Triplet-cadence overload** (toolkit § 1) — at most one alliterative triplet per page (the canonical `Refuge. Resources. Relief.`). Any second triplet on the same page is rewritten.
- **Editorial-register naming reach** — variant names like "atelier" / "mise-en-place" explicitly forbidden by user brief; this is a product-commerce-and-civic brand, not an editorial brand.

## Divergence inputs

- **mode** — `Mode A (brand-faithful)` — palette and typography pinned to captured surface
- **seed** — `The Road Home|2026-04-28` MD5 → `1f34bbc5e7726b95ad2968bf3b29506b`
  - decade: **1930s** (`hash[0]=31 % 10 = 1`)
  - craft: **Plaster cast** (`hash[1]=52 % 18 = 16`)
  - register: **Tabloid** (`hash[2]=187 % 17 = 0`)
  - ground-family: **monochrome-tint** (`hash[3]=197 % 6 = 5`) — **OVERRIDDEN** to `stark-white #FFFFFF` per Mode C (brand-faithful ground override; captured brand ground is `#FFFFFF`)
  - picked_by: `deterministic`
- **font deck** — `brand-inherited` (HarmoniaSans + DIN Next LT Pro), `picked_by: user-constraint`
- **palette** — `inherited from current/_brand-extraction.json`, `picked_by: user-constraint`. Role-renaming applied (page-ground / ink / road-deep / road-mid / shelter-grey / banner-purple / centennial-red — brand-native).
- **anti-toolbox audit** — 0 hits. The captured brand surface itself drives the design; no anti-toolbox moves are reached for. Three considered moves were explicitly removed before authoring (Generic-2026-SaaS silhouette, cream-family ground, triplet-cadence overload — see DESIGN.json `extensions.divergence.audit_adjustments`).
- **brand-faithful inversions** — 8 emitted automatically against the captured surface:
  - **`#FFFFFF` retained** as page-ground (brand canonical white; "no pure white" rule inverted per brand-faithful)
  - **`#000000` retained** as primary text (brand canonical black; "no pure black" rule inverted)
  - **hex format retained** throughout (matches captured surface; OKLCH applies to new authoring, this is inheritance)
  - **0px corners retained** on cards/inputs/banners (brand uses square corners deliberately; "modern = rounded" reflex inverted)
  - **ALL CAPS headings retained** on display + section levels (81% of captured headings; "sentence case" reflex inverted)
  - **saturated `road-deep` retained** as primary brand color (tinted-neutral reflex inverted)
  - **BW portrait treatment retained** for story carousel (existing brand decision; "untreated source" reflex inverted)
  - **`centennial-red` reserved** to TRH-100 logo road-flag motif only (spread-accent reflex inverted; reserved-color rule applied)

### Variant divergence — dimension dominance

The seed (1930s × Plaster cast × Tabloid × ground-overridden) is genuinely complementary to the brand: 1930s is the civic / WPA-era register many of these institutions trace to; Plaster cast = solid monumental forms (the brand uses flat color banners as monumental section markers); Tabloid = bold declarative all-caps headlines (the brand's existing 81% uppercase signature). Each variant lets one dimension dominate while the others recede:

- **Variant A — Conservative refresh.** All seed dimensions recede; brand mannerism dominates verbatim. The lowest-risk option.
- **Variant B — Compositional shift (register-dominant).** Tabloid IA logic — front-page priority, classified-section logic, "above the fold" hierarchy — reorganises the page. Same palette and type; different IA.
- **Variant C — Bold direction (decade + craft dominant).** 1930s civic-monumental + Plaster-cast solidity push display type and surface treatment further. Larger 1930s-civic-poster scale on the hero; flat-banner monumental treatment for sections; same palette, same type, more commitment.

## Command sequence

1. `$stardust direct` (this command — write target PRODUCT.md / DESIGN.md / DESIGN.json + this direction.md)
2. `$stardust prototype --variant A` — Conservative refresh
3. `$stardust prototype --variant B` — Compositional shift
4. `$stardust prototype --variant C` — Bold direction

(The user's brief explicitly authorises all four phases without further confirmation; the prototype phase produces three variants in sequence.)

## User confirmation

> "PROCEED. Run all phases without stopping for confirmation."

(Implicit in the brief's explicit no-stop directive. Stop conditions: (a) extraction fails, (b) captured brand surface insufficient to differentiate three variants, (c) hard rule conflict makes brand-faithful constraint impossible. None applied — extraction succeeded with strong signal across all variant axes.)

## Pages in scope

- `home` (the only page extracted; this is a presales home-page-only redesign)

---

# History

(no prior direction)
