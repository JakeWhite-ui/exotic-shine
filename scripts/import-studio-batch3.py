"""Import the third batch of studio photographs.

Picked for what each one does that nothing already on the site does:

  bay-sealed   the dust-sealed bay behind strip curtains — the single best
               illustration of why paint work needs a clean room
  hall-open    the wide floor with the stair, counter and roller door open
  bay-empty    a prepared bay under the light lines, nothing in it
  film-rolls   the film rack, with UltraGuard PPF boxes legible — real proof
               of the brands the client says they stock
  bay-marble   clean floor, different angle
  tool-wall    the equipment wall

The rest of the batch were near-duplicates of these or of shots already used.
"""

from pathlib import Path
from PIL import Image, ImageOps

SRC = Path("/tmp/es3")
OUT = Path("public/studio")

selected = {
    "IMG_5297.jpg": "bay-sealed",
    "IMG_5301.jpg": "hall-open",
    "IMG_5283.jpg": "bay-empty",
    "IMG_5273.jpg": "film-rolls",
    "IMG_5299.jpg": "bay-marble",
    "IMG_5275.jpg": "tool-wall",
}

for name, slug in selected.items():
    src = SRC / name
    if not src.exists():
        print("MISSING", name)
        continue
    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    img.thumbnail((1600, 1600), Image.LANCZOS)
    dst = OUT / f"{slug}.webp"
    img.save(dst, "WEBP", quality=82, method=6)
    print(f"{slug:14} {img.width}x{img.height}  {dst.stat().st_size // 1024} KB")
