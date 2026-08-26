"""Import the second batch of studio photographs.

The client sent 19 more and asked us to publish only the best. These five
were picked because each shows something the others don't — the room's scale,
the brand wall, the film swatch range, the counter, and a daylight shot of the
entrance that's actually legible. The rest were near-duplicates or too dark to
earn a slot.
"""

from pathlib import Path
from PIL import Image, ImageOps

SRC = Path("/tmp/es2")
OUT = Path("public/studio")

selected = {
    "IMG_5284.jpg": "hall-wide",       # widest view, shows scale and the stair
    "IMG_5271.jpg": "brand-wall",      # X EXOTIC SHINE wall straight on
    "IMG_5282.jpg": "film-swatches",   # wrap film colour range on the counter
    "IMG_5278.jpg": "counter-front",   # retail counter, products lit
    "IMG_5295.jpg": "entrance-day",    # daylight, sign and unit 09 readable
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
    print(f"{slug:16} {img.width}x{img.height}  {dst.stat().st_size // 1024} KB")
