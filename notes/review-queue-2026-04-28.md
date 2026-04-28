# Stardust review queue — target 30 brands

**Goal:** 30 brand-register reviews to baseline the lesson corpus
before the self-reinforcement pipeline revives (per
`notes/lesson-corpus-self-reinforcement.md`).

**Scope:** brand register only. `product` register (SaaS dashboards,
dev tools, internal apps) is deferred to a future queue.

**Format:** one row per project. Check off when reviewed. Append
review file path to the row when written. Add `notes:` inline if a
project is dropped or substituted.

---

## How to use this file

1. Pick the next unchecked row (top of the next phase).
2. Run stardust extract → direct → prototype against the brand's
   site. Generate ≥ 3 variants when feasible.
3. Review the prototypes by eye (the human-taste pass — what the
   agent's self-critique misses).
4. Write the review at
   `notes/human-review-2026-04-28-passN.md` (free-form prose; no
   schema imposed yet, per the lesson-corpus deferral plan).
5. Check the box, append the review file path to the row.
6. Stop pushing past 30. Long-tail patterns are better surfaced by
   real user complaints.

After every 5–6 reviews, **scan for cross-project recurrence** —
patterns that show up in 3+ unrelated brands are the real signal.
Update `notes/human-review-NNN.md` § "Patterns extracted" as the
working synthesis.

---

## Phase 0 — Already covered (9 projects, ~6 reviewable)

The first-pass review for these is in
`notes/human-review-2026-04-28-pass1.md`.

- [x] **The Road Home** · st2-5 · nonprofit · mission-driven · review: `human-review-2026-04-28-pass1.md`
- [x] **Fiserv** · st2-6 · B2B fintech / payments · conservative-institutional · review: `pass1.md`
- [x] **Festool** · st2-10 · tools / power equipment · technical-functional · review: `pass1.md`
- [x] **(BAC / mislabeled-VA)** · st2-11 · aviation · bold-distinctive · review: `pass1.md`
- [x] **Virgin Atlantic** · st2-12 · aviation · bold-distinctive · review: `pass1.md`
- [x] **Vitamix** · st2-13 · kitchen appliances · premium-heritage · review: `pass1.md` (note: register-mismatch flagged → L-I)
- [ ] ~~st2-4~~ · _unknown brand, may be re-surveyable later_
- [ ] ~~st2-7~~ · _built without enough context — not reviewable per L-J_
- [ ] ~~st2-8~~ · _built without enough context — not reviewable per L-J_

**Count:** 6 reviewable so far.

---

## Phase 1 — Fill major industry gaps (next 6, highest information value)

Each row brings a brand-new industry to the corpus. Tonally these
span minimalist-warm → conservative-institutional → ultra-luxury,
which forces stardust through very different brand-faithful
inheritance modes.

- [ ] **Glossier** · DTC beauty · minimalist-warm · _strong distinctive identity, conversational voice_ · `glossier.com`
- [ ] **Oatly** · F&B / CPG · irreverent-distinctive · _most opinionated CPG identity; tests divergence-tolerance_ · `oatly.com`
- [ ] **Polestar** · automotive (EV luxury) · Scandinavian minimalist · _negative space + premium photography; strong type discipline_ · `polestar.com`
- [ ] **One Medical** · healthcare / primary care · modern-friendly · _healthcare branded as friendly tech, not institutional_ · `onemedical.com`
- [ ] **Vanguard** · consumer finance / investing · conservative-trustworthy · _the "boring institutional" pole — opposite of Oatly_ · `investor.vanguard.com`
- [ ] **Aman** · hospitality / luxury hotels · ultra-luxury heritage · _deep IA, photography-heavy, strong brand discipline_ · `aman.com`

**Phase 1 target:** 12 reviewed.

---

## Phase 2 — Sub-industries within touched + new ones (next 9)

Same-vertical-different-tone pairs are the highest-signal axis for
register × industry interactions. Pairs to watch:

- Polestar (Phase 1) ↔ Rivian (Phase 2) ↔ Porsche (Phase 3) — three poles in automotive
- Vanguard (Phase 1) ↔ Lemonade (Phase 2) — two poles in finance
- Aman (Phase 1) ↔ Airbnb (Phase 2) — two poles in hospitality
- The New Yorker (Phase 2) ↔ Substack (Phase 2) — two poles in editorial

- [ ] **Patagonia** · DTC apparel · activist-heritage · _mission-driven; tests narrative-density vs grid layouts_ · `patagonia.com`
- [ ] **Liquid Death** · F&B / beverage · punk-distinctive · _maximum divergence — almost a forcing function_ · `liquiddeath.com`
- [ ] **Rivian** · automotive (EV utility) · adventure-functional · _compare against Polestar (different tone, same vertical)_ · `rivian.com`
- [ ] **Lemonade** · insurance (DTC) · disruptor-playful · _compare against Vanguard (same vertical, opposite tone)_ · `lemonade.com`
- [ ] **Airbnb** · hospitality / marketplace · community-friendly · _compare against Aman (same vertical, mass-market opposite)_ · `airbnb.com`
- [ ] **The New Yorker** · media / editorial · editorial-prestige · _editorial register — long-form, type-driven_ · `newyorker.com`
- [ ] **Substack** · media / writer platform · editorial-modern · _same vertical, different pole (creator-first not curated)_ · `substack.com`
- [ ] **Hermès** · luxury fashion · heritage-French luxury · _catalog depth; very strong existing identity_ · `hermes.com`
- [ ] **GOV.UK** · government / public services · utility-clear · _famously well-designed gov site; ultra-conservative pole_ · `gov.uk`

**Phase 2 target:** 21 reviewed.

---

## Phase 3 — Tone diversity within categories (final 9)

Final batch fills tonal gaps: quieter minimalists, retro-playful,
heritage-precision, NYC-luxury-streetwear, etc.

- [ ] **Aesop** · DTC skincare · minimalist-literary · _quieter than Glossier_ · `aesop.com`
- [ ] **Olipop** · F&B / beverage · retro-playful · _friendlier irreverence than Liquid Death_ · `drinkolipop.com`
- [ ] **Porsche** · automotive (luxury heritage) · heritage-precision · _heritage pole vs Polestar/Rivian_ · `porsche.com`
- [ ] **Calm** · wellness / meditation · quiet-minimalist · _new industry; minimalist-quiet tone_ · `calm.com`
- [ ] **Tracksmith** · sports / running · heritage-craft · _athletic apparel as heritage rather than performance_ · `tracksmith.com`
- [ ] **Aimé Leon Dore** · fashion / streetwear · NYC-luxury-streetwear · _newer, distinctive vs Hermès_ · `aimeleondore.com`
- [ ] **Khan Academy** · education / nonprofit · mission-utility · _service-vs-storytelling vs The Road Home_ · `khanacademy.org`
- [ ] **Engie** · energy / industrial · corporate-international · _B2B again but in a new vertical_ · `engie.com`
- [ ] **Lululemon** · athletic apparel · premium-aspirational · _premium-aspirational vs Tracksmith heritage_ · `lululemon.com`

**Phase 3 target:** 30 reviewed. **Stop here.**

---

## Coverage matrix (target end-state)

| industry | brands | tone span |
|---|---|---|
| Aviation | 2 (BAC, VA) | bold-distinctive × 2 |
| B2B fintech / payments | 1 (Fiserv) | conservative-institutional |
| Tools / power equipment | 1 (Festool) | technical-functional |
| Kitchen appliances | 1 (Vitamix) | premium-heritage |
| Nonprofit | 2 (TRH, Khan) | mission-driven · service-utility |
| DTC beauty / skincare | 2 (Glossier, Aesop) | minimalist-warm · minimalist-literary |
| F&B / CPG | 3 (Oatly, Liquid Death, Olipop) | irreverent · punk · retro-playful |
| Automotive | 3 (Polestar, Rivian, Porsche) | minimalist · functional · heritage |
| Healthcare / wellness | 2 (One Medical, Calm) | modern-friendly · quiet-minimalist |
| Consumer finance / insurance | 2 (Vanguard, Lemonade) | conservative · disruptor-playful |
| Hospitality / travel | 2 (Aman, Airbnb) | ultra-luxury · community-friendly |
| Media / editorial | 2 (The New Yorker, Substack) | prestige · creator-modern |
| Fashion / luxury | 2 (Hermès, Aimé Leon Dore) | heritage-French · NYC-streetwear |
| Apparel / outdoor | 1 (Patagonia) | activist-heritage |
| Government / public | 1 (GOV.UK) | utility-clear |
| Energy / industrial | 1 (Engie) | corporate-international |
| Sports / athletic | 2 (Tracksmith, Lululemon) | heritage-craft · premium-aspirational |

**17 distinct industries; 30 brands; 10+ tone buckets covered.**

---

## What might still be missing (deliberate omissions, may add later)

- **B2B SaaS / dev tools** — Stripe, Linear, Vercel are `product` register, deferred per "brand only" scope.
- **Asia / non-Western brands** — coverage skews US/EU. Muji, Uniqlo, Naver, Loewe could add cultural-origin diversity for a Phase 4.
- **Mass-market US auto dealer / regional bank / defaulty SMB sites** — counterweight for the "designer-favorite brand" bias of Hermès/Aman/Patagonia. Consider 1-2 substitutions if the corpus starts looking too curated.
- **Travel non-hospitality** — luggage (Away), booking (Viator), backpacker (Selina). One was on my drafting longlist but didn't make the cut.
- **Real estate** — Zillow, Compass. Not in current 30.

---

## Per-review checklist (for consistency across the 30)

When writing the review for a brand, capture at minimum:

1. **Variants reviewed**: A/B/C with file paths.
2. **Verdict per variant**: keep / refine / discard, plus a sentence.
3. **Brand-faithful inheritance check**: did the agent introduce
   colors / typography / motifs not in the captured brand surface?
4. **Convergence check** (the L-B test): are the variants distinct
   compositional theses or token reskins of the same layout?
5. **Density check**: too airy? too packed? right?
6. **Image deployment check**: are captured images surfaced in the
   render? at the right positions?
7. **Tone match**: does the rendered output read as the brand, or
   as "any other brand-register site"?

Free-form prose is fine. The above is a memory aid, not a schema.

---

## Cross-references

- Parent: `notes/lesson-corpus-self-reinforcement.md` (the deferred
  pipeline + 3-tier deployment plan)
- Pass 1 review: `notes/human-review-2026-04-28-pass1.md`
- Highest-leverage finding: `notes/variant-convergence.md`
- Source agent-self-critique files (outside repo, in user's tmp/):
  - st2-11-bac/.../self-reinforcement.md
  - st2-12-virginatlantic/.../feedback.md
  - st2-13-vitamix/.../prototype-lessons-2026-04-28-vitamix.md

---

## Checkpoints

| at total | action |
|---|---|
| 12 (Phase 1 done) | Re-extract patterns. Confirm L-A through L-E from pass 1 still recur. New patterns? |
| 21 (Phase 2 done) | Cross-tone comparison: are Polestar↔Rivian↔Porsche actually different in stardust's hands, or do they converge? |
| 30 (Phase 3 done) | Lock the corpus. Decide whether the lesson-corpus pipeline (`notes/lesson-corpus-self-reinforcement.md`) is now worth shipping. |
| beyond 30 | Stop pushing. Long-tail patterns better surfaced by real user complaints than speculative review. |
