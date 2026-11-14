import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cpu, ChevronDown, Github, Linkedin, Instagram } from 'lucide-react'
import { BRAND_LOGOS } from '../../config/brand'

// Encabezado reconstruido desde el sitio publicado (aleniahub.com),
// con el submenú de Soluciones orientado a automatización, apps y webs.

const solucionesSub = [
  { name: 'Todas las soluciones', href: '/soluciones' },
  { name: 'ALENIA HUB', href: '/soluciones/hub' },
  { name: 'Webs y apps', href: '/soluciones/digitales' }
]

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Soluciones', href: '/soluciones', sub: solucionesSub },
  { name: 'Apps', href: '/apps' },
  { name: 'Blog', href: '/blog' },
  { name: 'LaIA', href: '/casos/laia', isLogo: true, logoPath: '/images/laia/logo-laia-line.webp', wide: true },
  {
    name: 'Kontrol Pro',
    href: 'https://kontrolpro.app/',
    isLogo: true,
    logoPath: '/images/kontrol-pro/logo.png',
    external: true
  },
  {
    name: 'Play Padel',
    href: 'https://www.appmatchpadel.com/landing',
    isLogo: true,
    logoPath: '/images/playpadel/match-padel-logo.png',
    external: true
  },
  { name: 'Contacto', href: '/contacto' }
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/vjlale', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/alen-ia/', icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/alen.ia_/', icon: Instagram }
]

const linkBase = 'relative whitespace-nowrap text-base font-semibold transition-all duration-300 px-2 py-1 rounded group focus-ring'
const linkActive = 'text-brand-accent bg-black/30 text-shadow-glow'
const linkIdle = 'text-slate-100/80 hover:text-brand-accent hover:bg-black/20'

const ActiveUnderline = () => (
  <motion.div
    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-alenia-primary to-alenia-accent"
    layoutId="activeTab"
    transition={{ duration: 0.3 }}
    aria-hidden="true"
  />
)

const LogoLink = ({ item, isActive, onClick, mobile = false }) => {
  const className = `flex items-center ${mobile ? 'px-3 py-2 rounded-md' : 'px-2 py-1 rounded'} transition-transform hover:scale-105`
  const style = { minWidth: 70, maxHeight: '48px' }
  const img = (
    <img
      src={item.logoPath || '/images/7.png'}
      alt={item.name}
      className={`h-10 w-auto ${item.wide ? 'max-w-[96px]' : item.external ? 'max-w-[90px]' : 'max-w-[70px]'} object-contain`}
    />
  )

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className} style={style}>
        {img}
      </a>
    )
  }

  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={`${className} ${isActive ? 'bg-black/30 text-shadow-glow' : ''}`}
      style={style}
    >
      {img}
    </Link>
  )
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSubOpen, setIsSubOpen] = useState(false)
  const location = useLocation()
  const inSoluciones = location.pathname.startsWith('/soluciones')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menús al cambiar de página
  useEffect(() => {
    setIsMenuOpen(false)
    setIsSubOpen(false)
  }, [location.pathname])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <motion.header
      className={`sticky top-0 w-full z-50 glass-effect backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? 'bg-black/80 border-alenia-primary/30 shadow-glow-md' : 'bg-black/60 border-brand'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center space-x-2" aria-label="Ir a inicio - ALENIA">
              <img
                src={BRAND_LOGOS.lockupFull}
                alt="ALENIA"
                className="hidden min-[400px]:block h-10 w-auto max-w-[220px] object-contain object-left"
                width={220}
                height={110}
              />
              <img
                src={BRAND_LOGOS.lockupText}
                alt="ALENIA"
                className="min-[400px]:hidden h-9 w-auto max-w-[200px] object-contain object-left"
                width={200}
                height={50}
              />
            </Link>
          </motion.div>

          {/* Navegación de escritorio */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            {navigation.map((item) => {
              if (item.isLogo) {
                return <LogoLink key={item.name} item={item} isActive={location.pathname === item.href} />
              }

              if (item.sub) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setIsSubOpen(true)}
                    onMouseLeave={() => setIsSubOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsSubOpen((open) => !open)}
                      className={`${linkBase} flex items-center gap-1 ${inSoluciones ? linkActive : linkIdle}`}
                      aria-expanded={isSubOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isSubOpen ? 'rotate-180' : ''}`} />
                      {inSoluciones && <ActiveUnderline />}
                    </button>
                    {isSubOpen && (
                      <div className="absolute left-0 top-full pt-1 min-w-[220px] z-50" role="menu">
                        <div className="rounded-lg border border-white/10 bg-black/95 backdrop-blur-md py-2 shadow-xl">
                          {item.sub.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              role="menuitem"
                              className={`block px-4 py-2 text-sm font-medium transition-colors ${
                                location.pathname === subItem.href
                                  ? 'text-brand-accent bg-white/5'
                                  : 'text-slate-200 hover:text-brand-accent hover:bg-white/5'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              const isActive = location.pathname === item.href
              return (
                <motion.div key={item.name} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link
                    to={item.href}
                    className={`${linkBase} ${isActive ? linkActive : linkIdle}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                    {isActive && <ActiveUnderline />}
                    <span
                      className="absolute inset-0 rounded bg-alenia-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Redes y botón ALENIA HUB (escritorio) */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="hidden 2xl:flex items-center space-x-3 pr-2 border-r border-white/10">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  whileHover={{ scale: 1.1 }}
                  className="text-slate-100/80 hover:text-brand-accent transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/soluciones/hub"
                className="flex items-center space-x-2 whitespace-nowrap bg-brand-gradient glow-btn text-brand-secondary px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              >
                <Cpu className="w-4 h-4 text-brand-accent" />
                <span>ALENIA HUB</span>
              </Link>
            </motion.div>
          </div>

          {/* Botón del menú en celulares y pantallas angostas */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-accent hover:text-brand-secondary focus-ring"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
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

      {/* Menú desplegable en celulares */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden glass-advanced border-t border-alenia-primary/30 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="px-4 py-2 space-y-1"
            >
              {navigation.map((item, index) => {
                if (item.isLogo) {
                  return (
                    <LogoLink
                      key={item.name}
                      item={item}
                      isActive={location.pathname === item.href}
                      onClick={closeMenu}
                      mobile
                    />
                  )
                }

                if (item.sub) {
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + 0.05 * index }}
                      className="px-3 py-2"
                    >
                      <p className="text-xs uppercase tracking-wider text-alenia-primary/80 mb-2">{item.name}</p>
                      <div className="pl-2 border-l border-white/10 space-y-1">
                        {item.sub.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            onClick={closeMenu}
                            className={`block py-1.5 text-sm font-semibold rounded-md transition-all ${
                              location.pathname === subItem.href
                                ? 'text-brand-accent'
                                : 'text-slate-100/80 hover:text-brand-accent'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )
                }

                return (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + 0.05 * index }}
                  >
                    <Link
                      to={item.href}
                      onClick={closeMenu}
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
              })}

              <Link
                to="/soluciones/hub"
                onClick={closeMenu}
                className="flex items-center space-x-2 mt-4 bg-brand-gradient glow-btn text-brand-secondary px-5 py-2 rounded-lg font-semibold text-center shadow-lg"
              >
                <Cpu className="w-4 h-4" />
                <span>ALENIA HUB</span>
              </Link>

              <div className="flex items-center space-x-4 mt-3 pb-2">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="text-slate-100/80 hover:text-brand-accent transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
