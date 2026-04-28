type Props = {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  phone: string;
};

export function Hero({ title, subtitle, ctaPrimary, ctaSecondary, phone }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-amber-50">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-slate-900 max-w-3xl">
          {title}
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl">{subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="rounded-full bg-primary px-6 py-3 text-white font-semibold hover:bg-cyan-700"
          >
            {ctaPrimary}
          </a>
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="rounded-full border border-slate-300 px-6 py-3 text-slate-700 font-semibold hover:border-primary hover:text-primary"
          >
            {ctaSecondary}: {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
