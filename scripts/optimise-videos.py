#!/usr/bin/env python3
"""
ANJ Designs — video delivery pipeline.

For every original video on the live site this produces:

  * a WebP poster frame (shown immediately, before any video bytes arrive),
  * a 1280 px web variant,
  * a 640 px mobile variant,
  * a small, heavily-compressed BACKGROUND variant plus its own poster, used
    for the full-bleed hero film.

The background variant is deliberately small and low frame-rate: it sits under
a dark green treatment where fine detail is invisible, so a large file would
be paid for nothing. It is also never part of the Largest Contentful Paint —
the poster frame is.

The untouched masters are kept in public/assets/videos/originals/.

Usage:  .venv-pdf/bin/python scripts/optimise-videos.py
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

# The background film uses one calm, well-composed segment of each original:
#   (start seconds, duration seconds, CRF)
BACKGROUNDS = {
    "luxury-apartment": (0.0, 2.8, 38),
    "modern-furniture": (0.0, 2.6, 38),
    "home-office": (0.0, 2.4, 36),
}

# Second offset used for the poster frame (avoid the very first frame).
POSTER_AT = "00:00:02"


def run(args):
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stderr[-1200:])
        raise SystemExit(f"ffmpeg failed: {' '.join(args[:4])}")


os.makedirs(ORIG, exist_ok=True)

for name, (mobile_w, desktop_w) in VARIANTS.items():
    master = os.path.join(SRC, f"{name}.mp4")
    if not os.path.exists(master):
        # The master was moved to originals/ by a previous run.
        master = os.path.join(ORIG, f"{name}.mp4")
    if not os.path.exists(master):
        print("missing", name)
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

    # ── Background film ────────────────────────────────────────────────────
    # One calm segment, 22 fps, a gentle blur, a long GOP and a high CRF. This
    # is atmosphere under a dark green treatment where fine detail is
    # invisible, so a large file would be paid for nothing. Slowing the camera
    # to 45% turns the walkthrough into a cinematic drift behind the headline.
    start, duration, crf = BACKGROUNDS.get(name, (0.0, 3.4, 37))
    for label, width in (("desktop", 960), ("mobile", 560)):
        out = os.path.join(SRC, f"bg-{name}-{label}.mp4")
        run([
            FFMPEG, "-y", "-ss", str(start), "-t", str(duration), "-i", master,
            "-filter_complex",
            f"[0:v]setpts=2.2*PTS,scale={width}:-2:flags=lanczos,"
            "boxblur=0.7:0.35,fps=22,format=yuv420p[v]",
            "-map", "[v]",
            "-c:v", "libx264", "-preset", "veryfast", "-crf", str(crf),
            "-g", "44", "-profile:v", "baseline", "-level", "3.0",
            "-pix_fmt", "yuv420p",
            "-movflags", "+faststart", "-an",
            out,
        ])
        size = os.path.getsize(out) / 1024
        print(f"bg-{name}-{label}.mp4  {width}px  {size:.0f} KB")

    # Background poster — a still taken from the middle of the film segment, so
    # the first paint matches the first frame the visitor actually sees.
    bg_poster = os.path.join(SRC, f"bg-poster-{name}.png")
    run([
        FFMPEG, "-y", "-ss", str(start + duration * 0.35), "-i", master,
        "-frames:v", "1", "-q:v", "3", bg_poster,
    ])

    # Remove the (now redundant) top-level master; the original is kept in
    # originals/.
    top_level = os.path.join(SRC, f"{name}.mp4")
    if os.path.exists(top_level):
        os.remove(top_level)
    print(f"poster {os.path.basename(poster)}")
