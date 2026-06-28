import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dental Veneer Cost Estimator | Sonria Dentista Arlington",
  description:
    "Estimate dental veneer cost in Arlington, TX by veneer type, number of teeth, whitening needs, gum contouring, and financing before your cosmetic dental visit.",
  alternates: {
    canonical: "/tools/dental-veneer-cost-estimator",
  },
};

type VeneerType = "composite" | "porcelain" | "minimal-prep";
type ToothCount = "one" | "two-four" | "six-eight" | "ten-plus";
type SmileGoal = "single-tooth" | "small-zone" | "smile-makeover";
type Coverage = "none" | "fsa" | "financing";
type AddOn = "exam" | "whitening" | "gum-contouring" | "night-guard";
type SearchParams = Record<string, string | string[] | undefined>;

const keywordTargets = [
  {
    keyword: "dental veneer cost estimator",
    volume: 90,
    competition: "medium",
    cpc: 8.42,
    difficulty: 24,
    opportunity: 86,
  },
  {
    keyword: "how much do veneers cost",
    volume: 5400,
    competition: "high",
    cpc: 7.91,
    difficulty: 46,
    opportunity: 78,
  },
  {
    keyword: "porcelain veneers cost",
    volume: 2900,
    competition: "high",
    cpc: 9.18,
    difficulty: 41,
    opportunity: 76,
  },
  {
    keyword: "veneers cost in Texas",
    volume: 140,
    competition: "medium",
    cpc: 6.73,
    difficulty: 22,
    opportunity: 82,
  },
];

const veneerTypes: Record<VeneerType, { label: string; low: number; high: number; note: string }> = {
  composite: {
    label: "Composite veneer",
    low: 350,
    high: 900,
    note: "Often the lower-cost choice, but it may stain or chip sooner than porcelain.",
  },
  porcelain: {
    label: "Porcelain veneer",
    low: 950,
    high: 2200,
    note: "A common cosmetic option for longer-lasting color, shape, and smile symmetry.",
  },
  "minimal-prep": {
    label: "Minimal-prep porcelain veneer",
    low: 1200,
    high: 2500,
    note: "May preserve more enamel, but candidacy depends on bite, spacing, and tooth position.",
  },
};

const toothCounts: Record<ToothCount, { label: string; multiplier: number; note: string }> = {
  one: {
    label: "1 tooth",
    multiplier: 1,
    note: "Best for one chipped, stained, or uneven tooth that stands out in the smile.",
  },
  "two-four": {
    label: "2 to 4 teeth",
    multiplier: 3,
    note: "Often used to balance the teeth most visible when speaking or smiling.",
  },
  "six-eight": {
    label: "6 to 8 teeth",
    multiplier: 7,
    note: "A common range for a broader smile makeover across the upper front teeth.",
  },
  "ten-plus": {
    label: "10 or more teeth",
    multiplier: 10,
    note: "Usually planned as a full cosmetic case with more detailed bite and shade design.",
  },
};

const smileGoals: Record<SmileGoal, { label: string; low: number; high: number; note: string }> = {
  "single-tooth": {
    label: "Fix one tooth",
    low: 0,
    high: 150,
    note: "A single-tooth case may need extra shade matching so it blends with nearby teeth.",
  },
  "small-zone": {
    label: "Even out the front smile",
    low: 150,
    high: 450,
    note: "Small-zone cases may include wax-up or mock-up planning before final veneers.",
  },
  "smile-makeover": {
    label: "Smile makeover",
    low: 400,
    high: 1200,
    note: "Larger cases often need more design time, photos, bite checks, and staged planning.",
  },
};

const coverageOptions: Record<Coverage, { label: string; factor: number; note: string }> = {
  none: {
    label: "No cosmetic coverage",
    factor: 1,
    note: "Most veneer treatment is considered cosmetic, so many dental plans do not cover it.",
  },
  fsa: {
    label: "FSA/HSA or employer benefit may help",
    factor: 0.92,
    note: "Some patients use tax-advantaged funds when treatment is eligible under their plan rules.",
  },
  financing: {
    label: "Monthly payment planning",
    factor: 1,
    note: "Financing does not lower the fee, but it can spread the cost over predictable payments.",
  },
};

