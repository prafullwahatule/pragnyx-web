import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page not found — PragnyX",
  description: "The page you're looking for doesn't exist, or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
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
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
            404
          </span>
          <h1 className="mt-6 font-display font-medium text-4xl sm:text-6xl tracking-tight">
            This frontier hasn&apos;t been{" "}
            <span className="text-gradient">engineered yet.</span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-mute leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist, or has moved.
          </p>
          <Link
            href="/"
            className="mt-9 inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Back to home
            <ArrowUpRight size={15} strokeWidth={1.75} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
