"use client";

import { useMemo, useState } from "react";

type Answer = "yes" | "unsure" | "no";

type Question = {
  id: string;
  label: string;
  prompt: string;
  weight: number;
};

const questions: Question[] = [
  {
    id: "missing-teeth",
    label: "Tooth replacement need",
    prompt:
      "You have one or more missing, failing, or badly damaged teeth that make chewing, smiling, or speaking harder.",
    weight: 18,
  },
  {
    id: "gum-health",
    label: "Gum health",
    prompt:
      "Your gums are generally healthy, or you are willing to treat gum disease before starting an implant plan.",
    weight: 16,
  },
  {
    id: "bone-support",
    label: "Jawbone support",
    prompt:
      "A dentist has said you have enough bone for an implant, or you are open to learning whether bone grafting is needed.",
    weight: 14,
  },
  {
    id: "medical-stability",
    label: "Medical readiness",
    prompt:
      "Diabetes, smoking, medications, or other health factors are controlled enough to discuss oral surgery safely.",
    weight: 18,
  },
  {
    id: "timeline",
    label: "Treatment timeline",
    prompt:
      "You understand implants often take several months from exam and imaging to the final tooth restoration.",
    weight: 12,
  },
  {
    id: "budget",
    label: "Budget planning",
    prompt:
      "You are ready to compare the full treatment cost, financing options, and what insurance may or may not cover.",
    weight: 12,
  },
  {
    id: "maintenance",
    label: "Long-term care",
    prompt:
      "You can commit to cleanings, home care, and follow-up visits that help protect an implant over time.",
    weight: 10,
  },
];

const replacementOptions = [
  { value: "single", label: "One tooth", range: "$3,000 to $6,000" },
  { value: "multiple", label: "Several teeth", range: "$6,000 to $20,000+" },
  { value: "arch", label: "Full arch", range: "$18,000 to $35,000+ per arch" },
];

const answerLabels: Record<Answer, string> = {
  yes: "Yes",
  unsure: "Not sure",
  no: "No",
};

export function DentalImplantQuiz() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [replacementScope, setReplacementScope] = useState("single");
  const [timeline, setTimeline] = useState("flexible");

  const result = useMemo(() => {
    const maxScore = questions.reduce((sum, question) => sum + question.weight, 0);
    const score = questions.reduce((sum, question) => {
      const answer = answers[question.id];
      if (answer === "yes") return sum + question.weight;
      if (answer === "unsure") return sum + question.weight * 0.5;
      return sum;
    }, 0);
    const percentage = Math.round((score / maxScore) * 100);

    if (percentage >= 75) {
      return {
        percentage,
        title: "Strong conversation candidate",
        summary:
          "Your answers suggest dental implants may be worth discussing with a dentist soon. The most useful next step is a consultation with imaging and a written treatment estimate.",
        action: "Ask about implant placement, restoration cost, healing time, financing, and whether any grafting or gum treatment is needed.",
      };
    }

    if (percentage >= 45) {
      return {
        percentage,
        title: "Possible candidate with planning items",
        summary:
          "Your answers show some positive signals, but there are factors to clarify before you can compare implant options confidently.",
        action: "Start with an exam and ask the dentist to identify which items affect timing, risk, and total cost.",
      };
    }

    return {
      percentage,
      title: "Needs more evaluation first",
      summary:
        "Your answers suggest it may be early to make an implant decision. That does not rule implants out, but it does mean the first step is diagnostic clarity.",
      action: "Focus on gum health, medical review, X-rays or 3D imaging, and a full replacement-options comparison.",
    };
  }, [answers]);

  const selectedReplacement = replacementOptions.find((option) => option.value === replacementScope) ?? replacementOptions[0];
  const answeredCount = Object.keys(answers).length;

  function updateAnswer(id: string, answer: Answer) {
    setAnswers((current) => ({ ...current, [id]: answer }));
  }

  return (
    <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm-sm md:p-8">
      <div className="grid gap-5 border-b border-border-soft pb-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-brand-deep">
          Replacement need
          <select
            className="rounded-md border border-border-soft bg-background px-3 py-3 text-sm font-normal text-foreground outline-none focus:border-terracotta"
            value={replacementScope}
            onChange={(event) => setReplacementScope(event.target.value)}
          >
            {replacementOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-brand-deep">
          Preferred timing
          <select
            className="rounded-md border border-border-soft bg-background px-3 py-3 text-sm font-normal text-foreground outline-none focus:border-terracotta"
            value={timeline}
            onChange={(event) => setTimeline(event.target.value)}
          >
            <option value="soon">As soon as safely possible</option>
            <option value="flexible">Flexible after planning</option>
            <option value="researching">Still researching options</option>
          </select>
        </label>
      </div>

      <div className="mt-7 space-y-5">
        {questions.map((question) => (
          <fieldset key={question.id} className="rounded-lg border border-border-soft bg-background p-4">
            <legend className="px-1 text-sm font-semibold text-brand-deep">{question.label}</legend>
            <p className="mt-2 text-sm leading-6 text-muted">{question.prompt}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(Object.keys(answerLabels) as Answer[]).map((answer) => {
                const active = answers[question.id] === answer;
                return (
                  <button
                    key={answer}
                    type="button"
                    className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-terracotta bg-terracotta text-white"
                        : "border-border-soft bg-card text-brand-deep hover:bg-sage/10"
                    }`}
                    onClick={() => updateAnswer(question.id, answer)}
                  >
                    {answerLabels[answer]}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <section className="mt-8 rounded-lg bg-brand-deep p-5 text-white md:p-6" aria-live="polite">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
              Readiness score
            </p>
            <h2 className="mt-2 font-display text-3xl">{result.title}</h2>
          </div>
          <div className="rounded-md bg-white/10 px-4 py-3 text-center">
            <div className="font-display text-4xl">{result.percentage}%</div>
            <div className="text-xs text-white/70">{answeredCount} of {questions.length} answered</div>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/82">{result.summary}</p>
        <p className="mt-3 text-sm leading-6 text-white/82">{result.action}</p>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border-soft bg-background p-5">
          <h3 className="font-display text-xl text-brand-deep">Estimated cost category</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            {selectedReplacement.label}: commonly {selectedReplacement.range}, depending on exam findings, imaging, grafting, implant parts, and the final restoration.
          </p>
        </div>
        <div className="rounded-lg border border-border-soft bg-background p-5">
          <h3 className="font-display text-xl text-brand-deep">Timing note</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            {timeline === "soon"
              ? "Ask for a same-week consultation and a phased treatment plan so urgent issues are handled first."
              : timeline === "researching"
                ? "Use your consultation to compare implants, bridges, partial dentures, and no-treatment risks."
                : "A flexible timeline can make it easier to plan imaging, financing, healing, and final restoration visits."}
          </p>
        </div>
      </div>
    </div>
  );
}
