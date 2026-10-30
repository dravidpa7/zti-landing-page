import { m } from 'framer-motion'
import { reveal, line } from '../utils/motion'
// Clean hairline between sections: draws in from the left, small label row underneath.
export default function Divider({ left, right }) {
  return (
    <div className="bg-ground">
      <div className="mx-auto max-w-6xl px-5 pt-4">
        <m.span {...line} aria-hidden="true" className="block h-px w-full origin-left bg-ink/20" />
        <m.div {...reveal} className="flex justify-between py-4 text-sm"><span>{left}</span><span>{right}</span></m.div>
      </div>
    </div>
  )
}
