import React from 'react';
import { FileText, Settings, Euro, PieChart, ToolCaseIcon } from 'lucide-react';
import ParameterSection from './ParameterSection';
import InputField from './InputField';
import ProfitSlider from './ProfitSlider';
import QuickPreview from './QuickPreview';
import { Save } from 'lucide-react';

const CalculatorTab = ({ params, calculations, handleParamChange, onSave }) => {
  return (
    <div className="py-8 space-y-8">
      <button
        onClick={onSave}
        className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full md:w-auto"
      >
        <Save className="w-4 h-4" />
        <span>Guardar configuración</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      
      {/* Parameters Section */}
      <div className="space-y-6">
        <ParameterSection title="Pieza" icon={ToolCaseIcon} iconColor="text-blue-400">
          <InputField
            label="Nombre de la pieza"
            value={params.pieceName}
            onChange={(e) => handleParamChange('pieceName', e.target.value)}
            focusColor="blue"
            type="text"
          />
          <InputField
            label="Descripción"
            value={params.description}
            onChange={(e) => handleParamChange('description', e.target.value)}
            focusColor="blue"
            textarea
            rows={4}
          />
        </ParameterSection>

        <ParameterSection title="Parámetros de Material" icon={FileText} iconColor="text-blue-400">
          <InputField
            label="Coste del filamento (€/kg)"
            value={params.filamentCost}
            onChange={(e) => handleParamChange('filamentCost', e.target.value)}
            focusColor="blue"
          />
          <InputField
            label="Peso de la pieza (gramos)"
            value={params.pieceWeight}
            onChange={(e) => handleParamChange('pieceWeight', e.target.value)}
            step="0.1"
            focusColor="blue"
          />
        </ParameterSection>

        <ParameterSection title="Tiempos y Mano de Obra" icon={Settings} iconColor="text-green-400">
          <InputField
            label="Tiempo de impresión (minutos)"
            value={params.printTime}
            onChange={(e) => handleParamChange('printTime', e.target.value)}
            step="1"
            focusColor="green"
          />
          <InputField
            label="Tiempo de mano de obra (minutos)"
            value={params.laborTime}
            onChange={(e) => handleParamChange('laborTime', e.target.value)}
            step="1"
            focusColor="green"
          />
          <InputField
            label="Coste de mano de obra (€/hora)"
            value={params.laborCost}
            onChange={(e) => handleParamChange('laborCost', e.target.value)}
            focusColor="green"
          />
        </ParameterSection>
      </div>

      <div className="space-y-6">
        <ParameterSection title="Costes Energéticos" icon={Euro} iconColor="text-yellow-400">
          <InputField
            label="Consumo eléctrico (W)"
            value={params.powerConsumption}
            onChange={(e) => handleParamChange('powerConsumption', e.target.value)}
            step="1"
            focusColor="yellow"
          />
          <InputField
            label="Precio electricidad (€/kWh)"
            value={params.electricityPrice}
            onChange={(e) => handleParamChange('electricityPrice', e.target.value)}
            step="0.001"
            focusColor="yellow"
          />
        </ParameterSection>

        <ParameterSection title="Márgenes" icon={PieChart} iconColor="text-purple-400">
          <InputField
            label="Margen de seguridad (factor)"
            value={params.safetyMargin}
            onChange={(e) => handleParamChange('safetyMargin', e.target.value)}
            step="0.1"
            focusColor="purple"
          />
          
          <ProfitSlider
            value={params.profitMargin}
            onChange={(e) => handleParamChange('profitMargin', e.target.value)}
          />
        </ParameterSection>

        {/* Quick Results Preview */}
        <QuickPreview calculations={calculations} profitMargin={params.profitMargin} />
      </div>
    </div>
    </div>
  );
};

export default CalculatorTab;