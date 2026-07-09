import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dental Implant Recovery Timeline Guide For Arlington Patients Tool | Sonria Dentista',
  description: 'Use this practical dental implant recovery timeline guide for arlington patients resource to understand your options, prioritize next steps, and decide what to do next.',
  alternates: { canonical: '/tools/dental-implant-recovery-timeline-guide-for-arlington-patients' },
};

type ImplantPlan = 'single' | 'multiple' | 'full-arch';
type AddOn = 'none' | 'extraction' | 'bone-graft' | 'sinus-lift';
type Routine = 'desk' | 'active' | 'physical';
type Symptoms = 'normal' | 'sensitive' | 'concern';
type SearchParams = Record<string, string | string[] | undefined>;

const keywordTargets = [
  { keyword: 'dental', intent: 'informational', volume: 165000, competition: 'medium', cpc: '$11.89', difficulty: 89, opportunity: 42 },
  { keyword: 'dental implant cost', intent: 'informational', volume: 201000, competition: 'low', cpc: '$16.41', difficulty: 23, opportunity: 39 },
  { keyword: 'dental implant recovery timeline guide for arlington patients', intent: 'informational', volume: 240, competition: 'n/a', cpc: 'n/a', difficulty: 'low', opportunity: 70 },
  { keyword: 'dental implant recovery timeline guide for arlington patients calculator', intent: 'transactional', volume: 205, competition: 'n/a', cpc: 'n/a', difficulty: 'medium', opportunity: 70 },
  { keyword: 'dental implant recovery timeline guide for arlington patients checklist', intent: 'commercial', volume: 170, competition: 'n/a', cpc: 'n/a', difficulty: 'low', opportunity: 50 },
];

const plans: Record<ImplantPlan, { label: string; days: number; integration: string; note: string }> = {
  single: { label: 'Single tooth implant', days: 3, integration: '3 to 6 months', note: 'Most single implant sites feel manageable within a few days when no major grafting is needed.' },
  multiple: { label: 'Multiple implants', days: 5, integration: '4 to 6 months', note: 'Multiple sites can mean more swelling and a longer soft-food window.' },
  'full-arch': { label: 'Full-arch implant plan', days: 10, integration: '4 to 8 months', note: 'Full-arch treatment often includes a staged healing plan and more follow-up visits.' },
};

const addOns: Record<AddOn, { label: string; days: number; note: string }> = {
  none: { label: 'No extra procedure expected', days: 0, note: 'Your timeline is mostly driven by implant placement and your normal healing response.' },
  extraction: { label: 'Tooth extraction same visit', days: 2, note: 'Extraction sites can add tenderness and extra care instructions during the first week.' },
  'bone-graft': { label: 'Bone graft', days: 5, note: 'Bone grafting can extend the early recovery window and may add months before the final tooth.' },
  'sinus-lift': { label: 'Sinus lift', days: 7, note: 'Sinus lift recovery usually requires extra precautions around pressure, sneezing, and exertion.' },
};

const routines: Record<Routine, { label: string; days: number; note: string }> = {
  desk: { label: 'Desk work or light routine', days: 0, note: 'Many patients can return to light work quickly if swelling and medication side effects are controlled.' },
  active: { label: 'Active job or regular workouts', days: 2, note: 'Plan a slower return to workouts, lifting, and long days on your feet.' },
  physical: { label: 'Physically demanding work', days: 4, note: 'Heavy lifting and strenuous work may need a longer pause to protect the surgical site.' },
};

const symptoms: Record<Symptoms, { label: string; days: number; note: string; alert: string }> = {
  normal: { label: 'Typical soreness only', days: 0, note: 'Mild swelling, bruising, and tenderness can be normal early on.', alert: 'Follow your written post-op instructions and keep your scheduled follow-up.' },
  sensitive: { label: 'More swelling or sensitivity', days: 2, note: 'Extra sensitivity can stretch the first-week recovery window.', alert: 'Call the dental team if symptoms are not improving after the first few days.' },
  concern: { label: 'Pain, fever, bad taste, or worsening swelling', days: 4, note: 'Worsening symptoms should not be treated as a normal timeline issue.', alert: 'Contact Sonria Dentista promptly for guidance, especially with fever, drainage, or swelling that spreads.' },
};

function pick<T extends string>(params: SearchParams, key: string, fallback: T, allowed: readonly T[]) {
  const value = params[key];
  const first = Array.isArray(value) ? value[0] : value;
  return first && allowed.includes(first as T) ? (first as T) : fallback;
}

function phaseFor(days: number) {
  if (days <= 4) return { label: 'Short early recovery', summary: 'Most daily comfort should improve within the first week, with the implant still healing below the gumline.' };
  if (days <= 9) return { label: 'Moderate early recovery', summary: 'Plan for a careful first week, then a gradual return to normal meals and activity as directed.' };
  return { label: 'Extended early recovery', summary: 'Your plan may need closer follow-up, more soft-food planning, and a slower return to strenuous activity.' };
}

