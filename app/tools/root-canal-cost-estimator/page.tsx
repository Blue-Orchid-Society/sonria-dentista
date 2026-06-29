import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Root Canal Cost Estimator | Sonria Dentista",
  description:
    "Use this practical root canal cost estimator resource to assess your next move, prepare for a consultation, and understand what to ask before scheduling care.",
  alternates: {
    canonical: "/tools/root-canal-cost-estimator",
  },
};

type ToothType = "front" | "premolar" | "molar";
type Coverage = "none" | "basic" | "major";
type AddOn = "exam" | "crown" | "retreatment" | "sedation";

type SearchParams = Record<string, string | string[] | undefined>;

const toothTypes: Record<ToothType, { label: string; low: number; high: number; note: string }> = {
  front: {
    label: "Front tooth",
    low: 700,
    high: 1100,
    note: "Usually has fewer canals, so it often costs less than back teeth.",
  },
  premolar: {
    label: "Premolar",
    low: 800,
    high: 1250,
    note: "Often sits in the middle of the range because anatomy varies.",
  },
  molar: {
    label: "Molar",
    low: 1000,
    high: 1700,
    note: "Usually costs more because molars have more canals and take longer.",
  },
};

const coverageOptions: Record<Coverage, { label: string; discount: number; note: string }> = {
  none: {
    label: "No dental insurance",
    discount: 0,
    note: "Estimate shown as a private-pay range before any office membership or financing options.",
  },
  basic: {
    label: "Dental insurance may cover 40%",
    discount: 0.4,
    note: "Some plans treat root canal therapy as a basic service after deductible and waiting periods.",
  },
  major: {
    label: "Dental insurance may cover 50%",
    discount: 0.5,
    note: "Many plans apply coinsurance, annual maximums, deductibles, and tooth-specific limitations.",
  },
};

const addOns: Record<AddOn, { label: string; low: number; high: number }> = {
  exam: { label: "Emergency exam and X-rays", low: 120, high: 300 },
  crown: { label: "Crown after treatment", low: 950, high: 1800 },
  retreatment: { label: "Possible retreatment complexity", low: 300, high: 900 },
  sedation: { label: "Optional sedation", low: 150, high: 500 },
};

function getValue<T extends string>(
  value: string | string[] | undefined,
  fallback: T,
  allowed: readonly T[]
): T {
  const raw = Array.isArray(value) ? value[0] : value;
  return allowed.includes(raw as T) ? (raw as T) : fallback;
}

