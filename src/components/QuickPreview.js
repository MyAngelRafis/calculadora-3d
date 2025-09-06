import React from 'react';

const QuickPreview = ({ calculations, profitMargin }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
      <div className="text-center">
        <div className="text-3xl font-bold text-green-400 mb-2">
          {calculations.finalPrice.toFixed(2)}€
        </div>
        <div className="text-sm text-gray-300">
          Precio final de venta
        </div>
        <div className="text-xs text-purple-300 mt-2">
          Beneficio: +{calculations.profitAmount.toFixed(2)}€ ({profitMargin}%)
        </div>
      </div>
    </div>
  );
};

export default QuickPreview;