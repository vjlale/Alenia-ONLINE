import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Users, Clock, Star, TrendingUp } from 'lucide-react';
import { useRef, useEffect } from 'react';
import ScrollReveal from '../../components/common/ScrollReveal';

function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  });
  const displayValue = useTransform(springValue, (latest) => {
    if (value.includes(',')) {
      return Math.floor(latest).toLocaleString();
    }
    return latest.toFixed(value.includes('.') ? 1 : 0);
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numValue);
    }
  }, [isInView, numValue, motionValue]);

  return (
    <motion.span ref={ref}>
      {displayValue}{suffix}
    </motion.span>
  );
}

export default function AppsStats() {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: '15,420',
      numericValue: 15420,
      label: 'Usuarios activos',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: '2.5 min',
      numericValue: 2.5,
      label: 'Tiempo promedio de uso',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: '4.8',
      numericValue: 4.8,
      label: 'Calificación promedio',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: '+65%',
      numericValue: 65,
      label: 'Crecimiento mensual',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <ScrollReveal direction="up" delay={0.2}>
      <section className="py-12 glass-advanced rounded-2xl mb-16 border border-alenia-primary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Nuestras Herramientas en Números
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Herramientas inteligentes que ayudan a empresas a optimizar sus procesos y aumentar su productividad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ 
                    y: -8,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="text-center glass-card-hover rounded-xl p-6 border border-white/10 card-hover-lift"
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} mb-4 ${stat.color}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.value.includes('%') ? '%' : stat.value.includes('min') ? ' min' : stat.value.includes(',') ? '' : ''} />
                  </motion.div>
                  <div className="text-gray-300 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
} 