import type { ReactNode } from 'react'

/**
 * Renders children inside a fixed phone-width container, centred on the
 * page, so the app looks and behaves like a phone screen on any device
 * (including desktop browsers). Everything outside the frame is just
 * neutral page background.
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="h-svh w-full bg-stone-200 flex justify-center font-sans print:bg-white">
      <div className="w-full max-w-[420px] h-svh bg-cream flex flex-col shadow-xl print:shadow-none print:max-w-none">
        {children}
      </div>
    </div>
  )
}
