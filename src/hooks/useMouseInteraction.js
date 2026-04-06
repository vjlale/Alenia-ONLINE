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

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/47f399e6-1133-4f83-afea-d4f19f76c8aa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useMouseInteraction.js:effect',message:'listeners attached',data:{tagName:el.tagName,containerReady},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H5'})}).catch(()=>{});
    // #endregion

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
      // #region agent log
      if (isTouchDevice) {
        fetch('http://127.0.0.1:7242/ingest/47f399e6-1133-4f83-afea-d4f19f76c8aa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useMouseInteraction.js:handleMouseDown',message:'mousedown skipped isTouchDevice',data:{isTouchDevice},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H4'})}).catch(()=>{});
        return;
      }
      fetch('http://127.0.0.1:7242/ingest/47f399e6-1133-4f83-afea-d4f19f76c8aa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useMouseInteraction.js:handleMouseDown',message:'mousedown ok',data:{clientX:e.clientX,clientY:e.clientY},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
      // #endregion
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
      // #region agent log
      if (e.touches.length >= 2) {
        fetch('http://127.0.0.1:7242/ingest/47f399e6-1133-4f83-afea-d4f19f76c8aa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useMouseInteraction.js:handleTouchStart',message:'touchstart 2 fingers skip',data:{touches:e.touches.length},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
        return;
      }
      fetch('http://127.0.0.1:7242/ingest/47f399e6-1133-4f83-afea-d4f19f76c8aa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useMouseInteraction.js:handleTouchStart',message:'touchstart 1 finger',data:{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
      // #endregion
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
