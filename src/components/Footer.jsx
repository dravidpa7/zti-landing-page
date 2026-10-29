import { m } from 'framer-motion'
import { ease } from '../utils/motion'
export default function Footer({ name }) {
  return (
    <footer className="overflow-hidden bg-ink px-5 pb-6 pt-24 text-white">
      <div className="mx-auto max-w-6xl overflow-hidden">
        <m.p initial={{ y: '60%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, ease }} className="text-[22vw] font-medium leading-[0.8] tracking-[-0.06em] md:text-[19rem]">Aaryan</m.p>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-sm">© {new Date().getFullYear()} {name}</p>
    </footer>
  )
}
