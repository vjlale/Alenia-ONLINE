import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
import { soluciones } from '../data/solucionesData';
import ServiceFormModal from '../components/forms/ServiceFormModal';
import ScrollReveal from '../components/common/ScrollReveal';
import AnimatedGradient from '../components/common/AnimatedGradient';

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleServiceFormSubmit = (formData) => {
    console.log('Formulario de servicio enviado:', formData);
    // Aquí conectarías con tu backend o servicio de emails
  };

  const openServiceForm = (servicio) => {
    setSelectedService(servicio);
    setIsFormModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-alenia-dark to-slate-900 py-20">
      <Helmet>
        <title>Nuestras Soluciones | ALENIA - Transformamos tu Negocio con IA</title>
        <meta 
          name="description" 
          content="Descubre nuestras soluciones tecnológicas: Desarrollo Web, Automatización IA, Marketing Digital, Generación de Contenido y E-commerce. Elige el nivel perfecto para tu negocio." 
        />
  <link rel="canonical" href="https://alenia.online/soluciones" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://alenia.online/soluciones" />
  <meta property="og:title" content="Nuestras Soluciones | ALENIA" />
  <meta property="og:description" content="Descubre nuestras soluciones tecnológicas para transformar tu negocio." />
  <meta property="og:image" content="https://alenia.online/images/Alenia1.png" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://alenia.online/soluciones" />
  <meta property="twitter:title" content="Nuestras Soluciones | ALENIA" />
  <meta property="twitter:description" content="Descubre nuestras soluciones tecnológicas para transformar tu negocio." />
  <meta property="twitter:image" content="https://alenia.online/images/Alenia1.png" />
      </Helmet>

      <div className="container mx-auto px-6">
        {/* Header Section con reveal */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6">
              <AnimatedGradient
                className="bg-clip-text text-transparent"
                style={{
                  background: 'linear-gradient(-45deg, rgba(0, 255, 136, 1) 0%, rgba(0, 102, 255, 1) 0%, rgba(255, 0, 102, 1) 100%, rgba(0, 255, 136, 1) 100%)',
                  color: 'rgba(183, 167, 221, 1)'
                }}
              >
                Nuestras Soluciones
              </AnimatedGradient>
            </h1>
            <p className="text-xl text-alenia-light/80 max-w-3xl mx-auto leading-relaxed">
              Soluciones tecnológicas completas que transforman tu negocio y lo llevan al siguiente nivel.
              Cada solución tiene 3 niveles diseñados para diferentes etapas de crecimiento.
            </p>
          </div>
        </ScrollReveal>

        {/* Solutions Grid Interactivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {soluciones.map((solucion, index) => (
            <ServiceCard 
              key={solucion.id}
              servicio={solucion}
              index={index}
              onOpenForm={openServiceForm}
            />
          ))}
        </div>

        {/* Call to Action mejorado */}
        <ScrollReveal delay={0.6} direction="up">
          <div className="text-center mt-20">
            <div className="glass-advanced bg-gradient-to-r from-alenia-primary/10 to-alenia-secondary/10 rounded-2xl p-8 md:p-12 border border-alenia-primary/30 max-w-4xl mx-auto relative overflow-hidden">
              {/* Background gradient animado */}
              <div className="absolute inset-0 bg-gradient-animated opacity-5 pointer-events-none" />
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
                ¿No estás seguro por dónde empezar?
              </h3>
              <p className="text-alenia-light/70 mb-8 text-lg relative z-10">
                Conversemos 15 minutos sin costo. Te ayudamos a encontrar 
                la solución perfecta para tu situación específica.
              </p>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ perspective: 1000 }}
                className="relative z-10"
              >
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-alenia-primary to-alenia-secondary text-alenia-dark px-8 py-4 rounded-xl font-semibold glow-btn transition-all duration-300 group"
                >
                  Solicitar Consulta Gratuita
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Service Form Modal */}
      <ServiceFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        servicio={selectedService}
        onSubmit={handleServiceFormSubmit}
      />
    </div>
  );
}

