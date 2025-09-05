import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target, Users, TrendingUp, ArrowRight } from 'lucide-react';

const MarketingDigitalForm = ({ onSubmit, nivel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    industria: '',
    objetivoPrincipal: '',
    presupuestoMensual: '',
    experienciaMarketing: '',
    plataformasActuales: [],
    metricasImportantes: [],
    audienciaObjetivo: '',
    competenciaPrincipal: '',
    ventajaCompetitiva: '',
    problemaActual: '',
    resultadoEsperado: ''
  });

  const [errors, setErrors] = useState({});

  const industrias = [
    { value: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { value: 'servicios-profesionales', label: 'Servicios Profesionales', icon: '💼' },
    { value: 'salud-bienestar', label: 'Salud y Bienestar', icon: '🏥' },
    { value: 'educacion', label: 'Educación', icon: '📚' },
    { value: 'inmobiliaria', label: 'Bienes Raíces', icon: '🏠' },
    { value: 'tecnologia', label: 'Tecnología', icon: '💻' },
    { value: 'restaurante', label: 'Restaurante/Comida', icon: '🍽️' },
    { value: 'otro', label: 'Otro', icon: '📊' }
  ];

  const objetivosMarketing = [
    { value: 'aumentar-ventas', label: 'Aumentar Ventas', descripcion: 'Generar más ingresos directos' },
    { value: 'generar-leads', label: 'Generar Leads', descripcion: 'Conseguir prospectos calificados' },
    { value: 'brand-awareness', label: 'Reconocimiento de Marca', descripcion: 'Aumentar visibilidad' },
    { value: 'retener-clientes', label: 'Retener Clientes', descripcion: 'Mejorar lealtad y LTV' },
    { value: 'lanzar-producto', label: 'Lanzar Producto', descripcion: 'Promocionar nuevo producto/servicio' },
    { value: 'competir-mejor', label: 'Competir Mejor', descripcion: 'Superar a la competencia' }
  ];

  const presupuestosMensuales = [
    { value: '500-1000', label: '$500 - $1,000', descripcion: 'Pequeño negocio' },
    { value: '1000-3000', label: '$1,000 - $3,000', descripcion: 'Empresa en crecimiento' },
    { value: '3000-8000', label: '$3,000 - $8,000', descripcion: 'Empresa establecida' },
    { value: '8000+', label: '$8,000+', descripcion: 'Empresa grande' },
    { value: 'consultar', label: 'A consultar', descripcion: 'Necesito asesoría' }
  ];

  const nivelesExperiencia = [
    { value: 'principiante', label: 'Principiante', descripcion: 'Poco o nada de experiencia' },
    { value: 'basico', label: 'Básico', descripcion: 'Algunas campañas realizadas' },
    { value: 'intermedio', label: 'Intermedio', descripcion: 'Experiencia regular' },
    { value: 'avanzado', label: 'Avanzado', descripcion: 'Muy experimentado' }
  ];

  const plataformasDisponibles = [
    'Google Ads',
    'Facebook Ads',
    'Instagram Ads',
    'LinkedIn Ads',
    'YouTube Ads',
    'TikTok Ads',
    'Email Marketing',
    'WhatsApp Business',
    'SEO/SEM',
    'Content Marketing',
    'Influencer Marketing',
    'Remarketing'
  ];

  const metricasRelevantes = [
    'ROI (Retorno de Inversión)',
    'Costo por Adquisición (CAC)',
    'Lifetime Value (LTV)',
    'Conversiones/Ventas',
    'Leads Calificados',
    'Tráfico Web',
    'Engagement Rate',
    'Brand Awareness',
    'Market Share',
    'Customer Retention'
  ];

  const problemasComunes = [
    'No genero suficientes leads',
    'Los anuncios no convierten',
    'El CAC es muy alto',
    'No sé en qué plataforma invertir',
    'No tengo tiempo para gestionar campañas',
    'Los resultados son inconsistentes',
    'La competencia me supera',
    'No sé medir el ROI correctamente'
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
    if (!formData.industria) newErrors.industria = 'Selecciona tu industria';
    if (!formData.objetivoPrincipal) newErrors.objetivoPrincipal = 'Selecciona tu objetivo principal';
    if (!formData.problemaActual) newErrors.problemaActual = 'Selecciona tu problema actual';
    if (!formData.resultadoEsperado.trim()) newErrors.resultadoEsperado = 'Describe el resultado esperado';
    
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.nombre ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors`}
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.email ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors`}
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.telefono ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors`}
            placeholder="+1 123 456 7890"
          />
          {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Empresa/Marca
          </label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
            placeholder="Nombre de tu empresa o marca"
          />
        </div>
      </div>

      {/* Industria */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿En qué industria trabajas? *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {industrias.map((industria) => (
            <motion.label
              key={industria.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all text-center ${
                formData.industria === industria.value
                  ? 'border-purple-400 bg-purple-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="industria"
                value={industria.value}
                checked={formData.industria === industria.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="text-2xl mb-2">{industria.icon}</div>
              <p className="text-white text-sm font-medium">{industria.label}</p>
            </motion.label>
          ))}
        </div>
        {errors.industria && <p className="text-red-400 text-xs mt-1">{errors.industria}</p>}
      </div>

      {/* Objetivo Principal */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu objetivo principal de marketing? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {objetivosMarketing.map((objetivo) => (
            <motion.label
              key={objetivo.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                formData.objetivoPrincipal === objetivo.value
                  ? 'border-purple-400 bg-purple-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="objetivoPrincipal"
                value={objetivo.value}
                checked={formData.objetivoPrincipal === objetivo.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">{objetivo.label}</h4>
                  <p className="text-gray-400 text-sm">{objetivo.descripcion}</p>
                </div>
              </div>
            </motion.label>
          ))}
        </div>
        {errors.objetivoPrincipal && <p className="text-red-400 text-xs mt-1">{errors.objetivoPrincipal}</p>}
      </div>

      {/* Presupuesto Mensual */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu presupuesto mensual para marketing?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {presupuestosMensuales.map((presupuesto) => (
            <motion.label
              key={presupuesto.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                formData.presupuestoMensual === presupuesto.value
                  ? 'border-purple-400 bg-purple-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="presupuestoMensual"
                value={presupuesto.value}
                checked={formData.presupuestoMensual === presupuesto.value}
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

      {/* Experiencia en Marketing */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu nivel de experiencia en marketing digital?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {nivelesExperiencia.map((nivel) => (
            <motion.label
              key={nivel.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all text-center ${
                formData.experienciaMarketing === nivel.value
                  ? 'border-purple-400 bg-purple-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="experienciaMarketing"
                value={nivel.value}
                checked={formData.experienciaMarketing === nivel.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <BarChart3 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-white text-sm font-semibold">{nivel.label}</p>
              <p className="text-gray-400 text-xs">{nivel.descripcion}</p>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Plataformas Actuales */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué plataformas de marketing usas actualmente?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {plataformasDisponibles.map((plataforma) => (
            <motion.label
              key={plataforma}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all text-center text-sm ${
                formData.plataformasActuales.includes(plataforma)
                  ? 'border-purple-400 bg-purple-400/10 text-purple-300'
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

      {/* Métricas Importantes */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué métricas son más importantes para ti?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {metricasRelevantes.map((metrica) => (
            <motion.label
              key={metrica}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all text-center text-sm ${
                formData.metricasImportantes.includes(metrica)
                  ? 'border-purple-400 bg-purple-400/10 text-purple-300'
                  : 'border-gray-600 hover:border-gray-500 text-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.metricasImportantes.includes(metrica)}
                onChange={() => handleMultiSelect('metricasImportantes', metrica)}
                className="sr-only"
              />
              {metrica}
            </motion.label>
          ))}
        </div>
      </div>

      {/* Problema Actual */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu principal problema con el marketing actual? *
        </label>
        <div className="space-y-2">
          {problemasComunes.map((problema) => (
            <motion.label
              key={problema}
              whileHover={{ scale: 1.01 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all flex items-center gap-3 ${
                formData.problemaActual === problema
                  ? 'border-purple-400 bg-purple-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="problemaActual"
                value={problema}
                checked={formData.problemaActual === problema}
                onChange={handleInputChange}
                className="sr-only"
              />
              <TrendingUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span className="text-gray-300">{problema}</span>
            </motion.label>
          ))}
        </div>
        {errors.problemaActual && <p className="text-red-400 text-xs mt-1">{errors.problemaActual}</p>}
      </div>

      {/* Información Adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Audiencia objetivo
          </label>
          <input
            type="text"
            name="audienciaObjetivo"
            value={formData.audienciaObjetivo}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
            placeholder="ej: Hombres 25-45, profesionales urbanos"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Principal competencia
          </label>
          <input
            type="text"
            name="competenciaPrincipal"
            value={formData.competenciaPrincipal}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
            placeholder="¿Quién es tu principal competidor?"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ¿Cuál es tu ventaja competitiva?
        </label>
        <input
          type="text"
          name="ventajaCompetitiva"
          value={formData.ventajaCompetitiva}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
          placeholder="¿Qué te diferencia de la competencia?"
        />
      </div>

      {/* Resultado Esperado */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ¿Qué resultado específico esperas lograr? *
        </label>
        <textarea
          name="resultadoEsperado"
          value={formData.resultadoEsperado}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-4 py-3 bg-slate-800 border ${errors.resultadoEsperado ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none`}
          placeholder="Ej: Aumentar ventas 30% en 3 meses, generar 50 leads calificados por mes, reducir CAC a $20..."
        />
        {errors.resultadoEsperado && <p className="text-red-400 text-xs mt-1">{errors.resultadoEsperado}</p>}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
      >
        Solicitar Estrategia de Marketing
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <p className="text-center text-gray-400 text-sm">
        📈 Resultados medibles garantizados • Auditoría gratuita incluida
      </p>
    </form>
  );
};

export default MarketingDigitalForm;
