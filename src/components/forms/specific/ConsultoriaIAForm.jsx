import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Brain, Lightbulb, Cog, ArrowRight } from 'lucide-react';

const ConsultoriaIAForm = ({ onSubmit, nivel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    cargo: '',
    tamanioEmpresa: '',
    industria: '',
    conocimientoIA: '',
    objetivoIA: '',
    problemasActuales: [],
    tipoSolucion: '',
    presupuesto: '',
    urgencia: '',
    experienciaIA: '',
    herramientasActuales: [],
    descripcionDesafio: '',
    resultadoEsperado: ''
  });

  const [errors, setErrors] = useState({});

  const tamaniosEmpresa = [
    { value: 'startup', label: 'Startup', descripcion: '1-10 empleados', icon: '🚀' },
    { value: 'pequena', label: 'Pequeña', descripcion: '11-50 empleados', icon: '🏢' },
    { value: 'mediana', label: 'Mediana', descripcion: '51-250 empleados', icon: '🏬' },
    { value: 'grande', label: 'Grande', descripcion: '250+ empleados', icon: '🏭' }
  ];

  const nivelesConocimiento = [
    { value: 'principiante', label: 'Principiante', descripcion: 'Poco conocimiento de IA', icon: '📚' },
    { value: 'basico', label: 'Básico', descripcion: 'Entiendo conceptos generales', icon: '🎯' },
    { value: 'intermedio', label: 'Intermedio', descripcion: 'He implementado algunas soluciones', icon: '⚡' },
    { value: 'avanzado', label: 'Avanzado', descripcion: 'Uso IA regularmente', icon: '🧠' }
  ];

  const objetivosIA = [
    { value: 'automatizar-procesos', label: 'Automatizar Procesos', descripcion: 'Eficiencia operacional' },
    { value: 'mejorar-atencion', label: 'Mejorar Atención al Cliente', descripcion: 'Chatbots y asistentes' },
    { value: 'analisis-datos', label: 'Análisis de Datos', descripcion: 'Insights y predicciones' },
    { value: 'personalizar-experiencia', label: 'Personalizar Experiencia', descripcion: 'Recomendaciones IA' },
    { value: 'optimizar-marketing', label: 'Optimizar Marketing', descripcion: 'Campañas inteligentes' },
    { value: 'reducir-costos', label: 'Reducir Costos', descripcion: 'Eficiencia económica' }
  ];

  const problemasComunes = [
    'Procesos manuales que consumen mucho tiempo',
    'Dificultad para analizar grandes volúmenes de datos',
    'Atención al cliente lenta o inconsistente',
    'Falta de personalización en productos/servicios',
    'Competencia que ya usa IA',
    'Decisiones basadas en intuición, no datos',
    'Costos operativos muy altos',
    'Dificultad para predecir tendencias de mercado'
  ];

  const tiposSolucion = [
    { value: 'chatbot', label: 'Chatbot/Asistente Virtual', descripcion: 'Para atención al cliente' },
    { value: 'analisis-predictivo', label: 'Análisis Predictivo', descripcion: 'Para forecasting y tendencias' },
    { value: 'automatizacion-procesos', label: 'Automatización de Procesos', descripcion: 'RPA con IA' },
    { value: 'recomendaciones', label: 'Sistema de Recomendaciones', descripcion: 'Para personalización' },
    { value: 'vision-computacional', label: 'Visión por Computadora', descripcion: 'Análisis de imágenes/video' },
    { value: 'nlp', label: 'Procesamiento de Lenguaje', descripcion: 'Análisis de texto' },
    { value: 'consultoria-general', label: 'Consultoría General', descripcion: 'Evaluación completa' }
  ];

  const herramientasIA = [
    'ChatGPT/OpenAI',
    'Google AI/Gemini',
    'Microsoft Copilot',
    'Claude/Anthropic',
    'Midjourney/DALL-E',
    'Zapier con IA',
    'Power BI',
    'Tableau',
    'AWS AI Services',
    'Azure AI',
    'Google Cloud AI',
    'Ninguna aún'
  ];

  const presupuestos = [
    { value: '1000-5000', label: '$1,000 - $5,000', descripcion: 'Proyecto piloto' },
    { value: '5000-15000', label: '$5,000 - $15,000', descripcion: 'Implementación básica' },
    { value: '15000-50000', label: '$15,000 - $50,000', descripcion: 'Solución completa' },
    { value: '50000+', label: '$50,000+', descripcion: 'Transformación empresarial' },
    { value: 'consultar', label: 'A consultar', descripcion: 'Necesito asesoría' }
  ];

  const nivelesUrgencia = [
    { value: 'inmediata', label: 'Inmediata', descripcion: '1-2 semanas', color: 'text-red-400' },
    { value: 'alta', label: 'Alta', descripcion: '1 mes', color: 'text-orange-400' },
    { value: 'media', label: 'Media', descripcion: '2-3 meses', color: 'text-yellow-400' },
    { value: 'baja', label: 'Baja', descripcion: '3+ meses', color: 'text-green-400' }
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
    if (!formData.objetivoIA) newErrors.objetivoIA = 'Selecciona tu objetivo principal';
    if (!formData.tipoSolucion) newErrors.tipoSolucion = 'Selecciona el tipo de solución';
    if (!formData.descripcionDesafio.trim()) newErrors.descripcionDesafio = 'Describe tu desafío actual';
    
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.nombre ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors`}
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.email ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors`}
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.telefono ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors`}
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
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors"
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
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors"
            placeholder="ej: CEO, CTO, Gerente IT"
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
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors"
            placeholder="ej: Retail, Salud, Fintech"
          />
        </div>
      </div>

      {/* Tamaño de Empresa */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué tamaño tiene tu empresa?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tamaniosEmpresa.map((tamanio) => (
            <motion.label
              key={tamanio.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all text-center ${
                formData.tamanioEmpresa === tamanio.value
                  ? 'border-orange-400 bg-orange-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="tamanioEmpresa"
                value={tamanio.value}
                checked={formData.tamanioEmpresa === tamanio.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="text-2xl mb-2">{tamanio.icon}</div>
              <p className="text-white text-sm font-semibold">{tamanio.label}</p>
              <p className="text-gray-400 text-xs">{tamanio.descripcion}</p>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Conocimiento de IA */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu nivel de conocimiento en IA?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {nivelesConocimiento.map((nivel) => (
            <motion.label
              key={nivel.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all text-center ${
                formData.conocimientoIA === nivel.value
                  ? 'border-orange-400 bg-orange-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="conocimientoIA"
                value={nivel.value}
                checked={formData.conocimientoIA === nivel.value}
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

      {/* Objetivo Principal */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu objetivo principal con IA? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {objetivosIA.map((objetivo) => (
            <motion.label
              key={objetivo.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                formData.objetivoIA === objetivo.value
                  ? 'border-orange-400 bg-orange-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="objetivoIA"
                value={objetivo.value}
                checked={formData.objetivoIA === objetivo.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">{objetivo.label}</h4>
                  <p className="text-gray-400 text-sm">{objetivo.descripcion}</p>
                </div>
              </div>
            </motion.label>
          ))}
        </div>
        {errors.objetivoIA && <p className="text-red-400 text-xs mt-1">{errors.objetivoIA}</p>}
      </div>

      {/* Problemas Actuales */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué problemas tienes actualmente? (Selecciona todos los que apliquen)
        </label>
        <div className="space-y-2">
          {problemasComunes.map((problema) => (
            <motion.label
              key={problema}
              whileHover={{ scale: 1.01 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all flex items-center gap-3 ${
                formData.problemasActuales.includes(problema)
                  ? 'border-orange-400 bg-orange-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.problemasActuales.includes(problema)}
                onChange={() => handleMultiSelect('problemasActuales', problema)}
                className="sr-only"
              />
              <Lightbulb className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <span className="text-gray-300">{problema}</span>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Tipo de Solución */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué tipo de solución IA te interesa? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tiposSolucion.map((tipo) => (
            <motion.label
              key={tipo.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                formData.tipoSolucion === tipo.value
                  ? 'border-orange-400 bg-orange-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="tipoSolucion"
                value={tipo.value}
                checked={formData.tipoSolucion === tipo.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">{tipo.label}</h4>
                  <p className="text-gray-400 text-sm">{tipo.descripcion}</p>
                </div>
              </div>
            </motion.label>
          ))}
        </div>
        {errors.tipoSolucion && <p className="text-red-400 text-xs mt-1">{errors.tipoSolucion}</p>}
      </div>

      {/* Herramientas Actuales */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué herramientas de IA usas actualmente?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {herramientasIA.map((herramienta) => (
            <motion.label
              key={herramienta}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all text-center text-sm ${
                formData.herramientasActuales.includes(herramienta)
                  ? 'border-orange-400 bg-orange-400/10 text-orange-300'
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

      {/* Presupuesto y Urgencia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            ¿Cuál es tu presupuesto estimado?
          </label>
          <div className="space-y-2">
            {presupuestos.map((presupuesto) => (
              <motion.label
                key={presupuesto.value}
                whileHover={{ scale: 1.01 }}
                className={`cursor-pointer p-3 border rounded-lg transition-all flex items-center gap-3 ${
                  formData.presupuesto === presupuesto.value
                    ? 'border-orange-400 bg-orange-400/10'
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
                <div className="text-lg">💰</div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{presupuesto.label}</h4>
                  <p className="text-gray-400 text-xs">{presupuesto.descripcion}</p>
                </div>
              </motion.label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            ¿Cuál es tu nivel de urgencia?
          </label>
          <div className="space-y-2">
            {nivelesUrgencia.map((urgencia) => (
              <motion.label
                key={urgencia.value}
                whileHover={{ scale: 1.01 }}
                className={`cursor-pointer p-3 border rounded-lg transition-all flex items-center gap-3 ${
                  formData.urgencia === urgencia.value
                    ? 'border-orange-400 bg-orange-400/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name="urgencia"
                  value={urgencia.value}
                  checked={formData.urgencia === urgencia.value}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <Cog className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div>
                  <h4 className={`font-semibold text-sm ${urgencia.color}`}>{urgencia.label}</h4>
                  <p className="text-gray-400 text-xs">{urgencia.descripcion}</p>
                </div>
              </motion.label>
            ))}
          </div>
        </div>
      </div>

      {/* Descripción del Desafío */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Describe tu desafío o proyecto específico *
        </label>
        <textarea
          name="descripcionDesafio"
          value={formData.descripcionDesafio}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-4 py-3 bg-slate-800 border ${errors.descripcionDesafio ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors resize-none`}
          placeholder="Explica qué necesitas automatizar, qué datos tienes disponibles, qué resultados esperas, restricciones técnicas, etc..."
        />
        {errors.descripcionDesafio && <p className="text-red-400 text-xs mt-1">{errors.descripcionDesafio}</p>}
      </div>

      {/* Resultado Esperado */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ¿Qué resultado específico esperas lograr?
        </label>
        <textarea
          name="resultadoEsperado"
          value={formData.resultadoEsperado}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors resize-none"
          placeholder="Ej: Reducir tiempo de respuesta 70%, aumentar precisión predicciones 30%, automatizar proceso completo..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
      >
        Solicitar Consultoría IA
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <p className="text-center text-gray-400 text-sm">
        🧠 Evaluación inicial gratuita • Roadmap de implementación incluido
      </p>
    </form>
  );
};

export default ConsultoriaIAForm;
