import "@fontsource-variable/sora";
import "./eduos.css";
import ThemeProvider from "@/components/eduos/ThemeProvider";

export const metadata = {
  title: "PragnyX EduOS — The AI Operating System for Modern Educational Institutions",
  description:
    "One intelligent platform to manage admissions, academics, finance, communication, HR, placements, and every institutional workflow from a single system.",
  openGraph: {
    title: "PragnyX EduOS — The AI Operating System for Modern Educational Institutions",
    description:
      "Replace disconnected legacy ERPs with one modern system — real-time dashboards, role-based portals, and no-code builders for schools, colleges and universities.",
    url: "https://pragnyx.in/eduos",
    siteName: "PragnyX EduOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PragnyX EduOS — The AI Operating System for Modern Educational Institutions",
    description: "One platform. Every department. Admissions to alumni.",
  },
};

export default function EduOSLayout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
