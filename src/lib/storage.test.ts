import { beforeEach, describe, expect, it } from 'vitest'
import { clearEntries, getEntries, getEntry, saveEntry, deleteEntry } from './storage'
import { makeEntry } from '../test/factory'

beforeEach(() => {
  clearEntries()
})

describe('storage', () => {
  it('saves an entry and round-trips all seven SOCRATES fields', () => {
    const input = makeEntry({
      site: ['pelvis', 'lower_back'], // Site
      onsetType: 'sudden', // Onset
      onsetCycleRelation: 'during_period',
      character: ['cramping', 'stabbing'], // Character
      associatedSymptoms: ['nausea', 'bloating'],
      radiation: ['legs', 'rectum'], // Radiation
      timingDuration: 'hours', // Timing
      timingPattern: 'intermittent',
      timingCycleDay: 2,
      exacerbatingFactors: ['movement', 'bowel_movements'], // Exacerbating factors
      relievingFactors: ['heat'], // Relieving factors
      nsaidResponse: 'no_relief',
      severity: 8, // Severity
    })

    const saved = saveEntry(input)
    const loaded = getEntry(saved.id)

    expect(loaded).toBeDefined()
    expect(loaded?.site).toEqual(['pelvis', 'lower_back'])
    expect(loaded?.onsetType).toBe('sudden')
    expect(loaded?.onsetCycleRelation).toBe('during_period')
    expect(loaded?.character).toEqual(['cramping', 'stabbing'])
    expect(loaded?.associatedSymptoms).toEqual(['nausea', 'bloating'])
    expect(loaded?.radiation).toEqual(['legs', 'rectum'])
    expect(loaded?.timingDuration).toBe('hours')
    expect(loaded?.timingPattern).toBe('intermittent')
    expect(loaded?.timingCycleDay).toBe(2)
    expect(loaded?.exacerbatingFactors).toEqual(['movement', 'bowel_movements'])
    expect(loaded?.relievingFactors).toEqual(['heat'])
    expect(loaded?.nsaidResponse).toBe('no_relief')
    expect(loaded?.severity).toBe(8)
    expect(loaded?.id).toBeTruthy()
    expect(loaded?.createdAt).toBeTruthy()
  })

  it('lists entries most-recent-first', () => {
    const first = saveEntry(makeEntry({ severity: 1 }))
    const second = saveEntry(makeEntry({ severity: 2 }))

    const entries = getEntries()

    expect(entries[0].id).toBe(second.id)
    expect(entries[1].id).toBe(first.id)
  })

  it('deletes an entry', () => {
    const saved = saveEntry(makeEntry())

    deleteEntry(saved.id)

    expect(getEntry(saved.id)).toBeUndefined()
    expect(getEntries()).toHaveLength(0)
  })
})
