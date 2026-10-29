import { m } from 'framer-motion'
// Micro: lifts on hover, an arrow slides in, presses down on tap.
const arrow = { rest: { width: 0, opacity: 0, marginLeft: 0 }, hover: { width: 16, opacity: 1, marginLeft: 8 } }
export default function Button({ children, href, className = '' }) {
  return (
    <m.a href={href} initial="rest" whileHover="hover" whileTap={{ scale: 0.96 }}
      variants={{ rest: { y: 0 }, hover: { y: -2 } }} transition={{ duration: 0.2 }}
      className={`inline-flex items-center rounded-full bg-ink px-6 py-3 text-base font-medium text-white ${className}`}>
      {children}
      <m.span variants={arrow} transition={{ duration: 0.2 }} className="overflow-hidden" aria-hidden="true">→</m.span>
    </m.a>
  )
}
