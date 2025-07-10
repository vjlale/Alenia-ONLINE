import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail, MessageCircle, Calendar, Sparkles } from 'lucide-react'

const CTASection = () => {
  const contactOptions = [
    {
      icon: Phone,
      title: 'Llamada Directa',
      description: 'Habla con un especialista',
      action: 'Llamar ahora',
      color: 'alenia-primary'
    },
    {
      icon: Mail,
      title: 'Email Profesional',
      description: 'Respuesta en menos de 24h',
      action: 'Enviar email',
      color: 'alenia-secondary'
    },
    {
      icon: MessageCircle,
      title: 'Chat en Vivo',
      description: 'Soporte inmediato',
      action: 'Iniciar chat',
      color: 'alenia-accent'
    },
    {
      icon: Calendar,
      title: 'Agendar Reunión',
      description: 'Consulta personalizada',
      action: 'Reservar cita',
      color: 'alenia-primary'
    }
  ]

  const benefits = [
    'Consulta inicial gratuita',
    'Análisis personalizado de tu negocio',
    'Propuesta técnica detallada',
    'Garantía de satisfacción',
    'Soporte post-implementación'
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-alenia-dark to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-alenia-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-alenia-secondary/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-alenia-accent/5 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-alenia-primary/10 border border-alenia-primary/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-alenia-primary" />
            <span className="text-sm font-medium text-alenia-primary">
              Transformación Digital Garantizada
            </span>
          </div>

          {/* Main headline */}
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            ¿Listo para{' '}
            <span className="bg-gradient-to-r from-alenia-primary via-alenia-secondary to-alenia-accent bg-clip-text text-transparent animate-gradient">
              Acelerar
            </span>
            <br />
            tu Negocio?
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Comienza tu transformación digital hoy mismo. Nuestro equipo de expertos está listo para 
            ayudarte a implementar las soluciones que tu negocio necesita.
          </p>

          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-gradient-to-r from-alenia-primary to-alenia-secondary hover:from-alenia-secondary hover:to-alenia-primary text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto mb-4"
          >
            Solicitar Consulta Gratuita
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="text-sm text-gray-400">
            * No hay compromiso - Evaluación gratuita de 30 minutos
          </p>
        </motion.div>

        {/* Contact options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-alenia-primary/50 transition-all duration-300 text-center cursor-pointer hover:transform hover:scale-105"
            >
              <div className={`w-16 h-16 mx-auto rounded-full bg-${option.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <option.icon className={`w-8 h-8 text-${option.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
              <p className="text-gray-300 mb-4 text-sm">{option.description}</p>
              <button className={`text-${option.color} hover:text-white font-semibold text-sm border border-${option.color}/30 hover:bg-${option.color}/20 px-4 py-2 rounded-full transition-all duration-300`}>
                {option.action}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-alenia-primary/10 via-alenia-secondary/10 to-alenia-accent/10 rounded-3xl p-8 border border-alenia-primary/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Benefits */}
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Lo que incluye tu consulta gratuita:
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 bg-alenia-primary rounded-full animate-pulse"></div>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right side - Contact info */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Contáctanos Directamente
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Mail className="w-5 h-5 text-alenia-primary" />
                  <span className="text-gray-300">contacto@alenia.online</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Phone className="w-5 h-5 text-alenia-secondary" />
                  <span className="text-gray-300">+54 9 11 xxxx-xxxx</span>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Horario de atención: Lunes a Viernes 9:00 - 18:00 (GMT-3)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-4">
            Más de <span className="text-alenia-primary font-semibold">200 empresas</span> ya confían en nuestras soluciones
          </p>
          <p className="text-sm text-gray-400">
            Únete a la revolución digital y lleva tu negocio al siguiente nivel
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
