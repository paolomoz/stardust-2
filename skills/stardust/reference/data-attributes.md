# Structural data attributes

A small vocabulary of `data-*` attributes that stardust applies to
section-level elements in every prototype and migrated page. The
vocabulary is the *structural lingua franca* between stardust's
sub-commands, between stardust and downstream tools (a future EDS
skill, a static-site analyser, an audit script), and between two runs
of stardust on the same site.

Carried from stardust v1 (wireframe-guide.md) unchanged.

## Why

Three reasons:

1. **Migration round-trips.** When `migrate` re-renders a page from
   the current state against an updated DESIGN.md, it needs to map
   sections of the old structure to sections of the new structure. The
   data attributes provide stable identity across renders without
   relying on class names (which change with the design).
2. **Critique and audit.** `$impeccable critique` and `$impeccable
   audit` give better feedback when section purpose is explicit. A
   `data-intent="emotional hook"` tells the critic what the section is
   for, not just what it looks like.
3. **Downstream consumers.** A future `aem-eds-from-stardust` skill
   (out of scope here) will map sections to EDS blocks. The data
   attributes are the contract that lets a separate plugin ingest
   stardust's output without re-parsing semantics.

## Where they go

On `<section>` elements (or the equivalent landmark element) inside
`<main>`, header, and footer. Not on every div. The granularity is
"section the user can describe in one phrase" — a hero, a feature
list, a social-proof strip, a footer block.

## Required attributes

Every section gets these three:

- **`data-section`** — descriptive name. Natural language slug, not a
  framework block name. Examples: `"hero"`, `"features"`,
  `"social-proof"`, `"recipe-showcase"`, `"closing-cta"`,
  `"contact-form"`, `"footer-nav"`. Lowercase kebab-case.
- **`data-intent`** — why this section exists. Examples: `"emotional
  hook"`, `"value proposition"`, `"build trust"`, `"drive action"`,
  `"explain mechanic"`, `"capture lead"`. Whole phrases allowed.
- **`data-layout`** — spatial hint. One of: `"full-bleed"`,
  `"contained"`, `"split-media"`, `"grid"`, `"stack"`, `"side-rail"`,
  `"edge-to-edge"`. Open-ended; new values are fine if the section
  doesn't fit.

## Optional attributes

Add when relevant; omit otherwise:

- **`data-items`** — number of repeated items in the section (cards,
  features, testimonials, pricing tiers). Use a number, not a range.
- **`data-media`** — media type carried by the section. Values:
  `"image"`, `"video"`, `"animation"`, `"none"`.
- **`data-interactive`** — interaction the section supports. Values:
  `"carousel"`, `"filter"`, `"calculator"`, `"tabs"`, `"accordion"`,
  `"form"`. One value per section; if multiple apply, pick the
  dominant one.

## Multi-page fragment attributes

For sites with content that appears on multiple pages (recipe cards
shown on the recipe index and the home page; testimonial cards shown
on the about page and the pricing page), use the fragment trio:

- **`data-fragment`** — fragment type identifier. Examples:
  `"recipe-card"`, `"testimonial-card"`, `"capability-highlight"`.
- **`data-fragment-role`** — `"source"` (this is the canonical home
  of the fragment) or `"reuse"` (this is a consuming page).
- **`data-fragment-source`** — path to the source page. Only on
  `reuse` sections. Example: `"/recipes"`.

The fragment vocabulary is the contract between stardust and a
future shared-component extractor: pages with `data-fragment-role="source"`
become the components, pages with `data-fragment-role="reuse"`
become consumers.

## Examples

```html
<section data-section="hero"
         data-intent="emotional hook"
         data-layout="full-bleed"
         data-media="image">
  <!-- ... -->
</section>

<section data-section="features"
         data-intent="value proposition"
         data-layout="grid"
         data-items="3">
  <!-- ... -->
</section>

<section data-section="recipe-grid"
         data-intent="discovery"
         data-layout="grid"
         data-fragment="recipe-card"
         data-fragment-role="source"
         data-items="12">
  <!-- ... -->
</section>

<section data-section="recipe-teaser"
         data-intent="cross-link"
         data-layout="grid"
         data-fragment="recipe-card"
         data-fragment-role="reuse"
         data-fragment-source="/recipes"
         data-items="3">
  <!-- ... -->
</section>
```

## Who reads, who writes

- **`prototype`** writes them on every section of the proposed
  redesign HTML. The `purpose` heuristic from
  `extract/reference/current-state-schema.md` § Landmarks seeds the
  initial values; the `craft` step refines them.
- **`migrate`** preserves them on every section of the final
  redesigned HTML. When migrating from the proposed prototype, the
  attributes are passed through verbatim. When the structure changes
  during migration, the agent updates `data-section` / `data-intent`
  to match and notes the change in the migration log.
- **`extract`** infers `data-section` and `data-intent` for current-state
  pages (per the `purpose` heuristic) but does **not** add them to the
  per-page JSON's source HTML capture — they are stardust's output
  vocabulary, not an input description.
- A downstream EDS skill (out of scope) reads them from migrated
  pages to map sections to blocks.

## What this vocabulary is **not**

- It is not a CSS naming convention. Class names belong to the design
  system. Data attributes belong to stardust's structural model.
- It is not a framework block taxonomy. EDS blocks, MDX components,
  and React components have their own names; the agent maps from
  `data-section` to those names downstream.
- It is not a critique or score. `data-intent` describes purpose; it
  does not judge whether the purpose is fulfilled.

## Versioning

The vocabulary version is implicit in the stardust version. The seven
attributes above (`data-section`, `data-intent`, `data-layout`,
`data-items`, `data-media`, `data-interactive`, `data-fragment`,
`data-fragment-role`, `data-fragment-source`) are the v2 set. New
attributes can be added in a backward-compatible way; renaming
existing ones requires a version bump.
