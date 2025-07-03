import React from 'react';
import { ArrowUpRight, ArrowDownLeft, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';
import { Transaction } from '../types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const { language } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : language, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'debit':
        return <ArrowDownLeft className="w-4 h-4 text-red-500" />;
      default:
        return <DollarSign className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'credit':
        return 'bg-green-50 border-green-200';
      case 'debit':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'credit':
        return 'text-green-600';
      case 'debit':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {getTranslation('recentTransactions', language)}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {getTranslation('latestActivity', language)}
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {recentTransactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className="px-4 py-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full border ${getTransactionColor(transaction.type)}`}>
                  {getTransactionIcon(transaction.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {transaction.personName}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {getTranslation(transaction.type, language)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {transaction.description}
                  </p>
                </div>
              </div>
              
              <div className="text-right ml-3">
                <p className={`text-sm font-semibold ${getAmountColor(transaction.type)}`}>
                  {transaction.type === 'credit' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {recentTransactions.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">
              {getTranslation('noRecentTransactions', language)}
            </p>
          </div>
        )}
      </div>
      
      {transactions.length > 6 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            {getTranslation('viewAllTransactions', language)} {transactions.length} {getTranslation('transactions', language)} →
          </button>
        </div>
      )}
    </div>
  );
};