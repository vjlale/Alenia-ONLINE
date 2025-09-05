import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import emailJSService from '../services/emailJSService';

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

const FaqItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-600 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <span className="font-semibold text-white">{faq.question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform ${isOpen ? '' : ''}`} />
                </motion.div>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? '1rem' : '0' }}
                className="overflow-hidden"
            >
                <p className="text-gray-400">{faq.answer}</p>
            </motion.div>
        </div>
    );
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showMap, setShowMap] = useState(false);

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
        setFormData({ name: '', email: '', message: '' });
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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-btn">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Hablemos de tu Proyecto
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Estamos listos para ayudarte a transformar tu empresa con tecnología e inteligencia artificial.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Columna Izquierda: Formulario */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-3">
              <div className="bg-brand-primary rounded-2xl p-8 border border-brand box-shadow-card glow-btn">
                <h2 className="text-3xl font-bold text-white mb-6">Envíanos un Mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nombre *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 rounded-xl bg-slate-700 border border-gray-600 text-white focus:border-cyan-400 focus:outline-none transition-colors" placeholder="Tu nombre completo" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-3 rounded-xl bg-slate-700 border border-gray-600 text-white focus:border-cyan-400 focus:outline-none transition-colors" placeholder="tu@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Mensaje *</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} required rows="5" className="w-full p-3 rounded-xl bg-slate-700 border border-gray-600 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none" placeholder="Cuéntanos sobre tu idea o proyecto..."></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className={`w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-white ${isSubmitting ? 'bg-slate-600 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-500/20'}`}>
                    {isSubmitting ? 'Enviando...' : <><Send className="w-5 h-5" /> Enviar Mensaje</>}
                  </button>
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" /> ¡Mensaje enviado! Te contactaremos pronto.
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center gap-2">
                      <X className="w-5 h-5" /> Error al enviar. Inténtalo de nuevo.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Columna Derecha: Info & FAQ */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-2 space-y-8">
              <div className="bg-brand-primary rounded-2xl p-8 border border-brand box-shadow-card glow-btn">
                <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a key={index} href={info.action || '#'} target={info.action?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="p-3 bg-slate-700/50 text-cyan-400 rounded-xl transition-colors duration-300 group-hover:bg-cyan-500/20">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{info.title}</h4>
                        <p className="text-slate-400 transition-colors duration-300 group-hover:text-cyan-300">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="bg-brand-primary rounded-2xl p-8 border border-brand box-shadow-card glow-btn">
                <h3 className="text-2xl font-bold text-white mb-4">Preguntas Frecuentes</h3>
                <div>
                    {faqs.map((faq, i) => <FaqItem key={i} faq={faq} />)}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mapa */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-16">
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
          </motion.div>

        </div>
      </main>
    </>
  );
}