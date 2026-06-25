import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CalendarDays, ClipboardList, MapPin, Phone, Star } from "lucide-react";
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
  const servicesHere = site.services.list.filter((s) => loc.servicesOffered?.includes(s.slug));
  const labels = getLabels(isEs, loc.city);
  const reviewUrl = loc.socialLinks?.yelp ?? loc.googleMapsUrl;
  const phoneHref = loc.phoneHref ?? `tel:${loc.phone.replace(/[^0-9+]/g, "")}`;
  const schema = buildLocalBusinessSchema({
    siteName: site.name,
    loc,
    phoneHref,
    url: `https://sonriadentista.com/${locale}/locations/${slug}`,
    services: servicesHere.map((service) => service.name),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative overflow-hidden bg-foreground text-background">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/82 to-foreground/35" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <Link
            href={`/${locale}#locations`}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-background/70 transition hover:text-white"
          >
            {labels.backToLocations}
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl">
              {labels.title}
            </h1>
            {loc.primary && (
              <span className="rounded-full bg-terracotta px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {labels.primaryBadge}
              </span>
            )}
          </div>

          {loc.longBlurb && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80">
              {loc.longBlurb}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta-deep"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {loc.phone}
            </a>
            {loc.appointmentUrl && (
              <a
                href={loc.appointmentUrl}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-foreground"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {labels.bookHere}
              </a>
            )}
            {loc.googleMapsUrl && (
              <a
                href={loc.googleMapsUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-foreground"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {labels.map}
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="bg-background py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          <InfoCard label={labels.address} value={loc.address} />
          <InfoCard label={labels.hours} value={loc.hours} />
          <InfoCard label={labels.phone} value={loc.phone} href={phoneHref} />
        </div>
      </section>

      <section className="border-y border-border-soft bg-card py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              {labels.patientActions}
            </span>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-5xl">
              {labels.actionHeading}
            </h2>
            {loc.directions && <p className="mt-5 text-base leading-relaxed text-muted">{loc.directions}</p>}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {loc.appointmentUrl && (
              <ActionCard
                href={loc.appointmentUrl}
                icon={<CalendarDays className="h-5 w-5" aria-hidden="true" />}
                title={labels.bookHere}
                body={labels.bookBody}
              />
            )}
            {loc.intakeFormUrl && (
              <ActionCard
                href={loc.intakeFormUrl}
                icon={<ClipboardList className="h-5 w-5" aria-hidden="true" />}
                title={labels.intake}
                body={labels.intakeBody}
              />
            )}
            {loc.googleMapsUrl && (
              <ActionCard
                href={loc.googleMapsUrl}
                icon={<MapPin className="h-5 w-5" aria-hidden="true" />}
                title={labels.map}
                body={labels.mapBody}
                external
              />
            )}
            {reviewUrl && (
              <ActionCard
                href={reviewUrl}
                icon={<Star className="h-5 w-5 fill-current" aria-hidden="true" />}
                title={labels.reviews}
                body={labels.reviewBody}
                external
              />
            )}
          </div>
        </div>
      </section>

      {loc.neighborhoods && loc.neighborhoods.length > 0 && (
        <section className="bg-background py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
              {labels.neighborhoods}
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {loc.neighborhoods.map((neighborhood) => (
                <span
                  key={neighborhood}
                  className="rounded-full border border-sage/20 bg-sage-soft px-4 py-2 text-sm font-medium text-foreground"
                >
                  {neighborhood}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {servicesHere.length > 0 && (
        <section className="bg-foreground py-16 text-background md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {labels.services}
                </span>
                <h2 className="mt-3 font-display text-3xl text-white md:text-5xl">
                  {labels.servicesHeading}
                </h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-background/70">
                {labels.servicesBody}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {servicesHere.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${locale}/services/${service.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/8 p-5 transition hover:bg-white hover:text-foreground"
                >
                  <h3 className="font-display text-xl text-white transition group-hover:text-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-background/68 transition group-hover:text-muted">
                    {service.blurb}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-background py-14 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-foreground">{site.contactCTA.heading}</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{site.contactCTA.bilingualNote}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={phoneHref}
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta-deep"
            >
              {loc.phone}
            </a>
            {loc.appointmentUrl && (
              <a
                href={loc.appointmentUrl}
                className="rounded-full border border-border-soft bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-terracotta hover:text-terracotta"
              >
                {labels.cta}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({ label, value, href }: { label: string; value?: string; href?: string }) {
  if (!value) return null;

  return (
    <div className="rounded-xl border border-border-soft bg-card p-6 shadow-warm">
      <div className="text-xs font-semibold uppercase tracking-wider text-terracotta">{label}</div>
      {href ? (
        <a href={href} className="mt-2 block text-base font-semibold text-foreground transition hover:text-terracotta">
          {value}
        </a>
      ) : (
        <p className="mt-2 text-base leading-relaxed text-foreground">{value}</p>
      )}
    </div>
  );
}

function ActionCard({
  href,
  icon,
  title,
  body,
  external,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  body: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className="group rounded-xl border border-border-soft bg-background p-5 shadow-warm transition hover:-translate-y-0.5 hover:border-terracotta hover:shadow-warm-lg"
    >
      <div className="grid h-11 w-11 place-items-center rounded-full bg-sage-soft text-sage-deep transition group-hover:bg-terracotta group-hover:text-white">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-2xl text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </a>
  );
}

function getLabels(isEs: boolean, city: string) {
  return {
    title: isEs ? `Dentista en ${city}, TX` : `Dentist in ${city}, TX`,
    address: isEs ? "Direccion" : "Address",
    hours: isEs ? "Horario" : "Hours",
    phone: isEs ? "Telefono" : "Phone",
    neighborhoods: isEs ? "Areas cercanas que servimos" : "Nearby areas we serve",
    services: isEs ? "Servicios" : "Services",
    servicesHeading: isEs ? `Servicios disponibles en ${city}` : `Services available in ${city}`,
    servicesBody: isEs
      ? "Encuentra cuidado familiar, preventivo, estetico, emergencias y opciones para reemplazar dientes en esta ubicacion."
      : "Find family care, preventive dentistry, cosmetic care, emergency treatment, and tooth replacement options at this office.",
    primaryBadge: isEs ? "Principal" : "Main office",
    cta: isEs ? "Reservar consulta" : "Book a visit",
    backToLocations: isEs ? "Todos los consultorios" : "All locations",
    bookHere: isEs ? `Reservar en ${city}` : `Book at ${city}`,
    map: isEs ? "Ver mapa" : "View map",
    patientActions: isEs ? "Para pacientes" : "For patients",
    actionHeading: isEs ? "Agenda, completa formularios y llega sin dudas." : "Book, complete forms, and arrive with confidence.",
    bookBody: isEs ? "Usa el enlace de cita de esta ubicacion." : "Use the appointment link for this location.",
    intake: isEs ? "Formulario nuevo paciente" : "New patient intake",
    intakeBody: isEs ? "Completa tu informacion antes de tu visita." : "Complete your information before your visit.",
    mapBody: isEs ? "Abre indicaciones actualizadas en Google Maps." : "Open current directions in Google Maps.",
    reviews: isEs ? "Resenas" : "Reviews",
    reviewBody: isEs ? "Lee resenas y senales de confianza de esta ubicacion." : "Read reviews and trust signals for this office.",
  };
}

function buildLocalBusinessSchema({
  siteName,
  loc,
  phoneHref,
  url,
  services,
}: {
  siteName: string;
  loc: {
    city: string;
    state?: string;
    address: string;
    phone: string;
    hours?: string;
    googleMapsUrl?: string;
  };
  phoneHref: string;
  url: string;
  services: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: `${siteName} - ${loc.city}`,
    url,
    telephone: phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.state ?? "TX",
      addressCountry: "US",
    },
    areaServed: loc.city,
    hasMap: loc.googleMapsUrl,
    openingHours: loc.hours,
    medicalSpecialty: "Dentistry",
    availableService: services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service,
    })),
  };
}
