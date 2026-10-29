import { useMemo } from 'react'
// Ring of small dashes, coloured by angle (red/orange/yellow left, blue right). Static SVG + one CSS rotation.
const stops = [[90, '#3B63E0'], [160, '#E8762B'], [200, '#F2B705'], [300, '#D6334F'], [360, '#3B63E0']]
const pick = (deg) => stops.find(([s]) => deg <= s)[1]
export default function DashRing() {
  const dashes = useMemo(() => {
    const out = []
    for (let ring = 0; ring < 5; ring++)
      for (let i = 0; i < 70; i++) {
        const a = (i / 70) * 360 + ring * 7, r = 230 + ring * 34 + Math.sin(i * 1.7 + ring) * 10
        out.push({ a, r, c: pick(a % 360), o: 0.35 + ((i * 7 + ring * 3) % 10) / 16 })
      }
    return out
  }, [])
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg viewBox="-400 -400 800 800" className="spin-slow h-[135%] w-auto max-w-none shrink-0">
        {dashes.map((d, i) => (
          <rect key={i} x={d.r} y={-1.2} width={5} height={2.4} rx={1.2} fill={d.c} opacity={d.o} transform={`rotate(${d.a})`} />
        ))}
      </svg>
    </div>
  )
}
