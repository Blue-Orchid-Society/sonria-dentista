import Link from "next/link";
import { CalendarDays, MapPin, Phone } from "lucide-react";

type Location = {
  slug: string;
  city: string;
  address: string;
  phone?: string;
  phoneHref?: string;
  hours?: string;
  primary: boolean;
  googleMapsUrl?: string;
  appointmentUrl?: string;
};

type Props = { heading: string; subheading?: string; locations: Location[]; locale: string };

export function LocationsGrid({ heading, subheading, locations, locale }: Props) {
  const isEs = locale === "es";

  return (
    <section id="locations" className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="relative min-h-96 overflow-hidden rounded-xl bg-foreground p-8 text-background">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-45"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/10" />
            <div className="relative flex h-full flex-col justify-end">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                {isEs ? "Ubicaciones" : "Locations"}
              </span>
              <h2 className="mt-3 font-display text-4xl leading-tight text-white md:text-5xl">{heading}</h2>
              {subheading && <p className="mt-5 text-base leading-relaxed text-background/75">{subheading}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <article
                key={location.slug}
                className="rounded-xl border border-border-soft bg-card p-5 shadow-warm transition hover:border-sage/60 hover:shadow-warm-lg"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl text-foreground">{location.city}</h3>
                  {location.primary && (
                    <span className="rounded-full bg-terracotta px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                      {isEs ? "Principal" : "Main"}
                    </span>
                  )}
                </div>
                <p className="mt-4 flex gap-3 text-sm leading-relaxed text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                  <span>{location.address}</span>
                </p>
                {location.hours && <p className="mt-3 text-sm font-semibold text-foreground">{location.hours}</p>}

                <div className="mt-5 flex flex-wrap gap-2">
                  {location.phone && (
                    <a
                      href={location.phoneHref ?? `tel:${location.phone.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-terracotta"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {location.phone}
                    </a>
                  )}
                  {location.appointmentUrl && (
                    <a
                      href={location.appointmentUrl}
                      className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-terracotta hover:text-terracotta"
                    >
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      {isEs ? "Cita" : "Book"}
                    </a>
                  )}
                  {location.googleMapsUrl && (
                    <a
                      href={location.googleMapsUrl}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-sage hover:text-sage-deep"
                    >
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {isEs ? "Mapa" : "Map"}
                    </a>
                  )}
                </div>

                <Link
                  href={`/${locale}/locations/${location.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-terracotta transition hover:text-terracotta-deep"
                >
                  {isEs ? "Ver detalles" : "View details"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
