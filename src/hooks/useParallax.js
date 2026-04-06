import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

/**
 * Hook para efectos parallax
 * @param {Object} options - Opciones de configuración
 * @param {number} options.speed - Velocidad del parallax (0-1)
 * @param {string} options.direction - Dirección ('vertical' o 'horizontal')
 * @param {string} options.offset - Offset para el scroll ('start end', 'end start', etc.)
 * @returns {Object} { ref, style }
 */
export default function useParallax({
  speed = 0.5,
  direction = 'vertical',
  offset = ['start end', 'end start']
} = {}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const x = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return {
    ref,
    style: {
      y: direction === 'vertical' ? y : 0,
      x: direction === 'horizontal' ? x : 0
    }
  };
}
