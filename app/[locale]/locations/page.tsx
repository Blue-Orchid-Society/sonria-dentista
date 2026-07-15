import Link from "next/link";
import { CalendarDays, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getSite, type Locale } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? "Consultorios de Sonria Dentista" : "Sonria Dentista locations",
    description: isEs
      ? "Encuentra los consultorios de Sonria Dentista en Arlington, Commerce, Paris y Grand Prairie."
      : "Find Sonria Dentista offices in Arlington, Commerce, Paris, and Grand Prairie.",
    alternates: {
      canonical: `https://sonriadentista.com/${locale}/locations`,
      languages: {
        en: "https://sonriadentista.com/en/locations",
        es: "https://sonriadentista.com/es/locations",
      },
    },
  };
}

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  const isEs = locale === "es";

  return (
    <>
      <section className="relative overflow-hidden bg-foreground text-background">
        <img
          src="https://images.unsplash.com/photo-1579488081688-3dbbbae7893e?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/82 to-foreground/35" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            {isEs ? "Consultorios" : "Locations"}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl">
            {site.locations.heading}
          </h1>
          {site.locations.subheading && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80">
              {site.locations.subheading}
            </p>
          )}
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 md:grid-cols-2">
          {site.locations.list.map((location) => {
            const phoneHref = location.phoneHref ?? `tel:${location.phone.replace(/[^0-9+]/g, "")}`;

            return (
              <article key={location.slug} className="rounded-2xl border border-border-soft bg-card p-6 shadow-warm">
                <h2 className="font-display text-3xl text-foreground">{location.city}</h2>
                <p className="mt-4 flex gap-3 text-sm leading-6 text-muted">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                  <span>{location.address}</span>
                </p>
                <p className="mt-3 text-sm font-semibold text-foreground">{location.hours}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href={`/${locale}/appointment/${location.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white transition hover:bg-terracotta-deep"
                  >
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    {isEs ? "Reservar" : "Book"}
                  </Link>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-sage hover:text-sage-deep"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {location.phone}
                  </a>
                  <Link
                    href={`/${locale}/locations/${location.slug}`}
                    className="inline-flex items-center rounded-full border border-border-soft bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-terracotta hover:text-terracotta"
                  >
                    {isEs ? "Detalles" : "Details"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
