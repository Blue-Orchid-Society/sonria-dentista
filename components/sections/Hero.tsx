import type { Locale } from "@/lib/content";
import { HeroLeadForm } from "@/components/sections/HeroLeadForm";

type TrustSignal = { label: string; value: string };
type LocationOption = { slug: string; city: string };
type ServiceOption = { slug: string; name: string };

type Props = {
  locale: Locale;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  phone: string;
  imageUrl: string;
  imageAlt: string;
  videoUrl?: string;
  trustSignals: TrustSignal[];
  bilingualNote: string;
  locations: LocationOption[];
  services: ServiceOption[];
};

export function Hero({
  locale,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  phone,
  imageUrl,
  imageAlt,
  videoUrl,
  trustSignals,
  bilingualNote,
  locations,
  services,
}: Props) {
  const phoneHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0" aria-hidden>
        {videoUrl ? (
          <video
            className="h-full w-full object-cover"
            src={videoUrl}
            // https://cdn.sanity.io/files/e5ozko3p/production/5123f22fb1a3f2e9069e3ef78c111cde4b701f06.mp4
            poster={imageUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img src={imageUrl} alt="" className="h-full w-full object-cover" loading="eager" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,18,14,0.84)_0%,rgba(20,18,14,0.62)_42%,rgba(20,18,14,0.22)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/80 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center px-4 py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-background/85 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {bilingualNote}
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight text-white md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/82 md:text-xl">
            {subtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#hero-appointment"
              data-track-event="appointment_click"
              data-track-category="lead"
              data-track-label="hero_primary"
              className="rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta-deep"
            >
              {ctaPrimary}
            </a>
            <a
              href={phoneHref}
              data-track-event="phone_click"
              data-track-category="lead"
              data-track-label="hero_phone"
              data-track-destination={phoneHref}
              className="rounded-full border border-white/25 bg-white/12 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-foreground"
            >
              {ctaSecondary} {phone}
            </a>
          </div>

          <div id="hero-appointment">
            <HeroLeadForm locale={locale} locations={locations} services={services} />
          </div>
        </div>
      </div>

      <div className="relative border-y border-white/10 bg-background text-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-4 md:grid-cols-4">
          {trustSignals.map((t) => (
            <div key={t.label} className="rounded-xl bg-card px-4 py-4 ring-1 ring-border-soft">
              <div className="font-display text-2xl text-foreground md:text-3xl">{t.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-2">{t.label}</div>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">{imageAlt}</span>
    </section>
  );
}
