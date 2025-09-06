import React from 'react';

const SummaryCard = ({ title, value, percentage, gradientFrom, gradientTo, borderColor, textColor }) => {
  return (
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-sm rounded-xl border ${borderColor} p-6`}>
      <div className={`${textColor} text-sm font-medium mb-1`}>{title}</div>
      <div className="text-2xl font-bold text-white">{value}€</div>
      <div className="text-xs text-gray-400 mt-1">
        {percentage}% del coste
      </div>
    </div>
  );
};

const SummaryCards = ({ calculations }) => {
  const cards = [
    {
      title: 'Material',
      value: calculations.materialCost.toFixed(2),
      percentage: ((calculations.materialCost / calculations.costWithSafety) * 100).toFixed(1),
      gradientFrom: 'from-blue-600/20',
      gradientTo: 'to-blue-800/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400'
    },
    {
      title: 'Mano de Obra',
      value: calculations.laborCost.toFixed(2),
      percentage: ((calculations.laborCost / calculations.costWithSafety) * 100).toFixed(1),
      gradientFrom: 'from-green-600/20',
      gradientTo: 'to-green-800/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400'
    },
    {
      title: 'Electricidad',
      value: calculations.electricityCost.toFixed(2),
      percentage: ((calculations.electricityCost / calculations.costWithSafety) * 100).toFixed(1),
      gradientFrom: 'from-yellow-600/20',
      gradientTo: 'to-yellow-800/20',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-400'
    },
    {
      title: 'Margen Seguridad',
      value: calculations.safetyMarginCost.toFixed(2),
      percentage: ((calculations.safetyMarginCost / calculations.costWithSafety) * 100).toFixed(1),
      gradientFrom: 'from-red-600/20',
      gradientTo: 'to-red-800/20',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-400'
    },
    {
      title: 'Precio Final',
      value: calculations.finalPrice.toFixed(2),
      percentage: `+${calculations.profitAmount.toFixed(2)}€ beneficio`,
      gradientFrom: 'from-purple-600/20',
      gradientTo: 'to-purple-800/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
};

export default SummaryCards;