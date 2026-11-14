// ALENIA HUB — producto insignia: automatización que conecta máquinas físicas
// (hardware) con software: cobros, app, tótem y panel de administración.
// Reconstruido a partir del bundle publicado en aleniahub.com
// (assets/SolucionesHub-834e7567.js) y reescrito para el nuevo foco del producto.
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Network,
  Layers,
  Cpu,
  CreditCard,
  Smartphone,
  Monitor,
  LayoutDashboard,
  DoorOpen,
  Bot,
  CircuitBoard,
  Zap,
  Wallet,
  Shirt,
  Coffee,
  Dumbbell,
  Car,
  Store,
  Users,
  Info,
  ExternalLink,
  Maximize2,
} from 'lucide-react'
import ScrollReveal from '../components/common/ScrollReveal'
import AnimatedGradient from '../components/common/AnimatedGradient'
import { OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '../config/brand'

// En el bundle original esto era twMerge(clsx(...)); acá alcanza con unir clases.
const cn = (...classes) => classes.filter(Boolean).join(' ')

const MotionLink = motion(Link)

/* -------------------------------------------------------------------------- */
/*                                   SEO                                      */
/* -------------------------------------------------------------------------- */

const SITE_URL = 'https://alenia.online'
const PAGE_PATH = '/soluciones/hub'
const PAGE_TITLE = 'ALENIA HUB | Automatización de máquinas con hardware y software'
const PAGE_DESCRIPTION =
  'ALENIA HUB conecta tus máquinas con cobros, app, tótem y un panel de control en tiempo real. El cliente paga desde el celular, la máquina arranca sola y vos ves todo desde donde estés.'

/* -------------------------------------------------------------------------- */
/*                          Simulación: panel de control                      */
/* -------------------------------------------------------------------------- */

// Centro del SVG (viewBox 1000x800)
const CENTER_X = 500
const CENTER_Y = 400

const SIM_NODES = [
  { id: 'maquinas', icon: Cpu, label: 'Máquinas', color: '#10b981', x: 500, y: 95, delay: 0 },
  { id: 'pagos', icon: CreditCard, label: 'Pagos', color: '#0ea5e9', x: 200, y: 165, delay: 0.4 },
  { id: 'app', icon: Smartphone, label: 'App', color: '#8b5cf6', x: 800, y: 165, delay: 0.8 },
  { id: 'totem', icon: Monitor, label: 'Tótem', color: '#ec4899', x: 120, y: 460, delay: 1.2 },
  { id: 'panel', icon: LayoutDashboard, label: 'Panel', color: '#f59e0b', x: 880, y: 460, delay: 1.6 },
  { id: 'accesos', icon: DoorOpen, label: 'Accesos', color: '#f97316', x: 300, y: 720, delay: 2 },
  { id: 'soporte', icon: Bot, label: 'Soporte IA', color: '#22d3ee', x: 700, y: 720, delay: 2.4 },
]

const SIM_FLOATERS = [
  {
    nodeId: 'maquinas',
    top: '1%',
    left: '57%',
    delay: 0.4,
    color: '#10b981',
    messages: ['Lavadora 3 activada', 'Secadora 2 en ciclo', 'Expendedora con crédito'],
  },
  {
    nodeId: 'pagos',
    top: '12%',
    left: '3%',
    delay: 0,
    color: '#0ea5e9',
    messages: ['Pago confirmado', 'QR de Mercado Pago cobrado', 'Cobro con Point aprobado'],
  },
  {
    nodeId: 'app',
    top: '12%',
    left: '72%',
    delay: 1.5,
    color: '#8b5cf6',
    messages: ['Saldo cargado', 'Código de crédito generado', 'Cliente inició sesión'],
  },
  {
    nodeId: 'totem',
    top: '45%',
    left: '2%',
    delay: 3.5,
    color: '#ec4899',
    messages: ['Venta desde el tótem', 'Máquina elegida en pantalla', 'Ticket enviado'],
  },
  {
    nodeId: 'panel',
    top: '48%',
    left: '79%',
    delay: 1.2,
    color: '#f59e0b',
    messages: ['Cierre de caja generado', 'Alerta: secadora sin conexión', 'Ventas del día actualizadas'],
  },
  {
    nodeId: 'accesos',
    top: '82%',
    left: '5%',
    delay: 0.8,
    color: '#f97316',
    messages: ['Puerta abierta con QR', 'Acceso registrado', 'Cerradura bloqueada'],
  },
  {
    nodeId: 'soporte',
    top: '82%',
    left: '68%',
    delay: 2.2,
    color: '#22d3ee',
    messages: ['Cliente atendido por el asistente', 'Consulta resuelta 24/7', 'Aviso derivado al dueño'],
  },
]

const EventFloater = ({ top, left, delay, color = '#10b981', messages = [], activeNode, nodeId }) => {
  const [index, setIndex] = useState(0)
  const isActive = activeNode === nodeId || activeNode === 'global'
  const duration = isActive ? 2.5 : 6
  const opacityFrames = isActive ? [0, 1, 1, 0.5] : [0, 1, 1, 0]

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, isActive ? 2500 : 6000)
    return () => clearInterval(id)
  }, [messages.length, isActive])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: opacityFrames, y: [10, 0, 0, -10], scale: isActive ? 1.05 : 1 }}
      transition={{
        duration,
        repeat: Infinity,
        delay: isActive ? 0 : delay,
        times: [0, 0.15, 0.85, 1],
        ease: 'easeInOut',
      }}
      className={cn(
        'absolute glass-effect border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-2 shadow-[0_4px_25px_rgba(0,0,0,0.5)] z-30 max-w-[150px] sm:max-w-[none] transition-all',
        isActive && 'shadow-[0_4px_30px_rgba(255,255,255,0.1)]'
      )}
      style={{
        top,
        left,
        borderColor: `${color}${isActive ? '90' : '50'}`,
        background: 'rgba(2, 6, 23, 0.85)',
      }}
    >
      <div
        className={cn('w-1.5 h-1.5 rounded-full shrink-0', isActive ? 'animate-ping' : 'animate-pulse')}
        style={{ backgroundColor: color, boxShadow: `0 0 ${isActive ? '15px' : '8px'} ${color}` }}
      />
      <span className="text-white/95 text-[10px] sm:text-xs font-semibold tracking-wide truncate">
        {messages[index]}
      </span>
    </motion.div>
  )
}

