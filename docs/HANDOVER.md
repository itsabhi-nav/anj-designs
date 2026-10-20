# Handover — ANJ Designs website 2.0

**Site:** https://anjdesigns.in/ (rebuilt)
**Stack:** Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS 3.4 ·
GSAP/ScrollTrigger · motion · lucide-react
**Status:** Complete, builds clean, tested in a real browser at eight widths.

---

## 1. What was delivered

### Pages

| Page | Route | Notes |
| --- | --- | --- |
| Home | `/` | Cinematic hero, brand statement, what-we-do, featured projects, services, values, craftsmanship, approach, founder, closing CTA |
| About | `/about` | Founder-led editorial story, company timeline, vision & mission, founder profile, philosophy, approach |
| Expertise | `/services` | Four services, each with a different layout; furniture ranges; finishes; testimonials |
| Projects | `/projects` | Asymmetrical editorial index with category filters |
| Project detail | `/projects/[slug]` | 13 static routes — hero, facts, gallery + lightbox, prev/next, related |
| Contact | `/contact` | Details, map link, real enquiry form with server validation |
| 404 | `/not-found` | On-brand, links to the portfolio |

### Original assets extracted and preserved

- **129 files** pulled directly from the live site (logo + alternates, favicon,
  hero art, all 13 project galleries, service imagery, founder portrait,
  3 videos, 4 official portfolio PDFs).
- **395 full-resolution photographs** extracted from the company's own official
  portfolio PDFs — the site itself only publishes 344 × 344 thumbnails of the
  projects, and these are the genuine masters. They are categorised using the
  range headings printed in the PDFs (Bedroom, Entrance Foyers, Dining Room,
  Formal Living Room, Informal Living Space, Wall Panels, Bar Units, Media
  Units & Consoles, Study Tables, Chairs, Dressers, Kids Bedroom, LED Profile
  Lights, Finishes, Handcrafted Work, Workshop).
- Every asset is recorded in the generated manifest
  `src/data/assets.ts` — path, type, page, project, true pixel dimensions,
  aspect ratio, hero/gallery suitability. `npm run assets:manifest` fails the
  build if a referenced file is missing.
- Original masters are never overwritten. Optimised variants live beside them.

### Business content recovered from the portfolio PDFs

Much of the best copy on the site was only available inside the PDFs, and has
been carried over:

- The company's **vision and mission** statements (also published as artwork on
  the live About page).
- **Values, mission and vision** in the studio's own words.
- The **manufacturing facts**: 22,500 sq ft unit, 100+ projects in the last two
  years, 8–10 full-size bedrooms in 30 days, machine manufacturing with
  handcrafted finishes.
- The complete **furniture range lists** and the **19 named finishes** and
  **8 styles**.
- The **team**: Annie Nagpal Jain (Creative Head), Rukaiya Bano (Senior Interior
  Designer), Sana (Interior Designer).
- **Three fully attributed testimonials** with names, locations and roles —
  the website's own three carry only a name.
- The founder's extended biography and the two additional addresses (Vasant
  Vihar corporate office, Panchkula production unit).

---

## 2. Design system

**Direction: an architectural drawing set, made cinematic.**

The site is built as if it were a set of issued drawings — every section is
numbered, the metadata is set in a technical monospace, hairline column grids
sit behind the content, photographs are framed with architectural crop marks —
but the whole thing is lit, paced and animated like a film.

| Token | Value | Use |
| --- | --- | --- |
| Forest | `#102820` | Dramatic sections, hero, footer |
| Dark emerald | `#204C3C` | Secondary dark surfaces |
| Secondary green | `#315C49` | Tertiary dark surfaces |
| Sage | `#5A705C` | Labels on light surfaces (darkened from `#849B80` to pass WCAG AA) |
| Ivory | `#F1F0E8` | Editorial / reading surfaces |
| Soft white | `#FAFAF6` | Base surface |
| Champagne | `#C0A878` | Fine borders, restrained accents |
| Ink | `#202720` | Body text |
| Ink muted | `#4A554D` | Secondary text |

**Type — three voices:**

| Face | Weights | Role |
| --- | --- | --- |
| Cormorant Garamond | 300 / 400 / 500, normal + italic | Display — headlines, statements, pull quotes |
| Manrope | 400 / 500 / 600 / 700 | Body — running copy, navigation, buttons |
| JetBrains Mono | 300 / 400 / 500 | Technical metadata — sheet numbers, coordinates, labels, counters |

