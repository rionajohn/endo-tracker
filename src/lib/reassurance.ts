// Warm, non-clinical reassurance copy shown after a symptom-related selection
// on the logging form. Draws only from these two verified figures
// (Endometriosis UK, 2025) - never invent new statistics here:
//   - UK average time to endometriosis diagnosis is 9 years 4 months, up 17%
//     since 2020
//   - A quarter of patients need 10+ GP visits before endometriosis is even
//     suspected

const SEVERITY_MESSAGES: string[] = [
  "You're not imagining this. On average, women wait over 9 years for an endometriosis diagnosis - every entry like this one is exactly what helps shorten that wait for you.",
  "Rating your pain like this matters more than it might feel like right now. It's exactly the kind of detail that's often missing before someone finally gets taken seriously.",
  "That number you just logged is a real part of your story. A quarter of patients need 10 or more GP visits before endometriosis is even suspected - the pattern you're building here is what changes that.",
  "However that felt to log, well done for doing it. Average diagnosis times have gone up 17% since 2020, which makes what you're doing right now even more valuable.",
]

const SYMPTOM_MESSAGES: string[] = [
  "Noting that down matters. On average it takes over 9 years to get an endometriosis diagnosis - details like this one are exactly what can help speed that up.",
  "You're building real evidence, one entry at a time. A quarter of patients see a GP 10 or more times before endometriosis is even considered - a clear pattern like yours can change that.",
  "That's worth writing down, and you just did. Diagnosis times have gone up 17% since 2020, which is exactly why what you're doing here counts.",
  "You know your body best, and this is proof of it. It can take over 9 years on average to get diagnosed - every symptom you log chips away at that wait.",
]

let lastSeverityIndex = -1
let lastSymptomIndex = -1

function pickFrom(pool: string[], lastIndex: number, setLast: (i: number) => void): string {
  if (pool.length === 1) return pool[0]
  let index = Math.floor(Math.random() * pool.length)
  while (index === lastIndex) {
    index = Math.floor(Math.random() * pool.length)
  }
  setLast(index)
  return pool[index]
}

export function pickReassuranceMessage(kind: 'severity' | 'symptom'): string {
  if (kind === 'severity') {
    return pickFrom(SEVERITY_MESSAGES, lastSeverityIndex, (i) => { lastSeverityIndex = i })
  }
  return pickFrom(SYMPTOM_MESSAGES, lastSymptomIndex, (i) => { lastSymptomIndex = i })
}
