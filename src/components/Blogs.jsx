import { m } from 'framer-motion'
import { Link } from 'react-router-dom'
import MotionLink from './MotionLink'
import { reveal, line } from '../utils/motion'
import { formatDate } from '../utils/format'
export function BlogList({ items }) {
  return (
    <div className="border-b border-black/10">
      {items.map((b, i) => (
        <MotionLink key={b.id} to={`/blogs/${b.id}`} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}
          whileHover={{ x: 6 }} className="group relative grid gap-3 py-8 md:grid-cols-12 md:gap-8">
          <m.span {...line} aria-hidden="true" className="absolute left-0 top-0 h-px w-full origin-left bg-black/15" />
          <p className="md:col-span-2">{formatDate(b.date)}</p>
          <h3 className="text-2xl font-medium tracking-[-0.02em] md:col-span-5 md:text-3xl">
            {b.title}
            <span aria-hidden="true" className="ml-2 inline-block -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
          </h3>
          <p className="text-lg leading-relaxed md:col-span-4">{b.excerpt}</p>
          <p className="md:col-span-1 md:text-right">{b.readTime}</p>
        </MotionLink>
      ))}
    </div>
  )
}
export default function Blogs({ items }) {
  return (
    <section id="blogs" className="bg-white py-28 md:py-48">
      <div className="mx-auto max-w-6xl px-5">
        <m.h2 {...reveal} className="text-4xl font-medium tracking-[-0.03em] md:text-7xl">Blogs</m.h2>
        <div className="mt-16"><BlogList items={items.slice(0, 3)} /></div>
        <Link to="/blogs" className="mt-10 inline-block underline-offset-4 hover:underline">All blogs →</Link>
      </div>
    </section>
  )
}
