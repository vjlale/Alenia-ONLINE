import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Zap, Target } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1),transparent_70%)]"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-6 py-20 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/20 rounded-full px-4 py-2 text-green-400 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          Resultados con Inteligencia
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Transforma tu empresa con{' '}
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            IA
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl leading-relaxed"
        >
          Automatización inteligente, desarrollo web moderno y marketing digital 
          para llevar tu negocio al siguiente nivel
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button className="group bg-green-400 hover:bg-green-500 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2 text-lg">
            <Download className="w-5 h-5" />
            Descargar ALENIA GESTIÓN
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group border-2 border-white/20 hover:border-green-400/50 text-white hover:text-green-400 font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2 text-lg">
            <Target className="w-5 h-5" />
            Ver Servicios
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
        >
          {[
            {
              icon: <Zap className="w-8 h-8 text-green-400" />,
              title: "Automatización Inteligente",
              desc: "Optimiza procesos y ahorra tiempo con IA aplicada"
            },
            {
              icon: <Target className="w-8 h-8 text-blue-400" />,
              title: "Desarrollo Web Moderno", 
              desc: "Sitios rápidos, seguros y personalizados"
            },
            {
              icon: <Sparkles className="w-8 h-8 text-purple-400" />,
              title: "Marketing Digital",
              desc: "Estrategias de contenido y SEO automatizado"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
