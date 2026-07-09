<div align="center">

<img src="https://raw.githubusercontent.com/v3vermillion/axistechnologies/main/docs/screenshots/hero-desktop.png" alt="Vermillion Axis Technologies — Precision Engineered Software" width="820">

# Vermillion Axis Technologies

**A dark, cinematic marketing site engineered like a product — one self-contained static artifact, a measured design system, and an automated cross-device verification harness behind every release.**

[**Live Site →**](https://vermillionaxis.tech)

[![Deploy to GitHub Pages](https://github.com/v3vermillion/axistechnologies/actions/workflows/pages.yml/badge.svg)](https://github.com/v3vermillion/axistechnologies/actions/workflows/pages.yml)
![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?logo=astro&logoColor=white)
![Zero runtime dependencies](https://img.shields.io/badge/runtime_deps-0-e63b4e)
![Page weight](https://img.shields.io/badge/HTML-21_KB_gzipped-090607)
![Self-hosted fonts](https://img.shields.io/badge/3rd--party_requests-0-090607)

</div>

---

## What This Is

The production site for **Vermillion Axis Technologies** — a custom software engineering studio. The entire experience ships as a single 86 KB HTML file (21 KB over the wire): styles, SVG iconography, motion system, and behavior, with nine self-hosted font subsets as the only additional requests. **Ten same-origin requests, zero third parties, no framework runtime.**

A component-structured **Astro source tree** mirrors the artifact 1:1 for teams that prefer modern component workflows — both implementations are maintained in parity and verified against each other.

<div align="center">
<img src="https://raw.githubusercontent.com/v3vermillion/axistechnologies/main/docs/screenshots/mobile-triptych.png" alt="Mobile hero, animated stats, and footer" width="820">
</div>

## Engineering Decisions

**Design tokens derived from measurement, not guesswork.** The crimson accent family (`#e63b4e`, hue 353°), the neutral silver text ramp, and the logo lockup proportions were pixel-sampled and measured from brand reference material, then propagated through every one of the site's ~130 color references. Nothing is approximately on-brand; it is provably on-brand.

**A zero-dependency deploy artifact.** `index.html` requires no build step, no package install, and no server logic. It can be served by any static host, opened from disk, or embedded in another system. The Astro tree exists for developer ergonomics, not as a runtime requirement.

**Self-hosted, subset typography.** Cormorant Garamond (display serif), Source Sans 3 (body), and JetBrains Mono (metrics) ship as latin `woff2` subsets — 196 KB total, preloaded, `font-display: swap`. Removing the Google Fonts round-trip eliminates a DNS + TLS handshake from the critical path and the site's only third-party tracking surface.

**Motion as a system, not decoration.** A choreographed hero sequence (plumb-line drop → lockup fade → staggered headline), scroll-triggered reveals, synchronized stat counters, slow capability marquees, and a recurring sheen sweep on the primary CTA — every animation is driven by two IntersectionObservers and CSS keyframes, and every one of them is disabled under `prefers-reduced-motion` with content fully visible.

**Spacing on a measured rhythm.** Inter-section gaps were audited programmatically (DOM content-edge analysis at three viewports) and normalized to a consistent 83–176 px scale, with section padding stepping from 88 px (desktop) to 64 px (mobile).

## Design System

| Token | Value | Role |
|---|---|---|
| Accent | `#e63b4e` (crimson, hue 353°) | CTAs, wordmark, glow, dividers |
| Accent deep | `#c41a33` → `#a31226` | Gradients, pressed states |
| Canvas | `#090607` | Page background — near-black, faint red lean |
| Text ramp | `#f2f1f2` / `#c9c8ca` / `#918f93` | Bright / body / dim — neutral silvers |
| Display | Cormorant Garamond, small-caps | Headings, lockups, buttons |
| Body | Source Sans 3 | Copy, labels, forms |
| Data | JetBrains Mono | Metrics, marquees, mock UI |

Signature details: metallic vertical gradients clipped to display glyphs (`#ffffff → #96959b` silver, `#f2566b → #c8182f` crimson), corner-bracket frames on section headers, and a focused radial halo anchored to the logo's plumb point.

## Page Anatomy

Hero lockup → capability marquee → animated proof metrics → six illustrated portfolio systems (analytics, CRM, membership, e-commerce, coaching operations, mobile) built as pure-CSS/SVG product mockups → transparent three-tier pricing → head-to-head comparison → capabilities grid → five-step process → brand statement → testimonials → FAQ accordion → contact intake → full-lockup footer.

Every product mockup is hand-built markup — no images — so the portfolio renders crisp at any DPI and weighs nothing.

## Architecture

```
├── index.html                   # Production artifact — fully self-contained
├── 404.html                     # Branded not-found page (asset-independent by design)
├── fonts/                       # Self-hosted woff2 subsets (latin, preloaded)
├── standalone/index.html        # Verbatim portable copy of the artifact
│
├── src/                         # Astro source — 1:1 component mirror
│   ├── pages/index.astro        #   page composition
│   ├── layouts/Layout.astro     #   head, fonts, global behavior
│   ├── components/              #   Header · Hero · Work · Pricing · Why · Capabilities
│   │                            #   Process · Statement · Testimonials · Faq · Contact · Footer
│   └── styles/global.css        #   the complete design system
├── public/fonts/                # Font subsets for the Astro build
│
└── .github/workflows/pages.yml  # CI — deploys repo root to GitHub Pages on push
```

## Quality & Verification

Every release is gated on an automated Playwright pass against the exact deploy artifact:

| Check | Method |
|---|---|
| Rendering | Full-page captures at iPhone 14 Pro, iPad Pro 11, 1440 px desktop |
| Layout integrity | Document width must equal viewport width — zero horizontal overflow |
| Console hygiene | Zero console errors, zero page errors across all viewports |
| Interactions | Menu + scroll-lock, FAQ ARIA states, form validation, marquees, back-to-top handoff |
| Counter sync | Stat counters sampled mid-animation and proven to run in lockstep |
| Spacing rhythm | DOM content-edge audit of every inter-section gap |
| Motion safety | Dedicated `prefers-reduced-motion` render with all animation disabled |

## Getting Started

**Serve the production artifact** — no toolchain required:

```bash
python3 -m http.server 8000    # → http://localhost:8000
```

**Or develop against the Astro source:**

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # outputs dist/
```

**Deploy:** pushing to `main` publishes the repository root to GitHub Pages automatically. The Astro build deploys anywhere static hosting exists (Vercel/Netlify auto-detect).

## Customization

- **Lead capture** — the contact form opens a prefilled email to `contact@vermillionaxis.tech`; swap the submit handler in `index.html` / `src/layouts/Layout.astro` for a Formspree or API endpoint to capture server-side.
- **Marquee content** — data-driven via `data-mq` attribute lists.
- **Metrics** — the stat counters read targets from `data-count` (templated values like `<{0}hr` and `{0}–{1}` supported).

> Displayed metrics and portfolio mockups are illustrative — this repository is a demonstration build.

---

<div align="center">

**Vermillion Axis Technologies** · Systems architecture for organizations that refuse to compromise.

[vermillionaxis.tech](https://vermillionaxis.tech) · [contact@vermillionaxis.tech](mailto:contact@vermillionaxis.tech) · (234)-343-9124

</div>
