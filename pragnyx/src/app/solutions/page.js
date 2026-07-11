import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import SolutionsList from "@/components/SolutionsList";
import FAQ from "@/components/FAQ";
import ContactTeaser from "@/components/ContactTeaser";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublicProducts } from "@/lib/repo/products";
import { faqsRepo } from "@/lib/repo/faqs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Solutions — PragnyX",
  description:
    "Business Intelligence, Software Solutions, Data Intelligence, AI & Automation, and PragnyX EduOS — five services built on the same idea: deliberate, explainable thinking applied to hard problems.",
  alternates: { canonical: "https://pragnyx.in/solutions" },
  openGraph: {
    title: "Solutions — PragnyX",
    description:
      "Business Intelligence, Software Solutions, Data Intelligence, AI & Automation, and PragnyX EduOS — five services built on the same idea: deliberate, explainable thinking applied to hard problems.",
    url: "https://pragnyx.in/solutions",
    type: "website",
  },
};

export default async function SolutionsPage() {
  const [products, faqs] = await Promise.all([getPublicProducts(), faqsRepo.getPublic()]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Solutions"
          title="Five services. One way of thinking."
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
        <SolutionsList products={products} />
        <FAQ faqs={faqs} />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
