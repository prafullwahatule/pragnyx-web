import { TEAM } from "@/data/site";
import Reveal from "./Reveal";

export default function Team() {
  return (
    <section className="relative bg-surface py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Team
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-xl">
            The people behind the products, builds, and mentorship.
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, i) => (
            <Reveal key={member.id} delay={i * 90}>
              <div className="h-full gradient-border cut">
                <div className="cut h-full bg-void px-6 py-7 flex flex-col">
                  <div
                    className={`cut-sm w-12 h-12 flex items-center justify-center font-display text-sm font-medium border border-line ${
                      i % 2 === 0
                        ? "bg-blue/15 text-blue"
                        : "bg-violet/15 text-violet"
                    }`}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="mt-5 font-display text-base font-medium tracking-tight">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.16em] uppercase text-mute">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-mute leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
