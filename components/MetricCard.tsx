import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  status?: 'good' | 'needs-improvement' | 'poor';
  description?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, status = 'good', description }) => {
  let colorClass = 'bg-green-50 border-green-200 text-green-700';
  if (status === 'needs-improvement') colorClass = 'bg-yellow-50 border-yellow-200 text-yellow-700';
  if (status === 'poor') colorClass = 'bg-red-50 border-red-200 text-red-700';

  return (
    <div className={`p-4 rounded-lg border ${colorClass} flex flex-col justify-between`}>
      <span className="text-xs font-semibold uppercase tracking-wider opacity-75">{label}</span>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        {unit && <span className="text-sm font-medium opacity-75">{unit}</span>}
      </div>
      {description && <p className="mt-2 text-xs opacity-75">{description}</p>}
    </div>
  );
};