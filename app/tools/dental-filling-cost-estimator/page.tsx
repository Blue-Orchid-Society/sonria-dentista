import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dental Filling Cost Estimator Tool | Sonria Dentista",
  description:
    "Use this practical dental filling cost estimator resource to understand your options, prioritize next steps, and decide what to do next.",
  alternates: { canonical: "/tools/dental-filling-cost-estimator" },
};

type FillingType = "composite" | "amalgam" | "ionomer";
type ToothZone = "front" | "premolar" | "molar";
type SurfaceCount = "one" | "two" | "three-plus";
type Coverage = "none" | "partial" | "strong";
type AddOn = "exam" | "xray" | "deep-decay" | "sedation";
type SearchParams = Record<string, string | string[] | undefined>;

const keywordTargets = [
  { keyword: "dental implant cost", intent: "informational", volume: 201000, competition: "low", cpc: "$16.41", difficulty: 23, opportunity: 52 },
  { keyword: "dental", intent: "informational", volume: 165000, competition: "medium", cpc: "$11.89", difficulty: 89, opportunity: 42 },
  { keyword: "dental filling cost estimator", intent: "informational", volume: 240, competition: "n/a", cpc: "n/a", difficulty: "low", opportunity: 70 },
  { keyword: "dental filling cost estimator calculator", intent: "transactional", volume: 205, competition: "n/a", cpc: "n/a", difficulty: "medium", opportunity: 70 },
  { keyword: "dental filling cost estimator checklist", intent: "commercial", volume: 170, competition: "n/a", cpc: "n/a", difficulty: "low", opportunity: 50 },
];

const fillingTypes: Record<FillingType, { label: string; low: number; high: number; note: string }> = {
  composite: { label: "Tooth-colored composite filling", low: 180, high: 380, note: "A common choice for visible teeth because the shade can blend with your smile." },
  amalgam: { label: "Silver amalgam filling", low: 150, high: 320, note: "Often lower cost, but not always preferred for visible areas." },
  ionomer: { label: "Glass ionomer or temporary filling", low: 120, high: 260, note: "May be used for small areas, baby teeth, or as a short-term protective option." },
};

const toothZones: Record<ToothZone, { label: string; multiplier: number; note: string }> = {
  front: { label: "Front tooth", multiplier: 1, note: "Front teeth may need careful color matching, but access is usually simpler." },
  premolar: { label: "Premolar", multiplier: 1.12, note: "Premolars often need a slightly stronger chewing-surface repair." },
  molar: { label: "Molar", multiplier: 1.22, note: "Molars can take more time because they handle heavier bite pressure." },
};

const surfaceCounts: Record<SurfaceCount, { label: string; multiplier: number; note: string }> = {
  one: { label: "One surface", multiplier: 1, note: "A smaller cavity or chip usually stays near the lower end of the estimate." },
  two: { label: "Two surfaces", multiplier: 1.28, note: "A wider filling can involve more shaping and bite adjustment." },
  "three-plus": { label: "Three or more surfaces", multiplier: 1.62, note: "Large fillings may need a crown discussion if too much tooth structure is missing." },
};

const coverages: Record<Coverage, { label: string; discount: number; note: string }> = {
  none: { label: "No insurance estimate", discount: 0, note: "This shows a self-pay planning range before any in-office savings or financing." },
  partial: { label: "Some preventive or basic coverage", discount: 0.35, note: "Many plans cover a portion of basic restorative care after deductible rules." },
  strong: { label: "Strong basic restorative coverage", discount: 0.55, note: "A higher coverage estimate can reduce out-of-pocket cost, subject to plan limits." },
};

const addOns: Record<AddOn, { label: string; low: number; high: number; note: string }> = {
  exam: { label: "New patient exam", low: 75, high: 160, note: "Needed if Sonria Dentista has not diagnosed the tooth yet." },
  xray: { label: "X-ray imaging", low: 35, high: 140, note: "Helps confirm cavity depth and whether the nerve is involved." },
  "deep-decay": { label: "Deep decay or liner/base", low: 65, high: 180, note: "May be added when decay is close to the nerve and the tooth needs extra protection." },
  sedation: { label: "Comfort option", low: 75, high: 220, note: "Nitrous or another comfort option may be discussed for anxious patients." },
};

