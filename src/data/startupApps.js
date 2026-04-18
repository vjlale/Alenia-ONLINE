// Catálogo de apps desarrolladas por la startup Alen.iA.
// Para agregar una nueva app: pushear un objeto con la misma forma a este array.
// Campos clave:
//   - featured: si es true, la tarjeta se renderiza en formato destacado (ancho completo).
//   - url: redirección externa (fanpage / landing).
//   - gallery: lista de screenshots reales usados para la previsualización interactiva.

export const startupApps = [
  {
    id: 'match-padel',
    name: 'Match Padel',
    tagline: 'La red social definitiva para jugadores de pádel',
    description:
      'Encontrá rivales de tu nivel, organizá partidos, sumate a desafíos, seguí tu ranking ELO y reservá canchas. Todo en una sola app pensada por y para la comunidad del pádel. Ya disponible en web — próximamente en Play Store y App Store.',
    category: 'Deporte · Social',
    status: 'En producción',
    platforms: ['Web'],
    upcomingPlatforms: ['iOS', 'Android'],
    stack: ['React Native', 'Node.js', 'PostgreSQL'],
    highlights: [
      'Matchmaking inteligente',
      'Ranking ELO',
      'Reservas de canchas',
      'Desafíos entre jugadores',
      'Perfil y estadísticas',
    ],
    logo: '/images/playpadel/match-padel-logo.png',
    screenshot: '/images/playpadel/home1.png',
    gallery: [
      '/images/playpadel/home1.png',
      '/images/playpadel/Ranking.png',
      '/images/playpadel/reservas.png',
      '/images/playpadel/desafio.png',
    ],
    url: 'https://www.appmatchpadel.com/landing',
    accentColor: '#22d3ee',
    accentColorSoft: '#0891b2',
    featured: true,
  },
];

export default startupApps;
