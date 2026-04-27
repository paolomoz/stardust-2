# Sample format

The shape of `samples/<slug>/` and the `meta.json` that the
showcase consumes. Every sample submitted to the showcase follows
this format. The `--publish-sample` flow in `stardust:prototype`
authors a folder of this shape automatically; manual submitters
should use this as the contract.

---

## Folder layout

```
samples/<slug>/
├── meta.json             # required — the sample's metadata
├── thumbnail.png         # required — 1280×720 cover for the showcase card (uses the primary variant). PNG preferred; SVG accepted for design-system samples where vector chrome is more honest than a photo.
├── direction.md          # required — full reasoning trace from $stardust direct
├── proposed-A.html       # required — the proposed redesign, variant A. Always present even for single-variant samples.
├── proposed-B.html       # optional — variant B (when the run produced ≥2 variants)
├── proposed-C.html       # optional — variant C
├── current.html          # optional but recommended — snapshot of the existing site rendering for before/after context
└── thumbnail-B.png       # optional — per-variant thumbnail when variants are visually distinct enough to warrant their own cover. Falls back to thumbnail.png.
```

**Slug rules.** Lowercase, alphanumeric, hyphens. Derived from
the source brand name (e.g. `aurora-coffee`,
`the-road-home`, `pentagram-archive`). Avoid generic slugs like
`sample-1` — the slug is the shareable URL fragment.

**Self-contained HTML.** Every `proposed-<id>.html` and
`current.html` must be a complete self-contained HTML file
following `skills/prototype/reference/before-after-shell.md` §
`<slug>-proposed.html` § Required structure: `:root` token block,
data attributes, provenance comment, no external CSS, no external
JS. Fonts may load from a CDN (Google Fonts, etc.) when the
captured brand uses them; otherwise system stack.

---

## `meta.json` schema

```json
{
  "schemaVersion": 2,
  "slug": "the-road-home",
  "title": "The Road Home — homeless services redesign",
  "tagline": "From WordPress-charity-template to confident-institutional.",

  "source": {
    "url": "https://theroadhome.org/",
    "register": "brand",
    "category": "nonprofit · homeless services",
    "extractedAt": "2026-04-27"
  },

  "direction": {
    "phrase": "make it more dignified for the audience it serves",
    "movements": [
      "expressive: restrained → committed",
      "tone: serious → confident-institutional",
      "distinctiveness: familiar → distinctive"
    ],
    "seed": {
      "input": "The Road Home|2026-04-27",
      "decade": "2025-now",
      "craft": "Memoir",
      "register": "Memoir-adjacent",
      "groundFamily": "stark-white",
      "pickedBy": "anchor-reference: Pentagram nonprofits"
    },
    "fontDeck": {
      "name": "editorial-prestige",
      "pickedBy": "anchor-reference"
    },
    "palette": {
      "name": "Civic Teal Centennial",
      "source": "https://coolors.co/...",
      "anchor": "#008192",
      "pickedBy": "user-constraint",
      "brandFaithfulInversions": [
        "pure-white retention",
        "hex format retention"
      ]
    },
    "antiToolbox": {
      "hits": 1,
      "justified": 1
    }
  },

  "variants": [
    {
      "id": "A",
      "name": "Centennial Mast",
      "dominantDimension": "decade",
      "thesis": "Hero leads with the centennial mark, every primary surface hangs from it. The decade reads first.",
      "proposedFile": "proposed-A.html",
      "thumbnail": "thumbnail.png",
      "isPrimary": true
    },
    {
      "id": "B",
      "name": "Story Mast",
      "dominantDimension": "register",
      "thesis": "Hero leads with a single tenant memoir; the institutional surface recedes. The register (Memoir) reads first.",
      "proposedFile": "proposed-B.html",
      "thumbnail": "thumbnail-B.png"
    },
    {
      "id": "C",
      "name": "Triptych Routing",
      "dominantDimension": "craft",
      "thesis": "Three flat-block panels on the hero, each routing a distinct audience. The craft (Riso flat blocks) reads first.",
      "proposedFile": "proposed-C.html"
    }
  ],

  "current": {
    "renderingFile": "current.html",
    "note": "Re-rendering of the live site from captured pages/home.json against current/DESIGN.md. WordPress-default body sans, four-up service grid, blue (#1d4ed8) CTAs."
  },

  "createdAt": "2026-04-27",
  "stardustVersion": "0.2.0",
  "submittedBy": "paolomoz",
  "license": "Apache-2.0"
}
```

### Field-by-field

