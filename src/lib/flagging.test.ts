import { describe, expect, it } from 'vitest'
import { evaluateFlags } from './flagging'
import { makeEntry } from '../test/factory'
import type { SymptomEntry } from '../types'

function withId(entry: ReturnType<typeof makeEntry>, id: string): SymptomEntry {
  return { ...entry, id, createdAt: new Date().toISOString() }
}

describe('evaluateFlags', () => {
  it('does not flag a log of mild, non-cyclical entries', () => {
    const entries = [
      withId(makeEntry({ severity: 2 }), '1'),
      withId(makeEntry({ severity: 3 }), '2'),
    ]

    const result = evaluateFlags(entries)

    expect(result.flagged).toBe(false)
    expect(result.reasons).toHaveLength(0)
  })

  it('flags on a single very severe entry', () => {
    const entries = [withId(makeEntry({ severity: 9 }), '1')]

    const result = evaluateFlags(entries)

    expect(result.flagged).toBe(true)
    expect(result.reasons.map((r) => r.code)).toContain('high_severity')
  })

  it('flags on NSAID non-response with clinically significant pain', () => {
    const entries = [withId(makeEntry({ severity: 6, nsaidResponse: 'no_relief' }), '1')]

    const result = evaluateFlags(entries)

    expect(result.flagged).toBe(true)
    expect(result.reasons.map((r) => r.code)).toContain('nsaid_non_response')
  })

  it('does not flag NSAID non-response when pain is mild', () => {
    const entries = [withId(makeEntry({ severity: 2, nsaidResponse: 'no_relief' }), '1')]

    const result = evaluateFlags(entries)

    expect(result.reasons.map((r) => r.code)).not.toContain('nsaid_non_response')
  })

  it('flags a repeating cycle-linked pattern across 3+ entries', () => {
    const entries = [
      withId(makeEntry({ onsetCycleRelation: 'during_period', severity: 4 }), '1'),
      withId(makeEntry({ onsetCycleRelation: 'before_period', severity: 4 }), '2'),
      withId(makeEntry({ onsetCycleRelation: 'ovulation', severity: 4 }), '3'),
    ]

    const result = evaluateFlags(entries)

    expect(result.flagged).toBe(true)
    expect(result.reasons.map((r) => r.code)).toContain('cyclical_pattern')
  })

  it('does not flag a cyclical pattern from only 2 entries', () => {
    const entries = [
      withId(makeEntry({ onsetCycleRelation: 'during_period', severity: 4 }), '1'),
      withId(makeEntry({ onsetCycleRelation: 'before_period', severity: 4 }), '2'),
    ]

    const result = evaluateFlags(entries)

    expect(result.reasons.map((r) => r.code)).not.toContain('cyclical_pattern')
  })

  it('flags repeated bowel/bladder involvement as possible deep endometriosis', () => {
    const entries = [
      withId(makeEntry({ associatedSymptoms: ['painful_bowel_movements'], severity: 4 }), '1'),
      withId(makeEntry({ associatedSymptoms: ['painful_urination'], severity: 4 }), '2'),
    ]

    const result = evaluateFlags(entries)

    expect(result.flagged).toBe(true)
    expect(result.reasons.map((r) => r.code)).toContain('possible_deep_endometriosis')
  })
})
