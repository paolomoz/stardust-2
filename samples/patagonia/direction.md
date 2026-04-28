<!--
provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-04-28T11:18:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
  synthesizedInputs: []
  stardustVersion: 0.2.0
-->

# Direction (active)

## Phrase (verbatim)

> "Redesign this home page for presales. The customer is a brand owner who hasn't refreshed their site in 2–5 years and feels design fatigue. We're showing them a brand-faithful refresh — clearly better than what they have today, that they still recognise as themselves. Not a rebrand. Not editorial reimagination."
>
> "PROCESS. Extract → direct → prototype × 3 variants. Brand-faithful Mode A: palette and typography pinned to the captured surface."

## Restatement (in dimensional vocabulary)

A **brand-faithful refresh** for a presales engagement: keep palette, typography, photography in their semantic positions; refine the type scale, tighten compositional rhythm, sharpen motif precision, fix specific weaknesses (hero-text-without-scrim, ad-hoc type scale, empty token layer, single-CTA-verb fatigue). Output three variants representing different refresh strategies (conservative / compositional / bold) so the customer can self-select their appetite for change.

## Movements

| Axis | From (current) | To (target) | Notes |
|---|---|---|---|
| **expressive** | committed | committed | Preserve current confidence — do not amplify or dampen. |
| **distinctiveness** | distinctive | distinctive | The brand is already distinctive (eggplant ribbon, custom wordmark, Ridgeway, photographic density). Refresh sharpens it; does not invent new distinction. |
| **density** | dense (commerce) | **balanced** (refined commerce) | 64px desktop section padding; 48–56px tablet; 32px mobile. Tighter than editorial defaults. Per user brief: "considerably tighter than Pentagram-style cases." |
| **register** | brand | brand | Inherited. Not a product/dashboard. |
| **tone** | plainspoken / declarative / activist | plainspoken / declarative / activist | Voice is one of the brand's strongest assets — preserve verbatim. |
| **audience** | dual: outdoor practitioners + conscience-led consumers | unchanged | Refresh must continue serving both without leaning into either. |
| **palette** | inherited (Mode A) | inherited | Black / white / eggplant `#500778`. No invented colours. |
| **typography** | inherited (Mode A) | inherited (Ridgeway Sans) | No fonts outside the captured surface. |

## Gaps and resolutions

The user's brief explicitly removed gating questions ("PROCEED. Run all phases without stopping for confirmation"). Outstanding ambiguities are resolved by deterministic default per the brief constraints:

- **Density tier.** Defaulted to `balanced` (64/48/32). User brief explicitly rejects airy editorial register.
- **Variant differentiation strategy.** User specified three distinct strategies in the brief — conservative / compositional / bold — and required each to declare a distinct compositional thesis. Encoded in the per-variant shape briefs (Phase 2 of prototype).
- **Content fidelity.** User brief explicitly forbids fabricated content. Every literal stat / quote / address / logo lockup beyond what is in `current/pages/home.json` will use the `data-placeholder` F-002 visual signature.

## Resolved divergence inputs (Mode A)

```yaml
mode: brand-faithful (Mode A)
seed:
  decade:        2025-now (rolled, but anchored to the brand's already-current visual era)
  craft:         documentary-photographic (inherited; preserved)
  register:      brand (inherited; preserved)
  ground-family: stark-white (inherited; brand-faithful override)
font_deck:
  name: brand-inherited (Ridgeway Sans single-family system)
  picked_by: user-constraint
palette:
  source: inherited from _brand-extraction.json
  picked_by: user-constraint
  role-renaming-applied: false
brand_faithful_inversions:
  - retain pure-black #000 verbatim (would otherwise quantise to a near-black per impeccable's no-pure-black rule, but the brand's text is set in pure black at scale)
  - retain pure-white #ffffff verbatim (background)
  - retain hex format (no OKLCH conversion required) — inherited values stay in their captured form
anti_toolbox_audit:
  - pass: dual-radius CTA pattern (brand-specific signature, not a stardust default)
  - pass: tinted forest-green card shadow (brand-specific, not a stardust default)
  - pass: eggplant utility ribbon at top (brand-specific)
  - flagged but justified: dense 6-up tile grids (would normally read as "dated grid"; here it is the brand's gear-page register)
```

