// Servicio de performance dummy
const performanceService = {
  monitor() { if (import.meta.env.DEV) console.log('[Performance] Monitoring...'); }
};
export default performanceService;
