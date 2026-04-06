import { useEffect, useState } from 'react';

interface CustomCursorProps {
  isActive: boolean;
  position: { x: number; y: number } | null;
}

export function CustomCursor({ isActive, position }: CustomCursorProps) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    if (position && isActive) {
      setTrail(prev => {
        const newTrail = [...prev, { ...position, id: Date.now() }];
        return newTrail.slice(-8); // Keep last 8 positions
      });
    }
  }, [position, isActive]);

  if (!isActive || !position) return null;

  return (
    <>
      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            opacity: (index + 1) / trail.length * 0.3,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: `${12 + index * 2}px`,
              height: `${12 + index * 2}px`,
              background: 'radial-gradient(circle, hsla(280, 90%, 60%, 0.6), hsla(180, 90%, 50%, 0.3))',
              filter: 'blur(2px)',
            }}
          />
        </div>
      ))}

      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Outer ring with rotation */}
        <div className="relative">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            className="animate-spin-slow"
            style={{ animationDuration: '3s' }}
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="url(#cursorGradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="cursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(280, 90%, 60%)" />
                <stop offset="50%" stopColor="hsl(260, 85%, 55%)" />
                <stop offset="100%" stopColor="hsl(180, 90%, 50%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '24px',
              height: '24px',
              background: 'radial-gradient(circle, hsla(280, 90%, 60%, 0.8), hsla(180, 90%, 50%, 0.4), transparent)',
              borderRadius: '50%',
              filter: 'blur(4px)',
            }}
          />

          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '6px',
              height: '6px',
              background: 'linear-gradient(135deg, hsl(280, 90%, 70%), hsl(180, 90%, 60%))',
              borderRadius: '50%',
              boxShadow: '0 0 8px hsla(280, 90%, 60%, 0.8), 0 0 16px hsla(180, 90%, 50%, 0.6)',
            }}
          />

          {/* Particles around cursor */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                width: '4px',
                height: '4px',
                background: i % 2 === 0 ? 'hsl(280, 90%, 60%)' : 'hsl(180, 90%, 50%)',
                borderRadius: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-20px)`,
                animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`,
                boxShadow: '0 0 4px currentColor',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-20px) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-24px) scale(1.2);
          }
        }
        .animate-spin-slow {
          animation: spin linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
