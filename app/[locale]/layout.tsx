import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

const VALID = new Set(["en", "es"]);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!VALID.has(locale)) return {};
  const isEs = locale === "es";
  return {
    title: {
      default: isEs
        ? "Dentista bilingüe en Arlington TX | Sonria Dentista"
        : "Bilingual Dentist in Arlington TX | Sonria Dentista",
      template: "%s | Sonria Dentista",
    },
    description: isEs
      ? "Cuidado dental familiar bilingüe con la Dra. Deepti Namineni. Implantes, ortodoncia, citas el mismo día. Arlington, Grand Prairie, Paris y Commerce. 1,500+ reseñas 5★."
      : "Bilingual family dental care led by Dr. Deepti Namineni. Implants, orthodontics, same-day visits across Arlington, Grand Prairie, Paris, and Commerce. 1,500+ 5-star reviews.",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en-US": "/en",
        "es-MX": "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isEs ? "es_MX" : "en_US",
      siteName: "Sonria Dentista",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!VALID.has(locale)) notFound();
  const typedLocale = locale as "en" | "es";

  return (
    <>
      <LocalBusinessSchema locale={typedLocale} />
      <Header locale={typedLocale} />
      <main className="flex-1">{children}</main>
      <Footer locale={typedLocale} />
    </>
  );
}
