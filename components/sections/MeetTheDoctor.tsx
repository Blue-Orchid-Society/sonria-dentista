type Props = {
  heading: string;
  doctor: {
    name: string;
    title: string;
    imageUrl: string;
    imageAlt: string;
    bio: string[];
    credentials: string[];
  };
};

export function MeetTheDoctor({ heading, doctor }: Props) {
  return (
    <section id="doctor" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-[1fr_1.2fr] items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-terracotta/15 to-sage/15 rounded-[2rem] -z-10" />
          <img
            src={doctor.imageUrl}
            alt={doctor.imageAlt}
            className="w-full aspect-[4/5] object-cover rounded-[1.75rem] shadow-warm-lg"
            loading="lazy"
          />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
            ✦ {heading}
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-foreground">
            {doctor.name}
          </h2>
          <p className="mt-2 text-muted-2 text-sm uppercase tracking-wider">{doctor.title}</p>
          <div className="mt-6 space-y-4 text-foreground/85 leading-relaxed">
            {doctor.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-7 grid grid-cols-2 gap-2.5 text-sm">
            {doctor.credentials.map((c) => (
              <li
                key={c}
                className="rounded-lg bg-card border border-border-soft px-3 py-2 text-muted flex items-center gap-2"
              >
                <span className="text-sage-deep" aria-hidden>✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
