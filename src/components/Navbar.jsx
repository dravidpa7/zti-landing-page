import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, m, useScroll, useMotionValueEvent } from 'framer-motion'
import Mark from './Mark'
import Button from './Button'
import { ease } from '../utils/motion'
import { icons } from '../utils/icons'
import { useContent } from '../context/ContentContext'

const Chevron = ({ open }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
    <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
const underline = (on) =>
  `relative inline-flex items-center gap-1.5 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100 ${on ? 'after:scale-x-100' : 'after:scale-x-0'}`

export default function Navbar() {
  const { products, services, blogs } = useContent()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(null) // 'products' | 'services' | 'blogs'
  const [mobile, setMobile] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setHidden(v > scrollY.getPrevious() && v > 200))
  useEffect(() => { setOpen(null); setMobile(false) }, [pathname])
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  const menus = {
    products: { label: 'Products', to: '/products', heading: 'Explore what we build', list: 'Products', items: products.map((p) => ({ label: p.name, to: `/products/${p.id}`, icon: p.icon })) },
    services: { label: 'Services', to: '/services', heading: 'How we can help your team', list: 'Services', items: services.map((s) => ({ label: s.name, to: `/services/${s.id}`, icon: s.icon })) },
    blogs: { label: 'Blogs', to: '/blogs', heading: 'Notes from our engineers', list: 'Latest posts', items: blogs.slice(0, 4).map((b) => ({ label: b.title, to: `/blogs/${b.id}`, icon: 'FileText' })) },
  }
  const plain = [['Careers', '/careers'], ['Corporate training', '/training']]
  const cur = open && menus[open]
  const on = (to) => pathname === to || pathname.startsWith(to + '/')

  return (
    <m.header animate={{ y: hidden && !open && !mobile ? '-100%' : 0 }} transition={{ duration: 0.3, ease }}
      onMouseLeave={() => setOpen(null)} className="sticky top-0 z-20 border-b border-ink/10 bg-ground/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="group flex items-center gap-2 text-lg font-medium"><Mark />Aaryan</Link>
        <ul className="hidden items-center gap-8 text-[15px] md:flex">
          {Object.entries(menus).map(([k, mn]) => (
            <li key={k} onMouseEnter={() => setOpen(k)}>
              <button type="button" aria-expanded={open === k} onClick={() => setOpen(open === k ? null : k)} className={underline(on(mn.to) || open === k)}>
                {mn.label}<Chevron open={open === k} />
              </button>
            </li>
          ))}
          {plain.map(([l, to]) => (
            <li key={to} onMouseEnter={() => setOpen(null)}><Link to={to} className={underline(on(to))}>{l}</Link></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Button to="/contact" className="hidden !px-5 !py-2 text-[15px] md:inline-flex">Contact</Button>
          <button type="button" aria-label="Menu" aria-expanded={mobile} onClick={() => setMobile(!mobile)} className="p-2 md:hidden">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {mobile ? <path d="M5 5l12 12M17 5 5 17" /> : <path d="M3 7h16M3 15h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {cur && (
          <m.div key="panel" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease }} className="absolute left-0 top-full hidden w-full border-b border-ink/10 bg-ground md:block">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-3xl font-semibold leading-tight tracking-[-0.02em]">{cur.heading}</p>
                <Link to={cur.to} className="mt-8 inline-flex rounded-full bg-surface px-5 py-2.5 text-[15px] transition-colors hover:bg-ink/10">See overview</Link>
              </div>
              <div className="md:col-span-5 md:border-l md:border-ink/10 md:pl-10">
                <p className="mb-4 text-sm text-ink/60">{cur.list}</p>
                <ul className="space-y-1">
                  {cur.items.map((i) => (
                    <li key={i.to}><Link to={i.to} className="group flex items-center gap-3 py-1 text-lg transition-transform duration-200 hover:translate-x-1">{icons[i.icon] && (() => { const I = icons[i.icon]; return <I size={18} strokeWidth={1.6} className="shrink-0 text-ink/50 transition-transform duration-200 group-hover:scale-125 group-hover:text-ink" /> })()}{i.label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </m.div>
        )}
        {mobile && (
          <m.ul key="mobile" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease }} className="absolute left-0 top-full w-full space-y-1 border-b border-ink/10 bg-ground px-5 py-6 text-2xl font-medium md:hidden">
            {[...Object.values(menus).map((mn) => [mn.label, mn.to]), ...plain, ['Contact', '/contact']].map(([l, to]) => (
              <li key={to}><Link to={to} className="block py-2">{l}</Link></li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </m.header>
  )
}
