import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Are Root Canals Tool | Sonria Dentista",
  description:
    "Use this practical what are root canals resource to understand your options, prioritize next steps, and decide what to do next.",
  alternates: { canonical: "/tools/what-are-root-canals" },
};

type PainLevel = "mild" | "moderate" | "severe";
type Symptom = "sensitivity" | "swelling" | "biting" | "dark";
type Cause = "unknown" | "deep-decay" | "crack" | "trauma";
type Timing = "research" | "soon" | "urgent";
type SearchParams = Record<string, string | string[] | undefined>;

const painLevels: Record<PainLevel, { label: string; score: number; note: string }> = {
  mild: { label: "Mild or occasional", score: 1, note: "Mild symptoms can still matter if they linger or keep returning." },
  moderate: { label: "Moderate or lingering", score: 3, note: "Lingering pain after cold, heat, sweets, or biting can mean the tooth nerve is irritated." },
  severe: { label: "Severe, throbbing, or waking you up", score: 5, note: "Severe spontaneous pain is a stronger sign that the pulp inside the tooth may need treatment." },
};

const symptoms: Record<Symptom, { label: string; score: number; note: string }> = {
  sensitivity: { label: "Lingering hot or cold sensitivity", score: 2, note: "Sensitivity that lasts after the temperature is gone can point to pulp inflammation." },
  swelling: { label: "Gum swelling or pimple", score: 5, note: "Swelling, drainage, or a gum bump can point to infection and should be checked promptly." },
  biting: { label: "Pain when biting", score: 3, note: "Biting pain may come from a crack, infection around the root, or inflammation in the ligament." },
  dark: { label: "Tooth looks darker", score: 3, note: "A darker tooth can be a sign of old trauma or nerve changes inside the tooth." },
};

const causes: Record<Cause, { label: string; score: number; note: string }> = {
  unknown: { label: "I am not sure", score: 1, note: "An exam and X-ray are the clearest way to tell what is happening inside the tooth." },
  "deep-decay": { label: "Deep cavity or large decay", score: 4, note: "Root canals are commonly used when decay reaches the soft pulp inside the tooth." },
  crack: { label: "Cracked tooth or large old filling", score: 3, note: "Cracks and large restorations can let bacteria reach the nerve." },
  trauma: { label: "Past injury or hit to the tooth", score: 3, note: "A tooth can need root canal treatment months or years after trauma." },
};

const timings: Record<Timing, { label: string; score: number; note: string }> = {
  research: { label: "I am researching", score: 0, note: "Research is reasonable when symptoms are mild and there is no swelling." },
  soon: { label: "I want to be seen soon", score: 2, note: "Scheduling soon can help avoid a larger infection or a harder-to-save tooth." },
  urgent: { label: "I may need urgent care", score: 4, note: "Urgent signs include swelling, fever, severe pain, or pain that interferes with eating or sleep." },
};

function getValue<T extends string>(searchParams: SearchParams, key: string, fallback: T, allowed: Record<T, unknown>) {
  const raw = searchParams[key];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value && value in allowed ? (value as T) : fallback;
}

function getResult(score: number) {
  if (score >= 13) {
    return {
      label: "High root canal concern",
      tone: "Call a dentist promptly",
      summary:
        "Your answers include signs often associated with an inflamed or infected tooth nerve. A root canal may be used to remove infected pulp, disinfect the canals inside the roots, and help save the natural tooth.",
      nextStep:
        "Contact Sonria Dentista and mention swelling, severe pain, fever, or trouble biting so the team can help prioritize the visit.",
    };
  }

  if (score >= 8) {
    return {
      label: "Moderate root canal concern",
      tone: "Schedule an exam soon",
      summary:
        "Your answers suggest the tooth should be checked. Root canal treatment is considered when decay, cracks, trauma, or infection affects the pulp inside the tooth.",
      nextStep:
        "Plan a dental exam and X-ray so the dentist can compare root canal treatment with options like a filling, crown, or extraction.",
    };
  }

  return {
    label: "Lower immediate concern",
    tone: "Monitor, but do not ignore changes",
    summary:
      "Your answers do not strongly point to an urgent root canal, but only an exam can confirm what is happening inside the tooth.",
    nextStep:
      "Track sensitivity, biting pain, color changes, and swelling. Schedule a visit if symptoms linger, worsen, or return.",
  };
}

