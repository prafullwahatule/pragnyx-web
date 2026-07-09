import FinCoreNavbar from "@/components/fincore/FinCoreNavbar";
import FinCoreFooter from "@/components/fincore/FinCoreFooter";
import LoginForm from "@/components/fincore/LoginForm";

export const metadata = {
  title: "Log in — PragnyX FinCore",
  description: "Log in to your company's PragnyX FinCore workspace.",
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
