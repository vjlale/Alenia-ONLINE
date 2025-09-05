import React, { useEffect } from 'react';
import { XCircleIcon } from './Icons';

interface ImagePreviewModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de la imagen generada"
    >
      <div 
        className="relative"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Imagen Generada (ampliada)"
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-glow-cyan-lg"
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 text-white bg-cyber-bg rounded-full p-1.5 hover:bg-neon-pink transition-colors focus:outline-none focus:ring-2 focus:ring-neon-pink"
          aria-label="Cerrar vista ampliada"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
