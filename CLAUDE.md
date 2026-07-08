# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project: Endometriosis symptom tracker (MVP)

- Stack: React, Vite, TypeScript, Tailwind CSS. Client-side only, no backend - store data in
  localStorage for MVP.
- This is a mobile-first app. On all screen sizes, the app renders inside a fixed phone-width
  frame (max-width: 420px), centred on the page, so it looks and behaves like a phone screen
  even when viewed on a desktop browser. Outside that frame is just page background.
- Touch-friendly targets: buttons and tappable elements at least 44px tall.
- Add the viewport meta tag for correct mobile scaling.
- Symptom logging fields must map to SOCRATES: Site, Onset, Character, Radiation, Timing,
  Exacerbating/relieving factors, Severity - always captured in full, regardless of how they're
  displayed to the patient.
- Flagging thresholds are based on NICE NG73 - flag any invented threshold clearly as a
  placeholder needing clinical review.
- Two outputs, same data: patient-facing "Wrapped" slides use plain language, one idea per
  slide, no clinical terminology. The GP-facing report keeps full SOCRATES structure and
  terminology.
- Never phrase output as a diagnosis. Always phrase as "a pattern to discuss with your GP".
- See @BRIEF.md for the full project brief.
- The app has distinct screens (Home, Log symptom, History, Wrapped slides, GP report), not
  one long scrolling page. Only one screen is visible at a time, switched via navigation.
- The phone frame has three fixed regions: a header (optional, per screen), a scrollable
  content area in the middle that changes per screen, and a persistent bottom navigation bar
  that never scrolls out of view and stays identical across all screens except the active
  tab indicator.
- Only the middle content area scrolls. The phone frame itself, the header, and the bottom
  nav never move.
- The bottom nav has five items: Home, Calendar, Log Symptoms (centre), Community, Profile.
  Log Symptoms is a raised circular plus (+) button, larger than the other four, elevated
  above the nav bar line, filled with the primary colour (pink-300), no label. The other
  four are standard icon + label items.
- Community and Profile are placeholder "Coming soon" screens — no real functionality is
  built for MVP. Scope decisions for these screens are pending.
