# Media pipeline

One primary image strategy is used at a time. The two paths are never mixed,
so an image is never transformed twice.

---

## 1. The asset library

Everything the site serves originates from the live ANJ Designs site:

| Source | What was taken |
| --- | --- |
| `https://anjdesigns.in/` (HTML, WordPress REST API) | 129 files — logo, hero art, project photography (13 projects × 4–5 images), service imagery, founder portrait, 3 videos, 4 portfolio PDFs |
| `DECORINN-GALLERY-3.pdf`, `DECOR-INN-LATEST-GALLERY-2.pdf`, `DECORINN-GALLERY-2022-2023.pdf`, `Portfolio-2.pdf` | 395 full-resolution photographs, categorised using the range headings printed in the PDFs themselves |

```
public/assets/
  brand/         logo, favicon, header artwork
  home/          home-page imagery
  about/         vision / mission artwork, architectural photography
  services/      service imagery and material drawings
  founder/       founder portrait
  projects/      the 13 published projects, one folder each
  craft/         the curated furniture library from the portfolio PDFs
  videos/        optimised web variants + posters (masters in videos/originals/)
  pdf/           the original portfolio PDFs, for reference
  variants/      GENERATED responsive variants (build output)
```

Original masters are never overwritten. Delivery variants are written
alongside them.

---

## 2. Responsive variants (the default path)

`scripts/generate-image-variants.mjs` runs at build time:

1. Every original image is decoded **once**.
2. It is re-encoded to WebP at the width buckets
   `[320, 420, 480, 640, 768, 1024, 1280, 1600, 1920, 2560]`, plus its exact
   intrinsic width.
3. The files are written to `public/assets/variants/<path>-<width>.webp`.
4. `src/data/image-variants.ts` records which widths exist for each asset.

`src/lib/image-loader.ts` is registered as Next.js' custom loader
(`images.loader = "custom"`). It maps a requested width onto the closest
generated variant and falls back to the original master if none exists.

**Consequences**

- The production server performs **no image processing on the request path** —
  no sharp, no per-request CPU, no cold-cache stall.
- Every variant is a static file and is served with
  `Cache-Control: public, max-age=31536000, immutable`.
- The same URLs work on any host — Vercel, Netlify, Cloudflare Pages, S3 +
  CloudFront, or a plain Nginx box.

Rebuild the variants whenever the originals change:

```bash
npm run assets:variants
```

### `sizes` discipline

Every `<Media>` sets `sizes` explicitly. The full-bleed heroes are cropped by
`object-fit: cover` into a frame that is much taller than it is wide on a
phone, so the required source width is larger than the slot width. Their
`sizes` accounts for this:

```html
sizes="(max-width: 767px) 280vw, 100vw"   <!-- home hero -->
sizes="(max-width: 767px) 220vw, 100vw"   <!-- inner-page heroes -->
```

This is what stops a 412 px-wide phone from receiving a 412 px-wide file and
then upscaling it by 1.7×.

---

## 3. Cloudinary (the optional path)

If a Cloudinary account is available, set:

```env
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_DELIVERY_TYPE=auto
CLOUDINARY_QUALITY=auto
```

`src/lib/image-loader.ts` then returns Cloudinary delivery URLs instead of the
local variants, using the public-id prefix `anjdesigns/<path-without-extension>`
and `f_auto` / `q_auto` transformations.

To use it:

1. Create a Cloudinary account.
2. Upload `public/assets` preserving the folder structure, so that
   `public/assets/craft/dining/dining-portfolio-01.webp` becomes the public id
   `anjdesigns/craft/dining/dining-portfolio-01`.
3. Set the environment variable and rebuild.

**Do not** set the variable and keep the local variants in the request path at
the same time — the loader picks one path only, which is why images are never
transformed twice.

Cloudinary is **not** required. The default path needs no third-party account.

---

## 4. Video

The three films published on the live site are 5.6 MB, 18.5 MB and 4.1 MB. They
are **preserved untouched** in `public/assets/videos/originals/`, but they are
not what plays behind the heroes.

### 4.1 Why the original footage is not used

The original hero footage is a 3D walkthrough of an apartment. It reads as
dated, it is a render rather than the studio's own completed work, and once
scaled for the web it is soft. It is kept for the record, not for the site.

### 4.2 The hero films — cut from the studio's own work

`scripts/build-films.py` cuts two films from the high-resolution photography
extracted from the official Décor Inn portfolio PDFs. Nothing is generated or
invented: every frame is a photograph the studio has published, chosen by eye
for how well it holds a full-bleed frame.

| Film | Shots |
| --- | --- |
| `interiors` | the grand staircase, the ochre chair under the woven pendant, the teal salon with the marble fireplace, the dark-wood dining room under the linear chandelier |
| `craft` | the craftsman at the lathe, the navy living room, the tailored white salon, the cream bedroom with the scalloped headboard |

