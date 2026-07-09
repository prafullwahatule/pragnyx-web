import "@fontsource-variable/sora";
import "@fontsource-variable/inter";
import "./fincore.css";
import ThemeProvider from "@/components/fincore/ThemeProvider";

export const metadata = {
  title: "PragnyX FinCore — The AI Financial Operating System for Modern Businesses",
  description:
    "Manage accounting, GST, invoicing, inventory, banking, payroll, compliance and business finance from one intelligent cloud platform.",
  openGraph: {
    title: "PragnyX FinCore — The AI Financial Operating System for Modern Businesses",
    description:
      "Replace disconnected legacy accounting tools with one modern system — real-time dashboards, GST-ready accounting, and an AI Copilot for SMEs, CAs, and enterprises.",
    url: "https://pragnyx.in/fincore",
    siteName: "PragnyX FinCore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PragnyX FinCore — The AI Financial Operating System for Modern Businesses",
    description: "One platform. Every financial workflow. Accounting to compliance.",
  },
};

export default function FinCoreLayout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
