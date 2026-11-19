// Datos y guion de la simulación de ALENIA HUB: una compra en una expendedora
// conectada, vista del lado del cliente y del lado del dueño.

export const PRODUCTS = {
  agua: { id: 'agua', name: 'Agua', detail: 'Sin gas 500 ml', price: 1200, lane: 'A1', color: '#38bdf8' },
  gaseosa: { id: 'gaseosa', name: 'Gaseosa', detail: 'Lata 354 ml', price: 1900, lane: 'A2', color: '#ef4444' },
  cafe: { id: 'cafe', name: 'Café', detail: 'Frío 250 ml', price: 1500, lane: 'B1', color: '#a16207' },
  snack: { id: 'snack', name: 'Snack', detail: 'Papas 80 g', price: 1700, lane: 'B2', color: '#f59e0b' },
}

export const PRODUCT_ORDER = ['agua', 'gaseosa', 'cafe', 'snack']
export const AUTO_CART = ['gaseosa', 'snack']
export const MAX_CART_ITEMS = 3

export const MACHINE_NAME = 'Expendedora Centro'

// Pasos de la línea de tiempo que ve el usuario.
export const GROUPS = [
  { id: 'carrito', label: 'Carrito' },
  { id: 'pago', label: 'Pago' },
  { id: 'entrega', label: 'Entrega' },
  { id: 'aviso', label: 'Aviso al dueño' },
  { id: 'metricas', label: 'Métricas' },
  { id: 'soporte', label: 'Soporte' },
]

// Fases internas. `waitFor`: en modo manual la fase espera esa acción del usuario
// en lugar de avanzar sola.
export const PHASES = [
  { id: 'browse', group: 'carrito', duration: 3400, waitFor: 'checkout' },
  { id: 'add1', group: 'carrito', duration: 1300, waitFor: 'checkout' },
  { id: 'add2', group: 'carrito', duration: 1700, waitFor: 'checkout' },
  { id: 'checkout', group: 'pago', duration: 2000, waitFor: 'pay' },
  { id: 'paying', group: 'pago', duration: 2900 },
  { id: 'approved', group: 'pago', duration: 1700 },
  { id: 'dispense', group: 'entrega', duration: 3400 },
  { id: 'notify', group: 'aviso', duration: 3000 },
  { id: 'metrics', group: 'metricas', duration: 3200 },
  { id: 'help', group: 'soporte', duration: 2200, waitFor: 'openChat' },
  { id: 'chat', group: 'soporte', duration: 2600, waitFor: 'sendMessage' },
  { id: 'botReply', group: 'soporte', duration: 3800 },
  { id: 'retry', group: 'soporte', duration: 3400 },
  { id: 'resolved', group: 'soporte', duration: 3000 },
  { id: 'summary', group: 'soporte', duration: 3200, waitFor: 'restart' },
]

export const phaseIndex = (id) => PHASES.findIndex((p) => p.id === id)
export const CATALOG_PHASES = ['browse', 'add1', 'add2']

// Qué elemento "toca" el piloto automático en cada fase (para mostrar el dedo).
export const AUTO_TARGETS = {
  browse: 'product:gaseosa',
  add1: 'product:snack',
  add2: 'checkout',
  checkout: 'pay',
  help: 'openChat',
  chat: 'suggestion:0',
  summary: 'restart',
}

export const MANUAL_HINTS = {
  browse: 'Elegí productos y tocá «Ir a pagar»',
  add1: 'Elegí productos y tocá «Ir a pagar»',
  add2: 'Elegí productos y tocá «Ir a pagar»',
  checkout: 'Elegí cómo pagar',
  help: 'Tocá «Hablar con soporte»',
  chat: 'Escribí qué pasó o tocá una sugerencia',
  summary: 'Tocá «Nueva compra» para repetir',
}

export const HUB_STATUS = {
  browse: 'Esperando pedido',
  add1: 'Pedido en curso',
  add2: 'Pedido en curso',
  checkout: 'Pedido en curso',
  paying: 'Procesando pago',
  approved: 'Pago aprobado',
  dispense: 'Activando carriles',
  notify: 'Avisando al dueño',
  metrics: 'Actualizando panel',
  help: 'Atasco detectado',
  chat: 'Soporte en línea',
  botReply: 'Diagnóstico remoto',
  retry: 'Reintentando entrega',
  resolved: 'Incidente resuelto',
  summary: 'Todo en orden',
}

export const narrative = (phaseId, { channel, payMethod, lastName }) => {
  switch (phaseId) {
    case 'browse':
      return channel === 'phone'
        ? 'El cliente escanea el QR de la máquina y se le abre la tienda en el celular.'
        : 'El cliente elige sus productos en el tótem táctil del local.'
    case 'add1':
    case 'add2':
      return 'Arma su carrito: cada producto con su precio y stock en vivo.'
    case 'checkout':
      return 'Elige cómo pagar.'
    case 'paying':
      if (payMethod === 'point') return 'Paga con tarjeta en el Point del tótem.'
      if (payMethod === 'qr') return 'Escanea el QR del tótem con su celular y paga.'
      return 'Paga con Mercado Pago desde su celular, sin efectivo.'
    case 'approved':
      return 'Pago aprobado: el HUB le da la orden a la máquina al instante.'
    case 'dispense':
      return `La expendedora entrega los productos… pero el ${lastName} se traba.`
    case 'notify':
      return 'Al dueño le llegan la venta y la alerta del atasco al celular.'
    case 'metrics':
      return 'El panel suma la venta, descuenta stock y marca la máquina en alerta.'
    case 'help':
      return 'El cliente pide ayuda desde la misma pantalla.'
    case 'chat':
      return 'Le cuenta al chat de soporte qué pasó.'
    case 'botReply':
      return 'El asistente encuentra la compra y diagnostica la falla solo.'
    case 'retry':
      return 'Reintenta la entrega a distancia y el producto cae.'
    case 'resolved':
      return 'Incidente resuelto sin que el dueño tenga que ir al local.'
    case 'summary':
      return 'Compra completa: todo quedó registrado en el panel.'
    default:
      return ''
  }
}

export const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

export const INITIAL_METRICS = {
  sales: 184300,
  operations: 61,
  incidents: 3,
  hourly: [8200, 14600, 18900, 22100, 26400, 19800, 17300, 21500, 23900, 11600],
  stock: { agua: 12, gaseosa: 5, cafe: 9, snack: 7 },
  capacity: 14,
  machineStatus: 'ok', // ok | alerta | reintento
  activity: [
    { id: 'a0', text: 'Venta $3.100 · Agua + Café', tone: 'ok' },
    { id: 'a1', text: 'Venta $1.900 · Gaseosa', tone: 'ok' },
  ],
}

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'n0',
    kind: 'report',
    title: 'Cierre de caja de ayer',
    body: '$212.400 en 74 ventas · 0 incidentes sin resolver',
    time: '08:00',
  },
]

const ars = new Intl.NumberFormat('es-AR')
export const money = (n) => `$${ars.format(Math.round(n))}`

export const cartTotal = (cart) => cart.reduce((sum, id) => sum + PRODUCTS[id].price, 0)

export const cartLines = (cart) => {
  const lines = []
  cart.forEach((id) => {
    const line = lines.find((l) => l.id === id)
    if (line) line.qty += 1
    else lines.push({ id, qty: 1 })
  })
  return lines
}

export const nowTime = () => {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
