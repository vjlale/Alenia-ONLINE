import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  Trophy,
  Calendar,
  MessageCircle,
  Camera,
  Target,
  Award,
  TrendingUp,
  Smartphone,
  Shield,
  Zap,
  Heart,
  Star,
  Crown,
  Flame,
  Sparkles,
  UserPlus,
  Check,
  Home,
  User,
  HeartHandshake
} from 'lucide-react';
import '../styles/PlayPadelLanding.css';
import { BRAND_LOGOS } from '../config/brand'

const PlayPadelLanding = () => {
  const [activeTab, setActiveTab] = useState('jugadores');

  useEffect(() => {
    // Smooth scroll para navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Intersection Observer para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pp-animate-in');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.pp-feature-card, .pp-screen-item, .pp-badge-item').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Play Padel | Armá partidos y llená tu club | Desarrollado por ALENIA</title>
        <link rel="canonical" href="https://aleniahub.com/play-padel" />
        <meta name="description" content="Conocé Play Padel: formá tu dupla, desafiá a otras de tu nivel, gestioná las reservas de tu club y fidelizá a tus socios. Torneos, ranking, muro social y más." />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ALENIA" />
        <meta property="og:url" content="https://aleniahub.com/play-padel" />
        <meta property="og:title" content="Play Padel | Armá partidos y llená tu club" />
        <meta property="og:description" content="Formá tu dupla, desafiá a otras de tu nivel, gestioná las reservas de tu club y fidelizá a tus socios." />
        <meta property="og:image" content="https://aleniahub.com/images/playpadel/650d36c51e390141790f6967b34abe4d8959e5465ed8a3b653d7114402f60ac0.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Play Padel | Armá partidos y llená tu club" />
        <meta name="twitter:description" content="Formá tu dupla, desafiá a otras de tu nivel y gestioná tu club desde una sola app de pádel." />

        {/* Preload de fuentes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="play-padel-landing">
        {/* Header */}
        <header className="pp-header">
          <div className="pp-nav-container">
            <Link to="/" className="pp-back-button" aria-label="Volver al inicio">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Volver al inicio
            </Link>
            <nav>
              <ul className="pp-nav-menu">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#jugadores">Para jugadores</a></li>
                <li><a href="#clubes">Para clubes</a></li>
                <li><a href="#gamificacion">Puntos y logros</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section id="inicio" className="pp-hero">
          <div className="pp-hero-content">
            <div className="pp-logo-container">
              <img
                src="/images/playpadel/650d36c51e390141790f6967b34abe4d8959e5465ed8a3b653d7114402f60ac0.png"
                alt="Logo de Play Padel"
              />
            </div>

            <h1 className="pp-hero-title">
              Armá partidos y llená tu club
            </h1>

            <p className="pp-hero-subtitle">
              Formá tu dupla, desafiá a otras de tu nivel, gestioná las reservas de tu club y armá una comunidad activa con torneos y un muro social.
            </p>

            <div className="pp-hero-buttons">
              <a href="#jugadores" className="pp-cta-primary">
                <Users className="w-5 h-5" />
                Para jugadores
              </a>
              <a href="#clubes" className="pp-cta-secondary">
                <Calendar className="w-5 h-5" />
                Para clubes
              </a>
            </div>
          </div>

          <div className="pp-built-by">
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(var(--pp-primary)) 0%, hsl(var(--pp-accent)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '0.9rem',
                fontWeight: '800',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              Build By
            </span>
            <img src={BRAND_LOGOS.symbol} alt="ALENIA" style={{ minWidth: '40px', maxWidth: '100px', maxHeight: '40px', height: '100%', width: 'fit-content', filter: 'drop-shadow(0 0 10px hsl(var(--pp-primary) / 0.8))' }} />
          </div>
        </section>

        {/* Sección Para Jugadores */}
        <section id="jugadores" className="pp-section">
          <div className="pp-container">
            <div className="pp-section-header">
              <h2 className="pp-section-title">Para jugadores apasionados</h2>
              <p className="pp-section-subtitle">
                Conectá con jugadores de tu nivel, mejorá tu juego y sumate a una comunidad activa
              </p>
            </div>

            <div className="pp-features-grid">
              <FeatureCard
                icon={<Target className="w-12 h-12" />}
                title="Desafíos de dobles"
                description="Armá un equipo con otro jugador y desafiá a otras duplas. Buscá rivales de tu mismo nivel, mandá propuestas de partido y recibí avisos al instante de cómo van tus desafíos."
                highlights={['Desafiá, reservá y sumá puntos', 'Búsqueda por nivel, ubicación y disponibilidad', 'Avisos al instante']}
              />

              <FeatureCard
                icon={<Trophy className="w-12 h-12" />}
                title="Puntos y ranking"
                description="Ganá puntos por cada victoria y mantené rachas ganadoras. Competí en rankings individuales y de dobles para mostrar tu nivel."
                highlights={['+5 pts por jugar', '+25 pts por victoria en dobles', 'Puntos extra por rachas']}
              />

              <FeatureCard
                icon={<Users className="w-12 h-12" />}
                title="Jugadores cerca"
                description="Encontrá jugadores de tu nivel y con tu disponibilidad cerca tuyo. La app te sugiere rivales parejos para que los partidos sean equilibrados."
                highlights={['Rivales según tu nivel', 'Filtro por disponibilidad y mapa de ubicación', 'Partidos equilibrados']}
              />

              <FeatureCard
                icon={<MessageCircle className="w-12 h-12" />}
                title="Muro de actividad"
                description="Compartí momentos y fotos de tus partidos con la comunidad. Reaccioná, comentá y mencioná a otros jugadores."
                highlights={['Publicaciones con fotos', 'Reacciones y comentarios', 'Menciones a jugadores']}
              />

              <FeatureCard
                icon={<UserPlus className="w-12 h-12" />}
                title="Equipos de dobles"
                description="Formá varios equipos de dobles, invitá jugadores y competí con estadísticas separadas. Cada equipo tiene su propio ranking e historial."
                highlights={['Varios equipos', 'Invitaciones a jugadores', 'Ranking de dobles']}
              />

              <FeatureCard
                icon={<Calendar className="w-12 h-12" />}
                title="Reserva de canchas"
                description="Un calendario con la disponibilidad al momento. Reservás al instante, con confirmación automática y recordatorios."
                highlights={['Vista mensual y semanal', 'Reserva al instante', 'Recordatorios automáticos']}
              />
            </div>
          </div>
        </section>

        {/* Sección Para Clubes */}
        <section id="clubes" className="pp-section">
          <div className="pp-container">
            <div className="pp-section-header">
              <h2 className="pp-section-title">Para clubes inteligentes</h2>
              <p className="pp-section-subtitle">
                Automatizá la gestión, fidelizá a tus clientes y armá una comunidad activa en tu club
              </p>
            </div>

            <div className="pp-features-grid">
              <FeatureCard
                icon={<Calendar className="w-12 h-12" />}
                title="Gestión de reservas"
                description="Todos los turnos de tus canchas en un calendario: ves qué está libre y ocupado, confirmás reservas al instante y el sistema les recuerda el turno a los jugadores. Menos llamados y menos canchas vacías."
                highlights={['Calendario para el club', 'Recordatorios automáticos', 'Control de ocupación']}
              />

              <FeatureCard
                icon={<Heart className="w-12 h-12" />}
                title="Fidelización de clientes"
                description="Los socios siguen al club, participan en rankings internos y se mantienen activos con puntos, logros y torneos exclusivos."
                highlights={['Seguidores del club', 'Rankings por club', 'Comunidad activa']}
              />

              <FeatureCard
                icon={<Sparkles className="w-12 h-12" />}
                title="Anuncios y promociones"
                description="Publicá novedades, promociones y eventos con un botón directo al perfil del club, y llegá a todos tus socios a la vez."
                highlights={['Anuncios destacados', 'Botón al perfil del club', 'Comunicación directa']}
              />

              <FeatureCard
                icon={<Trophy className="w-12 h-12" />}
                title="Torneos y competencias"
                description="Armá torneos cerrados para tus socios o abiertos a jugadores de cualquier club. Cuadros, partidos y resultados en un solo lugar."
                highlights={['Torneos cerrados o abiertos', 'Cuadros del torneo', 'Seguimiento de resultados']}
              />

              <FeatureCard
                icon={<Camera className="w-12 h-12" />}
                title="Galería y eventos"
                description="Subí fotos del club, de eventos y torneos. Mostrá tus instalaciones y atraé nuevos socios."
                highlights={['Galería de fotos', 'Eventos destacados', 'Vidriera del club']}
              />

              <FeatureCard
                icon={<TrendingUp className="w-12 h-12" />}
                title="Reportes del club"
                description="Ocupación por horario, socios más activos, horarios pico y cuánto participa tu comunidad, para decidir con datos."
                highlights={['Ocupación por horarios', 'Socios más activos', 'Participación de la comunidad']}
              />
            </div>
          </div>
        </section>

        {/* Sección de pantallas */}
        <section className="pp-section">
          <div className="pp-container">
            <div className="pp-section-header">
              <h2 className="pp-section-title">Explorá la plataforma</h2>
              <p className="pp-section-subtitle">
                Mirá cada función en detalle
              </p>
            </div>

            <ScreenShowcase
              icon={Home}
              title="Inicio y muro social"
              description="La pantalla principal muestra la actividad del club, las publicaciones de los jugadores y accesos rápidos a todo. Así seguís conectado con tu comunidad de pádel."
              features={[
                'Toda la actividad del club en un solo lugar',
                'Publicaciones de jugadores con fotos',
                'Equipos recién formados',
                'Acceso rápido a desafíos y reservas',
                'Avisos al instante',
                'Actividad a tu medida'
              ]}
              imageSrc="/images/playpadel/home1.png"
              imageAlt="Pantalla de inicio y muro social de Play Padel"
            />

            <ScreenShowcase
              icon={User}
              title="Perfil completo del jugador"
              description="Tu perfil con todas tus estadísticas, los equipos que armaste y tu historial de puntos. Seguí tu progreso y compartí tus logros con la comunidad."
              features={[
                'Estadísticas individuales y de dobles',
                'Todos los equipos que formaste',
                'Historial de puntos e insignias',
                'Tus días y horarios disponibles',
                'Foto de perfil',
                'Progreso visible para otros jugadores'
              ]}
              imageSrc="/images/playpadel/perfil1.png"
              imageAlt="Perfil de jugador"
              reverse
            />

            <ScreenShowcase
              icon={Target}
              title="Búsqueda y gestión de desafíos"
              description="Encontrá rivales para tu equipo de dobles. Filtrá por nivel, disponibilidad y club preferido para armar los mejores partidos."
              features={[
                'Búsqueda de equipos rivales',
                'Filtros por nivel de juego',
                'Disponibilidad por día de la semana',
                'Propuesta de fecha, hora y club',
                'Contrapropuestas',
                'Historial de desafíos enviados y recibidos'
              ]}
              imageSrc="/images/playpadel/desafio.png"
              imageAlt="Búsqueda de desafíos"
            />

            <ScreenShowcase
              icon={Trophy}
              title="Rankings y clasificación"
              description="Competí en varios rankings: individual, dobles y por club. Mirá tu posición al momento y compará tu progreso con otros jugadores."
              features={[
                'Ranking individual por puntos',
                'Ranking de equipos de dobles',
                'Clasificación por club',
                'Filtros por categoría y período',
                'Estadísticas de cada jugador',
                'Se actualiza al instante'
              ]}
              imageSrc="/images/playpadel/Ranking.png"
              imageAlt="Rankings de jugadores"
              reverse
            />

            <ScreenShowcase
              icon={Award}
              title="Puntos y logros"
              description="Seguí tu progreso: ganá puntos en cada partido, mantené rachas y desbloqueá insignias exclusivas."
              features={[
                'Puntos por victorias y por jugar',
                'Puntos extra por rachas ganadoras',
                'Historial de puntos',
                'Insignias desbloqueadas',
                'Progreso mensual y anual',
                'Comparación con otros jugadores'
              ]}
              imageSrc="/images/playpadel/puntos.png"
              imageAlt="Puntos y logros"
            />

            <ScreenShowcase
              icon={Calendar}
              title="Gestión de reservas"
              description="Para clubes: un panel con calendario, control de ocupación y recordatorios automáticos para aprovechar mejor cada cancha."
              features={[
                'Calendario para el club',
                'Todas las reservas en un lugar',
                'Filtros por fecha, cancha y jugador',
                'Recordatorios automáticos',
                'Cancelás o modificás en un toque',
                'Reportes de ocupación por horario'
              ]}
              imageSrc="/images/playpadel/gestionreservas.png"
              imageAlt="Gestión de reservas para clubes"
              reverse
            />
          </div>
        </section>

        {/* Sección de puntos y logros */}
        <section id="gamificacion" className="pp-section">
          <div className="pp-container">
            <div className="pp-section-header">
              <h2 className="pp-section-title">Puntos, logros y rankings</h2>
              <p className="pp-section-subtitle">
                Mantené a los jugadores motivados con puntos, insignias y rankings
              </p>
            </div>

            <div className="pp-badges-grid">
              <BadgeItem
                icon={Trophy}
                title="Primera victoria"
                description="Ganá tu primer partido"
              />
              <BadgeItem
                icon={Flame}
                title="Racha de 3"
                description="3 victorias seguidas"
              />
              <BadgeItem
                icon={Zap}
                title="Racha de 5"
                description="5 victorias seguidas"
              />
              <BadgeItem
                icon={Target}
                title="Veterano"
                description="10 partidos jugados"
              />
              <BadgeItem
                icon={Crown}
                title="Leyenda"
                description="50 partidos jugados"
              />
              <BadgeItem
                icon={Users}
                title="Dupla dinámica"
                description="Primera victoria en dobles"
              />
              <BadgeItem
                icon={HeartHandshake}
                title="Compañero leal"
                description="10 partidos con el mismo equipo"
              />
              <BadgeItem
                icon={Star}
                title="Estrella del club"
                description="Top 3 en el ranking del club"
              />
            </div>

            <div className="pp-features-grid" style={{ marginTop: '4rem' }}>
              <FeatureCard
                icon={<Award className="w-12 h-12" />}
                title="Puntos por partido"
                description="Sumás puntos en cada partido: +30 por victoria individual, +25 por dobles, +10 por jugar y puntos extra por rachas."
              />

              <FeatureCard
                icon={<Crown className="w-12 h-12" />}
                title="Varios rankings"
                description="Competí en ranking individual, de dobles y por club. Tablas que se actualizan al instante, con filtros por categoría."
              />

              <FeatureCard
                icon={<Flame className="w-12 h-12" />}
                title="Rachas y logros"
                description="Mantené rachas de victorias para sumar puntos extra y desbloquear insignias exclusivas que muestran tu progreso."
              />
            </div>
          </div>
        </section>

        {/* Sección de Tecnología */}
        <section className="pp-section">
          <div className="pp-container">
            <div className="pp-section-header">
              <h2 className="pp-section-title">Simple, rápida y segura</h2>
              <p className="pp-section-subtitle">
                Pensada para usarse fácil desde el celular, con tus datos protegidos
              </p>
            </div>

            <div className="pp-features-grid">
              <FeatureCard
                icon={<Smartphone className="w-12 h-12" />}
                title="Se instala como app"
                description="Se instala como app desde el navegador, sin pasar por la tienda. Funciona sin conexión y se sincroniza sola cuando volvés a tener señal."
              />

              <FeatureCard
                icon={<Zap className="w-12 h-12" />}
                title="Todo al instante"
                description="Avisos al momento, un muro que se actualiza solo y tus datos iguales en todos tus dispositivos."
              />

              <FeatureCard
                icon={<Shield className="w-12 h-12" />}
                title="Datos protegidos"
                description="Inicio de sesión seguro, datos protegidos por usuario e información cifrada: cada jugador ve solo lo que le corresponde."
              />
            </div>
          </div>
        </section>

        {/* Llamado final */}
        <section id="contacto" className="pp-cta-section">
          <div className="pp-container">
            <div className="pp-cta-content">
              <h2 className="pp-cta-title">¿Querés probar Play Padel en tu club?</h2>
              <p className="pp-cta-description">
                Sumate a Play Padel y descubrí una nueva forma de jugar, competir y gestionar tu club de pádel.
              </p>

              <div className="pp-hero-buttons">
                <Link to="/contacto" className="pp-cta-primary">
                  <MessageCircle className="w-5 h-5" />
                  Pedí una demo
                </Link>
                <Link to="/" className="pp-cta-secondary">
                  <ArrowRight className="w-5 h-5" />
                  Conocé más sobre ALENIA
                </Link>
              </div>

              <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <span
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--pp-primary)) 0%, hsl(var(--pp-accent)) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '1.1rem',
                    fontWeight: '800',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  Build By
                </span>
                <img
                  src={BRAND_LOGOS.lockupFull}
                  alt="ALENIA"
                  width={216}
                  height={108}
                  style={{
                    width: 'fit-content',
                    maxWidth: 'min(280px, 42vw)',
                    height: '48px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 15px hsl(var(--pp-primary) / 0.8))'
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Lista con viñeta de check (ícono de línea, color de acento de la página)
const CheckList = ({ items, className = '' }) => (
  <ul className={`pp-feature-list ${className}`}>
    {items.map((item, index) => (
      <li key={index}>
        <Check className="pp-check" strokeWidth={2} aria-hidden="true" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

// Componente FeatureCard
const FeatureCard = ({ icon, title, description, highlights = [] }) => (
  <div className="pp-feature-card">
    <div className="pp-feature-icon" style={{ color: 'hsl(var(--pp-primary))' }}>
      {icon}
    </div>
    <h3 className="pp-feature-title">{title}</h3>
    <p className="pp-feature-description">{description}</p>
    {highlights.length > 0 && <CheckList items={highlights} className="pp-feature-list--compact" />}
  </div>
);

// Componente ScreenShowcase
const ScreenShowcase = ({ icon: Icon, title, description, features, imageSrc, imageAlt, reverse = false }) => (
  <div className={`pp-screen-item ${reverse ? 'reverse' : ''}`}>
    <div className="pp-screen-content">
      <h3 className="pp-screen-title">
        {Icon && <Icon className="pp-screen-title-icon" strokeWidth={2} aria-hidden="true" />}
        <span>{title}</span>
      </h3>
      <p className="pp-screen-description">{description}</p>
      <CheckList items={features} />
    </div>
    <div className="pp-screen-image">
      <img src={imageSrc} alt={imageAlt} loading="lazy" />
    </div>
  </div>
);

// Componente BadgeItem
const BadgeItem = ({ icon: Icon, title, description }) => (
  <div className="pp-badge-item">
    <div className="pp-badge-icon">
      <Icon className="w-10 h-10" strokeWidth={2} aria-hidden="true" />
    </div>
    <div className="pp-badge-title">{title}</div>
    <div className="pp-badge-description">{description}</div>
  </div>
);

export default PlayPadelLanding;
