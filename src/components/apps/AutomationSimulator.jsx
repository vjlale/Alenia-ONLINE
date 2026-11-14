import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Play, MessageCircle, Mail, Calendar, CheckCircle, ArrowRight, RefreshCw, BarChart2, QrCode, CreditCard, Cpu, DoorOpen } from 'lucide-react';

export default function AutomationSimulator() {
  const [selectedFlow, setSelectedFlow] = useState('');
  const [simulation, setSimulation] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const automationFlows = {
    'lavado-qr': {
      name: 'Lavado con QR en una lavandería sin personal',
      description: 'El cliente paga desde el celular y la lavadora arranca sola.',
      steps: [
        { icon: QrCode, title: 'Escanea el QR', desc: 'El cliente escanea el QR de la máquina con su celular.' },
        { icon: CreditCard, title: 'Paga', desc: 'Paga con Mercado Pago o con su saldo.' },
        { icon: Cpu, title: 'La máquina arranca', desc: 'Al confirmarse el pago, la placa activa la lavadora.' },
        { icon: MessageCircle, title: 'Aviso al cliente', desc: 'Recibe un aviso cuando termina el ciclo.' },
        { icon: BarChart2, title: 'Registro en el panel', desc: 'La venta y el estado de la máquina quedan en el panel.' }
      ],
      metrics: {
        'Cobro': 'Digital',
        'Activación': 'Automática',
        'Personal en caja': 'No hace falta',
        'Control': 'En tiempo real'
      }
    },
    'vending-credito': {
      name: 'Compra en una máquina vending',
      description: 'Saldo cargado desde la app y código para marcar en la expendedora.',
      steps: [
        { icon: CreditCard, title: 'Carga de saldo', desc: 'El cliente carga saldo desde la app o el tótem.' },
        { icon: QrCode, title: 'Elige el producto', desc: 'Selecciona qué quiere comprar.' },
        { icon: Zap, title: 'Código de compra', desc: 'La app muestra el código para marcar en la máquina.' },
        { icon: CheckCircle, title: 'Entrega', desc: 'La expendedora entrega el producto.' },
        { icon: BarChart2, title: 'Stock y caja', desc: 'Ventas y stock se actualizan en el panel.' }
      ],
      metrics: {
        'Pago': 'Sin efectivo',
        'Saldo': 'En la app',
        'Ventas': 'Registradas',
        'Stock': 'Actualizado'
      }
    },
    'acceso-qr': {
      name: 'Acceso al local con QR',
      description: 'La puerta abre sola para clientes habilitados, sin llaves ni personal.',
      steps: [
        { icon: QrCode, title: 'QR en el celular', desc: 'El cliente muestra su QR en la entrada.' },
        { icon: CheckCircle, title: 'Validación', desc: 'El sistema verifica que esté habilitado.' },
        { icon: DoorOpen, title: 'Apertura', desc: 'La cerradura se abre automáticamente.' },
        { icon: Calendar, title: 'Registro', desc: 'Queda registrado quién entró y a qué hora.' },
        { icon: Mail, title: 'Alertas', desc: 'Si algo falla, el dueño recibe una alerta.' }
      ],
      metrics: {
        'Apertura': 'Con QR',
        'Llaves': 'No hacen falta',
        'Registro': 'De cada ingreso',
        'Horario': 'Puede ser 24/7'
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
          <p className="text-cyan-300 text-sm sm:text-base">Visualizá el poder de la automatización en acción.</p>
        </div>
      </div>

      <div className="space-y-6">
        {!simulation ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700 space-y-4">
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-2">1. Elegí un flujo</label>
              <select value={selectedFlow} onChange={(e) => setSelectedFlow(e.target.value)} className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-white transition-all">
                <option value="">Seleccioná una simulación...</option>
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