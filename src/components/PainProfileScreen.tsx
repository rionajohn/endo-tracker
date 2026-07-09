import type { BaselineQuestionnaire } from '../types'

interface PainProfileScreenProps {
  baseline: BaselineQuestionnaire | null
  onOpenBaseline: () => void
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function PainProfileScreen({ baseline, onOpenBaseline }: PainProfileScreenProps) {
  return (
    <div className="flex flex-col gap-5 p-6 h-full">
      <div className="flex flex-col items-center gap-3 pt-4 text-center">
        <div className="w-16 h-16 rounded-full bg-sage/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h2 className="text-lg font-extrabold text-ink">Pain Profile</h2>
        <p className="text-sm text-stone-400 leading-relaxed">
          Coming soon — manage your account and preferences.
        </p>
      </div>

      {/* Baseline entry point — the questionnaire is only accessed from here, never the nav bar */}
      {baseline ? (
        <button
          type="button"
          onClick={onOpenBaseline}
          className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 text-left active:bg-stone-50 transition-colors"
        >
          <span className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink">View your baseline</p>
            <p className="text-xs text-stone-400">Completed {formatDate(baseline.completedAt)} — tap to view or update</p>
          </div>
          <svg className="w-4 h-4 text-stone-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpenBaseline}
          className="flex flex-col gap-2 bg-pink-100 rounded-3xl p-5 text-left active:bg-pink-200 transition-colors"
        >
          <p className="text-base font-extrabold text-ink leading-snug">Complete your baseline</p>
          <p className="text-sm text-stone-600 leading-relaxed">
            A short questionnaire about your cycle, pain history and healthcare experience, so
            future symptom logs can be compared against where you started. Fill it in whenever
            suits you, and come back to update it any time.
          </p>
          <span className="text-sm font-semibold text-pink-700">Start the questionnaire →</span>
        </button>
      )}
    </div>
  )
}
