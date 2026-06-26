import Link from "next/link";
import { BadgeCheck } from "lucide-react";

const IMAGES = ["/images/insurance-1.png", "/images/insurance-2.png", "/images/insurance-3.png"];

type Props = {
  locale: string;
  eyebrow: string;
  heading: string;
  body: string;
  items: { label: string; note: string }[];
};

export function AffordabilityFeature({ locale, eyebrow, heading, body, items }: Props) {
  return (
    <section className="bg-card py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{body}</p>

          <div className="mt-8 grid gap-3">
            {items.map((item) => (
              <div key={item.label} className="flex gap-3 rounded-xl border border-border-soft bg-background p-4">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-sage-deep" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-foreground">{item.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={`/${locale}/insurance`}
            data-track-event="insurance_cta_click"
            data-track-category="lead"
            data-track-label="home_affordability"
            className="mt-7 inline-flex rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta-deep"
          >
            {locale === "es" ? "Ver opciones de pago" : "See payment options"}
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {IMAGES.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={
                "h-full min-h-56 w-full rounded-xl border border-border-soft object-cover shadow-warm " +
                (index === 0 ? "sm:col-span-2 sm:aspect-[16/8]" : "aspect-[4/3]")
              }
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