export default async function WhatAreRootCanalsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const pain = getValue(params, "pain", "moderate", painLevels);
  const symptom = getValue(params, "symptom", "sensitivity", symptoms);
  const cause = getValue(params, "cause", "unknown", causes);
  const timing = getValue(params, "timing", "soon", timings);
  const score = painLevels[pain].score + symptoms[symptom].score + causes[cause].score + timings[timing].score;
  const result = getResult(score);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "What Are Root Canals Tool",
    description:
      "Use this practical what are root canals resource to understand your options, prioritize next steps, and decide what to do next.",
    url: "https://sonriadentista.com/tools/what-are-root-canals",
    mainEntity: {
      "@type": "MedicalWebPage",
      name: "What are root canals?",
      about: { "@type": "MedicalProcedure", name: "Root canal treatment", procedureType: "Dental procedure" },
    },
  };

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#1f2933]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-[#123f3a] px-6 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9fd8cc]">Sonria Dentista Arlington</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">What are root canals?</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#d7ebe6]">
              A root canal is a tooth-saving treatment used when the soft pulp inside a tooth becomes inflamed, infected, or damaged. Use this guide to understand what root canals are for, what can cause them, and how quickly to ask a dentist for help.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-[#f4b860] px-6 py-3 text-sm font-bold text-[#123f3a] transition hover:bg-[#ffd28a]">Contact the team</Link>
              <Link href="/services" className="rounded-full border border-white/35 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">View services</Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 text-[#1f2933] shadow-2xl shadow-black/20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#23766b]">Current result</p>
            <h2 className="mt-3 text-3xl font-semibold">{result.label}</h2>
            <p className="mt-2 text-base font-semibold text-[#a65f00]">{result.tone}</p>
            <p className="mt-4 leading-7 text-[#52616b]">{result.summary}</p>
            <div className="mt-6 rounded-2xl bg-[#edf7f4] p-5">
              <p className="text-sm font-semibold text-[#123f3a]">Suggested next step</p>
              <p className="mt-2 text-sm leading-6 text-[#40515a]">{result.nextStep}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#23766b]">Root canal explainer tool</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#123f3a]">Check which signs matter most</h2>
            <p className="mt-3 text-sm leading-6 text-[#52616b]">Choose the closest answers. This educational tool does not diagnose the tooth, but it can help you decide whether to schedule routine, soon, or urgent dental care.</p>

            <div className="mt-7 space-y-6">
              <fieldset>
                <legend className="text-sm font-bold text-[#123f3a]">How does the tooth feel?</legend>
                <div className="mt-3 grid gap-2">
                  {Object.entries(painLevels).map(([value, option]) => (
                    <label key={value} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#d8e5e1] p-4 transition hover:border-[#23766b]">
                      <input className="mt-1 h-4 w-4 accent-[#23766b]" type="radio" name="pain" value={value} defaultChecked={pain === value} />
                      <span><span className="block text-sm font-semibold text-[#1f2933]">{option.label}</span><span className="mt-1 block text-xs leading-5 text-[#52616b]">{option.note}</span></span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="text-sm font-bold text-[#123f3a]">Most noticeable sign</span>
                <select name="symptom" defaultValue={symptom} className="mt-3 w-full rounded-2xl border border-[#d8e5e1] bg-white px-4 py-3 text-sm font-semibold text-[#1f2933] outline-none transition focus:border-[#23766b] focus:ring-4 focus:ring-[#23766b]/15">
                  {Object.entries(symptoms).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-[#123f3a]">What might have started it?</span>
                <select name="cause" defaultValue={cause} className="mt-3 w-full rounded-2xl border border-[#d8e5e1] bg-white px-4 py-3 text-sm font-semibold text-[#1f2933] outline-none transition focus:border-[#23766b] focus:ring-4 focus:ring-[#23766b]/15">
                  {Object.entries(causes).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-[#123f3a]">How soon are you trying to act?</span>
                <select name="timing" defaultValue={timing} className="mt-3 w-full rounded-2xl border border-[#d8e5e1] bg-white px-4 py-3 text-sm font-semibold text-[#1f2933] outline-none transition focus:border-[#23766b] focus:ring-4 focus:ring-[#23766b]/15">
                  {Object.entries(timings).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}
                </select>
              </label>

              <button type="submit" className="w-full rounded-full bg-[#23766b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#19584f] focus:outline-none focus:ring-4 focus:ring-[#23766b]/25">Update my root canal guide</button>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#23766b]">Your guide</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#123f3a]">{result.label}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f7f3ee] p-4"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a5f2b]">Score</p><p className="mt-2 text-3xl font-semibold text-[#123f3a]">{score}/18</p></div>
                <div className="rounded-2xl bg-[#edf7f4] p-4"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#23766b]">Priority</p><p className="mt-2 text-lg font-semibold text-[#123f3a]">{result.tone}</p></div>
              </div>
              <p className="mt-5 leading-7 text-[#52616b]">{result.summary}</p>
              <p className="mt-4 rounded-2xl border border-[#d8e5e1] p-4 text-sm leading-6 text-[#40515a]">{result.nextStep}</p>
            </div>

            <div className="rounded-[1.5rem] bg-[#123f3a] p-6 text-white">
              <h2 className="text-2xl font-semibold">What are root canals used for?</h2>
              <p className="mt-4 leading-7 text-[#d7ebe6]">Root canals are used to treat the inside of a tooth when the pulp is infected, inflamed, or damaged. The dentist cleans the canals inside the roots, seals the space, and often protects the tooth with a crown so you can keep using your natural tooth.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link href="/tools/root-canal-cost-estimator" className="rounded-2xl bg-white/10 p-4 text-sm font-semibold transition hover:bg-white/15">Estimate root canal cost</Link>
                <Link href="/tools/root-canal-recovery-timeline-estimator" className="rounded-2xl bg-white/10 p-4 text-sm font-semibold transition hover:bg-white/15">Plan recovery timing</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#23766b]">Causes and problems</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#123f3a]">What causes a root canal need?</h2>
            <p className="mt-4 leading-7 text-[#52616b]">Root canals are commonly caused by deep decay, repeated dental work on the same tooth, cracks, chips, or trauma. Problems can include pain, swelling, infection, and loss of the tooth if the issue is left untreated.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.25rem] bg-[#f7f3ee] p-5"><h3 className="text-lg font-semibold text-[#123f3a]">When it is common</h3><p className="mt-3 text-sm leading-6 text-[#52616b]">Root canals can happen at many ages. They are more common when a tooth has deep decay, an old large filling, a crack, or a previous injury.</p></div>
            <div className="rounded-[1.25rem] bg-[#f7f3ee] p-5"><h3 className="text-lg font-semibold text-[#123f3a]">What is measured</h3><p className="mt-3 text-sm leading-6 text-[#52616b]">Dentists evaluate symptoms, X-rays, pulp vitality, infection around the root, and whether enough tooth structure remains to restore the tooth.</p></div>
            <div className="rounded-[1.25rem] bg-[#f7f3ee] p-5"><h3 className="text-lg font-semibold text-[#123f3a]">What to ask</h3><p className="mt-3 text-sm leading-6 text-[#52616b]">Ask whether the tooth can be saved, whether a crown is needed, what visits are involved, and what warning signs should trigger urgent care.</p></div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#f4b860] p-8 text-[#123f3a] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Need help deciding what to do next?</h2>
            <p className="mt-3 max-w-2xl leading-7">Sonria Dentista can examine the tooth, review X-rays, explain whether root canal treatment is appropriate, and help you compare the next steps in plain language.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-[#123f3a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#19584f]">Contact Sonria Dentista</Link>
            <Link href="/" className="rounded-full border border-[#123f3a]/30 px-6 py-3 text-sm font-bold text-[#123f3a] transition hover:bg-white/25">Return home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
