<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-26T13:15:00Z
  readArtifacts:
    - stardust/direction.md
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
  synthesizedInputs: []
  stardustVersion: 0.2.0
  note: |
    PROJECT-ROOT target PRODUCT.md, authored directly using
    impeccable's teach.md as format spec. The descriptive snapshot
    of the EXISTING site is at stardust/current/PRODUCT.md.
-->
# Product

## Register

brand

## Users

**Primary:** Gen Z college and first-job buyers (18-26, urban,
design-aware) who pattern-match indie publishing and Bandcamp /
Are.na visual culture more than Stripe / Linear / Notion. They drink
coffee but they also collect zines, follow small presses, and buy
beans as much for the bag design as for the roast.

**Secondary:** weekend baristas and home brewers in the same
demographic who have opinions about extraction time and grinder
burrs but resent the gatekeeping tone the third-wave coffee category
defaults to.

## Product Purpose

Aurora Coffee sells single-origin specialty beans by subscription
and runs one cafe. The site is a marketing surface for a small
business with a small budget and a real point of view. Its job is to
make a Gen Z buyer who has never heard of Aurora **want the bag in
their kitchen** within 20 seconds of landing.

## Brand Personality

Aurora is the indie zine of specialty coffee. It is:

- **Specific.** Names farms, cup notes, and roast dates without
  apologising for the detail.
- **Self-aware.** Funny about the category's pretensions without
  being too cool for them.
- **Tactile.** Print-feeling, off-register, hand-set. The site reads
  like a small-press publication, not a deck.
- **Not gatekeeping.** Beginners are welcomed; the V60 / Aeropress /
  Chemex distinctions are introduced as a feature, not a barrier.

## Anti-references

- **Generic-2026-SaaS silhouette** (oversized sans-serif hero +
  two-button CTA pair + sticky top-nav + serial-marker footer). This
  is the trap "expressive" most often falls into.
- **Cream-by-default ground** for visual identity. Aurora is in
  coffee, not paper-publishing — the cream rule (divergence-toolkit
  § 1) does not exempt it. Seed routes to `monochrome-tint`.
- **Unmodified Tailwind blue** (#3B82F6) as the only accent. The
  current site uses it; the redesign removes it entirely.
- **Three-feature card grid** as the IA after the hero. Replaced
  with a single rotating editorial split.

## Design Principles

1. **Print, not platform.** Every page reads like a small-press
   publication: headline-driven, text-set with measure, illustrative
   over photographic. Maps directly to the `expressive axis →
   committed` movement.
2. **Names over adjectives.** Naming a farm, a cup note, a varietal,
   or a roast date beats reaching for "lovingly" / "thoughtfully" /
   "crafted". Maps to `tone → playful` (specifics carry warmth in a
   way adjectives don't).
3. **Asymmetry on purpose.** The grid is broken intentionally where
   it would be conventional to use it. Maps to `distinctiveness →
   distinctive`.
4. **Roast date in three colors.** Information density is welcomed,
   not hidden. The single most-loved feature for the target audience
   is "what was actually in the cup", and the design surfaces that.
   Maps to `density: balanced (kept)` plus principle 2.

## Accessibility & Inclusion

- WCAG AA min on every text/background pair (Vintage Cottage Charm's
  ink-on-ground passes 12.4:1; rose-on-ground passes 4.95:1; mustard
  used only on dark contexts).
- Zine-maximalist deck includes `Special Elite` (monospace) and
  `Abril Fatface` (display) — both metric-matched fallbacks declared
  for FOIT/FOUT resilience.
- Touch targets 44×44px minimum even in the editorial-density
  sections.
- All decorative riso textures purely CSS — no images required to
  understand the page.
