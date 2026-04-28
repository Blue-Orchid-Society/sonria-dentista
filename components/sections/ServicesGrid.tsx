import Link from "next/link";

type Service = { slug: string; name: string; blurb: string };
type Props = { heading: string; services: Service[]; locale: string };

export function ServicesGrid({ heading, services, locale }: Props) {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl md:text-4xl text-slate-900 mb-10">{heading}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${locale}/services/${s.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-primary hover:shadow-md transition"
            >
              <h3 className="font-display text-xl text-primary mb-2">{s.name}</h3>
              <p className="text-sm text-slate-600">{s.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
