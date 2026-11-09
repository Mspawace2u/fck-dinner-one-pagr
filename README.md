# F*ck Dinner — One-Pagr

Independent, mobile-first four-tab creative prototype. Not an official F*ck Dinner website.

## Authoritative inputs

- [Build handoff](docs/CODEX-BUILD-HANDOFF.md)
- [Approved copy](docs/APPROVED-SITE-COPY.md)
- [Visual audit](docs/VISUAL-BRAND-AUDIT.md)

The repository documents are authoritative per the owner's current instruction, superseding their legacy Notion-source annotations. Baseline fetched from `origin/main` at `f2eb407`.

## Run locally

Node 20.19+ or 22.12+ is required by Vite.

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
```

Tests use `/usr/bin/chromium` by default. Set `CHROMIUM_PATH` to your Chromium executable on other machines. Tests build the app and launch a local production preview on port 4173. Browser screenshots are written to ignored `test-results/`.

## Source layout

- `index.html`: approved editorial copy, four panels, navigation and destinations.
- `src/main.js`: tabs, keyboard navigation, URL/history state, optional authentic portrait.
- `src/style.css`: responsive pink/red brand treatment, focus and reduced-motion support.
- `public/assets/`: authentic owner-supplied image files only.
- `tests/site.spec.js`: responsive behavior, accessibility semantics, URL allowlist, CTAs and missing assets.

Poppins is a provisional match, self-hosted from `@fontsource/poppins`, not a claim about the original website's font. No third-party embeds, scraping, analytics, fake forms, shop, or payment flows.

## Missing inputs

**Liza portrait:** Add the original `IMG_8662.jpeg` to `public/assets/liza-profile.jpeg` (or retain the name `IMG_8662.jpeg` in that directory). Restart/rebuild after adding it. About automatically displays the authentic image without cropping; until then it displays a labeled pending space. Do not substitute another image. Correct its alt text if the supplied photo differs from the documented portrait.

**Substack:** Exact publication/subscription URL is unconfirmed. FEED ME! is disabled with a visible explanation; no pricing or invented destination is published. Wire only after verification.

**Social gallery:** Individual post URLs and original screenshots/video stills are not supplied. Category cards use the brief's permitted fallback to source-confirmed social profiles and identify those destinations. No fabricated video previews or article claims.

## Validation and review

See [implementation notes](docs/IMPLEMENTATION-NOTES.md) for test evidence and limits. This repository is the independent source: https://github.com/Mspawace2u/fck-dinner-one-pagr. No deployment has been created. Vite's `dist/` output is suitable for a static host, but deployment, production, promotion, and use of an external Q3 link require owner review and explicit approval. Do not alter fuckdinner.com or other production properties. Do not connect a deployment integration or push to a branch that might trigger publication without checking the gate.
