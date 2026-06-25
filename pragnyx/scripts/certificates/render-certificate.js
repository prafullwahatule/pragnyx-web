/**
 * Renders a PragnyX Learning certificate (HTML, ready for PDF/PNG export)
 * for one certificate record sourced directly from src/data/certificates.js
 * — the same data the live verification page
 * (/learning/certificate/[id]) reads from. Keeping one source of data
 * means the printed certificate and the public verification page can
 * never drift out of sync.
 *
 * Usage:
 *   node scripts/certificates/render-certificate.js [certificateId]
 *   (defaults to PXL-PBI-2026-000 if no id is given)
 *
 * Output:
 *   scripts/certificates/output/<id>/certificate-filled.html
 *   scripts/certificates/output/<id>/qr.png
 *
 * Next step: run scripts/certificates/build-certificate-pdf.py to turn
 * the rendered HTML into the final shareable PDF with clickable links.
 * See scripts/certificates/README.md for the full pipeline.
 */
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

const SITE_URL = "https://pragnyx.in";
const CERT_ID = process.argv[2] || "PXL-PBI-2026-000";

function formatShortDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

async function loadCertificate(id) {
  // src/data/certificates.js is an ES module (uses `export`); dynamic
  // import() works for ESM from a CommonJS script under Node 22.
  const dataModulePath = path.join(__dirname, "..", "..", "src", "data", "certificates.js");
  const mod = await import(`file://${dataModulePath}`);
  const certificate = mod.getCertificateById(id);
  if (!certificate) {
    throw new Error(
      `No certificate found with id "${id}" in src/data/certificates.js. ` +
        `Add a record there first, then re-run this script.`
    );
  }
  return certificate;
}

async function main() {
  const cert = await loadCertificate(CERT_ID);

  const verifyUrl = `${SITE_URL}/learning/certificate/${encodeURIComponent(cert.id)}`;
  const learningUrl = `${SITE_URL}/learning`;

  const qrBuffer = await QRCode.toBuffer(verifyUrl, {
    errorCorrectionLevel: "H",
    margin: 0,
    width: 600,
    color: { dark: "#16284a", light: "#ffffffff" },
  });
  const qrDataUri = `data:image/png;base64,${qrBuffer.toString("base64")}`;

  const modulesLine = `The program covered ${cert.course.modules.join(", ")}.`;

  const templatePath = path.join(__dirname, "certificate-template.html");
  let html = fs.readFileSync(templatePath, "utf8");
  html = html
    .replaceAll("{{STUDENT_NAME}}", cert.recipientName)
    .replaceAll("{{COURSE_TITLE}}", cert.course.title)
    .replaceAll("{{MODULES_LINE}}", modulesLine)
    .replaceAll("{{DURATION}}", cert.durationLabel)
    .replaceAll("{{TRAINING_TYPE}}", cert.trainingType)
    .replaceAll("{{COMPLETION_DATE}}", formatShortDate(cert.completionDate))
    .replaceAll("{{TRAINER_NAME}}", cert.trainer.name)
    .replaceAll("{{CERT_ID}}", cert.id)
    .replaceAll("{{ISSUED_ON}}", formatShortDate(cert.issuedOn))
    .replaceAll("{{QR_DATA_URI}}", qrDataUri)
    .replaceAll("{{LEARNING_URL}}", learningUrl);

  const outDir = path.join(__dirname, "output", cert.id);
  fs.mkdirSync(outDir, { recursive: true });

  const outHtmlPath = path.join(outDir, "certificate-filled.html");
  fs.writeFileSync(outHtmlPath, html, "utf8");

  const qrPngPath = path.join(outDir, "qr.png");
  fs.writeFileSync(qrPngPath, qrBuffer);

  // Small JSON sidecar so build-certificate-pdf.py (Python) doesn't need
  // to parse the ESM data file itself — just the few fields it needs to
  // set PDF metadata and the two link URLs.
  const meta = {
    id: cert.id,
    recipientName: cert.recipientName,
    courseTitle: cert.course.title,
    learningUrl,
    verifyUrl,
  };
  const metaPath = path.join(outDir, "meta.json");
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf8");

  console.log("Certificate:", cert.recipientName, `(${cert.id})`);
  console.log("Verify URL: ", verifyUrl);
  console.log("Wrote:      ", outHtmlPath);
  console.log("Wrote:      ", qrPngPath);
  console.log("Wrote:      ", metaPath);
  console.log("\nNext: render that HTML to a PNG (e.g. wkhtmltoimage --width 1216 --height 720), save it as");
  console.log(`      ${outDir}/certificate-clean.png, then run:`);
  console.log(`      python3 build-certificate-pdf.py ${cert.id}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
