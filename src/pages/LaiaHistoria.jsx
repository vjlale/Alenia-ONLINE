import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  animate,
} from 'framer-motion';
import {
  Pause,
  Play,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
  Cpu,
  CreditCard,
  DoorOpen,
  Smartphone,
  Monitor,
  LayoutDashboard,
  Palette,
  Wrench,
  ShieldCheck,
  FlaskConical,
  Lightbulb,
  Hammer,
  Search,
  Save,
  Moon,
  Users,
  Repeat,
  Languages,
  Bot,
  Coffee,
  Maximize2,
  Package,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import FaqSection from '../components/common/FaqSection';
import { FAQS, SEO_PAGES } from '../data/seoPages';
import { OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '../config/brand';

/* -------------------------------------------------------------------------- */
/*  Página "Cómo nació LaIA": historia del proyecto contada sin tecnicismos.   */
/*  Todas las imágenes están en MEDIA: para cambiar una foto, reemplazá la     */
/*  ruta acá (los archivos viven en public/images/laia/).                      */
/* -------------------------------------------------------------------------- */

const SITE_URL = 'https://aleniahub.com';
const PAGE_PATH = '/casos/laia';
const LAIA_SEO = SEO_PAGES.find((p) => p.path === PAGE_PATH);
const PAGE_TITLE = LAIA_SEO.title;
const PAGE_DESCRIPTION = LAIA_SEO.description;

const C = {
  navy: '#070e20',
  surface: '#0d1b40',
  gold: '#c9a52a',
  goldLight: '#e8c84a',
  cyan: '#4dd9f5',
  violet: '#a78bfa',
};

const IMG = '/images/laia';
const MEDIA = {
  logo: `${IMG}/logo-laia-line.webp`,
  buildBy: `${IMG}/build-by-alenia.webp`,
  placaTablero: `${IMG}/placa-tablero.jpg`,
  croquis: `${IMG}/croquis-a-mano.jpg`,
  appHome: `${IMG}/app-home.jpg`,
  totemInicio: `${IMG}/totem-inicio.jpg`,
  panel: `${IMG}/panel-inicio.jpg`,
  // Fotos reales tomadas con el celular durante el armado y en el local
  localVacio: `${IMG}/local-vacio.jpg`,
  armadoMaquinas: `${IMG}/armado-maquinas.jpg`,
  puesto: `${IMG}/puesto-trabajo.jpg`,
  lavadora1: `${IMG}/lavadora-1.jpg`,
  obra1: `${IMG}/obra-1.jpg`,
  obra2: `${IMG}/obra-2.jpg`,
  placaEsp32: `${IMG}/placa-esp32.jpg`,
  placaEnCaja: `${IMG}/placa-en-caja.jpg`,
  placaInstalada: `${IMG}/placa-instalada.jpg`,
  placaInstalada2: `${IMG}/placa-instalada-2.jpg`,
  totemPared: `${IMG}/totem-pared.jpg`,
  fachadaObra: `${IMG}/fachada-obra.jpg`,
  lucesMaquinas: `${IMG}/luces-maquinas.jpg`,
  vendingDos: `${IMG}/vending-dos.jpg`,
  releMano: `${IMG}/rele-mano.jpg`,
  vendingLlena: `${IMG}/vending-llena.jpg`,
  fachadaNoche: `${IMG}/fachada-noche.jpg`,
  aperturaMaquinas: `${IMG}/apertura-maquinas.jpg`,
  cafetera: `${IMG}/cafetera.jpg`,
  lectorQr: `${IMG}/lector-qr.jpg`,
};

/* ------------------------------- Contenido -------------------------------- */

const HERO_STATS = [
  { value: 69, label: 'días hasta abrir' },
  { value: 1, label: 'fundador' },
  { value: 15, label: 'agentes de IA' },
  { value: 9, label: 'máquinas + puerta', suffix: '' },
];

const MILESTONES = [
  {
    day: 'Día 0',
    date: '24 jun',
    title: 'Un proyecto vacío',
    text: 'Un local vacío, una persona y una IA. El objetivo: que un comercio físico funcione solo, sin nadie atendiendo.',
    image: MEDIA.localVacio,
  },
  {
    day: 'Día 13',
    date: '7 jul',
    title: 'Obra en el local, software en marcha',
    text: 'Mientras se levantaban paredes, el software ya se había probado con una máquina real, no solo en la pantalla.',
    image: MEDIA.obra2,
  },
  {
    day: 'Día 17',
    date: '11 jul',
    title: 'Las primeras placas',
    text: 'Las máquinas no estaban hechas para hablar con una app. Una placa chica hace de "monedero": cuando el pago se confirma, pone la ficha. Esos días nace también el carrito único: lavado, snacks y café en un solo pago.',
    image: MEDIA.placaEsp32,
  },
  {
    day: 'Día 32',
    date: '26 jul',
    title: 'La placa, lista para instalar',
    text: 'Cada placa va en su caja, con su relé, preparada para conectarse a una máquina.',
    image: MEDIA.placaEnCaja,
  },
  {
    day: 'Día 36',
    date: '30 jul',
    title: 'Primer viaje: placas en las máquinas',
    text: 'Las 6 lavadoras y secadoras quedan conectadas. Del código al fierro.',
    image: MEDIA.placaInstalada,
  },
  {
    day: 'Día 43',
    date: '6–9 ago',
    title: 'Llegan el tótem y los pagos',
    text: 'El tótem queda en la pared y se integra el pago con QR. Regla de oro desde ese día: ninguna máquina arranca sin pago confirmado.',
    image: MEDIA.totemPared,
  },
  {
    day: 'Día 45',
    date: '8 ago',
    title: 'Luces, máquinas y últimos detalles',
    text: 'El local empieza a parecerse a lo que se había imaginado.',
    image: MEDIA.lucesMaquinas,
  },
  {
    day: 'Día 49',
    date: '12 ago',
    title: 'Llegan las vending',
    text: 'Dos máquinas de snacks y bebidas que se suman al mismo sistema: el cliente carga saldo en la app y marca un código en la máquina.',
    image: MEDIA.vendingDos,
  },
  {
    day: 'Día 56',
    date: '18–19 ago',
    title: 'La cafetera, por dentro',
    text: 'Visita técnica para estudiar la placa original de la cafetera, dibujar su conexión a mano y sumarle un relé.',
    image: MEDIA.releMano,
  },
  {
    day: 'Día 68',
    date: '30–31 ago',
    title: 'La puerta se abre con QR',
    text: 'Cerradura magnética, lector de QR y una pantalla que da la bienvenida. La fachada ya está encendida.',
    image: MEDIA.lectorQr,
  },
  {
    day: 'Día 69',
    date: '1–2 sep',
    title: 'LaIA abre sus puertas, 24 horas',
    text: 'Abre al público en Palermo con todo funcionando: lavadoras, secadoras, vending, cafetera y puerta con QR. El 2 de septiembre entra el primer pago real.',
    image: MEDIA.aperturaMaquinas,
    highlight: true,
  },
  {
    day: 'Sep',
    date: 'septiembre',
    title: 'Abierto y mejorando cada semana',
    text: 'Alertas 24/7 para el dueño, 7 idiomas, chat de ayuda con IA y un bot que anota gastos por audio.',
    image: MEDIA.panel,
  },
  {
    day: 'Día 99',
    date: '1 oct',
    title: 'Un local que funciona solo',
    text: 'LaIA saluda a cada cliente por su nombre y el dueño controla todo desde el celular.',
    image: MEDIA.fachadaNoche,
  },
];

// Posición del hito de apertura (Día 69) en la línea de tiempo
const OPENING_INDEX = Math.max(0, MILESTONES.findIndex((ms) => ms.highlight));

const METHOD_STEPS = [
  { icon: Lightbulb, title: 'Planificar', text: 'Nada se toca hasta que el plan está aprobado.' },
  { icon: Hammer, title: 'Construir', text: 'La IA escribe la solución pieza por pieza.' },
  { icon: Search, title: 'Revisar', text: 'Un revisor y un probador controlan cada cambio.' },
  { icon: Save, title: 'Guardar', text: 'Se guarda en pasos chicos, fáciles de seguir.' },
];

const SPECIALISTS = [
  { icon: CreditCard, name: 'Pagos' },
  { icon: Cpu, name: 'Máquinas' },
  { icon: Package, name: 'Vending' },
  { icon: DoorOpen, name: 'Puerta' },
  { icon: Smartphone, name: 'App' },
  { icon: Monitor, name: 'Tótem' },
  { icon: LayoutDashboard, name: 'Panel' },
  { icon: Palette, name: 'Diseño' },
  { icon: Wrench, name: 'Instalación' },
  { icon: ShieldCheck, name: 'Revisor' },
  { icon: FlaskConical, name: 'Probador' },
];

const FAILURES = [
  {
    problem: 'Compras desde la vereda',
    detail: 'La noche de la apertura, dos personas pagaron con la puerta cerrada y una máquina arrancó vacía.',
    fix: 'Ahora solo se puede comprar si entraste por la puerta con QR en las últimas 3 horas.',
  },
  {
    problem: 'Placas que perdían la conexión',
    detail: 'Dos lavadoras quedaron apuntando a una red Wi-Fi que sus placas no veían.',
    fix: 'Se corrigió la red, se sumó reconexión automática y las placas se actualizan a distancia.',
  },
  {
    problem: 'Pagos que no se verificaban',
    detail: 'Un salto de línea invisible en una clave hacía rechazar la confirmación del pago.',
    fix: 'Se encontró revisando los registros. Los pagos con QR quedaron confirmados el 4 de septiembre.',
  },
  {
    problem: 'Un asistente que se quedó mudo',
    detail: 'Un proveedor de IA se quedó sin saldo y los asistentes dejaron de responder.',
    fix: 'Hoy hay una cadena de proveedores: si uno falla, contesta el siguiente.',
  },
  {
    problem: 'Números que no cerraban',
    detail: 'Las cortesías del equipo contaban como ventas y no se descontaban las comisiones.',
    fix: 'Se cruzó todo contra los pagos reales y se rediseñó el panel de finanzas.',
  },
];

const TODAY_FEATURES = [
  { icon: Cpu, text: '3 lavadoras y 3 secadoras conectadas' },
  { icon: Coffee, text: '2 máquinas de snacks y bebidas + cafetera' },
  { icon: DoorOpen, text: 'Puerta con QR y cerradura magnética' },
  { icon: Languages, text: 'App en 7 idiomas, sin contraseña' },
  { icon: Monitor, text: 'Tótem para comprar en el local' },
  { icon: LayoutDashboard, text: 'Panel del dueño en tiempo real' },
  { icon: Bot, text: '7 asistentes de IA en uso' },
  { icon: Bell, text: 'Alertas al celular del dueño las 24 horas' },
];

const STORE_STATS = [
  { value: 800, label: 'cuentas en la app' },
  { value: 470, label: 'pagos reales de clientes' },
  { value: 900, prefix: '+', label: 'servicios realizados' },
  { value: 45, suffix: '%', label: 'de los que pagaron volvieron' },
];

// Las primeras 9 de la lista son las que se ven en "Todo" sin expandir:
// un recorrido corto del local vacío a la apertura.
// MEDIA.totemInicio (diseño de pantalla con avatar generado, no es foto real)
// quedó fuera de la galería; el tótem real se ve en MEDIA.totemPared.
const GALLERY = [
  { src: MEDIA.localVacio, caption: 'Así empezó: el local vacío', group: 'armado', tall: true },
  { src: MEDIA.obra1, caption: '7 de julio: obra en marcha', group: 'armado', tall: true },
  { src: MEDIA.placaEsp32, caption: '11 de julio: las primeras placas en la mesa', group: 'fierro', tall: true },
  { src: MEDIA.placaInstalada2, caption: '30 de julio: instalando una placa en el local', group: 'fierro', tall: true },
  { src: MEDIA.totemPared, caption: '6 de agosto: el tótem ya está en la pared', group: 'armado', tall: true },
  { src: MEDIA.releMano, caption: '19 de agosto: el relé para la cafetera', group: 'fierro', tall: true },
  { src: MEDIA.lectorQr, caption: 'En la puerta desde la apertura: acercá tu QR para entrar', group: 'local', tall: true },
  { src: MEDIA.aperturaMaquinas, caption: '2 de septiembre: el día del primer pago real', group: 'local' },
  { src: MEDIA.fachadaNoche, caption: 'Lavander.IA, abierta las 24 horas', group: 'local' },
  { src: MEDIA.fachadaObra, caption: '7 de agosto: la fachada, todavía tapada', group: 'armado' },
  { src: MEDIA.armadoMaquinas, caption: 'Llegan las máquinas, todavía embaladas', group: 'armado', tall: true },
  { src: MEDIA.lucesMaquinas, caption: '8 de agosto: luces y últimos detalles', group: 'armado' },
  { src: MEDIA.puesto, caption: 'Donde se construyó el software: una mesa y tres pantallas', group: 'armado' },
  { src: MEDIA.placaEnCaja, caption: '26 de julio: la placa en su caja, con su relé', group: 'fierro', tall: true },
  { src: MEDIA.placaTablero, caption: 'Por dentro de la cafetera: la placa original', group: 'fierro' },
  { src: MEDIA.croquis, caption: 'El croquis a mano de cómo conectarla', group: 'fierro' },
  { src: MEDIA.lavadora1, caption: 'Lavadora 1, lista para usar con la app', group: 'local', tall: true },
  { src: MEDIA.vendingLlena, caption: 'Snacks y bebidas, dentro del mismo sistema', group: 'local', tall: true },
  { src: MEDIA.cafetera, caption: 'La cafetera, conectada desde la apertura', group: 'local', tall: true },
  { src: MEDIA.appHome, caption: 'La app: todo el local en el bolsillo', group: 'pantallas', tall: true },
  { src: MEDIA.panel, caption: 'El panel del dueño (montos ocultos)', group: 'pantallas' },
];

// Cuántas fotos se muestran antes de "Ver todas" (múltiplo de 3 para que la grilla cierre pareja)
const GALLERY_PREVIEW = 9;

const GALLERY_TABS = [
  { id: 'todas', label: 'Todo' },
  { id: 'armado', label: 'El armado' },
  { id: 'local', label: 'El local' },
  { id: 'fierro', label: 'El fierro' },
  { id: 'pantallas', label: 'Las pantallas' },
];

/* ------------------------------- Utilidades ------------------------------- */

function GradientText({ children, from = C.goldLight, via = C.cyan, to = C.violet }) {
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(100deg, ${from} 0%, ${via} 55%, ${to} 100%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {children}
    </span>
  );
}

function CountUp({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString('es-AR')}
      {suffix}
    </span>
  );
}

function Eyebrow({ children, color = C.cyan }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]"
      style={{ borderColor: `${color}55`, color, background: `${color}12` }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle, eyebrowColor }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-white/70">{subtitle}</p>}
    </div>
  );
}

