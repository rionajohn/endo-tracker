import { useState } from 'react'
import type { SymptomEntry } from '../types'
import { bodySiteLabel, characterLabel, cycleRelationLabel } from '../lib/socrates'

interface CalendarScreenProps {
  entries: SymptomEntry[]
  onDelete: (id: string) => void
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_HEADERS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, { timeStyle: 'short' })
}

export default function CalendarScreen({ entries, onDelete }: CalendarScreenProps) {
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string>(todayStr)

  const datesWithEntries = new Set(entries.map(e => e.createdAt.slice(0, 10)))

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const rawFirstDay = new Date(viewYear, viewMonth, 1).getDay()
  const firstDay = rawFirstDay === 0 ? 6 : rawFirstDay - 1 // Mon=0…Sun=6

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const selectedEntries = entries
    .filter(e => e.createdAt.startsWith(selectedDate))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))

  const selectedLabel = new Date(selectedDate + 'T12:00:00').toLocaleDateString(undefined, {
    weekday: 'short', day: 'numeric', month: 'short',
  })

  return (
    // Fill the content area exactly and split into two stacked regions
    <div className="h-full flex flex-col">

      {/* ── Top region (~75%): month grid ── */}
      <div className="flex-[3] flex flex-col px-4 pt-4 pb-2 min-h-0">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={prevMonth}
            className="min-h-11 min-w-11 flex items-center justify-center rounded-full active:bg-stone-100"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="font-extrabold text-ink text-base">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="min-h-11 min-w-11 flex items-center justify-center rounded-full active:bg-stone-100"
            aria-label="Next month"
          >
            <svg className="w-5 h-5 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 flex-1">
          {DAY_HEADERS.map(d => (
            <div key={d} className="text-center text-xs text-stone-400 font-semibold pb-1">{d}</div>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <div key={`blank-${i}`} />
            const ds = toDateStr(viewYear, viewMonth, day)
            const hasEntries = datesWithEntries.has(ds)
            const isSelected = selectedDate === ds
            const isToday = ds === todayStr
            return (
              <button
                key={ds}
                type="button"
                onClick={() => setSelectedDate(ds)}
                className={`flex flex-col items-center justify-center rounded-xl transition-colors ${
                  isSelected
                    ? 'bg-pink-300'
                    : isToday
                    ? 'bg-pink-50'
                    : 'active:bg-stone-100'
                }`}
              >
                <span className={`text-sm font-semibold ${isToday && !isSelected ? 'text-pink-600' : 'text-ink'}`}>
                  {day}
                </span>
                {hasEntries && (
                  <span className={`mt-0.5 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-ink' : 'bg-pink-400'}`} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Bottom region (~25%): selected day entries ── */}
      <div className="flex-[1] flex flex-col min-h-0 border-t border-stone-100 bg-white rounded-t-3xl px-4 pt-3 pb-2 overflow-y-auto">
        <p className="text-xs font-extrabold text-stone-400 uppercase tracking-wide mb-2 shrink-0">
          {selectedLabel}
        </p>

        {selectedEntries.length === 0 ? (
          <p className="text-sm text-stone-400 my-auto text-center">
            No entries logged for this date.
          </p>
        ) : (
          <ul className="flex flex-col gap-2" data-testid="log-history-list">
            {selectedEntries.map(entry => (
              <li key={entry.id} className="bg-stone-50 rounded-2xl p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-ink">{formatTime(entry.createdAt)}</p>
                  <span className="shrink-0 px-2 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                    {entry.severity}/10
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  <span className="font-semibold text-ink">Site: </span>
                  {entry.site.map(s => bodySiteLabel[s]).join(', ') || '—'}
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  <span className="font-semibold text-ink">Character: </span>
                  {entry.character.map(c => characterLabel[c]).join(', ') || '—'}
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  <span className="font-semibold text-ink">Onset: </span>
                  {cycleRelationLabel[entry.onsetCycleRelation]}
                </p>
                <button
                  type="button"
                  onClick={() => onDelete(entry.id)}
                  className="mt-2 min-h-9 w-full rounded-full bg-stone-100 text-pink-700 text-xs font-semibold active:bg-stone-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
