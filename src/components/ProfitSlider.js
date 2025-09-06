import React from 'react';

const ProfitSlider = ({ value, onChange }) => {
  const sliderStyles = {
    background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${value}%, #374151 ${value}%, #374151 100%)`
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Margen de beneficio (%)
      </label>
      <div className="space-y-4">
        {/* Slider */}
        <div className="relative">
          <style jsx>{`
            .profit-slider {
              -webkit-appearance: none;
              appearance: none;
              height: 8px;
              border-radius: 5px;
              outline: none;
              cursor: pointer;
            }
            
            .profit-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #8B5CF6;
              cursor: pointer;
              border: 3px solid #ffffff;
              box-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
              transition: all 0.2s ease;
            }
            
            .profit-slider::-webkit-slider-thumb:hover {
              transform: scale(1.1);
              box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
            }
            
            .profit-slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #8B5CF6;
              cursor: pointer;
              border: 3px solid #ffffff;
              box-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
              transition: all 0.2s ease;
            }
            
            .profit-slider::-moz-range-thumb:hover {
              transform: scale(1.1);
              box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
            }
          `}</style>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={onChange}
            className="profit-slider w-full"
            style={sliderStyles}
          />
        </div>
        
        {/* Slider Labels */}
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>0%</span>
          <div className="bg-purple-600/30 px-3 py-1 rounded-full border border-purple-500/50">
            <span className="text-purple-300 font-semibold text-sm">{value}%</span>
          </div>
          <span>100%</span>
        </div>
        
        {/* Numeric Input */}
        <input
          type="number"
          min="0"
          max="100"
          value={value}
          onChange={onChange}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
          placeholder="Valor exacto"
        />
      </div>
    </div>
  );
};

export default ProfitSlider;