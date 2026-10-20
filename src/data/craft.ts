/**
 * The curated craft library.
 *
 * Photography extracted from the company's own official portfolio PDFs
 * (DECOR INN GALLERY 3, DECOR INN GALLERY 2022-2023, DECOR INN LATEST
 * GALLERY 2, PORTFOLIO 2) and categorised using the range headings printed in
 * those documents. Every image is genuine ANJ Designs / Decor Inn work.
 *
 * Regenerate with:
 *   .venv-pdf/bin/python scripts/extract-pdf-portfolio.py
 *   .venv-pdf/bin/python scripts/curate-craft-library.py
 *   .venv-pdf/bin/python scripts/normalize-craft-library.py
 */

export interface CraftImage {
  /** Path under /public */
  path: string;
  category: string;
  width: number;
  height: number;
  aspect: number;
}

export const craftLibrary: CraftImage[] = [
  { path: "/assets/craft/bar-units/bar-unit-decor-01.webp", category: "bar-units", width: 720, height: 1024, aspect: 0.7031 },
  { path: "/assets/craft/bar-units/bar-unit-decor-02.webp", category: "bar-units", width: 1024, height: 576, aspect: 1.7778 },
  { path: "/assets/craft/bedroom-range/bedroom-decorinn-01.webp", category: "bedroom-range", width: 1523, height: 1121, aspect: 1.3586 },
  { path: "/assets/craft/bedroom-range/bedroom-decorinn-02.webp", category: "bedroom-range", width: 1024, height: 1536, aspect: 0.6667 },
  { path: "/assets/craft/bedroom-range/bedroom-decorinn-03.webp", category: "bedroom-range", width: 1048, height: 667, aspect: 1.5712 },
  { path: "/assets/craft/bespoke-bed/bespoke-bed-decor-01.webp", category: "bespoke-bed", width: 1192, height: 656, aspect: 1.8171 },
  { path: "/assets/craft/bespoke-bed/bespoke-bed-decor-02.webp", category: "bespoke-bed", width: 825, height: 519, aspect: 1.5896 },
  { path: "/assets/craft/bespoke-bed/bespoke-bed-decor-03.webp", category: "bespoke-bed", width: 720, height: 456, aspect: 1.5789 },
  { path: "/assets/craft/bespoke-bed/bespoke-bed-portfolio-01.webp", category: "bespoke-bed", width: 1600, height: 1008, aspect: 1.5873 },
  { path: "/assets/craft/bespoke-bed/bespoke-bed-portfolio-02.webp", category: "bespoke-bed", width: 1192, height: 656, aspect: 1.8171 },
  { path: "/assets/craft/bespoke-bed/bespoke-bed-portfolio-03.webp", category: "bespoke-bed", width: 899, height: 720, aspect: 1.2486 },
  { path: "/assets/craft/bespoke-bed/bespoke-bed-portfolio-04.webp", category: "bespoke-bed", width: 720, height: 688, aspect: 1.0465 },
  { path: "/assets/craft/bespoke-bed/bespoke-bed-portfolio-05.webp", category: "bespoke-bed", width: 720, height: 456, aspect: 1.5789 },
  { path: "/assets/craft/design-gallery/design-concept-portfolio-01.webp", category: "design-gallery", width: 1534, height: 1151, aspect: 1.3328 },
  { path: "/assets/craft/design-gallery/design-concept-portfolio-02.webp", category: "design-gallery", width: 1280, height: 929, aspect: 1.3789 },
  { path: "/assets/craft/design-gallery/design-concept-portfolio-03.webp", category: "design-gallery", width: 914, height: 875, aspect: 1.0446 },
  { path: "/assets/craft/design-gallery/design-concept-portfolio-04.webp", category: "design-gallery", width: 708, height: 811, aspect: 0.873 },
  { path: "/assets/craft/design-gallery/design-concept-portfolio-05.webp", category: "design-gallery", width: 760, height: 750, aspect: 1.0133 },
  { path: "/assets/craft/design-gallery/design-concept-portfolio-06.webp", category: "design-gallery", width: 669, height: 735, aspect: 0.9102 },
  { path: "/assets/craft/dining-range/dining-decorinn-01.webp", category: "dining-range", width: 1600, height: 1177, aspect: 1.3594 },
  { path: "/assets/craft/dining-range/dining-decorinn-02.webp", category: "dining-range", width: 853, height: 571, aspect: 1.4939 },
  { path: "/assets/craft/dining/dining-portfolio-01.webp", category: "dining", width: 1286, height: 965, aspect: 1.3326 },
  { path: "/assets/craft/dining/dining-portfolio-02.webp", category: "dining", width: 960, height: 1280, aspect: 0.75 },
  { path: "/assets/craft/dining/dining-portfolio-03.webp", category: "dining", width: 1280, height: 960, aspect: 1.3333 },
  { path: "/assets/craft/dining/dining-portfolio-04.webp", category: "dining", width: 720, height: 848, aspect: 0.8491 },
  { path: "/assets/craft/dining/dining-portfolio-05.webp", category: "dining", width: 1024, height: 576, aspect: 1.7778 },
  { path: "/assets/craft/dining/dining-set-decor-01.webp", category: "dining", width: 735, height: 645, aspect: 1.1395 },
  { path: "/assets/craft/dining/dining-set-decor-02.webp", category: "dining", width: 632, height: 474, aspect: 1.3333 },
  { path: "/assets/craft/dressers/dresser-decor-01.webp", category: "dressers", width: 736, height: 736, aspect: 1 },
  { path: "/assets/craft/dressers/dresser-portfolio-01.webp", category: "dressers", width: 1056, height: 680, aspect: 1.5529 },
  { path: "/assets/craft/dressers/dresser-portfolio-02.webp", category: "dressers", width: 780, height: 855, aspect: 0.9123 },
  { path: "/assets/craft/dressers/dresser-portfolio-03.webp", category: "dressers", width: 672, height: 912, aspect: 0.7368 },
  { path: "/assets/craft/dressers/dresser-portfolio-04.webp", category: "dressers", width: 736, height: 736, aspect: 1 },
  { path: "/assets/craft/economic-range/economic-range-decor-01.webp", category: "economic-range", width: 1280, height: 1439, aspect: 0.8895 },
  { path: "/assets/craft/economic-range/economic-range-decor-02.webp", category: "economic-range", width: 736, height: 480, aspect: 1.5333 },
  { path: "/assets/craft/entrance-foyers/entrance-foyer-decorinn-01.webp", category: "entrance-foyers", width: 1272, height: 936, aspect: 1.359 },
  { path: "/assets/craft/entrance-foyers/entrance-foyer-decorinn-02.webp", category: "entrance-foyers", width: 1126, height: 895, aspect: 1.2581 },
  { path: "/assets/craft/entrance-foyers/entrance-foyer-decorinn-03.webp", category: "entrance-foyers", width: 855, height: 696, aspect: 1.2284 },
  { path: "/assets/craft/entrance-foyers/entrance-foyer-decorinn-04.webp", category: "entrance-foyers", width: 900, height: 604, aspect: 1.4901 },
  { path: "/assets/craft/entrance-foyers/entrance-foyer-decorinn-05.webp", category: "entrance-foyers", width: 768, height: 510, aspect: 1.5059 },
  { path: "/assets/craft/finishes/finish-sample-decorinn-01.webp", category: "finishes", width: 904, height: 1120, aspect: 0.8071 },
  { path: "/assets/craft/finishes/finish-sample-decorinn-02.webp", category: "finishes", width: 682, height: 922, aspect: 0.7397 },
  { path: "/assets/craft/finishes/finish-sample-decorinn-03.webp", category: "finishes", width: 682, height: 922, aspect: 0.7397 },
  { path: "/assets/craft/finishes/finish-sample-decorinn-04.webp", category: "finishes", width: 820, height: 403, aspect: 2.0347 },
  { path: "/assets/craft/formal-living/formal-living-decorinn-01.webp", category: "formal-living", width: 1469, height: 1064, aspect: 1.3806 },
  { path: "/assets/craft/handcrafted-work/handcrafted-decor-01.webp", category: "handcrafted-work", width: 776, height: 552, aspect: 1.4058 },
  { path: "/assets/craft/handcrafted-work/handcrafted-decor-02.webp", category: "handcrafted-work", width: 704, height: 496, aspect: 1.4194 },
  { path: "/assets/craft/informal-living/informal-living-decorinn-01.webp", category: "informal-living", width: 1600, height: 1176, aspect: 1.3605 },
  { path: "/assets/craft/kids-bedroom/kids-bedroom-portfolio-01.webp", category: "kids-bedroom", width: 704, height: 958, aspect: 0.7349 },
  { path: "/assets/craft/kids-bedroom/kids-bedroom-portfolio-02.webp", category: "kids-bedroom", width: 818, height: 613, aspect: 1.3344 },
  { path: "/assets/craft/kids-bedroom/kids-bedroom-portfolio-03.webp", category: "kids-bedroom", width: 802, height: 600, aspect: 1.3367 },
  { path: "/assets/craft/led-profile-lights/led-profile-decor-01.webp", category: "led-profile-lights", width: 916, height: 687, aspect: 1.3333 },
  { path: "/assets/craft/led-profile-lights/led-profile-decor-02.webp", category: "led-profile-lights", width: 713, height: 535, aspect: 1.3327 },
  { path: "/assets/craft/media-consoles/media-console-decor-01.webp", category: "media-consoles", width: 735, height: 558, aspect: 1.3172 },
  { path: "/assets/craft/study-tables/study-table-decor-01.webp", category: "study-tables", width: 736, height: 784, aspect: 0.9388 },
  { path: "/assets/craft/study-tables/study-table-portfolio-01.webp", category: "study-tables", width: 666, height: 888, aspect: 0.75 },
  { path: "/assets/craft/study-tables/study-table-portfolio-02.webp", category: "study-tables", width: 736, height: 784, aspect: 0.9388 },
  { path: "/assets/craft/study-tables/study-table-portfolio-03.webp", category: "study-tables", width: 682, height: 825, aspect: 0.8267 },
  { path: "/assets/craft/wall-panels/wall-panel-decorinn-01.webp", category: "wall-panels", width: 1090, height: 655, aspect: 1.6641 },
  { path: "/assets/craft/wall-panels/wall-panel-decorinn-02.webp", category: "wall-panels", width: 780, height: 881, aspect: 0.8854 },
  { path: "/assets/craft/workshop/workshop-decorinn-01.webp", category: "workshop", width: 1600, height: 951, aspect: 1.6824 },
];

/** Distinct categories present in the library. */
export const craftCategories = Array.from(
  new Set(craftLibrary.map((image) => image.category))
).sort();

export function getCraftImage(path: string): CraftImage | undefined {
  return craftLibrary.find((image) => image.path === path);
}
