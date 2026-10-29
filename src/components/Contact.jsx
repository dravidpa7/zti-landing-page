import { useState } from 'react'
import { m } from 'framer-motion'
import { Send, User, Building2, Check } from 'lucide-react'
import { reveal } from '../utils/motion'
import { useContent } from '../context/ContentContext'
import { contactService } from '../services/contactService'
import { countries } from '../utils/countries'

const empty = { name: '', email: '', position: '', dial: countries[0][2], phone: '', message: '' }
const base = 'peer w-full border-b border-ink/20 bg-transparent py-3 text-lg outline-none placeholder:text-ink/40'

// Underline field; the dark bar draws across on focus.
function Field({ children }) {
  return (
    <label className="relative block">
      {children}
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 peer-focus:scale-x-100" />
    </label>
  )
}

export default function Contact() {
  const { company: { email: toEmail } } = useContent()
  const [type, setType] = useState('Individual')
  const [f, setF] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | sending | done | mail | error
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const org = type === 'Organisation'

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const { position, ...rest } = f
      const res = await contactService.submit({ type, ...rest, ...(org ? { position } : {}) }, toEmail)
      setStatus(res.mode === 'api' ? 'done' : 'mail')
    } catch {
      setStatus('error')
    }
  }

  const note = 'Our team will reach out to you within 24 hours.'
  return (
    <section id="contact" className="bg-tint py-28 md:py-48">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-12">
        <m.h2 {...reveal} className="text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:col-span-6 md:text-7xl">Tell us what you are building.</m.h2>
        <m.div {...reveal} className="md:col-span-5 md:col-start-8">
          {status === 'done' || status === 'mail' ? (
            <div role="status" className="space-y-3 text-lg">
              <p className="flex items-center gap-3 text-2xl font-medium"><m.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white"><Check size={18} /></m.span>{status === 'done' ? `Thank you, ${f.name}.` : 'Almost done.'}</p>
              <p>{status === 'done' ? note : `Your email app should have opened with your message. Press send there to finish. ${note}`}</p>
              <button type="button" onClick={() => { setF(empty); setStatus('idle') }} className="underline underline-offset-4">Send another enquiry</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div role="group" aria-label="Enquiry type" className="inline-flex rounded-full bg-black/5 p-1 text-[15px]">
                {['Individual', 'Organisation'].map((t) => (
                  <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2 transition-colors duration-200 ${type === t ? 'bg-ink text-white' : 'hover:bg-black/5'}`}>{t === 'Individual' ? <User size={16} /> : <Building2 size={16} />}{t}</button>
                ))}
              </div>
              <Field><span className="sr-only">Name</span>
                <input required className={base} placeholder={org ? 'Your name' : 'Name'} autoComplete="name" value={f.name} onChange={set('name')} /></Field>
              <Field><span className="sr-only">Email</span>
                <input required type="email" className={base} placeholder="Email" autoComplete="email" value={f.email} onChange={set('email')} /></Field>
              {org && (
                <Field><span className="sr-only">Position</span>
                  <input required className={base} placeholder="Your position in the organisation" autoComplete="organization-title" value={f.position} onChange={set('position')} /></Field>
              )}
              <div className="flex gap-3">
                <label className="w-36 shrink-0"><span className="sr-only">Country code</span>
                  <select className={`${base} cursor-pointer`} value={f.dial} onChange={set('dial')}>
                    {countries.map(([iso, name, dial]) => <option key={iso} value={dial}>{iso} {dial} · {name}</option>)}
                  </select></label>
                <div className="grow"><Field><span className="sr-only">Mobile number</span>
                  <input required type="tel" inputMode="numeric" pattern="[0-9 ]{6,14}" title="Digits only, 6 to 14 numbers" className={base}
                    placeholder="Mobile number" autoComplete="tel-national" value={f.phone} onChange={set('phone')} /></Field></div>
              </div>
              <Field><span className="sr-only">What do you need?</span>
                <textarea required rows={4} className={base} placeholder="What do you need?" value={f.message} onChange={set('message')} /></Field>
              <m.button type="submit" disabled={status === 'sending'} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.2 }}
                className="group inline-flex items-center rounded-full bg-ink px-6 py-3 text-base font-medium text-white disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : <>Submit<Send size={16} className="ml-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-1" /></>}
              </m.button>
              {status === 'error' && <p role="alert" className="text-brand-red">Something went wrong. Please try again, or email {toEmail}.</p>}
              <p className="text-sm text-ink/70">Note: {note}</p>
            </form>
          )}
        </m.div>
      </div>
    </section>
  )
}
