# Lumenx, Sustainable Energy

Marketing website for **Lumenx**, an Australian solar energy company (solar, batteries,
EV charging, heat pumps) serving Victoria and New South Wales.

> Together, we build a brighter future.

Brand name is always written **"Lumenx"** (capital L, lowercase x). Domain: **lumenex.com.au**.

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (CSS-first, tokens in `app/globals.css`)
- **GSAP 3** + `@gsap/react` (ScrollTrigger) for scroll and entrance animation
- **Lenis** for smooth scrolling
- **Motion** (Framer Motion), available for component animation
- **split-type** for text splitting in headline animation
- **lucide-react**, **clsx**, **tailwind-merge** for icons and class utilities

### A note on 3D (Three.js / React Three Fiber)

Deliberately **not** installed yet. `@react-three/fiber@9.7.0` (the current latest)
declares a peer range of `react ">=19 <19.3"`, so it conflicts with React 19.3 and
breaks `npm install`. When we actually build a 3D hero, either pin React to `19.2.x`
or wait for R3F to support 19.3, don't install it with `--legacy-peer-deps`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

> Install on your own machine (Windows/macOS) so native binaries match your OS.

## Project structure

```
app/
  layout.jsx        # fonts (Inter Tight + Roboto), metadata, chrome
  page.jsx          # home page (sections + JSON-LD)
  globals.css       # Tailwind v4 @theme brand tokens + base styles
components/
  Header, Footer, SmoothScroll
  Hero, Marquee, Stats, Services, WhyLumenx, Process,
  RebatesBand, Reviews, Faq, CTA
  ui/Reveal.jsx     # scroll-reveal helper
lib/
  site.js           # all site content (nav, services, steps, offices, FAQ...)
public/
  logos/  icons/  images/  favicon.png   # client brand assets (optimised)
```

## Brand tokens (from LUMENX Brand Guidelines)

| Token | Hex |
|---|---|
| Ember | `#E8420A` |
| Blue | `#0B143B` |
| Yellow | `#FFB120` |
| White (off-white) | `#FAF7F1` |
| Green | `#81D553` |

Fonts: **Inter Tight** (headings) + **Roboto** (body).

## Before launch, TODOs

- Replace the placeholder **phone** (`1300 000 000`) and confirm the **email** in `lib/site.js`.
- Swap placeholder **reviews** for real Google reviews (+ AggregateRating schema).
- Build out inner pages per the SEO blueprint (service hubs, system sizes, locations, rebates, calculators, blog).
- Set `en_AU` everywhere (already set) and add per-page metadata + sitemap/robots.
```
