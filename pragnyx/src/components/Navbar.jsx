"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-void/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0" aria-label="PragnyX home" onClick={() => setOpen(false)}>
          <Image
            src="/logo/pragnyx-wordmark.png"
            alt="PragnyX"
            width={1173}
            height={281}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${
                  active ? "text-paper" : "text-mute hover:text-paper"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-blue to-violet" />
                )}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 gradient-border cut-sm"
        >
          <span className="cut-sm flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase text-paper">
            Get in touch
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-paper p-2 -mr-2"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-void border-t border-line">
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-mono text-xs tracking-[0.18em] uppercase transition-colors ${
                  pathname === link.href ? "text-paper" : "text-mute hover:text-paper"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 cut bg-gradient-to-r from-blue to-violet px-5 py-3 font-mono text-xs tracking-[0.14em] uppercase text-white"
            >
              Get in touch
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
