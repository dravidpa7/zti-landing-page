import { m } from 'framer-motion'
import { icons } from '../utils/icons'
// Round icon chip. Micro: springs up and tilts on hover, squeezes on press.
export default function IconBadge({ name, size = 44, className = '' }) {
  const I = icons[name]
  if (!I) return null
  return (
    <m.span whileHover={{ scale: 1.1, rotate: -6 }} whileTap={{ scale: 0.92 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      style={{ width: size, height: size }} className={`inline-flex shrink-0 items-center justify-center rounded-full border border-black/5 bg-white text-ink ${className}`}>
      <I size={size * 0.45} strokeWidth={1.6} aria-hidden="true" />
    </m.span>
  )
}
