import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  Rocket,
  ChevronDown,
  Zap,
  Sparkles,
  ArrowRight,
  Camera,
  Calculator,
  Bot,
  Trophy,
  LayoutGrid,
  Briefcase,
  PartyPopper,
  Wand2,
} from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import AppShowcaseCard from '../components/apps/AppShowcaseCard';
import FreeToolCard from '../components/apps/FreeToolCard';
import { OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '../config/brand';

// Página /apps reconstruida desde el bundle publicado en aleniahub.com (2026-11-07).
// 2026-11-14: catálogo actualizado (Kontrol Pro, LiveVote, StageLab, Match Padel v6),
// filtros por categoría, precios reales y tarjeta del caso LaIA.
// 2026-11-19: revisión de diseño. Sello "Destacada" solo en Kontrol Pro, botones iguales en todas
// las tarjetas, mismas filas de datos (Plataformas e Ideal para), moneda explícita en los precios,
// nombres de las apps en lugar de direcciones *.lovable.app y sin puntajes inventados en las mini-apps.

const CANONICAL_URL = 'https://aleniahub.com/apps';

// Filtros del catálogo. Cada app declara en `filters` a cuáles pertenece.
const CATEGORY_FILTERS = [
  { id: 'todas', label: 'Todas', icon: LayoutGrid },
  { id: 'gestion', label: 'Gestión', icon: Briefcase },
  { id: 'eventos', label: 'Eventos y shows', icon: PartyPopper },
  { id: 'deporte', label: 'Deporte', icon: Trophy },
  { id: 'ia', label: 'IA y contenido', icon: Wand2 },
];

/*
 * Apps propias de la startup.
 * Campos (2026-11-19):
 * - featured: tarjeta a todo el ancho con galería automática. showFeaturedBadge: muestra el sello "Destacada".
 * - audience: fila "Ideal para" (todas las apps la tienen, junto con platforms).
 * Campos nuevos (2026-11-14):
 * - filters: ids de CATEGORY_FILTERS.
 * - priceLabel: texto del badge de precio con el monto (si falta, se usa `pricing`).
 * - gallery: strings o { src, fit: 'contain' } para imágenes que no deben recortarse.
 * - mockupType: 'phone' | 'poster' | 'desktop' (ventana de navegador, con mockupUrl y companionImage).
 * - modalContent.plans / planNote: planes que muestra AppDetailModal.
 * - secondaryLink: segundo enlace de la tarjeta y del modal ({ label, href }).
 */
const apps = [
  {
    id: 'kontrol-pro',
    name: 'Kontrol Pro',
    tagline: 'Hablale a tu negocio. Él te responde.',
    description:
      'Gestión integral con un asistente de IA que te atiende por WhatsApp y Telegram. Ventas, finanzas, inventario, sueldos y logística: los cargás con un audio y el sistema hace el resto.',
    category: 'Gestión · IA',
    filters: ['gestion', 'ia'],
    status: 'En producción',
    pricing: 'paid',
    priceLabel: 'Desde ARS $20.000/mes',
    platforms: ['Web instalable'],
    highlights: ['Asistente por WhatsApp y Telegram', 'Carga por audio', 'Ventas y finanzas', 'Inventario', 'Sueldos', 'Logística'],
    audience: ['Comercios', 'Pymes', 'Negocios con stock y empleados'],
    logo: '/images/kontrol-pro/logo.png',
    screenshot: '/images/kontrol-pro/dashboard.webp',
    gallery: ['/images/kontrol-pro/dashboard.webp'],
    mockupType: 'desktop',
    mockupUrl: 'kontrolpro.app',
    appUrl: 'https://kontrolpro.app/',
    useModal: true,
    modalCtaLabel: 'Ver planes',
    ctaLabel: 'Ir a kontrolpro.app',
    accentColor: '#C97A3D',
    accentColorSoft: '#24703A',
    ctaTextColor: '#fbf7ee',
    featured: true,
    showFeaturedBadge: true,
    modalContent: {
      logoWide: '/images/kontrol-pro/logo-full.webp',
      intro:
        'Kontrol Pro es un sistema de gestión completo con un asistente de IA que escucha. Le hablás como a un empleado: le mandás un audio, un comprobante o una pregunta, y él anota, organiza y responde. Todo queda visible al instante en la app: caja, cheques, stock y sueldos.',
      features: [
        {
          title: 'Asistente por WhatsApp y Telegram',
          description: 'Preguntale en lenguaje natural, por ejemplo "¿cuánto vendí hoy?", y te responde con tus números.',
          icon: 'MessagesSquare',
        },
        {
          title: 'Cargá todo con un audio',
          description: 'Gastos, ventas y sueldos se registran a partir de un audio. También lee comprobantes de transferencia.',
          icon: 'Mic',
        },
        {
          title: 'Ventas y finanzas',
          description: 'Cobranzas, cuenta corriente, cheques, gastos fijos, liquidez y P&L en un mismo lugar.',
          icon: 'Wallet',
        },
        {
          title: 'Inventario y stock',
          description: 'Alertas de stock bajo e historial de precios para no quedarte sin mercadería.',
          icon: 'Package',
        },
        {
          title: 'Empleados y sueldos',
          description: 'Adelantos y liquidaciones, que también se pueden cargar por audio.',
          icon: 'Users',
        },
        {
          title: 'Logística de envíos',
          description: 'Organizá las entregas con rutas optimizadas.',
          icon: 'Truck',
        },
      ],
      plans: [
        {
          name: 'Básico',
          price: 'ARS $20.000',
          period: '/mes',
          features: ['Stock, ventas, cobranzas y caja', 'Cheques, gastos fijos y P&L', 'Liquidez y proyecciones', 'Asistente por Telegram (audio y texto)', 'Recordatorios automáticos'],
        },
        {
          name: 'Intermedio',
          price: 'ARS $38.000',
          period: '/mes',
          badge: 'El más elegido',
          highlighted: true,
          features: ['Todo lo del Básico', 'Asistente por WhatsApp', 'Transcripción de audios', 'Lectura de comprobantes con IA', 'Cierre del día conversacional'],
        },
        {
          name: 'Premium',
          price: 'ARS $65.000',
          period: '/mes',
          features: ['Todo lo del Intermedio', 'Presupuestos con IA y renders', 'Logística y rutas optimizadas', 'Gestión avanzada de empleados', 'Multisucursal'],
        },
      ],
      planNote: 'Prueba gratis de 7 días, sin tarjeta. Setup único de ARS $50.000 con la instalación asistida y el onboarding incluidos.',
    },
  },
  {
    id: 'livevote',
    name: 'LiveVote',
    tagline: 'El público vota desde el celular. La pantalla lo muestra en vivo.',
    description:
      'Votación en vivo para eventos: el público escanea un QR y vota desde el celular, sin descargas ni registro. Los resultados se mueven en la pantalla LED en tiempo real.',
    category: 'Eventos · En vivo',
    filters: ['eventos'],
    status: 'En producción',
    platforms: ['Web', 'Pantalla LED'],
    highlights: ['Voto con QR', 'Sin descargas ni registro', 'Resultados en tiempo real', 'Barra de tiempo', 'Ganador con confeti', 'Salida 1920×1080 para OBS y Resolume'],
    audience: ['Boliches', 'Shows', 'Eventos de marca'],
    logoIcon: 'Vote',
    screenshot: '/images/livevote/pantalla-led.webp',
    gallery: ['/images/livevote/pantalla-led.webp', '/images/livevote/panel-admin.webp'],
    companionImage: '/images/livevote/voto-celular.webp',
    mockupType: 'desktop',
    // En la barra del navegador se muestra el nombre de la app; el enlace real sigue en appUrl.
    mockupUrl: 'LiveVote',
    appUrl: 'https://interglock.lovable.app',
    useModal: false,
    ctaLabel: 'Probar LiveVote',
    accentColor: '#ec4899',
    accentColorSoft: '#8b5cf6',
    featured: true,
  },
  {
    id: 'stagelab',
    name: 'StageLab',
    tagline: 'Diseñá tu próximo show en 3D antes de pisar el escenario.',
    description:
      'Estudio 3D en el navegador para diseñar shows: armás trusses, luces y pantallas LED en una sala con tus medidas, lo ves en modo show y lo recorrés en primera persona. Y si se lo pedís, una IA arma la escena por vos.',
    category: 'Eventos · 3D',
    filters: ['eventos', 'ia'],
    status: 'En producción',
    pricing: 'freemium',
    priceLabel: 'Gratis, con plan Pro opcional',
    platforms: ['Web'],
    highlights: ['Trusses y luces', 'Pantallas LED', 'Sala a medida', 'Modo show', 'Recorrido en primera persona', 'Escena armada por IA'],
    audience: ['VJs', 'Iluminadores', 'Productoras'],
    logoIcon: 'Boxes',
    screenshot: '/images/stagelab/stage-plot.webp',
    gallery: [
      '/images/stagelab/stage-plot.webp',
      '/images/stagelab/modo-show.webp',
      '/images/stagelab/luces.webp',
      { src: '/images/stagelab/plano-sala.webp', fit: 'contain' },
    ],
    mockupType: 'desktop',
    mockupUrl: 'StageLab',
    appUrl: 'https://stagelab.lovable.app',
    useModal: true,
    modalCtaLabel: 'Ver planes',
    ctaLabel: 'Probar StageLab',
    accentColor: '#38bdf8',
    accentColorSoft: '#c026d3',
    featured: true,
    modalContent: {
      intro:
        'StageLab es un estudio 3D en el navegador. Armás trusses, luces y pantallas LED en una sala con tus medidas reales, ves cómo queda en modo show y recorrés el espacio en primera persona. Y si querés, la IA arma la escena por vos.',
      features: [
        { title: 'Sala a medida', description: 'Cargás el ancho, el fondo y el alto reales de la sala o el escenario.', icon: 'Move3d' },
        { title: 'Luces de show', description: 'Beams, wash, blinders y más, con movimientos en loop y sincronía con el BPM.', icon: 'Lightbulb' },
        { title: 'Pantallas LED', description: 'Una imagen o un video por pantalla para previsualizar el contenido.', icon: 'Tv' },
        { title: 'Estructuras', description: 'Truss recto, en arco y circular para armar el escenario.', icon: 'Boxes' },
        { title: 'Primera persona', description: 'Recorré el espacio caminando, como si ya estuvieras en el venue.', icon: 'Footprints' },
        { title: 'Asistente IA', description: 'Pedile la escena con palabras y la IA la arma por vos.', icon: 'Wand2' },
      ],
      plans: [
        { name: 'Gratis', price: 'Sin costo', features: ['Creá tu cuenta', 'Empezá a diseñar tus escenas'] },
        {
          name: 'Pro',
          price: 'A consultar',
          badge: 'Para shows seguidos',
          highlighted: true,
          features: ['Para VJs e iluminadores que arman shows seguido'],
        },
      ],
      planNote: 'El precio del plan Pro todavía no está publicado. Escribinos y te lo pasamos.',
    },
  },
  {
    id: 'match-padel',
    name: 'Match Padel',
    tagline: 'La gestión del club y la comunidad del pádel, en una sola app',
    description:
      'Reservas, ligas y torneos, clases, perfil del club y novedades para tus jugadores. La seña se cobra con Mercado Pago y las métricas de ocupación y actividad quedan a la vista del club.',
    category: 'Deporte · Clubes',
    filters: ['deporte', 'gestion'],
    status: 'En producción',
    platforms: ['Web instalable'],
    upcomingPlatforms: ['iOS', 'Android'],
    highlights: ['Reservas', 'Ligas y torneos', 'Clases', 'Perfil del club', 'Novedades', 'Seña con Mercado Pago', 'Métricas'],
    audience: ['Clubes de pádel', 'Jugadores'],
    logo: '/images/playpadel/match-padel-logo.png',
    screenshot: '/images/playpadel/v6/inicio-club.webp',
    gallery: [
      '/images/playpadel/v6/inicio-club.webp',
      '/images/playpadel/v6/reservas.webp',
      '/images/playpadel/v6/ligas.webp',
      '/images/playpadel/v6/clases.webp',
      '/images/playpadel/v6/perfil-club.webp',
    ],
    mockupType: 'phone',
    fanpageUrl: 'https://www.appmatchpadel.com/landing',
    appUrl: 'https://www.appmatchpadel.com/landing',
    useModal: false,
    ctaLabel: 'Conocé Match Padel',
    accentColor: '#22c55e',
    accentColorSoft: '#15803d',
    featured: true,
  },
  {
    id: 'i-streem',
    name: 'i-Streem',
    tagline: 'Streaming WebRTC profesional iPhone → PC',
    description:
      'Transmití desde tu iPhone a cualquier PC o Mac con baja latencia, multi-viewer, telemetría en vivo y Health Check pre-show. Integración directa con OBS y Resolume vía Spout/NDI. Pensada para VJs, streamers y producciones en vivo.',
    category: 'Broadcast · WebRTC',
    filters: ['eventos', 'ia'],
    status: 'En producción',
    pricing: 'paid',
    priceLabel: 'USD 4/mes',
    platforms: ['Web', 'iOS', 'Android'],
    upcomingPlatforms: [],
    highlights: ['Baja latencia', 'Multi-viewer', 'Telemetría en vivo', 'Health Check pre-show', 'OBS + Resolume', 'Spout / NDI'],
    audience: ['VJs', 'Streamers', 'Producciones en vivo'],
    logo: '/images/i-streem/icon.png',
    screenshot: '/images/i-streem/modo-estudio.png',
    gallery: [
      '/images/i-streem/modo-estudio.png',
      '/images/i-streem/health-check.png',
      '/images/i-streem/guia-resolume.png',
      '/images/i-streem/viewer.png',
    ],
    mockupType: 'poster',
    appUrl: 'https://i-streem.lovable.app',
    useModal: true,
    modalCtaLabel: 'Ver planes',
    // Ruta interna: la landing de i-Streem dentro del sitio
    secondaryLink: { label: 'Ver la landing', href: '/apps/i-streem' },
    accentColor: '#22d3ee',
    accentColorSoft: '#0891b2',
    featured: false,
    modalContent: {
      intro:
        'i-Streem convierte tu iPhone en una cámara profesional para tus shows y transmisiones. Mandás la señal por WebRTC a tu PC o Mac con baja latencia y la tomás directo en OBS o Resolume.',
      features: [
        { title: 'Del iPhone a tu PC o Mac', description: 'Usá la cámara del iPhone como fuente de video para tu producción.', icon: 'Smartphone' },
        { title: 'Baja latencia', description: 'Transmisión WebRTC pensada para trabajar en vivo.', icon: 'Radio' },
        { title: 'Multi-viewer', description: 'Varias señales a la vista para manejar la producción.', icon: 'Layers' },
        { title: 'Telemetría en vivo', description: 'Seguí el estado de la transmisión mientras dura el show.', icon: 'Sparkles' },
        { title: 'Health Check pre-show', description: 'Revisá la conexión antes de salir al aire.', icon: 'Check' },
        { title: 'OBS + Resolume', description: 'Integración directa vía Spout y NDI.', icon: 'Video' },
      ],
      plans: [
        { name: 'Mensual', price: 'USD 4', period: '/mes', features: ['Todas las funciones'] },
        {
          name: 'Anual',
          price: 'USD 39',
          period: '/año',
          badge: 'Ahorrás USD 9',
          highlighted: true,
          features: ['Todas las funciones', 'Equivale a USD 3,25 por mes'],
        },
      ],
      planNote: 'Probala gratis durante 30 días.',
    },
  },
  {
    id: 'e-pix',
    name: 'E-pix',
    tagline: 'Editor de fotos de productos con IA para e-commerce',
    description:
      'Convertí fotos simples de tus productos en imágenes profesionales listas para publicar. E-pix usa IA para reemplazar fondos, generar escenas lifestyle, aplicar filtros y crear variantes de beneficios en segundos. Pensada para tiendas online, catálogos y campañas.',
    category: 'IA · E-commerce',
    filters: ['ia'],
    status: 'En producción',
    pricing: 'paid',
    priceLabel: 'Premium: consultá precio',
    platforms: ['Web', 'Android'],
    upcomingPlatforms: ['iOS'],
    audience: ['Tiendas online', 'Emprendedores y pymes', 'Agencias'],
    highlights: [
      'Edición con prompts',
      'Eliminar fondo',
      'Escenas lifestyle',
      'Filtros profesionales',
      'Imágenes de beneficios',
      'Descarga masiva ZIP',
    ],
    logo: '/images/e-pix/logo.png',
    screenshot: '/images/e-pix/hero.png',
    gallery: ['/images/e-pix/hero.png', '/images/e-pix/ui-editor.png', '/images/e-pix/ui-controls.png', '/images/e-pix/backdrop.png'],
    mockupType: 'poster',
    fanpageUrl: null,
    appUrl: 'https://e-pix.alenia.online',
    useModal: true,
    accentColor: '#a855f7',
    accentColorSoft: '#6366f1',
    featured: false,
    modalContent: {
      heroImage: '/images/e-pix/hero.png',
      backdropImage: '/images/e-pix/backdrop.png',
      logoWide: '/images/e-pix/logo-completo.png',
      priceNote: 'App premium. Suscripción mensual con prueba gratuita a través de Google Play.',
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
          description: 'Un clic y el fondo desaparece. Ideal para catálogos, Shopify, Mercado Libre e Instagram Shop.',
          icon: 'Eraser',
        },
        {
          title: 'Escenas lifestyle',
          description: 'Colocá tu producto en ambientes reales: cocinas, escritorios, exteriores. Listo para marketing y RRSS.',
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
          description: 'Empaquetá todas las versiones generadas en un ZIP listo para subir a tu tienda o entregar al cliente.',
          icon: 'Package',
        },
      ],
      useCases: [
        {
          title: 'Tiendas online',
          description: 'Unificá el estilo visual de tu catálogo sin contratar un fotógrafo ni comprar un estudio.',
        },
        {
          title: 'Emprendedores y PyMEs',
          description: 'Resolvé tus fotos de producto desde el celular, en minutos, con resultado profesional.',
        },
        {
          title: 'Agencias y marketers',
          description:
            'Generá piezas de campaña, variantes A/B y creatividades a escala sin cuellos de botella en diseño.',
        },
      ],
    },
  },
];

