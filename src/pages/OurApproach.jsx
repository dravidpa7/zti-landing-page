
import { m } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { reveal } from '../utils/motion'

export default function OurApproach() {
  return (
    <>
      <PageHeader
        eyebrow="What makes us stand out?"
        titleWidthClassName="max-w-6xl"
        title={<>We don't just build.<br /><span className="lg:whitespace-nowrap lg:text-[clamp(2.5rem,5vw,3.75rem)]">We build with Purpose &amp; Strategy.</span></>}
      />

      <section className="bg-white py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          {/* Paragraph content */}
          <div className="ml-8 max-w-4xl space-y-7 text-lg leading-relaxed text-ink/70 md:ml-20 lg:ml-32 md:text-xl">
            <m.p {...reveal}>
              A website is not just a digital presence. It is an extension of your business, your vision, and everything you aspire to become. At Aaryan Tech, we believe that building a successful digital presence starts long before writing a single line of code.
            </m.p>

            <m.p {...reveal}>
              We begin by understanding your business ideology, studying your industry, analysing your market, and identifying the opportunities that can take your business forward. We then bring together strategic thinking, creative ideas, technology, and the right communication to build solutions that don't just look good but serve a purpose.
            </m.p>

            <m.p {...reveal}>
              From developing your digital identity and creating meaningful websites to planning business strategies, strengthening your market presence, and helping you connect with the right audience, we look beyond the immediate requirements to support your long-term growth.
            </m.p>

            <m.p {...reveal}>
              We also believe that great ideas shouldn't remain ideas simply because they lack the right support. Whether you're an aspiring entrepreneur, an established business, or someone with an idea worth pursuing, we're here to help you take that next step.
            </m.p>

            <m.p {...reveal} className="font-medium text-ink">
              We don't believe in building just for the sake of building. We build with purpose, with strategy, and with a vision for growth. For us, success isn't just about what we create. It's about what we help you achieve.
            </m.p>

          </div>
        </div>
      </section>
    </>
  )
}
