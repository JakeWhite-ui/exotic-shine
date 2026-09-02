"""Pre-generate responsive image sizes for the static export.

GitHub Pages has no image optimiser, so `next/image` can't resize on request.
Instead we emit a fixed ladder of widths at build time and point a custom
loader at them (see image-loader.ts) — that keeps real srcset behaviour, so a
phone still downloads a 640px file rather than the full-size original.

Run after adding or replacing anything in public/work or public/studio.

Note that build-media.py writes its own ladder for everything it produces, so
the service stills in public/work don't need a pass through here — this script
is for photographs that arrive as files rather than as frames of a video.

Needs Pillow (`pip install pillow`), which build-media.py deliberately doesn't:
that one shells out to cwebp so it runs on a machine with only ffmpeg and webp
installed.
"""

from pathlib import Path
from PIL import Image

WIDTHS = [640, 1080, 1600]
FOLDERS = ["public/work", "public/studio", "public/brand"]


def is_source(path: Path) -> bool:
    """Skip files we generated ourselves on a previous run."""
    stem = path.stem
    return not any(stem.endswith(f"-{w}") for w in WIDTHS)


total = 0
for folder in FOLDERS:
    for path in sorted(Path(folder).glob("*")):
        if path.suffix.lower() not in {".webp", ".png", ".jpg", ".jpeg"}:
            continue
        if not is_source(path):
            continue

        img = Image.open(path)
        has_alpha = img.mode in ("RGBA", "LA", "P")
        img = img.convert("RGBA" if has_alpha else "RGB")

        for width in WIDTHS:
            # Never upscale — if the source is smaller, copy it at its own size.
            target = min(width, img.width)
            resized = img.resize(
                (target, round(img.height * target / img.width)), Image.LANCZOS
            )
            out = path.with_name(f"{path.stem}-{width}.webp")
            resized.save(out, "WEBP", quality=80, method=6)
            total += 1

        print(f"{path.name:34} {img.width}px -> {', '.join(map(str, WIDTHS))}")

print(f"\n{total} variants written")