// Caso de éxito destacado (la página /casos/laia la arma otra parte del sitio).
const caseStudy = {
  name: 'LaIA',
  logo: '/images/laia/logo-laia-line.webp',
  href: '/casos/laia',
  title: 'La lavandería que atiende sola',
  description:
    'Una lavandería self-service abierta 24/7 y sin personal, creada por un fundador junto a un equipo de agentes de IA en 69 días.',
  stats: [
    { value: '24/7', label: 'Abierta todos los días' },
    { value: '0', label: 'Personal en el local' },
    { value: '69', label: 'Días de desarrollo' },
  ],
};

// Herramientas gratuitas (sección "Bonus").
// Se sacaron: Analizador de Competencia, Generador de Hashtags y Optimizador de SEO.
// 2026-11-19: se sacaron los puntajes y la cantidad de usuarios (no eran datos verificables).
const freeTools = [
  {
    id: 'picshop',
    name: 'PicShop',
    description: 'Transformá tus productos en fichas listas para publicar en tu tienda online.',
    icon: <Camera className="h-5 w-5" />,
    color: 'teal',
    link: '/apps/picshop',
    timeToComplete: '5 min',
  },
  {
    id: 'roi',
    name: 'Calculadora de ROI',
    description: 'Calculá el retorno de tus proyectos e inversiones en tecnología y automatización.',
    icon: <Calculator className="h-5 w-5" />,
    color: 'green',
    link: '/apps/calculadora-roi',
    timeToComplete: '5 min',
  },
  {
    id: 'automatizaciones',
    name: 'Simulador de Automatizaciones',
    description: 'Mirá paso a paso cómo funciona un local con máquinas conectadas: pago, activación, accesos y control.',
    icon: <Bot className="h-5 w-5" />,
    color: 'orange',
    link: '/apps/simulador-automatizaciones',
    timeToComplete: '20 min',
  },
];

