import { useRef } from 'react'
import { m, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion'
import { reveal } from '../utils/motion'
import Button from './Button'

const steps = [
  { title: 'Understand', description: 'We learn about your goals, your users, and the challenges you want to solve.' },
  { title: 'Analyse', description: 'We look closely at your workflows and needs to find the right opportunities.' },
  { title: 'Strategise', description: 'We shape a clear plan, set priorities, and agree on what success looks like.' },
  { title: 'Create', description: 'We design, build, and refine a solution with your team.' },
  { title: 'Grow', description: 'We launch, learn from real feedback, and keep improving together.' },
]
const dots = ['bg-brand-blue', 'bg-brand-red', 'bg-brand-yellow', 'bg-brand-orange', 'bg-brand-blue']

// One step. It brightens when the line reaches it (p = scroll progress of the list, 0 to 1).
function Step({ step, i, n, p }) {
  const c = (i + 0.5) / n
  const a = useTransform(p, [c - 0.12, c], [0.25, 1])
  const d = useTransform(p, [c - 0.12, c], [0.4, 1])
  return (
    <li className="relative py-10 pl-10 md:py-16 md:pl-16">
      <span aria-hidden="true" className="absolute left-0 top-[2.75rem] -translate-x-1/2 md:top-[4.25rem]">
        <m.span style={{ opacity: a, scale: d }} className={`block h-3 w-3 rounded-full ring-4 ring-surface ${dots[i]}`} />
      </span>
      <p className="text-sm text-ink/50">0{i + 1}</p>
      <m.h3 style={{ opacity: a }} className="mt-3 text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl lg:text-8xl">{step.title}</m.h3>
      <m.p style={{ opacity: d }} className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{step.description}</m.p>
    </li>
  )
}

export default function Approach() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const done = useMotionValue(1)
  const p = reduce ? done : scrollYProgress // reduced motion: everything fully lit, line full

  return (
    <section className="bg-surface py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-12">
        <div className="md:sticky md:top-32 md:col-span-4 md:self-start">
          <m.p {...reveal} className="mb-4">How we work</m.p>
          <m.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}
            className="text-5xl font-medium leading-[0.98] tracking-[-0.04em] md:text-7xl">Our approach.</m.h2>
          <m.div {...reveal} className="mt-10"><Button to="/our-approach">What makes us stand out?</Button></m.div>
        </div>

        <ol ref={ref} className="relative md:col-span-7 md:col-start-6">
          <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-ink/15" />
          <m.span aria-hidden="true" style={{ scaleY: p }} className="absolute left-0 top-0 h-full w-px origin-top bg-ink" />
          {steps.map((s, i) => <Step key={s.title} step={s} i={i} n={steps.length} p={p} />)}
        </ol>
      </div>
    </section>
  )
}