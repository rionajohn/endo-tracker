interface HomeScreenProps {
  onStartLogging: () => void
}

export default function HomeScreen({ onStartLogging }: HomeScreenProps) {
  return (
    <div className="p-6 flex flex-col gap-5 h-full">
      <div className="flex flex-col gap-2 pt-4">
        <h1 className="text-3xl font-extrabold text-ink tracking-tight">Endo Tracker</h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          Track your symptoms. Build your pattern. Go to your GP with evidence.
        </p>
      </div>

      {/* NICE card — prominent, warm, backed by clinical guidance */}
      <div className="bg-pink-100 rounded-3xl p-6 flex flex-col gap-3">
        <span className="self-start bg-pink-300 text-ink text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
          Backed by NICE guidance
        </span>
        <p className="text-base font-extrabold text-ink leading-snug">
          Tracking your symptoms is something your doctor will actually welcome
        </p>
        <p className="text-sm text-stone-600 leading-relaxed">
          NICE — the guidelines doctors in the UK use to help spot and diagnose endometriosis —
          specifically recommends a clear symptom history as part of getting you the right care.
          Every entry you log helps build exactly that.
        </p>
        <a
          href="https://www.nice.org.uk/guidance/ng73/resources/visual-summary-on-first-presentation-initial-management-diagnosis-referral-and-ongoing-care-of-pdf-13559822461"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-pink-700 underline-offset-2 hover:underline"
        >
          Read the NICE NG73 guidance →
        </a>
      </div>

      <div className="flex flex-col gap-2.5">
        {[
          { label: 'Log', desc: 'Record each symptom as it happens' },
          { label: 'Calendar', desc: 'See your pattern over time' },
          { label: 'Report', desc: 'Share a clinical summary with your GP' },
        ].map(({ label, desc }) => (
          <div key={label} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3">
            <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-pink-600">{label[0]}</span>
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{label}</p>
              <p className="text-xs text-stone-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onStartLogging}
        className="mt-auto min-h-14 rounded-full bg-pink-300 text-ink font-semibold text-sm active:bg-pink-400 transition-colors"
      >
        Start logging
      </button>
    </div>
  )
}
