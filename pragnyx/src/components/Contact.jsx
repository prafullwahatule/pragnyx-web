"use client";

import { useState } from "react";
import { Mail, X as XIcon, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "./SocialIcons";
import Reveal from "./Reveal";

const SOCIALS = [
  { icon: LinkedInIcon, label: "LinkedIn", href: "#" },
  { icon: XIcon, label: "X", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | loading | sent | error
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

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
        body: JSON.stringify(form),
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
              <div className="cut bg-surface h-full px-8 py-9 flex flex-col justify-between gap-10">
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute">
                    Reach us
                  </span>
                  <a
                    href="mailto:hello@pragnyx.in"
                    className="mt-4 flex items-center gap-2.5 text-lg font-display hover:text-gradient transition-colors"
                  >
                    <Mail size={18} strokeWidth={1.5} />
                    hello@pragnyx.in
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute">
                    Elsewhere
                  </span>
                  <div className="mt-4 flex gap-3">
                    {SOCIALS.map(({ icon: Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
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
