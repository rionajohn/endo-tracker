import { beforeEach, describe, expect, it } from 'vitest'
import { clearEntries, getEntries, getEntry, saveEntry, deleteEntry } from './storage'
import { makeEntry } from '../test/factory'

beforeEach(() => {
  clearEntries()
})

describe('storage', () => {
  it('saves an entry and round-trips every field of the 3-step check-in', () => {
    const input = makeEntry({
      site: ['pelvis', 'lower_back'], // Site
      onsetType: 'sudden', // Onset
      onsetCycleRelation: 'around_period',
      character: ['cramping', 'stabbing'], // Character
      associatedSymptoms: ['nausea', 'bloating'],
      bleedingOutsideWindow: 'no', // Timing
      radiation: ['legs'], // Radiation
      medicationTaken: 'ibuprofen 400mg', // Exacerbating/relieving factors
      medicationResponse: 'partly',
      severity: 8, // Severity
      functionalImpact: 'some',
      otherSymptomsNotes: 'mild headache too',
    })

    const saved = saveEntry(input)
    const loaded = getEntry(saved.id)

    expect(loaded).toBeDefined()
    expect(loaded?.site).toEqual(['pelvis', 'lower_back'])
    expect(loaded?.onsetType).toBe('sudden')
    expect(loaded?.onsetCycleRelation).toBe('around_period')
    expect(loaded?.character).toEqual(['cramping', 'stabbing'])
    expect(loaded?.associatedSymptoms).toEqual(['nausea', 'bloating'])
    expect(loaded?.bleedingOutsideWindow).toBe('no')
    expect(loaded?.radiation).toEqual(['legs'])
    expect(loaded?.medicationTaken).toBe('ibuprofen 400mg')
    expect(loaded?.medicationResponse).toBe('partly')
    expect(loaded?.severity).toBe(8)
    expect(loaded?.functionalImpact).toBe('some')
    expect(loaded?.otherSymptomsNotes).toBe('mild headache too')
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
