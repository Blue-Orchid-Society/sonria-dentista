import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sonriadentista.com"),
  title: {
    default: "Bilingual Dentist in Arlington TX | Sonria Dentista",
    template: "%s | Sonria Dentista",
  },
  description:
    "Bilingual family dental care led by Dr. Deepti Namineni. Implants, orthodontics, same-day visits across Arlington, Grand Prairie, Paris, and Commerce. 1,500+ 5-star reviews.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
