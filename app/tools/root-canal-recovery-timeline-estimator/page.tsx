import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Root Canal Recovery Timeline Estimator | Sonria Dentista Arlington",
  description:
    "Estimate your root canal recovery timeline by tooth type, symptoms, crown needs, and daily routine so you can plan the first few days after treatment.",
  alternates: {
    canonical: "/tools/root-canal-recovery-timeline-estimator",
  },
};

type ToothType = "front" | "premolar" | "molar";
type SymptomLevel = "mild" | "moderate" | "severe";
type Routine = "desk" | "active" | "physical";
type AddOn = "crown" | "infection" | "retreatment" | "sedation";
type SearchParams = Record<string, string | string[] | undefined>;

const toothTypes: Record<ToothType, { label: string; days: number; note: string }> = {
  front: {
    label: "Front tooth",
    days: 2,
    note: "Front teeth often have fewer canals and may calm down faster.",
  },
  premolar: {
    label: "Premolar",
    days: 3,
    note: "Premolars can need extra chewing caution for the first few days.",
  },
  molar: {
    label: "Molar",
    days: 4,
    note: "Molars do more chewing work and may stay tender longer.",
  },
};

const symptomLevels: Record<SymptomLevel, { label: string; days: number; note: string }> = {
  mild: {
    label: "Mild soreness",
    days: 0,
    note: "Common after treatment and usually improves with routine aftercare.",
  },
  moderate: {
    label: "Moderate tenderness",
    days: 2,
    note: "Plan softer foods and lighter chewing while inflammation settles.",
  },
  severe: {
    label: "Severe pain or swelling",
    days: 4,
    note: "Call the dentist promptly if pain worsens, swelling appears, or fever develops.",
  },
};

const routines: Record<Routine, { label: string; returnDays: number; note: string }> = {
  desk: {
    label: "Desk work or school",
    returnDays: 1,
    note: "Many patients return the next day if pain is controlled.",
  },
  active: {
    label: "On-your-feet work",
    returnDays: 2,
    note: "A lighter first day back can help if jaw soreness lingers.",
  },
  physical: {
    label: "Physical labor or heavy exercise",
    returnDays: 3,
    note: "Ask your dentist when to resume heavy activity if infection or swelling was present.",
  },
};

const addOns: Record<AddOn, { label: string; days: number; note: string }> = {
  crown: {
    label: "Temporary crown or final crown still needed",
    days: 2,
    note: "Avoid sticky, hard, or crunchy foods until the tooth is fully restored.",
  },
  infection: {
    label: "Abscess, swelling, or antibiotics",
    days: 3,
    note: "Infection can make the tooth and surrounding tissue take longer to calm down.",
  },
  retreatment: {
    label: "Retreatment or complex root canal",
    days: 3,
    note: "A previously treated tooth may need a longer recovery window.",
  },
  sedation: {
    label: "Sedation used",
    days: 1,
    note: "You may need a ride home and a quiet rest day after sedation.",
  },
};

const keywordVariants = [
  "root canal recovery timeline",
  "how long does it take to recover from a root canal",
  "pain after root canal how long",
  "what to eat after root canal",
];

function getParam<T extends string>(params: SearchParams | undefined, key: string, fallback: T): T {
  const value = params?.[key];
  return (Array.isArray(value) ? value[0] : value || fallback) as T;
}

function getAddOns(params: SearchParams | undefined): AddOn[] {
  const value = params?.addons;
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter((item): item is AddOn => item in addOns);
}

function formatDays(days: number) {
  return days === 1 ? "1 day" : `${days} days`;
}

