// Expendedora conectada al HUB, dibujada en SVG: carriles con espiral, caída del
// producto a la bandeja, atasco y reintento a distancia.
import { motion } from 'framer-motion'
import { ProductShape } from './ProductArt'
import { QrGlyph } from './CustomerScreen'
import { PRODUCTS, PRODUCT_ORDER, money, phaseIndex } from './hubSimData'

const COLS = [16, 74]
const ROWS = [40, 148]
const LANE_POS = {
  A1: { x: COLS[0], y: ROWS[0] },
  A2: { x: COLS[1], y: ROWS[0] },
  B1: { x: COLS[0], y: ROWS[1] },
  B2: { x: COLS[1], y: ROWS[1] },
}
const TRAY_Y = 302

const productStart = (lane) => ({ x: LANE_POS[lane].x + 7, y: LANE_POS[lane].y + 22 })

function Coil({ x, y, spinning }) {
  const d = Array.from({ length: 6 })
    .map((_, i) => `M${x + 4 + i * 8} ${y} q4 -9 8 0`)
    .join(' ')
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#94a3b8"
      strokeWidth="1.6"
      strokeLinecap="round"
      animate={spinning ? { x: [0, -8] } : { x: 0 }}
      transition={spinning ? { duration: 0.35, repeat: Infinity, ease: 'linear' } : { duration: 0.2 }}
    />
  )
}

const machineMode = (phaseId) => {
  const i = phaseIndex(phaseId)
  if (i < phaseIndex('paying')) return { led: '#34d399', blink: false, lines: ['ELEGÍ TU', 'PRODUCTO'] }
  if (phaseId === 'paying') return { led: '#fbbf24', blink: true, lines: ['ESPERANDO', 'PAGO'] }
  if (phaseId === 'approved') return { led: '#34d399', blink: false, lines: ['PAGO', 'APROBADO'] }
  if (phaseId === 'dispense') return { led: '#34d399', blink: true, lines: ['ENTREGANDO', '...'] }
  if (i < phaseIndex('retry')) return { led: '#ef4444', blink: true, lines: ['ERROR', 'SENSOR'], error: true }
  if (phaseId === 'retry') return { led: '#fbbf24', blink: true, lines: ['REINTENTO', 'REMOTO'] }
  return { led: '#34d399', blink: false, lines: ['RETIRE SU', 'PEDIDO'] }
}

