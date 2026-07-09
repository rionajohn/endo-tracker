// Shared vocabulary for the Baseline Questionnaire fields - a one-time
// intake, separate from the SOCRATES symptom log (see lib/socrates.ts).
import type {
  CycleRegularity,
  DigestiveSymptom,
  FamilyHistoryCondition,
  FunctionalImpactFrequency,
  HealthcareVisitCount,
  PainChangeOverTime,
  PainDurationBand,
  PainDuringBowelOrUrination,
  PainOnsetTiming,
  PainReliefEffect,
  SafetyFlag,
  UnrelatedPainFrequency,
  VisitOutcome,
  YesNo,
  YesNoUnsure,
} from '../types'

export const CYCLE_REGULARITIES: CycleRegularity[] = [
  'regular',
  'somewhat_variable',
  'very_unpredictable',
  'not_sure',
]

export const cycleRegularityLabel: Record<CycleRegularity, string> = {
  regular: 'Regular',
  somewhat_variable: 'Somewhat variable',
  very_unpredictable: 'Very unpredictable',
  not_sure: 'Not sure',
}

export const PAIN_ONSET_TIMINGS: PainOnsetTiming[] = [
  'few_days_before',
  'right_when_starts',
  'partway_through',
  'varies_a_lot',
]

export const painOnsetTimingLabel: Record<PainOnsetTiming, string> = {
  few_days_before: 'A few days before',
  right_when_starts: 'Right when period starts',
  partway_through: 'Partway through',
  varies_a_lot: 'Varies a lot',
}

export const PAIN_DURATION_BANDS: PainDurationBand[] = [
  'less_than_1_day',
  'one_to_two_days',
  'three_to_five_days',
  'more_than_5_days',
]

export const painDurationBandLabel: Record<PainDurationBand, string> = {
  less_than_1_day: 'Less than 1 day',
  one_to_two_days: '1-2 days',
  three_to_five_days: '3-5 days',
  more_than_5_days: 'More than 5 days',
}

export const UNRELATED_PAIN_FREQUENCIES: UnrelatedPainFrequency[] = [
  'yes_often',
  'yes_occasionally',
  'no_only_around_period',
  'not_sure',
]

export const unrelatedPainFrequencyLabel: Record<UnrelatedPainFrequency, string> = {
  yes_often: 'Yes, often',
  yes_occasionally: 'Yes, occasionally',
  no_only_around_period: 'No, only around my period',
  not_sure: 'Not sure',
}

export const PAIN_CHANGE_OVER_TIME: PainChangeOverTime[] = ['worse', 'same', 'improved', 'not_sure']

export const painChangeOverTimeLabel: Record<PainChangeOverTime, string> = {
  worse: 'Gotten worse',
  same: 'Stayed about the same',
  improved: 'Improved',
  not_sure: 'Not sure',
}

export const DIGESTIVE_SYMPTOMS: DigestiveSymptom[] = [
  'bloating',
  'diarrhoea',
  'constipation',
  'nausea_vomiting',
  'none',
]

export const digestiveSymptomLabel: Record<DigestiveSymptom, string> = {
  bloating: 'Bloating',
  diarrhoea: 'Diarrhoea',
  constipation: 'Constipation',
  nausea_vomiting: 'Nausea or vomiting',
  none: 'None of these',
}

export const PAIN_DURING_BOWEL_OR_URINATION: PainDuringBowelOrUrination[] = [
  'yes_regularly',
  'yes_occasionally',
  'no',
]

export const painDuringBowelOrUrinationLabel: Record<PainDuringBowelOrUrination, string> = {
  yes_regularly: 'Yes, regularly',
  yes_occasionally: 'Yes, occasionally',
  no: 'No',
}

export const YES_NO_UNSURE: YesNoUnsure[] = ['yes', 'no', 'not_sure']

export const yesNoUnsureLabel: Record<YesNoUnsure, string> = {
  yes: 'Yes',
  no: 'No',
  not_sure: 'Not sure',
}

export const PAIN_RELIEF_EFFECTS: PainReliefEffect[] = [
  'yes_fully',
  'helps_a_little',
  'no_help',
  'not_tried',
]

export const painReliefEffectLabel: Record<PainReliefEffect, string> = {
  yes_fully: 'Yes, fully',
  helps_a_little: 'Helps a little',
  no_help: "Doesn't help at all",
  not_tried: "Haven't tried it",
}

export const YES_NO: YesNo[] = ['yes', 'no']

export const yesNoLabel: Record<YesNo, string> = {
  yes: 'Yes',
  no: 'No',
}

export const FUNCTIONAL_IMPACT_FREQUENCIES: FunctionalImpactFrequency[] = [
  'never',
  'rarely',
  'sometimes',
  'often',
]

export const functionalImpactFrequencyLabel: Record<FunctionalImpactFrequency, string> = {
  never: 'Never',
  rarely: 'Rarely',
  sometimes: 'Sometimes',
  often: 'Often, most cycles',
}

export const HEALTHCARE_VISIT_COUNTS: HealthcareVisitCount[] = [
  'never',
  'one_to_two',
  'three_to_five',
  'six_plus',
]

export const healthcareVisitCountLabel: Record<HealthcareVisitCount, string> = {
  never: 'Never',
  one_to_two: '1-2 times',
  three_to_five: '3-5 times',
  six_plus: '6 or more times',
}

export const VISIT_OUTCOMES: VisitOutcome[] = [
  'told_normal',
  'ibs',
  'uti_bladder',
  'no_clear_answer',
  'referred_for_tests',
  'not_seen_yet',
]

export const visitOutcomeLabel: Record<VisitOutcome, string> = {
  told_normal: '"This is normal"',
  ibs: 'IBS',
  uti_bladder: 'UTI or bladder issue',
  no_clear_answer: 'No clear answer given',
  referred_for_tests: 'Referred for further tests',
  not_seen_yet: "Haven't been seen yet",
}

export const FAMILY_HISTORY_CONDITIONS: FamilyHistoryCondition[] = [
  'endometriosis',
  'pcos',
  'fibroids',
  'none',
  'not_sure',
]

export const familyHistoryConditionLabel: Record<FamilyHistoryCondition, string> = {
  endometriosis: 'Endometriosis',
  pcos: 'PCOS',
  fibroids: 'Fibroids',
  none: 'None that I know of',
  not_sure: 'Not sure',
}

export const SAFETY_FLAGS: SafetyFlag[] = [
  'fever',
  'fainting',
  'sudden_severe_one_sided',
  'heavy_bleeding_hourly',
  'none',
]

export const safetyFlagLabel: Record<SafetyFlag, string> = {
  fever: 'Fever alongside pain',
  fainting: 'Fainting',
  sudden_severe_one_sided: 'Sudden, severe one-sided pain',
  heavy_bleeding_hourly: 'Bleeding heavy enough to soak through protection hourly',
  none: 'None of these',
}
