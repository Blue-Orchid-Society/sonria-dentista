import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  locale: string;
  eyebrow: string;
  heading: string;
  body: string;
  items: { label: string; href: string }[];
};

export function MissingTeethFeature({ locale, eyebrow, heading, body, items }: Props) {
  return (
    <section className="bg-foreground py-20 text-background md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="/images/missing-teeth.jpg"
            alt=""
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-warm">
            {locale === "es" ? "Soluciones para sonreir" : "Solutions for confident smiles"}
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-white md:text-6xl">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-background/72 md:text-lg">
            {body}
          </p>

          <div className="mt-8 grid gap-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-track-event="service_cta_click"
                data-track-category="service"
                data-track-label="missing_teeth_feature"
                className="group flex items-center justify-between rounded-xl border border-white/12 bg-white/8 px-5 py-4 text-white transition hover:bg-white hover:text-foreground"
              >
                <span className="font-display text-2xl">{item.label}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

