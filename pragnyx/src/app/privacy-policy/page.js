import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import LegalContent from "@/components/LegalContent";
import ContactTeaser from "@/components/ContactTeaser";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — PragnyX",
  description:
    "How PragnyX collects, uses, and protects your information across our products, services, and PragnyX Learning.",
};

const SECTIONS = [
  {
    heading: "1. Overview",
    body: [
      "This Privacy Policy explains how PragnyX (\"PragnyX\", \"we\", \"us\", or \"our\") collects, uses, discloses, and protects information when you visit our website, use our services — including Business Intelligence Solution, Software Solutions, Data Intelligence, and AI & Automation — or take part in PragnyX Learning.",
      "By using our website or services, you agree to the collection and use of information in line with this policy.",
    ],
  },
  {
    heading: "2. Information We Collect",
    body: [
      "We collect information you provide directly to us, information collected automatically when you use our website, and information we receive from third parties.",
    ],
    list: [
      "Contact details you submit through our forms — name, email, company, and message content.",
      "Newsletter sign-up information, such as your email address.",
      "Usage data, including pages visited, time spent, browser type, and device information.",
      "Information shared with us as part of a service engagement or client project.",
    ],
  },
  {
    heading: "3. How We Use Your Information",
    body: ["We use the information we collect to:"],
    list: [
      "Respond to enquiries submitted via our contact, newsletter, or learning request forms.",
      "Deliver and improve our services and website experience.",
      "Send occasional product or learning updates, where you have opted in.",
      "Maintain the security and proper functioning of our systems.",
      "Comply with legal obligations where applicable.",
    ],
  },
  {
    heading: "4. Cookies & Tracking",
    body: [
      "Our website may use cookies and similar technologies to understand how visitors use the site and to improve performance. You can control or disable cookies through your browser settings; doing so may affect some site functionality.",
    ],
  },
  {
    heading: "5. How We Share Information",
    body: [
      "We do not sell your personal information. We may share information with trusted service providers who help us operate our website and deliver our services, or where required by law.",
    ],
  },
  {
    heading: "6. Data Retention",
    body: [
      "We retain personal information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law.",
    ],
  },
  {
    heading: "7. Your Rights",
    body: [
      "Depending on your location, you may have rights to access, correct, or request deletion of your personal information. To exercise any of these rights, contact us using the details below.",
    ],
  },
  {
    heading: "8. Data Security",
    body: [
      "We take reasonable technical and organisational measures to protect your information against unauthorised access, alteration, disclosure, or destruction. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "9. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.",
    ],
  },
  {
    heading: "10. Contact Us",
    body: [
      "If you have any questions about this Privacy Policy or how we handle your information, reach us at hello.pragnyx@gmail.com.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description="How we collect, use, and protect your information across our website, services, and PragnyX Learning."
        />
        <LegalContent updated="June 23, 2026" sections={SECTIONS} />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
