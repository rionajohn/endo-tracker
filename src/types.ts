// SOCRATES data model: Site, Onset, Character, Radiation, Timing,
// Exacerbating/relieving factors, Severity. Every symptom log must capture all
// seven fields in full, regardless of how they are later presented to the
// patient or GP (see BRIEF.md, "Two audiences, one dataset").
//
// The daily log is a 3-step check-in (see SymptomForm.tsx) rather than one
// long SOCRATES-labelled form, so each category below is represented by
// whatever the check-in actually asks for it - see the field-by-field
// comments for the mapping.

// Onset - Step 1's lightweight "how did it start / cycle link" add-on.
export type OnsetType = 'sudden' | 'gradual'

export type CycleRelation = 'around_period' | 'cycle_not_period' | 'unsure' | 'no_relation'

// Site - Step 2's pain locations.
export type BodySite = 'pelvis' | 'lower_back' | 'bowel' | 'bladder' | 'during_or_after_sex'

// Character - Step 2's per-location descriptors (flattened across every
// selected location; SOCRATES doesn't track descriptors per-site).
export type CharacterTag =
  | 'cramping'
  | 'stabbing'
  | 'burning'
  | 'dull_ache'
  | 'pain_with_bowel_movements'
  | 'diarrhoea'
  | 'constipation'
  | 'pain_when_urinating'
  | 'urgency'
  | 'frequency'
  | 'deep_pain'
  | 'ache_afterwards'

// Whole-body symptoms - Step 2, not tied to a specific location.
export type AssociatedSymptom = 'bloating' | 'nausea' | 'fatigue' | 'dizziness' | 'bleeding'

// Radiation - Step 2's "radiating to legs" option under Lower back.
export type RadiationSite = 'legs' | 'none'

// Functional impact - Step 3. Not one of the seven SOCRATES categories, but a
// NICE-aligned signal already used elsewhere in the app (see
// BaselineQuestionnaire's missedActivitiesFrequency).
export type FunctionalImpactLevel = 'none' | 'some' | 'most'

// Medication response - Step 3.
export type MedicationResponse = 'helped' | 'partly' | 'no_effect'

export interface SymptomEntry {
  id: string
  createdAt: string // ISO timestamp

  // Site (Step 2: pain locations).
  site: BodySite[]

  // Onset (Step 1 add-on): how today's pain started, and its relationship to
  // the cycle.
  onsetType: OnsetType
  onsetCycleRelation: CycleRelation

  // Character (Step 2: per-location descriptors) plus whole-body symptoms.
  character: CharacterTag[]
  associatedSymptoms: AssociatedSymptom[]

  // Timing (Step 2): whether logged bleeding fell outside the expected
  // period window. Only present when "Bleeding" is among associatedSymptoms.
  bleedingOutsideWindow?: YesNo

  // Radiation (Step 2): "radiating to legs" under the Lower back location.
  radiation: RadiationSite[]

  // Exacerbating/relieving factors (Step 3): medication taken today and its
  // effect. GP-report-only - see SymptomForm/GPReport - this must never
  // factor into evaluateFlags or any other scoring logic.
  medicationTaken?: string
  medicationResponse?: MedicationResponse

  // Severity (Step 1): self-reported pain intensity for the day, 0 (none) -
  // 10 (worst possible).
  severity: number

  // Functional impact (Step 3): how much today's symptoms affected daily
  // activities.
  functionalImpact: FunctionalImpactLevel

  // Free text for anything not covered above (e.g. headaches, spotting).
  // GP-report-only - must never factor into evaluateFlags or any other
  // scoring logic.
  otherSymptomsNotes?: string
}

export type NewSymptomEntry = Omit<SymptomEntry, 'id' | 'createdAt'>

// --- Baseline Questionnaire ---
// A one-time structured intake, separate from the per-entry SOCRATES symptom
// log above. Establishes a personal baseline for later comparison - keep
// this structurally and visually separate from symptom logging (see
// CLAUDE.md).

export type CycleRegularity = 'regular' | 'somewhat_variable' | 'very_unpredictable' | 'not_sure'

export type PainOnsetTiming =
  | 'few_days_before'
  | 'right_when_starts'
  | 'partway_through'
  | 'varies_a_lot'

export type PainDurationBand =
  | 'less_than_1_day'
  | 'one_to_two_days'
  | 'three_to_five_days'
  | 'more_than_5_days'

export type UnrelatedPainFrequency =
  | 'yes_often'
  | 'yes_occasionally'
  | 'no_only_around_period'
  | 'not_sure'

export type PainChangeOverTime = 'worse' | 'same' | 'improved' | 'not_sure'

export type DigestiveSymptom = 'bloating' | 'diarrhoea' | 'constipation' | 'nausea_vomiting' | 'none'

export type PainDuringBowelOrUrination = 'yes_regularly' | 'yes_occasionally' | 'no'

export type YesNoUnsure = 'yes' | 'no' | 'not_sure'

export type PainReliefEffect = 'yes_fully' | 'helps_a_little' | 'no_help' | 'not_tried'

export type YesNo = 'yes' | 'no'

export type FunctionalImpactFrequency = 'never' | 'rarely' | 'sometimes' | 'often'

export type HealthcareVisitCount = 'never' | 'one_to_two' | 'three_to_five' | 'six_plus'

export type VisitOutcome =
  | 'told_normal'
  | 'ibs'
  | 'uti_bladder'
  | 'no_clear_answer'
  | 'referred_for_tests'
  | 'not_seen_yet'

export type FamilyHistoryCondition = 'endometriosis' | 'pcos' | 'fibroids' | 'none' | 'not_sure'

// Red-flag symptoms surfaced immediately in the UI - not a diagnostic tool,
// just a prompt to seek urgent care (see CLAUDE.md on never phrasing output
// as a diagnosis).
export type SafetyFlag =
  | 'fever'
  | 'fainting'
  | 'sudden_severe_one_sided'
  | 'heavy_bleeding_hourly'
  | 'none'

export interface BaselineQuestionnaire {
  id: string
  completedAt: string // ISO timestamp

  // About you and cycle history
  currentAge: number
  ageAtFirstPeriod: number
  typicalCycleLengthDays: number
  typicalPeriodLengthDays: number
  cycleRegularity: CycleRegularity

  // Baseline pain profile
  typicalPainSeverity: number // 0-10
  painOnsetTiming: PainOnsetTiming
  painDurationBand: PainDurationBand
  unrelatedPainFrequency: UnrelatedPainFrequency
  painChangeOverTime: PainChangeOverTime

  // Digestive and urinary history
  digestiveSymptoms: DigestiveSymptom[]
  painDuringBowelOrUrination: PainDuringBowelOrUrination
  diagnosedIbsUtiOrSimilar: YesNoUnsure

  // Pain relief history
  standardPainReliefEffect: PainReliefEffect
  everPrescribedForPainOrCycle: YesNo

  // Functional impact
  missedActivitiesFrequency: FunctionalImpactFrequency

  // Healthcare history
  healthcareVisitCount: HealthcareVisitCount
  visitOutcomes: VisitOutcome[]
  everDismissed: YesNoUnsure
  hadTestsOrScans: YesNo

  // Family and risk history
  familyHistory: FamilyHistoryCondition[]

  // Cycle onset context
  ageWhenPainBecameProblem: number

  // Safety check
  safetyFlags: SafetyFlag[]
}

export type NewBaselineQuestionnaire = Omit<BaselineQuestionnaire, 'id' | 'completedAt'>
