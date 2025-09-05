import { useEffect, useState } from 'react';

/**
 * Hook personalizado para precargar componentes lazy de forma inteligente
 * @param {Object} routes - Objeto con rutas y sus componentes lazy
 * @param {number} delay - Delay en ms antes de empezar a precargar (default: 2000)
 */
function useLazyPreload(routes, delay = 2000) {
  const [preloadedRoutes, setPreloadedRoutes] = useState(new Set());

  useEffect(() => {
    // Solo precargar en conexiones rápidas
    if (navigator.connection && navigator.connection.effectiveType !== '4g') {
      return;
    }

    const timer = setTimeout(() => {
      // Precargar componentes críticos primero
      const criticalRoutes = ['/soluciones', '/apps', '/blog'];
      
      criticalRoutes.forEach(route => {
        if (routes[route] && !preloadedRoutes.has(route)) {
          routes[route]().then(() => {
            setPreloadedRoutes(prev => new Set([...prev, route]));
          }).catch(err => {
            console.warn(`Failed to preload route ${route}:`, err);
          });
        }
      });

    }, delay);

    return () => clearTimeout(timer);
  }, [routes, delay, preloadedRoutes]);

  // Función para precargar una ruta específica al hacer hover
  const preloadRoute = (route) => {
    if (routes[route] && !preloadedRoutes.has(route)) {
      routes[route]().then(() => {
        setPreloadedRoutes(prev => new Set([...prev, route]));
      }).catch(err => {
        console.warn(`Failed to preload route ${route}:`, err);
      });
    }
  };

  return { preloadedRoutes, preloadRoute };
}

export default useLazyPreload;
