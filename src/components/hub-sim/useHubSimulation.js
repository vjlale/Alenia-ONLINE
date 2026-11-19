// Estado de la simulación: una máquina de estados que avanza sola (demo) o al
// ritmo del usuario (modo manual). Si el usuario deja de tocar, vuelve la demo.
import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import {
  AUTO_CART,
  CATALOG_PHASES,
  INITIAL_METRICS,
  INITIAL_NOTIFICATIONS,
  MAX_CART_ITEMS,
  PHASES,
  PRODUCTS,
  cartTotal,
  money,
  nowTime,
  phaseIndex,
} from './hubSimData'

const IDLE_RESUME_MS = 12000
const MAX_NOTIFICATIONS = 4

const lastItem = (cart) => PRODUCTS[cart[cart.length - 1]]

export const defaultPayMethod = (s) => {
  if (s.channel === 'phone') return 'mp'
  return Math.floor(s.cycle / 2) % 2 === 0 ? 'point' : 'qr'
}

const pushNotification = (s, notification) => ({
  ...s,
  seq: s.seq + 1,
  notifications: [{ id: `n${s.seq}`, time: nowTime(), delay: 0, ...notification }, ...s.notifications].slice(
    0,
    MAX_NOTIFICATIONS
  ),
})

const pushChat = (s, message) => ({
  ...s,
  seq: s.seq + 1,
  chat: [...s.chat, { id: `c${s.seq}`, delay: 0, ...message }],
})

const ensureGreeting = (s) =>
  s.chat.length > 0
    ? s
    : pushChat(s, { from: 'bot', text: 'Hola, soy el asistente de la Expendedora Centro. ¿En qué te ayudo?' })

const ensureUserMessage = (s) => {
  if (s.chat.some((m) => m.from === 'user')) return s
  return pushChat(s, { from: 'user', text: `No me salió el ${lastItem(s.cart).name.toLowerCase()}` })
}

// Cada evento del negocio se registra una sola vez por pedido, aunque se salte de paso.
const alreadyLogged = (s, event) => s.logged.includes(`${s.orderNo}:${event}`)
const logEvent = (s, event) => ({ ...s, logged: [...s.logged.slice(-20), `${s.orderNo}:${event}`] })

