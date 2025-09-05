import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, MessageSquare, Clock, Target, Users, ArrowRight } from 'lucide-react';

const AutomatizacionForm = ({ onSubmit, nivel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    tipoNegocio: '',
    problemaPrincipal: '',
    procesosAutomatizar: [],
    volumenMensual: '',
    plataformasActuales: [],
    nivelUrgencia: 'medio',
    tiempoAhorroEsperado: '',
    presupuesto: '',
    experienciaAutomatizacion: '',
    descripcionSituacion: ''
  });

  const [errors, setErrors] = useState({});

  const tiposNegocio = [
    { value: 'servicios-profesionales', label: 'Servicios Profesionales', icon: '🏢' },
    { value: 'retail', label: 'Retail/Comercio', icon: '🛍️' },
    { value: 'restaurante', label: 'Restaurante/Comida', icon: '🍽️' },
    { value: 'salud-belleza', label: 'Salud y Belleza', icon: '💅' },
    { value: 'educacion', label: 'Educación/Coaching', icon: '📚' },
    { value: 'inmobiliaria', label: 'Bienes Raíces', icon: '🏠' },
    { value: 'consultoria', label: 'Consultoría', icon: '💼' },
    { value: 'otro', label: 'Otro', icon: '📝' }
  ];

  const problemasComunes = [
    'Responder mensajes repetitivos en WhatsApp',
    'Seguimiento manual de clientes potenciales',
    'Agendar citas manualmente',
    'Envío manual de recordatorios',
    'Clasificar y responder emails',
    'Generar reportes manualmente',
    'Actualizar bases de datos',
    'Procesar pedidos repetitivos'
  ];

  const procesosAutomatizables = [
    { value: 'whatsapp-bot', label: 'Chatbot para WhatsApp', descripcion: 'Respuestas automáticas 24/7' },
    { value: 'email-seguimiento', label: 'Email Marketing', descripcion: 'Secuencias automáticas' },
    { value: 'agenda-citas', label: 'Agendamiento', descripcion: 'Reservas automáticas' },
    { value: 'crm-automatico', label: 'CRM Inteligente', descripcion: 'Gestión de contactos' },
    { value: 'inventario', label: 'Control de Inventario', descripcion: 'Alertas automáticas' },
    { value: 'facturacion', label: 'Facturación', descripcion: 'Cobros automáticos' },
    { value: 'reportes', label: 'Reportes', descripcion: 'Análisis automático' },
    { value: 'redes-sociales', label: 'Redes Sociales', descripción: 'Publicación automática' }
  ];

  const volumenesOperacion = [
    { value: '1-50', label: '1-50 por mes', descripcion: 'Pequeño negocio' },
    { value: '51-200', label: '51-200 por mes', descripcion: 'Negocio en crecimiento' },
    { value: '201-500', label: '201-500 por mes', descripcion: 'Empresa mediana' },
    { value: '500+', label: '500+ por mes', descripcion: 'Empresa grande' }
  ];

  const plataformasDisponnibles = [
    'WhatsApp Business',
    'Instagram',
    'Facebook Messenger',
    'Email/Gmail',
    'Google Sheets',
    'WordPress',
    'Shopify',
    'Calendly',
    'Zoom',
    'Slack',
    'Zapier',
    'Otras'
  ];

  const presupuestos = [
    { value: '199-399', label: '$199 - $399', descripcion: 'Automatización básica' },
    { value: '400-799', label: '$400 - $799', descripcion: 'Automatización completa' },
    { value: '800-1499', label: '$800 - $1,499', descripcion: 'Sistema avanzado' },
    { value: '1500+', label: '$1,500+', descripcion: 'Empresa/Múltiples procesos' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.tipoNegocio) newErrors.tipoNegocio = 'Selecciona tu tipo de negocio';
    if (!formData.problemaPrincipal) newErrors.problemaPrincipal = 'Selecciona tu problema principal';
    if (formData.procesosAutomatizar.length === 0) newErrors.procesosAutomatizar = 'Selecciona al menos un proceso';
    if (!formData.descripcionSituacion.trim()) newErrors.descripcionSituacion = 'Describe tu situación actual';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información Personal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.nombre ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors`}
            placeholder="Tu nombre completo"
          />
          {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.email ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors`}
            placeholder="tu@email.com"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            WhatsApp *
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.telefono ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors`}
            placeholder="+1 123 456 7890"
          />
          {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Empresa/Negocio
          </label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
            placeholder="Nombre de tu empresa"
          />
        </div>
      </div>

      {/* Tipo de Negocio */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué tipo de negocio tienes? *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiposNegocio.map((tipo) => (
            <motion.label
              key={tipo.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all text-center ${
                formData.tipoNegocio === tipo.value
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="tipoNegocio"
                value={tipo.value}
                checked={formData.tipoNegocio === tipo.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="text-2xl mb-2">{tipo.icon}</div>
              <p className="text-white text-sm font-medium">{tipo.label}</p>
            </motion.label>
          ))}
        </div>
        {errors.tipoNegocio && <p className="text-red-400 text-xs mt-1">{errors.tipoNegocio}</p>}
      </div>

      {/* Problema Principal */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu problema principal? *
        </label>
        <div className="space-y-2">
          {problemasComunes.map((problema) => (
            <motion.label
              key={problema}
              whileHover={{ scale: 1.01 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all flex items-center gap-3 ${
                formData.problemaPrincipal === problema
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="problemaPrincipal"
                value={problema}
                checked={formData.problemaPrincipal === problema}
                onChange={handleInputChange}
                className="sr-only"
              />
              <Target className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300">{problema}</span>
            </motion.label>
          ))}
        </div>
        {errors.problemaPrincipal && <p className="text-red-400 text-xs mt-1">{errors.problemaPrincipal}</p>}
      </div>

      {/* Procesos a Automatizar */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué procesos quieres automatizar? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {procesosAutomatizables.map((proceso) => (
            <motion.label
              key={proceso.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                formData.procesosAutomatizar.includes(proceso.value)
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.procesosAutomatizar.includes(proceso.value)}
                onChange={() => handleMultiSelect('procesosAutomatizar', proceso.value)}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">{proceso.label}</h4>
                  <p className="text-gray-400 text-sm">{proceso.descripcion}</p>
                </div>
              </div>
            </motion.label>
          ))}
        </div>
        {errors.procesosAutomatizar && <p className="text-red-400 text-xs mt-1">{errors.procesosAutomatizar}</p>}
      </div>

      {/* Volumen de Operación */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuántos clientes/contactos manejas por mes?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {volumenesOperacion.map((volumen) => (
            <motion.label
              key={volumen.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all text-center ${
                formData.volumenMensual === volumen.value
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="volumenMensual"
                value={volumen.value}
                checked={formData.volumenMensual === volumen.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-white text-sm font-semibold">{volumen.label}</p>
              <p className="text-gray-400 text-xs">{volumen.descripcion}</p>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Plataformas Actuales */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué plataformas usas actualmente?
        </label>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {plataformasDisponnibles.map((plataforma) => (
            <motion.label
              key={plataforma}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all text-center text-sm ${
                formData.plataformasActuales.includes(plataforma)
                  ? 'border-green-400 bg-green-400/10 text-green-300'
                  : 'border-gray-600 hover:border-gray-500 text-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.plataformasActuales.includes(plataforma)}
                onChange={() => handleMultiSelect('plataformasActuales', plataforma)}
                className="sr-only"
              />
              {plataforma}
            </motion.label>
          ))}
        </div>
      </div>

      {/* Presupuesto */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu presupuesto para automatización?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {presupuestos.map((presupuesto) => (
            <motion.label
              key={presupuesto.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                formData.presupuesto === presupuesto.value
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="presupuesto"
                value={presupuesto.value}
                checked={formData.presupuesto === presupuesto.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex items-center gap-3">
                <div className="text-2xl">💰</div>
                <div>
                  <h4 className="text-white font-semibold">{presupuesto.label}</h4>
                  <p className="text-gray-400 text-sm">{presupuesto.descripcion}</p>
                </div>
              </div>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Situación Actual */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Describe tu situación actual *
        </label>
        <textarea
          name="descripcionSituacion"
          value={formData.descripcionSituacion}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-4 py-3 bg-slate-800 border ${errors.descripcionSituacion ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors resize-none`}
          placeholder="Cuéntanos qué tareas repetitivas consumen más tiempo, qué problemas enfrentas con clientes, cuántas horas al día dedicas a tareas manuales..."
        />
        {errors.descripcionSituacion && <p className="text-red-400 text-xs mt-1">{errors.descripcionSituacion}</p>}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
      >
        Solicitar Automatización Personalizada
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <p className="text-center text-gray-400 text-sm">
        ⚡ Ahorra hasta 15 horas semanales • Consulta gratuita incluida
      </p>
    </form>
  );
};

export default AutomatizacionForm;
