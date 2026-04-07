import { useState, useEffect, useRef } from 'react';

/**
 * Hook de interacción mouse/touch para el banner de nodos.
 * - Nodo central: mousedown/touch (1 dedo) activa; mouseup/touchend desactiva.
 * - Dos dedos: no preventDefault → scroll de página.
 */
export function useMouseInteraction(containerRef, containerReady = true) {
  const [mousePosition, setMousePosition] = useState(null);
  const [globalMousePosition, setGlobalMousePosition] = useState(null);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const [touchIntensity, setTouchIntensity] = useState(1);

  const mousePositionRef = useRef(null);
  const isMouseActiveRef = useRef(false);
  const touchIntensityRef = useRef(1);
  const lastTouchPosRef = useRef(null);
  const touchMoveTimeoutRef = useRef(null);

  const centralNodeActiveRef = useRef(false);
  const centralNodePositionRef = useRef(null);
  const [centralNodeActive, setCentralNodeActive] = useState(false);
  const [centralNodePosition, setCentralNodePosition] = useState(null);

  const isMouseDownRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let lastTouchTime = 0;

    const getPos = (e) => {
      const rect = el.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const getTouchPos = (touch) => {
      const rect = el.getBoundingClientRect();
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };

    const activateCentral = (pos) => {
      centralNodeActiveRef.current = true;
      centralNodePositionRef.current = pos;
      setCentralNodeActive(true);
      setCentralNodePosition(pos);
    };

    const deactivateCentral = () => {
      centralNodeActiveRef.current = false;
      centralNodePositionRef.current = null;
      setCentralNodeActive(false);
      setCentralNodePosition(null);
    };

    const handleMouseDown = (e) => {
      if (isTouchDevice) {
        return;
      }
      isMouseDownRef.current = true;
      const pos = getPos(e);
      activateCentral(pos);
      mousePositionRef.current = pos;
      isMouseActiveRef.current = true;
      setMousePosition(pos);
      setGlobalMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseActive(true);
    };

    const handleMouseMove = (e) => {
      if (isTouchDevice) return;
      const pos = getPos(e);
      mousePositionRef.current = pos;
      setMousePosition(pos);
      setGlobalMousePosition({ x: e.clientX, y: e.clientY });
      if (isMouseDownRef.current) {
        centralNodePositionRef.current = pos;
        setCentralNodePosition(pos);
      }
      isMouseActiveRef.current = true;
      setIsMouseActive(true);
    };

    const handleMouseUp = () => {
      if (isTouchDevice) return;
      isMouseDownRef.current = false;
      deactivateCentral();
    };

    const handleMouseLeave = () => {
      if (isTouchDevice) return;
      isMouseDownRef.current = false;
      isMouseActiveRef.current = false;
      mousePositionRef.current = null;
      setIsMouseActive(false);
      setMousePosition(null);
      setGlobalMousePosition(null);
      deactivateCentral();
    };

    const handleTouchStart = (e) => {
      if (e.touches.length >= 2) {
        return;
      }
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];
      const position = getTouchPos(touch);
      lastTouchPosRef.current = position;
      mousePositionRef.current = position;
      isMouseActiveRef.current = true;
      touchIntensityRef.current = 1.5;
      setMousePosition(position);
      setGlobalMousePosition({ x: touch.clientX, y: touch.clientY });
      setIsMouseActive(true);
      setTouchIntensity(1.5);
      activateCentral(position);
      lastTouchTime = Date.now();
    };

    const handleTouchMove = (e) => {
      if (e.touches.length >= 2) {
        deactivateCentral();
        return;
      }
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];
      const position = getTouchPos(touch);

      const currentTime = Date.now();
      const timeDelta = currentTime - lastTouchTime;
      const prev = lastTouchPosRef.current;
      if (prev && timeDelta > 0) {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const intensity = Math.min(2.5, 1 + (distance / timeDelta) * 2);
        touchIntensityRef.current = intensity;
        setTouchIntensity(intensity);
      }
      lastTouchPosRef.current = position;
      lastTouchTime = currentTime;
      mousePositionRef.current = position;
      centralNodePositionRef.current = position;
      setMousePosition(position);
      setCentralNodePosition(position);
      setGlobalMousePosition({ x: touch.clientX, y: touch.clientY });
      setIsMouseActive(true);
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length >= 2) return;
      if (e.cancelable) e.preventDefault();
      touchMoveTimeoutRef.current = setTimeout(() => {
        isMouseActiveRef.current = false;
        mousePositionRef.current = null;
        touchIntensityRef.current = 1;
        setIsMouseActive(false);
        setMousePosition(null);
        setGlobalMousePosition(null);
        setTouchIntensity(1);
        lastTouchPosRef.current = null;
        deactivateCentral();
      }, 300);
    };

    const handleTouchCancel = (e) => {
      if (e.touches.length >= 2) return;
      if (e.cancelable) e.preventDefault();
      isMouseActiveRef.current = false;
      mousePositionRef.current = null;
      touchIntensityRef.current = 1;
      setIsMouseActive(false);
      setMousePosition(null);
      setGlobalMousePosition(null);
      setTouchIntensity(1);
      lastTouchPosRef.current = null;
      deactivateCentral();
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: false });
    el.addEventListener('touchcancel', handleTouchCancel, { passive: false });

    return () => {
      if (touchMoveTimeoutRef.current) clearTimeout(touchMoveTimeoutRef.current);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [containerRef, containerReady]);

  return {
    mousePosition,
    globalMousePosition,
    isMouseActive,
    touchIntensity,
    mousePositionRef,
    isMouseActiveRef,
    touchIntensityRef,
    centralNodeActiveRef,
    centralNodePositionRef,
    centralNodeActive,
    centralNodePosition,
  };
}