function getAddOns(value: string | string[] | undefined): AddOn[] {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter((item): item is AddOn =>
    (Object.keys(addOns) as AddOn[]).includes(item as AddOn)
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function RootCanalCostEstimatorPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const tooth = getValue<ToothType>(params.tooth, "molar", ["front", "premolar", "molar"]);
  const coverage = getValue<Coverage>(params.coverage, "none", ["none", "basic", "major"]);
  const selectedAddOns = getAddOns(params.addon);

  const base = toothTypes[tooth];
  const insurance = coverageOptions[coverage];
  const addOnTotals = selectedAddOns.reduce(
    (total, id) => ({
      low: total.low + addOns[id].low,
      high: total.high + addOns[id].high,
    }),
    { low: 0, high: 0 }
  );

  const grossLow = base.low + addOnTotals.low;
  const grossHigh = base.high + addOnTotals.high;
  const estimatedLow = Math.round(grossLow * (1 - insurance.discount));
  const estimatedHigh = Math.round(grossHigh * (1 - insurance.discount));

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Root Canal Cost Estimator",
    description:
      "Use this practical root canal cost estimator resource to estimate treatment costs, compare dental insurance for root canal scenarios, and plan next steps.",
    url: "https://sonriadentista.com/tools/root-canal-cost-estimator",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Root Canal Cost Estimator Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#1f2a24]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="border-b border-[#e6dfd4] bg-[#f4efe7]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9c563f]">
              Dental cost calculator
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#15352b] md:text-5xl">
              Root canal cost estimator
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4b5b52]">
              Estimate a practical out-of-pocket range for root canal treatment based on tooth
              type, dental insurance for root canal coverage, and common add-ons like X-rays or a
              crown.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[#15352b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#244d41]"
              >
                Contact Sonria Dentista
              </Link>
              <Link
                href="/tools"
                className="rounded-full border border-[#c9b9a6] px-5 py-3 text-sm font-semibold text-[#15352b] transition hover:bg-white"
              >
                View dental tools
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-[#dfd4c5] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9c563f]">
              Estimated range
            </p>
            <div className="mt-3 text-4xl font-semibold text-[#15352b]">
              {formatCurrency(estimatedLow)} - {formatCurrency(estimatedHigh)}
            </div>
            <p className="mt-4 text-sm leading-6 text-[#56655d]">
              This is an educational estimate, not a diagnosis or quote. A dentist must confirm the
              tooth, canals, infection level, restoration needs, insurance terms, and whether a
              crown is required.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[0.95fr_1.05fr]">
        <form className="rounded-lg border border-[#e1d8cc] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#15352b]">Build your estimate</h2>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-[#263a31]">Which tooth needs treatment?</legend>
            <div className="mt-3 grid gap-3">
              {(Object.keys(toothTypes) as ToothType[]).map((id) => (
                <label
                  key={id}
                  className="flex cursor-pointer gap-3 rounded-md border border-[#e1d8cc] p-4 text-sm"
                >
                  <input
                    type="radio"
                    name="tooth"
                    value={id}
                    defaultChecked={tooth === id}
                    className="mt-1"
                  />
                  <span>
                    <span className="block font-semibold text-[#15352b]">{toothTypes[id].label}</span>
                    <span className="mt-1 block text-[#5d6b63]">{toothTypes[id].note}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-[#263a31]">Dental insurance assumption</legend>
            <div className="mt-3 grid gap-3">
              {(Object.keys(coverageOptions) as Coverage[]).map((id) => (
                <label
                  key={id}
                  className="flex cursor-pointer gap-3 rounded-md border border-[#e1d8cc] p-4 text-sm"
                >
                  <input
                    type="radio"
                    name="coverage"
                    value={id}
                    defaultChecked={coverage === id}
                    className="mt-1"
                  />
                  <span>
                    <span className="block font-semibold text-[#15352b]">
                      {coverageOptions[id].label}
                    </span>
                    <span className="mt-1 block text-[#5d6b63]">{coverageOptions[id].note}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-[#263a31]">Possible add-ons</legend>
            <div className="mt-3 grid gap-3">
              {(Object.keys(addOns) as AddOn[]).map((id) => (
                <label
                  key={id}
                  className="flex cursor-pointer items-start gap-3 rounded-md border border-[#e1d8cc] p-4 text-sm"
                >
                  <input
                    type="checkbox"
                    name="addon"
                    value={id}
                    defaultChecked={selectedAddOns.includes(id)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block font-semibold text-[#15352b]">{addOns[id].label}</span>
                    <span className="mt-1 block text-[#5d6b63]">
                      {formatCurrency(addOns[id].low)} - {formatCurrency(addOns[id].high)}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#9c563f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7f4433]"
          >
            Update estimate
          </button>
        </form>

        <div className="space-y-6">
          <section className="rounded-lg border border-[#e1d8cc] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#15352b]">What your estimate includes</h2>
            <dl className="mt-5 grid gap-4">
              <div className="flex items-start justify-between gap-4 border-b border-[#eee6db] pb-4">
                <dt className="font-semibold text-[#263a31]">{base.label} root canal</dt>
                <dd className="text-right text-[#4b5b52]">
                  {formatCurrency(base.low)} - {formatCurrency(base.high)}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-[#eee6db] pb-4">
                <dt className="font-semibold text-[#263a31]">Selected add-ons</dt>
                <dd className="text-right text-[#4b5b52]">
                  {formatCurrency(addOnTotals.low)} - {formatCurrency(addOnTotals.high)}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-semibold text-[#263a31]">Insurance adjustment</dt>
                <dd className="text-right text-[#4b5b52]">{Math.round(insurance.discount * 100)}%</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-lg border border-[#e1d8cc] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#15352b]">
              How dental insurance changes root canal cost
            </h2>
            <p className="mt-4 leading-7 text-[#4b5b52]">
              Dental insurance for root canal treatment usually depends on whether the plan classifies
              endodontics as basic or major care. The final patient cost can also change because of
              deductibles, annual maximums, waiting periods, missing tooth clauses, and whether the
              dentist is in network.
            </p>
            <p className="mt-4 leading-7 text-[#4b5b52]">
              Use this calculator as a planning range, then ask the office to verify benefits before
              treatment. If the tooth needs a crown after therapy, include that restoration in your
              budget because it is often billed separately.
            </p>
          </section>

          <section className="rounded-lg border border-[#d4c0ad] bg-[#fff8ef] p-6">
            <h2 className="text-2xl font-semibold text-[#15352b]">Next steps</h2>
            <p className="mt-4 leading-7 text-[#4b5b52]">
              Sonria Dentista helps patients understand dental cost factors, compare care options, and prepare for a confident visit.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/tools"
                className="rounded-full border border-[#c9b9a6] px-4 py-2 text-sm font-semibold text-[#15352b] hover:bg-white"
              >
                Dental planning guide
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-[#c9b9a6] px-4 py-2 text-sm font-semibold text-[#15352b] hover:bg-white"
              >
                Dental services
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-[#15352b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#244d41]"
              >
                Contact us
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
