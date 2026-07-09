interface NiceScreenProps {
  onBack: () => void
}

function PathStep({ number, title, detail }: {
  number: number
  title: string
  detail?: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-7 h-7 rounded-full bg-pink-300 flex items-center justify-center text-xs font-bold text-white shrink-0">
          {number}
        </div>
        <div className="w-px flex-1 bg-stone-200 mt-1" />
      </div>
      <div className="pb-5 pt-0.5">
        <p className="text-sm font-bold text-ink">{title}</p>
        {detail && <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{detail}</p>}
      </div>
    </div>
  )
}

export default function NiceScreen({ onBack }: NiceScreenProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Inline header with back button */}
      <div className="shrink-0 flex items-center gap-2 px-4 pt-5 pb-3 border-b border-stone-100">
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 min-w-11 flex items-center justify-center rounded-full active:bg-stone-100 -ml-2 shrink-0"
          aria-label="Back to Home"
        >
          <svg className="w-5 h-5 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-base font-extrabold text-ink tracking-tight">What NICE NG73 says</h1>
      </div>

      {/* Scrollable content */}
      <div className="relative flex-1 min-h-0">
      <div className="h-full overflow-y-auto px-5 py-5 flex flex-col gap-6">

        {/* Intro */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-pink-500 uppercase tracking-wide">The guidance</p>
          <p className="text-sm text-stone-600 leading-relaxed">
            NICE NG73 is the official clinical guideline that tells every NHS GP and specialist
            how to recognise, diagnose, and manage endometriosis. "NICE" stands for the National
            Institute for Health and Care Excellence — their guidelines set the standard of care
            across England.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            When you hand a doctor a clear symptom log, you're giving them exactly what NG73
            says they should collect.
          </p>
        </div>

        {/* Symptoms section */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-pink-500 uppercase tracking-wide">Symptoms your GP should take seriously</p>
          <p className="text-sm text-stone-600 leading-relaxed">
            NG73 lists specific symptoms that mean a GP should consider endometriosis:
          </p>
          <div className="flex flex-col gap-2">
            {[
              'Ongoing pelvic pain',
              'Painful periods severe enough to stop normal activities',
              'Pain during or after sex',
              'Pain when going to the toilet around your period',
              'Difficulty getting pregnant',
              'A feeling of heaviness or pressure in your pelvis',
            ].map(s => (
              <div key={s} className="flex items-start gap-2.5 bg-pink-50 rounded-2xl px-3 py-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                <span className="text-sm text-ink">{s}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            You don't need all of these. Any one of them is enough for your GP to take
            endometriosis seriously as a possibility.
          </p>
        </div>

        {/* Pathway diagram */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold text-pink-500 uppercase tracking-wide mb-2">The recommended pathway</p>
          <PathStep
            number={1}
            title="Track your symptoms"
            detail="Every entry you log here builds the record NG73 asks for. A clear symptom history is what turns 'I think something's wrong' into evidence your GP can act on."
          />
          <PathStep
            number={2}
            title="You see your GP"
            detail="Bring your symptom log. NG73 says a thorough symptom history is the starting point."
          />
          <PathStep
            number={3}
            title="First-line treatment"
            detail="NSAIDs (ibuprofen/naproxen) for pain, or hormonal contraception (pill, patch, coil). Not a dismissal — it's the protocol."
          />
          <PathStep
            number={4}
            title="Still struggling after 3 months?"
            detail="If symptoms don't improve, NG73 says your GP should refer you to a gynaecologist. You can ask for this."
          />
          <PathStep
            number={5}
            title="Specialist assessment"
            detail="A gynaecologist can offer a transvaginal ultrasound (to check for cysts) and laparoscopy — keyhole surgery that's the only way to get a definitive diagnosis."
          />
          <PathStep
            number={6}
            title="Diagnosis and care plan"
            detail="If endometriosis is confirmed, you should get a personalised plan covering pain management, hormonal treatment, surgery options, and fertility support if needed."
          />
          {/* Final dot — distinct style, no number, no connecting line below */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-pink-300 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm font-bold text-ink pt-0.5">You have a right to this pathway.</p>
          </div>
        </div>

        {/* Referral triggers */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-pink-500 uppercase tracking-wide">When NG73 says you should be referred</p>
          <div className="bg-stone-50 rounded-3xl p-4 flex flex-col gap-2">
            {[
              'Symptoms don\'t improve with first-line treatment',
              'Endometrioma (ovarian cyst) or adenomyosis is suspected',
              'You\'re having difficulty getting pregnant',
              'Symptoms significantly affect your quality of life',
            ].map(t => (
              <div key={t} className="flex items-start gap-2">
                <span className="text-pink-400 font-bold text-sm shrink-0 mt-0.5">→</span>
                <span className="text-sm text-stone-600">{t}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            If any of these apply and you haven't been referred, you can show your GP this
            guidance and ask directly.
          </p>
        </div>

        {/* Footer note */}
        <div className="bg-stone-50 rounded-2xl p-4 text-xs text-stone-400 leading-relaxed">
          This is a plain-language summary to help you understand what NG73 says. It isn't
          medical advice. For the full clinical guideline, visit{' '}
          <span className="font-semibold text-stone-500">nice.org.uk/guidance/ng73</span>.
        </div>

      </div>

      {/* Scroll fade — wide/bezel view only. Fades content out under the
          inline header's bottom edge as the list scrolls. */}
      <div className="hidden min-[480px]:block pointer-events-none absolute top-0 inset-x-0 h-6 backdrop-blur-sm bg-gradient-to-b from-cream/95 to-transparent [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>
    </div>
  )
}
