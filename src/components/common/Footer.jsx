import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram,
  Zap,
  ArrowRight,
  CheckCircle,
  Send
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: '-100px' })

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Soluciones', href: '/soluciones' },
    { name: 'Apps Gratuitas', href: '/apps' },
    { name: 'Desarrollos IA', href: '/desarrollos-ia' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contacto' }
  ]

  const services = [
    { name: 'Automatización WhatsApp', href: '/soluciones#whatsapp' },
    { name: 'Desarrollo Web', href: '/soluciones#web' },
    { name: 'Email Marketing', href: '/soluciones#email' },
    { name: 'Análisis con IA', href: '/soluciones#analytics' },
    { name: 'CRM Personalizado', href: '/soluciones#crm' }
  ]

  const social = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/vjlale', color: 'hover:text-gray-300' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/alen-ia/', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/alen.ia_/', color: 'hover:text-pink-400' }
  ]

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    // Simular envío (aquí conectarías con tu servicio de email)
    setTimeout(() => {
      setSubmitStatus('success')
      setEmail('')
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 3000)
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-black/50 border-t border-white/10 relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-alenia-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="flex items-center mb-4">
                <img src="/images/5-3.png" alt="ALENIA Logo" className="h-10 w-auto" />
              </Link>
            </motion.div>
            <p className="text-alenia-light/70 mb-4 text-sm">
              Soluciones inteligentes con IA, automatizaciones y desarrollo web para empresas.
            </p>
            <p className="text-alenia-primary font-medium text-sm">
              "Resultados con Inteligencia"
            </p>
            <Link to="/kontrol-plus" className="mt-4 inline-block">
              <motion.img 
                src="/images/7.png" 
                alt="KONTROL+ Logo" 
                className="w-32 h-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>

            {/* Website link + brand image */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-3">
                <a
                  href="https://alenia.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-alenia-primary hover:text-alenia-secondary transition-colors text-sm underline decoration-transparent hover:decoration-current"
                >
                  alenia.online
                </a>
                <span className="text-alenia-light/40">/</span>
                <a
                  href="https://www.alenia.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-alenia-light/70 hover:text-alenia-primary transition-colors text-xs"
                >
                  www.alenia.online
                </a>
              </div>
              <a href="https://alenia.online/" target="_blank" rel="noopener noreferrer" aria-label="Ir a alenia.online">
                <motion.img
                  src="/images/Alenia1.png"
                  alt="ALENIA Marca"
                  className="h-10 w-auto opacity-90"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-alenia-light font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ x: 4 }}>
                    <Link
                      to={link.href}
                      className="text-alenia-light/70 hover:text-alenia-primary transition-colors text-sm flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-alenia-light font-semibold mb-4">Soluciones</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <motion.div whileHover={{ x: 4 }}>
                    <a
                      href={service.href}
                      className="text-alenia-light/70 hover:text-alenia-primary transition-colors text-sm flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      {service.name}
                    </a>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-alenia-light font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 mb-6">
              <motion.a
                href="mailto:contacto@alenia.online"
                className="flex items-center space-x-2 text-sm text-alenia-light/70 hover:text-alenia-primary transition-colors group"
                whileHover={{ x: 4 }}
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>contacto@alenia.online</span>
              </motion.a>
              <div className="flex items-center space-x-2 text-sm text-alenia-light/70">
                <MapPin className="w-4 h-4" />
                <span>Córdoba, Argentina</span>
              </div>
            </div>

            {/* Newsletter mejorado */}
            <div className="mb-6">
              <h4 className="text-alenia-light font-medium mb-3 text-sm">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-alenia-light placeholder-alenia-light/50 focus:outline-none focus:border-alenia-primary focus:ring-2 focus:ring-alenia-primary/20 input-focus-effect transition-all duration-300"
                  />
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircle className="w-5 h-5 text-alenia-primary" />
                    </motion.div>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand-gradient glow-btn text-brand-secondary px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                      <span>Enviando...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>¡Suscrito!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Suscribirse</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Social con efectos 3D */}
            <div className="flex space-x-4">
              {social.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -10, 10, -10, 0],
                      y: -4
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative text-alenia-light/70 ${item.color} transition-all duration-300 p-2 rounded-lg bg-white/5 hover:bg-white/10 group`}
                    style={{ zIndex: 10 - index }}
                  >
                    <Icon className="w-5 h-5 relative z-10" />
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-alenia-primary/20 to-alenia-accent/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-alenia-light/70">
            <p>© {currentYear} Alen.iA. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacidad"
                className="hover:text-alenia-primary transition-colors link-hover-underline"
              >
                Privacidad
              </Link>
              <Link
                to="/terminos"
                className="hover:text-alenia-primary transition-colors link-hover-underline"
              >
                Términos
              </Link>
              <Link
                to="/cookies"
                className="hover:text-alenia-primary transition-colors link-hover-underline"
              >
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer