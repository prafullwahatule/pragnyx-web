import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import LegalContent from "@/components/LegalContent";
import ContactTeaser from "@/components/ContactTeaser";
import Footer from "@/components/Footer";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Terms & Conditions — PragnyX",
  description:
    "The terms that govern your use of the PragnyX website, services, and PragnyX Learning.",
};

const SECTIONS = [
  {
    heading: "1. Agreement to Terms",
    body: [
      "These Terms & Conditions (\"Terms\") govern your access to and use of the PragnyX website and services, including Business Intelligence Solution, Software Solutions, Data Intelligence, AI & Automation, and PragnyX Learning. By accessing our website or engaging our services, you agree to be bound by these Terms.",
    ],
  },
  {
    heading: "2. Our Services",
    body: [
      "PragnyX provides custom software, data, business intelligence, and AI & automation services, alongside 1:1 mentorship through PragnyX Learning. Specific deliverables, timelines, and pricing for any engagement are agreed separately in a proposal, statement of work, or service agreement between PragnyX and the client.",
    ],
  },
  {
    heading: "3. Use of Our Website",
    body: [
      "You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, or restrict or inhibit the use of, this website by anyone else.",
    ],
    list: [
      "You will not attempt to gain unauthorised access to any part of our systems.",
      "You will not use the website to transmit harmful code or disruptive content.",
      "You will not misrepresent your identity when submitting forms or enquiries.",
    ],
  },
  {
    heading: "4. Intellectual Property",
    body: [
      "All content on this website — including text, graphics, logos, and the PragnyX name and marks — is owned by or licensed to PragnyX and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our prior written consent.",
      "For client engagements, ownership of deliverables (such as custom software or reports) is defined in the relevant service agreement.",
    ],
  },
  {
    heading: "5. PragnyX Learning",
    body: [
      "PragnyX Learning provides 1:1 mentorship sessions booked on a pay-as-you-go or subscription basis, as described on the Learning page. Session availability depends on mentor scheduling, and specific cancellation or rescheduling terms will be communicated at the time of booking.",
    ],
  },
  {
    heading: "6. Payments",
    body: [
      "Fees for services or learning sessions are as agreed at the time of purchase or in a signed proposal. Unless otherwise stated, fees are non-refundable once a session or project phase has commenced.",
    ],
  },
  {
    heading: "7. Limitation of Liability",
    body: [
      "PragnyX provides its website and general information on an \"as is\" basis. To the fullest extent permitted by law, PragnyX is not liable for any indirect, incidental, or consequential damages arising from your use of the website. Liability relating to specific service engagements is governed by the relevant service agreement.",
    ],
  },
  {
    heading: "8. Third-Party Links",
    body: [
      "Our website may contain links to third-party sites. We are not responsible for the content, accuracy, or practices of any linked third-party website.",
    ],
  },
  {
    heading: "9. Changes to These Terms",
    body: [
      "We may update these Terms from time to time. Continued use of our website or services after changes are posted constitutes acceptance of the revised Terms.",
    ],
  },
  {
    heading: "10. Contact Us",
    body: [
      "If you have any questions about these Terms, reach us at hello.pragnyx@gmail.com.",
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Legal"
          title="Terms & Conditions"
          description="The terms that govern your use of our website, services, and PragnyX Learning."
        />
        <LegalContent updated="June 23, 2026" sections={SECTIONS} />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
