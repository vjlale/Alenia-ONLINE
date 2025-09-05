import { useState, useEffect } from 'react';

/**
 * Hook para detectar si la app está siendo ejecutada dentro de un iframe (modo embed)
 * y proporcionar configuraciones específicas para ese contexto
 */
export const useEmbedMode = () => {
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [parentOrigin, setParentOrigin] = useState<string | null>(null);
  const [embedConfig, setEmbedConfig] = useState({
    hideHeader: false,
    compactMode: false,
    hideFooter: false,
    customTheme: null as string | null,
    maxHeight: null as number | null,
    allowFullscreen: true
  });

  useEffect(() => {
    // Detectar si estamos en un iframe
    const inIframe = window.self !== window.top;
    setIsEmbedded(inIframe);

    if (inIframe) {
      try {
        // Intentar obtener el origen del parent
        setParentOrigin(document.referrer || window.parent.location.hostname);
      } catch (e) {
        // Cross-origin, no podemos acceder al parent
        setParentOrigin('unknown');
      }

      // Escuchar mensajes del parent para configuración
      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'PICSHOP_CONFIG') {
          setEmbedConfig(prev => ({
            ...prev,
            ...event.data.config
          }));
        }
      };

      window.addEventListener('message', handleMessage);

      // Enviar mensaje al parent indicando que estamos listos
      window.parent.postMessage({
        type: 'PICSHOP_READY',
        version: '1.0.0'
      }, '*');

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, []);

  // Función para enviar eventos al parent
  const sendToParent = (eventType: string, data: any = {}) => {
    if (isEmbedded && window.parent) {
      window.parent.postMessage({
        type: `PICSHOP_${eventType.toUpperCase()}`,
        data,
        timestamp: Date.now()
      }, '*');
    }
  };

  // Función para solicitar fullscreen al parent
  const requestFullscreen = () => {
    if (isEmbedded && embedConfig.allowFullscreen) {
      sendToParent('REQUEST_FULLSCREEN');
    }
  };

  return {
    isEmbedded,
    parentOrigin,
    embedConfig,
    sendToParent,
    requestFullscreen
  };
};
