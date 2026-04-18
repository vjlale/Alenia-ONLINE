// Catálogo de apps desarrolladas por la startup Alen.iA.
// Para agregar una nueva app: pushear un objeto con la misma forma a este array.
//
// Campos clave:
//   - featured: si true, la tarjeta se renderiza en formato destacado (ancho completo).
//   - pricing: 'free' | 'paid' | 'freemium' (muestra badge en la tarjeta).
//   - fanpageUrl: URL externa (https://...) o ruta interna (/apps/xxx) de la fanpage.
//     Si es interna, el click navega dentro de la SPA; si es externa, abre en pestaña nueva.
//   - appUrl: URL de la app en sí (web/webapp). Se usa desde el modal como CTA final.
//   - useModal: si true, el click abre un modal con detalles (cuando no hay fanpage).
//   - mockupType: 'phone' | 'poster' — define el frame visual del preview.
//   - gallery: screenshots usados en la previsualización interactiva.
//   - modalContent: contenido extendido que renderiza AppDetailsModal.

export const startupApps = [
  {
    id: 'match-padel',
    name: 'Match Padel',
    tagline: 'La red social definitiva para jugadores de pádel',
    description:
      'Encontrá rivales de tu nivel, organizá partidos, sumate a desafíos, seguí tu ranking ELO y reservá canchas. Todo en una sola app pensada por y para la comunidad del pádel. Ya disponible en web — próximamente en Play Store y App Store.',
    category: 'Deporte · Social',
    status: null,
    pricing: 'free',
    platforms: ['Web'],
    upcomingPlatforms: ['iOS', 'Android'],
    stack: ['React Native', 'Node.js', 'PostgreSQL'],
    highlights: [
      'Matchmaking inteligente',
      'Ranking ELO',
      'Reservas de canchas',
      'Desafíos entre jugadores',
      'Perfil y estadísticas',
    ],
    logo: '/images/playpadel/match-padel-logo.png',
    screenshot: '/images/playpadel/home1.png',
    gallery: [
      '/images/playpadel/home1.png',
      '/images/playpadel/Ranking.png',
      '/images/playpadel/reservas.png',
      '/images/playpadel/desafio.png',
    ],
    mockupType: 'phone',
    fanpageUrl: 'https://www.appmatchpadel.com/landing',
    appUrl: 'https://www.appmatchpadel.com/landing',
    useModal: false,
    accentColor: '#22d3ee',
    accentColorSoft: '#0891b2',
    featured: true,
  },
  {
    id: 'e-pix',
    name: 'E-pix',
    tagline: 'Editor de fotos de productos con IA para e-commerce',
    description:
      'Convertí fotos simples de tus productos en imágenes profesionales listas para publicar. E-pix usa Google Gemini 2.5 para reemplazar fondos, generar escenas lifestyle, aplicar filtros y crear variantes de beneficios en segundos. Pensada para tiendas online, catálogos y campañas.',
    category: 'IA · E-commerce',
    status: 'En producción',
    pricing: 'paid',
    platforms: ['Web', 'Android'],
    upcomingPlatforms: ['iOS'],
    stack: ['React', 'TypeScript', 'Vite', 'Gemini 2.5'],
    highlights: [
      'Edición con prompts',
      'Eliminar fondo',
      'Escenas lifestyle',
      'Filtros profesionales',
      'Imágenes de beneficios',
      'Descarga masiva ZIP',
    ],
    logo: '/images/e-pix/logo.png',
    logoWide: '/images/e-pix/logo-completo.png',
    screenshot: '/images/e-pix/hero.png',
    gallery: [
      '/images/e-pix/hero.png',
      '/images/e-pix/ui-editor.png',
      '/images/e-pix/ui-controls.png',
      '/images/e-pix/backdrop.png',
    ],
    mockupType: 'poster',
    fanpageUrl: null,
    appUrl: 'https://e-pix.alenia.online',
    useModal: true,
    accentColor: '#a855f7',
    accentColorSoft: '#6366f1',
    featured: true,
    modalContent: {
      heroImage: '/images/e-pix/hero.png',
      backdropImage: '/images/e-pix/backdrop.png',
      logoWide: '/images/e-pix/logo-completo.png',
      priceNote:
        'App premium. Suscripción mensual con prueba gratuita a través de Google Play.',
      intro:
        'E-pix transforma fotografías comunes de productos en imágenes profesionales optimizadas para e-commerce. Todo el proceso se hace desde tu navegador o celular, sin editores pesados, sin conocimientos de diseño.',
      features: [
        {
          title: 'Edición con prompts',
          description:
            'Describí la escena que querés y la IA la genera sobre tu producto: "sobre una mesa de mármol", "al atardecer", "estilo editorial".',
          icon: 'Wand2',
        },
        {
          title: 'Eliminar fondo automáticamente',
          description:
            'Un clic y el fondo desaparece. Ideal para catálogos, Shopify, Mercado Libre e Instagram Shop.',
          icon: 'Eraser',
        },
        {
          title: 'Escenas lifestyle',
          description:
            'Colocá tu producto en ambientes reales: cocinas, escritorios, exteriores. Listo para marketing y RRSS.',
          icon: 'Sparkles',
        },
        {
          title: 'Filtros y ajustes finos',
          description:
            'Vintage, blanco y negro, sepia, más controles manuales de brillo, contraste, saturación y tono en tiempo real.',
          icon: 'SlidersHorizontal',
        },
        {
          title: 'Imágenes de beneficios',
          description:
            'Generá variantes que destacan características específicas con texto personalizado, perfectas para fichas de producto.',
          icon: 'Layers',
        },
        {
          title: 'Descarga masiva',
          description:
            'Empaquetá todas las versiones generadas en un ZIP listo para subir a tu tienda o entregar al cliente.',
          icon: 'Package',
        },
      ],
      useCases: [
        {
          title: 'Tiendas online',
          description:
            'Unificá el estilo visual de tu catálogo sin contratar un fotógrafo ni comprar un estudio.',
        },
        {
          title: 'Emprendedores y PyMEs',
          description:
            'Resolvé tus fotos de producto desde el celular, en minutos, con resultado profesional.',
        },
        {
          title: 'Agencias y marketers',
          description:
            'Generá piezas de campaña, variantes A/B y creatividades a escala sin cuellos de botella en diseño.',
        },
      ],
    },
  },
  {
    id: 'i-streem',
    name: 'i-Streem',
    tagline: 'Streaming WebRTC profesional iPhone → PC',
    description:
      'Transmití desde tu iPhone a cualquier PC o Mac con baja latencia, multi-viewer, telemetría en vivo y Health Check pre-show. Integración directa con OBS + Resolume vía Spout/NDI. Pensada para VJs, streamers y producciones en vivo.',
    category: 'Broadcast · WebRTC',
    status: 'En producción',
    pricing: 'free',
    platforms: ['Web', 'iOS', 'Android'],
    upcomingPlatforms: [],
    stack: ['React', 'TypeScript', 'Vite', 'WebRTC', 'STUN/TURN'],
    highlights: [
      'Baja latencia',
      'Multi-viewer',
      'Telemetría en vivo',
      'Health Check pre-show',
      'OBS + Resolume',
      'Spout / NDI',
    ],
    logo: '/images/i-streem/icon.png',
    logoWide: '/images/i-streem/logo.png',
    screenshot: '/images/i-streem/modo-estudio.png',
    gallery: [
      '/images/i-streem/modo-estudio.png',
      '/images/i-streem/health-check.png',
      '/images/i-streem/guia-resolume.png',
      '/images/i-streem/viewer.png',
    ],
    mockupType: 'poster',
    fanpageUrl: '/apps/i-streem',
    appUrl: 'https://i-streem.lovable.app',
    useModal: false,
    accentColor: '#22d3ee',
    accentColorSoft: '#0891b2',
    featured: true,
  },
];

export default startupApps;
