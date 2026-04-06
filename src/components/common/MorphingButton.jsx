import { motion } from 'framer-motion';
import { useState } from 'react';

const MorphingButton = ({ 
  children, 
  onClick,
  className = '',
  variant = 'primary',
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: 'bg-gradient-to-r from-alenia-primary to-alenia-secondary',
    secondary: 'bg-gradient-to-r from-alenia-secondary to-alenia-accent',
    accent: 'bg-gradient-to-r from-alenia-accent to-alenia-primary'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'glow-btn'}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-alenia-accent via-alenia-primary to-alenia-secondary"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '0%' : '-100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default MorphingButton;
