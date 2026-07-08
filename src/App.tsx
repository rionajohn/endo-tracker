import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import PhoneFrame from './components/PhoneFrame'
import SymptomForm from './components/SymptomForm'
import CalendarScreen from './components/CalendarScreen'
import HomeScreen from './components/HomeScreen'
import CommunityScreen from './components/CommunityScreen'
import ProfileScreen from './components/ProfileScreen'
import { deleteEntry, getEntries, saveEntry } from './lib/storage'
import type { NewSymptomEntry, SymptomEntry } from './types'

type Screen = 'home' | 'calendar' | 'log' | 'community' | 'profile'

// --- Inline SVG icons (no icon-library dependency) ---

function HomeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function CommunityIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

// --- Nav configuration ---

interface NavItem {
  id: Screen
  label: string
  Icon: ComponentType
}

const LEFT_NAV: NavItem[] = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'calendar', label: 'Calendar', Icon: CalendarIcon },
]

const RIGHT_NAV: NavItem[] = [
  { id: 'community', label: 'Community', Icon: CommunityIcon },
  { id: 'profile', label: 'Profile', Icon: ProfileIcon },
]

// Screens that get a title header bar
const SCREEN_TITLE: Partial<Record<Screen, string>> = {
  calendar: 'Calendar',
  log: 'Log symptoms',
  community: 'Community',
  profile: 'Profile',
}

// --- App ---

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [entries, setEntries] = useState<SymptomEntry[]>([])

  useEffect(() => {
    setEntries(getEntries())
  }, [])

  function handleSave(entry: NewSymptomEntry) {
    saveEntry(entry)
    setEntries(getEntries())
    setScreen('calendar')
  }

  function handleDelete(id: string) {
    deleteEntry(id)
    setEntries(getEntries())
  }

  const title = SCREEN_TITLE[screen]

  return (
    <PhoneFrame>
      {/* Optional per-screen header */}
      {title && (
        <header className="shrink-0 px-4 pt-5 pb-3 border-b border-stone-100">
          <h1 className="text-lg font-extrabold text-ink tracking-tight">{title}</h1>
        </header>
      )}

      {/* Scrollable content — ONLY this region scrolls */}
      <main className="flex-1 overflow-y-auto">
        {screen === 'home'      && <HomeScreen onStartLogging={() => setScreen('log')} />}
        {screen === 'calendar'  && <CalendarScreen entries={entries} onDelete={handleDelete} />}
        {screen === 'log'       && <SymptomForm onSave={handleSave} />}
        {screen === 'community' && <CommunityScreen />}
        {screen === 'profile'   && <ProfileScreen />}
      </main>

      {/* Bottom navigation — floating pill, fixed to frame, never scrolls */}
      <nav className="relative shrink-0 print:hidden z-10">
        <div className="relative mx-4 mb-4">
          {/* Floating dark pill */}
          <div className="flex items-center bg-ink rounded-full h-14 px-3">
            {/* Left two items — icon only, no labels */}
            {LEFT_NAV.map(({ id, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setScreen(id)}
                className={`flex-1 flex items-center justify-center min-h-11 rounded-full transition-colors ${
                  screen === id ? 'text-white' : 'text-stone-500 active:text-stone-300'
                }`}
              >
                <Icon />
              </button>
            ))}

            {/* Centre spacer for the raised plus button */}
            <div className="flex-1" />

            {/* Right two items — icon only, no labels */}
            {RIGHT_NAV.map(({ id, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setScreen(id)}
                className={`flex-1 flex items-center justify-center min-h-11 rounded-full transition-colors ${
                  screen === id ? 'text-white' : 'text-stone-500 active:text-stone-300'
                }`}
              >
                <Icon />
              </button>
            ))}
          </div>

          {/* Ink-coloured ring — same colour as the pill, slightly larger,
              anchors the plus button visually as part of the nav bar */}
          <span className="absolute left-1/2 -translate-x-1/2 -top-7 w-16 h-16 rounded-full bg-ink pointer-events-none" />

          {/* Raised circular Log Symptoms button — sits inside the ring */}
          <button
            type="button"
            onClick={() => setScreen('log')}
            aria-label="Log symptoms"
            className={`absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors text-white ${
              screen === 'log' ? 'bg-pink-500' : 'bg-pink-400 active:bg-pink-500'
            }`}
          >
            <PlusIcon />
          </button>
        </div>
      </nav>
    </PhoneFrame>
  )
}

export default App
