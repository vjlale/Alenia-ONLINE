// Servicio de Analytics dummy para evitar errores en desarrollo y producción
const analyticsService = {
  async init() { return true; },
  trackPageView(path, title) {
    if (import.meta.env.DEV) console.log(`[Analytics] PageView: ${path} - ${title}`);
  },
  trackEvent(event, payload) {
    if (import.meta.env.DEV) console.log(`[Analytics] Event: ${event}`, payload ?? {});
  },
  setConsentMode(analytics, marketing) {
    if (import.meta.env.DEV) console.log(`[Analytics] Consent: analytics=${analytics}, marketing=${marketing}`);
  }
};
export default analyticsService;
