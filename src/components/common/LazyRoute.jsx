import { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import LazyLoadErrorBoundary from './LazyLoadErrorBoundary';

/**
 * Wrapper para rutas lazy que incluye Suspense y manejo de errores
 * @param {Object} props - Props del componente
 * @param {React.ComponentType} props.component - Componente lazy a renderizar
 * @param {React.ComponentType} props.fallback - Componente de loading (opcional)
 * @param {boolean} props.showErrorDetails - Mostrar detalles de error (opcional)
 */
function LazyRoute({ component: Component, fallback: Fallback = LoadingSpinner, showErrorDetails = false, ...props }) {
  return (
    <LazyLoadErrorBoundary showDetails={showErrorDetails}>
      <Suspense fallback={<Fallback />}>
        <Component {...props} />
      </Suspense>
    </LazyLoadErrorBoundary>
  );
}

export default LazyRoute;
