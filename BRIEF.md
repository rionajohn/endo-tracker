# BRIEF.md - Endometriosis Symptom Tracker (MVP)

## Problem statement

Early warning symptoms are underfunded and often unrecognised or downplayed in minority and
underrepresented groups, due to socioeconomic barriers, systemic health inequalities and lower
symptom awareness. For endometriosis specifically:

- UK average time to diagnosis is 9 years 4 months, up 17% since 2020.
- A quarter of patients need 10+ GP visits before endometriosis is even suspected
  (Endometriosis UK, 2025).
- Women report feeling dismissed and having to fight to be believed.

Core insight: a documented symptom pattern is what makes a doctor act. The absence of a
pattern is what gets women dismissed. The product's job is to help women produce that pattern.

## Who we're solving for

Young adults, women aged 18-29, who are willing to learn more about their health, want to
explore their symptoms, and potentially could have endometriosis.

## Product concept

A longitudinal symptom tracking app for endometriosis, in two phases:

**Pre-diagnosis**
- Structured symptom summary: cycle timing, drug resistance (e.g. NSAID non-response), nausea
  patterns, pain, bloating.
- Flagging threshold logic that recommends a GP visit and mentions EndoTest/EndoSure as
  referral options when thresholds are crossed.

**Post-diagnosis**
- Continue tracking symptoms after a positive EndoTest/EndoSure result, to monitor treatment
  and ongoing symptom burden. (Stub only for MVP.)

## Core MVP features

1. **Symptom tracking** - structured log (not free text) covering SOCRATES:
   Site, Onset, Character, Radiation, Timing, Exacerbating/relieving factors, Severity.
2. **Threshold flagging** - rules-based logic, thresholds derived from NICE NG73, that flags
   when logged symptoms warrant a "consider seeing your GP" recommendation.
3. **Doctor-facing output** - a "Spotify Wrapped"-style summary structured around SOCRATES,
   built to be quickly read and acted on by a clinician.

## Clinical/evidence basis

- NICE NG73 visual summary (first presentation, initial management, diagnosis, referral and
  ongoing care of suspected endometriosis) - defines the flagging thresholds and referral logic.
- ZOE MenoScale calculator (a validated 20-item digital symptom score) - credibility precedent
  for a structured self-report scoring approach.
- Endometriosis UK 2025 diagnosis report - evidence for why this matters.

## Two audiences, one dataset

The SOCRATES structure (Site, Onset, Character, Radiation, Timing, Exacerbating/relieving
factors, Severity) is the underlying data model for every symptom log - it must always be
captured in full, because it's what makes the GP-facing report clinically useful.

But SOCRATES is a clinical history-taking framework, not patient-friendly language. The two
outputs built from the same data should read very differently:

- **Patient-facing "Wrapped" slides**: plain-language, one idea per slide, no clinical
  terminology ("Radiation" becomes "Where the pain spreads to", "Exacerbating factors"
  becomes "What makes it worse"). The goal is a patient recognising and understanding their
  own pattern, not learning clinical vocabulary.
- **GP-facing report**: retains the full SOCRATES structure and terminology, since this is
  the format a clinician expects and can act on quickly.

Both are generated from the same underlying log - the SOCRATES fields are always collected,
just presented differently depending on the audience.

## USP

A clinical referral tool, not just a diary. Output is built to be handed to or read by a GP,
explicitly designed to reduce dismissal. Grounded in NICE guidance rather than an invented
threshold system.

## Explicitly out of scope for MVP

- Wearable integration.
- Any diagnostic claim ("you have endometriosis") - the app flags and recommends, it never
  diagnoses.
- Full post-diagnosis treatment tracking (stub only).
- Multi-condition tracking (endometriosis only).

## Open questions to resolve before implementation

- Storage: local-only for MVP, or a real backend from day one? (Sensitive health data -
  consider this carefully.)
- Platform: mobile-first web app, or native app for the demo?
- Report export format: PDF, shareable link, or screen-only for MVP?
