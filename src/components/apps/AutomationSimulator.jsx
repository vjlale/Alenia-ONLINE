import { useState } from 'react';
import { Zap, Play, MessageCircle, Mail, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

export default function AutomationSimulator() {
  const [selectedFlow, setSelectedFlow] = useState('');
  const [simulation, setSimulation] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const automationFlows = {
    'whatsapp-leads': {
      name: 'Captura de Leads por WhatsApp',
      description: 'Automatiza la captura y seguimiento de leads via WhatsApp',
      steps: [
        { icon: <MessageCircle className="w-5 h-5" />, title: 'Cliente envía mensaje', desc: 'Nuevo contacto inicia conversación' },
        { icon: <Zap className="w-5 h-5" />, title: 'Respuesta automática', desc: 'Bot responde instantáneamente' },
        { icon: <CheckCircle className="w-5 h-5" />, title: 'Califica lead', desc: 'Sistema evalúa interés del cliente' },
        { icon: <Calendar className="w-5 h-5" />, title: 'Agenda cita', desc: 'Propone horarios disponibles' },
        { icon: <Mail className="w-5 h-5" />, title: 'Notifica al equipo', desc: 'Envía alerta a vendedores' }
      ],
      metrics: {
        responseTime: '< 30 segundos',
        conversionRate: '35%',
        timeSaved: '4 horas/día',
        leadQuality: '85%'
      }
    },
    'email-nurturing': {
      name: 'Nutrición de Leads por Email',
      description: 'Secuencia automatizada de emails para convertir leads',
      steps: [
        { icon: <Mail className="w-5 h-5" />, title: 'Lead se registra', desc: 'Nuevo suscriptor en la lista' },
        { icon: <Zap className="w-5 h-5" />, title: 'Email de bienvenida', desc: 'Envío inmediato de bienvenida' },
        { icon: <Calendar className="w-5 h-5" />, title: 'Secuencia programada', desc: 'Serie de emails educativos' },
        { icon: <CheckCircle className="w-5 h-5" />, title: 'Trackea engagement', desc: 'Monitorea aperturas y clicks' },
        { icon: <MessageCircle className="w-5 h-5" />, title: 'Oferta personalizada', desc: 'Propuesta basada en comportamiento' }
      ],
      metrics: {
        openRate: '45%',
        clickRate: '12%',
        conversionRate: '8%',
        timeSaved: '6 horas/día'
      }
    },
    'social-posting': {
      name: 'Publicación en Redes Sociales',
      description: 'Automatiza la publicación de contenido en múltiples plataformas',
      steps: [
        { icon: <Calendar className="w-5 h-5" />, title: 'Contenido programado', desc: 'Posts listos en calendario' },
        { icon: <Zap className="w-5 h-5" />, title: 'Publicación automática', desc: 'Publica en horarios óptimos' },
        { icon: <CheckCircle className="w-5 h-5" />, title: 'Monitorea engagement', desc: 'Rastrea likes, shares, comentarios' },
        { icon: <MessageCircle className="w-5 h-5" />, title: 'Responde comentarios', desc: 'Bot responde preguntas frecuentes' },
        { icon: <Mail className="w-5 h-5" />, title: 'Reporte semanal', desc: 'Envía métricas de rendimiento' }
      ],
      metrics: {
        postsPerWeek: '21 posts',
        engagement: '+65%',
        reach: '+120%',
        timeSaved: '8 horas/semana'
      }
    }
  };

  const runSimulation = () => {
    if (!selectedFlow) return;
    
    setSimulation(automationFlows[selectedFlow]);
    setCurrentStep(0);
    setIsRunning(true);
    
    // Simular pasos uno por uno
    const steps = automationFlows[selectedFlow].steps;
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex < steps.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 1500);
  };

  const resetSimulation = () => {
    setSimulation(null);
    setCurrentStep(0);
    setIsRunning(false);
  };

  return (
    <div className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-8 h-8 text-brand-accent" />
        <h2 className="text-2xl font-bold text-brand-accent text-shadow-glow">Simulador de Automatizaciones</h2>
      </div>
      <p className="text-slate-300 mb-8">
        Visualiza cómo funcionan las automatizaciones en tu negocio
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-brand-accent mb-2">
            Selecciona un Flujo de Automatización
          </label>
          <select
            value={selectedFlow}
            onChange={(e) => setSelectedFlow(e.target.value)}
            className="w-full px-4 py-3 border border-brand rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-black/30 text-slate-100"
          >
            <option value="">Elige un flujo para simular</option>
            {Object.entries(automationFlows).map(([key, flow]) => (
              <option key={key} value={key}>{flow.name}</option>
            ))}
          </select>
        </div>

        {selectedFlow && !simulation && (
          <div className="bg-black/40 rounded-lg p-6 border border-brand">
            <h3 className="font-bold text-brand-accent text-shadow-glow mb-2">
              {automationFlows[selectedFlow].name}
            </h3>
            <p className="text-slate-300 mb-4">
              {automationFlows[selectedFlow].description}
            </p>
                <button
                  onClick={runSimulation}
                  className="bg-brand-gradient glow-btn btn-black-bold text-brand-secondary font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
              <Play className="w-5 h-5" />
              Iniciar Simulación
            </button>
          </div>
        )}

        {simulation && (
          <div className="bg-black/40 rounded-lg p-6 border border-brand space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-brand-accent text-shadow-glow">
                Simulando: {simulation.name}
              </h3>
              <button
                onClick={resetSimulation}
                className="text-brand-secondary hover:text-brand-accent font-medium"
              >
                Reiniciar
              </button>
            </div>

            {/* Pasos de la automatización */}
            <div className="space-y-4">
              {simulation.steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                    index <= currentStep
                      ? 'bg-brand-gradient border-2 border-brand'
                      : 'bg-black/30 border-2 border-brand'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    index <= currentStep
                      ? 'bg-brand-accent text-black'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    {index <= currentStep ? <CheckCircle className="w-5 h-5" /> : step.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-bold ${
                      index <= currentStep ? 'text-brand-accent text-shadow-glow' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-sm ${
                      index <= currentStep ? 'text-brand-secondary' : 'text-slate-500'
                    }`}>
                      {step.desc}
                    </p>
                  </div>

                  {index < simulation.steps.length - 1 && (
                    <ArrowRight className={`w-5 h-5 ${
                      index < currentStep ? 'text-brand-accent' : 'text-slate-400'
                    }`} />
                  )}

                  {index === currentStep && isRunning && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-accent"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Métricas esperadas */}
            <div className="bg-brand-gradient rounded-lg p-4 border border-brand">
              <h4 className="font-bold text-brand-secondary text-shadow-glow mb-4">Resultados Esperados</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(simulation.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-brand-accent">{value}</div>
                    <div className="text-sm text-slate-100 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!isRunning && currentStep === simulation.steps.length - 1 && (
              <div className="bg-brand-gradient border border-brand rounded-lg p-4">
                <p className="text-brand-accent font-medium text-shadow-glow">
                  ✅ ¡Automatización completada! Este flujo se ejecutaría automáticamente 
                  24/7 sin intervención manual.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="bg-brand-gradient border border-brand rounded-lg p-4">
          <p className="text-sm text-brand-secondary">
            <strong>💡 Tip:</strong> Estas automatizaciones pueden implementarse en tu negocio. 
            Contacta con nuestro equipo para una consulta personalizada y descubre cómo 
            automatizar tus procesos específicos.
          </p>
        </div>
      </div>
    </div>
  );
}