import type { SymptomEntry } from '../types'
import {
  bodySiteLabel,
  characterLabel,
  cycleRelationLabel,
} from '../lib/socrates'

interface LogHistoryProps {
  entries: SymptomEntry[]
  onDelete: (id: string) => void
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function LogHistory({ entries, onDelete }: LogHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-extrabold text-ink tracking-tight mb-2">Your log</h1>
        <p className="text-sm text-stone-500">
          No entries yet. Log a symptom to start building your pattern.
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col gap-3">
      <h1 className="text-2xl font-extrabold text-ink tracking-tight">Your log</h1>
      <p className="text-sm text-stone-500 -mt-2">{entries.length} entries logged</p>
      <ul className="flex flex-col gap-3" data-testid="log-history-list">
        {entries.map((entry) => (
          <li key={entry.id} className="bg-white rounded-3xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-ink">{formatDate(entry.createdAt)}</p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {cycleRelationLabel[entry.onsetCycleRelation]}
                </p>
              </div>
              <span className="shrink-0 min-h-6 px-2.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold flex items-center">
                {entry.severity}/10
              </span>
            </div>
            <p className="text-sm text-stone-700 mt-3">
              <span className="font-semibold text-ink">Site: </span>
              {entry.site.map((s) => bodySiteLabel[s]).join(', ') || '-'}
            </p>
            <p className="text-sm text-stone-700 mt-1">
              <span className="font-semibold text-ink">Character: </span>
              {entry.character.map((c) => characterLabel[c]).join(', ') || '-'}
            </p>
            <button
              type="button"
              onClick={() => onDelete(entry.id)}
              className="mt-3 min-h-11 w-full rounded-full bg-stone-100 text-pink-700 text-sm font-semibold active:bg-stone-200"
            >
              Delete entry
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
