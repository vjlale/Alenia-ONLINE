// Servicio SEO dummy
const seoService = {
  preloadCriticalResources() { if (import.meta.env.DEV) console.log('[SEO] Preload critical resources'); },
  optimizeImages() { if (import.meta.env.DEV) console.log('[SEO] Optimize images'); }
};
export default seoService;
