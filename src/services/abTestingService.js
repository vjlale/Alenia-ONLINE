// Servicio de A/B Testing dummy
const abTestingService = {
  experiments: new Map(),
  applyExperiment(name, selector) {
    this.experiments.set(name, selector);
    if (import.meta.env.DEV) console.log(`[ABTest] Applied: ${name} to ${selector}`);
  }
};
export default abTestingService;
