interface ReassuranceBannerProps {
  message: string
  onDismiss: () => void
}

export default function ReassuranceBanner({ message, onDismiss }: ReassuranceBannerProps) {
  return (
    <div className="relative bg-sage/15 border border-sage/40 rounded-2xl p-3 pr-9">
      <p className="text-sm text-ink leading-relaxed">{message}</p>
      <p className="text-[10px] text-stone-400 mt-1.5">Source: Endometriosis UK, 2025</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss message"
        className="absolute top-0 right-0 min-h-11 min-w-11 flex items-center justify-center text-stone-400 active:text-stone-600"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}
