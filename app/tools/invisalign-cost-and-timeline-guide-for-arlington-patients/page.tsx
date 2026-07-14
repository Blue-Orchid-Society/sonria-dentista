import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Invisalign Cost And Timeline Guide For Arlington Patients Tool | Sonria Dentista",
  description:
    "Use this practical invisalign cost and timeline guide for arlington patients resource to understand your options, prioritize next steps, and decide what to do next.",
  alternates: { canonical: "/tools/invisalign-cost-and-timeline-guide-for-arlington-patients" },
};

type CaseType = "express" | "moderate" | "comprehensive";
type Alignment = "mild" | "moderate" | "complex";
type Pace = "fast" | "standard" | "flexible";
type Coverage = "none" | "fsa" | "partial" | "strong";
type SearchParams = Record<string, string | string[] | undefined>;

const keywordTargets = [
  { keyword: "invisalign", intent: "informational", volume: 368000, competition: "medium", cpc: "$10.07", difficulty: 68, opportunity: 57 },
  { keyword: "invisalign express cost", intent: "informational", volume: 27100, competition: "low", cpc: "$23.44", difficulty: 0, opportunity: 45 },
  { keyword: "invisalign cost and timeline guide for arlington patients", intent: "informational", volume: 240, competition: "n/a", cpc: "n/a", difficulty: "low", opportunity: 70 },
  { keyword: "invisalign cost", intent: "informational", volume: "n/a", competition: "n/a", cpc: "n/a", difficulty: 5, opportunity: 24 },
  { keyword: "invisalign cost and timeline guide for arlington patients calculator", intent: "transactional", volume: 205, competition: "n/a", cpc: "n/a", difficulty: "medium", opportunity: 70 },
  { keyword: "invisalign cost and timeline guide for arlington patients checklist", intent: "commercial", volume: 170, competition: "n/a", cpc: "n/a", difficulty: "low", opportunity: 50 },
  { keyword: "invisalign cost and timeline guide for arlington patients for customers", intent: "commercial", volume: 135, competition: "n/a", cpc: "n/a", difficulty: "low", opportunity: 50 },
  { keyword: "how to evaluate invisalign cost and timeline guide for arlington patients", intent: "informational", volume: 100, competition: "n/a", cpc: "n/a", difficulty: "low", opportunity: 30 },
];

const cases: Record<CaseType, { label: string; low: number; high: number; monthsLow: number; monthsHigh: number; note: string }> = {
  express: { label: "Express or limited movement", low: 1800, high: 3500, monthsLow: 3, monthsHigh: 6, note: "Best fit for small cosmetic spacing or relapse after previous orthodontic treatment." },
  moderate: { label: "Moderate crowding or spacing", low: 3500, high: 5800, monthsLow: 6, monthsHigh: 12, note: "Common for adults who need visible alignment changes without major bite correction." },
  comprehensive: { label: "Comprehensive bite and alignment plan", low: 5200, high: 7800, monthsLow: 12, monthsHigh: 24, note: "Often used when tooth movement, bite position, and long-term stability all need planning." },
};

const alignments: Record<Alignment, { label: string; cost: number; months: number; note: string }> = {
  mild: { label: "Mild", cost: 0, months: 0, note: "Smaller movements usually keep treatment near the lower end of the range." },
  moderate: { label: "Moderate", cost: 650, months: 3, note: "Moderate crowding or spacing can add aligner sets and follow-up visits." },
  complex: { label: "Complex", cost: 1400, months: 6, note: "Bite issues, rotations, or missing teeth may require a longer clinical workup." },
};

const paces: Record<Pace, { label: string; months: number; note: string }> = {
  fast: { label: "I can wear aligners 22 hours daily", months: -1, note: "Consistent wear may help the plan stay on the shorter side of the estimate." },
  standard: { label: "I expect a normal routine", months: 0, note: "Most patients should plan for routine check-ins and refinements as needed." },
  flexible: { label: "My schedule may be inconsistent", months: 3, note: "Missed wear time or delayed visits can stretch the final timeline." },
};

const coverages: Record<Coverage, { label: string; discount: number; note: string }> = {
  none: { label: "No orthodontic coverage", discount: 0, note: "Ask about phased payments or financing before delaying treatment." },
  fsa: { label: "FSA/HSA funds available", discount: 750, note: "Pretax dollars can reduce the effective out-of-pocket cost." },
  partial: { label: "Some orthodontic benefits", discount: 1500, note: "Many plans have lifetime orthodontic maximums instead of percentage coverage." },
  strong: { label: "Strong orthodontic benefits", discount: 2500, note: "Confirm age limits, waiting periods, and lifetime maximums before starting." },
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function pick<T extends string>(value: string | string[] | undefined, allowed: readonly T[], fallback: T): T {
  const selected = firstValue(value);
  return allowed.includes(selected as T) ? (selected as T) : fallback;
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.max(0, value));
}

