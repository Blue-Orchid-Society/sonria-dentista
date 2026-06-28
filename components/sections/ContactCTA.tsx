import { Mail, Phone } from "lucide-react";

type Props = {
  heading: string;
  body: string;
  cta: string;
  phone: string;
  email: string;
  bilingualNote: string;
};

export function ContactCTA({ heading, body, cta, phone, email, bilingualNote }: Props) {
  const phoneHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section id="contact" className="bg-foreground py-20 text-background md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            {bilingualNote}
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">{heading}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/75">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <a
            href={phoneHref}
            data-track-event="phone_click"
            data-track-category="lead"
            data-track-label="contact_cta_phone"
            data-track-destination={phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta-deep"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {cta} {phone}
          </a>
          <a
            href={`mailto:${email}`}
            data-track-event="email_click"
            data-track-category="lead"
            data-track-label="contact_cta_email"
            data-track-destination={`mailto:${email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-background/25 px-6 py-3.5 text-sm font-semibold text-background transition hover:bg-background hover:text-foreground"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {email}
          </a>
        </div>
      </div>
    </section>
  );
}
