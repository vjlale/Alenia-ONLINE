import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Settings, X, ChevronDown, LayoutGrid, Target } from 'lucide-react';
import { useState } from 'react';
import emailJSService from '../services/emailJSService';
import SmartImage from '../components/common/SmartImage';
import AnimatedLogoBackdrop from '../components/common/AnimatedLogoBackdrop';
import InteractiveSpaceBanner from '../components/landing/InteractiveSpaceBanner';
import ParticleBackground from '../components/common/ParticleBackground';
import NodeNetworkBackground from '../components/common/NodeNetworkBackground';
import ScrollReveal from '../components/common/ScrollReveal';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rubro: '',
    mensaje: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Formatear datos para EmailJS (template general)
      const emailData = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: 'No especificado',
        empresa: formData.rubro || 'No especificada',
        descripcion: formData.mensaje,
        servicio_nombre: 'Consultoría Estratégica',
        categoria: 'consultoria-general'
      };

      const result = await emailJSService.sendServiceForm(emailData, { categoria: 'consultoria-general' });
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ nombre: '', email: '', rubro: '', mensaje: '' });
        console.log('✅ Email de consultoría enviado exitosamente');
        setTimeout(() => {
          setShowModal(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
        console.error('❌ Error enviando email de consultoría:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('❌ Error en envío de consultoría:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative font-inter bg-brand-primary box-shadow-brand">
      <Helmet>
        <title>Alen.iA - Resultados con Inteligencia</title>
        <meta name="description" content="Soluciones inteligentes con IA, automatizaciones y desarrollo web para empresas." />
        <link rel="canonical" href="https://alenia.online/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alenia.online/" />
        <meta property="og:title" content="Alen.iA - Resultados con Inteligencia" />
        <meta property="og:description" content="Soluciones inteligentes con IA, automatizaciones y desarrollo web para empresas." />
  <meta property="og:image" content="https://alenia.online/images/Alenia1.png?v=2" />
  <meta property="og:image:alt" content="ALENIA - Resultados con Inteligencia" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://alenia.online/" />
        <meta property="twitter:title" content="Alen.iA - Resultados con Inteligencia" />
        <meta property="twitter:description" content="Soluciones inteligentes con IA, automatizaciones y desarrollo web para empresas." />
  <meta property="twitter:image" content="https://alenia.online/images/Alenia1.png?v=2" />
  <meta property="twitter:image:alt" content="ALENIA - Resultados con Inteligencia" />
      </Helmet>
      
      {/* Interactive Space Banner - Fullscreen */}
      <InteractiveSpaceBanner />
      
      {/* Particle Background */}
      <ParticleBackground particleCount={30} />
      
      {/* Hero Section Modernizado — ancla para salir del banner interactivo */}
      <section
        id="contenido-principal"
        className="relative min-h-screen flex items-center justify-center py-20 bg-transparent overflow-hidden scroll-mt-4"
      >
        {/* Parallax background layers */}
        <div className="absolute inset-0 parallax-container">
          <div className="parallax-layer parallax-layer-slow opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-alenia-primary/20 via-alenia-secondary/20 to-alenia-accent/20" />
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="glass-advanced rounded-3xl p-8 md:p-12 box-shadow-card-hover border border-alenia-primary/30 relative overflow-hidden">
              {/* Fondo animado detrás del logo */}
              <AnimatedLogoBackdrop intensity={0.6} />
              
              {/* Gradient overlay animado */}
              <div className="absolute inset-0 bg-gradient-animated opacity-10 pointer-events-none" />
              
              {/* Logo Principal con reveal animation */}
              <ScrollReveal delay={0.2} direction="scale">
                <motion.div 
                  className="mb-8 relative z-10"
                  whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <SmartImage 
                    src="/images/5-3.png" 
                    alt="Alen.iA Logo" 
                    className="w-50 h-auto sm:w-52 md:w-64 lg:w-72 mx-auto object-contain drop-shadow-2xl cursor-pointer"
                    width={968}
                    height={632}
                    priority={true}
                  />
                </motion.div>
              </ScrollReveal>
              
              {/* Título principal */}
              <ScrollReveal delay={0.4} direction="up">
                <h1 className="grid flex-wrap text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-10 max-w-4xl mx-auto relative z-10">
                  VENIMOS A CAMBIAR LAS REGLAS DEL JUEGO, NO PAGUÉS MÁS SUSCRIPCIONES POR MES!
                </h1>
              </ScrollReveal>
              
              {/* CTAs con efecto 3D */}
              <ScrollReveal delay={0.8} direction="up">
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      z: 50
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ perspective: 1000 }}
                  >
                    <Link 
                      to="/kontrol-plus" 
                      className="group relative bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl overflow-hidden glow-btn flex items-center gap-2 justify-center transform-gpu"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Apps con IA GRATIS
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: -5,
                      z: 50
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ perspective: 1000 }}
                  >
                    <Link 
                      to="/soluciones" 
                      className="group relative border-2 border-cyan-500 text-white font-bold px-8 py-4 rounded-xl overflow-hidden hover:bg-cyan-500/10 backdrop-blur-sm flex items-center gap-2 justify-center transform-gpu transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Ver Soluciones
                        <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                    </Link>
                  </motion.div>
                </div>
              </ScrollReveal>

              {/* Scroll Indicator Animado */}
              <ScrollReveal delay={1.2} direction="up">
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-alenia-primary/70"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm font-medium">Desplázate</span>
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </ScrollReveal>

              {/* Overlay de borde neón animado */}
              <motion.div 
                className="pointer-events-none absolute inset-0 rounded-3xl z-[5] ring-2 ring-cyan-400/70"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.5)',
                    '0 0 40px rgba(34, 211, 238, 0.8)',
                    '0 0 20px rgba(34, 211, 238, 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección oscura con red de nodos - desde Hub Alenia hacia abajo */}
      <section className="relative bg-black min-h-screen overflow-hidden">
        <NodeNetworkBackground particleCount={60} maxConnectionDistance={180} />
        <div className="relative z-10 container mx-auto px-6 py-20 space-y-24">

          {/* Manifesto – Cambio de Reglas */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-advanced rounded-2xl p-8 md:p-12 border border-alenia-primary/20 text-center">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Sin suscripciones. Sin pagos mensuales.
              </h2>
              <p className="text-xl md:text-2xl text-alenia-primary font-semibold mb-6">
                Pagás una vez. Tenés tu app. Para siempre.
              </p>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Venimos a cambiar las reglas del juego. No más facturas mensuales que se acumulan. Tecnología que trabaja por vos, no al revés.
              </p>
            </div>
          </motion.section>

          {/* Quiénes Somos – Startup de Apps a Medida */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-advanced rounded-2xl p-8 md:p-10 border border-white/10 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <LayoutGrid className="w-8 h-8 text-alenia-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Apps a medida para tu negocio
                </h2>
              </div>
              <p className="text-white/90 text-lg mb-8">
                Somos una startup que crea aplicaciones hechas a tu medida. Automatizamos procesos y organizamos cada aspecto de tu operación. Sin plantillas genéricas. Sin sorpresas.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: LayoutGrid, text: 'Apps hechas a medida para tu negocio' },
                  { icon: Zap, text: 'Automatización de procesos' },
                  { icon: Target, text: 'Organización que escala contigo' },
                  { icon: Settings, text: 'Sin contratos largos ni sorpresas' }
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 text-white/90"
                  >
                    <item.icon className="w-5 h-5 text-alenia-primary flex-shrink-0" />
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Proceso – 3 Pasos */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-advanced rounded-2xl p-8 md:p-10 border border-white/10 overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Simple. Rápido. Efectivo.
              </h2>
              <p className="text-white/90 text-lg mb-10">
                Diagnóstico → Solución a medida → Tu equipo capacitado. En semanas, no en meses.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { n: '1', title: 'Diagnóstico Estratégico', desc: 'Analizamos tu estructura para crear una hoja de ruta personalizada.' },
                  { n: '2', title: 'Solución a Medida', desc: 'Implementamos un sistema inteligente adaptado a tu negocio.' },
                  { n: '3', title: 'Adopción de tu Equipo', desc: 'Capacitación continua para que tu equipo potencie su talento.' }
                ].map((step, i) => (
                  <motion.div
                    key={step.n}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 * (i + 1) }}
                    viewport={{ once: true }}
                    className="rounded-xl p-6 border border-alenia-primary/20 bg-white/5"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold flex items-center justify-center text-xl mb-4">
                      {step.n}
                    </div>
                    <h3 className="text-lg font-semibold text-alenia-primary mb-2">{step.title}</h3>
                    <p className="text-white/90 text-sm">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA Final */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-advanced rounded-2xl p-8 md:p-12 border border-alenia-primary/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para cambiar las reglas?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Agendá una consultoría gratuita y recibí un plan personalizado para tu negocio.
              </p>
              <motion.button
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center mx-auto"
              >
                Agendar Consultoría
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.section>

        </div>
      </section>

      {/* Modal de Formulario */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-purple-300">Agendar Consultoría</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:text-purple-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-purple-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-purple-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Rubro
                </label>
                <input
                  type="text"
                  name="rubro"
                  value={formData.rubro}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-purple-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Tu industria o sector"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  ¿Algo más que quieras contarnos?
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-transparent border border-purple-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none"
                  placeholder="Cuéntanos sobre tu negocio y objetivos..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-bold py-4 rounded-xl transition-all duration-300 mt-6 flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-500 to-green-500 hover:shadow-lg'
                } text-white`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
              
              {/* Estados de envío */}
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2 mt-4"
                >
                  <CheckCircle className="w-5 h-5" /> ¡Consultoría agendada! Te contactaremos pronto.
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center gap-2 mt-4"
                >
                  <X className="w-5 h-5" /> Error al enviar. Inténtalo de nuevo.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </main>
  );
}