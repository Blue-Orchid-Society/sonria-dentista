import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fontDisplay = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const fontSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

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
    <html className={`${fontSans.variable} ${fontDisplay.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground-soft">{children}</body>
    </html>
  );
}
