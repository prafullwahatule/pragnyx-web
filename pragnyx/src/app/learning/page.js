import Navbar from "@/components/Navbar";
import LearningPageClient from "@/components/LearningPageClient";
import Footer from "@/components/Footer";
import { mentorsRepo } from "@/lib/repo/mentors";
import { learningPlansRepo } from "@/lib/repo/learningPlans";
import { getPublicLearningTracks } from "@/lib/repo/learningTracks";

export const metadata = {
  title: "PragnyX Learning — One-to-one mentorship",
  description:
    "Learn one-to-one from working engineers, designers, and product leads. Pick a mentor, book a session, make real progress — no cohorts.",
};

export default async function LearningPage() {
  const [mentors, plans, learningTracks] = await Promise.all([
    mentorsRepo.getPublic(),
    learningPlansRepo.getPublic(),
    getPublicLearningTracks(),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LearningPageClient mentors={mentors} plans={plans} learningTracks={learningTracks} />
      </main>
      <Footer />
    </>
  );
}
