import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Zap, Github, Linkedin, Instagram } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Soluciones', href: '/soluciones' },
    { name: 'Apps', href: '/apps' },
    { name: 'Blog', href: '/blog' },
    { name: 'KONTROL+', href: '/kontrol-plus', isLogo: true },
    { name: 'Contacto', href: '/contacto' }
  ]

  return (
    <header className="sticky top-0 w-full z-50 glass-effect backdrop-blur-md bg-black/60 border-b border-brand">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/5-3.png" alt="ALENIA Logo" className="w-32 h-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) =>
              item.isLogo ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-2 py-1 rounded transition-transform hover:scale-105 ${
                    location.pathname === item.href
                      ? 'bg-black/30 text-shadow-glow'
                      : ''
                  }`}
                  style={{ minWidth: 90 }}
                >
                  <img src="/images/7.png" alt="KONTROL+" className="w-16 h-auto" />
                </Link>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-semibold transition-colors px-2 py-1 rounded hover:text-brand-accent hover:bg-black/20 ${
                    location.pathname === item.href
                      ? 'text-brand-accent bg-black/30 text-shadow-glow'
                      : 'text-slate-100/80'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Social + CTA (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pr-2 border-r border-white/10">
              <motion.a
                href="https://github.com/vjlale"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ scale: 1.1 }}
                className="text-slate-100/80 hover:text-brand-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/alen-ia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
                className="text-slate-100/80 hover:text-brand-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/alen.ia_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={{ scale: 1.1 }}
                className="text-slate-100/80 hover:text-brand-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>

            <motion.a
              href="/#control-hub"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-brand-gradient glow-btn text-brand-secondary px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg"
            >
              <Download className="w-4 h-4 text-brand-accent" />
              <span>Alen.iA HUB</span>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-accent hover:text-brand-secondary"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect border-t border-brand bg-black/80"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) =>
                item.isLogo ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md transition-transform hover:scale-105"
                    style={{ minWidth: 90 }}
                  >
                    <img src="/images/7.png" alt="KONTROL+" className="w-16 h-auto" />
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-semibold rounded-md transition-colors ${
                      location.pathname === item.href
                        ? 'text-brand-accent bg-black/30 text-shadow-glow'
                        : 'text-slate-100/80 hover:text-brand-accent hover:bg-black/20'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
              <a
                href="/#control-hub"
                onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 mt-4 bg-brand-gradient glow-btn text-brand-secondary px-5 py-2 rounded-lg font-semibold text-center shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Alen.iA HUB</span>
              </a>
              {/* Social Icons (Mobile) */}
              <div className="flex items-center space-x-4 mt-3 pb-2">
                <a
                  href="https://github.com/vjlale"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-slate-100/80 hover:text-brand-accent transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/alen-ia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-slate-100/80 hover:text-brand-accent transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/alen.ia_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-slate-100/80 hover:text-brand-accent transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header