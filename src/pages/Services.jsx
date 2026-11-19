import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Cpu,
  CreditCard,
  DoorOpen,
  LayoutDashboard,
  Smartphone,
  Bot,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
import { soluciones } from '../data/solucionesData';
import ServiceFormModal from '../components/forms/ServiceFormModal';
import ScrollReveal from '../components/common/ScrollReveal';
import AnimatedGradient from '../components/common/AnimatedGradient';
import { OG_IMAGE } from '../config/brand';

const SEO_TITLE = 'Soluciones | ALENIA - Automatización de máquinas, apps y webs';
const SEO_DESCRIPTION =
  'Conectamos tus máquinas con pagos, apps y un panel de control: activación automática, cobros digitales, accesos con QR y gestión en tiempo real. También desarrollamos apps, software y webs a medida.';

// Módulos del producto principal (ALENIA HUB)
const hubModules = [
  { icon: Cpu, title: 'Activación de máquinas', text: 'El cliente paga o escanea un QR y la máquina arranca sola.' },
  { icon: CreditCard, title: 'Cobros e ingresos', text: 'Mercado Pago, saldo y crédito, sin efectivo ni fichas.' },
  { icon: DoorOpen, title: 'Control de accesos', text: 'Puertas y cerraduras que abren con QR.' },
  { icon: LayoutDashboard, title: 'Panel en tiempo real', text: 'Estado de cada equipo, ventas, caja y alertas.' },
  { icon: Smartphone, title: 'App y tótem con tu marca', text: 'Autoservicio desde el celular o una pantalla táctil.' },
  { icon: Bot, title: 'Asistente IA de soporte', text: 'Atiende a tus clientes las 24 horas.' },
];

const rubros = ['Lavanderías self-service', 'Máquinas vending', 'Accesos y gimnasios', 'Lavaderos y cocheras', 'Locales sin personal'];

// Productos propios de ALENIA
const productos = [
  { name: 'Kontrol Pro', text: 'Gestión con asistente de IA por WhatsApp.', to: 'https://kontrolpro.app/' },
  { name: 'Match Padel', text: 'App para jugadores y clubes de pádel.', to: '/play-padel' },
  { name: 'i-Streem', text: 'Streaming en vivo del iPhone a cualquier PC.', to: '/apps/i-streem' },
];

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const automatizacion = soluciones.find((s) => s.categoria === 'automatizacion');

  const handleServiceFormSubmit = (formData) => {
    console.log('Formulario de servicio enviado:', formData);
  };

  const openServiceForm = (servicio) => {
    setSelectedService(servicio);
    setIsFormModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-alenia-dark to-slate-900 py-20">
      <Helmet>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESCRIPTION} />
        <link rel="canonical" href="https://aleniahub.com/soluciones" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aleniahub.com/soluciones" />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aleniahub.com/soluciones" />
        <meta property="twitter:title" content={SEO_TITLE} />
        <meta property="twitter:description" content={SEO_DESCRIPTION} />
        <meta property="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-semibold text-green-300 bg-green-500/10 ring-1 ring-green-400/30">
              De la máquina al negocio conectado
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6">
              <AnimatedGradient
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(-45deg, #00ff88 0%, #22d3ee 35%, #a78bfa 70%, #ff4d8d 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                Nuestras Soluciones
              </AnimatedGradient>
            </h1>
            <p className="text-xl text-alenia-light/80 max-w-3xl mx-auto leading-relaxed">
              Unimos hardware y software para que tu negocio funcione solo: máquinas que se activan
              al pagar, cobros digitales, accesos con QR y un panel para controlar todo. Y además
              desarrollamos las apps, programas y webs que tu operación necesita.
            </p>
          </div>
        </ScrollReveal>

        {/* Producto principal: ALENIA HUB */}
        <ScrollReveal direction="up" delay={0.3}>
          <section
            aria-labelledby="hub-heading"
            className="relative mb-20 rounded-3xl border-2 border-green-400/60 bg-slate-900/70 p-8 md:p-12 overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.15)]"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-green-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-green-300">
                  Producto principal
                </span>
                <h2 id="hub-heading" className="mt-2 text-3xl md:text-4xl font-bold text-white">
                  ALENIA HUB
                </h2>
                <p className="mt-2 text-lg font-semibold text-green-300">
                  Tu máquina. Tu marca. Tu experiencia de venta.
                </p>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  Conectamos tus equipos físicos con pagos, app, tótem y un panel de control. El
                  cliente paga desde el celular, la máquina arranca sola y vos ves todo en tiempo real,
                  desde donde estés.
                </p>

                <div className="mt-6 rounded-xl border border-cyan-400/30 bg-cyan-500/5 p-4">
                  <p className="text-sm text-cyan-200 font-semibold">Caso real: LaIA</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Lavandería self-service que funciona 24/7 sin personal: lavadoras y secadoras
                    conectadas, vending integrado, pago con Mercado Pago, puerta con QR, tótem, app y
                    panel de administración.
                  </p>
                  <a
                    href="https://applaia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200"
                  >
                    Conocé LaIA <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {rubros.map((rubro) => (
                    <span key={rubro} className="px-3 py-1 rounded-full text-xs text-gray-300 bg-slate-800 border border-slate-700">
                      {rubro}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/soluciones/hub"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    Conocer ALENIA HUB
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  {automatizacion && (
                    <button
                      type="button"
                      onClick={() => openServiceForm(automatizacion)}
                      className="inline-flex items-center justify-center gap-2 border border-green-400/60 text-green-200 hover:bg-green-500/10 px-6 py-3 rounded-xl font-semibold transition-all"
                    >
                      Contanos qué máquinas tenés
                    </button>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {hubModules.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-xl bg-slate-800/70 border border-slate-700 p-5 hover:border-green-400/50 transition-colors">
                    <Icon className="w-7 h-7 text-green-400 mb-3" />
                    <h3 className="text-lg text-white font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{text}</p>
                  </div>
                ))}
                <p className="sm:col-span-2 text-xs text-gray-500">
                  Evaluamos cada equipo: la compatibilidad depende de la marca, el modelo y el controlador.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Servicios */}
        <ScrollReveal direction="up" delay={0.2}>
          <h2 id="servicios-heading" className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
            Qué hacemos
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {soluciones.map((solucion, index) => (
            <ServiceCard key={solucion.id} servicio={solucion} index={index} onOpenForm={openServiceForm} />
          ))}
        </div>

        {/* Productos propios */}
        <ScrollReveal direction="up" delay={0.2}>
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">Productos propios</h2>
            <p className="text-center text-gray-400 mb-8">Software que hicimos y usamos todos los días.</p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {productos.map((producto) => {
                const isExternal = producto.to.startsWith('http');
                const ProductLink = isExternal ? 'a' : Link;
                const linkProps = isExternal
                  ? { href: producto.to, target: '_blank', rel: 'noopener noreferrer' }
                  : { to: producto.to };
                return (
                <ProductLink
                  key={producto.name}
                  {...linkProps}
                  className="group rounded-xl bg-slate-800/60 border border-slate-700 hover:border-cyan-400/60 p-5 transition-colors"
                >
                  <h3 className="text-lg text-white font-semibold flex items-center justify-between">
                    {producto.name}
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">{producto.text}</p>
                </ProductLink>
                );
              })}
            </div>
            <div className="text-center mt-6">
              <Link to="/apps" className="text-cyan-300 hover:text-cyan-200 text-sm font-medium">
                Ver catálogo de apps →
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* Llamado final */}
        <ScrollReveal delay={0.4} direction="up">
          <div className="text-center mt-20">
            <div className="glass-advanced bg-gradient-to-r from-alenia-primary/10 to-alenia-secondary/10 rounded-2xl p-8 md:p-12 border border-alenia-primary/30 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-animated opacity-5 pointer-events-none" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
                ¿Tenés máquinas que querés conectar?
              </h3>
              <p className="text-alenia-light/70 mb-8 text-lg relative z-10">
                Contanos marca y modelo, cuántos equipos operás y qué querés lograr. Evaluamos tus
                equipos y te proponemos un alcance.
              </p>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} className="relative z-10">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-alenia-primary to-alenia-secondary text-alenia-dark px-8 py-4 rounded-xl font-semibold glow-btn transition-all duration-300 group"
                >
                  Hablar con ALENIA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ServiceFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        servicio={selectedService}
        onSubmit={handleServiceFormSubmit}
      />
    </div>
  );
}

