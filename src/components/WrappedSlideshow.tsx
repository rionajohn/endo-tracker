import { useRef, useState } from 'react'
import type { SymptomEntry } from '../types'
import { generateWrappedSlides } from '../lib/wrapped'

const SWIPE_THRESHOLD_PX = 50

export default function WrappedSlideshow({ entries }: { entries: SymptomEntry[] }) {
  const slides = generateWrappedSlides(entries)
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const slide = slides[Math.min(index, slides.length - 1)]
  const isFirst = index === 0
  const isLast = index === slides.length - 1

  function goTo(next: number) {
    setIndex(Math.max(0, Math.min(slides.length - 1, next)))
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (deltaX <= -SWIPE_THRESHOLD_PX) goTo(index + 1)
    else if (deltaX >= SWIPE_THRESHOLD_PX) goTo(index - 1)
    touchStartX.current = null
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 px-4 pt-4">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= index ? 'bg-pink-500' : 'bg-stone-200'}`}
          />
        ))}
      </div>

      <div
        className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        data-testid="wrapped-slide"
        data-slide-index={index}
      >
        {slide.flagged ? (
          <div className="bg-pink-100 rounded-3xl px-6 py-8 flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold text-ink tracking-tight">{slide.title}</h2>
            <p className="text-base leading-relaxed text-pink-800">{slide.body}</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-ink tracking-tight">{slide.title}</h2>
            <p className="text-base leading-relaxed text-stone-600">{slide.body}</p>
          </>
        )}
      </div>

      <div className="flex gap-2 p-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={isFirst}
          className="min-h-11 flex-1 rounded-full bg-stone-100 text-ink text-sm font-semibold disabled:opacity-30"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={isLast}
          className="min-h-11 flex-1 rounded-full bg-ink text-white text-sm font-semibold disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  )
}
