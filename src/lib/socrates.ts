// Shared vocabulary for the SOCRATES fields: clinical labels (for the form and
// the GP report) and plain-language labels (for the patient-facing Wrapped
// slides). Both views read the same underlying SymptomEntry fields - see
// BRIEF.md, "Two audiences, one dataset".
import type {
  AssociatedSymptom,
  BodySite,
  CharacterTag,
  CycleRelation,
  ExacerbatingFactor,
  NsaidResponse,
  RadiationSite,
  RelievingFactor,
  TimingDuration,
} from '../types'

export const BODY_SITES: BodySite[] = [
  'pelvis',
  'lower_back',
  'abdomen_left',
  'abdomen_right',
  'legs',
  'rectum',
]

export const bodySiteLabel: Record<BodySite, string> = {
  pelvis: 'Pelvis',
  lower_back: 'Lower back',
  abdomen_left: 'Lower abdomen (left)',
  abdomen_right: 'Lower abdomen (right)',
  legs: 'Legs',
  rectum: 'Rectum/back passage',
}

export const CYCLE_RELATIONS: CycleRelation[] = [
  'before_period',
  'during_period',
  'after_period',
  'ovulation',
  'no_pattern',
  'unsure',
]

export const cycleRelationLabel: Record<CycleRelation, string> = {
  before_period: 'In the days before my period',
  during_period: 'During my period',
  after_period: 'In the days after my period',
  ovulation: 'Around ovulation (mid-cycle)',
  no_pattern: 'No link to my cycle',
  unsure: "I'm not sure",
}

export const CHARACTER_TAGS: CharacterTag[] = [
  'cramping',
  'sharp',
  'stabbing',
  'burning',
  'dull_ache',
  'throbbing',
]

export const characterLabel: Record<CharacterTag, string> = {
  cramping: 'Cramping',
  sharp: 'Sharp',
  stabbing: 'Stabbing',
  burning: 'Burning',
  dull_ache: 'Dull ache',
  throbbing: 'Throbbing',
}

export const ASSOCIATED_SYMPTOMS: AssociatedSymptom[] = [
  'nausea',
  'bloating',
  'fatigue',
  'dizziness',
  'painful_bowel_movements',
  'painful_urination',
  'heavy_bleeding',
]

export const associatedSymptomLabel: Record<AssociatedSymptom, string> = {
  nausea: 'Nausea',
  bloating: 'Bloating',
  fatigue: 'Fatigue',
  dizziness: 'Dizziness',
  painful_bowel_movements: 'Pain when passing a bowel motion',
  painful_urination: 'Pain when passing urine',
  heavy_bleeding: 'Heavy bleeding',
}

export const RADIATION_SITES: RadiationSite[] = ['lower_back', 'legs', 'rectum', 'vagina', 'none']

export const radiationLabel: Record<RadiationSite, string> = {
  lower_back: 'Lower back',
  legs: 'Down the legs',
  rectum: 'Towards the rectum/back passage',
  vagina: 'Towards the vagina',
  none: "Doesn't spread anywhere else",
}

export const TIMING_DURATIONS: TimingDuration[] = ['minutes', 'hours', 'days', 'constant']

export const timingDurationLabel: Record<TimingDuration, string> = {
  minutes: 'Minutes',
  hours: 'Hours',
  days: 'Days',
  constant: 'Constant, doesn\'t go away',
}

export const EXACERBATING_FACTORS: ExacerbatingFactor[] = [
  'movement',
  'sex',
  'bowel_movements',
  'urination',
  'exercise',
]

export const exacerbatingFactorLabel: Record<ExacerbatingFactor, string> = {
  movement: 'Moving around',
  sex: 'Sex',
  bowel_movements: 'Bowel movements',
  urination: 'Passing urine',
  exercise: 'Exercise',
}

export const RELIEVING_FACTORS: RelievingFactor[] = ['rest', 'heat', 'nsaids', 'hormonal_contraception']

export const relievingFactorLabel: Record<RelievingFactor, string> = {
  rest: 'Rest',
  heat: 'Heat (e.g. hot water bottle)',
  nsaids: 'Painkillers (NSAIDs, e.g. ibuprofen)',
  hormonal_contraception: 'Hormonal contraception',
}

export const nsaidResponseLabel: Record<NsaidResponse, string> = {
  not_tried: "Haven't tried NSAIDs",
  no_relief: 'No relief at all',
  partial_relief: 'Some relief, but pain continues',
  full_relief: 'Fully relieved',
}
