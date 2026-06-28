import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Wisdom Tooth Removal Cost Estimator | Sonria Dentista Arlington',
  description:
    'Estimate wisdom tooth removal cost in Arlington, TX by tooth count, impaction level, sedation, imaging, and insurance before scheduling an exam.',
  alternates: {
    canonical: '/tools/wisdom-tooth-removal-cost-estimator',
  },
};

type ToothCount = 'one' | 'two' | 'three-four';
type Impaction = 'erupted' | 'soft-tissue' | 'partial-bony' | 'full-bony';
type Sedation = 'local' | 'nitrous' | 'oral' | 'iv-referral';
type Coverage = 'none' | 'partial' | 'strong';
type AddOn = 'exam' | 'panoramic-xray' | 'cbct' | 'follow-up';
type SearchParams = Record<string, string | string[] | undefined>;

const keywordTargets = [
  { keyword: 'wisdom tooth removal cost estimator', volume: 70, competition: 'medium', cpc: 7.18, difficulty: 21, opportunity: 84 },
  { keyword: 'wisdom teeth removal cost', volume: 2900, competition: 'high', cpc: 6.74, difficulty: 38, opportunity: 79 },
  { keyword: 'wisdom tooth extraction cost', volume: 720, competition: 'high', cpc: 6.11, difficulty: 31, opportunity: 77 },
  { keyword: 'cost to remove wisdom teeth without insurance', volume: 390, competition: 'medium', cpc: 5.82, difficulty: 27, opportunity: 81 },
];

const toothCounts: Record<ToothCount, { label: string; multiplier: number; note: string }> = {
  one: { label: '1 wisdom tooth', multiplier: 1, note: 'Useful when one tooth is painful, infected, or difficult to keep clean.' },
  two: { label: '2 wisdom teeth', multiplier: 2, note: 'Often planned when both teeth on one side or arch need treatment.' },
  'three-four': { label: '3 to 4 wisdom teeth', multiplier: 3.65, note: 'Common for a full wisdom tooth removal plan; bundled pricing can vary.' },
};

const impactions: Record<Impaction, { label: string; low: number; high: number; note: string }> = {
  erupted: { label: 'Erupted / simple extraction', low: 180, high: 350, note: 'The tooth is visible and usually easier to remove.' },
  'soft-tissue': { label: 'Soft tissue impaction', low: 300, high: 550, note: 'Gum tissue covers part or all of the tooth.' },
  'partial-bony': { label: 'Partial bony impaction', low: 450, high: 800, note: 'Some bone blocks the tooth, increasing surgical complexity.' },
  'full-bony': { label: 'Full bony impaction', low: 650, high: 1100, note: 'The tooth is fully covered by bone and may require referral planning.' },
};

const sedations: Record<Sedation, { label: string; low: number; high: number; note: string }> = {
  local: { label: 'Local anesthesia', low: 0, high: 0, note: 'Numbing is typically included with the extraction visit.' },
  nitrous: { label: 'Nitrous oxide', low: 75, high: 175, note: 'A lighter relaxation option that may help with dental anxiety.' },
  oral: { label: 'Oral sedation', low: 180, high: 450, note: 'Medication-assisted relaxation may require extra planning.' },
  'iv-referral': { label: 'IV sedation / surgical referral', low: 500, high: 1200, note: 'Complex cases may need an oral surgeon or IV sedation provider.' },
};

const coverage: Record<Coverage, { label: string; factor: number; note: string }> = {
  none: { label: 'No insurance estimate', factor: 1, note: 'Shows a self-pay planning range before membership or financing options.' },
  partial: { label: 'Some dental insurance', factor: 0.65, note: 'Many plans reduce eligible oral surgery costs after deductibles and limits.' },
  strong: { label: 'Stronger oral surgery benefits', factor: 0.45, note: 'Use this only if your plan has meaningful oral surgery coverage remaining.' },
};

