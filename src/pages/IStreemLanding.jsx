import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  ArrowUpRight,
  Radio,
  Eye,
  Activity,
  Gauge,
  BookOpen,
  Smartphone,
  Monitor,
  Wifi,
  Tv,
  Video,
  Layers,
  Zap,
  ShieldCheck,
  Clock,
  Sparkles,
  Check,
  ExternalLink,
  ChevronRight,
  Cpu,
  Play,
} from 'lucide-react';

const ACCENT = '#22d3ee';
const ACCENT_SOFT = '#0891b2';
const ORANGE = '#fb923c';

const APP_URL = 'https://i-streem.lovable.app';

const features = [
  {
    id: 'transmitir',
    icon: Radio,
    title: 'Transmitir',
    subtitle: 'Tu iPhone como cámara profesional',
    description:
      'Abrí i-Streem en tu celular, generá un código de 4 dígitos y listo: estás al aire. WebRTC pone tu cámara y micrófono en la nube, con baja latencia y control total sobre la calidad.',
    bullets: [
      'Cámara trasera o frontal',
      'Código de sala de 4 dígitos',
      'Autoconexión rápida',
      'Compatible con cualquier iPhone',
    ],
  },
  {
    id: 'ver',
    icon: Eye,
    title: 'Ver',
    subtitle: 'Viewer multi-pantalla sin instalar nada',
    description:
      'Desde cualquier navegador — PC, Mac, TV Box, tablet — ingresá el código y mirá la transmisión en vivo. Soporta multi-viewer: el mismo stream lo pueden abrir varios dispositivos al mismo tiempo.',
    bullets: [
      'Funciona en cualquier navegador',
      'Multi-viewer simultáneo',
      'Vista limpia sin UI',
      'Auto-reconexión',
    ],
  },
  {
    id: 'estudio',
    icon: Activity,
    title: 'Modo Estudio',
    subtitle: 'Preview + telemetría + URL OBS, todo en vivo',
    description:
      'Pantalla de control para producciones serias. Monitoreá FPS, bitrate, RTT, packet loss, jitter, resolución y códec en tiempo real mientras el show corre. Copiá la URL lista para pegar como Browser Source en OBS.',
    bullets: [
      'Telemetría WebRTC en vivo',
      'URL de viewer limpia para OBS',
      'Preview integrado',
      'Feature PRO',
    ],
    pro: true,
  },
  {
    id: 'health',
    icon: Gauge,
    title: 'Health Check',
    subtitle: 'Testeá la red antes del show',
    description:
      'Diagnóstico WebRTC completo que corre en segundos: valida servidores ICE, conectividad STUN/TURN, IP pública, relay accesible y backend de signaling. Saber si la red del venue aguanta — antes de que llegue la gente.',
    bullets: [
      'ICE + STUN + TURN',
      'Diagnóstico pre-show',
      'Validación de signaling',
      'Detección de restricciones de red',
    ],
  },
  {
    id: 'resolume',
    icon: BookOpen,
    title: 'Guía Resolume',
    subtitle: 'Integración con VJ workflow completa',
    description:
      'Manual paso a paso para llevar el stream desde el viewer a Resolume Arena/Avenue vía OBS + Spout (Windows) o NDI (multiplataforma). Incluye URL template lista para Browser Source, params avanzados (fit, transparencia, overlay de stats) y tips de performance.',
    bullets: [
      'Browser Source directo',
      'Spout / NDI output',
      'Params avanzados',
      'Resolume 7.23+ ready',
    ],
  },
];

const flowSteps = [
  { icon: Smartphone, label: 'iPhone', color: ORANGE },
  { icon: Wifi, label: 'WebRTC', color: ACCENT },
  { icon: Monitor, label: 'Viewer', color: ORANGE },
  { icon: Video, label: 'OBS', color: ORANGE },
  { icon: Layers, label: 'Spout / NDI', color: ACCENT },
  { icon: Tv, label: 'Resolume', color: ACCENT },
];

