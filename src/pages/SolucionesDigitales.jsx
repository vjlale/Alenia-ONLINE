import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Smartphone,
  TrendingUp,
  ChevronDown,
  Cpu,
  Trophy,
  Package,
  Video,
  LayoutGrid,
} from 'lucide-react';

import ScrollReveal from '../components/common/ScrollReveal';
import AnimatedGradient from '../components/common/AnimatedGradient';
import ServiceFormModal from '../components/forms/ServiceFormModal';

// Página reconstruida desde el bundle publicado en aleniahub.com
// (SolucionesDigitales-c14778ac.js), sin las líneas de marketing ni métricas de casos.

const SITE_URL = 'https://aleniahub.com';
const PAGE_PATH = '/soluciones/digitales';

const SEO_TITLE = 'Soluciones digitales | Webs interactivas y apps a medida | ALENIA';
const SEO_DESCRIPTION =
  'Webs interactivas y modernas orientadas a conversión, apps iOS/Android a medida para comercios y empresas, y portales para clientes y equipos, con acompañamiento llave en mano.';
const OG_IMAGE_URL = `${SITE_URL}/images/soluciones/digitales-hero.png`;

const HERO = {
  badge: 'Soluciones digitales',
  title: 'Presencia que convierte. Apps que fidelizan.',
  description:
    'Diseñamos experiencias web interactivas y aplicaciones a medida para comercios y empresas: desde el escaparate digital hasta el “comercio en el bolsillo”, con acompañamiento llave en mano.',
  primaryCta: 'Pedir informe / diagnóstico',
  secondaryCta: 'Ver planes desarrollo web y apps',
  secondaryHref: '/soluciones/desarrollo-web',
  imageSrc: '/images/soluciones/digitales-hero.png',
  imageAlt: 'Ilustración de experiencia web moderna y aplicación móvil para negocios',
};

const WEB = {
  title: 'Webs interactivas y modernas',
  description:
    'Sitios con motion, storytelling y microinteracciones que guían al visitante hacia la acción: reservas, consultas, ventas o contacto. Performance, SEO y accesibilidad como base, no como extra.',
  bullets: [
    'Catálogos y tiendas responsive orientadas a conversión',
    'Landing y multipágina con identidad de marca fuerte',
    'Formularios inteligentes e integración con WhatsApp y canales de venta',
  ],
  imageSrc: '/images/soluciones/digitales-web.png',
  imageAlt: 'Representación abstracta de interfaz web interactiva y fluida',
};

const APPS = {
  title: 'Apps a medida para comercios y empresas',
  description:
    'Aplicaciones iOS y Android pensadas para tu operación: pedidos, reservas, fidelización, cupones o portales para clientes y equipos. Si sabés usar WhatsApp, podés operar soluciones diseñadas para uso diario sin fricción.',
  bullets: [
    'PYMES y comercios: gastronomía, retail, servicios (turnos, recordatorios, sin comisiones externas donde aplique)',
    'Empresas mayores: portales corporativos, pasarelas cliente/proveedor, flujos a medida',
    'Entrega acompañada: implementación ágil y soporte real',
  ],
  rubros: [
    { name: 'Gastronomía', hint: 'pedidos, reservas, menú digital' },
    { name: 'Retail', hint: 'catálogo, stock, promos' },
    { name: 'Servicios', hint: 'turnos, pagos, seguimiento' },
  ],
  imageSrc: '/images/soluciones/digitales-app-comercio.png',
  imageAlt: 'Teléfono móvil con app de comercio y notificaciones',
};

const POCKET = {
  title: 'Tu comercio en el bolsillo',
  body: 'Una app propia refuerza marca y recurrencia: tus clientes te tienen a un toque. Trabajamos con modelo de proyecto y acompañamiento; consultá por planes y alcance en la categoría Desarrollo Web y Apps.',
};

