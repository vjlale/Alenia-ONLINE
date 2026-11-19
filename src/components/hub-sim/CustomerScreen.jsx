// Pantalla del cliente: la tienda en el celular (vía QR) o en el tótem.
// Catálogo → carrito → pago → retiro → soporte → gracias.
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Minus,
  Nfc,
  Plus,
  QrCode,
  ShoppingCart,
  Store,
  Wallet,
} from 'lucide-react'
import { TapHint } from './DeviceFrames'
import { ProductIcon } from './ProductArt'
import SupportChat from './SupportChat'
import {
  CATALOG_PHASES,
  MACHINE_NAME,
  MAX_CART_ITEMS,
  PRODUCTS,
  PRODUCT_ORDER,
  cartLines,
  cartTotal,
  money,
} from './hubSimData'

// true cuando pasaron `ms` desde que cambió `key`.
export function useAfter(ms, key) {
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDone(false)
    const id = setTimeout(() => setDone(true), ms)
    return () => clearTimeout(id)
  }, [ms, key])
  return done
}

// QR decorativo (no es un código real), con los tres cuadrados de esquina.
export function QrGlyph({ className = 'w-24 h-24', dark = '#0f172a' }) {
  const cells = useMemo(() => {
    const n = 21
    const out = []
    let seed = 7
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    const inFinder = (x, y) => (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)
    for (let y = 0; y < n; y += 1) {
      for (let x = 0; x < n; x += 1) {
        if (!inFinder(x, y) && rand() > 0.52) out.push([x, y])
      }
    }
    return out
  }, [])
  const finder = (x, y) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill={dark} />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill={dark} />
    </g>
  )
  return (
    <svg viewBox="-1 -1 23 23" className={className} aria-hidden shapeRendering="crispEdges">
      <rect x="-1" y="-1" width="23" height="23" fill="#fff" rx="1" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={dark} />
      ))}
      {finder(0, 0)}
      {finder(14, 0)}
      {finder(0, 14)}
    </svg>
  )
}

// Point de cobro en la repisa del tótem. `state`: idle | waiting | approved
export function PointDevice({ state }) {
  return (
    <div className="absolute left-1/2 top-2 -translate-x-1/2">
      <div className="relative h-[42px] w-[70px] rounded-lg bg-slate-900 border border-white/10 shadow-lg flex items-center gap-1.5 px-1.5">
        <div
          className={`h-7 w-9 rounded-md flex items-center justify-center text-[8px] font-bold ${
            state === 'approved' ? 'bg-emerald-400 text-slate-950' : 'bg-sky-900 text-sky-200'
          }`}
        >
          {state === 'approved' ? <CheckCircle2 className="h-4 w-4" /> : state === 'waiting' ? <Nfc className="h-4 w-4" /> : 'POINT'}
        </div>
        <div className="grid grid-cols-2 gap-[2px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-1.5 w-2 rounded-[2px] bg-slate-600" />
          ))}
        </div>
        <AnimatePresence>
          {state === 'waiting' && (
            <motion.div
              key="card"
              className="absolute -top-3 left-1 h-[26px] w-[42px] rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-xl border border-white/20"
              initial={{ x: 90, y: -50, rotate: 18, opacity: 0 }}
              animate={{ x: 6, y: 0, rotate: -6, opacity: 1 }}
              exit={{ x: 80, y: -40, opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            >
              <span className="absolute left-1.5 top-2 h-2 w-3 rounded-sm bg-amber-300/90" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const viewFor = (phaseId) => {
  if (CATALOG_PHASES.includes(phaseId)) return 'catalog'
  if (['dispense', 'notify', 'metrics', 'help'].includes(phaseId)) return 'pickup'
  if (['chat', 'botReply', 'retry', 'resolved'].includes(phaseId)) return 'chat'
  if (phaseId === 'summary') return 'thanks'
  return phaseId // checkout | paying | approved
}

function Header({ channel }) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950">
          <Store className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <p className="text-[12px] font-bold text-white">{MACHINE_NAME}</p>
          <p className="flex items-center gap-1 text-[9px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {channel === 'phone' ? 'Conectado por QR' : 'Tótem de autoservicio'} · 24 h
          </p>
        </div>
      </div>
    </div>
  )
}

function ScanView() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950">
      <p className="mb-4 text-[12px] font-semibold text-white/90">Escaneá el QR de la máquina</p>
      <div className="relative rounded-xl p-2">
        {['top-0 left-0 border-l-2 border-t-2', 'top-0 right-0 border-r-2 border-t-2', 'bottom-0 left-0 border-l-2 border-b-2', 'bottom-0 right-0 border-r-2 border-b-2'].map((c) => (
          <span key={c} className={`absolute h-5 w-5 border-emerald-300 ${c}`} />
        ))}
        <QrGlyph className="h-28 w-28 opacity-90" />
        <motion.span
          className="absolute left-2 right-2 h-0.5 bg-emerald-300 shadow-[0_0_12px_#6ee7b7]"
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <p className="mt-4 text-[10px] text-white/50">Abriendo la tienda de {MACHINE_NAME}…</p>
    </div>
  )
}

