import { useState } from 'react';
import { Hash, Copy, Sparkles, TrendingUp, Target } from 'lucide-react';

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
    
    setTimeout(() => {
      const baseHashtags = hashtagDatabase[industry] || [];
      const topicWords = topic.toLowerCase().split(' ');
      
      const generatedHashtags = [
        ...baseHashtags,
        ...topicWords.map(word => `#${word}`),
        `#${topic.replace(/\s+/g, '').toLowerCase()}`,
        '#emprendimiento',
        '#negocio',
        '#exito',
        '#argentina',
        '#pyme',
        '#innovacion',
        '#crecimiento',
        '#oportunidad',
        '#resultados',
        '#profesional',
        '#calidad',
        '#servicio',
        '#cliente',
        '#marca'
      ];

      // Remover duplicados y limitar a 30
      const uniqueHashtags = [...new Set(generatedHashtags)].slice(0, 30);
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
    <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand">
      <div className="flex items-center gap-3 mb-6">
        <Hash className="w-8 h-8 text-brand-accent" />
        <h2 className="text-2xl font-bold text-brand-accent text-shadow-glow">Generador de Hashtags</h2>
      </div>
      <p className="text-slate-300 mb-8">
        Genera hashtags optimizados para tus publicaciones en redes sociales
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-brand-accent mb-2">
            Tema o Producto
          </label>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-accent" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ej: automatización con IA"
            className="w-full pl-10 pr-4 py-3 border border-brand rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-black/30 text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-accent mb-2">
            Industria
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-3 border border-brand rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-black/30 text-slate-100"
          >
            <option value="">Selecciona una industria</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <button
          onClick={generateHashtags}
          disabled={!topic || !industry || loading}
          className="w-full bg-brand-gradient glow-btn btn-black-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:text-slate-400"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generar Hashtags
            </>
          )}
        </button>

        {hashtags.length > 0 && (
          <div className="bg-black/40 rounded-lg p-6 border border-brand space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-black-bold text-shadow-glow">
                Hashtags Generados ({hashtags.length})
              </h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-brand-gradient glow-btn btn-black-bold px-4 py-2 rounded-lg transition-all duration-300"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copiado!' : 'Copiar Todo'}
              </button>
            </div>

            {/* Trending */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                Trending (Alta competencia)
              </h4>
            <div className="flex flex-wrap gap-2">
                {categories.trending.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-brand-gradient text-brand-secondary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-brand-accent hover:text-black transition-colors"
                    onClick={() => navigator.clipboard.writeText(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Niche */}
            <div>
              <h4 className="text-black-bold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                Nicho (Competencia media)
              </h4>
            <div className="flex flex-wrap gap-2">
                {categories.niche.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-brand-gradient text-brand-accent px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-brand-accent hover:text-black transition-colors"
                    onClick={() => navigator.clipboard.writeText(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* General */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Hash className="w-5 h-5 text-green-500" />
                Generales (Baja competencia)
              </h4>
            <div className="flex flex-wrap gap-2">
                {categories.general.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-brand-gradient text-slate-100 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-brand-accent hover:text-black transition-colors"
                    onClick={() => navigator.clipboard.writeText(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-brand-gradient border border-brand rounded-lg p-4">
              <p className="text-sm text-brand-secondary">
                <strong>💡 Tip:</strong> Usa una mezcla de hashtags trending, de nicho y generales. 
                Haz clic en cualquier hashtag para copiarlo individualmente.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}