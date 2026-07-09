import Link from "next/link";
import {
  Boxes,
  Users,
  Briefcase,
  Award,
  Inbox,
  Mail,
  FileText,
  ClipboardList,
  Database,
  AlertTriangle,
  Building2,
  CalendarClock,
  Wallet,
} from "lucide-react";
import { isDbConfigured } from "@/lib/db";
import { getAllProducts } from "@/lib/repo/products";
import { mentorsRepo } from "@/lib/repo/mentors";
import { jobsRepo } from "@/lib/repo/jobs";
import { getAllCertificates } from "@/lib/repo/certificates";
import {
  getContactSubmissions,
  getNewsletterSubscribers,
  getLearningRequests,
  getJobApplications,
} from "@/lib/repo/submissions";
import { listWorkspaces, getEduOSDemoRequests } from "@/lib/repo/eduos";
import { listWorkspaces as listFinCoreWorkspaces, getFinCoreDemoRequests } from "@/lib/repo/fincore";

export default async function AdminDashboardPage() {
  const dbConfigured = isDbConfigured();

  const [
    products, mentors, jobs, certificates, contacts, subscribers, learningRequests, jobApplications,
    eduosWorkspaces, eduosDemoRequests, fincoreWorkspaces, fincoreDemoRequests,
  ] =
    await Promise.all([
      getAllProducts(),
      mentorsRepo.getAll(),
      jobsRepo.getAll(),
      getAllCertificates(),
      getContactSubmissions(),
      getNewsletterSubscribers(),
      getLearningRequests(),
      getJobApplications(),
      listWorkspaces(),
      getEduOSDemoRequests(),
      listFinCoreWorkspaces(),
      getFinCoreDemoRequests(),
    ]);

  const newContacts = contacts.filter((c) => c.status === "new").length;
  const newLearningRequests = learningRequests.filter((r) => r.status === "new").length;
  const newJobApplications = jobApplications.filter((j) => j.status === "new").length;
  const newEduOSDemoRequests = eduosDemoRequests.filter((r) => r.status === "new").length;
  const activeWorkspaces = eduosWorkspaces.filter((w) => w.subscriptionStatus === "active").length;
  const newFinCoreDemoRequests = fincoreDemoRequests.filter((r) => r.status === "new").length;
  const activeFinCoreWorkspaces = fincoreWorkspaces.filter((w) => w.subscriptionStatus === "active").length;

  const contentCards = [
    { href: "/admin/products", label: "Solutions", count: products.length, icon: Boxes },
    { href: "/admin/mentors", label: "Mentors", count: mentors.length, icon: Users },
    { href: "/admin/jobs", label: "Open jobs", count: jobs.length, icon: Briefcase },
    { href: "/admin/certificates", label: "Certificates issued", count: certificates.length, icon: Award },
  ];

  const inboxCards = [
    { href: "/admin/submissions/contact", label: "Contact messages", count: contacts.length, badge: newContacts, icon: Inbox },
    { href: "/admin/submissions/newsletter", label: "Newsletter subscribers", count: subscribers.length, icon: Mail },
    { href: "/admin/submissions/learning-requests", label: "Learning requests", count: learningRequests.length, badge: newLearningRequests, icon: FileText },
    { href: "/admin/submissions/job-applications", label: "Job applications", count: jobApplications.length, badge: newJobApplications, icon: ClipboardList },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-medium tracking-tight">Dashboard</h1>
      <p className="mt-1.5 text-sm text-mute">
        A quick look at your site content and incoming submissions.
      </p>

      {!dbConfigured && (
        <div className="mt-6 flex items-start gap-3 cut-sm border border-amber-500/30 bg-amber-500/10 px-5 py-4">
          <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-200">No database connected</p>
            <p className="mt-1 text-xs text-amber-200/80 leading-relaxed">
              You&apos;re viewing the static placeholder content shipped with the site. Connect a
              Postgres database (Neon via Vercel, Supabase, or any provider) and set{" "}
              <code className="text-amber-100">DATABASE_URL</code> to start editing content and
              receiving form submissions here. See <code className="text-amber-100">ADMIN_SETUP.md</code>{" "}
              in the project for step-by-step instructions.
            </p>
          </div>
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-4">
          Site content
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentCards.map((card) => (
            <DashboardCard key={card.href} {...card} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-4">
          Inbox
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {inboxCards.map((card) => (
            <DashboardCard key={card.href} {...card} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-4">
          EduOS
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard href="/admin/eduos/workspaces" label="Active workspaces" count={activeWorkspaces} icon={Building2} />
          <DashboardCard href="/admin/eduos/workspaces" label="Total workspaces" count={eduosWorkspaces.length} icon={Building2} />
          <DashboardCard href="/admin/eduos/demo-requests" label="Demo requests" count={eduosDemoRequests.length} badge={newEduOSDemoRequests} icon={CalendarClock} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-4">
          FinCore
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard href="/admin/fincore/workspaces" label="Active workspaces" count={activeFinCoreWorkspaces} icon={Wallet} />
          <DashboardCard href="/admin/fincore/workspaces" label="Total workspaces" count={fincoreWorkspaces.length} icon={Wallet} />
          <DashboardCard href="/admin/fincore/demo-requests" label="Demo requests" count={fincoreDemoRequests.length} badge={newFinCoreDemoRequests} icon={CalendarClock} />
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-3 cut-sm border border-line bg-surface px-5 py-4">
          <Database size={16} className={dbConfigured ? "text-blue" : "text-mute"} />
          <p className="text-xs text-mute">
            Database status:{" "}
            <span className={dbConfigured ? "text-blue" : "text-paper"}>
              {dbConfigured ? "Connected" : "Not connected"}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}

function DashboardCard({ href, label, count, badge, icon: Icon }) {
  return (
    <Link
      href={href}
      className="group cut border border-line bg-surface px-5 py-5 transition-colors hover:border-blue/40"
    >
      <div className="flex items-center justify-between">
        <span className="cut-sm w-9 h-9 flex items-center justify-center bg-surface-2 border border-line text-blue group-hover:text-violet transition-colors">
          <Icon size={16} strokeWidth={1.75} />
        </span>
        {badge > 0 && (
          <span className="cut-sm bg-gradient-to-r from-blue to-violet px-2 py-0.5 font-mono text-[10px] text-white">
            {badge} new
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-medium tracking-tight">{count}</p>
      <p className="mt-1 text-xs text-mute">{label}</p>
    </Link>
  );
}
