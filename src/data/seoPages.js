// Contenido GEO/AEO del sitio (lo que leen Google, ChatGPT, Perplexity, Claude, etc.).
//
// Una sola fuente para dos usos:
// 1. post-build.js arma con esto un HTML estático por ruta (dist/<ruta>.html) con el
//    texto ya escrito, para que los buscadores y las IA lo lean sin ejecutar JavaScript.
// 2. Las páginas de React muestran las mismas preguntas frecuentes (<FaqSection>), así
//    el schema FAQPage coincide con lo que ve la persona.
//
// Reglas: frases cortas, primero la respuesta, solo datos verificables (caso LaIA con
// datos publicados con autorización). No nombrar competidores. Sin servicios de marketing.

export const SITE = {
  url: 'https://aleniahub.com',
  name: 'ALENIA',
  legalName: 'Alen.iA',
  email: 'alenia.online@gmail.com',
  whatsapp: '+54 9 351 687-5178',
  whatsappUrl: 'https://wa.me/5493516875178',
  city: 'Córdoba',
  country: 'AR',
  logo: 'https://aleniahub.com/images/logos-alenia/lockup-full.png?v=3',
  description:
    'ALENIA es una empresa argentina de Córdoba que desarrolla soluciones de automatización a medida con hardware, software e IA para negocios físicos. Desarrolló el sistema de LaIA, una lavandería 24 h sin personal en Palermo.',
  sameAs: [
    'https://www.instagram.com/alen.ia_/',
    'https://www.linkedin.com/company/alen-ia/',
    'https://github.com/vjlale',
  ],
}

/** Datos del caso LaIA que se repiten en varias páginas. */
export const LAIA_FACTS = {
  address: 'Paraguay 3106, Palermo, Buenos Aires',
  firstPayment: '2 de septiembre de 2026',
  daysToOpen: 69,
  agents: 15,
  machines: '3 lavadoras y 3 secadoras Electrolux, 2 expendedoras de snacks y bebidas y una cafetera',
  stats: '800 cuentas en la app, 470 pagos reales y más de 900 servicios en septiembre de 2026; el 45% de los que pagaron volvió',
  url: 'https://applaia.com',
}

const HUB_FAQ = [
  {
    q: '¿Qué es ALENIA HUB?',
    a: 'Es la línea de ALENIA que desarrolla soluciones de automatización a medida, con hardware, software e inteligencia artificial. No es un paquete cerrado: cada proyecto se diseña para el negocio que lo encarga.',
  },
  {
    q: '¿Qué tipo de cosas automatizan?',
    a: 'Negocios y procesos físicos: locales que atienden solos, equipos que se activan sin una persona, avisos y atención con IA. Si la idea todavía no existe en el mercado, la diseñamos con vos.',
  },
  {
    q: '¿Venden el sistema de LaIA?',
    a: 'No. Ese desarrollo se hizo a medida para LaIA y es exclusivo de ese proyecto. Para tu negocio diseñamos una solución nueva, pensada para lo que necesitás.',
  },
  {
    q: '¿Cómo empieza un proyecto?',
    a: 'Nos contás qué querés automatizar. Relevamos cómo trabajás hoy y te proponemos una solución con alcance, tiempos y etapas.',
  },
  {
    q: '¿Con qué equipos y sistemas trabajan?',
    a: 'Con los que ya tenés o con equipos nuevos. Antes de cotizar revisamos qué se puede conectar y qué conviene desarrollar.',
  },
  {
    q: '¿Cuánto tarda en estar funcionando?',
    a: 'Depende del proyecto. Como referencia, LaIA pasó de un local vacío a abrir al público en 69 días.',
  },
]

// Pregunta que se muestra en Inicio (lo visible de Inicio no se toca sin OK del usuario).
const HOME_TOTEM_FAQ = {
  q: '¿Qué diferencia hay entre un tótem de cobro y ALENIA HUB?',
  a: 'Un tótem cobra. ALENIA HUB diseña la solución completa para tu negocio: los equipos, el software y la IA que hagan falta para que funcione solo.',
}

