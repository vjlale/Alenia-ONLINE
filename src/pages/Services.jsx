import { motion } from 'framer-motion';
import { 
  MessageSquare, Globe, Mail, Brain, Users, Lightbulb,
  Zap, TrendingUp, Shield, Clock, CheckCircle, ArrowRight 
} from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Automatización WhatsApp',
    icon: <MessageSquare className="w-8 h-8" />,
    color: 'green',
    description: 'Implementa bots inteligentes y flujos automatizados para atención al cliente y ventas 24/7.',
    features: [
      'Chatbots con IA conversacional',
      'Integración con CRM y bases de datos',
      'Flujos de venta automatizados',
      'Respuestas instantáneas 24/7',
      'Análisis de conversaciones'
    ],
    benefits: [
      { metric: '80%', label: 'Reducción tiempo respuesta' },
      { metric: '3x', label: 'Aumento en conversiones' },
      { metric: '24/7', label: 'Disponibilidad total' }
    ]
  },
  {
    id: 2,
    name: 'Desarrollo Web',
    icon: <Globe className="w-8 h-8" />,
    color: 'blue',
    description: 'Sitios web modernos, rápidos y optimizados para conversión con las últimas tecnologías.',
    features: [
      'Diseño responsive y moderno',
      'Optimización SEO avanzada',
      'Velocidad de carga ultrarrápida',
      'Integración con herramientas',
      'Panel de administración intuitivo'
    ],
    benefits: [
      { metric: '95%', label: 'Score de velocidad' },
      { metric: '2s', label: 'Tiempo de carga' },
      { metric: '+60%', label: 'Mejora en SEO' }
    ]
  },
  {
    id: 3,
    name: 'Email Marketing',
    icon: <Mail className="w-8 h-8" />,
    color: 'purple',
    description: 'Campañas de email automatizadas y personalizadas que convierten leads en clientes.',
    features: [
      'Segmentación inteligente',
      'Automatización de campañas',
      'A/B Testing integrado',
      'Templates personalizados',
      'Análisis de métricas en tiempo real'
    ],
    benefits: [
      { metric: '45%', label: 'Tasa de apertura' },
      { metric: '25%', label: 'Click-through rate' },
      { metric: '5x', label: 'ROI promedio' }
    ]
  },
  {
    id: 4,
    name: 'Análisis con IA',
    icon: <Brain className="w-8 h-8" />,
    color: 'orange',
    description: 'Obtén insights profundos y predicciones precisas para tomar decisiones basadas en datos.',
    features: [
      'Dashboards interactivos',
      'Predicciones de ventas',
      'Análisis de comportamiento',
      'Reportes automatizados',
      'Alertas inteligentes'
    ],
    benefits: [
      { metric: '40%', label: 'Mejora en decisiones' },
      { metric: '90%', label: 'Precisión predictiva' },
      { metric: '-8h', label: 'Ahorro semanal' }
    ]
  },
  {
    id: 5,
    name: 'CRM Personalizado',
    icon: <Users className="w-8 h-8" />,
    color: 'indigo',
    description: 'Sistema de gestión de clientes adaptado específicamente a los procesos de tu empresa.',
    features: [
      'Interfaz personalizada',
      'Automatización de tareas',
      'Pipeline de ventas visual',
      'Integración con herramientas',
      'App móvil incluida'
    ],
    benefits: [
      { metric: '50%', label: 'Aumento productividad' },
      { metric: '35%', label: 'Más ventas cerradas' },
      { metric: '100%', label: 'Adopción del equipo' }
    ]
  },
  {
    id: 6,
    name: 'Consultoría IA',
    icon: <Lightbulb className="w-8 h-8" />,
    color: 'pink',
    description: 'Estrategia personalizada para implementar IA en tu empresa de forma efectiva y rentable.',
    features: [
      'Auditoría de procesos',
      'Plan de implementación',
      'Selección de herramientas',
      'Capacitación del equipo',
      'Soporte continuo'
    ],
    benefits: [
      { metric: '70%', label: 'Procesos optimizados' },
      { metric: '4x', label: 'Velocidad de adopción' },
      { metric: '100%', label: 'Soporte garantizado' }
    ]
  }
];

const getColorClasses = (color) => {
  const colors = {
    green: 'text-green-500 bg-green-100',
    blue: 'text-blue-500 bg-blue-100',
    purple: 'text-purple-500 bg-purple-100',
    orange: 'text-orange-500 bg-orange-100',
    indigo: 'text-indigo-500 bg-indigo-100',
    pink: 'text-pink-500 bg-pink-100'
  };
  return colors[color] || colors.green;
};

export default function Services() {
  return (
    <main className="min-h-screen bg-brand-primary box-shadow-brand py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
            Nuestros <span className="text-green-500">Servicios</span>
          </h1>
          <p className="text-xl text-purple-400 max-w-3xl mx-auto">
            Soluciones integrales de tecnología e IA para digitalizar y potenciar tu empresa
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row gap-12 items-center`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className={`inline-flex p-4 rounded-2xl box-shadow-card border border-brand mb-6`}>
                  {service.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">
                  {service.name}
                </h2>
                <p className="text-lg text-slate-300 mb-8">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-white-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="bg-slate-900 text-green-500 font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-all duration-300 inline-flex items-center gap-2 group">
                  Conocer más
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Benefits Card */}
              <div className="flex-1 lg:max-w-md">
                <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card border border-brand">
                  <h3 className="text-xl font-bold text-purple-400 mb-6">
                    Beneficios comprobados
                  </h3>
                  <div className="space-y-6">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className={`text-3xl font-bold ${service.color === 'green' ? 'text-green-500' : 
                            service.color === 'blue' ? 'text-blue-500' :
                            service.color === 'purple' ? 'text-purple-500' :
                            service.color === 'orange' ? 'text-orange-500' :
                            service.color === 'indigo' ? 'text-indigo-500' :
                            'text-pink-500'}`}>
                            {benefit.metric}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white-700 font-medium">{benefit.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-3 border-t border-brand">
                    <div className="flex items-center gap-2 text-sm text-white-600">
                      <Clock className="w-4 h-4" />
                      <span>Implementación en 2-4 semanas</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-4">
              Nuestro proceso de trabajo
            </h2>
            <p className="text-lg text-white-600 max-w-2xl mx-auto">
              Un enfoque probado que garantiza resultados excepcionales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Análisis', desc: 'Evaluamos tus procesos y necesidades específicas' },
              { step: '02', title: 'Estrategia', desc: 'Diseñamos una solución personalizada para tu empresa' },
              { step: '03', title: 'Implementación', desc: 'Desarrollamos e integramos las herramientas necesarias' },
              { step: '04', title: 'Optimización', desc: 'Mejoramos continuamente basándonos en resultados' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-indigo-500 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">{item.title}</h3>
                <p className="text-white-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 bg-brand-gradient rounded-3xl p-12 text-center box-shadow-card border border-brand"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para transformar tu empresa?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Agenda una consultoría gratuita y descubre cómo podemos ayudarte a crecer con tecnología e IA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand-accent text-brand-primary font-bold px-8 py-4 rounded-xl glow-btn box-shadow-card border border-brand hover:bg-brand-gradient transition-all duration-300">
              Agendar consultoría gratuita
            </button>
            <button className="border-2 border-brand text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-accent hover:text-brand-primary transition-all duration-300">
              Ver casos de éxito
            </button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}