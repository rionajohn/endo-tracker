import { useState } from 'react'
import type {
  AssociatedSymptom,
  BodySite,
  CharacterTag,
  CycleRelation,
  ExacerbatingFactor,
  NewSymptomEntry,
  NsaidResponse,
  OnsetType,
  RadiationSite,
  RelievingFactor,
  TimingDuration,
  TimingPattern,
} from '../types'
import {
  ASSOCIATED_SYMPTOMS,
  associatedSymptomLabel,
  BODY_SITES,
  bodySiteLabel,
  CHARACTER_TAGS,
  characterLabel,
  CYCLE_RELATIONS,
  cycleRelationLabel,
  EXACERBATING_FACTORS,
  exacerbatingFactorLabel,
  nsaidResponseLabel,
  RADIATION_SITES,
  radiationLabel,
  RELIEVING_FACTORS,
  relievingFactorLabel,
  TIMING_DURATIONS,
  timingDurationLabel,
} from '../lib/socrates'
import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'

const ONSET_TYPES: OnsetType[] = ['sudden', 'gradual']
const onsetTypeLabel: Record<OnsetType, string> = {
  sudden: 'Sudden - came on quickly',
  gradual: 'Gradual - built up slowly',
}

const TIMING_PATTERNS: TimingPattern[] = ['constant', 'intermittent']
const timingPatternLabel: Record<TimingPattern, string> = {
  constant: "It's constant",
  intermittent: 'It comes and goes',
}

const NSAID_RESPONSES: NsaidResponse[] = ['not_tried', 'no_relief', 'partial_relief', 'full_relief']

interface SymptomFormProps {
  onSave: (entry: NewSymptomEntry) => void
}

export default function SymptomForm({ onSave }: SymptomFormProps) {
  const [site, setSite] = useState<BodySite[]>([])
  const [siteOther, setSiteOther] = useState('')
  const [onsetType, setOnsetType] = useState<OnsetType>('gradual')
  const [onsetCycleRelation, setOnsetCycleRelation] = useState<CycleRelation>('unsure')
  const [character, setCharacter] = useState<CharacterTag[]>([])
  const [associatedSymptoms, setAssociatedSymptoms] = useState<AssociatedSymptom[]>([])
  const [radiation, setRadiation] = useState<RadiationSite[]>([])
  const [timingDuration, setTimingDuration] = useState<TimingDuration>('hours')
  const [timingPattern, setTimingPattern] = useState<TimingPattern>('intermittent')
  const [exacerbatingFactors, setExacerbatingFactors] = useState<ExacerbatingFactor[]>([])
  const [relievingFactors, setRelievingFactors] = useState<RelievingFactor[]>([])
  const [nsaidResponse, setNsaidResponse] = useState<NsaidResponse>('not_tried')
  const [severity, setSeverity] = useState(5)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (site.length === 0) {
      setError('Please select at least one site for the pain.')
      return
    }
    if (character.length === 0) {
      setError('Please select at least one description of the pain.')
      return
    }
    setError(null)

    onSave({
      site,
      siteOther: siteOther.trim() || undefined,
      onsetType,
      onsetCycleRelation,
      character,
      associatedSymptoms,
      radiation: radiation.length > 0 ? radiation : ['none'],
      timingDuration,
      timingPattern,
      exacerbatingFactors,
      relievingFactors,
      nsaidResponse,
      severity,
    })

    // Reset for the next entry.
    setSite([])
    setSiteOther('')
    setOnsetType('gradual')
    setOnsetCycleRelation('unsure')
    setCharacter([])
    setAssociatedSymptoms([])
    setRadiation([])
    setTimingDuration('hours')
    setTimingPattern('intermittent')
    setExacerbatingFactors([])
    setRelievingFactors([])
    setNsaidResponse('not_tried')
    setSeverity(5)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 pb-8">
      <div>
        <h1 className="text-lg font-bold text-neutral-900">Log a symptom</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Answer as best you can - you can skip anything that doesn't apply.
        </p>
      </div>

      {/* Site */}
      <CheckboxGroup
        legend="Site - where is the pain?"
        options={BODY_SITES}
        labels={bodySiteLabel}
        value={site}
        onChange={setSite}
      />
      <label className="flex flex-col gap-1">
        <span className="text-sm text-neutral-600">Other site (optional)</span>
        <input
          type="text"
          className="min-h-11 border border-neutral-300 rounded-lg px-3 text-sm"
          value={siteOther}
          onChange={(e) => setSiteOther(e.target.value)}
          placeholder="e.g. shoulder tip pain"
        />
      </label>

      {/* Onset */}
      <RadioGroup
        legend="Onset - how did it start?"
        name="onsetType"
        options={ONSET_TYPES}
        labels={onsetTypeLabel}
        value={onsetType}
        onChange={setOnsetType}
      />
      <RadioGroup
        legend="Onset - link to your cycle?"
        name="onsetCycleRelation"
        options={CYCLE_RELATIONS}
        labels={cycleRelationLabel}
        value={onsetCycleRelation}
        onChange={setOnsetCycleRelation}
      />

      {/* Character */}
      <CheckboxGroup
        legend="Character - what does it feel like?"
        options={CHARACTER_TAGS}
        labels={characterLabel}
        value={character}
        onChange={setCharacter}
      />
      <CheckboxGroup
        legend="Anything else alongside the pain?"
        options={ASSOCIATED_SYMPTOMS}
        labels={associatedSymptomLabel}
        value={associatedSymptoms}
        onChange={setAssociatedSymptoms}
      />

      {/* Radiation */}
      <CheckboxGroup
        legend="Radiation - where does it spread to?"
        options={RADIATION_SITES}
        labels={radiationLabel}
        value={radiation}
        onChange={setRadiation}
      />

      {/* Timing */}
      <RadioGroup
        legend="Timing - how long does it last?"
        name="timingDuration"
        options={TIMING_DURATIONS}
        labels={timingDurationLabel}
        value={timingDuration}
        onChange={setTimingDuration}
      />
      <RadioGroup
        legend="Timing - pattern"
        name="timingPattern"
        options={TIMING_PATTERNS}
        labels={timingPatternLabel}
        value={timingPattern}
        onChange={setTimingPattern}
      />

      {/* Exacerbating/relieving factors */}
      <CheckboxGroup
        legend="What makes it worse?"
        options={EXACERBATING_FACTORS}
        labels={exacerbatingFactorLabel}
        value={exacerbatingFactors}
        onChange={setExacerbatingFactors}
      />
      <CheckboxGroup
        legend="What makes it better?"
        options={RELIEVING_FACTORS}
        labels={relievingFactorLabel}
        value={relievingFactors}
        onChange={setRelievingFactors}
      />
      <RadioGroup
        legend="If you've taken NSAIDs (e.g. ibuprofen), did they help?"
        name="nsaidResponse"
        options={NSAID_RESPONSES}
        labels={nsaidResponseLabel}
        value={nsaidResponse}
        onChange={setNsaidResponse}
      />

      {/* Severity */}
      <div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-neutral-800">
            Severity - how bad is the pain right now? ({severity}/10)
          </span>
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            className="h-11 accent-purple-600"
            aria-label="Pain severity"
          />
        </label>
        <div className="flex justify-between text-xs text-neutral-400 mt-1">
          <span>0 - no pain</span>
          <span>10 - worst possible</span>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      <button
        type="submit"
        className="min-h-11 rounded-lg bg-purple-600 text-white font-semibold text-sm active:bg-purple-700"
      >
        Save entry
      </button>
    </form>
  )
}
