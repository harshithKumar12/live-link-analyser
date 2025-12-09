import React from 'react';

interface StatusBadgeProps {
  status: 'optimal' | 'missing' | 'too-long' | 'too-short' | 'warning' | 'error' | 'success';
  text?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
  const config = {
    optimal: { bg: 'bg-green-100', text: 'text-green-700', label: 'Optimal' },
    success: { bg: 'bg-green-100', text: 'text-green-700', label: 'Pass' },
    missing: { bg: 'bg-red-100', text: 'text-red-700', label: 'Missing' },
    error: { bg: 'bg-red-100', text: 'text-red-700', label: 'Error' },
    'too-long': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Too Long' },
    'too-short': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Too Short' },
    warning: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Warning' },
  };

  const current = config[status] || config.warning;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${current.bg} ${current.text}`}>
      {text || current.label}
    </span>
  );
};