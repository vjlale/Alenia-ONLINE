import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Fondo animado con gradiente y patrón de puntos flotantes.
 * Pensado para ubicarse detrás del logo/hero.
 * - Sin dependencias extra
 * - Usa Framer Motion para animación suave y performante
 */
export default function AnimatedLogoBackdrop({ intensity = 0.9, respectReducedMotion = true }) {
  const prefersReducedMotion = useReducedMotion();

  // SVG de puntos (estrellas) codificado para data URL (memoizado)
  const dotsSvg = useMemo(() => encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="20" cy="60" r="2" fill="rgba(234, 6, 241, 1)"/>
      <circle cx="50" cy="30" r="2.5" fill="rgba(0, 116, 248, 1)"/>
      <circle cx="10" cy="10" r="1.5" fill="rgba(3, 0, 155, 0.97)"/>
      <circle cx="90" cy="60" r="1" fill="rgba(2, 171, 250, 1)"/>
    </svg>`
  ), []);

  return (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
      {/* Capa de gradiente base (similar a la referencia) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#533a7d] to-[#c77dff]"
        style={{ opacity: intensity }}
        aria-hidden
      />

      {/* Capa de puntos lejana (parallax - más lenta, tiles más grandes) */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${dotsSvg}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
          backgroundPositionY: '0px',
          opacity: 0.25,
        }}
        animate={
          respectReducedMotion && prefersReducedMotion
            ? { backgroundPositionY: '0px' }
            : { backgroundPositionY: ['0px', '160px'] }
        }
        transition={
          respectReducedMotion && prefersReducedMotion
            ? { duration: 0 }
            : { duration: 35, ease: 'linear', repeat: Infinity }
        }
        aria-hidden
      />

      {/* Patrón de puntos flotantes (equivalente al ::before con keyframes) */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${dotsSvg}")`,
          backgroundRepeat: 'repeat',
          // Usamos un tamaño de tile fijo (100x100) para que el loop sea perfecto
          backgroundSize: '100px 100px',
          backgroundPositionY: '0px',
          opacity: 0.4,
        }}
        animate={
          respectReducedMotion && prefersReducedMotion
            ? { backgroundPositionY: '0px' }
            : { backgroundPositionY: ['0px', '100px'] }
        }
        transition={
          respectReducedMotion && prefersReducedMotion
            ? { duration: 0 }
            : { duration: 20, ease: 'linear', repeat: Infinity }
        }
        aria-hidden
      />

      {/* Glow sutil en marca (verde -> primary) */}
      <motion.div
        className="absolute -inset-[20%] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(0,255,136,0.35), rgba(0, 0, 0, 0.65) 60%)',
          opacity: 0.35,
        }}
        animate={respectReducedMotion && prefersReducedMotion ? { scale: 1, rotate: 0 } : { scale: [1, 1.05, 1], rotate: [5, 8, 8, 0] }}
        transition={respectReducedMotion && prefersReducedMotion ? { duration: 0 } : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
    </div>
  );
}
