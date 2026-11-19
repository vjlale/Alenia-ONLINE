import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Brain,
  Layers,
  Target,
  Compass,
  ArrowRight,
  MessageCircle,
  Lightbulb,
  Box,
  LayoutDashboard,
  Stethoscope,
  SearchCheck,
  Calculator,
  FileSpreadsheet,
  FileCog,
  Contact,
  Image as ImageIcon,
  Utensils,
  Sprout,
  CalendarClock,
  Shirt,
  Landmark,
  Baby,
  Projector
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { appsCatalog } from '../data/appsCatalog';
import analyticsService from '../services/analyticsService';
import { OG_IMAGE } from '../config/brand'

// WhatsApp de consultas de ALENIA
const WHATSAPP_NUMBER = '5493516875178';
const whatsappLink = (projectName) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola ALENIA, quiero consultar por ${projectName}.`)}`;

// Ícono de cada proyecto (campo `icono` de appsCatalog). Si falta, se usa Box.
const PROJECT_ICONS = {
  LayoutDashboard,
  Stethoscope,
  SearchCheck,
  Calculator,
  FileSpreadsheet,
  FileCog,
  Contact,
  Image: ImageIcon,
  Utensils,
  Sprout,
  CalendarClock,
  Shirt,
  Landmark,
  Baby,
  Projector
};

// Rótulo visible del tipo de proyecto y color del brillo de su tarjeta
const TIPO_CONFIG = {
  Producto: {
    label: 'Producto propio',
    glow: '#00ff88',
    badge: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
  },
  Cliente: {
    label: 'A medida',
    glow: '#00ccff',
    badge: 'border-sky-400/30 bg-sky-400/10 text-sky-300'
  }
};

const structuredData = (apps) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Catálogo de Desarrollos IA de ALENIA',
  itemListElement: apps
    .filter((app) => app.tipo === 'Producto')
    .map((app, index) => ({
      '@type': 'SoftwareApplication',
      position: index + 1,
      name: app.nombre,
      applicationCategory: app.enfoque?.[0] ?? 'BusinessApplication',
      operatingSystem: app.plataformas.join(', ') || 'Web',
      description: app.descripcion,
      offers: {
        '@type': 'Offer',
        price: 0,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      },
      url: app.enlaces?.sitio || app.enlaces?.demo || 'https://aleniahub.com/desarrollos-ia'
    }))
});

const heroHighlights = [
  {
    icon: Brain,
    title: 'IA aplicada a tu negocio',
    description: 'Usamos inteligencia artificial para resolver problemas concretos de nuestros clientes, no para hacer ruido.'
  },
  {
    icon: Layers,
    title: 'Todo conectado',
    description: 'Apps web, de escritorio y para el celular que trabajan juntas y crecen con tu negocio.'
  },
  {
    icon: Target,
    title: 'Casos a medida',
    description: 'Desarrollos creados para sectores clave: salud, comercio, logística, operación de máquinas y más.'
  }
];

// Número grande arriba y rótulo abajo, igual que los indicadores de /apps
function HeroStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="font-display text-3xl font-extrabold text-white">{value}</div>
      <div className="mt-1 text-[10px] font-semibold uppercase leading-snug tracking-[0.2em] text-white/40">{label}</div>
    </div>
  );
}

