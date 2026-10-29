import { m } from 'framer-motion'
import { reveal } from '../utils/motion'
import ProductShowcase from './ProductShowcase'
export default function Products({ items }) {
  return (
    <div id="products">
      <section className="bg-white pt-16 md:pt-24">
        <div className="mx-auto max-w-6xl px-5">
          <m.h2 {...reveal} className="max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:text-7xl">Products we build ourselves.</m.h2>
        </div>
      </section>
      {items.map((p) => <ProductShowcase key={p.id} product={p} />)}
    </div>
  )
}
