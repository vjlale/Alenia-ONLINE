import analyticsService from './services/analyticsService';
import seoService from './services/seoService';
import performanceService from './services/performanceService';
import abTestingService from './services/abTestingService';
import NotFound from './pages/NotFound';
import AleniaGestionLanding from './pages/AleniaGestionLanding';
import Automatizaciones from './pages/Automatizaciones';
import GestionKontrolPlus from './pages/GestionKontrolPlus';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
// ...existing code...
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
// ...existing code...
import Apps from './pages/Apps'
import Services from './pages/Services'
import Contact from './pages/Contact'


import ABTestingDashboard from './components/admin/ABTestingDashboard';
import ROICalculator from './components/apps/ROICalculator';
import CompetitorAnalyzer from './components/apps/CompetitorAnalyzer';
import HashtagGenerator from './components/apps/HashtagGenerator';
import AutomationSimulator from './components/apps/AutomationSimulator';

import './styles/globals.css'

// ...existing code...
// ...existing code...
// ...existing code...

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
    } else if (location.pathname === '/servicios') {
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
    <div className="min-h-screen bg-alenia-dark">
      <NavigationTracker />
      <Header />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/apps/calculadora-roi" element={<ROICalculator />} />
          <Route path="/apps/analizador-competencia" element={<CompetitorAnalyzer />} />
          <Route path="/apps/generador-hashtags" element={<HashtagGenerator />} />
          <Route path="/apps/simulador-automatizaciones" element={<AutomationSimulator />} />
          <Route path="/apps/calculadora-roi" element={<ROICalculator />} />
          <Route path="/apps/analizador-competencia" element={<CompetitorAnalyzer />} />
          <Route path="/apps/generador-hashtags" element={<HashtagGenerator />} />
          <Route path="/apps/simulador-automatizaciones" element={<AutomationSimulator />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/admin/ab-testing" element={<ABTestingDashboard />} />
          <Route path="/landing/gestion" element={<AleniaGestionLanding />} />
          <Route path="/automatizaciones" element={<Automatizaciones />} />
          <Route path="/gestion-kontrolplus" element={<GestionKontrolPlus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
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
  );
}


function App() {
  // Para Hostinger, usar basename vacío o raíz
  const basename = '';
  return (
    <BrowserRouter basename={basename}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App
