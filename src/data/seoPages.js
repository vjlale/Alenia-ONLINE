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
    'ALENIA es una empresa argentina de Córdoba que automatiza negocios físicos con hardware, software e IA. Creó ALENIA HUB, el sistema que conecta máquinas con cobros, app, tótem y panel, y que funciona en LaIA, una lavandería 24 h sin personal en Palermo.',
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
    a: 'Es el sistema de ALENIA que conecta máquinas físicas (lavadoras, secadoras, expendedoras, cafeteras y puertas) con cobro digital, app, tótem y un panel en tiempo real. El cliente paga desde el celular y la máquina arranca sola. Funciona en LaIA desde septiembre de 2026.',
  },
  {
    q: '¿Qué diferencia hay entre un tótem de cobro y ALENIA HUB?',
    a: 'Un tótem cobra. ALENIA HUB opera el negocio entero: cobra, activa las máquinas, abre la puerta con QR, integra vending y café, maneja turnos y alertas, y suma un asistente con IA. Todo en un solo panel.',
  },
  {
    q: '¿Con qué máquinas funciona?',
    a: 'Con equipos que se activan por pulso, relé o placa del fabricante: lavadoras y secadoras industriales, expendedoras, cafeteras y cerraduras. Antes de cotizar revisamos marca, modelo y controlador de cada equipo.',
  },
  {
    q: '¿Qué medios de pago acepta?',
    a: 'Mercado Pago con QR, Checkout y Point, más saldo y crédito dentro de la app. Ninguna máquina arranca sin pago confirmado.',
  },
  {
    q: '¿Para qué rubros sirve?',
    a: 'Lavanderías self-service, lavaderos de autos, gimnasios 24 h, máquinas vending, coworks, canchas de pádel y cualquier negocio que pueda funcionar sin personal en el local.',
  },
  {
    q: '¿Cuánto tarda en estar funcionando?',
    a: 'Depende de los equipos. LaIA pasó de un local vacío a abrir al público en 69 días, con 9 máquinas y la puerta conectadas.',
  },
]

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
    a: 'Automatizamos negocios físicos con hardware, software e IA. Nuestro producto principal es ALENIA HUB: conecta tus máquinas con cobros, app, tótem y panel. También hacemos apps y webs a medida.',
  },
  HUB_FAQ[1],
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
    title: 'ALENIA | Automatización de máquinas con hardware, software e IA',
    description:
      'ALENIA conecta tus máquinas con cobros, app, tótem y panel en tiempo real. Creamos LaIA, una lavandería 24 h sin personal. Apps y webs a medida. Córdoba, Argentina.',
    h1: 'Automatizamos tu negocio completo: hardware, software e IA',
    summary:
      'Construimos LaIA, una lavandería que funciona sola las 24 horas. Ese mismo sistema, ALENIA HUB, lo llevamos a tus máquinas: el cliente paga desde el celular, la máquina arranca sola y vos controlás todo desde el panel.',
    points: [
      'Cobros con Mercado Pago, saldo y crédito',
      'Máquinas que arrancan solas al confirmarse el pago',
      'Puertas que abren con QR',
      'Panel con ventas, estado de máquinas y alertas',
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
    title: 'ALENIA HUB | Automatización de máquinas con hardware y software',
    description:
      'ALENIA HUB conecta tus máquinas con cobros, app, tótem y panel en tiempo real. Probado en LaIA, lavandería 24 h sin personal. Para lavanderías, vending, gimnasios y más.',
    h1: 'ALENIA HUB: de la máquina al negocio conectado',
    summary:
      'ALENIA HUB conecta tus máquinas con cobros, app, tótem y un panel en tiempo real. Un tótem cobra; HUB opera el negocio entero. Funciona en LaIA desde septiembre de 2026.',
    points: [
      'Activación de máquinas por pulso, relé o placa del fabricante',
      'Cobros con Mercado Pago (QR, Checkout y Point), saldo y crédito',
      'Control de accesos con QR',
      'Panel en tiempo real desde el celular',
      'App y tótem con tu marca',
      'Asistente con IA para tus clientes, las 24 horas',
    ],
    links: [
      ['/casos/laia', 'Ver el caso LaIA'],
      ['/contacto', 'Contanos qué máquinas tenés'],
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
      ['/soluciones/hub', 'Llevar este sistema a tus máquinas'],
      [LAIA_FACTS.url, 'Sitio de LaIA'],
    ],
    faq: LAIA_FAQ,
    schemaType: 'Article',
  },
  {
    path: '/soluciones',
    title: 'Soluciones | ALENIA - Automatización de máquinas, apps y webs',
    description:
      'Automatización de máquinas con ALENIA HUB, cobros y accesos con QR, apps y software a medida y desarrollo web. Hecho por el equipo que creó LaIA.',
    h1: 'Soluciones de ALENIA',
    summary:
      'Tres líneas: ALENIA HUB para automatizar máquinas y locales sin personal, apps y software a medida, y webs que venden. Todo lo hace el mismo equipo que creó LaIA.',
    points: ['ALENIA HUB: máquinas, cobros, accesos y panel', 'Apps y software a medida', 'Desarrollo web'],
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
      'Automatizamos lo que hoy hacés a mano: respuestas por WhatsApp, recordatorios, reportes y conexión entre sistemas. Y con ALENIA HUB, también tus máquinas.',
    h1: 'Dejá de hacer a mano lo que se puede hacer solo',
    summary:
      'Respuestas por WhatsApp, recordatorios, seguimiento de ventas, reportes y conexión entre sistemas. Si tu negocio tiene máquinas, ALENIA HUB también las automatiza.',
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
    description: `Contactá a ALENIA por WhatsApp (${SITE.whatsapp}) o por mail. Automatización de máquinas, apps y webs. Córdoba, Argentina.`,
    h1: 'Hablemos de tu proyecto',
    summary: `Escribinos por WhatsApp al ${SITE.whatsapp} o a ${SITE.email}. Contanos qué máquinas o qué proceso querés automatizar.`,
  },
]
