import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
  Zap
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const services = [
    'Automatización WhatsApp',
    'Desarrollo Web',
    'Email Marketing',
    'Análisis con IA',
    'CRM Personalizado',
    'Consultoría General'
  ]

  const budgetRanges = [
    'Menos de $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    'Más de $5,000'
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contacto@alenia.online',
      description: 'Respuesta en 24 horas',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: '+54 9 351 123-4567',
      description: 'Respuesta inmediata',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Calendar,
      title: 'Reunión Virtual',
      value: 'Agendar llamada',
      description: '30 min gratuitos',
      gradient: 'from-purple-500 to-pink-600'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-16 flex items-center justify-center"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto glass-effect rounded-2xl p-8"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-alenia-primary to-alenia-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-display font-bold text-white mb-4">
              ¡Mensaje enviado con éxito!
            </h1>
            
            <p className="text-xl text-alenia-light/80 mb-6">
              Gracias por contactarnos. Nuestro equipo revisará tu consulta y te responderá en menos de 24 horas.
            </p>
            
            <p className="text-alenia-primary font-medium mb-8">
              📧 Enviaremos la respuesta a: {formData.email}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: '',
                  email: '',
                  company: '',
                  service: '',
                  budget: '',
                  message: ''
                })
              }}
              className="bg-gradient-to-r from-alenia-primary to-alenia-secondary text-alenia-dark px-8 py-3 rounded-lg font-medium"
            >
              Enviar otro mensaje
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16"
    >
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="text-white">Hablemos de tu</span>{' '}
            <span className="gradient-text">Proyecto</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-alenia-light/80 max-w-3xl mx-auto mb-12"
          >
            Estamos aquí para ayudarte a transformar tu negocio con soluciones inteligentes. 
            Cuéntanos tu idea y diseñemos juntos la estrategia perfecta.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-alenia-primary font-medium mb-2">
                    {method.value}
                  </p>
                  <p className="text-sm text-alenia-light/70">
                    {method.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-effect rounded-2xl p-8"
              >
                <h2 className="text-2xl font-display font-bold text-white mb-6">
                  Consulta Gratuita
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-alenia-light mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 glass-effect rounded-lg text-alenia-light placeholder-alenia-light/50 focus:outline-none focus:ring-2 focus:ring-alenia-primary"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-alenia-light mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 glass-effect rounded-lg text-alenia-light placeholder-alenia-light/50 focus:outline-none focus:ring-2 focus:ring-alenia-primary"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-alenia-light mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-alenia-light placeholder-alenia-light/50 focus:outline-none focus:ring-2 focus:ring-alenia-primary"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-alenia-light mb-2">
                        Servicio de interés
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass-effect rounded-lg text-alenia-light focus:outline-none focus:ring-2 focus:ring-alenia-primary"
                      >
                        <option value="">Seleccionar servicio</option>
                        {services.map((service, index) => (
                          <option key={index} value={service} className="bg-alenia-dark">
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-alenia-light mb-2">
                        Presupuesto estimado
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass-effect rounded-lg text-alenia-light focus:outline-none focus:ring-2 focus:ring-alenia-primary"
                      >
                        <option value="">Seleccionar rango</option>
                        {budgetRanges.map((range, index) => (
                          <option key={index} value={range} className="bg-alenia-dark">
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-alenia-light mb-2">
                      Cuéntanos sobre tu proyecto *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-alenia-light placeholder-alenia-light/50 focus:outline-none focus:ring-2 focus:ring-alenia-primary resize-none"
                      placeholder="Describe tu proyecto, objetivos y cualquier detalle relevante..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    className="w-full bg-gradient-to-r from-alenia-primary to-alenia-secondary text-alenia-dark px-8 py-4 rounded-lg font-bold text-lg hover:neon-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-alenia-dark/30 border-t-alenia-dark rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Enviar Consulta</span>
                      </div>
                    )}
                  </motion.button>
                  
                  <p className="text-sm text-alenia-light/60 text-center">
                    📞 Te contactaremos en menos de 24 horas • 🔒 Tu información está protegida
                  </p>
                </form>
              </motion.div>
              
              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">
                    ¿Por qué elegirnos?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-alenia-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Consulta 100% Gratuita</h4>
                        <p className="text-alenia-light/80 text-sm">Analizamos tu negocio sin costo y te damos una propuesta personalizada</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-alenia-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Resultados Garantizados</h4>
                        <p className="text-alenia-light/80 text-sm">Solo cobramos cuando veas resultados reales en tu negocio</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-alenia-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Soporte Continuo</h4>
                        <p className="text-alenia-light/80 text-sm">Te acompañamos durante todo el proceso y después del lanzamiento</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-alenia-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Tecnología de Vanguardia</h4>
                        <p className="text-alenia-light/80 text-sm">Usamos las últimas herramientas de IA y automatización</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-effect rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-3">Información de Contacto</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3 text-alenia-light/80">
                      <MapPin className="w-4 h-4 text-alenia-primary" />
                      <span>Córdoba, Argentina</span>
                    </div>
                    <div className="flex items-center space-x-3 text-alenia-light/80">
                      <Clock className="w-4 h-4 text-alenia-primary" />
                      <span>Lunes a Viernes: 9:00 - 18:00 (GMT-3)</span>
                    </div>
                    <div className="flex items-center space-x-3 text-alenia-light/80">
                      <Zap className="w-4 h-4 text-alenia-primary" />
                      <span>Respuesta promedio: menos de 4 horas</span>
                    </div>
                  </div>
                </div>
                
                <div className="glass-effect rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-3">Casos de Éxito</h4>
                  <div className="space-y-3 text-sm text-alenia-light/80">
                    <div>
                      <span className="text-alenia-primary font-medium">+150%</span> aumento promedio en leads
                    </div>
                    <div>
                      <span className="text-alenia-primary font-medium">-70%</span> reducción en tiempo de gestión
                    </div>
                    <div>
                      <span className="text-alenia-primary font-medium">+50</span> empresas transformadas
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Contact