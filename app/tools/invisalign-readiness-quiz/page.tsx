import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Invisalign Readiness Quiz | Sonria Dentista",
  description:
    "Use this practical invisalign readiness quiz resource to assess your next move, prepare for a consultation, and understand what to ask before scheduling care.",
  alternates: {
    canonical: "/tools/invisalign-readiness-quiz",
  },
};

const questions = [
  {
    id: "case-fit",
    label: "Smile goal clarity",
    prompt: "You know what you want to improve, such as spacing, crowding, bite comfort, or relapse after braces.",
  },
  {
    id: "oral-health",
    label: "Dental health foundation",
    prompt: "Your gums are generally healthy, cavities are treated, and you keep up with cleanings.",
  },
  {
    id: "wear-time",
    label: "Daily wear commitment",
    prompt: "You can wear aligners for 20 to 22 hours most days and remove them only for meals and brushing.",
  },
  {
    id: "routine",
    label: "Routine readiness",
    prompt: "You can brush, floss, rinse trays, and store aligners consistently during work, school, or travel.",
  },
  {
    id: "visits",
    label: "Appointment availability",
    prompt: "You can attend scans, progress checks, and refinement visits when your dentist recommends them.",
  },
  {
    id: "budget",
    label: "Budget planning",
    prompt: "You have reviewed insurance, financing, HSA/FSA options, or a monthly payment range.",
  },
];

const answers = [
  { value: "0", label: "Not yet" },
  { value: "1", label: "Somewhat" },
  { value: "2", label: "Yes" },
];

export default function InvisalignReadinessQuizPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Invisalign Readiness Quiz",
    description:
      "Use this practical invisalign readiness quiz resource to assess your next move, prepare for a consultation, and understand what to ask before scheduling care.",
    url: "https://sonriadentista.com/tools/invisalign-readiness-quiz",
  };

  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="border-b border-border-soft bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              Invisalign readiness quiz
            </p>
            <h1 className="mt-4 font-display text-4xl text-brand-deep md:text-5xl">
              Find out if you are ready to start an Invisalign conversation
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Answer six practical questions about dental health, daily habits, scheduling,
              and budget planning. The quiz gives you a readiness score and a focused next
              step to discuss with a dental team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-brand-deep px-6 py-3 text-sm font-semibold text-white transition hover:bg-foreground"
              >
                Schedule a consultation
              </Link>
              <Link
                href="/tools"
                className="rounded-full border border-border-soft px-6 py-3 text-sm font-semibold text-brand-deep transition hover:border-terracotta hover:text-terracotta"
              >
                View more tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[1.35fr_0.85fr]">
        <form id="readiness-quiz" className="rounded-2xl border border-border-soft bg-white p-6 shadow-warm md:p-8">
          <div className="flex flex-col gap-2 border-b border-border-soft pb-6">
            <h2 className="font-display text-3xl text-brand-deep">Quiz calculator</h2>
            <p className="text-muted">
              Choose the answer that best matches your current situation. This is educational
              guidance, not a clinical diagnosis.
            </p>
          </div>

          <div className="mt-7 grid gap-6">
            {questions.map((question, index) => (
              <fieldset key={question.id} className="rounded-xl border border-border-soft p-4">
                <legend className="px-1 text-sm font-semibold text-brand-deep">
                  {index + 1}. {question.label}
                </legend>
                <p className="mt-2 text-sm leading-relaxed text-muted">{question.prompt}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {answers.map((answer) => (
                    <label
                      key={`${question.id}-${answer.value}`}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-soft px-3 py-2 text-sm transition hover:border-terracotta"
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={answer.value}
                        defaultChecked={answer.value === "1"}
                        className="accent-terracotta"
                      />
                      <span>{answer.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              data-calculate-readiness
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
            >
              Calculate readiness
            </button>
            <button
              type="reset"
              className="rounded-full border border-border-soft px-6 py-3 text-sm font-semibold text-brand-deep transition hover:border-terracotta hover:text-terracotta"
            >
              Reset
            </button>
          </div>
        </form>

        <aside className="rounded-2xl border border-border-soft bg-card p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            Your output
          </p>
          <div className="mt-4">
            <div className="font-display text-5xl text-brand-deep">
              <span data-score>6</span>
              <span className="text-2xl text-muted">/12</span>
            </div>
            <h2 data-status className="mt-4 font-display text-2xl text-brand-deep">
              Building readiness
            </h2>
            <p data-summary className="mt-3 leading-relaxed text-muted">
              You may be a candidate, but a few practical items need attention before
              treatment feels easy to maintain.
            </p>
          </div>

          <div className="mt-8 rounded-xl bg-white p-5">
            <h3 className="font-semibold text-brand-deep">Recommended next step</h3>
            <p data-next-step className="mt-2 text-sm leading-relaxed text-muted">
              Start with a consultation, ask about gum health and bite fit, then confirm
              insurance or payment options before committing.
            </p>
          </div>

          <div className="mt-8 grid gap-3 text-sm">
            <Link href="/tools" className="font-semibold text-terracotta hover:text-brand-deep">
              Dental planning guide
            </Link>
            <Link href="/services" className="font-semibold text-terracotta hover:text-brand-deep">
              Dental services
            </Link>
            <Link href="/contact" className="font-semibold text-terracotta hover:text-brand-deep">
              Contact Sonria Dentista
            </Link>
          </div>
        </aside>
      </section>

      <section className="border-t border-border-soft bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-display text-3xl text-brand-deep">How to use your score</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-border-soft p-5">
              <h3 className="font-semibold text-brand-deep">0 to 4: Prepare first</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Focus on dental health, treatment expectations, and budget clarity before
                starting aligner planning.
              </p>
            </div>
            <div className="rounded-xl border border-border-soft p-5">
              <h3 className="font-semibold text-brand-deep">5 to 8: Building readiness</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                You likely have enough information to book a consultation and identify the
                specific blockers to solve.
              </p>
            </div>
            <div className="rounded-xl border border-border-soft p-5">
              <h3 className="font-semibold text-brand-deep">9 to 12: Consultation ready</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Bring your goals, dental history, insurance details, and routine questions to
                a scan or exam.
              </p>
            </div>
          </div>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(() => {
  const form = document.getElementById("readiness-quiz");
  if (!form) return;
  const scoreEl = document.querySelector("[data-score]");
  const statusEl = document.querySelector("[data-status]");
  const summaryEl = document.querySelector("[data-summary]");
  const nextStepEl = document.querySelector("[data-next-step]");
  const button = document.querySelector("[data-calculate-readiness]");

  const results = [
    {
      min: 0,
      max: 4,
      status: "Prepare first",
      summary: "Invisalign may still be possible, but readiness is low until dental health, expectations, routine, or budget planning are clearer.",
      next: "Book a general dental exam, treat active dental issues first, and ask what would need to change before aligners make sense."
    },
    {
      min: 5,
      max: 8,
      status: "Building readiness",
      summary: "You may be a candidate, but a few practical items need attention before treatment feels easy to maintain.",
      next: "Start with a consultation, ask about gum health and bite fit, then confirm insurance or payment options before committing."
    },
    {
      min: 9,
      max: 12,
      status: "Consultation ready",
      summary: "Your answers suggest you are ready for a focused Invisalign consultation and a personalized treatment plan.",
      next: "Schedule a scan or exam, bring your smile goals, and ask about timeline, refinements, retainers, and total out-of-pocket cost."
    }
  ];

  function calculate() {
    const total = Array.from(new FormData(form).values()).reduce((sum, value) => {
      return sum + Number(value || 0);
    }, 0);
    const result = results.find((item) => total >= item.min && total <= item.max) || results[1];
    if (scoreEl) scoreEl.textContent = String(total);
    if (statusEl) statusEl.textContent = result.status;
    if (summaryEl) summaryEl.textContent = result.summary;
    if (nextStepEl) nextStepEl.textContent = result.next;
  }

  button?.addEventListener("click", calculate);
  form.addEventListener("change", calculate);
  form.addEventListener("reset", () => window.setTimeout(calculate, 0));
  calculate();
})();
          `,
        }}
      />
    </main>
  );
}
