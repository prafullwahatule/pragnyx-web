import EduOSNavbar from "@/components/eduos/EduOSNavbar";
import EduOSFooter from "@/components/eduos/EduOSFooter";
import LoginForm from "@/components/eduos/LoginForm";

export const metadata = {
  title: "Log in — PragnyX EduOS",
  description: "Log in to your institution's PragnyX EduOS workspace.",
  alternates: { canonical: "https://pragnyx.in/eduos/login" },
  // Functional auth page, not a marketing/content page — keep it out of
  // search results (see also src/app/robots.js and src/app/sitemap.js,
  // which exclude it from the sitemap for the same reason).
  robots: { index: false, follow: true },
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
