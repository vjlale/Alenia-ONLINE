import React from 'react';

/**
 * Componente reutilizable para imágenes optimizadas.
 * Encapsula las mejores prácticas de rendimiento como lazy loading,
 * decoding asíncrono y priorización de carga para LCP.
 * Soporta el tag <picture> para formatos modernos como WebP.
 * 
 * @param {string} src - Ruta de la imagen de fallback.
 * @param {string} alt - Texto alternativo.
 * @param {number} width - Ancho intrínseco de la imagen.
 * @param {number} height - Alto intrínseco de la imagen.
 * @param {Array} [imageSources] - Array de objetos para los <source> del <picture>.
 * @param {string} [sizes] - Tamaños para imágenes responsivas.
 * @param {boolean} [priority=false] - Marcar como true si es una imagen LCP.
 * @param {string} [className] - Clases CSS adicionales.
 * @returns {JSX.Element}
 */
export default function SmartImage({ 
  src, 
  alt, 
  width, 
  height, 
  imageSources,
  sizes, 
  priority = false, 
  className 
}) {
  const imgProps = {
    src,
    alt,
    width,
    height,
    className,
    decoding: 'async',
    loading: priority ? undefined : 'lazy',
    fetchPriority: priority ? 'high' : undefined,
    sizes,
  };

  if (imageSources && imageSources.length > 0) {
    return (
      <picture>
        {imageSources.map((source, index) => (
          <source
            key={index}
            srcSet={source.src}
            type={source.type}
            media={source.media}
          />
        ))}
        <img {...imgProps} />
      </picture>
    );
  }

  return <img {...imgProps} />;
}
