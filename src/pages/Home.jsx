import { motion } from 'framer-motion'
import HeroSection from '../components/landing/HeroSection'
import ServicesSection from '../components/landing/ServicesSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import AppDownloadSection from '../components/landing/AppDownloadSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CTASection from '../components/landing/CTASection'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <AppDownloadSection />
      <TestimonialsSection />
      <CTASection />
    </motion.div>
  )
}

export default Home