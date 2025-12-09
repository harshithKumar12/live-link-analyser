import React from 'react';

interface RadialProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const RadialProgress: React.FC<RadialProgressProps> = ({ 
  score, 
  size = 120, 
  strokeWidth = 8,
  label
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  let color = 'text-red-500';
  if (score >= 50) color = 'text-yellow-500';
  if (score >= 80) color = 'text-green-500';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={`${color} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${color}`}>{score}</span>
        </div>
      </div>
      {label && <span className="mt-2 text-sm font-medium text-gray-500">{label}</span>}
    </div>
  );
};