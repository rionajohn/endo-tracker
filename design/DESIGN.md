# DESIGN.md - Visual and UX spec

Reference images are in `design/references/`. Named references below point to specific files.

## Overall aesthetic

Direction: Intelly (Sigma Software Design) - a telemedicine/patient-monitoring healthcare app.
**Note: the specifics below are a starting point based on the genre and need confirming
against actual screenshots from the gallery - upload 2-3 key screens and I'll refine this
against what's actually there.**

- Overall feel: calm, trustworthy, clinical-but-friendly - more "considered healthcare product"
  than "wellness lifestyle app". Should read as credible to a GP, not just approachable to a patient.
- Primary colour: [confirm from screenshots - likely a calm blue or teal, common in this genre
  for healthcare trust signalling]
- Background: clean white or very light neutral, not warm/cream
- Accent colour (for flags/alerts): [confirm - likely a soft red or amber, used sparingly]
- Typography: modern sans-serif, medium weight for headings, clear hierarchy, no playful/rounded
  display type - reads more precise than the earlier "soft wellness" direction
- Corner radius: moderate, not oversized - cards read as structured/data-oriented rather than
  soft and pillowy
- Spacing: clean grid-based layout, dashboard-style information density rather than
  one-idea-per-screen minimalism
- Cards and data: expect metric cards, small charts/graphs, and structured data rows - this
  genre leans toward showing numbers and status clearly, which suits the flagging/threshold
  feature well

## Reference images and what to take from each
- `home-screen.png`: overall layout, colour palette, button style
- `log-form.png`: input field style, spacing between fields, how required fields are marked
- `wrapped-slide.png`: [whatever it shows]

Be specific about what to copy vs. ignore from each image, e.g.:
"Match the card style and colour palette in home-screen.png. Ignore the navigation bar shown -
we don't have that screen yet."

## Screen-by-screen breakdown

### Home / entry point
- [Layout: what's at the top, what's the primary action]
- [Reference: home-screen.png]

### Symptom logging form
- [Field order, grouping, input style]
- [Reference: log-form.png]

### Patient "Wrapped" slides
- [Transition style, whether dots/progress indicator shown, button style]
- [Reference: wrapped-slide.png]

### GP report
- [More formal/clinical than the rest of the app - describe how it should differ]

## Interaction details
- [Button press states, loading states, empty states]
- [Any animation/transition expectations]

## What NOT to do
- [e.g. no gradients, no drop shadows, no stock medical icons]
- [Anything from the current rudimentary build that should specifically change]
