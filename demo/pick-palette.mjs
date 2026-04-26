#!/usr/bin/env node
// demo/pick-palette.mjs
//
// Reference implementation of the stardust v2 palette picker.
// Runs the classifier from palette-picker.md § 1 against a freeform
// description, scores the bundled library per § 2, picks the top 5,
// rolls the deterministic recommended pick, and renders the pick UI
// per § 4 to a self-contained HTML file.
//
// Usage:
//   node demo/pick-palette.mjs ["description"] [output-path]
//
// Defaults: description = "bold maximalist playful pop carnival",
//           output = demo/sample-bold-pop.html

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const libraryPath = path.join(repoRoot, 'skills/direct/reference/palettes/library.json');

const description = process.argv[2] || 'bold maximalist playful pop carnival';
const outputPath = process.argv[3] || path.join(__dirname, 'sample-bold-pop.html');
const today = new Date().toISOString().slice(0, 10);

const library = JSON.parse(fs.readFileSync(libraryPath, 'utf8'));

// === § 1 Classifier vocabularies ===========================================

const ENERGY = {
  5: ['bold','shocking','loud','energetic','electric','explosive','punk','wild','chaotic','freaking','intense','aggressive','radical','maximal','maximum','carnival','rave'],
  4: ['lively','vivid','strong','powerful','bright','punchy','vibrant','active','dynamic'],
  3: ['balanced','considered','measured','engaging'],
  2: ['refined','composed','subdued','understated','gentle','soft','muted','calm'],
  1: ['quiet','minimal','hushed','restrained','peaceful','serene','tranquil','whisper','silent'],
};

const CONTRAST = {
  5: ['shocking','stark','brutal','extreme','maximum','dramatic','harsh','uncompromising','punchy','bold'],
  4: ['strong','crisp','clean','sharp'],
  3: ['balanced','harmonious','considered'],
  2: ['soft','gentle','gradual','ambient'],
  1: ['uniform','monochrome','faded','washed','quiet'],
};

const SATURATION = {
  5: ['saturated','vivid','neon','electric','fluorescent','hot','pop','candy','tropical','carnival'],
  4: ['rich','warm','vibrant','deep'],
  3: ['natural','earthy','grounded'],
  2: ['muted','dusty','faded','pastel','washed','understated'],
  1: ['desaturated','quiet','neutral','gray','grey','bleached'],
};

const HUE = {
  hot:     ['red','pink','magenta','crimson','fire','hot','blood','punk','passionate','ember'],
  warm:    ['orange','terracotta','rust','autumn','golden','burnt','amber','copper'],
  mustard: ['yellow','mustard','ochre','sun','honey'],
  green:   ['green','forest','sage','botanical','emerald','jungle','moss','olive'],
  teal:    ['teal','turquoise','seafoam','cyan','mint','lagoon'],
  cool:    ['blue','cobalt','ocean','sky','navy','denim','arctic','glacial'],
  violet:  ['purple','violet','lavender','plum','aubergine','iris'],
  neutral: ['gray','grey','neutral','monochrome','monochromatic','achromatic','concrete','slate'],
  rainbow: ['rainbow','playful','eclectic','multicolour','multicolor','kaleidoscope'],
};

const GROUND = {
  cream:             ['paper','letterpress','riso','publishing','magazine','book','archival','print','vellum','warm','manuscript','folded','ephemera'],
  'stark-white':     ['clinical','medical','minimal','minimalist','clean','engineered','technical','modern','architectural','superbly','precise','swiss-pharma'],
  'pale-gray':       ['concrete','quiet','swiss','brutalist','grey','gray','industrial-quiet'],
  dark:              ['night','noir','cinematic','dark','moody','midnight','shadow','underground','late','nocturnal'],
  saturated:         ['bold','shocking','loud','maximalist','colorful','colourful','playful','punk','pop','carnival'],
  'monochrome-tint': ['sage','dusk','tinted','muted','considered','ambient','natural','earthy','ombre'],
};

function tokens(s) {
  return new Set(s.toLowerCase().split(/[^a-z-]+/).filter(Boolean));
}

function classifyLevel(words, vocab) {
  const scores = {};
  for (const [level, kws] of Object.entries(vocab)) {
    scores[level] = kws.reduce((n, k) => n + (words.has(k) ? 1 : 0), 0);
  }
  const max = Math.max(...Object.values(scores));
  if (max === 0) return null;
  // Tie -> bolder (higher number)
  return Math.max(...Object.entries(scores).filter(([,s]) => s === max).map(([l]) => +l));
}

function classifyCategory(words, vocab) {
  const scores = {};
  for (const [cat, kws] of Object.entries(vocab)) {
    scores[cat] = kws.reduce((n, k) => n + (words.has(k) ? 1 : 0), 0);
  }
  const max = Math.max(...Object.values(scores));
  if (max === 0) return null;
  return Object.entries(scores).find(([,s]) => s === max)[0];
}