## Variant strategies (driving Phase 2 / prototype)

The three variants share the design system above. They diverge in the **shape brief** — the per-page compositional thesis.

### Variant A — Conservative refresh

**Compositional thesis.** Same IA, same section order. The site you have today, with every token and every motif refined.

**Section sequence (preserved verbatim from current home).**
1. Eggplant utility ribbon (Roaring Journals · Activism · Business Unusual + announcement)
2. Centred-wordmark primary header (5-item nav + utility icons)
3. Full-bleed photo hero ("Outlast the Winter")
4. 6-up activity tile grid (Trail Running / Surf / Snow / Climbing / Mountain Biking / Fly Fishing)
5. Secondary photo hero ("Stay Out, Stay Dry")
6. 6-up category tile grid (Jackets / Fleece / Packs & Gear / T-Shirts / Yulex / Workwear)
7. Tertiary photo hero ("Life's in the Bag")
8. 5-column values row (5 brand pillars + read-mores)
9. Mega-footer (Subscribe + Need Help + More Info)

**Refinements (every refinement here is mechanical / compositional, never reinventive).**
- Modular type scale snapped to **1.25** (major-third): 14 / 16 / 20 / 25 / 32 / 40 / 50 / 64.
- Section padding rhythm aligned: 64px desktop (was ~70px ad-hoc).
- Hero gets a **vertical fade scrim** (transparent → black `rgba(0,0,0,0.45)` over bottom 40% of hero) — fixes the unscrimmed white headline.
- Tile gutters tightened to a clean **8px** scale (was 10–12px mixed).
- Pill CTAs gain a **2px hairline outline** in the secondary state (currently the white pill on photography is sometimes invisible against a white sky in the photo).
- Eggplant ribbon gains a tiny **subtle 1px lower border** in `rgba(255,255,255,0.18)` to settle it.
- The forest-green tinted shadow gets promoted to **all** card hover states (currently only on a few).
- Inputs go from 1px hard black border to **1.5px** (subtle weight bump).
- Token layer added (`:root` block) so every value is now declarative.

### Variant B — Compositional shift

**Compositional thesis.** Same palette, same typography. **Different IA.** The home stops being "category showcase" and becomes "pick your sport". Activism gets elevated from the ribbon into a real section.

