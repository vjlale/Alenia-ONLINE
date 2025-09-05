import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, Share2, Bookmark, Eye, ArrowLeft } from 'lucide-react';
import RelatedPosts from './RelatedPosts';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ post, allPosts, onBack, onPostClick }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-alenia-dark to-slate-900">
      <article className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-cyan-400 mb-8 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al blog</span>
          </button>
          
          {/* Meta info with elegant design */}
          <div className="flex items-center gap-6 text-sm text-slate-400 mb-8">
            <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-full">
              <Calendar className="w-4 h-4 text-cyan-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-full">
              <Clock className="w-4 h-4 text-purple-400" />
              {post.readTime} min de lectura
            </span>
            <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-full">
              <Eye className="w-4 h-4 text-pink-400" />
              2.5k visualizaciones
            </span>
          </div>

          {/* Title with gradient */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {post.title}
            </span>
          </h1>

          {/* Author and actions */}
          <div className="flex items-center justify-between mb-8 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-4">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 rounded-full text-sm font-medium text-white">
                {post.category}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div>
                  <div className="text-base font-medium text-white">Alejandro Almada</div>
                  <div className="text-sm text-cyan-400">CEO & Fundador de ALENIA</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-3 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 rounded-xl transition-all duration-300">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 text-slate-400 hover:text-purple-400 hover:bg-slate-700/50 rounded-xl transition-all duration-300">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Image with enhanced styling */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            <img 
              src={post.image} 
              alt={post.title}
              className="relative w-full h-64 md:h-96 object-cover rounded-3xl shadow-2xl border border-slate-700/50"
            />
          </motion.div>
        )}

        {/* Content with improved typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="prose prose-lg prose-invert max-w-none"
        >
          {post.content ? (
            <div className="blog-content">
              <ReactMarkdown 
                components={{
                  h2: ({children}) => (
                    <h2 className="text-3xl font-bold text-white mb-6 mt-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {children}
                    </h2>
                  ),
                  h3: ({children}) => (
                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">
                      {children}
                    </h3>
                  ),
                  p: ({children}) => (
                    <p className="text-lg text-slate-300 leading-relaxed mb-6 text-justify">
                      {children}
                    </p>
                  ),
                  ul: ({children}) => (
                    <ul className="space-y-3 mb-8">
                      {children}
                    </ul>
                  ),
                  li: ({children}) => (
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-slate-300 text-lg leading-relaxed">{children}</span>
                    </li>
                  ),
                  strong: ({children}) => (
                    <strong className="text-cyan-400 font-bold">{children}</strong>
                  ),
                  blockquote: ({children}) => (
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-l-4 border-gradient-to-b from-cyan-400 to-purple-500 rounded-r-xl p-6 mb-8 my-8">
                      <div className="text-slate-200">{children}</div>
                    </div>
                  )
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          ) : (
          <>
            <p className="text-xl text-slate-300 leading-relaxed mb-12 text-justify">
              {post.excerpt}
            </p>
            
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              ¿Por qué es importante este tema?
            </h2>
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed text-justify">
              En el mundo empresarial actual, la tecnología juega un papel fundamental en el éxito de cualquier organización. 
              Las empresas que no se adaptan a las nuevas tecnologías corren el riesgo de quedarse atrás en un mercado cada vez más competitivo.
            </p>
            
            <h3 className="text-2xl font-bold text-white mb-6 mt-12">
              Beneficios clave
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300 text-lg">Aumento de la eficiencia operativa</span>
                </div>
              </div>
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300 text-lg">Reducción de costos operativos</span>
                </div>
              </div>
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300 text-lg">Mejora en la experiencia del cliente</span>
                </div>
              </div>
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300 text-lg">Ventaja competitiva en el mercado</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
              <div className="relative">
                <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">💡</span>
                  Consejo de ALENIA
                </h4>
                <p className="text-lg text-slate-300 leading-relaxed">
                  La implementación de nuevas tecnologías debe ser un proceso gradual y bien planificado. 
                  Comienza con proyectos piloto antes de escalar a toda la organización.
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-8 mt-12">
              Implementación paso a paso
            </h3>
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed text-justify">
              Para implementar exitosamente esta solución en tu empresa, sigue estos pasos fundamentales:
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-6 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-white mb-3 text-xl">Evaluación inicial</h4>
                  <p className="text-slate-300 text-lg leading-relaxed">Analiza tus procesos actuales e identifica áreas de mejora</p>
                </div>
              </div>
              <div className="flex items-start gap-6 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-white mb-3 text-xl">Planificación estratégica</h4>
                  <p className="text-slate-300 text-lg leading-relaxed">Define objetivos claros y establece métricas de éxito</p>
                </div>
              </div>
              <div className="flex items-start gap-6 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                <span className="bg-gradient-to-r from-pink-400 to-cyan-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-white mb-3 text-xl">Implementación gradual</h4>
                  <p className="text-slate-300 text-lg leading-relaxed">Comienza con un departamento o proceso específico</p>
                </div>
              </div>
              <div className="flex items-start gap-6 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                <span className="bg-gradient-to-r from-cyan-500 to-purple-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">4</span>
                <div>
                  <h4 className="font-bold text-white mb-3 text-xl">Monitoreo y optimización</h4>
                  <p className="text-slate-300 text-lg leading-relaxed">Evalúa resultados y ajusta la estrategia según sea necesario</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-8 mb-12 border border-cyan-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
              <div className="relative">
                <h4 className="text-2xl font-bold text-white mb-4">
                  ¿Necesitas ayuda para implementar esta solución?
                </h4>
                <p className="text-lg text-slate-200 mb-6 leading-relaxed">
                  Nuestro equipo de expertos está listo para ayudarte a transformar tu empresa con las mejores tecnologías.
                </p>
                <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                  Agendar consultoría gratuita
                </button>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-6 mt-12">
              Conclusión
            </h3>
            
            <p className="text-lg text-slate-300 leading-relaxed text-justify">
              La implementación de tecnologías modernas no es solo una opción, sino una necesidad para las empresas 
              que quieren mantenerse competitivas en el mercado actual. Con la estrategia correcta y el apoyo adecuado, 
              cualquier empresa puede transformar sus operaciones y alcanzar nuevos niveles de éxito.
            </p>
          </>
        )}
      </motion.div>

      {/* Related Posts */}
      <div className="mt-16">
        <RelatedPosts posts={allPosts} currentPostId={post.id} onPostClick={onPostClick} />
      </div>
    </article>
  </div>
  );
}