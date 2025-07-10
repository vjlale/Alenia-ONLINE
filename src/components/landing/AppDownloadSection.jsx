import { motion } from 'framer-motion'
import { Download, Monitor, Users, TrendingUp, CheckCircle, Star } from 'lucide-react'

const AppDownloadSection = () => {
  const appFeatures = [
    {
      icon: Users,
      title: 'Gestión de Clientes',
      description: 'CRM completo con seguimiento de leads y ventas'
    },
    {
      icon: TrendingUp,
      title: 'Reportes Automáticos',
      description: 'Análisis de ventas y rendimiento en tiempo real'
    },
    {
      icon: Monitor,
      title: 'Interfaz Intuitiva',
      description: 'Diseño moderno y fácil de usar para todos los niveles'
    }
  ]

  const benefits = [
    'Instalación gratuita y sin restricciones',
    'Actualizaciones automáticas incluidas',
    'Soporte técnico especializado',
    'Integración con otras herramientas',
    'Backup automático de datos',
    'Personalización completa'
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-alenia-dark to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-alenia-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-alenia-secondary/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - App info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-alenia-primary/10 border border-alenia-primary/20 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-alenia-primary" />
              <span className="text-sm font-medium text-alenia-primary">
                Descarga Gratuita
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-alenia-primary to-alenia-secondary bg-clip-text text-transparent">
                ALENIA GESTIÓN
              </span>
              <br />
              Sistema Completo
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              La herramienta perfecta para gestionar tu negocio de manera eficiente. 
              Controla clientes, ventas, inventario y más desde una sola aplicación.
            </p>

            {/* Download button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-alenia-primary to-alenia-secondary hover:from-alenia-secondary hover:to-alenia-primary text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mb-8"
            >
              <Download className="w-6 h-6" />
              Descargar Gratis para Windows
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </motion.button>

            {/* System requirements */}
            <div className="text-sm text-gray-400 mb-8">
              <p className="mb-2">
                <span className="font-semibold">Requisitos:</span> Windows 10 o superior
              </p>
              <p className="mb-2">
                <span className="font-semibold">Tamaño:</span> 45 MB aproximadamente
              </p>
              <p>
                <span className="font-semibold">Licencia:</span> Gratuita para uso comercial
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-gray-800/30 rounded-xl p-4 border border-gray-700/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-alenia-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-alenia-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* App mockup placeholder */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 mb-8">
              <div className="aspect-video bg-gradient-to-br from-alenia-primary/20 to-alenia-secondary/20 rounded-xl flex items-center justify-center">
                <Monitor className="w-16 h-16 text-alenia-primary" />
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-3 bg-gray-700 rounded-full"></div>
                <div className="h-3 bg-gray-700 rounded-full w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded-full w-1/2"></div>
              </div>
            </div>

            {/* Benefits list */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-display font-semibold text-white mb-6">
                Beneficios Incluidos
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-alenia-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Download stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 flex items-center justify-center gap-6 text-center"
            >
              <div>
                <div className="text-2xl font-display font-bold text-alenia-primary">500+</div>
                <div className="text-sm text-gray-400">Descargas</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div>
                <div className="text-2xl font-display font-bold text-alenia-secondary">4.9</div>
                <div className="text-sm text-gray-400">Calificación</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div>
                <div className="text-2xl font-display font-bold text-alenia-accent">24/7</div>
                <div className="text-sm text-gray-400">Soporte</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AppDownloadSection
