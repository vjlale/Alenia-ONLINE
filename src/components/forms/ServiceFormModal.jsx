import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Star, Check, ArrowRight } from 'lucide-react';

// Formularios específicos por servicio
import DesarrolloWebForm from './specific/DesarrolloWebForm';
import AutomatizacionForm from './specific/AutomatizacionForm';
import MarketingDigitalForm from './specific/MarketingDigitalForm';
import ConsultoriaIAForm from './specific/ConsultoriaIAForm';
import AnalyticsForm from './specific/AnalyticsForm';

// Servicio de EmailJS
import emailJSService from '../../services/emailJSService';

const ServiceFormModal = ({ isOpen, onClose, servicio, nivel = null, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Datos del formulario con información del servicio
      const submissionData = {
        ...formData,
        servicio: servicio.nombre,
        categoria: servicio.categoria,
        nivel: nivel?.nombre || null,
        timestamp: new Date().toISOString()
      };
      
      // Enviar email con EmailJS
      console.log('📧 Enviando formulario via EmailJS...');
      const emailResult = await emailJSService.sendServiceForm(submissionData, servicio);
      
      if (emailResult.success) {
        console.log('✅ Email enviado exitosamente');
        setIsSubmitted(true);
        
        // Callback opcional
        if (onSubmit) onSubmit(submissionData);
        
        // Cerrar modal después de 3 segundos
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error(emailResult.error || 'Error enviando el formulario');
      }
      
    } catch (error) {
      console.error('❌ Error enviando formulario:', error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormComponent = () => {
    switch (servicio.categoria) {
      case 'desarrollo-web':
        return <DesarrolloWebForm onSubmit={handleSubmit} nivel={nivel} />;
      case 'automatizacion':
        return <AutomatizacionForm onSubmit={handleSubmit} nivel={nivel} />;
      case 'marketing-digital':
        return <MarketingDigitalForm onSubmit={handleSubmit} nivel={nivel} />;
      case 'consultoria-ia':
        return <ConsultoriaIAForm onSubmit={handleSubmit} nivel={nivel} />;
      case 'analytics':
        return <AnalyticsForm onSubmit={handleSubmit} nivel={nivel} />;
      default:
        return <DesarrolloWebForm onSubmit={handleSubmit} nivel={nivel} />;
    }
  };

  const getServiceColor = () => {
    const colorMap = {
      'blue': 'from-cyan-400 to-cyan-500',
      'green': 'from-green-400 to-green-500',
      'purple': 'from-purple-400 to-purple-500',
      'orange': 'from-orange-400 to-orange-500',
      'indigo': 'from-indigo-400 to-indigo-500'
    };
    return colorMap[servicio.color] || 'from-cyan-400 to-cyan-500';
  };

  const getBorderColor = () => {
    const colorMap = {
      'blue': 'border-cyan-400',
      'green': 'border-green-400',
      'purple': 'border-purple-400',
      'orange': 'border-orange-400',
      'indigo': 'border-indigo-400'
    };
    return colorMap[servicio.color] || 'border-cyan-400';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`bg-slate-900 rounded-2xl border-2 ${getBorderColor()} max-w-2xl w-full max-h-[90vh] overflow-hidden relative`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${getServiceColor()} p-6 text-black relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center">
                <servicio.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {servicio.nombre}
                </h2>
                {nivel && (
                  <p className="text-black/80 font-semibold">
                    Plan {nivel.nombre} - {nivel.precio}
                  </p>
                )}
              </div>
            </div>
            
            {nivel && (
              <div className="mt-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-300 fill-current" />
                <span className="text-black/80 text-sm">
                  {nivel.objetivo}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${getServiceColor()} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  ¡Solicitud Enviada!
                </h3>
                <p className="text-gray-300 mb-4">
                  Hemos recibido tu información. Nos pondremos en contacto contigo en las próximas 4 horas.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Consulta gratuita de 15 min incluida</span>
                </div>
              </motion.div>
            ) : submitError ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Error al enviar
                </h3>
                <p className="text-gray-300 mb-4">
                  {submitError}
                </p>
                <button
                  onClick={() => setSubmitError(null)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Intentar de nuevo
                </button>
              </motion.div>
            ) : (
              <>
                {/* Información del nivel si está seleccionado */}
                {nivel && (
                  <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-gray-700">
                    <h3 className="text-white font-semibold mb-2">Plan Seleccionado:</h3>
                    <p className="text-gray-300 text-sm mb-3">{nivel.descripcion}</p>
                    <div className="flex flex-wrap gap-2">
                      {nivel.beneficios?.slice(0, 3).map((beneficio, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-md"
                        >
                          {beneficio}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formulario específico */}
                {getFormComponent()}
                
                {/* Loading overlay */}
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin mx-auto mb-4`}></div>
                      <p className="text-white font-semibold">Enviando solicitud...</p>
                      <p className="text-gray-400 text-sm">Esto tomará solo unos segundos</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceFormModal;
