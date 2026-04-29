import Link from "next/link";
import type { Metadata } from "next";
import { getSite, type Locale } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  return {
    title: site.faq.heading,
    description: site.faq.subheading,
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as Locale);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-soft via-background to-terracotta-soft/40">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 text-center">
          <h1 className="font-display text-4xl md:text-6xl tracking-tight text-foreground">
            {site.faq.heading}
          </h1>
          <p className="mt-5 text-lg text-muted leading-relaxed">{site.faq.subheading}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <div className="divide-y divide-border-soft border-y border-border-soft">
          {site.faq.items.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-6 text-left">
                <span className="font-display text-lg text-foreground">{f.q}</span>
                <span className="text-terracotta text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-base text-muted leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">{site.contactCTA.heading}</h2>
            <p className="mt-2 text-sm text-background/70 max-w-md">{site.contactCTA.bilingualNote}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.contact.phoneHref}
              className="rounded-full bg-terracotta px-6 py-3 text-white text-sm font-semibold hover:bg-terracotta-deep transition shadow-warm"
            >
              {site.contact.phone}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-background/30 px-6 py-3 text-background text-sm font-semibold hover:bg-background hover:text-foreground transition"
            >
              {site.nav.book}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
