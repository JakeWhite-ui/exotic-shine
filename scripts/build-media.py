"""Turn the client's phone footage into the clips and stills the site ships.

Background: every service card used to carry an AI-generated render — gold-lit
studios, a van that doesn't exist, a flat lay of accessories nobody owns. The
client flagged them on 1 September and sent thirteen videos of the real unit
instead. This script is the bridge between those masters and public/.

Two outputs, from one set of sources:

  public/clips/   short muted loops for the reel wall and the homepage hero,
                  each with one poster frame beside it
  public/work/    one still per service, replacing the renders

The service stills get a full WebP width ladder because image-loader.ts
rewrites `foo.webp` to `foo-640.webp` and friends, and a file without its
ladder 404s on the static export. Posters don't: the `poster` attribute takes a
single URL and never goes near the loader.

Sources live in media-source/, which is gitignored; see the note there.

Requires ffmpeg and cwebp on PATH (`brew install ffmpeg webp`). ffmpeg on this
machine is built without libwebp, hence the PNG hand-off to cwebp.
"""

import subprocess
import sys
from pathlib import Path

SOURCES = Path("media-source")
CLIPS = Path("public/clips")
WORK = Path("public/work")

# Matches image-loader.ts. See write_webp_ladder for what happens when the
# source is narrower than a rung.
WIDTHS = [640, 1080, 1600]

# Reels sit in cards a few hundred pixels wide, so 720 is already generous and
# crf 32 holds up on handheld footage. The hero is the one clip that loads on
# arrival, hence the tighter crf.
PORTRAIT = dict(width=720, crf=32, fps=24)

# Every master is portrait — even the 4K one, which reports 3840x2160 but
# carries a 90° rotation, so ffmpeg hands the filter graph 2160x3840. The hero
# slot is wide, so that clip gets cropped to 16:9 before scaling. The window
# sits high enough to keep the signage and the technician's hands in frame;
# centring it landed on an anonymous stretch of bonnet.
HERO = dict(width=1024, crf=31, fps=24, crop="crop=iw:iw*9/16:0:900")

# Hand-picked windows, not whole takes. The masters open on lens flare, blur
# through whip pans and end on a logo sting; these are the seconds either side
# of the part that shows the work.
clips: list[tuple[str, str, float, float, dict]] = [
    # The hero: the 4K master, and the one take with everything in it at once —
    # hands on the car, the wall, the branding.
    ("ppf-hood-white", "IMG_5561.MOV", 0.5, 9.0, HERO),
    ("ppf-cx5", "IMG_5307.MOV", 2.0, 12.5, PORTRAIT),
    # Opens at 3.5 rather than 1.0: the first seconds of this master are
    # machine polishing, which belongs to a different service than the caption.
    ("ppf-porsche", "IMG_5705.MOV", 3.5, 8.0, PORTRAIT),
    ("ppf-escalade", "IMG_5672.MOV", 1.5, 14.0, PORTRAIT),
    # These two masters fade up from black; starting at 0.0 gave both the clip
    # and its poster a black opening frame.
    ("ppf-white-suv", "IMG_5763.MOV", 0.5, 4.3, PORTRAIT),
    ("wrap-maybach", "IMG_5599.MOV", 0.7, 15.8, PORTRAIT),
    ("wash-polish-gwagon", "IMG_5450.MOV", 0.8, 15.0, PORTRAIT),
    ("wheels-cx5", "IMG_5246.MOV", 0.0, 11.0, PORTRAIT),
    # 1.8 landed mid picture-in-picture transition, which made a confusing
    # poster frame — 2.8 is the first clean one.
    ("detail-grey-suv", "IMG_5305.MOV", 2.8, 12.0, PORTRAIT),
]

# One frame per service card. The cards are landscape, the footage is portrait,
# so each entry carries the vertical offset of a 4:3 window — centring blindly
# put the subject's chin at the top of half of these.
#
# Field order: output name, source, timestamp, crop y (portrait sources only).
stills: list[tuple[str, str, float, int]] = [
    ("paint-protection-film", "IMG_5307.MOV", 5.6, 400),
    ("ceramic-coating", "IMG_5672.MOV", 10.2, 540),
    # No footage of film going onto glass, so this is a finished car in the bay
    # with the tint plainly visible rather than a shot of the job being done.
    # Worth swapping the day the client sends a tinting clip.
    ("window-tinting", "IMG_5599.MOV", 6.4, 420),
    ("car-wrapping", "IMG_5599.MOV", 9.0, 640),
    ("paint-correction", "IMG_5450.MOV", 11.4, 500),
    ("vehicle-washing", "IMG_5450.MOV", 2.2, 600),
    ("alloy-rim-protection", "IMG_5246.MOV", 1.4, 680),
    ("interior-detailing", "IMG_5450.MOV", 15.2, 560),
    ("exterior-detailing", "IMG_5246.MOV", 8.4, 700),
    # Nothing here for the accessories side of Elevate. The only footage of a
    # roof box going on came through WhatsApp at 576px wide, which is softer
    # than these cards render at — asked the client for the originals instead.
]


