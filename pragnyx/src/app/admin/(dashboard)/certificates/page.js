import { getAllCertificates } from "@/lib/repo/certificates";
import CertificatesManager from "@/components/admin/CertificatesManager";

export default async function AdminCertificatesPage() {
  const certificates = await getAllCertificates();
  return <CertificatesManager initialItems={certificates} />;
}
