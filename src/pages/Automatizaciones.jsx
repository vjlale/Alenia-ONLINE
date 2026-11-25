// Automatizaciones — rehecha con el manual de marca de ALENIA (antes era una caja
// suelta con texto gris, título tapado por el menú y escrita de "tú").
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  Bell,
  Cpu,
  MessageCircle,
  Plug,
  Search,
  Settings,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react'
import ScrollReveal from '../components/common/ScrollReveal'
import { OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '../config/brand'

const TITLE = 'Automatizaciones para tu negocio | ALENIA'
const DESCRIPTION =
  'Automatizamos lo que hoy hacés a mano: respuestas por WhatsApp, recordatorios, seguimiento de ventas, reportes y conexión entre sistemas. Y con ALENIA HUB, también tu negocio físico.'

const TASKS = [
  { icon: MessageCircle, title: 'Respuestas por WhatsApp', body: 'Un asistente que contesta las preguntas de siempre a cualquier hora y te pasa los casos que necesitan una persona.' },
  { icon: Bell, title: 'Recordatorios y avisos', body: 'Turnos, vencimientos y pagos pendientes que se avisan solos, por mensaje o por mail.' },
  { icon: ShoppingCart, title: 'Ventas y seguimiento', body: 'Cada consulta queda registrada y se le hace seguimiento, para que ningún cliente quede sin respuesta.' },
  { icon: BarChart3, title: 'Reportes automáticos', body: 'Las ventas, la caja y los números del negocio te llegan armados, sin copiar planillas.' },
  { icon: Plug, title: 'Sistemas conectados', body: 'Tus apps, planillas y medios de pago se pasan la información entre sí, sin cargar todo dos veces.' },
]

const STEPS = [
  { icon: Search, title: 'Vemos cómo trabajás hoy', body: 'Nos contás qué tareas te comen el tiempo y elegimos por dónde conviene empezar.' },
  { icon: Settings, title: 'Lo armamos y lo probamos', body: 'Configuramos la automatización con tus herramientas y la probamos con casos reales.' },
  { icon: TrendingUp, title: 'La ajustamos con vos', body: 'Medimos cuánto tiempo te ahorra y la mejoramos a medida que el negocio lo pide.' },
]

const card = 'rounded-2xl border border-[#3A3A5A] bg-[#1A1A2E]'

export default function Automatizaciones() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://aleniahub.com/automatizaciones" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aleniahub.com/automatizaciones" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:alt" content="ALENIA - Automatizaciones" />
        <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aleniahub.com/automatizaciones" />
        <meta property="twitter:title" content={TITLE} />
        <meta property="twitter:description" content={DESCRIPTION} />
        <meta property="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <main className="min-h-screen bg-[#100F1C] py-24 font-sans text-slate-300">
        <div className="container mx-auto px-6">
          {/* Portada */}
          <ScrollReveal direction="up">
            <section className="mx-auto mb-20 max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#c77dff]">Automatizaciones</p>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-[#F1F5F9] md:text-5xl">
                Dejá de hacer a mano{' '}
                <span className="bg-gradient-to-r from-[#00ff88] to-[#00ccff] bg-clip-text text-transparent">
                  lo que se puede hacer solo
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                Respondemos, avisamos, registramos y reportamos por vos. Vos te quedás con lo que de verdad necesita
                una persona.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7b2cbf] to-[#c77dff] px-7 py-3.5 font-semibold text-white shadow-[0_0_24px_rgba(199,125,255,0.3)] transition-shadow hover:shadow-[0_0_36px_rgba(199,125,255,0.55)]"
                >
                  Contanos qué querés automatizar
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="https://wa.me/5493516875178?text=Hola%20ALENIA%2C%20quiero%20automatizar%20una%20tarea%20de%20mi%20negocio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00ff88] px-7 py-3.5 font-semibold text-[#00ff88] transition-colors hover:bg-[#00ff88]/10"
                >
                  <MessageCircle className="h-5 w-5" />
                  Escribinos por WhatsApp
                </a>
              </div>
            </section>
          </ScrollReveal>

          {/* Qué automatizamos */}
          <section className="mb-20">
            <ScrollReveal>
              <h2 className="mb-10 text-center font-display text-3xl font-bold text-[#F1F5F9]">Qué podemos automatizar</h2>
            </ScrollReveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TASKS.map((task, i) => {
                const Icon = task.icon
                return (
                  <ScrollReveal key={task.title} delay={0.05 * i} className="h-full">
                    <article className={`${card} h-full p-6`}>
                      <Icon className="mb-4 h-7 w-7 text-[#c77dff]" strokeWidth={2} />
                      <h3 className="font-display text-lg font-semibold text-[#F1F5F9]">{task.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{task.body}</p>
                    </article>
                  </ScrollReveal>
                )
              })}
              {/* Sexta tarjeta: ALENIA HUB, soluciones a medida */}
              <ScrollReveal delay={0.25} className="h-full">
                <Link
                  to="/soluciones/hub"
                  className={`${card} group flex h-full flex-col border-[#00ff88]/40 p-6 transition-shadow hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]`}
                >
                  <Cpu className="mb-4 h-7 w-7 text-[#00ff88]" strokeWidth={2} />
                  <h3 className="font-display text-lg font-semibold text-[#F1F5F9]">Tu negocio físico, con ALENIA HUB</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Locales y equipos que funcionan solos, con hardware, software e IA diseñados para tu negocio.
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#00ff88]">
                    Conocé ALENIA HUB <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </ScrollReveal>
            </div>
          </section>

          {/* Cómo trabajamos */}
          <section className="mb-20">
            <ScrollReveal>
              <h2 className="mb-10 text-center font-display text-3xl font-bold text-[#F1F5F9]">Cómo lo hacemos</h2>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-3">
              {STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <ScrollReveal key={step.title} delay={0.05 * i} className="h-full">
                    <article className={`${card} h-full p-6`}>
                      <div className="mb-4 flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#00ff88]/70 font-display text-sm font-bold text-[#00ff88]">
                          {i + 1}
                        </span>
                        <Icon className="h-6 w-6 text-slate-400" strokeWidth={2} />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-[#F1F5F9]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          </section>

          {/* Cierre */}
          <ScrollReveal>
            <section className={`${card} mx-auto max-w-3xl p-8 text-center md:p-12`}>
              <h2 className="font-display text-2xl font-bold text-[#F1F5F9] md:text-3xl">¿Qué tarea te gustaría no hacer nunca más?</h2>
              <p className="mt-3 text-slate-400">Contanos cómo trabajás hoy y te decimos qué se puede automatizar y cómo lo haríamos.</p>
              <Link
                to="/contacto"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7b2cbf] to-[#c77dff] px-7 py-3.5 font-semibold text-white shadow-[0_0_24px_rgba(199,125,255,0.3)] transition-shadow hover:shadow-[0_0_36px_rgba(199,125,255,0.55)]"
              >
                Hablemos de tu proyecto
                <ArrowRight className="h-5 w-5" />
              </Link>
            </section>
          </ScrollReveal>
        </div>
      </main>
    </>
  )
}
