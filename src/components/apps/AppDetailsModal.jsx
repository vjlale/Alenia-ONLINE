import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  Sparkles,
  Wand2,
  Eraser,
  SlidersHorizontal,
  Layers,
  Package,
  CreditCard,
  Smartphone,
  Check,
  ExternalLink,
} from 'lucide-react';

/**
 * AppDetailsModal
 *
 * Modal full-screen que muestra el detalle de una app cuando ésta no tiene
 * fanpage propia. Contenido construido a partir de `app.modalContent` +
 * campos base de la app.
 *
 *  - Backdrop con blur y gradiente del accentColor.
 *  - Hero banner con backdrop image + logo wide + tagline + badges.
 *  - Galería de screenshots con selector activo.
 *  - Grid de features con iconos.
 *  - Sección de casos de uso.
 *  - CTA final a la app real.
 *  - Cerrar con X, tecla Escape, o click en backdrop.
 */

const ICON_MAP = {
  Sparkles,
  Wand2,
  Eraser,
  SlidersHorizontal,
  Layers,
  Package,
  CreditCard,
  Smartphone,
  Check,
};

export default function AppDetailsModal({ app, isOpen, onClose }) {
  const [activeShot, setActiveShot] = useState(0);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setActiveShot(0);
  }, [isOpen, app?.id]);

  if (typeof document === 'undefined') return null;
  if (!app) return null;

  const {
    name,
    tagline,
    description,
    category,
    pricing,
    platforms = [],
    upcomingPlatforms = [],
    appUrl,
    gallery = [],
    logo,
    accentColor = '#a855f7',
    accentColorSoft = '#6366f1',
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
  } = modalContent;

  const shots = gallery.length > 0 ? gallery : heroImage ? [heroImage] : [];
  const currentShot = shots[activeShot] ?? shots[0];

  const pricingLabel =
    pricing === 'paid'
      ? 'Premium'
      : pricing === 'freemium'
        ? 'Freemium'
        : pricing === 'free'
          ? 'Gratis'
          : null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="app-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-2 sm:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle at 50% 0%, ${accentColor}25, transparent 55%), rgba(0,0,0,0.85)`,
            }}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 my-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-950 to-black shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Borde luminoso sutil */}
            <div
              className="pointer-events-none absolute -inset-px rounded-[28px] opacity-60"
              style={{
                background: `conic-gradient(from 90deg at 50% 50%, ${accentColor}00 0deg, ${accentColor}66 90deg, ${accentColorSoft}55 180deg, ${accentColor}66 270deg, ${accentColor}00 360deg)`,
                WebkitMask:
                  'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1px',
              }}
            />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar modal"
              className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md transition hover:bg-black/80 hover:text-white sm:right-5 sm:top-5 sm:h-10 sm:w-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* ========== HERO BANNER ========== */}
            <div className="relative overflow-hidden">
              {/* Backdrop image */}
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
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${accentColor}14 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.95) 100%)`,
                }}
              />
              {/* Glow decorativo */}
              <div
                className="pointer-events-none absolute -top-20 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl opacity-50"
                style={{
                  background: `radial-gradient(circle, ${accentColor}55, transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex flex-col items-center gap-4 px-5 pb-10 pt-12 text-center sm:gap-6 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
                {/* Logo wide o logo + nombre */}
                {logoWide ? (
                  <motion.img
                    src={logoWide}
                    alt={`${name} logo`}
                    className="max-h-20 w-auto max-w-full object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] sm:max-h-28 lg:max-h-32"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  />
                ) : (
                  <div className="flex items-center gap-3 sm:gap-4">
                    {logo && (
                      <img
                        src={logo}
                        alt={`${name} logo`}
                        className="h-12 w-12 rounded-2xl border border-white/15 bg-white/5 p-2 sm:h-16 sm:w-16"
                      />
                    )}
                    <h2
                      id="app-modal-title"
                      className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl"
                    >
                      {name}
                    </h2>
                  </div>
                )}

                {/* Tagline */}
                {tagline && (
                  <motion.p
                    className="max-w-2xl font-display text-base font-semibold leading-tight sm:text-xl md:text-2xl"
                    style={{ color: accentColor }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {tagline}
                  </motion.p>
                )}

                {/* Badges */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {category && (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider sm:px-3 sm:text-xs"
                      style={{
                        borderColor: `${accentColor}66`,
                        backgroundColor: `${accentColor}14`,
                        color: accentColor,
                      }}
                    >
                      <Sparkles className="h-3 w-3" />
                      {category}
                    </span>
                  )}
                  {pricingLabel && (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider sm:px-3 sm:text-xs ${
                        pricing === 'paid'
                          ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
                          : pricing === 'freemium'
                            ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                            : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                      }`}
                    >
                      <CreditCard className="h-3 w-3" />
                      {pricingLabel}
                    </span>
                  )}
                  {[...platforms, ...upcomingPlatforms.map((p) => `${p} · pronto`)].map(
                    (p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/80 sm:px-3 sm:text-xs"
                      >
                        <Smartphone className="h-3 w-3 opacity-60" />
                        {p}
                      </span>
                    ),
                  )}
                </motion.div>
              </div>
            </div>

            {/* ========== BODY ========== */}
            <div className="relative px-4 pb-8 pt-2 sm:px-10 sm:pb-10 lg:px-14">
              {/* Intro text */}
              {(intro || description) && (
                <motion.p
                  className="mx-auto mb-8 max-w-3xl text-center text-sm leading-relaxed text-white/75 sm:mb-10 sm:text-base md:text-lg"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                >
                  {intro || description}
                </motion.p>
              )}

              {/* Gallery con selector */}
              {shots.length > 0 && (
                <div className="mb-8 sm:mb-12">
                  <div
                    className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-2 sm:p-4"
                    style={{
                      minHeight: '220px',
                      maxHeight: '70vh',
                      background: `radial-gradient(circle at 50% 50%, ${accentColor}10, rgba(0,0,0,0.85) 70%)`,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentShot}
                        src={currentShot}
                        alt={`${name} screenshot ${activeShot + 1}`}
                        className="max-h-[55vh] w-auto max-w-full rounded-lg object-contain sm:max-h-[65vh]"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>
                    {/* Dots */}
                    {shots.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md">
                        {shots.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setActiveShot(i)}
                            aria-label={`Ver captura ${i + 1}`}
                            className="h-1.5 rounded-full transition-all"
                            style={{
                              width: i === activeShot ? 28 : 10,
                              backgroundColor:
                                i === activeShot
                                  ? accentColor
                                  : 'rgba(255,255,255,0.35)',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {shots.length > 1 && (
                    <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                      {shots.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActiveShot(i)}
                          className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg border bg-black/60 p-1 transition ${
                            i === activeShot
                              ? 'border-white/40 opacity-100'
                              : 'border-white/10 opacity-60 hover:opacity-90'
                          }`}
                          style={{
                            boxShadow:
                              i === activeShot
                                ? `0 0 0 2px ${accentColor}55`
                                : 'none',
                          }}
                        >
                          <img
                            src={src}
                            alt=""
                            className="max-h-full max-w-full object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Features grid */}
              {features.length > 0 && (
                <section className="mb-8 sm:mb-12">
                  <h3 className="mb-5 text-center font-display text-xl font-bold text-white sm:mb-6 sm:text-2xl md:text-3xl">
                    ¿Qué hace{' '}
                    <span style={{ color: accentColor }}>{name}</span>?
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((f, i) => {
                      const Icon = ICON_MAP[f.icon] ?? Sparkles;
                      return (
                        <motion.div
                          key={f.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.06 }}
                          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
                        >
                          <div
                            className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
                            style={{ backgroundColor: accentColor }}
                          />
                          <div
                            className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border"
                            style={{
                              borderColor: `${accentColor}55`,
                              backgroundColor: `${accentColor}16`,
                              color: accentColor,
                            }}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <h4 className="mb-1.5 font-display text-base font-bold text-white">
                            {f.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-white/65">
                            {f.description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Use cases */}
              {useCases.length > 0 && (
                <section className="mb-8 sm:mb-12">
                  <h3 className="mb-5 text-center font-display text-xl font-bold text-white sm:mb-6 sm:text-2xl md:text-3xl">
                    ¿Para quién es?
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                    {useCases.map((u) => (
                      <div
                        key={u.title}
                        className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <div
                            className="flex h-6 w-6 items-center justify-center rounded-full"
                            style={{
                              backgroundColor: `${accentColor}22`,
                              color: accentColor,
                            }}
                          >
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </div>
                          <h4 className="font-display text-base font-bold text-white">
                            {u.title}
                          </h4>
                        </div>
                        <p className="text-sm leading-relaxed text-white/65">
                          {u.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Price note */}
              {priceNote && (
                <div
                  className="mb-8 rounded-2xl border px-4 py-3 text-center text-xs sm:mb-10 sm:px-5 sm:py-4 sm:text-sm"
                  style={{
                    borderColor: `${accentColor}33`,
                    backgroundColor: `${accentColor}0a`,
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  <CreditCard
                    className="mr-2 inline h-4 w-4"
                    style={{ color: accentColor }}
                  />
                  {priceNote}
                </div>
              )}

              {/* CTA */}
              {appUrl && (
                <div className="flex flex-col items-center gap-3">
                  <motion.a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-transform sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColorSoft} 100%)`,
                      boxShadow: `0 10px 40px ${accentColor}55, 0 0 80px ${accentColor}33`,
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Probar {name}
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </motion.a>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <ExternalLink className="h-3 w-3" />
                    Abre {appUrl.replace(/^https?:\/\//, '')} en pestaña nueva
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
