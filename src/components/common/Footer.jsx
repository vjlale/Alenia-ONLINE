import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { BRAND_LOGOS } from '../../config/brand'
import { 
  Mail, 
  Phone, 
  MapPin, 
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
    { name: 'Apps', href: '/apps' },
    { name: 'Hecho a medida', href: '/apps#a-medida' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contacto' }
  ]

  const services = [
    { name: 'ALENIA HUB: automatización de máquinas', href: '/soluciones/hub' },
    { name: 'Cobros y accesos con QR', href: '/soluciones/hub' },
    { name: 'Apps y software a medida', href: '/soluciones/digitales' },
    { name: 'Desarrollo Web', href: '/soluciones/desarrollo-web' },
    { name: 'Caso real: LaIA', href: '/casos/laia' }
  ]

  const social = [
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
                <img
                  src={BRAND_LOGOS.lockupFull}
                  alt="ALENIA"
                  className="h-10 w-auto max-w-[240px] object-contain object-left"
                  width="240"
                  height="120"
                />
              </Link>
            </motion.div>
            <p className="text-alenia-light/70 mb-4 text-sm">
              Automatización de máquinas con hardware y software, y apps y webs a medida para tu negocio.
            </p>
            <p className="text-alenia-primary font-medium text-sm">
              "Resultados con Inteligencia"
            </p>
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
                href="mailto:alenia.online@gmail.com"
                className="flex items-center space-x-2 text-sm text-alenia-light/70 hover:text-alenia-primary transition-colors group"
                whileHover={{ x: 4 }}
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>alenia.online@gmail.com</span>
              </motion.a>
              <motion.a
                href="https://wa.me/5493516875178?text=Hola%20ALENIA%2C%20quiero%20hacer%20una%20consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-alenia-light/70 hover:text-alenia-primary transition-colors group"
                whileHover={{ x: 4 }}
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>WhatsApp +54 9 351 687-5178</span>
              </motion.a>
              <div className="flex items-center space-x-2 text-sm text-alenia-light/70">
                <MapPin className="w-4 h-4" />
                <span>Córdoba, Argentina</span>
              </div>
            </div>

            {/* Llamado a contacto (antes: newsletter simulado que no guardaba nada) */}
            <Link
              to="/contacto"
              className="mb-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7b2cbf] to-[#c77dff] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(199,125,255,0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(199,125,255,0.5)]"
            >
              <Send className="w-4 h-4" />
              Hablemos de tu proyecto
            </Link>

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
            <p>© {currentYear} ALENIA. Todos los derechos reservados.</p>
            {/* Privacidad, Términos y Cookies llevaban a páginas que no existen (404): se quitan hasta tenerlas. */}
            <p className="mt-4 md:mt-0">Córdoba, Argentina · aleniahub.com</p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer