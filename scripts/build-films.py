#!/usr/bin/env python3
"""
ANJ Designs — cinematic background films, built from the studio's real work.

The original site's hero footage is a dated 3D walkthrough, and once scaled
for the web it reads as soft. Instead these films are cut from the studio's
own completed interiors — the high-resolution photography extracted from the
official Decor Inn portfolio PDFs — as slow, eased moves with long
cross-dissolves between spaces.

Nothing is generated or invented: every frame is a photograph the studio has
published, chosen by eye for how well it holds a full-bleed frame.

Two films are produced:

  interiors  the architectural spaces — the staircase, the formal dining
             rooms, the teal salon
  craft      the making and the furniture — the workshop, the tailored
             living rooms, the joinery

Each is rendered twice — a landscape master and a 9:16 portrait master for
phones, because a 16:9 film cropped into a tall phone viewport loses most of
the frame.

The film is deliberately modest in size; the POSTER is rendered from the
original photograph at full resolution, so the first paint is sharp even
though the moving layer is smaller.

Usage:  .venv-pdf/bin/python scripts/build-films.py
"""
import os
import subprocess

import imageio_ffmpeg
from PIL import Image

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
OUT = "public/assets/videos"
POSTERS = "public/assets/posters"

LAND = (1152, 648)
PORT = (608, 1080)
FPS = 20
SECONDS_PER_SHOT = 1.55
DISSOLVE = 0.7

# Each shot: (source, zoom-from, zoom-to, pan-x-from, pan-x-to, pan-y)
FILMS = {
    # The architectural spaces.
    "interiors": [
        ("public/assets/craft/entrance-foyers/entrance-foyer-decorinn-01.webp", 1.00, 1.04, 0.50, 0.42, 0.52),
        ("public/assets/craft/economic-range/economic-range-decor-01.webp", 1.04, 1.00, 0.44, 0.56, 0.38),
        ("public/assets/craft/dining-range/dining-decorinn-01.webp", 1.00, 1.04, 0.58, 0.46, 0.50),
        ("public/assets/craft/dining/dining-portfolio-01.webp", 1.04, 1.00, 0.42, 0.54, 0.46),
    ],
    # The making and the furniture.
    "craft": [
        ("public/assets/craft/workshop/workshop-decorinn-01.webp", 1.00, 1.04, 0.56, 0.44, 0.50),
        ("public/assets/craft/informal-living/informal-living-decorinn-01.webp", 1.04, 1.00, 0.44, 0.56, 0.50),
        ("public/assets/craft/formal-living/formal-living-decorinn-01.webp", 1.00, 1.04, 0.58, 0.44, 0.50),
        ("public/assets/craft/dining/dining-portfolio-03.webp", 1.04, 1.00, 0.42, 0.56, 0.48),
    ],
}


def ease(t: float) -> float:
    """A gentle in-out curve — a linear move looks mechanical."""
    return t * t * (3 - 2 * t)


def cover(img: Image.Image, size, zoom: float, pan_x: float, pan_y: float):
    """Scale to cover the frame at the given zoom, then crop around the pan."""
    w, h = size
    scale = max(w / img.width, h / img.height) * zoom
    rw, rh = int(img.width * scale + 0.5), int(img.height * scale + 0.5)
    resized = img.resize((rw, rh), Image.LANCZOS)
    max_x = max(0, rw - w)
    max_y = max(0, rh - h)
    left = int(pan_x * max_x)
    top = int(pan_y * max_y)
    return resized.crop((left, top, left + w, top + h))