/*
 * Arma las filas del catálogo: las destacadas van a todo el ancho (con la imagen
 * alternando de lado) y las demás de a dos. Si una no destacada queda sola, va a todo el ancho.
 */
function buildRows(list) {
  const rows = [];
  list.forEach((app) => {
    const last = rows[rows.length - 1];
    if (app.featured) {
      rows.push({ type: 'full', items: [app] });
    } else if (last && last.type === 'pair' && last.items.length === 1) {
      last.items.push(app);
    } else {
      rows.push({ type: 'pair', items: [app] });
    }
  });
  return rows.map((row) => (row.type === 'pair' && row.items.length === 1 ? { ...row, type: 'full' } : row));
}

/*
 * Envoltorio de AppShowcaseCard con ajustes de esta página:
 * - Botones de acción iguales en todas las tarjetas (alto, ancho mínimo, padding, radio rounded-xl y peso
 *   de letra); cada app conserva su color. Aplica al botón principal y al secundario.
 * - Oculta el sello "Destacada" salvo en las apps con showFeaturedBadge.
 * Se resuelve desde acá con variantes de Tailwind porque AppShowcaseCard lo mantiene otra parte del sitio;
 * si se edita ese componente, conviene pasar estos estilos adentro y borrar este envoltorio.
 */
