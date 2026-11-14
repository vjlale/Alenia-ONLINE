import { BRAND_LOGOS } from '../config/brand'
// Servicio SEO dummy
const seoService = {
  preloadCriticalResources() {
    if (typeof document === 'undefined') return;

    // Crear y añadir el <link> para precargar la imagen LCP
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    // Asumimos que esta es la imagen LCP. Idealmente, esto sería dinámico.
    // Usaremos la versión de mayor resolución como candidata para precarga.
    preloadLink.href = BRAND_LOGOS.lockupFull;
    
    document.head.appendChild(preloadLink);

    if (import.meta.env.DEV) {
      console.log(`[SEO] Preloading critical resource: ${preloadLink.href}`);
    }
  },
  optimizeImages() { if (import.meta.env.DEV) console.log('[SEO] Optimize images'); }
};
export default seoService;