function CatalogView({ cart, actions, hint }) {
  const lines = cartLines(cart)
  const qty = (id) => lines.find((l) => l.id === id)?.qty || 0
  const full = cart.length >= MAX_CART_ITEMS
  return (
    <div className="flex h-full flex-col">
      <p className="px-3 pb-2 text-[15px] font-extrabold text-white">¿Qué vas a llevar?</p>
      <div className="grid grid-cols-2 gap-2 px-3">
        {PRODUCT_ORDER.map((id) => {
          const p = PRODUCTS[id]
          const q = qty(id)
          return (
            <div
              key={id}
              className={`relative rounded-xl border p-2 transition-colors ${
                q ? 'border-emerald-400/60 bg-emerald-400/10' : 'border-white/10 bg-white/[0.04]'
              }`}
            >
              <button
                type="button"
                onClick={() => actions.add(id)}
                disabled={full}
                className="relative flex w-full flex-col items-center text-center disabled:cursor-not-allowed"
                aria-label={`Agregar ${p.name}`}
              >
                <ProductIcon id={id} className="h-11 w-9" />
                <span className="mt-1 text-[11.5px] font-bold text-white">{p.name}</span>
                <span className="text-[9px] text-white/50">{p.detail}</span>
                <span className="mt-0.5 text-[12px] font-extrabold text-emerald-300">{money(p.price)}</span>
                <TapHint show={hint?.name === `product:${id}`} delay={hint?.delay} auto={hint?.auto} />
              </button>
              <AnimatePresence>
                {q > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1.5 -top-1.5 flex items-center gap-0.5 rounded-full bg-emerald-400 pl-0.5 pr-1.5 text-[10px] font-bold text-slate-950 shadow"
                  >
                    <button
                      type="button"
                      onClick={() => actions.remove(id)}
                      aria-label={`Quitar ${p.name}`}
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-950/20"
                    >
                      <Minus className="h-2.5 w-2.5" />
                    </button>
                    {q}
                  </motion.div>
                )}
              </AnimatePresence>
              {!q && (
                <span className="pointer-events-none absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white/80">
                  <Plus className="h-3 w-3" />
                </span>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-auto px-3 pb-3 pt-2">
        <motion.div
          key={cart.length}
          initial={{ scale: cart.length ? 1.04 : 1 }}
          animate={{ scale: 1 }}
          className="flex items-center justify-between rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2"
        >
          <span className="flex items-center gap-2 text-[11px] text-white/80">
            <span className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 text-[8px] font-bold text-slate-950">
                  {cart.length}
                </span>
              )}
            </span>
            {cart.length ? `${cart.length} producto${cart.length > 1 ? 's' : ''}` : 'Carrito vacío'}
          </span>
          <span className="text-[13px] font-extrabold text-white">{money(cartTotal(cart))}</span>
        </motion.div>
        <button
          type="button"
          onClick={actions.checkout}
          disabled={!cart.length}
          className="relative mt-2 w-full rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 py-2.5 text-[12px] font-extrabold text-slate-950 disabled:opacity-40"
        >
          Ir a pagar
          <TapHint show={hint?.name === 'checkout'} delay={hint?.delay} auto={hint?.auto} />
        </button>
      </div>
    </div>
  )
}

function OrderSummary({ cart }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
      {cartLines(cart).map((l) => (
        <div key={l.id} className="flex items-center justify-between py-0.5 text-[11px] text-white/85">
          <span className="flex items-center gap-1.5">
            <ProductIcon id={l.id} className="h-5 w-4" />
            {l.qty} × {PRODUCTS[l.id].name}
          </span>
          <span>{money(PRODUCTS[l.id].price * l.qty)}</span>
        </div>
      ))}
      <div className="mt-1.5 flex justify-between border-t border-white/10 pt-1.5 text-[12px] font-extrabold text-white">
        <span>Total</span>
        <span>{money(cartTotal(cart))}</span>
      </div>
    </div>
  )
}

const PAY_OPTIONS = {
  phone: [{ method: 'mp', icon: Wallet, title: 'Mercado Pago', body: 'Dinero en cuenta o tarjeta guardada' }],
  totem: [
    { method: 'point', icon: Nfc, title: 'Tarjeta en el Point', body: 'Débito o crédito, acercá y listo' },
    { method: 'qr', icon: QrCode, title: 'QR con tu celular', body: 'Escaneá y pagá con Mercado Pago' },
  ],
}

function CheckoutView({ cart, channel, actions, hint }) {
  return (
    <div className="flex h-full flex-col px-3 pb-3">
      <p className="pb-2 text-[15px] font-extrabold text-white">Tu pedido</p>
      <OrderSummary cart={cart} />
      <p className="mb-1.5 mt-3 text-[11px] font-semibold text-white/60">¿Cómo pagás?</p>
      <div className="flex flex-col gap-2">
        {PAY_OPTIONS[channel].map((o) => {
          const Icon = o.icon
          return (
            <button
              key={o.method}
              type="button"
              onClick={() => actions.pay(o.method)}
              className="relative flex items-center gap-2.5 rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-2.5 text-left hover:bg-sky-400/20"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400 text-slate-950">
                <Icon className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[12px] font-bold text-white">{o.title}</span>
                <span className="block text-[9.5px] text-white/55">{o.body}</span>
              </span>
              <TapHint show={hint?.name === `pay:${o.method}`} delay={hint?.delay} auto={hint?.auto} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PayingView({ cart, payMethod }) {
  const almost = useAfter(1700, payMethod)
  const total = money(cartTotal(cart))
  if (payMethod === 'qr') {
    return (
      <div className="relative flex h-full flex-col items-center justify-center px-3 text-center">
        <p className="text-[13px] font-bold text-white">Escaneá para pagar {total}</p>
        <div className="relative mt-3 rounded-xl bg-white p-2">
          <QrGlyph className="h-32 w-32" />
        </div>
        <p className="mt-3 text-[10px] text-white/55">Con la app de Mercado Pago o tu billetera</p>
        <motion.div
          className="absolute bottom-[-10px] right-3 h-[120px] w-[64px] rounded-[14px] border-[3px] border-slate-700 bg-slate-900 shadow-2xl flex items-center justify-center"
          initial={{ y: 140, rotate: 12 }}
          animate={{ y: 0, rotate: -8 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        >
          {almost ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          ) : (
            <span className="h-8 w-8 rounded border-2 border-emerald-300/80" />
          )}
        </motion.div>
      </div>
    )
  }
  if (payMethod === 'point') {
    return (
      <div className="flex h-full flex-col items-center justify-center px-3 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-300">Pagá con tarjeta</p>
        <p className="mt-1 text-[22px] font-extrabold text-white">{total}</p>
        <motion.div
          className="mt-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-sky-400/60 text-sky-300"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        >
          {almost ? <Loader2 className="h-7 w-7 animate-spin" /> : <Nfc className="h-8 w-8" />}
        </motion.div>
        <p className="mt-4 text-[12px] font-semibold text-white">{almost ? 'Procesando…' : 'Acercá tu tarjeta al Point'}</p>
        <motion.p className="mt-1 text-[18px] text-sky-300" animate={{ y: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
          ↓
        </motion.p>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-sky-500/20 to-transparent px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400 text-slate-950">
        <Wallet className="h-6 w-6" />
      </div>
      <p className="mt-3 text-[12px] font-semibold text-sky-200">Mercado Pago</p>
      <p className="mt-1 text-[24px] font-extrabold text-white">{total}</p>
      <p className="text-[10px] text-white/50">a {MACHINE_NAME}</p>
      <div className="mt-6 flex items-center gap-2 text-[12px] font-semibold text-white">
        <Loader2 className="h-4 w-4 animate-spin text-sky-300" />
        {almost ? 'Confirmando con tu banco…' : 'Procesando pago…'}
      </div>
    </div>
  )
}

function ApprovedView({ cart, orderNo }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -40 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-[0_0_40px_rgba(52,211,153,0.6)]"
      >
        <CheckCircle2 className="h-11 w-11" />
      </motion.div>
      <p className="mt-4 text-[17px] font-extrabold text-white">¡Pago aprobado!</p>
      <p className="text-[13px] font-bold text-emerald-300">{money(cartTotal(cart))}</p>
      <p className="mt-1 text-[10px] text-white/50">Pedido #{orderNo}</p>
      <p className="mt-4 text-[11px] text-white/75">La máquina ya está preparando tu pedido</p>
    </div>
  )
}

function PickupView({ cart, phaseId, actions, hint }) {
  const firstDone = useAfter(1500, 'pickup')
  const jamShown = phaseId !== 'dispense'
  const last = cart.length - 1
  return (
    <div className="flex h-full flex-col px-3 pb-3">
      <p className="text-[15px] font-extrabold text-white">Retirá tu pedido</p>
      <p className="pb-2 text-[10px] text-white/55">Abrí la bandeja de abajo de la máquina</p>
      <div className="flex flex-col gap-1.5">
        {cart.map((id, i) => {
          const isLast = i === last
          let status = 'loading'
          if (!isLast && firstDone) status = 'ok'
          if (isLast && jamShown) status = 'error'
          return (
            <div
              key={`${id}-${i}`}
              className={`flex items-center justify-between rounded-xl border px-2.5 py-1.5 ${
                status === 'error' ? 'border-amber-400/50 bg-amber-400/10' : 'border-white/10 bg-white/[0.04]'
              }`}
            >
              <span className="flex items-center gap-2 text-[11.5px] font-semibold text-white">
                <ProductIcon id={id} className="h-6 w-5" />
                {PRODUCTS[id].name}
              </span>
              {status === 'ok' && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Entregado
                </span>
              )}
              {status === 'loading' && (
                <span className="flex items-center gap-1 text-[10px] text-white/60">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Entregando
                </span>
              )}
              {status === 'error' && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5" /> No detectado
                </span>
              )}
            </div>
          )
        })}
      </div>
      <AnimatePresence>
        {jamShown && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-auto">
            <p className="mb-2 text-center text-[10.5px] text-white/70">¿No te salió algo? Te ayudamos al instante.</p>
            <button
              type="button"
              onClick={actions.openChat}
              className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-2.5 text-[12px] font-extrabold text-slate-950"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar con soporte
              <TapHint show={hint?.name === 'openChat'} delay={hint?.delay} auto={hint?.auto} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ThanksView({ cart, actions, hint }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300"
      >
        <CheckCircle2 className="h-9 w-9" />
      </motion.div>
      <p className="mt-3 text-[16px] font-extrabold text-white">¡Gracias por tu compra!</p>
      <div className="mt-2 flex gap-1">
        {cart.map((id, i) => (
          <ProductIcon key={`${id}-${i}`} id={id} className="h-9 w-7" />
        ))}
      </div>
      <p className="mt-2 text-[10.5px] text-white/60">Todo entregado. Te mandamos el comprobante.</p>
      <button
        type="button"
        onClick={actions.restart}
        className="relative mt-5 rounded-xl border border-emerald-400/50 px-5 py-2 text-[12px] font-bold text-emerald-200"
      >
        Nueva compra
        <TapHint show={hint?.name === 'restart'} delay={hint?.delay} auto={hint?.auto} />
      </button>
    </div>
  )
}

export default function CustomerScreen({ state, phaseId, actions, hint }) {
  const { cart, channel, payMethod, orderNo, chat, cycle } = state
  const view = viewFor(phaseId)
  const scanned = useAfter(1500, `${cycle}-${channel}`)
  const showScan = view === 'catalog' && channel === 'phone' && !scanned && cart.length === 0
  const key = showScan ? 'scan' : view
  const lastName = cart.length ? PRODUCTS[cart[cart.length - 1]].name.toLowerCase() : 'producto'

  return (
    <div className="flex h-full flex-col">
      {view !== 'chat' && key !== 'scan' && <Header channel={channel} />}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={key}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {key === 'scan' && <ScanView />}
            {key === 'catalog' && <CatalogView cart={cart} actions={actions} hint={hint} />}
            {key === 'checkout' && <CheckoutView cart={cart} channel={channel} actions={actions} hint={hint} />}
            {key === 'paying' && <PayingView cart={cart} payMethod={payMethod} />}
            {key === 'approved' && <ApprovedView cart={cart} orderNo={orderNo} />}
            {key === 'pickup' && <PickupView cart={cart} phaseId={phaseId} actions={actions} hint={hint} />}
            {key === 'chat' && (
              <SupportChat chat={chat} phaseId={phaseId} productName={lastName} onSend={actions.send} hint={hint} />
            )}
            {key === 'thanks' && <ThanksView cart={cart} actions={actions} hint={hint} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
