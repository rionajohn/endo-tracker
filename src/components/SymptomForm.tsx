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
        <h1 className="text-2xl font-extrabold text-ink tracking-tight">Log a symptom</h1>
        <p className="text-sm text-stone-500 mt-1">
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
        <span className="text-sm text-stone-600">Other site (optional)</span>
        <input
          type="text"
          className="min-h-11 border border-transparent bg-white rounded-3xl px-3 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:border-pink-400"
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
      <div className="bg-pink-100 rounded-3xl p-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-ink">
            Severity - how bad is the pain right now?
          </span>
          <span className="text-4xl font-extrabold text-pink-700 tracking-tight">
            {severity}
            <span className="text-lg font-semibold text-pink-500">/10</span>
          </span>
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            className="h-11 accent-pink-600"
            aria-label="Pain severity"
          />
        </label>
        <div className="flex justify-between text-xs text-pink-600/70 mt-1">
          <span>0 - no pain</span>
          <span>10 - worst possible</span>
        </div>
      </div>

      {error && <p className="text-sm text-pink-700 font-medium">{error}</p>}

      <button
        type="submit"
        className="min-h-11 rounded-full bg-ink text-white font-semibold text-sm active:bg-stone-800"
      >
        Save entry
      </button>
    </form>
  )
}
