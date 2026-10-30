import { m } from 'framer-motion'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { reveal, line } from '../utils/motion'
import Button from './Button'

export default function HomeContactCta() {
  const { company } = useContent()
  const phone = company.phone?.trim()
  const whatsapp = company.whatsapp?.trim() || phone
  const mailto = `mailto:${company.email}?subject=${encodeURIComponent('Let’s get in touch')}&body=${encodeURIComponent('Hi Aaryan Tech,\n\nI’d like to discuss a project with your team.\n\n')}`

  const links = [
    { icon: Mail, label: company.email, href: `mailto:${company.email}` },
    phone && { icon: Phone, label: phone, href: `tel:${phone.replace(/[^\d+]/g, '')}` },
    whatsapp && { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${whatsapp.replace(/\D/g, '')}`, external: true },
  ].filter(Boolean)

  return (
    <section className="bg-ground py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <m.span {...line} aria-hidden="true" className="block h-px w-full origin-left bg-ink/20" />
        <div className="grid gap-12 pt-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <m.p {...reveal} className="mb-4">Have a project in mind?</m.p>
            <m.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}
              className="text-5xl font-medium leading-[0.98] tracking-[-0.04em] md:text-8xl">
              Let’s get in touch.
            </m.h2>
          </div>

          <m.div {...reveal} transition={{ ...reveal.transition, delay: 0.16 }} className="md:col-span-5 md:pt-4">
            <p className="max-w-md text-lg leading-relaxed text-ink/70">
              Tell us what you’re building. We’d love to hear from you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact">Contact now</Button>
              <m.a href={mailto} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-base font-medium transition-colors hover:bg-ink hover:text-ground">
                <Mail size={16} aria-hidden="true" /> Email us
              </m.a>
            </div>

            <ul className="mt-12 border-b border-ink/10">
              {links.map(({ icon: Icon, label, href, external }) => (
                <li key={href}>
                  <m.a href={href} whileHover={{ x: 6 }} whileTap={{ scale: 0.99 }}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex items-center gap-4 border-t border-ink/10 py-4 text-lg">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-surface transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    {label}
                    <span aria-hidden="true" className="ml-auto -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                  </m.a>
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </div>
    </section>
  )
}