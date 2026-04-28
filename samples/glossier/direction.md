<!--
_provenance:
  writtenBy: stardust:direct phase 5
  writtenAt: 2026-04-28
-->

# direction.md — Glossier homepage refresh

## Active

**Phrase (verbatim):**
> Brand-faithful refresh. Mode A: pin palette and typography to the
> captured surface. Goal is presales — clearly better than the current
> site, recognisable as the same brand. Density: balanced (not airy)
> for product-commerce home. The three prototype variants downstream
> will each pick a different refresh strategy (conservative,
> compositional, bold).

### Restatement (in dimensional vocabulary)

A brand-faithful refresh of Glossier's homepage. The palette
(white/black/Glossier Pink/sale-orange/greys) and typography (Apercu
single-family) are pinned. The refresh moves the page on
**distinctiveness** (sharpen the composition out of "default
Apercu-on-white" cliché), **type scale** (introduce a modular ratio
and a display step the brand currently lacks), **rhythm** (vary
section padding by content type instead of flat) and **chromatic
balance** (earn a second Glossier Pink moment in-body, not just
footer). The brand voice (lowercase intimate hero + ALL-CAPS micro
labels) is preserved as identity, not refreshed.

### Movements

| Axis | From | To | Notes |
|---|---|---|---|
| `expressive` | restrained | restrained | one-family discipline is the brand |
| `distinctiveness` | familiar | distinctive | sharpen composition; commit to display step |
| `density` | flat 32–48 | balanced + 3-tier rhythm | stamped: balanced. tight + loose tiers per content type |
| `tone` | intimate | intimate | lowercase voice preserved |
| `decade` | 2025-now | 2025-now | inherited |
| `audience` | women 18–35 | unchanged | inherited |
| `ground-family` | stark-white | stark-white | Mode C override (brand-faithful) |
| `type-scale` | ad-hoc 12/14/16/20 | modular 1.25 incl. 72px display | new display step within Apercu |
| `palette-distribution` | pink only in footer | pink in footer + one in-body moment | variant-specific placement |
| `tag-policy` | up to 5 per card | 1 priority per card | promo > scarcity > status |
| `hero-contrast` | photo-darkness | deliberate device (scrim / plate / side-cut) | variant-specific device |

### Resolution gaps

None — the user pre-resolved the brief. Mode A is explicit, density
is stamped (balanced), and the variant strategy (A conservative / B
compositional / C bold) is pre-named so prototype phase composes
three deliberate theses.

### Mode

**A · Brand-faithful** — palette and typography pinned to the
captured surface.
**C · Ground-family override** — seed `ground_family` would have
rolled in Default mode; Mode A defers to brand `#FFFFFF`.

```
Divergence (brand-faithful mode):
  decade           inherited   → 2025-now
  craft            inherited   → web-modern
  register         inherited   → brand-commerce
  ground-family    inherited   → stark-white (Mode C: brand-faithful override)
  font deck        inherited   → Apercu (existing site stack)
  palette          inherited   → 8-color Glossier set
```

### Anti-toolbox audit

Run on the resolved direction. Hits:

- (none) — brand-faithful mode means the palette and typography
  inversions are documented inline in `DESIGN.json.extensions.divergence.brand_faithful_inversions[]`,
  not anti-toolbox hits per se.

The introduced `display: 72px` step is **not** an "AI-airy editorial"
hit because (a) the rest of the page stays balanced (64px section
padding, not 96px+), (b) it's a single moment per page (the hero), and
(c) the brand currently has no display step at all — adding one is
a calibrated move, not a reach for editorial vocabulary.

### Command sequence

```
$stardust prototype home   # but: produce 3 variants per the user's brief
  variant A · conservative refresh   (same IA, refined tokens)
  variant B · compositional shift    (rearranged IA, different thesis)
  variant C · bold direction         (one element pushed further)
```

Per the user brief, prototype phase produces three proposed files
(`home-A-proposed.html`, `home-B-proposed.html`, `home-C-proposed.html`)
and a viewer (`home.html`) that hosts all four panes
(current + A + B + C). Each variant declares a distinct
compositional thesis in its `home-<variant>-shape.md`.

### Hard rails (forwarded to prototype)

- All three variants stay in Mode A (palette + type pinned)
- Density: balanced (64px desktop default; 40 / 64 / 96 tiers)
- One priority tag per product card (max)
- No 96px+ section padding on multi-section pages, except as the
  *one* loose moment per page
- Hero needs a deliberate contrast device — never "the photo is dark
  at the bottom"
- Reuse captured imagery via the public CDN URLs in same semantic
  positions (hero stays hero)
- Section labels stay close to current vocabulary (no editorial
  invention)
- F-002 placeholder visual signature on any value not in
  `current/pages/home.json`
- Each variant must satisfy at least one specific tone trait from
  PRODUCT.md § Brand Personality (lowercase intimacy, single-family
  discipline, photographic warmth, Glossier Pink as punctuation, real
  over staged, anti-luxury)

### Variant theses (declared up-front; refined in shape briefs)

**A · Conservative refresh** — *"Yes, that's us, refreshed."*
Same IA, same section order. Modernised tokens: modular type scale,
hero display step, three-tier rhythm. The chrome gets sharper. Glossier
Pink earns its second moment in a tinted story-band. The risk-averse
stakeholder picks this.

**B · Compositional shift** — *"What if the homepage worked
differently?"* Same palette, same typography. Rearranged IA: lead
with a JTBD-led shop-by-need entry (Skin / Eyes / Lips / Body /
Fragrance) before the campaign hero. The campaign and the sale
become the second and third surfaces. Story bands fold into a single
"what people are saying" rail. The "are we open to rethinking the
page?" option.

**C · Bold direction** — *"Are we ready to commit to a single image
language?"* Same palette, same typography. Pushes the **typography
scale** further: hero at 96–120px, headline display deployment also at
section openers. Photography treatment shifts to a single-image-per-section
silhouette (one product, large, on a tinted-pink frame) instead of
5-up grids of small thumbs. The sale-orange recedes to a single
inline price strikethrough — the page stops shouting promo. The
"would we be more distinctive if we committed harder?" option.

Each variant must read as a different *strategy*, not three reskins
of the same layout — explicitly tested when the proposed files are
inspected side-by-side.
