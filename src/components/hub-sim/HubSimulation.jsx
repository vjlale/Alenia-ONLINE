// Simulación interactiva de ALENIA HUB: una compra real de punta a punta
// (carrito → pago QR o tótem → entrega → aviso al dueño → métricas → soporte).
// La escena se dibuja a tamaño fijo y se escala para entrar en su caja.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Hand, MonitorSmartphone, Pause, Play, RotateCcw, Smartphone, Sparkles, Store, X } from 'lucide-react'
import AdminTablet from './AdminTablet'
import CustomerScreen, { PointDevice } from './CustomerScreen'
import { PhoneFrame, StatusBar, TotemFrame } from './DeviceFrames'
import { HubCore, HubLinks } from './HubCore'
import OwnerPhone from './OwnerPhone'
import VendingMachine from './VendingMachine'
import { defaultPayMethod, useHubSimulation } from './useHubSimulation'
import {
  AUTO_TARGETS,
  CATALOG_PHASES,
  GROUPS,
  MANUAL_HINTS,
  PHASES,
  PRODUCTS,
  narrative,
} from './hubSimData'

const WIDE = { w: 1280, h: 600 }
const COMPACT = { w: 424, h: 540 }
const COMPACT_BREAKPOINT = 820

const LINKS = {
  customer: { from: [600, 280], ctrl: [420, -70], to: [250, 46] },
  machine: { from: [600, 280], ctrl: [548, 290], to: [494, 300] },
  owner: { from: [600, 280], ctrl: [650, 250], to: [702, 230] },
  tablet: { from: [600, 280], ctrl: [760, 610], to: [932, 500] },
}

const OWNER_SHOT_PHASES = ['notify', 'metrics', 'resolved']

function useElementSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const update = () => setSize({ width: el.clientWidth, height: el.clientHeight })
    update()
    if (typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return size
}

function computeHint(state, phaseId, phase) {
  if (state.mode === 'auto') {
    let name = AUTO_TARGETS[phaseId]
    if (!name) return null
    if (name === 'pay') name = `pay:${defaultPayMethod(state)}`
    return { name, delay: phase.duration * 0.45, auto: true }
  }
  let name = null
  if (CATALOG_PHASES.includes(phaseId)) name = state.cart.length ? 'checkout' : null
  else if (phaseId === 'checkout') name = `pay:${defaultPayMethod(state)}`
  else if (phaseId === 'help') name = 'openChat'
  else if (phaseId === 'chat') name = 'suggestion:0'
  else if (phaseId === 'summary') name = 'restart'
  return name ? { name, delay: 500, auto: false } : null
}

function CustomerDevice({ state, phaseId, actions, hint, style }) {
  const screen = <CustomerScreen state={state} phaseId={phaseId} actions={actions} hint={hint} />
  if (state.channel === 'phone') {
    return (
      <div className="absolute" style={{ ...style, height: 500 }}>
        <PhoneFrame className="h-full w-full">
          <div className="flex h-full flex-col">
            <StatusBar className="pt-3" />
            <div className="min-h-0 flex-1">{screen}</div>
          </div>
        </PhoneFrame>
      </div>
    )
  }
  const pointState =
    phaseId === 'paying' && state.payMethod === 'point'
      ? 'waiting'
      : phaseId === 'approved' && state.payMethod === 'point'
      ? 'approved'
      : 'idle'
  return (
    <div className="absolute" style={{ ...style, height: 530 }}>
      <TotemFrame shelf={<PointDevice state={pointState} />}>
        <div className="flex h-full flex-col pt-1">{screen}</div>
      </TotemFrame>
    </div>
  )
}

