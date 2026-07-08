import type { NewSymptomEntry } from '../types'

/** Builds a minimal valid entry for tests, with overrides applied on top. */
export function makeEntry(overrides: Partial<NewSymptomEntry> = {}): NewSymptomEntry {
  return {
    site: ['pelvis'],
    onsetType: 'gradual',
    onsetCycleRelation: 'no_pattern',
    character: ['cramping'],
    associatedSymptoms: [],
    radiation: ['none'],
    timingDuration: 'hours',
    timingPattern: 'intermittent',
    exacerbatingFactors: [],
    relievingFactors: [],
    nsaidResponse: 'not_tried',
    severity: 3,
    ...overrides,
  }
}
