import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Dental Cost Estimator Tool for SMB Teams | Blue Orchid Society",
  description:
    "Use this practical emergency dental cost estimator resource to assess your next move, prioritize improvements, and identify where AI can create leverage.",
  alternates: {
    canonical: "/tools/emergency-dental-cost-estimator",
  },
};

type Scenario = {
  id: string;
  name: string;
  urgency: string;
  low: number;
  high: number;
  notes: string;
};

const scenarios: Scenario[] = [
  {
    id: "severe-tooth-pain",
    name: "Severe tooth pain",
    urgency: "Same-day dentist",
    low: 120,
    high: 450,
    notes:
      "Often includes an emergency exam, X-rays, pain control, and a treatment plan.",
  },
  {
    id: "broken-or-chipped-tooth",
    name: "Broken or chipped tooth",
    urgency: "Same-day or next-day dentist",
    low: 180,
    high: 1400,
    notes:
      "Cost varies widely based on whether bonding, a filling, or a crown is needed.",
  },
  {
    id: "knocked-out-tooth",
    name: "Knocked-out tooth",
    urgency: "Immediate dental visit",
    low: 250,
    high: 3500,
    notes:
      "Fast care improves the chance of saving the tooth. Replacement options can raise cost.",
  },
  {
    id: "swelling-or-abscess",
    name: "Swelling or possible abscess",
    urgency: "Same-day dentist or ER if breathing/swallowing is affected",
    low: 160,
    high: 950,
    notes:
      "May include exam, imaging, drainage, medication, extraction, or root canal planning.",
  },
  {
    id: "lost-crown-or-filling",
    name: "Lost crown, filling, or implant crown",
    urgency: "Prompt dental visit",
    low: 150,
    high: 1800,
    notes:
      "A simple recement can be modest; replacement crowns or implant crown repairs cost more. If a tooth cannot be saved, dental implant cost should be estimated separately after an exam.",
  },
];

const timingAdjustments = {
  office: { label: "During normal office hours", multiplier: 1 },
  afterHours: { label: "Evening, weekend, or urgent slot", multiplier: 1.25 },
  erFirst: { label: "ER visit before dental treatment", multiplier: 1.55 },
};

const insuranceAdjustments = {
  none: { label: "No dental insurance", multiplier: 1 },
  ppo: { label: "PPO dental insurance", multiplier: 0.72 },
  discount: { label: "Dental savings plan", multiplier: 0.86 },
};

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getScenario(id: string | string[] | undefined) {
  return (
    scenarios.find((scenario) => scenario.id === firstParam(id)) ?? scenarios[0]
  );
}

function getTiming(id: string | string[] | undefined) {
  const key = firstParam(id);
  return key && key in timingAdjustments
    ? timingAdjustments[key as keyof typeof timingAdjustments]
    : timingAdjustments.office;
}

function getInsurance(id: string | string[] | undefined) {
  const key = firstParam(id);
  return key && key in insuranceAdjustments
    ? insuranceAdjustments[key as keyof typeof insuranceAdjustments]
    : insuranceAdjustments.none;
}

