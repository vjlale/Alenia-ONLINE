// Logos oficiales de ALENIA (rebranding recuperado del sitio publicado en Hostinger).
export const BRAND_LOGOS = {
  symbol: '/images/logos-alenia/3.png',
  lockupFull: '/images/logos-alenia/lockup-full.png',
  lockupText: '/images/logos-alenia/lockup-text.png',
}

const absolute = (path) => (path.startsWith('http') ? path : `https://aleniahub.com${path}`)

export const BRAND_LOGOS_ABSOLUTE = {
  symbol: absolute(BRAND_LOGOS.symbol),
  lockupFull: absolute(BRAND_LOGOS.lockupFull),
  lockupText: absolute(BRAND_LOGOS.lockupText),
}

// Imagen para compartir en redes (Open Graph / Twitter).
export const OG_IMAGE = `${BRAND_LOGOS_ABSOLUTE.lockupFull}?v=3`
export const OG_IMAGE_WIDTH = 1080
export const OG_IMAGE_HEIGHT = 540
