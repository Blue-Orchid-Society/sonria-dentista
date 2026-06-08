import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "./Calculator";

const title = "Emergency Dental Cost Estimator Tool for SMB Teams | Blue Orchid Society";
const description =
  "Use this practical emergency dental cost estimator resource to assess your next move, prioritize improvements, and identify where AI can create leverage.";
const url = "https://sonriadentista.com/tools/emergency-dental-cost-estimator";
const blueOrchidBase = "https://blueorchid.world";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
};

export default function EmergencyDentalCostEstimatorPage() {
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
      "emergency dental cost estimator",
      "dental practice operations",
      "patient intake",
      "AI implementation",
    ],
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Emergency Dental Cost Estimator",
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
              Emergency dental cost estimator
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl md:text-6xl">
              Estimate the likely cost range before an urgent dental visit.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Use this estimator to model how an emergency dental intake tool can help patients understand likely visit costs, urgency, and the next operational step before they call or book.
            </p>
          </div>
          <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm">
            <h2 className="font-display text-2xl">What the estimator returns</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              <li>A practical low-to-high cost range.</li>
              <li>A recommended urgency band for the situation.</li>
              <li>The main cost drivers behind the estimate.</li>
              <li>A workflow recommendation for intake follow-up.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm">
            <h2 className="font-display text-2xl">For patients</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The inputs help set expectations for exam fees, X-rays, pain control, extraction, root canal, crown repair, or swelling-related care before an urgent appointment.
            </p>
          </div>
          <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm">
            <h2 className="font-display text-2xl">For dental teams</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              A cost estimate can make the first call clearer, reduce surprises, and give staff a consistent way to explain why the dentist needs to diagnose the final treatment plan.
            </p>
          </div>
          <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm">
            <h2 className="font-display text-2xl">For operators</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The same pattern can become an AI-ready workflow: capture symptoms, triage urgency, draft follow-up, and route high-risk cases to the right team member.
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
                How to use the estimate
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Treat the range as preparation, not a diagnosis or quote.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-muted">
              <p>
                Emergency dental costs depend on the diagnosis, imaging, the tooth involved, infection risk, sedation needs, insurance, and whether care can be stabilized or needs definitive treatment the same day.
              </p>
              <p>
                For a practice team, the value of an estimator is not replacing the dentist. The value is giving patients a clearer first answer, collecting better intake context, and helping staff prioritize urgent cases with less manual back-and-forth.
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
