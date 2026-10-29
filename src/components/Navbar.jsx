import { useEffect, useState } from 'react'
import { m, useScroll, useMotionValueEvent } from 'framer-motion'
import Mark from './Mark'
import Button from './Button'
import { ease } from '../utils/motion'
const links = [['Products', '#products'], ['Services', '#services'], ['Blogs', '#blogs']]
export default function Navbar() {
  const [active, setActive] = useState('')
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  // Macro: bar slides away on scroll down, returns on scroll up.
  useMotionValueEvent(scrollY, 'change', (v) => setHidden(v > scrollY.getPrevious() && v > 200))
  // Micro: underline stays on the section in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' })
    links.forEach(([, h]) => { const el = document.querySelector(h); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <m.header animate={{ y: hidden ? '-100%' : 0 }} transition={{ duration: 0.3, ease }}
      className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="group flex items-center gap-2 text-lg font-medium"><Mark />Aaryan</a>
        <ul className="hidden gap-8 text-[15px] md:flex">
          {links.map(([l, h]) => (
            <li key={h}><a href={h} className={`relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100 ${active === h ? 'after:scale-x-100' : 'after:scale-x-0'}`}>{l}</a></li>
          ))}
        </ul>
        <Button href="#contact" className="!px-5 !py-2 text-[15px]">Contact</Button>
      </nav>
    </m.header>
  )
}
