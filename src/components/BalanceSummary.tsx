import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';
import { BalanceSummary as BalanceSummaryType } from '../types';

interface BalanceSummaryProps {
  summary: BalanceSummaryType;
}

export const BalanceSummary: React.FC<BalanceSummaryProps> = ({ summary }) => {
  const { language } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MRU',
      currencyDisplay: 'code'
    }).format(Math.abs(amount)).replace('MRU', 'MRU');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total They Owe Me (negative balances) */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-600 mb-1">
              {getTranslation('owedToMe', language)}
            </p>
            <p className="text-2xl font-bold text-green-900">
              {formatCurrency(summary.totalOwedToMe)}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Total I Owe (positive balances) */}
      <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-2xl border border-red-100 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-600 mb-1">
              {getTranslation('iOwe', language)}
            </p>
            <p className="text-2xl font-bold text-red-900">
              {formatCurrency(summary.totalIOwe)}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
        </div>
      </div>

      {/* Net Balance */}
      <div className={`bg-gradient-to-br p-4 rounded-2xl border hover:shadow-lg transition-all duration-300 ${
        summary.netBalance <= 0 
          ? 'from-blue-50 to-indigo-50 border-blue-100' 
          : 'from-orange-50 to-amber-50 border-orange-100'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium mb-1 ${
              summary.netBalance <= 0 ? 'text-blue-600' : 'text-orange-600'
            }`}>
              {getTranslation('netBalance', language)}
            </p>
            <p className={`text-2xl font-bold ${
              summary.netBalance <= 0 ? 'text-blue-900' : 'text-orange-900'
            }`}>
              {summary.netBalance <= 0 ? '+' : ''}{formatCurrency(summary.netBalance)}
            </p>
          </div>
          <div className={`p-3 rounded-full ${
            summary.netBalance <= 0 ? 'bg-blue-100' : 'bg-orange-100'
          }`}>
            <DollarSign className={`w-5 h-5 ${
              summary.netBalance <= 0 ? 'text-blue-600' : 'text-orange-600'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
};