import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, Smartphone } from 'lucide-react';

/**
 * StartupAppCard
 *
 * Tarjeta interactiva de vanguardia para las apps de la startup.
 *  - Tilt 3D con seguimiento del cursor (spring-damped).
 *  - Parallax inverso del screenshot dentro de un mockup de teléfono.
 *  - Borde con gradiente conic animado visible en hover.
 *  - Shine sweep diagonal al entrar en hover.
 *  - Rotación automática de la galería (si se provee `gallery`).
 *  - Variantes: `featured` (horizontal, col-span-full) y regular (vertical compacta).
 *
 * Toda la tarjeta es navegable (click => abre `app.url` en pestaña nueva).
 */
export default function StartupAppCard({ app, index = 0 }) {
  const {
    name,
    tagline,
    description,
    category,
    status,
    platforms = [],
    upcomingPlatforms = [],
    stack = [],
    highlights = [],
    logo,
    screenshot,
    gallery = [],
    url,
    accentColor = '#22d3ee',
    accentColorSoft = '#0e7490',
    featured = false,
  } = app;

  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const images = gallery.length > 0 ? gallery : [screenshot].filter(Boolean);

  // Rotación automática de la galería (solo en featured y con >1 imagen).
  useEffect(() => {
    if (!featured || images.length <= 1) return undefined;
    const id = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 3200);
    return () => clearInterval(id);
  }, [featured, images.length]);

  // Motion values para el tilt 3D y el parallax del screenshot.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { stiffness: 250, damping: 25, mass: 0.6 };
  const mxSpring = useSpring(mx, springConfig);
  const mySpring = useSpring(my, springConfig);

  const rotateX = useTransform(mySpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mxSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const parallaxX = useTransform(mxSpring, [-0.5, 0.5], ['14px', '-14px']);
  const parallaxY = useTransform(mySpring, [-0.5, 0.5], ['10px', '-10px']);

  const glareX = useTransform(mxSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mySpring, [-0.5, 0.5], ['0%', '100%']);

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x} ${y}, ${accentColor}1a, transparent 40%)`,
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const accentBorder = `linear-gradient(135deg, ${accentColor} 0%, ${accentColorSoft} 100%)`;
  const accentGlow = `0 0 60px ${accentColor}44, 0 0 120px ${accentColor}22`;

  return (
    <motion.article
      ref={cardRef}
      role="link"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-950 to-black shadow-2xl shadow-black/60 transition-shadow duration-500 hover:shadow-[0_30px_100px_rgba(0,0,0,0.5)] ${
        featured ? 'lg:col-span-2' : ''
      }`}
      aria-label={`Abrir fanpage de ${name}`}
    >
      {/* Borde con gradiente cónico (visible en hover) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, ${accentColor}00 0deg, ${accentColor}cc 90deg, ${accentColorSoft}99 180deg, ${accentColor}cc 270deg, ${accentColor}00 360deg)`,
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      {/* Glow ambiente siguiendo al cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glareBackground }}
      />

      {/* Shine sweep diagonal */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div
          className="absolute -inset-full translate-x-[-100%] translate-y-[-100%] rotate-12 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[100%] group-hover:translate-y-[100%] group-hover:opacity-100"
          style={{ width: '200%', height: '200%' }}
        />
      </div>

      {/* Layout: featured (horizontal) vs regular (vertical) */}
      <div
        className={`relative z-10 flex ${
          featured ? 'flex-col lg:flex-row' : 'flex-col'
        }`}
      >
        {/* === Panel visual: screenshot con mockup de teléfono === */}
        <div
          className={`relative flex items-center justify-center overflow-hidden ${
            featured
              ? 'lg:w-[48%] lg:min-h-[560px] min-h-[380px] py-12 px-6 lg:px-10'
              : 'min-h-[300px] py-10 px-6'
          }`}
          style={{
            background: `radial-gradient(circle at 50% 30%, ${accentColor}20, transparent 60%), linear-gradient(160deg, ${accentColorSoft}18 0%, transparent 70%)`,
          }}
        >
          {/* Halo decorativo */}
          <div
            className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-60"
            style={{ background: `radial-gradient(circle, ${accentColor}55 0%, transparent 70%)` }}
          />

          {/* Partículas flotantes decorativas */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/60"
                style={{
                  top: `${15 + i * 14}%`,
                  left: `${10 + (i * 17) % 80}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Mockup de teléfono con parallax */}
          <motion.div
            className="relative"
            style={{
              x: parallaxX,
              y: parallaxY,
              transformStyle: 'preserve-3d',
              transform: 'translateZ(40px)',
            }}
          >
            <PhoneMockup
              images={images}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              accentColor={accentColor}
              name={name}
            />
          </motion.div>

          {/* Status badge flotante */}
          {status && (
            <div
              className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md"
              style={{ transform: 'translateZ(30px)' }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: accentColor }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </span>
              {status}
            </div>
          )}
        </div>

        {/* === Panel de contenido === */}
        <div
          className={`relative flex flex-1 flex-col gap-6 p-8 ${
            featured ? 'lg:p-12' : ''
          }`}
        >
          {/* Header: logo + categoría */}
          <header className="flex flex-wrap items-center gap-4">
            {logo && (
              <motion.div
                className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={logo}
                  alt={`Logo ${name}`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </motion.div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
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
              {featured && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Destacada
                </span>
              )}
            </div>
          </header>

          {/* Título + tagline */}
          <div className="space-y-2">
            <h2
              className={`font-display font-extrabold tracking-tight text-white ${
                featured ? 'text-4xl lg:text-5xl' : 'text-3xl'
              }`}
            >
              {name}
            </h2>
            {tagline && (
              <p
                className={`font-medium ${featured ? 'text-lg' : 'text-base'}`}
                style={{ color: accentColor }}
              >
                {tagline}
              </p>
            )}
          </div>

          {/* Descripción */}
          <p className="text-base leading-relaxed text-white/70">{description}</p>

          {/* Highlights (revelado escalonado en hover) */}
          {highlights.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              <AnimatePresence>
                {highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0.7, y: 0 }}
                    animate={{
                      opacity: isHovered ? 1 : 0.7,
                      y: isHovered ? -2 : 0,
                    }}
                    transition={{ delay: isHovered ? i * 0.05 : 0, duration: 0.3 }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                  >
                    {h}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}

          {/* Meta: plataformas + stack */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(platforms.length > 0 || upcomingPlatforms.length > 0) && (
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  <Smartphone className="h-3 w-3" />
                  Plataformas
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {platforms.map((p) => (
                    <span
                      key={p}
                      className="rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/80"
                    >
                      {p}
                    </span>
                  ))}
                  {upcomingPlatforms.map((p) => (
                    <span
                      key={`soon-${p}`}
                      className="inline-flex items-center gap-1 rounded-md border border-dashed border-white/15 bg-transparent px-2 py-1 text-xs font-medium text-white/50"
                      title="Próximamente"
                    >
                      {p}
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-alenia-primary">
                        pronto
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {stack.length > 0 && (
              <div>
                <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-auto flex items-center justify-between gap-4 pt-4">
            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-transform"
              style={{
                background: accentBorder,
                boxShadow: isHovered ? accentGlow : 'none',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Visitar fanpage
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </motion.a>
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <ExternalLink className="h-3 w-3" />
              <span className="hidden sm:inline">Abre en pestaña nueva</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Mockup minimalista de teléfono que muestra un screenshot con crossfade
 * cuando hay varias imágenes disponibles. Incluye dots de navegación manual.
 */
function PhoneMockup({ images, activeImage, setActiveImage, accentColor, name }) {
  const current = images[activeImage] || images[0];

  return (
    <div className="relative">
      {/* Frame del teléfono */}
      <div
        className="relative rounded-[2.4rem] border-[3px] border-white/15 bg-gradient-to-b from-slate-800 to-slate-950 p-[6px] shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        style={{ width: 240, height: 480 }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-[14px] z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

        {/* Pantalla */}
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
          <AnimatePresence mode="wait">
            {current && (
              <motion.img
                key={current}
                src={current}
                alt={`Screenshot de ${name}`}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                loading="lazy"
              />
            )}
          </AnimatePresence>

          {/* Overlay sutil para legibilidad */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Reflejo lateral */}
        <div className="pointer-events-none absolute inset-y-10 -left-[3px] w-[3px] rounded-l bg-white/20" />
        <div className="pointer-events-none absolute inset-y-10 -right-[3px] w-[3px] rounded-r bg-white/20" />
      </div>

      {/* Dots de navegación de la galería */}
      {images.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(i);
              }}
              aria-label={`Ver screenshot ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === activeImage ? 24 : 8,
                backgroundColor: i === activeImage ? accentColor : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
