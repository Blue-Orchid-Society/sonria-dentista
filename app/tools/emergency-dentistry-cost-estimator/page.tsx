import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Dentistry Cost Estimator Tool | Sonria Dentista",
  description:
    "Use this practical emergency dentistry cost estimator resource to understand your options, prioritize next steps, and decide what to do next.",
  alternates: {
    canonical: "/tools/emergency-dentistry-cost-estimator",
  },
};

type Concern = "toothache" | "broken-tooth" | "lost-filling" | "swelling" | "knocked-out";
type Timing = "today" | "tomorrow" | "this-week";
type Imaging = "exam" | "xray" | "panoramic";
type Insurance = "none" | "partial" | "strong";
type AddOn = "pain-control" | "temporary-repair" | "extraction" | "root-canal";
type SearchParams = Record<string, string | string[] | undefined>;

const concerns: Record<Concern, { label: string; low: number; high: number; note: string }> = {
  toothache: {
    label: "Severe tooth pain",
    low: 140,
    high: 525,
    note: "Often starts with an emergency exam, X-rays, diagnosis, and pain control.",
  },
  "broken-tooth": {
    label: "Broken or chipped tooth",
    low: 180,
    high: 1450,
    note: "Cost depends on whether the tooth needs bonding, a filling, a crown, or stabilization.",
  },
  "lost-filling": {
    label: "Lost filling or crown",
    low: 165,
    high: 950,
    note: "A temporary repair may be possible, but decay or fracture can change the final treatment.",
  },
  swelling: {
    label: "Swelling or infection",
    low: 220,
    high: 1800,
    note: "Swelling needs prompt evaluation because treatment may involve drainage, extraction, or root canal therapy.",
  },
  "knocked-out": {
    label: "Knocked-out or loose tooth",
    low: 250,
    high: 2200,
    note: "Fast care matters most. Reimplantation, splinting, or replacement planning may be needed.",
  },
};

const timingAdjustments: Record<Timing, { label: string; multiplier: number; note: string }> = {
  today: {
    label: "I need care today",
    multiplier: 1.12,
    note: "Same-day emergency visits can include more immediate diagnostics and stabilization.",
  },
  tomorrow: {
    label: "Tomorrow works",
    multiplier: 1,
    note: "Next-day care is still urgent for pain, cracks, swelling, or a loose restoration.",
  },
  "this-week": {
    label: "This week",
    multiplier: 0.94,
    note: "Lower urgency may fit minor chips or sensitivity, but worsening symptoms should move faster.",
  },
};

const imagingOptions: Record<Imaging, { label: string; low: number; high: number }> = {
  exam: { label: "Emergency exam only", low: 85, high: 160 },
  xray: { label: "Exam plus dental X-rays", low: 125, high: 260 },
  panoramic: { label: "Exam plus broader imaging", low: 180, high: 360 },
};

const insuranceAdjustments: Record<Insurance, { label: string; patientShare: number; note: string }> = {
  none: {
    label: "No dental insurance",
    patientShare: 1,
    note: "Ask about phased treatment, payment options, and which part must happen first.",
  },
  partial: {
    label: "Some dental coverage",
    patientShare: 0.72,
    note: "Many plans cover exams and portions of basic treatment, but urgent care rules vary.",
  },
  strong: {
    label: "Strong emergency coverage",
    patientShare: 0.48,
    note: "Benefits may lower the patient share, especially for exams, X-rays, and basic services.",
  },
};

const addOns: Record<AddOn, { label: string; low: number; high: number; note: string }> = {
  "pain-control": {
    label: "Pain control or prescription planning",
    low: 35,
    high: 160,
    note: "Medication planning is sometimes separate from the definitive dental procedure.",
  },
  "temporary-repair": {
    label: "Temporary filling, crown recement, or smoothing",
    low: 95,
    high: 325,
    note: "A short-term repair can protect the tooth until final care is scheduled.",
  },
  extraction: {
    label: "Possible extraction",
    low: 225,
    high: 650,
    note: "Surgical complexity, infection, and tooth location can raise extraction cost.",
  },
  "root-canal": {
    label: "Possible root canal or crown planning",
    low: 850,
    high: 1900,
    note: "Back teeth and crowns usually make root canal treatment more expensive.",
  },
};

