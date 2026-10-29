import { useState } from 'react'
import { AnimatePresence, m, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
export default function ScrollTop() {
  const [show, setShow] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 600))
  return (
    <AnimatePresence>
      {show && (
        <m.button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.6, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white">
          <ArrowUp size={20} />
        </m.button>
      )}
    </AnimatePresence>
  )
}
