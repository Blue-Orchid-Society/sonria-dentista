import type { Metadata } from "next";
import Link from "next/link";
import { DentalImplantsReadinessQuiz } from "./DentalImplantsReadinessQuiz";

export const metadata: Metadata = {
  title: "Dental Implants Readiness Quiz Tool | Sonria Dentista",
  description:
    "Use this practical dental implants readiness quiz resource to understand your options, prioritize next steps, and decide what to do next.",
  alternates: { canonical: "/tools/dental-implants-readiness-quiz" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Dental Implants Readiness Quiz Tool",
  description:
    "Use this practical dental implants readiness quiz resource to understand your options, prioritize next steps, and decide what to do next.",
  url: "https://sonriadentista.com/tools/dental-implants-readiness-quiz",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Dental Implants Readiness Quiz",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
};

export default function DentalImplantsReadinessQuizPage() {
  return (
    <main className="bg-[#f8faf7] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="bg-[#0f3d3e] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f1c76a]">
              Free dental implants readiness quiz
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
              Find out how ready you may be for dental implants.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              Answer a few practical questions about your missing tooth situation, oral health,
              timeline, and concerns. You will get a readiness level, a short explanation, and a
              clearer next step for talking with Sonria Dentista.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1c76a] px-6 py-3 text-sm font-semibold text-[#173536]" href="#quiz">
                Start the quiz
              </a>
              <Link className="rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white" href="/contact">
                Ask the team
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/14 bg-white/10 p-6 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f1c76a]">
              What this checks
            </p>
            <div className="mt-5 grid gap-4">
              {["Your tooth replacement goal", "Dental and medical readiness", "Timeline for next steps", "Concerns that may affect planning"].map((item) => (
                <div key={item} className="rounded-md bg-white/10 p-4 text-sm leading-6 text-white/86">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="quiz" className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <DentalImplantsReadinessQuiz />
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3 lg:px-8">
          {[
            ["Your mouth needs a real exam", "Implant planning usually starts with X-rays or 3D imaging, a gum health review, and a bite evaluation."],
            ["Readiness can improve", "Gum treatment, cavity care, bone grafting, smoking changes, or medical coordination can make an implant plan safer."],
            ["Timing matters", "Some patients can start with a consultation soon, while others benefit from stabilizing pain, infection, or health factors first."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-[#f8faf7] p-6">
              <h2 className="text-lg font-semibold text-[#173536]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f6b67]">Related next steps</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#173536]">Use your result to plan the right conversation.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-[#173536] shadow-sm" href="/services">Compare dental services</Link>
            <Link className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-[#173536] shadow-sm" href="/tools/dental-implant-cost-guide-for-arlington-patients">Review implant costs</Link>
            <Link className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-[#173536] shadow-sm" href="/contact">Contact Sonria Dentista</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#173536] px-6 py-12 text-white lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Ready to talk through your implant options?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78">
              Bring your quiz result to a consultation so the team can review your mouth, health history, budget questions, and timeline with you.
            </p>
          </div>
          <Link className="inline-flex w-fit rounded-full bg-[#f1c76a] px-6 py-3 text-sm font-semibold text-[#173536]" href="/contact">
            Schedule a consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
