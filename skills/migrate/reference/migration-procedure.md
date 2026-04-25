# Migration procedure

Per-page procedure `$stardust migrate` runs to produce
`stardust/migrated/<output-path>`. Idempotent, deterministic, and
content-preserving by default.

---

## Inputs per page

- `stardust/current/pages/<slug>.json` — source structure + content
  (the only content source; the live site is not re-fetched).
- `stardust/current/assets/` — extracted media and logo.
- `DESIGN.md` (project root) — target visual system.
- `DESIGN.json` (project root) — sidecar with components, divergence,
  voice.
- `stardust/direction.md` — Active section (used to confirm content
  changes are authorised, if any).
- `stardust/prototypes/<slug>-proposed.html` — **if the page is
  approved**, used as the structural seed (the agent's iterated take).
  Otherwise absent and the migration auto-derives structure from the
  current page's IA + DESIGN.json components.
- `stardust/state.json` — page status and direction reference.

## Two render paths

The same procedure handles both `approved` and `directed` pages,
branching only on whether a `<slug>-proposed.html` exists.

### Path A — Approved page (proposed.html exists)

1. Read the proposed file's body and structural data attributes
   verbatim. They are the agent's iterated and user-approved take on
   how this page should look.
2. **Refresh the `:root` block** from the latest DESIGN.md per the
   token contract. Token edits made after approval propagate to
   migrate output here. The proposed file's `:root` is replaced; its
   body is preserved.
3. Validate the result (see § Validation).
4. Apply content-preservation rules (see
   `content-preservation.md`).
5. Write to the migrated path.

### Path B — Directed but not prototyped

1. Read `current/pages/<slug>.json` for the page's heading outline,
   landmarks (with `purpose` heuristic), CTAs, and content.
2. Lay out a structure: header (from current header), main with one
   `<section>` per landmark child of `main`, footer (from current
   footer). Each section gets data attributes per
   `skills/stardust/reference/data-attributes.md`.
3. Render each section using DESIGN.json components. Map the
   `purpose` heuristic to a component selection:
   - `hero` → component `hero` (or first matching pattern in
     DESIGN.json)
   - `feature-list` → component `feature-grid`
   - `social-proof` → component `social-proof-strip`
   - `cta-band` → component `cta-band`
   - `form` → preserve the form structure from
     `current/pages/<slug>.json § forms`, restyled
   - `rich-text` → preserve content, restyled
   - `unknown` → fall through to a content-preserving default with a
     `<!-- TODO: section purpose unknown; verify -->` comment
4. Apply the `:root` block from DESIGN.md per the token contract.
5. Apply content-preservation rules.
6. Validate.
7. Write to the migrated path.

The Path-B render is **deterministic** given the same inputs. Two
runs against the same `pages/<slug>.json` and the same DESIGN.md
produce byte-identical output (except for the timestamp in the
provenance block).

## Output path mapping (slug → file)

Slugs (filesystem-friendly identifiers) map back to nested
`index.html` files for portable static hosting:

| Slug                  | Output path                              | URL it serves       |
|-----------------------|------------------------------------------|---------------------|
| `home`                | `migrated/index.html`                    | `/`                 |
| `about`               | `migrated/about/index.html`              | `/about`            |
| `pricing`             | `migrated/pricing/index.html`            | `/pricing`          |
| `docs__api`           | `migrated/docs/api/index.html`           | `/docs/api`         |
| `blog__post-one`      | `migrated/blog/post-one/index.html`      | `/blog/post-one`    |

The mapping algorithm: replace `__` with `/`, append `/index.html`.
The `home` slug is the only special case (it becomes the root
`index.html`).

This convention works on every static host (Netlify, Vercel,
Cloudflare Pages, S3+CloudFront, GitHub Pages, plain nginx) without
URL rewrite rules.

## `:root` block sourcing

Every migrated page exposes the full `:root` block defined in
`skills/stardust/reference/token-contract.md`. Values come from the
latest DESIGN.md frontmatter via the mapping table in that file.

When DESIGN.md is updated and `migrate` is re-run, every migrated
page's `:root` block updates accordingly. This is the **token
propagation** path: edit DESIGN.md once, re-run migrate, every page
reflects the new tokens.

## Asset references

The migrated site is **self-contained** under
`stardust/migrated/`. Asset paths in HTML resolve relative to the
migrated tree:

- `<img src="...">` references rewritten per
  `content-preservation.md` § Media references.
- The migration step copies `stardust/current/assets/logo.<ext>` to
  `stardust/migrated/assets/logo.<ext>` (logo only) and
  `stardust/current/assets/media/*` to
  `stardust/migrated/assets/media/*`.
- Migrate-time-generated images (none in v2.0; `prototype`'s
  optional `imagery_mode: generated` is not yet wired up here)
  would go under `stardust/migrated/assets/generated/`.

## Validation

Every migrated page must pass:

1. **`:root` block present** as the first content of the first
   `<style>` (token-contract.md).
2. **Data attributes** on every section (data-attributes.md).
3. **Provenance block** as the first child of `<head>` (artifact-map.md).
4. **Anti-toolbox audit** consulted but not re-run — the audit lives
   in `DESIGN.json.extensions.divergence`. Migrate trusts the audit
   that `direct` and `prototype` already performed.
5. **Impeccable hard rules** respected: OKLCH colors, no pure
   black/white, no glassmorphism reflex, no gradient text, type ratio
   ≥ 1.25 for brand register, no skipped headings, focus states,
   semantic z-index.
6. **Content preservation** per `content-preservation.md` —
   declared content from `pages/<slug>.json` is present in the
   output; deviations are noted in provenance.
7. **Same-origin internal links** rewritten to relative paths
   pointing at sibling migrated pages (or marked
   `data-broken-link="true"` if the target slug isn't in the
   inventory).

If validation fails, **do not write** the file. Surface the failure
to the user with the specific rule violated and a suggested fix.

## Provenance

```html
<!-- stardust:migrate
  writtenBy:        stardust:migrate
  writtenAt:        2026-04-26T11:00:00Z
  page:             home
  slug:             home
  pagePath:         migrated/index.html
  renderPath:       approved-from-prototype  | directed-no-prototype
  sourceProposed:   stardust/prototypes/home-proposed.html      (path A only)
  sourceCurrent:    stardust/current/pages/home.json
  againstDirection: stardust/direction.md (Active 2026-04-25T15:42:00Z)
  designMd:         DESIGN.md (sha: <short hash>)
  designJson:       DESIGN.json (sha: <short hash>)
  divergenceVersion: v1.0 (stardust v2)
  contentDeviations: []
  brokenInternalLinks: []
  stardustVersion:  0.2.0
-->
```

The `designMd` and `designJson` shas let later runs detect whether the
target tokens have changed since this page was last migrated. If they
match, `migrate` skips the page (idempotent skip).

## Idempotent skip

When re-running `$stardust migrate` (no flags), each page is
checked:

- If the migrated file exists AND its provenance `designMd` /
  `designJson` shas match the current files AND its provenance
  `sourceCurrent` matches the page's current sha AND its provenance
  `sourceProposed` matches (when path A) — **skip the page** and
  report `unchanged`.
- Otherwise re-render.

This makes mass re-runs cheap. Common cases that trigger re-render:
DESIGN.md edited; current page re-extracted; proposed file
re-iterated; direction changed (handled by stale-flagging, not by
sha mismatch).

## What migrate never does

- **Re-fetch the live site.** Migrate is offline. The only network
  step in the whole pipeline was Phase 1 of `extract`.
- **Run `$impeccable critique` or `audit`.** Validation is the
  hard-rule pass; quality assessment is the user's call (or a manual
  `$impeccable critique stardust/migrated/` after the fact).
- **Touch the live site.** Stardust never deploys, never pushes,
  never modifies origin.
- **Generate AEM EDS markup, framework components, or CMS payloads.**
  Static HTML only. EDS conversion is a separate downstream skill.
- **Move past `migrated` state.** There is no further state. A
  separate skill takes the migrated output as input.
