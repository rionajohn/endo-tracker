import type { SymptomEntry } from '../types'
import { evaluateFlags } from './flagging'
import { characterLabel, cycleRelationLabel, bodySiteLabel } from './socrates'

export interface WrappedSlide {
  title: string
  body: string
  /** The closing slide carries the GP recommendation and is styled distinctly. */
  isFinal?: boolean
  flagged?: boolean
}

function mostFrequent<T extends string>(items: T[]): T | undefined {
  if (items.length === 0) return undefined
  const counts = new Map<T, number>()
  for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0]
}

/**
 * Builds the plain-language, one-idea-per-slide "Wrapped" deck from the same
 * logged entries used for the GP report. See BRIEF.md, "Two audiences, one
 * dataset" - no clinical terminology here, and never phrased as a diagnosis.
 */
export function generateWrappedSlides(entries: SymptomEntry[]): WrappedSlide[] {
  if (entries.length === 0) {
    return [
      {
        title: "You haven't logged anything yet",
        body: 'Log a symptom to start building your pattern.',
        isFinal: true,
        flagged: false,
      },
    ]
  }

  const slides: WrappedSlide[] = []

  slides.push({
    title: 'Your pattern so far',
    body: `You've logged ${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}. Here's what stands out.`,
  })

  const topSite = mostFrequent(entries.flatMap((e) => e.site))
  if (topSite) {
    slides.push({
      title: 'Where it hurts most',
      body: `Most often, you've felt it in your ${bodySiteLabel[topSite].toLowerCase()}.`,
    })
  }

  const topCycleRelation = mostFrequent(entries.map((e) => e.onsetCycleRelation))
  if (topCycleRelation && topCycleRelation !== 'unsure' && topCycleRelation !== 'no_relation') {
    slides.push({
      title: 'When it happens',
      body: `Most of your pain shows up: ${cycleRelationLabel[topCycleRelation].toLowerCase()}.`,
    })
  }

  const topCharacter = mostFrequent(entries.flatMap((e) => e.character))
  if (topCharacter) {
    slides.push({
      title: 'What it feels like',
      body: `You most often describe the pain as ${characterLabel[topCharacter].toLowerCase()}.`,
    })
  }

  const maxSeverity = Math.max(...entries.map((e) => e.severity))
  slides.push({
    title: 'How bad it gets',
    body: `On your worst days, you've rated the pain ${maxSeverity} out of 10.`,
  })

  // Medication (entry.medicationTaken/medicationResponse) is GP-report-only
  // and must never be summarised or scored here - see types.ts.

  const { flagged, reasons } = evaluateFlags(entries)

  if (flagged) {
    slides.push({
      title: 'Worth talking to your GP',
      body: `${reasons.map((r) => r.patientText).join(' ')} This looks like a pattern worth discussing with your GP - not a diagnosis, but something worth raising.`,
      isFinal: true,
      flagged: true,
    })
  } else {
    slides.push({
      title: 'Keep logging',
      body: "You don't have a strong pattern flagged yet - keep logging so we can help you build one.",
      isFinal: true,
      flagged: false,
    })
  }

  return slides
}
