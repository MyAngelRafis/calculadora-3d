import React, { useState, useEffect } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import Header from './Header';
import NavigationTabs from './NavigationTabs';
import CalculatorTab from './CalculatorTab';
import ResultsTab from './ResultsTab';
import { getConfigs, saveConfig, getConfigById } from '../api/configService'; // importa las funciones de la API

const Calculator3D = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const { params, setParams, calculations, chartData, handleParamChange } = useCalculator();
  const [configs, setConfigs] = useState([]);

  // Cargar configuraciones al montar
  useEffect(() => {
    getConfigs().then(setConfigs);
  }, []);

  // Guardar configuración actual
  const handleExport = async () => {
    const config = {
      name: params.pieceName,
      description: params.description,
      params
    };
    await saveConfig(config);
    alert("Configuración guardada");
    setConfigs(await getConfigs());
  };

  // Importar (cargar) una configuración
  const handleImport = async (id) => {
    const config = await getConfigById(id);
    setParams(config.params); // Actualiza los parámetros de la calculadora
    alert(`Configuración "${config.name}" cargada`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Botones de exportar/importar */}
        <div className="mb-6 flex gap-4">
          <button onClick={handleExport} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Exportar configuración</button>
          <div>
            <span className="mr-2">Importar:</span>
            <select onChange={e => e.target.value && handleImport(e.target.value)} defaultValue="">
              <option value="" disabled>Selecciona una configuración</option>
              {configs.map(cfg => (
                <option key={cfg._id} value={cfg._id}>
                  {cfg.name} - {cfg.description}
                </option>
              ))}
            </select>
          </div>
        </div>

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