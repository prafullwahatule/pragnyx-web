"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error — try again.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-void px-6 relative overflow-hidden">
      <div className="absolute inset-0 bp-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[24rem] w-[24rem] rounded-full bg-blue/15 blur-[120px] animate-drift" />
      <div
        className="absolute -bottom-32 -right-20 h-[22rem] w-[22rem] rounded-full bg-violet/15 blur-[120px] animate-drift"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo/pragnyx-wordmark.png"
            alt="PragnyX"
            width={1173}
            height={281}
            className="h-7 w-auto mb-6"
          />
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
            Admin panel
          </span>
        </div>

        <form onSubmit={handleSubmit} className="gradient-border cut">
          <div className="cut bg-surface px-8 py-9">
            <div className="flex items-center gap-3 mb-7">
              <span className="cut-sm w-10 h-10 flex items-center justify-center bg-blue/15 text-blue shrink-0">
                <Lock size={16} strokeWidth={1.75} />
              </span>
              <h1 className="font-display text-lg font-medium tracking-tight">Sign in</h1>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="username"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-3 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors"
                  placeholder="you@pragnyx.in"
                />
              </div>
              <div>
                <label htmlFor="password" className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-3 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="mt-4 text-xs text-rose-400">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-7 w-full inline-flex items-center justify-center gap-2 cut bg-gradient-to-r from-blue to-violet px-6 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {status === "loading" ? "Signing in…" : "Sign in"}
              {status === "loading" ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <ArrowUpRight size={15} strokeWidth={1.75} />
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-mute">
          First time signing in? Use the ADMIN_EMAIL / ADMIN_PASSWORD you set
          in your environment variables.
        </p>
      </div>
    </main>
  );
}
