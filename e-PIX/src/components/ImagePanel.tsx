import React from 'react';

interface ImagePanelProps {
  title: string;
  imageUrl: string | null;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ImagePanel: React.FC<ImagePanelProps> = ({ title, imageUrl, children, className, onClick }) => (
  <div onClick={onClick} className={`bg-cyber-bg rounded-lg p-4 flex flex-col gap-4 w-full border border-cyber-border transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-glow-cyan ${className}`}>
    <h3 className="text-lg font-semibold text-center text-cyber-text-muted tracking-wide">{title}</h3>
    <div className="aspect-square w-full bg-cyber-dark rounded-md flex items-center justify-center overflow-hidden relative">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
      ) : (
        children
      )}
    </div>
  </div>
);
