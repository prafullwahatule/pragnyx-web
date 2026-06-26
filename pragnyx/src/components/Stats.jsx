import { STATS } from "@/data/site";
import AnimatedCounter from "./AnimatedCounter";
import Reveal from "./Reveal";

export default function Stats({ stats = STATS }) {
  return (
    <section className="relative bg-surface py-16 lg:py-20 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <div className="text-center lg:text-left">
                <div className="font-display font-medium text-4xl sm:text-5xl tracking-tight text-gradient">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
