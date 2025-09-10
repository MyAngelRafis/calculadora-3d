import React, { useState } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import Header from './Header';
import NavigationTabs from './NavigationTabs';
import CalculatorTab from './CalculatorTab';
import ResultsTab from './ResultsTab';
import ConfigsTab from './ConfigsTab';  // Añade esta línea
import { getConfigById, saveConfig } from '../api/configService';

const Calculator3D = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const { params, setParams, calculations, chartData, handleParamChange } = useCalculator();

  const handleImport = async (id) => {
    try {
      const config = await getConfigById(id);
      setParams(config.params);
      setActiveTab('calculator');
      alert('Configuración cargada con éxito');
    } catch (error) {
      alert('Error al cargar la configuración');
    }
  };

  const handleExport = async () => {
    try {
      const config = {
        name: params.pieceName || 'Sin nombre',
        description: params.description || 'Sin descripción',
        params
      };
      await saveConfig(config);
      alert('Configuración guardada con éxito');
    } catch (error) {
      alert('Error al guardar la configuración');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <Header />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {activeTab === 'calculator' && (
          <CalculatorTab
            params={params}
            calculations={calculations}
            handleParamChange={handleParamChange}
            onSave={handleExport}
          />
        )}
        {activeTab === 'results' && (
          <ResultsTab
            calculations={calculations}
            chartData={chartData}
            params={params}
            onSave={handleExport}
          />
        )}
        {activeTab === 'configs' && (
          <ConfigsTab onImport={handleImport} />
        )}
      </div>
    </div>
  );
};

export default Calculator3D;