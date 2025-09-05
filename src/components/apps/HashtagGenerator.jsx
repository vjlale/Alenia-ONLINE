import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Copy, Sparkles, TrendingUp, Target, Check } from 'lucide-react';

export default function HashtagGenerator() {
  const [topic, setTopic] = useState('');
  const [industry, setIndustry] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const industries = [
    'Marketing Digital', 'E-commerce', 'Fitness', 'Gastronomía', 'Moda',
    'Tecnología', 'Salud', 'Educación', 'Viajes', 'Inmobiliaria'
  ];

  const hashtagDatabase = {
    'Marketing Digital': ['#marketingdigital', '#seo', '#socialmedia', '#contentmarketing', '#digitalmarketing'],
    'E-commerce': ['#ecommerce', '#onlineshopping', '#retail', '#ventas', '#tiendaonline'],
    'Fitness': ['#fitness', '#gym', '#workout', '#health', '#motivation'],
    'Gastronomía': ['#food', '#restaurant', '#chef', '#cooking', '#foodie'],
    'Moda': ['#fashion', '#style', '#outfit', '#trends', '#moda'],
    'Tecnología': ['#tech', '#innovation', '#startup', '#ai', '#digital'],
    'Salud': ['#health', '#wellness', '#medicina', '#bienestar', '#salud'],
    'Educación': ['#education', '#learning', '#study', '#knowledge', '#educacion'],
    'Viajes': ['#travel', '#vacation', '#adventure', '#explore', '#viajes'],
    'Inmobiliaria': ['#realestate', '#property', '#home', '#investment', '#inmobiliaria']
  };

  const generateHashtags = () => {
    if (!topic || !industry) return;
    
    setLoading(true);
    setHashtags([]);
    
    setTimeout(() => {
      const baseHashtags = hashtagDatabase[industry] || [];
      const topicWords = topic.toLowerCase().split(' ').filter(w => w.length > 2);
      
      const generatedHashtags = [
        ...baseHashtags,
        ...topicWords.map(word => `#${word}`),
        `#${topic.replace(/\s+/g, '').toLowerCase()}`,
        '#emprendimiento', '#negociosonline', '#éxito', '#argentina', '#pymesargentinas',
        '#innovacion', '#crecimientoprofesional', '#marketingdecontenidos', '#estrategiadigital'
      ];

      const uniqueHashtags = [...new Set(generatedHashtags)].sort(() => 0.5 - Math.random()).slice(0, 30);
      setHashtags(uniqueHashtags);
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    const hashtagText = hashtags.join(' ');
    navigator.clipboard.writeText(hashtagText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getHashtagsByCategory = () => {
    const trending = hashtags.slice(0, 10);
    const niche = hashtags.slice(10, 20);
    const general = hashtags.slice(20, 30);
    
    return { trending, niche, general };
  };

  const categories = getHashtagsByCategory();

  return (
    <div className="bg-gradient-to-br from-slate-900 to-purple-900/70 rounded-2xl p-6 sm:p-8 border border-purple-700/50 shadow-2xl shadow-purple-500/10">
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <div className="bg-purple-900/50 p-3 rounded-full border border-purple-700">
          <Hash className="w-8 h-8 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Generador de Hashtags</h2>
          <p className="text-purple-300 text-sm sm:text-base">Potencia tu alcance en redes sociales.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Tema o Palabra Clave</label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400/70" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ej: Inteligencia Artificial"
                className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-900 text-white placeholder:text-slate-500 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Industria</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-900 text-white transition-all"
            >
              <option value="">Selecciona una industria</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={generateHashtags}
          disabled={!topic || !industry || loading}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 hover:shadow-purple-500/40"
        >
          {loading ? (
            <>
              <motion.div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></motion.div>
              Generando Magia...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generar Hashtags
            </>
          )}
        </button>

        {hashtags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/40 rounded-lg p-4 sm:p-6 border border-slate-700 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Resultados ({hashtags.length})</h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-purple-300 px-4 py-2 rounded-lg transition-all duration-300 text-sm"
              >
                {copied ? <><Check className="w-4 h-4 text-green-400" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar Todos</>}
              </button>
            </div>

            <div className="space-y-4">
              <HashtagCategory title="Populares" icon={<TrendingUp />} tags={categories.trending} color="pink" />
              <HashtagCategory title="De Nicho" icon={<Target />} tags={categories.niche} color="purple" />
              <HashtagCategory title="Generales" icon={<Hash />} tags={categories.general} color="indigo" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const HashtagCategory = ({ title, icon, tags, color }) => {
  const colors = {
    pink: "bg-pink-500/10 text-pink-400 hover:bg-pink-500/20",
    purple: "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20",
  }
  return (
    <div>
      <h4 className={`font-bold text-slate-300 mb-3 flex items-center gap-2 text-sm`}>
        {icon} {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${colors[color]}`}
            onClick={() => navigator.clipboard.writeText(tag)}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </div>
  )
}