export default async function RootCanalRecoveryTimelineEstimatorPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const tooth = getParam<ToothType>(params, "tooth", "molar");
  const symptoms = getParam<SymptomLevel>(params, "symptoms", "moderate");
  const routine = getParam<Routine>(params, "routine", "desk");
  const selectedAddOns = getAddOns(params);

  const addOnDays = selectedAddOns.reduce((total, item) => total + addOns[item].days, 0);
  const recoveryDays = Math.min(14, toothTypes[tooth].days + symptomLevels[symptoms].days + addOnDays);
  const returnDays = Math.max(routines[routine].returnDays, symptoms === "severe" ? 3 : 1);
  const softFoodDays = Math.max(2, Math.min(10, recoveryDays - 1));
  const followUpWindow = selectedAddOns.includes("crown") ? "1 to 3 weeks" : "as recommended by your dentist";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Root Canal Recovery Timeline Estimator",
        description:
          "Estimate a practical recovery timeline after root canal treatment, including soreness, soft foods, return to work, and crown follow-up planning.",
        url: "https://sonriadentista.com/tools/root-canal-recovery-timeline-estimator",
      },
      {
        "@type": "SoftwareApplication",
        name: "Root Canal Recovery Timeline Estimator",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How long does root canal recovery usually take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Many patients feel better within a few days, but molars, infection, retreatment, or a temporary crown can extend tenderness for a week or longer.",
            },
          },
          {
            "@type": "Question",
            name: "Can I go back to work after a root canal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Many people return to desk work the next day. More active work, sedation, swelling, or severe pain may require additional rest and dentist guidance.",
            },
          },
          {
            "@type": "Question",
            name: "When should I call the dentist after a root canal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Call if pain gets worse after the first few days, swelling appears, your bite feels high, medication is not helping, or a temporary crown comes loose.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-gradient-to-br from-sage/15 via-cream to-terracotta/10 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
              Free dental recovery tool
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">
              Root canal recovery timeline estimator
            </h1>
            <p className="mt-5 text-lg leading-8 text-charcoal/75">
              Estimate how long root canal recovery may take, what to eat after a root canal, when to return to work, and when symptoms should prompt a call to the dentist.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+16822841120" className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-warm transition hover:bg-terracotta/90">
                Call Sonria Dentista
              </a>
              <Link href="/en/contact" className="rounded-full border border-charcoal/15 bg-white/70 px-6 py-3 text-sm font-semibold text-charcoal transition hover:bg-white">
                Request an appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_0.9fr]">
          <form className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-warm md:p-8">
            <h2 className="font-display text-3xl font-semibold">Estimate your recovery window</h2>
            <p className="mt-3 text-sm leading-6 text-charcoal/70">
              Choose the closest match. This educational estimate does not replace your dentist&apos;s diagnosis or aftercare instructions.
            </p>

            <div className="mt-8 grid gap-6">
              <fieldset>
                <legend className="text-sm font-semibold text-charcoal">Which tooth was treated?</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {Object.entries(toothTypes).map(([value, option]) => (
                    <label key={value} className="cursor-pointer rounded-2xl border border-charcoal/10 p-4 text-sm transition has-[:checked]:border-terracotta has-[:checked]:bg-terracotta/10">
                      <input className="sr-only" type="radio" name="tooth" value={value} defaultChecked={tooth === value} />
                      <span className="font-semibold">{option.label}</span>
                      <span className="mt-2 block text-charcoal/65">{option.note}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold text-charcoal">What symptoms are you planning around?</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {Object.entries(symptomLevels).map(([value, option]) => (
                    <label key={value} className="cursor-pointer rounded-2xl border border-charcoal/10 p-4 text-sm transition has-[:checked]:border-terracotta has-[:checked]:bg-terracotta/10">
                      <input className="sr-only" type="radio" name="symptoms" value={value} defaultChecked={symptoms === value} />
                      <span className="font-semibold">{option.label}</span>
                      <span className="mt-2 block text-charcoal/65">{option.note}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold text-charcoal">What routine do you need to return to?</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {Object.entries(routines).map(([value, option]) => (
                    <label key={value} className="cursor-pointer rounded-2xl border border-charcoal/10 p-4 text-sm transition has-[:checked]:border-terracotta has-[:checked]:bg-terracotta/10">
                      <input className="sr-only" type="radio" name="routine" value={value} defaultChecked={routine === value} />
                      <span className="font-semibold">{option.label}</span>
                      <span className="mt-2 block text-charcoal/65">{option.note}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold text-charcoal">Any added planning factors?</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {Object.entries(addOns).map(([value, option]) => (
                    <label key={value} className="cursor-pointer rounded-2xl border border-charcoal/10 p-4 text-sm transition has-[:checked]:border-sage has-[:checked]:bg-sage/10">
                      <input className="mr-2 h-4 w-4 accent-terracotta" type="checkbox" name="addons" value={value} defaultChecked={selectedAddOns.includes(value as AddOn)} />
                      <span className="font-semibold">{option.label}</span>
                      <span className="mt-2 block text-charcoal/65">{option.note}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button type="submit" className="w-full rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal/90 sm:w-auto">
                Update timeline
              </button>
            </div>
          </form>

          <aside className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-warm md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sage">Your estimated timeline</p>
            <div className="mt-4 rounded-2xl bg-cream p-6">
              <p className="font-display text-5xl font-semibold text-terracotta">{formatDays(recoveryDays)}</p>
              <p className="mt-2 text-sm text-charcoal/70">Estimated tenderness and recovery planning window</p>
            </div>

            <dl className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-charcoal/10 p-4">
                <dt className="text-sm font-semibold">Return to routine</dt>
                <dd className="mt-1 text-charcoal/70">Plan for about {formatDays(returnDays)}.</dd>
              </div>
              <div className="rounded-2xl border border-charcoal/10 p-4">
                <dt className="text-sm font-semibold">Soft food window</dt>
                <dd className="mt-1 text-charcoal/70">Favor softer foods for {formatDays(softFoodDays)}.</dd>
              </div>
              <div className="rounded-2xl border border-charcoal/10 p-4">
                <dt className="text-sm font-semibold">Follow-up timing</dt>
                <dd className="mt-1 text-charcoal/70">Schedule follow-up {followUpWindow}.</dd>
              </div>
            </dl>

            <div className="mt-6 rounded-2xl bg-terracotta/10 p-4 text-sm leading-6 text-charcoal/75">
              Call your dentist if pain worsens, swelling develops, your bite feels high, medication is not helping, or a temporary filling or crown comes loose.
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">Aftercare guide</p>
              <h2 className="mt-3 font-display text-3xl font-semibold">What root canal recovery usually looks like</h2>
              <p className="mt-4 leading-7 text-charcoal/70">
                Recovery is usually about inflammation settling down, protecting the tooth while it is restored, and watching for symptoms that need attention.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["First 24 hours", "Rest, avoid chewing on the treated side, and follow medication instructions."],
                ["Days 2 to 3", "Tenderness should begin improving. Soft foods and gentle brushing usually help."],
                ["Days 4 to 7", "Most routine soreness should trend down. Call if symptoms worsen instead."],
                ["Final restoration", "A crown or permanent filling helps protect the tooth from fracture."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-charcoal/10 p-5">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-charcoal/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-semibold">Common recovery questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-5">
              <h3 className="font-semibold">How long does pain after a root canal last?</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal/70">Mild tenderness often improves in a few days. Pain that gets worse should be checked.</p>
            </div>
            <div className="rounded-2xl border border-charcoal/10 bg-white p-5">
              <h3 className="font-semibold">What can I eat after a root canal?</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal/70">Choose soft foods and avoid hard, sticky, or crunchy foods until the tooth is restored.</p>
            </div>
            <div className="rounded-2xl border border-charcoal/10 bg-white p-5">
              <h3 className="font-semibold">Do I need a crown after a root canal?</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal/70">Back teeth commonly need a crown to reduce fracture risk. Your dentist can confirm the right restoration.</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-charcoal/50">SEO topic coverage: {keywordVariants.join(", ")}.</p>
        </div>
      </section>

      <section className="bg-charcoal py-12 text-white md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold">Need help after a root canal?</h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Sonria Dentista serves Arlington families with bilingual dental care, restorative dentistry, and urgent follow-up when symptoms need attention.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+16822841120" className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white">
              Call (682) 284-1120
            </a>
            <Link href="/en/contact" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
