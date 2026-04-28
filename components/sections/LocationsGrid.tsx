import Link from "next/link";

type Location = { slug: string; city: string; address: string; primary: boolean };
type Props = { heading: string; locations: Location[]; locale: string };

export function LocationsGrid({ heading, locations, locale }: Props) {
  return (
    <section id="locations" className="py-20 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl md:text-4xl text-slate-900 mb-10">{heading}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {locations.map((l) => (
            <Link
              key={l.slug}
              href={`/${locale}/locations/${l.slug}`}
              className="rounded-2xl bg-white p-5 border border-slate-200 hover:border-primary hover:shadow-md transition"
            >
              <div className="font-display text-xl text-slate-900">
                {l.city} {l.primary && <span className="text-xs text-primary">(HQ)</span>}
              </div>
              <p className="text-xs text-slate-500 mt-2">{l.address}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
