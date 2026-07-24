"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type AnswerId = "ideal" | "mixed" | "blocker" | "";
type Option = { id: Exclude<AnswerId, "">; label: string; helper: string; points: number };
type Question = { id: string; label: string; prompt: string; options: Option[] };

const questions: Question[] = [
  {
    id: "goal",
    label: "Goal or situation",
    prompt: "What best describes why you are exploring dental implants?",
    options: [
      { id: "ideal", label: "One or more missing teeth", helper: "You want a long-term replacement that feels stable for chewing and smiling.", points: 24 },
      { id: "mixed", label: "A tooth may not be savable", helper: "You need a dentist to confirm whether extraction, a bridge, or an implant makes sense.", points: 16 },
      { id: "blocker", label: "Mostly researching options", helper: "You are comparing treatment paths and may not have a specific tooth problem yet.", points: 8 },
    ],
  },
  {
    id: "condition",
    label: "Current readiness",
    prompt: "How does your dental and medical foundation look right now?",
    options: [
      { id: "ideal", label: "Stable and recently checked", helper: "Your gums, cavities, and health conditions are generally managed.", points: 26 },
      { id: "mixed", label: "Some items need review", helper: "You may need gum care, fillings, imaging, or medical clearance before planning.", points: 15 },
      { id: "blocker", label: "Pain, infection, or active disease", helper: "You may need urgent or stabilizing treatment before implant planning.", points: 2 },
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
    prompt: "When would you like to take the next step?",
    options: [
      { id: "ideal", label: "I am ready to schedule", helper: "You can make time for an exam and understand treatment may happen in phases.", points: 22 },
      { id: "mixed", label: "Within the next few months", helper: "You want to learn the process, budget, and likely sequence before committing.", points: 14 },
      { id: "blocker", label: "No clear timeline", helper: "You are early in research and still deciding whether implants fit your priorities.", points: 5 },
    ],
  },
  {
    id: "concerns",
    label: "Concerns or blockers",
    prompt: "Which concern feels most important to solve first?",
    options: [
      { id: "ideal", label: "I mainly need a personalized plan", helper: "You are ready to review candidacy, imaging, cost, and timing with a dentist.", points: 24 },
      { id: "mixed", label: "Cost, insurance, or healing time", helper: "You need transparent ranges and a phased plan before deciding.", points: 14 },
      { id: "blocker", label: "Fear, smoking, health, or bone loss", helper: "These factors do not always rule out implants, but they need careful planning.", points: 4 },
    ],
  },
];

const emptyAnswers = questions.reduce<Record<string, AnswerId>>((answers, question) => {
  answers[question.id] = "";
  return answers;
}, {});

function getResult(score: number, answeredCount: number, hasBlocker: boolean) {
  if (answeredCount < questions.length) {
    return {
      level: "Keep going",
      headline: "Answer each section to see your readiness level.",
      body: "Your result will update as you choose options for your situation, current dental health, timeline, and biggest concern.",
      cta: "Complete the quiz",
      tone: "bg-white",
    };
  }
  if (hasBlocker || score < 45) {
    return {
      level: "Plan-first readiness",
      headline: "Start with an exam to remove blockers before implant planning.",
      body: "Your answers suggest pain, active dental disease, unclear timing, or health concerns may need attention first. The useful next step is a consultation that clarifies what must be stabilized and whether implants remain a good path.",
      cta: "Ask about your first visit",
      tone: "bg-[#fff7ed]",
    };
  }
  if (score < 75) {
    return {
      level: "Moderate readiness",
      headline: "You may be a candidate, but a few details need review.",
      body: "Your result points toward a practical implant conversation, especially around imaging, gum health, cost, timing, or possible add-ons. A dentist can confirm whether you are ready to plan or need prep care first.",
      cta: "Review next steps",
      tone: "bg-[#eef8f6]",
    };
  }
  return {
    level: "Strong readiness",
    headline: "You look ready for a dental implant consultation.",
    body: "Your answers show a clear tooth replacement need, a workable timeline, and fewer obvious blockers. The next step is an in-person exam so Sonria Dentista can evaluate bone support, gums, bite, and treatment sequence.",
    cta: "Schedule a consultation",
    tone: "bg-[#ecfdf3]",
  };
}

export function DentalImplantsReadinessQuiz() {
  const [answers, setAnswers] = useState<Record<string, AnswerId>>(emptyAnswers);
  const result = useMemo(() => {
    const selectedOptions = questions
      .map((question) => question.options.find((option) => option.id === answers[question.id]))
      .filter(Boolean) as Option[];
    const score = selectedOptions.reduce((total, option) => total + option.points, 0);
    const answeredCount = Object.values(answers).filter(Boolean).length;
    const hasBlocker = Object.values(answers).includes("blocker");
    return { score, answeredCount, hasBlocker, details: getResult(score, answeredCount, hasBlocker) };
  }, [answers]);
  const progress = Math.round((result.answeredCount / questions.length) * 100);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f6b67]">Implant readiness inputs</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#173536]">Choose the answer that fits best.</h2>
          </div>
          <button type="button" onClick={() => setAnswers(emptyAnswers)} className="w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
            Reset
          </button>
        </div>
        <div className="mt-6 space-y-6">
          {questions.map((question, index) => (
            <fieldset key={question.id} className="rounded-lg border border-slate-200 p-4">
              <legend className="px-1 text-sm font-semibold text-[#173536]">{index + 1}. {question.label}</legend>
              <p className="mt-2 text-sm leading-6 text-slate-700">{question.prompt}</p>
              <div className="mt-4 grid gap-3">
                {question.options.map((option) => {
                  const checked = answers[question.id] === option.id;
                  return (
                    <label key={option.id} className={`cursor-pointer rounded-lg border p-4 transition ${checked ? "border-[#0f6b67] bg-[#eef8f6] shadow-sm" : "border-slate-200 bg-white hover:border-[#8ab7ae]"}`}>
                      <span className="flex gap-3">
                        <input
                          type="radio"
                          name={question.id}
                          value={option.id}
                          checked={checked}
                          onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                          className="mt-1 h-4 w-4 accent-[#0f6b67]"
                        />
                        <span>
                          <span className="block text-sm font-semibold text-slate-900">{option.label}</span>
                          <span className="mt-1 block text-sm leading-6 text-slate-600">{option.helper}</span>
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </form>

      <aside className="lg:sticky lg:top-6">
        <div className={`rounded-lg border border-slate-200 p-6 shadow-sm ${result.details.tone}`}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f6b67]">Your result</p>
            <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#173536] shadow-sm">{progress}% complete</span>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-[#0f6b67] transition-all" style={{ width: `${result.answeredCount < questions.length ? progress : result.score}%` }} />
          </div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-600">Readiness level</p>
              <h3 className="mt-1 text-2xl font-semibold text-[#173536]">{result.details.level}</h3>
            </div>
            <p className="text-4xl font-semibold text-[#0f6b67]">{result.score}</p>
          </div>
          <h4 className="mt-6 text-xl font-semibold text-[#173536]">{result.details.headline}</h4>
          <p className="mt-3 text-sm leading-6 text-slate-700">{result.details.body}</p>
          <div className="mt-5 rounded-lg bg-white/80 p-4">
            <p className="text-sm font-semibold text-[#173536]">Why the result changed</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">Higher readiness comes from a clear tooth replacement goal, stable dental health, a near-term timeline, and fewer blockers. Pain, infection, uncertain timing, or major concerns lower the score because they can change the first appointment.</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/contact" className="inline-flex justify-center rounded-full bg-[#173536] px-5 py-3 text-sm font-semibold text-white">{result.details.cta}</Link>
            <Link href="/services" className="inline-flex justify-center rounded-full border border-[#0f6b67] px-5 py-3 text-sm font-semibold text-[#0f6b67]">View dental services</Link>
          </div>
        </div>
        <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-[#173536]">Questions to bring</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>Do I have enough bone support for an implant?</li>
            <li>Do my gums or cavities need treatment first?</li>
            <li>What timeline and visit sequence should I expect?</li>
            <li>What costs, financing, or insurance details should I review?</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
