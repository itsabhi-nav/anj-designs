#!/usr/bin/env node
/**
 * Real-browser Core Web Vitals measurement.
 *
 * Lighthouse's Lantern simulation is unreliable for this site in headless
 * Chrome, so the LCP is measured directly in the browser with the CDP
 * emulation applied (Slow 4G network + 4x CPU throttle), which is what a
 * mid-range phone actually experiences.
 *
 * Usage: node scripts/measure-vitals.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:3100";

const PAGES = [
  ["home", "/"],
  ["about", "/about"],
  ["services", "/services"],
  ["projects", "/projects"],
  ["project-detail", "/projects/dlf-phase-1-gurugram"],
  ["contact", "/contact"],
];

/** "Slow 4G" as used by Lighthouse mobile emulation. */
const NETWORK = {
  offline: false,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
  latency: 150,
};

const CPU = 4;

const browser = await chromium.launch();

const rows = [];

for (const [name, route] of PAGES) {
  const ctx = await browser.newContext({
    viewport: { width: 412, height: 823 },
    deviceScaleFactor: 1.75,
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);

  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", NETWORK);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });

  await page.addInitScript(() => {
    window.__lcp = 0;
    window.__lcpEl = "";
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__lcp = entry.startTime;
        window.__lcpEl = entry.element
          ? entry.element.tagName + "." + String(entry.element.className).slice(0, 40)
          : entry.url || "";
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });

    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto(BASE + route, { waitUntil: "load" });
  await page.waitForTimeout(6000);

  const result = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const paints = performance.getEntriesByType("paint");
    const fcp = paints.find((p) => p.name === "first-contentful-paint");
    let bytes = 0;
    let requests = 0;
    for (const r of performance.getEntriesByType("resource")) {
      bytes += r.transferSize || 0;
      requests += 1;
    }
    return {
      fcp: Math.round(fcp ? fcp.startTime : 0),
      lcp: Math.round(window.__lcp),
      lcpEl: window.__lcpEl,
      cls: Number(window.__cls.toFixed(4)),
      ttfb: Math.round(nav ? nav.responseStart : 0),
      bytes,
      requests,
    };
  });

  rows.push({ page: name, ...result });
  await ctx.close();
}

await browser.close();

const headers = ["page", "ttfb", "fcp", "lcp", "cls", "bytes", "requests"];
const widths = headers.map((h) =>
  Math.max(h.length, ...rows.map((r) => String(r[h]).length))
);
console.log(headers.map((h, i) => h.padEnd(widths[i])).join("  "));
console.log(widths.map((w) => "-".repeat(w)).join("  "));
for (const row of rows) {
  console.log(
    headers
      .map((h, i) =>
        String(h === "bytes" ? Math.round(row[h] / 1024) + "KB" : row[h]).padEnd(
          widths[i]
        )
      )
      .join("  ")
  );
}
console.log("\nLCP elements:");
for (const row of rows) console.log(" ", row.page.padEnd(16), row.lcpEl);
