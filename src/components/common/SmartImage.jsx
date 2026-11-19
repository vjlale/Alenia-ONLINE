import React, { useState, useRef, useEffect } from 'react';
import Skeleton from './Skeleton';

/**
 * Componente reutilizable para imágenes optimizadas con lazy loading avanzado.
 * Encapsula las mejores prácticas de rendimiento como lazy loading,
 * decoding asíncrono, blur-up effect y priorización de carga para LCP.
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
 * @param {boolean} [showSkeleton=true] - Mostrar skeleton mientras carga.
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
  className = '',
  showSkeleton = true
}) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);
  // La carga diferida la hace el navegador (loading="lazy"). Antes dependía de un
  // IntersectionObserver propio que en algunas tarjetas nunca se disparaba y las
  // imágenes quedaban para siempre en el esqueleto gris.
  const ref = useRef(null);
  const shouldLoad = true;

  useEffect(() => {
    // Si la imagen ya estaba en caché, onLoad puede haberse disparado antes de montar.
    const img = ref.current?.querySelector('img');
    if (img && img.complete && img.naturalWidth > 0) setIsLoaded(true);
  }, [src]);

  const imgProps = {
    src,
    alt,
    width,
    height,
    className: `${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`,
    decoding: 'async',
    loading: priority ? undefined : 'lazy',
    fetchpriority: priority ? 'high' : undefined,
    sizes,
    onLoad: () => setIsLoaded(true),
    onError: () => setHasError(true),
    style: {
      willChange: isLoaded ? 'auto' : 'opacity'
    }
  };

  if (hasError) {
    return (
      <div className={`bg-slate-800 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-slate-500 text-sm">Error cargando imagen</span>
      </div>
    );
  }

  if (!shouldLoad && showSkeleton) {
    return (
      <div ref={ref}>
        <Skeleton variant="image" className={className} width={width} height={height} />
      </div>
    );
  }

  if (imageSources && imageSources.length > 0) {
    return (
      <div ref={ref} className="relative">
        {!isLoaded && showSkeleton && (
          <Skeleton variant="image" className={`absolute inset-0 ${className}`} width={width} height={height} />
        )}
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
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      {!isLoaded && showSkeleton && (
        <Skeleton variant="image" className={`absolute inset-0 ${className}`} width={width} height={height} />
      )}
      <img {...imgProps} />
    </div>
  );
}
