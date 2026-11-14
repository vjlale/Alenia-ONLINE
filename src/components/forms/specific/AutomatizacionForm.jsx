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
    { value: 'lavanderia', label: 'Lavandería self-service', icon: '🧺' },
    { value: 'vending', label: 'Máquinas vending', icon: '🥤' },
    { value: 'accesos-gimnasio', label: 'Accesos / Gimnasio', icon: '🚪' },
    { value: 'lavadero-cochera', label: 'Lavadero de autos / Cochera', icon: '🚗' },
    { value: 'juegos', label: 'Juegos / Entretenimiento', icon: '🎮' },
    { value: 'comercio', label: 'Comercio o local físico', icon: '🏪' },
    { value: 'industria', label: 'Industria / Producción', icon: '🏭' },
    { value: 'otro', label: 'Otro', icon: '📝' }
  ];

  const problemasComunes = [
    'Necesito personal solo para cobrar o activar las máquinas',
    'Cobro en efectivo o con fichas y quiero pagos digitales',
    'No sé en tiempo real qué máquina está andando o falla',
    'Quiero abrir el local sin personal (24/7)',
    'Controlar el acceso de clientes con QR',
    'Cerrar la caja y sacar reportes me lleva tiempo',
    'Quiero una app o un tótem con mi marca',
    'Tengo varios locales y no los puedo controlar juntos'
  ];

  const procesosAutomatizables = [
    { value: 'activacion-maquinas', label: 'Activación de máquinas', descripcion: 'Arrancan solas al pagar o escanear un QR' },
    { value: 'cobros-digitales', label: 'Cobros e ingresos', descripcion: 'Mercado Pago, saldo y crédito' },
    { value: 'control-accesos', label: 'Control de accesos', descripcion: 'Puertas y cerraduras con QR' },
    { value: 'panel-control', label: 'Panel en tiempo real', descripcion: 'Estado, ventas y alertas de cada equipo' },
    { value: 'app-marca', label: 'App con tu marca', descripcion: 'Para tus clientes, iOS y Android' },
    { value: 'totem', label: 'Tótem táctil', descripcion: 'Autoservicio en el local' },
    { value: 'asistente-ia', label: 'Asistente IA de soporte', descripcion: 'Atiende a tus clientes 24/7' },
    { value: 'software-gestion', label: 'Software de gestión', descripcion: 'Stock, caja y reportes' }
  ];

  const volumenesOperacion = [
    { value: '1-5', label: '1 a 5 equipos', descripcion: 'Un local chico' },
    { value: '6-15', label: '6 a 15 equipos', descripcion: 'Un local grande' },
    { value: '16-50', label: '16 a 50 equipos', descripcion: 'Varios locales' },
    { value: '50+', label: 'Más de 50', descripcion: 'Red o franquicia' }
  ];

  const plataformasDisponnibles = [
    'Efectivo / monedero',
    'Fichas o tarjetas',
    'Mercado Pago',
    'Posnet / Point',
    'Placa o controlador del fabricante',
    'Wi-Fi en el local',
    'Software de gestión propio',
    'Ninguno todavía',
    'Otros'
  ];

  const presupuestos = [
    { value: 'evaluar', label: 'Quiero que lo evalúen', descripcion: 'Primero ver qué se puede conectar' },
    { value: 'piloto', label: 'Prueba piloto', descripcion: 'Empezar con pocos equipos' },
    { value: 'local-completo', label: 'Un local completo', descripcion: 'Todos los equipos de un local' },
    { value: 'red', label: 'Varios locales', descripcion: 'Red, cadena o franquicia' }
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
    if (!formData.tipoNegocio) newErrors.tipoNegocio = 'Elegí tu tipo de negocio';
    if (!formData.problemaPrincipal) newErrors.problemaPrincipal = 'Elegí qué querés resolver';
    if (formData.procesosAutomatizar.length === 0) newErrors.procesosAutomatizar = 'Elegí al menos una opción';
    if (!formData.descripcionSituacion.trim()) newErrors.descripcionSituacion = 'Contanos un poco de tus máquinas';
    
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
            placeholder="+54 9 351 123 4567"
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
          ¿Qué tipo de negocio tenés? *
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
          ¿Qué querés resolver primero? *
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
          ¿Qué querés conectar o automatizar? *
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
          ¿Cuántas máquinas o equipos operás?
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
          ¿Cómo cobrás y qué tenés hoy?
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
          ¿Cómo te gustaría empezar?
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
          Contanos marca y modelo de tus máquinas y qué necesitás *
        </label>
        <textarea
          name="descripcionSituacion"
          value={formData.descripcionSituacion}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-4 py-3 bg-slate-800 border ${errors.descripcionSituacion ? 'border-red-400' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors resize-none`}
          placeholder="Ej.: 6 lavadoras Electrolux y 2 secadoras, cobramos en efectivo, queremos abrir 24/7 y cobrar con Mercado Pago..."
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
        Pedir evaluación de mis equipos
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <p className="text-center text-gray-400 text-sm">
        Evaluamos tus equipos sin costo • La compatibilidad depende de marca, modelo y controlador
      </p>
    </form>
  );
};

export default AutomatizacionForm;
