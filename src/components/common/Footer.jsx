import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram,
  Zap,
  ArrowRight
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Soluciones', href: '/soluciones' },
    { name: 'Apps Gratuitas', href: '/apps' },
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
    { name: 'GitHub', icon: Github, href: 'https://github.com/vjlale' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/alen-ia/' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/alen.ia_/' }
  ]

  return (
    <footer className="bg-black/50 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src="/images/5-3.png" alt="ALENIA Logo" className="h-10 w-auto" />
            </Link>
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-alenia-light font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-alenia-light/70 hover:text-alenia-primary transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-alenia-light font-semibold mb-4">Soluciones</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-alenia-light/70 hover:text-alenia-primary transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-alenia-light font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-sm text-alenia-light/70">
                <Mail className="w-4 h-4" />
                <span>contacto@alenia.online</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-alenia-light/70">
                <MapPin className="w-4 h-4" />
                <span>Córdoba, Argentina</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-alenia-light font-medium mb-2 text-sm">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-3 py-2 text-sm text-alenia-light placeholder-alenia-light/50 focus:outline-none focus:border-alenia-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-gradient glow-btn text-brand-secondary px-4 py-2 rounded-r-lg text-sm font-medium"
                >
                  OK
                </motion.button>
              </div>
            </div>

            {/* Social */}
            <div className="flex space-x-4">
              {social.map((item) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-alenia-light/70 hover:text-alenia-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-alenia-light/70">
            <p>© {currentYear} Alen.iA. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacidad" className="hover:text-alenia-primary transition-colors">
                Privacidad
              </Link>
              <Link to="/terminos" className="hover:text-alenia-primary transition-colors">
                Términos
              </Link>
              <Link to="/cookies" className="hover:text-alenia-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer