import { useRef } from 'react'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Mark from './Mark'
import Button from './Button'
import DashRing from './DashRing'
import Typewriter from './Typewriter'
import { ease } from '../utils/motion'
const fade = (d) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease } })
const wordsIn = { v: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }
const wordIn = { h: { y: '110%' }, v: { y: 0, transition: { duration: 0.8, ease } } }
export default function Hero({ company }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  // Macro: while scrolling past, the ring grows and fades, the text drifts up.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.4])
  const ringOpacity = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.1])
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90])
  return (
    <section ref={ref} id="top" className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-5 text-center">
      <m.div style={{ scale: ringScale, opacity: ringOpacity }} className="absolute inset-0"><DashRing /></m.div>
      <m.div style={{ y: textY }} className="relative">
        <m.div {...fade(0)} className="mb-6 flex items-center justify-center gap-2 text-xl font-medium"><Mark size={28} />Aaryan Tech</m.div>
        <m.h1 aria-label={company.tagline} variants={wordsIn} initial="h" animate="v"
          className="mx-auto max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.04em] md:text-8xl">
          {company.tagline.split(' ').map((w, i) => (
            <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom pr-[0.25em] -mb-[0.12em]">
              <m.span variants={wordIn} className="inline-block">{w}</m.span>
            </span>
          ))}
        </m.h1>
        <m.p {...fade(0.5)} className="mt-6 min-h-8 text-xl text-ink/70">We build <Typewriter texts={company.typed} className="text-ink" /></m.p>
        <m.div {...fade(0.6)} className="mt-8"><Button to="/contact">Talk to us</Button></m.div>
      </m.div>
    </section>
  )
}
