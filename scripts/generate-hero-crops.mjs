#!/usr/bin/env node
/**
 * ANJ Designs — art-directed mobile crops for the full-bleed hero images.
 *
 * The hero photographs are landscape; a phone shows them in a tall frame, so a
 * 3:4 crop of the SAME original is prepared for small screens. The crop is
 * taken from the original file — no retouching, no generative fill — so the
 * mobile hero matches the frame exactly, at full resolution, with no upscale.
 *
 * Usage: node scripts/generate-hero-crops.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = "public/assets/hero-crops";

/** [source, output name, focal x (0-1), focal y (0-1)] */
const CROPS = [
  // The teal salon with the marble fireplace — the home hero.
  ["public/assets/craft/dining-range/dining-decorinn-01.webp", "salon", 0.52, 0.46],
  // The craftsman at the lathe — the studio.
  ["public/assets/craft/workshop/workshop-decorinn-01.webp", "workshop", 0.55, 0.48],
  // The grand staircase — the expertise page.
  ["public/assets/craft/entrance-foyers/entrance-foyer-decorinn-01.webp", "staircase", 0.5, 0.5],
  // The dark-wood dining room — the portfolio.
  ["public/assets/craft/dining/dining-portfolio-01.webp", "dining", 0.5, 0.5],
  // The ochre chair under the woven pendant — the contact page.
  ["public/assets/craft/economic-range/economic-range-decor-01.webp", "ochre", 0.52, 0.42],
  // The tailored white salon.
  ["public/assets/craft/formal-living/formal-living-decorinn-01.webp", "salon-white", 0.5, 0.5],
  // The cream bedroom with the scalloped headboard.
  ["public/assets/craft/dining/dining-portfolio-03.webp", "bedroom", 0.5, 0.48],
];

await mkdir(OUT, { recursive: true });

for (const [src, name, fx, fy] of CROPS) {
  const image = sharp(src);
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) {
    console.log("skip", name, "(unreadable)");
    continue;
  }

  // A 3:4 portrait frame.
  const targetRatio = 3 / 4;
  let cropWidth = width;
  let cropHeight = Math.round(width / targetRatio);
  if (cropHeight > height) {
    cropHeight = height;
    cropWidth = Math.round(height * targetRatio);
  }

  const left = Math.max(
    0,
    Math.min(width - cropWidth, Math.round(fx * width - cropWidth / 2))
  );
  const top = Math.max(
    0,
    Math.min(height - cropHeight, Math.round(fy * height - cropHeight / 2))
  );

  const dest = path.join(OUT, `${name}.webp`);
  await image
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(dest);

  console.log(
    `${name}.webp  ${width}x${height} -> ${cropWidth}x${cropHeight} @ ${left},${top}`
  );
}
