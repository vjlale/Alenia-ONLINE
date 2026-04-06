/**
 * Utilidades para la animación de nodos: conteo óptimo, reduced-motion y DPR.
 */
export class AnimationController {
  static getOptimalNodeCount(baseCount) {
    const width = window.innerWidth;

    if (width >= 1024) return baseCount;
    if (width >= 768) return Math.floor(baseCount * 0.7);
    return Math.floor(baseCount * 0.4);
  }

  static shouldReduceMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  static getDevicePixelRatio() {
    return window.devicePixelRatio || 1;
  }
}