function enterPhase(prev, index, newCycle = false) {
  let s = { ...prev, phase: index }
  const id = PHASES[index].id

  if (id === 'browse') {
    if (newCycle) {
      s.cycle = prev.cycle + 1
      s.orderNo = prev.orderNo + 1
      if (s.mode === 'auto') s.channel = s.cycle % 2 === 0 ? 'phone' : 'totem'
    }
    return { ...s, cart: [], payMethod: null, chat: [] }
  }

  // Si se salta directo a un paso posterior, completamos lo que falte.
  if (index >= phaseIndex('checkout') && s.cart.length === 0) s.cart = AUTO_CART
  if (index >= phaseIndex('paying') && !s.payMethod) s.payMethod = defaultPayMethod(s)

  const total = cartTotal(s.cart)
  const last = lastItem(s.cart)

  // Al saltar a mitad del incidente, el panel tiene que mostrar la máquina en alerta.
  if (index > phaseIndex('notify') && index < phaseIndex('retry') && s.metrics.machineStatus === 'ok') {
    s.metrics = { ...s.metrics, machineStatus: 'alerta' }
  }

  switch (id) {
    case 'add1':
      if (s.mode === 'auto') s.cart = AUTO_CART.slice(0, 1)
      return s
    case 'add2':
      if (s.mode === 'auto') s.cart = AUTO_CART
      return s
    case 'notify': {
      if (alreadyLogged(s, 'notify')) return s
      s = logEvent(s, 'notify')
      const names = s.cart.map((p) => PRODUCTS[p].name).join(' + ')
      s = pushNotification(s, { kind: 'sale', title: `Venta ${money(total)}`, body: `${names} · Pedido #${s.orderNo}` })
      s = pushNotification(s, {
        kind: 'alert',
        title: `Atasco en carril ${last.lane}`,
        body: `${last.name} no detectado en la bandeja. El asistente ya está atendiendo al cliente.`,
        delay: 1300,
      })
      return { ...s, metrics: { ...s.metrics, machineStatus: 'alerta' } }
    }
    case 'metrics': {
      if (alreadyLogged(s, 'metrics')) return s
      s = logEvent(s, 'metrics')
      const m = s.metrics
      const stock = { ...m.stock }
      const activity = [...m.activity]
      s.cart.forEach((p) => {
        stock[p] = Math.max(stock[p] - 1, 0)
      })
      const hourly = [...m.hourly]
      hourly[hourly.length - 1] += total
      const names = s.cart.map((p) => PRODUCTS[p].name).join(' + ')
      activity.unshift({ id: `a${s.seq}`, text: `Venta ${money(total)} · ${names}`, tone: 'ok' })
      activity.unshift({ id: `a${s.seq}w`, text: `Atasco carril ${last.lane} · ${last.name}`, tone: 'warn' })
      const low = [...new Set(s.cart)].find((p) => stock[p] > 0 && stock[p] <= 3)
      Object.keys(stock).forEach((p) => {
        if (stock[p] === 0) stock[p] = m.capacity // reposición automática para que la demo no se vacíe
      })
      s = {
        ...s,
        seq: s.seq + 1,
        metrics: {
          ...m,
          sales: m.sales + total,
          operations: m.operations + 1,
          hourly,
          stock,
          machineStatus: 'alerta',
          activity: activity.slice(0, 3),
        },
      }
      if (low) {
        s = pushNotification(s, {
          kind: 'stock',
          title: `Stock bajo: ${PRODUCTS[low].name}`,
          body: `Quedan ${stock[low]} unidades en el carril ${PRODUCTS[low].lane}.`,
        })
      }
      return s
    }
    case 'chat':
      return ensureGreeting(s)
    case 'botReply':
      s = ensureUserMessage(ensureGreeting(s))
      return pushChat(s, {
        from: 'bot',
        delay: 1300,
        text: `Ya vi tu compra #${s.orderNo} de ${money(total)}. El sensor no detectó la caída del ${last.name.toLowerCase()} en el carril ${last.lane}. Lo reintento ahora mismo.`,
      })
    case 'retry': {
      if (!s.chat.some((m) => m.delay === 1300)) s = enterPhase(s, phaseIndex('botReply'))
      s = { ...s, phase: index }
      s = pushChat(s, { from: 'system', text: `Reintentando entrega · carril ${last.lane}` })
      const refund = s.payMethod === 'point' ? 'a tu tarjeta' : 'a tu Mercado Pago'
      s = pushChat(s, {
        from: 'bot',
        delay: 2300,
        text: `¡Listo! Ya está en la bandeja. Si vuelve a fallar, te reintegro ${money(last.price)} ${refund} al instante.`,
      })
      return { ...s, metrics: { ...s.metrics, machineStatus: 'reintento' } }
    }
    case 'resolved': {
      if (alreadyLogged(s, 'resolved')) return s
      s = logEvent(s, 'resolved')
      s = pushNotification(s, {
        kind: 'resolved',
        title: 'Incidente resuelto por el asistente',
        body: `Carril ${last.lane} reintentado a distancia. El cliente retiró su ${last.name.toLowerCase()} en 40 s.`,
      })
      const activity = [
        { id: `a${s.seq}r`, text: `Resuelto por IA · carril ${last.lane}`, tone: 'info' },
        ...s.metrics.activity,
      ].slice(0, 3)
      return {
        ...s,
        seq: s.seq + 1,
        metrics: { ...s.metrics, incidents: s.metrics.incidents + 1, machineStatus: 'ok', activity },
      }
    }
    default:
      return s
  }
}

const baseState = (manual) => ({
  phase: 0,
  cycle: 0,
  mode: manual ? 'manual' : 'auto',
  playing: true,
  channel: 'phone',
  payMethod: null,
  cart: [],
  chat: [],
  orderNo: 1043,
  metrics: INITIAL_METRICS,
  notifications: INITIAL_NOTIFICATIONS,
  seq: 1,
  interaction: 0,
  logged: [],
})

const init = (manual) => enterPhase(baseState(manual), 0)

// Cualquier acción del usuario le da el control.
const touch = (s) => ({ ...s, mode: 'manual', playing: true, interaction: s.interaction + 1 })

