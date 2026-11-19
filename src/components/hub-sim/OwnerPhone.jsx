// Celular del dueño: pantalla bloqueada que recibe las notificaciones del negocio.
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { AlertTriangle, Bot, FileText, Package, ShoppingCart } from 'lucide-react'
import { PhoneFrame, StatusBar } from './DeviceFrames'
import { nowTime } from './hubSimData'

const KIND = {
  sale: { icon: ShoppingCart, color: '#34d399' },
  alert: { icon: AlertTriangle, color: '#f59e0b' },
  stock: { icon: Package, color: '#fb923c' },
  resolved: { icon: Bot, color: '#22d3ee' },
  report: { icon: FileText, color: '#a78bfa' },
}

const today = () => {
  const s = new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function Notification({ n, isNew }) {
  const k = KIND[n.kind] || KIND.report
  const Icon = k.icon
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -24, scale: 0.92, height: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1, height: 'auto' }}
      exit={{ opacity: 0, scale: 0.9, height: 0 }}
      transition={{ delay: (n.delay || 0) / 1000, type: 'spring', stiffness: 320, damping: 26 }}
      className="overflow-hidden"
    >
      <div
        className="mb-1.5 rounded-2xl border bg-white/[0.12] px-2.5 py-2 backdrop-blur-md"
        style={{ borderColor: isNew ? `${k.color}90` : 'rgba(255,255,255,0.1)' }}
      >
        <div className="flex items-center gap-1.5 text-[8.5px] text-white/60">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-gradient-to-br from-emerald-400 to-cyan-500 text-[7px] font-black text-slate-950">
            A
          </span>
          ALENIA HUB
          <span className="ml-auto">{n.time === nowTime() ? 'ahora' : n.time}</span>
        </div>
        <div className="mt-1 flex items-start gap-1.5">
          <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: k.color }} />
          <div className="min-w-0">
            <p className="text-[11px] font-bold leading-tight text-white">{n.title}</p>
            <p className="text-[9.5px] leading-snug text-white/70">{n.body}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function OwnerPhone({ notifications, style, className = '' }) {
  const topId = notifications[0]?.id
  const controls = useAnimationControls()
  const firstId = useRef(topId)

  // Vibra cuando entra una notificación nueva.
  useEffect(() => {
    if (topId === firstId.current) return
    controls.start({ x: [0, -3, 3, -3, 3, 0], transition: { duration: 0.4 } })
  }, [topId, controls])

  return (
    <motion.div className={className} style={style} animate={controls}>
      <PhoneFrame className="h-full w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0e7490_0%,#1e1b4b_45%,#020617_100%)]" />
        <div className="relative flex h-full flex-col">
          <StatusBar className="pt-3" />
          <div className="mt-3 text-center">
            <p className="text-[44px] font-semibold leading-none tracking-tight text-white">{nowTime()}</p>
            <p className="mt-1 text-[10.5px] text-white/70">{today()}</p>
          </div>
          <div className="mt-4 flex-1 overflow-hidden px-2">
            <AnimatePresence initial={false}>
              {notifications.map((n, i) => (
                <Notification key={n.id} n={n} isNew={i < 2 && n.kind !== 'report'} />
              ))}
            </AnimatePresence>
          </div>
          <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-white/60" />
        </div>
      </PhoneFrame>
    </motion.div>
  )
}
