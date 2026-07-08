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
        <h1 className="text-lg font-bold text-neutral-900 mb-2">Your log</h1>
        <p className="text-sm text-neutral-500">
          No entries yet. Log a symptom to start building your pattern.
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col gap-3">
      <h1 className="text-lg font-bold text-neutral-900">Your log</h1>
      <p className="text-sm text-neutral-500 -mt-2">{entries.length} entries logged</p>
      <ul className="flex flex-col gap-3" data-testid="log-history-list">
        {entries.map((entry) => (
          <li key={entry.id} className="border border-neutral-200 rounded-lg p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-neutral-900">{formatDate(entry.createdAt)}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {cycleRelationLabel[entry.onsetCycleRelation]}
                </p>
              </div>
              <span className="shrink-0 min-h-6 px-2 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold flex items-center">
                {entry.severity}/10
              </span>
            </div>
            <p className="text-sm text-neutral-700 mt-2">
              <span className="font-medium">Site: </span>
              {entry.site.map((s) => bodySiteLabel[s]).join(', ') || '-'}
            </p>
            <p className="text-sm text-neutral-700 mt-1">
              <span className="font-medium">Character: </span>
              {entry.character.map((c) => characterLabel[c]).join(', ') || '-'}
            </p>
            <button
              type="button"
              onClick={() => onDelete(entry.id)}
              className="mt-3 min-h-11 w-full rounded-lg border border-red-200 text-red-600 text-sm font-medium active:bg-red-50"
            >
              Delete entry
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
