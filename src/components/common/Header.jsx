import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Github, Linkedin, Instagram, ChevronDown } from 'lucide-react'
import { brandPaths } from '../../config/brandAssets'

const solucionesSub = [
  { name: 'Servicios', href: '/soluciones' },
  { name: 'ALENIA HUB', href: '/soluciones/hub' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [solucionesOpen, setSolucionesOpen] = useState(false)
  const location = useLocation()
  const isSolucionesActive = location.pathname.startsWith('/soluciones')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Soluciones', href: '/soluciones', sub: solucionesSub },
    { name: 'Apps', href: '/apps' },
    { name: 'Blog', href: '/blog' },
    { name: 'KONTROL+', href: '/kontrol-plus', isLogo: true, logoPath: '/images/7.png' },
    {
      name: 'Play Padel',
      href: 'https://www.appmatchpadel.com/landing',
      isLogo: true,
      logoPath: '/images/playpadel/match-padel-logo.png',
      external: true,
    },
    { name: 'Contacto', href: '/contacto' }
  ]

  return (
    <motion.header
        className={`sticky top-0 w-full z-50 glass-effect backdrop-blur-md border-b transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 border-alenia-primary/30 shadow-glow-md'
            : 'bg-black/60 border-brand'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              aria-label="Ir a inicio - ALENIA"
            >
              <img
                src={brandPaths.lockupFull}
                alt="ALENIA"
                className="hidden min-[400px]:block h-10 w-auto max-w-[220px] object-contain object-left"
                width={220}
                height={110}
              />
              <img
                src={brandPaths.lockupText}
                alt="ALENIA"
                className="min-[400px]:hidden h-9 w-auto max-w-[200px] object-contain object-left"
                width={200}
                height={50}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) =>
              item.isLogo ? (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-2 py-1 rounded transition-transform hover:scale-105"
                    style={{ minWidth: 70, maxHeight: '48px' }}
                  >
                    <img src={item.logoPath || '/images/7.png'} alt={item.name} className="h-10 w-auto max-w-[90px] object-contain" />
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-2 py-1 rounded transition-transform hover:scale-105 ${
                      location.pathname === item.href ? 'bg-black/30 text-shadow-glow' : ''
                    }`}
                    style={{ minWidth: 70, maxHeight: '48px' }}
                  >
                    <img src={item.logoPath || '/images/7.png'} alt={item.name} className="h-10 w-auto max-w-[70px] object-contain" />
                  </Link>
                )
              ) : item.sub ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setSolucionesOpen(true)}
                  onMouseLeave={() => setSolucionesOpen(false)}
                >
                  <button
                    type="button"
                    className={`relative text-base font-semibold transition-all duration-300 px-2 py-1 rounded group focus-ring flex items-center gap-1 ${
                      isSolucionesActive
                        ? 'text-brand-accent bg-black/30 text-shadow-glow'
                        : 'text-slate-100/80 hover:text-brand-accent hover:bg-black/20'
                    }`}
                    aria-expanded={solucionesOpen}
                    aria-haspopup="true"
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${solucionesOpen ? 'rotate-180' : ''}`} />
                    {isSolucionesActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-alenia-primary to-alenia-accent"
                        layoutId="activeTab"
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                  {solucionesOpen && (
                    <div
                      className="absolute left-0 top-full pt-1 min-w-[220px] z-50"
                      role="menu"
                    >
                      <div className="rounded-lg border border-white/10 bg-black/95 backdrop-blur-md py-2 shadow-xl">
                        {item.sub.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            role="menuitem"
                            className={`block px-4 py-2 text-sm font-medium transition-colors ${
                              location.pathname === sub.href
                                ? 'text-brand-accent bg-white/5'
                                : 'text-slate-200 hover:text-brand-accent hover:bg-white/5'
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.href}
                    className={`relative text-base font-semibold transition-all duration-300 px-2 py-1 rounded group focus-ring ${
                      location.pathname === item.href
                        ? 'text-brand-accent bg-black/30 text-shadow-glow'
                        : 'text-slate-100/80 hover:text-brand-accent hover:bg-black/20'
                    }`}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                    {location.pathname === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-alenia-primary to-alenia-accent"
                        layoutId="activeTab"
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="absolute inset-0 rounded bg-alenia-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  </Link>
                </motion.div>
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

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/soluciones/hub"
                className="flex items-center space-x-2 bg-brand-gradient glow-btn text-brand-secondary px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              >
                <Download className="w-4 h-4 text-brand-accent" />
                <span>ALENIA HUB</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-accent hover:text-brand-secondary focus-ring"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
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
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden glass-advanced border-t border-alenia-primary/30 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="px-4 py-2 space-y-1"
            >
              {navigation.map((item) =>
                item.isLogo ? (
                  item.external ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-3 py-2 rounded-md transition-transform hover:scale-105"
                      style={{ minWidth: 70, maxHeight: '48px' }}
                    >
                      <img src={item.logoPath || '/images/7.png'} alt={item.name} className="h-10 w-auto max-w-[90px] object-contain" />
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-md transition-transform hover:scale-105 ${
                        location.pathname === item.href ? 'bg-black/30 text-shadow-glow' : ''
                      }`}
                      style={{ minWidth: 70, maxHeight: '48px' }}
                    >
                      <img src={item.logoPath || '/images/7.png'} alt={item.name} className="h-10 w-auto max-w-[70px] object-contain" />
                    </Link>
                  )
                ) : item.sub ? (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (navigation.indexOf(item) * 0.05) }}
                    className="px-3 py-2"
                  >
                    <p className="text-xs uppercase tracking-wider text-alenia-primary/80 mb-2">{item.name}</p>
                    <div className="pl-2 border-l border-white/10 space-y-1">
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block py-1.5 text-sm font-semibold rounded-md transition-all ${
                            location.pathname === sub.href
                              ? 'text-brand-accent'
                              : 'text-slate-100/80 hover:text-brand-accent'
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (navigation.indexOf(item) * 0.05) }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 text-base font-semibold rounded-md transition-all duration-300 ${
                        location.pathname === item.href
                          ? 'text-brand-accent bg-black/30 text-shadow-glow'
                          : 'text-slate-100/80 hover:text-brand-accent hover:bg-black/20 hover:translate-x-2'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              )}
              <Link
                to="/soluciones/hub"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 mt-4 bg-brand-gradient glow-btn text-brand-secondary px-5 py-2 rounded-lg font-semibold text-center shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>ALENIA HUB</span>
              </Link>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header