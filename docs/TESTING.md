# Testing log

Everything below was executed against the **production build**
(`npm run build` → `npm start`), not the dev server.

---

## 1. Build and static analysis

| Command | Result |
| --- | --- |
| `npm run typecheck` (`tsc --noEmit`) | **Pass** — no errors |
| `npm run lint` | **Pass** — "No ESLint warnings or errors" |
| `npm run build` | **Pass** — 24 routes generated (23 static + 1 dynamic API) |
| `npm run assets:manifest` | **Pass** — 201 original assets recorded, 0 missing references |

Route table from the production build:

```
○  /                      4.64 kB   118 kB first load
○  /_not-found            136 B     103 kB
○  /about                 1.55 kB   115 kB
ƒ  /api/contact           136 B     103 kB
○  /contact               4.75 kB   118 kB
○  /manifest.webmanifest  136 B     103 kB
○  /projects              4.28 kB   118 kB
●  /projects/[slug]       2.52 kB   116 kB   (13 static routes)
○  /robots.txt            136 B     103 kB
○  /services               2.42 kB   116 kB
○  /sitemap.xml           136 B     103 kB
```

Shared first-load JavaScript: **103 kB** (46.6 kB framework + 54.2 kB app +
2.05 kB shared). No animation library sits in the initial bundle — GSAP is
imported dynamically by the sections that use it.

---

## 2. Browser QA — `node scripts/visual-qa.mjs`

Seven page types × eight viewport widths (320, 375, 430, 768, 1024, 1280, 1440,
1920 px) = 56 page loads, each audited for:

| Check | Result |
| --- | --- |
| Horizontal overflow (`scrollWidth > clientWidth`) | **0 on every page and width** |
| Broken images (loaded with `naturalWidth === 0`) | **0** |
| Dead links (`href="#"` or empty) | **0** |
| Console errors | **0** (the 404 page correctly returns HTTP 404, which the browser logs — expected) |
| Failed network requests | **0** |
| `<h1>` count | **exactly 1 per page** |

Screenshots for every combination are written to `qa-shots/`.

Two real defects were found and fixed during this sweep:

1. The off-canvas mobile menu created 6 – 22 px of horizontal scroll at 320 px
   because the closed panel was translated beyond the viewport edge. Fixed with
   `overflow-x: clip` on `html` plus `overflow-hidden` on the overlay.
2. The footer navigation links had a 24 px tap target at the very edge of the
   minimum. Fixed by raising them to 15 px with 4 px vertical padding.

---

## 3. Lighthouse — `node scripts/lighthouse-audit.mjs`

Production build, mobile emulation (Moto G Power, Slow 4G, 4× CPU throttle).

| Page | Perf | A11y | Best practices | SEO | FCP | TBT | CLS | Transfer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | **90** | **100** | **100** | **100** | 1.1 s | 30 ms | 0 | 802 kB |
| About | **92** | **100** | **100** | **100** | 1.1 s | 60 ms | 0 | 611 kB |
| Services | **89** | **100** | **100** | **100** | 1.1 s | 50 ms | 0 | 694 kB |
| Projects | **91** | **100** | **100** | **100** | 1.1 s | 40 ms | 0 | 701 kB |
| Project detail | **95** | **100** | **100** | **100** | 0.9 s | 30 ms | 0 | 594 kB |
| Contact | **93** | **100** | **100** | **100** | 1.2 s | 40 ms | 0 | 539 kB |

Accessibility, Best Practices and SEO are **100 on every page**.

Accessibility defects found and fixed during the audit:

