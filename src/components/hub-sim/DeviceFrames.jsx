// Marcos de los aparatos (celular, tótem, tablet) y el indicador de toque.
import { motion } from 'framer-motion'
import { Battery, Signal, Wifi } from 'lucide-react'
import { nowTime } from './hubSimData'

export function StatusBar({ light = true, className = '' }) {
  return (
    <div
      className={`flex items-center justify-between px-4 pt-2 pb-1 text-[10px] font-semibold ${
        light ? 'text-white/90' : 'text-slate-800'
      } ${className}`}
    >
      <span>{nowTime()}</span>
      <span className="flex items-center gap-1">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <Battery className="w-3.5 h-3.5" />
      </span>
    </div>
  )
}

export function PhoneFrame({ children, className = '', style }) {
  return (
    <div
      className={`relative rounded-[2.2rem] bg-slate-800 p-[7px] shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}
      style={style}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-slate-950">
        <div className="absolute left-1/2 top-1.5 z-30 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  )
}

export function TabletFrame({ children, className = '', style }) {
  return (
    <div
      className={`relative rounded-[1.7rem] bg-slate-800 p-[9px] shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}
      style={style}
    >
      <div className="absolute left-1/2 top-[3px] h-1 w-1 -translate-x-1/2 rounded-full bg-slate-600" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-slate-950">{children}</div>
    </div>
  )
}

// Tótem de autoservicio: pantalla arriba, repisa con el Point y pie.
export function TotemFrame({ children, shelf, className = '', style }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`} style={style}>
      <div className="relative w-full rounded-[1.4rem] bg-slate-800 p-[8px] shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)] h-[400px]">
        <div className="absolute left-1/2 top-[3px] h-1 w-1 -translate-x-1/2 rounded-full bg-slate-500" />
        <div className="relative h-full w-full overflow-hidden rounded-[0.9rem] bg-slate-950">{children}</div>
      </div>
      <div className="relative h-[56px] w-[88%] rounded-b-xl bg-gradient-to-b from-slate-700 to-slate-800 border-t border-black/40">
        {shelf}
      </div>
      <div className="h-[62px] w-14 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
      <div className="h-3 w-40 rounded-full bg-slate-800 shadow-[0_8px_20px_rgba(0,0,0,0.6)]" />
    </div>
  )
}

// Indicador de "dedo": en la demo muestra qué se va a tocar; en manual, qué conviene tocar.
export function TapHint({ show, delay = 0, auto = true }) {
  if (!show) return null
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000, duration: 0.25 }}
    >
      <span
        className={`absolute h-9 w-9 rounded-full ${auto ? 'bg-white/30' : 'bg-emerald-300/25'} animate-ping`}
      />
      <motion.span
        className={`relative h-6 w-6 rounded-full border-2 ${
          auto ? 'border-white bg-white/40' : 'border-emerald-300 bg-emerald-300/30'
        } shadow-[0_0_12px_rgba(255,255,255,0.6)]`}
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
    </motion.span>
  )
}
