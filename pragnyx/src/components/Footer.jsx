import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "./SocialIcons";
import NewsletterForm from "./NewsletterForm";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/solutions#atlas", label: "Atlas" },
      { href: "/solutions#lumen", label: "Lumen" },
      { href: "/solutions#forge", label: "Forge" },
      { href: "/solutions#signal", label: "Signal" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/learning", label: "PragnyX Learning" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const SOCIALS = [
  { icon: LinkedInIcon, label: "LinkedIn", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-void border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex">
              <Image
                src="/logo/pragnyx-wordmark.png"
                alt="PragnyX"
                width={1173}
                height={281}
                className="h-6 w-auto opacity-90"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-mute leading-relaxed">
              Wisdom for the next frontier. Products, builds, and 1:1
              mentorship for people engineering what&apos;s next.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="cut-sm w-9 h-9 flex items-center justify-center bg-surface-2 border border-line text-mute hover:text-paper hover:border-blue/50 transition-colors"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
                  {col.heading}
                </span>
                <div className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-mute hover:text-paper transition-colors w-fit"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
              Stay ahead of the frontier
            </span>
            <p className="mt-3 text-sm text-mute leading-relaxed">
              One short email a month — product notes, learning track drops,
              nothing else.
            </p>
            <NewsletterForm compact />
            <a
              href="mailto:hello@pragnyx.in"
              className="mt-5 inline-flex items-center gap-2 text-sm text-mute hover:text-paper transition-colors"
            >
              <Mail size={14} strokeWidth={1.5} />
              hello@pragnyx.in
            </a>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-mute">
            © {new Date().getFullYear()} PragnyX. All rights reserved.
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
            Engineered for the future
          </span>
        </div>
      </div>
    </footer>
  );
}
