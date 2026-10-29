import { useContent } from '../context/ContentContext'
import PageHeader from '../components/PageHeader'
import RowList from '../components/RowList'
import Button from '../components/Button'
export function Careers() {
  const { careers, careersIntro, company } = useContent()
  return (<>
    <PageHeader eyebrow="Careers" title="Build the next product with us." intro={careersIntro} />
    <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-6xl px-5">
      <RowList rows={careers.map((r) => ({ meta: r.type, title: r.title, text: r.text, icon: r.icon,
        href: `mailto:${company.email}?subject=${encodeURIComponent('Application: ' + r.title)}` }))} />
      <p className="mt-10 max-w-md text-lg">Do not see your role? Write to {company.email} and tell us what you would build.</p>
    </div></section>
  </>)
}
export function Training() {
  const { training } = useContent()
  return (<>
    <PageHeader eyebrow="Corporate training" title="Train your team on what we build." intro={training.intro} />
    <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-6xl px-5">
      <RowList rows={training.programs.map((p) => ({ meta: 'Program', title: p.name, text: p.text, icon: p.icon }))} />
      <Button to="/#contact" className="mt-10">Request a program</Button>
    </div></section>
  </>)
}
