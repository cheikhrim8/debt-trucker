import React from 'react';
import { BookOpen, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';
import { LanguageSelector } from './LanguageSelector';

export const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const { language } = useLanguage();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <LanguageSelector />
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getTranslation('appTitle', language)}
          </h1>
          <p className="text-gray-600 mb-8">
            {getTranslation('appSubtitle', language)}
          </p>

          {/* Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <LogIn className="w-5 h-5" />
            <span>{getTranslation('signInWithGoogle', language)}</span>
          </button>

          {/* Features */}
          <div className="mt-8 text-left">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {getTranslation('features', language)}:
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• {getTranslation('trackDebts', language)}</li>
              <li>• {getTranslation('manageCredits', language)}</li>
              <li>• {getTranslation('multiLanguage', language)}</li>
              <li>• {getTranslation('secureData', language)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};