async function resolveSearchParams(searchParams?: SearchParams | Promise<SearchParams>) {
  return (await searchParams) ?? {};
}

export default async function InvisalignCostTimelineGuidePage({ searchParams }: { searchParams?: SearchParams | Promise<SearchParams> }) {
  const params = await resolveSearchParams(searchParams);
  const caseType = pick<CaseType>(params.case, ["express", "moderate", "comprehensive"], "moderate");
  const alignment = pick<Alignment>(params.alignment, ["mild", "moderate", "complex"], "moderate");
  const pace = pick<Pace>(params.pace, ["fast", "standard", "flexible"], "standard");
  const coverage = pick<Coverage>(params.coverage, ["none", "fsa", "partial", "strong"], "partial");

  const selectedCase = cases[caseType];
  const selectedAlignment = alignments[alignment];
  const selectedPace = paces[pace];
  const selectedCoverage = coverages[coverage];
  const lowEstimate = selectedCase.low + selectedAlignment.cost;
  const highEstimate = selectedCase.high + selectedAlignment.cost;
  const outOfPocketLow = lowEstimate - selectedCoverage.discount;
  const outOfPocketHigh = highEstimate - Math.round(selectedCoverage.discount * 0.65);
  const monthsLow = Math.max(3, selectedCase.monthsLow + Math.min(0, selectedPace.months));
  const monthsHigh = Math.max(monthsLow, selectedCase.monthsHigh + selectedAlignment.months + Math.max(0, selectedPace.months));
  const monthlyLow = Math.ceil(outOfPocketLow / Math.max(6, monthsHigh));
  const monthlyHigh = Math.ceil(outOfPocketHigh / Math.max(6, monthsLow));

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Invisalign Cost And Timeline Guide For Arlington Patients Tool",
    description: "A practical Invisalign cost and timeline calculator for Arlington patients comparing aligner treatment, insurance impact, and next steps.",
    url: "https://sonriadentista.com/tools/invisalign-cost-and-timeline-guide-for-arlington-patients",
    about: { "@type": "MedicalProcedure", name: "Invisalign clear aligner treatment", procedureType: "Orthodontic treatment" },
    provider: { "@type": "Dentist", name: "Sonria Dentista", areaServed: "Arlington, TX", url: "https://sonriadentista.com" },
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-[#0f766e] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-18">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-100">Arlington Invisalign planning tool</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Invisalign cost and timeline guide for Arlington patients</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-teal-50">Compare likely Invisalign price ranges, treatment length, insurance impact, and next steps before you schedule a clear aligner consultation with Sonria Dentista.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/en/contact" className="rounded-md bg-white px-5 py-3 text-sm font-bold text-[#0f766e] shadow-sm transition hover:bg-teal-50">Ask Sonria Dentista</Link>
              <Link href="/en" className="rounded-md border border-white/70 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Return to Sonria Dentista</Link>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 text-slate-950 shadow-xl">
            <p className="text-sm font-semibold text-slate-500">Estimated patient range</p>
            <p className="mt-2 text-4xl font-black text-[#0f766e]">{money(outOfPocketLow)} - {money(outOfPocketHigh)}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Active treatment estimate: <strong>{monthsLow}-{monthsHigh} months</strong>. A consultation is still needed to confirm attachments, scans, refinements, and whether Invisalign is the right clinical fit.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-teal-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-teal-800">Monthly planning</p>
                <p className="mt-1 text-2xl font-black text-slate-950">{money(monthlyLow)} - {money(monthlyHigh)}</p>
              </div>
              <div className="rounded-md bg-amber-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-800">Best next step</p>
                <p className="mt-1 text-lg font-black text-slate-950">Scan and exam</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form action="/tools/invisalign-cost-and-timeline-guide-for-arlington-patients" className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Build your Invisalign estimate</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Choose the closest match. Your result updates after you calculate, and the final number may change after a dentist reviews your teeth, bite, and imaging.</p>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-bold text-slate-800">Treatment scope</span>
                <select name="case" defaultValue={caseType} className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm focus:border-[#0f766e] focus:outline-none focus:ring-2 focus:ring-teal-100">
                  {Object.entries(cases).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-800">Crowding or bite complexity</span>
                <select name="alignment" defaultValue={alignment} className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm focus:border-[#0f766e] focus:outline-none focus:ring-2 focus:ring-teal-100">
                  {Object.entries(alignments).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-800">Wear-time and visit rhythm</span>
                <select name="pace" defaultValue={pace} className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm focus:border-[#0f766e] focus:outline-none focus:ring-2 focus:ring-teal-100">
                  {Object.entries(paces).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-800">Insurance or pretax help</span>
                <select name="coverage" defaultValue={coverage} className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm focus:border-[#0f766e] focus:outline-none focus:ring-2 focus:ring-teal-100">
                  {Object.entries(coverages).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}
                </select>
              </label>
            </div>

            <button type="submit" className="mt-6 w-full rounded-md bg-[#0f766e] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#115e59]">Calculate Invisalign estimate</button>
          </form>

          <div className="space-y-6">
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" aria-live="polite">
              <h2 className="text-2xl font-bold">Your planning range</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md bg-teal-50 p-5">
                  <p className="text-sm font-semibold text-teal-800">Estimated total before benefits</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{money(lowEstimate)} - {money(highEstimate)}</p>
                </div>
                <div className="rounded-md bg-slate-900 p-5 text-white">
                  <p className="text-sm font-semibold text-slate-200">Estimated out-of-pocket</p>
                  <p className="mt-2 text-3xl font-black">{money(outOfPocketLow)} - {money(outOfPocketHigh)}</p>
                </div>
              </div>
              <div className="mt-5 rounded-md border border-slate-200 p-5">
                <p className="text-sm font-semibold text-slate-500">Likely treatment timeline</p>
                <p className="mt-1 text-3xl font-black text-[#0f766e]">{monthsLow} to {monthsHigh} months</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{selectedCase.note} {selectedAlignment.note} {selectedPace.note} {selectedCoverage.note}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/en/contact" className="rounded-md bg-[#0f766e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#115e59]">Schedule a consultation</Link>
                <Link href="/tools/invisalign-readiness-quiz" className="rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100">Take the readiness quiz</Link>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">What affects Invisalign cost in Arlington?</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                <li><strong>Number of aligners:</strong> limited cosmetic movement usually costs less than comprehensive alignment or bite correction.</li>
                <li><strong>Attachments and refinements:</strong> some patients need tooth-colored attachments or extra aligner sets to finish precisely.</li>
                <li><strong>Insurance rules:</strong> orthodontic benefits may have waiting periods, age limits, and lifetime maximums.</li>
                <li><strong>Retainers:</strong> long-term retention is part of keeping the final result stable after Invisalign treatment.</li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#0f766e]">Next questions</p>
              <h2 className="mt-2 text-3xl font-bold">Bring these to your Invisalign visit</h2>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-bold">Can clear aligners fix my bite?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Ask whether your case is aligner-friendly or if another orthodontic path would be more predictable.</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-bold">What is included in the quote?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Confirm scans, attachments, refinements, retainers, emergency visits, and payment timing before comparing prices.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-slate-900 p-6 text-white">
            <h2 className="text-2xl font-bold">Common planning questions</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">This page is built around the questions Arlington patients often ask when comparing Invisalign cost, timeline, readiness, and next steps.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/en/services/invisalign" className="rounded-md bg-white px-4 py-2 text-sm font-bold text-slate-950">Invisalign service</Link>
              <Link href="/en/contact" className="rounded-md border border-white/40 px-4 py-2 text-sm font-bold text-white">Contact the team</Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                  <tr><th className="px-4 py-3">Keyword</th><th className="px-4 py-3">Intent</th><th className="px-4 py-3">Volume</th><th className="px-4 py-3">Competition</th><th className="px-4 py-3">CPC</th><th className="px-4 py-3">Difficulty</th><th className="px-4 py-3">Score</th></tr>
                </thead>
                <tbody>
                  {keywordTargets.map((target) => (
                    <tr key={target.keyword} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-semibold text-slate-900">{target.keyword}</td>
                      <td className="px-4 py-3 text-slate-600">{target.intent}</td>
                      <td className="px-4 py-3 text-slate-600">{target.volume}</td>
                      <td className="px-4 py-3 text-slate-600">{target.competition}</td>
                      <td className="px-4 py-3 text-slate-600">{target.cpc}</td>
                      <td className="px-4 py-3 text-slate-600">{target.difficulty}</td>
                      <td className="px-4 py-3 font-bold text-[#0f766e]">{target.opportunity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
