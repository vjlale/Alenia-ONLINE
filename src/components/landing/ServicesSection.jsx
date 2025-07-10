import { motion } from 'framer-motion'
import { Bot, Globe, TrendingUp, Users, Zap, Code2 } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: Bot,
      title: 'Automatizaciones con IA',
      description: 'Optimizamos procesos empresariales con inteligencia artificial avanzada, reduciendo costos y aumentando eficiencia.',
      color: 'alenia-primary',
      features: ['Workflows inteligentes', 'Análisis predictivo', 'Chatbots personalizados']
    },
    {
      icon: Globe,
      title: 'Desarrollo Web & Apps',
      description: 'Creamos sitios web modernos y aplicaciones móviles que convierten visitantes en clientes.',
      color: 'alenia-secondary',
      features: ['Diseño responsive', 'E-commerce avanzado', 'Apps móviles nativas']
    },
    {
      icon: TrendingUp,
      title: 'Marketing Digital',
      description: 'Estrategias de marketing digital personalizadas para hacer crecer tu negocio online.',
      color: 'alenia-accent',
      features: ['SEO & SEM', 'Social Media', 'Email Marketing']
    },
    {
      icon: Users,
      title: 'CRM & Gestión',
      description: 'Sistemas de gestión completos para organizar clientes, ventas y operaciones.',
      color: 'alenia-primary',
      features: ['CRM personalizado', 'Gestión de inventario', 'Reportes automáticos']
    },
    {
      icon: Code2,
      title: 'Desarrollo a Medida',
      description: 'Soluciones de software personalizadas para necesidades específicas de tu empresa.',
      color: 'alenia-secondary',
      features: ['APIs y integraciones', 'Sistemas empresariales', 'Migración de datos']
    },
    {
      icon: Zap,
      title: 'Consultoría Especializada',
      description: 'Asesoramiento experto en transformación digital y adopción de nuevas tecnologías.',
      color: 'alenia-accent',
      features: ['Auditoría digital', 'Estrategia tecnológica', 'Capacitación de equipos']
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-alenia-dark to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-alenia-primary to-alenia-secondary bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ofrecemos soluciones completas para digitalizar y optimizar tu negocio
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-alenia-primary/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-${service.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-8 h-8 text-${service.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-display font-semibold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${service.color}`}></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-alenia-primary/5 to-alenia-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="bg-gradient-to-r from-alenia-primary to-alenia-secondary hover:from-alenia-secondary hover:to-alenia-primary text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Solicitar Cotización Personalizada
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