const CARD_ACTION_CLASSES = [
  '[&_.mt-auto_a]:h-12 [&_.mt-auto_button]:h-12',
  '[&_.mt-auto_a]:min-w-[200px] [&_.mt-auto_button]:min-w-[200px]',
  '[&_.mt-auto_a]:justify-center [&_.mt-auto_button]:justify-center',
  '[&_.mt-auto_a]:rounded-xl [&_.mt-auto_button]:rounded-xl',
  '[&_.mt-auto_a]:px-6 [&_.mt-auto_button]:px-6',
  '[&_.mt-auto_a]:py-0 [&_.mt-auto_button]:py-0',
  '[&_.mt-auto_a]:text-sm [&_.mt-auto_button]:text-sm',
  '[&_.mt-auto_a]:font-semibold [&_.mt-auto_button]:font-semibold',
  '[&_.mt-auto_button]:flex-none',
  '[&_.mt-auto_button_svg]:h-4 [&_.mt-auto_button_svg]:w-4',
].join(' ');
const HIDE_FEATURED_BADGE_CLASS = '[&_header_.text-amber-300]:hidden';

function CatalogCard({ app, ...props }) {
  const className = ['h-full', CARD_ACTION_CLASSES, app.showFeaturedBadge ? '' : HIDE_FEATURED_BADGE_CLASS]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={className}>
      <AppShowcaseCard app={app} {...props} />
    </div>
  );
}

