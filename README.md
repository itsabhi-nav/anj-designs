# ANJ Designs by Decor Inn — Website 2.0

A complete rebuild of **anjdesigns.in** as a cinematic, editorial, motion-led
website, built on the original ANJ Designs / Décor Inn brand and the company's
own photography.

- **Framework** — Next.js 15 (App Router) · React 19 · TypeScript
- **Styling** — Tailwind CSS 3.4 with a bespoke design system
- **Motion** — GSAP + ScrollTrigger (scroll choreography, dynamically imported),
  CSS transforms for the rest, `motion` for component-level interaction
- **Icons** — `lucide-react`
- **Images** — build-time responsive variants served as static, immutable files
- **Fonts** — Cormorant Garamond · Manrope · JetBrains Mono, self-hosted by
  `next/font`

---

## The design direction

**An architectural drawing set, made cinematic.**

The studio's own work is architecture and interiors, so the site is built as if
it were a set of issued drawings — every section is numbered like a sheet, the
metadata is set in a technical monospace, hairline column grids sit behind the
content, and photographs are framed with architectural crop marks. Over that,
a film-grade layer: a full-bleed hero that settles into place, a pinned
horizontal run through the portfolio, a kinetic belief band, film grain, glass
plates, a custom cursor and magnetic calls to action.

Three typefaces, three jobs:

| Face | Role |
| --- | --- |
| Cormorant Garamond | Display — headlines, statements, pull quotes |
| Manrope | Body — running copy, navigation, buttons |
| JetBrains Mono | Technical metadata — sheet numbers, coordinates, counters |

**The heroes are photographs**, taken from the studio's own completed
interiors — the teal salon, the grand staircase, the craftsman at the lathe,
the ochre armchair under the woven pendant. Each is also cut to a 3:4 portrait
frame for phones from the same original file, so a tall viewport never
upscales a landscape frame.

Full detail in `docs/HANDOVER.md` §2.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in the values you need
npm run dev                    # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Quality gates:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # production build
```

---

## What is in the repository

```
src/
  app/
    layout.tsx              Fonts, metadata, JSON-LD, header/footer
    page.tsx                Home
    about/page.tsx          About (founder-led editorial story)
    services/page.tsx       Expertise / services
    projects/page.tsx       Portfolio index with filters
    projects/[slug]/page.tsx Reusable project detail template (13 static routes)
    contact/page.tsx        Contact + enquiry form
    api/contact/route.ts    Server-side validation, rate limit, delivery
    manifest.ts             Web app manifest
    robots.ts  sitemap.ts   SEO
    not-found.tsx           404
    globals.css             Design system
  components/
    layout/                 SiteHeader, MenuOverlay, SiteFooter, PageHero
    home/                   Hero, BrandStatement, WhatWeDo, StudioIndex,
                            BeliefBand, FeaturedProjects, ServicesShowcase,
                            Values, Craftsmanship, Approach, Founder, ClosingCta,
                            ProjectRail, CraftRangeList
    projects/               ProjectIndex, ProjectGallery, Lightbox
    contact/                ContactForm
    motion/                 Reveal, SplitLines, ScrollProgress, Cursor,
                            Magnetic, ScrollChoreography (Parallax /
                            PinnedStory / PinnedHorizontal)
    ui/                     Media, Button, DeferredVideo, Sheet, StudioClock
  data/                     site, projects, services, testimonials, assets,
                            craft, image-variants (generated)
  lib/                      media, image-loader, pointer, seo, validation,
                            email, utils
  types/                    project, service
public/assets/              All original ANJ Designs assets + generated variants
scripts/                    Asset, variant and QA tooling (see below)
docs/                       Extraction notes, media pipeline, handover, questions
```

---

## Content is data, not markup

Every project, service, testimonial, contact detail and piece of copy lives in
`src/data/`. Nothing is hard-coded in a component.

| File | Contains |
| --- | --- |
| `src/data/site.ts` | Brand, navigation, contact details, addresses, social links |
| `src/data/projects.ts` | The 13 published projects, galleries, categories |
| `src/data/services.ts` | The four service offerings, furniture ranges, finishes, styles, manufacturing facts |
| `src/data/testimonials.ts` | Attributed testimonials, flagged by verification state |
| `src/data/assets.ts` | **Generated** asset manifest — path, type, dimensions, usage |
| `src/data/craft.ts` | The curated craft library extracted from the portfolio PDFs |

`src/data/assets.ts` is regenerated by `npm run assets:manifest` and fails if
any referenced asset is missing on disk.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run assets:fetch` | Downloads the original assets from anjdesigns.in into `public/assets` |
| `npm run assets:extract-pdf` | Extracts the photography from the official portfolio PDFs (needs `.venv-pdf`) |
| `npm run assets:curate` | Categorises the extracted photography using the PDFs' own range headings |
| `npm run assets:manifest` | Regenerates `src/data/assets.ts` and validates every reference |
| `npm run assets:variants` | Generates the responsive image variants and the loader manifest |
| `npm run assets:hero-crops` | Cuts the 3:4 mobile hero crops from the original photographs |
| `npm run assets:social` | Builds the 1200 × 630 social share card |
| `npm run assets:hero-crops` | Generates art-directed 3:4 mobile crops of the hero images |
| `node scripts/visual-qa.mjs` | Screenshots every page at 8 widths and reports overflow, broken images, dead links and console errors |
| `node scripts/lighthouse-audit.mjs` | Lighthouse across all six page types |
| `node scripts/measure-vitals.mjs` | Real-browser Core Web Vitals under CDP throttling (Slow 4G + 4× CPU) |
| `node scripts/measure-lcp-trace.mjs` | Observed LCP read from the Chrome trace |
| `node scripts/find-overflow.mjs` | Lists the elements causing horizontal overflow |

The PDF tooling needs PyMuPDF and Pillow:

```bash
python3 -m venv .venv-pdf
.venv-pdf/bin/pip install pymupdf pillow imageio imageio-ffmpeg
```

---

## Content rules that were followed

- Every photograph, video and the logo come from the original site or the
  company's own official portfolio PDFs. No stock imagery, no generated
  interiors, no invented manufacturing scenes.
- No project description, area, budget, client, material or date is asserted
  for any project — the original site publishes none, so the project pages are
  image-led.
- Where the company's own sources disagree (the founding year, the size of the
  manufacturing unit, which e-mail addresses are public) the discrepancy is
  **recorded, not silently resolved**. See `docs/OPEN-QUESTIONS.md`.
- Testimonials published in the portfolio PDFs carry a full name, location and
  role; the three on the website that only carry a name are flagged
  `verified: false` in the data layer.

See `docs/ORIGINAL-SITE-EXTRACTION.md` for the full extraction and
`docs/HANDOVER.md` for the delivery summary.
