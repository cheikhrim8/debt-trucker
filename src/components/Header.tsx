import React from 'react';
import { BookOpen, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  onAddPerson: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddPerson }) => {
  const { currentUser, logout } = useAuth();
  const { language } = useLanguage();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
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
            {getTranslation('welcomeBack', language)}, {currentUser?.displayName?.split(' ')[0]}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <LanguageSelector />
        <button
          onClick={onAddPerson}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden sm:inline">{getTranslation('addPerson', language)}</span>
        </button>
        <button
          onClick={handleLogout}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          title={getTranslation('logout', language)}
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};