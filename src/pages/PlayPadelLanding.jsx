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
  UserPlus
} from 'lucide-react';
import '../styles/PlayPadelLanding.css';

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
        <title>Play Padel - La Plataforma #1 para Pádel | Desarrollado por Alen.iA</title>
        <link rel="canonical" href="https://alenia.online/play-padel" />
        <meta name="description" content="Descubre Play Padel: forma equipos de dobles, desafía otras duplas, gestiona tu club con reservas automáticas y fideliza clientes. Torneos, ranking, feed social y más." />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ALENIA" />
        <meta property="og:url" content="https://alenia.online/play-padel" />
        <meta property="og:title" content="Play Padel - La Plataforma #1 para Pádel" />
        <meta property="og:description" content="Forma equipos de dobles, desafía otras duplas, gestiona tu club con reservas automáticas y fideliza clientes." />
        <meta property="og:image" content="https://alenia.online/images/playpadel/650d36c51e390141790f6967b34abe4d8959e5465ed8a3b653d7114402f60ac0.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Play Padel - La Plataforma #1 para Pádel" />
        <meta name="twitter:description" content="Forma equipos de dobles, desafía otras duplas, gestiona tu club. La app definitiva para el mundo del pádel." />
        
        {/* Preload de fuentes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>
      
      <div className="play-padel-landing">
        {/* Header */}
        <header className="pp-header">
          <div className="pp-nav-container">
            <Link to="/" className="pp-back-button" aria-label="Volver al Inicio">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Volver al Inicio
            </Link>
            <nav>
              <ul className="pp-nav-menu">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#jugadores">Para Jugadores</a></li>
                <li><a href="#clubes">Para Clubes</a></li>
                <li><a href="#gamificacion">Gamificación</a></li>
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
                alt="Play Padel Logo" 
              />
            </div>
            
            <h1 className="pp-hero-title">
              La plataforma #1 para pádel
            </h1>
            
            <p className="pp-hero-subtitle">
              Forma equipos de dobles, desafía otras duplas de tu nivel, gestiona tu club con reservas automáticas y crea una comunidad activa con torneos y feed social.
            </p>
            
            <div className="pp-hero-buttons">
              <a href="#jugadores" className="pp-cta-primary">
                <Users className="w-5 h-5" />
                Para Jugadores
              </a>
              <a href="#clubes" className="pp-cta-secondary">
                <Calendar className="w-5 h-5" />
                Para Clubes
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
            <img src="/images/5-3.png" alt="Alen.iA" style={{ minWidth: '40px', maxWidth: '100px', maxHeight: '40px', height: '100%', width: 'fit-content', filter: 'drop-shadow(0 0 10px hsl(var(--pp-primary) / 0.8))' }} />
          </div>
        </section>

        {/* Sección Para Jugadores */}
        <section id="jugadores" className="pp-section">
          <div className="pp-container">
            <div className="pp-section-header">
              <h2 className="pp-section-title">Para Jugadores Apasionados</h2>
              <p className="pp-section-subtitle">
                Conecta con jugadores de tu nivel, mejora tu juego y forma parte de una comunidad activa
              </p>
            </div>

            <div className="pp-features-grid">
              <FeatureCard
                icon={<Target className="w-18 h-12" style={{ transform: 'rotate(90deg)', display: 'flex' }} />}
                title="Sistema de Desafíos de Dobles"
                description="Crea un equipo con otro jugador y desafía con tu equipo de dobles. Busca rivales del mismo nivel, envía propuestas de partidos y recibe notificaciones en tiempo real del estado de tus desafíos."
                highlights={['Desafiá, reservá y suma puntos', 'Búsqueda por nivel, ubicación y disponibilidad', 'Notificaciones en tiempo real']}
              />
              
              <FeatureCard
                icon={<Trophy className="w-12 h-12" />}
                title="Sistema de Puntos y Ranking"
                description="Gana puntos por cada victoria y mantén rachas ganadoras. Compite en rankings individuales y de dobles para demostrar tu nivel."
                highlights={['+5 pts por jugar', '+25 pts por victoria dobles', 'Bonus por rachas']}
              />
              
              <FeatureCard
                icon={<Users className="w-12 h-12" />}
                title="Jugadores Cerca"
                description="Encuentra jugadores de tu nivel y disponibilidad cerca tuyo. Algoritmo inteligente que garantiza partidos equilibrados y competitivos."
                highlights={['Matching por nivel', 'Filtrado por disponibilidad y mapa de ubicación', 'Partidos equilibrados']}
              />
              
              <FeatureCard
                icon={<MessageCircle className="w-12 h-12" />}
                title="Feed de Actividades"
                description="Comparte momentos, fotos de partidos y conecta con la comunidad. Reacciona, comenta y menciona a otros jugadores en un feed social dinámico."
                highlights={['Posts con fotos', 'Reacciones y comentarios', 'Menciones a jugadores']}
              />
              
              <FeatureCard
                icon={<UserPlus className="w-12 h-12" />}
                title="Equipos de Dobles"
                description="Forma múltiples equipos de dobles, invita jugadores y compite con estadísticas separadas. Cada equipo tiene su propio ranking y historial."
                highlights={['Múltiples equipos', 'Invitaciones a jugadores', 'Ranking de dobles']}
              />
              
              <FeatureCard
                icon={<Calendar className="w-12 h-12" />}
                title="Reserva de Canchas"
                description="Vista de calendario completa con disponibilidad en tiempo real. Reserva instantánea con confirmación automática y recordatorios."
                highlights={['Vista mensual/semanal', 'Reserva instantánea', 'Recordatorios automáticos']}
              />
            </div>
          </div>
        </section>

        {/* Sección Para Clubes */}
        <section id="clubes" className="pp-section">
          <div className="pp-container">
            <div className="pp-section-header">
              <h2 className="pp-section-title">Para Clubes Inteligentes</h2>
              <p className="pp-section-subtitle">
                Automatiza la gestión, fideliza clientes y crea una comunidad activa en tu club
              </p>
            </div>

            <div className="pp-features-grid">
              <FeatureCard
                icon={<Calendar className="w-12 h-12" />}
                title="Gestión de Reservas"
                description="Crea un equipo con otro jugador y desafía a otros jugadores. Busca rivales del mismo nivel, envía propuestas de partidos, recibe notificaciones en tiempo real del estado de tus desafíos y genera una RESERVA en tu club favorito."
                highlights={['Vista calendario admin', 'Recordatorios automáticos', 'Control de ocupación']}
              />
              
              <FeatureCard
                icon={<Heart className="w-12 h-12" />}
                title="Fidelización de Clientes"
                description="Los miembros siguen el club, participan en rankings internos y se mantienen activos con el sistema de gamificación y torneos exclusivos."
                highlights={['Sistema de seguidores', 'Rankings por club', 'Comunidad activa']}
              />
              
              <FeatureCard
                icon={<Sparkles className="w-12 h-12" />}
                title="Anuncios y Promociones"
                description="Publica novedades, promociones y eventos con CTA directo al perfil del club. Comunicación efectiva con todos los miembros."
                highlights={['Anuncios destacados', 'CTA a perfil del club', 'Comunicación directa']}
              />
              
              <FeatureCard
                icon={<Trophy className="w-12 h-12" />}
                title="Torneos y Competencias"
                description="Crea torneos cerrados para miembros del club o abiertos a jugadores de cualquier club. Gestión completa de brackets y resultados."
                highlights={['Torneos cerrados/abiertos', 'Gestión de brackets', 'Seguimiento de resultados']}
              />
              
              <FeatureCard
                icon={<Camera className="w-12 h-12" />}
                title="Galería y Eventos"
                description="Sube fotos del club, eventos y torneos. Muestra las instalaciones y crea contenido que atraiga nuevos miembros."
                highlights={['Galería de fotos', 'Eventos destacados', 'Showcase del club']}
              />
              
              <FeatureCard
                icon={<TrendingUp className="w-12 h-12" />}
                title="Analytics y Reportes"
                description="Análisis completo de ocupación, miembros más activos, horarios pico y métricas de engagement para optimizar la gestión."
                highlights={['Ocupación por horarios', 'Miembros activos', 'Métricas de engagement']}
              />
            </div>
          </div>
        </section>

        {/* Sección de Screenshots */}
        <section className="pp-section">
          <div className="pp-container">
            <div className="pp-section-header">
              <h2 className="pp-section-title">Explora la Plataforma</h2>
              <p className="pp-section-subtitle">
                Descubre cada funcionalidad en detalle
              </p>
            </div>

            <ScreenShowcase 
              title="🏠 Feed Social y Home"
              description="Pantalla principal con actividad del club, publicaciones de jugadores y acceso rápido a todas las funcionalidades. Mantente conectado con tu comunidad de pádel."
              features={[
                'Feed unificado con actividad del club',
                'Publicaciones de usuarios con fotos',
                'Equipos recién formados',
                'Acceso rápido a desafíos y reservas',
                'Notificaciones en tiempo real',
                'Timeline personalizado'
              ]}
              imageSrc="/images/playpadel/home1.png"
              imageAlt="Home y Feed Social Play Padel"
            />

            <ScreenShowcase 
              title="👤 Perfil Completo del Jugador"
              description="Perfil personalizado con todas las estadísticas, equipos formados y historial de puntos. Sigue tu progreso y comparte tus logros con la comunidad."
              features={[
                'Estadísticas individuales y de dobles',
                'Lista de todos tus equipos formados',
                'Historial de puntos y badges',
                'Configuración de disponibilidad',
                'Foto de perfil personalizada',
                'Progreso visible para otros jugadores'
              ]}
              imageSrc="/images/playpadel/perfil1.png"
              imageAlt="Perfil de Jugador"
              reverse
            />

            <ScreenShowcase 
              title="🎯 Búsqueda y Gestión de Desafíos"
              description="Encuentra rivales perfectos para tu equipo de dobles. Filtra por nivel, disponibilidad y club preferido para encontrar los mejores partidos."
              features={[
                'Búsqueda inteligente de equipos rivales',
                'Filtros por nivel de juego',
                'Disponibilidad por días de la semana',
                'Propuesta de fecha, hora y club',
                'Sistema de contrapropuestas',
                'Historial de desafíos enviados y recibidos'
              ]}
              imageSrc="/images/playpadel/desafio.png"
              imageAlt="Búsqueda de Desafíos"
            />

            <ScreenShowcase 
              title="🏆 Rankings y Clasificación"
              description="Compite en múltiples rankings: individual, dobles y por club. Ve tu posición en tiempo real y compara tu progreso con otros jugadores."
              features={[
                'Ranking individual por puntos',
                'Ranking de equipos de dobles',
                'Clasificación por club',
                'Filtros por categoría y tiempo',
                'Estadísticas detalladas de cada jugador',
                'Actualizaciones en tiempo real'
              ]}
              imageSrc="/images/playpadel/Ranking.png"
              imageAlt="Sistema de Rankings"
              reverse
            />

            <ScreenShowcase 
              title="🎮 Sistema de Puntos y Logros"
              description="Sigue tu progreso con el sistema de gamificación. Gana puntos por cada partido, mantén rachas y desbloquea badges exclusivos."
              features={[
                'Puntos por victorias y participación',
                'Bonus por rachas ganadoras',
                'Historial detallado de puntos',
                'Badges desbloqueados',
                'Progreso mensual y anual',
                'Comparación con otros jugadores'
              ]}
              imageSrc="/images/playpadel/puntos.png"
              imageAlt="Sistema de Puntos"
            />

            <ScreenShowcase 
              title="📅 Gestión de Reservas"
              description="Para clubes: panel completo de gestión de reservas con vista calendario, control de ocupación y notificaciones automáticas para optimizar el uso de canchas."
              features={[
                'Vista calendario administrativo',
                'Gestión de todas las reservas',
                'Filtros por fecha, cancha y usuario',
                'Notificaciones automáticas de recordatorio',
                'Cancelación y modificación fácil',
                'Reportes de ocupación por horarios'
              ]}
              imageSrc="/images/playpadel/gestionreservas.png"
              imageAlt="Gestión de Reservas para Clubes"
              reverse
            />
          </div>
        </section>

        {/* Sección de Gamificación */}
        <section id="gamificacion" className="pp-section">
          <div className="pp-container">
            <div className="pp-section-header">
              <h2 className="pp-section-title">Sistema de Gamificación</h2>
              <p className="pp-section-subtitle">
                Mantén a los jugadores motivados con puntos, badges y rankings competitivos
              </p>
            </div>

            <div className="pp-badges-grid">
              <BadgeItem 
                icon="🏆"
                title="Primera Victoria"
                description="Gana tu primer partido"
              />
              <BadgeItem 
                icon="🔥"
                title="Racha de 3"
                description="3 victorias consecutivas"
              />
              <BadgeItem 
                icon="⚡"
                title="Racha de 5"
                description="5 victorias consecutivas"
              />
              <BadgeItem 
                icon="🎯"
                title="Veterano"
                description="10 partidos jugados"
              />
              <BadgeItem 
                icon="👑"
                title="Leyenda"
                description="50 partidos jugados"
              />
              <BadgeItem 
                icon="👥"
                title="Dupla Dinámica"
                description="Primera victoria en dobles"
              />
              <BadgeItem 
                icon="🤝"
                title="Compañero Leal"
                description="10 partidos con el mismo equipo"
              />
              <BadgeItem 
                icon="🌟"
                title="Estrella del Club"
                description="Top 3 en ranking del club"
              />
            </div>

            <div className="pp-features-grid" style={{ marginTop: '4rem' }}>
              <FeatureCard
                icon={<Award className="w-12 h-12" />}
                title="Sistema de Puntos"
                description="Gana puntos por cada acción: +30 por victoria individual, +25 por dobles, +10 por participación y bonus especiales por rachas."
              />
              
              <FeatureCard
                icon={<Crown className="w-12 h-12" />}
                title="Rankings Múltiples"
                description="Compite en ranking individual, de dobles y por club. Tablas actualizadas en tiempo real con filtros por categoría."
              />
              
              <FeatureCard
                icon={<Flame className="w-12 h-12" />}
                title="Rachas y Logros"
                description="Mantén rachas de victorias para obtener puntos bonus y desbloquear badges exclusivos que demuestran tu progreso."
              />
            </div>
          </div>
        </section>

        {/* Sección de Tecnología */}
        <section className="pp-section">
          <div className="pp-container">
            <div className="pp-section-header">
              <h2 className="pp-section-title">Tecnología de Vanguardia</h2>
              <p className="pp-section-subtitle">
                Construida con las mejores tecnologías para una experiencia superior
              </p>
            </div>

            <div className="pp-features-grid">
              <FeatureCard
                icon={<Smartphone className="w-12 h-12" />}
                title="PWA Instalable"
                description="Instala la app desde el navegador y úsala como una aplicación nativa. Funciona offline y se sincroniza automáticamente."
              />
              
              <FeatureCard
                icon={<Zap className="w-12 h-12" />}
                title="Tiempo Real"
                description="Notificaciones instantáneas, actualizaciones live del feed social y sincronización automática entre dispositivos."
              />
              
              <FeatureCard
                icon={<Shield className="w-12 h-12" />}
                title="Seguridad Avanzada"
                description="Autenticación segura, Row Level Security (RLS) y encriptación end-to-end para proteger todos los datos."
              />
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section id="contacto" className="pp-cta-section">
          <div className="pp-container">
            <div className="pp-cta-content">
              <h2 className="pp-cta-title">¿Listo para revolucionar tu experiencia con el pádel?</h2>
              <p className="pp-cta-description">
                Únete a la comunidad de Play Padel y descubre una nueva forma de jugar, competir y gestionar tu club de pádel.
              </p>
              
              <div className="pp-hero-buttons">
                <Link to="/contacto" className="pp-cta-primary">
                  <MessageCircle className="w-5 h-5" />
                  Contactar para Demo
                </Link>
                <Link to="/" className="pp-cta-secondary">
                  <ArrowRight className="w-5 h-5" />
                  Conocer más sobre Alen.iA
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
                    fontFamily: 'Montserrat, sans-serif',
                    position: 'absolute',
                    left: '171px',
                    top: '596px'
                  }}
                >
                  Build By
                </span>
                <img 
                  src="/images/5-3.png" 
                  alt="Alen.iA Logo" 
                  style={{ 
                    width: 'fit-content', 
                    height: '48px', 
                    filter: 'drop-shadow(0 0 15px hsl(var(--pp-primary) / 0.8))',
                    position: 'absolute',
                    left: '283px',
                    top: '584px'
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

// Componente FeatureCard
const FeatureCard = ({ icon, title, description, highlights = [] }) => (
  <div className="pp-feature-card">
    <div className="pp-feature-icon" style={{ color: 'hsl(var(--pp-primary))' }}>
      {icon}
    </div>
    <h3 className="pp-feature-title">{title}</h3>
    <p className="pp-feature-description">{description}</p>
    {highlights.length > 0 && (
      <ul className="pp-feature-list" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        {highlights.map((highlight, index) => (
          <li key={index} style={{ color: 'hsl(var(--pp-foreground))', fontSize: '0.85rem' }}>
            {highlight}
          </li>
        ))}
      </ul>
    )}
  </div>
);

// Componente ScreenShowcase
const ScreenShowcase = ({ title, description, features, imageSrc, imageAlt, reverse = false }) => (
  <div className={`pp-screen-item ${reverse ? 'reverse' : ''}`}>
    <div className="pp-screen-content">
      <h3 className="pp-screen-title">{title}</h3>
      <p className="pp-screen-description">{description}</p>
      <ul className="pp-feature-list">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
    <div className="pp-screen-image">
      <img src={imageSrc} alt={imageAlt} />
    </div>
  </div>
);

// Componente BadgeItem
const BadgeItem = ({ icon, title, description }) => (
  <div className="pp-badge-item">
    <div className="pp-badge-icon">{icon}</div>
    <div className="pp-badge-title">{title}</div>
    <div className="pp-badge-description">{description}</div>
  </div>
);

export default PlayPadelLanding;
