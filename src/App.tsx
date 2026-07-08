import { useEffect, useState } from 'react'
import PhoneFrame from './components/PhoneFrame'
import SymptomForm from './components/SymptomForm'
import LogHistory from './components/LogHistory'
import WrappedSlideshow from './components/WrappedSlideshow'
import GPReport from './components/GPReport'
import { deleteEntry, getEntries, saveEntry } from './lib/storage'
import type { NewSymptomEntry, SymptomEntry } from './types'

type Tab = 'log' | 'history' | 'wrapped' | 'report'

const TABS: { id: Tab; label: string }[] = [
  { id: 'log', label: 'Log' },
  { id: 'history', label: 'History' },
  { id: 'wrapped', label: 'Wrapped' },
  { id: 'report', label: 'GP report' },
]

function App() {
  const [tab, setTab] = useState<Tab>('log')
  const [entries, setEntries] = useState<SymptomEntry[]>([])

  useEffect(() => {
    setEntries(getEntries())
  }, [])

  function handleSave(entry: NewSymptomEntry) {
    saveEntry(entry)
    setEntries(getEntries())
    setTab('history')
  }

  function handleDelete(id: string) {
    deleteEntry(id)
    setEntries(getEntries())
  }

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto">
        {tab === 'log' && <SymptomForm onSave={handleSave} />}
        {tab === 'history' && <LogHistory entries={entries} onDelete={handleDelete} />}
        {tab === 'wrapped' && <WrappedSlideshow entries={entries} />}
        {tab === 'report' && <GPReport entries={entries} />}
      </div>

      <nav className="print:hidden shrink-0 p-4">
        <div className="flex gap-1 bg-ink rounded-full p-1.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 min-h-11 px-2 rounded-full text-xs font-semibold transition-colors ${
                tab === t.id ? 'bg-pink-300 text-ink' : 'text-stone-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </PhoneFrame>
  )
}

export default App
