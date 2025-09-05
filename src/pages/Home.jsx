import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Zap, Shield, TrendingUp, Settings, X, Sliders, MessageSquare, Mail, Smartphone } from 'lucide-react';
import { useState, useRef } from 'react';
import emailJSService from '../services/emailJSService';
import SmartImage from '../components/common/SmartImage';
import AnimatedLogoBackdrop from '../components/common/AnimatedLogoBackdrop';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rubro: '',
    mensaje: ''
  });

  // Referencias para el progress indicator
  const processRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });

  // Transformar el scroll en progreso de 0 a 100
  const progressValue = useTransform(scrollYProgress, [0, 1], [0, 100]);

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
    <main className="font-inter bg-brand-primary min-h-screen box-shadow-brand">
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
      {/* Hero Section con Título y Subtítulo */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand relative overflow-hidden shadow-[0_0_32px_rgba(34,211,238,0.15)]">
              {/* Fondo animado detrás del logo */}
              <AnimatedLogoBackdrop intensity={0.6} />
              {/* Logo Principal */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8 relative z-10"
              >
                <SmartImage 
                  src="/images/5-3.png" 
                  alt="Alen.iA Logo" 
                  className="w-50 h-auto sm:w-52 md:w-64 lg:w-72 mx-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                  width={968}
                  height={632}
                  priority={true}
                />
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
                Solución <span className="text-green-500">Inteligente</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto relative z-10">
                Acompañamos a empresas en la implementación de soluciones con IA para optimizar procesos y resolver problemas complejos. Desde la estructura de datos hasta la capacitación de empleados, te ayudamos a transformar tu negocio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link to="/kontrol-plus" className="bg-purple-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-cyan-600 transition-all duration-300 flex items-center gap-2 justify-center">
                  Apps con IA GRATIS
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/soluciones" className="border-2 border-cyan-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-cyan-500 hover:text-white transition-all duration-300 flex items-center gap-2 justify-center">
                  Ver Soluciones
                  <Zap className="w-5 h-5" />
                </Link>
              </div>

              {/* Overlay de borde neón cyan */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl z-[5] ring-2 ring-cyan-400/70"></div>
            </div>
          </motion.div>
        </div>
      </section>

  {/* ALEN.iA Control Hub Section */}
  <section id="control-hub" className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-brand-primary rounded-2xl p-8 md:p-10 box-shadow-card glow-btn border border-brand relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_left,rgba(34,197,94,0.2),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.2),transparent_40%)]" />

              <div className="flex items-center gap-3 mb-2 relative z-10">
                <Sliders className="w-7 h-7 text-green-400" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  ALEN.iA <span className="text-green-500">Control Hub</span>
                </h2>
                <span className="ml-2 text-[10px] md:text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-green-500/20 text-green-300 border border-white/10 animate-pulse">
                  Próximamente
                </span>
              </div>
              <p className="text-white/90 text-lg mb-8 relative z-10">
                El poder de la inteligencia artificial, finalmente en tus manos.
              </p>

              {/* Intro Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-xl p-6 border border-white/10 mb-8 relative overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-purple-500/20 to-green-500/20 blur-2xl" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center text-white flex-shrink-0">
                    <Sliders className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-purple-300 mb-2">Plataforma de Autogestión</h3>
                    <p className="text-white/90">
                      Olvídate de implementaciones complejas y costos impredecibles. Con nuestro Control Hub, configuras, gestionas y escalas tú mismo las soluciones de IA que tu negocio necesita. Es tan simple como 1-2-3.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Pasos 1-2-3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {[
                  { n: '1', title: 'Configura', desc: 'Elige módulos y conecta tus canales en minutos.' },
                  { n: '2', title: 'Lanza', desc: 'Activa flujos y empieza a operar sin fricción.' },
                  { n: '3', title: 'Escala', desc: 'Mide, ajusta y multiplica resultados con datos.' }
                ].map((step, i) => (
                  <motion.div
                    key={step.n}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 * (i + 1) }}
                    viewport={{ once: true }}
                    className="rounded-xl p-5 border border-white/10 bg-purple-900/10"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-green-500 text-white font-bold flex items-center justify-center shadow">
                        {step.n}
                      </div>
                      <h4 className="text-lg font-semibold text-purple-300">{step.title}</h4>
                    </div>
                    <p className="text-white/90 text-sm">{step.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Módulos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Conversación */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="rounded-xl p-6 border border-white/10 bg-gradient-to-b from-purple-900/30 to-transparent"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center text-white mb-3">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Módulo de Conversación</h3>
                  <p className="text-white/90 text-sm mb-3">Asistente inteligente para WhatsApp, Instagram y web. Califica leads, agenda citas y vende 24/7.</p>
                  <div className="text-green-400 font-semibold">+40% en captación de leads</div>
                </motion.div>

                {/* Email Marketing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-xl p-6 border border-white/10 bg-gradient-to-b from-purple-900/30 to-transparent"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center text-white mb-3">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Módulo de Email Marketing</h3>
                  <p className="text-white/90 text-sm mb-3">IA que sugiere copy perfecto, horarios óptimos y segmentación automática.</p>
                  <div className="text-green-400 font-semibold">+35% tasa de apertura · 2x CTR</div>
                </motion.div>

                {/* Contenido Social */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="rounded-xl p-6 border border-white/10 bg-gradient-to-b from-purple-900/30 to-transparent"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center text-white mb-3">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Módulo de Contenido Social</h3>
                  <p className="text-white/90 text-sm mb-3">Generación automática de posts, ideas de videos y calendarios de publicación.</p>
                  <div className="text-green-400 font-semibold">Ahorra +15 horas semanales</div>
                </motion.div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <button type="button" disabled className="bg-gradient-to-r from-purple-500 to-green-500 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 opacity-60 cursor-not-allowed">
                  Próximamente
                  <ArrowRight className="w-5 h-5" />
                </button>
                <span className="text-white/70 text-sm">En desarrollo · Sin costos iniciales al lanzamiento</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand relative overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nuestros <span className="text-green-500">Valores</span>
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-3xl">
                En ALENIA construimos soluciones con foco en las personas, los datos y los resultados. Esta es la cultura que guía cada proyecto.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Empoderamiento */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-xl p-5 border border-white/10"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center text-white flex-shrink-0">
          <Users className="w-5 h-5" />
                  </div>
                  <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-1">Empoderamiento</h3>
          <p className="text-white/90 text-sm">Creemos que nuestros usuarios deben tener el control total. Nuestra tecnología es un medio para su autonomía digital.</p>
                  </div>
                </motion.div>

        {/* Simplicidad Radical */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-xl p-5 border border-white/10"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center text-white flex-shrink-0">
          <Zap className="w-5 h-5" />
                  </div>
                  <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-1">Simplicidad Radical</h3>
          <p className="text-white/90 text-sm">Obsesionados con hacer que lo complejo se sienta fácil. La mejor tecnología es la que no se nota.</p>
                  </div>
                </motion.div>

        {/* Innovación Constante */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-xl p-5 border border-white/10"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center text-white flex-shrink-0">
          <Settings className="w-5 h-5" />
                  </div>
                  <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-1">Innovación Constante</h3>
          <p className="text-white/90 text-sm">Somos un producto vivo. Evolucionamos continuamente para ofrecer más poder y facilidad a nuestros usuarios.</p>
                  </div>
                </motion.div>

        {/* Transparencia Total */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-xl p-5 border border-white/10"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center text-white flex-shrink-0">
          <Shield className="w-5 h-5" />
                  </div>
                  <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-1">Transparencia Total</h3>
          <p className="text-white/90 text-sm">Resultados claros, precios predecibles y comunicación directa. Sin cajas negras, sin sorpresas.</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 text-white/80 text-sm">
                <span className="bg-gradient-to-r from-purple-500/20 to-green-500/20 px-3 py-2 rounded-lg border border-white/10">
                  Tecnología simple. Resultados reales.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section className="py-20 bg-transparent" ref={processRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto relative"
          >
            {/* Progress Indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-purple-500 to-green-500 rounded-full origin-top"
                style={{ scaleY: useTransform(scrollYProgress, [0.1, 0.9], [0, 1]) }}
              />
            </div>

            <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand ml-8">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-300">
                  ¿Cómo trabajamos?
                </h2>
                <Settings className="w-8 h-8 text-purple-300" />
              </div>
              <div className="w-full h-px bg-purple-300 mb-6"></div>
              
              <div className="space-y-6 text-white">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg"
                >
                  <strong>SIMPLE</strong> acompaña a tu empresa en la optimización de procesos mediante inteligencia artificial, desde la estrategia inicial hasta la formación del equipo.
                </motion.p>
                
                <div className="space-y-8">
                  {/* Paso 1 */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 relative"
                  >
                    {/* Línea conectora */}
                    <div className="absolute left-6 top-12 w-px h-16 bg-gradient-to-b from-purple-500 to-green-500"></div>
                    
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredStep(1)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 cursor-pointer relative"
                    >
                      1
                      {/* Tooltip */}
                      {hoveredStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20"
                        >
                          ⏱️ Duración: 1-2 semanas
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                        </motion.div>
                      )}
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="flex-1"
                    >
                      <h3 className="text-xl font-bold text-purple-300 mb-3">
                        Diagnóstico Estratégico
                      </h3>
                      <p className="text-lg text-white">
                        Analizamos tu estructura para identificar oportunidades de mejora y crear una hoja de ruta personalizada.
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Paso 2 */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 relative"
                  >
                    {/* Línea conectora */}
                    <div className="absolute left-6 top-12 w-px h-16 bg-gradient-to-b from-purple-500 to-green-500"></div>
                    
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredStep(2)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 cursor-pointer relative"
                    >
                      2
                      {/* Tooltip */}
                      {hoveredStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20"
                        >
                          🚀 Duración: 2-3 semanas
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                        </motion.div>
                      )}
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="flex-1"
                    >
                      <h3 className="text-xl font-bold text-purple-300 mb-3">
                        Solución a Medida
                      </h3>
                      <p className="text-lg text-white">
                        Implementamos un sistema inteligente adaptado a tu entorno, organizando la información según tus necesidades.
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Paso 3 */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 relative"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredStep(3)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 cursor-pointer relative"
                    >
                      3
                      {/* Tooltip */}
                      {hoveredStep === 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20"
                        >
                          🎯 Duración: Permanente
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                        </motion.div>
                      )}
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      viewport={{ once: true }}
                      className="flex-1"
                    >
                      <h3 className="text-xl font-bold text-purple-300 mb-3">
                        Adopción de tu Equipo
                      </h3>
                      <p className="text-lg text-white">
                        Ofrecemos capacitación continua para asegurar que tu equipo utilice efectivamente las herramientas y potencie su talento.
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-purple-300 pl-6 py-4 bg-purple-900/20 rounded-r-lg"
                >
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    viewport={{ once: true }}
                    className="text-white italic text-lg mb-2"
                  >
                    "Notamos que el miedo a lo desconocido estaba dejando atrás a empresas increíbles. Por eso, decidimos hacer de la IA una herramienta simple y confiable, para que cualquier negocio pueda evolucionar, competir y superar incluso a los más grandes."
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                    className="text-white font-semibold"
                  >
                    - Alejandro Almada, Fundador
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beneficios Únicos Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Beneficios <span className="text-green-500">Únicos</span>
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Por qué elegir ALENIA marca la diferencia para su empresa
              </p>

              <ul className="space-y-4">
                {/* Costo Cero de Entrada */}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-lg p-6 border border-white/10"
                >
                  <div className="text-2xl flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center">
                    💰
                  </div>
                  <div className="text-white">
                    <strong>Costo Cero de Entrada:</strong> Sistema de gestión profesional completamente gratuito, sin trucos ni limitaciones ocultas.
                  </div>
                </motion.li>

                {/* Implementación Inmediata */}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-lg p-6 border border-white/10"
                >
                  <div className="text-2xl flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center">
                    ⚡
                  </div>
                  <div className="text-white">
                    <strong>Implementación Inmediata:</strong> Funcionando en minutos, no en meses. Configuración visual intuitiva sin código requerido.
                  </div>
                </motion.li>

                {/* Resultados Medibles */}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-lg p-6 border border-white/10"
                >
                  <div className="text-2xl flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center">
                    🎯
                  </div>
                  <div className="text-white">
                    <strong>Resultados Medibles:</strong> ROI visible desde la primera semana con métricas claras y reportes automáticos.
                  </div>
                </motion.li>

                {/* Soporte Real */}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-lg p-6 border border-white/10"
                >
                  <div className="text-2xl flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center">
                    🛠️
                  </div>
                  <div className="text-white">
                    <strong>Soporte Real:</strong> Acompañamiento personalizado incluido con equipo en Argentina y respuesta inmediata.
                  </div>
                </motion.li>

                {/* Escalabilidad Garantizada */}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-lg p-6 border border-white/10"
                >
                  <div className="text-2xl flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center">
                    📈
                  </div>
                  <div className="text-white">
                    <strong>Escalabilidad Garantizada:</strong> La plataforma crece con su negocio, adaptándose a sus necesidades futuras.
                  </div>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ¿Es momento de evolucionar? Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ¿Es momento de que tu empresa <span className="text-green-500">evolucione</span>?
                </h2>
                <p className="text-lg text-white">
                  Si reconoces alguna de estas situaciones en tu día a día, estás a un paso de transformar tu negocio. Responde con honestidad:
                </p>
              </motion.div>

              {/* Preguntas de Diagnóstico */}
              <div className="space-y-6 mb-10">
                {[
                  {
                    question: "¿Sientes que tu equipo invierte demasiado tiempo en tareas repetitivas?",
                    answer: "El trabajo manual frena el talento. La IA puede liberar a tu equipo para que se enfoque en crecer."
                  },
                  {
                    question: "¿Pierdes oportunidades de venta por falta de un seguimiento rápido?",
                    answer: "Cada cliente potencial es valioso. Un sistema inteligente asegura que ninguno se escape."
                  },
                  {
                    question: "¿Tomas decisiones importantes basándote más en la intuición que en datos claros?",
                    answer: "La intuición es poderosa, pero los datos precisos te dan la certeza para acertar."
                  },
                  {
                    question: "¿Crees que la tecnología avanzada es demasiado compleja o costosa para tu negocio?",
                    answer: "Ese es el mito que vinimos a romper. La IA ya no es un lujo para gigantes."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-purple-900/20 rounded-lg p-6 border-l-4 border-purple-300"
                  >
                    <h3 className="text-lg font-bold text-purple-300 mb-3">
                      {item.question}
                    </h3>
                    <p className="text-white">
                      {item.answer}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <p className="text-lg text-white italic">
                  Si respondiste "sí" a alguna de estas preguntas, no estás solo. Son los desafíos que enfrentan miles de empresas antes de dar el salto.
                </p>
              </motion.div>

              {/* Por qué ALENIA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-green-500 mb-4">
                  Por qué ALENIA es tu mejor socio en esa transformación
                </h3>
                <p className="text-lg text-white mb-8">
                  No solo te damos un software. Te entregamos un plan completo para que la inteligencia artificial trabaje para ti.
                </p>
              </motion.div>

              {/* Beneficios */}
              <div className="space-y-8">
                {[
                  {
                    title: "Hacemos lo complejo, simple",
                    description: "Traducimos el poder de la tecnología en herramientas intuitivas que tu equipo realmente querrá usar. No necesitas ser un experto para tener resultados de experto.",
                    icon: "⚡"
                  },
                  {
                    title: "Somos tu socio, no un simple proveedor",
                    description: "Nuestro éxito se mide por el tuyo. Por eso, nuestro mayor compromiso es capacitar a tu gente hasta que dominen la nueva solución y le saquen el máximo provecho.",
                    icon: "🤝"
                  },
                  {
                    title: "Creamos soluciones a tu medida",
                    description: "No creemos en planes genéricos. Analizamos tu operación y diseñamos una solución que ataque tus desafíos específicos, asegurando un impacto real.",
                    icon: "🎯"
                  },
                  {
                    title: "Te damos resultados que puedes ver",
                    description: "Nos obsesionan los datos y la transparencia. Recibirás reportes claros y automáticos para que veas, con números, cómo tu inversión se traduce en crecimiento.",
                    icon: "📊"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + (index * 0.2) }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 bg-gradient-to-r from-purple-900/30 to-green-900/30 rounded-lg p-6"
                  >
                    <div className="text-2xl flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-purple-300 mb-3">
                        {benefit.title}
                      </h4>
                      <p className="text-white">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Lo que obtienes con ALENIA
              </h2>
              <p className="text-white text-lg mb-8">
                Transformamos negocios tradicionales en empresas digitales eficientes. Sin complejidad técnica. Sin costos prohibitivos. Con resultados medibles desde el día uno.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white">
                    <strong>Tecnología simple:</strong> Convertimos la IA avanzada en herramientas que cualquiera puede usar.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white">
                    <strong>Acceso gratuito:</strong> Empiezas con un sistema profesional completo, sin inversión inicial.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white">
                    <strong>Resultados inmediatos:</strong> Funcionando en minutos, no en meses.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white">
                    <strong>Soporte Real:</strong> Te acompañamos personalmente en cada paso.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white">
                    <strong>Resultados Medibles:</strong> Ves el impacto positivo en tu negocio desde la primera semana.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Comience su Transformación Digital Hoy
              </h2>
              <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
                Descubra cómo podemos ayudar a su negocio a crecer. Agende una consultoría gratuita y reciba un plan de acción personalizado.
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-purple-500 to-green-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
                >
                  Agendar Consultoría
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
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