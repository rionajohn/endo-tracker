import type { SymptomEntry } from '../types'
import { evaluateFlags } from '../lib/flagging'
import {
  associatedSymptomLabel,
  bodySiteLabel,
  characterLabel,
  cycleRelationLabel,
  medicationResponseLabel,
  radiationLabel,
} from '../lib/socrates'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' })
}

function list(items: string[]): string {
  return items.length > 0 ? items.join(', ') : 'None reported'
}

export default function GPReport({ entries }: { entries: SymptomEntry[] }) {
  const { flagged, reasons } = evaluateFlags(entries)
  const sorted = [...entries].sort((a, b) => a.createdAt.localeCompare(b.createdAt))

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 print:hidden flex items-center justify-between">
        <h1 className="text-lg font-bold text-ink">GP report</h1>
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-11 px-4 rounded-full bg-ink text-white text-sm font-semibold"
        >
          Print / export
        </button>
      </div>

      <div
        id="printable-report"
        className="mx-4 mb-4 p-4 bg-white rounded-2xl border border-stone-200 text-sm text-ink overflow-y-auto print:mx-0 print:mb-0 print:border-none print:rounded-none"
      >
        <h1 className="text-xl font-bold">Symptom Summary Report</h1>
        <p className="text-stone-500 mt-1">
          Self-reported symptom log. Structured per SOCRATES (Site, Onset, Character, Radiation,
          Timing, Exacerbating/relieving factors, Severity). Not a diagnosis - patient-recorded
          data for clinical review.
        </p>
        <p className="text-stone-500 mt-1">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'} logged
          {sorted.length > 0 && (
            <>
              {' '}
              from {formatDate(sorted[0].createdAt)} to {formatDate(sorted[sorted.length - 1].createdAt)}
            </>
          )}
          .
        </p>

        <section
          className={`mt-4 rounded-lg border p-3 ${flagged ? 'border-pink-300 bg-pink-50' : 'border-stone-200'}`}
        >
          <h2 className="font-semibold">Threshold flag</h2>
          {flagged ? (
            <>
              <p className="mt-1 font-medium text-pink-800">
                Pattern meets referral-consideration threshold (NICE NG73-derived, placeholder pending
                clinical review).
              </p>
              <ul className="list-disc ml-5 mt-1">
                {reasons.map((r) => (
                  <li key={r.code}>{r.clinicalText}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-1 text-stone-600">No threshold currently met.</p>
          )}
        </section>

        <h2 className="font-semibold mt-5 mb-2">Entry-by-entry SOCRATES detail</h2>
        <ol className="flex flex-col gap-3">
          {sorted.map((entry, i) => (
            <li key={entry.id} className="border border-stone-200 rounded-lg p-3 break-inside-avoid">
              <p className="font-semibold">
                Entry {i + 1} - {formatDate(entry.createdAt)}
              </p>
              <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                <dt className="font-medium">Site</dt>
                <dd>{list(entry.site.map((s) => bodySiteLabel[s]))}</dd>

                <dt className="font-medium">Onset</dt>
                <dd>
                  {entry.onsetType === 'sudden' ? 'Sudden' : 'Gradual'} onset;{' '}
                  {cycleRelationLabel[entry.onsetCycleRelation]}
                </dd>

                <dt className="font-medium">Character</dt>
                <dd>
                  {list(entry.character.map((c) => characterLabel[c]))}
                  {entry.associatedSymptoms.length > 0 &&
                    `. Whole-body: ${list(entry.associatedSymptoms.map((s) => associatedSymptomLabel[s]))}`}
                </dd>

                <dt className="font-medium">Radiation</dt>
                <dd>{list(entry.radiation.map((r) => radiationLabel[r]))}</dd>

                <dt className="font-medium">Timing</dt>
                <dd>
                  {entry.bleedingOutsideWindow != null
                    ? `Bleeding outside expected period window: ${entry.bleedingOutsideWindow === 'yes' ? 'Yes' : 'No'}`
                    : 'No bleeding-timing data logged'}
                </dd>

                <dt className="font-medium">Exacerbating/relieving</dt>
                <dd>
                  {entry.medicationTaken
                    ? `Took: ${entry.medicationTaken}${
                        entry.medicationResponse ? ` (${medicationResponseLabel[entry.medicationResponse]})` : ''
                      }`
                    : 'No medication logged'}
                </dd>

                <dt className="font-medium">Severity</dt>
                <dd>{entry.severity}/10</dd>

                <dt className="font-medium">Functional impact</dt>
                <dd>
                  {entry.functionalImpact === 'none'
                    ? 'No activities affected'
                    : entry.functionalImpact === 'some'
                    ? 'Some activities affected'
                    : 'Most activities affected'}
                </dd>

                {entry.otherSymptomsNotes && (
                  <>
                    <dt className="font-medium">Other notes</dt>
                    <dd>{entry.otherSymptomsNotes}</dd>
                  </>
                )}
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
