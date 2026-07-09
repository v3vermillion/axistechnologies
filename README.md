<div align="center">

<img src="https://raw.githubusercontent.com/v3vermillion/axistechnologies/main/docs/screenshots/hero-desktop.png" alt="Vermillion Axis Technologies — Precision Engineered Software" width="820">

# Vermillion Axis Technologies

**Precision-engineered marketing site — a dark, cinematic single-page experience built as a hand-tuned static artifact with a component-structured Astro source.**

[**Live Site →**](https://vermillionaxis.tech)

[![Deploy to GitHub Pages](https://github.com/v3vermillion/axistechnologies/actions/workflows/pages.yml/badge.svg)](https://github.com/v3vermillion/axistechnologies/actions/workflows/pages.yml)
![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?logo=astro&logoColor=white)
![Zero runtime dependencies](https://img.shields.io/badge/runtime_deps-0-e63b4e)
![Self-hosted fonts](https://img.shields.io/badge/fonts-self--hosted-090607)

</div>

---

## Overview

This repository powers **vermillionaxis.tech** — the marketing site for Vermillion Axis Technologies, a custom software engineering studio. The site is a single, fully self-contained HTML artifact (no framework runtime, no third-party requests) with a parallel Astro source tree for component-based development.

Every visual decision is derived from a measured design system: colors were pixel-sampled from brand reference material, typography and logo proportions were calibrated against measured ratios, and the result is verified with automated cross-device rendering checks before every release.

<div align="center">
<img src="https://raw.githubusercontent.com/v3vermillion/axistechnologies/main/docs/screenshots/mobile-triptych.png" alt="Mobile hero, animated stats, and footer" width="820">
</div>

## Highlights

- **Zero-dependency deploy artifact** — `index.html` ships everything: styles, SVG iconography, and behavior in one file. No build step required to serve it.
- **Self-hosted typography** — Cormorant Garamond, Source Sans 3, and JetBrains Mono as latin `woff2` subsets (~196 KB total) with preload hints. No Google Fonts round-trip, no third-party tracking surface, faster first paint.
- **Measured design system** — crimson `#e63b4e` accent family (hue 353°), neutral silver text ramp, near-black `#090607` canvas. Every one of the site's color references resolves to this system.
- **Cinematic micro-interactions** — plumb-line drop, focused halo glow, synchronized stat counters, slow-scrolling capability marquees, and a recurring sheen sweep on the primary CTA. All motion respects `prefers-reduced-motion`.
- **Accessible by construction** — semantic landmarks, ARIA states on the accordion and menu, visible `:focus-visible` rings, dark `color-scheme` declaration.
- **Provably responsive** — verified at iPhone, iPad, and desktop viewports on every release: zero console errors, zero horizontal overflow, all interactions exercised end-to-end.

## Architecture

Two synchronized implementations live side by side:

```
├── index.html              # Production artifact — fully self-contained static site
├── 404.html                # Branded not-found page (asset-independent by design)
├── fonts/                  # Self-hosted woff2 subsets served with the static site
├── standalone/index.html   # Verbatim copy of the artifact for portable use
│
├── src/                    # Astro source (component-structured equivalent)
│   ├── pages/index.astro   #   page composition
│   ├── layouts/Layout.astro#   head, fonts, global behavior
│   ├── components/         #   Header, Hero, Work, Pricing, Why, Capabilities,
│   │                       #   Process, Statement, Testimonials, Faq, Contact, Footer
│   └── styles/global.css   #   the complete design system
├── public/fonts/           # Font subsets for the Astro build
│
└── .github/workflows/pages.yml  # CI: deploys the repo root to GitHub Pages on push
```

The static artifact is canonical for production; the Astro tree mirrors it 1:1 for teams that prefer component-based iteration. Both are kept in parity.

## Design System

| Token | Value | Role |
|---|---|---|
| Accent | `#e63b4e` (crimson, hue 353°) | CTAs, wordmark, glow, dividers |
| Accent deep | `#c41a33` → `#a31226` | Gradients, pressed states |
| Canvas | `#090607` | Page background (near-black, faint red lean) |
| Text ramp | `#f2f1f2` / `#c9c8ca` / `#918f93` | Bright / body / dim — neutral silvers |
| Serif | Cormorant Garamond | Display, headings, small-caps lockups |
| Sans | Source Sans 3 | Body copy, labels |
| Mono | JetBrains Mono | Metrics, marquees, mock UI data |

Signature detail: headline text uses vertical metallic gradients (`#ffffff → #96959b` silver, `#f2566b → #c8182f` crimson) clipped to the glyphs.

## Getting Started

**Serve the production artifact directly** — no toolchain needed:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

**Or develop against the Astro source:**

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # outputs dist/
```

## Deployment

Pushing to `main` triggers the GitHub Pages workflow, which publishes the repository root — the site is live within seconds of merge. The Astro build deploys anywhere static hosting exists (Vercel and Netlify auto-detect it; point `vermillionaxis.tech` at your host of choice).

## Quality & Verification

Releases are gated on an automated Playwright pass against the exact deploy artifact:

- **Rendering** — full-page captures at iPhone 14 Pro, iPad Pro 11, and 1440 px desktop; zero console/page errors; document width exactly matches each viewport (no horizontal overflow).
- **Behavior** — mobile menu with scroll-lock, FAQ accordion ARIA states, marquee population, back-to-top handoff (floating button yields to the footer's inline control), contact form validation, and stat counters proven to animate in lockstep via time-series sampling.
- **Motion safety** — a dedicated `prefers-reduced-motion` render confirms the page is fully readable with all animation disabled.

## Customization Notes

- The contact form opens a prefilled email to `contact@vermillionaxis.tech`. To capture leads server-side, swap the submit handler in `index.html` (and `src/layouts/Layout.astro`) for a Formspree or API endpoint.
- The capability marquee content is data-driven — edit the `data-mq` attribute lists.

---

<div align="center">

**Vermillion Axis Technologies** · Systems architecture for organizations that refuse to compromise.

[vermillionaxis.tech](https://vermillionaxis.tech) · [contact@vermillionaxis.tech](mailto:contact@vermillionaxis.tech)

</div>
