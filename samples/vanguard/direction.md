<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-28T11:09:30Z
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/_brand-extraction.json
    - PRODUCT.md
    - DESIGN.md
    - DESIGN.json
  synthesizedInputs: []
  stardustVersion: 0.2.0
-->
---

# Direction — Vanguard home refresh (presales)

## Section 1 — Initial direction (2026-04-28)

### Phrase (verbatim from user)

> Redesign this home page for presales: https://investor.vanguard.com/
> The customer is a brand owner who hasn't refreshed their site in 2–5 years and feels design fatigue.
> We're showing them a brand-faithful refresh — clearly better than what they have today, that they still recognise as themselves.
>
> Three variants:
>   A · Conservative refresh — same IA, modernised tokens
>   B · Compositional shift — same palette+type, different IA / different homepage thesis
>   C · Bold direction — push one element further while staying recognisably the brand
>
> Mode A: palette + typography pinned to the captured surface; reuse captured images in same semantic positions.
> Avoid: hero text on photo without scrim · 96px+ section padding · fabricated stats/quotes · editorial vocabulary · generic "premium-feeling" copy.

### Restatement (in dimensional vocabulary)

| dimension | resolved | how |
|---|---|---|
| register | **brand** | inherited from current/PRODUCT.md (public retail-investor home) |
| expressive axis | **committed** (preserved) | Mode A pins type and palette — expressive moves come through composition and motif precision, not new tokens |
| tone | **serious-trustworthy with quietly-warm imperatives** | preserved from captured voice |
| density | **balanced** (64px section padding) | explicit user guardrail (48-64px); 96px forbidden |
| distinctiveness | **distinctive** (preserved) → **distinctive+** for variant C | Mode A keeps the brand surface; variant C pushes one element further while staying recognisable |
| audience | **retail-investors-us** (preserved) | inherited |
| constraints | **brand-faithful · presales · no-fabrication · no-editorial-register · 48-64px padding · scrim-on-photo-text** | from user brief |

### Movements

| dimension | move | justification |
|---|---|---|
| expressive axis | (unmoved) | Mode A locks tokens — expressive uplift via composition |
| density | (unmoved, stamped explicitly) | balanced; 64px desktop / 48px tablet / 32px mobile |
| distinctiveness | (unmoved baseline) → A: same · B: same+IA-shift · C: pushed-one-element | each variant must declare a distinct compositional thesis |
| photography | (preserved) | reuse captured images in same semantic positions |
| motif precision | **sharpened** | photo-radius alignment, type scale pinned to 1.25 modular, single-message hero, redundant CTA-strip removed |
| IA (variant B only) | **rearranged** | goals-led homepage thesis (goals-first more aggressively than current); audience entry-points reorganised |
| one-bold-lever (variant C only) | **pushed** | (selected: typography scale + blush-band motif — see Variant C shape brief for the locked-in lever) |

### Gaps and clarifying questions

The user's brief is unusually specific (Mode A explicit, three-variant strategy named, anti-references enumerated, "proceed without confirmation"). No dimensions are underspecified to a degree that would change the plan.

**No clarifying questions asked.** Per the brief: proceed and stop only on (a) extraction failure, (b) insufficient brand signal, (c) hard-rule conflict.

### Divergence resolution

**Mode A — brand-faithful** is active. Per `divergence-toolkit.md` § Mode A:

- **Font deck:** `brand-inherited` — `picked_by: "user-constraint"`. FF Mark (canonical), Mona Sans / Inter Tight as license-free stand-in for prototype rendering.
- **Palette:** inherited from `_brand-extraction.json`. One additive token (`--blush-deep #FFD7D7`) — derived not invented; same hue family, used in Variant C only.
- **Decade:** rolled → 2026 incremental refresh of the captured 2024-2025 surface. Not a decade-shift; a year-shift.
- **Craft:** institutional-modern · public-radio-sponsor (anchor-reference: captured Vanguard-2025).
- **Register:** trusted-by-default · plainspoken · coaching-warm (anchor-reference: captured voice).
- **Ground family:** stark-white inherited; **brand-faithful override** triggered (Mode C from divergence-toolkit) — the seed roll that would have suggested a deeper ground gets reapplied as the alt-section blush band, not as the page ground.

**Brand-faithful inversions** (mechanical patterns) recorded in `DESIGN.json.extensions.divergence.brand_faithful_inversions[]`:

1. Hero rotator → single-message hero
2. Hero text on photo (no scrim) → hero-w-scrim component
3. Mismatched photo radius (0px in 32px card) → 24px photo / 32px card alignment
4. Ad-hoc type scale (1.22 average) → modular 1.25 ladder pinned to captured sizes
5. Redundant sub-hero CTA-strip → hero carries primary CTAs, single bottom-funnel strip
6. Section-padding-as-separator → 1px surface-line divider for same-ground sections

**Anti-toolbox audit** (always run): six AI-default refresh-slop moves blocked, three additive moves justified. See `DESIGN.json.extensions.divergence.anti_toolbox_audit`.

### Plan — commands and order

This is a presales-mode 3-variant render, not a full impeccable polish-pass. The mapped command sequence is:

1. **stardust:extract** (done) — captured the brand surface from the home.
2. **stardust:direct** (done — this file) — authored target PRODUCT.md, DESIGN.md, DESIGN.json against Mode A.
3. **stardust:prototype × 3** — author three shape briefs, then render three proposed pages (`home-A-proposed.html`, `home-B-proposed.html`, `home-C-proposed.html`) and a single before/after viewer (`home.html`) that shows the captured fold next to each variant.

Each variant must:
- declare a **distinct compositional thesis** at the top of its shape brief (three reskins of the same layout = failure)
- satisfy at least one specific captured Brand Personality trait visibly through composition
- enact at least one of the six brand-faithful inversions
- avoid every entry on the anti-toolbox blocked list
- reuse captured photography in the same semantic positions

### Pages affected

- `home` — `extracted` → `directed` (single page in scope)

### Pages marked stale

None. No prior prototypes existed.

### Confirmation

Per the user brief: "Run all phases without stopping for confirmation." The plan is executed without an interactive go-ahead. Stop conditions are (a) extraction failure, (b) insufficient brand signal, (c) hard-rule conflict — none triggered.
