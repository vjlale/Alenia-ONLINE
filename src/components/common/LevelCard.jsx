import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';

const LevelCard = ({ level, isHighlighted = false, onSelect, index = 0 }) => {
  const {
    nombre,
    precio,
    objetivo,
    descripcion,
    beneficios,
    caracteristicas,
    destacado,
    premium,
    etiqueta
  } = level;

  const getCardStyles = () => {
    if (premium) {
      return "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 relative overflow-hidden";
    }
    if (destacado) {
      return "bg-gradient-to-br from-alenia-primary/20 to-alenia-secondary/20 border-2 border-alenia-primary/50 relative overflow-hidden transform scale-105";
    }
    return "bg-alenia-dark/40 border border-alenia-light/20 hover:border-alenia-primary/50 transition-all duration-300";
  };

  const getHeaderStyles = () => {
    if (premium) return "text-purple-400";
    if (destacado) return "text-alenia-primary";
    return "text-alenia-light";
  };

  const getButtonStyles = () => {
    if (premium) {
      return "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white";
    }
    if (destacado) {
      return "bg-gradient-to-r from-alenia-primary to-alenia-secondary hover:from-alenia-primary/80 hover:to-alenia-secondary/80 text-alenia-dark";
    }
    return "bg-alenia-dark/60 border border-alenia-primary/50 hover:bg-alenia-primary/20 text-alenia-light";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={`rounded-xl p-6 pt-9 min-h-[800px] ${getCardStyles()} box-shadow-card`}
    >
      {/* Badge para nivel destacado */}
      {(destacado || premium) && etiqueta && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
          <div className={`px-4 py-1 rounded-full text-xs font-bold ${
            premium 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
              : 'bg-gradient-to-r from-alenia-primary to-alenia-secondary text-alenia-dark'
          } flex items-center gap-1`}>
            {premium ? <Star className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
            {etiqueta}
          </div>
        </div>
      )}

      {/* Efecto de brillo para premium */}
      {premium && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-pulse rounded-xl opacity-50"></div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className={`text-2xl font-bold mb-2 ${getHeaderStyles()}`}>
            {nombre}
          </h3>
          <div className="text-3xl font-bold text-white mb-2">
            {precio}
          </div>
          <p className="text-sm text-alenia-light/80 font-medium">
            {objetivo}
          </p>
        </div>

        {/* Descripción */}
        <p className="text-alenia-light/70 text-center mb-6">
          {descripcion}
        </p>

        {/* Beneficios principales */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3 text-sm">
            ✨ Qué incluye:
          </h4>
          <ul className="space-y-2">
            {beneficios.slice(0, 4).map((beneficio, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-alenia-primary mt-0.5 flex-shrink-0" />
                <span className="text-alenia-light/80">{beneficio}</span>
              </li>
            ))}
            {beneficios.length > 4 && (
              <li className="text-xs text-alenia-light/60 italic">
                + {beneficios.length - 4} beneficios adicionales
              </li>
            )}
          </ul>
        </div>

        {/* Características técnicas */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3 text-sm">
            📋 Características:
          </h4>
          <div className="grid grid-cols-1 gap-1">
            {caracteristicas.slice(0, 3).map((caracteristica, idx) => (
              <div key={idx} className="text-xs text-alenia-light/70 bg-alenia-dark/30 rounded px-2 py-1">
                {caracteristica}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(level)}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${getButtonStyles()}`}
        >
          {premium ? 'Solicitar Consulta VIP' : destacado ? 'Empezar Ahora' : 'Más Información'}
        </motion.button>

        {/* Garantía o nota adicional */}
        <p className="text-xs text-alenia-light/50 text-center mt-3">
          {premium ? '🛡️ Garantía de satisfacción 100%' : '💬 Consulta gratuita incluida'}
        </p>
      </div>
    </motion.div>
  );
};

export default LevelCard;
