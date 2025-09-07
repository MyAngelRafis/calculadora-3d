import React from 'react';

const PieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  return (
    <div className="flex items-center justify-center space-y-5">
      <div className="flex items-center justify-center">
      <svg width="320" height="320" className="transform -rotate-90">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;
          
          const startAngleRad = (startAngle * Math.PI) / 180;
          const endAngleRad = (currentAngle * Math.PI) / 180;
          
          const largeArcFlag = angle > 180 ? 1 : 0;
          const x1 = 160 + 120 * Math.cos(startAngleRad);
          const y1 = 160 + 120 * Math.sin(startAngleRad);
          const x2 = 160 + 120 * Math.cos(endAngleRad);
          const y2 = 160 + 120 * Math.sin(endAngleRad);
          
          const pathData = [
            `M 160 160`,
            `L ${x1} ${y1}`,
            `A 120 120 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          return (
            <path
              key={index}
              d={pathData}
              fill={item.color}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          );
        })}
      </svg>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 space-x-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="text-sm">
              <div className="text-gray-300 font-medium">{item.name}</div>
              <div className="text-white font-semibold">{item.value.toFixed(2)}€</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;