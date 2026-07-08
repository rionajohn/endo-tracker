import { useEffect, useState, type ReactNode } from 'react'

// Bezel's natural (unscaled) footprint — box-sizing: border-box, so this
// includes the border. Kept in sync with the min-[480px]:w-[390px]/h-[780px]
// classes below.
const BEZEL_WIDTH = 390
const BEZEL_HEIGHT = 780
const BEZEL_BREAKPOINT = 480

function computeBezelScale() {
  if (typeof window === 'undefined' || window.innerWidth < BEZEL_BREAKPOINT) return 1
  const widthScale = window.innerWidth / BEZEL_WIDTH
  const heightScale = window.innerHeight / BEZEL_HEIGHT
  return Math.min(1, widthScale, heightScale)
}

// Shrinks the whole bezel proportionally (transform: scale) when the
// viewport is too short/narrow to fit it at natural size, so nothing gets
// cropped. Only active on wide (bezel) viewports — narrow/real-mobile
// viewports always render at scale 1.
function useBezelScale() {
  const [scale, setScale] = useState(computeBezelScale)

  useEffect(() => {
    function handleResize() {
      setScale(computeBezelScale())
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return scale
}

export default function PhoneFrame({ children }: { children: ReactNode }) {
  const scale = useBezelScale()

  return (
    // Page — stone-200 on wide (neutral bg behind bezel), same on narrow (hidden by full-screen app)
    <div className="h-svh w-full bg-stone-200 flex justify-center min-[480px]:items-center font-sans print:bg-white overflow-hidden">

      {/*
        Narrow (<480px): transparent passthrough — w-full h-full so the app
        fills the screen exactly as before. No border, no shadow, no chrome.

        Wide (≥480px): decorative device bezel — fixed phone dimensions,
        dark rounded border, overflow-hidden to clip app to the frame shape.
        The absolute-positioned notch and home indicator are decoration only.
        Scaled down (transform) to fit short/narrow viewports without cropping.
      */}
      <div
        className="
          w-full h-full
          min-[480px]:relative
          min-[480px]:w-[390px] min-[480px]:h-[780px]
          min-[480px]:rounded-[3rem]
          min-[480px]:border-[10px] min-[480px]:border-stone-900
          min-[480px]:shadow-[0_40px_100px_rgba(0,0,0,0.55)]
          min-[480px]:overflow-hidden
        "
        style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
      >

        {/* Dynamic-Island-style pill notch — wide only */}
        <div className="hidden min-[480px]:block absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-7 bg-stone-900 rounded-full z-50" />

        {/* Inner app — h-full inherits bezel height on wide, svh on narrow */}
        <div className="w-full max-w-[420px] h-full bg-cream flex flex-col shadow-xl print:shadow-none print:max-w-none">
          {children}
        </div>

        {/* Home-indicator bar — wide only */}
        <div className="hidden min-[480px]:block absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-stone-900/20 rounded-full z-50" />

      </div>
    </div>
  )
}
