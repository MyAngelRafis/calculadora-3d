import React, { useState, useEffect } from 'react';
import { Trash2, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { getConfigs, deleteConfig } from '../api/configService';

const ConfigsTab = ({ onImport }) => {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    const data = await getConfigs();
    setConfigs(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar esta configuración?')) {
      await deleteConfig(id);
      await loadConfigs();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Cargando configuraciones...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Configuraciones guardadas</h2>
      
      {configs.length === 0 ? (
        <div className="bg-gray-800/50 rounded-lg p-8 text-center text-gray-400">
          No hay configuraciones guardadas
        </div>
      ) : (
        <div className="space-y-4">
          {configs.map((config) => (
            <div key={config._id} 
                 className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 transition-all duration-200 hover:bg-gray-800/70">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{config.name || 'Sin nombre'}</h3>
                  <p className="text-gray-400 text-sm mt-1">{config.description || 'Sin descripción'}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onImport(config._id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Importar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(config._id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setExpandedId(expandedId === config._id ? null : config._id)}
                className="flex items-center space-x-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                {expandedId === config._id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <span>Ver detalles</span>
              </button>
              
              {expandedId === config._id && (
                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-400 mb-2">Material</h4>
                      <div className="space-y-1 text-sm">
                        <p>Coste filamento: {config.params.filamentCost}€/kg</p>
                        <p>Peso pieza: {config.params.pieceWeight}g</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-400 mb-2">Tiempos</h4>
                      <div className="space-y-1 text-sm">
                        <p>Tiempo impresión: {config.params.printTime}min</p>
                        <p>Tiempo mano obra: {config.params.laborTime}min</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfigsTab;