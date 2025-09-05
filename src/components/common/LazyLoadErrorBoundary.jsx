import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class LazyLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
    
    // Track error for analytics
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: `Lazy load error: ${error.message}`,
        fatal: false
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    
    // Opcional: recargar la página como último recurso
    if (this.props.fallbackToReload) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-alenia-dark flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              
              <h2 className="text-xl font-bold text-white mb-2">
                Error al cargar el contenido
              </h2>
              
              <p className="text-alenia-light/70 mb-4">
                Ha ocurrido un problema al cargar esta página. 
                Esto podría deberse a una conexión lenta o un error temporal.
              </p>
              
              {this.props.showDetails && this.state.error && (
                <details className="text-left text-sm text-red-300 mb-4">
                  <summary className="cursor-pointer hover:text-red-200">
                    Detalles técnicos
                  </summary>
                  <pre className="mt-2 p-2 bg-black/30 rounded text-xs overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 bg-alenia-primary hover:bg-alenia-secondary text-alenia-dark px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Intentar de nuevo
              </button>
              
              <div>
                <a
                  href="/"
                  className="text-alenia-primary hover:text-alenia-secondary transition-colors"
                >
                  ← Volver al inicio
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default LazyLoadErrorBoundary;
