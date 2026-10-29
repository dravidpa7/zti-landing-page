import { m } from 'framer-motion'
import MotionLink from './MotionLink'
import { reveal, line } from '../utils/motion'
import IconBadge from './IconBadge'
// rows: [{ meta, title, text, to? | href? }]. Rows with a link get the hover nudge and arrow.
export default function RowList({ rows }) {
  return (
    <div className="border-b border-black/10">
      {rows.map((r, i) => {
        const link = r.to || r.href
        const A = r.to ? MotionLink : r.href ? m.a : m.div
        return (
          <A key={r.title} {...(r.to ? { to: r.to } : r.href ? { href: r.href } : {})} {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.06 }} whileHover={link ? { x: 6 } : undefined} whileTap={link ? { scale: 0.99 } : undefined}
            className="group relative grid gap-3 py-8 md:grid-cols-12 md:gap-8">
            <m.span {...line} aria-hidden="true" className="absolute left-0 top-0 h-px w-full origin-left bg-black/15" />
            <p className="flex items-center gap-3 md:col-span-3">{r.icon && <IconBadge name={r.icon} size={40} />}{r.meta}</p>
            <h3 className="text-2xl font-medium tracking-[-0.02em] md:col-span-4 md:text-3xl">
              {r.title}
              {link && <span aria-hidden="true" className="ml-3 inline-block -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>}
            </h3>
            <p className="max-w-md text-lg leading-relaxed md:col-span-5">{r.text}</p>
          </A>
        )
      })}
    </div>
  )
}