const addOns: Record<AddOn, { label: string; low: number; high: number }> = {
  exam: {
    label: "Cosmetic exam and digital X-rays",
    low: 120,
    high: 280,
  },
  whitening: {
    label: "Whitening before shade matching",
    low: 250,
    high: 650,
  },
  "gum-contouring": {
    label: "Gum contouring for symmetry",
    low: 300,
    high: 1200,
  },
  "night-guard": {
    label: "Night guard for clenching or grinding",
    low: 350,
    high: 750,
  },
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isOneOf<T extends string>(value: string | undefined, allowed: readonly T[], fallback: T): T {
  return value && allowed.includes(value as T) ? (value as T) : fallback;
}

function selectedAddOns(searchParams: SearchParams | undefined) {
  const raw = searchParams?.addons;
  const values = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const allowed = Object.keys(addOns) as AddOn[];

  return values.filter((value): value is AddOn => allowed.includes(value as AddOn));
}

function dollars(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateEstimate(searchParams: SearchParams | undefined) {
  const veneerType = isOneOf(firstValue(searchParams?.type), Object.keys(veneerTypes) as VeneerType[], "porcelain");
  const toothCount = isOneOf(firstValue(searchParams?.teeth), Object.keys(toothCounts) as ToothCount[], "six-eight");
  const smileGoal = isOneOf(firstValue(searchParams?.goal), Object.keys(smileGoals) as SmileGoal[], "small-zone");
  const coverage = isOneOf(firstValue(searchParams?.coverage), Object.keys(coverageOptions) as Coverage[], "none");
  const selected = selectedAddOns(searchParams);

  const base = veneerTypes[veneerType];
  const count = toothCounts[toothCount];
  const goal = smileGoals[smileGoal];
  const coverageOption = coverageOptions[coverage];
  const addOnLow = selected.reduce((sum, addOn) => sum + addOns[addOn].low, 0);
  const addOnHigh = selected.reduce((sum, addOn) => sum + addOns[addOn].high, 0);

  const low = Math.round((base.low * count.multiplier + goal.low + addOnLow) * coverageOption.factor);
  const high = Math.round((base.high * count.multiplier + goal.high + addOnHigh) * coverageOption.factor);

  return {
    veneerType,
    toothCount,
    smileGoal,
    coverage,
    selected,
    low,
    high,
  };
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Dental Veneer Cost Estimator",
  description:
    "Estimate dental veneer costs in Arlington, TX based on veneer material, number of teeth, cosmetic planning needs, and common add-ons.",
  url: "https://sonriadentista.com/tools/dental-veneer-cost-estimator",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Dental Veneer Cost Estimator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
};

export default function DentalVeneerCostEstimatorPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const estimate = calculateEstimate(searchParams);
  const activeKeyword = keywordTargets[0];

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#1f2933]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="border-b border-[#e8ded2] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-14">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              Cosmetic dentistry tool
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-[#172026] md:text-5xl">
              Dental veneer cost estimator
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52616b]">
              Estimate the cost of dental veneers in Arlington, TX before your cosmetic consultation. Adjust veneer type, number of teeth, smile goals, and common add-ons to see a practical planning range.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#52616b]">
              <span className="rounded-full bg-[#eef7f5] px-4 py-2 font-medium text-[#0f766e]">
                Porcelain and composite veneers
              </span>
              <span className="rounded-full bg-[#f2ebe3] px-4 py-2 font-medium text-[#7c5c37]">
                Arlington, TX pricing context
              </span>
              <span className="rounded-full bg-[#f7eeee] px-4 py-2 font-medium text-[#8a3f3f]">
                Cosmetic planning estimate
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-[#e8ded2] bg-[#fbfaf8] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#7c5c37]">
              Estimated range
            </p>
            <p className="mt-3 text-4xl font-semibold text-[#172026]">
              {dollars(estimate.low)} - {dollars(estimate.high)}
            </p>
            <p className="mt-4 text-sm leading-6 text-[#52616b]">
              This is an educational estimate, not a diagnosis or final quote. A dentist needs to check enamel, bite, gum health, tooth color, and X-rays before confirming veneer options.
            </p>
            <Link
              href="/en/contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#115e59]"
            >
              Request a cosmetic consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[0.95fr_1.05fr] md:px-8">
        <form className="rounded-lg border border-[#e8ded2] bg-white p-5 shadow-sm" action="/tools/dental-veneer-cost-estimator">
          <div className="grid gap-5">
            <fieldset>
              <legend className="text-sm font-semibold text-[#172026]">Veneer type</legend>
              <div className="mt-3 grid gap-2">
                {(Object.keys(veneerTypes) as VeneerType[]).map((key) => (
                  <label key={key} className="flex cursor-pointer gap-3 rounded-md border border-[#eadfd3] p-3 text-sm">
                    <input type="radio" name="type" value={key} defaultChecked={estimate.veneerType === key} />
                    <span>
                      <span className="block font-medium text-[#172026]">{veneerTypes[key].label}</span>
                      <span className="block text-[#52616b]">{dollars(veneerTypes[key].low)} - {dollars(veneerTypes[key].high)} per tooth</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-[#172026]">Number of teeth</legend>
              <select name="teeth" defaultValue={estimate.toothCount} className="mt-3 w-full rounded-md border border-[#d8cbbd] bg-white px-3 py-3 text-sm">
                {(Object.keys(toothCounts) as ToothCount[]).map((key) => (
                  <option key={key} value={key}>{toothCounts[key].label}</option>
                ))}
              </select>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-[#172026]">Smile goal</legend>
              <select name="goal" defaultValue={estimate.smileGoal} className="mt-3 w-full rounded-md border border-[#d8cbbd] bg-white px-3 py-3 text-sm">
                {(Object.keys(smileGoals) as SmileGoal[]).map((key) => (
                  <option key={key} value={key}>{smileGoals[key].label}</option>
                ))}
              </select>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-[#172026]">Payment planning</legend>
              <select name="coverage" defaultValue={estimate.coverage} className="mt-3 w-full rounded-md border border-[#d8cbbd] bg-white px-3 py-3 text-sm">
                {(Object.keys(coverageOptions) as Coverage[]).map((key) => (
                  <option key={key} value={key}>{coverageOptions[key].label}</option>
                ))}
              </select>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-[#172026]">Possible add-ons</legend>
              <div className="mt-3 grid gap-2">
                {(Object.keys(addOns) as AddOn[]).map((key) => (
                  <label key={key} className="flex cursor-pointer items-start gap-3 rounded-md border border-[#eadfd3] p-3 text-sm">
                    <input type="checkbox" name="addons" value={key} defaultChecked={estimate.selected.includes(key)} />
                    <span>
                      <span className="block font-medium text-[#172026]">{addOns[key].label}</span>
                      <span className="block text-[#52616b]">{dollars(addOns[key].low)} - {dollars(addOns[key].high)}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button className="rounded-md bg-[#172026] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2f3b43]" type="submit">
              Update estimate
            </button>
          </div>
        </form>

        <div className="grid gap-5">
          <section className="rounded-lg border border-[#e8ded2] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#172026]">What affects veneer cost?</h2>
            <div className="mt-5 grid gap-4 text-sm leading-6 text-[#52616b]">
              <p><strong className="text-[#172026]">{veneerTypes[estimate.veneerType].label}:</strong> {veneerTypes[estimate.veneerType].note}</p>
              <p><strong className="text-[#172026]">{toothCounts[estimate.toothCount].label}:</strong> {toothCounts[estimate.toothCount].note}</p>
              <p><strong className="text-[#172026]">{smileGoals[estimate.smileGoal].label}:</strong> {smileGoals[estimate.smileGoal].note}</p>
              <p><strong className="text-[#172026]">{coverageOptions[estimate.coverage].label}:</strong> {coverageOptions[estimate.coverage].note}</p>
            </div>
          </section>

          <section className="rounded-lg border border-[#e8ded2] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#172026]">Dental veneers cost in Arlington, TX</h2>
            <p className="mt-4 text-sm leading-6 text-[#52616b]">
              Many veneer cases are quoted per tooth. Composite veneers are usually less expensive up front, while porcelain veneers often cost more because of lab work, shade design, durability, and cosmetic planning. A full smile case can also include whitening, gum shaping, night guard protection, or replacement of older dental work.
            </p>
            <p className="mt-4 text-sm leading-6 text-[#52616b]">
              This calculator targets patients searching for {activeKeyword.keyword}, porcelain veneers cost, and veneers cost in Texas. The estimate is designed to help you compare likely ranges before discussing a personalized plan with Sonria Dentista.
            </p>
          </section>

          <section className="rounded-lg border border-[#e8ded2] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#172026]">Frequently asked questions</h2>
            <div className="mt-5 grid gap-5 text-sm leading-6 text-[#52616b]">
              <div>
                <h3 className="font-semibold text-[#172026]">Does insurance cover veneers?</h3>
                <p>Most dental insurance plans classify veneers as cosmetic treatment. Coverage is uncommon, but benefits can vary when a tooth also has structural damage.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#172026]">Are porcelain veneers more expensive than composite veneers?</h3>
                <p>Usually, yes. Porcelain veneers often cost more because they involve lab fabrication, detailed shade matching, and longer-lasting ceramic materials.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#172026]">How do I get an exact veneer quote?</h3>
                <p>A dentist needs to examine your teeth, gums, bite, enamel, and cosmetic goals. Photos, X-rays, and a smile design conversation help confirm the final plan.</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