The mono is the site's signature: it is what makes the pages read as a drawing
set rather than a template. It is used *only* for metadata, never for body
copy, and it is preloaded so the swap cannot shift the layout.

**The drawing-set language:**

| Element | What it does |
| --- | --- |
| `SheetMarker` | A numbered sheet header — `03 — OUR DISCIPLINES ——— FOUR PRACTICES` |
| `SheetGrid` | A hairline 12-column grid, masked to fade out below the fold |
| `frame-ticks` | Architectural corner crop marks that grow on hover |
| `meta` | The monospace metadata class — tabular numerals, wide tracking |
| `grain-layer` | Animated film grain over the dark sections |
| `glass` | A frosted plate for metadata floating over photography |

**Rhythm:** the site alternates dark and light sections — forest hero → forest
capability strip → ivory brand statement → soft-white studio index → forest
belief band → soft-white projects → ivory services → forest values → ivory
craftsmanship → soft-white approach → ivory founder → forest CTA → forest
footer.

---

## 3. Motion and interaction

| Effect | Where | Implementation |
| --- | --- | --- |
| Hero reveal | Home, inner pages | CSS keyframes — transform + opacity only, so the photograph is composited immediately |
| Headline line reveal | Hero, page heroes | CSS keyframes with per-line delay |
| Scroll reveal | Throughout | IntersectionObserver + CSS transitions (`Reveal`) |
| Runtime line splitting | Section headings | `SplitLines` — measures the real rendered width, so the split always matches the layout |
| Image drift | Hero, founder portrait | GSAP `Parallax` (scrubbed `yPercent`) — **dynamically imported**, never on the critical path |
| Clip-path expansion | Craftsmanship | GSAP `PinnedStory` — one use, on desktop only, always released at the end of the section |
| **Pinned horizontal showcase** | Projects page | GSAP `PinnedHorizontal` — the heading stays pinned while the thirteen projects travel past. Released at a defined end point; on touch, narrow screens and under reduced motion it degrades to a native horizontal scroller |
| **Custom cursor** | Global | An exact dot plus a trailing ring that tightens over text, swells over imagery and carries a label. Decorative only — it never intercepts the pointer |
| **Magnetic elements** | Primary calls to action | Buttons lean toward the pointer within a radius and spring back |
| **Cursor-following preview** | Studio index | A plate that trails the pointer and cross-fades between disciplines |
| **Kinetic belief band** | Home | The belief line runs across the page in two counter-moving rows, one set in outline |
| Horizontal project rail | Home | Native horizontal scroll with scroll-snap and arrow buttons — no scroll hijacking, no pinning, works with touch and keyboard |
| Reading progress | Global | `requestAnimationFrame`, paused when the tab is hidden |
| **Live studio clock** | Footer | The time in New Delhi, updating every second |
| **Background film** | Home, About, Services, Projects, Contact | Two films cut from the studio's own completed interiors — a slow drift across the staircase, the salon, the dining room and the workshop. The poster is the LCP; the film is not even requested until the poster has landed and the browser is idle, and never at all under reduced motion or on a metered connection |

**Reduced motion:** every animation is disabled under
`prefers-reduced-motion: reduce`, the GSAP effects never initialise, the
custom cursor and magnetic elements never mount, the pinned showcase becomes
an ordinary scroller, the video play control is disabled, and the scroll
behaviour falls back to instant. All content is visible without JavaScript —
the reveal states are applied by the same script that reveals them.

**One deliberate omission:** `scroll-smooth` is *not* set on the horizontal
project rail. Smooth-scrolling a container makes Chrome run compositor scroll
animations that break Lighthouse's trace processor, which suppressed the
Largest Contentful Paint metric entirely on the home page (performance scored
0). The arrow buttons still scroll programmatically with `behavior: "smooth"`,
and scroll-snap still settles the cards. Fixing this moved the home page from
a 0 to a 91 performance score.

---

## 4. Testing results

### Build and static checks

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass, no errors |
| `npm run lint` | Pass, no warnings |
| `npm run build` | Pass — 23 static routes generated |
| Broken asset references | 0 (checked by `npm run assets:manifest`) |

### Browser QA — `node scripts/visual-qa.mjs`

Every page at **320, 375, 430, 768, 1024, 1280, 1440 and 1920 px**:

