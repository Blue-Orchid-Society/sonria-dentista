"use client";

import { useMemo, useState } from "react";

const situations = [
  {
    id: "toothache",
    label: "Severe toothache or sensitivity",
    low: 175,
    high: 650,
    note: "Often starts with an emergency exam and X-rays, then may need medication, a filling, or a treatment plan for root canal care.",
  },
  {
    id: "broken",
    label: "Broken, chipped, or lost filling",
    low: 225,
    high: 1200,
    note: "Cost changes based on whether the tooth can be smoothed, needs a filling, needs a temporary repair, or needs a crown plan.",
  },
  {
    id: "extraction",
    label: "Tooth may need extraction",
    low: 275,
    high: 950,
    note: "A simple extraction is usually lower cost than a surgical extraction, and replacement planning can add later costs.",
  },
  {
    id: "rootCanal",
    label: "Possible root canal or abscess",
    low: 650,
    high: 1800,
    note: "Infection, tooth location, imaging, build-up, and crown needs can move the final total substantially.",
  },
  {
    id: "crown",
    label: "Crown, implant, or bridge emergency",
    low: 250,
    high: 1600,
    note: "A recemented crown may be modest, while a failed restoration can require a new crown, core build-up, or specialist referral.",
  },
] as const;

const timingOptions = [
  { id: "regular", label: "During regular office hours", multiplier: 1, add: 0 },
  { id: "sameDay", label: "Same-day urgent appointment", multiplier: 1.12, add: 35 },
  { id: "afterHours", label: "After-hours or weekend request", multiplier: 1.25, add: 95 },
] as const;

const insuranceOptions = [
  { id: "insured", label: "Likely using dental insurance", multiplier: 0.72 },
  { id: "cash", label: "Cash pay or not sure", multiplier: 1 },
  { id: "membership", label: "Membership plan or discount plan", multiplier: 0.86 },
] as const;

type SituationId = (typeof situations)[number]["id"];
type TimingId = (typeof timingOptions)[number]["id"];
type InsuranceId = (typeof insuranceOptions)[number]["id"];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getUrgency(painLevel: number, swelling: boolean) {
  if (swelling || painLevel >= 8) {
    return {
      title: "Same-day triage recommended",
      detail:
        "Swelling, spreading infection signs, trauma, fever, or severe pain should be handled quickly. A dental team should review symptoms before giving a final treatment path.",
    };
  }

  if (painLevel >= 5) {
    return {
      title: "Prompt appointment recommended",
      detail:
        "Moderate pain usually deserves a near-term dental exam so the team can prevent the problem from becoming more expensive or harder to treat.",
    };
  }

  return {
    title: "Monitor, then schedule",
    detail:
      "Lower pain can still signal a cracked filling, early infection, or restoration issue. The safest estimate comes after an exam and imaging.",
  };
}

