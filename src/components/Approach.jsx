import { useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { ease, reveal } from '../utils/motion'
import Button from './Button'

const steps = [
  { title: 'Understand', description: 'We learn about your goals, your users, and the challenges you want to solve.' },
  { title: 'Analyse', description: 'We look closely at your workflows and needs to find the right opportunities.' },
  { title: 'Strategise', description: 'We shape a clear plan, set priorities, and agree on what success looks like.' },
  { title: 'Create', description: 'We design, build, and refine a solution with your team.' },
  { title: 'Grow', description: 'We launch, learn from real feedback, and keep improving together.' },
]

export default function Approach() {
  const [activeStep, setActiveStep] = useState(0)
  const reduceMotion = useReducedMotion()
  const active = steps[activeStep]

  return (
    <section aria-labelledby="approach-title" className="bg-tint px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <m.div {...reveal}>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-ink/50">How we work</p>
          <h2 id="approach-title" className="text-4xl font-medium tracking-[-0.03em] md:text-6xl">Our approach:</h2>
        </m.div>

        <div className="mt-10 flex flex-wrap items-center gap-y-3 md:mt-14">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              <button
                type="button"
                aria-pressed={activeStep === index}
                onClick={() => setActiveStep(index)}
                className={`group flex items-center gap-3 rounded-full px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue md:px-4 ${
                  activeStep === index ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                  activeStep === index ? 'bg-white/15 text-white' : 'bg-white text-ink/50 group-hover:text-ink'
                }`}>
                  0{index + 1}
                </span>
                <span className="whitespace-nowrap text-base font-medium md:text-lg">{step.title}</span>
              </button>
              {index < steps.length - 1 && (
                <span aria-hidden="true" className="mx-1 text-ink/30 md:mx-3">→</span>
              )}
            </div>
          ))}
        </div>

        <m.div
          {...reveal}
          aria-live="polite"
          aria-atomic="true"
          className="mt-8 min-h-36 max-w-3xl border-t border-ink/15 pt-6 md:mt-10 md:pt-8"
        >
          <m.div
            key={active.title}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease }}
          >
            <p className="text-sm font-medium text-brand-blue">0{activeStep + 1} / 05</p>
            <h3 className="mt-2 text-2xl font-medium tracking-[-0.02em] md:text-3xl">{active.title}</h3>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink/70">{active.description}</p>
          </m.div>
        </m.div>
        <m.div {...reveal} className="mt-8">
          <Button to="/our-approach">What makes us stand out?</Button>
        </m.div>
      </div>
    </section>
  )
}
