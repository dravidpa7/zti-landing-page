import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const AUTO_EVERY = 1000                                 // ms
const PALETTE = ['#3B63E0', '#D6334F', '#F2B705', '#E8762B']
const HOVER = { strength: 0.8, speed: 0.25, width: 55, life: 1400 }  // speed = px per ms
const CLICK = { strength: 1.6, speed: 0.6, width: 110, life: 2600 }
const AUTO = { ...CLICK, strength: 1.3, life: 2400 }   // auto "touch": same wave as a click, a little softer

export default function RippleGrid() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d'), parent = canvas.parentElement
    let w = 0, h = 0, dots = [], ripples = [], raf = 0, running = false, n = 0, intro = 0, timer = 0, visible = true
    let last = { t: 0, x: -999, y: -999 }

    function build() {
      const gap = w < 640 ? 26 : 22
      const cols = Math.floor(w / gap) + 1, rows = Math.floor(h / gap) + 1
      const ox = (w - (cols - 1) * gap) / 2, oy = (h - (rows - 1) * gap) / 2
      dots = []
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dots.push([ox + c * gap, oy + r * gap])
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h)
      ripples = ripples.filter((r) => now - r.t < r.life)
      const hot = []
      ctx.fillStyle = 'rgba(244,244,245,0.15)'
      ctx.beginPath()
      for (const [x, y] of dots) {
        let best = null, bw = 0
        for (const r of ripples) {
          const age = now - r.t, delta = Math.hypot(x - r.x, y - r.y) - age * r.speed
          if (Math.abs(delta) < r.width) {
            const k = Math.cos((delta / r.width) * (Math.PI / 2)) * r.strength * (1 - age / r.life)
            if (k > bw) { bw = k; best = r }
          }
        }
        if (best && bw > 0.03) hot.push([x, y, bw, best])
        else { ctx.moveTo(x + 1.1, y); ctx.arc(x, y, 1.1, 0, 6.283) }
      }
      ctx.fill()
      for (const [x, y, k, r] of hot) {
        const d = Math.hypot(x - r.x, y - r.y) || 1, kk = Math.min(k, 1.6)
        ctx.globalAlpha = 0.25 + 0.7 * Math.min(k, 1)
        ctx.fillStyle = r.color
        ctx.beginPath()
        ctx.arc(x + ((x - r.x) / d) * kk * 4, y + ((y - r.y) / d) * kk * 4, 1.2 + kk * 2.2, 0, 6.283)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function loop(now) { draw(now); if (ripples.length) raf = requestAnimationFrame(loop); else running = false }
    function spawn(x, y, kind) {
      ripples.push({ x, y, t: performance.now(), color: PALETTE[n++ % 4], ...kind })
      if (!running) { running = true; raf = requestAnimationFrame(loop) }
    }
    function resize() {
      w = parent.clientWidth; h = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build(); draw(performance.now())
    }
    const local = (e) => {
      const r = canvas.getBoundingClientRect()
      const x = (e.clientX - r.left) * (w / r.width), y = (e.clientY - r.top) * (h / r.height)
      return x >= 0 && y >= 0 && x <= w && y <= h ? [x, y] : null
    }
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      const p = local(e), now = performance.now()
      if (p && now - last.t > 90 && Math.hypot(p[0] - last.x, p[1] - last.y) > 28) {
        last = { t: now, x: p[0], y: p[1] }; spawn(p[0], p[1], HOVER)
      }
    }
    const onDown = (e) => {
      if (e.target.closest('a,button,input,textarea,select')) return
      const p = local(e); if (p) spawn(p[0], p[1], CLICK)
    }

    const ro = new ResizeObserver(resize); ro.observe(parent)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    resize()

    const autoTouch = () => {
      if (!visible || document.hidden || w < 80 || h < 80) return
      spawn(40 + Math.random() * (w - 80), 40 + Math.random() * (h - 80), AUTO)
    }

    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown)
      intro = setTimeout(() => spawn(w / 2, h / 2, CLICK), 300)   // opening moment
      timer = setInterval(autoTouch, AUTO_EVERY)                  // a random touch every 3s
    }
    return () => {
      cancelAnimationFrame(raf); clearTimeout(intro); clearInterval(timer)
      ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerdown', onDown)
    }
  }, [reduce])

  return <canvas ref={ref} aria-hidden="true" className="block h-full w-full opacity-60" />
}