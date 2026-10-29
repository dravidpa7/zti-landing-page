import { useContent } from '../context/ContentContext'
import Hero from '../components/Hero'
import Divider from '../components/Divider'
import Products from '../components/Products'
import Services from '../components/Services'
import Blogs from '../components/Blogs'
export default function Home() {
  const c = useContent()
  return (<>
    <Hero company={c.company} />
    <Divider left="What we build" right={`${c.products.length} products`} />
    <Products items={c.products} />
    <Services items={c.services} intro={c.company.intro} />
    <Blogs items={c.blogs} />
  </>)
}
