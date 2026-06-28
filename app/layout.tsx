import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@/components/Analytics";
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
  const searchConsoleToken = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return (
    <html className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      {searchConsoleToken && (
        <head>
          <meta name="google-site-verification" content={searchConsoleToken} />
        </head>
      )}
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
