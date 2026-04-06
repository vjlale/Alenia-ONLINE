const defaultImage = '/images/apps/catalog-placeholder.svg';

export const appsCatalog = [
  {
    id: 'alenia-gestion-kontrol-v2-2',
    nombre: 'ALENIA-GESTION-KONTROL +V2.2',
    tipo: 'Cliente',
    plataformas: ['Desktop', 'Web'],
    tecnologias: ['Python', 'Tkinter', 'CustomTkinter', 'Flask', 'SQLite', 'Pandas', 'FPDF'],
    descripcion:
      'Sistema integral de gestión para PYMES que combina módulos CRM, inventario, ventas, gastos y reportes con distribución empaquetada.',
    estado: 'Producción',
    enfoque: ['Gestión empresarial', 'Backoffice'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/alenia-gestion-kontrol-v2-2.png'
  },
  {
    id: 'aleniahealth',
    nombre: 'AleniaHealth',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['Python', 'Flask', 'LLM MedGemma', 'Tailwind'],
    descripcion:
      'Plataforma web de consultas médicas asistidas por IA especializada (MedGemma) con respuestas contextualizadas para profesionales de salud.',
    estado: 'Beta privada',
    enfoque: ['Salud', 'IA generativa'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/aleniahealth.png'
  },
  {
    id: 'analizador-ecommerce-seo',
    nombre: 'Analizador Inteligente de E-commerce y SEO',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['TypeScript', 'React', 'Vite', 'Tailwind'],
    descripcion:
      'Dashboard inteligente que audita tiendas online, analiza SEO técnico y entrega recomendaciones automatizadas basadas en IA.',
    estado: 'Producción',
    enfoque: ['E-commerce', 'Marketing'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/analizador-ecommerce-seo.png'
  },
  {
    id: 'calculadora-mercado-libre',
    nombre: 'Calculadora Mercado Libre',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    descripcion:
      'Single Page Application que calcula precios optimizados para publicaciones Premium en Mercado Libre con desglose completo de comisiones e impuestos.',
    estado: 'Producción',
    enfoque: ['E-commerce'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/calculadora-mercado-libre.png'
  },
  {
    id: 'carga-masiva-import',
    nombre: 'ALENIA CargaMasiva',
    tipo: 'Cliente',
    plataformas: ['Desktop', 'Web'],
    tecnologias: ['Python', 'Flask', 'Pandas', 'PyInstaller'],
    descripcion:
      'Aplicación de escritorio con interfaz web para importación masiva de datos vía archivos CSV, automatizando procesos repetitivos internos.',
    estado: 'Producción',
    enfoque: ['Automatización', 'Backoffice'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/carga-masiva-import.png'
  },
  {
    id: 'converx-to-file',
    nombre: 'ConverX to File',
    tipo: 'Producto',
    plataformas: ['Web', 'PWA'],
    tecnologias: ['TypeScript', 'React', 'Vite', 'Service Worker'],
    descripcion:
      'Aplicación PWA para transformar archivos entre múltiples formatos con funcionamiento offline y experiencia instalable.',
    estado: 'Producción',
    enfoque: ['Productividad'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/converx-to-file.png'
  },
  {
    id: 'crm-startup-digital',
    nombre: 'CRM Startup Digital',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['Node.js', 'Express', 'React', 'Vite', 'Tailwind'],
    descripcion:
      'Solución CRM full-stack para startups digitales con gestión de clientes, prospectos y operaciones comerciales.',
    estado: 'Producción',
    enfoque: ['CRM', 'Ventas'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/crm-startup-digital.png'
  },
  {
    id: 'crm-startup-digital-utm',
    nombre: 'CRM Startup Digital UTM',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['Node.js', 'Express', 'React', 'Vite', 'Tailwind'],
    descripcion:
      'Versión extendida del CRM con tracking de parámetros UTM para campañas de marketing y atribución avanzada.',
    estado: 'Producción',
    enfoque: ['CRM', 'Marketing'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/crm-startup-digital-utm.png'
  },
  {
    id: 'drinking-app',
    nombre: 'DrinKing (Planificación)',
    tipo: 'Producto',
    plataformas: ['Mobile (Planificado)'],
    tecnologias: ['React Native', 'NestJS', 'Cloud Architecture'],
    descripcion:
      'Proyecto planificado de app móvil para experiencias en bares con definición completa de arquitectura, squads y procesos DevOps.',
    estado: 'Planificación',
    enfoque: ['Entretenimiento', 'Planificación'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/drinking-app.png'
  },
  {
    id: 'e-pix',
    nombre: 'E-pix',
    tipo: 'Producto',
    plataformas: ['Web', 'Android (TWA)', 'PWA'],
    tecnologias: ['React', 'TypeScript', 'Vite', 'TWA'],
    descripcion:
      'Suite de generación y edición de imágenes con IA distribuida como PWA y app Android mediante Trusted Web Activity.',
    estado: 'Producción',
    enfoque: ['IA generativa', 'Creatividad'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/e-pix.png'
  },
  {
    id: 'foodapp',
    nombre: 'FoodApp',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['TypeScript', 'NestJS', 'React', 'Tailwind'],
    descripcion:
      'Plataforma modular de servicios de comida con backend NestJS, app cliente y panel admin independientes.',
    estado: 'Producción',
    enfoque: ['Alimentación', 'Logística'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/foodapp.png'
  },
  {
    id: 'garden-compositor',
    nombre: 'Garden Compositor',
    tipo: 'Producto',
    plataformas: ['Web', 'Android (TWA)', 'PWA'],
    tecnologias: ['React', 'TypeScript', 'Vite', 'Gemini 2.5', 'JSZip'],
    descripcion:
      'PWA que compone escenas de jardín con IA, ajustando escala, perspectiva e iluminación y exportando variaciones optimizadas.',
    estado: 'Producción',
    enfoque: ['IA generativa', 'Arquitectura'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/garden-compositor.png'
  },
  {
    id: 'generador-turnos-trabajo',
    nombre: 'Generador de Turnos de Trabajo',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['TypeScript', 'React', 'Vite', 'date-fns'],
    descripcion:
      'Herramienta de planificación de turnos que calcula horarios óptimos según disponibilidad y reglas de negocio.',
    estado: 'Producción',
    enfoque: ['RRHH', 'Productividad'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/generador-turnos-trabajo.png'
  },
  {
    id: 'gestion-pilchero',
    nombre: 'GESTION-PILCHERO v1.0',
    tipo: 'Cliente',
    plataformas: ['Desktop'],
    tecnologias: ['Python', 'Tkinter', 'JSON Storage'],
    descripcion:
      'Sistema POS de escritorio para tiendas de ropa con control de inventario y registro de ventas, distribuido como ejecutable.',
    estado: 'Producción',
    enfoque: ['Retail', 'Backoffice'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/gestion-pilchero.png'
  },
  {
    id: 'policia-cordoba-web',
    nombre: 'Policía Córdoba Web',
    tipo: 'Cliente',
    plataformas: ['Web'],
    tecnologias: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    descripcion:
      'Portal institucional en construcción para la Policía de Córdoba con stack Next.js optimizado para SEO y despliegue en Vercel.',
    estado: 'En desarrollo',
    enfoque: ['Gobierno', 'Institucional'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/policia-cordoba-web.png'
  },
  {
    id: 'primeras-palabras-bebes',
    nombre: 'Primeras Palabras para Bebés',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['TypeScript', 'React', 'Vite', 'Howler.js'],
    descripcion:
      'Aplicación educativa interactiva tipo flashcards con soporte de audio y animaciones para aprender primeras palabras.',
    estado: 'Producción',
    enfoque: ['EdTech', 'Infancias'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/primeras-palabras-bebes.png'
  },
  {
    id: 'stage-visualizer-resolume',
    nombre: 'Stage Visualizer from Resolume XML',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['TypeScript', 'React', 'Vite', 'fast-xml-parser', 'react-konva'],
    descripcion:
      'Visualizador 2D para escenarios de eventos que parsea configuraciones XML de Resolume Arena y permite documentar montajes complejos.',
    estado: 'Producción',
    enfoque: ['Eventos', 'Visuales'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/stage-visualizer-resolume.png'
  }
];

export const catalogFilters = {
  tipos: ['Cliente', 'Producto'],
  plataformas: [
    'Web',
    'Desktop',
    'PWA',
    'Android (TWA)',
    'Mobile (Planificado)'
  ],
  enfoques: [
    'IA generativa',
    'Automatización',
    'CRM',
    'Marketing',
    'E-commerce',
    'Productividad',
    'RRHH',
    'Gobierno',
    'EdTech',
    'Eventos',
    'Salud',
    'Backoffice',
    'Entretenimiento',
    'Arquitectura',
    'Alimentación',
    'Logística',
    'Planificación'
  ]
};