/* --------------------------------- Visor ---------------------------------- */

function Lightbox({ items, index, onClose, onMove }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onMove]);

  const item = items[index];
  if (!item) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="Cerrar"
      >
        <X className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onMove(-1);
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 md:left-6"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onMove(1);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 md:right-6"
        aria-label="Foto siguiente"
      >
        <ChevronRight className="h-7 w-7" />
      </button>
      <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={item.src}
            src={item.src}
            alt={item.caption}
            className="max-h-[78vh] w-auto rounded-xl object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
        <figcaption className="mt-4 text-center text-sm text-white/80">
          {item.caption} <span className="text-white/60">· {index + 1} / {items.length}</span>
        </figcaption>
      </figure>
    </motion.div>,
    document.body,
  );
}

/* ------------------------------ Secciones --------------------------------- */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-10 md:pb-28">
      {/* Fondo: foto real del local, desenfocada */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: bgY }} aria-hidden="true">
        <img src={MEDIA.fachadaNoche} alt="" className="h-full w-full object-cover opacity-30 blur-sm" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${C.navy}cc 0%, ${C.navy} 85%)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </motion.div>

      <motion.div className="container relative mx-auto px-6" style={{ opacity: fade }}>
        <Link to="/soluciones/hub" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Volver a ALENIA HUB
        </Link>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow color={C.gold}>
              <Sparkles className="h-3.5 w-3.5" /> Caso real · Build by ALENIA
            </Eyebrow>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] text-white md:text-6xl lg:text-7xl">
              Una persona. Una IA. <GradientText>Un local que funciona solo.</GradientText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              LaIA es una lavandería self-service abierta las 24 horas, sin personal. La idea, las
              decisiones y las pruebas en el local fueron del fundador; todo el software se desarrolló con
              un equipo de agentes de inteligencia artificial dirigido por él.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#historia"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
                style={{ background: `linear-gradient(90deg, ${C.goldLight}, ${C.cyan})` }}
              >
                Ver la historia <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://applaia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Conocé LaIA <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-[240px] lg:max-w-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="absolute -inset-10 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${C.gold}33, transparent 70%)` }}
              aria-hidden="true"
            />
            <img src={MEDIA.logo} alt="LaIA" className="relative w-full object-contain drop-shadow-2xl" />
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={0.1 * i}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <div className="font-display text-4xl font-extrabold md:text-5xl" style={{ color: C.goldLight }}>
                  <CountUp value={s.value} />
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/65">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Challenge() {
  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-display text-2xl font-bold leading-snug text-white md:text-4xl">
              “El reto no era hacer una app: era lograr que un comercio físico funcione solo y sea{' '}
              <span style={{ color: C.goldLight }}>confiable a las 3 de la mañana</span>.”
            </p>
            <footer className="mt-6 flex items-center justify-center gap-3 text-sm text-white/65">
              <Moon className="h-4 w-4" /> 1 de cada 5 servicios se hace de noche
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Timeline() {
  const [active, setActive] = useState(0);
  // En pantallas táctiles no avanza solo: se lee a su ritmo
  const [paused, setPaused] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches,
  );
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { margin: '-30% 0px' });
  const m = MILESTONES[active];
  const last = MILESTONES.length - 1;

  // Avanza solo mientras la sección está a la vista y nadie la está tocando
  useEffect(() => {
    if (paused || reduce || !inView) return undefined;
    const id = setInterval(() => setActive((a) => (a >= last ? 0 : a + 1)), 5500);
    return () => clearInterval(id);
  }, [paused, reduce, inView, last]);

  const go = (i) => {
    setPaused(true);
    setActive(Math.max(0, Math.min(last, i)));
  };

  return (
    <section id="historia" ref={sectionRef} className="relative scroll-mt-20 py-20">
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Del día 0 al día 99"
          title={
            <>
              De un proyecto vacío a una lavandería que <GradientText>funciona sola</GradientText>
            </>
          }
          subtitle="Tocá cada hito para recorrer cómo se construyó LaIA."
        />

        {/* Barra de hitos */}
        <div className="mx-auto max-w-5xl">
          <div className="relative mb-3 hidden h-10 md:block">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
            <motion.div
              className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2"
              style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.cyan})` }}
              animate={{ width: `${(active / last) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
            {MILESTONES.map((ms, i) => (
              <button
                key={ms.title}
                type="button"
                onClick={() => go(i)}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(i / last) * 100}%` }}
                aria-label={`${ms.day}: ${ms.title}`}
                aria-current={i === active ? 'step' : undefined}
              >
                <span
                  className="block rounded-full border-2 transition-all"
                  style={{
                    width: i === active ? 20 : 12,
                    height: i === active ? 20 : 12,
                    borderColor: i <= active ? C.goldLight : 'rgba(255,255,255,.3)',
                    background: i === active ? C.goldLight : i < active ? C.gold : C.navy,
                    boxShadow: i === active ? `0 0 18px ${C.gold}` : 'none',
                  }}
                />
              </button>
            ))}
          </div>

          {/* En escritorio alcanza con los puntos; la barra deslizable queda solo para pantallas chicas */}
          <input
            type="range"
            min={0}
            max={last}
            step={1}
            value={active}
            onChange={(e) => go(Number(e.target.value))}
            className="laia-range w-full md:hidden"
            aria-label="Recorrer la historia"
            style={{ accentColor: C.goldLight }}
          />
          {/* Etiquetas alineadas con el punto de cada hito */}
          <div className="relative mt-2 h-5 text-xs uppercase tracking-[0.2em] text-white/60">
            <span className="absolute left-0 top-0 whitespace-nowrap">Día 0</span>
            <span
              className="absolute top-0 hidden -translate-x-1/2 whitespace-nowrap sm:block"
              style={{ left: `${(OPENING_INDEX / last) * 100}%`, color: C.goldLight }}
            >
              Día 69 · apertura
            </span>
            <span className="absolute right-0 top-0 whitespace-nowrap">Día 99</span>
          </div>
          {!reduce && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                aria-pressed={!paused}
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                {paused ? 'Reproducir la historia' : 'Pausar'}
              </button>
            </div>
          )}

          {/* Tarjeta del hito activo */}
          <div
            className="mt-8 overflow-hidden rounded-3xl border bg-white/[0.03]"
            style={{ borderColor: m.highlight ? `${C.gold}88` : 'rgba(255,255,255,.1)' }}
            onMouseEnter={() => setPaused(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="grid md:grid-cols-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  className="relative flex h-72 items-center justify-center md:h-96"
                  style={{ background: `radial-gradient(circle at 50% 40%, ${C.surface}, ${C.navy})` }}
                >
                  <img
                    src={m.image}
                    alt={m.title}
                    className={`h-full w-full ${m.fit === 'contain' ? 'object-contain p-8' : 'object-cover'}`}
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl font-extrabold" style={{ color: C.goldLight }}>
                      {m.day}
                    </span>
                    <span className="text-sm uppercase tracking-[0.2em] text-white/65">{m.date}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">{m.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-white/75">{m.text}</p>
                  <div className="mt-8 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => go(active - 1)}
                      disabled={active === 0}
                      className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10 disabled:opacity-30"
                      aria-label="Hito anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(active + 1)}
                      disabled={active === last}
                      className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10 disabled:opacity-30"
                      aria-label="Hito siguiente"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <span className="ml-2 text-sm text-white/60">
                      {active + 1} de {MILESTONES.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Method() {
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (reduce || hover) return undefined;
    const id = setInterval(() => setStep((s) => (s + 1) % METHOD_STEPS.length), 2600);
    return () => clearInterval(id);
  }, [reduce, hover]);

  return (
    <section className="relative py-20" style={{ background: `linear-gradient(180deg, transparent, ${C.surface}55, transparent)` }}>
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Cómo trabajamos con IA"
          eyebrowColor={C.violet}
          title={
            <>
              El fundador decide. <GradientText from={C.cyan} via={C.violet} to={C.goldLight}>La IA construye.</GradientText>
            </>
          }
          subtitle="El fundador definía qué hacer y lo validaba en el local. La IA proponía el plan, lo construía, lo probaba y lo revisaba. Siempre con el mismo ciclo."
        />

        <div
          className="mx-auto grid max-w-5xl gap-4 md:grid-cols-4"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {METHOD_STEPS.map((s, i) => {
            const Icon = s.icon;
            const on = i === step;
            return (
              <button
                key={s.title}
                type="button"
                onClick={() => setStep(i)}
                className="relative rounded-2xl border p-6 text-left transition-colors"
                style={{
                  borderColor: on ? `${C.cyan}aa` : 'rgba(255,255,255,.1)',
                  background: on ? `${C.cyan}14` : 'rgba(255,255,255,.03)',
                }}
                aria-pressed={on}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: on ? C.cyan : 'rgba(255,255,255,.08)', color: on ? C.navy : C.cyan }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-bold text-white/50">0{i + 1}</span>
                </div>
                <div className="mt-4 font-display text-xl font-bold text-white">{s.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
                {on && (
                  <motion.span
                    layoutId="method-bar"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                    style={{ background: C.cyan }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-white/65">
          <Repeat className="h-4 w-4" /> Y vuelta a empezar, en cada mejora.
        </p>

        {/* Equipo de especialistas */}
        <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="grid items-start gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <figure className="mb-6 overflow-hidden rounded-2xl border border-white/10">
                <img src={MEDIA.puesto} alt="El puesto de trabajo donde se construyó LaIA" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                <figcaption className="bg-black/40 px-3 py-2 text-xs text-white/60">
                  Una persona dirigiendo, un equipo de agentes construyendo.
                </figcaption>
              </figure>
              <div className="font-display text-6xl font-extrabold" style={{ color: C.violet }}>
                <CountUp value={15} />
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">agentes especialistas</h3>
              <p className="mt-3 leading-relaxed text-white/65">
                Cada agente se ocupa solo de su área. Así ninguna pieza rompe a otra, y el proyecto guarda
                memoria de lo que se decidió en cada sesión.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {SPECIALISTS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.name}
                    className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-2 py-4 text-center"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.04 * i }}
                    whileHover={{ y: -4, borderColor: `${C.violet}aa` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: C.violet }} />
                    <span className="text-xs font-semibold text-white/80">{s.name}</span>
                  </motion.div>
                );
              })}
              <div className="flex items-center justify-center rounded-xl border border-dashed border-white/15 px-2 py-4 text-center text-xs text-white/60">
                y más…
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [tab, setTab] = useState('todas');
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const items = tab === 'todas' ? GALLERY : GALLERY.filter((g) => g.group === tab);
  const hasMore = items.length > GALLERY_PREVIEW;
  const visible = showAll || !hasMore ? items : items.slice(0, GALLERY_PREVIEW);

  const changeTab = (id) => {
    setTab(id);
    setShowAll(false);
  };

  const toggleAll = () => {
    if (showAll) {
      setShowAll(false);
      sectionRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    } else {
      setShowAll(true);
    }
  };

  const move = useCallback(
    (dir) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );
  const close = useCallback(() => setOpen(null), []);

  return (
    <section ref={sectionRef} className="relative scroll-mt-20 py-20">
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Del código al fierro"
          eyebrowColor={C.gold}
          title={
            <>
              El software también <GradientText>mueve máquinas</GradientText>
            </>
          }
          subtitle="No alcanzaba con programar: había que abrir cada máquina, entender su placa y conectarla al sistema."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filtrar fotos">
          {GALLERY_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => changeTab(t.id)}
              className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
              style={{
                borderColor: tab === t.id ? C.goldLight : 'rgba(255,255,255,.15)',
                background: tab === t.id ? `${C.gold}22` : 'transparent',
                color: tab === t.id ? C.goldLight : 'rgba(255,255,255,.7)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Grilla pareja: todas las fotos con el mismo tamaño; la última fila, si queda corta, va centrada */}
        <motion.div layout className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4">
          <AnimatePresence>
            {visible.map((g, i) => (
              <motion.button
                layout
                key={g.src}
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left sm:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_2rem)/3)]"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                aria-label={`Ampliar: ${g.caption}`}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className={`aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105 ${g.group === 'pantallas' ? 'object-top' : ''}`}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-10">
                  <p className="text-sm font-medium text-white">{g.caption}</p>
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
              style={{ borderColor: `${C.goldLight}88`, color: C.goldLight }}
              aria-expanded={showAll}
            >
              {showAll ? (
                <>
                  Ver menos <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Ver todas las fotos ({items.length}) <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox items={items} index={open} onClose={close} onMove={move} />}
      </AnimatePresence>
    </section>
  );
}

function Failures() {
  const [solved, setSolved] = useState({});

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Lo que falló y cómo se resolvió"
          eyebrowColor="#fb923c"
          title="Nada salió perfecto a la primera"
          subtitle="Tocá cada tarjeta para ver cómo se solucionó. Cada error dejó una regla nueva."
        />
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FAILURES.map((f, i) => {
            const isSolved = !!solved[i];
            return (
              <ScrollReveal key={f.problem} delay={0.06 * i} className="h-full">
                <button
                  type="button"
                  onClick={() => setSolved((s) => ({ ...s, [i]: !s[i] }))}
                  className="relative flex h-full min-h-[220px] w-full flex-col items-stretch justify-start overflow-hidden rounded-2xl border p-6 text-left transition-colors"
                  style={{
                    borderColor: isSolved ? '#34d39988' : '#fb923c55',
                    background: isSolved ? '#34d39910' : '#fb923c0d',
                  }}
                  aria-pressed={isSolved}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {!isSolved ? (
                      <motion.div
                        key="p"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                          Problema {i + 1}
                        </span>
                        <div className="mt-3 font-display text-xl font-bold text-white">{f.problem}</div>
                        <p className="mt-3 text-sm leading-relaxed text-white/70">{f.detail}</p>
                        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-orange-300">
                          Ver la solución <ArrowRight className="h-4 w-4" />
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="s"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                          <CheckCircle2 className="h-4 w-4" /> Resuelto
                        </span>
                        <div className="mt-3 font-display text-xl font-bold text-white">{f.problem}</div>
                        <p className="mt-3 text-sm leading-relaxed text-white/80">{f.fix}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </ScrollReveal>
            );
          })}
          <ScrollReveal delay={0.35} className="h-full">
            <div
              className="flex h-full min-h-[220px] flex-col justify-start rounded-2xl border p-6"
              style={{ borderColor: `${C.gold}55`, background: `${C.gold}0f` }}
            >
              <ShieldCheck className="h-8 w-8" style={{ color: C.goldLight }} />
              <p className="mt-4 font-display text-xl font-bold text-white">La regla que nunca se rompe</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Ninguna máquina arranca sin pago confirmado. Y los asistentes nunca mueven dinero solos:
                proponen, y una persona confirma.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Today() {
  return (
    <section className="relative py-20" style={{ background: `linear-gradient(180deg, transparent, ${C.surface}66)` }}>
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="LaIA hoy"
          title={
            <>
              Abierta las 24 horas, <GradientText>todos los días</GradientText>
            </>
          }
          subtitle="Lo que hoy funciona en el local de Palermo."
        />

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {TODAY_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={f.text} delay={0.04 * i}>
                  <div className="flex h-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${C.cyan}18`, color: C.cyan }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-white/85">{f.text}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="rounded-3xl border p-8" style={{ borderColor: `${C.gold}55`, background: `${C.navy}cc` }}>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: C.goldLight }}>
              <Users className="h-4 w-4" /> El local en septiembre de 2026
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6">
              {STORE_STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl font-extrabold text-white md:text-5xl">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <Moon className="h-5 w-5 flex-shrink-0" style={{ color: C.cyan }} />
              <p className="text-sm text-white/75">
                <strong className="text-white">1 de cada 5 servicios</strong> se usa de noche, cuando un local
                tradicional estaría cerrado.
              </p>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white/60">
              Datos del local, publicados con autorización. El avatar en video del tótem está en pausa desde
              el 21/9; LaIA sigue respondiendo por texto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div
            className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border p-10 text-center md:p-14"
            style={{ borderColor: `${C.cyan}44`, background: `linear-gradient(135deg, ${C.surface}, ${C.navy})` }}
          >
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: `${C.gold}30` }}
              aria-hidden="true"
            />
            <img src={MEDIA.buildBy} alt="Build by ALENIA" className="relative mx-auto h-10 w-auto opacity-90" />
            <h2 className="relative mt-8 font-display text-3xl font-extrabold text-white md:text-5xl">
              ¿Tu negocio es el próximo?
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Lo que hicimos en LaIA lo podemos llevar a tus máquinas: cobros digitales, activación automática,
              accesos con QR y un panel para controlar todo.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/soluciones/hub"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 font-semibold text-slate-950"
                style={{ background: `linear-gradient(90deg, ${C.goldLight}, ${C.cyan})` }}
              >
                Conocer ALENIA HUB <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-3 font-semibold text-white hover:bg-white/10"
              >
                Contanos tu proyecto
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* --------------------------------- Página --------------------------------- */

export default function LaiaHistoria() {
  return (
    <div className="laia-page min-h-screen text-white" style={{ background: C.navy }}>
      <style>{`.laia-page :focus-visible { outline: 2px solid ${C.cyan}; outline-offset: 3px; border-radius: 10px; }`}</style>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}${PAGE_PATH}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}${PAGE_PATH}`} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <Hero />
      <Challenge />
      <Timeline />
      <Method />
      <Gallery />
      <Failures />
      <Today />
      <div className="px-6 py-16">
        <FaqSection items={FAQS.laia} />
      </div>
      <ClosingCTA />
    </div>
  );
}
