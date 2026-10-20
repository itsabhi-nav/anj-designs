#!/usr/bin/env python3
"""
ANJ Designs — video asset preservation.

The three original films on the live site (5.6 MB, 18.5 MB, 4.1 MB) are kept
untouched in public/assets/videos/originals/. They are the studio's own
material and are preserved for the record.

They are NOT what plays behind the heroes. The hero films are cut from the
studio's own completed-interior photography by `scripts/build-films.py`, which
produces the small, sharp, art-directed films the site actually serves.

Usage:  .venv-pdf/bin/python scripts/optimise-videos.py
"""
import os
import shutil

SRC = "public/assets/videos"
ORIG = os.path.join(SRC, "originals")

ORIGINALS = {
    "luxury-apartment.mp4": "https://anjdesigns.in/wp-content/uploads/2025/07/0_Luxury_Apartment_Modern_Interior_1280x720.mp4",
    "modern-furniture.mp4": "https://anjdesigns.in/wp-content/uploads/2025/07/2143343_Furniture_Modern_1920x1080.mp4",
    "home-office.mp4": "https://anjdesigns.in/wp-content/uploads/2025/07/0_Home_Office_Desk_1280x720.mp4",
}

os.makedirs(ORIG, exist_ok=True)

for name, source in ORIGINALS.items():
    master = os.path.join(ORIG, name)
    if os.path.exists(master):
        print(f"  {name}  already preserved "
              f"({os.path.getsize(master) / 1024 / 1024:.1f} MB)")
        continue
    # A top-level copy may still be sitting in the delivery folder.
    staged = os.path.join(SRC, name)
    if os.path.exists(staged):
        shutil.move(staged, master)
        print(f"  {name}  preserved")
        continue
    print(f"  {name}  MISSING — fetch it from {source}")

print("\nThe hero films are built separately:\n"
      "  .venv-pdf/bin/python scripts/build-films.py")
