#!/usr/bin/env node
/**
 * Quick Lighthouse LCP probe for a single page.
 * Usage: node scripts/lcp-probe.mjs [url] [label]
 */
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";

const run = promisify(execFile);
const url = process.argv[2] || "http://localhost:3100/";
const label = process.argv[3] || url;
const file = `/tmp/lcp-probe.json`;

try {
  await run(
    "npx",
    [
      "--yes",
      "lighthouse@11.7.1",
      url,
      "--output=json",
      `--output-path=${file}`,
      "--chrome-flags=--headless=new --no-sandbox",
      "--quiet",
    ],
    { timeout: 300_000, maxBuffer: 1024 * 1024 * 64 }
  );
} catch (e) {
  console.log(label, "-> lighthouse failed");
  process.exit(0);
}

const report = JSON.parse(await readFile(file, "utf8"));
const a = report.audits;
console.log(
  label.padEnd(34),
  "perf",
  String(Math.round(report.categories.performance.score * 100)).padStart(3),
  "| lcp",
  String(a["largest-contentful-paint"]?.displayValue ?? "—").padStart(7),
  "| fcp",
  String(a["first-contentful-paint"]?.displayValue ?? "—").padStart(6),
  "| cls",
  a["cumulative-layout-shift"]?.displayValue ?? "—",
  "| bytes",
  a["total-byte-weight"]?.displayValue ?? "—"
);
