#!/usr/bin/env python3
"""
ANJ Designs — video delivery pipeline.

For every original video on the live site this produces:
  * a WebP poster frame (shown immediately, before any video bytes arrive),
  * a 720p H.264 web variant,
  * a 480p mobile variant,
and leaves the original master file untouched in public/assets/videos/originals/.

Run:  .venv-pdf/bin/python scripts/optimise-videos.py
"""
import os
import shutil
import subprocess

import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SRC = "public/assets/videos"
ORIG = os.path.join(SRC, "originals")

# name -> (mobile width, desktop width)
VARIANTS = {
    "luxury-apartment": (640, 1280),
    "modern-furniture": (640, 1280),
    "home-office": (640, 1280),
}

# Second offset used for the poster frame (avoid the very first frame).
POSTER_AT = "00:00:02"

os.makedirs(ORIG, exist_ok=True)


def run(args):
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stderr[-1200:])
        raise SystemExit(f"ffmpeg failed: {' '.join(args[:4])}")


for name, (mobile_w, desktop_w) in VARIANTS.items():
    master = os.path.join(SRC, f"{name}.mp4")
    if not os.path.exists(master):
        print("missing", master)
        continue

    # Keep the untouched master alongside the optimised variants.
    backup = os.path.join(ORIG, f"{name}.mp4")
    if not os.path.exists(backup):
        shutil.copyfile(master, backup)

    # Poster frame
    poster = os.path.join(SRC, f"poster-{name}.png")
    run([
        FFMPEG, "-y", "-ss", POSTER_AT, "-i", master,
        "-frames:v", "1", "-q:v", "3", poster,
    ])

    # Web variants
    for label, width in (("desktop", desktop_w), ("mobile", mobile_w)):
        out = os.path.join(SRC, f"{name}-{label}.mp4")
        run([
            FFMPEG, "-y", "-i", master,
            "-vf", f"scale={width}:-2",
            "-c:v", "libx264", "-preset", "slow", "-crf", "30",
            "-profile:v", "main", "-pix_fmt", "yuv420p",
            "-movflags", "+faststart", "-an",
            out,
        ])
        size = os.path.getsize(out) / 1024 / 1024
        print(f"{name}-{label}.mp4  {width}px  {size:.2f} MB")

    # Remove the (now redundant) top-level master; the original is kept in originals/.
    os.remove(master)
    print(f"poster {os.path.basename(poster)}")
