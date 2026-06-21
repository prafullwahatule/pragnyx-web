import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Perks from "@/components/Perks";
import JobListings from "@/components/JobListings";
import ContactTeaser from "@/components/ContactTeaser";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Careers — PragnyX",
  description:
    "Open roles at PragnyX across engineering, design, and PragnyX Learning mentorship. Remote-first, async by default.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Careers"
          title="Help us engineer what's next."
          description="We're a small, distributed team building products, custom solutions, and a mentorship network — and we're hiring across all three."
        />
        <Perks />
        <JobListings />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
