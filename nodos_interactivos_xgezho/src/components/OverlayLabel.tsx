import { motion } from 'framer-motion';

export function OverlayLabel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.45, 0, 0.55, 1] }}
      className="absolute top-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
    >
      <h1 className="text-foreground font-sans text-2xl font-medium tracking-wide">
        Interactive Nodes
      </h1>
    </motion.div>
  );
}
