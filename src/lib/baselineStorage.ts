import type { BaselineQuestionnaire, NewBaselineQuestionnaire } from '../types'

const STORAGE_KEY = 'endo-tracker:baseline'

/** The single baseline record, or null if not yet completed. */
export function getBaseline(): BaselineQuestionnaire | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as BaselineQuestionnaire
  } catch {
    return null
  }
}

/** Saves the baseline, overwriting any previous one (it's a single record, editable in place). */
export function saveBaseline(record: NewBaselineQuestionnaire): BaselineQuestionnaire {
  const existing = getBaseline()
  const full: BaselineQuestionnaire = {
    ...record,
    id: existing?.id ?? crypto.randomUUID(),
    completedAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(full))
  return full
}

export function clearBaseline(): void {
  localStorage.removeItem(STORAGE_KEY)
}
