import React from 'react';

const InputField = ({ 
  label, 
  value, 
  onChange, 
  type = "number", 
  step = "0.01",
  focusColor = "blue",
  textarea = false,
  rows = 3,
  ...props 
}) => {
  const focusClasses = {
    blue: "focus:ring-blue-500",
    green: "focus:ring-green-500",
    yellow: "focus:ring-yellow-500",
    purple: "focus:ring-purple-500",
    red: "focus:ring-red-500",      
    pink: "focus:ring-pink-500"    
  }; 

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows}
          className={`w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 ${focusClasses[focusColor]} focus:border-transparent transition-all duration-200`}
          {...props}
        />
      ) : (
        <input
          type={type}
          step={type === "number" ? step : undefined}
          value={value}
          onChange={onChange}
          className={`w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 ${focusClasses[focusColor]} focus:border-transparent transition-all duration-200`}
          {...props}
        />
      )}
    </div>
  );
};

export default InputField;