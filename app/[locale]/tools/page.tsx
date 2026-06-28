import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getSite, type Locale } from "@/lib/content";

const tools = [
  {
    href: "/tools/dental-veneer-cost-estimator",
    title: "Dental veneer cost estimator",
    description: "Compare common veneer cost factors before scheduling a cosmetic consultation.",
    category: "Cosmetic dentistry",
  },
  {
    href: "/tools/dental-implant-candicacy-quiz",
    title: "Dental implant candidacy quiz",
    description: "See which questions matter when deciding whether implants may be worth discussing.",
    category: "Missing teeth",
  },
  {
    href: "/tools/invisalign-readiness-quiz",
    title: "Invisalign readiness quiz",
    description: "Review smile alignment goals, timing, and care habits before an orthodontic visit.",
    category: "Clear braces",
  },
  {
    href: "/tools/emergency-dental-cost-estimator",
    title: "Emergency dental cost estimator",
    description: "Understand urgent care cost drivers for pain, swelling, broken teeth, or extractions.",
    category: "Emergency care",
  },
  {
    href: "/tools/root-canal-cost-estimator",
    title: "Root canal cost estimator",
    description: "Preview the treatment and restoration factors that can affect root canal pricing.",
    category: "Restorative dentistry",
  },
  {
    href: "/tools/root-canal-recovery-timeline-estimator",
    title: "Root canal recovery timeline",
    description: "Set expectations for soreness, eating, follow-up care, and when to call the office.",
    category: "Restorative dentistry",
  },
  {
    href: "/tools/same-day-dental-crown-cost-estimator",
    title: "Same-day crown cost estimator",
    description: "Compare crown material, appointment, and insurance factors before treatment planning.",
    category: "Dental crowns",
  },
  {
    href: "/tools/dental-crown-replacement-cost-estimator",
    title: "Dental crown replacement cost estimator",
    description: "Understand what changes replacement crown pricing and when evaluation is needed.",
    category: "Dental crowns",
  },
  {
    href: "/tools/wisdom-tooth-removal-cost-estimator",
    title: "Wisdom tooth removal cost estimator",
    description: "Review extraction complexity, sedation, and recovery factors before a consultation.",
    category: "Extractions",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? "Herramientas dentales" : "Dental tools",
    description: isEs
      ? "Calculadoras y guias practicas de Sonria Dentista para comparar costos, prepararse para una consulta y entender opciones dentales."
      : "Practical Sonria Dentista calculators and guides to compare costs, prepare for a consultation, and understand dental options.",
    alternates: {
      canonical: `https://sonriadentista.com/${locale}/tools`,
      languages: {
        en: "https://sonriadentista.com/en/tools",
        es: "https://sonriadentista.com/es/tools",
      },
    },
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  const isEs = locale === "es";

  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-soft bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
              <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
              {isEs ? "Herramientas para pacientes" : "Patient tools"}
            </div>
            <h1 className="max-w-3xl font-display text-5xl leading-[1.02] tracking-tight text-foreground md:text-6xl">
              {isEs ? "Compare opciones antes de su visita" : "Compare your options before your visit"}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              {isEs
                ? "Use estas herramientas para prepararse para una consulta, entender factores de costo y saber que preguntas hacerle al equipo de Sonria."
                : "Use these tools to prepare for a consultation, understand common cost factors, and know what to ask the Sonria team."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className="rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta-deep"
              >
                {site.nav.book}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="rounded-full border border-border-soft bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-terracotta hover:text-terracotta"
              >
                {isEs ? "Ver servicios" : "View services"}
              </Link>
            </div>
          </div>
          <div className="grid gap-3 rounded-2xl border border-border-soft bg-background p-5 shadow-warm">
            {[
              {
                icon: ShieldCheck,
                title: isEs ? "Sin reemplazar una consulta" : "Not a replacement for a consultation",
                body: isEs
                  ? "Las herramientas ayudan a prepararse; el dentista confirma el plan."
                  : "These tools help you prepare; the dentist confirms the care plan.",
              },
              {
                icon: CheckCircle2,
                title: isEs ? "Guias practicas" : "Practical guidance",
                body: isEs
                  ? "Compare costos, tiempos, preparacion y proximos pasos."
                  : "Compare cost drivers, timing, preparation, and next steps.",
              },
              {
                icon: Clock,
                title: isEs ? "Rapido de usar" : "Quick to use",
                body: isEs
                  ? "La mayoria de las herramientas toma solo unos minutos."
                  : "Most tools take only a few minutes to complete.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 rounded-xl bg-card p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-soft text-sage-deep">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-semibold text-foreground">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl text-foreground">
              {isEs ? "Herramientas disponibles" : "Available tools"}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              {isEs
                ? "Cada herramienta abre una pagina independiente que puede compartir con pacientes o usar antes de llamar."
                : "Each tool opens its own page, so patients can use it before calling or scheduling."}
            </p>
          </div>
          <span className="rounded-full border border-border-soft bg-card px-4 py-2 text-sm font-semibold text-muted">
            {tools.length} {isEs ? "herramientas" : "tools"}
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex min-h-64 flex-col justify-between rounded-2xl border border-border-soft bg-card p-6 shadow-warm transition hover:-translate-y-0.5 hover:border-terracotta hover:shadow-warm-lg"
            >
              <div>
                <div className="mb-4 inline-flex rounded-full bg-terracotta-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                  {tool.category}
                </div>
                <h3 className="font-display text-2xl leading-tight text-foreground group-hover:text-terracotta">
                  {tool.title}
                </h3>
                <p className="mt-4 leading-7 text-muted">{tool.description}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
                {isEs ? "Abrir herramienta" : "Open tool"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ContactCTA
        heading={site.contactCTA.heading}
        body={site.contactCTA.body}
        cta={site.contactCTA.cta}
        phone={site.contact.phone}
        email={site.contact.email}
        bilingualNote={site.contactCTA.bilingualNote}
      />
    </>
  );
}
