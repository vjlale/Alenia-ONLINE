import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PicShopEmbed = () => {
  const PICSHOOP_URL = 'https://picshop-1071804760043.us-central1.run.app';
  
  // Redirección automática a PicShop
  useEffect(() => {
    window.location.href = PICSHOOP_URL;
  }, []);

  // Pantalla de carga mientras redirige
  return (
    <>
      <Helmet>
        <title>Redirigiendo a PicShop AI Studio | Alen.ia</title>
        <meta name="description" content="Redirigiendo al editor de imágenes con IA..." />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-alenia-dark to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-purple-400/20 border-t-purple-400 rounded-full animate-spin mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Redirigiendo a PicShop AI Studio</h1>
          <p className="text-gray-400 mb-6">Te estamos llevando al editor de imágenes con IA...</p>
          <a 
            href={PICSHOOP_URL}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            Ir a PicShop
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </main>
    </>
  );
};

export default PicShopEmbed;
