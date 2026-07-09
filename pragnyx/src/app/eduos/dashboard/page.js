import EduOSNavbar from "@/components/eduos/EduOSNavbar";
import EduOSFooter from "@/components/eduos/EduOSFooter";
import DashboardShell from "@/components/eduos/DashboardShell";

export const metadata = {
  title: "Dashboard — PragnyX EduOS",
  description: "Manage your institution's subscription, modules, team, and support.",
};

export default async function EduOSDashboardPage({ searchParams }) {
  const params = await searchParams;
  const workspaceId = params?.workspace || "";

  return (
    <>
      <EduOSNavbar />
      <main>
        <section style={{ padding: "48px 0 90px" }}>
          <div className="e-shell">
            <DashboardShell workspaceId={workspaceId} />
          </div>
        </section>
      </main>
      <EduOSFooter />
    </>
  );
}
