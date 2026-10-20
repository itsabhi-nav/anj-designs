import { chromium } from "playwright";

const browser = await chromium.launch();
const targets = process.argv.slice(2);
for (const spec of targets) {
  const [path, width] = spec.split("@");
  const ctx = await browser.newContext({ viewport: { width: Number(width), height: 800 } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
  const out = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      if (r.right > vw + 1 || r.left < -1) {
        bad.push({
          tag: el.tagName,
          cls: (el.className && String(el.className).slice(0, 100)) || "",
          left: Math.round(r.left),
          right: Math.round(r.right),
          w: Math.round(r.width),
        });
      }
    });
    return { vw, scrollW: document.documentElement.scrollWidth, bad: bad.slice(0, 16) };
  });
  console.log("###", path, width, "vw", out.vw, "scrollW", out.scrollW);
  out.bad.forEach((b) => console.log("  ", b.tag, JSON.stringify(b.cls), `L${b.left} R${b.right} W${b.w}`));
  await ctx.close();
}
await browser.close();
