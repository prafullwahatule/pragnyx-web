import Reveal from "./Reveal";

export default function LegalContent({ updated, sections }) {
  return (
    <section className="relative bg-void py-20 lg:py-28 border-t border-line">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute">
            Last updated: {updated}
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-10">
          {sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 50}>
              <div className="border-l border-line pl-6">
                <h2 className="font-display text-xl sm:text-2xl font-medium tracking-tight">
                  {section.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.body.map((para, j) => (
                    <p
                      key={j}
                      className="text-sm sm:text-base text-mute leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-1 flex flex-col gap-2">
                      {section.list.map((item, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-3 text-sm sm:text-base text-mute leading-relaxed"
                        >
                          <span className="mt-2 h-1 w-1 rounded-full bg-gradient-to-r from-blue to-violet shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
