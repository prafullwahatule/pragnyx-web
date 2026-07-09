import FinCoreNavbar from "@/components/fincore/FinCoreNavbar";
import FinCoreFooter from "@/components/fincore/FinCoreFooter";
import DashboardShell from "@/components/fincore/DashboardShell";

export const metadata = {
  title: "Dashboard — PragnyX FinCore",
  description: "Manage your company's subscription, modules, team, and support.",
};

export default async function FinCoreDashboardPage({ searchParams }) {
  const params = await searchParams;
  const workspaceId = params?.workspace || "";

  return (
    <>
      <FinCoreNavbar />
      <main>
        <section style={{ padding: "48px 0 90px" }}>
          <div className="e-shell">
            <DashboardShell workspaceId={workspaceId} />
          </div>
        </section>
      </main>
      <FinCoreFooter />
    </>
  );
}
