import React from 'react';
import { Card } from '../ui/card';
import type { FinancialMetric } from '../../types/stock';

interface FinancialMetricsCardProps {
  ticker: string;
  summary: FinancialMetric;
}

const FinancialMetricsCard: React.FC<FinancialMetricsCardProps> = ({ 
  ticker, 
  summary 
}) => (
  <Card className="p-6 border border-gray-200 shadow-md text-center">
    <div className="flex flex-col items-center mb-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {ticker} - {summary.Company}
        </h2>
        <p className="text-gray-600">{summary.Industry}</p>
      </div>
      <div className="bg-gray-100 rounded-lg px-3 py-2 mt-3">
        <span className="font-medium text-gray-700">Sector:</span>
        <span className="text-gray-900 ml-2">{summary.Sector}</span>
      </div>
    </div>
    
    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
      Financial Metrics
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-2xl">
      {Object.entries(summary).filter(([key]) => 
        !['Company', 'Industry', 'Sector'].includes(key)
      ).map(([key, value]) => (
        <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium text-gray-700">{key}:</span>
          <span className="text-gray-900 font-medium">{value}</span>
        </div>
      ))}
    </div>
  </Card>
);

export default FinancialMetricsCard;