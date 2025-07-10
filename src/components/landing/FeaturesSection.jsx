import { motion } from 'framer-motion'
import { BarChart3, Shield, Lightbulb, Clock, Award, HeartHandshake } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Análisis Avanzado',
      description: 'Reportes detallados y análisis predictivo para tomar decisiones basadas en datos reales.',
      stats: '98% precisión'
    },
    {
      icon: Shield,
      title: 'Seguridad Garantizada',
      description: 'Protección de datos con los más altos estándares de seguridad y cumplimiento normativo.',
      stats: 'Certificado ISO'
    },
    {
      icon: Lightbulb,
      title: 'Innovación Constante',
      description: 'Actualizaciones continuas con las últimas tecnologías y tendencias del mercado.',
      stats: 'Actualizaciones mensuales'
    },
    {
      icon: Clock,
      title: 'Soporte 24/7',
      description: 'Asistencia técnica especializada disponible las 24 horas, todos los días del año.',
      stats: 'Respuesta < 1 hora'
    },
    {
      icon: Award,
      title: 'Calidad Certificada',
      description: 'Procesos certificados y mejores prácticas internacionales en desarrollo y gestión.',
      stats: '5 años experiencia'
    },
    {
      icon: HeartHandshake,
      title: 'Acompañamiento Personalizado',
      description: 'Seguimiento personalizado durante todo el proceso de implementación y más allá.',
      stats: '100% satisfacción'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-alenia-dark">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            ¿Por qué elegir{' '}
            <span className="bg-gradient-to-r from-alenia-primary to-alenia-accent bg-clip-text text-transparent">
              Alen.iA?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Más de 5 años desarrollando soluciones que transforman negocios
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-alenia-primary/50 transition-all duration-300"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-alenia-primary/5 via-transparent to-alenia-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-alenia-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-alenia-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-semibold text-white mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="inline-flex items-center gap-2 bg-alenia-primary/10 border border-alenia-primary/20 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-alenia-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-alenia-primary">
                    {feature.stats}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-alenia-primary/10 via-alenia-secondary/10 to-alenia-accent/10 rounded-3xl p-8 border border-alenia-primary/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-alenia-primary mb-2">
                50+
              </div>
              <div className="text-gray-300">Proyectos Completados</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-alenia-secondary mb-2">
                95%
              </div>
              <div className="text-gray-300">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-alenia-accent mb-2">
                24/7
              </div>
              <div className="text-gray-300">Soporte Técnico</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-alenia-primary mb-2">
                5+
              </div>
              <div className="text-gray-300">Años Experiencia</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
