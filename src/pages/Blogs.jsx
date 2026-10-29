import { Link, useParams } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { formatDate } from '../utils/format'
import PageHeader from '../components/PageHeader'
import { BlogList } from '../components/Blogs'
import NotFound from './NotFound'
export function BlogsPage() {
  const { blogs } = useContent()
  return (<>
    <PageHeader eyebrow="Blogs" title="Notes from our engineers." />
    <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-6xl px-5"><BlogList items={blogs} /></div></section>
  </>)
}
export function BlogPost() {
  const { id } = useParams()
  const { blogs } = useContent()
  const b = blogs.find((x) => x.id === id)
  if (!b) return <NotFound />
  return (<>
    <PageHeader eyebrow={`${formatDate(b.date)} · ${b.readTime}`} title={b.title} />
    <article className="bg-white py-16 md:py-24"><div className="mx-auto max-w-6xl px-5">
      <div className="max-w-2xl space-y-6 text-lg leading-8">{b.body.map((t, i) => <p key={i}>{t}</p>)}</div>
      <Link to="/blogs" className="mt-12 inline-block underline-offset-4 hover:underline">← All blogs</Link>
    </div></article>
  </>)
}
