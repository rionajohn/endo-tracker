interface RadioGroupProps<T extends string> {
  legend: string
  name: string
  options: T[]
  labels: Record<T, string>
  /** Pass undefined for a required-but-unanswered-yet question - no option renders as checked. */
  value: T | undefined
  onChange: (next: T) => void
}

export default function RadioGroup<T extends string>({
  legend,
  name,
  options,
  labels,
  value,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink mb-2">{legend}</legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const checked = value === option
          return (
            <label
              key={option}
              className={`flex items-center gap-3 min-h-11 px-3 rounded-3xl border cursor-pointer select-none transition-colors ${
                checked ? 'bg-pink-100 border-pink-400' : 'bg-white border-transparent'
              }`}
            >
              <input
                type="radio"
                name={name}
                className="h-5 w-5 accent-pink-500 shrink-0"
                checked={checked}
                onChange={() => onChange(option)}
              />
              <span className="text-sm text-ink">{labels[option]}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