| field | required | notes |
|---|---|---|
| `schemaVersion` | yes | Always `2` for v0.2 of the showcase. Bumps on breaking schema changes. |
| `slug` | yes | Mirrors the folder name. Used in showcase URLs. |
| `title` | yes | Display name for the showcase card. ~60 char max. |
| `tagline` | recommended | One-line "what this sample shows." Stardust voice rule: short is a virtue. |
| `source.url` | yes | The live site this sample redesigned. |
| `source.register` | yes | `brand` / `product` / `ambiguous`. |
| `source.category` | recommended | Free-form; helps the showcase filter. |
| `source.extractedAt` | yes | ISO date of `$stardust extract` run. |
| `direction.phrase` | yes | The user's verbatim intent phrase. |
| `direction.movements[]` | yes | Per `intent-dimensions.md`, what moved. |
| `direction.seed` | yes | The full divergence seed, including `pickedBy`. |
| `direction.fontDeck` | yes | Resolved deck name. |
| `direction.palette` | yes | Resolved palette with source URL. Include `brandFaithfulInversions[]` when the run preserved pure-white / hex format / etc. |
| `direction.antiToolbox` | recommended | Hit count and how many were justified. |
| `variants[]` | yes | At least one entry. The single-variant case has `variants: [{ id: "A", isPrimary: true, ... }]`. |
| `variants[].id` | yes | Single uppercase letter (A, B, C, ...) or short identifier. |
| `variants[].name` | yes | Display name for the variant. Per `divergence-toolkit § 2.5`, name should reflect the dominant dimension (e.g. "Centennial Mast" for decade-dominant). |
| `variants[].dominantDimension` | recommended | One of `decade` / `craft` / `register` / `ground-family`. The showcase tags variants with this. |
| `variants[].thesis` | recommended | One-paragraph compositional thesis (what the variant's first moment is). |
| `variants[].proposedFile` | yes | Filename of the proposed HTML, relative to `<slug>/`. |
| `variants[].thumbnail` | optional | Per-variant cover; falls back to top-level `thumbnail.png`. |
| `variants[].isPrimary` | yes for one variant | Exactly one variant in the array must have `isPrimary: true`. The showcase card opens this variant by default. |
| `current` | recommended | Snapshot of the existing site for before/after context. Omit when no current rendering was captured. |
| `createdAt` | yes | ISO date of the submission. |
| `stardustVersion` | yes | Stardust version that produced the run. |
| `submittedBy` | yes | GitHub username of the submitter. |
| `license` | yes | `Apache-2.0` for samples derived from public sites; consult the source's terms before submitting branded material. |

### Multi-variant validation

- At least one variant entry.
- Exactly one variant has `isPrimary: true`.
- All `proposedFile` values point to existing files in the
  sample folder.
- `dominantDimension` values are distinct across variants
  (per `divergence-toolkit § 2.5` — variants that share a
  dominant dimension are reskins, not distinct theses).
- For ≥2 variants, each must include a `thesis` (single-variant
  samples can omit it).

The showcase renders multi-variant samples with a small variant
strip on the card (chips labelled `A`, `B`, `C` with their
`dominantDimension` tag). Clicking a chip opens that variant's
proposed file in a new tab. Clicking the card body opens the
primary variant.

---

## `index.json` shape

The showcase reads this on load via `fetch('./index.json')`. One
entry per sample.

```json
{
  "schemaVersion": 2,
  "samples": [
    "the-road-home",
    "aurora-coffee",
    "pentagram-archive"
  ]
}
```

The entries are slug strings; the showcase fetches each
`<slug>/meta.json` for the per-card data. Adding a sample to
`index.json` is what makes it visible. Samples on disk but absent
from `index.json` are intentionally hidden (work-in-progress,
internal).

The `--publish-sample` flow appends to `samples` in
alphabetical order; manual submitters should keep the array sorted.

---

## Provenance discipline

Every sample carries a complete provenance trail. The showcase is
a **visual demonstration**, not a deployable site, so the gates
focus on *design* honesty rather than *content* completeness.

The submitter is committing to:

- The proposed HTML's `_provenance.unsourcedContent[]` accurately
  lists every placeholder with its selector, type, and reason.
  **Placeholders are allowed** — they ship visible per the F-002
  PLACEHOLDER signature contract, and the publish flow records
  them in the PR body so reviewers see what's sourced vs
  illustrative.
- The proposed HTML's `_provenance.critique[]` shows zero
  outstanding P0/P1 findings (or the user explicitly acknowledged
  them at approval time, or critique was not run — which is
  surfaced in the PR body so the reviewer can run it before
  merging).
- `meta.json#direction.seed.pickedBy` accurately records why each
  dimension landed where it did (`deterministic` / `anchor-reference: <ref>` / `user-constraint` / `designer-override`).
- `meta.json#direction.palette.source` is a real URL that resolves
  to the picked palette (coolors.co, library hash, etc.).
- The `:root` token contract, data-attributes contract, and
  impeccable hard rules pass on every variant. These are
  *design* gates and they stay strict — showcase exists to
  demonstrate good design.

The traceability promise is "every visual decision can be traced
back to a captured input or a labelled placeholder." The
placeholder labels are the audit trail for the not-yet-sourced
parts; the rest of the design system traces to seed, palette
source, font deck, and the captured brand surface.

The submission PR template asks the user to confirm these
explicitly (one checkbox each); the publish-sample flow
prefills them with the actual values from the user's project.

`migrate`'s gates are **stricter** than the showcase's because
the audience is different — production end-users vs. designers
reviewing a sample. A sample that's good for the showcase may
not be ready to deploy; that's expected.