export function Calculator() {
  const [situationId, setSituationId] = useState<SituationId>("toothache");
  const [timingId, setTimingId] = useState<TimingId>("sameDay");
  const [insuranceId, setInsuranceId] = useState<InsuranceId>("cash");
  const [painLevel, setPainLevel] = useState(6);
  const [swelling, setSwelling] = useState(false);
  const [xray, setXray] = useState(true);

  const estimate = useMemo(() => {
    const situation = situations.find((item) => item.id === situationId) ?? situations[0];
    const timing = timingOptions.find((item) => item.id === timingId) ?? timingOptions[0];
    const insurance = insuranceOptions.find((item) => item.id === insuranceId) ?? insuranceOptions[1];
    const diagnosticAdd = xray ? 85 : 0;
    const swellingAdd = swelling ? 125 : 0;
    const painAdd = painLevel >= 8 ? 95 : painLevel >= 5 ? 45 : 0;
    const low = Math.round(((situation.low + timing.add + diagnosticAdd + swellingAdd + painAdd) * timing.multiplier * insurance.multiplier) / 10) * 10;
    const high = Math.round(((situation.high + timing.add + diagnosticAdd + swellingAdd + painAdd) * timing.multiplier * insurance.multiplier) / 10) * 10;

    return { low, high, situation, timing, insurance };
  }, [insuranceId, painLevel, situationId, swelling, timingId, xray]);

  const urgency = getUrgency(painLevel, swelling);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16" aria-labelledby="calculator-heading">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-lg border border-border-soft bg-card p-5 shadow-warm md:p-7">
          <h2 id="calculator-heading" className="font-display text-2xl md:text-3xl">
            Estimate emergency dental cost
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted md:text-base">
            Choose the closest situation and timing. The estimate adjusts for common cost drivers, then shows a planning range before a dentist provides a diagnosis.
          </p>

          <div className="mt-7 space-y-6">
            <div>
              <label htmlFor="situation" className="font-semibold text-foreground">
                What is the closest emergency?
              </label>
              <select
                id="situation"
                value={situationId}
                onChange={(event) => setSituationId(event.target.value as SituationId)}
                className="mt-3 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground shadow-sm"
              >
                {situations.map((situation) => (
                  <option key={situation.id} value={situation.id}>
                    {situation.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="timing" className="font-semibold text-foreground">
                When does the patient want care?
              </label>
              <select
                id="timing"
                value={timingId}
                onChange={(event) => setTimingId(event.target.value as TimingId)}
                className="mt-3 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground shadow-sm"
              >
                {timingOptions.map((timing) => (
                  <option key={timing.id} value={timing.id}>
                    {timing.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="insurance" className="font-semibold text-foreground">
                Payment context
              </label>
              <select
                id="insurance"
                value={insuranceId}
                onChange={(event) => setInsuranceId(event.target.value as InsuranceId)}
                className="mt-3 w-full rounded-md border border-border-soft bg-background px-4 py-3 text-sm text-foreground shadow-sm"
              >
                {insuranceOptions.map((insurance) => (
                  <option key={insurance.id} value={insurance.id}>
                    {insurance.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-md border border-border-soft bg-background/60 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <label htmlFor="pain" className="font-semibold text-foreground">
                    Pain level
                  </label>
                  <p className="mt-1 text-sm leading-5 text-muted">Rate current pain from 1 to 10.</p>
                </div>
                <output htmlFor="pain" className="w-fit rounded-pill bg-secondary-soft px-3 py-1 text-sm font-semibold text-secondary">
                  {painLevel}/10
                </output>
              </div>
              <input
                id="pain"
                type="range"
                min="1"
                max="10"
                step="1"
                value={painLevel}
                onChange={(event) => setPainLevel(Number(event.target.value))}
                className="mt-4 w-full accent-brand"
              />
              <div className="mt-2 flex justify-between gap-3 text-xs text-muted">
                <span>Mild</span>
                <span className="text-right">Severe</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-start gap-3 rounded-md border border-border-soft bg-background/60 p-4 text-sm leading-6 text-muted">
                <input
                  type="checkbox"
                  checked={swelling}
                  onChange={(event) => setSwelling(event.target.checked)}
                  className="mt-1 accent-brand"
                />
                <span>
                  <strong className="block text-foreground">Swelling or infection signs</strong>
                  Facial swelling, fever, pus, bad taste, or spreading pain.
                </span>
              </label>
              <label className="flex items-start gap-3 rounded-md border border-border-soft bg-background/60 p-4 text-sm leading-6 text-muted">
                <input
                  type="checkbox"
                  checked={xray}
                  onChange={(event) => setXray(event.target.checked)}
                  className="mt-1 accent-brand"
                />
                <span>
                  <strong className="block text-foreground">Exam and X-rays likely</strong>
                  Most emergency visits need imaging before treatment options are clear.
                </span>
              </label>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-border-soft bg-foreground p-6 text-card shadow-warm-lg md:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-soft">Estimated range</p>
            <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1">
              <strong className="font-display text-5xl leading-none text-card">{formatCurrency(estimate.low)}</strong>
              <span className="pb-2 text-lg text-brand-soft">to</span>
              <strong className="font-display text-5xl leading-none text-card">{formatCurrency(estimate.high)}</strong>
            </div>
            <h3 className="mt-6 font-display text-2xl text-card">{urgency.title}</h3>
            <p className="mt-3 text-sm leading-6 text-card/80">{urgency.detail}</p>
            <div className="mt-6 rounded-md bg-card/10 p-4">
              <p className="text-sm font-semibold text-card">Main cost drivers</p>
              <p className="mt-2 text-sm leading-6 text-card/80">
                {estimate.situation.label}, {estimate.timing.label.toLowerCase()}, {estimate.insurance.label.toLowerCase()}, pain level, and whether imaging or infection triage is needed.
              </p>
            </div>
            <div className="mt-5 rounded-md bg-card/10 p-4">
              <p className="text-sm font-semibold text-card">Estimator note</p>
              <p className="mt-2 text-sm leading-6 text-card/80">{estimate.situation.note}</p>
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
