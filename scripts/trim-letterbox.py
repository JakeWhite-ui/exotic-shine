"""Strip letterbox bars from photos that came in as video frames.

A couple of the client's shots are screenshots from portrait video, so they
arrive with black bands top and bottom. Left alone they show as black stripes
inside the gallery tiles.
"""

from pathlib import Path
import numpy as np
from PIL import Image

TARGETS = ["bay-landcruiser"]
OUT = Path("public/studio")

for slug in TARGETS:
    path = OUT / f"{slug}.webp"
    img = Image.open(path).convert("RGB")
    rows = np.where(np.asarray(img.convert("L")).max(axis=1) > 25)[0]

    if rows[0] == 0 and rows[-1] == img.height - 1:
        print(f"{slug}: no bars")
        continue

    trimmed = img.crop((0, int(rows[0]), img.width, int(rows[-1]) + 1))
    trimmed.save(path, "WEBP", quality=84, method=6)
    print(f"{slug}: {img.height}px -> {trimmed.height}px")