Each shot is a slow, eased drift. The camera is a **crop window travelling
across a pre-scaled image** — never a per-frame resample. That detail matters:
re-scaling on every frame changes every pixel slightly, which defeats
inter-frame compression and can quadruple the file. The shots are joined with
0.7 s cross-dissolves, and the tail drifts back into the head so the loop is
seamless.

Two masters are rendered for each film — 16:9 for desktop and 9:16 for
phones, because a 16:9 film cropped into a tall phone viewport loses most of
the frame.

| Output | Desktop | Mobile |
| --- | --- | --- |
| Film | 1152 × 648, CRF 37, no audio | 608 × 1080, CRF 38, no audio |
| Size | 216 – 289 kB | 183 – 243 kB |
| Poster | 1600 × 900 WebP, responsive variants | 640 × 1136 WebP, responsive variants |
| Poster size | 42 – 106 kB | 25 – 66 kB |

The posters go through the same build-time variant pipeline as every other
image, so the browser picks a sensible candidate for the viewport instead of
downloading the full-resolution file.

### 4.3 How the background film is loaded

`src/components/ui/BackgroundVideo.tsx` enforces six rules:

1. **The poster is the Largest Contentful Paint.** It is a priority image and
   it paints first, before a single video byte is requested.
2. **The film is not even requested until the poster has landed**, so the two
   never compete for the connection.
3. **The film is only requested after the page has loaded and the browser is
   idle** (`requestIdleCallback`, with a 3.5 s ceiling).
4. **It is never loaded at all** for a visitor who prefers reduced motion, or
   who is on a metered (`Save-Data`) or 2G connection. The poster simply
   stays.
5. **It has no audio track at all**, so it can never make a sound.
6. **The poster is never removed from the DOM**, so the LCP element never
   changes and no new LCP candidate is ever created.

Measured: 0 video requests at the `load` event; the first request lands
shortly after the poster has painted and the browser has gone idle. Under
`prefers-reduced-motion` and under `Save-Data`, 0 requests are made at all.

### 4.4 The opt-in film

The craftsmanship film follows the same pattern: it never autoplays, it is only
mounted when its section comes within 300 px of the viewport, and it has a
play button.

## 5. Caching

`next.config.ts` sets long-lived immutable caching for versioned assets:

```text
/public/assets/*   Cache-Control: public, max-age=31536000, immutable
```

Static files under `/_next/static/*` are already content-hashed by Next.js and
are served with the same policy. The contact endpoint is never cached.

---

## 6. Fonts

`next/font` self-hosts Cormorant Garamond, Manrope and JetBrains Mono as WOFF2
subsets with `font-display: swap`. Only the weights actually used are
requested:

- Cormorant Garamond — 300 / 400 / 500, normal + italic
- Manrope — 400 / 500 / 600 / 700
- JetBrains Mono — 300 / 400 / 500

The mono is preloaded because it appears in the first viewport: loading it
late would swap the metrics of the metadata labels and shift the layout.

No external font request is made, so there is no third-party connection to
preconnect to and no layout shift from a late font.

---

## 7. The brand mark

The library contains several logo files, and **two of them are damaged**:
`Header_ANJ_Final_2__1_-removebg-preview.png` and the trimmed derivative made
from it both have the lower third of the "ANJ DESIGNS" wordmark sliced away.

`anj-logo.webp` (732 × 172) is the **complete** lockup — sofa and lamp mark,
"ANJ DESIGNS", and the "INTERIORS, FURNITURE, DECOR" tagline, all intact. It
is the source for the two header marks:

| File | Use |
| --- | --- |
| `anj-lockup-white.webp` | The header and footer on dark surfaces |
| `anj-lockup-forest.webp` | The header once it turns solid |

Both are served as **one exact file** with `unoptimized`, not as a responsive
srcset: a brand mark should be pixel-identical everywhere, and a srcset for a
fixed-size asset only risks describing a file with the wrong width.

---

## 8. Budgets

| Budget | Target | Measured (mobile, Slow 4G + 4× CPU) |
| --- | --- | --- |
| First Contentful Paint | < 1.8 s | 0.8 – 1.1 s |
| Largest Contentful Paint | < 2.5 s | 9 – 70 ms after first paint (Chrome trace) |
| Total Blocking Time | < 200 ms | 10 – 30 ms |
| Cumulative Layout Shift | < 0.1 | 0.000 |
| Initial JS (shared) | — | 103 kB |
| Page transfer | — | 350 – 460 kB including all media |

The hero photograph is the largest request at 70 kB on mobile (the art-directed
3:4 crop), inside the 200 – 350 kB target from the brief. Nothing below the
fold is requested before it is needed — the 93 kB video poster is not fetched
until its section is within 300 px of the viewport.
