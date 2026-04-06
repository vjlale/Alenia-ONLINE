import React from 'react';

const AnimatedBackground: React.FC = () => {
  // Generate stars and particles outside of useEffect and return statement
  const stars = [...Array(100)].map((_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const animationDelay = Math.random() * 3;
    const animationDuration = 2 + Math.random() * 3;
    return (
      <div
        key={`star-${i}`}
        className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse star"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          animationDelay: `${animationDelay}s`,
          animationDuration: `${animationDuration}s`,
        }}
      />
    );
  });

  const particles = [...Array(20)].map((_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 4 + Math.random() * 4;
    const delay = Math.random() * 4;
    return (
      <div
        key={`particle-${i}`}
        className="absolute w-2 h-2 bg-cyan-400/30 rounded-full blur-sm particle"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          animation: `float ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Estrellas animadas */}
      {stars}

      {/* Efecto de nebulosa sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 animate-gradient" />

      {/* Partículas flotantes */}
      <div className="absolute inset-0">
        {particles}
      </div>
    </div>
  );
};

export default AnimatedBackground;
