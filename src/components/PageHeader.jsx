import { m } from 'framer-motion'
import { reveal } from '../utils/motion'
import Typewriter from './Typewriter'
export default function PageHeader({ eyebrow, title, intro, titleWidthClassName = 'max-w-4xl' }) {
  const d = (n) => ({ ...reveal, transition: { ...reveal.transition, delay: n } })
  return (
    <section className="bg-white pt-10 md:pt-20">
      <div className="mx-auto max-w-6xl px-5">
        <m.p {...d(0)} className="mb-4 min-h-6"><Typewriter key={eyebrow} texts={eyebrow} loop={false} speed={45} /></m.p>
        <m.h1 {...d(0.08)} className={`${titleWidthClassName} text-xl font-medium leading-[0.98] tracking-[-0.04em] md:text-7xl`}>{title}</m.h1>
        {intro && <m.p {...d(0.16)} className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">{intro}</m.p>}
      </div>
    </section>
  )
}
