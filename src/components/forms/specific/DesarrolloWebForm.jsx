import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, DollarSign, Calendar, Briefcase, ArrowRight } from 'lucide-react';

const DesarrolloWebForm = ({ onSubmit, nivel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    tipoProyecto: '',
    presupuesto: '',
    tiempoEsperado: '',
    tieneContenido: '',
    descripcionProyecto: '',
    funcionalidadesEspecificas: [],
    dominioExistente: '',
    inspiracion: '',
    urgencia: 'normal'
  });

  const [errors, setErrors] = useState({});

  const tiposProyecto = [
    { value: 'landing', label: 'Landing Page', descripcion: 'Una página para promocionar producto/servicio' },
    { value: 'corporativa', label: 'Web Corporativa', descripcion: 'Sitio institucional con múltiples páginas' },
    { value: 'ecommerce', label: 'Tienda Online', descripcion: 'Venta de productos/servicios online' },
    { value: 'aplicacion', label: 'Aplicación Web', descripcion: 'Sistema o plataforma personalizada' },
    { value: 'blog', label: 'Blog/Revista', descripcion: 'Sitio de contenido y publicaciones' },
    { value: 'portfolio', label: 'Portafolio', descripcion: 'Showcase de trabajos o proyectos' }
  ];

  const rangosPresupuesto = [
    { value: '299-599', label: '$299 - $599', descripcion: 'Proyectos básicos' },
    { value: '600-1299', label: '$600 - $1,299', descripcion: 'Proyectos profesionales' },
    { value: '1300-2999', label: '$1,300 - $2,999', descripcion: 'Proyectos avanzados' },
    { value: '3000+', label: '$3,000+', descripcion: 'Proyectos empresariales' },
    { value: 'consultar', label: 'A consultar', descripcion: 'Necesito asesoría' }
  ];

  const tiemposEsperados = [
    { value: '1-2-semanas', label: '1-2 semanas', urgencia: 'alta' },
    { value: '1-mes', label: '1 mes', urgencia: 'normal' },
    { value: '2-3-meses', label: '2-3 meses', urgencia: 'baja' },
    { value: 'flexible', label: 'Flexible', urgencia: 'baja' }
  ];

  const funcionalidadesDisponibles = [
    'Sistema de citas online',
    'Chat en vivo',
    'Integración con redes sociales',
    'Blog integrado',
    'Galería de imágenes',
    'Formularios avanzados',
    'Mapas interactivos',
    'Multiidioma',
    'Sistema de pagos',
    'Área de clientes',
    'Newsletter',
    'Integración con CRM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFuncionalidadToggle = (funcionalidad) => {
    setFormData(prev => ({
      ...prev,
      funcionalidadesEspecificas: prev.funcionalidadesEspecificas.includes(funcionalidad)
        ? prev.funcionalidadesEspecificas.filter(f => f !== funcionalidad)
        : [...prev.funcionalidadesEspecificas, funcionalidad]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.tipoProyecto) newErrors.tipoProyecto = 'Selecciona el tipo de proyecto';
    if (!formData.presupuesto) newErrors.presupuesto = 'Selecciona un rango de presupuesto';
    if (!formData.descripcionProyecto.trim()) newErrors.descripcionProyecto = 'Describe tu proyecto';
    
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.nombre ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors`}
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.email ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors`}
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
            className={`w-full px-4 py-3 bg-slate-800 border ${errors.telefono ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors`}
            placeholder="+1 123 456 7890"
          />
          {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Empresa (opcional)
          </label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
            placeholder="Nombre de tu empresa"
          />
        </div>
      </div>

      {/* Tipo de Proyecto */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué tipo de proyecto necesitas? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tiposProyecto.map((tipo) => (
            <motion.label
              key={tipo.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                formData.tipoProyecto === tipo.value
                  ? 'border-cyan-400 bg-cyan-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="tipoProyecto"
                value={tipo.value}
                checked={formData.tipoProyecto === tipo.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">{tipo.label}</h4>
                  <p className="text-gray-400 text-sm">{tipo.descripcion}</p>
                </div>
              </div>
            </motion.label>
          ))}
        </div>
        {errors.tipoProyecto && <p className="text-red-400 text-xs mt-1">{errors.tipoProyecto}</p>}
      </div>

      {/* Presupuesto */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Cuál es tu presupuesto aproximado? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rangosPresupuesto.map((rango) => (
            <motion.label
              key={rango.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                formData.presupuesto === rango.value
                  ? 'border-cyan-400 bg-cyan-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="presupuesto"
                value={rango.value}
                checked={formData.presupuesto === rango.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">{rango.label}</h4>
                  <p className="text-gray-400 text-sm">{rango.descripcion}</p>
                </div>
              </div>
            </motion.label>
          ))}
        </div>
        {errors.presupuesto && <p className="text-red-400 text-xs mt-1">{errors.presupuesto}</p>}
      </div>

      {/* Tiempo Esperado */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Para cuándo necesitas el proyecto?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiemposEsperados.map((tiempo) => (
            <motion.label
              key={tiempo.value}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-3 border-2 rounded-lg transition-all text-center ${
                formData.tiempoEsperado === tiempo.value
                  ? 'border-cyan-400 bg-cyan-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="tiempoEsperado"
                value={tiempo.value}
                checked={formData.tiempoEsperado === tiempo.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <Calendar className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">{tiempo.label}</p>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Funcionalidades Específicas */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          ¿Qué funcionalidades específicas necesitas?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {funcionalidadesDisponibles.map((funcionalidad) => (
            <motion.label
              key={funcionalidad}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer p-3 border rounded-lg transition-all text-sm ${
                formData.funcionalidadesEspecificas.includes(funcionalidad)
                  ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                  : 'border-gray-600 hover:border-gray-500 text-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.funcionalidadesEspecificas.includes(funcionalidad)}
                onChange={() => handleFuncionalidadToggle(funcionalidad)}
                className="sr-only"
              />
              {funcionalidad}
            </motion.label>
          ))}
        </div>
      </div>

      {/* Descripción del Proyecto */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Describe tu proyecto *
        </label>
        <textarea
          name="descripcionProyecto"
          value={formData.descripcionProyecto}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-4 py-3 bg-slate-800 border ${errors.descripcionProyecto ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none`}
          placeholder="Cuéntanos sobre tu proyecto, objetivos, público objetivo, y cualquier detalle importante..."
        />
        {errors.descripcionProyecto && <p className="text-red-400 text-xs mt-1">{errors.descripcionProyecto}</p>}
      </div>

      {/* Información Adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ¿Tienes dominio? (opcional)
          </label>
          <input
            type="text"
            name="dominioExistente"
            value={formData.dominioExistente}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
            placeholder="ej: miempresa.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sitios de inspiración (opcional)
          </label>
          <input
            type="text"
            name="inspiracion"
            value={formData.inspiracion}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
            placeholder="URLs de sitios que te gustan"
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
      >
        Solicitar Cotización Personalizada
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <p className="text-center text-gray-400 text-sm">
        ✨ Incluye consulta gratuita de 15 minutos • Respuesta en menos de 4 horas
      </p>
    </form>
  );
};

export default DesarrolloWebForm;
