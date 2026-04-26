# stardust v2 demos

Working visual demonstrations of stardust's contracts. Each demo is a
small, self-contained artifact you can open in a browser to see what
the agent *would* produce when running the full skill — without
installing impeccable, running Playwright, or having a Claude Code
session.

## What's here

### `pick-palette.mjs`

Reference implementation of the palette picker described in
[`../skills/direct/reference/palette-picker.md`](../skills/direct/reference/palette-picker.md).
Reads the bundled 127-palette library, runs the keyword classifier
on a freeform description, scores and ranks candidates, rolls the
deterministic recommended pick, and renders the pick UI per § 4 of
the picker contract.

Usage:

```sh
node demo/pick-palette.mjs ["description"] [output-path]
```

Defaults: description = `"bold maximalist playful pop carnival"`,
output = `demo/sample-bold-pop.html`.

The script logs the resolved descriptor and the candidate list to
stdout, then writes a self-contained HTML file (no external CSS, no
external JS, no fonts) that opens directly in any browser.

### Pre-generated sample outputs

Three samples committed to the repo so you can open them without
running anything:

| File                                    | Description used                                        | Routes to        |
|-----------------------------------------|---------------------------------------------------------|------------------|
| `sample-bold-pop.html`                  | "bold maximalist playful pop carnival"                  | `saturated` ground, rainbow hue, energy 5 |
| `sample-moody-noir.html`                | "moody cinematic noir midnight nocturnal"               | `dark` ground, no other dimensions inferred (rest are `null`) |
| `sample-earthy-sage.html`               | "earthy sage natural ambient considered"                | `monochrome-tint` ground, green hue, energy 3 |

Each shows the descriptor extracted from the input phrase, five
candidate palettes scored against the library, and the deterministic
"recommended" pick highlighted in the accent color of that palette.
Page background and text colors come from the recommended palette so
each sample lives in its own visual world.

## What the demo proves

- The **classifier vocabularies** in `palette-picker.md` § 1
  produce reasonable dimension assignments on real-world phrases.
- The **scoring and ranking** in § 2 (ground match +100, hue match
  +50, hue-group loose match +20, sliding-window saturation/energy)
  produces useful top-5 candidates without false-positive noise.
- The **deterministic recommended pick** from `MD5(description + date)`
  is reproducible: re-running with the same description on the same
  day gives the same recommendation; tomorrow gives a different one.
- The **bundled library** (127 palettes, v0.6.0, scraped 2026-04-24)
  is well-formed: every palette parses, has a stable `path`, `name`,
  `source`, `anchor`, `hexes` (5 swatches), and the four
  classification dimensions.
- The **UI contract** in § 4 is realisable as a self-contained HTML
  page that respects impeccable's hard rules (OKLCH-friendly via
  `color-mix(in oklab, ...)`, no glassmorphism, no gradient text, no
  side stripes, ≥ 1.25 type ratio) and uses the recommended palette's
  own colors as the page chrome.

## What the demo does NOT prove

- That `$stardust direct` overall produces a good redesign direction.
  This demo only exercises Phase 2 of `direct` (the picker step).
  The full intent-reasoning + dimensional restatement + token
  authoring is not exercised.
- That the picker handles every plausible phrase. It handles the
  vocabularies in `palette-picker.md` § 1; out-of-vocabulary phrases
  fall back gracefully (descriptors become `null`, all 127 palettes
  rank equally with score 0, the top 10 are returned by raw order).
  In a real run, when the descriptor is empty, the agent would
  re-prompt the user for a sharper description rather than rolling
  blind.
- That impeccable's `live` mode iterates correctly. That's a
  Phase 3 concern (`prototype` + `$impeccable live`) and is not
  part of this demo.

## Running with your own descriptions

```sh
node demo/pick-palette.mjs "your description here" demo/sample-mine.html
```

Try phrases drawn from the keyword tables in `palette-picker.md` § 1
to see clean classification, or out-of-vocabulary phrases to see the
fallback. Examples that hit cleanly:

- `"clinical minimal architectural precise"` → `stark-white` ground
- `"swiss brutalist concrete industrial-quiet"` → `pale-gray` ground
- `"riso publishing magazine archival ephemera"` → `cream` ground
- `"hot punk passionate ember intense"` → `saturated` ground, hot hue
- `"glacial arctic ocean cobalt navy"` → `cool` hue family

## Other demos coming

- **Mock fixture project** — hand-authored `current/`, `direction.md`,
  `prototypes/<slug>.html` (the before/after viewer), and a
  `migrated/` page for a fictional 3-page brand. Lets you see the
  whole pipeline output without running it.
- **Live extract demo** — actually run Phase 1 against a public
  site via Playwright in a terminal and see the resulting
  `stardust/current/` populate.
