import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Globe, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

export default function CompetitorAnalyzer() {
  const [website, setWebsite] = useState('');
  const [competitor, setCompetitor] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeCompetitor = () => {
    if (!website || !competitor) return;
    
    setLoading(true);
    setAnalysis(null);
    
    setTimeout(() => {
      const mockAnalysis = {
        website: website,
        competitor: competitor,
        score: Math.floor(Math.random() * 40) + 60,
        metrics: {
          seo: Math.floor(Math.random() * 30) + 70,
          performance: Math.floor(Math.random() * 25) + 75,
          social: Math.floor(Math.random() * 35) + 65,
          content: Math.floor(Math.random() * 20) + 80
        },
        recommendations: [
          'Optimizar la velocidad de carga para móviles.',
          'Crear un blog con contenido de valor para tu nicho.',
          'Aumentar la frecuencia de publicación en Instagram y LinkedIn.',
          'Implementar una estrategia de link building.',
          'Mejorar las meta descripciones de las páginas clave.'
        ],
        strengths: [
          'Fuerte presencia de marca en el mercado.',
          'Diseño web limpio y moderno.',
          'Buen ranking para palabras clave long-tail.'
        ],
        weaknesses: [
          'Baja interacción en redes sociales.',
          'Velocidad de carga deficiente en 3G.',
          'Falta de una propuesta de valor clara.'
        ]
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-teal-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-indigo-900/70 rounded-2xl p-6 sm:p-8 border border-indigo-700/50 shadow-2xl shadow-indigo-500/10">
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <div className="bg-indigo-900/50 p-3 rounded-full border border-indigo-700">
          <Search className="w-8 h-8 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Análisis Competitivo</h2>
          <p className="text-indigo-300 text-sm sm:text-base">Descubre oportunidades frente a tu competencia.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-2">Tu Sitio Web</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/70" />
                  <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://tuweb.com" className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-900 text-white placeholder:text-slate-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-2">Web del Competidor</label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/70" />
                  <input type="url" value={competitor} onChange={(e) => setCompetitor(e.target.value)} placeholder="https://competidor.com" className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-900 text-white placeholder:text-slate-500 transition-all" />
                </div>
              </div>
            </div>
            <button onClick={analyzeCompetitor} disabled={!website || !competitor || loading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40">
              {loading ? <><motion.div aria-hidden className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></motion.div>Analizando Datos...</> : <><Search className="w-5 h-5" /> Analizar</>}
            </button>
        </div>

        {loading && (
            <div className="text-center text-slate-400">Cargando reporte...</div>
        )}

        {analysis && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Score & Metrics */}
              <div className="lg:col-span-1 bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700 flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-white mb-2">Puntaje General</h3>
                <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold border-4 ${getScoreColor(analysis.score).replace('text', 'border')}`}>
                  <span className={getScoreColor(analysis.score)}>{analysis.score}</span>
                </motion.div>
                <div className="w-full mt-4 space-y-2">
                    {Object.entries(analysis.metrics).map(([key, value]) => (
                        <MetricBar key={key} label={key} value={value} />
                    ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700">
                  <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2"><CheckCircle /> Fortalezas</h4>
                  <ul className="space-y-2 text-sm text-slate-300">{analysis.strengths.map((s, i) => <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0"/>{s}</li>)}</ul>
                </div>
                <div className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700">
                  <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2"><AlertTriangle /> Debilidades</h4>
                  <ul className="space-y-2 text-sm text-slate-300">{analysis.weaknesses.map((w, i) => <li key={i} className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0"/>{w}</li>)}</ul>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700">
              <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2"><Lightbulb /> Recomendaciones Clave</h4>
              <ul className="space-y-2 text-sm text-slate-300 columns-1 md:columns-2">{analysis.recommendations.map((r, i) => <li key={i} className="flex items-start gap-2 md:mb-2"><Lightbulb className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0"/>{r}</li>)}</ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const MetricBar = ({ label, value }) => {
    const getBarColor = (val) => {
        if (val >= 85) return 'bg-teal-500';
        if (val >= 70) return 'bg-yellow-500';
        return 'bg-red-500';
    }
    return (
        <div className="w-full">
            <div className="flex justify-between items-center text-sm mb-1">
                <span className="capitalize text-slate-300">{label}</span>
                <span className="font-bold text-white">{value}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
                <motion.div 
                    className={`h-2.5 rounded-full ${getBarColor(value)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    )
}