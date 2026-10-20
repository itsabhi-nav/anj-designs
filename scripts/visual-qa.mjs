#!/usr/bin/env node
/**
 * Visual QA sweep.
 *
 * Captures the site at the representative widths from the brief and reports
 * any console errors, failed requests, horizontal overflow, broken images and
 * dead links.
 *
 * Usage: node scripts/visual-qa.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = path.resolve("qa-shots");

const WIDTHS = [320, 375, 430, 768, 1024, 1280, 1440, 1920];
const PAGES = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "services", path: "/services" },
  { name: "projects", path: "/projects" },
  { name: "project-detail", path: "/projects/dlf-phase-1-gurugram" },
  { name: "contact", path: "/contact" },
  { name: "not-found", path: "/this-page-does-not-exist" },
];

const problems = [];

async function auditPage(page, label, url) {
  const consoleErrors = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("does-not-exist")) {
      consoleErrors.push(msg.text());
    }
  });
  page.on("requestfailed", (req) => {
    failedRequests.push(`${req.url()} — ${req.failure()?.errorText}`);
  });
  page.on("response", (res) => {
    if (res.status() >= 400 && !res.url().includes("does-not-exist")) {
      failedRequests.push(`${res.status()} ${res.url()}`);
    }
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1200);

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflow = doc.scrollWidth - doc.clientWidth;

    const brokenImages = Array.from(document.images)
      // Only genuinely failed images — a lazy image that has not started
      // loading yet is not broken.
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src);

    const emptyLinks = Array.from(document.querySelectorAll("a"))
      .filter((a) => {
        const href = a.getAttribute("href");
        return !href || href === "#";
      })
      .map((a) => a.textContent?.trim().slice(0, 40) || "(no text)");

    const headings = Array.from(document.querySelectorAll("h1,h2,h3"))
      .map((h) => `${h.tagName}: ${h.textContent?.trim().slice(0, 60)}`)
      .slice(0, 12);

    return {
      overflow,
      brokenImages,
      emptyLinks,
      headings,
      title: document.title,
      description:
        document.querySelector('meta[name="description"]')?.getAttribute("content") ??
        null,
      canonical:
        document.querySelector('link[rel="canonical"]')?.getAttribute("href") ??
        null,
      h1Count: document.querySelectorAll("h1").length,
    };
  });

  const report = { label, url, metrics, consoleErrors, failedRequests };

  if (metrics.overflow > 1) {
    problems.push(
      `${label}: horizontal overflow of ${metrics.overflow}px`
    );
  }
  if (metrics.brokenImages.length) {
    problems.push(`${label}: broken images — ${metrics.brokenImages.join(", ")}`);
  }
  if (metrics.emptyLinks.length) {
    problems.push(`${label}: empty/dead links — ${metrics.emptyLinks.join(", ")}`);
  }
  if (metrics.h1Count !== 1) {
    problems.push(`${label}: expected exactly one h1, found ${metrics.h1Count}`);
  }
  if (consoleErrors.length) {
    problems.push(`${label}: console errors — ${consoleErrors.slice(0, 3).join(" | ")}`);
  }
  if (failedRequests.length) {
    problems.push(
      `${label}: failed requests — ${failedRequests.slice(0, 4).join(" | ")}`
    );
  }

  return report;
}

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

// ── Full-page captures at the key widths ──────────────────────────────────
for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: width < 500 ? 844 : 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  for (const target of PAGES) {
    const report = await auditPage(
      page,
      `${target.name} @ ${width}`,
      `${BASE}${target.path}`
    );

    // Hero / above-the-fold capture for every page and width.
    await page.screenshot({
      path: path.join(OUT, `${target.name}-${width}-fold.jpg`),
      type: "jpeg",
      quality: 72,
    });

    // Full-page capture only for the two key widths to keep this fast.
    if (width === 390 || width === 1440) {
      // Scroll through the page first so every scroll-reveal has fired,
      // otherwise the full-page capture shows empty sections.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.75;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 140));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 600));
      });
      await page.waitForTimeout(700);

      await page.screenshot({
        path: path.join(OUT, `${target.name}-${width}-full.jpg`),
        type: "jpeg",
        quality: 62,
        fullPage: true,
      });
    }
  }

  await context.close();
}

await browser.close();

console.log("\n================ QA SUMMARY ================");
if (problems.length === 0) {
  console.log("No problems detected.");
} else {
  for (const problem of problems) console.log("•", problem);
}
console.log(`\nScreenshots written to ${OUT}`);
