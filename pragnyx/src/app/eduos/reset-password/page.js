import { redirect } from "next/navigation";
import EduOSNavbar from "@/components/eduos/EduOSNavbar";
import EduOSFooter from "@/components/eduos/EduOSFooter";
import ResetPasswordForm from "@/components/eduos/ResetPasswordForm";
import { getCustomerSession } from "@/lib/eduos/session";

export const metadata = {
  title: "Set a new password — PragnyX EduOS",
  description: "Set a permanent password for your EduOS workspace.",
};

export default async function EduOSResetPasswordPage() {
  const session = await getCustomerSession();
  if (!session) redirect("/eduos/login");

  return (
    <>
      <EduOSNavbar />
      <main>
        <section style={{ padding: "70px 0 100px" }}>
          <div className="e-shell">
            <ResetPasswordForm />
          </div>
        </section>
      </main>
      <EduOSFooter />
    </>
  );
}
