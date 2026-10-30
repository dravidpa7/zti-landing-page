import { useRef } from 'react'
import { m, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import IconBadge from '../components/IconBadge'
import Button from '../components/Button'
import { reveal, line } from '../utils/motion'

const lead = 'A website is not just a digital presence. It is an extension of your business, your vision, and everything you aspire to become. At Aaryan Tech, we believe that building a successful digital presence starts long before writing a single line of code.'

const points = [
  { icon: 'Workflow', text: 'We begin by understanding your business ideology, studying your industry, analysing your market, and identifying the opportunities that can take your business forward. We then bring together strategic thinking, creative ideas, technology, and the right communication to build solutions that don’t just look good but serve a purpose.' },
  { icon: 'Globe', text: 'From developing your digital identity and creating meaningful websites to planning business strategies, strengthening your market presence, and helping you connect with the right audience, we look beyond the immediate requirements to support your long-term growth.' },
  { icon: 'Sparkles', text: 'We also believe that great ideas shouldn’t remain ideas simply because they lack the right support. Whether you’re an aspiring entrepreneur, an established business, or someone with an idea worth pursuing, we’re here to help you take that next step.' },
]

const closing = [
  { text: 'We don’t believe in building just for the sake of building.', dim: true },
  { text: 'We build with purpose, with strategy, and with a vision for growth.' },
  { text: 'For us, success isn’t just about what we create. It’s about what we help you achieve.' },
]

// One word of the lead. It lights up as you scroll through the paragraph (p = progress, 0 to 1).
function Word({ w, i, n, p }) {
  const s = (i / n) * 0.85
  const o = useTransform(p, [s, s + 0.12], [0.22, 1])
  return <m.span style={{ opacity: o }} className="inline-block pr-[0.25em]">{w}</m.span>
}

export default function OurApproach() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const done = useMotionValue(1)
  const p = reduce ? done : scrollYProgress // reduced motion: all words fully lit
  const words = lead.split(' ')

  return (
    <>
      <PageHeader
        eyebrow="What makes us stand out?"
        titleWidthClassName="max-w-6xl"
        title={<>We don’t just build.<br /><span className="lg:whitespace-nowrap lg:text-[clamp(2.5rem,5vw,3.75rem)]">We build with Purpose &amp; Strategy.</span></>}
      />

      {/* The idea, set large; words light up as you read */}
      <section className="bg-ground pb-20 pt-16 md:pb-32 md:pt-24">
        <div className="mx-auto max-w-6xl px-5">
          <p ref={ref} aria-label={lead} className="max-w-5xl text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-5xl">
            {words.map((w, i) => <span key={i} aria-hidden="true"><Word w={w} i={i} n={words.length} p={p} /></span>)}
          </p>
        </div>
      </section>

      {/* How we work, one row each */}
      <section className="bg-surface pt-20 pb-10 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="border-b border-ink/10">
            {points.map((pt, i) => (
              <m.div key={pt.icon} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="relative grid gap-5 py-10 md:grid-cols-12 md:gap-8 md:py-14">
                <m.span {...line} aria-hidden="true" className="absolute left-0 top-0 h-px w-full origin-left bg-ink/15" />
                <div className="flex items-center gap-4 md:col-span-4">
                  <IconBadge name={pt.icon} size={48} />
                  <span className="text-sm text-ink/50">0{i + 1}</span>
                </div>
                <p className="max-w-2xl text-xl leading-relaxed text-ink/70 md:col-span-8 md:text-2xl">{pt.text}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* The promise */}
      <section className="bg-ground pt-10 pb-24 md:pt-16 md:pb-40">
        <div className="mx-auto max-w-6xl px-5">
          <m.p {...reveal} className="max-w-5xl text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-5xl">
            {closing.map((c) => <span key={c.text} className={c.dim ? 'text-ink/40' : ''}>{c.text} </span>)}
          </m.p>
          <m.div {...reveal} className="mt-12"><Button to="/contact">Talk to us</Button></m.div>
        </div>
      </section>
    </>
  )
}