const useCases = [
  {
    icon: '🎛️',
    title: 'VJs y shows en vivo',
    description:
      'Llevá la cámara del iPhone directo a Resolume Arena/Avenue como capa de video. Ideal para fiestas, teatro, clubes y eventos donde necesitás una fuente móvil sin cableado.',
  },
  {
    icon: '📺',
    title: 'Streamers y creadores',
    description:
      'Usá tu iPhone como segunda cámara remota en OBS, Twitch o YouTube. Angulo POV, escena secundaria, cámara de manos — sin cables, sin tarjeta de captura.',
  },
  {
    icon: '🎤',
    title: 'Eventos y conferencias',
    description:
      'Multi-viewer desde cualquier navegador. Varios equipos técnicos ven la misma señal simultánea para producción, monitoreo y proyección.',
  },
  {
    icon: '🎬',
    title: 'Producciones independientes',
    description:
      'Telemetría WebRTC en Modo Estudio para validar la calidad antes de grabar. Health Check pre-show para no depender de la suerte con la red del venue.',
  },
];

const stackItems = [
  { icon: Wifi, label: 'WebRTC nativo' },
  { icon: ShieldCheck, label: 'STUN + TURN' },
  { icon: Cpu, label: 'Signaling propio' },
  { icon: Video, label: 'OBS compatible' },
  { icon: Layers, label: 'Spout / NDI' },
  { icon: Tv, label: 'Resolume 7.23+' },
];

