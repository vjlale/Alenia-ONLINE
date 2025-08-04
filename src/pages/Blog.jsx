import { motion } from 'framer-motion';
import BlogCard from '../components/blog/BlogCard';

const blogPosts = [
  {
    id: 1,
    title: 'Cómo la IA está revolucionando el marketing digital en 2025',
    excerpt: 'Descubre las últimas tendencias en inteligencia artificial aplicadas al marketing. Desde chatbots hasta análisis predictivo, la IA está transformando la forma en que las empresas se conectan con sus clientes.',
    date: '15 Jul 2025',
    readTime: 5,
    category: 'Inteligencia Artificial',
    link: '#',
    image: '/images/blog/ai-marketing.jpg'
  },
  {
    id: 2,
    title: 'Automatización de WhatsApp Business: Guía completa para empresas',
    excerpt: 'Aprende a implementar chatbots inteligentes en WhatsApp para automatizar la atención al cliente, aumentar las ventas y mejorar la experiencia del usuario las 24 horas del día.',
    date: '12 Jul 2025',
    readTime: 8,
    category: 'Automatización',
    link: '#',
    image: '/images/blog/whatsapp-automation.jpg'
  },
  {
    id: 3,
    title: 'Tendencias en desarrollo web 2025: Lo que tu empresa necesita saber',
    excerpt: 'Las Progressive Web Apps, la arquitectura serverless y las experiencias inmersivas están definiendo el futuro del desarrollo web. Conoce las tecnologías clave para mantener tu negocio competitivo.',
    date: '10 Jul 2025',
    readTime: 6,
    category: 'Desarrollo Web',
    link: '#',
    image: '/images/blog/web-trends.jpg'
  },
  {
    id: 4,
    title: 'Email Marketing con IA: Personalización a escala',
    excerpt: 'Cómo utilizar la inteligencia artificial para crear campañas de email marketing hiperpersonalizadas que aumentan las tasas de apertura y conversión hasta en un 300%.',
    date: '08 Jul 2025',
    readTime: 7,
    category: 'Email Marketing',
    link: '#',
    image: '/images/blog/email-ai.jpg'
  },
  {
    id: 5,
    title: 'Análisis predictivo: El futuro de la toma de decisiones empresariales',
    excerpt: 'Implementa modelos de machine learning para predecir tendencias del mercado, comportamiento del cliente y optimizar tus estrategias de negocio con datos en tiempo real.',
    date: '05 Jul 2025',
    readTime: 10,
    category: 'Análisis de Datos',
    link: '#',
    image: '/images/blog/predictive-analytics.jpg'
  },
  {
    id: 6,
    title: 'CRM personalizado vs genérico: ¿Cuál es mejor para tu empresa?',
    excerpt: 'Analizamos las ventajas de implementar un CRM adaptado a las necesidades específicas de tu negocio versus las soluciones genéricas del mercado.',
    date: '02 Jul 2025',
    readTime: 6,
    category: 'CRM',
    link: '#',
    image: '/images/blog/crm-comparison.jpg'
  }
];

export default function Blog() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Blog de <span className="text-green-500">Marketing Digital</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Contenido actualizado sobre IA, automatización y estrategias digitales para hacer crecer tu negocio
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-brand-gradient rounded-2xl p-8 md:p-12 text-white box-shadow-card border border-brand">
            <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
              Artículo Destacado
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              El impacto de la IA en las ventas B2B: Casos de éxito 2025
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-3xl">
              Descubre cómo empresas líderes están utilizando inteligencia artificial para automatizar 
              sus procesos de venta, cualificar leads y cerrar deals 3x más rápido.
            </p>
            <button className="bg-brand-accent btn-black-bold px-6 py-3 rounded-lg glow-btn box-shadow-card border border-brand hover:bg-brand-gradient transition-colors inline-flex items-center gap-2">
              Leer artículo completo
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <BlogCard {...post} />
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-brand-primary rounded-2xl p-8 md:p-12 text-center box-shadow-card border border-brand"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            No te pierdas ninguna actualización
          </h3>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe las últimas tendencias en IA y marketing digital 
            directamente en tu bandeja de entrada.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-6 py-3 rounded-lg bg-brand-primary text-white placeholder-brand-accent border border-brand focus:border-brand-accent focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-brand-accent btn-black-bold px-8 py-3 rounded-lg glow-btn box-shadow-card border border-brand hover:bg-brand-gradient transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

import { ArrowRight } from 'lucide-react';
