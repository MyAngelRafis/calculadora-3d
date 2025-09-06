import React, { useState } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import Header from './Header';
import NavigationTabs from './NavigationTabs';
import CalculatorTab from './CalculatorTab';
import ResultsTab from './ResultsTab';

const Calculator3D = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const { params, calculations, chartData, handleParamChange } = useCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {activeTab === 'calculator' && (
          <CalculatorTab
            params={params}
            calculations={calculations}
            handleParamChange={handleParamChange}
          />
        )}

        {activeTab === 'results' && (
          <ResultsTab
            calculations={calculations}
            chartData={chartData}
            params={params}
          />
        )}
      </div>
    </div>
  );
};

export default Calculator3D;