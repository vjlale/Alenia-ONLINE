import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Zap } from 'lucide-react'

// Definir rutas lazy para prefetching
const lazyRoutes = {
  '/soluciones': () => import('../../pages/Services'),
  '/apps': () => import('../../pages/Apps'),
  '/blog': () => import('../../pages/Blog'),
  '/contacto': () => import('../../pages/Contact'),
  '/kontrol-plus': () => import('../../pages/KontrolPlusLanding'),
};

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

  // Función para precargar rutas al hacer hover
  const handleMouseEnter = (href) => {
    if (lazyRoutes[href]) {
      lazyRoutes[href]().catch(err => {
        console.warn(`Failed to preload ${href}:`, err);
      });
    }
  }

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
                  onMouseEnter={() => handleMouseEnter(item.href)}
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
                  onMouseEnter={() => handleMouseEnter(item.href)}
                  className={`text-base font-semibold transition-colors px-2 py-1 rounded hover:text-brand-accent hover:bg-black/20 ${
                    location.pathname === item.href
                      ? 'text-brand-accent bg-black/30 text-shadow-glow'
                      : 'text-white hover:text-brand-accent'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
            
            {/* CTA Button */}
            <Link
              to="/landing/gestion"
              onMouseEnter={() => handleMouseEnter('/landing/gestion')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand to-brand-accent px-4 py-2 rounded-full text-sm font-semibold text-black hover:shadow-lg hover:shadow-brand/25 transition-all transform hover:scale-105"
            >
              <Download className="w-4 h-4" />
              ALENIA GESTIÓN
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-brand-accent hover:bg-black/20 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-4 border-t border-gray-800"
            >
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onMouseEnter={() => handleMouseEnter(item.href)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-brand-accent bg-black/30'
                        : 'text-white hover:text-brand-accent hover:bg-black/20'
                    }`}
                  >
                    {item.isLogo ? (
                      <div className="flex items-center">
                        <img src="/images/7.png" alt="KONTROL+" className="w-12 h-auto mr-2" />
                        KONTROL+
                      </div>
                    ) : (
                      item.name
                    )}
                  </Link>
                ))}
                
                {/* Mobile CTA */}
                <Link
                  to="/landing/gestion"
                  onMouseEnter={() => handleMouseEnter('/landing/gestion')}
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-brand-accent px-4 py-2 rounded-full text-sm font-semibold text-black mt-4 mx-3"
                >
                  <Download className="w-4 h-4" />
                  ALENIA GESTIÓN
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header
