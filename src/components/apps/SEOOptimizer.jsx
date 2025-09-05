import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Globe, FileText, Smartphone, Image as ImageIcon, Shield, CheckCircle, AlertTriangle, Copy, Search } from 'lucide-react';

export default function SEOOptimizer() {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const analyzeSEO = () => {
    if (!url) return;
    setLoading(true);
    setReport(null);

    setTimeout(() => {
      // Simulación de resultados SEO (mock)
      const score = Math.floor(Math.random() * 25) + 70; // 70-95
      const titleLength = Math.floor(Math.random() * 25) + 45; // 45-70
      const metaLength = Math.floor(Math.random() * 80) + 110; // 110-190
      const h1Found = Math.random() > 0.1;
      const mobileFriendly = Math.random() > 0.15;
      const hasSitemap = Math.random() > 0.3;
      const hasRobots = Math.random() > 0.25;
      const imagesMissingAlt = Math.floor(Math.random() * 5);
      const keywordInTitle = keyword ? Math.random() > 0.3 : true;
      const keywordInDescription = keyword ? Math.random() > 0.3 : true;
      const keywordInH1 = keyword ? Math.random() > 0.4 : true;

      setReport({
        url,
        keyword,
        score,
        titleLength,
        metaLength,
        h1Found,
        mobileFriendly,
        hasSitemap,
        hasRobots,
        imagesMissingAlt,
        keywordInTitle,
        keywordInDescription,
        keywordInH1,
        recommendations: buildRecommendations({ h1Found, mobileFriendly, hasSitemap, hasRobots, imagesMissingAlt, keywordInTitle, keywordInDescription, keywordInH1, titleLength, metaLength })
      });
      setLoading(false);
    }, 1600);
  };

  const buildRecommendations = (r) => {
    const recs = [];
    if (!r.h1Found) recs.push('Agrega un encabezado H1 claro con tu palabra clave principal.');
    if (r.titleLength < 50 || r.titleLength > 60) recs.push('Ajusta el título SEO entre 50-60 caracteres para evitar truncado.');
    if (r.metaLength < 140 || r.metaLength > 160) recs.push('Optimiza la meta descripción a 140-160 caracteres con CTA.');
    if (!r.keywordInTitle) recs.push('Incluye la keyword principal en el título.');
    if (!r.keywordInDescription) recs.push('Incluye la keyword principal en la meta descripción.');
    if (!r.keywordInH1) recs.push('Usa la keyword en el H1 naturalmente.');
    if (!r.mobileFriendly) recs.push('Mejora la usabilidad móvil: tipografías, tap targets y layout responsivo.');
    if (!r.hasSitemap) recs.push('Añade un sitemap.xml y publícalo en Search Console.');
    if (!r.hasRobots) recs.push('Agrega un archivo robots.txt que permita el crawling esencial.');
    if (r.imagesMissingAlt > 0) recs.push(`Añade atributos ALT descriptivos a ${r.imagesMissingAlt} imágenes.`);
    if (recs.length === 0) recs.push('Tu página está muy bien optimizada. Refuerza el contenido y los enlaces internos.');
    return recs;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-teal-400';
    if (score >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const serpTitle = keyword ? `${capitalize(keyword)} | ${extractHost(url)}` : `Título optimizado | ${extractHost(url)}`;
  const serpDesc = keyword ? `Descubre ${keyword} con nuestra guía completa. Optimiza tu presencia online y alcanza mejores posiciones.` : 'Optimiza tu presencia online y alcanza mejores posiciones con buenas prácticas SEO.';

  return (
    <div className="bg-gradient-to-b from-slate-900 to-emerald-900/70 rounded-2xl p-6 sm:p-8 border border-emerald-700/50 shadow-2xl shadow-emerald-500/10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <div className="bg-emerald-900/50 p-3 rounded-full border border-emerald-700">
          <TrendingUp className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Optimizador de SEO</h2>
          <p className="text-emerald-300 text-sm sm:text-base">Analiza tu página y recibe mejoras accionables.</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700 space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-300 mb-2">URL a analizar</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/70" />
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://tusitio.com/pagina" className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-900 text-white placeholder:text-slate-500 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-300 mb-2">Keyword principal (opcional)</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/70" />
              <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Ej: desarrollo web en argentina" className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-900 text-white placeholder:text-slate-500 transition-all" />
            </div>
          </div>
        </div>
        <button onClick={analyzeSEO} disabled={!url || loading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/40">
          {loading ? <><motion.div aria-hidden className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></motion.div>Analizando...</> : <>Analizar SEO</>}
        </button>
      </div>

      {/* Loading hint */}
      {loading && <div className="text-center text-slate-400">Evaluando etiquetas y accesibilidad...</div>}

      {/* Report */}
      <AnimatePresence>
        {report && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Score + Basics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700 text-center">
                <h3 className="text-lg font-bold text-white mb-2">Puntaje SEO</h3>
                <div className={`text-5xl sm:text-6xl font-extrabold ${getScoreColor(report.score)} mb-2`}>{report.score}</div>
                <p className="text-slate-400 text-sm">Sobre 100</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-left text-sm">
                  <InfoRow icon={FileText} label="Título" value={`${report.titleLength} car.`} ok={report.titleLength >= 50 && report.titleLength <= 60} />
                  <InfoRow icon={FileText} label="Meta desc." value={`${report.metaLength} car.`} ok={report.metaLength >= 140 && report.metaLength <= 160} />
                  <InfoRow icon={CheckCircle} label="H1" value={report.h1Found ? 'Detectado' : 'Falta'} ok={report.h1Found} />
                  <InfoRow icon={Smartphone} label="Móvil" value={report.mobileFriendly ? 'OK' : 'Mejorar'} ok={report.mobileFriendly} />
                  <InfoRow icon={Shield} label="robots.txt" value={report.hasRobots ? 'OK' : 'Falta'} ok={report.hasRobots} />
                  <InfoRow icon={Globe} label="sitemap.xml" value={report.hasSitemap ? 'OK' : 'Falta'} ok={report.hasSitemap} />
                </div>
              </div>

              {/* Checklist + Recomendaciones */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700">
                  <h4 className="font-bold text-emerald-400 mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Checklist rápido</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <CheckItem ok={report.h1Found} label="Existe un H1 único" />
                    <CheckItem ok={report.titleLength >= 50 && report.titleLength <= 60} label="Título 50–60 caracteres" />
                    <CheckItem ok={report.metaLength >= 140 && report.metaLength <= 160} label="Meta descripción 140–160 caracteres" />
                    <CheckItem ok={report.imagesMissingAlt === 0} label="Imágenes con ALT" note={report.imagesMissingAlt > 0 ? `${report.imagesMissingAlt} sin ALT` : undefined} />
                    <CheckItem ok={report.mobileFriendly} label="Optimización móvil" />
                    <CheckItem ok={report.hasSitemap} label="Sitemap disponible" />
                    <CheckItem ok={report.hasRobots} label="Robots configurado" />
                    {report.keyword && <>
                      <CheckItem ok={report.keywordInTitle} label="Keyword en título" />
                      <CheckItem ok={report.keywordInDescription} label="Keyword en meta descripción" />
                      <CheckItem ok={report.keywordInH1} label="Keyword en H1" />
                    </>}
                  </ul>
                </div>
                <div className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700">
                  <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Recomendaciones</h4>
                  <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
                    {report.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* SERP Preview */}
            <div className="bg-slate-900/50 p-4 sm:p-6 rounded-lg border border-slate-700">
              <h4 className="font-bold text-white mb-3">Vista previa SERP</h4>
              <div className="space-y-1">
                <div className="text-base sm:text-lg text-indigo-300 hover:underline cursor-default">{serpTitle}</div>
                <div className="text-sm text-emerald-400">{extractHost(url)}/...</div>
                <div className="text-sm text-slate-300">{serpDesc}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const InfoRow = ({ icon: Icon, label, value, ok }) => (
  <div className="flex items-center gap-2">
    <Icon className={`w-4 h-4 ${ok ? 'text-emerald-400' : 'text-slate-400'}`} />
    <span className="text-slate-300">{label}:</span>
    <span className={`font-semibold ${ok ? 'text-white' : 'text-slate-400'}`}>{value}</span>
  </div>
);

const CheckItem = ({ ok, label, note }) => (
  <li className="flex items-start gap-2">
    {ok ? (
      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
    )}
    <span className="text-slate-300 text-sm">{label} {note && <span className="text-slate-400">({note})</span>}</span>
  </li>
);

function extractHost(u) {
  try {
    const host = new URL(u).host;
    return host.replace('www.', '');
  } catch (e) {
    return 'tusitio.com';
  }
}

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
