import type { NewSymptomEntry, SymptomEntry } from '../types'

const STORAGE_KEY = 'endo-tracker:entries'

function readRaw(): SymptomEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeRaw(entries: SymptomEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

/** All logged entries, most recent first. Ties (same timestamp) fall back to insertion order. */
export function getEntries(): SymptomEntry[] {
  return readRaw().reverse().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function getEntry(id: string): SymptomEntry | undefined {
  return readRaw().find((e) => e.id === id)
}

export function saveEntry(entry: NewSymptomEntry): SymptomEntry {
  const full: SymptomEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const entries = readRaw()
  entries.push(full)
  writeRaw(entries)
  return full
}

export function deleteEntry(id: string): void {
  writeRaw(readRaw().filter((e) => e.id !== id))
}

export function clearEntries(): void {
  localStorage.removeItem(STORAGE_KEY)
}
