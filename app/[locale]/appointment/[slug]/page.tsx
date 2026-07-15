import Link from "next/link";
import { CalendarDays, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSite, type Locale } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const site = await getSite("en");
  return (["en", "es"] as const).flatMap((locale) =>
    site.locations.list.map((location) => ({ locale, slug: location.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const site = await getSite(locale as Locale);
  const location = site.locations.list.find((item) => item.slug === slug);
  const isEs = locale === "es";

  if (!location) return {};

  return {
    title: isEs ? `Cita en ${location.city}` : `Book an appointment in ${location.city}`,
    description: isEs
      ? `Agenda una cita con Sonria Dentista en ${location.city}, TX.`
      : `Book a visit with Sonria Dentista in ${location.city}, TX.`,
    alternates: {
      canonical: `https://sonriadentista.com/${locale}/appointment/${slug}`,
      languages: {
        en: `https://sonriadentista.com/en/appointment/${slug}`,
        es: `https://sonriadentista.com/es/appointment/${slug}`,
      },
    },
  };
}

export default async function AppointmentLocationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const site = await getSite(locale as Locale);
  const location = site.locations.list.find((item) => item.slug === slug);

  if (!location) notFound();

  const isEs = locale === "es";
  const phoneHref = location.phoneHref ?? `tel:${location.phone.replace(/[^0-9+]/g, "")}`;
  const hasOnlineBooking = Boolean(location.appointmentUrl);

  return (
    <>
      <section className="relative overflow-hidden bg-foreground text-background">
        <img
          src={location.heroImageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/82 to-foreground/35" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {isEs ? "Reservar cita" : "Book an appointment"}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-white md:text-7xl">
              {isEs ? `Sonria Dentista en ${location.city}` : `Sonria Dentista in ${location.city}`}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80">
              {location.longBlurb ??
                (isEs
                  ? "Elige este consultorio para programar una visita o llama al equipo si necesitas ayuda."
                  : "Choose this office to schedule a visit or call the team if you need help.")}
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-background p-6 text-foreground shadow-warm md:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-sage-soft text-sage-deep">
              <CalendarDays className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-display text-3xl text-foreground">
              {hasOnlineBooking
                ? isEs
                  ? "Listo para reservar"
                  : "Ready to book"
                : isEs
                  ? "Reserva en linea proximamente"
                  : "Online booking coming soon"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {hasOnlineBooking
                ? isEs
                  ? "El boton abrira PatientXpress para este consultorio."
                  : "The button opens PatientXpress for this office."
                : isEs
                  ? "Todavia estamos agregando el enlace directo de PatientXpress para este consultorio. Por ahora, llama al equipo."
                  : "We are still adding the direct PatientXpress link for this office. For now, call the team."}
            </p>
            <div className="mt-6 grid gap-3">
              {hasOnlineBooking ? (
                <a
                  href={location.appointmentUrl}
                  target="_blank"
                  rel="noopener"
                  data-track-event="appointment_click"
                  data-track-category="lead"
                  data-track-label="appointment_page_book_now"
                  data-track-location={location.slug}
                  data-track-destination={location.appointmentUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta-deep"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {isEs ? "Reservar ahora" : "Book now!"}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-muted/25 px-5 py-3 text-sm font-semibold text-muted"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {isEs ? "Proximamente" : "Coming soon"}
                </button>
              )}
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-soft bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-sage hover:text-sage-deep"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {location.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          <div className="rounded-xl border border-border-soft bg-card p-5 shadow-warm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
              {isEs ? "Direccion" : "Address"}
            </p>
            <p className="mt-3 flex gap-2 text-sm leading-6 text-muted">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
              <span>{location.address}</span>
            </p>
          </div>
          <div className="rounded-xl border border-border-soft bg-card p-5 shadow-warm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
              {isEs ? "Horario" : "Hours"}
            </p>
            <p className="mt-3 text-sm font-semibold text-foreground">{location.hours}</p>
          </div>
          <div className="rounded-xl border border-border-soft bg-card p-5 shadow-warm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
              {isEs ? "Consultorio" : "Office"}
            </p>
            <Link
              href={`/${locale}/locations/${location.slug}`}
              className="mt-3 inline-block text-sm font-semibold text-terracotta transition hover:text-terracotta-deep"
            >
              {isEs ? "Ver detalles del consultorio" : "View office details"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
