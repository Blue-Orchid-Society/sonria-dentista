import Link from "next/link";
import type { Metadata } from "next";
import { getSite, type Locale } from "@/lib/content";
import { ContactForm } from "@/components/sections/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  return {
    title: site.contactPage.heading,
    description: site.contactPage.subheading,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  const isEs = locale === "es";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-soft via-background to-terracotta-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h1 className="font-display text-4xl md:text-6xl tracking-tight text-foreground">
            {site.contactPage.heading}
          </h1>
          <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">
            {site.contactPage.subheading}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm
            locale={locale as Locale}
            labels={site.contactPage.formLabels}
            locations={site.locations.list.map((l) => ({ slug: l.slug, city: l.city }))}
            services={site.services.list.map((s) => ({ slug: s.slug, name: s.name }))}
          />
          <aside className="space-y-6">
            <div className="rounded-2xl bg-card border border-border-soft p-6">
              <div className="text-xs uppercase tracking-wider text-terracotta font-semibold">
                {isEs ? "Llamanos" : "Call us"}
              </div>
              <a
                href={site.contact.phoneHref}
                className="mt-2 block font-display text-2xl text-foreground hover:text-terracotta transition"
              >
                {site.contact.phone}
              </a>
              <p className="mt-3 text-sm text-muted leading-relaxed">{site.contactCTA.bilingualNote}</p>
            </div>
            <div className="rounded-2xl bg-card border border-border-soft p-6">
              <div className="text-xs uppercase tracking-wider text-terracotta font-semibold">
                {isEs ? "Correo" : "Email"}
              </div>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-2 block text-base text-foreground hover:text-terracotta transition break-all"
              >
                {site.contact.email}
              </a>
            </div>
            <div className="rounded-2xl bg-card border border-border-soft p-6">
              <div className="text-xs uppercase tracking-wider text-terracotta font-semibold">
                {isEs ? "Horario" : "Hours"}
              </div>
              <ul className="mt-2 space-y-1 text-sm text-foreground">
                {site.contact.hours.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-card border-y border-border-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
            {site.locations.heading}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {site.locations.list.map((l) => (
              <Link
                key={l.slug}
                href={`/${locale}/locations/${l.slug}`}
                className="rounded-2xl bg-background border border-border-soft p-6 hover:border-terracotta transition"
              >
                <div className="font-display text-xl text-foreground">{l.city}</div>
                <p className="mt-2 text-sm text-muted leading-relaxed">{l.address}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-terracotta">{l.phone}</p>
                <p className="mt-1 text-xs text-muted-2">{l.hours}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
