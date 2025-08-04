import { useState } from 'react';
import { Search, TrendingUp, Users, Globe, AlertCircle, CheckCircle } from 'lucide-react';

export default function CompetitorAnalyzer() {
  const [website, setWebsite] = useState('');
  const [competitor, setCompetitor] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeCompetitor = () => {
    if (!website || !competitor) return;
    
    setLoading(true);
    
    // Simulación de análisis
    setTimeout(() => {
      const mockAnalysis = {
        website: website,
        competitor: competitor,
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        metrics: {
          seo: Math.floor(Math.random() * 30) + 70,
          performance: Math.floor(Math.random() * 25) + 75,
          social: Math.floor(Math.random() * 35) + 65,
          content: Math.floor(Math.random() * 20) + 80
        },
        recommendations: [
          'Mejorar velocidad de carga de la página',
          'Optimizar meta descripciones para SEO',
          'Aumentar frecuencia de publicaciones en redes sociales',
          'Implementar blog con contenido relevante',
          'Mejorar estructura de enlaces internos'
        ],
        strengths: [
          'Buen posicionamiento en palabras clave principales',
          'Diseño responsive optimizado',
          'Contenido de calidad en página principal'
        ],
        weaknesses: [
          'Falta de presencia en redes sociales',
          'Tiempo de carga lento en móviles',
          'Pocas reseñas de clientes'
        ]
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand">
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-8 h-8 text-brand-accent" />
        <h2 className="text-2xl font-bold text-white text-shadow-glow">Analizador de Competencia</h2>
      </div>
      <p className="text-slate-300 mb-8">
        Compara tu sitio web con la competencia usando IA para obtener insights valiosos
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">
            Tu Sitio Web
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-accent" />
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://tuempresa.com"
            className="w-full pl-10 pr-4 py-3 border border-brand rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-black/30 text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">
            Competidor a Analizar
          </label>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-accent" />
            <input
              type="url"
              value={competitor}
              onChange={(e) => setCompetitor(e.target.value)}
              placeholder="https://competidor.com"
            className="w-full pl-10 pr-4 py-3 border border-brand rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-black/30 text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          onClick={analyzeCompetitor}
          disabled={!website || !competitor || loading}
          className="w-full bg-brand-gradient glow-btn btn-cyan-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:text-slate-400"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Analizando...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analizar Competencia
            </>
          )}
        </button>

        {analysis && (
          <div className="bg-black/40 rounded-lg p-6 border border-brand space-y-6">
            <div className="text-center">
              <h3 className="text-lg text-white-bold text-shadow-glow mb-2">Análisis Completado</h3>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gradient btn-white-bold">
                <span className="text-2xl font-bold text-white-brand-secondary">
                  {analysis.score}/100
                </span>
                <span className="text-sm text-slate-100">Puntuación General</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(analysis.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-xl font-bold text-blue-200">{value}%</div>
                  <div className="text-sm text-purple-400 capitalize">{key}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-cyan-400 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  Fortalezas
                </h4>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-white-400 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  Debilidades
                </h4>
                <ul className="space-y-2">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-sm text-white-400 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-blue-200 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                Recomendaciones
              </h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-center text-white flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0"></div>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}