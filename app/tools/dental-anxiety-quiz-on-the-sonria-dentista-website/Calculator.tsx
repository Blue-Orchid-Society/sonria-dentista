"use client";

import { useMemo, useState } from "react";

const questions = [
  {
    id: "fear",
    label: "Treatment fear",
    helper: "How worried is the patient about pain, needles, drilling, or dental procedures?",
    low: "Calm about treatment",
    high: "Very worried",
  },
  {
    id: "avoidance",
    label: "Appointment avoidance",
    helper: "How often does anxiety cause the patient to delay booking, cancel, or skip dental visits?",
    low: "Books when needed",
    high: "Often avoids visits",
  },
  {
    id: "control",
    label: "Need for control",
    helper: "How important is it for the patient to pause, ask questions, or know each step in advance?",
    low: "Flexible during care",
    high: "Needs clear control",
  },
  {
    id: "history",
    label: "Past experience",
    helper: "How much do previous dental experiences affect the patient's current comfort level?",
    low: "No major concerns",
    high: "Strong past impact",
  },
  {
    id: "communication",
    label: "Communication needs",
    helper: "How much reassurance, plain-language explanation, or bilingual support would help before the visit?",
    low: "Minimal support",
    high: "High support need",
  },
  {
    id: "complexity",
    label: "Care complexity",
    helper: "How likely is the visit to involve urgent pain, multiple needs, or a treatment plan conversation?",
    low: "Routine visit",
    high: "Complex or urgent",
  },
] as const;

type QuestionId = (typeof questions)[number]["id"];
type Scores = Record<QuestionId, number>;

const initialScores = questions.reduce((acc, question) => {
  acc[question.id] = 3;
  return acc;
}, {} as Scores);

function getBand(score: number) {
  if (score >= 76) {
    return {
      title: "High-support visit",
      detail:
        "The patient may need extra reassurance before scheduling and during the appointment. A quiz result should route to a staff prompt, a calm pre-visit message, and a clear chairside pause plan.",
      next: "Flag the response for a personal call, confirm language and comfort preferences, and add a short anxiety-support note to the appointment record.",
    };
  }

  if (score >= 48) {
    return {
      title: "Guided-comfort visit",
      detail:
        "The patient has specific concerns that can be addressed with better preparation. Clear expectations, plain-language explanations, and a friendly follow-up can reduce friction before the first appointment.",
      next: "Use the top concern to trigger a tailored pre-visit email, SMS, or call script before the appointment.",
    };
  }

  return {
    title: "Standard visit with preferences",
    detail:
      "The patient does not appear to need a high-support pathway, but the quiz can still capture preferences that make the appointment feel more personal and efficient.",
    next: "Store the preferences in intake notes so the team can acknowledge comfort needs without slowing down routine care.",
  };
}

export function Calculator() {
  const [scores, setScores] = useState<Scores>(initialScores);
  const total = useMemo(
    () => Math.round((Object.values(scores).reduce((sum, value) => sum + value, 0) / (questions.length * 5)) * 100),
    [scores],
  );
  const band = getBand(total);
  const strongestSignals = useMemo(
    () =>
      [...questions]
        .sort((a, b) => scores[b.id] - scores[a.id])
        .slice(0, 2)
        .map((question) => question.label),
    [scores],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16" aria-labelledby="calculator-heading">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm md:p-7">
          <h2 id="calculator-heading" className="font-display text-2xl md:text-3xl">
            Score the dental anxiety pathway
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted md:text-base">
            Rate each area from 1 to 5. The calculator turns the inputs into an anxiety-support score, patient band, and workflow next step.
          </p>
          <div className="mt-7 space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="rounded-md border border-border-soft bg-background/60 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <label htmlFor={question.id} className="font-semibold text-foreground">
                      {question.label}
                    </label>
                    <p className="mt-1 text-sm leading-5 text-muted">{question.helper}</p>
                  </div>
                  <output htmlFor={question.id} className="w-fit rounded-pill bg-secondary-soft px-3 py-1 text-sm font-semibold text-secondary">
                    {scores[question.id]}/5
                  </output>
                </div>
                <input
                  id={question.id}
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={scores[question.id]}
                  onChange={(event) => setScores((current) => ({ ...current, [question.id]: Number(event.target.value) }))}
                  className="mt-4 w-full accent-brand"
                />
                <div className="mt-2 flex justify-between gap-3 text-xs text-muted">
                  <span>{question.low}</span>
                  <span className="text-right">{question.high}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-border-soft bg-foreground p-6 text-card shadow-warm-lg md:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-soft">Support score</p>
            <div className="mt-4 flex items-end gap-3">
              <strong className="font-display text-6xl leading-none text-card">{total}</strong>
              <span className="pb-2 text-lg text-brand-soft">/ 100</span>
            </div>
            <h3 className="mt-6 font-display text-2xl text-card">{band.title}</h3>
            <p className="mt-3 text-sm leading-6 text-card/80">{band.detail}</p>
            <div className="mt-6 rounded-md bg-card/10 p-4">
              <p className="text-sm font-semibold text-card">Strongest signals</p>
              <p className="mt-2 text-sm leading-6 text-card/80">
                {strongestSignals.join(" and ")} are the highest support signals based on the current inputs.
              </p>
            </div>
            <div className="mt-5 rounded-md bg-card/10 p-4">
              <p className="text-sm font-semibold text-card">Recommended next move</p>
              <p className="mt-2 text-sm leading-6 text-card/80">{band.next}</p>
            </div>
            <a href="https://blueorchid.world/contact" className="mt-6 inline-flex w-full items-center justify-center rounded-pill bg-brand px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-brand-deep">
              Talk with Blue Orchid Society
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
