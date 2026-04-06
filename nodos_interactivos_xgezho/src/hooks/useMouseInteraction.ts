import { useState, useEffect, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMouseInteraction(canvasRef: RefObject<HTMLCanvasElement>) {
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null);
  const [globalMousePosition, setGlobalMousePosition] = useState<MousePosition | null>(null);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const [clickPosition, setClickPosition] = useState<MousePosition | null>(null);
  const [touchIntensity, setTouchIntensity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detectar si es dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return; // Ignorar mouse en dispositivos táctiles
      
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setGlobalMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsMouseActive(true);
    };

    const handleMouseLeave = () => {
      if (isTouchDevice) return;
      setIsMouseActive(false);
      setMousePosition(null);
      setGlobalMousePosition(null);
    };

    const handleClick = (e: MouseEvent) => {
      if (isTouchDevice) return;
      const rect = canvas.getBoundingClientRect();
      setClickPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTimeout(() => setClickPosition(null), 100);
    };

    // OPTIMIZACIÓN TÁCTIL MEJORADA
    let touchMoveTimeout: NodeJS.Timeout;
    let lastTouchTime = 0;
    let touchVelocity = 0;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const position = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      
      setMousePosition(position);
      setGlobalMousePosition({
        x: touch.clientX,
        y: touch.clientY,
      });
      setIsMouseActive(true);
      setTouchIntensity(1.5); // Mayor intensidad al tocar
      
      // Crear efecto de "explosión" al tocar
      setClickPosition(position);
      setTimeout(() => setClickPosition(null), 150);
      
      lastTouchTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const position = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      
      // Calcular velocidad del movimiento
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTouchTime;
      
      if (mousePosition && timeDelta > 0) {
        const dx = position.x - mousePosition.x;
        const dy = position.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        touchVelocity = distance / timeDelta;
        
        // Ajustar intensidad basada en velocidad
        setTouchIntensity(Math.min(2.5, 1 + touchVelocity * 2));
      }
      
      setMousePosition(position);
      setGlobalMousePosition({
        x: touch.clientX,
        y: touch.clientY,
      });
      
      lastTouchTime = currentTime;
      
      // Limpiar timeout anterior
      clearTimeout(touchMoveTimeout);
      
      // Mantener activo mientras se mueve
      setIsMouseActive(true);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      
      // Efecto de "inercia" - mantener la posición brevemente
      touchMoveTimeout = setTimeout(() => {
        setIsMouseActive(false);
        setMousePosition(null);
        setGlobalMousePosition(null);
        setTouchIntensity(1);
        touchVelocity = 0;
      }, 300); // Mantener efecto 300ms después de soltar
    };

    // Prevenir comportamientos por defecto en móviles
    const handleTouchCancel = (e: TouchEvent) => {
      e.preventDefault();
      setIsMouseActive(false);
      setMousePosition(null);
      setGlobalMousePosition(null);
      setTouchIntensity(1);
    };

    // Soporte multi-touch (usar el primer dedo)
    const handleTouchMultiple = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        // Usar el centro entre los dos primeros dedos
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const rect = canvas.getBoundingClientRect();
        
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        
        setMousePosition({
          x: centerX - rect.left,
          y: centerY - rect.top,
        });
        setGlobalMousePosition({
          x: centerX,
          y: centerY,
        });
        setTouchIntensity(2); // Mayor intensidad con multi-touch
      }
    };

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    
    // Touch events con opciones optimizadas
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchCancel, { passive: false });

    // Prevenir zoom en doble tap
    let lastTap = 0;
    const handleDoubleTapPrevention = (e: TouchEvent) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      
      if (tapLength < 300 && tapLength > 0) {
        e.preventDefault();
        // Crear efecto especial en doble tap
        if (mousePosition) {
          setTouchIntensity(3);
          setClickPosition(mousePosition);
          setTimeout(() => {
            setClickPosition(null);
            setTouchIntensity(1);
          }, 200);
        }
      }
      lastTap = currentTime;
    };
    
    canvas.addEventListener('touchend', handleDoubleTapPrevention, { passive: false });

    return () => {
      clearTimeout(touchMoveTimeout);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchCancel);
      canvas.removeEventListener('touchend', handleDoubleTapPrevention);
    };
  }, [canvasRef, mousePosition]);

  return { mousePosition, globalMousePosition, isMouseActive, clickPosition, touchIntensity };
}
