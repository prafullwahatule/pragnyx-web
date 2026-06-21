"use client";

import { useState } from "react";
import LearningHero from "./LearningHero";
import HowItWorks from "./HowItWorks";
import MentorGrid from "./MentorGrid";
import PricingPlans from "./PricingPlans";
import LearningRequestForm from "./LearningRequestForm";
import { MENTORS } from "@/data/site";

export default function LearningPageClient() {
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
      <LearningHero mentorCount={MENTORS.length} />
      <HowItWorks />
      <MentorGrid onRequestMentor={handleRequestMentor} />
      <PricingPlans onChoosePlan={handleChoosePlan} />
      <LearningRequestForm
        selectedMentorId={selectedMentorId}
        onClearMentor={() => setSelectedMentorId(null)}
      />
    </>
  );
}
