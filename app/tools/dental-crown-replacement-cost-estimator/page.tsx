import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dental Crown Replacement Cost Estimator | Sonria Dentista Arlington",
  description:
    "Estimate dental crown replacement cost in Arlington, TX by crown type, tooth location, insurance, and likely add-ons before scheduling a dental visit.",
  alternates: {
    canonical: "/tools/dental-crown-replacement-cost-estimator",
  },
};

type CrownType = "porcelain-fused" | "ceramic" | "zirconia" | "gold";
type ToothZone = "front" | "premolar" | "molar";
type ReplacementReason = "worn" | "cracked" | "decay" | "lost";
type Coverage = "none" | "partial" | "strong";
type AddOn = "exam" | "xray" | "build-up" | "night-guard";
type SearchParams = Record<string, string | string[] | undefined>;

const crownTypes: Record<CrownType, { label: string; low: number; high: number; note: string }> = {
  "porcelain-fused": {
    label: "Porcelain-fused-to-metal crown",
    low: 950,
    high: 1500,
    note: "A common replacement option when strength matters and the tooth is less visible.",
  },
  ceramic: {
    label: "All-ceramic crown",
    low: 1100,
    high: 1750,
    note: "Often chosen for front teeth or smile-zone replacements because of its natural look.",
  },
  zirconia: {
    label: "Zirconia crown",
    low: 1200,
    high: 1900,
    note: "A strong option for molars, heavy bite pressure, or patients who grind.",
  },
  gold: {
    label: "Gold or high-noble metal crown",
    low: 1350,
    high: 2200,
    note: "Durable, conservative on opposing teeth, and usually priced higher because of lab material cost.",
  },
};

const toothZones: Record<ToothZone, { label: string; multiplier: number; note: string }> = {
  front: {
    label: "Front tooth",
    multiplier: 1.04,
    note: "Front teeth can require extra shade matching for a natural smile.",
  },
  premolar: {
    label: "Premolar",
    multiplier: 1,
    note: "Premolars are the baseline estimate for this calculator.",
  },
  molar: {
    label: "Molar",
    multiplier: 1.08,
    note: "Molars often need stronger material and more bite adjustment.",
  },
};

const replacementReasons: Record<ReplacementReason, { label: string; low: number; high: number; note: string }> = {
  worn: {
    label: "Old crown is worn or leaking",
    low: 0,
    high: 150,
    note: "A simple replacement may only need removal, cleanup, and a new crown.",
  },
  cracked: {
    label: "Crown or tooth feels cracked",
    low: 120,
    high: 450,
    note: "A cracked tooth may need extra imaging, build-up, or bite protection.",
  },
  decay: {
    label: "Decay under the crown",
    low: 180,
    high: 650,
    note: "Decay can add core build-up cost if the tooth needs more support.",
  },
  lost: {
    label: "Crown came off or is missing",
    low: 90,
    high: 350,
    note: "A dentist may need to evaluate whether the crown can be recemented or must be replaced.",
  },
};

const addOns: Record<AddOn, { label: string; low: number; high: number }> = {
  exam: { label: "Limited exam", low: 75, high: 150 },
  xray: { label: "X-rays or 3D imaging", low: 40, high: 250 },
  "build-up": { label: "Core build-up", low: 250, high: 550 },
  "night-guard": { label: "Night guard for grinding", low: 350, high: 700 },
};

const coverageLevels: Record<Coverage, { label: string; discount: number; note: string }> = {
  none: {
    label: "No dental insurance",
    discount: 0,
    note: "Shows the estimated cash-pay range before financing or membership savings.",
  },
  partial: {
    label: "Some crown coverage",
    discount: 0.28,
    note: "Many plans classify crowns as major care and may cover part of the fee after deductible.",
  },
  strong: {
    label: "Strong major-care coverage",
    discount: 0.45,
    note: "Assumes higher plan participation, subject to annual maximums and waiting periods.",
  },
};

const keywordSignals = [
  { keyword: "dental crown replacement cost", volume: 720, competition: 0.48, cpc: 8.65, difficulty: 36, opportunity: 84 },
  { keyword: "cost to replace dental crown", volume: 390, competition: 0.42, cpc: 7.9, difficulty: 31, opportunity: 82 },
  { keyword: "how much does it cost to replace a crown", volume: 320, competition: 0.38, cpc: 6.75, difficulty: 29, opportunity: 79 },
  { keyword: "dental crown replacement cost with insurance", volume: 210, competition: 0.34, cpc: 9.1, difficulty: 27, opportunity: 81 },
  { keyword: "crown replacement dentist Arlington TX", volume: 70, competition: 0.29, cpc: 10.4, difficulty: 18, opportunity: 76 },
];

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseChoice<T extends string>(value: string | string[] | undefined, choices: Record<T, unknown>, fallback: T) {
  const selected = firstParam(value);
  return selected && selected in choices ? (selected as T) : fallback;
}

function parseAddOns(value: string | string[] | undefined) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter((item): item is AddOn => item in addOns);
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}

