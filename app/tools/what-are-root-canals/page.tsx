import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What Are Root Canals? Symptom Checker | Sonria Dentista Arlington',
  description: 'Learn what root canals are, why dentists recommend them, and use Sonria Dentista symptom checker to understand urgency, cost factors, and next steps.',
  alternates: { canonical: '/tools/what-are-root-canals' },
};

type Pain = 'mild' | 'moderate' | 'severe';
type Symptom = 'sensitivity' | 'swelling' | 'biting' | 'dark';
type Cause = 'unknown' | 'deep-decay' | 'crack' | 'trauma';
type Timing = 'research' | 'soon' | 'urgent';
type SearchParams = Record<string, string | string[] | undefined>;

const painLevels: Record<Pain, { label: string; score: number; note: string }> = {
  mild: { label: 'Mild or occasional', score: 1, note: 'Mild symptoms can still matter if they linger, return often, or are tied to one tooth.' },
  moderate: { label: 'Moderate or lingering', score: 3, note: 'Lingering pain after cold, heat, sweets, or chewing can mean the nerve is irritated.' },
  severe: { label: 'Severe or keeps me awake', score: 5, note: 'Severe tooth pain, especially with pressure or swelling, needs prompt dental evaluation.' },
};

const symptoms: Record<Symptom, { label: string; score: number; note: string }> = {
  sensitivity: { label: 'Cold or heat sensitivity', score: 2, note: 'Sensitivity that fades quickly may be less urgent; lingering sensitivity is more concerning.' },
  swelling: { label: 'Gum swelling or pimple', score: 5, note: 'Swelling can point to infection around the tooth root and should not be watched for weeks.' },
  biting: { label: 'Pain when biting', score: 3, note: 'Biting pain can come from an inflamed nerve, crack, infection, or high bite.' },
  dark: { label: 'Darkened tooth', score: 3, note: 'A tooth that turns gray or dark after trauma may need pulp testing and possible treatment.' },
};

const causes: Record<Cause, { label: string; score: number; note: string }> = {
  unknown: { label: 'Not sure', score: 1, note: 'An exam and X-rays can separate nerve pain from gum, bite, sinus, or jaw-related pain.' },
  'deep-decay': { label: 'Deep cavity or large filling', score: 3, note: 'Deep decay can let bacteria reach the pulp, the soft tissue inside the tooth.' },
  crack: { label: 'Cracked or broken tooth', score: 4, note: 'Cracks can irritate the nerve and may also affect whether a tooth can be restored.' },
  trauma: { label: 'Hit or injured tooth', score: 3, note: 'Dental trauma can damage the nerve even when the outside of the tooth looks mostly normal.' },
};

const timings: Record<Timing, { label: string; score: number; note: string }> = {
  research: { label: 'I am researching', score: 0, note: 'Use this guide to prepare questions and understand the basic sequence of care.' },
  soon: { label: 'I want an appointment soon', score: 2, note: 'A timely visit can prevent a small problem from turning into swelling or emergency pain.' },
  urgent: { label: 'I need help now', score: 4, note: 'Call a dentist promptly, especially if pain is escalating or swelling is present.' },
};

const keywordTargets = [
  { keyword: 'what are root canals', intent: 'informational', volume: 12100, competition: 'medium', cpc: '$7.94', difficulty: 48, opportunity: 71 },
  { keyword: 'root canal', intent: 'informational', volume: 165000, competition: 'medium', cpc: '$9.71', difficulty: 72, opportunity: 53 },
  { keyword: 'do root canals hurt', intent: 'informational', volume: 5400, competition: 'low', cpc: '$6.18', difficulty: 36, opportunity: 74 },
  { keyword: 'root canal symptoms', intent: 'commercial', volume: 14800, competition: 'medium', cpc: '$12.43', difficulty: 54, opportunity: 69 },
  { keyword: 'root canal treatment', intent: 'commercial', volume: 22200, competition: 'medium', cpc: '$10.22', difficulty: 58, opportunity: 64 },
];

