import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://pragnyx.in"),
  title: {
    default: "PragnyX — Wisdom for the Next Frontier",
    template: "%s",
  },
  description:
    "PragnyX is a future-focused brand dedicated to innovation, creativity and intelligent thinking. We challenge boundaries, explore new possibilities and build a world driven by ideas that create lasting impact. At PragnyX, the future is not predicted — it is engineered.",
  icons: {
    icon: "/logo/favicon-32.png",
    apple: "/logo/favicon-180.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-void text-paper selection:bg-fuchsia-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
