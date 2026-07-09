// SOCRATES data model: Site, Onset, Character, Radiation, Timing,
// Exacerbating/relieving factors, Severity. Every symptom log must capture all
// seven fields in full, regardless of how they are later presented to the
// patient or GP (see BRIEF.md, "Two audiences, one dataset").

export type CycleRelation =
  | 'before_period'
  | 'during_period'
  | 'after_period'
  | 'ovulation'
  | 'no_pattern'
  | 'unsure'

export type OnsetType = 'sudden' | 'gradual'

export type CharacterTag =
  | 'cramping'
  | 'sharp'
  | 'stabbing'
  | 'burning'
  | 'dull_ache'
  | 'throbbing'

export type AssociatedSymptom =
  | 'nausea'
  | 'bloating'
  | 'fatigue'
  | 'dizziness'
  | 'painful_bowel_movements'
  | 'painful_urination'
  | 'heavy_bleeding'

export type RadiationSite = 'lower_back' | 'legs' | 'rectum' | 'vagina' | 'none'

export type TimingPattern = 'constant' | 'intermittent'

export type TimingDuration = 'minutes' | 'hours' | 'days' | 'constant'

export type ExacerbatingFactor = 'movement' | 'sex' | 'bowel_movements' | 'urination' | 'exercise'

export type RelievingFactor = 'rest' | 'heat' | 'nsaids' | 'hormonal_contraception'

export type NsaidResponse = 'not_tried' | 'no_relief' | 'partial_relief' | 'full_relief'

export type BodySite =
  | 'pelvis'
  | 'lower_back'
  | 'abdomen_left'
  | 'abdomen_right'
  | 'legs'
  | 'rectum'

export interface SymptomEntry {
  id: string
  createdAt: string // ISO timestamp

  // Site: where the pain is felt.
  site: BodySite[]
  siteOther?: string

  // Onset: how it started, and its relationship to the menstrual cycle.
  onsetType: OnsetType
  onsetCycleRelation: CycleRelation

  // Character: what the pain feels like, plus other symptoms felt alongside it.
  character: CharacterTag[]
  characterOther?: string
  associatedSymptoms: AssociatedSymptom[]

  // Radiation: where the pain spreads to.
  radiation: RadiationSite[]
  radiationOther?: string

  // Timing: how long it lasts and how it recurs.
  timingDuration: TimingDuration
  timingPattern: TimingPattern
  timingCycleDay?: number

  // Exacerbating/relieving factors: what makes it worse or better, including
  // response to NSAIDs, which is a specific marker of drug-resistant pain.
  exacerbatingFactors: ExacerbatingFactor[]
  relievingFactors: RelievingFactor[]
  nsaidResponse: NsaidResponse

  // Severity: self-reported pain intensity, 0 (none) - 10 (worst possible).
  severity: number
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
