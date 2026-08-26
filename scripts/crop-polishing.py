"""Trim the letterbox bars off the polishing shot and cut a landscape card.

The photo came from the client as a phone video frame, so it arrives with
black bars top and bottom and in a very tall aspect. This strips the bars and
produces a 16:9 crop framed on the technician and the bonnet, which is what
the service cards need.
"""

from PIL import Image
import numpy as np

src = Image.open("public/studio/polishing.webp").convert("RGB")

rows = np.where(np.asarray(src.convert("L")).max(axis=1) > 25)[0]
body = src.crop((0, int(rows[0]), src.width, int(rows[-1]) + 1))
body.save("public/studio/polishing.webp", "WEBP", quality=84, method=6)
print("portrait, bars removed:", body.size)

w, h = body.size
target_h = round(w * 9 / 16)
top_off = min(int(h * 0.46), h - target_h)
land = body.crop((0, top_off, w, top_off + target_h))
land = land.resize((1280, round(1280 * land.height / land.width)), Image.LANCZOS)
land.save("public/work/paint-correction.webp", "WEBP", quality=84, method=6)
print("landscape card:", land.size)
