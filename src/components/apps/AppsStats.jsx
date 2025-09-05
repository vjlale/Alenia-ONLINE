import { motion } from 'framer-motion';
import { Users, Clock, Star, TrendingUp } from 'lucide-react';

export default function AppsStats() {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: '15,420',
      label: 'Usuarios activos',
      color: 'text-blue-500'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: '2.5 min',
      label: 'Tiempo promedio de uso',
      color: 'text-green-500'
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: '4.8',
      label: 'Calificación promedio',
      color: 'text-yellow-500'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: '+65%',
      label: 'Crecimiento mensual',
      color: 'text-purple-500'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl mb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Nuestras Herramientas en Números
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Herramientas inteligentes que ayudan a empresas a optimizar sus procesos y aumentar su productividad
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 