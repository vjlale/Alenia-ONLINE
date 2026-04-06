export class AnimationController {
  static getOptimalNodeCount(baseCount: number): number {
    const width = window.innerWidth;
    
    // Desktop
    if (width >= 1024) {
      return baseCount;
    }
    
    // Tablet
    if (width >= 768) {
      return Math.floor(baseCount * 0.7);
    }
    
    // Mobile
    return Math.floor(baseCount * 0.4);
  }

  static shouldReduceMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  static getDevicePixelRatio(): number {
    return window.devicePixelRatio || 1;
  }
}