// Texto con gradiente animado (equivalente al AnimatedGradient del bundle publicado,
// que renderiza un <span> inline con el gradiente recortado al texto).
function HeroGradientText({ children }) {
  return (
    <motion.span
      className="bg-gradient-animated apps-hero-gradient"
      style={{
        display: 'inline-block',
        maxWidth: '100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        backgroundSize: '400% 400%',
      }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );
}

// Gradiente fijo recortado al texto (para títulos que no necesitan animación).
function GradientText({ children, from, to }) {
  return (
    <span
      style={{
        display: 'inline-block',
        maxWidth: '100%',
        backgroundImage: `linear-gradient(120deg, ${from} 0%, ${to} 100%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {children}
    </span>
  );
}

function HeroStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm sm:p-4">
      <div className="font-display text-3xl font-extrabold text-white md:text-4xl">{value}</div>
      <div className="mt-1 text-[9px] font-semibold uppercase leading-snug tracking-[0.04em] text-white/40 sm:text-[10px] sm:tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}

// Tarjeta del caso de éxito LaIA (navy, dorado y celeste, como su logo).
function CaseStudyCard({ data }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const gold = '#d9b25f';
  const cyan = '#38bdf8';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={data.href}
        className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1730] via-[#08101f] to-black shadow-2xl shadow-black/60 transition-colors hover:border-white/20"
        aria-label={`Ver cómo se creó ${data.name}`}
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl opacity-40"
          style={{ background: `radial-gradient(circle, ${cyan}66, transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle, ${gold}66, transparent 70%)` }}
        />

        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12 lg:p-12">
          <div className="flex items-center justify-center">
            {logoFailed ? (
              <div className="font-display text-6xl font-black tracking-tight sm:text-7xl">
                <GradientText from={gold} to={cyan}>
                  LaIA
                </GradientText>
              </div>
            ) : (
              <img
                src={data.logo}
                alt="Logo de LaIA"
                className="w-full max-w-[360px] object-contain drop-shadow-[0_0_40px_rgba(56,189,248,0.25)] transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
                onError={() => setLogoFailed(true)}
              />
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                style={{ borderColor: `${gold}66`, backgroundColor: `${gold}14`, color: gold }}
              >
                <Trophy className="h-3 w-3" />
                Caso de éxito
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                ALENIA HUB
              </span>
            </div>

            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              <GradientText from={gold} to={cyan}>
                {data.name}
              </GradientText>
              : {data.title}
            </h2>
            <p className="text-base leading-relaxed text-white/70 md:text-lg">{data.description}</p>

            <div className="grid grid-cols-3 gap-3">
              {data.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
                  <div className="font-display text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-white/50 sm:text-[11px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <span
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#08101f] transition-transform group-hover:translate-x-0.5"
              style={{ background: `linear-gradient(135deg, ${gold} 0%, ${cyan} 100%)` }}
            >
              Ver cómo se creó LaIA
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Apps() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [activeFilter, setActiveFilter] = useState('todas');

  useEffect(() => {
    const onMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const totalApps = apps.length;
  const appsInProduction = apps.filter((app) => app.status === 'En producción').length;
  // Rubros que cubre el catálogo (los filtros, sin contar "Todas")
  const totalCategories = CATEGORY_FILTERS.filter((filter) => filter.id !== 'todas').length;

  const filterCounts = useMemo(
    () =>
      Object.fromEntries(
        CATEGORY_FILTERS.map((filter) => [
          filter.id,
          filter.id === 'todas' ? apps.length : apps.filter((app) => app.filters?.includes(filter.id)).length,
        ])
      ),
    []
  );

  const rows = useMemo(() => {
    const list = activeFilter === 'todas' ? apps : apps.filter((app) => app.filters?.includes(activeFilter));
    return buildRows(list);
  }, [activeFilter]);

  // La imagen de las tarjetas a todo el ancho alterna de lado.
  let fullIndex = 0;

  return (
    <>
      <Helmet>
        <title>Apps de la startup ALENIA — Nuestras apps en producción</title>
        <meta
          name="description"
          content="Conocé las apps desarrolladas por la startup ALENIA: Kontrol Pro, LiveVote, StageLab, Match Padel, i-Streem y E-pix. Productos digitales reales, con precios y planes."
        />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:title" content="Apps de la startup ALENIA" />
        <meta
          property="og:description"
          content="Kontrol Pro, LiveVote, StageLab, Match Padel, i-Streem y E-pix: nuestras apps en producción."
        />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:alt" content="ALENIA - Apps de la startup" />
        <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={CANONICAL_URL} />
        <meta property="twitter:title" content="Apps de la startup ALENIA" />
        <meta
          property="twitter:description"
          content="Kontrol Pro, LiveVote, StageLab, Match Padel, i-Streem y E-pix: productos digitales reales."
        />
        <meta property="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <main className="relative min-h-screen overflow-hidden bg-alenia-dark">
        {/* Luz que sigue al mouse */}
        <div
          className="pointer-events-none fixed inset-0 opacity-30"
          style={{
            background: `radial-gradient(800px circle at ${mouse.x}% ${mouse.y}%, rgba(0,255,136,0.08), transparent 50%)`,
          }}
        />
        {/* Grilla sutil */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Hero */}
        <section className="relative min-h-[80vh] pt-28 pb-12">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto max-w-6xl px-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Link
                to="/"
                className="group mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Volver al inicio
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-alenia-primary/30 bg-alenia-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-alenia-primary"
            >
              <Rocket className="h-3.5 w-3.5" />
              Startup ALENIA
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            >
              Nuestras <HeroGradientText>Apps</HeroGradientText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
            >
              Productos digitales reales desarrollados por nuestra startup: gestión para tu negocio, herramientas para
              eventos y shows, deporte e IA. Software que pensamos, lanzamos y hacemos crecer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid max-w-2xl grid-cols-3 gap-4"
            >
              <HeroStat value={totalApps} label="Apps en el catálogo" />
              <HeroStat value={appsInProduction} label="En producción" />
              <HeroStat value={totalCategories} label="Rubros" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-16 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40"
            >
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                <ChevronDown className="h-4 w-4" />
              </motion.div>
              Desplazate para explorar
            </motion.div>
          </motion.div>
        </section>

        {/* Caso de éxito */}
        <section className="relative pb-16">
          <div className="container mx-auto max-w-7xl px-6">
            <CaseStudyCard data={caseStudy} />
          </div>
        </section>

        {/* Catálogo de apps */}
        <section className="relative pb-24 pt-4" aria-labelledby="catalogo-titulo">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                  <Sparkles className="h-3.5 w-3.5" />
                  Catálogo
                </div>
                <h2 id="catalogo-titulo" className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                  Elegí la app que{' '}
                  <GradientText from="#00ff88" to="#22d3ee">
                    necesitás
                  </GradientText>
                </h2>
              </div>

              <div
                className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [mask-image:linear-gradient(to_right,black_82%,transparent)] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 sm:[mask-image:none]"
                style={{ scrollbarWidth: 'none' }}
                role="group"
                aria-label="Filtrar apps por categoría"
              >
                {CATEGORY_FILTERS.map((filter) => {
                  const Icon = filter.icon;
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFilter(filter.id)}
                      aria-pressed={isActive}
                      className={
                        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition-colors sm:gap-2 sm:px-4 ' +
                        (isActive
                          ? 'border-alenia-primary/60 bg-alenia-primary/15 text-white'
                          : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white')
                      }
                    >
                      <Icon className={'hidden h-4 w-4 sm:block ' + (isActive ? 'text-alenia-primary' : '')} />
                      {filter.label}
                      <span
                        className={
                          'rounded-full px-1.5 text-[11px] font-semibold ' +
                          (isActive ? 'bg-alenia-primary/25 text-alenia-primary' : 'bg-white/10 text-white/50')
                        }
                      >
                        {filterCounts[filter.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-8"
              >
                {rows.map((row) => {
                  if (row.type === 'full') {
                    const app = row.items[0];
                    const reverse = fullIndex % 2 === 1;
                    fullIndex += 1;
                    return <CatalogCard key={app.id} app={app} wide reverse={reverse} />;
                  }
                  return (
                    <div key={row.items.map((app) => app.id).join('-')} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                      {row.items.map((app, index) => (
                        <CatalogCard key={app.id} app={app} index={index} />
                      ))}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Herramientas gratuitas */}
        <section className="relative border-t border-white/5 bg-black/30 py-24">
          <div className="container mx-auto max-w-7xl px-6">
            <ScrollReveal direction="up">
              <div className="mb-12 max-w-3xl">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                  <Zap className="h-3.5 w-3.5" />
                  Bonus · Herramientas gratuitas
                </div>
                <h2 className="font-display text-3xl font-bold leading-tight text-white/90 md:text-4xl">
                  Mini-apps con IA, gratis y listas para usar
                </h2>
                <p className="mt-4 text-base text-white/50">
                  Pequeñas herramientas que liberamos para la comunidad: fichas de producto con IA, cálculo de ROI de tus
                  proyectos y simulación de automatizaciones.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {freeTools.map((tool, index) => (
                <FreeToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="relative py-24">
          <div className="container mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl border border-alenia-primary/20 bg-gradient-to-br from-alenia-primary/10 via-slate-900 to-slate-950 p-10 md:p-16"
            >
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-alenia-primary/20 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-alenia-secondary/20 blur-3xl" />
              <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    <Sparkles className="h-3.5 w-3.5" />
                    ¿Tenés una idea?
                  </div>
                  <h3 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                    Construyamos tu próxima app juntos
                  </h3>
                  <p className="text-base text-white/60">
                    Diseñamos, desarrollamos y escalamos productos digitales de punta a punta. Contanos tu proyecto y armamos
                    la hoja de ruta.
                  </p>
                </div>
                <Link
                  to="/contacto"
                  className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-r from-[#7b2cbf] to-[#c77dff] px-8 py-4 text-base font-semibold text-white shadow-[0_0_24px_rgba(199,125,255,0.35)] transition-all hover:shadow-[0_0_36px_rgba(199,125,255,0.55)]"
                >
                  Agendá una demo
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
