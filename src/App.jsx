import analyticsService from './services/analyticsService';
import seoService from './services/seoService';
import performanceService from './services/performanceService';
import abTestingService from './services/abTestingService';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet-async';
import Header from './components/common/Header'
import BrandIntroSplash from './components/common/BrandIntroSplash'
import Footer from './components/common/Footer'
import LoadingSpinner from './components/common/LoadingSpinner'
import LazyLoadErrorBoundary from './components/common/LazyLoadErrorBoundary'
import LazyRoute from './components/common/LazyRoute'
import ScrollToTop from './components/common/ScrollToTop'
import ScrollProgress from './components/common/ScrollProgress'
import CursorFollower from './components/common/CursorFollower'
import PageTransition from './components/common/PageTransition'
import { BannerCursorProvider } from './contexts/BannerCursorContext'

// Componentes principales (no lazy para mejor UX inicial)
import Home from './pages/Home'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Lazy loaded components para optimización de performance
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const Apps = lazy(() => import('./pages/Apps'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const SolucionesHub = lazy(() => import('./pages/SolucionesHub'));
const SolucionesDigitales = lazy(() => import('./pages/SolucionesDigitales'));
const SolucionDetail = lazy(() => import('./pages/SolucionDetail'));
const Automatizaciones = lazy(() => import('./pages/Automatizaciones'));
const KontrolPlusLanding = lazy(() => import('./pages/KontrolPlusLanding'));
const ABTestingDashboard = lazy(() => import('./components/admin/ABTestingDashboard'));
const ROICalculator = lazy(() => import('./components/apps/ROICalculator'));
const CompetitorAnalyzer = lazy(() => import('./components/apps/CompetitorAnalyzer'));
const HashtagGenerator = lazy(() => import('./components/apps/HashtagGenerator'));
const AutomationSimulator = lazy(() => import('./components/apps/AutomationSimulator'));
const SEOOptimizer = lazy(() => import('./components/apps/SEOOptimizer'));
const PicShopEmbed = lazy(() => import('./components/apps/PicShopEmbed'));
const PlayPadelLanding = lazy(() => import('./pages/PlayPadelLanding'));
const IStreemLanding = lazy(() => import('./pages/IStreemLanding'));

import './styles/globals.css'
import { BRAND_ASSETS } from './config/brandAssets'

// Componente para tracking de navegación
function NavigationTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    analyticsService.trackPageView(location.pathname, document.title);
    
    // Aplicar experimentos A/B específicos de página
    if (location.pathname === '/') {
      abTestingService.applyExperiment('hero_cta', '[data-hero-cta]');
      abTestingService.applyExperiment('newsletter_cta', '[data-newsletter-cta]');
    } else if (location.pathname === '/soluciones') {
      abTestingService.applyExperiment('pricing_display', '[data-pricing]');
      abTestingService.applyExperiment('services_layout', '[data-services-layout]');
    }
  }, [location]);

  return null;
}

