"use client";

import { useState } from "react";
import LearningHero from "./LearningHero";
import HowItWorks from "./HowItWorks";
import MentorGrid from "./MentorGrid";
import PricingPlans from "./PricingPlans";
import LearningRequestForm from "./LearningRequestForm";
import { MENTORS, LEARNING_PLANS, LEARNING_TRACKS } from "@/data/site";

export default function LearningPageClient({
  mentors = MENTORS,
  plans = LEARNING_PLANS,
  learningTracks = LEARNING_TRACKS,
}) {
  const [selectedMentorId, setSelectedMentorId] = useState(null);

  function handleRequestMentor(mentorId) {
    setSelectedMentorId(mentorId);
  }

  function handleChoosePlan() {
    // Plans aren't tied to a specific mentor — just scroll to the request form.
    const el = document.getElementById("learning-request-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <LearningHero mentorCount={mentors.length} />
      <HowItWorks />
      <MentorGrid mentors={mentors} onRequestMentor={handleRequestMentor} />
      <PricingPlans plans={plans} onChoosePlan={handleChoosePlan} />
      <LearningRequestForm
        mentors={mentors}
        learningTracks={learningTracks}
        selectedMentorId={selectedMentorId}
        onClearMentor={() => setSelectedMentorId(null)}
      />
    </>
  );
}