// Productos propios de ALENIA (reemplaza los "casos de éxito" y las métricas del sitio publicado).
const TRABAJOS = [
  {
    title: 'Play Padel',
    description: 'Plataforma para jugadores y clubes de pádel: duplas, desafíos, torneos, ranking y reservas.',
    href: '/play-padel',
    Icon: Trophy,
  },
  {
    title: 'Kontrol Pro',
    description: 'Gestión integral con asistente de IA por WhatsApp: ventas, finanzas, stock y sueldos, cargados con un audio.',
    href: 'https://kontrolpro.app/',
    Icon: Package,
  },
  {
    title: 'i-Streem',
    description: 'Streaming WebRTC desde el iPhone a la PC, con integración para OBS y Resolume.',
    href: '/apps/i-streem',
    Icon: Video,
  },
];

// Enlace interno o externo según el destino
function TrabajoLink({ href, children, ...rest }) {
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}

const PROCESO = {
  title: 'Cómo trabajamos',
  steps: [
    { title: 'Diagnóstico gratuito', body: 'Entendemos tu situación, oportunidades y prioridades. Sin compromiso.' },
    { title: 'Implementación ágil', body: 'Entregas iterativas, resultados en días o semanas según alcance.' },
    { title: 'Crecimiento continuo', body: 'Optimización, nuevas funciones y soporte para escalar.' },
  ],
};

const LINEAS_COMPLEMENTARIAS = [
  {
    title: 'Automatización inteligente',
    description:
      'Conectamos máquinas, sensores y medios de pago con software propio: tu hardware y tus sistemas trabajando juntos, con control y seguimiento desde un solo lugar.',
    href: '/soluciones/hub',
    cta: 'Automatización con hardware y software — ALENIA HUB',
    Icon: Cpu,
  },
];

const TECNOLOGIA = {
  title: 'Tecnología e integraciones',
  intro: 'Stack y ecosistema que usamos para construir y conectar tu proyecto.',
  stack: ['React', 'Node.js', 'Python', 'n8n', 'Zapier', 'Make', 'GA4'],
  integrations: [
    'WhatsApp Business API',
    'MercadoLibre / MercadoPago',
    'Tiendanube / Shopify',
    'Google Workspace',
    'Microsoft 365',
    'Otras integraciones según necesidad',
  ],
};

// Servicios que recibe el modal de contacto (mismos datos que el sitio publicado).
const LEAD_WEB = {
  id: 'lead-web-interactiva',
  nombre: 'Web interactiva',
  categoria: 'desarrollo-web',
  subtitulo: 'Presencia premium y conversión',
  descripcion: '',
  icon: Sparkles,
  color: 'blue',
  contextoLead: 'Origen: /soluciones/digitales — web interactiva',
};

const LEAD_APP = {
  id: 'lead-app-comercio',
  nombre: 'App a medida',
  categoria: 'desarrollo-web',
  subtitulo: 'Comercio o empresa',
  descripcion: '',
  icon: Smartphone,
  color: 'blue',
  contextoLead: 'Origen: /soluciones/digitales — app comercio/empresa',
};

const TABS = [
  { id: 'web', label: 'Web interactiva', Icon: Sparkles },
  { id: 'apps', label: 'Apps a medida', Icon: Smartphone },
];

