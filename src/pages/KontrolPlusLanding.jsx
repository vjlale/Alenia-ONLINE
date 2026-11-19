// Kontrol+ — programa gratuito de ventas y stock para Windows.
// Rehecho con el manual de marca de ALENIA (fondos #100F1C / #1A1A2E, bordes
// #3A3A5A, Poppins + Inter, íconos de línea, voseo) para que se vea como parte
// del sitio y no como una página aparte.
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Download,
  HardDrive,
  Lock,
  Monitor,
  Package,
  ShoppingCart,
  Sparkles,
  Tag,
  Wallet,
  WifiOff,
  Zap,
} from 'lucide-react'
import ScrollReveal from '../components/common/ScrollReveal'
import emailJSService from '../services/emailJSService'

const DOWNLOAD_URL =
  'https://github.com/vjlale/KONTROL-By-Alenia/releases/download/v3.0.0/ALENIA-GESTION-KONTROL+_v2.3.0_Complete.zip'

const FEATURES = [
  {
    icon: ShoppingCart,
    title: 'Ventas rápidas',
    body: 'Carrito con 6 formas de pago, IVA calculado solo y ofertas que se aplican automáticamente al cobrar.',
  },
  {
    icon: Package,
    title: 'Stock al día',
    body: 'Productos por marca, color y talle, carga masiva desde una planilla y aviso cuando algo se está por acabar.',
  },
  {
    icon: BarChart3,
    title: 'Reportes y cierre de caja',
    body: 'Ventas del día, reportes por fecha o producto y cierre de caja que se exporta a planilla para tu contador.',
  },
  {
    icon: Sparkles,
    title: 'Sugerencias inteligentes',
    body: 'Te dice qué reponer y qué productos rotan poco, según lo que venden en tu negocio.',
  },
  {
    icon: Tag,
    title: 'Ofertas y promociones',
    body: '3x2, 2x1, descuentos por porcentaje o precios especiales con fecha de inicio y fin.',
  },
  {
    icon: WifiOff,
    title: 'Funciona sin internet',
    body: 'Todo queda en tu computadora, con respaldos automáticos. Si se corta internet, seguís vendiendo.',
  },
]

const SCREENS = [
  {
    id: 'principal',
    label: 'Inicio',
    img: '/images/screenshot/PRINCIPAL-v2.jpeg',
    title: 'Todo a un clic',
    body: 'Desde la pantalla principal entrás a vender, ver las ventas del día o administrar el negocio.',
    points: ['Nueva venta con un atajo de teclado', 'Resumen del día siempre a mano', 'Menú de gestión separado del mostrador'],
  },
  {
    id: 'venta',
    label: 'Nueva venta',
    img: '/images/screenshot/NUEVA VENTA.jpeg',
    title: 'Cobrar en segundos',
    body: 'Buscás el producto, lo sumás al carrito y elegís cómo paga el cliente. El sistema valida el stock.',
    points: ['Efectivo, débito, crédito, transferencia, QR y otros', 'Ofertas aplicadas solas', 'IVA y total calculados'],
  },
  {
    id: 'dia',
    label: 'Ventas del día',
    img: '/images/screenshot/pantalla ventas del dia.png',
    title: 'Cómo viene el día',
    body: 'Cada venta con su forma de pago, los gastos del día y el cierre de caja con su archivo de respaldo.',
    points: ['Totales por forma de pago', 'Registro de gastos y pagos', 'Cierre de caja exportable'],
  },
  {
    id: 'menu',
    label: 'Menú',
    img: '/images/screenshot/PANTALLA MENU-v2.png',
    title: 'La trastienda ordenada',
    body: 'Productos, carga masiva, reportes, ofertas, usuarios y el panel inteligente, en un solo menú.',
    points: ['Usuarios con su propio acceso', 'Carga masiva desde planilla', 'Acceso directo al panel inteligente'],
  },
  {
    id: 'alta',
    label: 'Alta de producto',
    img: '/images/screenshot/AGREGAR NUEVO PRODUCTO-v2.jpeg',
    title: 'Precios calculados solos',
    body: 'Cargás el costo y el porcentaje de ganancia, y el sistema arma el precio de venta y el precio amigo.',
    points: ['Marca, descripción, color y talle', 'Precio de venta y precio amigo', 'Stock inicial al crear el producto'],
  },
  {
    id: 'inventario',
    label: 'Inventario',
    img: '/images/screenshot/INVENTARIO-v2.jpeg',
    title: 'Encontrá cualquier producto',
    body: 'Buscás por marca, descripción, color o talle, y los productos con poco stock aparecen resaltados.',
    points: ['Búsqueda al instante', 'Stock bajo resaltado', 'Cambio de precios en lote'],
  },
  {
    id: 'reportes',
    label: 'Reportes',
    img: '/images/screenshot/REPORTES-v2.jpeg',
    title: 'Decidí con números',
    body: 'Filtrás por fechas, productos, marcas o formas de pago y exportás todo a planilla.',
    points: ['Rango de fechas a elección', 'Rentabilidad por producto', 'Exportación para tu contador'],
  },
  {
    id: 'ofertas',
    label: 'Ofertas',
    img: '/images/screenshot/OFERTAS-v2.jpeg',
    title: 'Promos sin cuentas a mano',
    body: 'Armás la promoción una vez y se aplica sola en cada venta mientras esté vigente.',
    points: ['3x2, 2x1, 4x3', 'Descuentos por porcentaje', 'Fechas de vigencia'],
  },
  {
    id: 'panel',
    label: 'Panel inteligente',
    img: '/images/screenshot/PANEL INTELIGENTE.jpeg',
    title: 'Sugerencias según tus ventas',
    body: 'Mira lo que vendiste y te sugiere qué reponer, cuánto y qué productos conviene mover con una oferta.',
    points: ['Días de stock que te quedan', 'Productos con poca rotación', 'Cantidades sugeridas para reponer'],
  },
]

