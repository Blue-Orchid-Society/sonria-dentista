import Link from "next/link";

type Service = { slug: string; name: string; blurb: string; icon?: string };
type FeaturedPrice = { label: string; price: string; note: string };
type Props = {
  heading: string;
  subheading?: string;
  services: Service[];
  pricingFeatured?: FeaturedPrice[];
  locale: string;
};

export function ServicesGrid({ heading, subheading, services, pricingFeatured, locale }: Props) {
  return (
    <section id="services" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
            ✦ Servicios
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-foreground">{heading}</h2>
          {subheading && <p className="mt-3 text-muted leading-relaxed">{subheading}</p>}
        </div>

        {pricingFeatured && pricingFeatured.length > 0 && (
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pricingFeatured.map((p, i) => (
              <div
                key={p.label}
                className={
                  "rounded-2xl p-6 border " +
                  (i === 0
                    ? "bg-sage-soft border-sage/30"
                    : i === 1
                    ? "bg-card border-border-soft"
                    : "bg-terracotta-soft border-terracotta/30")
                }
              >
                <div className="text-xs uppercase tracking-wider text-muted-2">{p.label}</div>
                <div className="mt-2 font-display text-3xl text-foreground">{p.price}</div>
                <div className="mt-1 text-sm text-muted">{p.note}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${locale}/services/${s.slug}`}
              className="group rounded-2xl border border-border-soft bg-card p-6 hover:border-terracotta hover:shadow-warm transition"
            >
              <div className="grid place-items-center w-11 h-11 rounded-xl bg-sage-soft text-sage-deep mb-4 group-hover:bg-terracotta-soft group-hover:text-terracotta-deep transition">
                <span className="text-xl" aria-hidden>✚</span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-terracotta-deep transition">{s.name}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
