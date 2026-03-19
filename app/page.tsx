import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Stats from '@/components/home/Stats'
import Testimonials from '@/components/home/Testimonials'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <CTASection />
    </div>
  )
}