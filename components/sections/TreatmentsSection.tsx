type Treatment = {
  name: string;
  description: string;
  marker?: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  subheading: string;
  treatments: ReadonlyArray<Treatment>;
};

function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <article className="group h-full rounded-2xl border border-border-soft bg-card p-6 shadow-warm transition hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-warm-lg">
      <div className="flex h-full flex-col">
        <div
          aria-hidden
          className="grid h-11 w-11 place-items-center rounded-full bg-sage-soft text-sm font-semibold text-sage-deep ring-1 ring-sage/20 transition group-hover:bg-sage group-hover:text-white"
        >
          {treatment.marker ?? treatment.name.charAt(0)}
        </div>
        <h3 className="mt-5 text-lg font-semibold text-foreground">{treatment.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{treatment.description}</p>
      </div>
    </article>
  );
}

export function TreatmentsSection({ eyebrow, heading, subheading, treatments }: Props) {
  return (
    <section className="py-20 md:py-24 bg-card/55 border-b border-border-soft">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.18em] text-sage-deep font-semibold">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-foreground">{heading}</h2>
          <p className="mt-3 text-muted leading-relaxed">{subheading}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <TreatmentCard key={treatment.name} treatment={treatment} />
          ))}
        </div>
      </div>
    </section>
  );
}