export default function SolucionesDigitales() {
  const [activeTab, setActiveTab] = useState('web');
  const [techOpen, setTechOpen] = useState(false);
  const [leadServicio, setLeadServicio] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-alenia-dark to-slate-950 py-20 overflow-x-hidden">
      <Helmet>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}${PAGE_PATH}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}${PAGE_PATH}`} />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="1376" />
        <meta property="og:image:height" content="768" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${SITE_URL}${PAGE_PATH}`} />
        <meta name="twitter:title" content={SEO_TITLE} />
        <meta name="twitter:description" content={SEO_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>

      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <Link
            to="/soluciones"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a soluciones
          </Link>
        </ScrollReveal>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <ScrollReveal direction="up" delay={0.05}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-4">
              {HERO.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight">
              <AnimatedGradient
                style={{ backgroundImage: 'linear-gradient(-45deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
              >
                {HERO.title}
              </AnimatedGradient>
            </h1>
            <p className="text-lg text-alenia-light/85 leading-relaxed mb-8">{HERO.description}</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLeadServicio(LEAD_WEB)}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-900 font-semibold px-6 py-3 rounded-xl glow-btn"
              >
                {HERO.primaryCta}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <Link
                to={HERO.secondaryHref}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/5 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                {HERO.secondaryCta}
              </Link>
              <Link
                to="/soluciones/hub"
                className="inline-flex items-center justify-center text-sm text-alenia-light/70 hover:text-white underline-offset-4 hover:underline"
              >
                ¿Conectar máquinas y pagos? Conocé el ALENIA HUB
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.12}>
            <motion.div
              className="rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.12)]"
              whileHover={{ scale: 1.01 }}
            >
              <img
                src={HERO.imageSrc}
                alt={HERO.imageAlt}
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
                width={800}
                height={600}
              />
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Tabs web / apps */}
        <div
          className="mb-6 flex rounded-xl border border-white/10 bg-slate-900/50 p-1 sm:inline-flex"
          role="tablist"
          aria-label="Enfoque principal"
        >
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => setActiveTab(id)}
              className={
                'flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all ' +
                (activeTab === id
                  ? 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white shadow-inner'
                  : 'text-alenia-light/60 hover:text-white')
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="mb-20 min-h-[280px]">
          <AnimatePresence mode="wait">
            {activeTab === 'web' ? (
              <motion.div
                key="web"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
                className="grid lg:grid-cols-2 gap-10 items-center glass-advanced rounded-2xl border border-cyan-500/20 p-8"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{WEB.title}</h2>
                  <p className="text-alenia-light/80 mb-6 leading-relaxed">{WEB.description}</p>
                  <ul className="space-y-3 mb-8">
                    {WEB.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-alenia-light/80">
                        <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLeadServicio(LEAD_WEB)}
                    className="inline-flex items-center gap-2 text-cyan-300 font-semibold hover:text-cyan-200"
                  >
                    Solicitar propuesta web
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <img
                  src={WEB.imageSrc}
                  alt={WEB.imageAlt}
                  className="rounded-xl border border-white/10 w-full"
                  loading="lazy"
                  width={640}
                  height={480}
                />
              </motion.div>
            ) : (
              <motion.div
                key="apps"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="grid lg:grid-cols-2 gap-10 items-center glass-advanced rounded-2xl border border-violet-500/20 p-8"
              >
                <div className="order-2 lg:order-1">
                  <img
                    src={APPS.imageSrc}
                    alt={APPS.imageAlt}
                    className="rounded-xl border border-white/10 w-full"
                    loading="lazy"
                    width={640}
                    height={480}
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{APPS.title}</h2>
                  <p className="text-alenia-light/80 mb-6 leading-relaxed">{APPS.description}</p>
                  <ul className="space-y-3 mb-6">
                    {APPS.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-alenia-light/80">
                        <Smartphone className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {APPS.rubros.map((r) => (
                      <span
                        key={r.name}
                        className="text-xs px-3 py-1 rounded-full bg-violet-500/15 text-violet-200 border border-violet-500/25"
                        title={r.hint}
                      >
                        {r.name}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLeadServicio(LEAD_APP)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-xl"
                  >
                    Hablar sobre mi app
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tu comercio en el bolsillo */}
        <ScrollReveal className="mb-16">
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img
              src="/images/soluciones/digitales-canales.png"
              alt="Canales digitales e integraciones conectadas: mensajería, pagos y ventas online"
              className="w-full h-48 md:h-64 object-cover"
              loading="lazy"
              width={1200}
              height={400}
            />
            <div className="p-8 bg-slate-900/60">
              <h2 className="text-2xl font-bold text-white mb-3">{POCKET.title}</h2>
              <p className="text-alenia-light/80 max-w-3xl leading-relaxed">{POCKET.body}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Trabajos nuestros: productos propios de ALENIA */}
        <section className="mb-20" aria-labelledby="trabajos-heading">
          <ScrollReveal>
            <h2 id="trabajos-heading" className="text-3xl font-bold text-white text-center mb-3">
              Trabajos nuestros
            </h2>
            <p className="text-sm text-center text-alenia-light/60 mb-10 max-w-2xl mx-auto">
              Productos que diseñamos, desarrollamos y mantenemos en ALENIA.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {TRABAJOS.map((t, i) => (
              <ScrollReveal key={t.title} delay={0.08 * i} className="h-full">
                <TrabajoLink
                  href={t.href}
                  className="group h-full rounded-2xl border border-white/10 bg-slate-900/40 p-6 flex flex-col hover:border-cyan-500/30 transition-colors"
                >
                  <t.Icon className="w-6 h-6 text-cyan-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{t.title}</h3>
                  <p className="text-sm text-alenia-light/75 leading-relaxed mb-4">{t.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 group-hover:text-cyan-200">
                    Ver producto
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </TrabajoLink>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-8 text-center">
            <Link
              to="/apps"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/5 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
              Ver catálogo de apps
            </Link>
          </ScrollReveal>
        </section>

        {/* Cómo trabajamos */}
        <section className="mb-20" aria-labelledby="modelo-heading">
          <ScrollReveal>
            <h2 id="modelo-heading" className="text-2xl font-bold text-white text-center mb-10">
              {PROCESO.title}
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {PROCESO.steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={0.1 * i}>
                <div className="relative h-full rounded-2xl border border-[#3A3A5A] bg-[#1A1A2E] p-6 text-center md:text-left">
                  {/* Antes el número iba detrás del título, medio tapado; ahora es una insignia propia */}
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#00ff88]/70 font-display text-base font-bold text-[#00ff88]">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 relative">{step.title}</h3>
                  <p className="text-sm text-alenia-light/75 leading-relaxed relative">{step.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Líneas complementarias */}
        <section className="mb-16" aria-labelledby="secondary-lines">
          <ScrollReveal>
            <h2 id="secondary-lines" className="text-2xl font-bold text-white mb-8">
              También potenciá tu negocio con
            </h2>
          </ScrollReveal>
          <div className="grid gap-4">
            {LINEAS_COMPLEMENTARIAS.map((linea, i) => (
              <ScrollReveal key={linea.title} delay={0.05 * i}>
                <div className="rounded-xl border border-white/10 p-5 bg-slate-900/30 hover:border-fuchsia-500/25 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <linea.Icon className="w-5 h-5 text-fuchsia-300" />
                    <h3 className="font-bold text-white">{linea.title}</h3>
                  </div>
                  <p className="text-sm text-alenia-light/75 mb-4">{linea.description}</p>
                  <Link
                    to={linea.href}
                    className="text-sm font-semibold text-fuchsia-300 hover:text-fuchsia-200 inline-flex items-center gap-1"
                  >
                    {linea.cta}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Tecnología e integraciones (acordeón) */}
        <section className="mb-20">
          <button
            type="button"
            onClick={() => setTechOpen(!techOpen)}
            className="w-full flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-900/40 px-6 py-4 text-left hover:bg-slate-900/60 transition-colors"
            aria-expanded={techOpen}
          >
            <span className="font-bold text-white">{TECNOLOGIA.title}</span>
            <ChevronDown className={'w-5 h-5 text-cyan-400 transition-transform ' + (techOpen ? 'rotate-180' : '')} />
          </button>
          <AnimatePresence>
            {techOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border border-t-0 border-white/10 rounded-b-xl p-6 bg-slate-900/20">
                  <p className="text-sm text-alenia-light/70 mb-4">{TECNOLOGIA.intro}</p>
                  <p className="text-xs uppercase tracking-wider text-cyan-400/90 mb-2">Stack</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {TECNOLOGIA.stack.map((s) => (
                      <span key={s} className="text-xs px-2 py-1 rounded bg-white/5 text-alenia-light/80">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-cyan-400/90 mb-2">Integraciones</p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm text-alenia-light/75">
                    {TECNOLOGIA.integrations.map((it) => (
                      <li key={it}>✓ {it}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* CTA final */}
        <ScrollReveal>
          <div className="text-center glass-advanced rounded-2xl p-10 border border-cyan-500/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">¿Querés un informe de potencial?</h3>
            <p className="text-alenia-light/75 mb-6 text-sm">
              Dejanos tus datos y te contactamos con una primera lectura de oportunidades para tu rubro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                onClick={() => setLeadServicio(LEAD_APP)}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-900 font-semibold px-6 py-3 rounded-xl"
              >
                Solicitar diagnóstico
              </motion.button>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center border border-white/20 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/5"
              >
                Ir a contacto
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ServiceFormModal
        isOpen={!!leadServicio}
        onClose={() => setLeadServicio(null)}
        servicio={leadServicio}
        onSubmit={() => {}}
      />
    </div>
  );
}
