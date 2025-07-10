import { motion } from 'framer-motion'
import { ChevronRight, Sparkles, Zap, Target } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-alenia-dark via-gray-900 to-alenia-dark overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-alenia-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-alenia-secondary/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-alenia-accent/5 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-alenia-primary/10 border border-alenia-primary/20 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-alenia-primary" />
            <span className="text-sm font-medium text-alenia-primary">
              Nuevas soluciones con IA disponibles
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
          >
            Resultados con{' '}
            <span className="bg-gradient-to-r from-alenia-primary via-alenia-secondary to-alenia-accent bg-clip-text text-transparent animate-gradient">
              Inteligencia
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transformamos negocios tradicionales en empresas digitales eficientes con
            <span className="text-alenia-primary font-semibold"> automatizaciones inteligentes</span>,
            <span className="text-alenia-secondary font-semibold"> desarrollo web</span> y
            <span className="text-alenia-accent font-semibold"> marketing digital</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button className="group bg-gradient-to-r from-alenia-primary to-alenia-secondary hover:from-alenia-secondary hover:to-alenia-primary text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
              Descargar ALENIA GESTIÓN
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-alenia-primary text-alenia-primary hover:bg-alenia-primary hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2">
              Ver Servicios
              <Target className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>

          {/* Features highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <div className="w-2 h-2 bg-alenia-primary rounded-full animate-pulse"></div>
              <span className="text-sm">Sistema de gestión gratuito</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <div className="w-2 h-2 bg-alenia-secondary rounded-full animate-pulse delay-500"></div>
              <span className="text-sm">Automatizaciones con IA</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <div className="w-2 h-2 bg-alenia-accent rounded-full animate-pulse delay-1000"></div>
              <span className="text-sm">Desarrollo web profesional</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-alenia-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-alenia-primary rounded-full animate-bounce mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