| Check | Result |
| --- | --- |
| Horizontal overflow | 0 on every page and width |
| Broken images | 0 |
| Dead / empty links | 0 |
| Console errors | 0 (the 404 page correctly returns HTTP 404) |
| Exactly one `<h1>` per page | Pass |

### Lighthouse (production build, mobile emulation)

| Page | Perf | A11y | Best practices | SEO | FCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | **87** | **100** | **100** | **100** | 1.1 s | 60 ms | 0 |
| About | **93** | **100** | **100** | **100** | 1.1 s | 40 ms | 0 |
| Services | **90** | **100** | **100** | **100** | 1.1 s | 180 ms | 0 |
| Projects | **94** | **100** | **100** | **100** | 1.1 s | 30 ms | 0 |
| Project detail | **94** | **100** | **100** | **100** | 0.9 s | 30 ms | 0 |
| Contact | **93** | **100** | **100** | **100** | 1.1 s | 40 ms | 0 |

> **Note on the LCP figure.** Lighthouse's Lantern simulator reports a
> simulated LCP of 3.2 – 3.5 s. Reading the Chrome DevTools Protocol trace
> directly shows the hero photograph being painted as the Largest Contentful
> Paint **9 – 102 ms after the first paint** on every page
> (`node scripts/measure-lcp-trace.mjs`). Under real throttling (Slow 4G + 4×
> CPU, `node scripts/measure-vitals.mjs`) the home page LCP is **1.07 s** and
> FCP is 0.9 s. Full detail in `docs/TESTING.md` §5.

### Core Web Vitals budget (mobile, Slow 4G + 4× CPU)

| Metric | Target | Measured |
| --- | --- | --- |
| First Contentful Paint | < 1.8 s | 0.8 – 1.0 s |
| Largest Contentful Paint | < 2.5 s | 0.9 – 2.5 s (1.5 s on the home page) |
| Total Blocking Time | < 200 ms | 10 – 50 ms |
| Cumulative Layout Shift | < 0.1 | 0.000 – 0.023 |
| Initial JS (shared) | — | 103 kB |
| Page transfer | — | 460 – 990 kB including all media |

The hero photograph is the largest request at 70 kB on mobile, well inside the
200 – 350 kB target from the brief. Nothing below the fold is requested before
it is needed — the 93 kB video poster is not fetched until its section is
within 300 px of the viewport.

### Functional tests performed

- Navigation — every link in the header, footer, mobile overlay, project cards,
  service links and CTAs resolves.
- Routing — direct URL access, refresh, browser back/forward, and 404 for
  unknown paths all behave correctly.
- Redirects — the legacy WordPress URLs are mapped (see §6).
- Project filters — All / Residential / Commercial / Room Interiors /
  International; the count updates and the layout reflows.
- Gallery and lightbox — open, next/previous, arrow-key navigation, `Escape`
  to close, swipe on touch, focus trap, focus returned to the thumbnail on
  close.
- Mobile menu — focus moves into the overlay, is trapped while open, `Escape`
  closes it, background scrolling is locked, focus returns to the trigger.
- Contact form — client validation, server validation, loading state, success
  state, error state with a pre-filled `mailto:` fallback, rate limiting.
- Video — poster renders first, the file is only requested near the viewport,
  playback is user-initiated and silent.
- `prefers-reduced-motion` — all animation is suppressed and the content
  remains fully legible.

---

## 5. Contact form integration

The form is **real**, and it never claims a message was sent unless the
message was actually handed to the mail provider.

`POST /api/contact`:

1. Rate limit — 5 submissions per IP per 10 minutes → HTTP 429.
2. Server-side validation (independent of the client) → HTTP 422 with the
   offending fields.
3. Honeypot field — silently accepted and dropped.
4. Delivery via **Resend** → HTTP 200 with a reference on success.

**To make the form live**, set these in `.env.local` (or the host's
environment):

```env
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=decorinndesigns@gmail.com
CONTACT_FROM_EMAIL=website@anjdesigns.in
```

`CONTACT_FROM_EMAIL` must be a domain you own and have verified with Resend.

**Without a provider the form is not a fake.** The API answers HTTP 503 and
the interface shows: *"The contact form is not connected to an email service
on this deployment yet"* together with a `mailto:` link that opens the user's
own mail client with the enquiry already written out. No success message is
ever shown for a message that was not delivered.

To use a different provider, replace `sendContactEmail` in
`src/lib/email.ts` — it is the only place that talks to a mail service.

---

## 6. URL redirect mapping

Configured in `next.config.ts` → `redirects()`.

