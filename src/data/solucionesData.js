import { Globe, Cpu, Smartphone } from 'lucide-react';

export const soluciones = [
  {
    id: 2,
    nombre: 'Automatización a medida',
    categoria: 'automatizacion',
    subtitulo: 'ALENIA HUB · Hardware + software + IA',
    descripcion: 'Traenos el desafío: diseñamos y construimos la solución para que tu negocio funcione solo.',
    descripcionGeneral: 'Desarrollamos soluciones con inteligencia. Partimos de tu idea y combinamos hardware, software e IA para que tu negocio físico funcione solo. No es un paquete armado: cada proyecto se diseña desde cero. Así resolvimos LaIA, una lavandería self-service que funciona 24/7 sin personal.',
    incluye: [
      'Hardware a medida: placas, sensores y conexiones.',
      'Software a medida: apps, pantallas y paneles.',
      'IA aplicada e integración con lo que ya usás.'
    ],
    icon: Cpu,
    color: 'green',
    link: '/soluciones/hub',
    linkLabel: 'Conocer ALENIA HUB',
    destacado: true,
    niveles: {
      elemental: {
        nombre: 'ELEMENTAL',
        precio: 'A cotizar',
        precioNumerico: 0,
        objetivo: 'Conectar tus primeras máquinas',
        descripcion: 'Para dar el primer paso: cobrar digital y activar equipos sin personal',
        beneficios: [
          'Evaluación de tus equipos (marca, modelo y controlador)',
          'Placa IoT y conexión de las máquinas elegidas',
          'Cobro con QR de Mercado Pago',
          'La máquina arranca sola al confirmarse el pago',
          'Panel web básico con estado y ventas',
          'Pruebas en el local antes de abrir al público'
        ],
        caracteristicas: [
          'Prueba piloto con pocos equipos',
          'Instalación en el local',
          'Capacitación de uso',
          'Soporte técnico 30 días',
          'Funciona con Wi-Fi del local',
          'Escalable a todo el local'
        ],
        destacado: false,
        formularioId: '2-elemental'
      },
      moderado: {
        nombre: 'MODERADO',
        precio: 'A cotizar',
        precioNumerico: 0,
        objetivo: 'Un local completo funcionando solo',
        descripcion: 'Para operar todo el local sin depender de que haya alguien cobrando',
        beneficios: [
          'Todas las máquinas del local conectadas',
          'Cobros con Mercado Pago, saldo y crédito',
          'App o web de autoservicio con tu marca',
          'Control de acceso con QR en la puerta',
          'Panel en tiempo real con alertas de fallas',
          'Cierre de caja y reportes automáticos',
          'Integración con vending en modo crédito',
          'Monitoreo remoto desde el celular'
        ],
        caracteristicas: [
          'Local completo',
          'Instalación y puesta en marcha',
          'Pruebas en campo',
          'Soporte técnico 90 días',
          'Ajustes según el uso real',
          'Capacitación del equipo'
        ],
        destacado: true,
        etiqueta: 'MÁS ELEGIDO',
        formularioId: '2-moderado'
      },
      visionario: {
        nombre: 'VISIONARIO',
        precio: 'A cotizar',
        precioNumerico: 0,
        objetivo: 'Ecosistema propio para tu red de locales',
        descripcion: 'Para cadenas, franquicias y operadores con varios locales',
        beneficios: [
          'App móvil propia (iOS y Android) con tu marca',
          'Tótem táctil de autoservicio en cada local',
          'Panel central para todos tus locales',
          'Asistente IA que atiende a tus clientes 24/7',
          'Saldo, promociones y fidelización',
          'Integración con placas o APIs del fabricante',
          'Roles para dueños, encargados y técnicos',
          'Reportes por local y por máquina',
          'Preparado para sumar nuevos locales o franquicias',
          'Acompañamiento en la expansión'
        ],
        caracteristicas: [
          'Varios locales',
          'Desarrollo a medida',
          'Implementación por etapas',
          'Soporte prioritario 1 año',
          'Mejoras continuas',
          'Manual de operación'
        ],
        destacado: false,
        premium: true,
        etiqueta: 'PREMIUM',
        formularioId: '2-visionario'
      }
    }
  },
  {
    id: 1,
    nombre: 'Desarrollo Web',
    categoria: 'desarrollo-web',
    subtitulo: 'Webs que presentan y venden',
    descripcion: 'Webs modernas, catálogos y tiendas online para presentar tu negocio y recibir consultas.',
    descripcionGeneral: 'Desde landing pages hasta ecosistemas digitales completos, te ayudamos a establecer y hacer crecer tu presencia online con soluciones que realmente convierten visitantes en clientes.',
    incluye: [
      'Catálogos y tiendas online que venden 24/7.',
      'Landing pages y sitios institucionales modernos.',
      'Formularios y WhatsApp integrados para recibir consultas.'
    ],
    icon: Globe,
    color: 'blue',
    niveles: {
      elemental: {
        nombre: 'ELEMENTAL',
        precio: 'Desde $149',
        precioNumerico: 149,
        objetivo: 'Presencia digital básica y funcional',
        descripcion: 'Ideal para emprendedores que necesitan estar online rápidamente',
        beneficios: [
          'Landing page optimizada para móviles',
          'Formulario de contacto funcional',
          'Integración con WhatsApp Business',
          'Hosting incluido por 1 año',
          'Dominio .com gratis',
          'Certificado SSL incluido'
        ],
        caracteristicas: [
          '1 página principal',
          '3 secciones personalizadas',
          '1 mes de entrega',
          'Soporte técnico 30 días',
          'Responsive design',
          'Optimización básica SEO'
        ],
        destacado: false,
        formularioId: '1-elemental'
      },
      moderado: {
        nombre: 'MODERADO',
        precio: 'Desde $299',
        precioNumerico: 299,
        objetivo: 'Web profesional con funcionalidades avanzadas',
        descripcion: 'Para negocios que buscan convertir visitantes en clientes de forma efectiva',
        beneficios: [
          'Sitio web completo hasta 7 páginas',
          'Sistema de citas online automático',
          'Integración con Google Analytics',
          'Chat automático 24/7 con IA',
          'Optimización SEO avanzada',
          'Blog integrado con CMS',
          'Formularios inteligentes',
          'Integración redes sociales'
        ],
        caracteristicas: [
          'Hasta 7 páginas',
          'CMS para gestionar contenido',
          '6 semanas de entrega',
          'Soporte técnico 90 días',
          'Optimización de velocidad',
          'Panel de analytics'
        ],
        destacado: true,
        etiqueta: 'MÁS ELEGIDO',
        formularioId: '1-moderado'
      },
      visionario: {
        nombre: 'VISIONARIO',
        precio: 'Desde $649',
        precioNumerico: 649,
        objetivo: 'Ecosistema digital completo que escala tu negocio',
        descripcion: 'La solución definitiva para empresas que piensan en grande',
        beneficios: [
          'Plataforma web + app móvil personalizada',
          'Sistema CRM integrado con IA',
          'Automatización completa de procesos',
          'Panel de analytics avanzado con BI',
          'Integraciones ilimitadas (ERP, POS, etc.)',
          'Consultoría estratégica digital incluida',
          'Sistema de facturación automático',
          'Marketplace interno para múltiples vendedores',
          'API personalizada para integraciones',
          'Capacitación completa del equipo'
        ],
        caracteristicas: [
          'Páginas ilimitadas',
          'App móvil nativa',
          '3 meses de desarrollo',
          'Soporte VIP 1 año completo',
          'Consultoría mensual incluida',
          'Actualizaciones prioritarias'
        ],
        destacado: false,
        premium: true,
        etiqueta: 'PREMIUM',
        formularioId: '1-visionario'
      }
    }
  },
  {
    id: 3,
    nombre: 'Apps y software a medida',
    categoria: 'desarrollo-apps',
    subtitulo: 'Apps, paneles y programas',
    descripcion: 'Aplicaciones iOS y Android, paneles de control y software de gestión pensados para tu operación.',
    descripcionGeneral: 'Desarrollamos apps para tus clientes, paneles para tu equipo y programas de gestión (ventas, stock, caja) que se adaptan a cómo trabajás.',
    incluye: [
      'Apps iOS y Android con tu marca.',
      'Paneles de administración y reportes.',
      'Software de gestión de ventas y stock.'
    ],
    icon: Smartphone,
    color: 'orange',
    link: '/soluciones/digitales',
    linkLabel: 'Ver apps y webs'
  }
];

