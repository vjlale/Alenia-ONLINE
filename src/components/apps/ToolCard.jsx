import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';

const colorStyles = {
  green: 'bg-green-500/10 text-green-300 ring-1 ring-green-400/20',
  blue: 'bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20',
  purple: 'bg-purple-500/10 text-purple-300 ring-1 ring-purple-400/20',
  orange: 'bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/20',
  teal: 'bg-teal-500/10 text-teal-300 ring-1 ring-teal-400/20',
  yellow: 'bg-yellow-500/10 text-yellow-300 ring-1 ring-yellow-400/20',
  cyan: 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20',
};

/**
 * ToolCard — tarjeta compacta para las mini-herramientas secundarias.
 * Diseño deliberadamente más contenido que StartupAppCard para mantener
 * la jerarquía visual (las apps de la startup son el contenido principal).
 */
export default function ToolCard({ tool, index = 0 }) {
  const {
    name,
    description,
    icon,
    color = 'cyan',
    link,
    external = false,
    rating,
    timeToComplete,
    users,
  } = tool;

  const innerContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
    >
      {/* Glow sutil en hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-alenia-primary/10 blur-3xl" />
      </div>

      <div className="relative flex items-start justify-between gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            colorStyles[color] || colorStyles.cyan
          }`}
        >
          {icon}
        </div>
        {rating && (
          <div className="flex items-center gap-1 text-xs text-white/50">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        )}
      </div>

      <h3 className="relative text-base font-semibold text-white transition-colors group-hover:text-alenia-primary">
        {name}
      </h3>

      <p className="relative flex-1 text-sm leading-relaxed text-white/60 line-clamp-3">
        {description}
      </p>

      {(timeToComplete || users) && (
        <div className="relative flex items-center gap-4 text-xs text-white/40">
          {timeToComplete && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeToComplete}
            </span>
          )}
          {users && (
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {users}
            </span>
          )}
        </div>
      )}

      <div className="relative flex items-center gap-1.5 pt-2 text-xs font-semibold text-alenia-primary">
        <span>Probar herramienta</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );

  if (external) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {innerContent}
      </a>
    );
  }

  return (
    <Link to={link} className="block h-full">
      {innerContent}
    </Link>
  );
}
