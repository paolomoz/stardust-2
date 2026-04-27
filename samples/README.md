# Stardust showcase

A curated set of `stardust` redesign runs, published to GitHub Pages
as a navigator. Each sample is a complete record of one run: the
resolved direction, the per-page proposed redesign(s), and (when
captured) a snapshot of the existing site for before/after context.

The showcase exists to make stardust's output legible: the
**deterministic seed**, the **divergence inputs**, the
**brand-faithful inversions**, and the **per-page deployment**.
A reader of any sample should be able to trace every visual
decision back to a captured input — that's the brand promise.

> Stardust picks from 127 real palettes scraped from
> coolors.co/palettes/trending. Every chosen hex carries a source
> URL.
>
> *— stardust voice principles, "Math, not mysticism"*

---

## What's here

- **`index.html`** — the navigator (Pages entry point). Lists every sample with
  cover + source URL + seed metadata. Multi-variant samples show a
  variant strip; single-variant samples open straight to the
  proposed file.
- **`index.json`** — the manifest. The navigator reads this on
  load; samples not listed here are not visible. (Two
  separate files: `index.html` is the navigator, `index.json` is
  its data source.)
- **`sample-format.md`** — the schema for a sample folder
  (`meta.json` + variant files + provenance).
- **`<slug>/`** — one folder per sample. Format defined in
  `sample-format.md`.

The site is published via GitHub Pages from the `samples/`
directory on the default branch — see
`../.github/workflows/showcase-pages.yml`. The published URL is
`https://{owner}.github.io/{repo}/`.

---

## Adding a sample

There are two paths.

### Automated (recommended) — `$stardust prototype --publish-sample <slug>`

After approving a prototype in your stardust project, run:

```
$stardust prototype --publish-sample home
```

The prototype skill will:

1. Verify `gh` is authenticated against this repo (or your fork).
2. Copy the relevant files from your project into a new
   `samples/<slug>/` folder.
3. Author `meta.json` from `state.json` + `direction.md` +
   `_brand-extraction.json`.
4. Append the sample to `index.json` so the showcase picks it up.
5. Open a PR with an opinionated body describing the sample.

You don't need write access to this repo — `gh pr create` will
fork on your behalf if needed.

The full procedure spec lives in
`../skills/prototype/reference/publish-sample.md`.

### Manual

1. Create `samples/<slug>/` per `sample-format.md`.
2. Add an entry to `index.json` (one of the fields is `submittedBy`
   — your GitHub username).
3. Open a PR.

---

## What makes a good sample

The showcase is a **visual demonstration** of stardust's output —
composition, palette, typography, layout, motion. Curated for
design legibility, not for content perfection. A good sample is
one of:

- **A category benchmark** — a redesign in a register or vertical
  the showcase doesn't already cover (homeless services, indie
  coffee, B2B SaaS, e-commerce, brutalist editorial).
- **A divergence-toolkit demonstration** — a run where the seed
  produced an unusual but defensible visual move, with a clean
  divergence audit trail.
- **A brand-faithful inheritance case** — a run where the user
  pinned type and palette and the value of stardust shows up in
  composition, not chrome.
- **A multi-variant ideation** — a run that produced 2–3
  meaningfully distinct variants from the same direction (each
  variant should let one seed dimension dominate per
  `divergence-toolkit.md § 2.5`).

Placeholder content is **allowed**. Showcase samples are visual,
not deployable: the F-002 PLACEHOLDER visual signature (dashed
outline + monospace eyebrow + surface-alt tint) is on by default
on all proposed files, so a showcase reader can tell at a glance
what's sourced and what's illustrative. The publish flow records
the unsourced list verbatim in the PR body under
§ Unsourced content; reviewers see it without opening files.

Things that are not good samples:

- The author's own brand (without an external check).
- Runs where the divergence audit has unjustified anti-toolbox
  hits — these are *design* problems, not content problems, and
  the showcase exists to demonstrate good design.
- Runs where the proposed file fails the `:root` token contract,
  data-attributes contract, or impeccable hard rules.

Note: `migrate`'s placeholder guard is **unchanged** — deploying
a public site with placeholder content is still refused there.
The showcase and the deployable site are different audiences with
different gates.

---

## Voice & visual language

The showcase is rendered in stardust's own brand identity:

- **Ground:** ink (`#0a1024`) on the night side; dust (`#f5f0e6`)
  on the day side.
- **Signal:** amber (`#e8b95e`), used once per view.
- **Type:** SF Pro Display / SF Pro Text / SF Mono — display for
  names, mono for seeds and provenance, text for prose. Never use
  mono for prose.
- **Voice:** call it the thing, show the seed, math not mysticism,
  honor the designer, short is a virtue.

The reference is `docs/stardust-identity.html` (in the
plugin's docs folder); follow it. Bold redesigns of the showcase
itself are out of scope — the chrome is settled.
