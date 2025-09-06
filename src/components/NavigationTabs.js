import React from 'react';
import { Settings, PieChart } from 'lucide-react';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default NavigationTabs;