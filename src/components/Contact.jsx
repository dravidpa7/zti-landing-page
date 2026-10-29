import { useState } from 'react'
import { m } from 'framer-motion'
import { reveal } from '../utils/motion'
import Button from './Button'
// No backend yet: the button opens the visitor's mail app with their message filled in.
export default function Contact({ email }) {
  const [f, setF] = useState({ name: '', message: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const href = `mailto:${email}?subject=${encodeURIComponent('Project enquiry from ' + (f.name || 'website'))}&body=${encodeURIComponent(f.message)}`
  const field = 'peer w-full border-b border-ink/20 bg-transparent py-3 text-lg outline-none'
  const bar = <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 peer-focus:scale-x-100" />
  return (
    <section id="contact" className="bg-tint py-28 md:py-48">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-12">
        <m.h2 {...reveal} className="text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:col-span-6 md:text-7xl">Tell us what you are building.</m.h2>
        <m.div {...reveal} className="space-y-6 md:col-span-5 md:col-start-8">
          <label className="relative block"><span className="sr-only">Your name</span>
            <input className={field} placeholder="Your name" value={f.name} onChange={set('name')} />{bar}</label>
          <label className="relative block"><span className="sr-only">Message</span>
            <textarea className={field} rows={4} placeholder="What do you need?" value={f.message} onChange={set('message')} />{bar}</label>
          <Button href={href}>Send by email</Button>
        </m.div>
      </div>
    </section>
  )
}
