import type { NewSymptomEntry } from '../types'

/** Builds a minimal valid entry for tests, with overrides applied on top. */
export function makeEntry(overrides: Partial<NewSymptomEntry> = {}): NewSymptomEntry {
  return {
    site: ['pelvis'],
    onsetType: 'gradual',
    onsetCycleRelation: 'unsure',
    character: ['cramping'],
    associatedSymptoms: [],
    radiation: ['none'],
    severity: 3,
    functionalImpact: 'none',
    ...overrides,
  }
}
