"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "../Reveal";

const SIZES = ["Under 500 students", "500–2,000 students", "2,000–10,000 students", "10,000+ students"];

export default function DemoForm() {
  const [values, setValues] = useState({ name: "", institution: "", email: "", phone: "", institutionSize: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    try {
      const res = await fetch("/api/eduos/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || { form: data.error || "Something went wrong." });
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setErrors({ form: "Network error — please try again." });
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="e-card" style={{ padding: 40, textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
        <CheckCircle2 size={36} strokeWidth={1.5} color="var(--e-primary)" style={{ margin: "0 auto" }} />
        <h3 style={{ marginTop: 16, fontSize: 20, fontWeight: 600 }}>Demo request received</h3>
        <p style={{ marginTop: 8, fontSize: 14.5, color: "var(--e-ink-mute)" }}>Our team will reach out within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="e-card" style={{ padding: 32, maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="e-field">
        <label className="e-label" htmlFor="d-name">Name</label>
        <input id="d-name" className="e-input" value={values.name} onChange={update("name")} required />
        {errors.name && <span className="e-error">{errors.name}</span>}
      </div>
      <div className="e-field">
        <label className="e-label" htmlFor="d-institution">Institution</label>
        <input id="d-institution" className="e-input" value={values.institution} onChange={update("institution")} required />
        {errors.institution && <span className="e-error">{errors.institution}</span>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="e-field">
          <label className="e-label" htmlFor="d-email">Email</label>
          <input id="d-email" type="email" className="e-input" value={values.email} onChange={update("email")} required />
          {errors.email && <span className="e-error">{errors.email}</span>}
        </div>
        <div className="e-field">
          <label className="e-label" htmlFor="d-phone">Phone</label>
          <input id="d-phone" className="e-input" value={values.phone} onChange={update("phone")} required />
          {errors.phone && <span className="e-error">{errors.phone}</span>}
        </div>
      </div>
      <div className="e-field">
        <label className="e-label" htmlFor="d-size">Institution size</label>
        <select id="d-size" className="e-select" value={values.institutionSize} onChange={update("institutionSize")} required>
          <option value="" disabled>Select one</option>
          {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.institutionSize && <span className="e-error">{errors.institutionSize}</span>}
      </div>
      <div className="e-field">
        <label className="e-label" htmlFor="d-message">Message (optional)</label>
        <textarea id="d-message" className="e-textarea" rows={3} value={values.message} onChange={update("message")} />
      </div>
      {errors.form && <span className="e-error">{errors.form}</span>}
      <button type="submit" className="e-btn e-btn-primary e-btn-block" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "See PragnyX EduOS in action"}
        {status !== "submitting" && <ArrowRight size={16} strokeWidth={2} />}
      </button>
    </form>
  );
}
