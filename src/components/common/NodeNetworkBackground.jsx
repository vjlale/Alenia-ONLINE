import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Node } from '../../lib/Node';
import { AnimationController } from '../../lib/AnimationController';

const NODE_COLOR = 'hsl(180, 90%, 50%)';

/**
 * Canvas con nodos que se conectan entre sí. No interactivo.
 * Para usar como fondo en la sección oscura del Home.
 */
export default function NodeNetworkBackground({
  particleCount = 60,
  maxConnectionDistance = 180,
  className = '',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? (typeof window !== 'undefined' && AnimationController.shouldReduceMotion());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) {
      setShouldRender(false);
      return;
    }
    if (reduceMotion) {
      setShouldRender(false);
      return;
    }
  }, [reduceMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !shouldRender) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = AnimationController.getDevicePixelRatio();

    const initCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const count = AnimationController.getOptimalNodeCount(particleCount);
      nodesRef.current = Array.from({ length: count }, () =>
        new Node(rect.width, rect.height, NODE_COLOR)
      );
      setIsInitialized(true);
    };

    initCanvas();

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      nodesRef.current.forEach((node) => {
        node.updateBoundaries(rect.width, rect.height);
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [particleCount, maxConnectionDistance, shouldRender]);

  useEffect(() => {
    if (!isInitialized || !shouldRender) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.update();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distance = node.distanceTo(other);
          if (distance >= maxConnectionDistance) continue;

          const baseOpacity = (1 - distance / maxConnectionDistance) * 0.5;
          if (baseOpacity <= 0.05) continue;

          const g = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
          g.addColorStop(0, `hsla(280, 90%, 60%, ${baseOpacity})`);
          g.addColorStop(0.5, `hsla(260, 85%, 55%, ${baseOpacity})`);
          g.addColorStop(1, `hsla(180, 90%, 50%, ${baseOpacity})`);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        node.draw(ctx);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInitialized, maxConnectionDistance, shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full min-h-full pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#000' }}
      />
    </div>
  );
}