const LAIA_FAQ = [
  {
    q: '¿Qué es LaIA?',
    a: `Una lavandería self-service abierta las 24 horas y sin personal, en ${LAIA_FACTS.address}. El cliente entra con QR, paga desde el celular o el tótem y usa las máquinas solo.`,
  },
  {
    q: '¿Quién desarrolló LaIA?',
    a: `ALENIA. El fundador dirigió a un equipo de ${LAIA_FACTS.agents} agentes de IA que escribió todo el software. Del local vacío a la apertura pasaron ${LAIA_FACTS.daysToOpen} días; el primer pago real fue el ${LAIA_FACTS.firstPayment}.`,
  },
  {
    q: '¿Qué tiene conectado LaIA?',
    a: `${LAIA_FACTS.machines}; puerta con QR y cerradura magnética; app en 7 idiomas sin contraseña; tótem; panel del dueño en tiempo real y alertas al celular las 24 horas.`,
  },
  {
    q: '¿Qué resultados tuvo LaIA?',
    a: `${LAIA_FACTS.stats}. Uno de cada cinco servicios se usa de noche, cuando un local tradicional estaría cerrado.`,
  },
]

const HOME_FAQ = [
  {
    q: '¿Qué hace ALENIA?',
    a: 'Desarrollamos soluciones de automatización a medida con hardware, software e IA. Traenos el desafío y lo automatizamos: eso es ALENIA HUB. También hacemos apps y webs a medida.',
  },
  HOME_TOTEM_FAQ,
  {
    q: '¿Dónde está ALENIA y cómo los contacto?',
    a: `Estamos en Córdoba, Argentina. Escribinos por WhatsApp al ${SITE.whatsapp} o a ${SITE.email}.`,
  },
]

export const FAQS = {
  home: HOME_FAQ,
  hub: HUB_FAQ,
  laia: LAIA_FAQ,
}

/**
 * Páginas con HTML estático. `summary` es la respuesta directa (2-3 frases);
 * `points` son viñetas cortas; `faq` se publica también como schema FAQPage.
 */
