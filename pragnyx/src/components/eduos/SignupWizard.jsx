"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ArrowLeft, Loader2, CheckCircle2, AlertTriangle, Copy } from "lucide-react";
import { PLANS, formatPrice, getPlan } from "@/lib/eduos/plans";

const INSTITUTION_TYPES = ["School", "College", "University", "Coaching Institute", "Multi-campus Institution"];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function SignupWizard({ initialPlan }) {
  const [step, setStep] = useState(initialPlan ? "details" : "plan");
  const [planId, setPlanId] = useState(initialPlan || "professional");
  const [institution, setInstitution] = useState({
    name: "", type: "", contactPerson: "", email: "", phone: "", students: "", staff: "", address: "",
  });
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [workspace, setWorkspace] = useState(null);
  const [demoSent, setDemoSent] = useState(false);

  const plan = getPlan(planId);

  const update = (field) => (e) => setInstitution((v) => ({ ...v, [field]: e.target.value }));

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

  async function handleDetailsSubmit(e) {
    e.preventDefault();
    if (!validateDetails()) return;

    if (!plan.selfServe) {
      // Enterprise: sales-assisted, no payment — submit as a demo request.
      setPaying(true);
      try {
        await fetch("/api/eduos/demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: institution.contactPerson,
            institution: institution.name,
            email: institution.email,
            phone: institution.phone,
            institutionSize: `${institution.students || "?"} students`,
            message: `Enterprise plan interest via signup flow. Type: ${institution.type}. Staff: ${institution.staff}. Address: ${institution.address}`,
          }),
        });
        setDemoSent(true);
        setStep("success");
      } finally {
        setPaying(false);
      }
      return;
    }

    setStep("payment");
  }

  async function startPayment() {
    setPaying(true);
    setPayError("");
    try {
      const orderRes = await fetch("/api/eduos/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, institution }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        setPayError(orderData.error || "Could not start checkout.");
        setPaying(false);
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setPayError("Could not load the payment gateway. Check your connection and try again.");
        setPaying(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PragnyX EduOS",
        description: `${orderData.plan.name} plan subscription`,
        order_id: orderData.orderId,
        prefill: {
          name: institution.contactPerson,
          email: institution.email,
          contact: institution.phone,
        },
        theme: { color: "#4640D6" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/eduos/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId,
                institution,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              setPayError(verifyData.error || "Payment verification failed.");
              setPaying(false);
              return;
            }
            setWorkspace(verifyData.workspace);
            setStep("success");
          } catch {
            setPayError("Payment succeeded but confirmation failed. Contact support@pragnyx.in.");
          } finally {
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });
      rzp.on("payment.failed", (resp) => {
        setPayError(resp?.error?.description || "Payment failed. Please try again.");
        setPaying(false);
      });
      rzp.open();
    } catch {
      setPayError("Something went wrong starting checkout.");
      setPaying(false);
    }
  }

  const steps = ["plan", "details", plan.selfServe ? "payment" : null, "success"].filter(Boolean);
  const stepIndex = steps.indexOf(step);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {step !== "success" && (
        <div style={{ display: "flex", gap: 8, marginBottom: 40, justifyContent: "center" }}>
          {steps.slice(0, -1).map((s, i) => (
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

      {step === "plan" && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600, textAlign: "center" }}>Choose your plan</h2>
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="e-wizard-plans">
            {PLANS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlanId(p.id)}
                className="e-card"
                style={{
                  padding: 20,
                  textAlign: "left",
                  cursor: "pointer",
                  border: p.id === planId ? "1.5px solid var(--e-primary)" : "1px solid var(--e-border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</span>
                  {p.id === planId && <Check size={16} strokeWidth={2.5} color="var(--e-primary)" />}
                </div>
                <div style={{ marginTop: 8, fontFamily: "var(--e-font-display)", fontSize: 20, fontWeight: 600 }}>{formatPrice(p)}</div>
                <div style={{ fontSize: 12, color: "var(--e-ink-faint)" }}>{p.selfServe ? "/ month" : "Book a demo"}</div>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 28, textAlign: "center" }}>
            <button onClick={() => setStep("details")} className="e-btn e-btn-primary">
              Continue <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {step === "details" && (
        <form onSubmit={handleDetailsSubmit} className="e-card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>Institution details</h2>
            <span style={{ fontSize: 12.5, color: "var(--e-ink-faint)" }}>Plan: {plan.name}</span>
          </div>

          <div className="e-field">
            <label className="e-label" htmlFor="i-name">Institution name</label>
            <input id="i-name" className="e-input" value={institution.name} onChange={update("name")} />
            {errors.name && <span className="e-error">{errors.name}</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="e-wizard-2col">
            <div className="e-field">
              <label className="e-label" htmlFor="i-type">Institution type</label>
              <select id="i-type" className="e-select" value={institution.type} onChange={update("type")}>
                <option value="" disabled>Select one</option>
                {INSTITUTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.type && <span className="e-error">{errors.type}</span>}
            </div>
            <div className="e-field">
              <label className="e-label" htmlFor="i-contact">Contact person</label>
              <input id="i-contact" className="e-input" value={institution.contactPerson} onChange={update("contactPerson")} />
              {errors.contactPerson && <span className="e-error">{errors.contactPerson}</span>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="e-wizard-2col">
            <div className="e-field">
              <label className="e-label" htmlFor="i-email">Email</label>
              <input id="i-email" type="email" className="e-input" value={institution.email} onChange={update("email")} />
              {errors.email && <span className="e-error">{errors.email}</span>}
            </div>
            <div className="e-field">
              <label className="e-label" htmlFor="i-phone">Phone</label>
              <input id="i-phone" className="e-input" value={institution.phone} onChange={update("phone")} />
              {errors.phone && <span className="e-error">{errors.phone}</span>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="e-wizard-2col">
            <div className="e-field">
              <label className="e-label" htmlFor="i-students">Number of students</label>
              <input id="i-students" type="number" min="0" className="e-input" value={institution.students} onChange={update("students")} />
            </div>
            <div className="e-field">
              <label className="e-label" htmlFor="i-staff">Number of staff</label>
              <input id="i-staff" type="number" min="0" className="e-input" value={institution.staff} onChange={update("staff")} />
            </div>
          </div>

          <div className="e-field">
            <label className="e-label" htmlFor="i-address">Address</label>
            <textarea id="i-address" className="e-textarea" rows={2} value={institution.address} onChange={update("address")} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <button type="button" onClick={() => setStep("plan")} className="e-btn e-btn-ghost">
              <ArrowLeft size={16} strokeWidth={2} /> Back
            </button>
            <button type="submit" className="e-btn e-btn-primary" disabled={paying}>
              {paying ? <Loader2 size={16} className="e-spin" /> : plan.selfServe ? "Continue to payment" : "Request Enterprise demo"}
              {!paying && <ArrowRight size={16} strokeWidth={2} />}
            </button>
          </div>
        </form>
      )}

      {step === "payment" && (
        <div className="e-card" style={{ padding: 36, textAlign: "center" }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Confirm & pay</h2>
          <p style={{ marginTop: 8, fontSize: 14, color: "var(--e-ink-mute)" }}>
            {institution.name} — {plan.name} plan
          </p>
          <div style={{ marginTop: 20, fontFamily: "var(--e-font-display)", fontSize: 34, fontWeight: 600 }}>
            {formatPrice(plan)} <span style={{ fontSize: 14, color: "var(--e-ink-faint)", fontFamily: "var(--e-font-body)" }}>/ month</span>
          </div>
          <p style={{ marginTop: 6, fontSize: 12, color: "var(--e-ink-faint)" }}>Secure checkout via Razorpay</p>

          {payError && (
            <div style={{ marginTop: 20, padding: "12px 16px", borderRadius: 10, background: "rgba(214, 69, 92, 0.1)", color: "#d6455c", fontSize: 13, display: "flex", gap: 8, alignItems: "flex-start", textAlign: "left" }}>
              <AlertTriangle size={16} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{payError}</span>
            </div>
          )}

          <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 12 }}>
            <button onClick={() => setStep("details")} className="e-btn e-btn-ghost">
              <ArrowLeft size={16} strokeWidth={2} /> Back
            </button>
            <button onClick={startPayment} className="e-btn e-btn-primary" disabled={paying}>
              {paying ? <Loader2 size={16} className="e-spin" /> : `Pay ${formatPrice(plan)}`}
            </button>
          </div>
        </div>
      )}

      {step === "success" && (
        <SuccessPanel workspace={workspace} demoSent={demoSent} plan={plan} institution={institution} />
      )}

      <style>{`
        .e-spin { animation: e-spin 0.8s linear infinite; }
        @keyframes e-spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .e-wizard-plans { grid-template-columns: 1fr !important; }
          .e-wizard-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function SuccessPanel({ workspace, demoSent, plan, institution }) {
  const [copied, setCopied] = useState(false);

  if (demoSent) {
    return (
      <div className="e-card" style={{ padding: 40, textAlign: "center" }}>
        <CheckCircle2 size={36} strokeWidth={1.5} color="var(--e-primary)" style={{ margin: "0 auto" }} />
        <h2 style={{ marginTop: 16, fontSize: 22, fontWeight: 600 }}>Request received</h2>
        <p style={{ marginTop: 10, fontSize: 14.5, color: "var(--e-ink-mute)", maxWidth: 420, margin: "10px auto 0" }}>
          Our team will reach out to {institution.email} within one business day to scope your Enterprise rollout.
        </p>
        <Link href="/eduos" className="e-btn e-btn-ghost" style={{ marginTop: 24, display: "inline-flex" }}>
          Back to EduOS
        </Link>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="e-card" style={{ padding: 40, textAlign: "center" }}>
        <AlertTriangle size={32} strokeWidth={1.5} color="var(--e-accent)" style={{ margin: "0 auto" }} />
        <p style={{ marginTop: 14, fontSize: 14.5, color: "var(--e-ink-mute)" }}>
          No workspace data to show yet.
        </p>
      </div>
    );
  }

  const copyCreds = () => {
    navigator.clipboard.writeText(
      `Workspace: ${workspace.workspaceUrl}\nAdmin email: ${workspace.admin.email}\nTemporary password: ${workspace.admin.tempPassword}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="e-card" style={{ padding: 36 }}>
      <div style={{ textAlign: "center" }}>
        <CheckCircle2 size={36} strokeWidth={1.5} color="var(--e-primary)" style={{ margin: "0 auto" }} />
        <h2 style={{ marginTop: 16, fontSize: 22, fontWeight: 600 }}>Workspace created</h2>
        <p style={{ marginTop: 8, fontSize: 14, color: "var(--e-ink-mute)" }}>
          {institution.name} is live on the {plan.name} plan. Credentials below have also been emailed to {workspace.admin.email}.
        </p>
      </div>

      <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }} className="e-wizard-2col">
        {[
          ["Workspace URL", workspace.workspaceUrl],
          ["Institution ID", workspace.institutionId],
          ["License ID", workspace.licenseId],
          ["Tenant ID", workspace.tenantId],
          ["Admin email", workspace.admin.email],
          ["Temporary password", workspace.admin.tempPassword],
        ].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: 11.5, color: "var(--e-ink-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
            <div style={{ marginTop: 3, fontSize: 14, fontWeight: 600, wordBreak: "break-all" }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={copyCreds} className="e-btn e-btn-ghost">
          <Copy size={15} strokeWidth={2} /> {copied ? "Copied" : "Copy credentials"}
        </button>
        <Link href={`/eduos/login?workspace=${encodeURIComponent(workspace.institutionId)}`} className="e-btn e-btn-primary">
          Log in now <ArrowRight size={16} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
