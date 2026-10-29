import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
export default function NotFound() {
  return (<><PageHeader eyebrow="404" title="We could not find that page." />
    <div className="bg-white px-5 pb-24 pt-10"><div className="mx-auto max-w-6xl"><Button to="/">Back home</Button></div></div></>)
}
