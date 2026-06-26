import { BadgeDollarSign, Languages, ShieldCheck, Sparkles } from "lucide-react";

const ICONS = [ShieldCheck, Sparkles, BadgeDollarSign, Languages];

type Value = {
  title: string;
  body: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  intro: string;
  values: Value[];
};

export function TrueDentalHome({ eyebrow, heading, intro, values }: Props) {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              {eyebrow}
            </span>
            <h2 className="mt-3 max-w-lg font-display text-4xl leading-tight text-foreground md:text-5xl">
              {heading}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <article
                key={value.title}
                className="rounded-xl border border-border-soft bg-card p-6 shadow-warm"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-sage-soft text-sage-deep">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-foreground">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{value.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

