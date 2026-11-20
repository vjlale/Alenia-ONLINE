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
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Network,
  Layers,
  Smartphone,
  LayoutDashboard,
  DoorOpen,
  Bot,
  Zap,
  Wallet,
  Shirt,
  Coffee,
  Dumbbell,
  Car,
  Store,
  Info,
  Maximize2,
} from 'lucide-react'
import ScrollReveal from '../components/common/ScrollReveal'
import AnimatedGradient from '../components/common/AnimatedGradient'
import { OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '../config/brand'
import HubSimulation from '../components/hub-sim/HubSimulation'
import FaqSection from '../components/common/FaqSection'
import { FAQS, SEO_PAGES } from '../data/seoPages'

const MotionLink = motion(Link)

/* -------------------------------------------------------------------------- */
/*                                   SEO                                      */
/* -------------------------------------------------------------------------- */

const SITE_URL = 'https://aleniahub.com'
const PAGE_PATH = '/soluciones/hub'
const HUB_SEO = SEO_PAGES.find((p) => p.path === PAGE_PATH)
const PAGE_TITLE = HUB_SEO.title
const PAGE_DESCRIPTION = HUB_SEO.description

/* -------------------------------------------------------------------------- */
/*                                 Contenido                                  */
/* -------------------------------------------------------------------------- */

const HERO = {
  badge: 'Producto insignia',
  title: 'De la máquina al negocio conectado',
  tagline: 'Tu máquina. Tu marca. Tu experiencia de venta.',
  body:
    'Conectamos tus máquinas con cobros, app, tótem y un panel en tiempo real. El cliente paga, la máquina arranca sola y vos lo ves todo desde el celular.',
  primaryCta: 'Contanos qué máquinas tenés',
  secondaryCta: 'Ver webs y apps',
}

const SIMULATION = {
  title: 'Mirá una compra de punta a punta',
  body: 'Una expendedora conectada: el cliente paga y la máquina entrega; al dueño le llega todo al celular. Tocá cualquier pantalla.',
}

const MODULES = [
  {
    id: 'activacion',
    icon: Zap,
    title: 'Activación de máquinas',
    description:
      'El cliente paga y la máquina arranca sola, por pulso, relé o placa del fabricante.',
  },
  {
    id: 'cobros',
    icon: Wallet,
    title: 'Cobros e ingresos',
    description:
      'Mercado Pago con QR, Checkout y Point, más saldo y crédito en la app.',
  },
  {
    id: 'accesos',
    icon: DoorOpen,
    title: 'Control de accesos',
    description: 'Puertas que abren con QR. Sabés quién entró y cuándo.',
  },
  {
    id: 'panel',
    icon: LayoutDashboard,
    title: 'Panel de control en tiempo real',
    description:
      'Estado de cada máquina, ventas, caja y alertas, desde el celular.',
  },
  {
    id: 'app-totem',
    icon: Smartphone,
    title: 'App y tótem con tu marca',
    description:
      'Con tu logo y tus colores. La experiencia de venta es tuya.',
  },
  {
    id: 'asistente',
    icon: Bot,
    title: 'Asistente IA de soporte 24/7',
    description:
      'Responde a tus clientes a cualquier hora y te avisa si algo falla.',
  },
]

const PHASES = [
  { step: 1, title: 'Diagnóstico', body: 'Relevamos marca, modelo y placa de cada máquina, la conexión del local y cómo cobrás hoy.' },
  { step: 2, title: 'Conexión física', body: 'Instalamos placas IoT, relés y cerraduras, o nos integramos con la placa del fabricante.' },
  { step: 3, title: 'Software con tu marca', body: 'App, tótem, panel y asistente, todo conectado: lo que pasa en la máquina se ve en el panel.' },
  { step: 4, title: 'Puesta en marcha', body: 'Probamos en el local con las máquinas funcionando y seguimos con monitoreo y ajustes.' },
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
    'Abierta las 24 horas sin nadie atendiendo, en Palermo. La armamos en 69 días; el primer pago real fue el 2 de septiembre de 2026.',
  items: [
    '3 lavadoras y 3 secadoras Electrolux conectadas',
    '2 expendedoras y cafetera en el mismo pago',
    'Puerta con QR, tótem, app y panel',
    '470 pagos reales y 45% de clientes que vuelven (sept. 2026)',
  ],
  linkLabel: 'Ver el caso completo',
  linkHref: '/casos/laia',
}

const WHY_ALENIA = {
  title: 'Por qué ALENIA',
  paragraphs: [
    'Un tótem cobra. Nosotros operamos el negocio entero: máquina, pago, puerta, panel e IA, con un solo equipo. Y ya funciona en un local real.',
  ],
}

const FINAL_CTA = {
  title: '¿Qué máquinas querés conectar?',
  body: 'Pasanos marca, modelo y cantidad de equipos. Te decimos qué se puede hacer y cómo.',
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
        <div className="mb-14 max-w-4xl">
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

        </div>

        {/* Simulación: una compra real de punta a punta */}
        <section className="mb-24" aria-labelledby="hub-sim-heading">
          <ScrollReveal direction="up" delay={0.15}>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 id="hub-sim-heading" className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {SIMULATION.title}
                </h2>
                <p className="text-alenia-light/75 max-w-3xl">{SIMULATION.body}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsSimulationFullScreen(true)}
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-emerald-500/30 px-4 py-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 hover:border-emerald-400 transition-colors md:self-auto"
              >
                <Maximize2 className="w-4 h-4" />
                Pantalla completa
              </button>
            </div>
            <div className="relative rounded-3xl border border-emerald-500/20 bg-[#020617]/70 p-3 md:p-5 shadow-[0_0_60px_rgba(52,211,153,0.12),inset_0_0_80px_rgba(16,185,129,0.05)] overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <HubSimulation paused={isSimulationFullScreen} className="relative" />
            </div>
          </ScrollReveal>
        </section>

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
          <ol className="relative max-w-5xl mx-auto space-y-8 md:space-y-0">
            {/* Línea vertical: a la izquierda en celular, al centro en pantallas grandes */}
            <span
              className="absolute left-5 md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-500/60 via-cyan-500/30 to-transparent"
              aria-hidden
            />
            {PHASES.map((phase, index) => {
              const onRight = index % 2 === 1
              return (
                <li key={phase.step} className={`relative ${index > 0 ? 'md:-mt-24' : ''}`}>
                  <ScrollReveal delay={0.08 * index} direction="up">
                    <div className="grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[1fr_4rem_1fr] md:gap-6 items-start">
                      <motion.div
                        className="relative z-10 col-start-1 row-start-1 md:col-start-2 justify-self-center mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border-2 border-emerald-400 text-emerald-300 font-bold text-sm shadow-[0_0_20px_rgba(52,211,153,0.35)]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {phase.step}
                      </motion.div>
                      <article
                        className={`col-start-2 row-start-1 ${
                          onRight ? 'md:col-start-3' : 'md:col-start-1'
                        } glass-advanced rounded-2xl p-6 md:p-7 border border-white/10 hover:border-emerald-400/30 transition-colors`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80 mb-1">
                          Fase {phase.step}
                        </p>
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
                      </article>
                    </div>
                  </ScrollReveal>
                </li>
              )
            })}
          </ol>
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
                <MotionLink
                  to={CASE_STUDY.linkHref}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex min-h-[48px] items-center gap-2 border border-cyan-400/40 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  {CASE_STUDY.linkLabel}
                  <ArrowRight className="w-4 h-4" />
                </MotionLink>
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

        <FaqSection items={FAQS.hub} className="mb-24" />

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
                  Viví una compra real, de los dos lados
                </h3>
                <p className="text-alenia-light/80 mb-8 leading-relaxed">
                  Vas a ver a un cliente comprar en una expendedora conectada: carrito, pago con QR o en el tótem y
                  entrega. Del otro lado, el celular del dueño recibe cada aviso, el panel suma las ventas y el
                  asistente resuelve un atasco solo. Tocá cualquier pantalla para hacerlo vos.
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
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12)_0%,rgba(0,0,0,0)_65%)]"
                />
                <HubSimulation isFullScreen onExitFullScreen={() => setIsSimulationFullScreen(false)} />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}