const addOns: Record<AddOn, { label: string; low: number; high: number; note: string }> = {
  exam: { label: 'Limited exam / consultation', low: 75, high: 180, note: 'Needed to confirm whether extraction is appropriate.' },
  'panoramic-xray': { label: 'Panoramic X-ray', low: 100, high: 250, note: 'Often used to see tooth roots, nerves, and neighboring teeth.' },
  cbct: { label: '3D CBCT scan', low: 250, high: 450, note: 'May be recommended when roots sit close to important anatomy.' },
  'follow-up': { label: 'Post-op follow-up visit', low: 50, high: 150, note: 'Helpful when healing, dry socket risk, or infection needs monitoring.' },
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function pick<T extends string>(value: string | string[] | undefined, fallback: T, allowed: Record<T, unknown>) {
  const selected = firstValue(value);
  return selected && selected in allowed ? (selected as T) : fallback;
}

function getSelectedAddOns(value: string | string[] | undefined) {
  const values = Array.isArray(value) ? value : value ? [value] : ['exam', 'panoramic-xray'];
  return values.filter((item): item is AddOn => item in addOns);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export default async function WisdomToothRemovalCostEstimator({ searchParams }: { searchParams?: Promise<SearchParams> }) {
  const params = (await searchParams) ?? {};
  const toothCount = pick<ToothCount>(params.teeth, 'three-four', toothCounts);
  const impaction = pick<Impaction>(params.impaction, 'partial-bony', impactions);
  const sedation = pick<Sedation>(params.sedation, 'local', sedations);
  const insurance = pick<Coverage>(params.coverage, 'none', coverage);
  const selectedAddOns = getSelectedAddOns(params.addons);
  const teeth = toothCounts[toothCount];
  const complexity = impactions[impaction];
  const sedationChoice = sedations[sedation];
  const insuranceChoice = coverage[insurance];
  const addOnLow = selectedAddOns.reduce((sum, item) => sum + addOns[item].low, 0);
  const addOnHigh = selectedAddOns.reduce((sum, item) => sum + addOns[item].high, 0);
  const estimatedLow = Math.round((complexity.low * teeth.multiplier + sedationChoice.low + addOnLow) * insuranceChoice.factor);
  const estimatedHigh = Math.round((complexity.high * teeth.multiplier + sedationChoice.high + addOnHigh) * insuranceChoice.factor);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Wisdom Tooth Removal Cost Estimator',
    description: 'Estimate wisdom tooth removal cost by number of teeth, impaction level, sedation, imaging, and insurance coverage.',
    url: 'https://sonriadentista.com/tools/wisdom-tooth-removal-cost-estimator',
    mainEntity: { '@type': 'SoftwareApplication', name: 'Wisdom Tooth Removal Cost Estimator', applicationCategory: 'HealthApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
    publisher: { '@type': 'Dentist', name: 'Sonria Dentista', address: { '@type': 'PostalAddress', addressLocality: 'Arlington', addressRegion: 'TX', addressCountry: 'US' } },
  };

  return (
    <main className='min-h-screen bg-[#f7f3ee] text-[#1f2933]'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className='border-b border-[#e4d8ca] bg-white'>
        <div className='mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-16'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.18em] text-[#1f7a6d]'>Arlington wisdom teeth cost tool</p>
            <h1 className='mt-4 text-4xl font-bold leading-tight text-[#172026] md:text-5xl'>Wisdom Tooth Removal Cost Estimator</h1>
            <p className='mt-5 max-w-2xl text-lg leading-8 text-[#4b5563]'>Build a realistic planning range for wisdom tooth extraction based on how many teeth need removal, whether they are impacted, sedation needs, imaging, and estimated dental insurance coverage.</p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <Link href='/en/contact' className='rounded-md bg-[#1f7a6d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#176257]'>Schedule an exam</Link>
              <Link href='/en/services' className='rounded-md border border-[#1f7a6d] px-5 py-3 text-sm font-semibold text-[#1f7a6d] transition hover:bg-[#e8f3f1]'>View dental services</Link>
            </div>
          </div>
          <aside className='rounded-lg border border-[#e4d8ca] bg-[#fbfaf8] p-6 shadow-sm'>
            <p className='text-sm font-semibold uppercase tracking-[0.16em] text-[#6b7280]'>Estimated patient range</p>
            <p className='mt-4 text-4xl font-bold text-[#172026]'>{formatCurrency(estimatedLow)} - {formatCurrency(estimatedHigh)}</p>
            <p className='mt-4 text-sm leading-6 text-[#4b5563]'>This is not a diagnosis or quote. A dentist needs X-rays and an exam to confirm complexity, infection risk, nerve proximity, and whether referral is appropriate.</p>
            <dl className='mt-6 space-y-3 text-sm'>
              <div className='flex justify-between gap-4 border-t border-[#e4d8ca] pt-3'><dt className='text-[#6b7280]'>Tooth plan</dt><dd className='text-right font-medium'>{teeth.label}</dd></div>
              <div className='flex justify-between gap-4 border-t border-[#e4d8ca] pt-3'><dt className='text-[#6b7280]'>Complexity</dt><dd className='text-right font-medium'>{complexity.label}</dd></div>
              <div className='flex justify-between gap-4 border-t border-[#e4d8ca] pt-3'><dt className='text-[#6b7280]'>Sedation</dt><dd className='text-right font-medium'>{sedationChoice.label}</dd></div>
            </dl>
          </aside>
        </div>
      </section>
      <section className='mx-auto max-w-6xl px-5 py-10 md:px-8'>
        <form className='grid gap-6 rounded-lg border border-[#e4d8ca] bg-white p-5 shadow-sm md:grid-cols-2 md:p-6'>
          <label className='grid gap-2'><span className='text-sm font-semibold'>How many wisdom teeth?</span><select name='teeth' defaultValue={toothCount} className='rounded-md border border-[#d6c8ba] bg-white px-3 py-3'>{Object.entries(toothCounts).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
          <label className='grid gap-2'><span className='text-sm font-semibold'>Most likely tooth position</span><select name='impaction' defaultValue={impaction} className='rounded-md border border-[#d6c8ba] bg-white px-3 py-3'>{Object.entries(impactions).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
          <label className='grid gap-2'><span className='text-sm font-semibold'>Sedation preference</span><select name='sedation' defaultValue={sedation} className='rounded-md border border-[#d6c8ba] bg-white px-3 py-3'>{Object.entries(sedations).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
          <label className='grid gap-2'><span className='text-sm font-semibold'>Insurance estimate</span><select name='coverage' defaultValue={insurance} className='rounded-md border border-[#d6c8ba] bg-white px-3 py-3'>{Object.entries(coverage).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
          <fieldset className='md:col-span-2'>
            <legend className='text-sm font-semibold'>Likely visit items</legend>
            <div className='mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>{Object.entries(addOns).map(([value, option]) => <label key={value} className='flex gap-3 rounded-md border border-[#e4d8ca] bg-[#fbfaf8] p-3 text-sm'><input type='checkbox' name='addons' value={value} defaultChecked={selectedAddOns.includes(value as AddOn)} className='mt-1' /><span><span className='block font-medium'>{option.label}</span><span className='block text-[#6b7280]'>{formatCurrency(option.low)} - {formatCurrency(option.high)}</span></span></label>)}</div>
          </fieldset>
          <div className='md:col-span-2'><button className='rounded-md bg-[#172026] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2f3b44]'>Update estimate</button></div>
        </form>
      </section>
      <section className='mx-auto grid max-w-6xl gap-6 px-5 pb-12 md:grid-cols-3 md:px-8'>{[{ title: 'Tooth position', body: complexity.note }, { title: 'Sedation planning', body: sedationChoice.note }, { title: 'Insurance reality', body: insuranceChoice.note }].map((item) => <article key={item.title} className='rounded-lg border border-[#e4d8ca] bg-white p-5 shadow-sm'><h2 className='text-lg font-bold text-[#172026]'>{item.title}</h2><p className='mt-3 text-sm leading-6 text-[#4b5563]'>{item.body}</p></article>)}</section>
      <section className='bg-white'><div className='mx-auto max-w-6xl px-5 py-12 md:px-8'><h2 className='text-2xl font-bold text-[#172026]'>What affects wisdom teeth removal cost?</h2><div className='mt-6 grid gap-5 md:grid-cols-2'>{['Simple extractions usually cost less than impacted wisdom teeth because they are easier to access.', 'Removing all four wisdom teeth costs more than removing one, but the per-tooth cost may be lower when treatment is planned together.', 'Nitrous, oral sedation, or an IV sedation referral can add cost for anxious patients or complex surgery.', 'X-rays and 3D imaging help evaluate roots, nerves, sinuses, infection, and referral needs.'].map((body, index) => <div key={body} className='rounded-lg border border-[#e4d8ca] p-5'><h3 className='font-semibold'>{['Simple vs impacted', 'Number of teeth', 'Sedation needs', 'Imaging and follow-up'][index]}</h3><p className='mt-2 text-sm leading-6 text-[#4b5563]'>{body}</p></div>)}</div></div></section>
      <section className='mx-auto max-w-6xl px-5 py-12 md:px-8'><h2 className='text-2xl font-bold text-[#172026]'>Keyword brief used for this tool</h2><div className='mt-5 overflow-x-auto rounded-lg border border-[#e4d8ca] bg-white'><table className='w-full min-w-[760px] border-collapse text-left text-sm'><thead className='bg-[#f7f3ee] text-[#374151]'><tr><th className='px-4 py-3 font-semibold'>Keyword</th><th className='px-4 py-3 font-semibold'>Volume</th><th className='px-4 py-3 font-semibold'>Competition</th><th className='px-4 py-3 font-semibold'>CPC</th><th className='px-4 py-3 font-semibold'>Difficulty</th><th className='px-4 py-3 font-semibold'>Opportunity</th></tr></thead><tbody>{keywordTargets.map((target) => <tr key={target.keyword} className='border-t border-[#e4d8ca]'><td className='px-4 py-3 font-medium'>{target.keyword}</td><td className='px-4 py-3'>{target.volume.toLocaleString('en-US')}</td><td className='px-4 py-3 capitalize'>{target.competition}</td><td className='px-4 py-3'>${target.cpc.toFixed(2)}</td><td className='px-4 py-3'>{target.difficulty}</td><td className='px-4 py-3'>{target.opportunity}</td></tr>)}</tbody></table></div></section>
    </main>
  );
}
