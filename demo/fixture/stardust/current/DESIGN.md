<!-- stardust:provenance
  writtenBy: stardust:extract
  writtenAt: 2026-04-26T12:12:00Z
  readArtifacts:
    - https://aurora-coffee.example.com/
    - stardust/current/_brand-extraction.json
  synthesizedInputs: []
  stardustVersion: 0.2.0
  note: DESCRIPTIVE snapshot of the EXISTING site's visual tokens.
-->
---
name: Aurora Coffee (current)
description: Generic specialty-coffee landing template. Inter type, blue accent, warm-cream ground, 4pt scale.
colors:
  cream: "#FAF7F2"
  ink: "#1F1B17"
  blue: "#3B82F6"
  brown: "#7B5E3F"
  mute: "#9C9389"
typography:
  heading:
    fontFamily: "Inter"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
rounded:
  primary: "8px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  "2xl": "96px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.cream}"
    typography: "{typography.body}"
    rounded: "{rounded.primary}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.blue}"
    typography: "{typography.body}"
    rounded: "{rounded.primary}"
    padding: "12px 24px"
---

## 1. Overview

Aurora Coffee's current visual system is a generic specialty-coffee
landing template. Inter throughout, a single blue accent on every
CTA, warm cream ground, brown text used decoratively in a few places.

The system has no distinctive moves. Heading scale, button shape,
spacing rhythm, and shadow stack all match the median SaaS-cafe
template the assistant would generate from a five-word brief.

## 2. Colors

The palette is uniformly low-saturation except for the accent
blue (`#3B82F6`), which is unmodified Tailwind blue-500. Text is
near-black, ground is near-white-warm. Brown (`#7B5E3F`) appears
sporadically in icons but is not load-bearing.

## 3. Typography

Inter at 16px base. Type scale ratio 1.25. Body 1.55 line-height,
heading 1.15. Letter-spacing -0.02em on headings. No display face;
the system uses heavier Inter weights for headlines.

## 4. Elevation

`0 1px 2px rgba(0,0,0,0.06)` on buttons, `0 4px 16px rgba(0,0,0,0.08)`
on cards. Two-level elevation only.

## 5. Components

Five components in use: `button-primary`, `button-secondary`, `card`
(used 3× in the features grid), `nav`, `footer-block`. Each is plain
and category-conventional.

## 6. Do's and Don'ts

Do's: keep things friendly and approachable.

Don'ts: anything category-defying — the current system has no
codified don'ts.