function reducer(s, action) {
  const phaseId = PHASES[s.phase].id
  const inCatalog = CATALOG_PHASES.includes(phaseId)

  switch (action.type) {
    case 'ADVANCE': {
      const next = s.phase + 1
      return next >= PHASES.length ? enterPhase(s, 0, true) : enterPhase(s, next)
    }
    case 'ADD':
      if (!inCatalog || s.cart.length >= MAX_CART_ITEMS) return touch(s)
      return { ...touch(s), cart: [...s.cart, action.id] }
    case 'REMOVE': {
      if (!inCatalog) return touch(s)
      const i = s.cart.lastIndexOf(action.id)
      if (i < 0) return touch(s)
      return { ...touch(s), cart: [...s.cart.slice(0, i), ...s.cart.slice(i + 1)] }
    }
    case 'SET_CHANNEL':
      if (!inCatalog || s.channel === action.channel) return touch(s)
      return { ...touch(s), channel: action.channel }
    case 'CHECKOUT':
      if (!inCatalog || s.cart.length === 0) return touch(s)
      return enterPhase(touch(s), phaseIndex('checkout'))
    case 'PAY':
      if (phaseId !== 'checkout') return touch(s)
      return enterPhase({ ...touch(s), payMethod: action.method }, phaseIndex('paying'))
    case 'OPEN_CHAT':
      if (s.phase < phaseIndex('notify') || s.phase > phaseIndex('help')) return touch(s)
      return enterPhase(touch(s), phaseIndex('chat'))
    case 'SEND': {
      if (phaseId !== 'chat' || !action.text.trim()) return touch(s)
      const withMsg = pushChat(ensureGreeting(touch(s)), { from: 'user', text: action.text.trim() })
      return enterPhase(withMsg, phaseIndex('botReply'))
    }
    case 'RESTART':
      return enterPhase(touch(s), 0, true)
    case 'JUMP': {
      const index = PHASES.findIndex((p) => p.group === action.group)
      return enterPhase({ ...s, playing: true, chat: [] }, index, action.group === 'carrito')
    }
    case 'TOGGLE_PLAY':
      return { ...s, playing: !s.playing }
    case 'RESET':
      return init(false)
    case 'RESUME_AUTO':
      return { ...s, mode: 'auto' }
    default:
      return s
  }
}

export function useHubSimulation({ paused = false } = {}) {
  const reduceMotion = useReducedMotion()
  const [state, dispatch] = useReducer(reducer, !!reduceMotion, init)
  const containerRef = useRef(null)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onChange = () => setPageVisible(document.visibilityState !== 'hidden')
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  const running = state.playing && inView && pageVisible && !paused
  const phase = PHASES[state.phase]

  // Avance por tiempo. En modo manual se frena en las fases que esperan al usuario.
  useEffect(() => {
    if (!running) return undefined
    if (state.mode === 'manual' && phase.waitFor) return undefined
    const id = setTimeout(() => dispatch({ type: 'ADVANCE' }), phase.duration)
    return () => clearTimeout(id)
  }, [running, state.mode, state.phase, state.cycle, phase])

  // Si el usuario deja de tocar, vuelve la demo automática.
  useEffect(() => {
    if (!running || state.mode !== 'manual' || reduceMotion) return undefined
    const id = setTimeout(() => dispatch({ type: 'RESUME_AUTO' }), IDLE_RESUME_MS)
    return () => clearTimeout(id)
  }, [running, state.mode, state.interaction, state.phase, reduceMotion])

  const actions = useMemo(
    () => ({
      add: (id) => dispatch({ type: 'ADD', id }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      setChannel: (channel) => dispatch({ type: 'SET_CHANNEL', channel }),
      checkout: () => dispatch({ type: 'CHECKOUT' }),
      pay: (method) => dispatch({ type: 'PAY', method }),
      openChat: () => dispatch({ type: 'OPEN_CHAT' }),
      send: (text) => dispatch({ type: 'SEND', text }),
      restart: () => dispatch({ type: 'RESTART' }),
      jump: (group) => dispatch({ type: 'JUMP', group }),
      togglePlay: () => dispatch({ type: 'TOGGLE_PLAY' }),
      reset: () => dispatch({ type: 'RESET' }),
    }),
    []
  )

  return { state, phase, actions, containerRef, running, reduceMotion: !!reduceMotion }
}
