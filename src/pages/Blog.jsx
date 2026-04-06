import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Tag, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { blogPosts, categories } from '../data/blogData';
import { Helmet } from 'react-helmet-async';
import SmartImage from '../components/common/SmartImage';
import ScrollReveal from '../components/common/ScrollReveal';
import Card3D from '../components/common/3DCard';

const BlogCard = ({ post, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link 
        to={`/blog/${post.slug}`} 
        className="block glass-card-hover rounded-3xl overflow-hidden group border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col shadow-xl hover:shadow-cyan-500/20 relative card-hover-lift"
      >
        {/* Imagen con efecto hover mejorado */}
        <div className="relative overflow-hidden">
            <SmartImage 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                width={640}
                height={360}
                imageSources={post.imageSources}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
            <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-cyan-500 to-purple-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                    {post.category}
                </span>
            </div>
        </div>
        
        {/* Contenido de la card */}
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white mb-4 flex-grow leading-tight group-hover:text-cyan-300 transition-colors">
                {post.title}
            </h3>
            
            <p className="text-slate-400 mb-6 text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
            </p>
            
            {/* Meta información */}
            <div className="flex items-center justify-between text-xs text-slate-500 mt-auto">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                    </span>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
        
        {/* Gradient overlay en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none" />
      </Link>
    </motion.div>
  );
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <>
    <Helmet>
        <title>Blog - IA, Automatización y Desarrollo | Alen.ia</title>
  <meta name="description" content="Contenido actualizado sobre IA, automatización, desarrollo web y estrategias digitales para hacer crecer tu negocio." />
  <link rel="canonical" href="https://alenia.online/blog" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://alenia.online/blog" />
  <meta property="og:title" content="Blog - IA, Automatización y Desarrollo | Alen.ia" />
  <meta property="og:description" content="Contenido actualizado sobre IA, automatización y desarrollo web para potenciar tu negocio." />
  <meta property="og:image" content="https://alenia.online/images/Alenia1.png" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://alenia.online/blog" />
  <meta property="twitter:title" content="Blog - IA, Automatización y Desarrollo | Alen.ia" />
  <meta property="twitter:description" content="Contenido actualizado sobre IA, automatización y desarrollo web para potenciar tu negocio." />
  <meta property="twitter:image" content="https://alenia.online/images/Alenia1.png" />
    </Helmet>
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-alenia-dark to-slate-900 bg-brand-primary py-20 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Blog de Alen.ia
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Contenido sobre IA, automatización y desarrollo para potenciar tu negocio.
            </p>
          </div>
        </ScrollReveal>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Barra de búsqueda mejorada */}
            <div className="relative flex-grow w-full lg:w-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artículos sobre IA, automatización, desarrollo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 text-white rounded-2xl border border-slate-700/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 placeholder-slate-400"
              />
            </div>
            
            {/* Filtros de categoría mejorados */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25' 
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-700/50 hover:border-slate-600'
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {featuredPost && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mb-16">
            <Link to={`/blog/${featuredPost.slug}`} className="block bg-slate-800/30 rounded-3xl p-8 md:p-12 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden">
                {/* Efecto de fondo */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center relative">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Tag className="w-6 h-6 text-cyan-400" />
                            <span className="text-base font-bold uppercase tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Artículo Destacado</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
                            {featuredPost.title}
                        </h2>
                        
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            {featuredPost.excerpt}
                        </p>
                        
                        {/* Meta información */}
                        <div className="flex items-center gap-6 text-sm text-slate-400 mb-8">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {featuredPost.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {featuredPost.readTime} min de lectura
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-cyan-400 font-bold text-lg">
                            <span>Leer artículo completo</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <SmartImage 
                            src={featuredPost.image} 
                            alt={featuredPost.title} 
                            className="relative w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl border border-slate-700/50 group-hover:scale-105 transition-transform duration-300" 
                            width={1280}
                            height={720}
                            imageSources={featuredPost.imageSources}
                        />
                    </div>
                </div>
            </Link>
          </motion.div>
        )}

        {/* Grid con masonry effect mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {filteredPosts.filter(p => !p.featured).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-slate-400">
            <h3 className="text-2xl font-bold text-white mb-4">No se encontraron artículos</h3>
            <p>Intenta ajustar los filtros o términos de búsqueda.</p>
          </motion.div>
        )}
      </div>
    </main>
    </>
  );
}