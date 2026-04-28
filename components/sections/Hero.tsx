type TrustSignal = { label: string; value: string };
type Props = {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  phone: string;
  imageUrl: string;
  imageAlt: string;
  trustSignals: TrustSignal[];
  bilingualNote: string;
};

export function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  phone,
  imageUrl,
  imageAlt,
  trustSignals,
  bilingualNote,
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sage-soft via-background to-terracotta-soft/40 -z-10" />
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 md:pt-20 md:pb-24 grid gap-12 md:grid-cols-[1.1fr_1fr] items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border-soft px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            {bilingualNote}
          </span>
          <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground max-w-xl">
            {title}
          </h1>
          <p className="mt-5 text-lg text-muted max-w-xl leading-relaxed">{subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-terracotta px-6 py-3.5 text-white font-semibold hover:bg-terracotta-deep transition shadow-warm"
            >
              {ctaPrimary}
            </a>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
              className="rounded-full border border-border-soft bg-card px-6 py-3.5 text-foreground font-semibold hover:border-foreground transition inline-flex items-center gap-2"
            >
              <span aria-hidden>📞</span>
              {ctaSecondary} <span className="text-muted font-normal">{phone}</span>
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-sage/15 to-terracotta/15 rounded-[2rem] -z-10" />
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full aspect-[5/6] object-cover rounded-[1.75rem] shadow-warm-lg"
            loading="eager"
          />
        </div>
      </div>
      <div className="border-y border-border-soft bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustSignals.map((t) => (
            <div key={t.label} className="text-center md:text-left">
              <div className="font-display text-2xl md:text-3xl text-foreground">{t.value}</div>
              <div className="text-xs uppercase tracking-wider text-muted-2 mt-1">{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
