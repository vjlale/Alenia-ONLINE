import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { soluciones } from '../data/solucionesData';

function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-alenia-dark to-slate-900 py-20">
      <Helmet>
        <title>Nuestras Soluciones | ALENIA - Transformamos tu Negocio con IA</title>
        <meta 
          name="description" 
          content="Descubre nuestras soluciones tecnológicas: Desarrollo Web, Automatización IA, Marketing Digital, Generación de Contenido y E-commerce. Elige el nivel perfecto para tu negocio." 
        />
      </Helmet>

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-alenia-primary via-alenia-secondary to-alenia-accent bg-clip-text text-transparent">
              Nuestras Soluciones
            </span>
          </h1>
          <p className="text-xl text-alenia-light/80 max-w-3xl mx-auto leading-relaxed">
            Soluciones tecnológicas completas que transforman tu negocio y lo llevan al siguiente nivel.
            Cada solución tiene 3 niveles diseñados para diferentes etapas de crecimiento.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {soluciones.map((solucion, index) => (
            <ServiceCard 
              key={solucion.id}
              servicio={solucion}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-alenia-primary/10 to-alenia-secondary/10 rounded-xl p-8 border border-alenia-primary/20 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿No estás seguro por dónde empezar?
            </h3>
            <p className="text-alenia-light/70 mb-6 text-lg">
              Conversemos 15 minutos sin costo. Te ayudamos a encontrar 
              la solución perfecta para tu situación específica.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-alenia-primary to-alenia-secondary text-alenia-dark px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-alenia-primary/25 transition-all duration-300 transform hover:scale-105"
            >
              Solicitar Consulta Gratuita
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ServiceCard({ servicio, index }) {
  const IconComponent = servicio.icon;
  
  const colorClasses = {
    blue: {
      border: 'border-blue-500/30',
      hover: 'hover:border-blue-400/50',
      gradient: 'from-blue-500/20 to-blue-600/20',
      icon: 'text-blue-400',
      button: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
    },
    green: {
      border: 'border-green-500/30',
      hover: 'hover:border-green-400/50',
      gradient: 'from-green-500/20 to-green-600/20',
      icon: 'text-green-400',
      button: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
    },
    purple: {
      border: 'border-purple-500/30',
      hover: 'hover:border-purple-400/50',
      gradient: 'from-purple-500/20 to-purple-600/20',
      icon: 'text-purple-400',
      button: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
    },
    orange: {
      border: 'border-orange-500/30',
      hover: 'hover:border-orange-400/50',
      gradient: 'from-orange-500/20 to-orange-600/20',
      icon: 'text-orange-400',
      button: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
    },
    indigo: {
      border: 'border-indigo-500/30',
      hover: 'hover:border-indigo-400/50',
      gradient: 'from-indigo-500/20 to-indigo-600/20',
      icon: 'text-indigo-400',
      button: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
    }
  };

  const colors = colorClasses[servicio.color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`relative bg-alenia-dark/60 backdrop-blur-sm border ${colors.border} ${colors.hover} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-alenia-primary/10 group`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center border ${colors.border}`}>
            <IconComponent className={`w-8 h-8 ${colors.icon}`} />
          </div>
        </div>

        {/* Title and Subtitle */}
        <h3 className="text-2xl font-bold text-white text-center mb-2">
          {servicio.nombre}
        </h3>
        <p className={`text-lg font-semibold ${colors.icon} text-center mb-4`}>
          {servicio.subtitulo}
        </p>

        {/* Description */}
        <p className="text-alenia-light/70 text-center mb-6 leading-relaxed">
          {servicio.descripcion}
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {servicio.incluye.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
              <span className="text-alenia-light/80 text-sm">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to={`/soluciones/${servicio.categoria}`}
          className={`w-full bg-gradient-to-r ${colors.button} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-current/25 flex items-center justify-center gap-2 group/btn`}
        >
          Ver Niveles de Servicio
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>

        {/* Pricing Preview */}
        {servicio.niveles && (
          <div className="mt-4 text-center">
            <p className="text-xs text-alenia-light/50">
              Desde {servicio.niveles.elemental.precio} hasta {servicio.niveles.visionario.precio}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Services;
