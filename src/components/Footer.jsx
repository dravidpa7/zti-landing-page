import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ease } from '../utils/motion'
import { useContent } from '../context/ContentContext'
export default function Footer() {
  const { company, products, services, blogs } = useContent()
  const cols = [
    ['Products', '/products', products.map((p) => [p.name, `/products/${p.id}`])],
    ['Services', '/services', services.map((s) => [s.name, `/services/${s.id}`])],
    ['Blogs', '/blogs', blogs.slice(0, 3).map((b) => [b.title, `/blogs/${b.id}`])],
    ['Company', null, [['Careers', '/careers'], ['Corporate training', '/training'], ['Contact', '/#contact']]],
  ]
  return (
    <footer className="overflow-hidden bg-ink px-5 pb-6 pt-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        {cols.map(([title, to, links]) => (
          <div key={title}>
            {to ? <Link to={to} className="text-sm text-white/60 hover:text-white">{title}</Link> : <p className="text-sm text-white/60">{title}</p>}
            <ul className="mt-4 space-y-2">
              {links.map(([l, h]) => <li key={h}><Link to={h} className="text-base hover:underline underline-offset-4">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-20 max-w-6xl overflow-hidden">
        <m.p initial={{ y: '60%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, ease }} className="pb-[0.14em] text-[22vw] font-medium leading-[0.9] tracking-[-0.06em] md:text-[19rem]">Aaryan</m.p>
      </div>
      <p className="mx-auto mt-4 max-w-6xl text-sm">© {new Date().getFullYear()} {company.name}</p>
    </footer>
  )
}
