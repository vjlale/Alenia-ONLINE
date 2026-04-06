import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = ({ 
  children, 
  speed = 0.5,
  className = '',
  direction = 'vertical'
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const x = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <div ref={ref} className={`relative parallax-section ${className}`}>
      <motion.div
        style={{
          y: direction === 'vertical' ? y : 0,
          x: direction === 'horizontal' ? x : 0
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
