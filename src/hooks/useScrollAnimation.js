import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Hook para animaciones basadas en scroll
 * @param {Object} options - Opciones de configuración
 * @param {string} options.direction - Dirección de la animación ('up', 'down', 'left', 'right', 'fade')
 * @param {number} options.delay - Delay en segundos
 * @param {number} options.duration - Duración en segundos
 * @param {boolean} options.once - Si solo debe animar una vez
 * @param {string} options.margin - Margen para el viewport (ej: '-100px')
 * @returns {Object} { ref, isInView, controls }
 */
export default function useScrollAnimation({
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  margin = '-100px'
} = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const getInitialStyle = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 };
      case 'down':
        return { opacity: 0, y: -50 };
      case 'left':
        return { opacity: 0, x: 50 };
      case 'right':
        return { opacity: 0, x: -50 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const getAnimateStyle = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'fade':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return {
    ref,
    isInView: hasAnimated || isInView,
    initial: getInitialStyle(),
    animate: hasAnimated || isInView ? getAnimateStyle() : getInitialStyle(),
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1]
    }
  };
}