const concernKeys = Object.keys(concerns) as Concern[];
const timingKeys = Object.keys(timingAdjustments) as Timing[];
const imagingKeys = Object.keys(imagingOptions) as Imaging[];
const insuranceKeys = Object.keys(insuranceAdjustments) as Insurance[];
const addOnKeys = Object.keys(addOns) as AddOn[];

function readParam<T extends string>(params: SearchParams, key: string, fallback: T, allowed: readonly T[]) {
  const value = params[key];
  const normalized = Array.isArray(value) ? value[0] : value;
  return allowed.includes(normalized as T) ? (normalized as T) : fallback;
}

function readMultiParam<T extends string>(params: SearchParams, key: string, allowed: readonly T[]) {
  const value = params[key];
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter((item): item is T => allowed.includes(item as T));
}

function dollars(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function EmergencyDentistryCostEstimatorPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const concern = readParam(params, "concern", "toothache", concernKeys);
  const timing = readParam(params, "timing", "today", timingKeys);
  const imaging = readParam(params, "imaging", "xray", imagingKeys);
  const insurance = readParam(params, "insurance", "none", insuranceKeys);
  const selectedAddOns = readMultiParam(params, "addOns", addOnKeys);

  const concernCost = concerns[concern];
  const timingInfo = timingAdjustments[timing];
  const imagingCost = imagingOptions[imaging];
  const insuranceInfo = insuranceAdjustments[insurance];
  const addOnTotal = selectedAddOns.reduce(
    (total, addOn) => ({
      low: total.low + addOns[addOn].low,
      high: total.high + addOns[addOn].high,
    }),
    { low: 0, high: 0 },
  );

  const beforeInsuranceLow = Math.round((concernCost.low + imagingCost.low + addOnTotal.low) * timingInfo.multiplier);
  const beforeInsuranceHigh = Math.round((concernCost.high + imagingCost.high + addOnTotal.high) * timingInfo.multiplier);
  const estimatedLow = Math.max(95, Math.round(beforeInsuranceLow * insuranceInfo.patientShare));
  const estimatedHigh = Math.max(estimatedLow + 75, Math.round(beforeInsuranceHigh * insuranceInfo.patientShare));
  const midpoint = Math.round((estimatedLow + estimatedHigh) / 2);
  const urgency =
    concern === "swelling" || concern === "knocked-out"
      ? "Call now for urgent guidance"
      : timing === "today"
        ? "Same-day visit recommended"
        : "Prompt dental visit recommended";

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Emergency Dentistry Cost Estimator Tool",
    description:
      "Estimate likely emergency dental costs by symptom, timing, imaging, insurance, and possible treatment needs.",
    url: "https://sonriadentista.com/tools/emergency-dentistry-cost-estimator",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Emergency Dentistry Cost Estimator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    publisher: {
      "@type": "Dentist",
      name: "Sonria Dentista",
      url: "https://sonriadentista.com",
    },
  };

  return (
    <main className="min-h-screen bg-[#f7fbfa] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-cyan-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">
              Arlington emergency dental planning
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Emergency dentistry cost estimator
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-cyan-50">
              Get a practical emergency dental cost range based on the problem, how quickly you need care, likely imaging,
              insurance, and possible next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-teal-950 shadow-sm transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-950">
                Contact the team
              </Link>
              <Link href="/services" className="rounded-full border border-white/45 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-950">
                View dental services
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/12 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100">Estimated patient cost</p>
            <p className="mt-4 text-4xl font-bold">
              {dollars(estimatedLow)} - {dollars(estimatedHigh)}
            </p>
            <p className="mt-3 text-cyan-50">
              Midpoint estimate: <span className="font-semibold text-white">{dollars(midpoint)}</span>
            </p>
            <div className="mt-6 rounded-xl bg-white p-4 text-slate-950">
              <p className="text-sm font-semibold text-teal-950">{urgency}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{concernCost.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_0.78fr]">
        <form action="/tools/emergency-dentistry-cost-estimator" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Build your estimate</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This tool is for planning only. A dentist needs to examine the tooth before confirming treatment or price.
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            <fieldset>
              <legend className="text-sm font-semibold text-slate-900">What is happening?</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {concernKeys.map((key) => (
                  <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition has-[:checked]:border-teal-700 has-[:checked]:bg-teal-50">
                    <input type="radio" name="concern" value={key} defaultChecked={concern === key} className="mt-1 h-4 w-4 accent-teal-700" />
                    <span>
                      <span className="block text-sm font-semibold text-slate-950">{concerns[key].label}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-600">
                        Typical baseline: {dollars(concerns[key].low)} - {dollars(concerns[key].high)}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">How soon?</span>
                <select name="timing" defaultValue={timing} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-950 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200">
                  {timingKeys.map((key) => (
                    <option key={key} value={key}>{timingAdjustments[key].label}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Likely imaging</span>
                <select name="imaging" defaultValue={imaging} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-950 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200">
                  {imagingKeys.map((key) => (
                    <option key={key} value={key}>{imagingOptions[key].label}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Insurance</span>
                <select name="insurance" defaultValue={insurance} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-950 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200">
                  {insuranceKeys.map((key) => (
                    <option key={key} value={key}>{insuranceAdjustments[key].label}</option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold text-slate-900">Possible add-ons</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {addOnKeys.map((key) => (
                  <label key={key} className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4 transition has-[:checked]:border-cyan-700 has-[:checked]:bg-cyan-50">
                    <input type="checkbox" name="addOns" value={key} defaultChecked={selectedAddOns.includes(key)} className="mt-1 h-4 w-4 accent-cyan-700" />
                    <span>
                      <span className="block text-sm font-semibold text-slate-950">{addOns[key].label}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-600">{addOns[key].note}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <button type="submit" className="mt-8 w-full rounded-full bg-teal-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto">
            Update estimate
          </button>
        </form>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-800">Your result</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              {dollars(estimatedLow)} - {dollars(estimatedHigh)}
            </h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-slate-600">Problem</dt><dd className="text-right font-semibold text-slate-950">{concernCost.label}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-600">Timing</dt><dd className="text-right font-semibold text-slate-950">{timingInfo.label}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-600">Imaging</dt><dd className="text-right font-semibold text-slate-950">{imagingCost.label}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-600">Insurance assumption</dt><dd className="text-right font-semibold text-slate-950">{insuranceInfo.label}</dd></div>
            </dl>
            <p className="mt-5 rounded-xl bg-teal-50 p-4 text-sm leading-6 text-teal-950">{insuranceInfo.note}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
            <h2 className="text-xl font-bold">When to call immediately</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              <li>Facial swelling, fever, or a bad taste that may point to infection.</li>
              <li>A knocked-out adult tooth or a tooth that suddenly feels loose.</li>
              <li>Pain that keeps you from sleeping, eating, or focusing.</li>
            </ul>
            <Link href="/contact" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950">
              Ask about emergency care
            </Link>
          </section>
        </aside>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-950">What affects emergency dental cost?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">The biggest factors are diagnosis, tooth location, infection, imaging, whether the visit is stabilization or final treatment, and how much your plan covers.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-950">Questions to ask</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Ask what must be treated today, what can wait, whether a temporary repair is appropriate, and which options protect the tooth long term.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-950">Next step</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">If symptoms are active, use the estimate as a planning range and contact Sonria Dentista for an exam and a treatment plan.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-4 rounded-2xl bg-teal-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Need help deciding what to do next?</h2>
            <p className="mt-2 text-sm leading-6 text-teal-50">Share your symptoms with the Sonria Dentista team so they can guide the next step.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-full border border-white/45 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-900">Sonria Dentista</Link>
            <Link href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-teal-950 transition hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-900">Contact the team</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
