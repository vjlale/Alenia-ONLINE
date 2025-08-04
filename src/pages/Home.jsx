import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Users, Zap, Shield, TrendingUp } from 'lucide-react';
import HeroSection from '../components/landing/HeroSection.jsx';

export default function Home() {
  return (
    <main className="font-inter bg-brand-primary min-h-screen box-shadow-brand">
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Empresas Transformadas" },
              { number: "95%", label: "Satisfacción Cliente" },
              { number: "24/7", label: "Soporte Técnico" },
              { number: "3x", label: "ROI Promedio" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Servicios que <span className="text-green-500">Transforman</span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Soluciones integrales para digitalizar y potenciar tu empresa con tecnología de vanguardia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-green-500" />,
                title: "Automatización WhatsApp",
                desc: "Bots inteligentes para atención y ventas 24/7 que aumentan conversiones",
                features: ["Respuestas automáticas", "Flujos personalizados", "Integración CRM"]
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-white" />,
                title: "Desarrollo Web",
                desc: "Sitios web modernos, rápidos y optimizados para conversión",
                features: ["Diseño responsive", "SEO optimizado", "Carga ultra-rápida"]
              },
              {
                icon: <Users className="w-8 h-8 text-purple-500" />,
                title: "Email Marketing",
                desc: "Campañas automatizadas que nutren leads y aumentan ventas",
                features: ["Segmentación avanzada", "A/B Testing", "Analytics detallado"]
              },
              {
                icon: <Shield className="w-8 h-8 text-orange-500" />,
                title: "Análisis con IA",
                desc: "Reportes inteligentes y predicciones para mejores decisiones",
                features: ["Dashboards en tiempo real", "Predicciones de ventas", "Insights automáticos"]
              },
              {
                icon: <Star className="w-8 h-8 text-pink-500" />,
                title: "CRM Personalizado",
                desc: "Sistema de gestión adaptado específicamente a tu negocio",
                features: ["Gestión de leads", "Pipeline de ventas", "Automatizaciones"]
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-green-600" />,
                title: "Consultoría IA",
                desc: "Estrategia personalizada para implementar IA en tu empresa",
                features: ["Auditoría de procesos", "Plan de implementación", "Capacitación equipo"]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand transition-all duration-300"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Lo que dicen nuestros <span className="text-green-500">Clientes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "Gracias a Alen.iA automatizamos nuestro proceso de ventas y aumentamos la conversión en un 300%. El ROI fue inmediato.",
                author: "María González",
                role: "CEO, TechStart",
                rating: 5
              },
              {
                text: "El sistema de gestión es increíblemente intuitivo. Nuestro equipo se adaptó en días y la productividad se disparó.",
                author: "Carlos Ruiz",
                role: "Director, InnovaPlus",
                rating: 5
              },
              {
                text: "La automatización de WhatsApp cambió completamente nuestra atención al cliente. Ahora respondemos 24/7 sin esfuerzo.",
                author: "Ana Martín",
                role: "Gerente, ServicePro",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white font-bold mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-white text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para transformar tu empresa?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a más de 500 empresas que ya están obteniendo resultados extraordinarios con nuestras soluciones de IA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all duration-300 flex items-center gap-2 justify-center">
                Comenzar Ahora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300">
                Agendar Demo Gratuita
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}