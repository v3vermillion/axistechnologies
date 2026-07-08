# Vermillion Axis Technologies — Astro Rebuild

Component-structured Astro rebuild of vermillionaxis.tech. Verified with `astro build`.

## Develop
    npm install
    npm run dev        # localhost:4321

## Deploy
    npm run build      # outputs dist/
Push to GitHub and import into Vercel/Netlify (auto-detects Astro), or drag `dist/` into Netlify Drop.
Point vermillionaxis.tech at the host (Vercel: A 76.76.21.21, CNAME cname.vercel-dns.com for www).

## Structure
- `src/pages/index.astro` — page composition
- `src/components/` — Header, Hero, Work, Pricing, Why, Capabilities, Process, Statement, Testimonials, Faq, Contact, Footer, Marquee, Divider
- `src/layouts/Layout.astro` — head, fonts, global script
- `src/styles/global.css` — full design system (crimson #e63b4e / silver neutrals / #090607, self-hosted fonts in `public/fonts/`)

## Notes
- Contact form opens a prefilled email to contact@vermillionaxis.tech — swap the handler in Layout.astro for Formspree/your API to capture leads server-side.
- Five FAQ answers were rewritten in brand voice (closed in reference screenshots); "What happens after launch?" is verbatim.
