import { m, useScroll, useSpring } from 'framer-motion'
// Thin page-progress bar. Transform only, so it never triggers layout.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return <m.div aria-hidden="true" style={{ scaleX }} className="fixed left-0 top-0 z-30 h-0.5 w-full origin-left bg-brand-blue" />
}
