import React from 'react';
import SummaryCards from './SummaryCards';
import PieChart from './PieChart';
import CostBreakdown from './CostBreakdown';

const ResultsTab = ({ calculations, chartData, params }) => {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <SummaryCards calculations={calculations} />

      {/* Chart and Details */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
  <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 flex-1">
    <h3 className="text-lg font-semibold mb-6 text-center">Distribución de Costes</h3>
    <PieChart data={chartData} />
  </div>

  <div className="flex-1">
    <CostBreakdown calculations={calculations} params={params} />
  </div>
</div>
    </div>
  );
};

export default ResultsTab;