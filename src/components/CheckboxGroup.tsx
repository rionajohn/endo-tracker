interface CheckboxGroupProps<T extends string> {
  legend: string
  options: T[]
  labels: Record<T, string>
  value: T[]
  onChange: (next: T[]) => void
}

export default function CheckboxGroup<T extends string>({
  legend,
  options,
  labels,
  value,
  onChange,
}: CheckboxGroupProps<T>) {
  function toggle(option: T) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink mb-2">{legend}</legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const checked = value.includes(option)
          return (
            <label
              key={option}
              className={`flex items-center gap-3 min-h-11 px-3 rounded-3xl border cursor-pointer select-none transition-colors ${
                checked ? 'bg-pink-100 border-pink-400' : 'bg-white border-transparent'
              }`}
            >
              <input
                type="checkbox"
                className="h-5 w-5 accent-pink-500 shrink-0"
                checked={checked}
                onChange={() => toggle(option)}
              />
              <span className="text-sm text-ink">{labels[option]}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
