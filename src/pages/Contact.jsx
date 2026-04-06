import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ChevronDown, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import emailJSService from '../services/emailJSService';
import ScrollReveal from '../components/common/ScrollReveal';
import AnimatedGradient from '../components/common/AnimatedGradient';

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email',
    value: 'alenia.online@gmail.com',
    action: 'mailto:alenia.online@gmail.com'
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'WhatsApp',
    value: '+54 9 11 1234-5678',
    action: 'https://wa.me/5491112345678'
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Ubicación',
    value: 'Córdoba, Argentina',
    action: null
  },
];

const faqs = [
    {
        question: '¿Cuál es el primer paso para trabajar con Alen.ia?',
        answer: 'El primer paso es completar nuestro formulario de contacto o agendar una videollamada gratuita. Nos pondremos en contacto contigo en menos de 24 horas para entender tus necesidades y proponerte una solución a medida.'
    },
    {
        question: '¿En cuánto tiempo veré resultados?',
        answer: 'El tiempo para ver resultados varía según el servicio. Para campañas de marketing, los resultados pueden ser visibles en pocas semanas. Para proyectos de desarrollo, los plazos se definen en la propuesta inicial. Siempre nos enfocamos en entregar valor lo más rápido posible.'
    },
    {
        question: '¿Ofrecen soporte después de implementar una solución?',
        answer: 'Sí. Todas nuestras soluciones incluyen un período de soporte para garantizar que todo funcione a la perfección. También ofrecemos planes de mantenimiento y soporte continuo para asegurar el éxito a largo plazo de tu proyecto.'
    },
    {
        question: '¿Con qué tipo de empresas trabajan?',
        answer: 'Trabajamos con una amplia variedad de clientes, desde startups y pymes hasta grandes empresas. Nuestra metodología se adapta a las necesidades y presupuesto de cada negocio, sin importar su tamaño.'
    }
];

