import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dental Implant Cost Guide For Arlington Patients Tool | Sonria Dentista",
  description:
    "Use this practical dental implant cost guide for arlington patients resource to understand your options, prioritize next steps, and decide what to do next.",
  alternates: { canonical: "/tools/dental-implant-cost-guide-for-arlington-patients" },
};

type Plan = "single" | "bridge" | "full-arch";
type Readiness = "ready" | "workup" | "unsure";
type Coverage = "none" | "some" | "strong";
type AddOn = "exam" | "extraction" | "bone-graft" | "sedation";
type SearchParams = Record<string, string | string[] | undefined>;

const plans: Record<Plan, { label: string; low: number; high: number; note: string }> = {
  single: {
    label: "Single tooth implant",
    low: 3200,
    high: 5900,
    note: "Usually includes the implant post, abutment, and final crown when quoted as a complete tooth replacement.",
  },
  bridge: {
    label: "Implant-supported bridge",
    low: 7200,
    high: 14500,
    note: "Can replace several neighboring teeth with fewer implant posts than one implant per tooth.",
  },
  "full-arch": {
    label: "Full-arch implant option",
    low: 18000,
    high: 32000,
    note: "A larger plan for patients missing most or all teeth in one arch; imaging and planning affect the final quote.",
  },
};

const readiness: Record<Readiness, { label: string; low: number; high: number; note: string }> = {
  ready: {
    label: "Dentist says I may be implant-ready",
    low: 0,
    high: 450,
    note: "A consultation and imaging may be the main planning costs before treatment.",
  },
  workup: {
    label: "I may need extraction, gum, or bone work first",
    low: 850,
    high: 3600,
    note: "Extractions, bone grafting, or gum treatment can change the sequence and cost.",
  },
  unsure: {
    label: "I am not sure yet",
    low: 250,
    high: 1200,
    note: "Start with an exam and imaging so the dentist can check bone support, gum health, and timing.",
  },
};

const coverage: Record<Coverage, { label: string; multiplier: number; note: string }> = {
  none: {
    label: "No dental insurance estimate",
    multiplier: 1,
    note: "Ask about phased treatment, financing, and whether diagnostic costs can be applied to treatment.",
  },
  some: {
    label: "Some implant-related benefits",
    multiplier: 0.78,
    note: "Some plans help with the crown, extraction, or imaging even when the implant post has limits.",
  },
  strong: {
    label: "Stronger major service coverage",
    multiplier: 0.62,
    note: "Confirm annual maximums, waiting periods, missing-tooth clauses, and preauthorization rules.",
  },
};

const addOns: Record<AddOn, { label: string; low: number; high: number }> = {
  exam: { label: "Implant consult and X-rays", low: 120, high: 350 },
  extraction: { label: "Tooth extraction", low: 180, high: 650 },
  "bone-graft": { label: "Possible bone graft", low: 450, high: 1800 },
  sedation: { label: "Sedation support", low: 250, high: 900 },
};

