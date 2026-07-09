interface RangeSliderProps {
  min: number
  max: number
  step?: number
  value: number
  onChange: (next: number) => void
  onCommit?: () => void
  'aria-label': string
}

/** A styled <input type="range"> - black rounded track, purple pill thumb -
 * matching the phone frame's notch/bezel language. See index.css for the
 * actual pseudo-element styling this class hooks into. */
export default function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  onCommit,
  ...rest
}: RangeSliderProps) {
  const percent = ((value - min) / (max - min)) * 100

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      onMouseUp={onCommit}
      onTouchEnd={onCommit}
      onKeyUp={onCommit}
      style={{ '--range-fill': `${percent}%` } as React.CSSProperties}
      className="range-slider"
      {...rest}
    />
  )
}
