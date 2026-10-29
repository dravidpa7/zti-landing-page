// Logo mark. Strokes use the brand colours from tailwind.config.js.
export default function Mark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="3.2" strokeLinecap="round" aria-hidden="true"
      className="transition-transform duration-300 group-hover:-rotate-12">
      <path d="M3.5 21 12 3" className="stroke-brand-red" />
      <path d="M12 3l8.5 18" className="stroke-brand-blue" />
      <path d="M8 14.5h8" className="stroke-brand-yellow" />
    </svg>
  )
}
