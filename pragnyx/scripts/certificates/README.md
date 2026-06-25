# PragnyX Learning — certificate pipeline

Generates the printable "Certificate of Completion" PDF (the one in
`public/certificates/sample/`) and keeps it wired to the public
verification page at `/learning/certificate/[id]`.

## How the pieces connect

```
src/data/certificates.js                 <- single source of truth
        │                                   (recipient, course, dates, skills…)
        ├──> /learning/certificate/[id]     live verification page on the site
        │
        └──> scripts/certificates/*         offline certificate-PDF generator
```

Add a new certificate by adding one record to `CERTIFICATES` in
`src/data/certificates.js`, then run the three steps below. The verification
page picks up new records automatically — no other code changes needed.

## Generating a certificate PDF

**1. Render the certificate HTML + QR code**

```bash
cd scripts/certificates
node render-certificate.js PXL-PBI-2026-000   # pass any id from certificates.js
```

Writes `output/<id>/certificate-filled.html`, `qr.png`, and `meta.json`.
The QR code and both "PragnyX Learning" links inside the HTML already
point at the live site (`https://pragnyx.in/learning` and
`https://pragnyx.in/learning/certificate/<id>`).

**2. Flatten the HTML to a 1216×720 PNG**

Any headless-browser screenshot tool works. With `wkhtmltoimage`:

```bash
cd output/<id>
wkhtmltoimage --width 1216 --height 720 --format png --disable-smart-width \
  certificate-filled.html certificate-clean.png
```

(wkhtmltoimage on some builds leaves a tiny ~6×6px artifact in the
top-left corner — if you see it, patch it with the background color,
e.g. `convert certificate-clean.png -fill '#faf6ee' -draw "rectangle 0,0 7,7" certificate-clean.png`,
or the equivalent in Pillow.)

**3. Build the final PDF with real clickable links**

```bash
cd ../..  # back to scripts/certificates
python3 build-certificate-pdf.py PXL-PBI-2026-000
```

Writes `output/<id>/PragnyX_Certificate_<id>.pdf` — a single-page PDF with:
- The certificate image as a full-bleed background, scaled to a real
  11in-wide landscape page.
- A clickable link over **both** "PragnyX Learning" mentions, opening
  `/learning` in a new tab in any PDF viewer or browser.
- A clickable link over the **QR code** pointing at the verification
  page, so it works both by camera scan and by clicking inside a PDF
  viewer.

## Why a Python step instead of one HTML→PDF pass

`wkhtmltopdf` on this environment is an unpatched-Qt build with broken
page-sizing (`--page-width`/`--page-height` don't match the rendered
viewport, leaving stretched or cropped output). Going HTML → flat PNG →
PDF avoids that entirely and gives pixel-exact control over where the
clickable link rectangles land, since they're placed against the exact
same image that's embedded in the final PDF.

If you have access to a real Chromium binary in your environment (e.g.
locally, or in CI), you can swap step 2 + 3 for a single Playwright/
Puppeteer `page.pdf()` call instead — just keep the link rectangles in
sync with the template if you do.

## Re-measuring link boxes

The three clickable regions are hardcoded as pixel boxes in
`build-certificate-pdf.py` (`LINK_BOXES`), measured against
`certificate-template.html` at 1216×720. If you change that template's
layout (font sizes, spacing, the position of "PragnyX Learning" or the
QR code), re-measure the boxes — draw candidate rectangles on the
rendered PNG with Pillow's `ImageDraw`, compare against the certificate,
and adjust the coordinates in `LINK_BOXES` to match.
