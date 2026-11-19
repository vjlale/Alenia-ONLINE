/*
 * Catálogo de /desarrollos-ia (solo lo usa src/pages/DesarrollosIA.jsx).
 * 2026-11-19 (revisión de diseño):
 * - Nombres comerciales en vez de nombres de archivo ("Kontrol+ (escritorio)", "Gestión Pilchero").
 * - Se unificaron "CRM Startup Digital" y "CRM Startup Digital UTM" en una sola tarjeta.
 * - Se sacaron los proyectos que solo estaban en planificación (DrinKing).
 * - El portal institucional ya no nombra al organismo.
 * - etiquetas: hasta 3 rótulos que entiende un dueño de negocio (se muestran en "Tecnologías clave").
 * - tecnologias: referencia interna del stack; no se muestra en la tarjeta.
 * - icono: nombre del ícono de lucide-react que usa la tarjeta (ver PROJECT_ICONS en DesarrollosIA.jsx).
 * - imagen: se dejó de mostrar porque eran ilustraciones genéricas hechas con IA, no capturas del producto.
 */
export const appsCatalog = [
  {
    id: 'alenia-gestion-kontrol-v2-2',
    nombre: 'Kontrol+ (escritorio)',
    tipo: 'Cliente',
    plataformas: ['Escritorio', 'Web'],
    tecnologias: ['Python', 'Tkinter', 'CustomTkinter', 'Flask', 'SQLite', 'Pandas', 'FPDF'],
    etiquetas: ['App de escritorio', 'App web', 'Reportes en PDF'],
    icono: 'LayoutDashboard',
    descripcion:
      'Sistema de gestión para pymes que junta clientes, stock, ventas, gastos y reportes en un solo programa, listo para instalar en la computadora del negocio.',
    estado: 'En producción',
    enfoque: ['Gestión', 'Administración'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/alenia-gestion-kontrol-v2-2.png'
  },
  {
    id: 'aleniahealth',
    nombre: 'ALENIA Health',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['Python', 'Flask', 'LLM MedGemma', 'Tailwind'],
    etiquetas: ['IA', 'App web'],
    icono: 'Stethoscope',
    descripcion:
      'Plataforma web de consultas médicas asistidas por una IA especializada en salud (MedGemma), con respuestas en contexto para profesionales.',
    estado: 'Beta privada',
    enfoque: ['Salud', 'IA'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/aleniahealth.png'
  },
  {
    id: 'analizador-ecommerce-seo',
    nombre: 'Analizador de E-commerce y SEO',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['TypeScript', 'React', 'Vite', 'Tailwind'],
    etiquetas: ['IA', 'App web', 'Posicionamiento en Google'],
    icono: 'SearchCheck',
    descripcion:
      'Panel que revisa tu tienda online, analiza cómo aparece en Google y te da recomendaciones concretas generadas con IA.',
    estado: 'En producción',
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
    etiquetas: ['App web', 'Mercado Libre'],
    icono: 'Calculator',
    descripcion:
      'Calculá a qué precio publicar en Mercado Libre (publicaciones Premium) con el detalle completo de comisiones e impuestos.',
    estado: 'En producción',
    enfoque: ['E-commerce'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/calculadora-mercado-libre.png'
  },
  {
    id: 'carga-masiva-import',
    nombre: 'Carga Masiva de datos',
    tipo: 'Cliente',
    plataformas: ['Escritorio', 'Web'],
    tecnologias: ['Python', 'Flask', 'Pandas', 'PyInstaller'],
    etiquetas: ['App de escritorio', 'Planillas CSV', 'Automatización'],
    icono: 'FileSpreadsheet',
    descripcion:
      'Programa para cargar muchos datos de una sola vez desde planillas CSV, que automatiza tareas repetitivas del día a día.',
    estado: 'En producción',
    enfoque: ['Automatización', 'Administración'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/carga-masiva-import.png'
  },
  {
    id: 'converx-to-file',
    nombre: 'ConverX to File',
    tipo: 'Producto',
    plataformas: ['Web', 'Instalable'],
    tecnologias: ['TypeScript', 'React', 'Vite', 'Service Worker'],
    etiquetas: ['App web', 'Instalable', 'Funciona sin internet'],
    icono: 'FileCog',
    descripcion:
      'App para convertir archivos entre distintos formatos. Se instala como cualquier app y funciona incluso sin internet.',
    estado: 'En producción',
    enfoque: ['Productividad'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/converx-to-file.png'
  },
  {
    // Unifica las antiguas tarjetas "CRM Startup Digital" y "CRM Startup Digital UTM".
    id: 'crm-startup-digital',
    nombre: 'CRM Startup Digital',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['Node.js', 'Express', 'React', 'Vite', 'Tailwind'],
    etiquetas: ['App web', 'Seguimiento de campañas'],
    icono: 'Contact',
    descripcion:
      'CRM para startups digitales: clientes, prospectos y ventas en un solo lugar, con seguimiento de campañas de marketing (UTM) para saber de dónde llega cada cliente.',
    estado: 'En producción',
    enfoque: ['CRM', 'Ventas'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/crm-startup-digital.png'
  },
  {
    id: 'e-pix',
    nombre: 'E-pix',
    tipo: 'Producto',
    plataformas: ['Web', 'Android', 'Instalable'],
    tecnologias: ['React', 'TypeScript', 'Vite', 'TWA'],
    etiquetas: ['IA', 'App web', 'Android'],
    icono: 'Image',
    descripcion:
      'Generación y edición de imágenes con IA. Funciona desde el navegador y también como app de Android.',
    estado: 'En producción',
    enfoque: ['IA', 'Diseño'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/e-pix.png'
  },
  {
    id: 'foodapp',
    nombre: 'FoodApp',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['TypeScript', 'NestJS', 'React', 'Tailwind'],
    etiquetas: ['App web', 'Panel de administración'],
    icono: 'Utensils',
    descripcion:
      'Plataforma para servicios de comida, con una app para los clientes y un panel de administración separado para el negocio.',
    estado: 'En producción',
    enfoque: ['Gastronomía', 'Logística'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/foodapp.png'
  },
  {
    id: 'garden-compositor',
    nombre: 'Garden Compositor',
    tipo: 'Producto',
    plataformas: ['Web', 'Android', 'Instalable'],
    tecnologias: ['React', 'TypeScript', 'Vite', 'Gemini 2.5', 'JSZip'],
    etiquetas: ['IA', 'App web', 'Android'],
    icono: 'Sprout',
    descripcion:
      'App que arma escenas de jardín con IA: ajusta escala, perspectiva e iluminación y exporta varias versiones listas para mostrar.',
    estado: 'En producción',
    enfoque: ['IA', 'Paisajismo'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/garden-compositor.png'
  },
  {
    id: 'generador-turnos-trabajo',
    nombre: 'Generador de Turnos de Trabajo',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['TypeScript', 'React', 'Vite', 'date-fns'],
    etiquetas: ['App web', 'Turnos automáticos'],
    icono: 'CalendarClock',
    descripcion:
      'Herramienta que arma los turnos de trabajo según la disponibilidad del equipo y las reglas de tu negocio.',
    estado: 'En producción',
    enfoque: ['Recursos humanos', 'Productividad'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/generador-turnos-trabajo.png'
  },
  {
    id: 'gestion-pilchero',
    nombre: 'Gestión Pilchero',
    tipo: 'Cliente',
    plataformas: ['Escritorio'],
    tecnologias: ['Python', 'Tkinter', 'JSON Storage'],
    etiquetas: ['App de escritorio', 'Punto de venta'],
    icono: 'Shirt',
    descripcion:
      'Sistema de punto de venta para tiendas de ropa, con control de stock y registro de ventas. Se instala en la computadora del local.',
    estado: 'En producción',
    enfoque: ['Comercio', 'Administración'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/gestion-pilchero.png'
  },
  {
    id: 'policia-cordoba-web',
    nombre: 'Portal institucional · organismo público',
    tipo: 'Cliente',
    plataformas: ['Web'],
    tecnologias: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    etiquetas: ['Sitio web', 'Pensado para Google'],
    icono: 'Landmark',
    descripcion:
      'Portal institucional para un organismo público, pensado para cargar rápido y aparecer bien en Google.',
    estado: 'En desarrollo',
    enfoque: ['Sector público', 'Institucional'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/policia-cordoba-web.png'
  },
  {
    id: 'primeras-palabras-bebes',
    nombre: 'Primeras Palabras para Bebés',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['TypeScript', 'React', 'Vite', 'Howler.js'],
    etiquetas: ['App web', 'Audio', 'Juego educativo'],
    icono: 'Baby',
    descripcion:
      'App educativa con tarjetas, sonidos y animaciones para que los más chicos aprendan sus primeras palabras.',
    estado: 'En producción',
    enfoque: ['Educación', 'Infancias'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/primeras-palabras-bebes.png'
  },
  {
    id: 'stage-visualizer-resolume',
    nombre: 'Stage Visualizer para Resolume',
    tipo: 'Producto',
    plataformas: ['Web'],
    tecnologias: ['TypeScript', 'React', 'Vite', 'fast-xml-parser', 'react-konva'],
    etiquetas: ['App web', 'Resolume'],
    icono: 'Projector',
    descripcion:
      'Visualizador 2D de escenarios para eventos: lee la configuración de Resolume Arena y te ayuda a documentar montajes complejos.',
    estado: 'En producción',
    enfoque: ['Eventos', 'Visuales'],
    enlaces: { sitio: null, repo: null, tienda: null, demo: null },
    imagen: '/images/apps/stage-visualizer-resolume.png'
  }
];

export const catalogFilters = {
  tipos: ['Cliente', 'Producto'],
  plataformas: ['Web', 'Escritorio', 'Instalable', 'Android'],
  enfoques: [
    'IA',
    'Automatización',
    'CRM',
    'Ventas',
    'Marketing',
    'E-commerce',
    'Productividad',
    'Recursos humanos',
    'Sector público',
    'Educación',
    'Eventos',
    'Salud',
    'Administración',
    'Gestión',
    'Comercio',
    'Diseño',
    'Paisajismo',
    'Gastronomía',
    'Logística'
  ]
};
