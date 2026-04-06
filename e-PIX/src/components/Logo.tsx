import React from 'react';
import logoSrc from '../images/logo1.png';

interface LogoProps {
  className?: string;
  showTitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTitle = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logoSrc} 
        alt="PicShop Logo" 
        className="w-8 h-8"
      />
      {showTitle && (
        <span className="text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
          E-pix
        </span>
      )}
    </div>
  );
};