"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Boxes,
  Users,
  Briefcase,
  HelpCircle,
  Quote,
  UsersRound,
  BarChart3,
  GraduationCap,
  Tag,
  Award,
  Inbox,
  Mail,
  FileText,
  ClipboardList,
  Menu,
  X,
  LogOut,
  ExternalLink,
  Building2,
  CalendarClock,
  Wallet,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    heading: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    heading: "Site content",
    items: [
      { href: "/admin/products", label: "Solutions", icon: Boxes },
      { href: "/admin/mentors", label: "Mentors", icon: Users },
      { href: "/admin/learning-plans", label: "Pricing plans", icon: Tag },
      { href: "/admin/learning-tracks", label: "Learning tracks", icon: GraduationCap },
      { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
      { href: "/admin/team", label: "Team", icon: UsersRound },
      { href: "/admin/founder", label: "Founder", icon: Quote },
      { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
      { href: "/admin/stats", label: "Stats", icon: BarChart3 },
    ],
  },
  {
    heading: "Certificates",
    items: [{ href: "/admin/certificates", label: "Certificates", icon: Award }],
  },
  {
    heading: "EduOS",
    items: [
      { href: "/admin/eduos/workspaces", label: "Workspaces", icon: Building2 },
      { href: "/admin/eduos/demo-requests", label: "Demo requests", icon: CalendarClock },
    ],
  },
  {
    heading: "FinCore",
    items: [
      { href: "/admin/fincore/workspaces", label: "Workspaces", icon: Wallet },
      { href: "/admin/fincore/pricing", label: "Pricing", icon: Tag },
      { href: "/admin/fincore/demo-requests", label: "Demo requests", icon: CalendarClock },
    ],
  },
  {
    heading: "Inbox",
    items: [
      { href: "/admin/submissions/contact", label: "Contact messages", icon: Inbox },
      { href: "/admin/submissions/newsletter", label: "Newsletter", icon: Mail },
      { href: "/admin/submissions/learning-requests", label: "Learning requests", icon: FileText },
      { href: "/admin/submissions/job-applications", label: "Job applications", icon: ClipboardList },
    ],
  },
];

export default function AdminShell({ adminName, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const SidebarContent = (
    <>
      <div className="px-6 py-6 border-b border-line">
        <Link href="/admin" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logo/pragnyx-wordmark.png"
            alt="PragnyX"
            width={1173}
            height={281}
            className="h-6 w-auto"
          />
        </Link>
        <span className="mt-2 block font-mono text-[10px] tracking-[0.22em] uppercase text-mute">
          Admin panel
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.heading} className="mb-6">
            <p className="px-2 mb-2 font-mono text-[10px] tracking-[0.18em] uppercase text-mute/70">
              {section.heading}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 cut-sm text-sm transition-colors ${
                      active
                        ? "bg-gradient-to-r from-blue/20 to-violet/20 text-paper border border-blue/30"
                        : "text-mute hover:text-paper hover:bg-surface-2 border border-transparent"
                    }`}
                  >
                    <Icon size={15} strokeWidth={1.75} className="shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-5 border-t border-line flex flex-col gap-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2.5 cut-sm text-sm text-mute hover:text-paper hover:bg-surface-2 transition-colors"
        >
          <ExternalLink size={15} strokeWidth={1.75} />
          View live site
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2.5 cut-sm text-sm text-mute hover:text-rose-400 hover:bg-surface-2 transition-colors text-left"
        >
          <LogOut size={15} strokeWidth={1.75} />
          Sign out{adminName ? ` (${adminName})` : ""}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-void text-paper flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-line bg-surface">
        {SidebarContent}
      </aside>

      {/* Mobile topbar + drawer */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-surface border-b border-line flex items-center justify-between px-5 h-16">
        <Image src="/logo/pragnyx-wordmark.png" alt="PragnyX" width={1173} height={281} className="h-5 w-auto" />
        <button onClick={() => setMobileOpen((v) => !v)} className="text-paper p-2 -mr-2" aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-void/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <aside
            className="absolute top-0 left-0 h-full w-72 bg-surface border-r border-line flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {SidebarContent}
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0 lg:pt-0 pt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
