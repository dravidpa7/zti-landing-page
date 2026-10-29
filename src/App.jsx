import { useContent } from './context/ContentContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Services from './components/Services'
import Blogs from './components/Blogs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
export default function App() {
  const content = useContent()
  if (!content) return null
  return (<>
    <ScrollProgress />
    <Navbar />
    <main>
      <Hero company={content.company} />
      <Products items={content.products} />
      <Services items={content.services} intro={content.company.intro} />
      <Blogs items={content.blogs} />
      <Contact email={content.company.email} />
    </main>
    <Footer name={content.company.name} />
  </>)
}
