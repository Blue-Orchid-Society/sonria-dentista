import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

const VALID = new Set(["en", "es"]);

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!VALID.has(locale)) notFound();

  return (
    <>
      <Header locale={locale as "en" | "es"} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as "en" | "es"} />
    </>
  );
}
