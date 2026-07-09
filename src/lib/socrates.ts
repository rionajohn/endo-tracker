// Shared vocabulary for the SOCRATES fields: clinical labels (for the form and
// the GP report) and plain-language labels (for the patient-facing Wrapped
// slides). Both views read the same underlying SymptomEntry fields - see
// BRIEF.md, "Two audiences, one dataset".
import type {
  AssociatedSymptom,
  BodySite,
  CharacterTag,
  CycleRelation,
  MedicationResponse,
  RadiationSite,
} from '../types'

export const BODY_SITES: BodySite[] = ['pelvis', 'lower_back', 'bowel', 'bladder', 'during_or_after_sex']

export const bodySiteLabel: Record<BodySite, string> = {
  pelvis: 'Pelvis',
  lower_back: 'Lower back',
  bowel: 'Bowel',
  bladder: 'Bladder',
  during_or_after_sex: 'During or after sex',
}

export const CYCLE_RELATIONS: CycleRelation[] = ['around_period', 'cycle_not_period', 'unsure', 'no_relation']

export const cycleRelationLabel: Record<CycleRelation, string> = {
  around_period: 'Yes, around my period',
  cycle_not_period: 'Yes, but not around my period timing',
  unsure: 'Not sure',
  no_relation: 'No clear cycle relation',
}

export const characterLabel: Record<CharacterTag, string> = {
  cramping: 'Cramping',
  stabbing: 'Stabbing',
  burning: 'Burning',
  dull_ache: 'Dull ache',
  pain_with_bowel_movements: 'Pain with bowel movements',
  diarrhoea: 'Diarrhoea',
  constipation: 'Constipation',
  pain_when_urinating: 'Pain when urinating',
  urgency: 'Urgency',
  frequency: 'Frequency',
  deep_pain: 'Deep pain',
  ache_afterwards: 'Ache afterwards',
}

// Per-location descriptor options for Step 2 - each entry is either a
// Character descriptor or the one Radiation option ("Radiating to legs"
// under Lower back), so the checkbox rendering can write to the right
// SymptomEntry field per item.
export type LocationDescriptorOption =
  | { kind: 'character'; value: CharacterTag; label: string }
  | { kind: 'radiation'; value: Extract<RadiationSite, 'legs'>; label: string }

export const LOCATION_DESCRIPTORS: Record<BodySite, LocationDescriptorOption[]> = {
  pelvis: [
    { kind: 'character', value: 'cramping', label: characterLabel.cramping },
    { kind: 'character', value: 'stabbing', label: characterLabel.stabbing },
    { kind: 'character', value: 'burning', label: characterLabel.burning },
    { kind: 'character', value: 'dull_ache', label: characterLabel.dull_ache },
  ],
  lower_back: [
    { kind: 'character', value: 'cramping', label: characterLabel.cramping },
    { kind: 'character', value: 'dull_ache', label: characterLabel.dull_ache },
    { kind: 'radiation', value: 'legs', label: 'Radiating to legs' },
  ],
  bowel: [
    { kind: 'character', value: 'pain_with_bowel_movements', label: characterLabel.pain_with_bowel_movements },
    { kind: 'character', value: 'diarrhoea', label: characterLabel.diarrhoea },
    { kind: 'character', value: 'constipation', label: characterLabel.constipation },
  ],
  bladder: [
    { kind: 'character', value: 'pain_when_urinating', label: characterLabel.pain_when_urinating },
    { kind: 'character', value: 'urgency', label: characterLabel.urgency },
    { kind: 'character', value: 'frequency', label: characterLabel.frequency },
  ],
  during_or_after_sex: [
    { kind: 'character', value: 'deep_pain', label: characterLabel.deep_pain },
    { kind: 'character', value: 'ache_afterwards', label: characterLabel.ache_afterwards },
  ],
}

export const ASSOCIATED_SYMPTOMS: AssociatedSymptom[] = ['bloating', 'nausea', 'fatigue', 'dizziness', 'bleeding']

export const associatedSymptomLabel: Record<AssociatedSymptom, string> = {
  bloating: 'Bloating',
  nausea: 'Nausea',
  fatigue: 'Fatigue',
  dizziness: 'Dizziness',
  bleeding: 'Bleeding',
}

export const radiationLabel: Record<RadiationSite, string> = {
  legs: 'Radiating to legs',
  none: "Doesn't spread anywhere else",
}

export const MEDICATION_RESPONSES: MedicationResponse[] = ['helped', 'partly', 'no_effect']

export const medicationResponseLabel: Record<MedicationResponse, string> = {
  helped: 'Helped',
  partly: 'Partly',
  no_effect: 'No effect',
}
