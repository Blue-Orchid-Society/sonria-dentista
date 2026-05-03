import Link from "next/link";
import { getSite, type Locale } from "@/lib/content";

export async function NAPBlock({ locale }: { locale: Locale }) {
  const site = await getSite(locale);
  const heading = locale === "es" ? "Visítanos" : "Come see us";
  const subheading = locale === "es"
    ? "Sin cita los pacientes nuevos pueden llamar a cualquier sede."
    : "New patients can walk in or call any office directly.";

  return (
    <section id="locations" className="bg-background py-20 md:py-32 border-t border-border-soft">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.18em] text-brand font-semibold">
            {locale === "es" ? "Sedes" : "Locations"}
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl text-foreground leading-tight">{heading}</h2>
          <p className="mt-3 text-muted text-lg">{subheading}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {site.locations.list.map((l) => (
            <Link
              key={l.slug}
              href={`/${locale}/locations/${l.slug}`}
              className="group flex flex-col p-7 rounded-2xl bg-card border border-border-soft hover:border-brand hover:shadow-warm-lg transition"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-xl text-foreground group-hover:text-brand-deep transition">
                  {l.city}, {l.state}
                </h3>
                {l.primary && (
                  <span className="text-[10px] uppercase tracking-[0.16em] text-brand font-semibold bg-brand-soft/60 px-2 py-1 rounded-md">
                    HQ
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-foreground-soft leading-relaxed flex-1">{l.address}</p>
              <div className="mt-5 pt-4 border-t border-border-soft text-xs text-muted-2 space-y-1">
                <div className="flex items-center gap-1 text-foreground/80 font-medium">
                  <span className="text-accent">★</span> {l.rating} · {l.reviewCount} reviews
                </div>
                <div>{l.phone}</div>
                <div>{l.hours}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
