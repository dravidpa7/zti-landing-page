import { useParams } from 'react-router-dom'
import { m } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import { reveal } from '../utils/motion'
import PageHeader from '../components/PageHeader'
import RowList from '../components/RowList'
import Button from '../components/Button'
import { Check } from 'lucide-react'
import NotFound from './NotFound'
export function ServicesPage() {
  const { services, company } = useContent()
  return (<>
    <PageHeader eyebrow="Services" title="Engineering, when you need a team." intro={company.intro} />
    <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-6xl px-5">
      <RowList rows={services.map((s) => ({ meta: 'Service', title: s.name, text: s.text, icon: s.icon, to: `/services/${s.id}` }))} />
    </div></section>
  </>)
}
export function ServiceDetail() {
  const { id } = useParams()
  const { services } = useContent()
  const s = services.find((x) => x.id === id)
  if (!s) return <NotFound />
  return (<>
    <PageHeader eyebrow="Service" title={s.name} intro={s.text} />
    <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-6xl px-5">
      <m.ul {...reveal} className="max-w-xl space-y-4 text-xl">{s.points.map((t) => <li key={t} className="flex items-start gap-3 border-t border-black/10 pt-4"><Check size={22} className="mt-1 shrink-0 text-brand-blue" />{t}</li>)}</m.ul>
      <Button to="/#contact" className="mt-10">Start a project</Button>
      <p className="mb-4 mt-24">Other services</p>
      <RowList rows={services.filter((x) => x.id !== id).map((o) => ({ meta: 'Service', title: o.name, text: o.text, icon: o.icon, to: `/services/${o.id}` }))} />
    </div></section>
  </>)
}
