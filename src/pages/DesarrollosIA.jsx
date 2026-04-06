import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Layers, Target, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { appsCatalog, catalogFilters } from '../data/appsCatalog';
import analyticsService from '../services/analyticsService';
import AppCatalogCard from '../components/apps/AppCatalogCard';

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
      url: app.enlaces?.sitio || app.enlaces?.demo || 'https://alenia.online/desarrollos-ia'
    }))
});

const heroHighlights = [
  {
    icon: Brain,
    title: 'IA aplicada a negocio',
    description: 'Soluciones entrenadas con modelos generativos para resolver retos reales de nuestros clientes.'
  },
  {
    icon: Layers,
    title: 'Stacks combinados',
    description: 'Frontend moderno, backends robustos y automatizaciones listas para escalar.'
  },
  {
    icon: Target,
    title: 'Casos a medida',
    description: 'Desarrollos creados para sectores clave: salud, retail, logística, marketing y más.'
  }
];

export default function DesarrollosIA() {
  const [sortBy, setSortBy] = useState('name-asc');

  const totalProductos = appsCatalog.filter((app) => app.tipo === 'Producto').length;
  const totalClientes = appsCatalog.filter((app) => app.tipo === 'Cliente').length;

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
          content="Catálogo de desarrollos IA creados por ALENIA: soluciones personalizadas y productos listos para escalar en salud, retail, marketing y más."
        />
        <link rel="canonical" href="https://alenia.online/desarrollos-ia" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alenia.online/desarrollos-ia" />
        <meta property="og:title" content="Catálogo de Desarrollos IA | ALENIA" />
        <meta
          property="og:description"
          content="Explora los desarrollos de inteligencia artificial y software a medida creados para clientes y productos propios de ALENIA."
        />
        <meta property="og:image" content="https://alenia.online/images/Alenia1.png" />
        <meta property="og:image:alt" content="ALENIA - Desarrollos IA" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://alenia.online/desarrollos-ia" />
        <meta property="twitter:title" content="Catálogo de Desarrollos IA | ALENIA" />
        <meta
          property="twitter:description"
          content="Soluciones inteligentes, automatizaciones y productos con IA desarrollados por ALENIA."
        />
        <meta property="twitter:image" content="https://alenia.online/images/Alenia1.png" />
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
                <h1 className="text-4xl font-extrabold text-white md:text-5xl">
                  Innovación aplicada en cada solución creada por ALENIA
                </h1>
                <p className="max-w-2xl text-lg text-white/70">
                  Conectamos estrategia, creatividad y tecnología para diseñar experiencias digitales con IA. Descubrí los productos que comercializamos y los desarrollos a medida que construimos junto a nuestros clientes.
                </p>
                <dl className="grid grid-cols-1 gap-4 text-sm text-white/60 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <dt className="mb-1 uppercase tracking-widest text-white/40">Productos con IA</dt>
                    <dd className="text-2xl font-semibold text-white">{totalProductos}</dd>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <dt className="mb-1 uppercase tracking-widest text-white/40">Casos a medida</dt>
                    <dd className="text-2xl font-semibold text-white">{totalClientes}</dd>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <dt className="mb-1 uppercase tracking-widest text-white/40">Tecnologías activas</dt>
                    <dd className="text-2xl font-semibold text-white">{appsCatalog.flatMap(app => app.tecnologias).filter((value, index, self) => self.indexOf(value) === index).length}</dd>
                  </div>
                </dl>
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
                        <h2 className="text-lg font-semibold text-white">{title}</h2>
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
                <h2 className="text-xl font-semibold">
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
                {filteredApps.map((app) => (
                  <AppCatalogCard key={app.id} app={app} onLinkClick={handleLinkClick} />
                ))}
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
                <h3 className="text-3xl font-bold">Contanos tu desafío y diseñamos el próximo desarrollo juntos</h3>
                <p className="text-white/70">
                  Nuestro equipo técnico lidera proyectos end-to-end: estrategia, UX, desarrollo full-stack, despliegue y soporte continuo.
                </p>
              </div>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-3 rounded-full bg-alenia-primary px-6 py-3 text-base font-semibold text-black transition-transform hover:-translate-y-1"
              >
                Agenda una demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
}

