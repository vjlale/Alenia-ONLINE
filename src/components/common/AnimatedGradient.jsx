import { motion } from 'framer-motion';

const AnimatedGradient = ({ 
  children, 
  className = '', 
  speed = 'normal',
  direction = 'to-r',
  colors = ['from-alenia-primary', 'via-alenia-secondary', 'to-alenia-accent'],
  style = {}
}) => {
  const speedClass = {
    slow: 'bg-gradient-animated-slow',
    normal: 'bg-gradient-animated',
    fast: 'bg-gradient-animated-fast'
  };

  return (
    <motion.div
      className={`${speedClass[speed]} bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: speed === 'slow' ? 15 : speed === 'fast' ? 5 : 8,
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{
        backgroundSize: '400% 400%',
        ...style
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedGradient;
