const CARD_STYLES = [
  {
    card: "bg-foreground text-background hover:scale-[1.01] transition-transform duration-200",
    title: "text-white",
    body: "text-background/74",
  },
  {
    card: "bg-sage-deep text-white hover:scale-[1.01] transition-transform duration-200",
    title: "text-white",
    body: "text-white/78",
  },
  {
    card: "bg-terracotta text-white hover:scale-[1.01] transition-transform duration-200",
    title: "text-white",
    body: "text-white/78",
  },
  {
    card: "bg-gold text-foreground hover:scale-[1.01] transition-transform duration-200",
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
            const style = CARD_STYLES[index % CARD_STYLES.length];
            return (
              <article
                key={value.title}
                className={`rounded-xl p-6 shadow-warm-lg ${style.card}`}
              >
                <h3 className={`font-display text-2xl ${style.title}`}>{value.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${style.body}`}>{value.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
