import React from 'react';
import { Calculator } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Calculadora Costes Impresión 3D
            </h1>
            {/*<p className="text-gray-400 text-sm">Calculadora profesional para impresión 3D</p>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;