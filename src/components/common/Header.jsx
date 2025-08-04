import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Zap } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Apps', href: '/apps' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contacto' }
  ]

  return (
    <header className="sticky top-0 w-full z-50 glass-effect backdrop-blur-md bg-black/60 border-b border-brand">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brand-gradient glow-btn rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-brand-accent text-shadow-glow tracking-wide">
              ALEN.iA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
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
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="#download"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-brand-gradient glow-btn text-brand-secondary px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg"
            >
              <Download className="w-4 h-4 text-brand-accent" />
              <span>Descargar App</span>
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
              {navigation.map((item) => (
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
              ))}
              <a
                href="#download"
              className="flex items-center space-x-2 mt-4 bg-brand-gradient glow-btn text-brand-secondary px-5 py-2 rounded-lg font-semibold text-center shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Descargar App</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header