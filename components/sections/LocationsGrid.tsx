import Link from "next/link";

type Location = {
  slug: string;
  city: string;
  address: string;
  phone?: string;
  hours?: string;
  primary: boolean;
};
type Props = { heading: string; subheading?: string; locations: Location[]; locale: string };

export function LocationsGrid({ heading, subheading, locations, locale }: Props) {
  return (
    <section id="locations" className="py-20 md:py-24 bg-sage-soft/40 border-y border-border-soft">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.18em] text-sage-deep font-semibold">
            ✦ Consultorios
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-foreground">{heading}</h2>
          {subheading && <p className="mt-3 text-muted leading-relaxed">{subheading}</p>}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {locations.map((l) => (
            <Link
              key={l.slug}
              href={`/${locale}/locations/${l.slug}`}
              className="group rounded-2xl bg-card border border-border-soft p-6 hover:border-sage hover:shadow-warm transition flex flex-col"
            >
              <div className="flex items-center gap-2 text-sage-deep">
                <span aria-hidden>📍</span>
                <span className="font-display text-xl text-foreground group-hover:text-sage-deep transition">
                  {l.city}
                </span>
                {l.primary && (
                  <span className="ml-auto text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-terracotta text-white font-semibold">
                    HQ
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-muted leading-relaxed">{l.address}</p>
              {l.hours && <p className="mt-3 text-xs text-muted-2">{l.hours}</p>}
              {l.phone && (
                <span className="mt-4 pt-4 border-t border-border-soft text-sm text-foreground font-semibold">
                  {l.phone}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
