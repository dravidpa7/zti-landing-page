// Logo. The file lives in public/images/logo.png
export default function Mark({ size = 24 }) {
  return (
    <img
      src="/images/logo.png"
      alt=""
      style={{ height: size, width: 'auto' }}
      className="transition-transform duration-300 group-hover:-rotate-12"
    />
  )
}