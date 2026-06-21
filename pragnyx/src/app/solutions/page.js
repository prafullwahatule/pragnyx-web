import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import SolutionsList from "@/components/SolutionsList";
import FAQ from "@/components/FAQ";
import ContactTeaser from "@/components/ContactTeaser";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Solutions — PragnyX",
  description:
    "Atlas, Lumen, Forge, and Signal — four products built on the same idea: deliberate, explainable thinking applied to hard problems.",
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Solutions"
          title="Four products. One way of thinking."
          description="Every PragnyX product starts from the same question: what would this look like if it were reasoned through properly, instead of shipped fast and patched later?"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Talk to our team
            <ArrowUpRight size={15} strokeWidth={1.75} />
          </Link>
        </PageHero>
        <SolutionsList />
        <FAQ />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
