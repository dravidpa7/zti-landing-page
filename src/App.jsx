import { Routes, Route, useLocation } from 'react-router-dom'
import { m } from 'framer-motion'
import { useContent } from './context/ContentContext'
import ScrollProgress from './components/ScrollProgress'
import ScrollManager from './components/ScrollManager'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Home from './pages/Home'
import { ProductsPage, ProductDetail } from './pages/Products'
import { ServicesPage, ServiceDetail } from './pages/Services'
import { BlogsPage, BlogPost } from './pages/Blogs'
import { Careers, Training } from './pages/Company'
import NotFound from './pages/NotFound'
export default function App() {
  const content = useContent()
  const { pathname } = useLocation()
  if (!content) return null
  return (<>
    <ScrollProgress /><ScrollManager /><Navbar />
    <m.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/training" element={<Training />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Contact />
    </m.main>
    <Footer />
  </>)
}