const defaults = {
  fillingType: "composite" as FillingType,
  toothZone: "molar" as ToothZone,
  surfaceCount: "two" as SurfaceCount,
  coverage: "partial" as Coverage,
  addOns: ["exam", "xray"] as AddOn[],
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function selectValue<T extends string>(value: string | string[] | undefined, allowed: Record<T, unknown>, fallback: T) {
  const selected = firstValue(value);
  return selected && selected in allowed ? (selected as T) : fallback;
}

function selectAddOns(params: SearchParams) {
  if (!params.configured) return defaults.addOns;
  const value = params.addons;
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter((item): item is AddOn => item in addOns);
}

function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function getEstimate(params: SearchParams) {
  const fillingType = selectValue(params.type, fillingTypes, defaults.fillingType);
  const toothZone = selectValue(params.tooth, toothZones, defaults.toothZone);
  const surfaceCount = selectValue(params.surfaces, surfaceCounts, defaults.surfaceCount);
  const coverage = selectValue(params.coverage, coverages, defaults.coverage);
  const selectedAddOns = selectAddOns(params);
  const type = fillingTypes[fillingType];
  const tooth = toothZones[toothZone];
  const surfaces = surfaceCounts[surfaceCount];
  const insurance = coverages[coverage];
  const clinicalLow = Math.round(type.low * tooth.multiplier * surfaces.multiplier);
  const clinicalHigh = Math.round(type.high * tooth.multiplier * surfaces.multiplier);
  const addOnLow = selectedAddOns.reduce((total, addOn) => total + addOns[addOn].low, 0);
  const addOnHigh = selectedAddOns.reduce((total, addOn) => total + addOns[addOn].high, 0);
  const grossLow = clinicalLow + addOnLow;
  const grossHigh = clinicalHigh + addOnHigh;
  const patientLow = Math.max(0, Math.round(grossLow * (1 - insurance.discount)));
  const patientHigh = Math.max(patientLow + 25, Math.round(grossHigh * (1 - insurance.discount)));
  const nextStep =
    surfaceCount === "three-plus"
      ? "Schedule an exam so the dentist can confirm whether a filling is still enough tooth support or whether an onlay or crown is safer."
      : fillingType === "ionomer"
        ? "Ask whether this should be a temporary repair or a longer-term filling before you decide."
        : "Use this range to plan the visit, then confirm the exact tooth, cavity depth, and insurance details with the team.";
  return { fillingType, toothZone, surfaceCount, coverage, selectedAddOns, clinicalLow, clinicalHigh, grossLow, grossHigh, patientLow, patientHigh, nextStep };
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Dental Filling Cost Estimator Tool",
  description: "Use this practical dental filling cost estimator resource to understand your options, prioritize next steps, and decide what to do next.",
  url: "https://sonriadentista.com/tools/dental-filling-cost-estimator",
  about: { "@type": "MedicalProcedure", name: "Dental filling" },
  publisher: { "@type": "Dentist", name: "Sonria Dentista", url: "https://sonriadentista.com", areaServed: "Arlington, TX" },
};

export default async function DentalFillingCostEstimatorPage({ searchParams }: { searchParams?: Promise<SearchParams> }) {
  const params = (await searchParams) ?? {};
  const estimate = getEstimate(params);

  return (
    <main className="min-h-screen bg-[#f7faf8] text-[#17372f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-[#0f5f56] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#bfe7d7]">Arlington dental cost planner</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Dental filling cost estimator</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e6fff6]">Estimate what a dental filling may cost in Arlington, TX based on filling material, tooth location, cavity size, common visit add-ons, and a rough insurance scenario.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/es/contact" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0f5f56] shadow-sm transition hover:bg-[#f0fbf6]">Contact Sonria Dentista</Link>
              <Link href="/es" className="rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Visit main website</Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white/12 p-6 shadow-2xl ring-1 ring-white/20">
            <p className="text-sm font-semibold text-[#bfe7d7]">Estimated patient range</p>
            <p className="mt-3 text-5xl font-bold tracking-tight">{currency(estimate.patientLow)} - {currency(estimate.patientHigh)}</p>
            <p className="mt-4 text-sm leading-6 text-[#e6fff6]">Before insurance, selected visit factors put the planning range near {currency(estimate.grossLow)} - {currency(estimate.grossHigh)}. A real exam is needed to diagnose decay depth and confirm benefits.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <form action="/tools/dental-filling-cost-estimator" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#d8e7df]">
          <input type="hidden" name="configured" value="1" />
          <h2 className="text-2xl font-bold">Build your estimate</h2>
          <p className="mt-2 text-sm leading-6 text-[#4a665f]">Change the options and update the estimate to see how the visible range moves.</p>
          <div className="mt-6 space-y-6">
            <label className="block"><span className="text-sm font-bold">Filling type</span><select name="type" defaultValue={estimate.fillingType} className="mt-2 w-full rounded-2xl border border-[#c7dbd2] bg-white px-4 py-3 text-sm font-semibold text-[#17372f] outline-none transition focus:border-[#0f5f56] focus:ring-4 focus:ring-[#bfe7d7]">{Object.entries(fillingTypes).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
            <label className="block"><span className="text-sm font-bold">Tooth location</span><select name="tooth" defaultValue={estimate.toothZone} className="mt-2 w-full rounded-2xl border border-[#c7dbd2] bg-white px-4 py-3 text-sm font-semibold text-[#17372f] outline-none transition focus:border-[#0f5f56] focus:ring-4 focus:ring-[#bfe7d7]">{Object.entries(toothZones).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
            <fieldset><legend className="text-sm font-bold">Cavity size</legend><div className="mt-3 grid gap-3">{Object.entries(surfaceCounts).map(([value, option]) => <label key={value} className="flex items-start gap-3 rounded-2xl border border-[#d8e7df] bg-[#f7faf8] p-4"><input type="radio" name="surfaces" value={value} defaultChecked={estimate.surfaceCount === value} className="mt-1 h-4 w-4 accent-[#0f5f56]" /><span><span className="block text-sm font-bold">{option.label}</span><span className="mt-1 block text-sm leading-5 text-[#4a665f]">{option.note}</span></span></label>)}</div></fieldset>
            <label className="block"><span className="text-sm font-bold">Insurance scenario</span><select name="coverage" defaultValue={estimate.coverage} className="mt-2 w-full rounded-2xl border border-[#c7dbd2] bg-white px-4 py-3 text-sm font-semibold text-[#17372f] outline-none transition focus:border-[#0f5f56] focus:ring-4 focus:ring-[#bfe7d7]">{Object.entries(coverages).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
            <fieldset><legend className="text-sm font-bold">Likely visit add-ons</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{Object.entries(addOns).map(([value, option]) => <label key={value} className="flex items-start gap-3 rounded-2xl border border-[#d8e7df] bg-white p-4"><input type="checkbox" name="addons" value={value} defaultChecked={estimate.selectedAddOns.includes(value as AddOn)} className="mt-1 h-4 w-4 accent-[#0f5f56]" /><span className="text-sm font-semibold">{option.label}</span></label>)}</div></fieldset>
            <button type="submit" className="w-full rounded-full bg-[#0f5f56] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0b4a43] focus:outline-none focus:ring-4 focus:ring-[#bfe7d7]">Update estimate</button>
          </div>
        </form>

        <div className="space-y-6">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#d8e7df]"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f5f56]">Your estimated range</p><h2 className="mt-3 text-4xl font-bold">{currency(estimate.patientLow)} - {currency(estimate.patientHigh)}</h2><p className="mt-3 text-sm leading-6 text-[#4a665f]">Estimated out-of-pocket range after the selected insurance scenario. The full pre-insurance planning range is {currency(estimate.grossLow)} - {currency(estimate.grossHigh)}.</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#f7faf8] p-4"><p className="text-sm font-bold">Filling only</p><p className="mt-1 text-2xl font-bold">{currency(estimate.clinicalLow)} - {currency(estimate.clinicalHigh)}</p></div><div className="rounded-2xl bg-[#f7faf8] p-4"><p className="text-sm font-bold">With selected add-ons</p><p className="mt-1 text-2xl font-bold">{currency(estimate.grossLow)} - {currency(estimate.grossHigh)}</p></div></div></section>
          <section className="rounded-3xl bg-[#fff8e8] p-6 shadow-sm ring-1 ring-[#ead9a8]"><h2 className="text-2xl font-bold">What this means</h2><div className="mt-4 space-y-3 text-sm leading-6 text-[#4a665f]"><p>{fillingTypes[estimate.fillingType].note}</p><p>{toothZones[estimate.toothZone].note}</p><p>{coverages[estimate.coverage].note}</p><p className="font-semibold text-[#17372f]">{estimate.nextStep}</p></div></section>
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#d8e7df]"><h2 className="text-2xl font-bold">Selected add-on notes</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-[#4a665f]">{estimate.selectedAddOns.length > 0 ? estimate.selectedAddOns.map((addOn) => <li key={addOn}><span className="font-bold text-[#17372f]">{addOns[addOn].label}:</span> {addOns[addOn].note}</li>) : <li>No add-ons selected. Your estimate currently shows the filling range only.</li>}</ul></section>
        </div>
      </section>

      <section className="bg-white"><div className="mx-auto max-w-6xl px-6 py-12 lg:px-8"><div className="grid gap-6 lg:grid-cols-3"><div className="rounded-3xl bg-[#f7faf8] p-6 ring-1 ring-[#d8e7df]"><h2 className="text-xl font-bold">What affects filling cost?</h2><p className="mt-3 text-sm leading-6 text-[#4a665f]">Material, tooth location, number of tooth surfaces, decay depth, imaging, and insurance rules can all change the final cost.</p></div><div className="rounded-3xl bg-[#f7faf8] p-6 ring-1 ring-[#d8e7df]"><h2 className="text-xl font-bold">When should you call?</h2><p className="mt-3 text-sm leading-6 text-[#4a665f]">Call sooner for tooth pain, swelling, a broken filling, sensitivity that lingers, or a dark spot that is getting larger.</p></div><div className="rounded-3xl bg-[#f7faf8] p-6 ring-1 ring-[#d8e7df]"><h2 className="text-xl font-bold">Questions to ask</h2><p className="mt-3 text-sm leading-6 text-[#4a665f]">Ask whether the tooth can be restored with a filling, whether a crown may be safer, and how your insurance handles basic restorative care.</p></div></div></div></section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8"><div className="rounded-3xl bg-[#0f5f56] p-8 text-white shadow-sm"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><h2 className="text-3xl font-bold">Ready to confirm the tooth?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#e6fff6]">Sonria Dentista can check the cavity, review your insurance details, and explain whether a filling is the right next step.</p></div><div className="flex flex-wrap gap-3"><Link href="/es/contact" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0f5f56] transition hover:bg-[#f0fbf6]">Contact the team</Link><Link href="/es/faq" className="rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Read FAQs</Link></div></div></div></section>

      <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8"><h2 className="text-2xl font-bold">Keyword opportunity signals</h2><div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#d8e7df]"><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-[#f0fbf6] text-[#17372f]"><tr><th className="px-4 py-3 font-bold">Keyword</th><th className="px-4 py-3 font-bold">Intent</th><th className="px-4 py-3 font-bold">Volume</th><th className="px-4 py-3 font-bold">Competition</th><th className="px-4 py-3 font-bold">CPC</th><th className="px-4 py-3 font-bold">Difficulty</th><th className="px-4 py-3 font-bold">Score</th></tr></thead><tbody className="divide-y divide-[#d8e7df]">{keywordTargets.map((target) => <tr key={target.keyword}><td className="px-4 py-3 font-semibold">{target.keyword}</td><td className="px-4 py-3 text-[#4a665f]">{target.intent}</td><td className="px-4 py-3 text-[#4a665f]">{target.volume.toLocaleString("en-US")}</td><td className="px-4 py-3 text-[#4a665f]">{target.competition}</td><td className="px-4 py-3 text-[#4a665f]">{target.cpc}</td><td className="px-4 py-3 text-[#4a665f]">{target.difficulty}</td><td className="px-4 py-3 font-bold text-[#0f5f56]">{target.opportunity}</td></tr>)}</tbody></table></div></div></section>
    </main>
  );
}
