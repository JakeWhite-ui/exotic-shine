"""Cut a light-theme logo from the client's white-background artwork.

The dark-theme logo has chrome and near-white type, which disappears against
a light page. The client supplied a second version with dark type — this
strips the white backdrop to alpha so the same mark works on any light
surface, then writes both crops the site uses.
"""

from pathlib import Path
import numpy as np
from PIL import Image

SRC = Path("/Users/jakewhite/Downloads/WHITE BACKGROUND.png")
OUT = Path("public/brand")

rgb = Image.open(SRC).convert("RGB")
arr = np.asarray(rgb).astype(np.float32)

# The backdrop is pure white, so darkness doubles as coverage: the further a
# pixel is from white, the more opaque it should be.
lum = arr @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
alpha = np.clip((250.0 - lum) * 3.0, 0, 255).astype(np.uint8)

full = Image.fromarray(np.dstack([np.asarray(rgb), alpha]))
bbox = full.getbbox()
full = full.crop(bbox)
print("trimmed artwork:", full.size)

# Find the type block so the wordmark crop matches the dark version's framing:
# scan for the widest run of opaque rows in the lower half.
a = np.asarray(full)[:, :, 3]
rows = np.where(a.max(axis=1) > 40)[0]
runs, start = [], rows[0]
for i in range(1, len(rows)):
    if rows[i] != rows[i - 1] + 1:
        runs.append((start, rows[i - 1]))
        start = rows[i]
runs.append((start, rows[-1]))
print("bands:", runs)


def save(img, name, width):
    bb = img.getbbox()
    crop = img.crop(bb) if bb else img
    out = crop.resize(
        (width, round(crop.height * width / crop.width)), Image.LANCZOS
    )
    out.save(OUT / name, optimize=True)
    print(f"{name}: {out.size}")


save(full, "logo-lockup-light.png", 720)

# The artwork stacks crown, stars, car, EXOTIC, SHINE, tagline — so the type
# block is the last three bands. Anything above that is the car and crown,
# which the header variant deliberately drops.
type_top = runs[-3][0] if len(runs) >= 3 else int(full.height * 0.55)
save(full.crop((0, type_top, full.width, full.height)), "logo-wordmark-light.png", 640)
