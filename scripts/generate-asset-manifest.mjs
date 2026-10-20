#!/usr/bin/env node
/**
 * Generates `src/data/assets.ts` — the central asset manifest.
 *
 * Every local asset is recorded with its path, original filename, type, the
 * page and project it belongs to, its true pixel dimensions, aspect ratio and
 * whether it is suitable as a hero or in a gallery. Any asset that is
 * referenced by the site but missing on disk is reported as an error.
 *
 * Usage: node scripts/generate-asset-manifest.mjs
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ASSETS_DIR = path.resolve("public/assets");
const OUT = path.resolve("src/data/assets.ts");

/** [asset path, page, project, hero-capable, gallery-capable] */
const CATALOGUE = {
  "brand/anj-logo-white.png": ["global", null, false, false],
  "brand/anj-logo-forest.png": ["global", null, false, false],
  "brand/anj-logo.webp": ["global", null, false, false],
  "brand/anj-designs-by-decorinn-logo.png": ["global", null, false, false],
  "brand/anj-favicon.png": ["global", null, false, false],
  "brand/anj-header-master.jpg": ["global", null, false, false],
  "brand/anj-header-alt.webp": ["global", null, false, false],
  "brand/anj-header-removebg.png": ["global", null, false, false],
  "brand/bg-color.webp": ["global", null, false, false],
  "brand/bg-2.png": ["global", null, false, false],

  "home/anj-website-bg.webp": ["home", null, false, false],
  "home/bg-home.webp": ["home", null, false, false],
  "home/home-bg.webp": ["home", null, false, false],
  "home/bg-texture.webp": ["home", null, false, false],
  "home/aboutus-bg.webp": ["home", null, false, false],
  "home/aboutus-anj.webp": ["home", null, false, false],
  "home/rectangle-2232.webp": ["home", null, false, false],
  "home/anjdesigns-wordmark.webp": ["home", null, false, false],
  "home/why-choose-1.webp": ["home", null, false, false],
  "home/why-choose-2.webp": ["home", null, false, false],
  "home/why-choose-3.webp": ["home", null, false, false],
  "home/why-choose-4.webp": ["home", null, false, false],
  "home/anjproject.webp": ["home", null, false, false],
  "home/anjproject-photo.webp": ["home", null, false, false],
  "home/anjproject-display.webp": ["home", null, false, false],
  "home/anjproject-display-wide.webp": ["home", null, false, false],
  "home/anjdesigns-5.webp": ["home", null, false, false],
  "home/anjdesigns-6.webp": ["home", null, false, false],
  "home/anjdesigns-7.webp": ["home", null, false, false],

  "founder/annie-nagpal-jain.webp": ["about, home", null, true, true],

  "about/about-1.png": ["about", null, false, false],
  "about/about-2.png": ["about", null, false, false],
  "about/group-47814.png": ["about, services", null, true, true],
  "about/frame-36929.png": ["about", null, false, false],

  "services/anjservices-1.webp": ["home, services", null, false, true],
  "services/anjservices-2.webp": ["home, services", null, false, true],
  "services/anjservices-3.webp": ["home, services", null, true, true],
  "services/service-anj-designs.webp": ["services", null, true, false],
  "services/service-bg.webp": ["services", null, false, false],
  "services/anj-bc-aboutus.webp": ["services", null, true, false],
  "services/anj-testimonials.webp": ["services, contact", null, false, false],
  "services/anjservice-1.webp": ["services", null, false, true],
  "services/anjservice-2.webp": ["services", null, false, true],
  "services/anjservice-3.webp": ["services", null, false, true],
  "services/anjservice-4.webp": ["services", null, false, true],
  "services/anjservice-5.webp": ["services", null, false, true],
  "services/anjservice-6.webp": ["services", null, false, true],
  "services/anjservice-7.webp": ["services", null, false, true],
  "services/anjservice-8.webp": ["services", null, false, true],
  "services/anjservice-9.webp": ["services", null, false, true],
  "services/anjservice-10.webp": ["services", null, true, false],
  "services/anjinterior-1.webp": ["services", null, false, true],
  "services/anjinterior-2.webp": ["services", null, false, true],
  "services/anjinterior-3.webp": ["services", null, false, true],
  "services/anjinterior-4.webp": ["services", null, false, true],
  "services/anjdesigns-12.webp": ["services", null, false, true],
  "services/anjdesigns-12-alt.webp": ["services", null, false, true],
  "services/anjdesigns-13.webp": ["services", null, false, true],
};

async function walk(dir, base = "") {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out.push(...(await walk(path.join(dir, entry.name), rel)));
    } else {
      out.push(rel);
    }
  }
  return out;
}

