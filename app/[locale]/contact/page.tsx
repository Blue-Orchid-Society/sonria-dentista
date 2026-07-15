import Link from "next/link";
import type { Metadata } from "next";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { getSite, type Locale } from "@/lib/content";

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
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0" aria-hidden>
          <img
            src="https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,18,14,0.88)_0%,rgba(20,18,14,0.68)_45%,rgba(20,18,14,0.35)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h1 className="font-display text-4xl md:text-6xl tracking-tight text-white">
            {site.contactPage.heading}
          </h1>
          <p className="mt-5 text-lg text-background/85 max-w-2xl leading-relaxed">
            {site.contactPage.subheading}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.45fr_0.9fr]">
          <div>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                {isEs ? "Elige una ubicacion" : "Choose a location"}
              </p>
              <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
                {isEs ? "Reserva directamente con tu consultorio" : "Book directly with your office"}
              </h2>
              <p className="mt-4 leading-7 text-muted">
                {isEs
                  ? "Usa el enlace de cita de la ubicacion que prefieras o llama al consultorio para recibir ayuda del equipo."
                  : "Use the appointment link for your preferred location or call the office for help from the team."}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {site.locations.list.map((location) => (
                <article key={location.slug} className="rounded-2xl border border-border-soft bg-card p-6 shadow-warm">
                  <h3 className="font-display text-2xl text-foreground">{location.city}</h3>
                  <p className="mt-3 flex gap-2 text-sm leading-6 text-muted">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                    <span>{location.address}</span>
                  </p>
                  <p className="mt-3 text-sm font-semibold text-foreground">{location.hours}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={`/${locale}/appointment/${location.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white transition hover:bg-terracotta-deep"
                    >
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      {isEs ? "Reservar" : "Book"}
                    </a>
                    <a
                      href={location.phoneHref}
                      className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-sage hover:text-sage-deep"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {location.phone}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl bg-card border border-border-soft p-6">
              <div className="text-xs uppercase tracking-wider text-terracotta font-semibold">
                {isEs ? "Llamanos" : "Call us"}
              </div>
              <a
                href={site.contact.phoneHref}
                className="mt-2 block font-display text-2xl text-foreground hover:text-terracotta transition"
              >
                <Phone className="mr-2 inline h-5 w-5" aria-hidden="true" />
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
                <Mail className="mr-2 inline h-5 w-5" aria-hidden="true" />
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

     <section className="relative overflow-hidden">
  <div className="absolute inset-0" aria-hidden>
    <img
      src="https://images.unsplash.com/photo-1579488081688-3dbbbae7893e?auto=format&fit=crop&w=2000&q=80"
      alt=""
      className="h-full w-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-foreground/80" />
  </div>

  <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
    <h2 className="font-display text-3xl md:text-4xl tracking-tight text-white">
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
