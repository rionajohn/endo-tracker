# Endo Tracker

A mobile-first symptom tracking app for endometriosis, designed to help women document their symptoms and produce a clinically structured summary to share with their GP.

## What it does

Endo Tracker helps users log symptoms using the SOCRATES framework (Site, Onset, Character, Radiation, Timing, Exacerbating/relieving factors, Severity) — the same structure a clinician uses when taking a history. From those logs it generates two outputs:

- **Patient-facing "Wrapped" summary** — plain-language slides showing the user their own symptom pattern, without clinical jargon.
- **GP-facing report** — a structured SOCRATES summary built to be quickly read and acted on by a clinician.

Threshold flagging logic (based on NICE NG73) highlights when logged symptoms warrant a "consider seeing your GP" recommendation.

All data is stored locally in the browser (localStorage). There is no backend or account system.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Vitest + Testing Library

## Running locally

**Prerequisites:** Node.js 18 or later.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser. The app renders inside a phone-width frame so it looks and behaves like a mobile app even on desktop.

## Other commands

```bash
npm run build      # Type-check and build for production
npm run preview    # Preview the production build locally
npm run test       # Run the test suite
npm run lint       # Lint the codebase
```

## Clinical basis

Flagging thresholds are derived from [NICE NG73](https://www.nice.org.uk/guidance/ng73) (Endometriosis: diagnosis and management). The app flags and recommends — it never diagnoses.