const FaqItem = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-gray-600/50 py-4 group"
        >
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left focus-ring"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
            >
                <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{faq.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                >
                    <ChevronDown className="w-5 h-5 text-cyan-400" />
                </motion.div>
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-400 pt-4 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Formatear datos para EmailJS (template general)
      const emailData = {
        nombre: formData.name,
        email: formData.email,
        telefono: 'No especificado',
        empresa: 'No especificada',
        descripcion: formData.message,
        servicio_nombre: 'Contacto General',
        categoria: 'contacto-general'
      };

      const result = await emailJSService.sendServiceForm(emailData, { categoria: 'contacto-general' });
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setCurrentStep(1);
        console.log('✅ Email de contacto enviado exitosamente');
      } else {
        setSubmitStatus('error');
        console.error('❌ Error enviando email de contacto:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('❌ Error en envío de contacto:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.name && formData.email;
    if (currentStep === 2) return formData.phone || formData.company;
    return formData.message;
  };

  return (
    <>
      <Helmet>
        <title>Contacto - Hablemos de tu Proyecto | Alen.ia</title>
  <meta name="description" content="Contacta con Alen.ia para transformar tu negocio con soluciones de software, automatización e inteligencia artificial. Estamos en Córdoba, Argentina." />
  <link rel="canonical" href="https://alenia.online/contacto" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://alenia.online/contacto" />
  <meta property="og:title" content="Contacto - Hablemos de tu Proyecto | Alen.ia" />
  <meta property="og:description" content="Contacta con Alen.ia para transformar tu negocio con soluciones de software, automatización e inteligencia artificial." />
  <meta property="og:image" content="https://alenia.online/images/Alenia1.png" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://alenia.online/contacto" />
  <meta property="twitter:title" content="Contacto - Hablemos de tu Proyecto | Alen.ia" />
  <meta property="twitter:description" content="Contacta con Alen.ia para transformar tu negocio con soluciones de software, automatización e inteligencia artificial." />
  <meta property="twitter:image" content="https://alenia.online/images/Alenia1.png" />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-alenia-dark to-slate-900 bg-brand-primary py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6">
                <AnimatedGradient className="bg-clip-text text-transparent">
                  Hablemos de tu Proyecto
                </AnimatedGradient>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Estamos listos para ayudarte a transformar tu empresa con tecnología e inteligencia artificial.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Columna Izquierda: Formulario Multi-step */}
            <ScrollReveal direction="left" delay={0.3} className="lg:col-span-3">
              <div className="glass-advanced rounded-2xl p-8 border border-alenia-primary/30 box-shadow-card-hover">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Paso {currentStep} de {totalSteps}</span>
                    <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-6">Envíanos un Mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Información Básica */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full p-4 rounded-xl bg-slate-700/50 border border-gray-600 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 input-focus-effect transition-all duration-300 peer"
                              placeholder=" "
                              aria-required="true"
                            />
                            <label htmlFor="name" className="absolute left-4 top-4 text-gray-400 transition-all duration-300 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-cyan-400 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-cyan-400 bg-slate-700/50 px-2">
                              Nombre *
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full p-4 rounded-xl bg-slate-700/50 border border-gray-600 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 input-focus-effect transition-all duration-300 peer"
                              placeholder=" "
                              aria-required="true"
                              autoComplete="email"
                            />
                            <label htmlFor="email" className="absolute left-4 top-4 text-gray-400 transition-all duration-300 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-cyan-400 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-cyan-400 bg-slate-700/50 px-2">
                              Email *
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Información Adicional */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                        role="tabpanel"
                        aria-labelledby="step-2"
                        id="step-2-panel"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="relative">
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full p-4 rounded-xl bg-slate-700/50 border border-gray-600 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 input-focus-effect transition-all duration-300 peer"
                              placeholder=" "
                              autoComplete="tel"
                            />
                            <label htmlFor="phone" className="absolute left-4 top-4 text-gray-400 transition-all duration-300 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-cyan-400 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-cyan-400 bg-slate-700/50 px-2">
                              Teléfono
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full p-4 rounded-xl bg-slate-700/50 border border-gray-600 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 input-focus-effect transition-all duration-300 peer"
                              placeholder=" "
                              autoComplete="organization"
                            />
                            <label htmlFor="company" className="absolute left-4 top-4 text-gray-400 transition-all duration-300 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-cyan-400 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-cyan-400 bg-slate-700/50 px-2">
                              Empresa
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Mensaje */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                        role="tabpanel"
                        aria-labelledby="step-3"
                        id="step-3-panel"
                      >
                        <div className="relative">
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows="6"
                            className="w-full p-4 rounded-xl bg-slate-700/50 border border-gray-600 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 input-focus-effect transition-all duration-300 resize-none peer"
                            placeholder=" "
                            aria-required="true"
                          />
                          <label htmlFor="message" className="absolute left-4 top-4 text-gray-400 transition-all duration-300 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-cyan-400 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-cyan-400 bg-slate-700/50 px-2">
                            Mensaje *
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between gap-4" role="group" aria-label="Navegación del formulario">
                    {currentStep > 1 && (
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700/50 text-white hover:bg-slate-600 transition-colors focus-ring"
                        aria-label={`Ir al paso ${currentStep - 1}`}
                      >
                        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                        Anterior
                      </motion.button>
                    )}
                    <div className="flex-1" aria-hidden="true" />
                    {currentStep < totalSteps ? (
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        disabled={!canProceed()}
                        whileHover={{ scale: canProceed() ? 1.05 : 1 }}
                        whileTap={{ scale: canProceed() ? 0.95 : 1 }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all focus-ring ${
                          canProceed()
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white glow-btn'
                            : 'bg-slate-600 text-gray-400 cursor-not-allowed'
                        }`}
                        aria-label={`Ir al paso ${currentStep + 1}`}
                        aria-disabled={!canProceed()}
                      >
                        Siguiente
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !canProceed()}
                        whileHover={{ scale: !isSubmitting && canProceed() ? 1.05 : 1 }}
                        whileTap={{ scale: !isSubmitting && canProceed() ? 0.95 : 1 }}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all focus-ring ${
                          isSubmitting || !canProceed()
                            ? 'bg-slate-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white glow-btn'
                        }`}
                        aria-label={isSubmitting ? 'Enviando formulario' : 'Enviar mensaje'}
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="loading-spinner w-5 h-5 border-2 border-current border-t-transparent rounded-full" aria-hidden="true" />
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" aria-hidden="true" />
                            <span>Enviar Mensaje</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2 success-feedback"
                        role="alert"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          aria-hidden="true"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </motion.div>
                        <span>¡Mensaje enviado! Te contactaremos pronto.</span>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center gap-2 error-feedback"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                      >
                        <X className="w-5 h-5" aria-hidden="true" />
                        <span>Error al enviar. Inténtalo de nuevo.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </ScrollReveal>

            {/* Columna Derecha: Info & FAQ */}
            <ScrollReveal direction="right" delay={0.4} className="lg:col-span-2 space-y-8">
              <div className="glass-advanced rounded-2xl p-8 border border-alenia-primary/30 box-shadow-card-hover">
                <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.action || '#'}
                      target={info.action?.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      whileHover={{ x: 4, scale: 1.02 }}
                      className="flex items-center gap-4 group glass-card-hover rounded-xl p-4 border border-white/10"
                    >
                      <motion.div
                        className="p-3 bg-slate-700/50 text-cyan-400 rounded-xl transition-colors duration-300 group-hover:bg-cyan-500/20"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {info.icon}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{info.title}</h4>
                        <p className="text-slate-400 transition-colors duration-300 group-hover:text-cyan-300">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="glass-advanced rounded-2xl p-8 border border-alenia-primary/30 box-shadow-card-hover">
                <h3 className="text-2xl font-bold text-white mb-4">Preguntas Frecuentes</h3>
                <div>
                    {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Mapa */}
          <ScrollReveal direction="up" delay={0.6} className="mt-16">
             <div className="aspect-w-16 aspect-h-9 bg-brand-primary rounded-2xl overflow-hidden border border-brand box-shadow-card glow-btn">
                {!showMap ? (
                  <button onClick={() => setShowMap(true)} className="w-full h-full flex items-center justify-center text-white bg-slate-800 hover:bg-slate-700 transition-colors">
                    <MapPin className="w-6 h-6 mr-2" /> Cargar mapa
                  </button>
                ) : (
                  <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108975.55248020249!2d-64.26438424335937!3d-31.39944999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432985f4d8f29c7%3A0x78d627e449d039a8!2sC%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1678886842373!5m2!1ses-419!2sar" 
                      width="100%" 
                      height="100%" 
                      style={{ border:0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                )}
             </div>
          </ScrollReveal>

        </div>
      </main>
    </>
  );
}