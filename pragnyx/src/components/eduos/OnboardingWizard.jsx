"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, Loader2, CheckCircle2, Send } from "lucide-react";
import { ADD_ONS as STATIC_ADD_ONS } from "@/lib/eduos/plans";

const INSTITUTION_TYPES = ["School", "College", "University", "Coaching Institute", "Multi-campus Institution"];
const ROLES = ["Admin", "Principal", "HOD", "Faculty", "Accountant", "Librarian"];
const STEPS = ["details", "modules", "invite", "done"];

/**
 * Post-login, first-time-only onboarding wizard. Gated the same way
 * ResetPasswordForm is: middleware redirects here whenever
 * session.onboardingCompleted is false, and this component's own submit
 * calls are what flip that flag (see /api/eduos/workspace/[id]/onboarding).
 *
 * Deliberately mirrors SignupWizard's card + step-dot visual language —
 * same maxWidth, same step-dot row, same .e-card/.e-field/.e-btn classes —
 * so it reads as a continuation of signup rather than a different flow.
 */
export default function OnboardingWizard({ workspaceId }) {
  const router = useRouter();
  const [step, setStep] = useState("details");
  const [loadingWorkspace, setLoadingWorkspace] = useState(true);

  const [institution, setInstitution] = useState({
    name: "", type: "", contactPerson: "", email: "", phone: "", students: "", staff: "", address: "",
  });
  const [errors, setErrors] = useState({});

  const [addOnCatalogue, setAddOnCatalogue] = useState(STATIC_ADD_ONS);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const [invite, setInvite] = useState({ name: "", email: "", role: "Faculty" });

  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (field) => (e) => setInstitution((v) => ({ ...v, [field]: e.target.value }));

  useEffect(() => {
    fetch("/api/eduos/addons")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setAddOnCatalogue(data.addOns))
      .catch(() => {}); // falls back to the static ADD_ONS import, fine for display purposes

    if (!workspaceId) {
      setLoadingWorkspace(false);
      return;
    }
    fetch(`/api/eduos/workspace/${encodeURIComponent(workspaceId)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setInstitution((v) => ({ ...v, ...data.workspace.institution }));
        setSelectedAddOns(data.workspace.addOns || []);
      })
      .catch(() => {}) // prefilling is a nicety, not required — the form still works empty
      .finally(() => setLoadingWorkspace(false));
  }, [workspaceId]);

  function validateDetails() {
    const errs = {};
    if (!institution.name.trim()) errs.name = "Institution name is required.";
    if (!institution.type) errs.type = "Select an institution type.";
    if (!institution.contactPerson.trim()) errs.contactPerson = "Contact person is required.";
    if (!institution.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(institution.email)) errs.email = "A valid email is required.";
    if (!institution.phone.trim()) errs.phone = "Phone number is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleDetailsSubmit(e) {
    e.preventDefault();
    if (!validateDetails()) return;
    setStep("modules");
  }

  function toggleAddOn(addonId) {
    setSelectedAddOns((v) => (v.includes(addonId) ? v.filter((id) => id !== addonId) : [...v, addonId]));
  }

  /**
   * The wizard's single completion call — persists whatever was
   * collected across the earlier steps (or nothing, for skip:true) and
   * marks onboarding_completed, then shows a brief confirmation before
   * handing off to the dashboard.
   */
  async function finish({ skip = false, includeInvite = true } = {}) {
    setSaving(true);
    setSubmitError("");
    try {
      const res = await fetch(`/api/eduos/workspace/${encodeURIComponent(workspaceId)}/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          skip
            ? { skip: true }
            : {
                institution,
                addOns: selectedAddOns,
                invite: includeInvite && invite.name.trim() && invite.email.trim() ? invite : null,
              }
        ),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error || "Something went wrong — please try again.");
        setSaving(false);
        return;
      }
      setStep("done");
      setTimeout(() => {
        router.push("/eduos/dashboard");
        router.refresh();
      }, 1200);
    } catch {
      setSubmitError("Network error — please try again.");
      setSaving(false);
    }
  }

  const stepIndex = STEPS.indexOf(step);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {step !== "done" && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div />
          <button type="button" onClick={() => finish({ skip: true })} disabled={saving} className="e-btn e-btn-ghost e-btn-sm">
            Skip setup
          </button>
        </div>
      )}

      {step !== "done" && (
        <div style={{ display: "flex", gap: 8, marginBottom: 40, justifyContent: "center" }}>
          {STEPS.slice(0, -1).map((s, i) => (
            <div
              key={s}
              style={{
                width: 44,
                height: 4,
                borderRadius: 999,
                background: i <= stepIndex ? "linear-gradient(120deg, var(--e-primary), var(--e-primary-light))" : "var(--e-border-strong)",
              }}
            />
          ))}
        </div>
      )}

      {submitError && (
        <div className="e-error" style={{ display: "block", marginBottom: 16, textAlign: "center" }}>{submitError}</div>
      )}

      {step === "details" && (
        <form onSubmit={handleDetailsSubmit} className="e-card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, opacity: loadingWorkspace ? 0.6 : 1 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>Confirm your institution details</h2>
            <p style={{ marginTop: 4, fontSize: 13, color: "var(--e-ink-mute)" }}>We've pre-filled what you gave us at signup — just check it over.</p>
          </div>

          <div className="e-field">
            <label className="e-label" htmlFor="o-name">Institution name</label>
            <input id="o-name" className="e-input" value={institution.name} onChange={update("name")} />
            {errors.name && <span className="e-error">{errors.name}</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="e-wizard-2col">
            <div className="e-field">
              <label className="e-label" htmlFor="o-type">Institution type</label>
              <select id="o-type" className="e-select" value={institution.type} onChange={update("type")}>
                <option value="" disabled>Select one</option>
                {INSTITUTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.type && <span className="e-error">{errors.type}</span>}
            </div>
            <div className="e-field">
              <label className="e-label" htmlFor="o-contact">Contact person</label>
              <input id="o-contact" className="e-input" value={institution.contactPerson} onChange={update("contactPerson")} />
              {errors.contactPerson && <span className="e-error">{errors.contactPerson}</span>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="e-wizard-2col">
            <div className="e-field">
              <label className="e-label" htmlFor="o-email">Email</label>
              <input id="o-email" type="email" className="e-input" value={institution.email} onChange={update("email")} />
              {errors.email && <span className="e-error">{errors.email}</span>}
            </div>
            <div className="e-field">
              <label className="e-label" htmlFor="o-phone">Phone</label>
              <input id="o-phone" className="e-input" value={institution.phone} onChange={update("phone")} />
              {errors.phone && <span className="e-error">{errors.phone}</span>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="e-wizard-2col">
            <div className="e-field">
              <label className="e-label" htmlFor="o-students">Number of students</label>
              <input id="o-students" type="number" min="0" className="e-input" value={institution.students} onChange={update("students")} />
            </div>
            <div className="e-field">
              <label className="e-label" htmlFor="o-staff">Number of staff</label>
              <input id="o-staff" type="number" min="0" className="e-input" value={institution.staff} onChange={update("staff")} />
            </div>
          </div>

          <div className="e-field">
            <label className="e-label" htmlFor="o-address">Address</label>
            <textarea id="o-address" className="e-textarea" rows={2} value={institution.address} onChange={update("address")} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            <button type="submit" className="e-btn e-btn-primary">
              Continue <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </form>
      )}

      {step === "modules" && (
        <div className="e-card" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Pick your first modules</h2>
          <p style={{ marginTop: 4, fontSize: 13, color: "var(--e-ink-mute)" }}>
            Turn on any add-ons you want active from day one — you can add or remove more any time from the dashboard.
          </p>

          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="e-wizard-2col">
            {addOnCatalogue.map((addon) => {
              const isSelected = selectedAddOns.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddOn(addon.id)}
                  className="e-card"
                  style={{
                    padding: 16,
                    textAlign: "left",
                    cursor: "pointer",
                    border: isSelected ? "1.5px solid var(--e-primary)" : "1px solid var(--e-border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{addon.name}</div>
                    {isSelected ? (
                      <Check size={16} strokeWidth={2.5} color="var(--e-primary)" style={{ flexShrink: 0 }} />
                    ) : addon.price != null ? (
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--e-primary)", whiteSpace: "nowrap" }}>
                        ₹{addon.price.toLocaleString("en-IN")}<span style={{ color: "var(--e-ink-faint)", fontWeight: 400 }}>/mo</span>
                      </div>
                    ) : null}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 12, color: "var(--e-ink-mute)" }}>{addon.description}</div>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button type="button" onClick={() => setStep("details")} className="e-btn e-btn-ghost">
              <ArrowLeft size={16} strokeWidth={2} /> Back
            </button>
            <button type="button" onClick={() => setStep("invite")} className="e-btn e-btn-primary">
              Continue <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {step === "invite" && (
        <div className="e-card" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Invite a team member</h2>
          <p style={{ marginTop: 4, fontSize: 13, color: "var(--e-ink-mute)" }}>
            Optional — bring in a colleague now, or skip and invite people later from Team settings.
          </p>

          <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="e-wizard-2col">
            <div className="e-field">
              <label className="e-label" htmlFor="o-invite-name">Name</label>
              <input id="o-invite-name" className="e-input" value={invite.name} onChange={(e) => setInvite((v) => ({ ...v, name: e.target.value }))} />
            </div>
            <div className="e-field">
              <label className="e-label" htmlFor="o-invite-email">Email</label>
              <input id="o-invite-email" type="email" className="e-input" value={invite.email} onChange={(e) => setInvite((v) => ({ ...v, email: e.target.value }))} />
            </div>
          </div>
          <div className="e-field" style={{ marginTop: 14, maxWidth: 220 }}>
            <label className="e-label" htmlFor="o-invite-role">Role</label>
            <select id="o-invite-role" className="e-select" value={invite.role} onChange={(e) => setInvite((v) => ({ ...v, role: e.target.value }))}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button type="button" onClick={() => setStep("modules")} className="e-btn e-btn-ghost" disabled={saving}>
              <ArrowLeft size={16} strokeWidth={2} /> Back
            </button>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" onClick={() => finish({ includeInvite: false })} className="e-btn e-btn-ghost" disabled={saving}>
                Skip
              </button>
              <button
                type="button"
                onClick={() => finish({ includeInvite: true })}
                className="e-btn e-btn-primary"
                disabled={saving || !invite.name.trim() || !invite.email.trim()}
              >
                {saving ? <Loader2 size={16} className="e-spin" /> : <>Send invite & finish <Send size={15} strokeWidth={2} /></>}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="e-card" style={{ padding: 40, textAlign: "center" }}>
          <CheckCircle2 size={36} strokeWidth={1.5} color="var(--e-primary)" style={{ margin: "0 auto" }} />
          <h2 style={{ marginTop: 16, fontSize: 22, fontWeight: 600 }}>You're all set</h2>
          <p style={{ marginTop: 8, fontSize: 14, color: "var(--e-ink-mute)" }}>Taking you to your dashboard…</p>
        </div>
      )}

      <style>{`
        .e-spin { animation: e-spin 0.8s linear infinite; }
        @keyframes e-spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .e-wizard-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