export const formularios = {
  // Formularios originales (mantener para compatibilidad)
  1: { titulo: 'Estás a un paso de tener tu web profesional.', subtitulo: 'Completa tus datos y un experto te contactará para explicarte cómo funciona, sin compromiso.', campos: [ { label: 'Nombre', name: 'nombre', type: 'text', required: true }, { label: 'Email de Contacto', name: 'email', type: 'email', required: true }, { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false }, { label: 'Si ya tienes una página web, déjanos el enlace aquí (Opcional)', name: 'web', type: 'text', required: false, help: 'Este campo nos ayuda a entender tu situación actual para darte una mejor recomendación.' } ], textoBoton: 'Solicitar mi Web Profesional', agradecimiento: '¡Gracias! Hemos recibido tu solicitud.\nUn experto de ALENIA te contactará en menos de 24 horas para conversar sobre tu proyecto.' },
  2: { titulo: 'Contanos qué querés automatizar.', subtitulo: 'Con estos datos evaluamos tu idea y te proponemos cómo resolverla.', campos: [ { label: 'Nombre', name: 'nombre', type: 'text', required: true }, { label: 'Email de Contacto', name: 'email', type: 'email', required: true }, { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false }, { label: 'Tu negocio, qué querés que funcione solo y con qué equipos contás', name: 'tarea', type: 'textarea', required: false, help: 'No hace falta que la idea esté definida.' } ], textoBoton: 'Pedir evaluación', agradecimiento: '¡Gracias! Recibimos tu consulta.\nUn especialista de ALENIA te va a contactar para evaluar tu proyecto.' },
  'cta-final': { titulo: '¡Estás a un paso de transformar tu negocio!', subtitulo: 'Completa tus datos y accede a todas nuestras herramientas de forma gratuita.', campos: [ { label: 'Nombre', name: 'nombre', type: 'text', required: true }, { label: 'Email de Contacto', name: 'email', type: 'email', required: true }, { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false } ], textoBoton: 'Obtener Acceso Inmediato Gratuito', agradecimiento: '¡Gracias! Hemos recibido tu solicitud.\nEn breve recibirás acceso a nuestras herramientas.' },

  // Formularios específicos por nivel
  // Soluciones Digitales
  '1-elemental': {
    titulo: 'Empezemos con tu presencia digital - Nivel ELEMENTAL',
    subtitulo: 'Una landing page profesional es el primer paso para hacer crecer tu negocio online.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿Cuál es tu negocio o proyecto?', name: 'negocio', type: 'text', required: true },
      { label: '¿Ya tienes dominio o necesitas uno nuevo?', name: 'dominio', type: 'select', options: ['Necesito dominio nuevo', 'Ya tengo dominio', 'No estoy seguro'], required: true }
    ],
    textoBoton: 'Solicitar mi Landing Page',
    agradecimiento: '¡Perfecto! Crearemos tu landing page profesional.\nUn experto de ALENIA te contactará en 24 horas para definir los detalles y comenzar tu proyecto.'
  },
  '1-moderado': {
    titulo: 'Lleva tu negocio al siguiente nivel - Nivel MODERADO',
    subtitulo: 'Un sitio web completo con todas las funcionalidades para convertir visitantes en clientes.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿Cuál es tu negocio y qué servicios ofreces?', name: 'negocio', type: 'textarea', required: true },
      { label: '¿Necesitas sistema de citas/reservas?', name: 'citas', type: 'select', options: ['Sí, es fundamental', 'Me interesa conocer más', 'No lo necesito'], required: true },
      { label: '¿Tienes contenido preparado o necesitas ayuda creándolo?', name: 'contenido', type: 'select', options: ['Tengo todo el contenido', 'Tengo algo, necesito ayuda', 'Necesito que lo creen'], required: true }
    ],
    textoBoton: 'Quiero mi Sitio Web Completo',
    agradecimiento: '¡Excelente elección! Tu sitio web será una máquina de conseguir clientes.\nUn experto de ALENIA te contactará en 24 horas para planificar tu proyecto web completo.'
  },
  '1-visionario': {
    titulo: 'Construyamos tu imperio digital - Nivel VISIONARIO',
    subtitulo: 'La solución completa para empresas que quieren dominar su mercado online.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono', name: 'telefono', type: 'tel', required: true },
      { label: 'Empresa/Organización', name: 'empresa', type: 'text', required: true },
      { label: 'Describe tu visión del proyecto digital', name: 'vision', type: 'textarea', required: true },
      { label: '¿Qué sistemas actuales necesitas integrar?', name: 'integraciones', type: 'textarea', required: false, help: 'Ej: CRM, ERP, sistemas de facturación, etc.' },
      { label: 'Presupuesto estimado para este proyecto', name: 'presupuesto', type: 'select', options: ['$1,299 - $3,000', '$3,000 - $5,000', '$5,000 - $10,000', 'Más de $10,000'], required: true }
    ],
    textoBoton: 'Solicitar Consulta Estratégica',
    agradecimiento: '¡Perfecto! Crearemos un ecosistema digital que transformará tu negocio.\nUn consultor senior de ALENIA te contactará en 24 horas para una sesión estratégica completa.'
  },

  // Automatización de máquinas (ALENIA HUB)
  '2-elemental': {
    titulo: 'Conectemos tus primeras máquinas - Nivel ELEMENTAL',
    subtitulo: 'Cobro digital y activación automática para empezar con pocos equipos.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿Qué tipo de negocio tenés?', name: 'negocio', type: 'text', required: true, help: 'Ej.: lavandería, vending, gimnasio, lavadero de autos.' },
      { label: '¿Cuántas máquinas querés conectar primero?', name: 'volumen', type: 'select', options: ['1 a 3', '4 a 10', 'Más de 10', 'No sé todavía'], required: true },
      { label: 'Marca y modelo de las máquinas', name: 'equipos', type: 'textarea', required: true, help: 'La compatibilidad depende de la marca, el modelo y el controlador.' }
    ],
    textoBoton: 'Pedir evaluación',
    agradecimiento: '¡Gracias! Recibimos los datos de tus equipos.\nUn especialista de ALENIA te va a contactar para revisar qué se puede conectar.'
  },
  '2-moderado': {
    titulo: 'Tu local funcionando solo - Nivel MODERADO',
    subtitulo: 'Todas las máquinas conectadas, cobros digitales, accesos con QR y panel en tiempo real.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿Cómo cobrás hoy?', name: 'cobro', type: 'select', options: ['Efectivo o monedero', 'Fichas o tarjetas', 'Mercado Pago / posnet', 'Combinado'], required: true },
      { label: '¿Querés abrir el local sin personal?', name: 'sin_personal', type: 'select', options: ['Sí, 24/7', 'Algunos horarios', 'No, pero quiero controlar mejor'], required: true },
      { label: 'Contanos qué máquinas tenés y qué querés conectar', name: 'desafio', type: 'textarea', required: true }
    ],
    textoBoton: 'Quiero mi local conectado',
    agradecimiento: '¡Excelente! Vamos a armar una propuesta para tu local.\nUn especialista de ALENIA te va a contactar para coordinar la evaluación de tus equipos.'
  },
  '2-visionario': {
    titulo: 'Ecosistema para tu red de locales - Nivel VISIONARIO',
    subtitulo: 'App y tótem con tu marca, panel central y asistente IA para todos tus locales.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono', name: 'telefono', type: 'tel', required: true },
      { label: 'Empresa / Marca', name: 'empresa', type: 'text', required: true },
      { label: '¿Cuántos locales operás o planeás abrir?', name: 'locales', type: 'select', options: ['1 a 3', '4 a 10', 'Más de 10', 'Franquicia en armado'], required: true },
      { label: 'Describí tus equipos y lo que te imaginás para tu marca', name: 'vision', type: 'textarea', required: true },
      { label: '¿Qué sistemas tenés que integrar?', name: 'integraciones', type: 'textarea', required: false, help: 'Ej.: placas del fabricante, facturación, software de gestión.' }
    ],
    textoBoton: 'Solicitar reunión',
    agradecimiento: '¡Perfecto! Vamos a diseñar el ecosistema para tu red.\nUn especialista de ALENIA te va a contactar para una primera reunión.'
  }
}