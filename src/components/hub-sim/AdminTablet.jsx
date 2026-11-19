// Tablet del dueño con el panel de ALENIA HUB: ventas, gráfico por hora, stock,
// estado de la máquina y actividad, todo actualizándose en vivo.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Activity, AlertTriangle, Bot, CheckCircle2, DollarSign, Receipt, RefreshCw, TrendingUp } from 'lucide-react'
import { TabletFrame } from './DeviceFrames'
import { HOURS, MACHINE_NAME, PRODUCTS, PRODUCT_ORDER, money } from './hubSimData'

function useCountUp(value, duration = 900) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const start = performance.now()
    const a = from.current
    let raf
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - (1 - p) ** 3
      setShown(a + (value - a) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else from.current = value
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      from.current = value
    }
  }, [value, duration])
  return shown
}

function Kpi({ icon: Icon, label, value, format, color }) {
  const shown = useCountUp(value)
  return (
    <div className="relative rounded-xl border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5">
      <motion.span
        key={value}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl border-2"
        style={{ borderColor: color }}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.6 }}
      />
      <p className="flex items-center gap-1 text-[8.5px] font-semibold uppercase tracking-wider text-white/50">
        <Icon className="h-3 w-3" style={{ color }} />
        {label}
      </p>
      <p className="text-[16px] font-extrabold leading-tight text-white">{format(shown)}</p>
    </div>
  )
}

function HourlyChart({ hourly }) {
  const max = Math.max(30000, ...hourly) * 1.1
  return (
    <div>
      <div className="relative flex h-[74px] items-end gap-[7px] border-b border-white/10">
        <span className="absolute inset-x-0 top-1/3 border-t border-white/[0.06]" />
        <span className="absolute inset-x-0 top-2/3 border-t border-white/[0.06]" />
        {hourly.map((v, i) => {
          const current = i === hourly.length - 1
          return (
            <motion.div
              key={HOURS[i]}
              className={`relative flex-1 rounded-t-[3px] ${
                current ? 'bg-gradient-to-t from-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]' : 'bg-violet-400/45'
              }`}
              initial={false}
              animate={{ height: `${Math.max((v / max) * 100, 4)}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            />
          )
        })}
      </div>
      <div className="mt-1 flex gap-[7px]">
        {HOURS.map((hour, i) => (
          <span
            key={hour}
            className={`flex-1 text-center text-[8px] ${i === HOURS.length - 1 ? 'text-emerald-300' : 'text-slate-500'}`}
          >
            {i === HOURS.length - 1 ? 'ahora' : `${hour}h`}
          </span>
        ))}
      </div>
    </div>
  )
}

const STATUS = {
  ok: { text: 'En línea · todo funcionando', color: '#34d399', icon: CheckCircle2 },
  alerta: { text: 'Atasco detectado', color: '#f59e0b', icon: AlertTriangle },
  reintento: { text: 'Reintento remoto en curso', color: '#fbbf24', icon: RefreshCw },
}

const TONE = { ok: '#34d399', warn: '#f59e0b', info: '#22d3ee' }

export default function AdminTablet({ metrics, style, className = '' }) {
  const status = STATUS[metrics.machineStatus]
  const StatusIcon = status.icon
  return (
    <TabletFrame className={className} style={style}>
      <div className="flex h-full flex-col gap-2 p-3">
        <div className="flex items-center justify-between">
          <div className="leading-tight">
            <p className="text-[13px] font-extrabold text-white">Panel del negocio</p>
            <p className="text-[9px] text-white/50">{MACHINE_NAME} · hoy</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            EN VIVO
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <Kpi icon={DollarSign} label="Ventas de hoy" value={metrics.sales} format={money} color="#34d399" />
          <Kpi icon={Receipt} label="Operaciones" value={metrics.operations} format={(v) => Math.round(v)} color="#38bdf8" />
          <Kpi
            icon={TrendingUp}
            label="Ticket promedio"
            value={Math.round(metrics.sales / metrics.operations)}
            format={money}
            color="#a78bfa"
          />
          <Kpi icon={Bot} label="Resueltos por IA" value={metrics.incidents} format={(v) => Math.round(v)} color="#22d3ee" />
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-2.5 pb-1 pt-1.5">
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-white/50">Ventas por hora</p>
          <HourlyChart hourly={metrics.hourly} />
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5">
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-white/50">Stock por carril</p>
          {PRODUCT_ORDER.map((id) => {
            const left = metrics.stock[id]
            const low = left <= 3
            return (
              <div key={id} className="flex items-center gap-2 py-[2px] text-[9.5px]">
                <span className="w-[54px] text-white/80">
                  {PRODUCTS[id].lane} {PRODUCTS[id].name}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: low ? '#f97316' : '#34d399' }}
                    animate={{ width: `${(left / metrics.capacity) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className={`w-5 text-right font-bold ${low ? 'text-orange-400' : 'text-white/80'}`}>{left}</span>
              </div>
            )
          })}
        </div>

        <motion.div
          className="flex items-center gap-2 rounded-xl border px-2.5 py-1.5"
          animate={{
            borderColor: `${status.color}70`,
            backgroundColor: `${status.color}14`,
          }}
        >
          <StatusIcon
            className={`h-4 w-4 ${metrics.machineStatus === 'reintento' ? 'animate-spin' : ''} ${
              metrics.machineStatus === 'alerta' ? 'animate-pulse' : ''
            }`}
            style={{ color: status.color }}
          />
          <div className="leading-tight">
            <p className="text-[10px] font-bold text-white">{MACHINE_NAME}</p>
            <p className="text-[9px]" style={{ color: status.color }}>
              {status.text}
            </p>
          </div>
        </motion.div>

        <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5">
          <p className="mb-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-white/50">
            <Activity className="h-3 w-3" /> Actividad
          </p>
          <AnimatePresence initial={false}>
            {metrics.activity.map((a) => (
              <motion.p
                key={a.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 py-[1px] text-[9.5px] text-white/75"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TONE[a.tone] }} />
                <span className="truncate">{a.text}</span>
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </TabletFrame>
  )
}
