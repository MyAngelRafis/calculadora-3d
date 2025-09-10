import React from 'react';
import { getConfigs, deleteConfig } from '../api/configService';

const ConfigsTab = ({ onImport }) => {
  const [configs, setConfigs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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

  if (loading) return <div>Cargando configuraciones...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configuraciones guardadas</h2>
      
      {configs.length === 0 ? (
        <p>No hay configuraciones guardadas</p>
      ) : (
        <div className="grid gap-4">
          {configs.map((config) => (
            <div key={config._id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{config.name}</h3>
                  <p className="text-gray-400">{config.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onImport(config._id)}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Importar
                  </button>
                  <button
                    onClick={() => handleDelete(config._id)}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
                  Ver detalles
                </summary>
                <div className="mt-2 bg-gray-900 p-4 rounded">
                  <h4 className="font-semibold mb-2">Parámetros:</h4>
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(config.params, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfigsTab;