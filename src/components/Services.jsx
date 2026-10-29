import { m } from 'framer-motion'
import { reveal } from '../utils/motion'
export default function Services({ items, intro }) {
  return (
    <section id="services" className="py-28 md:py-48">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 md:grid-cols-12">
        <m.p {...reveal} className="text-3xl font-medium leading-tight tracking-[-0.02em] md:col-span-7 md:text-5xl">{intro}</m.p>
        <ul className="space-y-10 md:col-span-5 md:pt-4">
          {items.map((s, i) => (
            <m.li key={s.name} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}>
              <h3 className="text-xl font-medium">{s.name}</h3>
              <p className="mt-1 text-lg leading-relaxed">{s.text}</p>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
