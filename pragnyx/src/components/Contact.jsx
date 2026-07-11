"use client";

import { useState } from "react";
import { Mail, X as XIcon, ArrowUpRight, Check, Loader2, Phone, MapPin } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "./SocialIcons";
import Reveal from "./Reveal";

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const WHATSAPP_NUMBER = "9421514816";
const WHATSAPP_HREF = `https://wa.me/91${WHATSAPP_NUMBER}`;

const SOCIALS = [
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/pragnyx/" },
  { icon: XIcon, label: "X", href: "https://x.com/PragnyX" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/pragnyx" },
  { icon: WhatsAppIcon, label: "WhatsApp", href: WHATSAPP_HREF },
];

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  // Honeypot: hidden from real users via CSS below; bots that fill every
  // field they find trip this, and the server quietly no-ops the request.
  const [website, setWebsite] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || {});
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setErrors({ form: "Network error — please try again." });
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative bg-void py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Contact
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-xl">
            Let&apos;s build what&apos;s next.
          </h2>
          <p className="mt-5 max-w-md text-mute leading-relaxed">
            Have an idea, a problem worth solving, or a frontier worth
            exploring? We&apos;d like to hear about it.
          </p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-4" delay={100}>
            <div className="gradient-border cut h-full">
              <div className="cut bg-surface h-full px-8 py-9 flex flex-col justify-between gap-13">

                {/* Reach us — Address + Email + Phone */}
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute">
                    Reach us
                  </span>

                  {/* Address */}
                  <a
                    href="https://maps.google.com/?q=Vithai+Apartment+Lane+No+5+Karvenagar+Pune+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-start gap-2 text-xs text-mute hover:text-paper transition-colors leading-relaxed"
                  >
                    <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                    <span>
                      Vithai App. Lean No. 05, <br />
                      Karvenagar, Pune, Maharashtra <br />
                      India - 411052
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:hello@pragnyx.in"
                    className="mt-4 flex items-center gap-2.5 text-sm text-mute hover:text-paper transition-colors"
                  >
                    <Mail size={15} strokeWidth={1.5} className="shrink-0" />
                    hello@pragnyx.in
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:+91${WHATSAPP_NUMBER}`}
                    className="mt-3 flex items-center gap-2.5 text-sm text-mute hover:text-paper transition-colors"
                  >
                    <Phone size={15} strokeWidth={1.5} className="shrink-0" />
                    +91 {WHATSAPP_NUMBER}
                  </a>
                </div>

                {/* Socials */}
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute">
                    Elsewhere
                  </span>
                  <div className="mt-4 flex gap-3 flex-wrap">
                    {SOCIALS.map(({ icon: Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="cut-sm w-10 h-10 flex items-center justify-center bg-surface-2 border border-line text-mute hover:text-paper hover:border-blue/50 transition-colors"
                      >
                        <Icon size={16} strokeWidth={1.5} />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={200}>
            <form onSubmit={handleSubmit} className="gradient-border cut">
              <div className="cut bg-surface px-8 py-9 sm:px-10 sm:py-10">
                {/* Honeypot — hidden from sighted users and screen readers;
                    left empty by humans, filled in by form-filling bots. */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                />
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={`mt-2 w-full bg-surface-2 border cut-sm px-4 py-3 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors ${
                        errors.name ? "border-rose-500/60" : "border-line"
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={`mt-2 w-full bg-surface-2 border cut-sm px-4 py-3 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors ${
                        errors.email ? "border-rose-500/60" : "border-line"
                      }`}
                      placeholder="you@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="message"
                    className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={`mt-2 w-full bg-surface-2 border cut-sm px-4 py-3 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors resize-none ${
                      errors.message ? "border-rose-500/60" : "border-line"
                    }`}
                    placeholder="Tell us what you're building…"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
                  )}
                </div>

                <div className="mt-7 flex items-center gap-5">
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "sent"}
                    className="group inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {status === "sent" ? "Message sent" : status === "loading" ? "Sending…" : "Send message"}
                    {status === "sent" ? (
                      <Check size={15} strokeWidth={2} />
                    ) : status === "loading" ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.75}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </button>
                  {status === "sent" && (
                    <span className="text-xs text-mute">
                      Thanks — we&apos;ll be in touch soon.
                    </span>
                  )}
                  {errors.form && (
                    <span className="text-xs text-rose-400">{errors.form}</span>
                  )}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
