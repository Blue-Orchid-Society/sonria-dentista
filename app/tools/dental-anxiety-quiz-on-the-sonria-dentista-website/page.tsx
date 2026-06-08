import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "./Calculator";

const title = "Dental Anxiety Quiz On The Sonria Dentista Website Tool for SMB Teams | Blue Orchid Society";
const description = "Use this practical dental anxiety quiz on the sonria dentista website resource to assess your next move, prioritize improvements, and identify where AI can create leverage.";
const url = "https://sonriadentista.com/tools/dental-anxiety-quiz-on-the-sonria-dentista-website";
const blueOrchidBase = "https://blueorchid.world";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
};

export default function DentalAnxietyQuizPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: {
      "@type": "WebSite",
      name: "Sonria Dentista",
      url: "https://sonriadentista.com",
    },
    about: [
      "dental anxiety quiz",
      "patient intake",
      "dental practice automation",
      "AI implementation",
    ],
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Dental Anxiety Quiz On The Sonria Dentista Website",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground-soft">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-border-soft bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6">
          <Link href="/es" className="text-sm font-semibold text-brand-deep hover:text-brand">
            Sonria Dentista
          </Link>
          <Link href="/en/contact" className="text-sm font-semibold text-foreground hover:text-brand">
            Book a visit
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-br from-sage-soft via-background to-terracotta-soft/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-end md:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-deep">
              Dental anxiety quiz on the Sonria Dentista website
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl md:text-6xl">
              Estimate the support a nervous dental patient may need before the visit.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Use this dental anxiety quiz to model how a website intake tool can turn patient concerns into a clear comfort plan for scheduling, reminders, and chairside communication.
            </p>
          </div>
          <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm">
            <h2 className="font-display text-2xl">What the quiz returns</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              <li>A 0 to 100 anxiety-support score.</li>
              <li>A support band for the likely patient experience.</li>
              <li>The strongest comfort signals to address first.</li>
              <li>A practical workflow recommendation for intake follow-up.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm">
            <h2 className="font-display text-2xl">For patients</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The questions help name the parts of dental care that feel stressful: pain, loss of control, past experiences, language needs, or complex treatment decisions.
            </p>
          </div>
          <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm">
            <h2 className="font-display text-2xl">For dental teams</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The score can guide a calmer first call, a more useful appointment note, and a simple checklist for reassurance before the patient sits down.
            </p>
          </div>
          <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm">
            <h2 className="font-display text-2xl">For operators</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The same pattern can become an AI-ready workflow: capture inputs, route the case, draft follow-up, and give the team consistent prompts.
            </p>
          </div>
        </div>
      </section>

      <Calculator />

      <section className="border-y border-border-soft bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-deep">
                How to use the result
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Treat the quiz as communication triage, not a clinical diagnosis.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-muted">
              <p>
                A higher score suggests the patient may benefit from slower explanations, permission to pause, and proactive reassurance before scheduling. A middle score points to a specific friction point that clear instructions, expectations, and options can address.
              </p>
              <p>
                A lower score still creates value by capturing preferences before the appointment. The goal is not to label the patient. The goal is to help the team respond with the right level of care, clarity, and follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-4">
          <a href={`${blueOrchidBase}/ai-readiness`} className="rounded-lg border border-border-soft bg-card p-5 shadow-warm transition hover:-translate-y-0.5">
            <span className="text-sm font-semibold text-brand-deep">Assessment</span>
            <h3 className="mt-2 font-display text-xl">AI readiness assessment</h3>
          </a>
          <a href={`${blueOrchidBase}/tools`} className="rounded-lg border border-border-soft bg-card p-5 shadow-warm transition hover:-translate-y-0.5">
            <span className="text-sm font-semibold text-brand-deep">More tools</span>
            <h3 className="mt-2 font-display text-xl">AI tools and calculators</h3>
          </a>
          <a href={`${blueOrchidBase}/services`} className="rounded-lg border border-border-soft bg-card p-5 shadow-warm transition hover:-translate-y-0.5">
            <span className="text-sm font-semibold text-brand-deep">Implementation</span>
            <h3 className="mt-2 font-display text-xl">AI implementation services</h3>
          </a>
          <a href={`${blueOrchidBase}/contact`} className="rounded-lg border border-brand bg-brand p-5 text-white shadow-warm transition hover:-translate-y-0.5 hover:bg-brand-deep">
            <span className="text-sm font-semibold text-white/80">Next step</span>
            <h3 className="mt-2 font-display text-xl text-white">Talk with Blue Orchid Society</h3>
          </a>
        </div>
      </section>
    </main>
  );
}
