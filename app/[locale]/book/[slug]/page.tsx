import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { getSite, type Locale } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const site = await getSite("en");
  return (["en", "es"] as const).flatMap((locale) =>
    site.locations.list.map((location) => ({ locale, slug: location.slug })),
  );
}

export default async function BookLocationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const site = await getSite(locale as Locale);
  const location = site.locations.list.find((item) => item.slug === slug);

  if (!location) notFound();

  if (location.appointmentUrl) redirect(location.appointmentUrl);

  const isEs = locale === "es";
  const phoneHref = location.phoneHref ?? `tel:${location.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-border-soft bg-card p-8 shadow-warm md:p-10">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-sage-soft text-sage-deep">
            <CalendarDays className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            {location.city}
          </p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
            {isEs ? "Reserva en linea proximamente" : "Online booking coming soon"}
          </h1>
          <p className="mt-5 text-base leading-7 text-muted">
            {isEs
              ? "Estamos agregando el enlace directo de PatientXpress para este consultorio. Por ahora, llama al equipo y te ayudaran a programar."
              : "We are adding the direct PatientXpress link for this office. For now, call the team and they can help you schedule."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta-deep"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {location.phone}
            </a>
            <Link
              href={`/${locale}/locations/${location.slug}`}
              className="inline-flex items-center rounded-full border border-border-soft bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-terracotta hover:text-terracotta"
            >
              {isEs ? "Ver consultorio" : "View office"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