const keywordTargets = [
  { keyword: "dental implant cost", intent: "informational", volume: 201000, competition: "low", cpc: "$16.41", difficulty: 23, score: 80 },
  { keyword: "dental implant cost guide for arlington patients", intent: "informational", volume: 240, competition: "n/a", cpc: "n/a", difficulty: "low", score: 70 },
  { keyword: "dental implant cost guide for arlington patients calculator", intent: "transactional", volume: 205, competition: "n/a", cpc: "n/a", difficulty: "medium", score: 70 },
  { keyword: "dental implant cost guide for arlington patients checklist", intent: "commercial", volume: 170, competition: "n/a", cpc: "n/a", difficulty: "low", score: 50 },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const pick = <T extends string>(params: SearchParams, key: string, fallback: T, allowed: readonly T[]) => {
  const raw = params[key];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return allowed.includes(value as T) ? (value as T) : fallback;
};

const selectedAddOns = (params: SearchParams) => {
  const raw = params.addOns;
  const values = Array.isArray(raw) ? raw : raw ? [raw] : ["exam"];
  return values.filter((value): value is AddOn => value in addOns);
};

export default async function DentalImplantCostGuideForArlingtonPatientsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const planKey = pick<Plan>(params, "plan", "single", ["single", "bridge", "full-arch"]);
  const readinessKey = pick<Readiness>(params, "readiness", "unsure", ["ready", "workup", "unsure"]);
  const coverageKey = pick<Coverage>(params, "coverage", "none", ["none", "some", "strong"]);
  const checkedAddOns = selectedAddOns(params);

  const plan = plans[planKey];
  const ready = readiness[readinessKey];
  const cover = coverage[coverageKey];
  const addLow = checkedAddOns.reduce((total, key) => total + addOns[key].low, 0);
  const addHigh = checkedAddOns.reduce((total, key) => total + addOns[key].high, 0);
  const low = Math.round((plan.low + ready.low + addLow) * cover.multiplier);
  const high = Math.round((plan.high + ready.high + addHigh) * cover.multiplier);
  const nextStep =
    readinessKey === "workup"
      ? "Schedule an implant consultation so the team can check bone support, gum health, and whether treatment should be phased."
      : coverageKey === "none"
        ? "Ask Sonria Dentista about financing and staged treatment before comparing implant quotes."
        : "Bring your insurance details to a consult so the team can estimate benefits and likely out-of-pocket cost.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Dental Implant Cost Guide For Arlington Patients Tool",
    description: "A practical dental implant cost guide for Arlington patients comparing implant type, readiness factors, insurance, and common add-ons.",
    url: "https://sonriadentista.com/tools/dental-implant-cost-guide-for-arlington-patients",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Dental Implant Cost Guide For Arlington Patients Calculator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  };

  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-100">Arlington dental implant planning</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Dental implant cost guide for Arlington patients</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-teal-50">
              Compare common implant cost ranges, add likely planning items, and get a practical next step before scheduling with Sonria Dentista.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="rounded-md bg-white px-5 py-3 text-center text-sm font-bold text-teal-900 shadow-sm transition hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-900">Ask about implant options</Link>
              <Link href="/services" className="rounded-md border border-white/50 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-900">View dental services</Link>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 text-slate-950 shadow-2xl" aria-live="polite">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">Estimated range</p>
            <p className="mt-3 text-4xl font-bold">{money(low)} - {money(high)}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              This is an educational range, not a diagnosis or quote. A dentist needs an exam and imaging to confirm whether implants, grafting, extractions, or alternatives fit your case.
            </p>
            <div className="mt-6 rounded-md bg-teal-50 p-4">
              <p className="text-sm font-bold text-teal-950">Recommended next step</p>
              <p className="mt-2 text-sm leading-6 text-teal-900">{nextStep}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Build your estimate</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Change the options below, then update the estimate to see a new cost range and guidance.</p>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold">Implant plan</legend>
            <div className="mt-3 grid gap-3">
              {Object.entries(plans).map(([key, option]) => (
                <label key={key} className="flex cursor-pointer gap-3 rounded-md border border-slate-200 p-4 transition hover:border-teal-500 has-[:checked]:border-teal-700 has-[:checked]:bg-teal-50">
                  <input type="radio" name="plan" value={key} defaultChecked={planKey === key} className="mt-1 h-4 w-4 accent-teal-700" />
                  <span>
                    <span className="block text-sm font-bold">{option.label}</span>
                    <span className="mt-1 block text-sm text-slate-600">{money(option.low)} - {money(option.high)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold">Clinical readiness</legend>
            <select name="readiness" defaultValue={readinessKey} className="mt-3 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200">
              {Object.entries(readiness).map(([key, option]) => <option key={key} value={key}>{option.label}</option>)}
            </select>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold">Insurance assumption</legend>
            <select name="coverage" defaultValue={coverageKey} className="mt-3 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200">
              {Object.entries(coverage).map(([key, option]) => <option key={key} value={key}>{option.label}</option>)}
            </select>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold">Possible cost factors</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {Object.entries(addOns).map(([key, option]) => (
                <label key={key} className="flex items-start gap-3 rounded-md border border-slate-200 p-3 text-sm">
                  <input type="checkbox" name="addOns" value={key} defaultChecked={checkedAddOns.includes(key as AddOn)} className="mt-1 h-4 w-4 accent-teal-700" />
                  <span>
                    <span className="block font-semibold">{option.label}</span>
                    <span className="block text-slate-600">{money(option.low)} - {money(option.high)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="mt-6 w-full rounded-md bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2">Update implant cost estimate</button>
        </form>

        <div className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" aria-live="polite">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">Your result</p>
            <h2 className="mt-3 text-3xl font-bold">{money(low)} - {money(high)}</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md bg-slate-50 p-4"><dt className="text-sm font-bold">Selected plan</dt><dd className="mt-1 text-sm text-slate-600">{plan.label}</dd></div>
              <div className="rounded-md bg-slate-50 p-4"><dt className="text-sm font-bold">Insurance view</dt><dd className="mt-1 text-sm text-slate-600">{cover.label}</dd></div>
            </dl>
            <div className="mt-6 space-y-3 text-sm leading-6 text-slate-700"><p>{plan.note}</p><p>{ready.note}</p><p>{cover.note}</p></div>
          </section>

          <section className="rounded-lg border border-teal-200 bg-teal-50 p-6">
            <h2 className="text-xl font-bold text-teal-950">What to ask before comparing quotes</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-teal-900">
              <li>Does the quote include the implant post, abutment, final crown, and follow-up visits?</li>
              <li>Will I need a 3D scan, extraction, bone graft, gum treatment, or temporary tooth?</li>
              <li>Which parts may be covered by dental insurance, and what is my annual maximum?</li>
              <li>Can treatment be phased if I am replacing multiple teeth?</li>
            </ul>
          </section>
        </div>
      </section>

      <section className="bg-white"><div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 lg:grid-cols-3">
        <article className="rounded-lg border border-slate-200 p-6"><h2 className="text-xl font-bold">What affects implant cost?</h2><p className="mt-3 text-sm leading-6 text-slate-600">Tooth count, bone support, gum health, materials, imaging, sedation, and whether you need extractions all influence the final number.</p></article>
        <article className="rounded-lg border border-slate-200 p-6"><h2 className="text-xl font-bold">When to schedule</h2><p className="mt-3 text-sm leading-6 text-slate-600">If a tooth is failing, painful, loose, or already missing, an early consult helps preserve options and avoid rushed decisions.</p></article>
        <article className="rounded-lg border border-slate-200 p-6"><h2 className="text-xl font-bold">How Sonria helps</h2><p className="mt-3 text-sm leading-6 text-slate-600">The team can review your goals, check clinical needs, discuss payment options, and explain realistic alternatives if implants are not the best fit.</p></article>
      </div></section>

      <section className="bg-slate-950 text-white"><div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><h2 className="text-3xl font-bold">Ready to get a real implant estimate?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Bring this estimate to Sonria Dentista and ask what your exam, imaging, insurance, and treatment timeline could look like.</p></div>
        <div className="flex flex-col gap-3 sm:flex-row"><Link href="/contact" className="rounded-md bg-white px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950">Contact the team</Link><Link href="/" className="rounded-md border border-white/40 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950">Return to Sonria Dentista</Link></div>
      </div></section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-bold">Keyword opportunity signals</h2>
        <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-700"><tr><th className="px-4 py-3 font-bold">Keyword</th><th className="px-4 py-3 font-bold">Intent</th><th className="px-4 py-3 font-bold">Volume</th><th className="px-4 py-3 font-bold">Competition</th><th className="px-4 py-3 font-bold">CPC</th><th className="px-4 py-3 font-bold">Difficulty</th><th className="px-4 py-3 font-bold">Opportunity</th></tr></thead>
            <tbody className="divide-y divide-slate-200">{keywordTargets.map((target) => <tr key={target.keyword}><td className="px-4 py-3 font-semibold">{target.keyword}</td><td className="px-4 py-3 text-slate-600">{target.intent}</td><td className="px-4 py-3 text-slate-600">{target.volume.toLocaleString()}</td><td className="px-4 py-3 text-slate-600">{target.competition}</td><td className="px-4 py-3 text-slate-600">{target.cpc}</td><td className="px-4 py-3 text-slate-600">{target.difficulty}</td><td className="px-4 py-3 text-slate-600">{target.score}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
