import { motion } from 'framer-motion';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className = '',
  scale = 0.8
}) => {
  const { ref, hasIntersected } = useIntersectionObserver({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale }}
      animate={{ opacity: hasIntersected ? 1 : 0, scale: hasIntersected ? 1 : scale }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;
