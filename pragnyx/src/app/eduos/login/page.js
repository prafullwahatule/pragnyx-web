import EduOSNavbar from "@/components/eduos/EduOSNavbar";
import EduOSFooter from "@/components/eduos/EduOSFooter";
import LoginForm from "@/components/eduos/LoginForm";

export const metadata = {
  title: "Log in — PragnyX EduOS",
  description: "Log in to your institution's PragnyX EduOS workspace.",
};

export default async function EduOSLoginPage({ searchParams }) {
  const params = await searchParams;
  const initialWorkspace = params?.workspace || "";

  return (
    <>
      <EduOSNavbar />
      <main>
        <section className="e-dot-grid" style={{ padding: "72px 0 90px" }}>
          <div className="e-shell">
            <LoginForm initialWorkspace={initialWorkspace} />
          </div>
        </section>
      </main>
      <EduOSFooter />
    </>
  );
}
