import React, { useState, useEffect, useCallback } from 'react';
import { XCircleIcon } from './Icons';
import { submitNotifyEmail } from '../services/notifyService';

type MaintenanceModalProps = {
  onClose?: () => void;
};

export const MaintenanceModal: React.FC<MaintenanceModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    const result = await submitNotifyEmail(trimmed);
    setLoading(false);
    if (result.ok) {
      setSuccess(true);
    } else {
      setError(result.error || 'No se pudo registrar. Intenta de nuevo.');
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-modal-title"
      aria-describedby="maintenance-modal-desc"
    >
      <div
        className="relative w-full max-w-md bg-cyber-bg border border-cyber-border rounded-xl shadow-glow-cyan-lg p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-cyber-text-muted hover:text-neon-pink transition-colors focus:outline-none focus:ring-2 focus:ring-neon-pink rounded-full p-1"
            aria-label="Cerrar aviso"
          >
            <XCircleIcon className="w-6 h-6" />
          </button>
        )}

        <h2
          id="maintenance-modal-title"
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent pr-10"
        >
          Estamos actualizando E-pix
        </h2>
        <p
          id="maintenance-modal-desc"
          className="mt-3 text-cyber-text text-base"
        >
          Estamos trabajando en la actualización de la app para brindar un mejor servicio.
        </p>
        <p className="mt-2 text-cyber-text-muted text-sm">
          Te avisamos cuando esté en funcionamiento de nuevo.
        </p>

        {success ? (
          <div className="mt-6 space-y-4">
            <p className="py-4 px-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-center font-medium">
              Gracias, te avisaremos.
            </p>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full text-cyber-text-muted hover:text-cyber-text text-sm transition-colors"
              >
                Cerrar
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label htmlFor="maintenance-email" className="block text-sm font-medium text-cyber-text">
              Email
            </label>
            <input
              id="maintenance-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="tu@email.com"
              className="w-full bg-cyber-dark border border-cyber-border rounded-lg px-4 py-3 text-cyber-text placeholder-cyber-text-muted focus:border-neon-cyan focus:ring-0 focus:shadow-glow-cyan transition-all disabled:opacity-50"
              autoComplete="email"
            />
            {error && (
              <div className="flex items-center justify-between gap-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 text-sm">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="flex-shrink-0 text-red-300 hover:text-white underline"
                >
                  Reintentar
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neon-cyan text-black font-bold py-3 px-4 rounded-lg transition-all hover:shadow-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando…' : 'Notificarme cuando esté disponible'}
            </button>
          </form>
        )}

        {onClose && !success && (
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full text-cyber-text-muted hover:text-cyber-text text-sm transition-colors"
          >
            No gracias
          </button>
        )}
      </div>
    </div>
  );
};