// Componente principal de la aplicación
function AppContent() {
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Inicializar servicios básicos
    initializeServices();
    
    // Cargar consent de localStorage
    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent) {
      const consent = JSON.parse(savedConsent);
      setConsentGiven(true);
      handleConsentUpdate(consent);
    } else {
      // Mostrar banner de cookies si no hay consent
      showCookieBanner();
    }

    // Prefetch inteligente de rutas lazy críticas durante el idle time
    const prefetchRoutes = () => {
      const routes = [
        () => import('./pages/Blog'),
        () => import('./pages/Services'),
        () => import('./pages/Apps'),
        () => import('./pages/Contact')
      ];

      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          routes.forEach(route => route().catch(() => {}));
        }, { timeout: 2000 });
      } else {
        // Fallback: prefetch después de un delay
        setTimeout(() => {
          routes.forEach(route => route().catch(() => {}));
        }, 2000);
      }
    };

    // Prefetch cuando el usuario está inactivo
    const timer = setTimeout(prefetchRoutes, 2000);

    // Prefetch en hover de links de navegación
    const handleLinkHover = (e) => {
      if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        if (href === '/blog') import('./pages/Blog').catch(() => {});
        if (href === '/soluciones') import('./pages/Services').catch(() => {});
        if (href === '/apps') import('./pages/Apps').catch(() => {});
        if (href === '/contacto') import('./pages/Contact').catch(() => {});
      }
    };

    document.addEventListener('mouseover', handleLinkHover, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseover', handleLinkHover);
    };
  }, []);

  const initializeServices = async () => {
    try {
      // Servicios que no requieren consent
      console.log('🚀 Initializing core services...');
      
      // SEO Service (no requiere consent)
      seoService.preloadCriticalResources();
      seoService.optimizeImages();
      
      // Performance Service (no requiere consent)
      // Ya se inicializa automáticamente
      
      // A/B Testing Service (no requiere consent de tracking)
      // Ya se inicializa automáticamente
      
      setServicesLoaded(true);
      console.log('✅ Core services initialized');
    } catch (error) {
      console.error('❌ Error initializing services:', error);
    }
  };

  const handleConsentUpdate = async (consent) => {
    // Actualizar configuración de analytics según consent
    if (consent.analytics || consent.marketing) {
      try {
        await analyticsService.init();
        console.log('📊 Analytics services initialized with consent');
      } catch (error) {
        console.error('❌ Error initializing analytics:', error);
      }
    }
    
    // Configurar consent mode
    analyticsService.setConsentMode(consent.analytics, consent.marketing);
    
    // Guardar consent
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    setConsentGiven(true);
  };

  const showCookieBanner = () => {
    // Crear banner de cookies si no existe
    if (document.getElementById('cookie-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-50';
    banner.innerHTML = `
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-sm text-gray-300">
          <p>Utilizamos cookies para mejorar tu experiencia y analizar el tráfico. 
          <a href="/politica-privacidad" class="text-alenia-primary hover:underline">Más información</a></p>
        </div>
        <div class="flex gap-2">
          <button id="accept-essential" class="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors">
            Solo esenciales
          </button>
          <button id="accept-all" class="px-4 py-2 text-sm bg-alenia-primary text-white rounded hover:bg-alenia-secondary transition-colors">
            Aceptar todas
          </button>
        </div>
      </div>
    `;

    // Event listeners
    banner.querySelector('#accept-essential').onclick = () => {
      handleConsentUpdate({ analytics: false, marketing: false, essential: true });
      banner.remove();
    };

    banner.querySelector('#accept-all').onclick = () => {
      handleConsentUpdate({ analytics: true, marketing: true, essential: true });
      banner.remove();
    };

    document.body.appendChild(banner);
  };

  return (
    <BannerCursorProvider>
    <div className="relative min-h-screen bg-alenia-dark">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ALENIA",
            url: "https://alenia.online",
            logo: BRAND_ASSETS.symbol,
            description: "Soluciones inteligentes con IA, automatizaciones y desarrollo web para empresas.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Córdoba",
              addressCountry: "AR"
            },
            contactPoint: {
              "@type": "ContactPoint",
              email: "alenia.online@gmail.com",
              contactType: "customer service"
            },
            sameAs: [
              "https://www.instagram.com/alen.ia_/",
              "https://www.linkedin.com/company/alen-ia/",
              "https://github.com/vjlale"
            ]
          })}
        </script>
      </Helmet>
      <BrandIntroSplash />
      <NavigationTracker />
      <ScrollToTop />
      <ScrollProgress />
      <CursorFollower />
      <Header />
      <PageTransition>
        <Routes>
          {/* Rutas principales (no lazy para mejor UX inicial) */}
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
          
          {/* Rutas con lazy loading optimizado */}
          <Route path="/blog" element={<LazyRoute component={Blog} />} />
          <Route path="/blog/:slug" element={<LazyRoute component={BlogPostPage} />} />
          <Route path="/apps" element={<LazyRoute component={Apps} />} />
          <Route path="/desarrollos-ia" element={<Navigate to="/apps" replace />} />
          <Route path="/apps/calculadora-roi" element={<LazyRoute component={ROICalculator} />} />
          <Route path="/apps/analizador-competencia" element={<LazyRoute component={CompetitorAnalyzer} />} />
          <Route path="/apps/generador-hashtags" element={<LazyRoute component={HashtagGenerator} />} />
          <Route path="/apps/simulador-automatizaciones" element={<LazyRoute component={AutomationSimulator} />} />
          <Route path="/apps/optimizador-seo" element={<LazyRoute component={SEOOptimizer} />} />
          <Route path="/apps/picshop" element={<LazyRoute component={PicShopEmbed} />} />

          <Route path="/soluciones" element={<LazyRoute component={Services} />} />
          <Route path="/soluciones/hub" element={<LazyRoute component={SolucionesHub} />} />
          <Route path="/soluciones/digitales" element={<Navigate to="/soluciones" replace />} />
          <Route path="/soluciones/:categoria" element={<LazyRoute component={SolucionDetail} />} />
          <Route path="/soluciones/detalle/:id" element={<LazyRoute component={ServiceDetail} />} />
          <Route path="/admin/ab-testing" element={<LazyRoute component={ABTestingDashboard} showErrorDetails={true} />} />
          <Route path="/automatizaciones" element={<LazyRoute component={Automatizaciones} />} />
          <Route path="/kontrol-plus" element={<LazyRoute component={KontrolPlusLanding} />} />
          <Route path="/play-padel" element={<LazyRoute component={PlayPadelLanding} />} />
          <Route path="/apps/i-streem" element={<LazyRoute component={IStreemLanding} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Footer />
      
      {/* Debug info en desarrollo */}
      {import.meta.env.DEV && servicesLoaded && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded text-xs opacity-70 z-40">
          <div>🚀 Services: {servicesLoaded ? 'Ready' : 'Loading'}</div>
          <div>📊 Analytics: {consentGiven ? 'Active' : 'Pending'}</div>
          <div>🧪 A/B Tests: {abTestingService.experiments.size} active</div>
          <div>⚡ Performance: {performanceService ? 'Monitoring' : 'Disabled'}</div>
        </div>
      )}
    </div>
    </BannerCursorProvider>
  );
}

function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <HelmetProvider>
        <AppContent />
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;