export default function VendingMachine({ phaseId, cart, channel, cycle, className = '', style }) {
  const i = phaseIndex(phaseId)
  const dispenseI = phaseIndex('dispense')
  const retryI = phaseIndex('retry')
  const last = cart.length - 1
  const mode = machineMode(phaseId)
  const lastLane = cart.length ? PRODUCTS[cart[last]].lane : null

  const spinning = new Set()
  if (phaseId === 'dispense') cart.forEach((id) => spinning.add(PRODUCTS[id].lane))
  if (phaseId === 'retry' && lastLane) spinning.add(lastLane)

  const dropped = i < dispenseI ? [] : cart

  return (
    <div className={`relative ${className}`} style={style}>
      <svg viewBox="0 0 190 440" className="h-full w-full drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]" role="img" aria-label="Expendedora conectada">
        <defs>
          <linearGradient id="vm-body" x1="0" x2="1">
            <stop offset="0" stopColor="#1e293b" />
            <stop offset="0.5" stopColor="#334155" />
            <stop offset="1" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="vm-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.02" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Cuerpo */}
        <rect x="0" y="0" width="190" height="430" rx="14" fill="url(#vm-body)" stroke="#475569" strokeWidth="1.5" />
        <rect x="10" y="428" width="24" height="10" rx="2" fill="#0f172a" />
        <rect x="156" y="428" width="24" height="10" rx="2" fill="#0f172a" />

        {/* Marca */}
        <text x="14" y="21" fontSize="9" fontWeight="800" fill="#34d399" letterSpacing="1">ALENIA HUB</text>
        <motion.circle
          cx="174"
          cy="17"
          r="3.5"
          fill="#22d3ee"
          animate={{ opacity: spinning.size ? [0.3, 1, 0.3] : 0.8 }}
          transition={{ duration: 0.5, repeat: spinning.size ? Infinity : 0 }}
        />
        <text x="140" y="20" fontSize="6" fill="#94a3b8">online</text>

        {/* Vidriera */}
        <rect x="10" y="30" width="124" height="232" rx="6" fill="#0b1222" stroke="#0f172a" strokeWidth="2" />
        {PRODUCT_ORDER.map((id) => {
          const p = PRODUCTS[id]
          const pos = LANE_POS[p.lane]
          const start = productStart(p.lane)
          const isSpinning = spinning.has(p.lane)
          return (
            <g key={id}>
              <motion.g
                animate={isSpinning ? { x: [start.x, start.x + 1.5, start.x] } : { x: start.x }}
                transition={isSpinning ? { duration: 0.35, repeat: Infinity } : { duration: 0.2 }}
                style={{ y: start.y }}
                initial={false}
              >
                <ProductShape id={id} />
              </motion.g>
              <Coil x={pos.x} y={pos.y + 84} spinning={isSpinning} />
              <rect x={pos.x} y={pos.y + 86} width="54" height="3" fill="#475569" />
              <rect x={pos.x + 8} y={pos.y + 92} width="38" height="10" rx="2" fill="#0f172a" />
              <text x={pos.x + 27} y={pos.y + 99.5} fontSize="6.3" fill="#e2e8f0" textAnchor="middle" fontWeight="700">
                {p.lane} {money(p.price)}
              </text>
            </g>
          )
        })}
        <rect x="10" y="30" width="124" height="232" rx="6" fill="url(#vm-glass)" pointerEvents="none" />

        {/* Panel lateral */}
        <rect x="140" y="34" width="42" height="40" rx="4" fill="#020617" stroke={mode.error ? '#ef4444' : '#0f766e'} />
        {mode.lines.map((line, k) => (
          <motion.text
            key={`${phaseId}-${line}`}
            x="161"
            y={50 + k * 10}
            fontSize="6"
            fontWeight="700"
            textAnchor="middle"
            fill={mode.error ? '#fca5a5' : '#5eead4'}
            animate={{ opacity: mode.blink ? [1, 0.35, 1] : 1 }}
            transition={{ duration: 0.8, repeat: mode.blink ? Infinity : 0 }}
          >
            {line}
          </motion.text>
        ))}
        {mode.error && lastLane && (
          <text x="161" y="70" fontSize="5.5" textAnchor="middle" fill="#fca5a5">
            CARRIL {lastLane}
          </text>
        )}
        {Array.from({ length: 12 }).map((_, k) => (
          <rect key={k} x={144 + (k % 3) * 12} y={84 + Math.floor(k / 3) * 11} width="9" height="8" rx="1.5" fill="#475569" />
        ))}
        <foreignObject x="141" y="136" width="40" height="40">
          <div style={{ width: 40, height: 40, opacity: channel === 'phone' ? 1 : 0.35 }}>
            <QrGlyph className="h-10 w-10" />
          </div>
        </foreignObject>
        <text x="161" y="185" fontSize="5.2" textAnchor="middle" fill="#cbd5e1">
          ESCANEÁ Y COMPRÁ
        </text>

        {/* LED de estado */}
        <motion.circle
          cx="161"
          cy="212"
          r="6"
          fill={mode.led}
          animate={{ opacity: mode.blink ? [1, 0.3, 1] : 1 }}
          transition={{ duration: 0.6, repeat: mode.blink ? Infinity : 0 }}
          style={{ filter: `drop-shadow(0 0 6px ${mode.led})` }}
        />

        {/* Bandeja */}
        <text x="72" y="282" fontSize="6.5" fill="#94a3b8" textAnchor="middle" letterSpacing="1">
          RETIRE AQUÍ
        </text>
        <rect x="12" y="288" width="120" height="64" rx="6" fill="#020617" stroke="#475569" />
        <rect x="12" y="288" width="120" height="10" rx="3" fill="#1e293b" />
        <rect x="140" y="250" width="42" height="12" rx="3" fill="#0f172a" />
        <rect x="150" y="254" width="22" height="3" rx="1.5" fill="#334155" />
        <rect x="10" y="370" width="170" height="44" rx="6" fill="#0f172a" opacity="0.7" />
        <text x="95" y="396" fontSize="7.5" fill="#64748b" textAnchor="middle" letterSpacing="2">
          SIN EFECTIVO · 24 H
        </text>
        {/* Producto que sale: cae a la bandeja o queda trabado */}
        {dropped.map((id, k) => {
          const p = PRODUCTS[id]
          const start = productStart(p.lane)
          const tray = { x: 16 + k * 36, y: TRAY_Y }
          const isLast = k === last
          const jammed = isLast && i >= dispenseI && i < retryI
          const fallDelay = phaseId === 'dispense' ? 0.5 + k * 0.6 : phaseId === 'retry' ? 0.9 : 0
          const target = jammed
            ? { x: start.x + 6, y: start.y + 16, rotate: 24 }
            : { x: tray.x, y: tray.y, rotate: k % 2 ? 8 : -6 }
          return (
            <motion.g
              key={`${cycle}-${k}-${id}`}
              initial={{ x: start.x, y: start.y, rotate: 0, opacity: 1 }}
              animate={target}
              transition={{
                delay: jammed ? 0.5 + k * 0.6 : fallDelay,
                duration: jammed ? 0.6 : 0.75,
                ease: jammed ? 'easeOut' : [0.55, 0, 1, 0.45],
              }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              <g transform="scale(0.85)">
                <ProductShape id={id} />
              </g>
            </motion.g>
          )
        })}

      </svg>
      {mode.error && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[14px] border-2 border-red-500/70"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </div>
  )
}
