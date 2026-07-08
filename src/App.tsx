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

      <nav className="print:hidden flex border-t border-neutral-200 shrink-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 min-h-11 py-2 text-xs font-medium ${
              tab === t.id ? 'text-purple-700 bg-purple-50' : 'text-neutral-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </PhoneFrame>
  )
}

export default App
