# Aurora Coffee — fixture for the stardust v2 pipeline

A complete, hand-authored mock of what stardust v2 produces when run
end-to-end against a fictional brand. Every file in this directory
is shaped exactly as it would be after a real run; the only thing
the agent didn't actually do is the run itself.

## What's here

```
demo/fixture/
├── PRODUCT.md                                   # target strategy (project-root, impeccable format)
├── DESIGN.md                                    # target visual system (project-root, Stitch frontmatter + 6 sections)
├── DESIGN.json                                  # target sidecar with extensions.divergence audit + components + narrative
└── stardust/
    ├── state.json                               # per-page state (home migrated; menu, about directed-only)
    ├── direction.md                             # resolved intent + full reasoning trace
    ├── current/
    │   ├── PRODUCT.md                           # descriptive snapshot of the EXISTING site
    │   ├── DESIGN.md                            # descriptive visual tokens of the EXISTING site
    │   ├── _brand-extraction.json               # consolidated brand surface (palette, type, motifs, voice)
    │   ├── pages/home.json                      # per-page parsed structure + content
    │   └── current-rendering.html               # the BEFORE iframe source (re-render of existing home page)
    ├── prototypes/
    │   ├── home.html                            # the VIEWER (before/after side-by-side)
    │   └── home-proposed.html                   # the proposed redesign on its own
    └── migrated/
        └── index.html                           # final deployable static HTML
```

## The brand

**Aurora Coffee** — a small specialty coffee roaster. The existing
site is a generic SaaS-cafe template (Inter, blue accent #3B82F6,
three-column feature grid, "lovingly roasted" marketing voice).

## The direction

Phrase: **"make it more expressive for a young audience"**

Resolved through stardust's intent-reasoning procedure to:

- **register**: brand (inherited)
- **expressive axis**: restrained → committed
- **tone**: professional-warm → playful (warm-playful)
- **distinctiveness**: familiar → distinctive
- **audience**: Gen Z college / first-job (resolved via clarifying Q1)
- **cultural references**: indie publishing + riso print

Divergence resolved:

- **seed** (deterministic from `MD5("Aurora Coffee|2026-04-26")`): `1970s × Riso print × zine × monochrome-tint`
- **font deck**: `zine-maximalist` (Abril Fatface, DM Serif Display, Special Elite, Homemade Apple)
- **palette**: `Vintage Cottage Charm` from the bundled library v0.6.0 (no invented colors)
  - Source: <https://coolors.co/54494b-f1f7ed-91c7b1-b33951-e3d081>
  - 5 hexes: ink, ground, sage, rose (anchor), pollen
- **anti-toolbox**: 1 hit (offset shadow on display headlines), justified as the riso-print misregistration signature

The full reasoning trace is in `stardust/direction.md`.

## What to look at

The most visually striking artifact is the viewer:

```
demo/fixture/stardust/prototypes/home.html
```

Side-by-side before/after with:
- Left: the generic SaaS template (`current/current-rendering.html`)
- Right: the redesigned page (`prototypes/home-proposed.html`)

A draggable divider between them lets you shift the split.
"Approve" and "stash" buttons are present per the
before-after-shell.md contract; in this static fixture they show
explanations rather than mutating state.

The redesigned page on its own:

```
demo/fixture/stardust/prototypes/home-proposed.html
```

The final migrated page (essentially the proposed file with
`stardust:migrate` provenance and DESIGN.md/DESIGN.json shas):

```
demo/fixture/stardust/migrated/index.html
```

## What it demonstrates

- **The before/after is real.** Both iframes load actual HTML; you
  can shift the divider, look at hover states, scroll independently.
- **The redesign isn't random.** Every choice traces back to a
  specific provision in `direction.md`: the rose CTA ← palette
  picker output, the Abril Fatface display ← zine-maximalist deck,
  the asymmetric 3/5 editorial split ← off-toolbox structural move
  in the divergence audit, the marginalia-twice-per-page rule ←
  DESIGN.md § 6 don'ts.
- **Provenance is real.** Every artifact carries a stamp (HTML
  comment, markdown comment, or `_provenance` JSON key) per
  `skills/stardust/reference/artifact-map.md`.
- **The migrated page is honest.** Same content as the proposed
  file (no rewriting), refreshed `:root` from the latest DESIGN.md,
  `:root` block + structural data attributes preserved per the
  contract.

## What it does NOT demonstrate

- A real `$impeccable craft` pass — the proposed redesign is
  hand-authored to match what craft would produce given these
  inputs; no impeccable runtime was involved.
- A real `$impeccable live` iteration session — the
  `iteratedVia: impeccable:live` line in the proposed file's
  provenance is illustrative.
- The full IA — only `home` is rendered; `menu` and `about` are at
  status `directed` in `state.json` to show the per-page incremental
  property.
- Asset migration — `stardust/migrated/assets/` is empty in the
  fixture (no real media to migrate). A real run would copy
  `stardust/current/assets/logo.<ext>` and any referenced media here.

## Open it remotely

```
https://raw.githack.com/paolomoz/stardust-2/claude/refactor-stardust-plugin-PiI3P/demo/fixture/stardust/prototypes/home.html
```

(That URL renders the viewer; the iframes pull `current-rendering.html`
and `home-proposed.html` via raw.githack as well.)
