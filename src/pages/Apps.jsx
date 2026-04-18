import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  Sparkles,
  Rocket,
  ChevronDown,
  Zap,
  TrendingUp,
  Calculator,
  BarChart3,
  Hash,
  Bot,
  Camera,
  ArrowRight,
} from 'lucide-react';

import ScrollReveal from '../components/common/ScrollReveal';
import AnimatedGradient from '../components/common/AnimatedGradient';
import StartupAppCard from '../components/apps/StartupAppCard';
import ToolCard from '../components/apps/ToolCard';
import { startupApps } from '../data/startupApps';
import {
  BRAND_OG_IMAGE,
  BRAND_OG_IMAGE_WIDTH,
  BRAND_OG_IMAGE_HEIGHT,
} from '../config/brandAssets';

/**
 * Herramientas gratuitas con IA (secundarias).
 * Declaradas acá a propósito: antes eran el contenido principal de /apps,
 * ahora quedan relegadas a una sección secundaria mientras las apps de la
 * startup toman el protagonismo.
 */
const tools = [
  {
    id: 'picshop',
    name: 'PicShop',
    description: 'Transformá tus productos en fichas listas para publicar en tu tienda online.',
    icon: <Camera className="h-5 w-5" />,
    color: 'teal',
    link: '/apps/picshop',
    rating: 4.7,
    timeToComplete: '5 min',
    users: '1.1k',
  },
  {
    id: 'roi',
    name: 'Calculadora de ROI',
    description:
      'Calculá el retorno de inversión de tus campañas y proyectos con precisión matemática.',
    icon: <Calculator className="h-5 w-5" />,
    color: 'green',
    link: '/apps/calculadora-roi',
    rating: 4.8,
    timeToComplete: '5 min',
    users: '2.5k',
  },
  {
    id: 'competencia',
    name: 'Analizador de Competencia',
    description: 'Compará tu negocio con la competencia usando inteligencia artificial.',
    icon: <BarChart3 className="h-5 w-5" />,
    color: 'blue',
    link: '/apps/analizador-competencia',
    rating: 4.9,
    timeToComplete: '15 min',
    users: '1.8k',
  },
  {
    id: 'hashtags',
    name: 'Generador de Hashtags',
    description: 'Obtené hashtags optimizados para maximizar el alcance de tus publicaciones.',
    icon: <Hash className="h-5 w-5" />,
    color: 'purple',
    link: '/apps/generador-hashtags',
    rating: 4.7,
    timeToComplete: '3 min',
    users: '3.2k',
  },
  {
    id: 'automatizaciones',
    name: 'Simulador de Automatizaciones',
    description: 'Visualizá y probá automatizaciones para optimizar los procesos de tu empresa.',
    icon: <Bot className="h-5 w-5" />,
    color: 'orange',
    link: '/apps/simulador-automatizaciones',
    rating: 4.6,
    timeToComplete: '20 min',
    users: '950',
  },
  {
    id: 'seo',
    name: 'Optimizador de SEO',
    description: 'Mejorá el posicionamiento de tu sitio web con análisis SEO inteligente.',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'teal',
    link: '/apps/optimizador-seo',
    rating: 4.5,
    timeToComplete: '12 min',
    users: '1.5k',
  },
];

