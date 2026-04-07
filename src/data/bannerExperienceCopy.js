/** Clave sessionStorage: no volver a mostrar el modal en la misma sesión del navegador. */
export const BANNER_INTRO_SESSION_KEY = 'alenia_banner_intro_dismissed';

/** Ancla en Home: destino del botón "Salir de la interacción". */
export const HOME_CONTENT_ANCHOR_ID = 'contenido-principal';

export const bannerIntroTitle = 'Experiencia interactiva';

export const bannerIntroAccordionItems = [
  {
    id: 'vista',
    title: 'Qué vas a ver',
    body:
      'Una red de nodos luminosos conectados entre sí. Las conexiones y la intensidad visual reaccionan cuando acercás el foco: el espacio cobra vida alrededor de tu interacción.',
  },
  {
    id: 'raton',
    title: 'Ratón (escritorio)',
    body:
      'Verás un cursor personalizado. Mantené pulsado y arrastrá para colocar un nodo central: atrae partículas cercanas y refuerza los enlaces hacia ese punto. Sin pulsar, el movimiento del puntero modula la red a tu alrededor.',
  },
  {
    id: 'tactil',
    title: 'Táctil (móvil y tablet)',
    body:
      'Con un dedo podés mantener y arrastrar para el mismo nodo central. Para bajar por la página y salir del área interactiva, usá dos dedos a la vez: así el scroll del sitio no se bloquea.',
  },
  {
    id: 'flujo',
    title: 'Flujo de movimiento',
    body:
      'Sin nodo central activo, la red responde al puntero o al tacto con un efecto de repulsión y refuerzo visual cercano. Con el nodo central, el movimiento se orienta hacia la atracción y las líneas hacia ese foco.',
  },
];

export const bannerIntroCtaLabel = 'Entrar a la experiencia';

export const bannerExitInteractionLabel = 'Salir de esta interacción';

export const bannerCompactHint =
  'Tip: dos dedos para hacer scroll · pulsá y arrastrá para el nodo central';