function Stage({ layout, sim, hint, shot }) {
  const { state, actions } = sim
  const phaseId = sim.phase.id
  const machine = (
    <VendingMachine phaseId={phaseId} cart={state.cart} channel={state.channel} cycle={state.cycle} className="h-full w-full" />
  )

  if (layout === 'wide') {
    return (
      <>
        <HubLinks phaseId={phaseId} links={LINKS} width={WIDE.w} height={WIDE.h} />
        <p className="absolute left-[24px] top-[10px] text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300/80">
          Lado del cliente
        </p>
        <p className="absolute left-[702px] top-[10px] text-[11px] font-bold uppercase tracking-[0.25em] text-violet-300/80">
          Lado del dueño
        </p>
        <CustomerDevice state={state} phaseId={phaseId} actions={actions} hint={hint} style={{ left: 24, top: 44, width: 240 }} />
        <div className="absolute" style={{ left: 290, top: 80, width: 205, height: 475 }}>
          {machine}
        </div>
        <HubCore phaseId={phaseId} style={{ left: 525, top: 205, width: 150 }} />
        <OwnerPhone notifications={state.notifications} className="absolute" style={{ left: 702, top: 44, width: 210, height: 410 }} />
        <AdminTablet metrics={state.metrics} className="absolute" style={{ left: 932, top: 44, width: 330, height: 520 }} />
      </>
    )
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {shot === 'cliente' ? (
        <motion.div key="cliente" className="absolute inset-0" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          <CustomerDevice state={state} phaseId={phaseId} actions={actions} hint={hint} style={{ left: 0, top: 4, width: 240 }} />
          <div className="absolute" style={{ left: 252, top: 100, width: 170, height: 394 }}>
            {machine}
          </div>
        </motion.div>
      ) : (
        <motion.div key="duenio" className="absolute inset-0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
          <OwnerPhone notifications={state.notifications} className="absolute" style={{ left: 0, top: 40, width: 190, height: 420 }} />
          <div className="absolute origin-top-left" style={{ left: 200, top: 40, width: 330, height: 520, transform: 'scale(0.68)' }}>
            <AdminTablet metrics={state.metrics} className="h-full w-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Timeline({ sim }) {
  const { state, actions, phase, running } = sim
  const currentGroup = GROUPS.findIndex((g) => g.id === phase.group)
  const groupPhases = PHASES.filter((p) => p.group === phase.group)
  const k = groupPhases.findIndex((p) => p.id === phase.id)
  const n = groupPhases.length
  const advancing = running && !(state.mode === 'manual' && phase.waitFor)
  return (
    <ol className="flex gap-1.5 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0" aria-label="Pasos de la simulación">
      {GROUPS.map((g, i) => {
        const done = i < currentGroup
        const current = i === currentGroup
        return (
          <li key={g.id} className="shrink-0">
            <button
              type="button"
              onClick={() => actions.jump(g.id)}
              aria-current={current ? 'step' : undefined}
              className={`relative overflow-hidden whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                current
                  ? 'border-emerald-400/70 bg-emerald-400/10 text-white'
                  : done
                  ? 'border-emerald-400/30 text-emerald-200/80 hover:text-white'
                  : 'border-white/15 text-white/50 hover:text-white'
              }`}
            >
              {current && (
                <motion.span
                  key={`${state.cycle}-${state.phase}-${advancing}`}
                  aria-hidden
                  className="absolute inset-y-0 left-0 bg-emerald-400/20"
                  initial={{ width: `${(k / n) * 100}%` }}
                  animate={{ width: `${((advancing ? k + 1 : k) / n) * 100}%` }}
                  transition={{ duration: advancing ? phase.duration / 1000 : 0, ease: 'linear' }}
                />
              )}
              <span className="relative">
                {i + 1}. {g.label}
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

function Controls({ sim }) {
  const { state, actions, phase } = sim
  const lastId = state.cart[state.cart.length - 1]
  const text = narrative(phase.id, {
    channel: state.channel,
    payMethod: state.payMethod,
    lastName: lastId ? PRODUCTS[lastId].name.toLowerCase() : 'producto',
  })
  const canSwitchChannel = CATALOG_PHASES.includes(phase.id)
  return (
    <div className="flex flex-col gap-3 px-1 pt-3">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${phase.id}-${state.channel}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-sm md:text-base font-semibold text-white min-h-[2.5rem] md:min-h-0"
            aria-live="polite"
          >
            {text}
          </motion.p>
        </AnimatePresence>
        <span
          className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
            state.mode === 'auto' ? 'bg-cyan-400/10 text-cyan-200' : 'bg-emerald-400/15 text-emerald-200'
          }`}
        >
          {state.mode === 'auto' ? <Sparkles className="h-3.5 w-3.5" /> : <Hand className="h-3.5 w-3.5" />}
          {state.mode === 'auto'
            ? 'Demo automática · tocá la pantalla para tomar el control'
            : `Vos tenés el control · ${MANUAL_HINTS[phase.id] || 'mirá cómo lo resuelve el HUB…'}`}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="w-full min-w-0 md:w-auto md:flex-1">
          <Timeline sim={sim} />
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={actions.togglePlay}
            aria-label={state.playing ? 'Pausar' : 'Reproducir'}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-white"
          >
            {state.playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={actions.reset}
            aria-label="Reiniciar"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-white/50">El cliente compra desde:</span>
        {[
          { id: 'phone', label: 'Su celular (QR)', icon: Smartphone },
          { id: 'totem', label: 'El tótem', icon: MonitorSmartphone },
        ].map((c) => {
          const Icon = c.icon
          const on = state.channel === c.id
          return (
            <button
              key={c.id}
              type="button"
              disabled={!canSwitchChannel && !on}
              onClick={() => actions.setChannel(c.id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-semibold transition-colors disabled:opacity-40 ${
                on ? 'border-sky-400/60 bg-sky-400/15 text-sky-100' : 'border-white/15 text-white/60 hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {c.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// En celulares se ve un lado por vez; la cámara sigue la acción, pero se puede elegir.
function ShotTabs({ shot, setShot }) {
  return (
    <div className="mb-3 grid grid-cols-2 rounded-full border border-white/15 p-0.5 text-xs" role="tablist">
      {[
        { id: 'cliente', label: 'Lado del cliente', icon: Store },
        { id: 'duenio', label: 'Lado del dueño', icon: Smartphone },
      ].map((t) => {
        const Icon = t.icon
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={shot === t.id}
            onClick={() => setShot(t.id)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 font-semibold transition-colors ${
              shot === t.id ? 'bg-white/15 text-white' : 'text-white/55'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

export default function HubSimulation({ isFullScreen = false, onExitFullScreen, paused = false, className = '' }) {
  const sim = useHubSimulation({ paused })
  const areaRef = useRef(null)
  const { width, height } = useElementSize(areaRef)
  const compact = width > 0 && width < COMPACT_BREAKPOINT
  const dims = compact ? COMPACT : WIDE

  const [shotOverride, setShotOverride] = useState(null)
  useEffect(() => setShotOverride(null), [sim.state.phase])
  const autoShot = OWNER_SHOT_PHASES.includes(sim.phase.id) ? 'duenio' : 'cliente'
  const shot = shotOverride || autoShot

  const maxScale = isFullScreen ? 1.6 : 1.1
  const byWidth = width ? width / dims.w : 0
  const scale = isFullScreen && height ? Math.min(byWidth, height / dims.h, maxScale) : Math.min(byWidth, maxScale)
  const offsetX = Math.max((width - dims.w * scale) / 2, 0)
  const hint = computeHint(sim.state, sim.phase.id, sim.phase)

  return (
    <div
      ref={sim.containerRef}
      className={`relative flex w-full flex-col ${isFullScreen ? 'h-full p-4 md:p-6' : ''} ${className}`}
    >
      {isFullScreen && (
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-300">Simulación ALENIA HUB</p>
            <p className="hidden text-xs text-white/60 md:block">
              Una compra real de punta a punta. Tocá cualquier pantalla o paso para tomar el control.
            </p>
          </div>
          <button
            type="button"
            onClick={onExitFullScreen}
            className="flex shrink-0 items-center gap-2 rounded-full border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-300 hover:border-red-400 hover:text-red-200"
          >
            <X className="h-4 w-4" />
            Cerrar simulación
          </button>
        </div>
      )}

      {compact && <ShotTabs shot={shot} setShot={setShotOverride} />}

      <div
        ref={areaRef}
        className={`relative w-full ${isFullScreen ? 'min-h-0 flex-1' : ''}`}
        style={isFullScreen ? undefined : { height: dims.h * scale || dims.h * 0.5 }}
      >
        {width > 0 && (
          <div
            className="absolute top-0 origin-top-left"
            style={{ left: offsetX, width: dims.w, height: dims.h, transform: `scale(${scale})` }}
          >
            <Stage layout={compact ? 'compact' : 'wide'} sim={sim} hint={hint} shot={shot} />
          </div>
        )}
      </div>

      <Controls sim={sim} />
    </div>
  )
}
