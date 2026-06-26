"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  Clock,
  PlayCircle,
  FileCheck2,
  CalendarCheck2,
  ShieldCheck,
  ArrowUpRight,
  ExternalLink,
  Download,
} from "lucide-react";
import Reveal from "./Reveal";
import {
  formatDuration,
  formatLongDate,
  formatLearnerCount,
} from "@/lib/certificate";

export default function CertificateVerifyClient({ certificate }) {
  const c = certificate;

  return (
    <section className="relative bg-void pt-36 pb-28 lg:pt-44 lg:pb-36 overflow-hidden">
      <div className="absolute inset-0 bp-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-blue/15 blur-[120px] animate-drift" />
      <div
        className="absolute -bottom-32 -right-20 h-[24rem] w-[24rem] rounded-full bg-violet/15 blur-[120px] animate-drift"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        {/* Verified eyebrow */}
        <Reveal>
          <div className="flex items-center gap-3 mb-7">
            <span className="cut-sm w-8 h-8 flex items-center justify-center bg-blue/15 text-blue">
              <ShieldCheck size={16} strokeWidth={1.75} />
            </span>
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Verified credential
            </span>
          </div>
        </Reveal>

        {/* Main certificate card */}
        <Reveal delay={80}>
          <div className="gradient-border cut">
            <div className="cut bg-surface px-7 py-8 sm:px-10 sm:py-12">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
                    Certificate recipient
                  </span>
                  <h1 className="mt-2 font-display font-medium text-3xl sm:text-4xl tracking-tight">
                    {c.recipientName}
                  </h1>

                  <div className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-blue">
                    <BadgeCheck size={15} strokeWidth={1.75} />
                    Course completed · {formatDuration(c.durationMinutes)}
                  </div>
                </div>

                <Image
                  src="/logo/pragnyx-badge.png"
                  alt="PragnyX"
                  width={400}
                  height={400}
                  className="h-16 w-16 shrink-0 opacity-90"
                />
              </div>

              <div className="mt-9 pt-8 border-t border-line">
                <h2 className="font-display font-medium text-xl sm:text-2xl tracking-tight">
                  {c.course.title}
                </h2>
                <p className="mt-3 text-sm text-mute leading-relaxed max-w-2xl">
                  {c.course.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.08em] uppercase text-mute">
                  <span>By: {c.trainer.name}</span>
                  <span className="opacity-40">·</span>
                  <span>Level: {c.course.level}</span>
                  <span className="opacity-40">·</span>
                  <span>{formatLearnerCount(c.learnersCount)}</span>
                </div>

                <Link
                  href="/learning"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-paper hover:text-gradient transition-colors"
                >
                  Go to course on PragnyX Learning
                  <ArrowUpRight size={14} strokeWidth={1.75} />
                </Link>
              </div>

              {/* Completion + details grid */}
              <div className="mt-9 pt-8 border-t border-line grid sm:grid-cols-2 gap-8">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
                    Completion date
                  </span>
                  <div className="mt-2 flex items-center gap-2 text-base text-paper">
                    <CalendarCheck2 size={16} strokeWidth={1.75} className="text-blue" />
                    {formatLongDate(c.completionDate)}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
                    Details
                  </span>
                  <ul className="mt-2 flex flex-col gap-1.5 text-sm text-paper">
                    <li className="flex items-center gap-2">
                      <Clock size={14} strokeWidth={1.75} className="text-mute" />
                      {formatDuration(c.durationMinutes)} total · {c.durationLabel}
                    </li>
                    <li className="flex items-center gap-2">
                      <PlayCircle size={14} strokeWidth={1.75} className="text-mute" />
                      {c.trainingType}
                    </li>
                    <li className="flex items-center gap-2">
                      <FileCheck2 size={14} strokeWidth={1.75} className="text-mute" />
                      {c.sessionsCount} sessions
                    </li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-9 pt-8 border-t border-line">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
                  Skills covered
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.skills.map((skill) => (
                    <span
                      key={skill}
                      className="cut-sm px-3 py-1.5 bg-surface-2 border border-line text-xs text-paper"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modules covered */}
              <div className="mt-9 pt-8 border-t border-line">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
                  Program covered
                </span>
                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  {c.course.modules.map((m) => (
                    <div
                      key={m}
                      className="flex items-center gap-2 text-sm text-mute"
                    >
                      <span className="h-1 w-1 rounded-full bg-gradient-to-r from-blue to-violet shrink-0" />
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifying organization */}
              <div className="mt-9 pt-8 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
                    Certifying organization
                  </span>
                  <Link
                    href="/learning"
                    className="mt-2 flex items-center gap-2.5 group"
                  >
                    <Image
                      src="/logo/pragnyx-wordmark.png"
                      alt="PragnyX"
                      width={1173}
                      height={281}
                      className="h-5 w-auto opacity-90"
                    />
                    <ExternalLink
                      size={13}
                      strokeWidth={1.75}
                      className="text-mute group-hover:text-paper transition-colors"
                    />
                  </Link>
                </div>

                <div className="text-left sm:text-right">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
                    Certificate ID
                  </span>
                  <p className="mt-2 font-mono text-sm text-paper">{c.id}</p>
                  {c.pdfUrl && (
                    <a
                      href={c.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] uppercase text-blue hover:text-gradient transition-colors"
                    >
                      <Download size={13} strokeWidth={1.75} />
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Actual certificate image */}
        {c.imageUrl && (
          <Reveal delay={140}>
            <div className="mt-10">
              <div className="gradient-border cut">
                <div className="cut bg-surface p-3 sm:p-4">
                  <Image
                    src={c.imageUrl}
                    alt={`Certificate of completion for ${c.recipientName} — ${c.course.title}`}
                    width={1216}
                    height={720}
                    className="w-full h-auto rounded-sm"
                  />
                </div>
              </div>
              {c.pdfUrl && (
                <div className="mt-5 flex justify-center">
                  <a
                    href={c.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-6 py-3 font-mono text-[11px] tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <Download size={14} strokeWidth={1.75} />
                    Download certificate PDF
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        )}

        <Reveal delay={180}>
          <p className="mt-7 text-center text-xs text-mute">
            This credential was issued by PragnyX Learning and can be verified
            any time at{" "}
            <span className="text-paper">pragnyx.in/learning/certificate/{c.id}</span>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
