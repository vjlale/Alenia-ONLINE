import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que hace scroll automático hacia arriba cuando cambia la ruta
 * Proporciona una experiencia de navegación consistente en la SPA
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si hay un hash (#section), permitir que el browser maneje el scroll
    if (hash) {
      // Pequeño delay para permitir que el contenido se renderice
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      // Scroll suave hacia arriba para navegación normal
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    // Anunciar cambio de página para accessibility (screen readers)
    const pageTitle = document.title;
    if (pageTitle) {
      // Crear announcement para lectores de pantalla
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.style.position = 'absolute';
      announcement.style.left = '-10000px';
      announcement.style.width = '1px';
      announcement.style.height = '1px';
      announcement.style.overflow = 'hidden';
      announcement.textContent = `Navegado a ${pageTitle}`;
      
      document.body.appendChild(announcement);
      
      // Limpiar después de 1 segundo
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }
  }, [pathname, hash]);

  // Este componente no renderiza nada visible
  return null;
};

export default ScrollToTop;
