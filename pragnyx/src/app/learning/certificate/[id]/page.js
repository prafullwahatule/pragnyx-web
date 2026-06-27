import Link from "next/link";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificateVerifyClient from "@/components/CertificateVerifyClient";
import { getCertificateById } from "@/lib/repo/certificates";
import { certificateVerifyUrl, formatLongDate } from "@/lib/certificate";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const certificate = await getCertificateById(id);

  if (!certificate) {
    return {
      title: "Certificate not found — PragnyX Learning",
      description: "We couldn't verify a PragnyX Learning certificate with that ID.",
    };
  }

  const title = `${certificate.recipientName} — ${certificate.course.title} | PragnyX Learning`;
  const description = `Verified certificate of completion: ${certificate.recipientName} completed the ${certificate.course.title} conducted by PragnyX Learning on ${formatLongDate(certificate.completionDate)}.`;

  return {
    title,
    description,
    alternates: { canonical: certificateVerifyUrl(certificate.id) },
    openGraph: {
      title,
      description,
      url: certificateVerifyUrl(certificate.id),
      images: ["/logo/pragnyx-badge.png"],
    },
  };
}

export default async function CertificatePage({ params }) {
  const { id } = await params;
  const certificate = await getCertificateById(id);

  if (!certificate) {
    return (
      <>
        <Navbar />
        <main className="flex-1 relative min-h-[80vh] flex items-center bg-void overflow-hidden">
          <div className="absolute inset-0 bp-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-40 -left-40 h-[24rem] w-[24rem] rounded-full bg-blue/15 blur-[120px] animate-drift" />
          <div
            className="absolute -bottom-32 -right-20 h-[22rem] w-[22rem] rounded-full bg-violet/15 blur-[120px] animate-drift"
            style={{ animationDelay: "3s" }}
          />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 text-center w-full">
            <span className="cut-sm w-12 h-12 mx-auto flex items-center justify-center bg-blue/15 text-blue mb-6">
              <ShieldAlert size={20} strokeWidth={1.75} />
            </span>
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Certificate not found
            </span>
            <h1 className="mt-6 font-display font-medium text-3xl sm:text-5xl tracking-tight">
              We couldn&apos;t verify{" "}
              <span className="text-gradient">that certificate ID.</span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-mute leading-relaxed">
              Double-check the link or QR code, or it may be for a
              certificate that hasn&apos;t been issued yet.
            </p>
            <Link
              href="/learning"
              className="mt-9 inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Go to PragnyX Learning
              <ArrowUpRight size={15} strokeWidth={1.75} />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CertificateVerifyClient certificate={certificate} />
      </main>
      <Footer />
    </>
  );
}
