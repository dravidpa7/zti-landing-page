import { m } from 'framer-motion'
import { Link } from 'react-router-dom'
import { reveal } from '../utils/motion'
export default function Services({ items, intro }) {
  return (
    <section id="services" className="bg-tint py-28 md:py-48">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 md:grid-cols-12">
        <m.p {...reveal} className="text-3xl font-medium leading-tight tracking-[-0.02em] md:col-span-7 md:text-5xl">{intro}</m.p>
        <div className="md:col-span-5 md:pt-4">
          <ul className="space-y-10">
            {items.map((s, i) => (
              <m.li key={s.id} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}>
                <Link to={`/services/${s.id}`} className="group block">
                  <h3 className="text-xl font-medium">{s.name}<span aria-hidden="true" className="ml-2 inline-block -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span></h3>
                  <p className="mt-1 text-lg leading-relaxed">{s.text}</p>
                </Link>
              </m.li>
            ))}
          </ul>
          <Link to="/services" className="mt-10 inline-block underline-offset-4 hover:underline">All services →</Link>
        </div>
      </div>
    </section>
  )
}
