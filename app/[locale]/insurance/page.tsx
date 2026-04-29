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
    title: site.insurance.heading,
    description: site.insurance.intro,
  };
}

export default async function InsurancePage({
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
            {isEs ? "Seguro y financiamiento" : "Insurance and financing"}
          </div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight text-foreground max-w-3xl">
            {site.insurance.heading}
          </h1>
          <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">{site.insurance.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
          {isEs ? "Planes que aceptamos" : "Plans we accept"}
        </h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {site.insurance.plansAccepted.map((p) => (
            <div
              key={p}
              className="rounded-xl bg-card border border-border-soft px-4 py-4 text-center text-sm font-semibold text-foreground"
            >
              {p}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-2 italic max-w-3xl">
          {isEs
            ? "No ves tu plan? Llamanos. Casi siempre podemos atenderte como proveedor fuera de red con beneficios similares."
            : "Don't see your plan? Call us. We can almost always see you as out-of-network with similar benefits."}
        </p>
      </section>

      <section className="bg-card border-y border-border-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="rounded-2xl bg-terracotta-soft/40 border border-terracotta/30 p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">
              {isEs ? "Sin seguro?" : "No insurance?"}
            </h2>
            <p className="mt-4 text-base text-foreground leading-relaxed max-w-3xl">
              {site.insurance.noInsurance}
            </p>
          </div>

          <h2 className="mt-12 font-display text-3xl md:text-4xl tracking-tight text-foreground">
            {isEs ? "Opciones de pago" : "Payment options"}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {site.insurance.financing.map((f) => (
              <div key={f.name} className="rounded-2xl bg-background border border-border-soft p-6">
                <h3 className="font-display text-xl text-foreground">{f.name}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground text-center">
          {isEs ? "Preguntas sobre seguro" : "Insurance questions"}
        </h2>
        <div className="mt-10 divide-y divide-border-soft border-y border-border-soft">
          {site.insurance.faqs.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-6 text-left">
                <span className="font-display text-lg text-foreground">{f.q}</span>
                <span className="text-terracotta text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-base text-muted leading-relaxed">{f.a}</p>
            </details>
          ))}
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
