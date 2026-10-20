#!/usr/bin/env node
/**
 * ANJ Designs — build-time image variant generation.
 *
 * Every original image is decoded once, at build time, and re-encoded into
 * the responsive variants the site actually serves. The variants are written
 * to `public/assets/variants/` as static files, so:
 *
 *   • the production server does NO image processing on the request path,
 *   • every variant is CDN-cacheable with an immutable cache header,
 *   • Lighthouse (and real users) get the right bytes immediately.
 *
 * The variant URLs are served through the custom loader in
 * `src/lib/image-loader.ts`, which maps a requested width onto the closest
 * generated variant and falls back to the original master if none exists.
 *
 * Usage: node scripts/generate-image-variants.mjs
 */
import { readdir, stat, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.resolve("public/assets");
const OUT_DIR = path.resolve("public/assets/variants");
const MANIFEST = path.resolve("src/data/image-variants.ts");

/** Width buckets. The loader snaps a requested width down to one of these. */
const BUCKETS = [320, 420, 480, 640, 768, 1024, 1280, 1600, 1920, 2560];

const QUALITY = 80;

async function walk(dir, base = "") {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    // `variants` is the output, `pdf` and `videos` are not images. The
    // art-directed hero crops ARE images and go through the pipeline so they
    // get honest responsive srcsets and a matching preload.
    if (entry.name === "variants" || entry.name === "pdf" || entry.name === "videos") {
      continue;
    }
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...(await walk(path.join(dir, entry.name), rel)));
    else out.push(rel);
  }
  return out;
}

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

const files = await walk(SRC_DIR);
const manifest = {};
let generated = 0;
let skipped = 0;

for (const rel of files) {
  const ext = path.extname(rel).slice(1).toLowerCase();
  if (!["webp", "png", "jpg", "jpeg"].includes(ext)) {
    skipped++;
    continue;
  }

  const source = path.join(SRC_DIR, rel);
  const meta = await sharp(source).metadata();
  const intrinsic = meta.width ?? 0;
  if (!intrinsic) {
    skipped++;
    continue;
  }

  const targets = BUCKETS.filter((w) => w < intrinsic);
  targets.push(intrinsic);
  const unique = Array.from(new Set(targets)).sort((a, b) => a - b);

  const slug = rel.replace(/\.[a-z0-9]+$/i, "");
  const outFolder = path.join(OUT_DIR, path.dirname(slug));
  await mkdir(outFolder, { recursive: true });

  const widths = [];
  for (const width of unique) {
    const dest = path.join(outFolder, `${path.basename(slug)}-${width}.webp`);
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(dest);
    widths.push(width);
    generated++;
  }

  manifest[`/assets/${rel}`] = widths;
}

const body = `/**
 * GENERATED FILE — do not edit by hand.
 * Regenerate with:  node scripts/generate-image-variants.mjs
 *
 * For every original asset, the responsive widths that were pre-generated at
 * build time into /public/assets/variants/. The custom image loader snaps a
 * requested width down to the closest entry in this list.
 *
 * Stored as a JSON string so the manifest stays small in the client bundle.
 */
const RAW = ${JSON.stringify(JSON.stringify(manifest))};

export const variantWidths: Record<string, number[]> = JSON.parse(RAW);
`;

await writeFile(MANIFEST, body, "utf8");

const totalBytes = (await stat(OUT_DIR)).isDirectory()
  ? (await readdir(OUT_DIR, { recursive: true })).length
  : 0;
console.log(
  `generated ${generated} variants for ${
    Object.keys(manifest).length
  } assets (${totalBytes} files) -> public/assets/variants`
);
if (skipped) console.log(`skipped ${skipped} non-image files`);
