import React from 'react';

const ParameterSection = ({ title, icon: Icon, iconColor, children }) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <span>{title}</span>
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default ParameterSection;