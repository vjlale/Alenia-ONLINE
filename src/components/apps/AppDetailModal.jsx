import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  CreditCard,
  Smartphone,
  Check,
  ArrowUpRight,
  ExternalLink,
  Wand2,
  Eraser,
  SlidersHorizontal,
  Layers,
  Package,
  ArrowRight,
  MessagesSquare,
  Mic,
  Wallet,
  Users,
  Truck,
  Move3d,
  Lightbulb,
  Tv,
  Boxes,
  Footprints,
  Radio,
  Video,
} from 'lucide-react';

// Íconos que se pueden referenciar por nombre desde modalContent.features[].icon
const FEATURE_ICONS = {
  Sparkles,
  Wand2,
  Eraser,
  SlidersHorizontal,
  Layers,
  Package,
  CreditCard,
  Smartphone,
  Check,
  MessagesSquare,
  Mic,
  Wallet,
  Users,
  Truck,
  Move3d,
  Lightbulb,
  Tv,
  Boxes,
  Footprints,
  Radio,
  Video,
};

const isInternalPath = (value) => typeof value === 'string' && value.startsWith('/') && !value.startsWith('//');

// Las imágenes de la galería pueden ser strings o { src, fit }
const imageSrc = (image) => (typeof image === 'string' ? image : image?.src);

const pricingLabel = (pricing) =>
  pricing === 'paid' ? 'Premium' : pricing === 'freemium' ? 'Freemium' : pricing === 'free' ? 'Gratis' : null;

/**
 * Modal de detalle de una app del catálogo (reconstruido del sitio publicado).
 * Se monta en document.body con un portal. Cierra con Escape, con el fondo o con la X.
 */
