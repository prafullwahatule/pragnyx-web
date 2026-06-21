import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/data/site";
import Reveal from "./Reveal";

export default function SolutionsList() {
  return (
    <section className="relative bg-void py-8">
      <div className="absolute inset-0 bp-grid-fine opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 flex flex-col gap-20 lg:gap-28">
        {PRODUCTS.map((product, i) => (
          <Reveal key={product.slug} delay={i * 60}>
            <div
              id={product.slug}
              className="grid lg:grid-cols-12 gap-10 items-start scroll-mt-28"
            >
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`h-px w-8 bg-gradient-to-r ${
                      product.color === "blue" ? "from-blue to-violet" : "from-violet to-blue"
                    }`}
                  />
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute">
                    {product.tag}
                  </span>
                </div>
                <h2 className="font-display font-medium text-3xl sm:text-4xl tracking-tight">
                  {product.name}
                </h2>
                <p className="mt-5 text-mute leading-relaxed max-w-md">
                  {product.summary}
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 cut border border-line bg-surface/60 px-6 py-3 font-mono text-xs tracking-[0.14em] uppercase text-paper transition-colors duration-300 hover:border-blue/50"
                >
                  Talk to us about {product.name}
                  <ArrowUpRight size={14} strokeWidth={1.75} />
                </Link>
              </div>

              <div className="lg:col-span-7">
                <div className="gradient-border cut">
                  <div className="cut bg-surface px-8 py-9 sm:px-10 sm:py-10">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
                      What you get
                    </span>
                    <ul className="mt-5 flex flex-col gap-4">
                      {product.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 cut-sm w-5 h-5 flex items-center justify-center shrink-0 ${
                              product.color === "blue"
                                ? "bg-blue/15 text-blue"
                                : "bg-violet/15 text-violet"
                            }`}
                          >
                            <Check size={12} strokeWidth={2.5} />
                          </span>
                          <span className="text-sm sm:text-base text-paper/90 leading-relaxed">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
