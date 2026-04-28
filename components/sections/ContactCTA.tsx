type Props = {
  heading: string;
  body: string;
  cta: string;
  phone: string;
  email: string;
  bilingualNote: string;
};

export function ContactCTA({ heading, body, cta, phone, email, bilingualNote }: Props) {
  return (
    <section id="contact" className="py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-foreground text-background p-10 md:p-14 grain">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-terracotta/30 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-sage/25 blur-3xl" aria-hidden />
          <div className="relative max-w-2xl">
            <span className="text-xs uppercase tracking-[0.18em] text-gold font-semibold">
              ✦ {bilingualNote}
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">{heading}</h2>
            <p className="mt-5 text-lg text-background/80 leading-relaxed">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                className="rounded-full bg-terracotta px-6 py-3.5 text-white font-semibold hover:bg-terracotta-deep transition shadow-warm inline-flex items-center gap-2"
              >
                <span aria-hidden>📞</span> {cta} {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="rounded-full border border-background/30 px-6 py-3.5 text-background font-semibold hover:bg-background hover:text-foreground transition inline-flex items-center gap-2"
              >
                <span aria-hidden>✉</span> {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
