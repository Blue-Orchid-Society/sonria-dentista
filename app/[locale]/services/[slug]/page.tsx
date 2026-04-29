import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSite, type Locale } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const en = await getSite("en");
  return (["en", "es"] as const).flatMap((locale) =>
    en.services.list.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const site = await getSite(locale as Locale);
  const service = site.services.list.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.seoTitle ?? service.name,
    description: service.seoDescription ?? service.blurb,
    alternates: {
      canonical: `https://sonriadentista.com/${locale}/services/${slug}`,
      languages: {
        en: `https://sonriadentista.com/en/services/${slug}`,
        es: `https://sonriadentista.com/es/services/${slug}`,
      },
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const site = await getSite(locale as Locale);
  const service = site.services.list.find((s) => s.slug === slug);
  if (!service) notFound();

  const isEs = locale === "es";
  const labels = {
    whatIsIt: isEs ? "Que es?" : "What is it?",
    fourSteps: isEs ? "Como funciona en 4 pasos" : "How it works in 4 steps",
    benefits: isEs ? "Beneficios" : "Benefits",
    whyChoose: isEs ? "Por que Sonria?" : "Why Sonria?",
    faqs: isEs ? "Preguntas frecuentes" : "Frequently asked questions",
    cta: isEs ? "Reservar consulta" : "Book a visit",
    available: isEs ? "Disponible en" : "Available at",
    relatedServices: isEs ? "Otros servicios" : "Other services",
    backToServices: isEs ? "Todos los servicios" : "All services",
  };

  const offeredAt = site.locations.list.filter((l) =>
    l.servicesOffered?.includes(service.slug),
  );
  const otherServices = site.services.list.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-soft via-background to-terracotta-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <Link
            href={`/${locale}#services`}
            className="text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground transition"
          >
            {labels.backToServices}
          </Link>
          <h1 className="mt-4 font-display text-4xl md:text-6xl tracking-tight text-foreground max-w-3xl">
            {service.name}
          </h1>
          <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">
            {service.longBlurb ?? service.blurb}
          </p>
          {service.price && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2 text-white text-sm font-semibold shadow-warm">
              {service.price}
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-foreground px-6 py-3 text-background text-sm font-semibold hover:bg-terracotta transition"
            >
              {labels.cta}
            </Link>
            <a
              href={site.contact.phoneHref}
              className="rounded-full border border-border-soft bg-card px-6 py-3 text-foreground text-sm font-semibold hover:border-terracotta hover:text-terracotta transition"
            >
              {site.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {service.whatIsIt && (
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
              {labels.whatIsIt}
            </h2>
            <p className="text-lg text-muted leading-relaxed">{service.whatIsIt}</p>
          </div>
        </section>
      )}

      {service.fourSteps && (
        <section className="bg-card border-y border-border-soft">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
              {labels.fourSteps}
            </h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.fourSteps.map((step, i) => (
                <li key={i} className="rounded-2xl bg-background border border-border-soft p-6">
                  <div className="grid place-items-center w-9 h-9 rounded-full bg-terracotta text-white font-display text-base">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-xl text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {service.benefits && (
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
                {labels.benefits}
              </h2>
              <ul className="mt-6 space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-base text-muted leading-relaxed">
                    <span className="text-sage mt-1">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            {service.whyChoose && (
              <div className="rounded-2xl bg-sage-soft/50 border border-sage/20 p-8">
                <h2 className="font-display text-2xl tracking-tight text-foreground">
                  {labels.whyChoose}
                </h2>
                <p className="mt-4 text-base text-muted leading-relaxed">{service.whyChoose}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {offeredAt.length > 0 && (
        <section className="bg-card border-y border-border-soft">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
              {labels.available}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {offeredAt.map((l) => (
                <Link
                  key={l.slug}
                  href={`/${locale}/locations/${l.slug}`}
                  className="rounded-2xl bg-background border border-border-soft p-5 hover:border-terracotta transition"
                >
                  <div className="font-display text-xl text-foreground">{l.city}</div>
                  <p className="mt-2 text-sm text-muted">{l.address}</p>
                  <p className="mt-3 text-xs uppercase tracking-wider text-terracotta">{l.phone}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.faqs && (
        <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground text-center">
            {labels.faqs}
          </h2>
          <div className="mt-10 divide-y divide-border-soft border-y border-border-soft">
            {service.faqs.map((f, i) => (
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
      )}

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
              {labels.cta}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">
          {labels.relatedServices}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {otherServices.slice(0, 3).map((s) => (
            <Link
              key={s.slug}
              href={`/${locale}/services/${s.slug}`}
              className="rounded-2xl bg-card border border-border-soft p-6 hover:border-terracotta transition"
            >
              <h3 className="font-display text-xl text-foreground">{s.name}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
