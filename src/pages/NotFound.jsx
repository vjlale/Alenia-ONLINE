import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-8xl md:text-9xl font-display font-bold gradient-text mb-4">
              404
            </h1>
            <div className="flex justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-gradient-to-r from-alenia-primary to-alenia-secondary rounded-full flex items-center justify-center"
              >
                <Search className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
          >
            Página no encontrada
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-alenia-light/80 mb-8"
          >
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Pero no te preocupes, tenemos muchas otras cosas increíbles para mostrarte.
          </motion.p>
          
          {/* Floating particles */}
          <div className="relative mb-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-alenia-primary/30 rounded-full"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-alenia-primary to-alenia-secondary text-alenia-dark px-8 py-4 rounded-lg font-bold hover:neon-glow transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Volver al Inicio</span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center space-x-2 glass-effect text-alenia-light px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Página Anterior</span>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <p className="text-alenia-light/60 mb-4">O explora estas secciones:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                to="/servicios" 
                className="text-alenia-primary hover:text-alenia-secondary transition-colors"
              >
                Nuestros Servicios
              </Link>
              <span className="text-alenia-light/30">•</span>
              <Link 
                to="/apps" 
                className="text-alenia-primary hover:text-alenia-secondary transition-colors"
              >
                Apps Gratuitas
              </Link>
              <span className="text-alenia-light/30">•</span>
              <Link 
                to="/blog" 
                className="text-alenia-primary hover:text-alenia-secondary transition-colors"
              >
                Blog
              </Link>
              <span className="text-alenia-light/30">•</span>
              <Link 
                to="/contacto" 
                className="text-alenia-primary hover:text-alenia-secondary transition-colors"
              >
                Contacto
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default NotFound