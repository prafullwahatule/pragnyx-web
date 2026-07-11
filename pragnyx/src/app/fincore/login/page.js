import FinCoreNavbar from "@/components/fincore/FinCoreNavbar";
import FinCoreFooter from "@/components/fincore/FinCoreFooter";
import LoginForm from "@/components/fincore/LoginForm";

export const metadata = {
  title: "Log in — PragnyX FinCore",
  description: "Log in to your company's PragnyX FinCore workspace.",
  alternates: { canonical: "https://pragnyx.in/fincore/login" },
  // Functional auth page, not a marketing/content page — keep it out of
  // search results (see also src/app/robots.js and src/app/sitemap.js,
  // which exclude it from the sitemap for the same reason).
  robots: { index: false, follow: true },
};

export default async function FinCoreLoginPage({ searchParams }) {
  const params = await searchParams;
  const initialWorkspace = params?.workspace || "";

  return (
    <>
      <FinCoreNavbar />
      <main>
        <section className="e-dot-grid" style={{ padding: "72px 0 90px" }}>
          <div className="e-shell">
            <LoginForm initialWorkspace={initialWorkspace} />
          </div>
        </section>
      </main>
      <FinCoreFooter />
    </>
  );
}
