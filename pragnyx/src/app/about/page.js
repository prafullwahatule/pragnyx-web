import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Stats from "@/components/Stats";
import ValuesGrid from "@/components/ValuesGrid";
import Founder from "@/components/Founder";
import Team from "@/components/Team";
import Timeline from "@/components/Timeline";
import ContactTeaser from "@/components/ContactTeaser";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "About — PragnyX",
  description:
    "PragnyX is a future-focused brand building reasoning-first products, custom engineering, and one-to-one mentorship — engineered, not predicted.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="About"
          title="The future is not predicted. It is engineered."
          description="PragnyX is a future-focused brand dedicated to innovation, creativity, and intelligent thinking — building products, custom solutions, and the people who'll build the next round of both."
        >
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            See open roles
            <ArrowUpRight size={15} strokeWidth={1.75} />
          </Link>
        </PageHero>
        <Stats />
        <ValuesGrid />
        <Founder />
        <Team />
        <Timeline />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
