import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { MENTORS } from "@/data/site";
import Reveal from "./Reveal";

export default function LearningTeaser() {
  const featured = MENTORS.slice(0, 3);

  return (
    <section className="relative bg-surface py-28 lg:py-36 border-t border-line overflow-hidden">
      <div className="absolute inset-0 bp-grid opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
                  PragnyX Learning
                </span>
              </div>
              <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight">
                Real mentors. One-to-one. No cohorts to get lost in.
              </h2>
              <p className="mt-5 text-mute leading-relaxed max-w-md">
                We pair you with a working engineer, designer, or product
                lead who teaches the way they actually think — not a fixed
                syllabus. Book a session, ask the real question, get
                unstuck.
              </p>
              <Link
                href="/learning"
                className="mt-8 inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore PragnyX Learning
                <ArrowUpRight size={15} strokeWidth={1.75} />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-3 gap-5">
              {featured.map((mentor, i) => (
                <Reveal key={mentor.id} delay={i * 110}>
                  <div className="gradient-border cut h-full">
                    <div className="cut bg-void h-full px-6 py-7 flex flex-col">
                      <div
                        className={`cut-sm w-11 h-11 flex items-center justify-center border border-line mb-5 ${
                          mentor.color === "blue"
                            ? "bg-blue/10 text-blue"
                            : "bg-violet/10 text-violet"
                        }`}
                      >
                        <Users size={18} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-base font-medium tracking-tight">
                        {mentor.name}
                      </h3>
                      <p className="mt-1 text-xs text-mute leading-relaxed">
                        {mentor.title}
                      </p>
                      <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-mute">
                        <span className="text-paper">{mentor.rating}</span>
                        <span>·</span>
                        <span>{mentor.sessions} sessions</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
