#!/usr/bin/env node
/**
 * ANJ Designs — art-directed mobile crops for the full-bleed hero images.
 *
 * The hero images are landscape photographs displayed in a portrait frame on
 * phones, which means the browser has to upscale them heavily. These 3:4
 * crops are taken from the SAME original photograph (no retouching, no
 * generative fill) so the mobile hero matches the frame exactly.
 *
 * Usage: node scripts/generate-hero-crops.mjs
 */
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const OUT = "public/assets/hero-crops";

/** [source, output name, focal point (0-1 x, 0-1 y)] */
const CROPS = [
  [
    "public/assets/craft/informal-living/informal-living-decorinn-01.webp",
    "home-living",
    0.55,
    0.5,
  ],
  [
    "public/assets/craft/entrance-foyers/entrance-foyer-decorinn-01.webp",
    "entrance-foyer",
    0.5,
    0.45,
  ],
  [
    "public/assets/craft/dining-range/dining-decorinn-01.webp",
    "dining",
    0.5,
    0.5,
  ],
  [
    "public/assets/craft/formal-living/formal-living-decorinn-01.webp",
    "formal-living",
    0.5,
    0.5,
  ],
  [
    "public/assets/projects/villa-golf-course-extension/01.webp",
    "villa",
    0.5,
    0.5,
  ],
  [
    "public/assets/projects/baltimore-usa/01.webp",
    "baltimore",
    0.5,
    0.5,
  ],
];

await mkdir(OUT, { recursive: true });

/** Every project hero gets a portrait crop too, so the detail pages match. */
const projectDir = "public/assets/projects";
for (const slug of await readdir(projectDir)) {
  const folder = path.join(projectDir, slug);
  const files = await readdir(folder);
  const first = files.find((f) => /^(01)\./.test(f));
  if (!first) continue;
  CROPS.push([path.join(folder, first), slug, 0.5, 0.5]);
}

for (const [src, name, fx, fy] of CROPS) {
  const image = sharp(src);
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) {
    console.log("skip", name, "(unreadable)");
    continue;
  }

  // Target a 3:4 portrait frame.
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
