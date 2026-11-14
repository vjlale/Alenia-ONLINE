import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  CreditCard,
  Smartphone,
  Info,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Lock,
  Users,
  Vote,
  Boxes,
  Box,
} from 'lucide-react';
import AppDetailModal from './AppDetailModal';

const isInternalPath = (value) => typeof value === 'string' && value.startsWith('/') && !value.startsWith('//');

const pricingLabel = (pricing) =>
  pricing === 'paid' ? 'Premium' : pricing === 'freemium' ? 'Freemium' : pricing === 'free' ? 'Gratis' : null;

// Íconos de reemplazo para apps sin logo propio
const LOGO_ICONS = { Vote, Boxes, Box };

// Las imágenes de la galería pueden ser strings o { src, fit }
const normalizeImage =(image) => (typeof image === 'string' ? { src: image, fit: 'cover' } : { fit: 'cover', ...image });

/**
 * Tarjeta grande de una app del catálogo (reconstruida del sitio publicado).
 * - Inclinación 3D siguiendo el mouse, brillo y borde cónico en hover.
 * - Mockup de celular ("phone"), póster ("poster") o ventana de navegador ("desktop").
 * - wide: ocupa todo el ancho con la imagen al costado; reverse: la imagen va a la derecha.
 * - Si useModal es true abre AppDetailModal; si no, navega a fanpageUrl/appUrl
 *   (ruta interna con react-router o externa en pestaña nueva).
 */
