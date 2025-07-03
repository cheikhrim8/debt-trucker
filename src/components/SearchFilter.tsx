import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange
}) => {
  const { language, isRTL } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={getTranslation('searchPlaceholder', language)}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`block w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
          />
        </div>
        
        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="all">{getTranslation('allStatus', language)}</option>
            <option value="pending">{getTranslation('pending', language)}</option>
            <option value="paid">{getTranslation('paid', language)}</option>
            <option value="partial">{getTranslation('partial', language)}</option>
          </select>
        </div>
      </div>
    </div>
  );
};