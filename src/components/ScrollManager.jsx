import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// New page -> top. Link with #hash -> smooth scroll to that section.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}
