import Reveal from "./Reveal";

const TIMELINE = [
  {
    year: "2022",
    title: "PragnyX starts as a two-person research project",
    copy: "Two engineers, frustrated by how much software ships without anyone reasoning through why, start prototyping what an explainable decision layer could look like.",
  },
  {
    year: "2023",
    title: "First Software Solutions client goes live",
    copy: "A mid-size logistics company becomes the first team to run a custom-built internal platform shipped end-to-end by PragnyX.",
  },
  {
    year: "2024",
    title: "Business Intelligence and Data Intelligence join the lineup",
    copy: "As client work repeated the same two problems — scattered reporting and messy data — these two services are built to solve them directly.",
  },
  {
    year: "2025",
    title: "PragnyX Learning opens its doors",
    copy: "Engineers who'd been informally mentoring junior hires ask to do it properly. PragnyX Learning launches with six mentors and a simple idea: teach the way you'd actually explain it to a colleague.",
  },
  {
    year: "2026",
    title: "AI & Automation launches; 120+ teams onboarded",
    copy: "AI & Automation rounds out the service line, and PragnyX crosses 120 teams across services, custom builds, and learning combined.",
  },
];

export default function Timeline() {
  return (
    <section className="relative bg-void py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              How we got here
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight">
            A short, honest history.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.year} delay={i * 80}>
              <div className="relative pl-9 pb-12 last:pb-0 border-l border-line last:border-transparent">
                <span className="absolute -left-[5px] top-1 w-[10px] h-[10px] rounded-full bg-gradient-to-r from-blue to-violet" />
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
                  {item.year}
                </span>
                <h3 className="mt-2 font-display text-lg sm:text-xl font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-mute leading-relaxed max-w-lg">
                  {item.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