export default function AppDetailModal({ app, isOpen, onClose }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setActiveImage(0);
  }, [isOpen, app?.id]);

  if (typeof document === 'undefined') return null;
  if (!app) return null;

  const {
    name,
    tagline,
    description,
    category,
    pricing,
    priceLabel,
    platforms = [],
    audience = [],
    upcomingPlatforms = [],
    appUrl,
    gallery = [],
    logo,
    accentColor = '#a855f7',
    accentColorSoft = '#6366f1',
    ctaTextColor = '#000000',
    ctaLabel,
    secondaryLink,
    modalContent = {},
  } = app;

  const {
    heroImage,
    backdropImage,
    logoWide,
    priceNote,
    intro,
    features = [],
    useCases = [],
    plans = [],
    planNote,
  } = modalContent;

  const images = (gallery.length > 0 ? gallery : heroImage ? [heroImage] : []).map(imageSrc).filter(Boolean);
  const currentImage = images[activeImage] ?? images[0];
  const priceBadge = priceLabel || pricingLabel(pricing);
  const ctaGradient = `linear-gradient(135deg, ${accentColor} 0%, ${accentColorSoft} 100%)`;
  const accent = accentColor;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="app-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle at 50% 0%, ${accent}25, transparent 55%), rgba(0,0,0,0.85)`,
            }}
          />

          <motion.div
            className="relative z-10 my-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-950 to-black shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Borde con gradiente cónico */}
            <div
              className="pointer-events-none absolute -inset-px rounded-[28px] opacity-60"
              style={{
                background: `conic-gradient(from 90deg at 50% 50%, ${accent}00 0deg, ${accent}66 90deg, ${accentColorSoft}55 180deg, ${accent}66 270deg, ${accent}00 360deg)`,
                WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1px',
              }}
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar modal"
              className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md transition hover:bg-black/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Cabecera */}
            <div className="relative overflow-hidden">
              {backdropImage && (
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `url(${backdropImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${accent}14 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.95) 100%)`,
                }}
              />
              <div
                className="pointer-events-none absolute -top-20 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl opacity-50"
                style={{ background: `radial-gradient(circle, ${accent}55, transparent 70%)` }}
              />

              <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-14 text-center sm:px-12 sm:py-16 lg:px-16 lg:py-20">
                {logoWide && (
                  <h2 id="app-modal-title" className="sr-only">
                    {name}
                  </h2>
                )}
                {logoWide ? (
                  <motion.img
                    src={logoWide}
                    alt={`${name} logo`}
                    className="max-h-32 w-auto object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  />
                ) : (
                  <div className="flex items-center gap-4">
                    {logo && (
                      <img
                        src={logo}
                        alt={`${name} logo`}
                        className="h-16 w-16 rounded-2xl border border-white/15 bg-white/5 p-2"
                      />
                    )}
                    <h2 id="app-modal-title" className="font-display text-5xl font-black tracking-tight text-white">
                      {name}
                    </h2>
                  </div>
                )}

                {tagline && (
                  <motion.p
                    className="max-w-2xl font-display text-xl font-semibold leading-tight sm:text-2xl"
                    style={{ color: accent }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {tagline}
                  </motion.p>
                )}

                <motion.div
                  className="flex flex-wrap items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {category && (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                      style={{ borderColor: `${accent}66`, backgroundColor: `${accent}14`, color: accent }}
                    >
                      <Sparkles className="h-3 w-3" />
                      {category}
                    </span>
                  )}
                  {priceBadge && (
                    <span
                      className={
                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ' +
                        (pricing === 'paid'
                          ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
                          : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300')
                      }
                    >
                      <CreditCard className="h-3 w-3" />
                      {priceBadge}
                    </span>
                  )}
                  {[...platforms, ...upcomingPlatforms.map((p) => `${p} · pronto`)].map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                    >
                      <Smartphone className="h-3 w-3 opacity-60" />
                      {platform}
                    </span>
                  ))}
                  {audience.map((item) => (
                    <span
                      key={`audience-${item}`}
                      className="inline-flex items-center gap-1 rounded-full border bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                      style={{ borderColor: `${accent}44` }}
                    >
                      <Users className="h-3 w-3 opacity-60" />
                      {item}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Cuerpo */}
            <div className="relative px-6 pb-10 pt-2 sm:px-10 lg:px-14">
              {(intro || description) && (
                <motion.p
                  className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-white/75 sm:text-lg"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                >
                  {intro || description}
                </motion.p>
              )}

              {/* Galería */}
              {images.length > 0 && (
                <div className="mb-12">
                  <div
                    className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-3 sm:p-4"
                    style={{
                      minHeight: '320px',
                      maxHeight: '70vh',
                      background: `radial-gradient(circle at 50% 50%, ${accent}10, rgba(0,0,0,0.85) 70%)`,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImage}
                        src={currentImage}
                        alt={`${name} screenshot ${activeImage + 1}`}
                        className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>

                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setActiveImage(index)}
                            aria-label={`Ver captura ${index + 1}`}
                            className="h-1.5 rounded-full transition-all"
                            style={{
                              width: index === activeImage ? 28 : 10,
                              backgroundColor: index === activeImage ? accent : 'rgba(255,255,255,0.35)',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {images.length > 1 && (
                    <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                      {images.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setActiveImage(index)}
                          className={
                            'relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg border bg-black/60 p-1 transition ' +
                            (index === activeImage
                              ? 'border-white/40 opacity-100'
                              : 'border-white/10 opacity-60 hover:opacity-90')
                          }
                          style={{ boxShadow: index === activeImage ? `0 0 0 2px ${accent}55` : 'none' }}
                        >
                          <img src={image} alt="" className="max-h-full max-w-full object-contain" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Funcionalidades */}
              {features.length > 0 && (
                <section className="mb-12">
                  <h3 className="mb-6 text-center font-display text-2xl font-bold text-white sm:text-3xl">
                    ¿Qué hace <span style={{ color: accent }}>{name}</span>?
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                      const Icon = FEATURE_ICONS[feature.icon] ?? Sparkles;
                      return (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.06 * index }}
                          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
                        >
                          <div
                            className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
                            style={{ backgroundColor: accent }}
                          />
                          <div
                            className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border"
                            style={{ borderColor: `${accent}55`, backgroundColor: `${accent}16`, color: accent }}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <h4 className="mb-1.5 font-display text-base font-bold text-white">{feature.title}</h4>
                          <p className="text-sm leading-relaxed text-white/65">{feature.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Casos de uso */}
              {useCases.length > 0 && (
                <section className="mb-12">
                  <h3 className="mb-6 text-center font-display text-2xl font-bold text-white sm:text-3xl">
                    ¿Para quién es?
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {useCases.map((useCase) => (
                      <div
                        key={useCase.title}
                        className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <div
                            className="flex h-6 w-6 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${accent}22`, color: accent }}
                          >
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </div>
                          <h4 className="font-display text-base font-bold text-white">{useCase.title}</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-white/65">{useCase.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Planes y precios */}
              {plans.length > 0 && (
                <section className="mb-12" aria-labelledby="app-modal-plans">
                  <h3 id="app-modal-plans" className="mb-8 text-center font-display text-2xl font-bold text-white sm:text-3xl">
                    Planes y precios
                  </h3>
                  <div
                    className={
                      'mx-auto grid gap-5 ' + (plans.length >= 3 ? 'md:grid-cols-3' : 'max-w-3xl sm:grid-cols-2')
                    }
                  >
                    {plans.map((plan, index) => (
                      <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.08 * index }}
                        className="relative flex flex-col rounded-2xl border p-6"
                        style={
                          plan.highlighted
                            ? {
                                borderColor: `${accent}99`,
                                background: `linear-gradient(180deg, ${accent}1f 0%, rgba(255,255,255,0.02) 100%)`,
                                boxShadow: `0 0 40px ${accent}22`,
                              }
                            : { borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }
                        }
                      >
                        {plan.badge && (
                          <span
                            className="absolute -top-3 left-6 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                            style={{ background: ctaGradient, color: ctaTextColor }}
                          >
                            {plan.badge}
                          </span>
                        )}
                        <h4 className="font-display text-lg font-bold text-white">{plan.name}</h4>
                        <div className="mt-3 flex flex-wrap items-baseline gap-1">
                          <span className="font-display text-3xl font-extrabold text-white">{plan.price}</span>
                          {plan.period && <span className="text-sm text-white/50">{plan.period}</span>}
                        </div>
                        {plan.features?.length > 0 && (
                          <ul className="mt-5 space-y-2.5">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2 text-sm leading-snug text-white/75">
                                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} strokeWidth={3} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  {planNote && <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-white/65">{planNote}</p>}
                </section>
              )}

              {priceNote && (
                <div
                  className="mb-10 rounded-2xl border px-5 py-4 text-center text-sm"
                  style={{
                    borderColor: `${accent}33`,
                    backgroundColor: `${accent}0a`,
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  <CreditCard className="mr-2 inline h-4 w-4" style={{ color: accent }} />
                  {priceNote}
                </div>
              )}

              {appUrl && (
                <div className="flex flex-col items-center gap-3">
                  <motion.a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-transform"
                    style={{
                      background: ctaGradient,
                      color: ctaTextColor,
                      boxShadow: `0 10px 40px ${accent}55, 0 0 80px ${accent}33`,
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {ctaLabel || `Probar ${name}`}
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </motion.a>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <ExternalLink className="h-3 w-3" />
                    Se abre en una pestaña nueva
                  </div>
                  {secondaryLink &&
                    (isInternalPath(secondaryLink.href) ? (
                      <Link
                        to={secondaryLink.href}
                        onClick={onClose}
                        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
                      >
                        {secondaryLink.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <a
                        href={secondaryLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
                      >
                        {secondaryLink.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
