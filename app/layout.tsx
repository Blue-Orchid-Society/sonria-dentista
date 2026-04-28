import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sonriadentista.com"),
  title: {
    default: "Sonria Dentistry of Arlington | Your Community Dentist",
    template: "%s | Sonria Dentistry",
  },
  description:
    "Personalized, convenient & affordable dental care for the whole family in Arlington, TX. Dr. Deepti Namineni and team. Bilingual English/Spanish.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">{children}</body>
    </html>
  );
}
