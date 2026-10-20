#!/usr/bin/env python3
"""
ANJ Designs — curate the photography extracted from the official portfolio PDFs
into a structured, named library under public/assets/craft/.

Categories follow the source PDF's own range headings (page ranges), so the
labelling is the company's own, not invented. Within each range the largest
photographs are selected first.
"""
import json
import os
import shutil

SRC = "public/assets/portfolio-extracted"
DST = "public/assets/craft"

# source pdf -> list of (first_page, last_page, category, slug, max_picks)
RANGES = {
    "decor-inn-latest-gallery-2.pdf": [
        (5, 5, "bar-units", "bar-unit", 5),
        (6, 6, "dining", "dining-set", 5),
        (7, 7, "media-consoles", "media-console", 6),
        (8, 8, "study-tables", "study-table", 6),
        (9, 9, "chairs", "chair", 6),
        (10, 10, "dressers", "dresser", 5),
        (11, 11, "wall-panels", "wall-panel", 6),
        (12, 12, "living-room", "living-set", 6),
        (13, 13, "kids-bedroom", "kids-bedroom", 5),
        (14, 14, "led-profile-lights", "led-profile", 4),
        (16, 18, "handcrafted-work", "handcrafted", 7),
        (19, 20, "bespoke-bed", "bespoke-bed", 6),
        (21, 22, "economic-range", "economic-range", 5),
    ],
    "decorinn-gallery-3.pdf": [
        (6, 7, "bedroom-range", "bedroom", 9),
        (8, 10, "entrance-foyers", "entrance-foyer", 9),
        (11, 12, "dining-range", "dining", 8),
        (13, 14, "formal-living", "formal-living", 7),
        (15, 16, "informal-living", "informal-living", 7),
        (17, 17, "wall-panels", "wall-panel", 5),
        (18, 19, "finishes", "finish-sample", 7),
        (23, 23, "workshop", "workshop", 4),
    ],
    "portfolio-2.pdf": [
        (7, 10, "design-gallery", "design-concept", 6),
        (11, 13, "dining", "dining", 5),
        (19, 19, "study-tables", "study-table", 4),
        (20, 20, "chairs", "chair", 5),
        (21, 22, "dressers", "dresser", 5),
        (30, 30, "kids-bedroom", "kids-bedroom", 4),
        (33, 34, "bespoke-bed", "bespoke-bed", 6),
    ],
}


def main():
    idx = json.load(open(os.path.join(SRC, "index.json")))
    if os.path.isdir(DST):
        shutil.rmtree(DST)
    os.makedirs(DST, exist_ok=True)

    by_pdf = {}
    for rec in idx:
        by_pdf.setdefault(rec["source"], []).append(rec)

    out = []
    for pdf, ranges in RANGES.items():
        for first, last, cat, slug, limit in ranges:
            pool = [
                r
                for r in by_pdf.get(pdf, [])
                if first <= r["page"] <= last
                and r["width"] >= 620
                and r["height"] >= 400
                and r["width"] / max(r["height"], 1) < 2.05
            ]
            pool.sort(key=lambda r: -(r["width"] * r["height"]))
            pool = pool[:limit]
            folder = os.path.join(DST, cat)
            os.makedirs(folder, exist_ok=True)
            for n, rec in enumerate(pool, start=1):
                # Keep the source PDF in the name so two PDFs that use the same
                # slug (e.g. "bedroom-01") never collide on disk.
                tag = os.path.splitext(pdf)[0].split("-")[0]
                name = f"{slug}-{tag}-{n:02d}.img"
                shutil.copyfile(os.path.join(SRC, rec["file"]), os.path.join(folder, name))
                out.append(
                    {
                        "category": cat,
                        "slug": slug,
                        "file": f"craft/{cat}/{name}",
                        "width": rec["width"],
                        "height": rec["height"],
                        "aspect": rec["aspect"],
                        "source": rec["source"],
                        "sourcePage": rec["page"],
                    }
                )

    with open(os.path.join(DST, "index.json"), "w") as fh:
        json.dump(out, fh, indent=2)

    counts = {}
    for r in out:
        counts[r["category"]] = counts.get(r["category"], 0) + 1
    for k in sorted(counts):
        print(f"  {k:26s} {counts[k]}")
    print(f"total {len(out)} curated images -> {DST}")


if __name__ == "__main__":
    main()