| Old URL | New URL | Type |
| --- | --- | --- |
| `/anjproject/` | `/projects` | 308 permanent |
| `/about-us/` | `/about` | 308 permanent |
| `/about-us-old/` | `/about` | 308 permanent |
| `/contact-us/` | `/contact` | 308 permanent |
| `/lead-from/` | `/contact` | 308 permanent |
| `/portfolio/project-2` … `/portfolio/project-24` | `/projects` | 308 permanent |
| `/projects` | `/projects` | no redirect (the old `/projects/` was a 404) |

The old `/portfolio/project-N` pages were **theme demo content** on the
original site — identical "Project N" titles with placeholder Lorem Ipsum
biophilia copy, "architect: David Oswald" and "client: OceanThemes". They are
not ANJ projects, so they are not carried over; they redirect to the real
portfolio.

**Also recommended before launch:** point the existing
`anjdesigns.in/anjproject/` inbound links and any Google-indexed
`/portfolio/...` URLs through these redirects, and keep the old sitemap
submitted until the new one is indexed.

---

## 7. Deployment

The site is a standard Next.js application and runs on any Node host or
serverless platform.

```bash
npm ci
npm run build
npm start          # listens on $PORT, default 3000
```

**Required environment variables** (see `.env.example`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URL, sitemap, Open Graph |
| `RESEND_API_KEY` | for the form | Mail delivery |
| `CONTACT_TO_EMAIL` | for the form | Where enquiries are delivered |
| `CONTACT_FROM_EMAIL` | for the form | Verified sender |
| `CLOUDINARY_CLOUD_NAME` | optional | Switch image delivery to the Cloudinary CDN |
| `CLOUDINARY_DELIVERY_TYPE` / `CLOUDINARY_QUALITY` | optional | Cloudinary transformation defaults |

**Before deploying, run the asset pipeline** (already committed, but must be
re-run if the originals change):

```bash
npm run assets:manifest    # regenerate + validate the asset manifest
npm run assets:variants    # regenerate the responsive variants
```

**Hosting notes**

- `next start` needs a Node runtime. On a static host, switch
  `output: "export"` in `next.config.ts` — but note that the contact form
  requires a server, so a static export would need the API route moved to a
  serverless function.
- The image variants are static files, so a CDN in front of the site serves
  them directly with the immutable cache header — no image processing happens
  on the origin at all.
- `public/assets/videos/originals/` holds the untouched source videos
  (28 MB). They are not referenced by the site; remove them from the deployed
  bundle if bandwidth matters and a copy is kept elsewhere.

**Do not overwrite the live site until the new build is approved.** The
original site and all original assets are preserved in
`public/assets/` and in `docs/ORIGINAL-SITE-EXTRACTION.md`.

---

## 8. Files delivered

| Path | Contents |
| --- | --- |
| `src/` | The complete application source |
| `public/assets/` | All original assets + generated variants + video masters |
| `public/assets/manifest.json` | Download log from the live site |
| `src/data/assets.ts` | Generated asset manifest (201 assets) |
| `src/data/image-variants.ts` | Generated loader manifest |
| `scripts/` | Asset pipeline, QA, Lighthouse, vitals and trace tooling |
| `docs/ORIGINAL-SITE-EXTRACTION.md` | Full extraction notes and provenance |
| `docs/MEDIA-PIPELINE.md` | Image / video / CDN / caching strategy |
| `docs/OPEN-QUESTIONS.md` | Everything awaiting business confirmation |
| `docs/TESTING.md` | The full test log |
| `.env.example` | Every environment variable, no secrets |
| `README.md` | Setup, structure, scripts |

---

## 9. Known limitations and outstanding items

1. **Eleven business questions remain open** — see
   `docs/OPEN-QUESTIONS.md`. The site currently shows the most conservative
   reading of each and flags the discrepancy in the copy.
2. **The contact form needs a mail provider** before it can deliver. It is
   honest about this: without a provider it says so and offers a `mailto:`
   fallback rather than showing a false success state.
3. **Project photography resolution.** The 13 projects are published at
   344 × 344 px on the original site and no larger version exists there. If
   higher-resolution masters can be supplied, the portfolio pages will improve
   considerably.
4. **Facebook, Instagram and LinkedIn URLs** are inferred from the brand name
   and need confirming (see open question 9).
5. **Lighthouse's simulated LCP** does not reflect the real paint time in this
   environment — see the note in §4.
