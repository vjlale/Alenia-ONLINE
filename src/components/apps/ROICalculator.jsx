import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, ChevronsUp, ChevronsDown, Info } from 'lucide-react';

export default function ROICalculator() {
  const [investment, setInvestment] = useState('');
  const [revenue, setRevenue] = useState('');
  const [roi, setRoi] = useState(null);
  const [roiPercentage, setRoiPercentage] = useState(null);

  const calculateROI = () => {
    const inv = parseFloat(investment);
    const rev = parseFloat(revenue);
    
    if (inv > 0 && rev >= 0) {
      const roiValue = rev - inv;
      const roiPercent = ((roiValue / inv) * 100);
      setRoi(roiValue);
      setRoiPercentage(roiPercent);
    } else {
      setRoi(null);
      setRoiPercentage(null);
    }
  };

  const getROIColor = () => {
    if (roiPercentage === null) return 'text-slate-300';
    if (roiPercentage > 0) return 'text-green-400';
    if (roiPercentage < 0) return 'text-red-400';
    return 'text-yellow-400';
  };

  const getROIMessage = () => {
    if (roiPercentage === null) return 'Esperando cálculo...';
    if (roiPercentage > 200) return '¡Retorno Excepcional!';
    if (roiPercentage > 100) return '¡Excelente Inversión!';
    if (roiPercentage > 50) return 'Muy Buen Retorno';
    if (roiPercentage > 0) return 'Retorno Positivo';
    if (roiPercentage < 0) return 'Retorno Negativo';
    return 'Punto de Equilibrio';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
  };

  return (
    <div className="bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-blue-800/50 shadow-2xl shadow-blue-500/10">
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <div className="bg-blue-900/50 p-3 rounded-full border border-blue-700">
          <Calculator className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Calculadora de ROI</h2>
          <p className="text-blue-300 text-sm sm:text-base">Estima el retorno de tu inversión.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Input Section */}
        <div className="space-y-6 bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700">
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Inversión Total (ARS)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400/70" />
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="Ej: 50000"
                className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-900 text-white placeholder:text-slate-500 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Ingresos Generados (ARS)
            </label>
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400/70" />
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="Ej: 120000"
                className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-900 text-white placeholder:text-slate-500 transition-all"
              />
            </div>
          </div>
          <button
            onClick={calculateROI}
            disabled={!investment || !revenue}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/40"
          >
            Calcular ROI
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-slate-800/40 p-4 sm:p-6 rounded-lg border border-slate-700 flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-bold text-white mb-4">Resultado del Análisis</h3>
          {roiPercentage !== null ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className={`text-5xl sm:text-6xl font-bold ${getROIColor()} mb-2`}>
                {roiPercentage.toFixed(1)}%
              </div>
              <div className={`text-lg font-semibold ${getROIColor()} mb-4`}>
                {getROIMessage()}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full text-left">
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="text-sm text-slate-400">Ganancia/Pérdida</p>
                  <p className={`text-xl font-bold ${getROIColor()}`}>{formatCurrency(roi)}</p>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="text-sm text-slate-400">Inversión Inicial</p>
                  <p className="text-xl font-bold text-slate-300">{formatCurrency(parseFloat(investment))}</p>
                </div>
              </div>
              <div className="mt-4 bg-slate-700/50 p-3 rounded-lg">
                  <p className="text-sm text-slate-400">Ingresos Totales</p>
                  <p className="text-xl font-bold text-slate-300">{formatCurrency(parseFloat(revenue))}</p>
              </div>
            </motion.div>
          ) : (
            <div className="text-slate-500">
              <Calculator size={48} className="mx-auto mb-4"/>
              <p>Ingresa los datos para ver el resultado.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 bg-blue-900/30 border border-blue-800/50 rounded-lg p-3 sm:p-4 flex items-start sm:items-center gap-3 text-sm text-blue-200">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>Interpretación:</strong> Un ROI del 100% significa que has duplicado tu inversión inicial. Un ROI negativo indica una pérdida.
        </p>
      </div>
    </div>
  );
}