export default function IStreemLanding() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.25]);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeFeature, setActiveFeature] = useState('estudio');

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const activeFeatureData = features.find((f) => f.id === activeFeature) ?? features[2];
  const activeScreenshot = {
    transmitir: '/images/i-streem/transmisor.png',
    ver: '/images/i-streem/viewer.png',
    estudio: '/images/i-streem/modo-estudio.png',
    health: '/images/i-streem/health-check.png',
    resolume: '/images/i-streem/guia-resolume.png',
  }[activeFeature];

  return (
    <>
      <Helmet>
        <title>i-Streem — Streaming WebRTC profesional iPhone → PC | Alen.iA</title>
        <link rel="canonical" href="https://alenia.online/apps/i-streem" />
        <meta
          name="description"
          content="i-Streem es la app de streaming WebRTC profesional de Alen.iA. Transmití desde tu iPhone a cualquier PC o Mac con baja latencia, multi-viewer, telemetría en vivo, Health Check pre-show e integración nativa con OBS y Resolume."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alenia.online/apps/i-streem" />
        <meta property="og:title" content="i-Streem — WebRTC pro iPhone → PC" />
        <meta
          property="og:description"
          content="Streaming WebRTC profesional con Modo Estudio, Health Check e integración con OBS y Resolume. Desarrollado por la startup Alen.iA."
        />
        <meta property="og:image" content="https://alenia.online/images/i-streem/logo.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="i-Streem — WebRTC pro iPhone → PC" />
        <meta
          property="twitter:description"
          content="Streaming WebRTC profesional con Modo Estudio, Health Check e integración con OBS y Resolume."
        />
        <meta property="twitter:image" content="https://alenia.online/images/i-streem/logo.png" />
      </Helmet>

      <main className="relative min-h-screen overflow-hidden bg-black text-white">
        {/* Background: mouse gradient + grid */}
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            background: `radial-gradient(900px circle at ${mousePos.x}% ${mousePos.y}%, ${ACCENT}14, transparent 55%)`,
          }}
        />
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Scanline sutil top */}
        <motion.div
          className="pointer-events-none fixed inset-x-0 top-0 h-[2px] z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
            boxShadow: `0 0 12px ${ACCENT}`,
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ======================== HERO ======================== */}
        <section className="relative min-h-[70vh] pt-20 pb-10 sm:min-h-[90vh] sm:pt-28 sm:pb-16">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="container mx-auto max-w-6xl px-5 sm:px-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/apps"
                className="group mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white sm:mb-10"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Volver a Apps
              </Link>
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mb-6 flex items-center sm:mb-8"
            >
              <img
                src="/images/i-streem/logo.png"
                alt="i-Streem"
                className="h-14 w-auto sm:h-20 lg:h-24"
                style={{ filter: `drop-shadow(0 0 24px ${ACCENT}33)` }}
              />
            </motion.div>

            {/* Badge LIVE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] sm:mb-8 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.25em]"
              style={{
                borderColor: `${ACCENT}66`,
                backgroundColor: `${ACCENT}14`,
                color: ACCENT,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: ORANGE }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: ORANGE }}
                />
              </span>
              Live · WebRTC · En producción
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              iPhone →{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_SOFT} 100%)`,
                }}
              >
                cualquier PC
              </span>
              <br />
              <span className="text-white/85">en tiempo real.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:mt-8 sm:text-lg md:text-xl"
            >
              Streaming WebRTC profesional con baja latencia, control de bitrate y
              multi-viewer.{' '}
              <span className="font-semibold text-white">Modo Estudio</span> con
              telemetría en vivo,{' '}
              <span className="font-semibold text-white">Health Check</span> pre-show y
              flujo completo hacia{' '}
              <span style={{ color: ACCENT }}>OBS + Resolume</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <motion.a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-transform sm:px-8 sm:py-4 sm:text-base"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_SOFT} 100%)`,
                  boxShadow: `0 10px 40px ${ACCENT}55, 0 0 80px ${ACCENT}33`,
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Play className="h-5 w-5 fill-current" />
                Probar i-Streem
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>
              <a
                href={`${APP_URL}/resolume-guide`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08] sm:px-7 sm:py-4 sm:text-base"
              >
                <BookOpen className="h-5 w-5" style={{ color: ORANGE }} />
                Ver guía Resolume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 grid max-w-2xl grid-cols-3 gap-3 sm:mt-14 sm:gap-4"
            >
              <HeroStat icon={Clock} value="< 200ms" label="Latencia típica" />
              <HeroStat icon={Eye} value="Multi" label="Viewer simultáneo" />
              <HeroStat icon={Zap} value="Pro" label="Telemetría en vivo" />
            </motion.div>
          </motion.div>
        </section>

        {/* ======================== CÓMO FUNCIONA (FLUJO) ======================== */}
        <section className="relative border-t border-white/5 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-5 sm:px-6">
            <div className="mb-10 text-center sm:mb-14">
              <div
                className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] sm:mb-4 sm:text-xs sm:tracking-[0.3em]"
                style={{ color: ACCENT }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Cómo funciona
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                Del <span style={{ color: ORANGE }}>iPhone</span> al{' '}
                <span style={{ color: ACCENT }}>proyector</span>, sin escalas técnicas
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base text-white/55">
                El flujo completo corre sobre WebRTC. Sin servidores de streaming propios,
                sin encoders pagos, sin tarjetas de captura. Solo navegador.
              </p>
            </div>

            {/* Flow pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {flowSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold"
                      style={{
                        borderColor: `${step.color}55`,
                        backgroundColor: `${step.color}14`,
                        color: step.color,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                      {step.label}
                    </div>
                    {i < flowSteps.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-white/30" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-white/45">
              El Viewer se abre como <span className="text-white/80">Browser Source</span>{' '}
              en OBS. Desde OBS sale por <span className="text-white/80">Spout</span> (misma
              PC, GPU directa) o <span className="text-white/80">NDI</span> (red local).
              Resolume 7.23+ recibe nativamente ambos.
            </p>
          </div>
        </section>

        {/* ======================== FEATURES INTERACTIVAS ======================== */}
        <section className="relative py-16 sm:py-24">
          <div className="container mx-auto max-w-7xl px-5 sm:px-6">
            <div className="mb-10 max-w-3xl sm:mb-16">
              <div
                className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] sm:mb-4 sm:text-xs sm:tracking-[0.3em]"
                style={{ color: ACCENT }}
              >
                <Activity className="h-3.5 w-3.5" />
                Todo lo que hace i-Streem
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                Cinco modos. Un solo stream.
              </h2>
              <p className="mt-4 text-sm text-white/55 sm:mt-5 sm:text-base">
                Cada pantalla de la app resuelve una necesidad específica del flujo
                broadcast. Click en cualquier feature para verla en acción.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[380px_1fr]">
              {/* Feature selector */}
              <div className="space-y-3">
                {features.map((f) => {
                  const Icon = f.icon;
                  const isActive = f.id === activeFeature;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveFeature(f.id)}
                      className={`group flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition ${
                        isActive
                          ? 'bg-white/[0.06]'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                      style={
                        isActive
                          ? {
                              borderColor: `${ACCENT}66`,
                              boxShadow: `0 0 0 1px ${ACCENT}33, 0 10px 40px ${ACCENT}1a`,
                            }
                          : {}
                      }
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                        style={{
                          borderColor: isActive ? `${ACCENT}77` : 'rgba(255,255,255,0.1)',
                          backgroundColor: isActive ? `${ACCENT}1a` : 'rgba(255,255,255,0.03)',
                          color: isActive ? ACCENT : 'rgba(255,255,255,0.7)',
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className="font-display text-base font-bold"
                            style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.85)' }}
                          >
                            {f.title}
                          </h3>
                          {f.pro && (
                            <span
                              className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                              style={{
                                backgroundColor: `${ORANGE}22`,
                                color: ORANGE,
                                border: `1px solid ${ORANGE}55`,
                              }}
                            >
                              Pro
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm leading-snug text-white/55">
                          {f.subtitle}
                        </p>
                      </div>
                      <ChevronRight
                        className="mt-2 h-4 w-4 shrink-0 transition-transform"
                        style={{
                          color: isActive ? ACCENT : 'rgba(255,255,255,0.25)',
                          transform: isActive ? 'translateX(2px)' : 'none',
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Feature detail with screenshot */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full flex-col"
                  >
                    {/* Screenshot */}
                    <div
                      className="relative overflow-hidden border-b border-white/10"
                      style={{ aspectRatio: '16/10' }}
                    >
                      <img
                        src={activeScreenshot}
                        alt={activeFeatureData.title}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background: `linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%)`,
                        }}
                      />
                      {/* scan line */}
                      <motion.div
                        className="pointer-events-none absolute inset-x-0 h-[2px]"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
                          boxShadow: `0 0 10px ${ACCENT}`,
                        }}
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>

                    {/* Description */}
                    <div className="flex-1 p-8 sm:p-10">
                      <div className="mb-3 flex items-center gap-2">
                        <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                          {activeFeatureData.title}
                        </h3>
                        {activeFeatureData.pro && (
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              backgroundColor: `${ORANGE}22`,
                              color: ORANGE,
                              border: `1px solid ${ORANGE}55`,
                            }}
                          >
                            Pro
                          </span>
                        )}
                      </div>
                      <p className="text-base leading-relaxed text-white/70">
                        {activeFeatureData.description}
                      </p>
                      <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {activeFeatureData.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-sm text-white/75"
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0"
                              style={{ color: ACCENT }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== HEALTH CHECK HIGHLIGHT ======================== */}
        <section className="relative border-t border-white/5 bg-black/40 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-5 sm:px-6">
            <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <div
                  className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] sm:mb-4 sm:text-xs sm:tracking-[0.3em]"
                  style={{ color: ORANGE }}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  La feature que más nos orgullece
                </div>
                <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                  Health Check:<br />
                  <span style={{ color: ACCENT }}>no improvisar</span> en vivo.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/65 sm:mt-5 sm:text-base">
                  Antes de cada show, corré el diagnóstico desde la red del venue. En
                  segundos sabés si los servidores ICE están OK, si hay IP pública
                  detectable, si TURN relay funciona y si el signaling responde. Si algo
                  falla, te dice exactamente qué — antes de que aparezca el público.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    { label: 'Endpoint ICE servers', value: '7 servidores · TURN ✓' },
                    { label: 'Signaling backend', value: 'DB accesible' },
                    { label: 'STUN · IP pública', value: '7 candidatos' },
                    { label: 'TURN · relay', value: '4 candidatos' },
                  ].map((row) => (
                    <li key={row.label} className="flex items-center gap-3">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${ACCENT}22`, color: ACCENT }}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-semibold text-white">{row.label}</span>
                      <span className="text-sm text-white/50">— {row.value}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
                style={{ boxShadow: `0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px ${ACCENT}33` }}
              >
                <img
                  src="/images/i-streem/health-check.png"
                  alt="Health Check pre-show"
                  className="w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================== RESOLUME FLOW ======================== */}
        <section className="relative py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-5 sm:px-6">
            <div className="mb-10 text-center sm:mb-14">
              <div
                className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] sm:mb-4 sm:text-xs sm:tracking-[0.3em]"
                style={{ color: ORANGE }}
              >
                <Tv className="h-3.5 w-3.5" />
                Integración VJ
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                Listo para entrar a Resolume en{' '}
                <span style={{ color: ACCENT }}>minutos</span>.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-white/55 sm:mt-5 sm:text-base">
                Guía paso a paso incluida en la app: desde instalar OBS hasta ver tu señal
                como capa en Resolume Arena/Avenue. Incluye método rápido con Browser Source
                (sin capturar ventanas) y flujo completo con Spout/NDI.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
            >
              <img
                src="/images/i-streem/guia-resolume.png"
                alt="Guía Resolume — Browser Source"
                className="w-full object-cover"
              />
            </motion.div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {[
                '?code=1234 — código de sala',
                '&fit=cover — llenar pantalla',
                '&bg=transparent — alpha en OBS',
                '&stats=1 — overlay telemetría',
              ].map((p) => (
                <code
                  key={p}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-mono text-white/70"
                >
                  {p}
                </code>
              ))}
            </div>
          </div>
        </section>

        {/* ======================== CASOS DE USO ======================== */}
        <section className="relative border-t border-white/5 bg-black/30 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-5 sm:px-6">
            <div className="mb-10 max-w-3xl sm:mb-14">
              <div
                className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] sm:mb-4 sm:text-xs sm:tracking-[0.3em]"
                style={{ color: ACCENT }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                ¿Para quién es?
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                Pensada para producciones{' '}
                <span style={{ color: ACCENT }}>reales</span>.
              </h2>
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              {useCases.map((u, i) => (
                <motion.div
                  key={u.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.05] sm:p-7"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition group-hover:opacity-30"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <div className="mb-4 text-4xl">{u.icon}</div>
                  <h3 className="mb-3 font-display text-xl font-bold text-white">
                    {u.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">{u.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================== STACK ======================== */}
        <section className="relative py-14 sm:py-20">
          <div className="container mx-auto max-w-5xl px-5 sm:px-6">
            <div className="mb-8 text-center sm:mb-10">
              <div
                className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] sm:text-xs sm:tracking-[0.3em]"
                style={{ color: ACCENT }}
              >
                <Cpu className="h-3.5 w-3.5" />
                Stack tecnológico
              </div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Construida con estándares abiertos
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {stackItems.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80"
                  >
                    <Icon className="h-4 w-4" style={{ color: ACCENT }} />
                    {s.label}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================== CTA FINAL ======================== */}
        <section className="relative py-16 sm:py-28">
          <div className="container mx-auto max-w-4xl px-5 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl border p-6 sm:p-10 md:p-16"
              style={{
                borderColor: `${ACCENT}33`,
                background: `linear-gradient(135deg, ${ACCENT}10 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%)`,
              }}
            >
              <div
                className="absolute -right-20 -top-20 h-60 w-60 rounded-full blur-3xl"
                style={{ backgroundColor: `${ACCENT}33` }}
              />
              <div
                className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full blur-3xl"
                style={{ backgroundColor: `${ORANGE}22` }}
              />

              <div className="relative text-center">
                <img
                  src="/images/i-streem/icon.png"
                  alt="i-Streem"
                  className="mx-auto mb-5 h-16 w-16 sm:mb-6 sm:h-20 sm:w-20"
                  style={{ filter: `drop-shadow(0 0 30px ${ACCENT}66)` }}
                />
                <h3 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
                  El próximo show empieza con{' '}
                  <span style={{ color: ACCENT }}>un código de 4 dígitos</span>.
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-sm text-white/60 sm:mt-5 sm:text-base">
                  Abrí i-Streem desde tu iPhone, mandá el código al VJ y listo: tu cámara
                  ya es una capa de video en Resolume.
                </p>
                <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <motion.a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-transform sm:px-8 sm:py-4 sm:text-base"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_SOFT} 100%)`,
                      boxShadow: `0 10px 40px ${ACCENT}55, 0 0 80px ${ACCENT}33`,
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Probar i-Streem ahora
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </motion.a>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08] sm:px-7 sm:py-4 sm:text-base"
                  >
                    Hablar con Alen.iA
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-white/40">
                  <ExternalLink className="h-3 w-3" />
                  {APP_URL.replace(/^https?:\/\//, '')}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

function HeroStat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4" style={{ color: ACCENT }} />
        <div className="font-display text-2xl font-extrabold text-white md:text-3xl">
          {value}
        </div>
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {label}
      </div>
    </div>
  );
}
