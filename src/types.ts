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
