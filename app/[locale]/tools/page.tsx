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

const cardStyles = [
  "bg-foreground text-background",
  "bg-sage-deep text-white",
  "bg-terracotta text-white",
  "bg-gold text-foreground",
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
      <section className="relative overflow-hidden bg-foreground text-background">
        <img
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-38"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/82 to-foreground/28" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur">
              <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
              {isEs ? "Herramientas para pacientes" : "Patient tools"}
            </div>
            <h1 className="max-w-3xl font-display text-5xl leading-[1.02] tracking-tight text-white md:text-7xl">
              {isEs ? "Compare opciones antes de su visita" : "Compare your options before your visit"}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-background/80">
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
                className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-foreground"
              >
                {isEs ? "Ver servicios" : "View services"}
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
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
              <div key={item.title} className="flex gap-3 rounded-xl bg-background p-5 text-foreground shadow-warm">
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

      <section className="bg-card py-14">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          <div className="rounded-xl bg-sage-deep p-6 text-white shadow-warm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              {isEs ? "Antes de llamar" : "Before calling"}
            </p>
            <p className="mt-3 text-lg leading-7">
              {isEs
                ? "Revise costos, tiempos y preguntas importantes con calma."
                : "Review cost factors, timing, and important questions calmly."}
            </p>
          </div>
          <div className="rounded-xl bg-gold p-6 text-foreground shadow-warm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
              {isEs ? "Para la consulta" : "For the visit"}
            </p>
            <p className="mt-3 text-lg leading-7">
              {isEs
                ? "Llegue con mejor contexto para hablar con el dentista."
                : "Arrive with better context for the conversation with the dentist."}
            </p>
          </div>
          <div className="rounded-xl bg-terracotta p-6 text-white shadow-warm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/78">
              {tools.length} {isEs ? "herramientas" : "tools"}
            </p>
            <p className="mt-3 text-lg leading-7">
              {isEs
                ? "Cada herramienta abre una pagina independiente."
                : "Each tool opens its own dedicated page."}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 max-w-3xl">
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              {isEs ? "Herramientas disponibles" : "Available tools"}
            </h2>
            <p className="mt-3 leading-7 text-muted">
              {isEs
                ? "Cada herramienta ayuda a pacientes a explorar opciones y prepararse antes de llamar o programar."
                : "Each tool helps patients explore options and prepare before calling or scheduling."}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => {
              const isDark = index % 4 !== 3;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`group flex min-h-72 flex-col justify-between rounded-xl p-6 shadow-warm transition hover:-translate-y-0.5 hover:shadow-warm-lg ${cardStyles[index % cardStyles.length]}`}
                >
                  <div>
                    <div
                      className={`mb-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
                        isDark ? "bg-white/16 text-white" : "bg-white/40 text-terracotta"
                      }`}
                    >
                      {tool.category}
                    </div>
                    <h3 className="font-display text-2xl leading-tight">{tool.title}</h3>
                    <p className={`mt-4 leading-7 ${isDark ? "text-white/78" : "text-foreground/72"}`}>
                      {tool.description}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    {isEs ? "Abrir herramienta" : "Open tool"}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
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