def run(args: list[str]) -> None:
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode != 0:
        sys.exit(f"{args[0]} failed:\n{result.stderr}")


def source(name: str) -> Path:
    path = SOURCES / name
    if not path.exists():
        sys.exit(f"missing master: {path}. See the media-source note in .gitignore.")
    return path


def frame_width(png: Path) -> int:
    probe = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0"]
        + ["-show_entries", "stream=width", "-of", "csv=p=0", str(png)],
        capture_output=True,
        text=True,
    )
    return int(probe.stdout.strip().rstrip(","))


def write_webp(png: Path, out: Path, width: int | None = None) -> None:
    resize = ["-resize", str(width), "0"] if width else []
    run(["cwebp", "-quiet", "-q", "80", *resize, str(png), "-o", str(out)])


def write_webp_ladder(png: Path, base: Path) -> None:
    """Emit base.webp plus the width ladder image-loader.ts asks for.

    Never upscales: a 1080px source still gets a file named `-1600.webp`, it's
    just 1080px wide inside. Same trick as build-image-variants.py, and the
    reason srcset can't hand a phone something larger than the master.
    """
    source_width = frame_width(png)
    for width in WIDTHS:
        target = min(width, source_width)
        out = base.with_name(f"{base.stem}-{width}.webp")
        write_webp(png, out, target if target < source_width else None)
    write_webp(png, base)
    png.unlink()


CLIPS.mkdir(parents=True, exist_ok=True)
WORK.mkdir(parents=True, exist_ok=True)

# The stills get retuned far more often than the clips do, and re-encoding all
# nine takes well over a minute. Pass --force after changing a clip window.
force = "--force" in sys.argv

for clip_id, name, start, length, profile in clips:
    src = source(name)
    mp4 = CLIPS / f"{clip_id}.mp4"
    if mp4.exists() and not force:
        print(f"clip  {clip_id:20} kept")
        continue

    frame = profile.get("crop", "") and f"{profile['crop']},"

    # -ss ahead of -i seeks on keyframes: fast, and accurate enough for windows
    # chosen by eye to the nearest tenth of a second.
    run(["ffmpeg", "-y", "-v", "error", "-ss", str(start), "-t", str(length)]
        + ["-i", str(src), "-an"]
        + ["-vf", f"{frame}scale={profile['width']}:-2,fps={profile['fps']}"]
        + ["-c:v", "libx264", "-profile:v", "high", "-crf", str(profile["crf"])]
        + ["-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart"]
        + [str(mp4)])

    # Same window as the first frame of the clip, so the poster and the video
    # can't disagree about what you're looking at. One file, not a ladder: the
    # `poster` attribute takes a single URL and never sees the image loader.
    png = CLIPS / f"{clip_id}-poster.png"
    run(["ffmpeg", "-y", "-v", "error", "-ss", str(start), "-i", str(src)]
        + ["-frames:v", "1", "-vf", f"{frame}scale={profile['width']}:-2"]
        + [str(png)])
    write_webp(png, CLIPS / f"{clip_id}-poster.webp")
    png.unlink()

    print(f"clip  {clip_id:20} {length:5.1f}s  {mp4.stat().st_size / 1024:6.0f} KB")

for name, source_name, at, crop_y in stills:
    src = source(source_name)
    png = WORK / f"{name}.png"

    # Portrait master, landscape card: take a 4:3 window at crop_y rather than
    # letting object-cover centre-crop it, which put half these subjects' chins
    # at the top edge.
    run(["ffmpeg", "-y", "-v", "error", "-ss", str(at), "-i", str(src)]
        + ["-frames:v", "1", "-vf", f"crop=iw:iw*3/4:0:{crop_y}", str(png)])
    write_webp_ladder(png, WORK / f"{name}.webp")

    print(f"still {name}")

video_mb = sum(p.stat().st_size for p in CLIPS.glob("*.mp4")) / 1024 / 1024
print(f"\n{len(clips)} clips ({video_mb:.1f} MB), {len(stills)} stills")