function ServiceCard({ servicio, index, onOpenForm }) {
  const IconComponent = servicio.icon;
  const cardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Mapeo exacto de colores según las imágenes
  const getServiceStyles = () => {
    switch (servicio.color) {
      case 'blue': // Soluciones Digitales - Cyan/Teal
        return {
          border: 'border-cyan-400',
          glow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
          iconBg: 'bg-slate-800',
          iconColor: 'text-cyan-400',
          titleColor: 'text-white',
          subtitleColor: 'text-cyan-300',
          button: 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black'
        };
      case 'green': // Automatización - Verde
        return {
          border: 'border-green-400',
          glow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]',
          iconBg: 'bg-slate-800',
          iconColor: 'text-green-400',
          titleColor: 'text-white',
          subtitleColor: 'text-green-300',
          button: 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black'
        };
      case 'purple': // Marketing Digital - Púrpura
        return {
          border: 'border-purple-400',
          glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
          iconBg: 'bg-slate-800',
          iconColor: 'text-purple-400',
          titleColor: 'text-white',
          subtitleColor: 'text-purple-300',
          button: 'bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white'
        };
      case 'orange': // Consultoría IA - Naranja
        return {
          border: 'border-orange-400',
          glow: 'hover:shadow-[0_0_30px_rgba(251,146,60,0.4)]',
          iconBg: 'bg-slate-800',
          iconColor: 'text-orange-400',
          titleColor: 'text-white',
          subtitleColor: 'text-orange-300',
          button: 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black'
        };
      case 'indigo': // Analytics - Azul/Índigo
        return {
          border: 'border-indigo-400',
          glow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]',
          iconBg: 'bg-slate-800',
          iconColor: 'text-indigo-400',
          titleColor: 'text-white',
          subtitleColor: 'text-indigo-300',
          button: 'bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white'
        };
      default:
        return {
          border: 'border-cyan-400',
          glow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
          iconBg: 'bg-slate-800',
          iconColor: 'text-cyan-400',
          titleColor: 'text-white',
          subtitleColor: 'text-cyan-300',
          button: 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black'
        };
    }
  };

  const styles = getServiceStyles();

  const handleCTAClick = (e) => {
    e.preventDefault();
    onOpenForm(servicio);
  };

  return (
    <ScrollReveal delay={index * 0.1} direction="up">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        whileHover={{ 
          y: -12,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        className={`relative glass-card-hover border-2 ${styles.border} ${styles.glow} rounded-2xl p-6 transition-all duration-300 group cursor-pointer card-hover-lift overflow-hidden`}
      >
        {/* Gradient overlay animado */}
        <div className="absolute inset-0 bg-gradient-animated opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
        
        {/* Glow effect en hover */}
        <motion.div
          className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${styles.glow}`}
          style={{ zIndex: -1 }}
        />
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 ${styles.iconBg} rounded-xl flex items-center justify-center border ${styles.border}`}>
            <IconComponent className={`w-8 h-8 ${styles.iconColor}`} />
          </div>
        </div>

        {/* Title and Subtitle */}
        <h3 className={`text-2xl font-bold ${styles.titleColor} text-center mb-2`}>
          {servicio.nombre}
        </h3>
        <p className={`text-lg font-semibold ${styles.subtitleColor} text-center mb-4`}>
          {servicio.subtitulo}
        </p>

        {/* Description */}
        <p className="text-gray-300 text-center mb-6 leading-relaxed">
          {servicio.descripcion}
        </p>

        {/* Incluye */}
        <div className="mb-8">
          <h4 className="text-white font-semibold mb-4 text-sm">
            Incluye:
          </h4>
          <div className="space-y-3">
            {servicio.incluye.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          {/* Main CTA - Direct Form */}
          <button
            onClick={handleCTAClick}
            className={`w-full ${styles.button} py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group/btn`}
          >
            Solicitar Información
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>

          {/* Secondary CTA - Levels */}
          {servicio.niveles && (
            <Link
              to={`/soluciones/${servicio.categoria}`}
              className="w-full border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
            >
              Ver planes y precios
            </Link>
          )}
        </div>

        {/* Pricing Preview */}
        {servicio.niveles && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              💬 Consulta gratuita incluida
            </p>
          </div>
        )}
      </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default Services;