const BENEFITS = [
  {
    icon: Zap,
    title: 'Lo instalás y vendés',
    body: 'Descargás, abrís y en pocos minutos estás cobrando. Sin configuraciones complicadas.',
  },
  {
    icon: Lock,
    title: 'Tus datos son tuyos',
    body: 'Todo queda guardado en tu computadora, no en una nube de terceros, con respaldos automáticos.',
  },
  {
    icon: Wallet,
    title: 'Gratis, sin límites',
    body: 'Sin cuotas mensuales ni límites de productos o ventas. Todas las funciones incluidas.',
  },
]

const REQUIREMENTS = [
  { icon: Monitor, label: 'Sistema', value: 'Windows 10 u 11 de 64 bits' },
  { icon: Cpu, label: 'Memoria', value: '4 GB (8 GB recomendado)' },
  { icon: HardDrive, label: 'Espacio', value: '500 MB libres' },
  { icon: WifiOff, label: 'Internet', value: 'No hace falta' },
]

const card = 'rounded-2xl border border-[#3A3A5A] bg-[#1A1A2E]'
const primaryBtn =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7b2cbf] to-[#c77dff] px-7 py-3.5 font-semibold text-white shadow-[0_0_24px_rgba(199,125,255,0.3)] transition-shadow hover:shadow-[0_0_36px_rgba(199,125,255,0.55)] disabled:opacity-60'
const secondaryBtn =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-[#00ff88] px-7 py-3.5 font-semibold text-[#00ff88] transition-colors hover:bg-[#00ff88]/10'

function SectionTitle({ eyebrow, title, body }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#c77dff]">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold text-[#F1F5F9] md:text-4xl">{title}</h2>
      {body && <p className="mt-3 text-slate-400">{body}</p>}
    </div>
  )
}

function ScreensViewer() {
  const [active, setActive] = useState(SCREENS[0].id)
  const screen = SCREENS.find((s) => s.id === active)
  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist">
        {SCREENS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === active}
            onClick={() => setActive(s.id)}
            className={`shrink-0 whitespace-nowrap rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
              s.id === active
                ? 'border-[#c77dff] bg-[#7b2cbf]/20 text-white'
                : 'border-[#3A3A5A] text-slate-400 hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`${card} overflow-hidden`}
        >
          <img src={screen.img} alt={`Kontrol+ — ${screen.label}`} className="w-full border-b border-[#3A3A5A]" loading="lazy" />
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:p-8">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#F1F5F9]">{screen.title}</h3>
              <p className="mt-2 text-slate-400">{screen.body}</p>
            </div>
            <ul className="space-y-2">
              {screen.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00ff88]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function KontrolPlusLanding() {
  const [lead, setLead] = useState({ nombre: '', email: '', rubro: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [downloadOpened, setDownloadOpened] = useState(false)

  const handleLeadChange = (e) => {
    const { name, value } = e.target
    setLead((prev) => ({ ...prev, [name]: value }))
  }

  const handleLeadSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus(null)
    setIsSubmitting(true)
    try {
      const formData = {
        nombre: lead.nombre,
        email: lead.email,
        rubro: lead.rubro,
        servicio: 'ALEN.IA Gestión Kontrol+',
        descripcion: 'Solicitud de descarga de ALEN.IA Gestión Kontrol+ v2.3.0',
        categoria: 'contacto-general',
      }

      // EmailJS es opcional: si falla, la descarga sigue igual.
      try {
        await emailJSService.sendServiceForm(formData, { categoria: 'contacto-general' })
      } catch (emailErr) {
        console.warn('No se pudo enviar EmailJS (continuando con descarga):', emailErr)
      }

      try {
        const response = await fetch('https://hook.eu2.make.com/14xmyfmrxptcfqjbi25gy7sllk5pkbyg', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!response.ok) console.warn('El webhook respondió con un código de error:', response.status)
      } catch (webhookErr) {
        console.warn('No se pudo enviar al webhook (continuando con descarga):', webhookErr)
      }

      const win = window.open(DOWNLOAD_URL, '_blank', 'noopener,noreferrer')
      setDownloadOpened(!!win)
      setConfirmVisible(true)
      setSubmitStatus('success')
    } catch (err) {
      console.error('Error inesperado durante el proceso de descarga:', err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const input =
    'w-full rounded-xl border border-[#3A3A5A] bg-[#100F1C] px-4 py-3 text-[#F1F5F9] placeholder:text-slate-500 outline-none focus:border-[#c77dff] focus:ring-1 focus:ring-[#c77dff]'

  return (
    <>
      <Helmet>
        <title>Kontrol+ | Programa gratis de ventas y stock para Windows | ALENIA</title>
        <link rel="canonical" href="https://aleniahub.com/kontrol-plus" />
        <meta
          name="description"
          content="Kontrol+ es un programa gratuito para controlar ventas y stock. Funciona sin internet, con reportes, ofertas y sugerencias de reposición. Para Windows 10/11."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ALENIA" />
        <meta property="og:url" content="https://aleniahub.com/kontrol-plus" />
        <meta property="og:title" content="Kontrol+ | Programa gratis de ventas y stock para Windows" />
        <meta
          property="og:description"
          content="Gestioná ventas y stock con un programa que funciona sin internet. Reportes, ofertas y sugerencias de reposición. Descarga gratuita."
        />
        <meta property="og:image" content="https://aleniahub.com/images/7.png?v=2" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kontrol+ | Programa gratis de ventas y stock para Windows" />
        <meta name="twitter:image" content="https://aleniahub.com/images/7.png?v=2" />
      </Helmet>

      <main className="min-h-screen bg-[#100F1C] py-20 font-sans text-slate-300">
        <div className="container mx-auto px-6">
          {/* Portada */}
          <section className="mb-24 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <ScrollReveal direction="up">
              <div>
                <Link to="/apps" className="mb-8 flex w-fit items-center gap-2 text-sm text-[#00ccff] hover:text-white">
                  ← Ver todas las apps
                </Link>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00ff88]/40 bg-[#00ff88]/10 px-3 py-1 text-xs font-semibold text-[#00ff88]">
                  <Download className="h-3.5 w-3.5" />
                  Gratis para Windows 10 y 11
                </span>
                <h1 className="font-display text-4xl font-extrabold leading-tight text-[#F1F5F9] md:text-5xl lg:text-6xl">
                  Kontrol+: las ventas y el stock de tu negocio,{' '}
                  <span className="bg-gradient-to-r from-[#00ff88] to-[#00ccff] bg-clip-text text-transparent">
                    sin internet
                  </span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-slate-400">
                  Un programa para el mostrador: cobrás, controlás el stock y cerrás la caja desde tu computadora.
                  Sin cuotas mensuales y con tus datos guardados en tu equipo.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href="#descargar" className={primaryBtn}>
                    <Download className="h-5 w-5" />
                    Descargar gratis
                  </a>
                  <a href="#pantallas" className={secondaryBtn}>
                    Ver cómo se usa
                  </a>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <div className="relative">
                <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(123,44,191,0.35),transparent_70%)]" />
                <img
                  src="/images/screenshot/PRINCIPAL-v2.jpeg"
                  alt="Pantalla principal de Kontrol+"
                  className="relative w-full rounded-2xl border border-[#3A3A5A] shadow-2xl"
                />
              </div>
            </ScrollReveal>
          </section>

          {/* Funciones */}
          <section id="funcionalidades" className="mb-24 scroll-mt-24">
            <ScrollReveal>
              <SectionTitle
                eyebrow="Funciones"
                title="Lo que necesita tu mostrador"
                body="Pensado para comercios chicos y medianos: ropa, almacenes, kioscos, ferreterías."
              />
            </ScrollReveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => {
                const Icon = f.icon
                return (
                  <ScrollReveal key={f.title} delay={0.05 * i}>
                    <article className={`${card} h-full p-6 transition-shadow hover:shadow-[0_0_30px_rgba(199,125,255,0.15)]`}>
                      <Icon className="mb-4 h-7 w-7 text-[#c77dff]" strokeWidth={2} />
                      <h3 className="font-display text-lg font-semibold text-[#F1F5F9]">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          </section>

          {/* Pantallas */}
          <section id="pantallas" className="mb-24 scroll-mt-24">
            <ScrollReveal>
              <SectionTitle eyebrow="Recorrido" title="Así se ve por dentro" body="Elegí una pantalla para verla." />
            </ScrollReveal>
            <ScreensViewer />
          </section>

          {/* Beneficios */}
          <section className="mb-24">
            <ScrollReveal>
              <SectionTitle eyebrow="Por qué Kontrol+" title="Simple, tuyo y gratis" />
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-3">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon
                return (
                  <ScrollReveal key={b.title} delay={0.05 * i}>
                    <article className={`${card} h-full p-6`}>
                      <Icon className="mb-4 h-7 w-7 text-[#00ff88]" strokeWidth={2} />
                      <h3 className="font-display text-lg font-semibold text-[#F1F5F9]">{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.body}</p>
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          </section>

          {/* Descarga */}
          <section id="descargar" className="scroll-mt-24">
            <ScrollReveal>
              <div className={`${card} mx-auto max-w-4xl p-8 md:p-12`}>
                <div className="text-center">
                  <h2 className="font-display text-3xl font-bold text-[#F1F5F9] md:text-4xl">Descargá Kontrol+ gratis</h2>
                  <p className="mx-auto mt-3 max-w-xl text-slate-400">
                    Dejanos tus datos y la descarga empieza enseguida.
                  </p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleLeadSubmit}>
                  <div className="grid gap-4 md:grid-cols-3">
                    <input
                      type="text"
                      name="nombre"
                      value={lead.nombre}
                      onChange={handleLeadChange}
                      placeholder="Nombre"
                      aria-label="Nombre"
                      autoComplete="name"
                      className={input}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={lead.email}
                      onChange={handleLeadChange}
                      placeholder="Email"
                      aria-label="Email"
                      autoComplete="email"
                      className={input}
                      required
                    />
                    <select
                      name="rubro"
                      value={lead.rubro}
                      onChange={handleLeadChange}
                      aria-label="Rubro"
                      className={input}
                      required
                    >
                      <option value="">Rubro</option>
                      <option value="comercio">Comercio</option>
                      <option value="servicios">Servicios</option>
                      <option value="fabricacion">Fabricación</option>
                      <option value="gastronomia">Gastronomía</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="text-center">
                    <button type="submit" className={primaryBtn} disabled={isSubmitting}>
                      <Download className="h-5 w-5" />
                      {isSubmitting ? 'Preparando la descarga…' : 'Descargar ahora'}
                    </button>
                  </div>
                  {submitStatus === 'error' && (
                    <p className="text-center text-sm text-red-400">No pudimos registrar tus datos. Probá de nuevo.</p>
                  )}
                </form>

                {confirmVisible && (
                  <div role="status" aria-live="polite" className="mt-6 rounded-xl border border-[#00ccff]/50 bg-[#100F1C] p-4 text-sm">
                    <p className="mb-3 text-[#F1F5F9]">
                      {downloadOpened
                        ? 'La descarga se abrió en una pestaña nueva.'
                        : 'Si la descarga no empezó, puede que el navegador haya bloqueado la ventana. Usá este botón:'}
                    </p>
                    <a href={DOWNLOAD_URL} download className={secondaryBtn}>
                      <Download className="h-4 w-4" />
                      Descarga directa
                    </a>
                  </div>
                )}

                <div className="mt-10 border-t border-[#3A3A5A] pt-8">
                  <h3 className="mb-4 text-center font-display text-lg font-semibold text-[#F1F5F9]">Qué necesitás</h3>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {REQUIREMENTS.map((r) => {
                      const Icon = r.icon
                      return (
                        <div key={r.label} className="flex items-start gap-3">
                          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                          <div>
                            <p className="text-xs uppercase tracking-wider text-slate-500">{r.label}</p>
                            <p className="text-sm text-[#F1F5F9]">{r.value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <p className="mt-4 text-center text-xs text-slate-500">
                    No funciona en Windows de 32 bits. Versión actual: 2.3.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <p className="mt-8 text-center text-sm text-slate-400">
                ¿Querés manejar el negocio desde el celular, con asistente por WhatsApp?{' '}
                <Link to="/apps" className="inline-flex items-center gap-1 font-semibold text-[#00ccff] hover:text-white">
                  Conocé Kontrol Pro <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </ScrollReveal>
          </section>
        </div>
      </main>
    </>
  )
}
