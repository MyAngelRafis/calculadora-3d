import React from 'react';

const BreakdownRow = ({ label, value, isSubtotal = false, isTotal = false, color = 'text-white' }) => {
  const baseClasses = "flex justify-between items-center py-2";
  const borderClass = isTotal ? "border-t-2 border-blue-500/50" : "border-b border-gray-700/50";
  const textClass = isTotal ? "text-lg font-bold" : isSubtotal ? "font-semibold" : "";
  
  return (
    <div className={`${baseClasses} ${borderClass} ${isTotal ? 'py-3' : ''}`}>
      <span className={`${isTotal ? 'text-blue-400' : 'text-gray-300'} ${textClass}`}>
        {label}
      </span>
      <span className={`${color} ${textClass} ${isTotal ? 'text-2xl' : ''}`}>
        {value}
      </span>
    </div>
  );
};

const CostBreakdown = ({ calculations, params }) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <h3 className="text-lg font-semibold mb-6">Desglose Detallado</h3>
      <div className="space-y-4">
      
        <BreakdownRow 
          label="Coste base material:" 
          value={`${calculations.materialCost.toFixed(2)}€`} 
        />
        <BreakdownRow 
          label="Coste mano de obra:" 
          value={`${calculations.laborCost.toFixed(2)}€`} 
        />
        <BreakdownRow 
          label="Coste electricidad:" 
          value={`${calculations.electricityCost.toFixed(2)}€`} 
        />
        <BreakdownRow 
          label="Subtotal:" 
          value={`${calculations.baseCost.toFixed(2)}€`} 
          isSubtotal={true}
        />
        <BreakdownRow 
          label={`Margen seguridad (${((params.safetyMargin - 1) * 100).toFixed(0)}%):`} 
          value={`+${calculations.safetyMarginCost.toFixed(2)}€`} 
          color="text-red-400"
        />
        <BreakdownRow 
          label="Coste con seguridad:" 
          value={`${calculations.costWithSafety.toFixed(2)}€`} 
          isSubtotal={true}
        />
        <BreakdownRow 
          label={`Margen beneficio (${params.profitMargin}%):`} 
          value={`+${calculations.profitAmount.toFixed(2)}€`} 
          color="text-green-400"
        />
        <BreakdownRow 
          label="PRECIO FINAL:" 
          value={`${calculations.finalPrice.toFixed(2)}€`} 
          color="text-green-400"
          isTotal={true}
        />
      </div>
    </div>
  );
};

export default CostBreakdown;