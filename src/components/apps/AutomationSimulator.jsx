import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Play, MessageCircle, Mail, Calendar, CheckCircle, ArrowRight, RefreshCw, BarChart2 } from 'lucide-react';

export default function AutomationSimulator() {
  const [selectedFlow, setSelectedFlow] = useState('');
  const [simulation, setSimulation] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const automationFlows = {
    'whatsapp-leads': {
      name: 'Captura de Leads por WhatsApp',
      description: 'Automatiza la captura y seguimiento de leads via WhatsApp.',
      steps: [
        { icon: MessageCircle, title: 'Mensaje Inicial', desc: 'Un nuevo lead inicia la conversación.' },
        { icon: Zap, title: 'Respuesta Automática', desc: 'El bot responde y califica al lead.' },
        { icon: Calendar, title: 'Agendamiento', desc: 'Se propone una cita o llamada.' },
        { icon: Mail, title: 'Notificación al Equipo', desc: 'Alerta a ventas sobre el nuevo lead.' },
        { icon: CheckCircle, title: 'Seguimiento', desc: 'El lead entra en un flujo de nutrición.' }
      ],
      metrics: {
        'Tiempo Respuesta': '< 1 min',
        'Tasa Conversión': '+25%',
        'Ahorro Tiempo': '5h/sem',
        'Calidad Lead': 'Alta'
      }
    },
    'email-nurturing': {
      name: 'Nutrición de Leads por Email',
      description: 'Secuencia de emails para convertir suscriptores en clientes.',
      steps: [
        { icon: Mail, title: 'Suscripción', desc: 'Usuario se registra al newsletter.' },
        { icon: Zap, title: 'Email Bienvenida', desc: 'Envío inmediato con información de valor.' },
        { icon: Calendar, title: 'Secuencia Programada', desc: 'Serie de 3-5 emails automáticos.' },
        { icon: CheckCircle, title: 'Análisis de Interés', desc: 'Se trackean clicks y aperturas.' },
        { icon: MessageCircle, title: 'Oferta Personalizada', desc: 'Envío de oferta según comportamiento.' }
      ],
      metrics: {
        'Tasa Apertura': '48%',
        'Click-Through': '15%',
        'Conversión': '10%',
        'Ahorro Tiempo': '8h/sem'
      }
    },
    'social-posting': {
      name: 'Publicación en Redes Sociales',
      description: 'Programa y publica contenido en todas tus redes sociales.',
      steps: [
        { icon: Calendar, title: 'Calendario Contenido', desc: 'Planificación mensual de posts.' },
        { icon: Zap, title: 'Publicación Automática', desc: 'Posteo en horarios de mayor audiencia.' },
        { icon: BarChart2, title: 'Monitoreo', desc: 'Análisis de engagement y alcance.' },
        { icon: MessageCircle, title: 'Respuestas IA', desc: 'Bot gestiona comentarios frecuentes.' },
        { icon: Mail, title: 'Reporte Semanal', desc: 'Informe de rendimiento enviado al equipo.' }
      ],
      metrics: {
        'Alcance': '+150%',
        'Engagement': '+75%',
        'Consistencia': '100%',
        'Ahorro Tiempo': '10h/sem'
      }
    }
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      const steps = automationFlows[selectedFlow].steps;
      interval = setInterval(() => {
        setCurrentStep(prevStep => {
          if (prevStep < steps.length - 1) {
            return prevStep + 1;
          } else {
            setIsRunning(false);
            clearInterval(interval);
            return prevStep;
          }
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isRunning, selectedFlow]);

  const runSimulation = () => {
    if (!selectedFlow) return;
    setSimulation(automationFlows[selectedFlow]);
    setCurrentStep(0);
    setIsRunning(true);
  };

  const resetSimulation = () => {
    setSimulation(null);
    setSelectedFlow('');
    setCurrentStep(0);
    setIsRunning(false);
  };

  const selectedFlowData = selectedFlow ? automationFlows[selectedFlow] : null;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-cyan-900/70 rounded-2xl p-6 sm:p-8 border border-cyan-700/50 shadow-2xl shadow-cyan-500/10">
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <div className="bg-cyan-900/50 p-3 rounded-full border border-cyan-700">
          <Zap className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Simulador de Automatización</h2>
          <p className="text-cyan-300 text-sm sm:text-base">Visualiza el poder de la automatización en acción.</p>
        </div>
      </div>

      <div className="space-y-6">
        {!simulation ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700 space-y-4">
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-2">1. Elige un Flujo</label>
              <select value={selectedFlow} onChange={(e) => setSelectedFlow(e.target.value)} className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-white transition-all">
                <option value="">Selecciona una simulación...</option>
                {Object.entries(automationFlows).map(([key, flow]) => (
                  <option key={key} value={key}>{flow.name}</option>
                ))}
              </select>
            </div>
            {selectedFlowData && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-cyan-200 text-sm">
                <p>{selectedFlowData.description}</p>
              </motion.div>
            )}
            <button onClick={runSimulation} disabled={!selectedFlow} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 hover:shadow-cyan-500/40">
              <Play className="w-5 h-5" /> Iniciar Simulación
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-0 justify-between">
              <h3 className="text-xl font-bold text-white">{simulation.name}</h3>
              <button onClick={resetSimulation} className="flex items-center gap-2 text-sm text-cyan-300 hover:text-white transition-colors">
                <RefreshCw className="w-4 h-4" /> Reiniciar
              </button>
            </div>

            {/* Timeline */}
            <div className="relative w-full">
              <div className="absolute left-1/2 -translate-x-1/2 top-5 h-full w-0.5 bg-slate-700" aria-hidden="true"></div>
              <div className="absolute w-full top-5 h-0.5 bg-gradient-to-r from-slate-700 via-cyan-500 to-slate-700" style={{ clipPath: `inset(0 ${100 - (currentStep / (simulation.steps.length - 1)) * 100}% 0 0)` }}></div>
              
              <div className="flex justify-between gap-2">
                {simulation.steps.map((step, index) => {
                  const isActive = index <= currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={index} className="z-10">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-800 border-slate-600'} transition-all duration-500`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Current Step Info */}
            <div className="text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-cyan-300">{simulation.steps[currentStep].title}</h4>
                  <p className="text-slate-400 text-sm">{simulation.steps[currentStep].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Metrics */}
            {!isRunning && currentStep === simulation.steps.length - 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-bold text-white mb-3 text-center">Resultados Potenciales</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                  {Object.entries(simulation.metrics).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-2xl font-bold text-cyan-400">{value}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider">{key}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}