export default async function EmergencyDentalCostEstimatorPage({
  searchParams,
}: {
  searchParams: Promise<{
    scenario?: string | string[];
    timing?: string | string[];
    insurance?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const scenario = getScenario(params.scenario);
  const timing = getTiming(params.timing);
  const insurance = getInsurance(params.insurance);
  const timingId = firstParam(params.timing) ?? "office";
  const insuranceId = firstParam(params.insurance) ?? "none";
  const estimatedLow = Math.round(
    scenario.low * timing.multiplier * insurance.multiplier
  );
  const estimatedHigh = Math.round(
    scenario.high * timing.multiplier * insurance.multiplier
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Emergency Dental Cost Estimator Tool for SMB Teams",
    description:
      "A practical calculator for estimating emergency dental costs and deciding the next step.",
    url: "https://sonriadentista.com/tools/emergency-dental-cost-estimator",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Emergency Dental Cost Estimator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#f8f4ee] text-[#17211b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="border-b border-[#e2d7c8] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9d573d]">
            Free calculator
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Emergency dental cost estimator
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#4c5a51]">
            Estimate the likely cost range for common urgent dental situations,
            then use the result to decide whether you need a same-day dentist,
            an ER visit, or a planned follow-up. Actual fees vary by exam
            findings, X-rays, location, insurance, and final treatment.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-12 lg:grid-cols-[1fr_0.8fr]">
        <form className="rounded-lg border border-[#e2d7c8] bg-white p-6 shadow-sm">
          <div>
            <label
              htmlFor="scenario"
              className="text-sm font-semibold text-[#17211b]"
            >
              What happened?
            </label>
            <select
              id="scenario"
              name="scenario"
              defaultValue={scenario.id}
              className="mt-2 w-full rounded-md border border-[#d8cbbb] bg-white px-3 py-3 text-base"
            >
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <label
              htmlFor="timing"
              className="text-sm font-semibold text-[#17211b]"
            >
              When do you expect to seek care?
            </label>
            <select
              id="timing"
              name="timing"
              defaultValue={timingId}
              className="mt-2 w-full rounded-md border border-[#d8cbbb] bg-white px-3 py-3 text-base"
            >
              {Object.entries(timingAdjustments).map(([id, option]) => (
                <option key={id} value={id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <label
              htmlFor="insurance"
              className="text-sm font-semibold text-[#17211b]"
            >
              Insurance or savings plan
            </label>
            <select
              id="insurance"
              name="insurance"
              defaultValue={insuranceId}
              className="mt-2 w-full rounded-md border border-[#d8cbbb] bg-white px-3 py-3 text-base"
            >
              {Object.entries(insuranceAdjustments).map(([id, option]) => (
                <option key={id} value={id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-7 inline-flex w-full items-center justify-center rounded-md bg-[#2f5d50] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#264d43]"
          >
            Update estimate
          </button>
        </form>

        <aside className="rounded-lg border border-[#d2c2af] bg-[#fffaf3] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9d573d]">
            Estimated range
          </p>
          <div className="mt-3 text-4xl font-semibold tracking-tight">
            {currency(estimatedLow)} - {currency(estimatedHigh)}
          </div>
          <p className="mt-4 text-sm leading-6 text-[#4c5a51]">
            For {scenario.name.toLowerCase()}, the typical next step is:{" "}
            <strong className="text-[#17211b]">{scenario.urgency}</strong>.
          </p>
          <p className="mt-3 text-sm leading-6 text-[#4c5a51]">
            {scenario.notes}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-[#2f5d50] px-5 py-3 text-sm font-semibold text-[#2f5d50] transition hover:bg-white"
          >
            Talk with Blue Orchid Society
          </Link>
        </aside>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-[#e2d7c8] bg-white p-5">
            <h2 className="text-lg font-semibold">Cost range context</h2>
            <p className="mt-3 text-sm leading-6 text-[#4c5a51]">
              Use the lower end for simple exams, recements, small repairs, or
              early treatment. Use the higher end when treatment may involve a
              crown, extraction, root canal, implant crown repair, or ER visit.
            </p>
          </div>
          <div className="rounded-lg border border-[#e2d7c8] bg-white p-5">
            <h2 className="text-lg font-semibold">Escalation signals</h2>
            <p className="mt-3 text-sm leading-6 text-[#4c5a51]">
              Go to the ER for trouble breathing or swallowing, facial trauma,
              uncontrolled bleeding, or rapidly spreading swelling. Otherwise,
              a same-day dentist is usually the better first call.
            </p>
          </div>
          <div className="rounded-lg border border-[#e2d7c8] bg-white p-5">
            <h2 className="text-lg font-semibold">Operations opportunity</h2>
            <p className="mt-3 text-sm leading-6 text-[#4c5a51]">
              If you manage a team, tools like this can reduce confusion,
              improve intake, and route urgent cases faster when paired with
              clear operations and automation.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-[#d2c2af] bg-white p-6">
          <h2 className="text-2xl font-semibold">Related resources</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link className="text-[#2f5d50] underline" href="/ai-readiness">
              AI readiness assessment
            </Link>
            <Link className="text-[#2f5d50] underline" href="/tools">
              AI tools and calculators
            </Link>
            <Link className="text-[#2f5d50] underline" href="/services">
              AI implementation services
            </Link>
            <Link className="text-[#2f5d50] underline" href="/contact">
              Talk with Blue Orchid Society
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