export default function Apps() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

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

  const totalApps = startupApps.length;
  const inProduction = startupApps.filter((a) => a.status === 'En producción').length;

  return (
    <>
      <Helmet>
        <title>Apps de la startup Alen.iA — Nuestras apps en producción</title>
        <meta
          name="description"
          content="Conocé las apps desarrolladas por la startup Alen.iA. Match Padel, E-pix, i-Streem y próximos lanzamientos: productos digitales reales, pensados para escalar."
        />
        <link rel="canonical" href="https://alenia.online/apps" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alenia.online/apps" />
        <meta property="og:title" content="Apps de la startup Alen.iA" />
        <meta
          property="og:description"
          content="Nuestras apps en producción. Match Padel, E-pix, i-Streem y próximos lanzamientos."
        />
        <meta property="og:image" content={BRAND_OG_IMAGE} />
        <meta property="og:image:alt" content="ALENIA - Apps de la startup" />
        <meta property="og:image:width" content={String(BRAND_OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(BRAND_OG_IMAGE_HEIGHT)} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://alenia.online/apps" />
        <meta property="twitter:title" content="Apps de la startup Alen.iA" />
        <meta
          property="twitter:description"
          content="Match Padel, E-pix, i-Streem y próximas apps: productos digitales reales."
        />
        <meta property="twitter:image" content={BRAND_OG_IMAGE} />
      </Helmet>

      <main className="relative min-h-screen overflow-hidden bg-alenia-dark">
        {/* Background animado: gradiente que sigue al cursor */}
        <div
          className="pointer-events-none fixed inset-0 opacity-30"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,255,136,0.08), transparent 50%)`,
          }}
        />

        {/* Grid de fondo */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* ======================== HERO ======================== */}
        <section className="relative min-h-[60vh] pt-20 pb-10 sm:min-h-[75vh] sm:pt-28 sm:pb-16">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="container mx-auto max-w-6xl px-5 sm:px-6"
          >
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/"
                className="group mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white sm:mb-10"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Volver al inicio
              </Link>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-alenia-primary/30 bg-alenia-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-alenia-primary sm:mb-8 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.25em]"
            >
              <Rocket className="h-3.5 w-3.5" />
              Startup Alen.iA
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              Nuestras{' '}
              <AnimatedGradient className="apps-hero-gradient">Apps</AnimatedGradient>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:mt-8 sm:text-lg md:text-xl"
            >
              Productos digitales reales desarrollados por nuestra startup. Software que
              resolvemos, lanzamos y hacemos crecer.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 grid max-w-2xl grid-cols-3 gap-3 sm:mt-12 sm:gap-4"
            >
              <StatCard value={totalApps} label="Apps en el catálogo" />
              <StatCard value={inProduction} label="En producción" />
              <StatCard value="+" label="Más apps próximamente" asterisk />
            </motion.div>

            {/* Indicador de scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-10 hidden items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40 sm:mt-20 sm:flex"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
              Desplazate para explorar
            </motion.div>
          </motion.div>
        </section>

        {/* ======================== STARTUP APPS (PRINCIPAL) ======================== */}
        <section className="relative pb-16 pt-4 sm:pb-24 sm:pt-8">
          <div className="container mx-auto max-w-7xl px-5 sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
              {startupApps.map((app, index) => (
                <StartupAppCard key={app.id} app={app} index={index} />
              ))}
            </div>

            {/* Nota al pie: más apps ya desarrolladas por sumar */}
            {startupApps.length < 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 text-center text-sm text-white/40"
              >
                Estamos sumando más apps al catálogo — todas ya desarrolladas, listas
                para mostrarte.
              </motion.p>
            )}
          </div>
        </section>

        {/* ============== HERRAMIENTAS GRATUITAS CON IA (SECUNDARIA) ============== */}
        <section className="relative border-t border-white/5 bg-black/30 py-16 sm:py-24">
          <div className="container mx-auto max-w-7xl px-5 sm:px-6">
            <ScrollReveal direction="up">
              <div className="mb-8 max-w-3xl sm:mb-12">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 sm:text-xs sm:tracking-[0.3em]">
                  <Zap className="h-3.5 w-3.5" />
                  Bonus · Herramientas gratuitas
                </div>
                <h2 className="font-display text-2xl font-bold leading-tight text-white/90 sm:text-3xl md:text-4xl">
                  Mini-apps con IA, gratis y listas para usar
                </h2>
                <p className="mt-3 text-sm text-white/50 sm:mt-4 sm:text-base">
                  Pequeñas herramientas que liberamos para la comunidad. ROI, hashtags,
                  SEO, análisis de competencia y más.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ======================== CTA FINAL ======================== */}
        <section className="relative py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-5 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl border border-alenia-primary/20 bg-gradient-to-br from-alenia-primary/10 via-slate-900 to-slate-950 p-6 sm:p-10 md:p-16"
            >
              {/* Glow decorativo */}
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-alenia-primary/20 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-alenia-secondary/20 blur-3xl" />

              <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
                <div className="max-w-xl space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                    <Sparkles className="h-3.5 w-3.5" />
                    ¿Tenés una idea?
                  </div>
                  <h3 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
                    Construyamos tu próxima app juntos
                  </h3>
                  <p className="text-sm text-white/60 sm:text-base">
                    Diseñamos, desarrollamos y escalamos productos digitales end-to-end.
                    Contanos tu proyecto y armamos la hoja de ruta.
                  </p>
                </div>
                <Link
                  to="/contacto"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-alenia-primary px-6 py-3 text-sm font-semibold text-black shadow-glow-md transition-all hover:shadow-glow-lg sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                >
                  Agenda una demo
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

function StatCard({ value, label, asterisk = false }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm sm:p-4">
      <div className="font-display text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
        {value}
        {asterisk && <span className="text-alenia-primary">∞</span>}
      </div>
      <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/40 sm:text-[10px] sm:tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}