**Section sequence (re-ordered with two new hierarchical changes).**
1. Eggplant utility ribbon — **same content, but reorganised**: "Activism · Roaring Journals · Business Unusual" (move activism first); announcement string moves to the right.
2. Centred-wordmark primary header — **unchanged**.
3. Full-bleed photo hero — **same hero photo, different copy strategy.** "Pick your sport." Subhead acknowledges the multi-discipline brand without category-funnelling.
4. **New: 6-up activity tile grid promoted directly under hero (it was already there but now it's the primary IA).** Same six activity tiles. Each tile gets a one-line eyebrow ("Cold-water surf gear" / "Alpine touring kit" etc.) above the activity name — addresses the "14 'Explore' verbs" tension.
5. **New: Activist commitment band.** A black surface running between the activity grid and the category grid, four-up: Worn Wear / Activism / Footprint / Profits to Planet. Pulls the values row's content forward into the page proper, not at the very bottom.
6. 6-up category tile grid — **unchanged composition**, but now serves as a secondary "or shop by what you wear" view.
7. Secondary photo hero ("Stay Out, Stay Dry") — **kept in this position**, between category grid and the closing values row.
8. **Reduced: values row goes from 5 columns to 2** (Ironclad Guarantee + Worn Wear), since the other three pillars moved up to the activist band. Less repetition.
9. Mega-footer — **unchanged**.

**Why this is the "we're rethinking how the page works" option.** The current home is structured around browse-paths first, conscience second (eggplant ribbon = thin, values row = penultimate). Variant B inverts: activity-first, activism-as-equal, products-second. Same brand voice; different page thesis.

### Variant C — Bold direction

**Compositional thesis.** Same palette, same typography family. Push the **typography scale and the photography treatment** further. Surface what stronger commitment to the brand's mythic register would look like.

**Section sequence — preserved from current, but key surfaces are amplified.**
1. Eggplant utility ribbon — **slightly taller** (10px → 14px vertical padding), letter-spacing increased (0.08em → 0.14em) for a statelier read.
2. Centred-wordmark primary header — **gains a serif eyebrow** ("Founded 1973 · Ventura, California") in 12px Ridgeway 400 above the wordmark, settling the page in time.
3. Full-bleed photo hero — **typography scaled up dramatically**: hero h1 goes from 64px to **clamp(72px, 8vw, 128px)**, weight 700, mixed-case set very tight (-0.025em letter-spacing). The "Outlast the Winter" line becomes the page's anchor. Subhead in 18px italic (the only italic on the site — singular accent).
4. 6-up activity tile grid — **becomes a 3-up + 3-up split** with the first row larger (each tile 1.5x). Still six activities, no fabricated content.
5. **Quote band — pulled from the brand's actual voice samples.** A single line of typography centred against the eggplant ground: "We give our profits to the planet." 56px, weight 500. No image, no CTA — the line carries it.
6. Secondary photo hero ("Stay Out, Stay Dry") — keeps composition but the headline matches the new larger scale.
7. 6-up category tile grid — **unchanged** (deliberately — Variant C does not also rearrange the IA; it keeps Variant A's structure and pushes type/photo).
8. Tertiary photo hero ("Life's in the Bag") — **letterboxed** with 64px black bands top and bottom (like a film still), with the headline in the lower band — cinematic register.
9. 5-column values row — **gains an oversized column-1**: "We give our profits to the planet." in 32px, the other four pillars stay at 18px. One pillar carries the band, the others support.
10. Mega-footer — gains an **oversized wordmark** at the very bottom of the footer (above the legal lockup), 200px wide, in black on the mega-footer's black ground (so it reads as an embossed lockup, not a logo repetition).

**Why this is the "are we ready to be more distinctive?" option.** No new colours, no new fonts. But the typographic register goes up two notches and the photographic register goes up one. Surfaces what stronger commitment would look like without leaving the brand.

## Anti-references (target)

- Aspirational lifestyle (Aritzia / Lululemon) — would lose the gear-page density.
- Generic 2026 SaaS silhouette (96px airy padding, gradient hero, faux-glass card hover).
- Editorial register (atelier / mise-en-place vocabulary, magazine-style multi-column body copy).
- Performance-tech with neon accents (Salomon-direction).
- Pentagram-airy nonprofit (NYT-Opinion-tier vertical breathing).
- Premium-feeling agency copy ("Discover our award-winning collection.").

## Constraints (hard)

- Mode A locked: palette and typography from `_brand-extraction.json`. No invented colours, no fonts outside Ridgeway Sans family.
- Photography: re-used via the captured public Shopify CDN URLs in **the same semantic positions** (hero photo stays hero; activity tile photos stay activity tiles). No swapping for stock or AI imagery.
- Density: 64px desktop section padding (balanced). Never go above 96px on a single section, never below 32px.
- Content sourcing: only literal copy from `current/pages/home.json` is allowed verbatim. Any other literal value must use the `[data-placeholder]` F-002 visual signature.
- Voice: every variant must hit at least one specific tone trait from `current/PRODUCT.md` § Brand Personality. The five traits are: plainspoken / unsentimental / practitioner-first / activist conviction / mythic.

## Command sequence (proposed)

```
$stardust prototype home   →  generates 3 shape briefs (home-A-shape.md, home-B-shape.md, home-C-shape.md) and 3 proposed renders (home-A-proposed.html, home-B-proposed.html, home-C-proposed.html), plus a 4-pane viewer (home.html) showing original + A + B + C side-by-side.
```

No iteration via `$impeccable live` is requested — this is a presales surface, not a hand-crafted production page.

## User confirmation

**Pre-authorised.** User brief: *"PROCEED. Run all phases without stopping for confirmation."*