export default async function DentalCrownReplacementCostEstimatorPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const crownType = parseChoice(params.crownType, crownTypes, "zirconia");
  const toothZone = parseChoice(params.toothZone, toothZones, "molar");
  const reason = parseChoice(params.reason, replacementReasons, "decay");
  const coverage = parseChoice(params.coverage, coverageLevels, "none");
  const selectedAddOns = parseAddOns(params.addOns);

  const crown = crownTypes[crownType];
  const tooth = toothZones[toothZone];
  const replacement = replacementReasons[reason];
  const insurance = coverageLevels[coverage];
  const addOnLow = selectedAddOns.reduce((total, addOn) => total + addOns[addOn].low, 0);
  const addOnHigh = selectedAddOns.reduce((total, addOn) => total + addOns[addOn].high, 0);
  const preInsuranceLow = crown.low * tooth.multiplier + replacement.low + addOnLow;
  const preInsuranceHigh = crown.high * tooth.multiplier + replacement.high + addOnHigh;
  const estimatedLow = preInsuranceLow * (1 - insurance.discount);
  const estimatedHigh = preInsuranceHigh * (1 - insurance.discount);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Dental Crown Replacement Cost Estimator",
    description:
      "A practical estimator for dental crown replacement cost in Arlington, TX, including crown material, tooth location, replacement reason, add-ons, and insurance assumptions.",
    url: "https://sonriadentista.com/tools/dental-crown-replacement-cost-estimator",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Dental Crown Replacement Cost Estimator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does it cost to replace a dental crown?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many crown replacements fall between about $950 and $2,200 before insurance, depending on the material, tooth location, decay, build-up needs, and imaging.",
        },
      },
      {
        "@type": "Question",
        name: "Can insurance cover dental crown replacement?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dental insurance may cover part of a crown replacement when it is medically necessary, but deductibles, annual maximums, waiting periods, and replacement frequency rules can affect the final out-of-pocket cost.",
        },
      },
    ],
  };

  return (
    <main className="bg-cream text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              Dental crown replacement cost estimator
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Estimate the cost to replace a dental crown in Arlington, TX.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">
              Use this calculator to compare crown material, tooth location, insurance assumptions, and common add-ons before you book an exam. It is a planning tool, not a diagnosis.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/en/contact" className="rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta/90">
                Schedule a crown visit
              </Link>
              <Link href="/en/services" className="rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-terracotta/50">
                View dental services
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-cream p-6 shadow-warm">
            <p className="text-sm font-semibold text-ink/60">Estimated out-of-pocket range</p>
            <p className="mt-3 font-display text-4xl text-terracotta">{money(estimatedLow)} - {money(estimatedHigh)}</p>
            <p className="mt-4 text-sm leading-6 text-ink/70">
              Before insurance, the selected scenario is approximately {money(preInsuranceLow)} - {money(preInsuranceHigh)}. {insurance.note}
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-t border-ink/10 pt-3">
                <dt className="text-ink/60">Crown type</dt>
                <dd className="text-right font-semibold">{crown.label}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-ink/10 pt-3">
                <dt className="text-ink/60">Tooth</dt>
                <dd className="text-right font-semibold">{tooth.label}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-ink/10 pt-3">
                <dt className="text-ink/60">Reason</dt>
                <dd className="text-right font-semibold">{replacement.label}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1fr_0.78fr]">
        <form className="rounded-2xl border border-ink/10 bg-white p-6 shadow-warm" action="" method="get">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold">Crown replacement type</span>
              <select name="crownType" defaultValue={crownType} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm">
                {Object.entries(crownTypes).map(([value, option]) => (
                  <option key={value} value={value}>{option.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Tooth location</span>
              <select name="toothZone" defaultValue={toothZone} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm">
                {Object.entries(toothZones).map(([value, option]) => (
                  <option key={value} value={value}>{option.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Why it needs replacement</span>
              <select name="reason" defaultValue={reason} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm">
                {Object.entries(replacementReasons).map(([value, option]) => (
                  <option key={value} value={value}>{option.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Insurance assumption</span>
              <select name="coverage" defaultValue={coverage} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm">
                {Object.entries(coverageLevels).map(([value, option]) => (
                  <option key={value} value={value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold">Possible add-ons</legend>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {Object.entries(addOns).map(([value, addOn]) => (
                <label key={value} className="flex items-start gap-3 rounded-xl border border-ink/10 bg-cream px-4 py-3 text-sm">
                  <input type="checkbox" name="addOns" value={value} defaultChecked={selectedAddOns.includes(value as AddOn)} className="mt-1" />
                  <span>
                    <span className="block font-semibold">{addOn.label}</span>
                    <span className="text-ink/65">{money(addOn.low)} - {money(addOn.high)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="mt-7 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink/90">
            Update estimate
          </button>
        </form>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-warm">
            <h2 className="font-display text-2xl">What affects crown replacement cost?</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/72">
              <li>{crown.note}</li>
              <li>{tooth.note}</li>
              <li>{replacement.note}</li>
              <li>A final quote requires an exam because decay, cracks, gum health, bite pressure, and old crown removal can change the treatment plan.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-warm">
            <h2 className="font-display text-2xl">Search demand inputs</h2>
            <p className="mt-3 text-sm leading-6 text-ink/72">
              Built around high-intent DataForSEO keyword variants for crown replacement pricing, insurance, and local appointment readiness.
            </p>
            <div className="mt-4 space-y-2">
              {keywordSignals.map((signal) => (
                <div key={signal.keyword} className="rounded-xl border border-sage/20 bg-sage/10 p-3 text-xs text-ink/70">
                  <div className="font-semibold text-ink">{signal.keyword}</div>
                  <div className="mt-1">Vol {signal.volume} | Comp {signal.competition} | CPC ${signal.cpc} | KD {signal.difficulty} | Opp {signal.opportunity}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
