import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sonriadentista.com"),
  title: {
    default: "Sonria Dentista | Bilingual family dental care in North Texas",
    template: "%s | Sonria Dentista",
  },
  description:
    "Bilingual dental care for the whole family. Dr. Sandeep Namineni and team across Arlington, Commerce, Paris, and Grand Prairie. Honest pricing, same-day care.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
