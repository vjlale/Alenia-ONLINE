import { motion } from 'framer-motion';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const FadeIn = ({ children, delay = 0, duration = 0.6, className = '' }) => {
  const { ref, hasIntersected } = useIntersectionObserver({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: hasIntersected ? 1 : 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
