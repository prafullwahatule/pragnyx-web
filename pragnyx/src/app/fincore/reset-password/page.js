import { redirect } from "next/navigation";
import FinCoreNavbar from "@/components/fincore/FinCoreNavbar";
import FinCoreFooter from "@/components/fincore/FinCoreFooter";
import ResetPasswordForm from "@/components/fincore/ResetPasswordForm";
import { getCustomerSession } from "@/lib/fincore/session";

export const metadata = {
  title: "Set a new password — PragnyX FinCore",
  description: "Set a permanent password for your FinCore workspace.",
};

export default async function FinCoreResetPasswordPage() {
  const session = await getCustomerSession();
  if (!session) redirect("/fincore/login");

  return (
    <>
      <FinCoreNavbar />
      <main>
        <section style={{ padding: "70px 0 100px" }}>
          <div className="e-shell">
            <ResetPasswordForm />
          </div>
        </section>
      </main>
      <FinCoreFooter />
    </>
  );
}
