import Link from "next/link";
import type { Metadata } from "next";
import { BadgeCheck, CreditCard, ShieldCheck } from "lucide-react";
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
  const financeIcons = [ShieldCheck, CreditCard, BadgeCheck];
  const financeCardStyles = [
    "bg-foreground text-background",
    "bg-sage-deep text-white",
    "bg-terracotta text-white",
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-foreground text-background">
        <img
          src="/images/insurance-1.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/82 to-foreground/28" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {isEs ? "Seguro y financiamiento" : "Insurance and financing"}
            </div>
            <h1 className="mt-3 font-display text-5xl leading-tight text-white md:text-7xl">
              {site.insurance.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/78">{site.insurance.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
              {isEs ? "Planes que aceptamos" : "Plans we accept"}
            </h2>
            <p className="text-base leading-relaxed text-muted">
              {isEs
                ? "Trae tu informacion de cobertura y el equipo te ayuda a entender opciones antes de comenzar."
                : "Bring your coverage information and the team can help you understand options before care begins."}
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {site.insurance.plansAccepted.map((p, index) => (
              <div
                key={p}
                className={
                  "rounded-xl px-5 py-5 text-sm font-semibold shadow-warm " +
                  (index % 3 === 0
                    ? "bg-foreground text-background"
                    : index % 3 === 1
                      ? "bg-sage-deep text-white"
                      : "bg-gold text-foreground")
                }
              >
                {p}
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm italic text-muted-2">
            {isEs
              ? "No ves tu plan? Llamanos. Casi siempre podemos atenderte como proveedor fuera de red con beneficios similares."
              : "Don't see your plan? Call us. We can almost always see you as out-of-network with similar benefits."}
          </p>
        </div>
      </section>

      <section className="border-y border-border-soft bg-card py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            <img src="/images/insurance-2.png" alt="" className="h-full min-h-56 w-full rounded-xl object-cover shadow-warm" loading="lazy" />
            <img src="/images/insurance-3.png" alt="" className="h-full min-h-56 w-full rounded-xl object-cover shadow-warm" loading="lazy" />
            <div className="rounded-xl bg-terracotta p-6 text-white shadow-warm sm:col-span-2">
              <h2 className="font-display text-3xl tracking-tight">
                {isEs ? "Sin seguro?" : "No insurance?"}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/82">
                {site.insurance.noInsurance}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
              {isEs ? "Opciones de pago" : "Payment options"}
            </h2>
            <div className="mt-8 grid gap-4">
              {site.insurance.financing.map((f, index) => {
                const Icon = financeIcons[index % financeIcons.length];
                return (
                  <div key={f.name} className={`rounded-xl p-6 shadow-warm ${financeCardStyles[index % financeCardStyles.length]}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-2xl">{f.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed opacity-80">{f.body}</p>
                  </div>
                );
              })}
            </div>
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
              data-track-event="insurance_cta_click"
              data-track-category="lead"
              data-track-label="insurance_phone"
              data-track-destination={site.contact.phoneHref}
              className="rounded-full bg-terracotta px-6 py-3 text-white text-sm font-semibold hover:bg-terracotta-deep transition shadow-warm"
            >
              {site.contact.phone}
            </a>
            <Link
              href={`/${locale}/contact`}
              data-track-event="insurance_cta_click"
              data-track-category="lead"
              data-track-label="insurance_contact"
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
