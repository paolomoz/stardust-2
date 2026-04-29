<!-- _provenance: writtenBy: stardust:direct; writtenAt: 2026-04-27T22:11:00Z; phrase: "redesign Virgin Atlantic home page to make it better"; mode: brand-faithful (type+palette pinned); 3-variant fan-out -->

# direction.md (Active)

## Phrase (verbatim)
> "Redesign the Virgin Atlantic home page to make it better. Pin typography and color palette. Reuse images strictly via public URL. Produce 3 distinct variants."

## Restatement (dimensional)
- **Register:** `brand` — flagship marketing/booking page; design IS the product.
- **Constraint set:** `brand-faithful` (type + palette pinned), `images-from-public-urls`, `single-page-scope`.
- **"Better" is underspecified** → resolve as a **3-variant fan-out**, each with a distinct thesis on what *better* means. Each variant moves different axes; together they bracket the design space the user can choose from.

## Mode
**Mode A — Brand-faithful** is active. Type (Gotham) and palette (Virgin red/ink/purple/champagne) inherited from `current/_brand-extraction.json`. Divergence rolled only on the non-locked dimensions (composition, expressive, density, distinctiveness, tone) — and rolled three times, once per variant.

## Variants

### Variant A — "Editorial sky"
**Thesis:** the current home shouts; Virgin's premium promise sells better through silence and confidence.
- **Movements:** distinctiveness `familiar→distinctive`, density `balanced→airy`, expressive `committed`, tone `serious-romantic`.
- **Composition:** one big idea above the fold (a sky, a destination, a single sentence); booking widget present but subordinate; long vertical rhythm with editorial spacing; one feature per fold.
- **Anti-toolbox audit:** no glassmorphism, no gradient-on-text, no centered-everything; serif accent allowed for one editorial pull-quote (kept inside Gotham via fallback rule — tracked, not breaking).

### Variant B — "Smart booking"
**Thesis:** most home-page visitors are returning to book. Reduce time-to-fare; make the page a tool.
- **Movements:** density `balanced→packed`, expressive `committed→restrained`, tone `confident-practical`, distinctiveness `familiar` (intentional — utility before signature).
- **Composition:** booking widget IS the hero, full-width, with ambient sky behind; routes/deals scannable in dense rows below; reward seats and Flying Club promoted by data, not prose.
- **Anti-toolbox audit:** no playful filler illustrations, no marketing copy where a price would do.

### Variant C — "Vivid Virgin"
**Thesis:** Virgin's edge is personality. The current site is too polite about it. Lean in — full-bleed crops, bigger type, the red louder.
- **Movements:** expressive `committed→drenched`, distinctiveness `familiar→singular`, tone `playful-confident`, density `balanced` (airier than current via fewer-but-bigger sections).
- **Composition:** full-bleed hero crop with oversized headline; red used as canvas, not accent, in one signature band; destinations as poster-style tiles; type set TIGHT and BIG.
- **Anti-toolbox audit:** no neon-on-black SaaS reflex; the loud is brand-specific Virgin red, not generic "vibrant".

## Pinned tokens (apply to all variants)
- **Headings & body:** Gotham, Helvetica, Arial, sans-serif. Weights 300/400/500.
- **Palette:** ink `#030c16`, primary `#da0530`, hover `#f92b47`, deep `#a70d2e`, secondary purple `#4f145b`, champagne `#bda05d`, white `#ffffff`, neutral line `#d7d8da`, neutral caption `#676d73`.

## Always-rolled (variant-specific)
- Spacing/density tier (variant-specific stamp).
- Composition + section order.
- Type **scale** (each variant picks its own ratio — A: 1.333 ratio editorial, B: 1.2 compact, C: 1.5 expressive).
- Hierarchy emphasis.

## Audience tuple
UK + US transatlantic leisure travelers, 30-65, mobile + desktop, encountering this page either at the start of a holiday-shopping session (variants A/C) or returning to complete a booking (variant B).

## Command sequence
- `stardust:prototype home --variants 3` (custom 3-variant fan-out, one proposed file per variant).

## Resolved at
2026-04-27T22:11:00Z. No prior direction; no stale flags.
