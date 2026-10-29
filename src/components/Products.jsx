import { m } from 'framer-motion'
import { reveal, line } from '../utils/motion'
export default function Products({ items }) {
  return (
    <section id="products" className="bg-tint py-28 md:py-48">
      <div className="mx-auto max-w-6xl px-5">
        <m.h2 {...reveal} className="max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:text-7xl">Products we build ourselves.</m.h2>
        <div className="mt-20 border-b border-black/10">
          {items.map((p, i) => (
            <m.article key={p.id} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}
              whileHover={{ x: 6 }} className="group relative grid gap-4 py-10 md:grid-cols-12 md:gap-8">
              <m.span {...line} aria-hidden="true" className="absolute left-0 top-0 h-px w-full origin-left bg-black/15" />
              <p className="md:col-span-3">{p.tag}</p>
              <h3 className="text-3xl font-medium tracking-[-0.02em] md:col-span-4 md:text-4xl">
                {p.name}
                <span aria-hidden="true" className="ml-3 inline-block -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
              </h3>
              <p className="max-w-md text-lg leading-relaxed md:col-span-5">{p.text}</p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}