// Tarjeta de proyecto: cabecera sobria con ícono (las ilustraciones genéricas se sacaron),
// datos clave y consulta directa por WhatsApp.
function ProjectCard({ app, index = 0, onLinkClick }) {
  const { nombre, descripcion, tipo, plataformas = [], etiquetas = [], estado, enfoque = [], icono } = app;
  const Icon = PROJECT_ICONS[icono] || Box;
  const tipoConfig = TIPO_CONFIG[tipo] ?? TIPO_CONFIG.Producto;
  const href = whatsappLink(nombre);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4, delay: (index % 2) * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#3A3A5A] bg-[#1A1A2E] shadow-lg shadow-black/30 transition-colors hover:border-white/20"
    >
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden border-b border-[#3A3A5A]"
        style={{
          background: `radial-gradient(circle at 50% 55%, ${tipoConfig.glow}26 0%, transparent 60%), #1A1A2E`
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle at 50% 55%, ${tipoConfig.glow}1f 0%, transparent 70%)` }}
        />
        <div
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"
          style={{ color: tipoConfig.glow }}
        >
          <Icon className="h-10 w-10" strokeWidth={2} aria-hidden="true" />
        </div>

        {estado && (
          <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
            {estado}
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col gap-6 p-6">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tipoConfig.badge}`}
            >
              {tipoConfig.label}
            </span>
            {enfoque.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-display text-2xl font-semibold text-[#F1F5F9]">{nombre}</h3>
          <p className="text-sm leading-relaxed text-white/70">{descripcion}</p>
        </header>

        <section className="flex flex-wrap gap-4">
          <div className="flex min-w-[160px] flex-1 flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-white/60">Plataformas</h4>
            <div className="flex flex-wrap gap-2">
              {plataformas.map((plataforma) => (
                <span key={plataforma} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                  {plataforma}
                </span>
              ))}
            </div>
          </div>

          {etiquetas.length > 0 && (
            <div className="flex min-w-[200px] flex-1 flex-col gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-white/60">Tecnologías clave</h4>
              <div className="flex flex-wrap gap-2">
                {etiquetas.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        <footer className="mt-auto pt-2">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onLinkClick?.('whatsapp', app, href)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#00ff88] px-5 py-2.5 text-sm font-semibold text-[#00ff88] transition-colors hover:bg-[#00ff88]/10"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Consultar por este proyecto
          </a>
        </footer>
      </div>
    </motion.article>
  );
}

// Tarjeta final para cerrar la grilla cuando la última fila queda con una sola tarjeta
function IdeaCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative flex flex-col items-start justify-center gap-6 overflow-hidden rounded-2xl border border-[#3A3A5A] bg-[#1A1A2E] p-8"
      style={{ background: 'radial-gradient(circle at 80% 20%, rgba(199,125,255,0.18) 0%, transparent 55%), #1A1A2E' }}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#c77dff]">
        <Lightbulb className="h-8 w-8" strokeWidth={2} aria-hidden="true" />
      </div>
      <div className="space-y-3">
        <h3 className="font-display text-2xl font-semibold text-[#F1F5F9]">¿Tenés una idea? Contanos</h3>
        <p className="text-sm leading-relaxed text-white/70">
          Si tu negocio necesita una herramienta que todavía no existe, la pensamos y la construimos con vos.
        </p>
      </div>
      <Link
        to="/contacto"
        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7b2cbf] to-[#c77dff] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(199,125,255,0.35)] transition-all hover:shadow-[0_0_36px_rgba(199,125,255,0.55)]"
      >
        Contanos tu idea
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
      </Link>
    </motion.article>
  );
}

export default function DesarrollosIA() {
  const [sortBy, setSortBy] = useState('name-asc');

  const totalProductos = appsCatalog.filter((app) => app.tipo === 'Producto').length;
  const totalClientes = appsCatalog.filter((app) => app.tipo === 'Cliente').length;
  const totalEnProduccion = appsCatalog.filter((app) => app.estado === 'En producción').length;

  useEffect(() => {
    analyticsService.trackPageView('/desarrollos-ia', 'DESARROLLOS IA - Catálogo');
  }, []);

  const filteredApps = useMemo(() => {
    const sorted = [...appsCatalog].sort((a, b) => {
      if (sortBy === 'name-desc') return b.nombre.localeCompare(a.nombre, 'es');
      if (sortBy === 'tipo') return `${a.tipo}${a.nombre}`.localeCompare(`${b.tipo}${b.nombre}`, 'es');
      return a.nombre.localeCompare(b.nombre, 'es');
    });
    return sorted;
  }, [sortBy]);

  // En la grilla de dos columnas, si la última fila queda con una sola tarjeta se suma la de "¿Tenés una idea?"
  const showIdeaCard = filteredApps.length % 2 === 1;

  const handleSortChange = (option) => {
    setSortBy(option);
    analyticsService.trackEvent?.('catalog_sort', { option });
  };

  const handleResetFilters = () => {
    setSortBy('name-asc');
    analyticsService.trackEvent?.('catalog_reset_filters');
  };

  const handleSearchChange = (value) => {
    // No search term, so no tracking
  };

  const handleLinkClick = (type, app, url) => {
    analyticsService.trackEvent?.('catalog_link_click', {
      type,
      appId: app.id,
      appName: app.nombre,
      url
    });
  };

  return (
    <>
      <Helmet>
        <title>DESARROLLOS IA | ALENIA</title>
        <meta
          name="description"
          content="Catálogo de desarrollos IA creados por ALENIA: soluciones personalizadas y productos listos para escalar en salud, comercio, logística y más."
        />
        <link rel="canonical" href="https://aleniahub.com/desarrollos-ia" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aleniahub.com/desarrollos-ia" />
        <meta property="og:title" content="Catálogo de Desarrollos IA | ALENIA" />
        <meta
          property="og:description"
          content="Explorá los desarrollos de inteligencia artificial y software a medida creados para clientes y productos propios de ALENIA."
        />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:alt" content="ALENIA - Desarrollos IA" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aleniahub.com/desarrollos-ia" />
        <meta property="twitter:title" content="Catálogo de Desarrollos IA | ALENIA" />
        <meta
          property="twitter:description"
          content="Soluciones inteligentes, automatizaciones y productos con IA desarrollados por ALENIA."
        />
        <meta property="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(structuredData(appsCatalog))}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 rounded-3xl border border-white/10 bg-gradient-to-br from-alenia-dark/80 via-slate-900/80 to-black/70 p-10 shadow-2xl shadow-black/40"
          >
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex-1 space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-alenia-primary/30 bg-alenia-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-alenia-primary">
                  <Sparkles className="h-4 w-4" />
                  Desarrollos IA
                </span>
                <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">
                  Innovación aplicada en cada solución creada por ALENIA
                </h1>
                <p className="max-w-2xl text-lg text-white/70">
                  Conectamos estrategia, creatividad y tecnología para diseñar experiencias digitales con IA. Descubrí los productos que comercializamos y los desarrollos a medida que construimos junto a nuestros clientes.
                </p>
                <div className="grid grid-cols-1 gap-4 text-sm text-white/60 sm:grid-cols-3">
                  <HeroStat value={totalProductos} label="Productos propios" />
                  <HeroStat value={totalClientes} label="Casos a medida" />
                  <HeroStat value={totalEnProduccion} label="En producción" />
                </div>
              </div>

              <div className="flex-1">
                <div className="grid gap-4">
                  {heroHighlights.map(({ icon: Icon, title, description }) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-alenia-primary/10 text-alenia-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
                        <p className="text-sm text-white/60">{description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <section className="space-y-10">
            <header className="flex flex-wrap items-center justify-between gap-4 text-white/70">
              <div className="flex items-center gap-3">
                <Compass className="h-6 w-6 text-alenia-primary" />
                <h2 className="font-display text-xl font-semibold">
                  {filteredApps.length} desarrollo{filteredApps.length === 1 ? '' : 's'} listados
                </h2>
              </div>
            </header>

            {filteredApps.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-3xl border border-dashed border-white/10 bg-white/5 py-16 text-center"
              >
                <p className="text-lg text-white/60">
                  No encontramos desarrollos con los filtros seleccionados. Ajustá la búsqueda para descubrir más proyectos.
                </p>
              </motion.div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {filteredApps.map((app, index) => (
                  <ProjectCard key={app.id} app={app} index={index} onLinkClick={handleLinkClick} />
                ))}
                {showIdeaCard && <IdeaCard />}
              </div>
            )}
          </section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-20 rounded-3xl border border-alenia-primary/30 bg-alenia-primary/10 p-10 text-white shadow-[0_20px_80px_rgba(0,255,136,0.15)]"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
                  <Sparkles className="h-4 w-4" />
                  ¿Necesitás tu propia solución IA?
                </span>
                <h3 className="font-display text-3xl font-bold">Contanos tu desafío y diseñamos el próximo desarrollo juntos</h3>
                <p className="text-white/70">
                  Nos ocupamos de todo: entender tu negocio, diseñar la solución, desarrollarla, ponerla en marcha y acompañarte después.
                </p>
              </div>
              <Link
                to="/contacto"
                className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-gradient-to-r from-[#7b2cbf] to-[#c77dff] px-6 py-3 text-base font-semibold text-white shadow-[0_0_24px_rgba(199,125,255,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_0_36px_rgba(199,125,255,0.55)]"
              >
                Agendá una demo
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
}
