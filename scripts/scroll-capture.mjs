import { chromium } from "playwright";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] || "http://localhost:3000";
const route = process.argv[3] || "/";
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 900);
const label = process.argv[6] || "scroll";
const OUT = path.resolve("qa-shots");

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height } });
const page = await ctx.newPage();
await page.goto(BASE + route, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const total = await page.evaluate(() => document.body.scrollHeight);
const steps = Math.ceil(total / height);
for (let i = 0; i < steps; i++) {
  const y = i * height;
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(OUT, `${label}-${String(i).padStart(2, "0")}.jpg`),
    type: "jpeg",
    quality: 74,
  });
}
console.log(`captured ${steps} frames of ${route} @ ${width} (page height ${total}px)`);
await browser.close();
