import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { BalanceSummary } from './BalanceSummary';
import { PeopleList } from './PeopleList';
import { RecentTransactions } from './RecentTransactions';
import { SearchFilter } from './SearchFilter';
import { PersonDetails } from './PersonDetails';
import { AddPersonModal } from './AddPersonModal';
import { Header } from './Header';
import { BalanceSummary as BalanceSummaryType, Person } from '../types';

export const Dashboard: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const { people, transactions } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showAddPerson, setShowAddPerson] = useState(false);

  const balanceSummary: BalanceSummaryType = useMemo(() => {
    // Reversed logic: negative balance means they owe me, positive means I owe them
    const totalOwedToMe = people
      .filter(person => person.balance < 0)
      .reduce((sum, person) => sum + Math.abs(person.balance), 0);
    
    const totalIOwe = people
      .filter(person => person.balance > 0)
      .reduce((sum, person) => sum + person.balance, 0);
    
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
        <Header onAddPerson={() => setShowAddPerson(true)} />

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