def render_shot(path, size, x0, x1, fy, frames, overscale=1.22):
    """
    A slow drift across the photograph.

    The source is scaled ONCE and the crop window then travels across it. That
    matters more than it sounds: re-scaling the image on every frame changes
    every pixel slightly, which defeats inter-frame compression and can
    quadruple the file. Cropping a pre-scaled image leaves the pixels
    untouched, so the encoder sees pure motion and the film stays small.
    """
    img = Image.open(path).convert("RGB")
    w, h = size
    scale = max(w / img.width, h / img.height) * overscale
    big = img.resize(
        (int(img.width * scale + 0.5), int(img.height * scale + 0.5)), Image.LANCZOS
    )
    max_x = max(0, big.width - w)
    max_y = max(0, big.height - h)

    out = []
    for i in range(frames):
        t = ease(i / max(1, frames - 1))
        left = int((x0 + (x1 - x0) * t) * max_x)
        top = int(fy * max_y)
        out.append(big.crop((left, top, left + w, top + h)))
    return out


def encode(frames, dest, crf):
    cmd = [
        FFMPEG, "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
        "-s", f"{frames[0].width}x{frames[0].height}",
        "-r", str(FPS), "-i", "-",
        # A touch of temporal denoise: the source photographs carry fine
        # texture, and removing it is what lets the encode stay small.
        "-vf", "hqdn3d=2:1:4:4",
        "-c:v", "libx264", "-preset", "slow", "-crf", str(crf),
        "-g", "40", "-profile:v", "high", "-level", "4.0",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
        dest,
    ]
    proc = subprocess.run(
        cmd, input=b"".join(f.tobytes() for f in frames), capture_output=True
    )
    if proc.returncode != 0:
        print(proc.stderr.decode()[-1500:])
        raise SystemExit("ffmpeg failed for " + dest)
    print(
        f"    {os.path.basename(dest)}  "
        f"{os.path.getsize(dest) / 1024:.0f} kB  {len(frames) / FPS:.1f}s"
    )


def build(name, shots, size, suffix, crf, poster_size):
    frames_per_shot = int(SECONDS_PER_SHOT * FPS)
    dissolve_frames = int(DISSOLVE * FPS)

    print(f"  {name} [{suffix}] {size[0]}x{size[1]} — {len(shots)} shots")
    timeline = []

    for index, (path, z0, z1, x0, x1, fy) in enumerate(shots):
        shot = render_shot(path, size, x0, x1, fy, frames_per_shot)
        if index == 0:
            timeline.extend(shot)
        else:
            # Cross-dissolve the head of this shot over the tail of the last.
            for d in range(dissolve_frames):
                prev = timeline[-1 - d]
                blend = Image.blend(prev, shot[d], (d + 1) / (dissolve_frames + 1))
                timeline[-1 - d] = blend
            timeline.extend(shot[dissolve_frames:])

    # Loop seamlessly: the tail drifts back into the head.
    head = timeline[0]
    tail_frames = min(dissolve_frames, len(timeline) // 4)
    for d in range(tail_frames):
        timeline[-1 - d] = Image.blend(
            timeline[-1 - d], head, ((d + 1) / (tail_frames + 1)) * 0.9
        )

    encode(timeline, os.path.join(OUT, f"film-{name}-{suffix}.mp4"), crf)

    # ── The poster is the FIRST frame of the film, re-rendered from the
    #    original photograph at full resolution, so the very first paint is
    #    sharp even though the moving layer is smaller.
    first = shots[0]
    poster = cover(
        Image.open(first[0]).convert("RGB"),
        poster_size,
        first[1],
        first[3],
        first[5],
    )
    os.makedirs(POSTERS, exist_ok=True)
    poster_path = os.path.join(
        POSTERS, f"film-{name}-{'16x9' if suffix == 'desktop' else '9x16'}.webp"
    )
    poster.save(poster_path, "WEBP", quality=58, method=6)
    print(
        f"    {os.path.basename(poster_path)}  "
        f"{os.path.getsize(poster_path) / 1024:.0f} kB  {poster_size[0]}x{poster_size[1]}"
    )


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(POSTERS, exist_ok=True)
    for name, shots in FILMS.items():
        build(name, shots, LAND, "desktop", 37, (1600, 900))
        build(name, shots, PORT, "mobile", 38, (640, 1136))
    print("done")
