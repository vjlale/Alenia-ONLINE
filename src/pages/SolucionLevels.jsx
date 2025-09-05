import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Award, Clock, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import { soluciones } from '../data/solucionesData';
import Breadcrumbs from '../components/common/Breadcrumbs';
import LevelCard from '../components/common/LevelCard';
import ServiceFormModal from '../components/forms/ServiceFormModal';

const SolucionLevels = () => {
  const { categoria } = useParams();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // Encontrar la solución por categoría
  const solucion = soluciones.find(s => s.categoria === categoria);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setIsFormModalOpen(true);
  };

  const handleServiceFormSubmit = (formData) => {
    console.log('Formulario de nivel enviado:', formData);
    // Aquí conectarías con tu backend o servicio de emails
  };

  const IconComponent = solucion.icon;

  if (!solucion) {
    return (
      <div className="min-h-screen pt-20 bg-alenia-dark text-white">
        <div className="container mx-auto px-6 text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Solución no encontrada</h1>
          <Link to="/soluciones" className="text-alenia-primary hover:text-alenia-secondary">
            ← Volver a todas las soluciones
          </Link>
        </div>
      </div>
    );
  }

  if (!solucion.niveles) {
    return (
      <div className="min-h-screen pt-20 bg-alenia-dark text-white">
        <div className="container mx-auto px-6 text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Niveles en desarrollo</h1>
          <p className="text-alenia-light/70 mb-6">
            Los niveles para esta solución estarán disponibles pronto.
          </p>
          <Link to="/soluciones" className="text-alenia-primary hover:text-alenia-secondary">
            ← Volver a todas las soluciones
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Soluciones', href: '/soluciones' },
    { label: solucion.nombre }
  ];

  return (
    <>
      <Helmet>
  <title>{`${solucion.nombre} - Niveles de Servicio | ALENIA`}</title>
  <meta name="description" content={`Elige el nivel perfecto de ${solucion.nombre}: Elemental, Moderado o Visionario. ${solucion.descripcionGeneral || ''}`} />
  <link rel="canonical" href={`https://alenia.online/soluciones/${solucion.categoria}`} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://alenia.online/soluciones/${solucion.categoria}`} />
  <meta property="og:title" content={`${solucion.nombre} - Niveles de Servicio | ALENIA`} />
  <meta property="og:description" content={`Elige el nivel perfecto de ${solucion.nombre}: Elemental, Moderado o Visionario.`} />
  <meta property="og:image" content="https://alenia.online/images/Alenia1.png" />
  <meta property="og:image:alt" content="ALENIA - Resultados con Inteligencia" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={`https://alenia.online/soluciones/${solucion.categoria}`} />
  <meta property="twitter:title" content={`${solucion.nombre} - Niveles de Servicio | ALENIA`} />
  <meta property="twitter:description" content={`Elige el nivel perfecto de ${solucion.nombre}: Elemental, Moderado o Visionario.`} />
  <meta property="twitter:image" content="https://alenia.online/images/Alenia1.png" />
      </Helmet>

      <div className="min-h-screen pt-20 bg-alenia-dark text-white overflow-x-hidden">
        <div className="container mx-auto px-5 lg:px-6 py-9 max-w-7xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/soluciones"
              className="inline-flex items-center gap-2 text-alenia-primary hover:text-alenia-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a todas las soluciones
            </Link>
          </motion.div>

          {/* Header de la solución */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-alenia-secondary rounded-xl flex items-center justify-center">
                <IconComponent className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {solucion.nombre}
            </h1>
            
            <p className="text-xl text-alenia-light/80 mb-6 max-w-3xl mx-auto">
              {solucion.descripcionGeneral || solucion.descripcion}
            </p>

            {/* Stats rápidas */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-alenia-primary" />
                <span className="text-alenia-light/70">Desde 1 mes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-alenia-primary" />
                <span className="text-alenia-light/70">+500 proyectos</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-alenia-primary" />
                <span className="text-alenia-light/70">Garantía incluida</span>
              </div>
            </div>
          </motion.div>

          {/* Subtitle para niveles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Elige el nivel perfecto para tu negocio
            </h2>
            <p className="text-alenia-light/70 max-w-2xl mx-auto">
              Cada nivel está diseñado para diferentes etapas de crecimiento. 
              Empieza donde te sientas cómodo y siempre podrás evolucionar.
            </p>
          </motion.div>

          {/* Grid de niveles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-none mx-auto px-6 mt-10">
            <LevelCard
              level={solucion.niveles.elemental}
              onSelect={handleLevelSelect}
              index={0}
            />
            <LevelCard
              level={solucion.niveles.moderado}
              isHighlighted={true}
              onSelect={handleLevelSelect}
              index={1}
            />
            <LevelCard
              level={solucion.niveles.visionario}
              onSelect={handleLevelSelect}
              index={2}
            />
          </div>

          {/* Sección de beneficios comunes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-alenia-dark/40 rounded-xl p-8 max-w-4xl mx-auto border border-alenia-light/10">
              <h3 className="text-2xl font-bold text-white mb-6">
                ✨ Incluido en todos los niveles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-alenia-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-alenia-primary" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Garantía Total</h4>
                  <p className="text-sm text-alenia-light/70">
                    Si no estás satisfecho, te devolvemos el dinero
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-alenia-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-alenia-primary" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Soporte Humano</h4>
                  <p className="text-sm text-alenia-light/70">
                    Equipo real siempre disponible para ayudarte
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-alenia-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-alenia-primary" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Entrega Puntual</h4>
                  <p className="text-sm text-alenia-light/70">
                    Cumplimos los tiempos prometidos o compensamos
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-alenia-primary/10 to-alenia-secondary/10 rounded-xl p-8 border border-alenia-primary/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿No estás seguro cuál elegir?
              </h3>
              <p className="text-alenia-light/70 mb-6 max-w-2xl mx-auto">
                Conversemos 15 minutos sin costo. Te ayudamos a encontrar 
                la solución perfecta para tu situación específica.
              </p>
              <Link to="/contacto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-alenia-primary to-alenia-secondary text-alenia-dark px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Solicitar Consulta Gratuita
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Service Form Modal */}
        <ServiceFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          servicio={solucion}
          nivel={selectedLevel}
          onSubmit={handleServiceFormSubmit}
        />
      </div>
    </>
  );
};

export default SolucionLevels;