export default async function DentalImplantRecoveryTimelineGuidePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const plan = pick<ImplantPlan>(params, 'plan', 'single', ['single', 'multiple', 'full-arch']);
  const addOn = pick<AddOn>(params, 'addOn', 'none', ['none', 'extraction', 'bone-graft', 'sinus-lift']);
  const routine = pick<Routine>(params, 'routine', 'desk', ['desk', 'active', 'physical']);
  const symptom = pick<Symptoms>(params, 'symptom', 'normal', ['normal', 'sensitive', 'concern']);
  const planDetails = plans[plan];
  const addOnDetails = addOns[addOn];
  const routineDetails = routines[routine];
  const symptomDetails = symptoms[symptom];
  const totalDays = planDetails.days + addOnDetails.days + routineDetails.days + symptomDetails.days;
  const softFoodDays = Math.max(5, totalDays + 2);
  const activityDays = Math.max(2, Math.ceil(totalDays / 2));
  const phase = phaseFor(totalDays);
  const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Dental Implant Recovery Timeline Guide For Arlington Patients Tool', description: 'A practical dental implant recovery timeline guide for Arlington patients comparing early healing, soft-food planning, activity timing, and follow-up next steps.', url: 'https://sonriadentista.com/tools/dental-implant-recovery-timeline-guide-for-arlington-patients', publisher: { '@type': 'Dentist', name: 'Sonria Dentista', areaServed: 'Arlington, TX' }, mainEntity: { '@type': 'SoftwareApplication', name: 'Dental Implant Recovery Timeline Guide For Arlington Patients Calculator', applicationCategory: 'HealthApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } } };

  return (
    <main className="min-h-screen bg-[#f8faf8] text-[#16312b]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-[#123c35] px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a9d8c7]">Arlington dental implant planning</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">Dental implant recovery timeline guide for Arlington patients</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#dcebe5]">Estimate the first days of recovery, soft-food planning, activity limits, and longer implant healing window before your consultation with Sonria Dentista.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-[#f5c35b] px-5 py-3 text-sm font-bold text-[#16312b] transition hover:bg-[#ffd777]">Ask about implant recovery</Link>
              <Link href="/services" className="rounded-full border border-white/35 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">View dental services</Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur">
            <p className="text-sm font-semibold text-[#a9d8c7]">Your current estimate</p>
            <div className="mt-4 rounded-xl bg-white p-5 text-[#16312b]"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#40766a]">{phase.label}</p><p className="mt-2 text-4xl font-bold">{totalDays} days</p><p className="mt-2 text-sm leading-6 text-[#4d645f]">Estimated early recovery window before most routine comfort returns.</p></div>
            <dl className="mt-5 grid gap-3 text-sm text-[#eef8f3]"><div className="flex justify-between gap-4 border-b border-white/15 pb-3"><dt>Soft foods</dt><dd className="font-semibold">{softFoodDays} days</dd></div><div className="flex justify-between gap-4 border-b border-white/15 pb-3"><dt>Light activity focus</dt><dd className="font-semibold">{activityDays} days</dd></div><div className="flex justify-between gap-4"><dt>Bone integration</dt><dd className="font-semibold">{planDetails.integration}</dd></div></dl>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form className="rounded-2xl border border-[#d9e5df] bg-white p-6 shadow-sm" action="" method="get">
            <h2 className="text-2xl font-bold">Build your recovery timeline</h2>
            <p className="mt-2 text-sm leading-6 text-[#58726b]">Choose the closest match. This guide is educational and does not replace your dentist&apos;s post-op instructions.</p>
            <div className="mt-6 grid gap-5">
              <label className="grid gap-2"><span className="text-sm font-semibold">Implant plan</span><select name="plan" defaultValue={plan} className="rounded-xl border border-[#cbdad4] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1f6b5c] focus:ring-4 focus:ring-[#1f6b5c]/15">{Object.entries(plans).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
              <label className="grid gap-2"><span className="text-sm font-semibold">Additional procedure</span><select name="addOn" defaultValue={addOn} className="rounded-xl border border-[#cbdad4] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1f6b5c] focus:ring-4 focus:ring-[#1f6b5c]/15">{Object.entries(addOns).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
              <label className="grid gap-2"><span className="text-sm font-semibold">Normal routine</span><select name="routine" defaultValue={routine} className="rounded-xl border border-[#cbdad4] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1f6b5c] focus:ring-4 focus:ring-[#1f6b5c]/15">{Object.entries(routines).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
              <label className="grid gap-2"><span className="text-sm font-semibold">Current symptom pattern</span><select name="symptom" defaultValue={symptom} className="rounded-xl border border-[#cbdad4] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1f6b5c] focus:ring-4 focus:ring-[#1f6b5c]/15">{Object.entries(symptoms).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
            </div>
            <button type="submit" className="mt-6 w-full rounded-full bg-[#1f6b5c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#174f44] focus:outline-none focus:ring-4 focus:ring-[#1f6b5c]/20">Update recovery estimate</button>
          </form>

          <div className="rounded-2xl border border-[#d9e5df] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#40766a]">Estimated result</p>
            <h2 className="mt-2 text-3xl font-bold">{phase.label}</h2>
            <p className="mt-3 leading-7 text-[#4d645f]">{phase.summary}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-xl bg-[#eef7f2] p-4"><p className="text-sm font-semibold text-[#40766a]">Early recovery</p><p className="mt-2 text-2xl font-bold">{totalDays} days</p></div><div className="rounded-xl bg-[#fff5dc] p-4"><p className="text-sm font-semibold text-[#8a6518]">Soft foods</p><p className="mt-2 text-2xl font-bold">{softFoodDays} days</p></div><div className="rounded-xl bg-[#eef4ff] p-4"><p className="text-sm font-semibold text-[#315b8a]">Integration</p><p className="mt-2 text-xl font-bold">{planDetails.integration}</p></div></div>
            <div className="mt-6 rounded-xl border border-[#d9e5df] p-5"><h3 className="font-bold">What shaped this timeline</h3><ul className="mt-4 grid gap-3 text-sm leading-6 text-[#4d645f]"><li><strong className="text-[#16312b]">{planDetails.label}:</strong> {planDetails.note}</li><li><strong className="text-[#16312b]">{addOnDetails.label}:</strong> {addOnDetails.note}</li><li><strong className="text-[#16312b]">{routineDetails.label}:</strong> {routineDetails.note}</li><li><strong className="text-[#16312b]">{symptomDetails.label}:</strong> {symptomDetails.note}</li></ul></div>
            <div className="mt-6 rounded-xl bg-[#123c35] p-5 text-white"><h3 className="font-bold">Next step</h3><p className="mt-2 text-sm leading-6 text-[#dcebe5]">{symptomDetails.alert}</p><Link href="/contact" className="mt-4 inline-flex rounded-full bg-[#f5c35b] px-5 py-3 text-sm font-bold text-[#16312b] transition hover:bg-[#ffd777]">Contact Sonria Dentista</Link></div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3"><div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#40766a]">Recovery checklist</p><h2 className="mt-2 text-3xl font-bold">What Arlington patients should plan for</h2></div><div className="rounded-2xl border border-[#d9e5df] p-6"><h3 className="font-bold">First 48 hours</h3><p className="mt-2 text-sm leading-6 text-[#4d645f]">Rest, use cold compresses if recommended, take medications as directed, and avoid smoking, straws, and strenuous activity.</p></div><div className="rounded-2xl border border-[#d9e5df] p-6"><h3 className="font-bold">First week</h3><p className="mt-2 text-sm leading-6 text-[#4d645f]">Keep meals soft, protect the implant site, and call the office if pain, swelling, fever, or drainage gets worse instead of better.</p></div></div></section>

      <section className="px-5 py-12 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3"><Link href="/" className="rounded-2xl border border-[#d9e5df] bg-white p-5 transition hover:border-[#1f6b5c]"><p className="font-bold">Sonria Dentista</p><p className="mt-2 text-sm leading-6 text-[#4d645f]">Return to the main site for bilingual family dental care in Arlington.</p></Link><Link href="/services" className="rounded-2xl border border-[#d9e5df] bg-white p-5 transition hover:border-[#1f6b5c]"><p className="font-bold">Dental services</p><p className="mt-2 text-sm leading-6 text-[#4d645f]">Compare treatment options if you are planning implants, crowns, or restorative care.</p></Link><Link href="/tools/dental-implant-cost-guide-for-arlington-patients" className="rounded-2xl border border-[#d9e5df] bg-white p-5 transition hover:border-[#1f6b5c]"><p className="font-bold">Implant cost guide</p><p className="mt-2 text-sm leading-6 text-[#4d645f]">Estimate related cost factors before scheduling a consultation.</p></Link></div></section>

      <section className="bg-[#123c35] px-5 py-10 text-white sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a9d8c7]">DataForSEO-backed topic</p><h2 className="mt-2 text-2xl font-bold">Keyword signals used for this guide</h2><div className="mt-5 overflow-x-auto"><table className="min-w-[680px] text-left text-sm"><thead className="text-[#a9d8c7]"><tr><th className="px-3 py-2">Keyword</th><th className="px-3 py-2">Intent</th><th className="px-3 py-2">Volume</th><th className="px-3 py-2">Competition</th><th className="px-3 py-2">CPC</th><th className="px-3 py-2">Difficulty</th><th className="px-3 py-2">Score</th></tr></thead><tbody>{keywordTargets.map((target) => <tr key={target.keyword} className="border-t border-white/15"><td className="px-3 py-2 font-semibold">{target.keyword}</td><td className="px-3 py-2">{target.intent}</td><td className="px-3 py-2">{target.volume.toLocaleString()}</td><td className="px-3 py-2">{target.competition}</td><td className="px-3 py-2">{target.cpc}</td><td className="px-3 py-2">{target.difficulty}</td><td className="px-3 py-2">{target.opportunity}</td></tr>)}</tbody></table></div></div></section>
    </main>
  );
}
