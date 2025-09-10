import { useState, useMemo } from 'react';

export const useCalculator = () => {
  const [params, setParams] = useState({
    filamentCost: 15.00,        // EUR per kg
    pieceWeight: 50,            // grams
    printTime: 120,             // minutes
    laborTime: 15,              // minutes
    laborCost: 10.00,           // EUR per hour
    powerConsumption: 100,      // Watts
    electricityPrice: 0.25,     // EUR per kWh
    safetyMargin: 1.2,          // factor
    profitMargin: 50,           // percentage
    pieceName: "Mi Pieza 3D",
    description: "Descripción de la pieza",
  });

  const handleParamChange = (key, value) => {
    // Lista de campos que deben ser numéricos
    const numericFields = [
      "filamentCost",
      "pieceWeight",
      "printTime",
      "laborTime",
      "laborCost",
      "powerConsumption",
      "electricityPrice",
      "safetyMargin",
      "profitMargin"
    ];

    setParams(prev => ({
      ...prev,
      [key]: numericFields.includes(key) ? parseFloat(value) || 0 : value
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

  return {
    params,
    setParams,
    calculations,
    chartData,
    handleParamChange
  };
};