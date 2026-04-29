# Deployed sites

This folder holds **deployed static sites** built with stardust —
the artefacts of `stardust:migrate` runs, dropped here to share with
customers via GitHub Pages.

These are NOT showcase samples. The showcase
(`samples/index.html` + `samples/index.json`) does not list anything
in this folder; sites here are reachable only by direct URL.

## URL

Each site is served at:

```
https://paolomoz.github.io/stardust-2/sites/<slug>/
```

For example, `samples/sites/heathrow-2026-04-29/index.html` is
reachable at:

```
https://paolomoz.github.io/stardust-2/sites/heathrow-2026-04-29/
```

## Slug convention

`<brand>-<YYYY-MM-DD>` for internal previews and supports multiple
iterations of the same brand. Append a 4-char token
(`<brand>-<date>-<token>`) when sharing externally and the URL
should be hard to guess.

## What goes here

A site folder is whatever `stardust:migrate` produces, copied in
verbatim:

```
sites/<slug>/
├── index.html
├── about/
├── assets/
│   ├── logos/
│   ├── photos/
│   └── css/
└── ...
```

Each HTML file should carry `<meta name="robots" content="noindex,
nofollow" />` in `<head>` — this is the primary mechanism. The
`samples/robots.txt` at the showcase root also disallows `/sites/`,
but project Pages share the org-level robots.txt at
`https://paolomoz.github.io/robots.txt`, so most crawlers won't see
ours. The per-page meta is what does the work.

## Adding a site

```sh
mkdir -p samples/sites/<slug>
cp -R <project>/migrated/* samples/sites/<slug>/
# Verify each HTML has the noindex meta tag
git add samples/sites/<slug>
git commit -m "sites: deploy <slug>"
git push origin main
```

The next Pages workflow run picks it up automatically — no manual
changes to `samples/index.json` (it's only the showcase manifest).
