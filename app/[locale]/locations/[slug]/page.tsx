import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSite, type Locale } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const en = await getSite("en");
  return (["en", "es"] as const).flatMap((locale) =>
    en.locations.list.map((l) => ({ locale, slug: l.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const site = await getSite(locale as Locale);
  const loc = site.locations.list.find((l) => l.slug === slug);
  if (!loc) return {};
  return {
    title: loc.seoTitle ?? `${loc.city} | ${site.name}`,
    description: loc.seoDescription ?? loc.longBlurb ?? loc.address,
    alternates: {
      canonical: `https://sonriadentista.com/${locale}/locations/${slug}`,
      languages: {
        en: `https://sonriadentista.com/en/locations/${slug}`,
        es: `https://sonriadentista.com/es/locations/${slug}`,
      },
    },
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const site = await getSite(locale as Locale);
  const loc = site.locations.list.find((l) => l.slug === slug);
  if (!loc) notFound();

  const isEs = locale === "es";
  const labels = {
    title: isEs
      ? `Dentista en ${loc.city}, ${loc.state ?? "TX"}`
      : `Dentist in ${loc.city}, ${loc.state ?? "TX"}`,
    address: isEs ? "Direccion" : "Address",
    hours: isEs ? "Horario" : "Hours",
    phone: isEs ? "Telefono" : "Phone",
    directions: isEs ? "Como llegar" : "Directions",
    neighborhoods: isEs ? "Areas que servimos" : "Neighborhoods we serve",
    services: isEs ? "Servicios disponibles aqui" : "Services available here",
    primaryBadge: isEs ? "Sede principal" : "Primary office",
    cta: isEs ? "Reservar consulta" : "Book a visit",
    backToLocations: isEs ? "Todos los consultorios" : "All locations",
    bookHere: isEs ? "Reservar en " + loc.city : "Book at " + loc.city,
    map: isEs ? "Ver en Google Maps" : "View on Google Maps",
  };

  const servicesHere = site.services.list.filter((s) =>
    loc.servicesOffered?.includes(s.slug),
  );

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-soft via-background to-terracotta-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <Link
            href={`/${locale}#locations`}
            className="text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground transition"
          >
            {labels.backToLocations}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl md:text-6xl tracking-tight text-foreground">
              {labels.title}
            </h1>
            {loc.primary && (
              <span className="rounded-full bg-terracotta px-3 py-1 text-white text-xs font-semibold uppercase tracking-wider">
                {labels.primaryBadge}
              </span>
            )}
          </div>
          {loc.longBlurb && (
            <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">{loc.longBlurb}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.contact.phoneHref}
              className="rounded-full bg-foreground px-6 py-3 text-background text-sm font-semibold hover:bg-terracotta transition"
            >
              {loc.phone}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-border-soft bg-card px-6 py-3 text-foreground text-sm font-semibold hover:border-terracotta hover:text-terracotta transition"
            >
              {labels.bookHere}
            </Link>
            {loc.googleMapsUrl && (
              <a
                href={loc.googleMapsUrl}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-border-soft bg-card px-6 py-3 text-foreground text-sm font-semibold hover:border-sage hover:text-sage-deep transition"
              >
                {labels.map}
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-card border border-border-soft p-6">
            <div className="text-xs uppercase tracking-wider text-terracotta font-semibold">
              {labels.address}
            </div>
            <p className="mt-2 text-base text-foreground leading-relaxed">{loc.address}</p>
          </div>
          <div className="rounded-2xl bg-card border border-border-soft p-6">
            <div className="text-xs uppercase tracking-wider text-terracotta font-semibold">
              {labels.hours}
            </div>
            <p className="mt-2 text-base text-foreground leading-relaxed">{loc.hours}</p>
          </div>
          <div className="rounded-2xl bg-card border border-border-soft p-6">
            <div className="text-xs uppercase tracking-wider text-terracotta font-semibold">
              {labels.phone}
            </div>
            <a
              href={site.contact.phoneHref}
              className="mt-2 block text-base text-foreground hover:text-terracotta transition"
            >
              {loc.phone}
            </a>
          </div>
        </div>
      </section>

      {loc.directions && (
        <section className="bg-card border-y border-border-soft">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">
              {labels.directions}
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed max-w-3xl">{loc.directions}</p>
          </div>
        </section>
      )}

      {loc.neighborhoods && loc.neighborhoods.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">
            {labels.neighborhoods}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {loc.neighborhoods.map((n) => (
              <span
                key={n}
                className="rounded-full bg-sage-soft border border-sage/20 px-4 py-1.5 text-sm text-foreground"
              >
                {n}
              </span>
            ))}
          </div>
        </section>
      )}

      {servicesHere.length > 0 && (
        <section className="bg-card border-y border-border-soft">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
              {labels.services}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {servicesHere.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${locale}/services/${s.slug}`}
                  className="rounded-2xl bg-background border border-border-soft p-6 hover:border-terracotta transition"
                >
                  <h3 className="font-display text-xl text-foreground">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{s.blurb}</p>
                  {s.price && (
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-terracotta">
                      {s.price}
                    </p>
                  )}
                </Link>
              ))}
            </div>
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
    </>
  );
}
