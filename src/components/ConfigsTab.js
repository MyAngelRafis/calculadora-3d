import React, { useState, useEffect } from 'react';
import { 
  Trash2, Download, ChevronDown, ChevronUp, Clock, Weight, 
  DollarSign, Timer, Package, Shield, TrendingUp, Zap 
} from 'lucide-react';
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

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <div className="text-slate-400 text-lg">Cargando configuraciones...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderParameterCard = (icon, title, value, IconComponent, iconColor) => (
    <div className="flex items-start space-x-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
      <div className={`flex-shrink-0 w-10 h-10 bg-${iconColor}-500/20 rounded-lg flex items-center justify-center`}>
        <IconComponent className={`w-5 h-5 text-${iconColor}-400`} />
      </div>
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-white text-lg font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Configuraciones Guardadas
          </h1>
          <p className="text-slate-400 text-lg">Gestiona tus configuraciones de impresión 3D</p>
        </div>

        {configs.length === 0 ? (
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-12 text-center shadow-2xl">
            <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No hay configuraciones guardadas</h3>
            <p className="text-slate-400">Crea tu primera configuración para empezar</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {configs.map((config) => (
              <div
                key={config._id}
                className="group bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                {/* Config Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {config.name || 'Sin nombre'}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-base leading-relaxed">
                      {config.description || 'Sin descripción'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 ml-6">
                    <button
                      onClick={() => onImport(config._id)}
                      className="group/btn flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                    >
                      <Download className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                      <span className="font-medium">Importar</span>
                    </button>
                    
                    <button
                      onClick={() => handleDelete(config._id)}
                      className="group/btn flex items-center justify-center w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Toggle Details Button */}
                <button
                  onClick={() => setExpandedId(expandedId === config._id ? null : config._id)}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium group/toggle"
                >
                  {expandedId === config._id ? (
                    <ChevronUp className="w-4 h-4 group-hover/toggle:-translate-y-0.5 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 group-hover/toggle:translate-y-0.5 transition-transform" />
                  )}
                  <span>{expandedId === config._id ? 'Ocultar detalles' : 'Ver detalles'}</span>
                </button>

                {/* Expanded Details */}
                {expandedId === config._id && (
                  <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                      {/* Pieza Info */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                          <Package className="w-5 h-5 text-blue-400" />
                          <span>Información de la Pieza</span>
                        </h4>
                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                          <h5 className="text-white font-bold text-lg mb-2">{config.params.pieceName}</h5>
                          <p className="text-slate-300 text-sm">{config.params.description}</p>
                        </div>
                      </div>

                      {/* Parameters Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {renderParameterCard(DollarSign, "Coste Filamento", `${config.params.filamentCost}€/kg`, DollarSign, "green")}
                        {renderParameterCard(Weight, "Peso Pieza", `${config.params.pieceWeight}g`, Weight, "purple")}
                        {renderParameterCard(Clock, "Tiempo Impresión", formatTime(config.params.printTime), Clock, "blue")}
                        {renderParameterCard(Timer, "Tiempo Mano Obra", formatTime(config.params.laborTime), Timer, "orange")}
                      </div>

                      {/* Additional Parameters */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {renderParameterCard(DollarSign, "Coste Mano Obra", `${config.params.laborCost}€/h`, DollarSign, "yellow")}
                        {renderParameterCard(Zap, "Consumo", `${config.params.powerConsumption}W`, Zap, "cyan")}
                        {renderParameterCard(Zap, "Precio Electricidad", `${config.params.electricityPrice}€/kWh`, Zap, "indigo")}
                        {renderParameterCard(Shield, "Margen Seguridad", `x${config.params.safetyMargin}`, Shield, "red")}
                      </div>

                      {/* Profit Margin */}
                      <div className="flex justify-center">
                        <div className="flex items-start space-x-3 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 min-w-64">
                          <div className="flex-shrink-0 w-12 h-12 bg-green-500/30 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <p className="text-green-300 text-sm font-medium mb-1">Margen de Beneficio</p>
                            <p className="text-white text-2xl font-bold">{config.params.profitMargin}%</p>
                          </div>
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
    </div>
  );
};

export default ConfigsTab;