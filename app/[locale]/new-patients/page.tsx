import Link from "next/link";
import type { Metadata } from "next";
import { CalendarCheck, ClipboardCheck, CreditCard, FileText } from "lucide-react";
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
  const stepIcons = [CalendarCheck, FileText, ClipboardCheck, CreditCard];
  const stepStyles = [
    "bg-foreground text-background",
    "bg-sage-deep text-white",
    "bg-terracotta text-white",
    "bg-gold text-foreground",
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-foreground text-background">
        <img
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/78 to-foreground/24" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {isEs ? "Nuevos pacientes" : "New patients"}
            </div>
            <h1 className="mt-3 font-display text-5xl leading-tight text-white md:text-7xl">
              {site.newPatients.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/78">{site.newPatients.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-3xl bg-terracotta p-10 text-white shadow-warm-lg md:p-14">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              {site.newPatients.specialOffer.label}
            </div>
            <div className="mt-3 font-display text-6xl tracking-tight md:text-7xl">
              {site.newPatients.specialOffer.price}
            </div>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/88">
              {site.newPatients.specialOffer.note}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.contact.phoneHref}
                className="rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-gold"
              >
                {site.contact.phone}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {isEs ? "Reservar" : "Book"}
              </Link>
            </div>
          </div>

          <div className="relative min-h-96 overflow-hidden rounded-3xl shadow-warm-lg">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/72 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 max-w-sm text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                {isEs ? "Cuidado claro" : "Clear care"}
              </div>
              <p className="mt-2 font-display text-3xl leading-tight">
                {isEs ? "Llega con confianza." : "Arrive with confidence."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
            {isEs ? "Tu primera visita en 4 pasos" : "Your first visit in 4 steps"}
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {site.newPatients.steps.map((step, i) => {
              const Icon = stepIcons[i % stepIcons.length];
              return (
                <li key={step.title} className={`rounded-xl p-6 shadow-warm ${stepStyles[i % stepStyles.length]}`}>
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-white/14">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] opacity-70">
                    {isEs ? "Paso" : "Step"} {i + 1}
                  </div>
                  <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-78">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border-soft bg-card p-8 shadow-warm">
            <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
              {isEs ? "Que traer" : "What to bring"}
            </h2>
            <ul className="mt-6 space-y-3">
              {site.newPatients.whatToBring.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-muted">
                  <span className="mt-1 text-sage-deep">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-foreground p-8 text-background shadow-warm">
            <h2 className="font-display text-3xl tracking-tight text-white md:text-4xl">
              {isEs ? "Pago y financiamiento" : "Payment and financing"}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-background/74">{site.newPatients.financing}</p>
            <Link
              href={`/${locale}/insurance`}
              className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
            >
              {isEs ? "Ver opciones de seguro" : "See insurance options"}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-14 md:flex-row md:py-16">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">{site.contactCTA.heading}</h2>
            <p className="mt-2 max-w-md text-sm text-background/70">{site.contactCTA.bilingualNote}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.contact.phoneHref}
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta-deep"
            >
              {site.contact.phone}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background transition hover:bg-background hover:text-foreground"
            >
              {site.nav.book}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

