import type { Metadata } from "next";
import Link from "next/link";
import { DentalImplantQuiz } from "./DentalImplantQuiz";

export const metadata: Metadata = {
  title: "Dental Implant Candicacy Quiz Tool for SMB Teams | Blue Orchid Society",
  description:
    "Use this practical dental implant candicacy quiz resource to assess your next move, prioritize improvements, and identify where AI can create leverage.",
  alternates: {
    canonical: "/tools/dental-implant-candicacy-quiz",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Dental Implant Candicacy Quiz Tool for SMB Teams",
  description:
    "Use this practical dental implant candicacy quiz resource to assess implant readiness, compare planning factors, and understand next steps.",
  url: "https://sonriadentista.com/tools/dental-implant-candicacy-quiz",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Dental Implant Candicacy Quiz Calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
};

const checkpoints = [
  "A missing, failing, or badly damaged tooth is affecting comfort, chewing, or confidence.",
  "Gums are healthy enough for treatment, or you are ready to treat gum disease first.",
  "Medical conditions, smoking, or medications are stable enough to review with a dentist.",
  "You understand implants often require planning, imaging, healing time, and a final restoration.",
];

export default function DentalImplantCandicacyQuizPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="border-b border-border-soft bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              Free implant planning tool
            </p>
            <h1 className="mt-4 font-display text-4xl text-brand-deep md:text-5xl">
              Dental Implant Candicacy Quiz
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Answer a few practical questions to estimate whether dental implants may be worth discussing with a dentist, what could affect timing, and which cost factors to ask about before treatment.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              This tool is educational and does not diagnose you. A dentist needs an exam, X-rays or 3D imaging, and a health review to confirm whether implants are appropriate.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_360px]">
        <div>
          <DentalImplantQuiz />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-border-soft bg-card p-6 shadow-warm-sm">
            <h2 className="font-display text-2xl text-brand-deep">What this quiz checks</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              {checkpoints.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sage" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border-soft bg-card p-6 shadow-warm-sm">
            <h2 className="font-display text-2xl text-brand-deep">Useful next steps</h2>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-brand-deep">
              <Link className="rounded-md border border-border-soft px-4 py-3 hover:bg-sage/10" href="/services">
                Review implementation services
              </Link>
              <Link className="rounded-md border border-border-soft px-4 py-3 hover:bg-sage/10" href="/tools">
                Explore tools and calculators
              </Link>
              <Link className="rounded-md border border-border-soft px-4 py-3 hover:bg-sage/10" href="/ai-readiness">
                Take the AI readiness assessment
              </Link>
              <Link className="rounded-md bg-terracotta px-4 py-3 text-white hover:bg-terracotta/90" href="/contact">
                Talk with Blue Orchid Society
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="border-t border-border-soft bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h2 className="font-display text-2xl text-brand-deep">How to use your result</h2>
            </div>
            <div className="md:col-span-2 grid gap-5 text-sm leading-7 text-muted md:grid-cols-2">
              <p>
                A high score means you have several signals that make an implant conversation reasonable. It does not mean surgery is guaranteed or that every dentist will recommend the same plan.
              </p>
              <p>
                A lower score usually means there are planning issues to solve first, such as gum treatment, bone support, medical review, budget clarity, or timeline expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
