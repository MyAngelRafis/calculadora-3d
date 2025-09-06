import React, { useState, useMemo } from 'react';
import { Calculator, Settings, PieChart, FileText, Euro } from 'lucide-react';

const Calculator3D = () => {
  const [params, setParams] = useState({
    filamentCost: 25.00,        // EUR per kg
    pieceWeight: 50,            // grams
    printTime: 120,             // minutes
    laborTime: 30,              // minutes
    laborCost: 15.00,           // EUR per hour
    powerConsumption: 200,      // Watts
    electricityPrice: 0.25,     // EUR per kWh
    safetyMargin: 1.2,          // factor
    profitMargin: 25            // percentage
  });

  const [activeTab, setActiveTab] = useState('calculator');

  const handleParamChange = (key, value) => {
    setParams(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const calculations = useMemo(() => {
    // Material cost (filament)
    const materialCost = (params.filamentCost * params.pieceWeight) / 1000;
    
    // Labor cost
    const laborCost = (params.laborCost * params.laborTime) / 60;
    
    // Electricity cost
    const electricityCost = (params.powerConsumption * params.printTime * params.electricityPrice) / (60 * 1000);
    
    // Base cost
    const baseCost = materialCost + laborCost + electricityCost;
    
    // Cost with safety margin
    const costWithSafety = baseCost * params.safetyMargin;
    
    // Safety margin cost
    const safetyMarginCost = costWithSafety - baseCost;
    
    // Final price with profit margin
    const finalPrice = costWithSafety * (1 + params.profitMargin / 100);
    
    return {
      materialCost,
      laborCost,
      electricityCost,
      safetyMarginCost,
      baseCost,
      costWithSafety,
      finalPrice,
      profitAmount: finalPrice - costWithSafety
    };
  }, [params]);

  const chartData = [
    { name: 'Material', value: calculations.materialCost, color: '#3B82F6' },
    { name: 'Mano de Obra', value: calculations.laborCost, color: '#10B981' },
    { name: 'Electricidad', value: calculations.electricityCost, color: '#F59E0B' },
    { name: 'Margen Seguridad', value: calculations.safetyMarginCost, color: '#EF4444' }
  ];

  const PieChartComponent = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return (
      <div className="relative w-80 h-80 mx-auto">
        <svg width="320" height="320" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;
            
            const startAngleRad = (startAngle * Math.PI) / 180;
            const endAngleRad = (currentAngle * Math.PI) / 180;
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            const x1 = 160 + 120 * Math.cos(startAngleRad);
            const y1 = 160 + 120 * Math.sin(startAngleRad);
            const x2 = 160 + 120 * Math.cos(endAngleRad);
            const y2 = 160 + 120 * Math.sin(endAngleRad);
            
            const pathData = [
              `M 160 160`,
              `L ${x1} ${y1}`,
              `A 120 120 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-sm">
                <div className="text-gray-300 font-medium">{item.name}</div>
                <div className="text-white font-semibold">{item.value.toFixed(2)}€</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <style jsx>{`
        .profit-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 5px;
          background: linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${params.profitMargin}%, #374151 ${params.profitMargin}%, #374151 100%);
          outline: none;
          cursor: pointer;
        }
        
        .profit-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #8B5CF6;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
          transition: all 0.2s ease;
        }
        
        .profit-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
        }
        
        .profit-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #8B5CF6;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
          transition: all 0.2s ease;
        }
        
        .profit-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
        }
      `}</style>
      
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Calculadora de Precios 3D
              </h1>
              <p className="text-gray-400 text-sm">Calculadora profesional para impresión 3D</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex space-x-1 bg-gray-800/30 p-1 rounded-lg backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === 'calculator' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Parámetros</span>
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === 'results' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Resultados</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Parameters Section */}
            <div className="space-y-6">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span>Parámetros de Material</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Coste del filamento (€/kg)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={params.filamentCost}
                      onChange={(e) => handleParamChange('filamentCost', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Peso de la pieza (gramos)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={params.pieceWeight}
                      onChange={(e) => handleParamChange('pieceWeight', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-green-400" />
                  <span>Tiempos y Mano de Obra</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tiempo de impresión (minutos)
                    </label>
                    <input
                      type="number"
                      value={params.printTime}
                      onChange={(e) => handleParamChange('printTime', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tiempo de mano de obra (minutos)
                    </label>
                    <input
                      type="number"
                      value={params.laborTime}
                      onChange={(e) => handleParamChange('laborTime', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Coste de mano de obra (€/hora)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={params.laborCost}
                      onChange={(e) => handleParamChange('laborCost', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Euro className="w-5 h-5 text-yellow-400" />
                  <span>Costes Energéticos</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Consumo eléctrico (W)
                    </label>
                    <input
                      type="number"
                      value={params.powerConsumption}
                      onChange={(e) => handleParamChange('powerConsumption', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Precio electricidad (€/kWh)
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      value={params.electricityPrice}
                      onChange={(e) => handleParamChange('electricityPrice', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  <span>Márgenes</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Margen de seguridad (factor)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={params.safetyMargin}
                      onChange={(e) => handleParamChange('safetyMargin', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Margen de beneficio (%)
                    </label>
                    <div className="space-y-4">
                      {/* Slider */}
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={params.profitMargin}
                          onChange={(e) => handleParamChange('profitMargin', e.target.value)}
                          className="profit-slider w-full"
                          style={{
                            background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${params.profitMargin}%, #374151 ${params.profitMargin}%, #374151 100%)`
                          }}
                        />
                      </div>
                      
                      {/* Slider Labels */}
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>0%</span>
                        <div className="bg-purple-600/30 px-3 py-1 rounded-full border border-purple-500/50">
                          <span className="text-purple-300 font-semibold text-sm">{params.profitMargin}%</span>
                        </div>
                        <span>100%</span>
                      </div>
                      
                      {/* Numeric Input */}
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={params.profitMargin}
                        onChange={(e) => handleParamChange('profitMargin', e.target.value)}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                        placeholder="Valor exacto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Results Preview */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
                <h3 className="text-lg font-semibold mb-4">Vista Previa del Precio</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {calculations.finalPrice.toFixed(2)}€
                  </div>
                  <div className="text-sm text-gray-300">
                    Precio final de venta
                  </div>
                  <div className="text-xs text-purple-300 mt-2">
                    Beneficio: +{calculations.profitAmount.toFixed(2)}€ ({params.profitMargin}%)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
                <div className="text-blue-400 text-sm font-medium mb-1">Material</div>
                <div className="text-2xl font-bold text-white">{calculations.materialCost.toFixed(2)}€</div>
                <div className="text-xs text-gray-400 mt-1">
                  {((calculations.materialCost / calculations.costWithSafety) * 100).toFixed(1)}% del coste
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
                <div className="text-green-400 text-sm font-medium mb-1">Mano de Obra</div>
                <div className="text-2xl font-bold text-white">{calculations.laborCost.toFixed(2)}€</div>
                <div className="text-xs text-gray-400 mt-1">
                  {((calculations.laborCost / calculations.costWithSafety) * 100).toFixed(1)}% del coste
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6">
                <div className="text-yellow-400 text-sm font-medium mb-1">Electricidad</div>
                <div className="text-2xl font-bold text-white">{calculations.electricityCost.toFixed(2)}€</div>
                <div className="text-xs text-gray-400 mt-1">
                  {((calculations.electricityCost / calculations.costWithSafety) * 100).toFixed(1)}% del coste
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-sm rounded-xl border border-red-500/30 p-6">
                <div className="text-red-400 text-sm font-medium mb-1">Margen Seguridad</div>
                <div className="text-2xl font-bold text-white">{calculations.safetyMarginCost.toFixed(2)}€</div>
                <div className="text-xs text-gray-400 mt-1">
                  {((calculations.safetyMarginCost / calculations.costWithSafety) * 100).toFixed(1)}% del coste
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
                <div className="text-purple-400 text-sm font-medium mb-1">Precio Final</div>
                <div className="text-2xl font-bold text-white">{calculations.finalPrice.toFixed(2)}€</div>
                <div className="text-xs text-gray-400 mt-1">
                  +{calculations.profitAmount.toFixed(2)}€ beneficio
                </div>
              </div>
            </div>

            {/* Chart and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-6 text-center">Distribución de Costes</h3>
                <PieChartComponent data={chartData} />
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-6">Desglose Detallado</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Pieza:</span>
                    <span className="font-semibold text-blue-400">{params.pieceName || 'Sin nombre'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Coste base material:</span>
                    <span className="font-semibold">{calculations.materialCost.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Coste mano de obra:</span>
                    <span className="font-semibold">{calculations.laborCost.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Coste electricidad:</span>
                    <span className="font-semibold">{calculations.electricityCost.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Subtotal:</span>
                    <span className="font-semibold">{calculations.baseCost.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Margen seguridad ({((params.safetyMargin - 1) * 100).toFixed(0)}%):</span>
                    <span className="font-semibold text-red-400">+{calculations.safetyMarginCost.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Coste con seguridad:</span>
                    <span className="font-semibold">{calculations.costWithSafety.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Margen beneficio ({params.profitMargin}%):</span>
                    <span className="font-semibold text-green-400">+{calculations.profitAmount.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 border-blue-500/50">
                    <span className="text-lg font-bold text-blue-400">PRECIO FINAL:</span>
                    <span className="text-2xl font-bold text-green-400">{calculations.finalPrice.toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator3D;