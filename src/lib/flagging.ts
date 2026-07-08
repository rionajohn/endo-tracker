import type { SymptomEntry } from '../types'

/**
 * ============================================================================
 * PLACEHOLDER CLINICAL THRESHOLDS - PENDING CLINICAL REVIEW
 * ============================================================================
 * The thresholds and rules below are a first-pass approximation of the
 * referral logic in NICE guideline NG73 ("Endometriosis: diagnosis and
 * management"), which recommends considering referral/investigation when
 * pain is not managed effectively by simple analgesia (e.g. NSAIDs), when
 * pain is cyclical and impacts quality of life, and treating cyclical bowel
 * or bladder symptoms (suggestive of possible deep endometriosis) as
 * warranting more urgent assessment.
 *
 * These exact numeric thresholds (severity cut-offs, repeat counts) are NOT
 * taken verbatim from NG73 - NG73 does not specify numeric pain scores. They
 * are a reasonable MVP interpretation only and MUST be reviewed and signed
 * off by a clinician before this logic is used outside a demo/prototype
 * context. Do not treat this module as validated medical advice.
 * ============================================================================
 */

export type FlagReasonCode =
  | 'high_severity'
  | 'nsaid_non_response'
  | 'cyclical_pattern'
  | 'possible_deep_endometriosis'

export interface FlagReason {
  code: FlagReasonCode
  /** Clinical-register explanation, for the GP report. */
  clinicalText: string
  /** Plain-language explanation, for the patient-facing Wrapped slides. */
  patientText: string
}

export interface FlagResult {
  flagged: boolean
  reasons: FlagReason[]
}

const SEVERE_PAIN_THRESHOLD = 8 // out of 10
const NSAID_NON_RESPONSE_SEVERITY_THRESHOLD = 5 // out of 10
const CYCLICAL_PATTERN_MIN_ENTRIES = 3
const BOWEL_BLADDER_MIN_ENTRIES = 2

const CYCLE_LINKED = new Set(['before_period', 'during_period', 'ovulation'])

/**
 * Evaluates the full log history against the placeholder threshold rules
 * above and returns whether the log, as a whole, crosses a "consider seeing
 * your GP" threshold, plus the specific reasons why.
 */
export function evaluateFlags(entries: SymptomEntry[]): FlagResult {
  const reasons: FlagReason[] = []

  if (entries.some((e) => e.severity >= SEVERE_PAIN_THRESHOLD)) {
    reasons.push({
      code: 'high_severity',
      clinicalText: `At least one entry recorded severity >= ${SEVERE_PAIN_THRESHOLD}/10.`,
      patientText: "You've logged pain at the very severe end of the scale.",
    })
  }

  if (
    entries.some(
      (e) => e.nsaidResponse === 'no_relief' && e.severity >= NSAID_NON_RESPONSE_SEVERITY_THRESHOLD,
    )
  ) {
    reasons.push({
      code: 'nsaid_non_response',
      clinicalText: 'NSAID non-response reported alongside clinically significant pain severity.',
      patientText: "Painkillers haven't been touching the pain when it's bad.",
    })
  }

  const cycleLinkedCount = entries.filter((e) => CYCLE_LINKED.has(e.onsetCycleRelation)).length
  if (cycleLinkedCount >= CYCLICAL_PATTERN_MIN_ENTRIES) {
    reasons.push({
      code: 'cyclical_pattern',
      clinicalText: `${cycleLinkedCount} entries show pain onset linked to menstrual cycle phase (pre-menstrual, menstrual, or ovulatory).`,
      patientText: "You've logged a repeating pattern of pain linked to your cycle.",
    })
  }

  const bowelBladderCount = entries.filter((e) =>
    e.associatedSymptoms.some((s) => s === 'painful_bowel_movements' || s === 'painful_urination'),
  ).length
  if (bowelBladderCount >= BOWEL_BLADDER_MIN_ENTRIES) {
    reasons.push({
      code: 'possible_deep_endometriosis',
      clinicalText: `${bowelBladderCount} entries report cyclical bowel/bladder symptoms (dyschezia/dysuria), which NICE NG73 flags as warranting more urgent assessment for possible deep endometriosis.`,
      patientText: "You've repeatedly logged pain when using the bathroom - that's worth flagging specifically.",
    })
  }

  return { flagged: reasons.length > 0, reasons }
}
