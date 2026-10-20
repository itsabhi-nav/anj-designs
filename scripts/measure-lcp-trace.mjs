#!/usr/bin/env node
/**
 * Observed Largest Contentful Paint, read from the Chrome trace.
 *
 * Lighthouse's Lantern simulation and the PerformanceObserver API both
 * intermittently fail to report an LCP candidate for the animated hero on this
 * site. The Chrome DevTools Protocol trace is the ground truth, so this
 * script records it directly.
 *
 * Usage: node scripts/measure-lcp-trace.mjs [baseUrl]
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

  const events = [];
  cdp.on("Tracing.dataCollected", (p) => events.push(...p.value));
  await cdp.send("Tracing.start", {
    traceConfig: {
      includedCategories: ["devtools.timeline", "blink.user_timing", "latencyInfo"],
    },
    transferMode: "ReportEvents",
  });

  await page.goto(BASE + route, { waitUntil: "load" });
  await page.waitForTimeout(5000);

  const done = new Promise((resolve) => cdp.once("Tracing.tracingComplete", resolve));
  await cdp.send("Tracing.end");
  await done;

  const candidates = events
    .filter((e) => e.name === "largestContentfulPaint::Candidate")
    .map((e) => ({ ts: e.ts, type: e.args?.data?.type }));
  const paints = events
    .filter((e) => e.name === "Paint")
    .map((e) => e.ts)
    .sort((a, b) => a - b);

  const firstPaint = paints[0];
  const lcp = candidates.length ? candidates[candidates.length - 1].ts : 0;

  rows.push({
    page: name,
    fcp: firstPaint ? Math.round((firstPaint - firstPaint) / 1000) : 0,
    lcpMs: lcp && firstPaint ? Math.round((lcp - firstPaint) / 1000) : 0,
    type: candidates.length ? candidates[candidates.length - 1].type : "none",
  });

  await ctx.close();
}

await browser.close();

console.log("Observed LCP (Chrome trace, relative to first paint)");
console.log("page            lcp      type");
console.log("--------------  -------  --------");
for (const row of rows) {
  console.log(
    row.page.padEnd(16) +
      String(row.lcpMs + "ms").padStart(7) +
      "  " +
      row.type
  );
}
