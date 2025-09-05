import React from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDelay: number;
}

const AnimatedBackground: React.FC = () => {
  // Generar estrellas con posiciones aleatorias
  const stars: Star[] = React.useMemo(() => {
    const starArray: Star[] = [];
    for (let i = 0; i < 100; i++) {
      starArray.push({
        id: i,
        x: Math.random() * 100, // porcentaje del ancho
        y: Math.random() * 100, // porcentaje del alto
        size: Math.random() * 2 + 1, // tamaño entre 1-3px
        animationDelay: Math.random() * 3, // delay aleatorio para animación
      });
    }
    return starArray;
  }, []);

  const getSizeClass = (size: number) => {
    if (size < 1.5) return 'star-small';
    if (size < 2.5) return 'star-medium';
    return 'star-large';
  };

  return (
    <div className="animated-stars fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Reglas CSS dinámicas para posiciones y delays sin estilos inline en cada estrella */}
      <style>{`
        ${stars
          .map(
            (s, i) => `.animated-stars > .star:nth-child(${i + 1}){ left:${s.x}%; top:${s.y}%; animation-delay:${s.animationDelay}s; }`
          )
          .join('\n')}
      `}</style>
      {stars.map((star) => (
        <div key={star.id} className={`star ${getSizeClass(star.size)}`} />
      ))}
    </div>
  );
};

export default AnimatedBackground;
