import { useState } from 'react'
import type {
  BaselineQuestionnaire,
  CycleRegularity,
  DigestiveSymptom,
  FamilyHistoryCondition,
  FunctionalImpactFrequency,
  HealthcareVisitCount,
  NewBaselineQuestionnaire,
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
import {
  CYCLE_REGULARITIES,
  cycleRegularityLabel,
  DIGESTIVE_SYMPTOMS,
  digestiveSymptomLabel,
  FAMILY_HISTORY_CONDITIONS,
  familyHistoryConditionLabel,
  FUNCTIONAL_IMPACT_FREQUENCIES,
  functionalImpactFrequencyLabel,
  HEALTHCARE_VISIT_COUNTS,
  healthcareVisitCountLabel,
  PAIN_CHANGE_OVER_TIME,
  painChangeOverTimeLabel,
  PAIN_DURATION_BANDS,
  painDurationBandLabel,
  PAIN_DURING_BOWEL_OR_URINATION,
  painDuringBowelOrUrinationLabel,
  PAIN_ONSET_TIMINGS,
  painOnsetTimingLabel,
  PAIN_RELIEF_EFFECTS,
  painReliefEffectLabel,
  SAFETY_FLAGS,
  safetyFlagLabel,
  UNRELATED_PAIN_FREQUENCIES,
  unrelatedPainFrequencyLabel,
  VISIT_OUTCOMES,
  visitOutcomeLabel,
  YES_NO,
  yesNoLabel,
  YES_NO_UNSURE,
  yesNoUnsureLabel,
} from '../lib/baseline'
import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'
import RangeSlider from './RangeSlider'

interface BaselineQuestionnaireFormProps {
  initial: BaselineQuestionnaire | null
  onSave: (record: NewBaselineQuestionnaire) => void
  onBack: () => void
}

function numToStr(n: number | undefined): string {
  return n === undefined ? '' : String(n)
}

function NumberField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (next: string) => void
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        className="min-h-11 border border-transparent bg-white rounded-3xl px-4 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:border-pink-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-extrabold text-pink-500 uppercase tracking-wide">{title}</h2>
      {children}
    </section>
  )
}

export default function BaselineQuestionnaireForm({ initial, onSave, onBack }: BaselineQuestionnaireFormProps) {
  // About you and cycle history
  const [currentAge, setCurrentAge] = useState(numToStr(initial?.currentAge))
  const [ageAtFirstPeriod, setAgeAtFirstPeriod] = useState(numToStr(initial?.ageAtFirstPeriod))
  const [typicalCycleLengthDays, setTypicalCycleLengthDays] = useState(numToStr(initial?.typicalCycleLengthDays))
  const [typicalPeriodLengthDays, setTypicalPeriodLengthDays] = useState(numToStr(initial?.typicalPeriodLengthDays))
  const [cycleRegularity, setCycleRegularity] = useState<CycleRegularity>(initial?.cycleRegularity ?? 'not_sure')

  // Baseline pain profile
  const [typicalPainSeverity, setTypicalPainSeverity] = useState(initial?.typicalPainSeverity ?? 5)
  const [painOnsetTiming, setPainOnsetTiming] = useState<PainOnsetTiming>(initial?.painOnsetTiming ?? 'varies_a_lot')
  const [painDurationBand, setPainDurationBand] = useState<PainDurationBand>(initial?.painDurationBand ?? 'one_to_two_days')
  const [unrelatedPainFrequency, setUnrelatedPainFrequency] = useState<UnrelatedPainFrequency>(
    initial?.unrelatedPainFrequency ?? 'not_sure',
  )
  const [painChangeOverTime, setPainChangeOverTime] = useState<PainChangeOverTime>(
    initial?.painChangeOverTime ?? 'not_sure',
  )

  // Digestive and urinary history
  const [digestiveSymptoms, setDigestiveSymptoms] = useState<DigestiveSymptom[]>(initial?.digestiveSymptoms ?? [])
  const [painDuringBowelOrUrination, setPainDuringBowelOrUrination] = useState<PainDuringBowelOrUrination>(
    initial?.painDuringBowelOrUrination ?? 'no',
  )
  const [diagnosedIbsUtiOrSimilar, setDiagnosedIbsUtiOrSimilar] = useState<YesNoUnsure>(
    initial?.diagnosedIbsUtiOrSimilar ?? 'not_sure',
  )

  // Pain relief history
  const [standardPainReliefEffect, setStandardPainReliefEffect] = useState<PainReliefEffect>(
    initial?.standardPainReliefEffect ?? 'not_tried',
  )
  const [everPrescribedForPainOrCycle, setEverPrescribedForPainOrCycle] = useState<YesNo>(
    initial?.everPrescribedForPainOrCycle ?? 'no',
  )

  // Functional impact
  const [missedActivitiesFrequency, setMissedActivitiesFrequency] = useState<FunctionalImpactFrequency>(
    initial?.missedActivitiesFrequency ?? 'never',
  )

  // Healthcare history
  const [healthcareVisitCount, setHealthcareVisitCount] = useState<HealthcareVisitCount>(
    initial?.healthcareVisitCount ?? 'never',
  )
  const [visitOutcomes, setVisitOutcomes] = useState<VisitOutcome[]>(initial?.visitOutcomes ?? [])
  const [everDismissed, setEverDismissed] = useState<YesNoUnsure>(initial?.everDismissed ?? 'not_sure')
  const [hadTestsOrScans, setHadTestsOrScans] = useState<YesNo>(initial?.hadTestsOrScans ?? 'no')

  // Family and risk history
  const [familyHistory, setFamilyHistory] = useState<FamilyHistoryCondition[]>(initial?.familyHistory ?? [])

  // Cycle onset context
  const [ageWhenPainBecameProblem, setAgeWhenPainBecameProblem] = useState(
    numToStr(initial?.ageWhenPainBecameProblem),
  )

  // Safety check
  const [safetyFlags, setSafetyFlags] = useState<SafetyFlag[]>(initial?.safetyFlags ?? [])

  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const hasUrgentFlag = safetyFlags.some((f) => f !== 'none')

  function toggleSafetyFlag(flag: SafetyFlag) {
    if (flag === 'none') {
      setSafetyFlags((prev) => (prev.includes('none') ? [] : ['none']))
      return
    }
    setSafetyFlags((prev) => {
      const withoutNone = prev.filter((f) => f !== 'none')
      return withoutNone.includes(flag)
        ? withoutNone.filter((f) => f !== flag)
        : [...withoutNone, flag]
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const numberFields: [string, string][] = [
      ['Current age', currentAge],
      ['Age at first period', ageAtFirstPeriod],
      ['Typical cycle length', typicalCycleLengthDays],
      ['Typical period length', typicalPeriodLengthDays],
      ['Age when pain became a problem', ageWhenPainBecameProblem],
    ]
    for (const [label, value] of numberFields) {
      if (value.trim() === '' || Number.isNaN(Number(value)) || Number(value) < 0) {
        setError(`Please enter a valid number for "${label}".`)
        return
      }
    }
    setError(null)

    onSave({
      currentAge: Number(currentAge),
      ageAtFirstPeriod: Number(ageAtFirstPeriod),
      typicalCycleLengthDays: Number(typicalCycleLengthDays),
      typicalPeriodLengthDays: Number(typicalPeriodLengthDays),
      cycleRegularity,

      typicalPainSeverity,
      painOnsetTiming,
      painDurationBand,
      unrelatedPainFrequency,
      painChangeOverTime,

      digestiveSymptoms,
      painDuringBowelOrUrination,
      diagnosedIbsUtiOrSimilar,

      standardPainReliefEffect,
      everPrescribedForPainOrCycle,

      missedActivitiesFrequency,

      healthcareVisitCount,
      visitOutcomes,
      everDismissed,
      hadTestsOrScans,

      familyHistory,

      ageWhenPainBecameProblem: Number(ageWhenPainBecameProblem),

      safetyFlags,
    })

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col h-full">
        <div className="shrink-0 flex items-center gap-2 px-4 pt-5 pb-3 border-b border-stone-100">
          <h1 className="text-base font-extrabold text-ink tracking-tight">Baseline Questionnaire</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-lg font-extrabold text-ink">Baseline saved</h2>
          <p className="text-sm text-stone-500 leading-relaxed">
            Your baseline is now saved. You can view or update it any time from your Pain Profile.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-2 min-h-11 px-6 rounded-full bg-ink text-white font-semibold text-sm active:bg-stone-800"
          >
            Back to Pain Profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Inline header with back button */}
      <div className="shrink-0 flex items-center gap-2 px-4 pt-5 pb-3 border-b border-stone-100">
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 min-w-11 flex items-center justify-center rounded-full active:bg-stone-100 -ml-2 shrink-0"
          aria-label="Back to Pain Profile"
        >
          <svg className="w-5 h-5 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-base font-extrabold text-ink tracking-tight">Baseline Questionnaire</h1>
      </div>

      <div className="relative flex-1 min-h-0">
        <form onSubmit={handleSubmit} className="h-full overflow-y-auto px-5 py-5 flex flex-col gap-8">
          <p className="text-sm text-stone-500 leading-relaxed -mt-2">
            A set of questions to establish your personal baseline, separate from your day-to-day
            symptom log. Answer as best you can - you can always come back and update it later.
          </p>

          <Section title="About you and cycle history">
            <NumberField label="Current age" value={currentAge} onChange={setCurrentAge} placeholder="e.g. 24" />
            <NumberField label="Age at first period" value={ageAtFirstPeriod} onChange={setAgeAtFirstPeriod} placeholder="e.g. 13" />
            <NumberField
              label="Typical cycle length (days)"
              value={typicalCycleLengthDays}
              onChange={setTypicalCycleLengthDays}
              placeholder="e.g. 28"
            />
            <NumberField
              label="Typical period length (days)"
              value={typicalPeriodLengthDays}
              onChange={setTypicalPeriodLengthDays}
              placeholder="e.g. 5"
            />
            <RadioGroup
              legend="Cycle regularity"
              name="cycleRegularity"
              options={CYCLE_REGULARITIES}
              labels={cycleRegularityLabel}
              value={cycleRegularity}
              onChange={setCycleRegularity}
            />
          </Section>

          <Section title="Baseline pain profile">
            <div className="bg-pink-100 rounded-3xl p-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-ink">Period pain severity on a typical cycle</span>
                <span className="text-4xl font-extrabold text-pink-700 tracking-tight">
                  {typicalPainSeverity}
                  <span className="text-lg font-semibold text-pink-500">/10</span>
                </span>
                <RangeSlider
                  min={0}
                  max={10}
                  step={1}
                  value={typicalPainSeverity}
                  onChange={setTypicalPainSeverity}
                  aria-label="Typical period pain severity"
                />
              </label>
              <div className="flex justify-between text-xs text-pink-600/70 mt-1">
                <span>0 - no pain</span>
                <span>10 - worst possible</span>
              </div>
            </div>
            <RadioGroup
              legend="When pain usually starts"
              name="painOnsetTiming"
              options={PAIN_ONSET_TIMINGS}
              labels={painOnsetTimingLabel}
              value={painOnsetTiming}
              onChange={setPainOnsetTiming}
            />
            <RadioGroup
              legend="How many days pain usually lasts"
              name="painDurationBand"
              options={PAIN_DURATION_BANDS}
              labels={painDurationBandLabel}
              value={painDurationBand}
              onChange={setPainDurationBand}
            />
            <RadioGroup
              legend="Has pain ever happened unrelated to your period?"
              name="unrelatedPainFrequency"
              options={UNRELATED_PAIN_FREQUENCIES}
              labels={unrelatedPainFrequencyLabel}
              value={unrelatedPainFrequency}
              onChange={setUnrelatedPainFrequency}
            />
            <RadioGroup
              legend="Has the pain changed over time?"
              name="painChangeOverTime"
              options={PAIN_CHANGE_OVER_TIME}
              labels={painChangeOverTimeLabel}
              value={painChangeOverTime}
              onChange={setPainChangeOverTime}
            />
          </Section>

          <Section title="Digestive and urinary history">
            <CheckboxGroup
              legend="Symptoms around your period (select all that apply)"
              options={DIGESTIVE_SYMPTOMS}
              labels={digestiveSymptomLabel}
              value={digestiveSymptoms}
              onChange={setDigestiveSymptoms}
            />
            <RadioGroup
              legend="Pain during bowel movements or urination"
              name="painDuringBowelOrUrination"
              options={PAIN_DURING_BOWEL_OR_URINATION}
              labels={painDuringBowelOrUrinationLabel}
              value={painDuringBowelOrUrination}
              onChange={setPainDuringBowelOrUrination}
            />
            <RadioGroup
              legend="Ever diagnosed with IBS, a UTI, or similar?"
              name="diagnosedIbsUtiOrSimilar"
              options={YES_NO_UNSURE}
              labels={yesNoUnsureLabel}
              value={diagnosedIbsUtiOrSimilar}
              onChange={setDiagnosedIbsUtiOrSimilar}
            />
          </Section>

          <Section title="Pain relief history">
            <RadioGroup
              legend="Does standard pain relief (ibuprofen/paracetamol) usually help?"
              name="standardPainReliefEffect"
              options={PAIN_RELIEF_EFFECTS}
              labels={painReliefEffectLabel}
              value={standardPainReliefEffect}
              onChange={setStandardPainReliefEffect}
            />
            <RadioGroup
              legend="Ever prescribed anything for period pain or cycle regulation?"
              name="everPrescribedForPainOrCycle"
              options={YES_NO}
              labels={yesNoLabel}
              value={everPrescribedForPainOrCycle}
              onChange={setEverPrescribedForPainOrCycle}
            />
          </Section>

          <Section title="Functional impact">
            <RadioGroup
              legend="How often symptoms cause missed school/work/activities"
              name="missedActivitiesFrequency"
              options={FUNCTIONAL_IMPACT_FREQUENCIES}
              labels={functionalImpactFrequencyLabel}
              value={missedActivitiesFrequency}
              onChange={setMissedActivitiesFrequency}
            />
          </Section>

          <Section title="Healthcare history">
            <RadioGroup
              legend="Number of GP/A&E visits for these symptoms"
              name="healthcareVisitCount"
              options={HEALTHCARE_VISIT_COUNTS}
              labels={healthcareVisitCountLabel}
              value={healthcareVisitCount}
              onChange={setHealthcareVisitCount}
            />
            <CheckboxGroup
              legend="What were you told during those visits? (select all that apply)"
              options={VISIT_OUTCOMES}
              labels={visitOutcomeLabel}
              value={visitOutcomes}
              onChange={setVisitOutcomes}
            />
            <RadioGroup
              legend="Has anyone ever dismissed or minimised your symptoms?"
              name="everDismissed"
              options={YES_NO_UNSURE}
              labels={yesNoUnsureLabel}
              value={everDismissed}
              onChange={setEverDismissed}
            />
            <RadioGroup
              legend="Have you had any tests, scans, or investigations before?"
              name="hadTestsOrScans"
              options={YES_NO}
              labels={yesNoLabel}
              value={hadTestsOrScans}
              onChange={setHadTestsOrScans}
            />
          </Section>

          <Section title="Family and risk history">
            <CheckboxGroup
              legend="Family history of (select all that apply)"
              options={FAMILY_HISTORY_CONDITIONS}
              labels={familyHistoryConditionLabel}
              value={familyHistory}
              onChange={setFamilyHistory}
            />
          </Section>

          <Section title="Cycle onset context">
            <NumberField
              label="Age when period pain first became a noticeable problem"
              value={ageWhenPainBecameProblem}
              onChange={setAgeWhenPainBecameProblem}
              placeholder="e.g. 16"
            />
          </Section>

          {/* Safety check - deliberately distinct from every question above:
              alert colours, its own border, and an immediate on-check warning
              rather than only surfacing something at submit time. */}
          <section className="flex flex-col gap-3 bg-red-50 border-2 border-red-300 rounded-3xl p-4">
            <h2 className="text-sm font-extrabold text-red-700 uppercase tracking-wide">Just to be safe</h2>
            <p className="text-xs text-red-700/80 leading-relaxed">
              Check any of these that apply to you, even if they don't happen every time.
            </p>
            <div className="flex flex-col gap-2">
              {SAFETY_FLAGS.map((flag) => {
                const checked = safetyFlags.includes(flag)
                return (
                  <label
                    key={flag}
                    className={`flex items-center gap-3 min-h-11 px-3 rounded-2xl border cursor-pointer select-none transition-colors ${
                      checked ? 'bg-red-100 border-red-400' : 'bg-white border-red-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-red-600 shrink-0"
                      checked={checked}
                      onChange={() => toggleSafetyFlag(flag)}
                    />
                    <span className="text-sm text-red-900">{safetyFlagLabel[flag]}</span>
                  </label>
                )
              })}
            </div>

            {hasUrgentFlag && (
              <div role="alert" className="flex items-start gap-2 bg-red-600 text-white rounded-2xl p-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <p className="text-sm font-bold leading-snug">
                  Please speak to a doctor as soon as possible - this can indicate something needing
                  urgent attention.
                </p>
              </div>
            )}
          </section>

          {error && <p className="text-sm text-pink-700 font-medium">{error}</p>}

          <p className="text-xs text-stone-400 leading-relaxed">
            This questionnaire is not a diagnostic tool and does not replace professional medical
            assessment.
          </p>

          <button
            type="submit"
            className="min-h-11 rounded-full bg-ink text-white font-semibold text-sm active:bg-stone-800"
          >
            Save baseline
          </button>
        </form>

        {/* Scroll fade — wide/bezel view only. Fades content out under the
            inline header's bottom edge as the list scrolls. Fixed 8px
            height, inside the form's own effective ~12px top gap (py-5
            minus the intro paragraph's -mt-2) so it never reaches the
            intro text. */}
        <div className="hidden min-[480px]:block pointer-events-none absolute top-0 inset-x-0 h-2 backdrop-blur-sm bg-gradient-to-b from-cream/95 to-transparent [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>
    </div>
  )
}
