"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/data/site";
import Reveal from "./Reveal";

export default function FAQ({ faqs = FAQS }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative bg-surface py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              FAQ
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight">
            Questions worth answering upfront.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div className="gradient-border cut">
                  <div className="cut bg-void">
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-6 sm:px-8 py-5 text-left"
                    >
                      <span className="font-display text-base sm:text-lg font-medium tracking-tight">
                        {item.q}
                      </span>
                      <Plus
                        size={18}
                        strokeWidth={1.75}
                        className={`shrink-0 text-mute transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-blue" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                      style={{ display: "grid" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 sm:px-8 pb-6 text-sm text-mute leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
