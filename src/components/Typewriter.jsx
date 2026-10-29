import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
// texts: string or array. loop=true types, pauses, deletes and moves to the next; loop=false types once and stops.
// Screen readers get the full text; reduced-motion users see the first text, static.
export default function Typewriter({ texts, loop = true, speed = 55, pause = 1600, className = '' }) {
  const list = Array.isArray(texts) ? texts : [texts]
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [del, setDel] = useState(false)
  const full = list[i]
  useEffect(() => {
    if (reduce) return
    let t
    if (!del && n < full.length) t = setTimeout(() => setN(n + 1), speed)
    else if (!del) { if (loop) t = setTimeout(() => setDel(true), pause) }
    else if (n > 0) t = setTimeout(() => setN(n - 1), speed / 2)
    else { setDel(false); setI((i + 1) % list.length) }
    return () => clearTimeout(t)
  }, [n, del, i, reduce]) // eslint-disable-line
  const finished = !loop && n === full.length
  return (
    <span className={className}>
      <span className="sr-only">{list.join(', ')}</span>
      <span aria-hidden="true">{reduce ? list[0] : full.slice(0, n)}</span>
      {!reduce && !finished && <span aria-hidden="true" className="animate-caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current" />}
    </span>
  )
}