export default function AppShowcaseCard({ app, index = 0, wide = false, reverse = false }) {
  const {
    name,
    tagline,
    description,
    category,
    status,
    pricing,
    priceLabel,
    platforms = [],
    upcomingPlatforms = [],
    stack = [],
    highlights = [],
    audience = [],
    brandColors = [],
    logo,
    logoIcon,
    screenshot,
    gallery = [],
    companionImage,
    mockupType = 'phone',
    mockupUrl,
    fanpageUrl,
    appUrl,
    url,
    useModal = false,
    modalCtaLabel,
    ctaLabel: customCtaLabel,
    secondaryLink,
    accentColor = '#22d3ee',
    accentColorSoft = '#0e7490',
    ctaTextColor = '#000000',
    featured = false,
  } = app;

  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = (gallery.length > 0 ? gallery : [screenshot].filter(Boolean)).map(normalizeImage);
  const target = fanpageUrl || appUrl || url || null;
  const isInternal = isInternalPath(target);

  // Las destacadas rotan su galería solas
  useEffect(() => {
    if (!featured || images.length <= 1) return undefined;
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [featured, images.length]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 250, damping: 25, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const tilt = wide ? 4 : 7;
  const rotateX = useTransform(springY, [-0.5, 0.5], [`${tilt}deg`, `-${tilt}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`-${tilt}deg`, `${tilt}deg`]);
  const mockupX = useTransform(springX, [-0.5, 0.5], ['14px', '-14px']);
  const mockupY = useTransform(springY, [-0.5, 0.5], ['10px', '-10px']);
  const glowX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, ${accentColor}1a, transparent 40%)`
  );

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleActivate = () => {
    if (useModal) {
      setIsModalOpen(true);
    } else if (target) {
      if (isInternal) navigate(target);
      else window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  const ctaGradient = `linear-gradient(135deg, ${accentColor} 0%, ${accentColorSoft} 100%)`;
  const ctaGlow = `0 0 60px ${accentColor}44, 0 0 120px ${accentColor}22`;
  const priceBadge = priceLabel || pricingLabel(pricing);
  const priceBadgeClass =
    pricing === 'paid'
      ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
      : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300';
  const ariaLabel = useModal
    ? `Ver detalles de ${name}`
    : isInternal
      ? `Ver la página de ${name}`
      : `Abrir ${name} en una pestaña nueva`;
  const ctaLabel = customCtaLabel || (isInternal ? 'Ver la página' : `Visitar ${name}`);
  const ctaHint = isInternal ? 'Abre la página interna' : 'Abre en pestaña nueva';

  // Segundo enlace de las tarjetas con modal: la landing o el sitio de la app
  const directLink = useModal
    ? secondaryLink || (appUrl && customCtaLabel ? { label: customCtaLabel, href: appUrl } : null)
    : null;
  const LogoIcon = LOGO_ICONS[logoIcon] || Box;

  return (
    <>
      <motion.article
        ref={cardRef}
        role="link"
        tabIndex={0}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
          setIsHovered(false);
        }}
        onClick={handleActivate}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleActivate();
          }
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay: 0.12 * index, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
        className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-950 to-black shadow-2xl shadow-black/60 transition-shadow duration-500 hover:shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
        aria-label={ariaLabel}
      >
        {/* Borde cónico en hover */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from 90deg at 50% 50%, ${accentColor}00 0deg, ${accentColor}cc 90deg, ${accentColorSoft}99 180deg, ${accentColor}cc 270deg, ${accentColor}00 360deg)`,
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        />
        {/* Luz que sigue al mouse */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBackground }}
        />
        {/* Barrido de brillo */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div
            className="absolute -inset-full translate-x-[-100%] translate-y-[-100%] rotate-12 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[100%] group-hover:translate-y-[100%] group-hover:opacity-100"
            style={{ width: '200%', height: '200%' }}
          />
        </div>

        <div
          className={
            'relative z-10 flex h-full flex-col ' + (wide ? (reverse ? 'lg:flex-row-reverse' : 'lg:flex-row') : '')
          }
        >
          {/* Columna visual */}
          <div
            className={
              'relative flex items-center justify-center overflow-hidden px-6 pb-12 pt-20 ' +
              (wide ? 'min-h-[380px] lg:min-h-[560px] lg:w-[50%] lg:px-10' : 'min-h-[340px]')
            }
            style={{
              background: `radial-gradient(circle at 50% 30%, ${accentColor}20, transparent 60%), linear-gradient(160deg, ${accentColorSoft}18 0%, transparent 70%)`,
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-60"
              style={{ background: `radial-gradient(circle, ${accentColor}55 0%, transparent 70%)` }}
            />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-white/60"
                  style={{ top: `${15 + 14 * i}%`, left: `${10 + ((17 * i) % 80)}%` }}
                  animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 3 + 0.4 * i, repeat: Infinity, delay: 0.3 * i, ease: 'easeInOut' }}
                />
              ))}
            </div>

            <motion.div
              className={'relative ' + (mockupType === 'desktop' ? 'flex w-full justify-center' : '')}
              style={{ x: mockupX, y: mockupY, transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
            >
              {mockupType === 'desktop' ? (
                <DesktopMockup
                  images={images}
                  activeImage={activeImage}
                  setActiveImage={setActiveImage}
                  accentColor={accentColor}
                  name={name}
                  url={mockupUrl}
                  companionImage={companionImage}
                  wide={wide}
                />
              ) : mockupType === 'poster' ? (
                <PosterMockup
                  images={images}
                  activeImage={activeImage}
                  setActiveImage={setActiveImage}
                  accentColor={accentColor}
                  name={name}
                />
              ) : (
                <PhoneMockup
                  images={images}
                  activeImage={activeImage}
                  setActiveImage={setActiveImage}
                  accentColor={accentColor}
                  name={name}
                />
              )}
            </motion.div>

            {(status || priceBadge) && (
              <div className="absolute inset-x-4 top-4 flex flex-wrap items-start justify-between gap-2 sm:inset-x-5 sm:top-5">
                {status ? (
                  <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
                    </span>
                    {status}
                  </div>
                ) : (
                  <span />
                )}
                {priceBadge && (
                  <div
                    className={`ml-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold tracking-wide backdrop-blur-md ${priceBadgeClass}`}
                  >
                    <CreditCard className="h-3 w-3" />
                    {priceBadge}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Columna de texto */}
          <div className={'relative flex flex-1 flex-col gap-6 p-6 sm:p-8 ' + (wide ? 'lg:p-12' : '')}>
            <header className="flex flex-wrap items-center gap-4">
              <motion.div
                className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 p-2 backdrop-blur-sm"
                style={{ backgroundColor: logo ? 'rgba(255,255,255,0.05)' : `${accentColor}1a`, color: accentColor }}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.6 }}
              >
                {logo ? (
                  <img src={logo} alt={`Logo de ${name}`} className="h-full w-full object-contain" loading="lazy" />
                ) : (
                  <LogoIcon className="h-7 w-7" aria-hidden="true" />
                )}
              </motion.div>
              <div className="flex flex-wrap items-center gap-2">
                {category && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{ borderColor: `${accentColor}66`, backgroundColor: `${accentColor}14`, color: accentColor }}
                  >
                    <Sparkles className="h-3 w-3" />
                    {category}
                  </span>
                )}
                {featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Destacada
                  </span>
                )}
              </div>
            </header>

            <div className="space-y-2">
              <h2
                className={
                  'font-display font-extrabold tracking-tight text-white ' + (wide ? 'text-4xl lg:text-5xl' : 'text-3xl')
                }
              >
                {name}
              </h2>
              {tagline && (
                <p className={'font-medium ' + (wide ? 'text-lg' : 'text-base')} style={{ color: accentColor }}>
                  {tagline}
                </p>
              )}
            </div>

            <p className="text-base leading-relaxed text-white/70">{description}</p>

            {highlights.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {highlights.map((highlight, i) => (
                  <motion.li
                    key={highlight}
                    initial={{ opacity: 0.7, y: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? -2 : 0 }}
                    transition={{ delay: isHovered ? 0.05 * i : 0, duration: 0.3 }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                  >
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(platforms.length > 0 || upcomingPlatforms.length > 0) && (
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    <Smartphone className="h-3 w-3" />
                    Plataformas
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {platforms.map((platform) => (
                      <span key={platform} className="rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/80">
                        {platform}
                      </span>
                    ))}
                    {upcomingPlatforms.map((platform) => (
                      <span
                        key={`soon-${platform}`}
                        className="inline-flex items-center gap-1 rounded-md border border-dashed border-white/15 bg-transparent px-2 py-1 text-xs font-medium text-white/50"
                        title="Próximamente"
                      >
                        {platform}
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-alenia-primary">pronto</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {audience.length > 0 && (
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    <Users className="h-3 w-3" />
                    Ideal para
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {audience.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border px-2 py-1 text-xs font-medium"
                        style={{ borderColor: `${accentColor}44`, color: 'rgba(255,255,255,0.85)' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {brandColors.length > 0 && (
                <div>
                  <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Paleta de marca</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    {brandColors.map((color) => (
                      <span key={color.hex} className="inline-flex items-center gap-1.5 text-xs text-white/70">
                        <span
                          className="h-4 w-4 rounded-full border border-white/20"
                          style={{ backgroundColor: color.hex }}
                          aria-hidden="true"
                        />
                        {color.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {stack.length > 0 && (
                <div>
                  <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.map((tech) => (
                      <span key={tech} className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {useModal ? (
              <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
                <motion.button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-transform"
                  style={{ background: ctaGradient, color: ctaTextColor, boxShadow: isHovered ? ctaGlow : 'none' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Info className="h-5 w-5" />
                  {modalCtaLabel || 'Ver detalles'}
                </motion.button>
                {directLink && <SecondaryLink link={directLink} accentColor={accentColor} />}
              </div>
            ) : (
              <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                {isInternal ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-flex' }}>
                    <Link
                      to={target ?? '#'}
                      onClick={(event) => event.stopPropagation()}
                      className="group/cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform"
                      style={{ background: ctaGradient, color: ctaTextColor, boxShadow: isHovered ? ctaGlow : 'none' }}
                    >
                      {ctaLabel}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    href={target ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="group/cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform"
                    style={{ background: ctaGradient, color: ctaTextColor, boxShadow: isHovered ? ctaGlow : 'none' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {ctaLabel}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </motion.a>
                )}
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  {isInternal ? <ArrowRight className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
                  <span className="hidden sm:inline">{ctaHint}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.article>

      {useModal && <AppDetailModal app={app} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

// Enlace secundario con borde (landing interna o sitio externo en pestaña nueva)
function SecondaryLink({ link, accentColor }) {
  const internal = isInternalPath(link.href);
  const className =
    'inline-flex items-center justify-center gap-2 rounded-full border bg-white/[0.03] px-6 py-4 text-sm font-semibold text-white/90 transition-colors hover:bg-white/[0.08]';
  const style = { borderColor: `${accentColor}66` };
  const stop = (event) => event.stopPropagation();
  return internal ? (
    <Link to={link.href} onClick={stop} className={className} style={style}>
      {link.label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  ) : (
    <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={stop} className={className} style={style}>
      {link.label}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

function GalleryDots({ images, activeImage, setActiveImage, accentColor, labelPrefix }) {
  if (images.length <= 1) return null;
  return (
    <div className="mt-5 flex items-center justify-center gap-1">
      {images.map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setActiveImage(i);
          }}
          aria-label={`${labelPrefix} ${i + 1}`}
          aria-current={i === activeImage ? 'true' : undefined}
          className="flex items-center justify-center p-1.5"
        >
          <span
            className="block h-1.5 rounded-full transition-all"
            style={{
              width: i === activeImage ? 24 : 8,
              backgroundColor: i === activeImage ? accentColor : 'rgba(255,255,255,0.3)',
            }}
          />
        </button>
      ))}
    </div>
  );
}

function SlideImage({ image, alt, className = '' }) {
  return (
    <motion.img
      key={image.src}
      src={image.src}
      alt={alt}
      className={`absolute inset-0 h-full w-full ${image.fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      loading="lazy"
    />
  );
}

// Mockup de celular (Match Padel)
function PhoneMockup({ images, activeImage, setActiveImage, accentColor, name }) {
  const current = images[activeImage] || images[0];
  return (
    <div className="relative">
      <div
        className="relative rounded-[2.4rem] border-[3px] border-white/15 bg-gradient-to-b from-slate-800 to-slate-950 p-[6px] shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        style={{ width: 240, height: 480 }}
      >
        <div className="absolute left-1/2 top-[14px] z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
          <AnimatePresence mode="wait">
            {current && <SlideImage image={current} alt={`Captura de ${name}`} className="object-top" />}
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
        <div className="pointer-events-none absolute inset-y-10 -left-[3px] w-[3px] rounded-l bg-white/20" />
        <div className="pointer-events-none absolute inset-y-10 -right-[3px] w-[3px] rounded-r bg-white/20" />
      </div>
      <GalleryDots
        images={images}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
        accentColor={accentColor}
        labelPrefix="Ver captura"
      />
    </div>
  );
}

// Cuadro tipo póster con esquinas y línea de escaneo (E-pix, i-Streem)
function PosterMockup({ images, activeImage, setActiveImage, accentColor, name }) {
  const current = images[activeImage] || images[0];
  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-[22px] border border-white/15 bg-black"
        style={{
          width: 'min(360px, 72vw)',
          aspectRatio: '1 / 1',
          boxShadow: `0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accentColor}33, 0 0 60px ${accentColor}33`,
        }}
      >
        <AnimatePresence mode="wait">{current && <SlideImage image={current} alt={`Vista de ${name}`} />}</AnimatePresence>
        <CornerAccent position="tl" color={accentColor} />
        <CornerAccent position="tr" color={accentColor} />
        <CornerAccent position="bl" color={accentColor} />
        <CornerAccent position="br" color={accentColor} />
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-[2px] opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            boxShadow: `0 0 10px ${accentColor}`,
          }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      <GalleryDots
        images={images}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
        accentColor={accentColor}
        labelPrefix="Ver captura"
      />
    </div>
  );
}

// Ventana de navegador con barra y dirección (Kontrol Pro, LiveVote, StageLab).
// companionImage suma un celular chico superpuesto (por ejemplo, la vista del público).
function DesktopMockup({ images, activeImage, setActiveImage, accentColor, name, url, companionImage, wide }) {
  const current = images[activeImage] || images[0];
  return (
    <div className={'relative w-full ' + (wide ? 'max-w-[580px]' : 'max-w-[480px]')}>
      <div
        className="relative overflow-hidden rounded-xl border border-white/15 bg-slate-950"
        style={{ boxShadow: `0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accentColor}26, 0 0 70px ${accentColor}2b` }}
      >
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-3 py-2">
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          {url && (
            <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 truncate rounded-md bg-black/40 px-3 py-1 text-[11px] text-white/55">
              <Lock className="h-3 w-3 shrink-0" style={{ color: accentColor }} aria-hidden="true" />
              <span className="truncate">{url}</span>
            </div>
          )}
          <div className="hidden w-[42px] shrink-0 sm:block" aria-hidden="true" />
        </div>
        <div className="relative aspect-video bg-black">
          <AnimatePresence mode="wait">{current && <SlideImage image={current} alt={`Captura de ${name}`} />}</AnimatePresence>
        </div>
      </div>

      {companionImage && (
        <div
          className="absolute -bottom-6 -right-2 overflow-hidden rounded-[1.1rem] border-[3px] border-white/15 bg-black sm:-right-6"
          style={{ width: wide ? 104 : 88, aspectRatio: '780 / 1688', boxShadow: `0 20px 50px rgba(0,0,0,0.7), 0 0 30px ${accentColor}33` }}
        >
          <img src={companionImage} alt={`${name} en el celular`} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}

      <GalleryDots
        images={images}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
        accentColor={accentColor}
        labelPrefix="Ver captura"
      />
    </div>
  );
}

function CornerAccent({ position, color }) {
  const border = `2px solid ${color}`;
  const styles = {
    tl: { top: 10, left: 10, borderTop: border, borderLeft: border },
    tr: { top: 10, right: 10, borderTop: border, borderRight: border },
    bl: { bottom: 10, left: 10, borderBottom: border, borderLeft: border },
    br: { bottom: 10, right: 10, borderBottom: border, borderRight: border },
  };
  return <div className="absolute h-5 w-5 pointer-events-none" style={styles[position]} />;
}
