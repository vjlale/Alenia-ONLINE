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
    preloadLink.href = '/images/5-3.png'; // Cambiar a .webp si se migran las imágenes
    
    document.head.appendChild(preloadLink);

    if (import.meta.env.DEV) {
      console.log(`[SEO] Preloading critical resource: ${preloadLink.href}`);
    }
  },
  optimizeImages() { if (import.meta.env.DEV) console.log('[SEO] Optimize images'); }
};
export default seoService;
