// Central store for PragnyX Learning certificates of completion.
// Each certificate issued to a learner gets one entry here, keyed by `id`.
// The same record powers:
//   1. The printable certificate (QR code + "PragnyX Learning" link both
//      point at /learning/certificate/[id])
//   2. The public verification page at /learning/certificate/[id]
//
// In production, swap this static array for a database lookup (Postgres,
// Supabase, etc.) — the shape below is the contract the verification page
// and the certificate generator both expect, so keep it the same.

export const CERTIFICATES = [
  {
    id: "PXL-PBI-2026-000",
    recipientName: "Sam Sudhakar P",
    course: {
      title: "Power BI Professional Training Program",
      level: "Advanced",
      summary:
        "A complete, project-based path through Power BI — from raw data to a published, decision-ready report.",
      modules: [
        "Power BI Fundamentals",
        "Power Query",
        "Data Modeling",
        "DAX",
        "Data Visualization",
        "Power BI Service",
        "Real-World Project Development",
        "AI for Analytics",
      ],
    },
    trainer: {
      name: "Trainer Name",
      title: "Trainer, PragnyX Learning",
    },
    durationLabel: "1 Month",
    durationMinutes: 2400,
    trainingType: "Live Online 1-to-1 Training",
    sessionsCount: 24,
    learnersCount: 30985,
    skills: [
      "Power BI",
      "Power Query",
      "Data Modeling",
      "DAX",
      "Data Visualization",
      "AI for Analytics",
    ],
    issuedOn: "2026-06-22",
    completionDate: "2026-06-22",
    certifyingOrg: "PragnyX Learning",
    status: "verified",
    pdfUrl: "/certificates/sample/PragnyX_Certificate_PXL-PBI-2026-000.pdf",
    imageUrl: "/certificates/sample/certificate-preview.png",
  },
];

export function getCertificateById(id) {
  if (!id) return null;
  const normalized = String(id).trim().toUpperCase();
  return (
    CERTIFICATES.find((c) => c.id.toUpperCase() === normalized) || null
  );
}
