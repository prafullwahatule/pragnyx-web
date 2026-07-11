import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact — PragnyX",
  description:
    "Reach the PragnyX team about products, custom builds, or PragnyX Learning. We respond to every message.",
  alternates: { canonical: "https://pragnyx.in/contact" },
  openGraph: {
    title: "Contact — PragnyX",
    description:
      "Reach the PragnyX team about products, custom builds, or PragnyX Learning. We respond to every message.",
    url: "https://pragnyx.in/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
