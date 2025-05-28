import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <div className="stat-card flex flex-col items-center justify-center">
      <div className="text-4xl font-bold text-chapfarm-700 mb-2">{value}</div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

export default StatCard;