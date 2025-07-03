import React, { useState } from 'react';
import { ArrowLeft, Plus, Phone, Calendar, FileText, Paperclip, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { getTranslation } from '../utils/translations';
import { AddTransactionModal } from './AddTransactionModal';
import { Person } from '../types';

interface PersonDetailsProps {
  person: Person;
  onBack: () => void;
}

export const PersonDetails: React.FC<PersonDetailsProps> = ({ person, onBack }) => {
  const { language, isRTL } = useLanguage();
  const { transactions } = useData();
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const personTransactions = transactions
    .filter(t => t.personId === person.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="font-medium">{getTranslation('backToDashboard', language)}</span>
          </button>
        </div>

        {/* Person Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{person.name}</h1>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <Phone className="w-4 h-4" />
                  <span>{person.phone}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowAddTransaction(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>{getTranslation('addTransaction', language)}</span>
            </button>
          </div>

          {/* Current Balance */}
          <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-1">
                {getTranslation('currentBalance', language)}
              </p>
              <p className={`text-3xl font-bold ${
                person.balance > 0 ? 'text-green-600' : 
                person.balance < 0 ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {person.balance > 0 ? '+' : person.balance < 0 ? '-' : ''}
                {formatCurrency(Math.abs(person.balance))}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {person.balance > 0 
                  ? (language === 'en' ? 'They owe you' : language === 'fr' ? 'Ils vous doivent' : 'يدينون لك')
                  : person.balance < 0 
                  ? (language === 'en' ? 'You owe them' : language === 'fr' ? 'Vous leur devez' : 'تدين لهم')
                  : (language === 'en' ? 'All settled' : language === 'fr' ? 'Tout réglé' : 'تم التسوية')
                }
              </p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {getTranslation('transactionHistory', language)}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {personTransactions.length} {personTransactions.length === 1 ? 
                getTranslation('transactions', language).slice(0, -1) : 
                getTranslation('transactions', language)
              }
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {personTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getTranslation(transaction.type, language)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getTranslation(transaction.status, language)}
                      </span>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-1">
                      {transaction.description}
                    </h3>
                    
                    {transaction.note && (
                      <p className="text-sm text-gray-600 mb-2">
                        {transaction.note}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(transaction.date)}</span>
                      </div>
                      
                      {transaction.attachmentUrl && (
                        <div className="flex items-center space-x-1">
                          <Paperclip className="w-4 h-4" />
                          <a
                            href={transaction.attachmentUrl}
                            download={transaction.attachmentName}
                            className="text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                          >
                            <span>{transaction.attachmentName}</span>
                            <Download className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <p className={`text-lg font-semibold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {personTransactions.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">
                  {language === 'en' ? 'No transactions yet' : 
                   language === 'fr' ? 'Aucune transaction pour le moment' : 
                   'لا توجد معاملات حتى الآن'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddTransactionModal
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
        personId={person.id}
        personName={person.name}
      />
    </div>
  );
};