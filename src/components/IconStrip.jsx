import { icons, stripIcons } from '../utils/icons'
// Row of round icons drifting sideways (CSS only, pauses on hover). Duplicated so the loop is seamless.
export default function IconStrip() {
  const row = [...stripIcons, ...stripIcons]
  return (
    <div aria-hidden="true" className="overflow-hidden bg-white py-14 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div className="marquee flex w-max gap-6">
        {row.map((n, i) => {
          const I = icons[n]
          return <span key={i} className="flex h-20 w-20 items-center justify-center rounded-full border border-black/5 bg-tint transition-transform duration-300 hover:scale-110 hover:-rotate-6"><I size={28} strokeWidth={1.5} /></span>
        })}
      </div>
    </div>
  )
}