const onKeyActivate = (callback) => (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    callback()
  }
}

const HubControlPanel = ({ className, isFullScreen, onExitFullScreen }) => {
  const [activeNode, setActiveNode] = useState('idle')
  const toggleNode = (id) => setActiveNode((prev) => (prev === id ? 'idle' : id))
  const isGlobal = activeNode === 'global'

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden flex items-center justify-center transition-all duration-700 ease-in-out',
        isFullScreen
          ? 'w-full h-full bg-[#020617] rounded-none shadow-2xl'
          : 'min-h-[500px] md:min-h-[600px] lg:min-h-[700px] bg-[#020617]/50 rounded-2xl shadow-[inset_0_0_80px_rgba(16,185,129,0.05)] h-full',
        className
      )}
    >
      <AnimatePresence>
        {isFullScreen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={onExitFullScreen}
            className="absolute top-6 right-6 z-[110] flex items-center gap-2 rounded-full glass-advanced px-5 py-2.5 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400 font-semibold text-sm transition-colors"
          >
            <X className="w-5 h-5" />
            Cerrar simulación
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-6 left-6 z-[110] glass-advanced rounded-xl p-4 border border-emerald-500/30 shadow-xl max-w-[280px]"
          >
            <div className="flex items-center gap-2 mb-2 w-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-bold text-sm tracking-wider uppercase">Modo simulación</span>
            </div>
            <p className="text-xs text-alenia-light/80 leading-relaxed">
              Tocá las <strong>máquinas, pagos, app, tótem o accesos</strong> o el <strong>núcleo del HUB</strong> para
              ver cómo viaja cada evento: el cliente paga, la máquina arranca y vos lo ves en el panel al instante.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grilla de fondo */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: isGlobal ? 0.8 : 0.5,
        }}
      />
      <div
        className={cn(
          'absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18)_0%,rgba(0,0,0,0)_60%)] pointer-events-none transition-all duration-700',
          isGlobal && 'bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.35)_0%,rgba(0,0,0,0)_70%)]'
        )}
      />

      <svg
        viewBox="0 0 1000 800"
        className="absolute w-full h-full z-10"
        preserveAspectRatio="xMidYMid meet"
        role="group"
        aria-label="Simulación del panel de control de ALENIA HUB"
      >
        {/* Líneas y paquetes de datos */}
        {SIM_NODES.map((node) => {
          const isNodeActive = activeNode === node.id
          const lit = isGlobal || isNodeActive
          const outDuration = lit ? 0.6 : 2.2
          const inDuration = lit ? 0.5 : 1.8
          return (
            <g key={`line-${node.id}`}>
              <line
                x1={CENTER_X}
                y1={CENTER_Y}
                x2={node.x}
                y2={node.y}
                stroke={lit ? node.color : 'rgba(255,255,255,0.1)'}
                strokeWidth={lit ? '3' : '2'}
                strokeDasharray="6 6"
                className="transition-all duration-500"
              />
              <motion.circle
                r={lit ? '6' : '4.5'}
                fill={node.color}
                animate={{ cx: [CENTER_X, node.x], cy: [CENTER_Y, node.y], opacity: [0, 1, 0] }}
                transition={{ duration: outDuration, repeat: Infinity, delay: lit ? 0 : node.delay, ease: 'linear' }}
                style={{ filter: `drop-shadow(0 0 ${lit ? 12 : 6}px ${node.color})` }}
              />
              <motion.circle
                r={lit ? '5' : '3.5'}
                fill="#ffffff"
                animate={{ cx: [node.x, CENTER_X], cy: [node.y, CENTER_Y], opacity: [0, 1, 0] }}
                transition={{ duration: inDuration, repeat: Infinity, delay: lit ? 0.2 : node.delay + 1, ease: 'linear' }}
                style={{ filter: `drop-shadow(0 0 ${lit ? 8 : 4}px #ffffff)` }}
              />
            </g>
          )
        })}

        {/* Nodos */}
        {SIM_NODES.map((node) => {
          const lit = activeNode === node.id || isGlobal
          const Icon = node.icon
          return (
            <g
              key={`node-${node.id}`}
              transform={`translate(${node.x}, ${node.y})`}
              className="cursor-pointer focus:outline-none"
              onClick={() => toggleNode(node.id)}
              onKeyDown={onKeyActivate(() => toggleNode(node.id))}
              role="button"
              tabIndex={0}
              aria-pressed={activeNode === node.id}
              aria-label={`Simular ${node.label}`}
            >
              <rect x="-60" y="-60" width="120" height="120" fill="transparent" />
              <motion.circle
                cx="0"
                cy="0"
                r="48"
                fill="none"
                stroke={node.color}
                strokeWidth={lit ? '2.5' : '1.5'}
                strokeDasharray={lit ? '15 5' : '8 12'}
                opacity={lit ? '1' : '0.6'}
                animate={{ rotate: 360 }}
                transition={{ duration: lit ? 4 : 25, repeat: Infinity, ease: 'linear' }}
              />
              <motion.circle
                cx="0"
                cy="0"
                r="36"
                fill={node.color}
                animate={{
                  opacity: lit ? [0.2, 0.5, 0.2] : [0.05, 0.25, 0.05],
                  scale: lit ? [1, 1.25, 1] : [1, 1.15, 1],
                }}
                transition={{ duration: lit ? 1 : 3, repeat: Infinity, ease: 'easeInOut', delay: lit ? 0 : node.delay }}
                style={{ filter: `blur(${lit ? 12 : 6}px)` }}
              />
              <motion.circle
                cx="0"
                cy="0"
                r="32"
                fill="#020617"
                stroke={node.color}
                strokeWidth={lit ? '4' : '2.5'}
                animate={{ scale: lit ? 1.05 : 1 }}
                className="transition-transform duration-300"
              />
              <motion.svg x="-16" y="-16" width="32" height="32" animate={{ scale: lit ? 1.1 : 1 }}>
                <Icon color={node.color} width="100%" height="100%" strokeWidth={lit ? 2 : 1.8} />
              </motion.svg>
              <motion.rect
                x="-75"
                y="52"
                width="150"
                height="26"
                rx="13"
                fill="#0f172a"
                fillOpacity="0.9"
                stroke={node.color}
                strokeOpacity={lit ? '1' : '0.4'}
                strokeWidth={lit ? '2' : '1.5'}
                className="transition-all duration-300"
              />
              <motion.text
                x="0"
                y="69.5"
                fontSize="13"
                fill={lit ? '#ffffff' : '#f8fafc'}
                fontWeight={lit ? '700' : '600'}
                textAnchor="middle"
                letterSpacing="0.5"
                animate={{ textShadow: lit ? `0 0 10px ${node.color}` : 'none' }}
              >
                {node.label}
              </motion.text>
            </g>
          )
        })}

        {/* Núcleo central */}
        <g
          transform={`translate(${CENTER_X}, ${CENTER_Y})`}
          className="cursor-pointer focus:outline-none"
          onClick={() => toggleNode('global')}
          onKeyDown={onKeyActivate(() => toggleNode('global'))}
          role="button"
          tabIndex={0}
          aria-pressed={isGlobal}
          aria-label="Simular todo el HUB conectado"
        >
          <rect x="-100" y="-100" width="200" height="200" fill="transparent" />
          <motion.circle
            cx="0"
            cy="0"
            r="120"
            fill="#10b981"
            animate={{
              scale: isGlobal ? [1, 1.8, 1] : [1, 1.45, 1],
              opacity: isGlobal ? [0.1, 0.3, 0.1] : [0.05, 0.18, 0.05],
            }}
            transition={{ duration: isGlobal ? 1 : 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="0"
            cy="0"
            r="160"
            fill="#22d3ee"
            animate={{
              scale: isGlobal ? [1, 1.5, 1] : [1, 1.25, 1],
              opacity: isGlobal ? [0.05, 0.2, 0.05] : [0.02, 0.1, 0.02],
            }}
            transition={{ duration: isGlobal ? 1.5 : 4, repeat: Infinity, delay: isGlobal ? 0.3 : 1, ease: 'easeInOut' }}
          />
          <motion.g animate={{ rotate: -360 }} transition={{ duration: isGlobal ? 15 : 50, repeat: Infinity, ease: 'linear' }}>
            <circle
              cx="0"
              cy="0"
              r="115"
              fill="none"
              stroke="#22d3ee"
              strokeWidth={isGlobal ? '3' : '1.5'}
              strokeDasharray="30 15 10 20 40 10"
              opacity={isGlobal ? '0.8' : '0.45'}
            />
            <circle
              cx="0"
              cy="0"
              r="95"
              fill="none"
              stroke="#10b981"
              strokeWidth={isGlobal ? '4' : '2.5'}
              strokeDasharray="20 30"
              opacity={isGlobal ? '1' : '0.7'}
            />
          </motion.g>
          <motion.g animate={{ rotate: 360 }} transition={{ duration: isGlobal ? 10 : 35, repeat: Infinity, ease: 'linear' }}>
            <circle
              cx="0"
              cy="0"
              r="85"
              fill="none"
              stroke="#a78bfa"
              strokeWidth={isGlobal ? '3' : '1.5'}
              strokeDasharray="60 15 10 15"
              opacity={isGlobal ? '0.9' : '0.55'}
            />
          </motion.g>
          <motion.circle
            cx="0"
            cy="0"
            r="65"
            fill="#10b981"
            animate={{
              opacity: isGlobal ? [0.3, 0.8, 0.3] : [0.15, 0.55, 0.15],
              scale: isGlobal ? [1, 1.2, 1] : [1, 1.15, 1],
            }}
            transition={{ duration: isGlobal ? 0.8 : 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: `blur(${isGlobal ? 25 : 18}px)` }}
          />
          <motion.circle
            cx="0"
            cy="0"
            r="68"
            fill="#020617"
            stroke="#10b981"
            strokeWidth={isGlobal ? '6' : '4'}
            animate={{ scale: isGlobal ? [1, 1.1, 1, 1.1, 1] : [1, 1.05, 1, 1.05, 1] }}
            transition={{ duration: isGlobal ? 1 : 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.svg
            x="-38"
            y="-38"
            width="76"
            height="76"
            animate={{ scale: isGlobal ? [1.1, 1.2, 1.1, 1.2, 1.1] : [1, 1.05, 1, 1.05, 1] }}
            transition={{ duration: isGlobal ? 1 : 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <CircuitBoard
              color={isGlobal ? '#6ee7b7' : '#34d399'}
              width="100%"
              height="100%"
              strokeWidth={isGlobal ? '2' : '1.5'}
            />
          </motion.svg>
          <motion.rect
            x="-95"
            y="125"
            width="190"
            height="54"
            rx="16"
            fill="#0f172a"
            fillOpacity="0.95"
            stroke="#10b981"
            strokeWidth={isGlobal ? '3' : '2'}
            animate={{ strokeOpacity: isGlobal ? [0.8, 1, 0.8] : [0.4, 1, 0.4] }}
            transition={{ duration: isGlobal ? 1 : 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.text
            x="0"
            y="149"
            fontSize="23"
            fill="#34d399"
            fontWeight="800"
            textAnchor="middle"
            letterSpacing="1.5"
            animate={{ textShadow: isGlobal ? '0 0 15px rgba(52,211,153,0.8)' : '0 0 0px transparent' }}
          >
            ALENIA HUB
          </motion.text>
          <text x="0" y="168" fontSize="11" fill="#94a3b8" fontWeight="600" textAnchor="middle" letterSpacing="4">
            {isGlobal ? 'CONECTANDO...' : 'CENTRO DE CONTROL'}
          </text>
        </g>
      </svg>

      {/* Mensajes de eventos */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {SIM_FLOATERS.map((floater) => (
          <EventFloater key={floater.nodeId} activeNode={activeNode} {...floater} />
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 Contenido                                  */
/* -------------------------------------------------------------------------- */

const HERO = {
  badge: 'Producto insignia',
  title: 'De la máquina al negocio conectado',
  tagline: 'Tu máquina. Tu marca. Tu experiencia de venta.',
  body:
    'ALENIA HUB conecta tus máquinas con cobros, una app y un panel de control en tiempo real. El cliente paga desde el celular o en un tótem táctil, la máquina se activa sola y vos ves todo lo que pasa en tu local, en el momento.',
  primaryCta: 'Contanos qué máquinas tenés',
  secondaryCta: 'Ver webs y apps',
}

const MODULES = [
  {
    id: 'activacion',
    icon: Zap,
    title: 'Activación de máquinas',
    description:
      'El cliente escanea un QR o paga y la máquina arranca sola. Nos conectamos al equipo con pulsos o relés, sin que nadie tenga que intervenir.',
  },
  {
    id: 'cobros',
    icon: Wallet,
    title: 'Cobros e ingresos',
    description:
      'Mercado Pago con QR, Checkout y Point. También saldo y crédito para que tus clientes carguen una vez y usen cuando quieran.',
  },
  {
    id: 'accesos',
    icon: DoorOpen,
    title: 'Control de accesos',
    description: 'Puertas y cerraduras que abren con un QR. Sabés quién entró y cuándo, sin llaves ni personal en la puerta.',
  },
  {
    id: 'panel',
    icon: LayoutDashboard,
    title: 'Panel de control en tiempo real',
    description:
      'El estado de cada máquina, las ventas, el cierre de caja y las alertas, todo en un mismo lugar y desde el celular.',
  },
  {
    id: 'app-totem',
    icon: Smartphone,
    title: 'App y tótem con tu marca',
    description:
      'App móvil, tótem táctil y pantallas propias con tu logo y tus colores. La experiencia de venta es tuya, no de un tercero.',
  },
  {
    id: 'asistente',
    icon: Bot,
    title: 'Asistente IA de soporte 24/7',
    description:
      'Un asistente que responde a tus clientes a cualquier hora: cómo usar las máquinas, qué hacer si algo falla y cuándo avisarte.',
  },
]

const PHASES = [
  {
    step: 1,
    title: 'Diagnóstico de tus equipos',
    body:
      'Antes de tocar un cable, relevamos lo que ya tenés. Cada equipo es distinto, así que arrancamos por entender cómo funciona hoy tu negocio.',
    bullets: ['Marca y modelo de cada máquina', 'Controlador o placa que usa', 'Conectividad del local', 'Cómo cobrás hoy'],
  },
  {
    step: 2,
    title: 'Conexión física',
    body:
      'Conectamos las máquinas al HUB con el hardware que corresponda en cada caso: placas IoT, relés y cerraduras, o integración directa con las placas o APIs del fabricante.',
    bullets: ['Placas IoT y relés', 'Cerraduras y accesos', 'Placas o APIs del fabricante'],
  },
  {
    step: 3,
    title: 'Software a medida',
    body:
      'Armamos el software que usan tus clientes y tu equipo: la app, el tótem, el panel de administración y el asistente de soporte, con tu marca.',
    highlight: 'Todo conectado entre sí: lo que pasa en la máquina se ve en el panel.',
  },
  {
    step: 4,
    title: 'Puesta en marcha y soporte',
    body:
      'Probamos todo en el local, con las máquinas funcionando de verdad. Después seguimos al lado: monitoreo, alertas y ajustes a medida que el negocio lo pide.',
    bullets: ['Pruebas en campo', 'Monitoreo y alertas', 'Ajustes continuos'],
  },
]

const INDUSTRIES = [
  { id: 'lavanderias', icon: Shirt, title: 'Lavanderías self-service' },
  { id: 'vending', icon: Coffee, title: 'Máquinas vending' },
  { id: 'accesos', icon: Dumbbell, title: 'Accesos y gimnasios' },
  { id: 'lavaderos', icon: Car, title: 'Lavaderos de autos y cocheras' },
  { id: 'sin-personal', icon: Store, title: 'Negocios físicos sin personal' },
]

const INDUSTRIES_NOTE = 'Evaluamos cada equipo: la compatibilidad depende de la marca, el modelo y el controlador.'

const CASE_STUDY = {
  eyebrow: 'Caso real',
  title: 'Caso real: LaIA',
  subtitle: 'Lavandería self-service 24/7, sin personal en el local.',
  body:
    'LaIA es una lavandería que funciona las 24 horas sin nadie atendiendo. Con ALENIA HUB, el cliente hace todo solo: entra, paga, usa las máquinas y se va. El dueño controla todo desde el panel.',
  items: [
    'Lavadoras y secadoras Electrolux conectadas',
    'Expendedoras vending integradas en modo crédito: la app carga saldo y muestra un código que se marca en la máquina',
    'Pago con Mercado Pago',
    'Puerta que abre con QR',
    'Tótem táctil en el local',
    'App para clientes y panel de administración',
  ],
  linkLabel: 'Conocé LaIA',
  linkHref: 'https://applaia.com',
}

const OWNER_GAINS = {
  title: 'Qué ganás como dueño',
  subtitle: 'Lo que cambia en el día a día cuando tus máquinas están conectadas.',
  items: [
    {
      icon: Users,
      label: 'Operación',
      value: 'Menos personal en el local',
      detail: 'Los clientes pagan y usan las máquinas solos. Tu equipo se enfoca en lo que de verdad necesita una persona.',
    },
    {
      icon: CreditCard,
      label: 'Cobros',
      value: 'Cobro sin efectivo',
      detail: 'QR, app, tótem o Point. Menos plata en el local y cada cobro registrado.',
    },
    {
      icon: Smartphone,
      label: 'Control',
      value: 'Todo desde el celular',
      detail: 'Ventas, estado de las máquinas y alertas al instante, estés donde estés.',
    },
    {
      icon: Cpu,
      label: 'Información',
      value: 'Datos de cada máquina',
      detail: 'Cuánto se usa cada equipo, cuándo falla y qué deja. Decidís con información, no a ojo.',
    },
  ],
}

const WHY_ALENIA = {
  title: 'Por qué ALENIA',
  paragraphs: [
    'ALENIA es una empresa argentina que une hardware y software. Trabajamos del lado de la máquina y del lado de la pantalla, así no tenés que coordinar a un electricista, a un programador y a una plataforma de pagos por separado.',
    'ALENIA HUB no es una presentación: ya está funcionando en un negocio real sin personal, como LaIA. Lo que te ofrecemos lo armamos y lo probamos en el local, con máquinas de verdad.',
  ],
}

const FINAL_CTA = {
  title: '¿Qué máquinas querés conectar?',
  body:
    'Contanos la marca y el modelo de tus equipos, cuántas máquinas tenés funcionando y qué querés conectar: cobros, accesos, app, tótem o panel. Con eso te decimos qué se puede hacer y cómo lo haríamos.',
}

/* -------------------------------------------------------------------------- */
/*                                   Página                                   */
/* -------------------------------------------------------------------------- */

export default function SolucionesHub() {
  const [isSimulationFullScreen, setIsSimulationFullScreen] = useState(false)
  const [isIntroOpen, setIsIntroOpen] = useState(false)

  // Igual que en la versión publicada: el modal de bienvenida aparece a los 800 ms.
  useEffect(() => {
    const id = setTimeout(() => setIsIntroOpen(true), 800)
    return () => clearTimeout(id)
  }, [])

  // Escape cierra el modal o la simulación a pantalla completa.
  useEffect(() => {
    if (!isIntroOpen && !isSimulationFullScreen) return undefined
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setIsIntroOpen(false)
      setIsSimulationFullScreen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isIntroOpen, isSimulationFullScreen])

  const startSimulation = () => {
    setIsIntroOpen(false)
    setIsSimulationFullScreen(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const canonicalUrl = `${SITE_URL}${PAGE_PATH}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-alenia-dark to-slate-950 py-20 overflow-x-hidden">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:alt" content="ALENIA HUB - De la máquina al negocio conectado" />
        <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <Link
            to="/soluciones"
            className="inline-flex items-center gap-2 text-alenia-primary hover:text-alenia-secondary text-sm font-medium mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a soluciones
          </Link>
        </ScrollReveal>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-4">
                {HERO.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 leading-tight">
                <AnimatedGradient
                  style={{ backgroundImage: 'linear-gradient(-45deg, #34d399 0%, #22d3ee 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
                >
                  {HERO.title}
                </AnimatedGradient>
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-white/90 mb-6">{HERO.tagline}</p>
              <p className="text-lg text-alenia-light/85 leading-relaxed mb-8">{HERO.body}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MotionLink
                  to="/contacto"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-900 font-semibold px-8 py-4 rounded-xl glow-btn"
                >
                  {HERO.primaryCta}
                  <ArrowRight className="w-5 h-5" />
                </MotionLink>
                <Link
                  to="/soluciones/digitales"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/5 font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  {HERO.secondaryCta}
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <motion.div
              className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-[0_0_60px_rgba(52,211,153,0.15)] bg-slate-950/50 flex items-center justify-center min-h-[400px] sm:min-h-[500px]"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <HubControlPanel isFullScreen={false} />
              <button
                type="button"
                onClick={() => setIsSimulationFullScreen(true)}
                className="absolute bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full glass-advanced border border-emerald-500/30 px-4 py-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 hover:border-emerald-400 transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
                Pantalla completa
              </button>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Módulos */}
        <section className="mb-24" aria-labelledby="hub-modules-heading">
          <ScrollReveal>
            <h2
              id="hub-modules-heading"
              className="text-3xl md:text-4xl font-bold text-white text-center mb-4 flex items-center justify-center gap-3"
            >
              <Network className="w-8 h-8 text-violet-400" />
              Qué conecta ALENIA HUB
            </h2>
            <p className="text-center text-alenia-light/70 max-w-2xl mx-auto mb-12">
              Módulos que se combinan según tu negocio: de la máquina al cobro, y del cobro a tu panel.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((module, index) => {
              const Icon = module.icon
              return (
                <ScrollReveal key={module.id} delay={0.06 * index} direction="up">
                  <motion.article
                    className="h-full rounded-2xl border border-violet-500/20 bg-slate-900/40 p-6 hover:border-violet-400/40 transition-colors"
                    whileHover={{ y: -4 }}
                  >
                    <Icon className="w-8 h-8 text-violet-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">{module.title}</h3>
                    <p className="text-sm text-alenia-light/75 leading-relaxed">{module.description}</p>
                  </motion.article>
                </ScrollReveal>
              )
            })}
          </div>
        </section>

        {/* Cuatro fases */}
        <section className="mb-24" aria-labelledby="hub-phases-heading">
          <ScrollReveal>
            <h2 id="hub-phases-heading" className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Cómo lo implementamos, en cuatro fases
            </h2>
            <p className="text-center text-alenia-light/70 max-w-2xl mx-auto mb-14">
              Relevamos tus equipos, los conectamos, armamos el software y lo ponemos en marcha con vos.
            </p>
          </ScrollReveal>
          <div className="relative max-w-4xl mx-auto">
            <div
              className="absolute left-[1.125rem] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/30 to-transparent md:-translate-x-1/2"
              aria-hidden
            />
            <ul className="space-y-12">
              {PHASES.map((phase, index) => (
                <ScrollReveal key={phase.step} delay={0.08 * index} direction="up">
                  <li className="relative flex flex-col md:flex-row gap-6 md:gap-10 md:items-start md:odd:flex-row-reverse">
                    <div className="flex md:w-1/2 md:justify-center shrink-0">
                      <motion.div
                        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border-2 border-emerald-400 text-emerald-300 font-bold text-sm shadow-[0_0_20px_rgba(52,211,153,0.35)]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {phase.step}
                      </motion.div>
                    </div>
                    <div className="md:w-1/2 pl-14 md:pl-0 glass-advanced rounded-2xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-cyan-400 shrink-0" />
                        {phase.title}
                      </h3>
                      <p className="text-alenia-light/80 leading-relaxed">{phase.body}</p>
                      {phase.bullets && (
                        <ul className="mt-4 space-y-2">
                          {phase.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2 text-sm text-alenia-light/75">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                      {phase.highlight && (
                        <p className="mt-4 text-sm font-medium text-cyan-300/90 border-l-2 border-cyan-400 pl-3">
                          {phase.highlight}
                        </p>
                      )}
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Rubros */}
        <section className="mb-24" aria-labelledby="hub-industries-heading">
          <ScrollReveal>
            <h2 id="hub-industries-heading" className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Rubros donde aplica
            </h2>
            <p className="text-center text-alenia-light/70 max-w-2xl mx-auto mb-12">
              Negocios donde una máquina cobra, se activa o abre una puerta, y el dueño quiere controlarlo todo a distancia.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {INDUSTRIES.map((industry, index) => {
              const Icon = industry.icon
              return (
                <ScrollReveal key={industry.id} delay={0.05 * index} direction="up">
                  <motion.div
                    className="h-full flex flex-col items-center text-center gap-3 rounded-2xl border border-emerald-500/15 bg-slate-900/40 p-6 hover:border-emerald-400/40 transition-colors"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      <Icon className="w-6 h-6 text-emerald-300" />
                    </div>
                    <h3 className="text-base font-semibold text-white leading-snug">{industry.title}</h3>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
          <ScrollReveal>
            <p className="mt-8 flex items-start justify-center gap-2 text-sm text-alenia-light/70 max-w-2xl mx-auto text-center">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              {INDUSTRIES_NOTE}
            </p>
          </ScrollReveal>
        </section>

        {/* Caso real */}
        <section
          className="mb-24 rounded-3xl border border-white/10 bg-slate-900/30 p-8 md:p-12"
          aria-labelledby="hub-case-heading"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-4">
                  {CASE_STUDY.eyebrow}
                </span>
                <h2 id="hub-case-heading" className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {CASE_STUDY.title}
                </h2>
                <p className="text-lg font-medium text-emerald-300/90 mb-4">{CASE_STUDY.subtitle}</p>
                <p className="text-alenia-light/80 leading-relaxed mb-8">{CASE_STUDY.body}</p>
                <motion.a
                  href={CASE_STUDY.linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 border border-cyan-400/40 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  {CASE_STUDY.linkLabel}
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </ScrollReveal>
            <ul className="grid gap-3">
              {CASE_STUDY.items.map((item, index) => (
                <ScrollReveal key={item} delay={0.05 * index}>
                  <li className="flex items-start gap-3 rounded-xl bg-black/30 border border-emerald-500/15 p-4 text-sm text-alenia-light/85">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Qué gana el dueño */}
        <section
          className="mb-24 rounded-3xl border border-white/10 bg-slate-900/30 p-8 md:p-12"
          aria-labelledby="hub-gains-heading"
        >
          <ScrollReveal>
            <h2 id="hub-gains-heading" className="text-2xl md:text-3xl font-bold text-white mb-2">
              {OWNER_GAINS.title}
            </h2>
            <p className="text-sm text-alenia-light/60 mb-10 max-w-3xl">{OWNER_GAINS.subtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OWNER_GAINS.items.map((item, index) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.value} delay={0.05 * index}>
                  <div className="h-full rounded-xl bg-black/30 border border-emerald-500/15 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-emerald-400" />
                      <p className="text-xs uppercase tracking-wider text-emerald-400/80">{item.label}</p>
                    </div>
                    <p className="text-xl font-bold text-white mb-2">{item.value}</p>
                    <p className="text-sm text-alenia-light/70">{item.detail}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </section>

        {/* Por qué ALENIA */}
        <section className="mb-24 max-w-3xl mx-auto text-center" aria-labelledby="hub-story-heading">
          <ScrollReveal>
            <h2 id="hub-story-heading" className="text-3xl font-bold text-white mb-6">
              {WHY_ALENIA.title}
            </h2>
            {WHY_ALENIA.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-alenia-light/80 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </ScrollReveal>
        </section>

        {/* CTA final */}
        <ScrollReveal>
          <div className="text-center glass-advanced rounded-2xl p-10 border border-emerald-500/25 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">{FINAL_CTA.title}</h3>
            <p className="text-alenia-light/75 mb-6">{FINAL_CTA.body}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MotionLink
                to="/contacto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-900 font-semibold px-8 py-3 rounded-xl"
              >
                {HERO.primaryCta}
                <ArrowRight className="w-5 h-5" />
              </MotionLink>
              <Link
                to="/soluciones"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/5 font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a soluciones
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Modal de bienvenida */}
      <AnimatePresence>
        {isIntroOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsIntroOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="hub-intro-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[160] w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl p-8 overflow-hidden pointer-events-auto"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] text-emerald-400">
                  <Network className="w-8 h-8" />
                </div>
                <h3 id="hub-intro-title" className="text-2xl font-bold text-white mb-3">
                  Tomá el control de tus máquinas
                </h3>
                <p className="text-alenia-light/80 mb-8 leading-relaxed">
                  Bienvenido a ALENIA HUB. Vas a ver una simulación de cómo el HUB conecta tus máquinas, los pagos y
                  el panel de control: el cliente paga, la máquina arranca sola y vos lo ves todo en tiempo real.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    type="button"
                    onClick={startSimulation}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-shadow"
                  >
                    Iniciar simulación
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsIntroOpen(false)}
                    className="flex-1 bg-transparent border border-white/20 text-white font-medium py-3.5 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    Ver información
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Simulación a pantalla completa (portal al body) */}
      {typeof window !== 'undefined' &&
        document.body &&
        createPortal(
          <AnimatePresence>
            {isSimulationFullScreen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="fixed inset-0 z-[9999] h-screen w-screen bg-[#020617] overflow-hidden"
                style={{ position: 'fixed' }}
              >
                <HubControlPanel isFullScreen onExitFullScreen={() => setIsSimulationFullScreen(false)} />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}
