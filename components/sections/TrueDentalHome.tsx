import { BadgeDollarSign, Languages, ShieldCheck, Sparkles } from "lucide-react";

const ICONS = [ShieldCheck, Sparkles, BadgeDollarSign, Languages];
const CARD_STYLES = [
  {
    card: "bg-foreground text-background",
    icon: "bg-white/12 text-gold",
    title: "text-white",
    body: "text-background/74",
  },
  {
    card: "bg-sage-deep text-white",
    icon: "bg-white/15 text-white",
    title: "text-white",
    body: "text-white/78",
  },
  {
    card: "bg-terracotta text-white",
    icon: "bg-white/16 text-white",
    title: "text-white",
    body: "text-white/78",
  },
  {
    card: "bg-gold text-foreground",
    icon: "bg-foreground/10 text-foreground",
    title: "text-foreground",
    body: "text-foreground/74",
  },
];

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
            const style = CARD_STYLES[index % CARD_STYLES.length];
            return (
              <article
                key={value.title}
                className={`rounded-xl p-6 shadow-warm-lg ${style.card}`}
              >
                <div className={`grid h-12 w-12 place-items-center rounded-full ${style.icon}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className={`mt-5 font-display text-2xl ${style.title}`}>{value.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${style.body}`}>{value.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
