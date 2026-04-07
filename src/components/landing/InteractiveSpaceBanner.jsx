import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useMouseInteraction } from '../../hooks/useMouseInteraction';
import { Node } from '../../lib/Node';
import { AnimationController } from '../../lib/AnimationController';
import { CustomCursor } from './CustomCursor';
import BannerInstructionsOverlay from './BannerInstructionsOverlay';
import BannerExperienceIntroModal from './BannerExperienceIntroModal';
import { useBannerCursorContext } from '../../contexts/BannerCursorContext';
import {
  BANNER_INTRO_SESSION_KEY,
  HOME_CONTENT_ANCHOR_ID,
  bannerExitInteractionLabel,
} from '../../data/bannerExperienceCopy';

const NODE_COLOR = 'hsl(180, 90%, 50%)';

const BANNER_CONFIG = {
  nodeCount: 120,
  nodeCountReduced: 48,
  maxConnectionDistance: 200,
  centralNodeRadius: 16,
  attractRadius: 220,
  attractStrength: 0.28,
};

export default function InteractiveSpaceBanner() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const nodesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [containerReady, setContainerReady] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(BANNER_INTRO_SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });
  const { setPointerOverBanner } = useBannerCursorContext();

  const dismissIntro = useCallback(() => {
    try {
      sessionStorage.setItem(BANNER_INTRO_SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    setIntroDismissed(true);
  }, []);

  const scrollToMainContent = useCallback(() => {
    document.getElementById(HOME_CONTENT_ANCHOR_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useLayoutEffect(() => {
    if (sectionRef.current) setContainerReady(true);
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? AnimationController.shouldReduceMotion();

  const {
    mousePositionRef,
    isMouseActiveRef,
    touchIntensityRef,
    centralNodeActiveRef,
    centralNodePositionRef,
    mousePosition,
    globalMousePosition,
    isMouseActive,
  } = useMouseInteraction(sectionRef, containerReady);

  const nodeCount = reduceMotion ? BANNER_CONFIG.nodeCountReduced : BANNER_CONFIG.nodeCount;
  const maxConnectionDistance = BANNER_CONFIG.maxConnectionDistance;
  const interactive = true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = AnimationController.getDevicePixelRatio();
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const count = AnimationController.getOptimalNodeCount(nodeCount);
    nodesRef.current = Array.from({ length: count }, () =>
      new Node(rect.width, rect.height, NODE_COLOR)
    );

    setIsInitialized(true);

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${newRect.width}px`;
      canvas.style.height = `${newRect.height}px`;
      nodesRef.current.forEach((node) => {
        node.updateBoundaries(newRect.width, newRect.height);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [nodeCount]);

  useEffect(() => {
    if (!isInitialized) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centralR = BANNER_CONFIG.centralNodeRadius;
    const attractR = BANNER_CONFIG.attractRadius;
    const attractStr = BANNER_CONFIG.attractStrength;

    const drawCentralNode = (cx, cy) => {
      ctx.save();
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, centralR * 3);
      g.addColorStop(0, 'hsla(180, 90%, 50%, 0.9)');
      g.addColorStop(0.4, 'hsla(260, 85%, 55%, 0.4)');
      g.addColorStop(1, 'hsla(280, 90%, 60%, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, centralR * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'hsl(180, 90%, 50%)';
      ctx.beginPath();
      ctx.arc(cx, cy, centralR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let frameCount = 0;
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const nodes = nodesRef.current;
      const mp = mousePositionRef.current;
      const centerActive = interactive && centralNodeActiveRef.current && centralNodePositionRef.current;
      const cp = centerActive ? centralNodePositionRef.current : null;
      const repelActive = interactive && !centerActive && isMouseActiveRef.current && mp;

      const intensity = touchIntensityRef.current ?? 1;
      const interactionRadius = intensity > 1 ? 150 * intensity : 120;
      const force = intensity > 1 ? intensity * 0.5 : 1;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.update();

        if (centerActive && cp) {
          node.applyAttractForce(cp.x, cp.y, attractR, attractStr);
        } else if (repelActive) {
          node.applyMouseForce(mp.x, mp.y, interactionRadius, force);
        }

        if (centerActive && cp) {
          const d = Math.hypot(node.x - cp.x, node.y - cp.y);
          if (d < maxConnectionDistance && d > 0) {
            const op = (1 - d / maxConnectionDistance) * 0.6;
            if (op > 0.05) {
              const g = ctx.createLinearGradient(node.x, node.y, cp.x, cp.y);
              g.addColorStop(0, `hsla(280, 90%, 60%, ${op})`);
              g.addColorStop(0.5, `hsla(260, 85%, 55%, ${op})`);
              g.addColorStop(1, `hsla(180, 90%, 50%, ${op})`);
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(cp.x, cp.y);
              ctx.strokeStyle = g;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          }
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distance = node.distanceTo(other);
          if (distance >= maxConnectionDistance) continue;

          let baseOpacity = (1 - distance / maxConnectionDistance) * 0.5;
          let finalOpacity = baseOpacity;
          let lineWidth = 1.5;

          if (repelActive) {
            const midX = (node.x + other.x) / 2;
            const midY = (node.y + other.y) / 2;
            const distToMouse = Math.hypot(midX - mp.x, midY - mp.y);
            const enhanceRadius = intensity > 1 ? 250 * intensity : 200;
            if (distToMouse < interactionRadius) {
              const disconnectFactor = distToMouse / interactionRadius;
              finalOpacity = baseOpacity * disconnectFactor * 0.3;
              lineWidth = 1.5 * disconnectFactor;
            } else if (distToMouse < enhanceRadius) {
              const enhanceFactor = 1 + (intensity - 1) * 0.5;
              finalOpacity = baseOpacity * 1.2 * enhanceFactor;
              lineWidth = 2 * enhanceFactor;
            }
          }

          if (finalOpacity <= 0.05) continue;

          const g = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
          g.addColorStop(0, `hsla(280, 90%, 60%, ${finalOpacity})`);
          g.addColorStop(0.5, `hsla(260, 85%, 55%, ${finalOpacity})`);
          g.addColorStop(1, `hsla(180, 90%, 50%, ${finalOpacity})`);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = g;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }

        node.draw(ctx);
      }

      if (centerActive && cp) drawCentralNode(cp.x, cp.y);

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInitialized, interactive]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black cursor-none"
      data-banner-nodos
      onMouseEnter={() => setPointerOverBanner(true)}
      onMouseLeave={() => setPointerOverBanner(false)}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-none"
        aria-label="Red de nodos interactiva con partículas luminosas que responden al movimiento del ratón o al tacto"
      />
      <CustomCursor isActive={isMouseActive} position={globalMousePosition} />
      <BannerExperienceIntroModal isOpen={!introDismissed} onDismiss={dismissIntro} />
      {introDismissed && <BannerInstructionsOverlay />}
      {introDismissed && (
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 pointer-events-auto">
          <button
            type="button"
            onClick={scrollToMainContent}
            className="cursor-pointer rounded-full border border-cyan-400/70 bg-black/50 px-5 py-2.5 text-sm font-semibold text-cyan-100 font-inter backdrop-blur-md shadow-[0_0_24px_rgba(34,211,238,0.2)] transition-all hover:border-cyan-300 hover:bg-black/65 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {bannerExitInteractionLabel}
          </button>
        </div>
      )}
      <p className="sr-only">
        Red de nodos interactiva. Mantén pulsado y arrastra para crear un nodo central que atrae y conecta nodos. Dos dedos para hacer scroll.
      </p>
    </section>
  );
}
