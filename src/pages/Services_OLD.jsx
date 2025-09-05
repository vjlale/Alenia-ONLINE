import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { soluciones } from '../data/solucionesData';

// Datos de formularios locales (mantener para el formulario de contacto)
const formularioConfigs = {
  1: {
    titulo: "Soluciones Digitales",
    descripcion: "Cuéntanos sobre tu proyecto y te preparamos una propuesta personalizada.",
    campos: [
      { name: 'proyecto', label: 'Describe tu proyecto', type: 'textarea', required: true },
      { name: 'presupuesto', label: 'Presupuesto aproximado', type: 'select', options: ['Menos de $500', '$500-$1500', '$1500-$3000', 'Más de $3000'], required: true }
    ],
    textoBoton: "Solicitar Propuesta",
    agradecimiento: "¡Perfecto! Analizaremos tu proyecto y te enviaremos una propuesta detallada en 24 horas."
  },
  2: {
    titulo: "Automatización Inteligente",
    descripcion: "Optimiza tus procesos con automatización inteligente.",
    campos: [
      { name: 'procesos', label: '¿Qué procesos quieres automatizar?', type: 'textarea', required: true },
      { name: 'volumen', label: 'Volumen de clientes/tareas diarias', type: 'select', options: ['1-10', '10-50', '50-100', 'Más de 100'], required: true }
    ],
    textoBoton: "Automatizar Procesos",
    agradecimiento: "¡Excelente! Te contactaremos para analizar tus procesos y diseñar la automatización perfecta."
  },
  3: {
    titulo: "Marketing Digital",
    descripcion: "Incrementa tu presencia digital y atrae más clientes.",
    campos: [
      { name: 'objetivo', label: '¿Cuál es tu objetivo principal?', type: 'select', options: ['Aumentar ventas', 'Generar leads', 'Mejorar branding', 'Expandir mercado'], required: true },
      { name: 'redes', label: '¿En qué redes tienes presencia?', type: 'textarea', required: true }
    ],
    textoBoton: "Potenciar Marketing",
    agradecimiento: "¡Genial! Diseñaremos una estrategia de marketing digital personalizada para tu negocio."
  },
  4: {
    titulo: "Consultoría en IA",
    descripcion: "Implementa inteligencia artificial en tu negocio.",
    campos: [
      { name: 'industria', label: '¿En qué industria trabajas?', type: 'text', required: true },
      { name: 'desafios', label: '¿Cuáles son tus principales desafíos?', type: 'textarea', required: true }
    ],
    textoBoton: "Consultar IA",
    agradecimiento: "¡Fantástico! Un especialista en IA analizará tu caso y te propondrá soluciones innovadoras."
  },
  5: {
    titulo: "Analytics & Optimización",
    descripcion: "Toma decisiones basadas en datos reales.",
    campos: [
      { name: 'metricas', label: '¿Qué métricas son más importantes para ti?', type: 'textarea', required: true },
      { name: 'herramientas', label: '¿Qué herramientas de análisis usas?', type: 'text', required: false }
    ],
    textoBoton: "Optimizar Analytics",
    agradecimiento: "¡Perfecto! Configuraremos un sistema de analytics que te dará insights valiosos para crecer."
  }
};

