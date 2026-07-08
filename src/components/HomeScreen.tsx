interface HomeScreenProps {
  onStartLogging: () => void
}

export default function HomeScreen({ onStartLogging }: HomeScreenProps) {
  return (
    <div className="p-6 flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-2 pt-4">
        <h1 className="text-3xl font-extrabold text-ink tracking-tight">Endo Tracker</h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          Track your symptoms. Build your pattern. Go to your GP with evidence.
        </p>
      </div>

      <div className="bg-pink-50 rounded-3xl p-5 flex flex-col gap-3">
        <p className="text-sm font-semibold text-ink">Why it matters</p>
        <p className="text-sm text-stone-600 leading-relaxed">
          A documented symptom pattern is what makes a doctor act. This app helps you log
          symptoms in the same structure your GP uses — so your story is impossible to dismiss.
        </p>
      </div>

      <div className="flex flex-col gap-3">
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
