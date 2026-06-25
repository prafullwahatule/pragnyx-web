import Image from "next/image";
import Link from "next/link";
import { Mail, X as XIcon, Phone, MapPin } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "./SocialIcons";
import NewsletterForm from "./NewsletterForm";

function WhatsAppIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const WHATSAPP_NUMBER = "9421514816";
const WHATSAPP_HREF = `https://wa.me/91${WHATSAPP_NUMBER}`;

const COLUMNS = [
  {
    heading: "Services",
    links: [
      { href: "/solutions#business-intelligence", label: "Business Intelligence" },
      { href: "/solutions#software-solutions", label: "Software Solutions" },
      { href: "/solutions#data-intelligence", label: "Data Intelligence" },
      { href: "/solutions#ai-automation", label: "AI & Automation" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/learning", label: "PragnyX Learning", external: true },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const SOCIALS = [
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/pragnyx/" },
  { icon: XIcon, label: "X", href: "https://x.com/PragnyX" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/pragnyx" },
  { icon: WhatsAppIcon, label: "WhatsApp", href: WHATSAPP_HREF },
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

            <div className="mt-6 flex gap-3 flex-wrap">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="cut-sm w-9 h-9 flex items-center justify-center bg-surface-2 border border-line text-mute hover:text-paper hover:border-blue/50 transition-colors"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            {/* Address */}
            <a
              href="https://maps.google.com/?q=Vithai+Apartment+Lane+No+5+Karvenagar+Pune+Maharashtra"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-start gap-2 text-xs text-mute hover:text-paper transition-colors leading-relaxed"
            >
              <MapPin size={13} strokeWidth={1.5} className="mt-0.5 shrink-0" />
              <span>
                Vithai App. Lane No. 05, Karvenagar,<br />
                Pune, Maharashtra India - 411052
              </span>
            </a>
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
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
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

            <div className="mt-5 flex flex-col gap-2">
              <a
                href="mailto:hello.pragnyx@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-mute hover:text-paper transition-colors"
              >
                <Mail size={14} strokeWidth={1.5} />
                hello.pragnyx@gmail.com
              </a>
              <a
                href={`tel:+91${WHATSAPP_NUMBER}`}
                className="inline-flex items-center gap-2 text-sm text-mute hover:text-paper transition-colors"
              >
                <Phone size={14} strokeWidth={1.5} />
                +91 {WHATSAPP_NUMBER}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-mute">
            © {new Date().getFullYear()} PragnyX. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-xs text-mute hover:text-paper transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-xs text-mute hover:text-paper transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
              Engineered for the future
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
