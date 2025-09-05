import { Globe, Zap, BarChart3, MessageSquare, Cpu } from 'lucide-react';

export const soluciones = [
  {
    id: 1,
    nombre: 'Desarrollo Web',
    categoria: 'desarrollo-web',
    subtitulo: 'Desarrollo Web & Apps',
    descripcion: 'Creamos webs, apps y software a medida que solucionan problemas reales de tu negocio.',
    descripcionGeneral: 'Desde landing pages hasta ecosistemas digitales completos, te ayudamos a establecer y hacer crecer tu presencia online con soluciones que realmente convierten visitantes en clientes.',
    incluye: [
      'Catálogos y tiendas online que venden 24/7.',
      'Apps personalizadas para optimizar tu gestión.',
      'Software a medida para escalar tus operaciones.'
    ],
    icon: Globe,
    color: 'blue',
    niveles: {
      elemental: {
        nombre: 'ELEMENTAL',
        precio: 'Desde $299',
        precioNumerico: 299,
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
        precio: 'Desde $599',
        precioNumerico: 599,
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
        precio: 'Desde $1,299',
        precioNumerico: 1299,
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
    id: 2,
    nombre: 'Automatización',
    categoria: 'automatizacion',
    subtitulo: 'Trabaja Menos, Logra Más',
    descripcion: 'Implementamos asistentes virtuales y automatizamos tareas para que no pierdas ni un solo cliente.',
    descripcionGeneral: 'Libera tiempo valioso automatizando tareas repetitivas con IA. Desde chatbots inteligentes hasta flujos de trabajo completos, te ayudamos a ser más productivo mientras mejoras la experiencia de tus clientes.',
    incluye: [
      'Asistente virtual para WhatsApp, Instagram y Facebook.',
      'Seguimiento automático de clientes por email.',
      'Sistema de agendamiento de turnos y citas.'
    ],
    icon: Zap,
    color: 'green',
    niveles: {
      elemental: {
        nombre: 'ELEMENTAL',
        precio: 'Desde $199',
        precioNumerico: 199,
        objetivo: 'Automatización básica para empezar',
        descripcion: 'Perfecto para negocios que quieren dar sus primeros pasos en automatización',
        beneficios: [
          'Chatbot básico para WhatsApp Business',
          'Respuestas automáticas configuradas',
          'Formulario de contacto inteligente',
          'Notificaciones automáticas por email',
          'Configuración inicial incluida',
          'Tutorial de uso completo'
        ],
        caracteristicas: [
          'Hasta 100 conversaciones/mes',
          '10 respuestas automáticas',
          '2 semanas de implementación',
          'Soporte técnico 30 días',
          'Manual de uso incluido',
          'Integración con WhatsApp'
        ],
        destacado: false,
        formularioId: '2-elemental'
      },
      moderado: {
        nombre: 'MODERADO',
        precio: 'Desde $399',
        precioNumerico: 399,
        objetivo: 'Automatización completa multicanal',
        descripcion: 'Ideal para empresas que buscan automatizar múltiples procesos',
        beneficios: [
          'Asistente IA para WhatsApp, Instagram y Facebook',
          'Sistema de citas automático integrado',
          'Seguimiento de leads por email y SMS',
          'Dashboard de control centralizado',
          'Integraciones con CRM existente',
          'Flujos de trabajo personalizados',
          'Reportes de conversiones automáticos',
          'Capacitación del equipo incluida'
        ],
        caracteristicas: [
          'Hasta 500 conversaciones/mes',
          'Múltiples canales integrados',
          '4 semanas de implementación',
          'Soporte técnico 90 días',
          'Entrenamientos incluidos',
          'Optimización continua'
        ],
        destacado: true,
        etiqueta: 'MÁS POPULAR',
        formularioId: '2-moderado'
      },
      visionario: {
        nombre: 'VISIONARIO',
        precio: 'Desde $799',
        precioNumerico: 799,
        objetivo: 'Ecosistema de automatización empresarial',
        descripcion: 'La solución completa para empresas que quieren liderar en eficiencia',
        beneficios: [
          'IA conversacional avanzada con aprendizaje',
          'Automatización completa del funnel de ventas',
          'Integración con todos los sistemas existentes',
          'Análisis predictivo de comportamiento',
          'Automatización de procesos internos',
          'API personalizada para integraciones',
          'Consultoría estratégica mensual',
          'Soporte prioritario 24/7',
          'Actualizaciones y mejoras continuas',
          'ROI garantizado o reembolso'
        ],
        caracteristicas: [
          'Conversaciones ilimitadas',
          'IA personalizada y entrenable',
          '8 semanas de implementación',
          'Soporte VIP 1 año completo',
          'Consultoría estratégica incluida',
          'Garantía de resultados'
        ],
        destacado: false,
        premium: true,
        etiqueta: 'PREMIUM',
        formularioId: '2-visionario'
      }
    }
  },
  {
    id: 3,
    nombre: 'Marketing Digital',
    categoria: 'marketing-ia',
    subtitulo: 'Marketing que Entiende',
    descripcion: 'Usamos IA para que tus anuncios lleguen a las personas correctas y optimices tu inversión.',
    descripcionGeneral: 'Potencia tu marketing con inteligencia artificial que entiende a tu audiencia. Optimizamos campañas, generamos contenido y analizamos datos para maximizar tu ROI y acelerar el crecimiento de tu negocio.',
    incluye: [
      'Análisis de mercado para entender a tus clientes.',
      'Optimización de campañas para mayor retorno.',
      'Generación de contenido que posiciona en Google.'
    ],
    icon: MessageSquare,
    color: 'purple',
    niveles: {
      elemental: {
        nombre: 'ELEMENTAL',
        precio: 'Desde $249',
        precioNumerico: 249,
        objetivo: 'Marketing digital básico optimizado',
        descripcion: 'Ideal para emprendedores que quieren empezar con marketing inteligente',
        beneficios: [
          'Análisis básico de tu audiencia actual',
          'Optimización de 1 campaña publicitaria',
          'Creación de 10 posts para redes sociales',
          'Configuración de Google Analytics',
          'Reporte mensual de resultados',
          'Consultoría inicial de estrategia'
        ],
        caracteristicas: [
          '1 red social gestionada',
          'Presupuesto hasta $500/mes',
          '3 semanas de setup',
          'Soporte técnico 30 días',
          'Reportes mensuales',
          'Optimización básica'
        ],
        destacado: false,
        formularioId: '3-elemental'
      },
      moderado: {
        nombre: 'MODERADO',
        precio: 'Desde $449',
        precioNumerico: 449,
        objetivo: 'Estrategia integral de marketing con IA',
        descripcion: 'Para empresas que buscan resultados consistentes y escalables',
        beneficios: [
          'Análisis completo de mercado y competencia',
          'Gestión de múltiples campañas optimizadas',
          'Generación de contenido automatizada',
          'Segmentación avanzada con IA',
          'A/B testing continuo de anuncios',
          'Landing pages optimizadas',
          'Email marketing automatizado',
          'Dashboard de resultados en tiempo real'
        ],
        caracteristicas: [
          '3 redes sociales gestionadas',
          'Presupuesto hasta $2000/mes',
          '4 semanas de implementación',
          'Soporte técnico 90 días',
          'Reportes semanales',
          'Optimización continua'
        ],
        destacado: true,
        etiqueta: 'RECOMENDADO',
        formularioId: '3-moderado'
      },
      visionario: {
        nombre: 'VISIONARIO',
        precio: 'Desde $899',
        precioNumerico: 899,
        objetivo: 'Marketing omnicanal impulsado por IA',
        descripcion: 'La solución definitiva para empresas que quieren dominar su mercado',
        beneficios: [
          'IA personalizada para tu industria específica',
          'Campañas automatizadas en todos los canales',
          'Predicción de tendencias y comportamientos',
          'Personalización dinámica de contenido',
          'Integración completa con CRM y sistemas',
          'Optimización automática 24/7',
          'Consultoría estratégica semanal',
          'Acceso a herramientas premium de IA',
          'Análisis predictivo de ROI',
          'Soporte dedicado y prioritario'
        ],
        caracteristicas: [
          'Canales ilimitados',
          'Presupuesto ilimitado',
          '6 semanas de implementación',
          'Soporte VIP 1 año completo',
          'Estratega dedicado',
          'Resultados garantizados'
        ],
        destacado: false,
        premium: true,
        etiqueta: 'ENTERPRISE',
        formularioId: '3-visionario'
      }
    }
  },
  {
    id: 4,
    nombre: 'Consultoría en IA',
    categoria: 'consultoria-ia',
    subtitulo: 'IA Estratégica para tu Negocio',
    descripcion: 'Te ayudamos a integrar inteligencia artificial de manera estratégica en tu empresa.',
    descripcionGeneral: 'Implementamos estrategias de IA personalizadas para tu industria. Desde automatización de procesos hasta análisis predictivo, te ayudamos a aprovechar el poder de la inteligencia artificial para optimizar operaciones y acelerar el crecimiento.',
    incluye: [
      'Análisis de oportunidades de IA en tu negocio.',
      'Implementación de soluciones IA personalizadas.',
      'Capacitación del equipo en herramientas de IA.'
    ],
    icon: Cpu,
    color: 'orange',
    niveles: {
      elemental: {
        nombre: 'ELEMENTAL',
        precio: 'Desde $149',
        precioNumerico: 149,
        objetivo: 'Contenido básico para mantener presencia',
        descripcion: 'Perfecto para emprendedores que necesitan contenido consistente',
        beneficios: [
          '15 posts mensuales para 1 red social',
          'Calendarios de contenido mensuales',
          'Diseños básicos con tu branding',
          'Hashtags optimizados incluidos',
          'Programación automática de publicaciones',
          'Revisión y ajustes incluidos'
        ],
        caracteristicas: [
          '1 red social (Instagram o Facebook)',
          '15 publicaciones/mes',
          'Diseños simples incluidos',
          'Setup en 1 semana',
          'Soporte técnico 30 días',
          'Calendario editorial'
        ],
        destacado: false,
        formularioId: '4-elemental'
      },
      moderado: {
        nombre: 'MODERADO',
        precio: 'Desde $299',
        precioNumerico: 299,
        objetivo: 'Estrategia completa de contenido multicanal',
        descripcion: 'Para empresas que quieren destacar con contenido de calidad',
        beneficios: [
          '30 posts mensuales para múltiples redes',
          'Artículos de blog SEO optimizados',
          'Diseños profesionales con IA',
          'Videos cortos para reels y stories',
          'Estrategia de contenido personalizada',
          'Análisis de rendimiento incluido',
          'Adaptación a tendencias actuales',
          'Respuesta a comentarios automatizada'
        ],
        caracteristicas: [
          '3 redes sociales principales',
          '30 publicaciones + 4 artículos/mes',
          'Diseños premium y videos',
          'Setup en 2 semanas',
          'Soporte técnico 90 días',
          'Reportes de engagement'
        ],
        destacado: true,
        etiqueta: 'MÁS VENDIDO',
        formularioId: '4-moderado'
      },
      visionario: {
        nombre: 'VISIONARIO',
        precio: 'Desde $599',
        precioNumerico: 599,
        objetivo: 'Máquina de contenido empresarial',
        descripcion: 'La solución definitiva para marcas que quieren liderar en contenido',
        beneficios: [
          'Contenido ilimitado para todos los canales',
          'IA entrenada específicamente para tu marca',
          'Producción de videos profesionales',
          'Podcasts y contenido de audio',
          'Estrategia de thought leadership',
          'Colaboraciones e influencer marketing',
          'Contenido interactivo y dinámico',
          'Gestión completa de comunidad',
          'Análisis avanzado de performance',
          'Consultoría de marca mensual'
        ],
        caracteristicas: [
          'Todos los canales digitales',
          'Contenido diario + artículos semanales',
          'Videos y multimedia premium',
          'Setup en 3 semanas',
          'Soporte VIP 1 año completo',
          'Estratega de contenido dedicado'
        ],
        destacado: false,
        premium: true,
        etiqueta: 'PREMIUM',
        formularioId: '4-visionario'
      }
    }
  },
  {
    id: 5,
    nombre: 'Análisis de Datos',
    categoria: 'analisis-datos',
    subtitulo: 'Decisiones Basadas en Datos',
    descripcion: 'Convertimos tus datos en insights accionables para tomar mejores decisiones de negocio.',
    descripcionGeneral: 'Transformamos datos complejos en información clara y accionable. Implementamos dashboards, análisis predictivo y reportes automatizados que te ayudan a entender tu negocio y tomar decisiones estratégicas basadas en evidencia.',
    incluye: [
      'Dashboards interactivos y reportes en tiempo real.',
      'Análisis predictivo para planificación estratégica.',
      'Integración de múltiples fuentes de datos.'
    ],
    icon: BarChart3,
    color: 'indigo',
    color: 'indigo',
    niveles: {
      elemental: {
        nombre: 'ELEMENTAL',
        precio: 'Desde $179',
        precioNumerico: 179,
        objetivo: 'Optimización básica de marketplace',
        descripcion: 'Ideal para vendedores que quieren mejorar sus resultados iniciales',
        beneficios: [
          'Optimización de hasta 20 publicaciones',
          'Análisis básico de competencia',
          'Mejora de títulos y descripciones',
          'Configuración de precios competitivos',
          'Guía de mejores prácticas',
          'Soporte para dudas iniciales'
        ],
        caracteristicas: [
          '1 marketplace (MercadoLibre)',
          'Hasta 20 productos optimizados',
          '2 semanas de optimización',
          'Soporte técnico 30 días',
          'Manual de buenas prácticas',
          'Reporte de mejoras'
        ],
        destacado: false,
        formularioId: '5-elemental'
      },
      moderado: {
        nombre: 'MODERADO',
        precio: 'Desde $379',
        precioNumerico: 379,
        objetivo: 'Gestión completa y automatizada',
        descripcion: 'Para vendedores serios que buscan escalar sus operaciones',
        beneficios: [
          'Optimización completa de catálogo',
          'Automatización de respuestas y gestión',
          'Análisis profundo de competencia',
          'Estrategia de pricing dinámico',
          'Gestión de reputación y reviews',
          'Campañas publicitarias optimizadas',
          'Dashboard de control de ventas',
          'Capacitación en mejores prácticas'
        ],
        caracteristicas: [
          'Múltiples marketplaces',
          'Catálogo completo optimizado',
          '4 semanas de implementación',
          'Soporte técnico 90 días',
          'Automatizaciones incluidas',
          'Reportes de performance'
        ],
        destacado: true,
        etiqueta: 'MÁS EFICAZ',
        formularioId: '5-moderado'
      },
      visionario: {
        nombre: 'VISIONARIO',
        precio: 'Desde $699',
        precioNumerico: 699,
        objetivo: 'Ecosistema e-commerce empresarial',
        descripcion: 'La solución completa para empresas que quieren dominar el comercio digital',
        beneficios: [
          'Presencia optimizada en todos los marketplaces',
          'IA para optimización automática continua',
          'Integración completa con inventario y logística',
          'Análisis predictivo de demanda',
          'Estrategia omnicanal completa',
          'Gestión automatizada de campañas',
          'Consultoría estratégica semanal',
          'Expansión a nuevos mercados',
          'API personalizada para integraciones',
          'Garantía de aumento en ventas'
        ],
        caracteristicas: [
          'Todos los marketplaces principales',
          'Optimización continua automatizada',
          '6 semanas de implementación',
          'Soporte VIP 1 año completo',
          'Consultor e-commerce dedicado',
          'ROI garantizado'
        ],
        destacado: false,
        premium: true,
        etiqueta: 'ENTERPRISE',
        formularioId: '5-visionario'
      }
    }
  }
];

export const formularios = {
  // Formularios originales (mantener para compatibilidad)
  1: { titulo: 'Estás a un paso de tener tu web profesional.', subtitulo: 'Completa tus datos y un experto te contactará para explicarte cómo funciona, sin compromiso.', campos: [ { label: 'Nombre', name: 'nombre', type: 'text', required: true }, { label: 'Email de Contacto', name: 'email', type: 'email', required: true }, { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false }, { label: 'Si ya tienes una página web, déjanos el enlace aquí (Opcional)', name: 'web', type: 'text', required: false, help: 'Este campo nos ayuda a entender tu situación actual para darte una mejor recomendación.' } ], textoBoton: 'Solicitar mi Web Profesional', agradecimiento: '¡Gracias! Hemos recibido tu solicitud.\nUn experto de ALENIA te contactará en menos de 24 horas para conversar sobre tu proyecto.' },
  2: { titulo: 'Empecemos a automatizar tu negocio.', subtitulo: 'Cuéntanos un poco más para que un experto te contacte con una solución a tu medida.', campos: [ { label: 'Nombre', name: 'nombre', type: 'text', required: true }, { label: 'Email de Contacto', name: 'email', type: 'email', required: true }, { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false }, { label: 'Describe brevemente, ¿cuál es la tarea más repetitiva que te quita tiempo hoy?', name: 'tarea', type: 'textarea', required: false, help: 'Esto nos ayudará a identificar dónde podemos ayudarte a ahorrar más tiempo.' } ], textoBoton: 'Quiero mi Asistente Virtual', agradecimiento: '¡Gracias! Hemos recibido tu solicitud.\nUn experto de ALENIA te contactará en menos de 24 horas para mostrarte cómo empezar a automatizar.' },
  3: { titulo: 'Optimicemos juntos tus anuncios.', subtitulo: 'Completa los datos y un experto analizará cómo podemos mejorar tus resultados de marketing.', campos: [ { label: 'Nombre', name: 'nombre', type: 'text', required: true }, { label: 'Email de Contacto', name: 'email', type: 'email', required: true }, { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false }, { label: 'Actualmente, ¿cuál es tu principal objetivo de marketing?', name: 'objetivo', type: 'text', required: false, help: 'Ejemplos: Conseguir más clientes, vender más online, que más gente conozca mi marca.' } ], textoBoton: 'Quiero Optimizar mis Anuncios', agradecimiento: '¡Gracias! Hemos recibido tu solicitud.\nUn experto de ALENIA te contactará en menos de 24 horas para hablar sobre tus metas.' },
  4: { titulo: 'Deja el contenido de tus redes en nuestras manos.', subtitulo: 'Con estos datos, un experto te contactará para mostrarte cómo funciona y qué podemos crear para ti.', campos: [ { label: 'Nombre', name: 'nombre', type: 'text', required: true }, { label: 'Email de Contacto', name: 'email', type: 'email', required: true }, { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false }, { label: '¿En qué red social te gustaría mejorar tu presencia primero?', name: 'red', type: 'text', required: false, help: 'Ejemplos: Instagram, Facebook, LinkedIn, etc.' } ], textoBoton: 'Solicitar Contenido', agradecimiento: '¡Gracias! Hemos recibido tu solicitud.\nUn experto de ALENIA te contactará en menos de 24 horas con ideas para tu marca.' },
  5: { titulo: 'Es hora de dominar los marketplaces.', subtitulo: 'Danos un poco de información y un experto te contactará para potenciar tus ventas online.', campos: [ { label: 'Nombre', name: 'nombre', type: 'text', required: true }, { label: 'Email de Contacto', name: 'email', type: 'email', required: true }, { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false }, { label: 'Déjanos el enlace a tu tienda o a tu perfil de vendedor (Ej: MercadoLibre). (Opcional)', name: 'perfil', type: 'text', required: false, help: 'Esto nos permite analizar tu perfil antes de la llamada para darte mejores recomendaciones.' } ], textoBoton: 'Quiero Vender Más', agradecimiento: '¡Gracias! Hemos recibido tu solicitud.\nUn experto de ALENIA te contactará en menos de 24 horas para analizar cómo puedes vender más.' },
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

  // Automatización Inteligente
  '2-elemental': {
    titulo: 'Automatiza lo básico - Nivel ELEMENTAL',
    subtitulo: 'Un chatbot inteligente para WhatsApp que nunca duerme.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿Qué tipo de negocio tienes?', name: 'negocio', type: 'text', required: true },
      { label: '¿Cuántas consultas recibes por WhatsApp al día?', name: 'volumen', type: 'select', options: ['Menos de 10', '10-30', '30-50', 'Más de 50'], required: true },
      { label: '¿Cuáles son las 3 preguntas más frecuentes de tus clientes?', name: 'preguntas', type: 'textarea', required: true }
    ],
    textoBoton: 'Quiero mi Chatbot',
    agradecimiento: '¡Genial! Tu asistente virtual estará listo pronto.\nUn experto de ALENIA te contactará en 24 horas para configurar tu chatbot personalizado.'
  },
  '2-moderado': {
    titulo: 'Automatización completa - Nivel MODERADO',
    subtitulo: 'Asistente IA multicanal que gestiona todo tu embudo de ventas.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿En qué canales necesitas automatización?', name: 'canales', type: 'select', options: ['WhatsApp + Instagram', 'WhatsApp + Facebook', 'Todos los canales', 'Tengo dudas'], required: true },
      { label: '¿Usas algún CRM actualmente?', name: 'crm', type: 'select', options: ['No uso CRM', 'Excel/Hojas de cálculo', 'HubSpot', 'Otro CRM'], required: true },
      { label: '¿Cuál es tu mayor desafío con clientes actuales?', name: 'desafio', type: 'textarea', required: true }
    ],
    textoBoton: 'Automatizar mi Embudo',
    agradecimiento: '¡Excelente! Nunca más perderás un cliente potencial.\nUn experto de ALENIA te contactará en 24 horas para diseñar tu sistema de automatización completo.'
  },
  '2-visionario': {
    titulo: 'IA Empresarial - Nivel VISIONARIO',
    subtitulo: 'Inteligencia artificial que aprende y optimiza tu negocio 24/7.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono', name: 'telefono', type: 'tel', required: true },
      { label: 'Empresa/Organización', name: 'empresa', type: 'text', required: true },
      { label: '¿Cuántos empleados tiene tu empresa?', name: 'empleados', type: 'select', options: ['1-5', '6-20', '21-50', 'Más de 50'], required: true },
      { label: '¿Qué procesos internos consumen más tiempo?', name: 'procesos', type: 'textarea', required: true },
      { label: '¿Tienes equipo técnico interno?', name: 'equipo_tecnico', type: 'select', options: ['Sí, tengo equipo', 'Tengo algo de conocimiento', 'No, necesito soporte completo'], required: true }
    ],
    textoBoton: 'Solicitar Auditoría IA',
    agradecimiento: '¡Perfecto! Transformaremos tu empresa con IA empresarial.\nUn consultor en IA de ALENIA te contactará en 24 horas para una auditoría completa de oportunidades.'
  },

  // Marketing Digital con IA
  '3-elemental': {
    titulo: 'Marketing inteligente básico - Nivel ELEMENTAL',
    subtitulo: 'Campañas optimizadas que realmente convierten.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿En qué red social quieres enfocarte?', name: 'red_principal', type: 'select', options: ['Instagram', 'Facebook', 'LinkedIn', 'No estoy seguro'], required: true },
      { label: '¿Cuál es tu presupuesto mensual para publicidad?', name: 'presupuesto_ads', type: 'select', options: ['$100-$300', '$300-$500', '$500-$1000', 'Más de $1000'], required: true },
      { label: '¿Cuál es tu principal objetivo?', name: 'objetivo', type: 'select', options: ['Conseguir más clientes', 'Vender productos online', 'Aumentar reconocimiento de marca', 'Generar leads'], required: true }
    ],
    textoBoton: 'Optimizar mis Anuncios',
    agradecimiento: '¡Perfecto! Tus anuncios van a rendir mucho mejor.\nUn especialista en marketing de ALENIA te contactará en 24 horas para optimizar tus campañas.'
  },
  '3-moderado': {
    titulo: 'Estrategia integral con IA - Nivel MODERADO',
    subtitulo: 'Marketing omnicanal que escala con inteligencia artificial.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿En qué redes sociales tienes presencia?', name: 'redes_actuales', type: 'textarea', required: true },
      { label: '¿Tienes equipo de marketing interno?', name: 'equipo_marketing', type: 'select', options: ['Sí, tengo equipo', 'Solo yo', 'Contrato freelancers', 'No tengo equipo'], required: true },
      { label: '¿Cuál es tu ticket promedio de venta?', name: 'ticket_promedio', type: 'select', options: ['Menos de $50', '$50-$200', '$200-$500', 'Más de $500'], required: true },
      { label: '¿Qué herramientas de marketing usas?', name: 'herramientas', type: 'textarea', required: false }
    ],
    textoBoton: 'Escalar mi Marketing',
    agradecimiento: '¡Excelente! Tu marketing será imparable con IA.\nUn estratega digital de ALENIA te contactará en 24 horas para diseñar tu estrategia omnicanal.'
  },
  '3-visionario': {
    titulo: 'Dominio total del mercado - Nivel VISIONARIO',
    subtitulo: 'IA predictiva que anticipa tendencias y optimiza todo automáticamente.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono', name: 'telefono', type: 'tel', required: true },
      { label: 'Empresa/Organización', name: 'empresa', type: 'text', required: true },
      { label: '¿Cuáles son tus ingresos mensuales aproximados?', name: 'ingresos', type: 'select', options: ['$5k-$20k', '$20k-$50k', '$50k-$100k', 'Más de $100k'], required: true },
      { label: '¿En qué mercados quieres expandirte?', name: 'expansion', type: 'textarea', required: true },
      { label: '¿Cuál es tu mayor competidor?', name: 'competencia', type: 'text', required: false },
      { label: 'Presupuesto mensual total de marketing', name: 'presupuesto_total', type: 'select', options: ['$2k-$5k', '$5k-$10k', '$10k-$20k', 'Más de $20k'], required: true }
    ],
    textoBoton: 'Dominar mi Mercado',
    agradecimiento: '¡Perfecto! Vas a liderar tu industria con IA.\nUn consultor estratégico de ALENIA te contactará en 24 horas para planificar tu dominio total del mercado.'
  },

  // Generación de Contenido
  '4-elemental': {
    titulo: 'Contenido constante - Nivel ELEMENTAL',
    subtitulo: 'Nunca más te quedes sin ideas para publicar.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿Para qué red social necesitas contenido?', name: 'red_social', type: 'select', options: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok'], required: true },
      { label: '¿Qué tipo de negocio promocionas?', name: 'tipo_negocio', type: 'text', required: true },
      { label: '¿Tienes fotos/videos de tu negocio?', name: 'material_visual', type: 'select', options: ['Sí, tengo bastante', 'Tengo pocas', 'No tengo nada', 'No estoy seguro'], required: true }
    ],
    textoBoton: 'Generar mi Contenido',
    agradecimiento: '¡Genial! Tu feed siempre estará activo y atractivo.\nUn creador de contenido de ALENIA te contactará en 24 horas para comenzar a generar tu contenido.'
  },
  '4-moderado': {
    titulo: 'Contenido estratégico - Nivel MODERADO',
    subtitulo: 'Contenido que educa, entretiene y convierte en múltiples plataformas.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿En qué redes sociales quieres estar presente?', name: 'redes_multiples', type: 'textarea', required: true },
      { label: '¿Tienes blog en tu sitio web?', name: 'blog', type: 'select', options: ['Sí y lo actualizo', 'Sí pero está abandonado', 'No tengo blog', 'No tengo sitio web'], required: true },
      { label: '¿Cuál es tu expertise o de qué eres experto?', name: 'expertise', type: 'textarea', required: true },
      { label: '¿Participas en videos o prefieres solo texto/imágenes?', name: 'videos', type: 'select', options: ['Me gusta aparecer en videos', 'Solo ocasionalmente', 'Prefiero no salir', 'No estoy seguro'], required: true }
    ],
    textoBoton: 'Crear mi Estrategia',
    agradecimiento: '¡Excelente! Serás una autoridad en tu industria.\nUn estratega de contenido de ALENIA te contactará en 24 horas para diseñar tu plan editorial completo.'
  },
  '4-visionario': {
    titulo: 'Liderazgo de pensamiento - Nivel VISIONARIO',
    subtitulo: 'Conviértete en la voz líder de tu industria con contenido de clase mundial.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono', name: 'telefono', type: 'tel', required: true },
      { label: 'Empresa/Marca Personal', name: 'marca', type: 'text', required: true },
      { label: '¿Cuál es tu visión de liderazgo en tu industria?', name: 'vision_liderazgo', type: 'textarea', required: true },
      { label: '¿Tienes experiencia con podcasts, webinars o conferencias?', name: 'experiencia_multimedia', type: 'select', options: ['Sí, soy experimentado', 'Algo de experiencia', 'Principiante pero motivado', 'Nunca he hecho'], required: true },
      { label: '¿Con qué influencers o líderes te gustaría colaborar?', name: 'colaboraciones', type: 'textarea', required: false },
      { label: '¿Cuál es tu presupuesto mensual para contenido premium?', name: 'presupuesto_contenido', type: 'select', options: ['$600-$1000', '$1000-$2000', '$2000-$5000', 'Más de $5000'], required: true }
    ],
    textoBoton: 'Liderar mi Industria',
    agradecimiento: '¡Perfecto! Te convertiremos en el líder de tu industria.\nUn director creativo de ALENIA te contactará en 24 horas para planificar tu estrategia de thought leadership.'
  },

  // E-commerce
  '5-elemental': {
    titulo: 'Optimización básica - Nivel ELEMENTAL',
    subtitulo: 'Mejora tus ventas en marketplace con optimizaciones probadas.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿En qué marketplace vendes?', name: 'marketplace', type: 'select', options: ['MercadoLibre', 'Amazon', 'Shopify', 'Otro'], required: true },
      { label: '¿Cuántos productos tienes publicados?', name: 'cantidad_productos', type: 'select', options: ['1-10', '11-50', '51-100', 'Más de 100'], required: true },
      { label: 'Enlace a tu tienda (opcional)', name: 'enlace_tienda', type: 'text', required: false, help: 'Esto nos ayuda a hacer un análisis previo' }
    ],
    textoBoton: 'Optimizar mis Ventas',
    agradecimiento: '¡Perfecto! Tus productos van a destacar sobre la competencia.\nUn especialista en e-commerce de ALENIA te contactará en 24 horas para optimizar tu tienda.'
  },
  '5-moderado': {
    titulo: 'Gestión automatizada - Nivel MODERADO',
    subtitulo: 'Automatización completa de tu operación e-commerce.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono (Opcional)', name: 'telefono', type: 'tel', required: false },
      { label: '¿En qué marketplaces vendes?', name: 'marketplaces_multiples', type: 'textarea', required: true },
      { label: '¿Cuáles son tus ventas mensuales aproximadas?', name: 'ventas_mensuales', type: 'select', options: ['Menos de $1k', '$1k-$5k', '$5k-$20k', 'Más de $20k'], required: true },
      { label: '¿Cómo manejas el inventario actualmente?', name: 'inventario', type: 'select', options: ['Excel/manual', 'Sistema básico', 'Sistema avanzado', 'No tengo control'], required: true },
      { label: '¿Cuál es tu mayor problema operativo?', name: 'problema_operativo', type: 'textarea', required: true }
    ],
    textoBoton: 'Automatizar mi E-commerce',
    agradecimiento: '¡Excelente! Tu negocio online funcionará como relojería.\nUn especialista en automatización e-commerce de ALENIA te contactará en 24 horas para optimizar toda tu operación.'
  },
  '5-visionario': {
    titulo: 'Imperio e-commerce - Nivel VISIONARIO',
    subtitulo: 'Domina todos los canales de venta con IA y automatización empresarial.',
    campos: [
      { label: 'Nombre', name: 'nombre', type: 'text', required: true },
      { label: 'Email de Contacto', name: 'email', type: 'email', required: true },
      { label: 'Teléfono', name: 'telefono', type: 'tel', required: true },
      { label: 'Empresa', name: 'empresa', type: 'text', required: true },
      { label: '¿Cuáles son tus ingresos mensuales actuales?', name: 'ingresos_actuales', type: 'select', options: ['$10k-$50k', '$50k-$100k', '$100k-$500k', 'Más de $500k'], required: true },
      { label: '¿En qué mercados/países quieres expandirte?', name: 'expansion_geografica', type: 'textarea', required: true },
      { label: '¿Tienes equipo e-commerce actualmente?', name: 'equipo_ecommerce', type: 'select', options: ['Sí, equipo completo', 'Tengo algunas personas', 'Solo yo', 'Necesito armar equipo'], required: true },
      { label: '¿Qué sistemas ya tienes integrados?', name: 'sistemas_actuales', type: 'textarea', required: false, help: 'ERP, CRM, sistema de facturación, etc.' },
      { label: 'Presupuesto de inversión en crecimiento', name: 'presupuesto_inversion', type: 'select', options: ['$5k-$20k', '$20k-$50k', '$50k-$100k', 'Más de $100k'], required: true }
    ],
    textoBoton: 'Construir mi Imperio',
    agradecimiento: '¡Perfecto! Construiremos un imperio e-commerce imparable.\nUn consultor estratégico de ALENIA te contactará en 24 horas para diseñar tu plan de expansión total.'
  }
}