const words = tokens(description);
const descriptor = {
  energy:        classifyLevel(words, ENERGY),
  contrast:      classifyLevel(words, CONTRAST),
  saturation:    classifyLevel(words, SATURATION),
  hue_bias:      classifyCategory(words, HUE),
  ground_family: classifyCategory(words, GROUND),
};

// === § 2 Filter scoring ====================================================

const HUE_GROUPS = {
  hot:     ['hot','warm','mustard','violet'],
  warm:    ['warm','mustard','hot'],
  cool:    ['cool','teal','violet'],
  teal:    ['teal','cool','green'],
  green:   ['green','teal','mustard'],
  violet:  ['violet','cool','hot'],
  mustard: ['mustard','warm','green'],
  neutral: ['neutral'],
  rainbow: ['rainbow'],
};

function score(p, d) {
  let s = 0;
  if (d.ground_family && p.ground_family === d.ground_family) s += 100;
  if (d.hue_bias) {
    if (p.hue_bias === d.hue_bias) s += 50;
    else if (HUE_GROUPS[d.hue_bias]?.includes(p.hue_bias)) s += 20;
  }
  if (d.saturation !== null) s += Math.max(0, 30 - 10 * Math.abs(p.saturation_level - d.saturation));
  if (d.energy !== null)     s += Math.max(0, 20 - 8  * Math.abs(p.energy           - d.energy));
  return s;
}

const scored = library.palettes
  .map(p => ({ p, s: score(p, descriptor) }))
  .sort((a, b) => b.s - a.s);

const positive = scored.filter(x => x.s > 0);
const candidates = (positive.length > 0 ? positive.slice(0, 5) : scored.slice(0, 5))
  .map(x => x.p);

// === Recommended pick: byte[0] of MD5(desc + date) mod len ================

const hash = crypto.createHash('md5').update(description + today).digest();
const recommendedIndex = hash[0] % candidates.length;
const recommended = candidates[recommendedIndex];

// === Page colors: lightest swatch -> bg, darkest -> fg ====================

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) / 255, g = ((n >> 8) & 0xff) / 255, b = (n & 0xff) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const sortedByLuma = [...recommended.hexes].sort((a, b) => luminance(b) - luminance(a));
const pageBg = sortedByLuma[0];
const pageFg = sortedByLuma[sortedByLuma.length - 1];
const pageAccent = recommended.anchor;

// Surface color: a near-bg neutral. If the lightest is too close to bg,
// use the second lightest as a card background; else darken slightly.
const cardBg = sortedByLuma[1] || pageBg;

// === Render UI per § 4 contract ============================================

const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function tagsFor(p) {
  const tags = [
    `ground: ${p.ground_family}`,
    `hue: ${p.hue_bias}`,
    `sat: ${p.saturation_level}/5`,
    `energy: ${p.energy}/5`,
  ];
  return tags.map(t => `<span class="tag">${escape(t)}</span>`).join('');
}

function swatchStrip(hexes, anchor) {
  return hexes.map(h => {
    const isAnchor = h.toUpperCase() === anchor.toUpperCase();
    return `<span class="swatch${isAnchor ? ' anchor' : ''}" style="--c:${h}" title="${escape(h)}${isAnchor ? ' · anchor' : ''}"><span class="hex">${escape(h)}</span></span>`;
  }).join('');
}

function candidateCard(p, i) {
  const isRec = i === recommendedIndex;
  return `
<li class="candidate${isRec ? ' recommended' : ''}" data-index="${i + 1}">
  <header>
    <span class="num">${i + 1}</span>
    ${isRec ? '<span class="badge">RECOMMENDED</span>' : ''}
    <h2>${escape(p.name)}</h2>
  </header>
  <div class="swatches" aria-label="palette swatches">${swatchStrip(p.hexes, p.anchor)}</div>
  <footer>
    <div class="tags">${tagsFor(p)}</div>
    <a class="source" href="${escape(p.source)}" target="_blank" rel="noopener">coolors.co source &rarr;</a>
  </footer>
</li>`;
}

const descriptorRows = Object.entries(descriptor).map(([k, v]) => {
  const label = k.replace('_', ' ');
  const value = v === null ? '<span class="null">—</span>' : escape(String(v));
  return `<dt>${escape(label)}</dt><dd>${value}</dd>`;
}).join('');

const provenance = `<!-- stardust:provenance
  writtenBy: demo:pick-palette.mjs
  writtenAt: ${new Date().toISOString()}
  description: ${description.replace(/[^\x20-\x7e]/g,'')}
  libraryVersion: ${library.version}
  candidatesScored: ${library.palettes.length}
  recommendedIndex: ${recommendedIndex}
  recommendedPalette: ${recommended.name}
  pickedAt: ${today}
-->`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
${provenance}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Palette pick — stardust v2 demo</title>
<style>
:root {
  --bg:     ${pageBg};
  --fg:     ${pageFg};
  --accent: ${pageAccent};
  --card:   ${cardBg};
  --line:   color-mix(in oklab, ${pageFg} 14%, transparent);
  --muted:  color-mix(in oklab, ${pageFg} 60%, transparent);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 48px;
  --space-6: 96px;

  --radius: 4px;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  background: var(--bg);
  color: var(--fg);
  font: 17px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  font-feature-settings: "ss01", "cv11";
  letter-spacing: -0.005em;
  padding: var(--space-5) var(--space-4) var(--space-6);
}
.container { max-width: 1100px; margin: 0 auto; }

