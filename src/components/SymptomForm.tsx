import { useState } from 'react'
import type {
  AssociatedSymptom,
  BodySite,
  CharacterTag,
  CycleRelation,
  FunctionalImpactLevel,
  MedicationResponse,
  NewSymptomEntry,
  OnsetType,
  RadiationSite,
  SymptomEntry,
  YesNo,
} from '../types'
import {
  ASSOCIATED_SYMPTOMS,
  associatedSymptomLabel,
  BODY_SITES,
  bodySiteLabel,
  CYCLE_RELATIONS,
  cycleRelationLabel,
  LOCATION_DESCRIPTORS,
  MEDICATION_RESPONSES,
  medicationResponseLabel,
} from '../lib/socrates'
import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'
import RangeSlider from './RangeSlider'
import ReassuranceBanner from './ReassuranceBanner'
import { pickReassuranceMessage } from '../lib/reassurance'

const ONSET_TYPES: OnsetType[] = ['sudden', 'gradual']
const onsetTypeLabel: Record<OnsetType, string> = {
  sudden: 'Suddenly',
  gradual: 'Gradually',
}

const FUNCTIONAL_IMPACT_LEVELS: FunctionalImpactLevel[] = ['none', 'some', 'most']
const functionalImpactLabel: Record<FunctionalImpactLevel, string> = {
  none: 'No',
  some: 'Some things',
  most: 'Most things',
}

const YES_NO_OPTIONS: YesNo[] = ['yes', 'no']
const yesNoLabel: Record<YesNo, string> = { yes: 'Yes', no: 'No' }

interface SymptomFormProps {
  onSave: (entry: NewSymptomEntry) => void
  /** Existing log history, used only to power the "Same as yesterday" shortcut. */
  entries: SymptomEntry[]
}

function isYesterday(iso: string): boolean {
  const d = new Date(iso)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return d.toDateString() === yesterday.toDateString()
}

interface BannerState {
  anchor: string
  message: string
}

function BannerSlot({
  anchor,
  banner,
  onDismiss,
}: {
  anchor: string
  banner: BannerState | null
  onDismiss: () => void
}) {
  if (!banner || banner.anchor !== anchor) return null
  return <ReassuranceBanner message={banner.message} onDismiss={onDismiss} />
}

/** Per-location descriptor checkboxes for Step 2. Each option writes to either
 * `character` or `radiation` depending on its kind (see LOCATION_DESCRIPTORS
 * in lib/socrates.ts) - styled to match CheckboxGroup for visual consistency. */
