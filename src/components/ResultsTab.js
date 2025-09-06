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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold mb-6 text-center">Distribución de Costes</h3>
          <PieChart data={chartData} />
        </div>

        <CostBreakdown calculations={calculations} params={params} />
      </div>
    </div>
  );
};

export default ResultsTab;