const cardStyles = {
  green: {
    border: 'border-green-400',
    glow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]',
    iconColor: 'text-green-400',
    subtitleColor: 'text-green-300',
    button: 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black',
  },
  blue: {
    border: 'border-cyan-400',
    glow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
    iconColor: 'text-cyan-400',
    subtitleColor: 'text-cyan-300',
    button: 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black',
  },
  orange: {
    border: 'border-orange-400',
    glow: 'hover:shadow-[0_0_30px_rgba(251,146,60,0.4)]',
    iconColor: 'text-orange-400',
    subtitleColor: 'text-orange-300',
    button: 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black',
  },
};

function ServiceCard({ servicio, index, onOpenForm }) {
  const IconComponent = servicio.icon;
  const cardRef = useRef(null);
  const styles = cardStyles[servicio.color] || cardStyles.blue;

  // Efecto 3D al mover el mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ScrollReveal delay={index * 0.1} direction="up" className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
        className={`relative h-full glass-card-hover border-2 ${styles.border} ${styles.glow} rounded-2xl p-6 transition-all duration-300 group cursor-pointer card-hover-lift overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-animated opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-center mb-6">
            <div className={`w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center border ${styles.border}`}>
              <IconComponent className={`w-8 h-8 ${styles.iconColor}`} />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white text-center mb-2">{servicio.nombre}</h3>
          <p className={`text-lg font-semibold ${styles.subtitleColor} text-center mb-4`}>{servicio.subtitulo}</p>
          <p className="text-gray-300 text-center mb-6 leading-relaxed">{servicio.descripcion}</p>

          <div className="mb-8">
            <h4 className="text-white font-semibold mb-4 text-sm">Incluye:</h4>
            <div className="space-y-3">
              {servicio.incluye.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alto fijo del bloque de botones: así "Solicitar información" queda a la misma altura en todas las tarjetas */}
          <div className="space-y-3 mt-auto min-h-[8.5rem]">
            <button
              type="button"
              onClick={() => onOpenForm(servicio)}
              className={`w-full ${styles.button} py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group/btn`}
            >
              Solicitar información
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>

            {servicio.niveles && (
              <Link
                to={`/soluciones/${servicio.categoria}`}
                className="w-full border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                Ver planes
              </Link>
            )}

            {servicio.link && (
              <Link
                to={servicio.link}
                className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors block"
              >
                {servicio.linkLabel || 'Ver más'} →
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default Services;
