import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-alenia-dark flex items-center justify-center">
      <div className="text-center">
        {/* Spinner animado */}
        <motion.div
          className="w-16 h-16 border-4 border-alenia-primary/20 border-t-alenia-primary rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Texto de carga */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-alenia-light/80"
        >
          <h3 className="text-lg font-semibold mb-2">Cargando...</h3>
          <p className="text-sm">Preparando el contenido para ti</p>
        </motion.div>

        {/* Puntos animados */}
        <div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-alenia-primary rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
