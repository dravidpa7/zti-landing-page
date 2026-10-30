
import { m } from 'framer-motion'
import { reveal } from '../utils/motion'
import Button from './Button'

const steps = [
  {
    title: 'Understand',
    description: 'We learn about your goals, your users, and the challenges you want to solve.',
  },
  {
    title: 'Analyse',
    description: 'We look closely at your workflows and needs to find the right opportunities.',
  },
  {
    title: 'Strategise',
    description: 'We shape a clear plan, set priorities, and agree on what success looks like.',
  },
  {
    title: 'Create',
    description: 'We design, build, and refine a solution with your team.',
  },
  {
    title: 'Grow',
    description: 'We launch, learn from real feedback, and keep improving together.',
  },
]

export default function Approach() {
  return (
    <section className="bg-tint px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">

        <m.div {...reveal}>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-ink/50">
            How we work
          </p>
          <h2 className="text-4xl font-medium tracking-[-0.03em] md:text-6xl">
            Our approach:
          </h2>
        </m.div>

        <div className="mt-12 grid gap-8 md:grid-cols-5">
          {steps.map((step, index) => (
            <m.div key={step.title} {...reveal}>
              <p className="mb-4 text-sm font-medium text-brand-blue">
                0{index + 1}
              </p>
              <h3 className="mb-3 text-xl font-medium">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-ink/70">
                {step.description}
              </p>
            </m.div>
          ))}
        </div>

        <m.div {...reveal} className="mt-12">
          <Button to="/our-approach">
            What makes us stand out?
          </Button>
        </m.div>

      </div>
    </section>
  )
}
