import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Same Day Dental Crown Cost Estimator Tool for SMB Teams | Blue Orchid Society",
  description:
    "Use this practical same day dental crown cost estimator resource to assess your next move, prioritize improvements, and identify where AI can create leverage.",
  alternates: {
    canonical: "/tools/same-day-dental-crown-cost-estimator",
  },
};

type CrownType = "same-day" | "traditional" | "zirconia";
type ToothZone = "front" | "premolar" | "molar";
type AddOn = "exam" | "build-up" | "root-canal" | "night-guard";

type SearchParams = Record<string, string | string[] | undefined>;

const crownTypes: Record<CrownType, { label: string; low: number; high: number; note: string }> = {
  "same-day": {
    label: "Same-day ceramic crown",
    low: 1150,
    high: 1900,
    note: "Often includes digital scanning, milling, and placement in one visit.",
  },
  traditional: {
    label: "Traditional lab crown",
    low: 950,
    high: 1700,
    note: "Usually requires a temporary crown and a second visit after lab fabrication.",
  },
  zirconia: {
    label: "High-strength zirconia crown",
    low: 1250,
    high: 2100,
    note: "Common for patients who need extra strength for heavy chewing areas.",
  },
};

const toothZones: Record<ToothZone, { label: string; adjustment: number }> = {
  front: { label: "Front tooth", adjustment: 75 },
  premolar: { label: "Premolar", adjustment: 0 },
  molar: { label: "Molar", adjustment: 125 },
};

const addOns: Record<AddOn, { label: string; low: number; high: number }> = {
  exam: { label: "Limited exam and X-rays", low: 120, high: 300 },
  "build-up": { label: "Core build-up", low: 250, high: 550 },
  "root-canal": { label: "Possible root canal", low: 850, high: 1600 },
  "night-guard": { label: "Night guard for clenching", low: 350, high: 750 },
};

function oneOf<T extends string>(value: string | string[] | undefined, allowed: readonly T[], fallback: T) {
  const raw = Array.isArray(value) ? value[0] : value;
  return allowed.includes(raw as T) ? (raw as T) : fallback;
}

