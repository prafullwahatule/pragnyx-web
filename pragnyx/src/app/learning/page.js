import Navbar from "@/components/Navbar";
import LearningPageClient from "@/components/LearningPageClient";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PragnyX Learning — One-to-one mentorship",
  description:
    "Learn one-to-one from working engineers, designers, and product leads. Pick a mentor, book a session, make real progress — no cohorts.",
};

export default function LearningPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LearningPageClient />
      </main>
      <Footer />
    </>
  );
}
