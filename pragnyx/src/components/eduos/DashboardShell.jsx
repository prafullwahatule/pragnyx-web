"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, CreditCard, Blocks, Users, LifeBuoy, Loader2,
  Download, ArrowUpCircle, Check, Send, ExternalLink,
} from "lucide-react";
import { ADD_ONS, PLANS } from "@/lib/eduos/plans";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "modules", label: "Modules & AI Credits", icon: Blocks },
  { id: "team", label: "Team", icon: Users },
  { id: "support", label: "Support", icon: LifeBuoy },
];

export default function DashboardShell({ workspaceId }) {
  const [tab, setTab] = useState("overview");
  const [workspace, setWorkspace] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!workspaceId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no data to fetch, resolves loading state once on mount
      setStatus("empty");
      return;
    }
    fetch(`/api/eduos/workspace/${encodeURIComponent(workspaceId)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setWorkspace(data.workspace);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [workspaceId]);

  if (status === "loading") {
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <Loader2 size={28} className="e-spin" color="var(--e-primary)" />
        <style>{`.e-spin { animation: e-spin 0.8s linear infinite; } @keyframes e-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (status === "empty" || status === "error") {
    return (
      <div className="e-card" style={{ padding: 40, maxWidth: 480, margin: "60px auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>No workspace to show</h2>
        <p style={{ marginTop: 10, fontSize: 14, color: "var(--e-ink-mute)" }}>
          Log in with your workspace URL or institution code to see your dashboard.
        </p>
        <Link href="/eduos/login" className="e-btn e-btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 32 }} className="e-dash-grid">
      <aside>
        <div style={{ fontSize: 12, color: "var(--e-ink-faint)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
          {workspace.institution.name}
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }} className="e-dash-nav">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left",
                fontSize: 13.5, fontWeight: 600,
                background: tab === id ? "var(--e-surface)" : "transparent",
                color: tab === id ? "var(--e-primary)" : "var(--e-ink-mute)",
                boxShadow: tab === id ? "var(--e-shadow-sm)" : "none",
              }}
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <div>
        {tab === "overview" && <Overview workspace={workspace} />}
        {tab === "billing" && <Billing workspace={workspace} />}
        {tab === "modules" && <Modules workspace={workspace} />}
        {tab === "team" && <Team workspace={workspace} />}
        {tab === "support" && <Support workspace={workspace} />}
      </div>

      <style>{`
        @media (max-width: 800px) {
          .e-dash-grid { grid-template-columns: 1fr !important; }
          .e-dash-nav { flex-direction: row !important; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}

function Card({ title, children, right }) {
  return (
    <div className="e-card" style={{ padding: 26, marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600 }}>{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11.5, color: "var(--e-ink-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      <div style={{ marginTop: 3, fontSize: 14, fontWeight: 600, wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}

function Overview({ workspace }) {
  return (
    <>
      <Card title="Workspace">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }} className="e-wizard-2col">
          <Field label="Workspace URL" value={workspace.workspaceUrl} />
          <Field label="Institution ID" value={workspace.institutionId} />
          <Field label="Tenant ID" value={workspace.tenantId} />
          <Field label="License ID" value={workspace.licenseId} />
          <Field label="Activation Status" value={workspace.activationStatus} />
          <Field label="Subscription Status" value={workspace.subscriptionStatus} />
        </div>
      </Card>
      <Card title="Usage limits">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }} className="e-wizard-2col">
          <Field label="Student limit" value={workspace.limits.students} />
          <Field label="Staff limit" value={workspace.limits.staff} />
          <Field label="Storage limit" value={typeof workspace.limits.storageGB === "number" ? `${workspace.limits.storageGB} GB` : workspace.limits.storageGB} />
          <Field label="AI credits / month" value={workspace.limits.aiCredits} />
        </div>
      </Card>
    </>
  );
}

function Billing({ workspace }) {
  const [confirmPlan, setConfirmPlan] = useState(null);

  return (
    <>
      <Card
        title="Subscription"
        right={<span style={{ fontSize: 12, fontWeight: 600, color: "var(--e-primary)" }}>{workspace.planName}</span>}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }} className="e-wizard-2col">
          <Field label="Renewal date" value={new Date(workspace.renewalDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} />
          <Field label="Amount" value={workspace.billing.amount ? `₹${workspace.billing.amount.toLocaleString("en-IN")} / ${workspace.billing.period}` : "Custom"} />
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {PLANS.filter((p) => p.selfServe && p.id !== workspace.plan).map((p) => (
            <button key={p.id} onClick={() => setConfirmPlan(p.id)} className="e-btn e-btn-ghost e-btn-sm">
              <ArrowUpCircle size={14} strokeWidth={2} /> Switch to {p.name}
            </button>
          ))}
        </div>
        {confirmPlan && (
          <p style={{ marginTop: 12, fontSize: 12.5, color: "var(--e-ink-mute)" }}>
            Plan change requests are confirmed by our billing team within one business day — request for <strong>{PLANS.find((p) => p.id === confirmPlan)?.name}</strong> noted. (Demo view — this isn&apos;t wired to a live billing engine yet.)
          </p>
        )}
      </Card>

      <Card title="Invoices">
        {workspace.invoices.length === 0 ? (
          <p style={{ fontSize: 13.5, color: "var(--e-ink-faint)" }}>No invoices yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {workspace.invoices.map((inv) => (
              <div key={inv.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: "1px solid var(--e-border)" }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{inv.id}</div>
                  <div style={{ fontSize: 12, color: "var(--e-ink-faint)" }}>{new Date(inv.date).toLocaleDateString("en-IN")}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600 }}>₹{inv.amount.toLocaleString("en-IN")}</span>
                  <span style={{ fontSize: 11.5, padding: "3px 9px", borderRadius: 999, background: "rgba(70,64,214,0.1)", color: "var(--e-primary)", fontWeight: 600 }}>{inv.status}</span>
                  <button className="e-btn e-btn-ghost e-btn-sm" style={{ padding: 8 }} aria-label={`Download invoice ${inv.id}`}>
                    <Download size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

function Modules({ workspace }) {
  const [added, setAdded] = useState([]);

  return (
    <>
      <Card title="Active modules">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {workspace.modules.map((m) => (
            <div key={m} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
              <Check size={15} strokeWidth={2.25} color="var(--e-primary)" />
              {m}
            </div>
          ))}
        </div>
      </Card>
      <Card title="Available add-ons">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="e-wizard-2col">
          {ADD_ONS.map((addon) => {
            const isAdded = added.includes(addon.id);
            return (
              <div key={addon.id} className="e-card" style={{ padding: 16 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{addon.name}</div>
                <div style={{ marginTop: 4, fontSize: 12, color: "var(--e-ink-mute)" }}>{addon.description}</div>
                <button
                  onClick={() => setAdded((v) => (isAdded ? v.filter((id) => id !== addon.id) : [...v, addon.id]))}
                  className={`e-btn ${isAdded ? "e-btn-ghost" : "e-btn-primary"} e-btn-sm`}
                  style={{ marginTop: 12 }}
                >
                  {isAdded ? "Requested" : "Add module"}
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

function Team({ workspace }) {
  const [members, setMembers] = useState([
    { name: workspace.institution.contactPerson, email: workspace.admin.email, role: "Super Admin" },
  ]);
  const [invite, setInvite] = useState({ name: "", email: "", role: "Faculty" });

  function addMember(e) {
    e.preventDefault();
    if (!invite.name.trim() || !invite.email.trim()) return;
    setMembers((v) => [...v, invite]);
    setInvite({ name: "", email: "", role: "Faculty" });
  }

  return (
    <>
      <Card title="Team members">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {members.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: i > 0 ? "1px solid var(--e-border)" : "none" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: "var(--e-ink-faint)" }}>{m.email}</div>
              </div>
              <span style={{ fontSize: 11.5, padding: "3px 9px", borderRadius: 999, background: "var(--e-bg-alt)", color: "var(--e-ink-mute)", fontWeight: 600 }}>{m.role}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Invite a team member">
        <form onSubmit={addMember} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto auto", gap: 10, alignItems: "end" }} className="e-invite-form">
          <div className="e-field">
            <label className="e-label">Name</label>
            <input className="e-input" value={invite.name} onChange={(e) => setInvite((v) => ({ ...v, name: e.target.value }))} />
          </div>
          <div className="e-field">
            <label className="e-label">Email</label>
            <input className="e-input" type="email" value={invite.email} onChange={(e) => setInvite((v) => ({ ...v, email: e.target.value }))} />
          </div>
          <div className="e-field">
            <label className="e-label">Role</label>
            <select className="e-select" value={invite.role} onChange={(e) => setInvite((v) => ({ ...v, role: e.target.value }))}>
              {["Admin", "Principal", "HOD", "Faculty", "Accountant", "Librarian"].map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button type="submit" className="e-btn e-btn-primary e-btn-sm">
            <Send size={14} strokeWidth={2} /> Invite
          </button>
        </form>
      </Card>
    </>
  );
}

function Support() {
  const [sent, setSent] = useState(false);
  const [ticket, setTicket] = useState({ subject: "", message: "" });

  function raiseTicket(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Card title="Raise a support ticket">
        {sent ? (
          <p style={{ fontSize: 13.5, color: "var(--e-ink-mute)" }}>Ticket submitted. Our support team will respond by email.</p>
        ) : (
          <form onSubmit={raiseTicket} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="e-field">
              <label className="e-label">Subject</label>
              <input className="e-input" value={ticket.subject} onChange={(e) => setTicket((v) => ({ ...v, subject: e.target.value }))} required />
            </div>
            <div className="e-field">
              <label className="e-label">Message</label>
              <textarea className="e-textarea" rows={4} value={ticket.message} onChange={(e) => setTicket((v) => ({ ...v, message: e.target.value }))} required />
            </div>
            <button type="submit" className="e-btn e-btn-primary" style={{ alignSelf: "flex-start" }}>
              <Send size={15} strokeWidth={2} /> Submit ticket
            </button>
          </form>
        )}
      </Card>
      <Card title="Documentation">
        <p style={{ fontSize: 13.5, color: "var(--e-ink-mute)" }}>Product documentation is coming soon. For now, reach us directly.</p>
        <Link href="/contact" className="e-btn e-btn-ghost e-btn-sm" style={{ marginTop: 12, display: "inline-flex" }}>
          Contact PragnyX <ExternalLink size={14} strokeWidth={2} />
        </Link>
      </Card>
    </>
  );
}
