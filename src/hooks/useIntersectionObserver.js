import { useEffect, useRef, useState } from 'react';

/**
 * Hook para detectar cuando elementos entran en viewport usando Intersection Observer
 * @param {Object} options - Opciones del Intersection Observer
 * @param {number} options.threshold - Umbral de intersección (0-1)
 * @param {string} options.rootMargin - Margen del root (ej: '100px')
 * @param {boolean} options.triggerOnce - Si solo debe disparar una vez
 * @returns {Object} { ref, isIntersecting, hasIntersected }
 */
export default function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
} = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && !hasIntersected) {
          setHasIntersected(true);
        }

        if (triggerOnce && hasIntersected && !isVisible) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasIntersected]);

  return {
    ref,
    isIntersecting,
    hasIntersected
  };
}