function LocationDescriptors({
  location,
  character,
  radiation,
  onToggleCharacter,
  onToggleRadiation,
}: {
  location: BodySite
  character: CharacterTag[]
  radiation: RadiationSite[]
  onToggleCharacter: (value: CharacterTag) => void
  onToggleRadiation: (value: 'legs') => void
}) {
  const options = LOCATION_DESCRIPTORS[location]
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-xs font-bold text-pink-500 uppercase tracking-wide mb-1">
        {bodySiteLabel[location]} - what's happening here?
      </legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const checked =
            option.kind === 'character' ? character.includes(option.value) : radiation.includes(option.value)
          return (
            <label
              key={option.value}
              className={`flex items-center gap-3 min-h-11 px-3 rounded-3xl border cursor-pointer select-none transition-colors ${
                checked ? 'bg-pink-100 border-pink-400' : 'bg-white border-transparent'
              }`}
            >
              <input
                type="checkbox"
                className="h-5 w-5 accent-pink-500 shrink-0"
                checked={checked}
                onChange={() =>
                  option.kind === 'character' ? onToggleCharacter(option.value) : onToggleRadiation(option.value)
                }
              />
              <span className="text-sm text-ink">{option.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function SymptomForm({ onSave, entries }: SymptomFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Step 1 - Pain during the day
  const [severity, setSeverity] = useState(5)
  const [onsetType, setOnsetType] = useState<OnsetType>('gradual')
  const [onsetCycleRelation, setOnsetCycleRelation] = useState<CycleRelation>('unsure')

  // Step 2 - Symptom location and character
  const [site, setSite] = useState<BodySite[]>([])
  const [character, setCharacter] = useState<CharacterTag[]>([])
  const [radiation, setRadiation] = useState<RadiationSite[]>([])
  const [associatedSymptoms, setAssociatedSymptoms] = useState<AssociatedSymptom[]>([])
  const [bleedingOutsideWindow, setBleedingOutsideWindow] = useState<YesNo | undefined>(undefined)
  const [otherSymptomsNotes, setOtherSymptomsNotes] = useState('')

  // Step 3 - Functional impact and medication
  const [functionalImpact, setFunctionalImpact] = useState<FunctionalImpactLevel | null>(null)
  const [medicationTaken, setMedicationTaken] = useState('')
  const [medicationResponse, setMedicationResponse] = useState<MedicationResponse | undefined>(undefined)

  const [error, setError] = useState<string | null>(null)

  // Reassuring banner - appears near whichever field the person just ticked
  // or set (see lib/reassurance.ts for the message pools and the two
  // verified statistics it's allowed to draw from).
  const [banner, setBanner] = useState<BannerState | null>(null)

  function triggerBanner(anchor: string, kind: 'severity' | 'symptom') {
    setBanner({ anchor, message: pickReassuranceMessage(kind) })
  }

  const yesterdayEntry = entries.find((e) => isYesterday(e.createdAt))

  function applySameAsYesterday() {
    if (!yesterdayEntry) return
    setSite(yesterdayEntry.site)
    setCharacter(yesterdayEntry.character)
    setRadiation(yesterdayEntry.radiation)
    setAssociatedSymptoms(yesterdayEntry.associatedSymptoms)
    setBleedingOutsideWindow(yesterdayEntry.bleedingOutsideWindow)
  }

  function toggleLocation(next: BodySite[]) {
    if (next.length > site.length) triggerBanner('site', 'symptom')
    setSite(next)
  }

  function toggleCharacterDescriptor(value: CharacterTag, anchor: string) {
    setCharacter((prev) => {
      const checked = prev.includes(value)
      if (!checked) triggerBanner(anchor, 'symptom')
      return checked ? prev.filter((c) => c !== value) : [...prev, value]
    })
  }

  function toggleRadiationDescriptor(value: 'legs', anchor: string) {
    setRadiation((prev) => {
      const checked = prev.includes(value)
      if (!checked) triggerBanner(anchor, 'symptom')
      return checked ? prev.filter((r) => r !== value) : [...prev, value]
    })
  }

  function toggleAssociatedSymptoms(next: AssociatedSymptom[]) {
    if (next.length > associatedSymptoms.length) triggerBanner('associatedSymptoms', 'symptom')
    if (!next.includes('bleeding')) setBleedingOutsideWindow(undefined)
    setAssociatedSymptoms(next)
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (step === 1) {
      setBanner(null)
      setStep(2)
      return
    }

    if (step === 2) {
      if (site.length === 0) {
        setError('Please select at least one location for the pain.')
        return
      }
      setError(null)
      setBanner(null)
      setStep(3)
      return
    }

    // Step 3 - final save
    if (functionalImpact === null) {
      setError("Please choose how much today's symptoms affected you.")
      return
    }
    setError(null)

    onSave({
      site,
      onsetType,
      onsetCycleRelation,
      character,
      associatedSymptoms,
      bleedingOutsideWindow: associatedSymptoms.includes('bleeding') ? bleedingOutsideWindow : undefined,
      radiation: radiation.length > 0 ? radiation : ['none'],
      medicationTaken: medicationTaken.trim() || undefined,
      medicationResponse: medicationTaken.trim() ? medicationResponse : undefined,
      severity,
      functionalImpact,
      otherSymptomsNotes: otherSymptomsNotes.trim() || undefined,
    })

    // Reset for the next entry.
    setStep(1)
    setSeverity(5)
    setOnsetType('gradual')
    setOnsetCycleRelation('unsure')
    setSite([])
    setCharacter([])
    setRadiation([])
    setAssociatedSymptoms([])
    setBleedingOutsideWindow(undefined)
    setOtherSymptomsNotes('')
    setFunctionalImpact(null)
    setMedicationTaken('')
    setMedicationResponse(undefined)
    setBanner(null)
  }

  function goBack() {
    setError(null)
    setBanner(null)
    setStep((s) => (s === 3 ? 2 : 1))
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 p-4 pb-8">
      {/* Step progress */}
      <div className="flex gap-1.5">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`h-1.5 flex-1 rounded-full ${n <= step ? 'bg-pink-400' : 'bg-stone-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <>
          <div>
            <h1 className="text-2xl font-extrabold text-ink tracking-tight">Pain during the day</h1>
            <p className="text-sm text-stone-500 mt-1">
              Your overall pain experience across today, not just this moment.
            </p>
          </div>

          <div className="bg-pink-100 rounded-3xl p-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-ink">How bad was the pain today?</span>
              <span className="text-4xl font-extrabold text-pink-700 tracking-tight">
                {severity}
                <span className="text-lg font-semibold text-pink-500">/10</span>
              </span>
              <RangeSlider
                min={0}
                max={10}
                step={1}
                value={severity}
                onChange={setSeverity}
                onCommit={() => triggerBanner('severity', 'severity')}
                aria-label="Pain severity today"
              />
            </label>
            <div className="flex justify-between text-xs text-pink-600/70 mt-1">
              <span>0 = no pain</span>
              <span>10 = worst imaginable</span>
            </div>
          </div>
          <BannerSlot anchor="severity" banner={banner} onDismiss={() => setBanner(null)} />

          <RadioGroup
            legend="How did today's pain start?"
            name="onsetType"
            options={ONSET_TYPES}
            labels={onsetTypeLabel}
            value={onsetType}
            onChange={setOnsetType}
          />
          <RadioGroup
            legend="Is this related to your cycle?"
            name="onsetCycleRelation"
            options={CYCLE_RELATIONS}
            labels={cycleRelationLabel}
            value={onsetCycleRelation}
            onChange={setOnsetCycleRelation}
          />
        </>
      )}

      {step === 2 && (
        <>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold text-ink tracking-tight">Where, and what does it feel like?</h1>
              <p className="text-sm text-stone-500 mt-1">
                Pick each location, then describe what's happening there. Different places can behave
                differently.
              </p>
            </div>
          </div>

          {yesterdayEntry && (
            <button
              type="button"
              onClick={applySameAsYesterday}
              className="self-start min-h-11 px-4 rounded-full bg-pink-100 text-pink-700 font-semibold text-sm active:bg-pink-200 transition-colors"
            >
              Same as yesterday
            </button>
          )}

          <CheckboxGroup
            legend="Pain locations"
            options={BODY_SITES}
            labels={bodySiteLabel}
            value={site}
            onChange={toggleLocation}
          />
          <BannerSlot anchor="site" banner={banner} onDismiss={() => setBanner(null)} />

          {BODY_SITES.filter((loc) => site.includes(loc)).map((loc) => (
            <div key={loc} className="flex flex-col gap-2">
              <LocationDescriptors
                location={loc}
                character={character}
                radiation={radiation}
                onToggleCharacter={(value) => toggleCharacterDescriptor(value, `descriptor-${loc}`)}
                onToggleRadiation={(value) => toggleRadiationDescriptor(value, `descriptor-${loc}`)}
              />
              <BannerSlot anchor={`descriptor-${loc}`} banner={banner} onDismiss={() => setBanner(null)} />
            </div>
          ))}

          <CheckboxGroup
            legend="Whole-body symptoms"
            options={ASSOCIATED_SYMPTOMS}
            labels={associatedSymptomLabel}
            value={associatedSymptoms}
            onChange={toggleAssociatedSymptoms}
          />
          <BannerSlot anchor="associatedSymptoms" banner={banner} onDismiss={() => setBanner(null)} />

          {associatedSymptoms.includes('bleeding') && (
            <RadioGroup
              legend="Is this bleeding outside your expected period window?"
              name="bleedingOutsideWindow"
              options={YES_NO_OPTIONS}
              labels={yesNoLabel}
              value={bleedingOutsideWindow}
              onChange={setBleedingOutsideWindow}
            />
          )}

          <label className="flex flex-col gap-1">
            <span className="text-sm text-stone-600">Other symptoms (optional)</span>
            <input
              type="text"
              className="min-h-11 border border-transparent bg-white rounded-3xl px-3 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:border-pink-400"
              value={otherSymptomsNotes}
              onChange={(e) => setOtherSymptomsNotes(e.target.value)}
              placeholder="e.g. headaches, spotting"
            />
            {/* GP-report-only free text - must never factor into evaluateFlags
                or any other scoring logic. See types.ts. */}
          </label>
        </>
      )}

      {step === 3 && (
        <>
          <div>
            <h1 className="text-2xl font-extrabold text-ink tracking-tight">Did symptoms stop you doing anything today?</h1>
            <p className="text-sm text-stone-500 mt-1">This tracks how much your day was affected.</p>
          </div>

          <RadioGroup
            legend="How much did it affect your day?"
            name="functionalImpact"
            options={FUNCTIONAL_IMPACT_LEVELS}
            labels={functionalImpactLabel}
            value={functionalImpact ?? undefined}
            onChange={setFunctionalImpact}
          />

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-ink">Took any medication for it?</span>
            <input
              type="text"
              className="min-h-11 border border-transparent bg-white rounded-3xl px-3 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:border-pink-400"
              value={medicationTaken}
              onChange={(e) => setMedicationTaken(e.target.value)}
              placeholder='e.g. "ibuprofen 400mg" or "a heat pack"'
            />
          </label>

          {medicationTaken.trim() !== '' && (
            <>
              {/* Medication response is recorded for the GP report only and
                  must never affect any score - see types.ts and
                  lib/flagging.ts. */}
              <RadioGroup
                legend="Did it help?"
                name="medicationResponse"
                options={MEDICATION_RESPONSES}
                labels={medicationResponseLabel}
                value={medicationResponse}
                onChange={setMedicationResponse}
              />
            </>
          )}
        </>
      )}

      {error && <p className="text-sm text-pink-700 font-medium">{error}</p>}

      <div className="flex gap-2">
        {step > 1 && (
          <button
            type="button"
            onClick={goBack}
            className="min-h-11 flex-1 rounded-full bg-stone-100 text-ink font-semibold text-sm active:bg-stone-200 transition-colors"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="min-h-11 flex-1 rounded-full bg-ink text-white font-semibold text-sm active:bg-stone-800 transition-colors"
        >
          {step < 3 ? 'Next' : 'Save entry'}
        </button>
      </div>
    </form>
  )
}
