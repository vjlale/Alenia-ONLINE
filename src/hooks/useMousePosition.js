import { useState, useEffect, useRef } from 'react';

/**
 * Hook para rastrear la posición del mouse con throttling optimizado para rendimiento.
 * Útil para animaciones de partículas que siguen el cursor.
 * 
 * @param {number} throttleMs - Tiempo de throttling en milisegundos (default: 16ms para 60fps)
 * @returns {Object} { x, y } - Coordenadas del mouse relativas al viewport
 */
export default function useMousePosition(throttleMs = 16) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const throttleTimeoutRef = useRef(null);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const updateMousePosition = (e) => {
      const now = Date.now();
      
      // Throttling: solo actualizar si ha pasado el tiempo mínimo
      if (now - lastUpdateRef.current >= throttleMs) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        lastUpdateRef.current = now;
      } else {
        // Si está dentro del throttle, programa una actualización
        clearTimeout(throttleTimeoutRef.current);
        throttleTimeoutRef.current = setTimeout(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          lastUpdateRef.current = Date.now();
        }, throttleMs - (now - lastUpdateRef.current));
      }
    };

    // Inicializar posición en el centro de la pantalla
    const initializePosition = () => {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
    };

    // Configurar listeners
    initializePosition();
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('resize', initializePosition);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', initializePosition);
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [throttleMs]);

  return mousePosition;
}
