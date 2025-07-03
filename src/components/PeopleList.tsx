import React from 'react';
import { Phone, Clock, CheckCircle, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { getTranslation } from '../utils/translations';
import { Person } from '../types';

interface PeopleListProps {
  people: Person[];
  searchTerm: string;
  statusFilter: string;
  onPersonClick: (person: Person) => void;
}

export const PeopleList: React.FC<PeopleListProps> = ({ 
  people, 
  searchTerm, 
  statusFilter,
  onPersonClick 
}) => {
  const { language } = useLanguage();
  const { deletePerson } = useData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MRU',
      currencyDisplay: 'code'
    }).format(Math.abs(amount)).replace('MRU', 'MRU');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : language, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'partial':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeletePerson = (e: React.MouseEvent, personId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this person and all their transactions?')) {
      deletePerson(personId);
    }
  };

  const filteredPeople = people.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || person.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {getTranslation('peopleSummary', language)}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {filteredPeople.length} {filteredPeople.length === 1 ? 
            getTranslation('person', language) : 
            getTranslation('people', language)
          }
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {filteredPeople.map((person) => (
          <div 
            key={person.id} 
            onClick={() => onPersonClick(person)}
            className="px-4 py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {person.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{person.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    person.balance < 0 ? 'text-green-600' : 
                    person.balance > 0 ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {person.balance < 0 ? '+' : person.balance > 0 ? '-' : ''}
                    {formatCurrency(person.balance)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(person.lastUpdated)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(person.status)}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(person.status)}`}>
                    {getTranslation(person.status, language)}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => handleDeletePerson(e, person.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                    title="Delete person"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredPeople.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">
              {getTranslation('noPeopleFound', language)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};