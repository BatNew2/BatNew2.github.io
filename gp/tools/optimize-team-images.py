#!/usr/bin/env python3
"""
Build the web-sized team photos from the untouched originals.

The browser always downloads a whole image file and only then scales it to the
CSS box, so a 4284x5712 JPEG costs 6.4 MB even inside an 80x80 avatar. The only
fix is to ship smaller files.

  images/_source/team/   full-resolution originals -- edit/add photos HERE.
                         Never served; excluded from git.
  images/team/           downscaled copies at the ORIGINAL filenames, so anyone
                         opening a photo's own URL gets a small file too.
  images/team/opt/       what team.html actually loads: square WebP at 2x and 3x
                         the CSS display size, centre-cropped to match
                         `object-fit: cover`.

Roles (avatar vs founder) are read back out of team.html, so adding a photo is:
drop it in images/_source/team/, point a card at it, re-run this script.

    python tools/optimize-team-images.py
"""

import re
import sys
import unicodedata
from pathlib import Path
from urllib.parse import unquote

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "images" / "_source" / "team"
WEB_DIR = ROOT / "images" / "team"
OPT_DIR = WEB_DIR / "opt"
TEAM_HTML = ROOT / "team.html"

# CSS display size -> rendered widths (2x and 3x for high-DPI screens)
AVATAR_SIZES = [160, 240]   # .avatar renders at 80px
FOUNDER_SIZES = [400, 600]  # .founder-photo renders at 200px (150px on mobile)

# longest edge of the downscaled copy kept at the original filename
PLAIN_MAX = 400

QUALITY = 82


def slug(name: str) -> str:
    """Filename -> url-safe slug, so we stop hand-encoding %20 everywhere."""
    stem = Path(name).stem
    stem = unicodedata.normalize("NFKD", stem).encode("ascii", "ignore").decode()
    return re.sub(r"[^A-Za-z0-9]+", "-", stem).strip("-").lower()


def roles_from_html() -> dict:
    """slug -> "founder" | "avatar", read from how team.html uses each photo."""
    html = TEAM_HTML.read_text(encoding="utf-8")
    roles = {}
    for tag in re.findall(r"<img\b[^>]*>", html, flags=re.S):
        m = re.search(r'src="([^"]*images/team/opt/([^"]+?)-\d+\.webp)"', unquote(tag))
        if not m:
            continue
        # founders sit in .founder-photo; only grid avatars carry class="avatar"
        roles[m.group(2)] = "avatar" if 'class="avatar"' in tag else "founder"
    return roles


def load(path: Path) -> Image.Image:
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)  # honour phone rotation metadata
    return im if im.mode in ("RGB", "RGBA") else im.convert("RGB")


def save_like(im: Image.Image, dst: Path) -> None:
    """Write in the format implied by the extension, so URLs keep working."""
    ext = dst.suffix.lower()
    if ext in (".jpg", ".jpeg"):
        im.convert("RGB").save(dst, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    elif ext == ".png":
        im.save(dst, "PNG", optimize=True)
    elif ext == ".webp":
        im.save(dst, "WEBP", quality=QUALITY, method=6)
    else:
        raise ValueError(f"unhandled extension: {dst.name}")


def main() -> int:
    if not SRC_DIR.is_dir():
        print(f"missing {SRC_DIR} -- originals live there now", file=sys.stderr)
        return 1
    OPT_DIR.mkdir(parents=True, exist_ok=True)

    roles = roles_from_html()
    originals = sorted(p for p in SRC_DIR.iterdir() if p.is_file())
    if not originals:
        print(f"no photos in {SRC_DIR}", file=sys.stderr)
        return 1

    before = plain_total = opt_total = 0
    unused = []
    print(f"{'source':>9} {'plain':>8} {'opt':>8}  file")
    for src in originals:
        s = slug(src.name)
        role = roles.get(s)
        if role is None:
            unused.append(src.name)
            role = "avatar"  # still build it, so it's ready when a card uses it

        src_bytes = src.stat().st_size
        with load(src) as im:
            # 1. small copy at the original filename/extension, aspect preserved
            plain = im.copy()
            plain.thumbnail((PLAIN_MAX, PLAIN_MAX), Image.LANCZOS)
            plain_dst = WEB_DIR / src.name
            save_like(plain, plain_dst)

            # 2. square crops team.html actually loads
            opt_bytes = 0
            for size in (FOUNDER_SIZES if role == "founder" else AVATAR_SIZES):
                dst = OPT_DIR / f"{s}-{size}.webp"
                ImageOps.fit(im, (size, size), Image.LANCZOS, centering=(0.5, 0.5)).save(
                    dst, "WEBP", quality=QUALITY, method=6
                )
                opt_bytes += dst.stat().st_size

        plain_bytes = plain_dst.stat().st_size
        before += src_bytes
        plain_total += plain_bytes
        opt_total += opt_bytes
        print(f"{src_bytes/1e6:8.2f}M {plain_bytes/1e3:7.0f}K {opt_bytes/1e3:7.1f}K  {src.name}")

    served = plain_total + opt_total
    print(f"\n{len(originals)} photos")
    print(f"  originals (not served): {before/1e6:8.1f} MB")
    print(f"  served by the site:     {served/1e6:8.2f} MB "
          f"({100 - served / before * 100:.1f}% smaller)")
    print(f"    of which team.html loads {opt_total/1e3:.0f} KB")
    if unused:
        print(f"\n  not referenced by team.html yet: {', '.join(unused)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
