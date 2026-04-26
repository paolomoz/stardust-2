<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-04-26T13:15:00Z
  readArtifacts:
    - stardust/direction.md
    - stardust/current/_brand-extraction.json
  synthesizedInputs: []
  stardustVersion: 0.2.0
-->
---
name: Aurora Coffee
description: Indie publishing meets specialty coffee. Riso-print register, zine-maximalist type, Vintage Cottage Charm palette, asymmetric editorial layouts.
colors:
  ink:    "#54494B"
  ground: "#F1F7ED"
  sage:   "#91C7B1"
  rose:   "#B33951"
  pollen: "#E3D081"
typography:
  display:
    fontFamily: "Abril Fatface"
    fontSize: "clamp(3rem, 9vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  heading-md:
    fontFamily: "DM Serif Display"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "DM Serif Display"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  meta:
    fontFamily: "Special Elite"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.04em"
  marginalia:
    fontFamily: "Homemade Apple"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0"
rounded:
  primary: "0px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  "2xl": "96px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.ground}"
    typography: "{typography.meta}"
    rounded: "{rounded.primary}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.primary}"
    padding: "12px 24px"
  pill-meta:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
---

## 1. Overview

Aurora Coffee's visual system is **indie publishing, applied**.
Vintage Cottage Charm palette anchors the page in a sage-green-ink
register; Abril Fatface and DM Serif Display do the heavy lifting on
display type; Special Elite handles editorial metadata; Homemade Apple
appears as marginalia in a few load-bearing spots. The grid is
broken on purpose. Riso-print misregistration is encoded as a 1px
offset between two flat fills on the hero headline.

## 2. Colors: Vintage Cottage Charm

Five colors, sourced from the bundled stardust palette library
(v0.6.0).

- **Ink** (`#54494B`) — primary text, deepest grounds.
- **Ground** (`#F1F7ED`) — page background. Warm-cool tinted
  near-white; passes the cream-family test (`L=96`, `R-B=4` →
  `is_warm` is FALSE → not cream). Routes to `monochrome-tint` per
  divergence-toolkit § 2.
- **Sage** (`#91C7B1`) — secondary surface, button hover, accent
  panels. The "this isn't cream" signal.
- **Rose** (`#B33951`) — primary CTAs, the one saturated voice in
  the system. Anchor of the palette. WCAG AA at 4.95:1 against
  Ground.
- **Pollen** (`#E3D081`) — third accent. Used on dark surfaces only
  (decorative dot, marginalia underline) — does not pass AA against
  Ground for body text.

Source: <https://coolors.co/54494b-f1f7ed-91c7b1-b33951-e3d081>.

## 3. Typography: Zine-Maximalist Deck

- **Abril Fatface** — display only, hero headline.
  `clamp(3rem, 9vw, 7rem)`. Tight 0.95 line-height.
- **DM Serif Display** — heading and body. Yes, body too — the
  register is "small-press publication", and the serif body is
  load-bearing for the print feel. Body 18px / 1.55.
- **Special Elite** — typewriter monospace. Metadata, captions,
  cup-note callouts, button labels. 14px / 1.4 with `0.04em`
  tracking.
- **Homemade Apple** — handwritten marginalia. Used in *exactly two*
  places per page (the rule is "every appearance must justify
  itself"). 20px / 1.4.

Type ratio across display-md-body: ≈ 5.6 / 1.5 / 1.0 (well above the
brand-register 1.25 minimum).

## 4. Elevation

No box-shadows. The system uses **flat fills + 1px hard-edge
offsets** to encode riso-print misregistration on display type. A
single `offset 4px 0` translation between two flat fills, no blur, no
opacity. Feels printed, not floating.

## 5. Components

- **`button-primary`** — Rose fill, Ground text, Special Elite type,
  square corners. No shadow.
- **`button-secondary`** — Transparent, Ink text, 1px Ink underline
  used in place of border (link-feeling, not button-feeling).
- **`pill-meta`** — Sage fill, Ink text, fully pill-rounded. Used on
  cup-note callouts (`Single origin · Ethiopia · Yirgacheffe`).
- **`editorial-split`** — Asymmetric two-column layout (3 / 5 ratio
  by default; flipped on alternate sections). Replaces the
  three-feature card grid.
- **`marginalia`** — Homemade Apple inline annotation that sits in
  the gutter, indented with a 1px Ink rule. Caps at 2 per page.
- **`riso-display`** — The composite hero treatment: Abril Fatface
  set in Ink, with a 4px-offset Sage duplicate behind it. Produces
  the print-misregistration effect.

## 6. Do's and Don'ts

**Do**
- Lead with the farm name, the country, the cup notes — names earn
  the warmth that adjectives default to.
- Use Sage as a *surface*, not a stripe. Whole sections background
  in Sage are correct; 4px Sage borders are not.
- Set marginalia in Homemade Apple where a footnote would otherwise
  go. Twice per page maximum.
- Square corners on all primary surfaces. Pills are reserved for
  meta tags.

**Don't**
- Use blue. Anywhere. Even by accident in an SVG icon.
- Set body text in Special Elite. It is monospace meta — readability
  collapses past three lines.
- Set marginalia more than twice per page. After the third
  appearance, it stops feeling annotated and starts feeling chaotic.
- Default to a three-up card grid for "features" — that IA is
  category-conventional and is the legacy structure the redesign is
  breaking.
- Use box-shadows. The flat-fill misregistration is the elevation
  vocabulary.
