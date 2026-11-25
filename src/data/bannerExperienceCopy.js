/** Clave sessionStorage: no volver a mostrar el modal en la misma sesión del navegador. */
export const BANNER_INTRO_SESSION_KEY = 'alenia_banner_intro_dismissed';

/** Ancla en Home: destino del botón "Salir de la interacción". */
export const HOME_CONTENT_ANCHOR_ID = 'contenido-principal';

export const bannerIntroTitle = 'Experiencia interactiva';

/** Dos bloques cortos, sin acordeón ni separación por dispositivo. */
export const bannerIntroItems = [
  {
    id: 'vista',
    title: 'Qué vas a ver',
    body:
      'Una simulación de una red neuronal, como las del cerebro humano. Es la base de la inteligencia artificial.',
  },
  {
    id: 'uso',
    title: 'Cómo usarla',
    body:
      'Mantené apretado y arrastrá: la red te sigue. Para seguir viendo el sitio, tocá «Salir de esta interacción».',
  },
];

export const bannerIntroCtaLabel = 'Entrar a la experiencia';

export const bannerExitInteractionLabel = 'Salir de esta interacción';

export const bannerCompactHint =
  'Tip: dos dedos para hacer scroll · pulsá y arrastrá para el nodo central';
