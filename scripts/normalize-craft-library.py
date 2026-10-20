#!/usr/bin/env python3
"""
ANJ Designs — normalise the curated craft library.

The PDF extractor emits a mix of .jpeg / .jpx files with duplicated bytes
(some pages share image XObjects). This script:
  * removes byte-identical duplicates,
  * converts everything to modern WebP (quality 82, max 1600px on the long edge),
  * renames each category to a clean `slug-NN.webp` sequence,
  * writes a manifest with true pixel dimensions.

Run:  .venv-pdf/bin/python scripts/normalize-craft-library.py
"""
import hashlib
import json
import os
import shutil

from PIL import Image

SRC = "public/assets/craft"
TMP = "public/assets/.craft-normalized"
MAX_EDGE = 1600
QUALITY = 82


def main():
    os.makedirs(TMP, exist_ok=True)
    manifest = []
    seen = set()

    for category in sorted(os.listdir(SRC)):
        folder = os.path.join(SRC, category)
        if not os.path.isdir(folder):
            continue
        files = sorted(f for f in os.listdir(folder) if f.endswith(".img"))
        kept = 0
        for name in files:
            src = os.path.join(folder, name)
            raw = open(src, "rb").read()
            digest = hashlib.md5(raw).hexdigest()
            if digest in seen:
                os.remove(src)
                continue
            seen.add(digest)
            try:
                im = Image.open(src).convert("RGB")
            except Exception:
                os.remove(src)
                continue
            w, h = im.size
            if w < 500 or h < 380:
                os.remove(src)
                continue
            if max(w, h) > MAX_EDGE:
                scale = MAX_EDGE / max(w, h)
                im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
            kept += 1
            slug = os.path.splitext(name)[0]
            out_name = f"{slug}.webp"
            out_path = os.path.join(TMP, category, out_name)
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            im.save(out_path, "WEBP", quality=QUALITY, method=6)
            os.remove(src)
            manifest.append(
                {
                    "category": category,
                    "file": f"craft/{category}/{out_name}",
                    "width": im.width,
                    "height": im.height,
                    "aspect": round(im.width / im.height, 4),
                    "bytes": os.path.getsize(out_path),
                }
            )
        if kept == 0:
            shutil.rmtree(folder, ignore_errors=True)

    shutil.rmtree(SRC, ignore_errors=True)
    shutil.move(TMP, SRC)
    with open(os.path.join(SRC, "index.json"), "w") as fh:
        json.dump(manifest, fh, indent=2)

    total = sum(r["bytes"] for r in manifest)
    print(f"{len(manifest)} images, {total / 1024 / 1024:.2f} MB total")
    for cat in sorted({r["category"] for r in manifest}):
        n = sum(1 for r in manifest if r["category"] == cat)
        print(f"  {cat:24s} {n}")


if __name__ == "__main__":
    main()
