// Núcleo del HUB en el centro de la escena y las conexiones por donde viajan
// los eventos (pago, orden a la máquina, aviso al dueño, panel, soporte).
import { motion } from 'framer-motion'
import { CircuitBoard } from 'lucide-react'
import { HUB_STATUS } from './hubSimData'

export function HubCore({ phaseId, style }) {
  const alert = ['notify', 'metrics', 'help'].includes(phaseId)
  const color = alert ? '#f59e0b' : '#10b981'
  return (
    <div className="absolute flex flex-col items-center" style={style}>
      <div className="relative h-[150px] w-[150px]">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: `radial-gradient(circle, ${color}55 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <motion.svg
          viewBox="-75 -75 150 150"
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <circle r="70" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="30 15 10 20 40 10" opacity="0.5" />
          <circle r="58" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="60 15 10 15" opacity="0.55" />
        </motion.svg>
        <motion.svg
          viewBox="-75 -75 150 150"
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <circle r="48" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="20 30" opacity="0.8" />
        </motion.svg>
        <div
          className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] bg-[#020617] transition-colors duration-500"
          style={{ borderColor: color, boxShadow: `0 0 30px ${color}80` }}
        >
          <CircuitBoard className="h-9 w-9 transition-colors duration-500" style={{ color }} />
        </div>
      </div>
      <div className="mt-1 rounded-xl border border-emerald-500/40 bg-slate-900/90 px-4 py-1.5 text-center">
        <p className="text-[15px] font-extrabold tracking-wider text-emerald-300">ALENIA HUB</p>
        <motion.p
          key={phaseId}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-[9.5px] font-semibold uppercase tracking-[0.18em] ${alert ? 'text-amber-300' : 'text-slate-400'}`}
        >
          {HUB_STATUS[phaseId]}
        </motion.p>
      </div>
    </div>
  )
}

// Curva cuadrática muestreada para animar los paquetes con keyframes.
const sample = ([x0, y0], [cx, cy], [x1, y1], n = 14) => {
  const xs = []
  const ys = []
  for (let k = 0; k <= n; k += 1) {
    const t = k / n
    const a = (1 - t) * (1 - t)
    const b = 2 * (1 - t) * t
    const c = t * t
    xs.push(a * x0 + b * cx + c * x1)
    ys.push(a * y0 + b * cy + c * y1)
  }
  return { xs, ys }
}

const reverse = (link) => ({ ...link, from: link.to, to: link.from })

// Qué paquetes viajan en cada fase: [enlace, sentido, color, demora en s]
const PACKETS = {
  approved: [['customer', 'in', '#34d399', 0], ['machine', 'out', '#34d399', 0.6]],
  dispense: [['machine', 'out', '#34d399', 0], ['machine', 'out', '#34d399', 0.8]],
  notify: [['machine', 'in', '#f59e0b', 0], ['owner', 'out', '#34d399', 0.5], ['owner', 'out', '#f59e0b', 1.2]],
  metrics: [['tablet', 'out', '#a78bfa', 0], ['tablet', 'out', '#a78bfa', 0.7]],
  help: [['customer', 'in', '#f59e0b', 0.3]],
  chat: [['customer', 'in', '#22d3ee', 0.2]],
  botReply: [['customer', 'out', '#22d3ee', 0.4], ['machine', 'out', '#22d3ee', 1.4]],
  retry: [['machine', 'out', '#fbbf24', 0], ['machine', 'in', '#34d399', 1.6]],
  resolved: [['owner', 'out', '#22d3ee', 0], ['tablet', 'out', '#22d3ee', 0.5]],
  paying: [['customer', 'in', '#38bdf8', 0.8]],
}

export function HubLinks({ phaseId, links, width, height }) {
  const active = new Set((PACKETS[phaseId] || []).map(([name]) => name))
  return (
    <svg className="pointer-events-none absolute inset-0" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {Object.entries(links).map(([name, link]) => (
        <path
          key={name}
          d={`M${link.from[0]} ${link.from[1]} Q${link.ctrl[0]} ${link.ctrl[1]} ${link.to[0]} ${link.to[1]}`}
          fill="none"
          stroke={active.has(name) ? 'rgba(52,211,153,0.55)' : 'rgba(255,255,255,0.12)'}
          strokeWidth={active.has(name) ? 2.5 : 1.5}
          strokeDasharray="6 6"
          style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
        />
      ))}
      {(PACKETS[phaseId] || []).map(([name, dir, color, delay], k) => {
        const base = links[name]
        const link = dir === 'out' ? base : reverse(base)
        const { xs, ys } = sample(link.from, base.ctrl, link.to)
        return (
          <motion.circle
            key={`${phaseId}-${k}`}
            r="6"
            fill={color}
            initial={{ cx: xs[0], cy: ys[0], opacity: 0 }}
            animate={{ cx: xs, cy: ys, opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: 0.9, delay, ease: 'linear', repeat: 1, repeatDelay: 0.5 }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        )
      })}
    </svg>
  )
}
