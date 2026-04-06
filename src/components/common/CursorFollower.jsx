import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useMousePosition from '../../hooks/useMousePosition';
import { useBannerCursorContext } from '../../contexts/BannerCursorContext';

const CursorFollower = () => {
  const { x, y } = useMousePosition();
  const { isPointerOverBanner } = useBannerCursorContext();
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState('default');

  const cursorX = useSpring(useMotionValue(0), {
    stiffness: 500,
    damping: 28
  });
  const cursorY = useSpring(useMotionValue(0), {
    stiffness: 500,
    damping: 28
  });

  useEffect(() => {
    cursorX.set(x);
    cursorY.set(y);
  }, [x, y, cursorX, cursorY]);

  useEffect(() => {
    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
        setCursorType('pointer');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setIsHovering(true);
        setCursorType('text');
      } else {
        setIsHovering(false);
        setCursorType('default');
      }
    };

    document.addEventListener('mouseover', handleMouseEnter);
    return () => document.removeEventListener('mouseover', handleMouseEnter);
  }, []);

  // No mostrar en móviles o si el usuario prefiere menos movimiento
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) {
      return null;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return null;
    }
  }

  if (isPointerOverBanner) return null;

  return (
    <>
      {/* Cursor principal */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 border-alenia-primary"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 0.6
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Cursor follower (trail) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-alenia-primary"
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.6 : 0.4
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
        />
      </motion.div>
    </>
  );
};

export default CursorFollower;
