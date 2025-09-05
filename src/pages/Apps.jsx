import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, Zap, TrendingUp, Calculator, BarChart3, Hash, Bot, Star, Clock, Users, Palette } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppsStats from '../components/apps/AppsStats';
import { Helmet } from 'react-helmet-async';

// Mapeo estático de colores para evitar purga de Tailwind en clases dinámicas
const colorStyles = {
  green: 'bg-green-500/10 text-green-300 ring-1 ring-green-400/20',
  blue: 'bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20',
  purple: 'bg-purple-500/10 text-purple-300 ring-1 ring-purple-400/20',
  orange: 'bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/20',
  teal: 'bg-teal-500/10 text-teal-300 ring-1 ring-teal-400/20',
  yellow: 'bg-yellow-500/10 text-yellow-300 ring-1 ring-yellow-400/20',
};

const apps = [
  {
    id: 1,
    name: 'E-pix Editor',
    description: 'Editor de imágenes con IA avanzada. Crea, edita y mejora tus imágenes con herramientas de inteligencia artificial.',
    category: 'Inteligencia Artificial',
    difficulty: 'Intermedio',
    timeToComplete: '10 min',
    rating: 4.9,
    users: '5.2k',
    icon: <Palette className="w-8 h-8" />,
    color: 'purple',
    features: ['Edición con IA', 'Generación de imágenes', 'Filtros inteligentes', 'Herramientas creativas'],
    link: 'https://e-pix.alenia.online',
    featured: true,
    external: true
  },
  {
    id: 2,
    name: 'Calculadora de ROI',
    description: 'Calcula el retorno de inversión de tus campañas y proyectos con precisión matemática.',
    category: 'Análisis',
    difficulty: 'Fácil',
    timeToComplete: '5 min',
    rating: 4.8,
    users: '2.5k',
    icon: <Calculator className="w-8 h-8" />,
    color: 'green',
    features: ['Cálculos automáticos', 'Reportes detallados', 'Comparativas'],
    link: '/apps/calculadora-roi'
  },
  {
    id: 3,
    name: 'Analizador de Competencia',
    description: 'Compara tu negocio con la competencia usando inteligencia artificial avanzada.',
    category: 'Inteligencia Artificial',
    difficulty: 'Intermedio',
    timeToComplete: '15 min',
    rating: 4.9,
    users: '1.8k',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'blue',
    features: ['Análisis de mercado', 'Benchmarking', 'Recomendaciones IA'],
    link: '/apps/analizador-competencia'
  },
  {
    id: 4,
    name: 'Generador de Hashtags',
    description: 'Obtén hashtags relevantes y optimizados para maximizar el alcance de tus publicaciones.',
    category: 'Marketing',
    difficulty: 'Fácil',
    timeToComplete: '3 min',
    rating: 4.7,
    users: '3.2k',
    icon: <Hash className="w-8 h-8" />,
    color: 'purple',
    features: ['Hashtags trending', 'Análisis de popularidad', 'Categorización'],
    link: '/apps/generador-hashtags'
  },
  {
    id: 5,
    name: 'Simulador de Automatizaciones',
    description: 'Visualiza y prueba automatizaciones para optimizar los procesos de tu empresa.',
    category: 'Automatización',
    difficulty: 'Avanzado',
    timeToComplete: '20 min',
    rating: 4.6,
    users: '950',
    icon: <Bot className="w-8 h-8" />,
    color: 'orange',
    features: ['Simulaciones 3D', 'Flujos personalizados', 'Métricas en tiempo real'],
    link: '/apps/simulador-automatizaciones'
  },
  {
    id: 6,
    name: 'Optimizador de SEO',
    description: 'Mejora el posicionamiento de tu sitio web con análisis SEO inteligente.',
    category: 'SEO',
    difficulty: 'Intermedio',
    timeToComplete: '12 min',
    rating: 4.5,
    users: '1.5k',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'teal',
    features: ['Análisis de palabras clave', 'Auditoría técnica', 'Sugerencias de mejora'],
    link: '/apps/optimizador-seo'
  },
  {
    id: 7,
    name: 'Gestor de Campañas',
    description: 'Crea y gestiona campañas de marketing multicanal desde una sola plataforma.',
    category: 'Marketing',
    difficulty: 'Intermedio',
    timeToComplete: '18 min',
    rating: 4.4,
    users: '1.2k',
    icon: <Zap className="w-8 h-8" />,
    color: 'yellow',
    features: ['Multiplataforma', 'Analytics integrado', 'Automatización'],
    link: '/apps/gestor-campanas'
  }
];