/** Reads intrinsic dimensions from the file header. */
function dimensions(file) {
  const buffer = readFileSync(file);
  // PNG
  if (buffer.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  // JPEG
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) { offset++; continue; }
      const marker = buffer[offset + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  }
  // WebP
  if (buffer.slice(0, 4).toString("ascii") === "RIFF" && buffer.slice(8, 12).toString("ascii") === "WEBP") {
    const format = buffer.slice(12, 16).toString("ascii");
    if (format === "VP8 ") {
      return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
    }
    if (format === "VP8L") {
      const b = buffer.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
    if (format === "VP8X") {
      const w = buffer[24] | (buffer[25] << 8) | (buffer[26] << 16);
      const h = buffer[27] | (buffer[28] << 8) | (buffer[29] << 16);
      return { width: w + 1, height: h + 1 };
    }
  }
  return { width: 0, height: 0 };
}

const files = await walk(ASSETS_DIR);
const entries = [];
const missing = [];

for (const rel of files.sort()) {
  if (rel === "manifest.json" || rel === "index.json") continue;
  // The manifest describes the ORIGINAL assets, not the generated delivery
  // variants or the art-directed hero crops.
  if (rel.startsWith("variants/") || rel.startsWith("hero-crops/")) continue;
  const ext = path.extname(rel).slice(1).toLowerCase();
  if (!["webp", "png", "jpg", "jpeg", "mp4", "pdf", "svg"].includes(ext)) continue;

  const full = path.join(ASSETS_DIR, rel);
  const { size } = await stat(full);
  const type = ext === "mp4" ? "video" : ext === "pdf" ? "document" : "image";
  const dim = type === "image" ? dimensions(full) : { width: 0, height: 0 };

  const project = rel.startsWith("projects/")
    ? rel.split("/")[1]
    : rel.startsWith("craft/")
      ? null
      : undefined;

  const catalogue = CATALOGUE[rel];
  entries.push({
    path: `/assets/${rel}`,
    file: rel,
    type,
    page: catalogue?.[0] ?? (project ? "projects" : "unassigned"),
    project: project ?? catalogue?.[1] ?? null,
    width: dim.width,
    height: dim.height,
    aspect: dim.width && dim.height ? Number((dim.width / dim.height).toFixed(4)) : null,
    hero: catalogue?.[2] ?? false,
    gallery: catalogue?.[3] ?? false,
    bytes: size,
    verified: true,
  });
}

// Cross-check: every asset path referenced in the data layer must exist.
const referencedPaths = new Set();
for (const source of [
  "src/data/projects.ts",
  "src/data/services.ts",
  "src/components/home/Hero.tsx",
  "src/components/home/BrandStatement.tsx",
  "src/components/home/WhatWeDo.tsx",
  "src/components/home/Craftsmanship.tsx",
  "src/components/home/Values.tsx",
  "src/components/home/Founder.tsx",
  "src/components/home/ServicesShowcase.tsx",
  "src/components/layout/PageHero.tsx",
  "src/app/about/page.tsx",
  "src/app/services/page.tsx",
  "src/app/projects/page.tsx",
  "src/app/projects/[slug]/page.tsx",
  "src/app/contact/page.tsx",
]) {
  if (!existsSync(source)) continue;
  const content = readFileSync(source, "utf8");
  for (const match of content.matchAll(/["'`](\/assets\/[^"'`\s]+)["'`]/g)) {
    const value = match[1];
    // Skip template literals — their concrete values are validated by the
    // project data itself.
    if (value.includes("${")) continue;
    referencedPaths.add(value);
  }
}

for (const referenced of referencedPaths) {
  // Generated crops are not listed in the manifest but must still exist.
  if (referenced.startsWith("/assets/hero-crops/")) {
    const onDisk = path.join(
      ASSETS_DIR,
      referenced.replace(/^\/assets\//, "")
    );
    if (!existsSync(onDisk)) missing.push(referenced);
    continue;
  }
  if (!entries.some((entry) => entry.path === referenced)) {
    missing.push(referenced);
  }
}

// The project gallery paths are template literals, so they are validated
// separately by re-parsing the project data.
const projectSource = readFileSync("src/data/projects.ts", "utf8");
for (const match of projectSource.matchAll(
  /img\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g
)) {
  const [, slug, file] = match;
  const publicPath = `/assets/projects/${slug}/${file}`;
  if (!entries.some((entry) => entry.path === publicPath)) {
    missing.push(publicPath);
  }
}

const header = `/**
 * ASSET MANIFEST — generated by scripts/generate-asset-manifest.mjs.
 *
 * Every original ANJ Designs asset used by the site, with its true pixel
 * dimensions, the page and project it belongs to, and where it may be used.
 *
 * Regenerate with:  node scripts/generate-asset-manifest.mjs
 *
 * Source of truth: https://anjdesigns.in/ and the official DECOR INN
 * portfolio PDFs hosted there. See docs/ORIGINAL-SITE-EXTRACTION.md.
 */
`;

const body = `export type AssetType = "image" | "video" | "document";

export interface AssetRecord {
  /** Path under /public, e.g. "/assets/projects/apartment/01.webp" */
  path: string;
  /** File name inside public/assets */
  file: string;
  type: AssetType;
  /** Page(s) the asset is used on. */
  page: string;
  /** Project slug, when the asset belongs to a project. */
  project: string | null;
  width: number;
  height: number;
  aspect: number | null;
  /** Suitable as a full-bleed hero image. */
  hero: boolean;
  /** Suitable inside a project gallery. */
  gallery: boolean;
  bytes: number;
  verified: boolean;
}

export const assets: AssetRecord[] = ${JSON.stringify(entries, null, 2)};

/** Look up a single asset by its public path. */
export function getAsset(path: string): AssetRecord | undefined {
  return assets.find((asset) => asset.path === path);
}

/** All assets belonging to a project slug. */
export function getProjectAssets(project: string): AssetRecord[] {
  return assets.filter((asset) => asset.project === project);
}

export const assetSummary = {
  total: assets.length,
  images: assets.filter((a) => a.type === "image").length,
  videos: assets.filter((a) => a.type === "video").length,
  documents: assets.filter((a) => a.type === "document").length,
  bytes: assets.reduce((sum, a) => sum + a.bytes, 0),
};
`;

await writeFile(OUT, header + body, "utf8");
console.log(`wrote ${OUT} with ${entries.length} assets`);
if (missing.length) {
  console.error("MISSING ASSETS:", missing);
  process.exit(1);
}
