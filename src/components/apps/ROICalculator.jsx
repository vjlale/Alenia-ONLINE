import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

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
    }
  };

  const getROIColor = () => {
    if (roiPercentage === null) return 'text-white-900';
    if (roiPercentage > 0) return 'text-green-600';
    if (roiPercentage < 0) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getROIMessage = () => {
    if (roiPercentage === null) return '';
    if (roiPercentage > 200) return '¡Excelente ROI!';
    if (roiPercentage > 100) return '¡Muy buen ROI!';
    if (roiPercentage > 0) return 'ROI Positivo';
    if (roiPercentage < 0) return 'ROI Negativo';
    return 'Punto de equilibrio';
  };

  return (
    <div className="bg-brand-primary rounded-2xl p-2 box-shadow-card glow-btn border border-brand">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-brand-accent" />
        <h2 className="text-2xl font-bold text-white-400 text-shadow-glow">Calculadora de ROI</h2>
      </div>
      <p className="text-slate-300 mb-8">
        Calcula el retorno de inversión de tus campañas de marketing digital
      </p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-purple-400 accent mb-2">
            Inversión Total ($)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-accent" />
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              placeholder="10000"
              className="w-full pl-10 pr-4 py-3 border border-brand rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-black/30 text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-400 accent mb-2">
            Ingresos Generados ($)
          </label>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-accent" />
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="25000"
              className="w-full pl-10 pr-4 py-3 border border-brand rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-black/30 text-white-100 placeholder:text-slate-400"
            />
          </div>
        </div>
        <button
          onClick={calculateROI}
          className="w-full bg-brand-gradient glow-btn text-brand-secondary font-bold py-3 px-6 rounded-lg transition-all duration-300"
        >
          Calcular ROI
        </button>
        {roi !== null && (
          <div className="bg-purple-60 rounded-lg p-7 border-cyan-border">
            <h3 className="text-lg font-bold text-white-brand-accent text-shadow-glow mb-2">Resultados:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-19">
              <div className="text-center">
                <div className="text-2xl font-bold text-white-brand-accent">
                  ${roi.toLocaleString()}
                </div>
                <div className="text-bold text-purple-400">Ganancia/Pérdida</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white-text-brand-secondary">
                  {roiPercentage.toFixed(1)}%
                </div>
                <div className="text-bold text-purple-400">ROI Porcentual</div>
              </div>
            </div>
            <div className="text-center mt-6 font-bold text-cyan-400 text-shadow-glow">
              {getROIMessage()}
            </div>
            <div className="mt-9 text-sm text-cyan-400">
              <p><strong>Fórmula:</strong> ROI = (Ingresos - Inversión) / Inversión × 100</p>
              <p className="mt-2">
                <strong>Interpretación:</strong> Un ROI del 100% significa que duplicaste tu inversión.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}