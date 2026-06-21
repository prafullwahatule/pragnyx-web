import { ArrowUpRight, GraduationCap } from "lucide-react";
import Reveal from "./Reveal";

export default function LearningHero({ mentorCount }) {
  return (
    <section className="relative bg-void pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bp-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-blue/15 blur-[120px] animate-drift" />
      <div
        className="absolute -bottom-32 -right-20 h-[24rem] w-[24rem] rounded-full bg-violet/15 blur-[120px] animate-drift"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-7 opacity-0 animate-[fade-up_0.7s_0.05s_ease-out_forwards]">
            <span className="cut-sm w-8 h-8 flex items-center justify-center bg-blue/15 text-blue">
              <GraduationCap size={16} strokeWidth={1.75} />
            </span>
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              PragnyX Learning
            </span>
          </div>
          <h1 className="font-display font-medium text-[2.2rem] leading-[1.1] sm:text-5xl lg:text-6xl tracking-tight opacity-0 animate-[fade-up_0.7s_0.12s_ease-out_forwards]">
            Learn one-to-one,{" "}
            <span className="text-gradient">from people who do this for a living.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base sm:text-lg text-mute leading-relaxed opacity-0 animate-[fade-up_0.7s_0.22s_ease-out_forwards]">
            No cohorts, no fixed syllabus, no waiting for the next session
            to start. You bring the goal, your mentor brings the
            experience, and every session is built around the question
            you actually have.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4 opacity-0 animate-[fade-up_0.7s_0.32s_ease-out_forwards]">
            <a
              href="#mentors"
              className="group inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Browse mentors
              <ArrowUpRight size={15} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 cut border border-line bg-surface/60 px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-paper transition-colors duration-300 hover:border-blue/50"
            >
              See pricing
            </a>
          </div>
          <p className="mt-7 font-mono text-[11px] tracking-[0.14em] uppercase text-mute opacity-0 animate-[fade-up_0.7s_0.4s_ease-out_forwards]">
            {mentorCount} mentors currently teaching · sessions booked weekly
          </p>
        </div>
      </div>
    </section>
  );
}