const faqs = [
  { question: 'What are root canals?', answer: 'A root canal is a tooth-saving dental procedure that removes infected or inflamed pulp from inside a tooth, disinfects the canals, seals the space, and usually protects the tooth with a crown.' },
  { question: 'Do root canals hurt?', answer: 'Most root canal treatment is done with local anesthetic, so the goal is to relieve tooth pain rather than cause it. Soreness for a few days afterward is common.' },
  { question: 'How do I know if I need one?', answer: 'Common warning signs include lingering temperature sensitivity, pain when biting, swelling, a gum pimple, deep decay, a cracked tooth, or a darkened tooth after trauma.' },
  { question: 'Is a crown always needed after a root canal?', answer: 'Back teeth and heavily restored teeth often need a crown because they handle chewing forces. Front teeth may not always need one, depending on remaining tooth structure.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'What Are Root Canals? Symptom Checker',
  description: 'An interactive guide from Sonria Dentista that explains root canal treatment and helps patients understand symptom urgency and next steps.',
  url: 'https://sonriadentista.com/tools/what-are-root-canals',
  mainEntity: { '@type': 'SoftwareApplication', name: 'What Are Root Canals Symptom Checker', applicationCategory: 'HealthApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  about: { '@type': 'MedicalProcedure', name: 'Root canal treatment', procedureType: 'Dental procedure' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getChoice<T extends string>(params: SearchParams, key: string, allowed: Record<T, unknown>, fallback: T) {
  const value = firstValue(params[key]);
  return value && value in allowed ? (value as T) : fallback;
}

function getResult(score: number) {
  if (score >= 14) return { label: 'High urgency', headline: 'Call for a dental visit as soon as possible.', detail: 'Your answers include signs that can match infection, nerve inflammation, or a damaged tooth. A dentist can test the tooth, take X-rays, and explain whether root canal treatment, a crown, or another option is appropriate.', band: 'bg-red-50 text-red-950 ring-red-200', cta: 'Call Sonria Dentista' };
  if (score >= 8) return { label: 'Needs evaluation', headline: 'Schedule an exam before symptoms get worse.', detail: 'Your answers suggest a tooth that should be checked. Root canal treatment is one possible path when the pulp is inflamed or infected, but the right plan depends on an exam and imaging.', band: 'bg-amber-50 text-amber-950 ring-amber-200', cta: 'Request an appointment' };
  return { label: 'Lower urgency', headline: 'Use this as a planning guide and monitor changes.', detail: 'Your answers sound less urgent, but recurring tooth pain is still worth discussing with a dentist. If pain lingers, swelling appears, or biting becomes painful, move from research to an appointment.', band: 'bg-emerald-50 text-emerald-950 ring-emerald-200', cta: 'Ask a question' };
}

export default function WhatAreRootCanalsPage({ searchParams }: { searchParams?: SearchParams }) {
  const params = searchParams ?? {};
  const pain = getChoice(params, 'pain', painLevels, 'moderate');
  const symptom = getChoice(params, 'symptom', symptoms, 'sensitivity');
  const cause = getChoice(params, 'cause', causes, 'unknown');
  const timing = getChoice(params, 'timing', timings, 'research');
  const score = painLevels[pain].score + symptoms[symptom].score + causes[cause].score + timings[timing].score;
  const result = getResult(score);

  return (
    <main className='min-h-screen bg-[#f7fbfa] text-slate-950'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className='bg-[#0f5f5c] text-white'>
        <div className='mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-16'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.18em] text-teal-100'>Root canal guide</p>
            <h1 className='mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl'>What are root canals, and when should tooth pain be checked?</h1>
            <p className='mt-5 max-w-2xl text-lg leading-8 text-teal-50'>Root canals remove infected or inflamed tissue from inside a tooth so the tooth can often be saved. Use this quick checker to understand symptom urgency and the questions to bring to a dental exam.</p>
            <div className='mt-7 flex flex-wrap gap-3'>
              <Link href='/es/contact' className='rounded-md bg-white px-5 py-3 text-sm font-bold text-[#0f5f5c] shadow-sm transition hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f5f5c]'>Book an appointment</Link>
              <a href='tel:+18175551212' className='rounded-md border border-white/50 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f5f5c]'>Call now</a>
            </div>
          </div>
          <div className='rounded-lg bg-white/10 p-5 ring-1 ring-white/20'>
            <p className='text-sm font-semibold text-teal-50'>Most common warning signs</p>
            <div className='mt-4 grid gap-3 text-sm text-white'>{['Lingering hot or cold sensitivity', 'Pain when biting or chewing', 'Swelling, drainage, or a gum pimple', 'Deep decay, cracked tooth, or dental trauma'].map((item) => <div key={item} className='rounded-md bg-white/10 px-4 py-3'>{item}</div>)}</div>
          </div>
        </div>
      </section>
      <section className='mx-auto grid max-w-6xl gap-6 px-5 py-10 lg:grid-cols-[0.95fr_1.05fr]'>
        <form className='rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200' action='/tools/what-are-root-canals'>
          <p className='text-sm font-semibold uppercase tracking-[0.16em] text-[#0f5f5c]'>Symptom checker</p>
          <h2 className='mt-2 text-2xl font-bold'>Estimate how soon to call</h2>
          <p className='mt-2 text-sm leading-6 text-slate-600'>This is educational and does not diagnose your tooth. It helps you organize symptoms before a dental visit.</p>
          <fieldset className='mt-6'>
            <legend className='text-sm font-bold text-slate-900'>Pain level</legend>
            <div className='mt-3 grid gap-2'>{(Object.entries(painLevels) as [Pain, (typeof painLevels)[Pain]][]).map(([value, option]) => <label key={value} className='flex cursor-pointer gap-3 rounded-md border border-slate-200 p-3 text-sm transition has-[:checked]:border-[#0f5f5c] has-[:checked]:bg-teal-50'><input type='radio' name='pain' value={value} defaultChecked={pain === value} className='mt-1 h-4 w-4 accent-[#0f5f5c]' /><span><span className='block font-semibold'>{option.label}</span><span className='block text-slate-600'>{option.note}</span></span></label>)}</div>
          </fieldset>
          <fieldset className='mt-6'>
            <legend className='text-sm font-bold text-slate-900'>Main symptom</legend>
            <select name='symptom' defaultValue={symptom} className='mt-3 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#0f5f5c]/20'>{(Object.entries(symptoms) as [Symptom, (typeof symptoms)[Symptom]][]).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select>
            <p className='mt-2 text-sm text-slate-600'>{symptoms[symptom].note}</p>
          </fieldset>
          <div className='mt-6 grid gap-4 sm:grid-cols-2'>
            <label className='text-sm font-bold text-slate-900'>Possible cause<select name='cause' defaultValue={cause} className='mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 font-normal focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#0f5f5c]/20'>{(Object.entries(causes) as [Cause, (typeof causes)[Cause]][]).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
            <label className='text-sm font-bold text-slate-900'>Timing<select name='timing' defaultValue={timing} className='mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 font-normal focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#0f5f5c]/20'>{(Object.entries(timings) as [Timing, (typeof timings)[Timing]][]).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
          </div>
          <button type='submit' className='mt-6 w-full rounded-md bg-[#0f5f5c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b4d4a] focus:outline-none focus:ring-2 focus:ring-[#0f5f5c] focus:ring-offset-2'>Update my guidance</button>
        </form>
        <div className='space-y-6'>
          <section className={`rounded-lg p-5 ring-1 ${result.band}`} aria-live='polite'>
            <p className='text-sm font-bold uppercase tracking-[0.16em]'>{result.label}</p>
            <h2 className='mt-3 text-3xl font-bold'>{result.headline}</h2>
            <p className='mt-3 leading-7'>{result.detail}</p>
            <div className='mt-5 grid gap-3 rounded-md bg-white/70 p-4 text-sm sm:grid-cols-2'><div><p className='font-bold'>Selected symptom</p><p>{symptoms[symptom].label}</p></div><div><p className='font-bold'>Planning note</p><p>{timings[timing].note}</p></div></div>
            <Link href='/es/contact' className='mt-5 inline-flex rounded-md bg-[#0f5f5c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b4d4a] focus:outline-none focus:ring-2 focus:ring-[#0f5f5c] focus:ring-offset-2'>{result.cta}</Link>
          </section>
          <section className='rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200'>
            <h2 className='text-2xl font-bold'>What happens during a root canal?</h2>
            <div className='mt-4 grid gap-3'>{[['Exam and X-rays', 'The dentist checks the tooth, surrounding bone, bite, and symptoms.'], ['Local anesthetic', 'The area is numbed so treatment is focused on comfort and pain relief.'], ['Clean and seal', 'Inflamed or infected pulp is removed, canals are cleaned, and the tooth is sealed.'], ['Final restoration', 'Many teeth need a crown or permanent filling to protect chewing strength.']].map(([title, copy], index) => <div key={title} className='grid grid-cols-[2rem_1fr] gap-3 rounded-md bg-slate-50 p-3'><div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#0f5f5c] text-sm font-bold text-white'>{index + 1}</div><div><h3 className='font-bold'>{title}</h3><p className='mt-1 text-sm leading-6 text-slate-600'>{copy}</p></div></div>)}</div>
          </section>
        </div>
      </section>
      <section className='border-y border-slate-200 bg-white'>
        <div className='mx-auto max-w-6xl px-5 py-10'>
          <p className='text-sm font-semibold uppercase tracking-[0.16em] text-[#0f5f5c]'>DataForSEO keyword brief</p>
          <h2 className='mt-2 text-3xl font-bold'>Search demand behind this guide</h2>
          <p className='mt-3 max-w-3xl leading-7 text-slate-600'>This tool targets high-intent informational searches and routes patients from education into an exam when symptoms suggest urgency.</p>
          <div className='mt-6 overflow-x-auto rounded-lg ring-1 ring-slate-200'><table className='min-w-full divide-y divide-slate-200 text-left text-sm'><thead className='bg-slate-50 text-slate-700'><tr>{['Keyword', 'Intent', 'Volume', 'Comp.', 'CPC', 'Diff.', 'Opp.'].map((head) => <th key={head} className='px-4 py-3 font-bold'>{head}</th>)}</tr></thead><tbody className='divide-y divide-slate-200 bg-white'>{keywordTargets.map((target) => <tr key={target.keyword}><td className='px-4 py-3 font-semibold text-slate-950'>{target.keyword}</td><td className='px-4 py-3 capitalize text-slate-700'>{target.intent}</td><td className='px-4 py-3 text-slate-700'>{target.volume.toLocaleString()}</td><td className='px-4 py-3 capitalize text-slate-700'>{target.competition}</td><td className='px-4 py-3 text-slate-700'>{target.cpc}</td><td className='px-4 py-3 text-slate-700'>{target.difficulty}</td><td className='px-4 py-3 font-bold text-[#0f5f5c]'>{target.opportunity}</td></tr>)}</tbody></table></div>
        </div>
      </section>
      <section className='mx-auto grid max-w-6xl gap-6 px-5 py-10 lg:grid-cols-2'>
        <div><h2 className='text-3xl font-bold'>Questions to ask at your visit</h2><div className='mt-5 grid gap-3'>{['Is the tooth nerve inflamed, infected, or still reversible?', 'Do the X-rays show bone changes around the root?', 'Will I need a crown, build-up, or replacement filling afterward?', 'What should I do if swelling, fever, or severe pain develops?'].map((question) => <div key={question} className='rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200'>{question}</div>)}</div></div>
        <div><h2 className='text-3xl font-bold'>Root canal FAQs</h2><div className='mt-5 space-y-3'>{faqs.map((faq) => <details key={faq.question} className='rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200'><summary className='cursor-pointer font-bold'>{faq.question}</summary><p className='mt-3 leading-7 text-slate-600'>{faq.answer}</p></details>)}</div></div>
      </section>
      <section className='bg-[#113b3a] text-white'><div className='mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between'><div><h2 className='text-3xl font-bold'>Tooth pain should not stay a mystery.</h2><p className='mt-2 max-w-2xl text-teal-50'>Sonria Dentista can evaluate the tooth, explain your options in plain language, and help you understand whether root canal treatment is the right next step.</p></div><Link href='/es/contact' className='inline-flex rounded-md bg-white px-5 py-3 text-sm font-bold text-[#113b3a] transition hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#113b3a]'>Contact Sonria Dentista</Link></div></section>
    </main>
  );
}
