import { useEffect, useRef, useState } from 'react';
import { useMouseInteraction } from '../hooks/useMouseInteraction';
import { Node } from '../lib/Node';
import { AnimationController } from '../lib/AnimationController';
import { CustomCursor } from './CustomCursor';

interface NodeCanvasProps {
  nodeCount?: number;
  maxConnectionDistance?: number;
  nodeColor?: string;
  lineColor?: string;
  interactive?: boolean;
}

export function NodeCanvas({
  nodeCount = 120,
  maxConnectionDistance = 200,
  nodeColor = 'hsl(180, 90%, 50%)',
  lineColor = 'hsl(220, 90%, 40%)',
  interactive = true,
}: NodeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();
  const [isInitialized, setIsInitialized] = useState(false);
  const { mousePosition, globalMousePosition, isMouseActive, clickPosition, touchIntensity } = useMouseInteraction(canvasRef);

  // Initialize canvas and nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Adjust node count based on screen size
    const adjustedNodeCount = AnimationController.getOptimalNodeCount(nodeCount);

    // Initialize nodes
    nodesRef.current = Array.from({ length: adjustedNodeCount }, () => 
      new Node(rect.width, rect.height, nodeColor)
    );

    setIsInitialized(true);

    // Handle resize
    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${newRect.width}px`;
      canvas.style.height = `${newRect.height}px`;

      // Update node boundaries
      nodesRef.current.forEach(node => {
        node.updateBoundaries(newRect.width, newRect.height);
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nodeCount, nodeColor]);

  // Handle click to create new node
  useEffect(() => {
    if (!clickPosition || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Create a new node at click position
    const newNode = new Node(rect.width, rect.height, nodeColor);
    newNode.x = clickPosition.x;
    newNode.y = clickPosition.y;
    newNode.opacity = 0;
    
    nodesRef.current.push(newNode);

    // Remove the node after animation completes
    setTimeout(() => {
      const index = nodesRef.current.indexOf(newNode);
      if (index > -1) {
        nodesRef.current.splice(index, 1);
      }
    }, 2000);
  }, [clickPosition, nodeColor]);

  // Animation loop
  useEffect(() => {
    if (!isInitialized) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update and draw nodes
      nodesRef.current.forEach((node, index) => {
        // Update node position
        node.update();

        // Apply mouse/touch interaction if enabled
        if (interactive && isMouseActive && mousePosition) {
          // Ajustar radio e intensidad basado en si es touch o mouse
          const interactionRadius = touchIntensity > 1 ? 150 * touchIntensity : 120;
          const force = touchIntensity > 1 ? touchIntensity * 0.5 : 1;
          node.applyMouseForce(mousePosition.x, mousePosition.y, interactionRadius, force);
        }

      // Draw connections to nearby nodes
      for (let j = index + 1; j < nodesRef.current.length; j++) {
        const otherNode = nodesRef.current[j];
        const distance = node.distanceTo(otherNode);

        if (distance < maxConnectionDistance) {
          // Calculate base opacity based on distance
          const baseOpacity = (1 - distance / maxConnectionDistance) * 0.5;
          
          // Calculate distance from mouse to connection line midpoint
          let finalOpacity = baseOpacity;
          let lineWidth = 1.5;
          
          // Apply mouse/touch interaction if enabled
          if (interactive && isMouseActive && mousePosition) {
            const midX = (node.x + otherNode.x) / 2;
            const midY = (node.y + otherNode.y) / 2;
            const distToMouse = Math.hypot(midX - mousePosition.x, midY - mousePosition.y);
            
            // Ajustar radio de interacción basado en touch intensity
            const interactionRadius = touchIntensity > 1 ? 150 * touchIntensity : 120;
            const enhanceRadius = touchIntensity > 1 ? 250 * touchIntensity : 200;
            
            // Disconnect effect: fade out connections near touch/mouse
            if (distToMouse < interactionRadius) {
              const disconnectFactor = distToMouse / interactionRadius;
              finalOpacity = baseOpacity * disconnectFactor * 0.3;
              lineWidth = 1.5 * disconnectFactor;
            } else if (distToMouse < enhanceRadius) {
              // Slight enhancement for connections just outside interaction radius
              const enhanceFactor = 1 + (touchIntensity - 1) * 0.5;
              finalOpacity = baseOpacity * 1.2 * enhanceFactor;
              lineWidth = 2 * enhanceFactor;
            }
          }

          // Only draw if opacity is significant
          if (finalOpacity > 0.05) {
            // Create gradient line from purple to cyan
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
            gradient.addColorStop(0, `hsla(280, 90%, 60%, ${finalOpacity})`);
            gradient.addColorStop(0.5, `hsla(260, 85%, 55%, ${finalOpacity})`);
            gradient.addColorStop(1, `hsla(180, 90%, 50%, ${finalOpacity})`);

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }

        // Draw node
        node.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInitialized, interactive, isMouseActive, mousePosition, maxConnectionDistance, lineColor, touchIntensity]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-none"
        aria-label="Interactive node network animation with glowing particles that respond to mouse movement"
      />
      <CustomCursor isActive={isMouseActive} position={globalMousePosition} />
      <p className="sr-only">
        An interactive visualization showing a network of glowing nodes connected by lines. 
        Move your mouse to interact with the nodes, or click to create new connections.
      </p>
    </>
  );
}
