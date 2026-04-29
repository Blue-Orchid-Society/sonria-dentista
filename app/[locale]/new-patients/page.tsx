import Link from "next/link";
import type { Metadata } from "next";
import { getSite, type Locale } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  return {
    title: site.newPatients.heading,
    description: site.newPatients.intro,
  };
}

export default async function NewPatientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  const isEs = locale === "es";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-soft via-background to-terracotta-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-xs uppercase tracking-[0.18em] text-muted">
            {isEs ? "Nuevos pacientes" : "New patients"}
          </div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight text-foreground max-w-3xl">
            {site.newPatients.heading}
          </h1>
          <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">{site.newPatients.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <div className="rounded-3xl bg-terracotta text-white p-10 md:p-14 shadow-warm-lg text-center">
          <div className="text-xs uppercase tracking-[0.18em] text-white/80">
            {site.newPatients.specialOffer.label}
          </div>
          <div className="mt-3 font-display text-6xl md:text-7xl tracking-tight">
            {site.newPatients.specialOffer.price}
          </div>
          <p className="mt-4 text-base text-white/90 max-w-xl mx-auto">
            {site.newPatients.specialOffer.note}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={site.contact.phoneHref}
              className="rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:bg-cream transition"
            >
              {site.contact.phone}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-white/40 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              {isEs ? "Reservar" : "Book"}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
            {isEs ? "Tu primera visita en 4 pasos" : "Your first visit in 4 steps"}
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {site.newPatients.steps.map((step, i) => (
              <li key={i} className="rounded-2xl bg-background border border-border-soft p-6">
                <div className="grid place-items-center w-9 h-9 rounded-full bg-sage text-white font-display text-base">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-xl text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl tracking-tight text-foreground">
              {isEs ? "Que traer" : "What to bring"}
            </h2>
            <ul className="mt-6 space-y-3">
              {site.newPatients.whatToBring.map((b) => (
                <li key={b} className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-sage mt-1">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-sage-soft/50 border border-sage/20 p-8">
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              {isEs ? "Pago y financiamiento" : "Payment and financing"}
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed">{site.newPatients.financing}</p>
            <Link
              href={`/${locale}/insurance`}
              className="mt-6 inline-block text-sm font-semibold text-terracotta hover:text-terracotta-deep transition"
            >
              {isEs ? "Ver opciones de seguro" : "See insurance options"}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">{site.contactCTA.heading}</h2>
            <p className="mt-2 text-sm text-background/70 max-w-md">{site.contactCTA.bilingualNote}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.contact.phoneHref}
              className="rounded-full bg-terracotta px-6 py-3 text-white text-sm font-semibold hover:bg-terracotta-deep transition shadow-warm"
            >
              {site.contact.phone}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-background/30 px-6 py-3 text-background text-sm font-semibold hover:bg-background hover:text-foreground transition"
            >
              {site.nav.book}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