export const SEO_PAGES = [
  {
    path: '/',
    title: 'ALENIA | Automatización a medida con hardware, software e IA',
    description:
      'ALENIA desarrolla soluciones de automatización a medida con hardware, software e IA. Traenos el desafío y lo automatizamos. Apps y webs a medida. Córdoba, Argentina.',
    h1: 'Automatizamos tu negocio completo: hardware, software e IA',
    summary:
      'Desarrollamos soluciones con inteligencia: hardware, software e IA a medida de cada negocio. Traenos el desafío y lo automatizamos. Un caso real: LaIA, una lavandería que funciona sola las 24 horas.',
    points: [
      'Automatización a medida con hardware, software e IA',
      'Locales y procesos que funcionan solos',
      'Asistentes con IA que atienden a cualquier hora',
      'Apps y webs a medida',
    ],
    links: [
      ['/soluciones/hub', 'ALENIA HUB'],
      ['/casos/laia', 'Caso real: LaIA'],
      ['/soluciones/digitales', 'Apps y webs a medida'],
      ['/contacto', 'Contacto'],
    ],
    faq: HOME_FAQ,
  },
  {
    path: '/soluciones/hub',
    title: 'ALENIA HUB | Automatización a medida con hardware, software e IA',
    description:
      'Traenos el desafío y lo automatizamos. ALENIA HUB desarrolla soluciones a medida con hardware, software e IA para negocios físicos. Caso real: LaIA, 24 h sin personal.',
    h1: 'ALENIA HUB: traenos el desafío, nosotros lo automatizamos',
    summary:
      'ALENIA HUB desarrolla soluciones de automatización a medida con hardware, software e inteligencia artificial. No es un paquete cerrado: cada proyecto se diseña para el negocio que lo encarga. Caso real: LaIA, una lavandería que funciona sola las 24 horas.',
    points: [
      'Hardware a medida: placas, sensores y conexiones',
      'Software a medida: apps, pantallas y paneles con tu marca',
      'IA aplicada: asistentes que atienden, avisan y resuelven',
      'Integraciones con los equipos y sistemas que ya usás',
      'Cuatro pasos: nos contás el desafío, diseñamos, construimos y ponemos en marcha',
    ],
    links: [
      ['/casos/laia', 'Ver el caso LaIA'],
      ['/contacto', 'Contanos tu desafío'],
    ],
    faq: HUB_FAQ,
    schemaType: 'Service',
  },
  {
    path: '/casos/laia',
    title: 'Caso LaIA | Lavandería 24 h sin personal hecha por ALENIA',
    description:
      'Cómo ALENIA armó LaIA en 69 días: lavandería self-service 24 h sin personal en Palermo, con 9 máquinas y puerta conectadas, app, tótem y panel. Datos reales.',
    h1: 'LaIA: un local que funciona solo, las 24 horas',
    summary: `LaIA es una lavandería self-service sin personal en ${LAIA_FACTS.address}. ALENIA la construyó en ${LAIA_FACTS.daysToOpen} días con un equipo de ${LAIA_FACTS.agents} agentes de IA dirigido por el fundador. El primer pago real fue el ${LAIA_FACTS.firstPayment}.`,
    points: [
      LAIA_FACTS.machines,
      'Puerta con QR y cerradura magnética',
      'App en 7 idiomas, tótem y panel del dueño',
      'Regla de oro: ninguna máquina arranca sin pago confirmado',
      LAIA_FACTS.stats,
    ],
    links: [
      ['/soluciones/hub', 'Traenos tu desafío'],
      [LAIA_FACTS.url, 'Sitio de LaIA'],
    ],
    faq: LAIA_FAQ,
    schemaType: 'Article',
  },
  {
    path: '/soluciones',
    title: 'Soluciones | ALENIA - Automatización a medida, apps y webs',
    description:
      'Automatización a medida con ALENIA HUB (hardware, software e IA), apps y software a medida y desarrollo web. Hecho por el equipo que desarrolló LaIA.',
    h1: 'Soluciones de ALENIA',
    summary:
      'Tres líneas: ALENIA HUB para automatizar negocios físicos a medida, apps y software a medida, y webs que venden. Todo lo hace el mismo equipo que desarrolló LaIA.',
    points: ['ALENIA HUB: automatización a medida con hardware, software e IA', 'Apps y software a medida', 'Desarrollo web'],
    links: [
      ['/soluciones/hub', 'ALENIA HUB'],
      ['/soluciones/digitales', 'Apps y webs'],
    ],
  },
  {
    path: '/soluciones/digitales',
    title: 'Apps y webs a medida | ALENIA',
    description:
      'Webs interactivas que convierten, apps iOS y Android a medida y portales para clientes y equipos. Llave en mano, desde Córdoba, Argentina.',
    h1: 'Apps y webs a medida',
    summary:
      'Hacemos webs que convierten visitas en consultas, apps iOS y Android para comercios y empresas, y portales para clientes y equipos. Llave en mano: diseño, desarrollo y puesta en marcha.',
    points: ['Webs interactivas', 'Apps iOS y Android', 'Portales para clientes y equipos'],
    links: [['/contacto', 'Contanos tu proyecto']],
  },
  {
    path: '/apps',
    title: 'Apps de ALENIA | Productos en producción',
    description:
      'Apps creadas por ALENIA: Kontrol Pro, LiveVote, StageLab, Match Padel, i-Streem y E-pix. Productos reales, con precios y planes.',
    h1: 'Apps de ALENIA',
    summary:
      'Productos propios que ya están funcionando: Kontrol Pro (ventas y stock), LiveVote (votación en vivo en pantalla), StageLab, Match Padel, i-Streem (streaming de iPhone a PC) y E-pix.',
    points: ['Kontrol Pro', 'LiveVote', 'StageLab', 'Match Padel', 'i-Streem', 'E-pix'],
    links: [
      ['/kontrol-plus', 'Kontrol+'],
      ['/play-padel', 'Play Padel'],
      ['/apps/i-streem', 'i-Streem'],
    ],
  },
  {
    path: '/desarrollos-ia',
    title: 'Desarrollos con IA | ALENIA',
    description:
      'Desarrollos con inteligencia artificial hechos por ALENIA: asistentes de atención por voz y chat, bots de gestión y automatizaciones a medida.',
    h1: 'Desarrollos con IA',
    summary:
      'Asistentes que atienden por voz y por chat, bots que le avisan al dueño cuánto vendió y automatizaciones a medida. Probados en un negocio real: LaIA usa 7 asistentes de IA.',
    points: ['Asistentes de atención por voz y chat', 'Bots de gestión para el dueño', 'Automatizaciones a medida'],
    links: [['/casos/laia', 'Caso LaIA']],
  },
  {
    path: '/automatizaciones',
    title: 'Automatizaciones para tu negocio | ALENIA',
    description:
      'Automatizamos lo que hoy hacés a mano: respuestas por WhatsApp, recordatorios, reportes y conexión entre sistemas. Y con ALENIA HUB, también tu negocio físico.',
    h1: 'Dejá de hacer a mano lo que se puede hacer solo',
    summary:
      'Respuestas por WhatsApp, recordatorios, seguimiento de ventas, reportes y conexión entre sistemas. Si el desafío incluye equipos físicos, ALENIA HUB lo resuelve con hardware a medida.',
    points: ['WhatsApp y recordatorios', 'Reportes automáticos', 'Conexión entre sistemas'],
    links: [['/soluciones/hub', 'ALENIA HUB']],
  },
  {
    path: '/kontrol-plus',
    title: 'Kontrol+ | Programa gratis de ventas y stock para Windows | ALENIA',
    description:
      'Kontrol+ es un programa gratuito para controlar ventas y stock. Funciona sin internet, con reportes, ofertas y sugerencias de reposición. Para Windows 10/11.',
    h1: 'Kontrol+: ventas y stock sin internet',
    summary:
      'Kontrol+ es un programa gratis de ALENIA para controlar ventas y stock en Windows 10 y 11. Funciona sin internet y trae reportes, ofertas y sugerencias de reposición.',
    points: ['Gratis', 'Funciona sin internet', 'Reportes y sugerencias de reposición'],
  },
  {
    path: '/play-padel',
    title: 'Play Padel | Armá partidos y llená tu club | ALENIA',
    description:
      'Play Padel: formá tu dupla, desafiá a otras de tu nivel, gestioná las reservas de tu club y fidelizá a tus socios. Torneos, ranking y muro social.',
    h1: 'Play Padel: armá partidos y llená tu club',
    summary:
      'App de ALENIA para jugadores y clubes de pádel: formar dupla, desafiar a otras de tu nivel, reservar canchas, torneos y ranking.',
    points: ['Duplas y desafíos por nivel', 'Reservas del club', 'Torneos y ranking'],
  },
  {
    path: '/apps/i-streem',
    title: 'i-Streem | Streaming de iPhone a PC con baja latencia | ALENIA',
    description:
      'i-Streem transmite desde tu iPhone a cualquier PC o Mac con baja latencia por WebRTC. Multi-viewer, telemetría en vivo e integración con OBS y Resolume.',
    h1: 'i-Streem: del iPhone a la PC, en vivo',
    summary:
      'i-Streem es la app de ALENIA para transmitir desde un iPhone a una PC o Mac con baja latencia. Se integra con OBS y Resolume.',
    points: ['Baja latencia por WebRTC', 'Varios visores', 'Integración con OBS y Resolume'],
  },
  {
    path: '/blog',
    title: 'Blog de ALENIA | Automatización, IA y casos reales',
    description:
      'Notas de ALENIA sobre automatización de negocios, IA aplicada y casos reales como LaIA, la lavandería 24 h sin personal.',
    h1: 'Blog de ALENIA',
    summary: 'Notas sobre automatización, IA aplicada y casos reales como LaIA.',
  },
  {
    path: '/contacto',
    title: 'Contacto | ALENIA',
    description: `Contactá a ALENIA por WhatsApp (${SITE.whatsapp}) o por mail. Automatización a medida, apps y webs. Córdoba, Argentina.`,
    h1: 'Hablemos de tu proyecto',
    summary: `Escribinos por WhatsApp al ${SITE.whatsapp} o a ${SITE.email}. Contanos qué querés automatizar.`,
  },
]
