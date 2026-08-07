#!/usr/bin/env python3
"""
Generate display-sized team photos for team.html.

The browser always downloads a whole image file, then scales it to fit the
CSS box -- so a 4284x5712 JPEG costs 6.4 MB even inside an 80x80 avatar.
The only fix is to ship smaller files, which is what this script produces.

Originals in images/team/ are never modified. Output goes to
images/team/opt/<slug>-<size>.webp, centre-cropped square (identical to what
`object-fit: cover` already shows) at 2x and 3x the CSS display size.

Re-run after adding photos:  python tools/optimize-team-images.py
"""

import re
import sys
import unicodedata
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "images" / "team"
OUT_DIR = SRC_DIR / "opt"
TEAM_HTML = ROOT / "team.html"

# CSS display size -> the widths we render (2x and 3x for high-DPI screens)
AVATAR_SIZES = [160, 240]   # .avatar renders at 80px
FOUNDER_SIZES = [400, 600]  # .founder-photo renders at 200px (150px on mobile)

QUALITY = 82


def slug(name: str) -> str:
    """Filename -> url-safe slug, so we stop hand-encoding %20 everywhere."""
    stem = Path(name).stem
    stem = unicodedata.normalize("NFKD", stem).encode("ascii", "ignore").decode()
    stem = re.sub(r"[^A-Za-z0-9]+", "-", stem).strip("-").lower()
    return stem


def referenced_photos():
    """Map each images/team/ file used by team.html to its display role."""
    html = TEAM_HTML.read_text(encoding="utf-8")
    photos = {}
    for tag in re.findall(r"<img\b[^>]*>", html):
        m = re.search(r'src="([^"]*images/team/[^"]+)"', tag)
        if not m:
            continue
        from urllib.parse import unquote
        filename = unquote(m.group(1)).split("images/team/")[-1]
        # founders sit in .founder-photo and carry no class on the <img>
        is_founder = 'class="avatar"' not in tag and "class=\"avatar\"" not in tag
        photos[filename] = "founder" if is_founder else "avatar"
    return photos


def square(im: Image.Image, size: int) -> Image.Image:
    """Centre-crop to a square and resize -- matches `object-fit: cover`."""
    im = ImageOps.exif_transpose(im)  # honour phone rotation metadata
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    return ImageOps.fit(im, (size, size), method=Image.LANCZOS, centering=(0.5, 0.5))


def main() -> int:
    if not SRC_DIR.is_dir():
        print(f"missing {SRC_DIR}", file=sys.stderr)
        return 1
    OUT_DIR.mkdir(exist_ok=True)

    photos = referenced_photos()
    if not photos:
        print("no images/team/ photos referenced by team.html", file=sys.stderr)
        return 1

    before = after = 0
    print(f"{'before':>9} {'after':>9}  file")
    for filename, role in sorted(photos.items()):
        src = SRC_DIR / filename
        if not src.exists():
            print(f"{'':>9} {'':>9}  MISSING {filename}", file=sys.stderr)
            continue

        sizes = FOUNDER_SIZES if role == "founder" else AVATAR_SIZES
        src_bytes = src.stat().st_size
        out_bytes = 0
        with Image.open(src) as im:
            for size in sizes:
                dst = OUT_DIR / f"{slug(filename)}-{size}.webp"
                square(im, size).save(dst, "WEBP", quality=QUALITY, method=6)
                out_bytes += dst.stat().st_size

        before += src_bytes
        after += out_bytes
        print(f"{src_bytes/1e6:8.2f}M {out_bytes/1e3:8.1f}K  {filename}")

    print(f"\n{len(photos)} photos: {before/1e6:.1f} MB -> {after/1e3:.0f} KB "
          f"({100 - after / before * 100:.1f}% smaller)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
