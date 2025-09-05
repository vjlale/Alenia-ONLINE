import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Target, ArrowRight } from 'lucide-react';

const AnalyticsForm = ({ onSubmit, nivel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    cargo: '',
    industria: '',
    tamanoEmpresa: '',
    fuentesDatos: [],
    objetivoAnalytics: '',
    problemaActual: '',
    herramientasActuales: [],
    nivelMadurez: '',
    tipoReportes: [],
    frecuenciaReportes: '',
    stakeholdersObjetivo: [],
    presupuesto: '',
    urgencia: '',
    descripcionNecesidad: '',
    metricasClave: []
  });

  const [errors, setErrors] = useState({});

  const fuentesDatosDisponibles = [
    'Google Analytics',
    'Facebook/Meta Ads',
    'Google Ads',
    'CRM (Salesforce, HubSpot, etc.)',
    'Base de datos interna',
    'E-commerce (Shopify, WooCommerce)',
    'Email Marketing (Mailchimp, etc.)',
    'ERP (SAP, Oracle, etc.)',
    'Hojas de cálculo (Excel, Google Sheets)',
    'Redes sociales',
    'Sistemas de ventas (POS)',
    'Encuestas y formularios'
  ];

  const objetivosAnalytics = [
    { value: 'aumentar-ventas', label: 'Aumentar Ventas', descripcion: 'Identificar oportunidades de crecimiento' },
    { value: 'optimizar-marketing', label: 'Optimizar Marketing', descripcion: 'Mejorar ROI de campañas' },
    { value: 'reducir-costos', label: 'Reducir Costos', descripcion: 'Identificar ineficiencias' },
    { value: 'mejorar-experiencia', label: 'Mejorar Experiencia Cliente', descripcion: 'Insights sobre comportamiento' },
    { value: 'predicciones', label: 'Hacer Predicciones', descripcion: 'Forecasting y tendencias' },
    { value: 'operaciones', label: 'Optimizar Operaciones', descripcion: 'Eficiencia operacional' }
  ];

  const problemasComunes = [
    'Datos dispersos en múltiples plataformas',
    'Reportes manuales que toman mucho tiempo',
    'No sé qué métricas son importantes',
    'Datos inconsistentes o erróneos',
    'Falta de insights accionables',
    'No puedo predecir tendencias',
    'Decisiones basadas en intuición',
    'Reportes que nadie entiende'
  ];

  const herramientasAnalytics = [
    'Google Analytics',
    'Google Data Studio/Looker',
    'Power BI',
    'Tableau',
    'Excel/Google Sheets',
    'Google Tag Manager',
    'Hotjar/Crazy Egg',
    'Mixpanel',
    'Amplitude',
    'Segment',
    'Adobe Analytics',
    'Ninguna herramienta específica'
  ];

  const nivelesMadurez = [
    { value: 'principiante', label: 'Principiante', descripcion: 'Pocas métricas básicas', icon: '📊' },
    { value: 'basico', label: 'Básico', descripcion: 'Algunos reportes regulares', icon: '📈' },
    { value: 'intermedio', label: 'Intermedio', descripcion: 'Analytics implementado parcialmente', icon: '📉' },
    { value: 'avanzado', label: 'Avanzado', descripcion: 'Analytics maduro y automatizado', icon: '🎯' }
  ];

  const tiposReportes = [
    'Dashboard ejecutivo',
    'Reportes de marketing',
    'Análisis de ventas',
    'Métricas operacionales',
    'Comportamiento de usuarios',
    'Análisis financiero',
    'Reportes de producto',
    'Análisis de campañas',
    'Métricas de retención',
    'Análisis competitivo'
  ];

  const stakeholders = [
    'CEO/Dirección General',
    'CMO/Marketing',
    'CFO/Finanzas',
    'COO/Operaciones',
    'Gerentes de Ventas',
    'Analistas',
    'Producto/IT',
    'Recursos Humanos'
  ];

  const metricasClaveDisponibles = [
    'Revenue/Ingresos',
    'ROI/ROAS',
    'Customer Acquisition Cost (CAC)',
    'Lifetime Value (LTV)',
    'Conversion Rate',
    'Traffic/Tráfico web',
    'Engagement Rate',
    'Churn Rate',
    'Net Promoter Score (NPS)',
    'Cost per Lead (CPL)',
    'Average Order Value (AOV)',
    'Monthly Recurring Revenue (MRR)'
  ];

  const frecuenciasReportes = [
    { value: 'tiempo-real', label: 'Tiempo Real', descripcion: 'Dashboards en vivo' },
    { value: 'diario', label: 'Diario', descripcion: 'Reportes automáticos diarios' },
    { value: 'semanal', label: 'Semanal', descripcion: 'Resúmenes semanales' },
    { value: 'mensual', label: 'Mensual', descripcion: 'Reportes mensuales' },
    { value: 'ad-hoc', label: 'Ad-hoc', descripcion: 'Cuando sea necesario' }
  ];

  const presupuestos = [
    { value: '500-2000', label: '$500 - $2,000', descripcion: 'Setup básico' },
    { value: '2000-8000', label: '$2,000 - $8,000', descripcion: 'Implementación completa' },
    { value: '8000-20000', label: '$8,000 - $20,000', descripcion: 'Analytics avanzado' },
    { value: '20000+', label: '$20,000+', descripcion: 'Solución empresarial' },
    { value: 'consultar', label: 'A consultar', descripcion: 'Necesito asesoría' }
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
    if (!formData.objetivoAnalytics) newErrors.objetivoAnalytics = 'Selecciona tu objetivo principal';
    if (!formData.problemaActual) newErrors.problemaActual = 'Selecciona tu problema actual';
    if (formData.fuentesDatos.length === 0) newErrors.fuentesDatos = 'Selecciona al menos una fuente de datos';
    if (!formData.descripcionNecesidad.trim()) newErrors.descripcionNecesidad = 'Describe tu necesidad';
    
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.nombre ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-indigo-400 focus:outline-none transition-colors`}
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.email ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-indigo-400 focus:outline-none transition-colors`}
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.telefono ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-indigo-400 focus:outline-none transition-colors`}
            placeholder="+1 123 456 7890"
          />
          {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Empresa
          </label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-400 focus:outline-none transition-colors"
            placeholder="Nombre de tu empresa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cargo/Posición
          </label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-400 focus:outline-none transition-colors"
            placeholder="ej: Gerente Marketing, Analista"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Industria
          </label>
          <input
            type="text"
            name="industria"
            value={formData.industria}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-400 focus:outline-none transition-colors"
            placeholder="ej: E-commerce, SaaS, Retail"
          />
        </div>
      </div>

      {/* Nivel de Madurez en Analytics */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu nivel actual en analytics?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {nivelesMadurez.map((nivel) => (
            <motion.label
              key={nivel.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all text-center ${
                formData.nivelMadurez === nivel.value
                  ? 'border-indigo-400 bg-indigo-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="nivelMadurez"
                value={nivel.value}
                checked={formData.nivelMadurez === nivel.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="text-2xl mb-2">{nivel.icon}</div>
              <p className="text-white text-sm font-semibold">{nivel.label}</p>
              <p className="text-gray-400 text-xs">{nivel.descripcion}</p>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Fuentes de Datos */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué fuentes de datos tienes disponibles? *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {fuentesDatosDisponibles.map((fuente) => (
            <motion.label
              key={fuente}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all text-center text-sm ${
                formData.fuentesDatos.includes(fuente)
                  ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                  : 'border-gray-600 hover:border-gray-500 text-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.fuentesDatos.includes(fuente)}
                onChange={() => handleMultiSelect('fuentesDatos', fuente)}
                className="sr-only"
              />
              {fuente}
            </motion.label>
          ))}
        </div>
        {errors.fuentesDatos && <p className="text-red-400 text-xs mt-1">{errors.fuentesDatos}</p>}
      </div>

      {/* Objetivo Principal */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu objetivo principal con analytics? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {objetivosAnalytics.map((objetivo) => (
            <motion.label
              key={objetivo.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                formData.objetivoAnalytics === objetivo.value
                  ? 'border-indigo-400 bg-indigo-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="objetivoAnalytics"
                value={objetivo.value}
                checked={formData.objetivoAnalytics === objetivo.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">{objetivo.label}</h4>
                  <p className="text-gray-400 text-sm">{objetivo.descripcion}</p>
                </div>
              </div>
            </motion.label>
          ))}
        </div>
        {errors.objetivoAnalytics && <p className="text-red-400 text-xs mt-1">{errors.objetivoAnalytics}</p>}
      </div>

      {/* Problema Actual */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu principal problema con los datos actualmente? *
        </label>
        <div className="space-y-2">
          {problemasComunes.map((problema) => (
            <motion.label
              key={problema}
              whileHover={{ scale: 1.01 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all flex items-center gap-3 ${
                formData.problemaActual === problema
                  ? 'border-indigo-400 bg-indigo-400/10'
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
              <TrendingUp className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <span className="text-gray-300">{problema}</span>
            </motion.label>
          ))}
        </div>
        {errors.problemaActual && <p className="text-red-400 text-xs mt-1">{errors.problemaActual}</p>}
      </div>

      {/* Herramientas Actuales */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué herramientas de analytics usas actualmente?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {herramientasAnalytics.map((herramienta) => (
            <motion.label
              key={herramienta}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all text-center text-sm ${
                formData.herramientasActuales.includes(herramienta)
                  ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                  : 'border-gray-600 hover:border-gray-500 text-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.herramientasActuales.includes(herramienta)}
                onChange={() => handleMultiSelect('herramientasActuales', herramienta)}
                className="sr-only"
              />
              {herramienta}
            </motion.label>
          ))}
        </div>
      </div>

      {/* Tipos de Reportes y Stakeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            ¿Qué tipos de reportes necesitas?
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {tiposReportes.map((tipo) => (
              <motion.label
                key={tipo}
                whileHover={{ scale: 1.01 }}
                className={`cursor-pointer p-2 border rounded-lg transition-all flex items-center gap-2 text-sm ${
                  formData.tipoReportes.includes(tipo)
                    ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.tipoReportes.includes(tipo)}
                  onChange={() => handleMultiSelect('tipoReportes', tipo)}
                  className="sr-only"
                />
                <BarChart3 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                {tipo}
              </motion.label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            ¿Quiénes usarán los reportes?
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {stakeholders.map((stakeholder) => (
              <motion.label
                key={stakeholder}
                whileHover={{ scale: 1.01 }}
                className={`cursor-pointer p-2 border rounded-lg transition-all flex items-center gap-2 text-sm ${
                  formData.stakeholdersObjetivo.includes(stakeholder)
                    ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.stakeholdersObjetivo.includes(stakeholder)}
                  onChange={() => handleMultiSelect('stakeholdersObjetivo', stakeholder)}
                  className="sr-only"
                />
                <PieChart className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                {stakeholder}
              </motion.label>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas Clave */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué métricas son más importantes para ti?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {metricasClaveDisponibles.map((metrica) => (
            <motion.label
              key={metrica}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all text-center text-sm ${
                formData.metricasClave.includes(metrica)
                  ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                  : 'border-gray-600 hover:border-gray-500 text-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.metricasClave.includes(metrica)}
                onChange={() => handleMultiSelect('metricasClave', metrica)}
                className="sr-only"
              />
              {metrica}
            </motion.label>
          ))}
        </div>
      </div>

      {/* Frecuencia de Reportes */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Con qué frecuencia necesitas los reportes?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {frecuenciasReportes.map((frecuencia) => (
            <motion.label
              key={frecuencia.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all text-center ${
                formData.frecuenciaReportes === frecuencia.value
                  ? 'border-indigo-400 bg-indigo-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="frecuenciaReportes"
                value={frecuencia.value}
                checked={formData.frecuenciaReportes === frecuencia.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <h4 className="text-white font-semibold">{frecuencia.label}</h4>
              <p className="text-gray-400 text-sm">{frecuencia.descripcion}</p>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Presupuesto */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu presupuesto para analytics?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {presupuestos.map((presupuesto) => (
            <motion.label
              key={presupuesto.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                formData.presupuesto === presupuesto.value
                  ? 'border-indigo-400 bg-indigo-400/10'
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

      {/* Descripción de Necesidad */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Describe tu necesidad específica de analytics *
        </label>
        <textarea
          name="descripcionNecesidad"
          value={formData.descripcionNecesidad}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-4 py-3 bg-slate-800 border ${errors.descripcionNecesidad ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-indigo-400 focus:outline-none transition-colors resize-none`}
          placeholder="Explica qué tipo de insights necesitas, qué decisiones quieres tomar con los datos, qué reportes específicos necesitas, etc..."
        />
        {errors.descripcionNecesidad && <p className="text-red-400 text-xs mt-1">{errors.descripcionNecesidad}</p>}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
      >
        Solicitar Setup de Analytics
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <p className="text-center text-gray-400 text-sm">
        📊 Auditoría de datos gratuita • Dashboard demo incluido
      </p>
    </form>
  );
};

export default AnalyticsForm;
