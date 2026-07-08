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
      <legend className="text-sm font-semibold text-neutral-800 mb-2">{legend}</legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const checked = value.includes(option)
          return (
            <label
              key={option}
              className={`flex items-center gap-3 min-h-11 px-3 rounded-lg border cursor-pointer select-none ${
                checked ? 'bg-purple-50 border-purple-400' : 'bg-white border-neutral-300'
              }`}
            >
              <input
                type="checkbox"
                className="h-5 w-5 accent-purple-600 shrink-0"
                checked={checked}
                onChange={() => toggle(option)}
              />
              <span className="text-sm text-neutral-800">{labels[option]}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
