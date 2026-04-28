type Props = { heading: string; body: string; cta: string; phone: string };

export function ContactCTA({ heading, body, cta, phone }: Props) {
  return (
    <section id="contact" className="py-20 bg-amber-500 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-4">{heading}</h2>
        <p className="text-lg mb-8">{body}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="rounded-full bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800"
          >
            {cta} — {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
