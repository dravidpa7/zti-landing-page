import { Link, useParams } from 'react-router-dom'
import { m } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import { reveal } from '../utils/motion'
import PageHeader from '../components/PageHeader'
import ProductShowcase, { ProductPanel } from '../components/ProductShowcase'
import RowList from '../components/RowList'
import Button from '../components/Button'
import { Check } from 'lucide-react'
import NotFound from './NotFound'
export function ProductsPage() {
  const { products } = useContent()
  return (<>
    <PageHeader eyebrow="Products" title="Products we build ourselves." intro="School software, agents and developer tools, each made by our own team." />
    {products.map((p) => <ProductShowcase key={p.id} product={p} />)}
  </>)
}
export function ProductDetail() {
  const { id } = useParams()
  const { products } = useContent()
  const p = products.find((x) => x.id === id)
  if (!p) return <NotFound />
  const others = products.filter((x) => x.id !== id)
  return (<>
    <PageHeader eyebrow={p.tag} title={p.name} intro={p.text} />
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-12">
        <m.div {...reveal} className="md:col-span-5">
          <p className="mb-4">What it does</p>
          <ul className="space-y-4 text-xl">{p.points.map((t) => <li key={t} className="flex items-start gap-3 border-t border-black/10 pt-4"><Check size={22} className="mt-1 shrink-0 text-brand-blue" />{t}</li>)}</ul>
          <Button to="/#contact" className="mt-10">Talk to us</Button>
        </m.div>
        <ProductPanel product={p} className="md:col-span-6 md:col-start-7" />
      </div>
    </section>
    <section className="bg-white pb-20"><div className="mx-auto max-w-6xl px-5">
      <p className="mb-4">More products</p>
      <RowList rows={others.map((o) => ({ meta: o.tag, title: o.name, text: o.text, icon: o.icon, to: `/products/${o.id}` }))} />
    </div></section>
  </>)
}