const categories = [
  'Todas',
  'Análisis',
  'Inteligencia Artificial',
  'Marketing',
  'Automatización',
  'SEO'
];

const difficulties = [
  'Todas',
  'Fácil',
  'Intermedio',
  'Avanzado'
];

export default function Apps() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = apps.filter(app => {
    const matchesCategory = selectedCategory === 'Todas' || app.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'Todas' || app.difficulty === selectedDifficulty;
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const featuredApp = apps.find(app => app.featured);

  return (
    <>
      <Helmet>
        <title>Apps con IA gratuitas e interactivas | Alen.ia</title>
        <meta name="description" content="Explora nuestras apps gratuitas con IA: Calculadora de ROI, Analizador de Competencia, Generador de Hashtags y más." />
        <link rel="canonical" href="https://alenia.online/apps" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alenia.online/apps" />
        <meta property="og:title" content="Apps con IA gratuitas e interactivas | Alen.ia" />
        <meta property="og:description" content="Herramientas prácticas con IA para análisis, marketing y automatización." />
        <meta property="og:image" content="https://alenia.online/images/Alenia1.png" />
        <meta property="og:image:alt" content="ALENIA - Resultados con Inteligencia" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://alenia.online/apps" />
        <meta property="twitter:title" content="Apps con IA gratuitas e interactivas | Alen.ia" />
        <meta property="twitter:description" content="Herramientas prácticas con IA para análisis, marketing y automatización." />
        <meta property="twitter:image" content="https://alenia.online/images/Alenia1.png" />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-alenia-dark to-slate-900 bg-brand-primary py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 mb-6 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-btn">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Apps y Herramientas
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Soluciones digitales inteligentes para potenciar tu negocio y optimizar tus procesos
          </p>
        </motion.div>

        {/* Apps Stats */}
        {/* Eliminado AppsStats */}
        
        {/* Search and Filters */}
        {/* Eliminado buscador y filtros */}
        
        {/* Featured App */}
        {featuredApp && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <div className="bg-brand-primary rounded-2xl p-6 sm:p-8 md:p-12 box-shadow-card glow-btn border border-brand text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-500 px-3 py-1 rounded-full text-xs font-medium">
                  Destacada
                </span>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{featuredApp.rating}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${colorStyles[featuredApp.color] || ''}`}>
                    {featuredApp.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-cyan-400">{featuredApp.name}</h2>
                  <p className="text-base sm:text-lg text-slate-300 mb-6 max-w-2xl">
                    {featuredApp.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 text-sm">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredApp.timeToComplete}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {featuredApp.users} usuarios
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                      {featuredApp.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredApp.features.map((feature, index) => (
                      <span key={index} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                  {featuredApp.external ? (
                    <a 
                      href={featuredApp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      Probar herramienta
                      <Zap className="w-5 h-5" />
                    </a>
                  ) : (
                    <Link 
                      to={featuredApp.link}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      Probar herramienta
                      <Zap className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.filter(app => !app.featured).map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-brand-primary rounded-2xl box-shadow-card glow-btn border border-brand transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorStyles[app.color] || ''}`}>
                    {app.icon}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{app.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3 group-hover:text-green-400 transition-colors">
                  {app.name}
                </h3>
                <p className="text-slate-300 mb-4 line-clamp-3">
                  {app.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {app.timeToComplete}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {app.users}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    app.difficulty === 'Fácil' ? 'bg-green-600 text-white' :
                    app.difficulty === 'Intermedio' ? 'bg-yellow-600 text-white' :
                    app.difficulty === 'Avanzado' ? 'bg-red-600 text-white' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {app.difficulty}
                  </span>
                  {app.external ? (
                    <a 
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm w-full sm:w-auto text-center"
                    >
                      Probar
                    </a>
                  ) : (
                    <Link 
                      to={app.link}
                      className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm w-full sm:w-auto text-center"
                    >
                      Probar
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredApps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-4">No se encontraron herramientas</h3>
              <p className="text-lg opacity-80">
                Intenta ajustar los filtros o términos de búsqueda
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-brand-gradient rounded-2xl p-8 md:p-12 text-center box-shadow-card border border-brand"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            ¿Necesitas una herramienta personalizada?
          </h3>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            Nuestro equipo puede desarrollar herramientas específicas para las necesidades únicas de tu empresa.
          </p>
          <Link 
            to="/contacto"
            className="bg-brand-accent btn-black-bold px-8 py-3 rounded-lg glow-btn box-shadow-card border border-brand hover:bg-brand-gradient transition-colors inline-flex items-center gap-2"
          >
            Solicitar herramienta personalizada
            <Zap className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </main>
    </>
  );
}
