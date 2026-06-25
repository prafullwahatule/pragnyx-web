"""
Builds the final, shareable PragnyX Learning certificate PDF for one
certificate id.

Pipeline (see scripts/certificates/README.md for the full walkthrough):
  1. node render-certificate.js <id>
       -> writes output/<id>/certificate-filled.html, qr.png, meta.json
  2. Render that HTML to a flat 1216x720 PNG named
     output/<id>/certificate-clean.png (e.g. with wkhtmltoimage, or any
     headless browser screenshot tool).
  3. python3 build-certificate-pdf.py <id>
       -> writes output/<id>/PragnyX_Certificate_<id>.pdf

What step 3 does with the flat image:
  - Places it as a full-page background on a single-page PDF, scaled to
    a real 11in-wide landscape page (so it prints at a sensible size
    instead of at 1216x720 *points* / ~16.9in).
  - Adds two real clickable link annotations over the "PragnyX Learning"
    text (body copy + the org-authorization block) pointing at
    https://pragnyx.in/learning — opens in a new tab in any PDF viewer
    or browser, exactly like any other PDF hyperlink.
  - Adds a third clickable link annotation over the QR code itself,
    pointing at the certificate verification page, so the QR works for
    both "scan with a phone camera" AND "click inside a PDF viewer".

Image-space coordinates use a top-left origin (Pillow / CSS convention).
ReportLab's canvas uses a bottom-left origin, so y is flipped before
drawing each link rect. The link boxes below are tied to the fixed
certificate-template.html layout — if that template's positions change,
re-measure these boxes (see README.md "Re-measuring link boxes").
"""
import json
import sys
from pathlib import Path

from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

SCRIPT_DIR = Path(__file__).resolve().parent

IMG_W, IMG_H = 1216, 720  # native rendered image size, pixels

# Print the certificate at a real-world landscape size (11in wide)
# instead of 1216x720 *points*. The image and all link coordinates are
# defined in image-space pixels, then uniformly scaled into PDF points.
PAGE_W = 11 * 72  # 792pt = 11in
SCALE = PAGE_W / IMG_W
PAGE_H = IMG_H * SCALE

# Image-space (top-left origin, in source pixels) link regions, measured
# against certificate-clean.png at 1216x720.
LINK_BOXES = [
    {"box": (888, 290, 1058, 308), "url_key": "learningUrl"},  # body copy "PragnyX Learning"
    {"box": (880, 470, 1072, 495), "url_key": "learningUrl"},  # org-authorization block
    {"box": (565, 478, 651, 564), "url_key": "verifyUrl"},     # QR code
]


def to_pdf_rect(box):
    x0, y0, x1, y1 = box
    return (
        x0 * SCALE,
        PAGE_H - (y1 * SCALE),
        x1 * SCALE,
        PAGE_H - (y0 * SCALE),
    )


def main():
    cert_id = sys.argv[1] if len(sys.argv) > 1 else "PXL-PBI-2026-000"
    out_dir = SCRIPT_DIR / "output" / cert_id

    meta_path = out_dir / "meta.json"
    img_path = out_dir / "certificate-clean.png"

    if not meta_path.exists():
        sys.exit(
            f"Missing {meta_path}. Run `node render-certificate.js {cert_id}` first."
        )
    if not img_path.exists():
        sys.exit(
            f"Missing {img_path}. Render certificate-filled.html in that folder to a "
            f"1216x720 PNG named certificate-clean.png first."
        )

    meta = json.loads(meta_path.read_text())

    out_path = out_dir / f"PragnyX_Certificate_{meta['id']}.pdf"

    c = canvas.Canvas(str(out_path), pagesize=(PAGE_W, PAGE_H))
    c.setTitle(f"{meta['recipientName']} — Certificate of Completion — PragnyX Learning")
    c.setSubject(meta["courseTitle"])
    c.setAuthor("PragnyX Learning")

    img = ImageReader(str(img_path))
    c.drawImage(img, 0, 0, width=PAGE_W, height=PAGE_H)

    for link in LINK_BOXES:
        rect = to_pdf_rect(link["box"])
        c.linkURL(meta[link["url_key"]], rect, relative=0, thickness=0)

    c.showPage()
    c.save()
    print("Wrote", out_path)


if __name__ == "__main__":
    main()