function manyOf<T extends string>(value: string | string[] | undefined, allowed: readonly T[]) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter((item): item is T => allowed.includes(item as T));
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function SameDayDentalCrownCostEstimatorPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const crownType = oneOf<CrownType>(params.type, ["same-day", "traditional", "zirconia"], "same-day");
  const toothZone = oneOf<ToothZone>(params.tooth, ["front", "premolar", "molar"], "molar");
  const selectedAddOns = manyOf<AddOn>(params.addon, ["exam", "build-up", "root-canal", "night-guard"]);

  const base = crownTypes[crownType];
  const tooth = toothZones[toothZone];
  const addOnTotal = selectedAddOns.reduce(
    (total, item) => ({
      low: total.low + addOns[item].low,
      high: total.high + addOns[item].high,
    }),
    { low: 0, high: 0 },
  );
  const estimate = {
    low: base.low + tooth.adjustment + addOnTotal.low,
    high: base.high + tooth.adjustment + addOnTotal.high,
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Same Day Dental Crown Cost Estimator Tool for SMB Teams",
    description:
      "Use this practical same day dental crown cost estimator resource to assess your next move, prioritize improvements, and identify where AI can create leverage.",
    url: "https://sonriadentista.com/tools/same-day-dental-crown-cost-estimator",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Same Day Dental Crown Cost Estimator Calculator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="border-b border-border-soft bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
              Dental crown cost calculator
            </p>
            <h1 className="mt-4 font-display text-4xl text-brand-deep md:text-5xl">
              Same day dental crown cost estimator
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Estimate a realistic out-of-pocket range for a same-day dental crown before you call the office.
              Adjust the crown type, tooth location, and common add-ons to see how the total changes.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <form className="rounded-lg border border-border-soft bg-card p-6 shadow-warm" action="/tools/same-day-dental-crown-cost-estimator">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl text-brand-deep">Build your estimate</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                These ranges are planning numbers, not a diagnosis or final treatment quote.
              </p>
            </div>
            <button
              type="submit"
              className="rounded-md bg-terracotta px-4 py-2 text-sm font-semibold text-white transition hover:bg-terracotta/90"
            >
              Update
            </button>
          </div>

          <fieldset className="mt-8">
            <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-deep">
              Crown type
            </legend>
            <div className="mt-4 grid gap-3">
              {(Object.entries(crownTypes) as [CrownType, typeof crownTypes[CrownType]][]).map(([key, option]) => (
                <label key={key} className="flex gap-3 rounded-md border border-border-soft bg-background p-4">
                  <input
                    type="radio"
                    name="type"
                    value={key}
                    defaultChecked={crownType === key}
                    className="mt-1"
                  />
                  <span>
                    <span className="block font-semibold text-brand-deep">{option.label}</span>
                    <span className="block text-sm text-muted-foreground">{money(option.low)} to {money(option.high)}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">{option.note}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-deep">
              Tooth location
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {(Object.entries(toothZones) as [ToothZone, typeof toothZones[ToothZone]][]).map(([key, option]) => (
                <label key={key} className="rounded-md border border-border-soft bg-background p-4">
                  <input
                    type="radio"
                    name="tooth"
                    value={key}
                    defaultChecked={toothZone === key}
                    className="mr-2"
                  />
                  <span className="font-semibold text-brand-deep">{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-deep">
              Possible add-ons
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(Object.entries(addOns) as [AddOn, typeof addOns[AddOn]][]).map(([key, option]) => (
                <label key={key} className="rounded-md border border-border-soft bg-background p-4">
                  <input
                    type="checkbox"
                    name="addon"
                    value={key}
                    defaultChecked={selectedAddOns.includes(key)}
                    className="mr-2"
                  />
                  <span className="font-semibold text-brand-deep">{option.label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {money(option.low)} to {money(option.high)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <aside className="rounded-lg border border-border-soft bg-card p-6 shadow-warm lg:sticky lg:top-6 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
            Estimated range
          </p>
          <div className="mt-4 font-display text-4xl text-brand-deep">
            {money(estimate.low)} - {money(estimate.high)}
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Your estimate uses a {base.label.toLowerCase()} on a {tooth.label.toLowerCase()}
            {selectedAddOns.length ? ` with ${selectedAddOns.length} selected add-on${selectedAddOns.length === 1 ? "" : "s"}.` : " with no selected add-ons."}
          </p>

          <div className="mt-6 border-t border-border-soft pt-6">
            <h2 className="font-display text-2xl text-brand-deep">What changes the final price?</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>Insurance benefits may reduce the patient portion, but annual maximums and waiting periods matter.</li>
              <li>A cracked tooth may need a build-up or root canal before a crown can be placed.</li>
              <li>Same-day crowns can reduce time away from work by avoiding a temporary crown and second visit.</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/contact"
              className="rounded-md bg-brand-deep px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-deep/90"
            >
              Talk with Blue Orchid Society
            </Link>
            <Link
              href="/tools"
              className="rounded-md border border-border-soft px-4 py-3 text-center text-sm font-semibold text-brand-deep transition hover:bg-background"
            >
              View more calculators
            </Link>
          </div>
        </aside>
      </section>

      <section className="border-t border-border-soft bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h2 className="font-display text-2xl text-brand-deep">For dental teams</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Cost education tools like this can help answer repetitive patient questions before a call,
                improve lead quality, and make treatment conversations clearer.
              </p>
            </div>
            <Link href="/ai-readiness" className="rounded-lg border border-border-soft bg-card p-5 transition hover:shadow-warm">
              <span className="font-semibold text-brand-deep">AI readiness assessment</span>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                See where automation can improve patient intake, follow-up, and scheduling.
              </span>
            </Link>
            <Link href="/services" className="rounded-lg border border-border-soft bg-card p-5 transition hover:shadow-warm">
              <span className="font-semibold text-brand-deep">AI implementation services</span>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                Turn calculators, workflows, and operational bottlenecks into useful production systems.
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
