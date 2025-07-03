import React, { useState, useMemo } from 'react';
import { BookOpen, Plus, UserPlus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { getTranslation } from '../utils/translations';
import { BalanceSummary } from './BalanceSummary';
import { PeopleList } from './PeopleList';
import { RecentTransactions } from './RecentTransactions';
import { SearchFilter } from './SearchFilter';
import { PersonDetails } from './PersonDetails';
import { AddPersonModal } from './AddPersonModal';
import { LanguageSelector } from './LanguageSelector';
import { BalanceSummary as BalanceSummaryType, Person } from '../types';

export const Dashboard: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const { people, transactions } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showAddPerson, setShowAddPerson] = useState(false);

  const balanceSummary: BalanceSummaryType = useMemo(() => {
    const totalOwedToMe = people
      .filter(person => person.balance > 0)
      .reduce((sum, person) => sum + person.balance, 0);
    
    const totalIOwe = people
      .filter(person => person.balance < 0)
      .reduce((sum, person) => sum + Math.abs(person.balance), 0);
    
    return {
      totalOwedToMe,
      totalIOwe,
      netBalance: totalOwedToMe - totalIOwe
    };
  }, [people]);

  if (selectedPerson) {
    return (
      <PersonDetails 
        person={selectedPerson} 
        onBack={() => setSelectedPerson(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getTranslation('appTitle', language)}
              </h1>
              <p className="text-gray-600 text-sm">
                {getTranslation('appSubtitle', language)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <button
              onClick={() => setShowAddPerson(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">{getTranslation('addPerson', language)}</span>
            </button>
          </div>
        </div>

        {/* Balance Summary */}
        <BalanceSummary summary={balanceSummary} />

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* People List */}
          <div className="xl:col-span-2">
            <PeopleList
              people={people}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              onPersonClick={setSelectedPerson}
            />
          </div>

          {/* Recent Transactions */}
          <div className="xl:col-span-1">
            <RecentTransactions transactions={transactions} />
          </div>
        </div>
      </div>

      <AddPersonModal
        isOpen={showAddPerson}
        onClose={() => setShowAddPerson(false)}
      />
    </div>
  );
};