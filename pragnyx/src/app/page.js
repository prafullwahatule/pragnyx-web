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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Overview />
        <ProductsTeaser />
        <Philosophy />
        <LearningTeaser />
        <Testimonials />
        <Manifesto />
        <FAQ />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
