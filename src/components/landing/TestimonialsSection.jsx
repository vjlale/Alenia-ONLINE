import { motion } from 'framer-motion'
import { Quote, Star, Users, TrendingUp, Shield } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'María González',
      role: 'CEO, Boutique Elena',
      company: 'Retail Fashion',
      content: 'Desde que implementamos las automatizaciones de Alen.iA, nuestras ventas aumentaron un 40%. El sistema de gestión es increíblemente fácil de usar y el soporte técnico es excepcional.',
      rating: 5,
      image: '👩‍💼',
      metrics: '+40% ventas'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Gerente General',
      company: 'Constructora del Sol',
      content: 'La aplicación ALENIA GESTIÓN transformó completamente nuestra operación. Ahora podemos controlar todos nuestros proyectos desde un solo lugar. Muy recomendado.',
      rating: 5,
      image: '👨‍💼',
      metrics: '+60% eficiencia'
    },
    {
      name: 'Ana Torres',
      role: 'Directora de Marketing',
      company: 'TechStart Solutions',
      content: 'El CRM personalizado y las automatizaciones de marketing nos permitieron escalar nuestro negocio sin aumentar el equipo. Los resultados superaron nuestras expectativas.',
      rating: 5,
      image: '👩‍💻',
      metrics: '+80% leads'
    },
    {
      name: 'Roberto Silva',
      role: 'Propietario',
      company: 'Restaurante La Esquina',
      content: 'Implementamos el sistema de gestión para nuestro restaurante y la diferencia es notable. Mejor control de inventario, pedidos y una experiencia más fluida para nuestros clientes.',
      rating: 5,
      image: '👨‍🍳',
      metrics: '+25% ingresos'
    },
    {
      name: 'Laura Vega',
      role: 'Directora Comercial',
      company: 'Inmobiliaria Premium',
      content: 'Las herramientas de análisis predictivo nos ayudaron a tomar mejores decisiones comerciales. El ROI fue visible desde el primer mes de implementación.',
      rating: 5,
      image: '👩‍🏢',
      metrics: '+50% conversión'
    },
    {
      name: 'Diego Morales',
      role: 'Fundador',
      company: 'EcoTech Verde',
      content: 'El desarrollo web y la integración con nuestros sistemas internos fue perfecta. El equipo de Alen.iA entendió exactamente lo que necesitábamos y lo entregó a tiempo.',
      rating: 5,
      image: '👨‍🔬',
      metrics: '+90% productividad'
    }
  ]

  const stats = [
    {
      icon: Users,
      value: '200+',
      label: 'Clientes Satisfechos',
      color: 'alenia-primary'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Mejora Promedio',
      color: 'alenia-secondary'
    },
    {
      icon: Shield,
      value: '99.9%',
      label: 'Disponibilidad',
      color: 'alenia-accent'
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
            Lo que dicen nuestros{' '}
            <span className="bg-gradient-to-r from-alenia-primary to-alenia-secondary bg-clip-text text-transparent">
              Clientes
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Testimonios reales de empresas que han transformado sus operaciones con nuestras soluciones
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full bg-${stat.color}/10 flex items-center justify-center mb-4`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}`} />
              </div>
              <div className={`text-3xl font-display font-bold text-${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-alenia-primary/50 transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-alenia-primary rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-alenia-primary to-alenia-secondary flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>

              {/* Metrics */}
              <div className="inline-flex items-center gap-2 bg-alenia-primary/10 border border-alenia-primary/20 rounded-full px-3 py-1">
                <TrendingUp className="w-3 h-3 text-alenia-primary" />
                <span className="text-sm font-medium text-alenia-primary">
                  {testimonial.metrics}
                </span>
              </div>

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
          <div className="bg-gradient-to-r from-alenia-primary/10 via-alenia-secondary/10 to-alenia-accent/10 rounded-3xl p-8 border border-alenia-primary/20">
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              ¿Listo para transformar tu negocio?
            </h3>
            <p className="text-gray-300 mb-6">
              Únete a más de 200 empresas que ya confían en nuestras soluciones
            </p>
            <button className="bg-gradient-to-r from-alenia-primary to-alenia-secondary hover:from-alenia-secondary hover:to-alenia-primary text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Solicitar Consulta Gratuita
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
