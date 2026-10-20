#!/usr/bin/env node
/**
 * Lighthouse audit across every page of the production build.
 *
 * Usage: node scripts/lighthouse-audit.mjs [baseUrl]
 * Writes one JSON report per page into ./lighthouse-reports and prints a
 * score table.
 */
import { execFile } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);
const BASE = process.argv[2] || "http://localhost:3100";
const OUT = path.resolve("lighthouse-reports");

const PAGES = [
  ["home", "/"],
  ["about", "/about"],
  ["services", "/services"],
  ["projects", "/projects"],
  ["project-detail", "/projects/dlf-phase-1-gurugram"],
  ["contact", "/contact"],
];

await mkdir(OUT, { recursive: true });

const rows = [];

for (const [name, route] of PAGES) {
  const file = path.join(OUT, `${name}.json`);
  try {
    await run(
      "npx",
      [
        "--yes",
        "lighthouse@12",
        `${BASE}${route}`,
        "--output=json",
        `--output-path=${file}`,
        "--chrome-flags=--headless=new --no-sandbox",
        "--quiet",
      ],
      { timeout: 300_000, maxBuffer: 1024 * 1024 * 64 }
    );
  } catch (error) {
    console.error(`lighthouse failed for ${route}:`, error.message);
    continue;
  }

  const report = JSON.parse(await readFile(file, "utf8"));
  const categories = report.categories;
  const audits = report.audits;

  const metric = (id) => audits[id]?.numericValue ?? null;
  const display = (id) => audits[id]?.displayValue ?? "—";

  rows.push({
    page: name,
    performance: Math.round((categories.performance?.score ?? 0) * 100),
    accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
    "best-practices": Math.round((categories["best-practices"]?.score ?? 0) * 100),
    seo: Math.round((categories.seo?.score ?? 0) * 100),
    fcp: display("first-contentful-paint"),
    lcp: display("largest-contentful-paint"),
    tbt: display("total-blocking-time"),
    cls: display("cumulative-layout-shift"),
    bytes: display("total-byte-weight"),
  });
}

const headers = Object.keys(rows[0] ?? {});
const widths = headers.map((h) =>
  Math.max(h.length, ...rows.map((r) => String(r[h]).length))
);

console.log(
  headers.map((h, i) => h.padEnd(widths[i])).join("  ")
);
console.log(widths.map((w) => "-".repeat(w)).join("  "));
for (const row of rows) {
  console.log(
    headers.map((h, i) => String(row[h]).padEnd(widths[i])).join("  ")
  );
}