function Services() {
  const [solucionSeleccionada, setSolucionSeleccionada] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCtaClick = (servicioId) => {
    setSolucionSeleccionada(solucionId);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    setTimeout(() => {
      setSolucionSeleccionada(null);
      setFormSubmitted(false);
    }, 5000);
  };

  const handleCloseModal = () => {
    setSolucionSeleccionada(null);
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-alenia-dark to-slate-900 bg-brand-primary py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-btn">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Nuestras Soluciones
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Soluciones tecnológicas completas que transforman tu negocio y lo llevan al siguiente nivel
          </p>
        </motion.div>

        {/* Grid de Soluciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {soluciones.map((solucion, index) => (
            <ServiceCard 
              key={solucion.id}
              servicio={solucion}
              onCtaClick={handleCtaClick}
              index={index}
            />
          ))}
        </div>

        {/* Modal de Formulario */}
        <AnimatePresence>
          {solucionSeleccionada && (
            <FormularioModal 
              config={formularioConfigs[solucionSeleccionada]}
              onSubmit={handleFormSubmit}
              onClose={handleCloseModal}
              isSubmitted={formSubmitted}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FormularioModal({ config, onSubmit, onClose, isSubmitted }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30 box-shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        {!isSubmitted ? (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-cyan-400 mb-4">{config.titulo}</h2>
              <p className="text-gray-300">{config.descripcion}</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Nombre completo</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Teléfono</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              {config.campos.map((campo, index) => (
                <div key={index}>
                  <label className="block text-white font-medium mb-2">{campo.label}</label>
                  {campo.type === 'textarea' ? (
                    <textarea
                      required={campo.required}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    />
                  ) : campo.type === 'select' ? (
                    <select
                      required={campo.required}
                      className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    >
                      <option value="">Selecciona una opción</option>
                      {campo.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={campo.type}
                      required={campo.required}
                      className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>

            <motion.button
              type="submit"
              className="bg-brand-accent hover:bg-cyan-600 text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {config.textoBoton}
            </motion.button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-4">¡Enviado!</h3>
            <p className="text-white whitespace-pre-line">{config.agradecimiento}</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function ServiceCard({ servicio, onCtaClick, index }) {
  const { icon: Icon, nombre, subtitulo, descripcion, incluye, color, id, categoria, niveles } = servicio;
  
  // Debug: verificar si los datos llegan correctamente
  console.log('ServiceCard data:', { 
    nombre, 
    categoria, 
    niveles: !!niveles, 
    nivelesData: niveles,
    hasNiveles: niveles && Object.keys(niveles).length > 0,
    shouldShowButton: niveles && categoria,
    fullService: servicio
  });

  const colors = {
    blue: {
      bg: 'bg-brand-primary', 
      border: 'border-brand', 
      text: 'text-brand-accent', 
      shadow: 'box-shadow-card glow-btn', 
      button: 'bg-cyan-500 hover:bg-cyan-600'
    },
    green: {
      bg: 'bg-brand-primary', 
      border: 'border-brand', 
      text: 'text-green-400', 
      shadow: 'box-shadow-card glow-btn', 
      button: 'bg-green-500 hover:bg-green-600'
    },
    purple: {
      bg: 'bg-brand-primary', 
      border: 'border-brand', 
      text: 'text-purple-400', 
      shadow: 'box-shadow-card glow-btn', 
      button: 'bg-purple-500 hover:bg-purple-600'
    },
    orange: {
      bg: 'bg-brand-primary', 
      border: 'border-brand', 
      text: 'text-orange-400', 
      shadow: 'box-shadow-card glow-btn', 
      button: 'bg-orange-500 hover:bg-orange-600'
    },
    indigo: {
      bg: 'bg-brand-primary', 
      border: 'border-brand', 
      text: 'text-indigo-400', 
      shadow: 'box-shadow-card glow-btn', 
      button: 'bg-indigo-500 hover:bg-indigo-600'
    },
  };

  const theme = colors[color] || colors.blue;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`${theme.bg} rounded-2xl p-8 ${theme.border} ${theme.shadow} backdrop-blur-sm relative overflow-hidden group transition-all duration-300`}
    >
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Header con ícono */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-xl ${theme.text} bg-white/10`}>
            <Icon size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{nombre}</h3>
            <p className={`text-sm ${theme.text} font-medium`}>{subtitulo}</p>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-300 mb-6 leading-relaxed">{descripcion}</p>

        {/* Lista de incluye */}
        <div className="space-y-3 mb-8">
          <h4 className="text-white font-semibold mb-3">Incluye:</h4>
          {incluye.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-start gap-3"
            >
              <Check size={16} className={`${theme.text} mt-1 flex-shrink-0`} />
              <span className="text-gray-300 text-sm">{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Botones CTA */}
        <div className="space-y-3">
          {/* Botón para ver niveles (si los tiene) */}
          {niveles && categoria && (
            <Link to={`/soluciones/${categoria}`}>
              <motion.button
                className="w-full bg-gradient-to-r from-alenia-primary to-alenia-secondary text-alenia-dark font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn mb-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Ver Niveles de Servicio</span>
                <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          )}
          
          {/* Botón tradicional de información */}
          <motion.button
            onClick={() => onCtaClick(id)}
            className={`w-full ${theme.button} text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn ${niveles ? 'opacity-80' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{niveles ? 'Consulta Rápida' : 'Solicitar Información'}</span>
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default Services;
