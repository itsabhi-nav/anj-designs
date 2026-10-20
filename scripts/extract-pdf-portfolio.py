#!/usr/bin/env python3
"""
ANJ Designs — extract the original project photography from the official
DECOR INN / ANJ Designs portfolio PDFs (hosted on the live site).

The website only exposes 344x344 thumbnails of the portfolio; the official
portfolio PDFs contain the full-resolution masters. These are genuine ANJ
Designs / Decor Inn photographs.

Requires: pymupdf  (python -m venv .venv-pdf && .venv-pdf/bin/pip install pymupdf)

Usage: .venv-pdf/bin/python scripts/extract-pdf-portfolio.py
"""
import json
import os
import re
import sys

import pymupdf

PDF_DIR = "public/assets/pdf"
OUT_DIR = "public/assets/portfolio-extracted"
META_PATH = "public/assets/portfolio-extracted/index.json"

# Small decorative/graphic elements that are not project photography.
SKIP = re.compile(
    r"(logo|favicon|icon|bg-color|signat|watermark)", re.IGNORECASE
)


def slugify(text: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return s or "untitled"


def main() -> int:
    os.makedirs(OUT_DIR, exist_ok=True)
    catalogue = []

    for pdf_name in sorted(os.listdir(PDF_DIR)):
        if not pdf_name.lower().endswith(".pdf"):
            continue
        pdf_path = os.path.join(PDF_DIR, pdf_name)
        base = os.path.splitext(pdf_name)[0]
        doc = pymupdf.open(pdf_path)

        for pno in range(doc.page_count):
            page = doc[pno]
            page_text = re.sub(r"\s+", " ", page.get_text("text")).strip()

            seen = set()
            for idx, info in enumerate(page.get_images(full=True)):
                xref = info[0]
                if xref in seen:
                    continue
                seen.add(xref)
                try:
                    extracted = doc.extract_image(xref)
                except Exception:
                    continue
                data = extracted["image"]
                ext = extracted["ext"]
                w, h = extracted.get("width", 0), extracted.get("height", 0)
                if w < 400 or h < 300:
                    continue
                if SKIP.search(pdf_name):
                    continue

                fname = f"{base}-p{pno + 1:02d}-{idx + 1:02d}.{ext}"
                with open(os.path.join(OUT_DIR, fname), "wb") as fh:
                    fh.write(data)

                catalogue.append(
                    {
                        "file": fname,
                        "source": pdf_name,
                        "page": pno + 1,
                        "width": w,
                        "height": h,
                        "pageText": page_text,
                        "aspect": round(w / h, 4) if h else None,
                    }
                )
        doc.close()
        print(f"processed {pdf_name}")

    with open(META_PATH, "w") as fh:
        json.dump(catalogue, fh, indent=2)
    print(f"extracted {len(catalogue)} images -> {OUT_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
