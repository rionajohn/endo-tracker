import { describe, expect, it } from 'vitest'
import { generateWrappedSlides } from './wrapped'
import { makeEntry } from '../test/factory'
import type { SymptomEntry } from '../types'

function withId(entry: ReturnType<typeof makeEntry>, id: string): SymptomEntry {
  return { ...entry, id, createdAt: new Date().toISOString() }
}

describe('generateWrappedSlides', () => {
  it('ends on an encouragement slide when nothing is flagged', () => {
    const entries = [withId(makeEntry({ severity: 2 }), '1')]

    const slides = generateWrappedSlides(entries)
    const last = slides[slides.length - 1]

    expect(last.isFinal).toBe(true)
    expect(last.flagged).toBe(false)
    expect(last.title.toLowerCase()).not.toContain('gp')
  })

  it('ends on a "talk to your GP" slide when the log is flagged, without diagnosing', () => {
    const entries = [withId(makeEntry({ severity: 9 }), '1')]

    const slides = generateWrappedSlides(entries)
    const last = slides[slides.length - 1]

    expect(last.isFinal).toBe(true)
    expect(last.flagged).toBe(true)
    expect(last.title.toLowerCase()).toContain('gp')
    // Never claims the condition outright - only frames it as a pattern to discuss.
    expect(last.body.toLowerCase()).not.toContain('you have endometriosis')
    expect(last.body.toLowerCase()).not.toContain('you have this')
    expect(last.body.toLowerCase()).toContain('not a diagnosis')
  })

  it('uses plain language, not SOCRATES clinical terms', () => {
    const entries = [withId(makeEntry({ severity: 4 }), '1')]

    const slides = generateWrappedSlides(entries)
    const allText = slides.map((s) => `${s.title} ${s.body}`).join(' ').toLowerCase()

    expect(allText).not.toContain('socrates')
    expect(allText).not.toContain('radiation')
    expect(allText).not.toContain('exacerbating')
  })
})
