import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/data/site";
import Reveal from "./Reveal";

export default function ProductsTeaser() {
  return (
    <section id="products" className="relative bg-void py-28 lg:py-36 border-t border-line">
      <div className="absolute inset-0 bp-grid-fine opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
                  What we build
                </span>
              </div>
              <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-xl">
                Four products. One way of thinking.
              </h2>
            </div>
            <Link
              href="/solutions"
              className="hidden sm:inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-mute hover:text-paper transition-colors"
            >
              View all solutions
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.slug} delay={i * 100}>
              <Link
                href={`/solutions#${product.slug}`}
                className="group block h-full gradient-border cut transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="cut h-full bg-surface px-7 py-8 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
                      {product.tag}
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.75}
                      className="text-mute group-hover:text-paper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm text-mute leading-relaxed">
                    {product.summary}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <Link
            href="/solutions"
            className="mt-10 sm:hidden inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-mute hover:text-paper transition-colors"
          >
            View all solutions
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
