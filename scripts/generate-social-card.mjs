#!/usr/bin/env node
/**
 * ANJ Designs — social share card.
 *
 * Instagram, WhatsApp, LinkedIn and X all crop a link preview to roughly
 * 1.91:1. The original header artwork is 1530 × 180 — an 8.5:1 banner — so
 * every one of those previews cropped it down to an empty strip and appeared
 * blank.
 *
 * This builds a proper 1200 × 630 card from the studio's own photography.
 *
 * Usage: node scripts/generate-social-card.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = "public/assets/social";
const W = 1200;
const H = 630;

await mkdir(OUT, { recursive: true });

/** A deep forest wash, so the type always has contrast. */
const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1c16" stop-opacity="0.88"/>
      <stop offset="0.55" stop-color="#102820" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#102820" stop-opacity="0.28"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
</svg>`);

const source = "public/assets/craft/dining-range/dining-decorinn-01.webp";
const logo = "public/assets/brand/anj-lockup-white.webp";

const base = await sharp(source)
  .resize(W, H, { fit: "cover", position: "attention" })
  .composite([{ input: overlay }])
  .png()
  .toBuffer();

const logoBuffer = await sharp(logo)
  .resize({ width: 300 })
  .png()
  .toBuffer();

const logoMeta = await sharp(logoBuffer).metadata();

// The wordmark, set as vector type so it is crisp at any size.
const wordmark = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <g fill="#f1f0e8" font-family="Georgia, 'Times New Roman', serif">
    <text x="72" y="404" font-size="92" letter-spacing="-2">Spaces that</text>
    <text x="72" y="500" font-size="92" font-style="italic" fill="#c0a878" letter-spacing="-2">move you.</text>
  </g>
  <g fill="#f1f0e8" opacity="0.72" font-family="Helvetica, Arial, sans-serif" font-size="20" letter-spacing="4">
    <text x="74" y="548">ANJ DESIGNS BY DECOR INN</text>
  </g>
  <rect x="72" y="356" width="64" height="2" fill="#c0a878"/>
</svg>`);

const out = path.join(OUT, "anj-og.jpg");
await sharp(base)
  .composite([
    { input: logoBuffer, left: 68, top: 56 },
    { input: wordmark, left: 0, top: 0 },
  ])
  .jpeg({ quality: 88, progressive: true, chromaSubsampling: "4:4:4" })
  .toFile(out);

const { size } = await sharp(out).metadata();
console.log(`wrote ${out} — ${W}x${H}, ${Math.round(size / 1024)} kB`);
