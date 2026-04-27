# Intent dimensions

Stardust does not classify a user's intent into a fixed list of categories.
Instead, every freeform phrase is mapped onto a small set of **dimensions**
that describe the directions a redesign can move along. The agent reasons
about which dimensions a phrase moves and in which direction, then composes
impeccable commands accordingly.

These dimensions are descriptive, not prescriptive. A real intent will move
some, leave others alone, and may pin one or two to a hard constraint.

---

## 1. Register

Inherited directly from impeccable. `brand` means *design IS the product*
(landing pages, marketing sites, brand showcases). `product` means *design
SERVES the product* (dashboards, tools, internal apps).

- Anchors: `brand`, `product`.
- Signals from user phrasing: "marketing site", "landing page", "showcase",
  "campaign" → brand. "Dashboard", "admin", "console", "internal tool",
  "ops" → product.
- Default if unstated: inherit from PRODUCT.md `register` field. If that is
  also unstated, ask.

## 2. Expressive axis

How loud, how committed, how visible the design is. The user's phrase often
moves this axis explicitly ("bolder", "quieter", "more refined").

- Anchors: `restrained`, `committed`, `drenched`.
- `restrained`: muted palette, narrow type scale, system-feeling. Default
  for product register.
- `committed`: distinct palette and type, clear point of view, but functional
  hierarchy intact.
- `drenched`: full saturation, full bleed, expressive type, designed
  surfaces.

## 3. Tone

Emotional register. Independent of expressive axis: a quiet design can still
be playful, a drenched one can still be serious.

- Anchors: `serious`, `neutral`, `playful`.
- Signals: "professional", "trust", "credible" → serious. "Friendly", "fun",
  "approachable" → playful.

## 4. Density

How much space and rhythm the design uses. Often stated as "airy" vs
"information-dense".

- Anchors: `airy`, `balanced`, `packed`.
- Tied to `layout` and `polish` impeccable commands.
- **Defaults:** `packed` for `product` register; **`balanced` for
  `brand` register.** `airy` is the right default only when the
  page is editorial-led with deep per-section density (NYT
  Opinion-tier longform, Pentagram nonprofit, This American Life
  editorial). For the more common brand-register cases —
  multi-audience IA, civic / direct-services nonprofits, B2B
  landing pages with multiple paths — `airy` produces visually
  inert pages where 96px section padding × 7+ short sections
  reads as whitespace-as-padding, not whitespace-as-breath. Pick
  `airy` only when the page genuinely has editorial-density per
  section.

  Tier-to-tokens propagation when direct authors `DESIGN.md`:

  | tier | `spacing.sectionPadding.desktop` | guidance |
  |---|---|---|
  | `airy` | 96px | editorial-led, deep per-section density |
  | `balanced` | 64–72px | brand-register default; multi-audience or short sections |
  | `packed` | 40–48px | `product` register or data-dense sites |

  See `direct/SKILL.md` § Phase 1 for the one-shot prompt direct
  uses when the user's phrase doesn't move the density axis.

## 5. Distinctiveness

How willing the design is to leave familiar territory. This is the axis the
divergence toolkit polices.

- Anchors: `familiar`, `distinctive`, `singular`.
- `familiar`: pattern-matched to category leaders. Lower risk, lower memory.
- `distinctive`: clearly itself, but legible to anyone in the category.
- `singular`: unmistakable. Reserved for brand register with strong
  conviction.
- Stardust *forbids* `familiar` from collapsing into AI-default training
  reflexes (cyan/purple gradient SaaS, dark-mode-by-reflex, glassmorphism
  hero). The divergence toolkit catches these.

## 6. Audience

The audience is not a slider. It is a tuple of demographics, context, and
reference set.

- Capture: who, in what context, with what cultural references.
- Examples: "young, urban, design-aware" / "enterprise procurement, on a
  27-inch monitor at 9 a.m." / "first-time API users, mostly mobile, mostly
  developing markets".
- Audience anchors a "scene sentence" (impeccable concept) — a one-line
  description of where, when, and how the design will be encountered.

## 7. Constraint set

Hard guardrails the redesign must respect. These are not directions; they
are walls.

- Common constraints: `a11y-first`, `perf-first`, `brand-faithful`,
  `clean-slate`, `legacy-content-preserved`, `RTL-required`, `print-ready`.
- Constraints take precedence over the user's stated direction. A
  `brand-faithful` constraint plus a "make it bolder" intent means *bolder
  within the existing brand palette*, not *swap the brand*.

---

## Reading a phrase

When reasoning about a user's phrase:

1. List the dimensions it explicitly mentions.
2. List the dimensions it implicitly moves (e.g., "more expressive" almost
   always moves the **expressive axis** and often **distinctiveness**).
3. List the dimensions it leaves alone — those keep their current value
   from PRODUCT.md, the existing site, or the prior `direction.md`.
4. Identify the constraint set if any constraint is implied or stated.
5. Identify what is missing. Audience and constraints are the most
   commonly underspecified — these are the questions worth asking.

The full reasoning procedure lives in `intent-reasoning.md`.
