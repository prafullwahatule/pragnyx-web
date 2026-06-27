import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Overview from "@/components/Overview";
import ProductsTeaser from "@/components/ProductsTeaser";
import Philosophy from "@/components/Philosophy";
import LearningTeaser from "@/components/LearningTeaser";
import Testimonials from "@/components/Testimonials";
import Manifesto from "@/components/Manifesto";
import FAQ from "@/components/FAQ";
import ContactTeaser from "@/components/ContactTeaser";
import Footer from "@/components/Footer";
import { getPublicProducts } from "@/lib/repo/products";
import { mentorsRepo } from "@/lib/repo/mentors";
import { testimonialsRepo } from "@/lib/repo/testimonials";
import { faqsRepo } from "@/lib/repo/faqs";
import { statsRepo } from "@/lib/repo/stats";
export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, mentors, testimonials, faqs, stats] = await Promise.all([
    getPublicProducts(),
    mentorsRepo.getPublic(),
    testimonialsRepo.getPublic(),
    faqsRepo.getPublic(),
    statsRepo.getPublic(),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats stats={stats} />
        <Overview />
        <ProductsTeaser products={products} />
        <Philosophy />
        <LearningTeaser mentors={mentors} />
        <Testimonials testimonials={testimonials} />
        <Manifesto />
        <FAQ faqs={faqs} />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
