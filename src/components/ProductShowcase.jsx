import { useRef } from 'react'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { reveal, ease } from '../utils/motion'
import Button from './Button'

// Panel colours per tone (set "tone" in data.json). Classes are listed in full so Tailwind keeps them.
const tones = {
  light: { panel: 'bg-[#EAEFFD]', win: 'bg-white border-black/5', bar: 'bg-black/10', cap: 'text-ink/50' },
  dark:  { panel: 'bg-black',     win: 'bg-white/10 border-white/10', bar: 'bg-white/20', cap: 'text-white/50' },
  warm:  { panel: 'bg-[#FFF3D6]', win: 'bg-white border-black/5', bar: 'bg-black/10', cap: 'text-ink/50' },
}

// Stand-in for a product screenshot. Replaced by <img> once "image" is set in data.json.
function Mock({ t, name }) {
  return (
    <div className={`h-full w-full rounded-2xl border p-5 ${t.win}`}>
      <div className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className={`h-2.5 w-2.5 rounded-full ${t.bar}`} />)}</div>
      <div className={`mt-8 h-3 w-1/3 rounded-full ${t.bar}`} />
      <div className={`mt-5 h-3 w-4/5 rounded-full ${t.bar}`} />
      <div className={`mt-3 h-3 w-3/5 rounded-full ${t.bar}`} />
      <div className={`mt-3 h-3 w-2/3 rounded-full ${t.bar}`} />
      <p className={`mt-10 text-sm ${t.cap}`}>Product image placeholder: {name}</p>
    </div>
  )
}

export function ProductPanel({ product: p, className = '' }) {
  const t = tones[p.tone] ?? tones.light
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40])
  return (
    <m.div ref={ref} initial={{ opacity: 0, scale: 0.96, y: 24 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}
      className={`relative aspect-square w-full overflow-hidden rounded-[2rem] ${t.panel} ${className}`}>
      {p.image ? (
        <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <m.div style={{ y }} className="absolute inset-x-[12%] -bottom-[8%] top-[22%]"><Mock t={t} name={p.name} /></m.div>
      )}
    </m.div>
  )
}

export default function ProductShowcase({ product: p }) {
  return (
    <section id={`product-${p.id}`} className="bg-white py-16 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-12">
        <m.div {...reveal} className="md:col-span-5">
          <p className="mb-4">{p.tag}</p>
          <h3 className="text-4xl font-medium tracking-[-0.03em] md:text-5xl">{p.name}</h3>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{p.text}</p>
          <Button to={`/products/${p.id}`} className="mt-8">Learn more</Button>
        </m.div>
        <ProductPanel product={p} className="md:col-span-6 md:col-start-7" />
      </div>
    </section>
  )
}