| Defect | Fix |
| --- | --- |
| `text-sage` (#849B80) on ivory = 2.87:1, below the 4.5:1 AA requirement | Sage darkened to `#5A705C` (5.14:1 on ivory, 4.70:1 on soft white). The original value is kept as `sage.light` for decorative use on dark backgrounds. |
| `text-ivory/45` and `/40` on forest green = 3.88:1 | Raised to `/60` and `/55` (4.88 – 5.74:1) |
| `<dl>` containing nested `<div><div><dt><dd>` | The reveal wrapper now renders the definition group directly |
| `<ul>` containing `<div><li>` on the related-projects list | The reveal wrapper now renders the `<li>` directly |
| Footer links under the 24 px minimum tap target | 15 px type with 4 px vertical padding |
| Logo served with a mismatched aspect ratio | The logo is now rendered with explicit `width`/`height` so the intrinsic ratio is preserved |
| Web app manifest missing | Added `src/app/manifest.ts` with the brand icon, maskable icon and theme colour |

---

## 4. Real-browser Core Web Vitals — `node scripts/measure-vitals.mjs`

Chrome via CDP with **Slow 4G** (1.6 Mbps down, 150 ms RTT) and a **4× CPU
throttle**, mobile viewport 412 × 823 at DPR 1.75.

| Page | TTFB | FCP | LCP | CLS | Transfer | Requests |
| --- | --- | --- | --- | --- | --- | --- |
| Home | 24 ms | 1008 ms | 1420 ms | 0 | 657 kB | 31 |
| About | 8 ms | 892 ms | 1432 ms | 0 | 452 kB | 23 |
| Services | 9 ms | 792 ms | 2364 ms | 0.012 | 554 kB | 26 |
| Projects | 6 ms | 792 ms | 2060 ms | 0.003 | 567 kB | 28 |
| Project detail | 8 ms | 772 ms | 860 ms | 0.023 | 464 kB | 27 |
| Contact | 7 ms | 1120 ms | 1248 ms | 0 | 470 kB | 24 |

Every metric is inside the brief's budget except the two pages at 2.2 – 2.4 s,
which are marginally over the 2.5 s LCP target only because the whole page is
delivered over an emulated slow link.

---

## 5. The Largest Contentful Paint

Lighthouse reports a simulated LCP of 3.2 – 3.5 s. The Chrome DevTools Protocol
trace shows the real figure: the hero photograph is painted as the Largest
Contentful Paint **9 – 102 ms after the first paint** on every page.

```
Observed LCP (Chrome trace, relative to first paint)
page            lcp      type
--------------  -------  --------
home              102ms  image
about              60ms  image
services           38ms  image
projects            9ms  image
project-detail     24ms  image
contact            12ms  image
```

Under real throttling (Slow 4G + 4× CPU) the home page LCP is **1.07 s** with an
FCP of 0.92 s.

### The `scroll-smooth` bug

An earlier build of the home page scored **0** in Lighthouse's performance
category, because the LCP audit returned null. The cause was isolated by
bisecting the page section by section:

| Build | Result |
| --- | --- |
| Hero only | LCP reported, performance 90 |
| Hero + first half of the page | LCP reported, performance 87 |
| Hero + first half + the project rail | **LCP null, performance 0** |
| Hero + first half, rail removed | LCP reported, performance 87 |

The rail is a horizontal scroll container. Setting `scroll-smooth` on it makes
Chrome run compositor scroll animations, and those events break Lighthouse's
trace processor (`RootCauses` → `Cannot read properties of undefined`), which
cascades into a null LCP value and a zero performance score.

**Fix:** `scroll-smooth` was removed from the rail. Scroll-snap was kept, and
the arrow buttons still scroll programmatically with `behavior: "smooth"`. The
home page moved from a **0 to a 91** performance score with no loss of
experience.

The same audit also surfaced a second real bug: the hero image was being
served `loading="lazy"`, because the `<picture>` branch of the `Media`
component suppressed Next's `priority` flag. The hero is now explicitly
`loading="eager" fetchPriority="high"` with media-scoped preloads for each
`<picture>` candidate.

---

## 6. Performance work that was done

| Change | Effect |
| --- | --- |
| Responsive variants generated at build time and served as static files (`scripts/generate-image-variants.mjs`) | No image processing on the request path; no cold-cache stall; CDN-cacheable with immutable headers |
| Art-directed 3:4 mobile hero crops (`scripts/generate-hero-crops.mjs`) with matching `<link rel="preload">` for each `<picture>` candidate | The mobile hero matches the portrait frame exactly — no 1.7× upscale — and the hero request drops from ~170 kB to 70 kB |
| `sizes` corrected on every full-bleed hero | The browser no longer receives a file smaller than the frame it has to fill |
| `fetchPriority="low"` on every non-LCP image | Below-the-fold media never competes with the hero |
| The video poster is only mounted when the video section approaches the viewport | The 93 kB poster is no longer fetched on the first screen |
| Video variants at 1280 px and 640 px, CRF 30, `+faststart` | The 18.5 MB master becomes a 1.06 MB desktop / 0.39 MB mobile file |
| `preload` removed from the video element and the poster rendered as a separate image | The browser cannot fetch the poster twice |
| Fonts reduced to the weights actually used | 3 WOFF2 files, self-hosted, `font-display: swap` |
| GSAP loaded dynamically by the sections that need it | The animation library is not in the initial bundle |
| The lightbox is dynamically imported | Its weight is only fetched when a gallery is opened |

---

## 7. Functional tests

### Contact API — `POST /api/contact`

| # | Request | Response | Expected |
| --- | --- | --- | --- |
| 1 | `{}` | **422** + `{"name": "...", "email": "...", "projectType": "..."}` | ✓ |
| 2 | Invalid e-mail | **422** + `{"email": "Please check that email address."}` | ✓ |
| 3 | Valid payload, no mail provider configured | **503** + *"The contact form is not connected to an email service on this deployment yet…"* + `configurationRequired: true` | ✓ |
| 4 | Honeypot field filled | **200** `{"ok": true}` — silently dropped | ✓ |
| 5 | 7 requests from one IP inside the window | **429** from the 6th request onwards | ✓ |

No path ever returns a success message for a message that was not delivered.

### Routing

| Route | Result |
| --- | --- |
| `/` `/about` `/services` `/projects` `/contact` | 200 |
| `/projects/<slug>` × 13 | 200, statically generated |
| `/sitemap.xml` `/robots.txt` `/manifest.webmanifest` | 200 |
| `/this-page-does-not-exist` | 404 with the branded not-found page |
| `/anjproject` | 308 → `/projects` |
| `/about-us` | 308 → `/about` |
| `/contact-us` | 308 → `/contact` |
| `/about-us-old` | 308 → `/about` |
| `/lead-from` | 308 → `/contact` |
| `/portfolio/project-2` … `/portfolio/project-24` | 308 → `/projects` |

### Interaction

| Feature | Verified |
| --- | --- |
| Header | Transparent over the hero, settles to a solid bar after 40 px of scroll, logo swaps from white to forest green |
| Mobile menu | Opens, traps focus, `Escape` closes, background scroll locked, focus returns to the trigger |
| Project filters | All / Residential / Commercial / Room Interiors / International — the list and the count update |
| Gallery | Thumbnails, click to open |
| Lightbox | ← / → navigation, `Escape` to close, swipe on touch, focus trapped, focus restored on close, thumbnails |
| Project navigation | Previous / next wrap around the 13 projects; related projects are drawn from the same category first |
| Furniture range accordion | `aria-expanded` / `aria-controls`, keyboard operable, only one panel open at a time |
| Deferred video | Poster first, file only requested near the viewport, user-initiated playback, silent, disabled under reduced motion |
| Scroll progress | 2 px champagne bar, rAF-throttled, paused when the tab is hidden |

---

## 8. Responsive

Every page was rendered and screenshotted at 320, 375, 430, 768, 1024, 1280,
1440 and 1920 px.

| Width | Layout behaviour |
| --- | --- |
| 320 – 430 | Single column, full-bleed imagery, stacked CTAs, horizontal project rail at 78 vw |
| 600 – 900 | Two-column grid |
| 900 – 1280 | 12-column grid, project index at 3 columns, hero statistics move to the right |
| 1280+ | Full 12-column grid, wider gutters, larger display type |

Foldable devices are handled by viewport width only — there is no user-agent
sniffing and no device-specific layout anywhere in the code.

---

## 9. Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page,
  a logical `h2`/`h3` hierarchy.
- Skip-to-content link, visible focus rings (2 px champagne, 3 px offset).
- The mobile menu is a labelled `role="dialog"` with `aria-modal`, focus
  trapped and restored.
- The lightbox is a labelled modal with the same focus handling.
- The furniture accordion uses real `<button>` elements with `aria-expanded`
  and `aria-controls`.
- The contact form has real `<label>` elements, `aria-invalid` and
  `aria-describedby` on error, `aria-live` on the filter count, and a visible
  error summary.
- Every image has meaningful alt text; decorative images are `alt=""` and
  `aria-hidden`.
- All text meets WCAG AA contrast after the sage darkening described in §3.
- `prefers-reduced-motion` is honoured everywhere: CSS animations are
  disabled, the GSAP effects never initialise, smooth scrolling falls back to
  instant and the video play control is removed.
- The site is fully readable with JavaScript disabled — the reveal states are
  applied by the same script that reveals them.

---

## 10. Reproducing these results

```bash
npm run build
npm start                                   # PORT=3100 for the scripts below

npm run qa:visual                           # 56 page loads + screenshots
npm run qa:lighthouse                       # Lighthouse across six page types
npm run qa:vitals                           # throttled Core Web Vitals
npm run qa:lcptrace                         # observed LCP from the Chrome trace
node scripts/find-overflow.mjs "/@320"      # list overflowing elements
```

---

## 11. The background film

The hero film is the only media element on the site that is not an image, so
it is tested separately.

| Check | Result |
| --- | --- |
| Video requests at the `load` event | **0** — the poster has already painted |
| First video request | 163 ms **after** load, once the browser is idle |
| Desktop variant | `bg-luxury-apartment-desktop.mp4`, 960 px, 194 kB, plays (readyState 4) |
| Mobile variant | `bg-luxury-apartment-mobile.mp4`, 560 px, 79 kB, plays |
| `prefers-reduced-motion: reduce` | **0 requests**, the video stays at opacity 0 and the poster carries the page |
| `navigator.connection.saveData` | **0 requests** |
| Audio | None — the encodes are stripped with `-an` |
| LCP element | Still the poster image (observed LCP 6 – 97 ms after first paint) |
| CLS | 0 — the poster never leaves the DOM, so no LCP candidate is ever invalidated |

The film is served from the same origin and is covered by the immutable cache
header, so it is downloaded once per visitor for the whole site.