header.page {
  border-bottom: 1px solid var(--line);
  padding-bottom: var(--space-5);
  margin-bottom: var(--space-5);
}
header.page h1 {
  font-size: clamp(40px, 6vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  font-weight: 600;
  margin: 0 0 var(--space-3);
}
header.page .desc {
  font-size: 21px;
  line-height: 1.4;
  color: var(--muted);
  margin: 0 0 var(--space-4);
  max-width: 64ch;
}
header.page .desc q {
  color: var(--fg);
  font-style: italic;
}
header.page .descriptor {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-2) var(--space-4);
  margin: 0;
  padding: var(--space-3) 0 0;
  border-top: 1px solid var(--line);
}
header.page .descriptor dt {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 600;
}
header.page .descriptor dd {
  margin: 2px 0 0;
  font-size: 18px;
  font-weight: 500;
}
header.page .descriptor dd .null { color: var(--muted); font-weight: 400; }

ol.candidates {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
ol.candidates .candidate.recommended { grid-column: 1 / -1; }

li.candidate {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: transform 0.15s ease;
}
li.candidate:hover { transform: translateY(-2px); }
li.candidate.recommended {
  border: 2px solid var(--accent);
  padding: var(--space-5);
  gap: var(--space-4);
}

li.candidate header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
li.candidate .num {
  display: inline-flex;
  width: 32px; height: 32px;
  align-items: center;
  justify-content: center;
  background: var(--fg);
  color: var(--bg);
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 15px;
}
li.candidate.recommended .num {
  width: 44px; height: 44px;
  font-size: 21px;
  background: var(--accent);
  color: ${pageBg};
}
li.candidate .badge {
  font-size: 11px;
  letter-spacing: 0.12em;
  font-weight: 700;
  background: var(--accent);
  color: ${pageBg};
  padding: 4px 8px;
  border-radius: 2px;
  margin-right: auto;
}
li.candidate h2 {
  margin: 0;
  font-size: 21px;
  letter-spacing: -0.015em;
  font-weight: 600;
}
li.candidate.recommended h2 { font-size: 28px; }

.swatches {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 88px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--line);
}
li.candidate.recommended .swatches { height: 132px; }
.swatch {
  background: var(--c);
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: var(--space-2);
}
.swatch.anchor::after {
  content: "";
  position: absolute;
  top: 6px; right: 6px;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.25);
}
.swatch .hex {
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 10px;
  letter-spacing: 0;
  background: rgba(0,0,0,0.5);
  color: white;
  padding: 2px 4px;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.1s ease;
}
.swatch:hover .hex { opacity: 1; }

li.candidate footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-2);
}
.tag {
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 11px;
  padding: 3px 6px;
  border: 1px solid var(--line);
  border-radius: 2px;
  color: var(--muted);
}
.source {
  font-size: 13px;
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}
.source:hover { color: var(--accent); border-bottom-color: var(--accent); }

footer.page {
  margin-top: var(--space-5);
  padding-top: var(--space-4);
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-4);
  flex-wrap: wrap;
  color: var(--muted);
  font-size: 14px;
}
footer.page .prompt { color: var(--fg); font-weight: 500; }
footer.page .lib    { font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace; font-size: 12px; }

@media (max-width: 720px) {
  ol.candidates { grid-template-columns: 1fr; }
  ol.candidates .candidate.recommended { grid-column: auto; }
}
</style>
</head>
<body>
<div class="container">
  <header class="page">
    <h1>Palette pick</h1>
    <p class="desc">Description: <q>${escape(description)}</q></p>
    <dl class="descriptor">
      ${descriptorRows}
    </dl>
  </header>

  <main>
    <ol class="candidates">
      ${candidates.map(candidateCard).join('')}
    </ol>
  </main>

  <footer class="page">
    <span class="prompt">Tell the assistant a number (1&ndash;${candidates.length}), a palette name, or &ldquo;refine&rdquo; to change the description.</span>
    <span class="lib">stardust palette library ${library.version} &middot; ${library.total} palettes</span>
  </footer>
</div>
</body>
</html>
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html);

console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
console.log(`Description: "${description}"`);
console.log(`Descriptor: ${JSON.stringify(descriptor)}`);
console.log(`Candidates (${candidates.length}):`);
candidates.forEach((p, i) => {
  const mark = i === recommendedIndex ? '★' : ' ';
  console.log(`  ${mark} ${i + 1}. ${p.name.padEnd(32)} ground=${p.ground_family.padEnd(16)} hue=${p.hue_bias.padEnd(8)} sat=${p.saturation_level} energy=${p.energy}`);
});
console.log(`Recommended: #${recommendedIndex + 1} ${recommended.name}`);
