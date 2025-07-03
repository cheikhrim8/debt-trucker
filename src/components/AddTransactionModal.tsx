import React, { useState } from 'react';
import { X, DollarSign, Calendar, Upload, Paperclip } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { getTranslation } from '../utils/translations';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  personId: string;
  personName: string;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ 
  isOpen, 
  onClose, 
  personId, 
  personName 
}) => {
  const { language, isRTL } = useLanguage();
  const { addTransaction } = useData();
  const [formData, setFormData] = useState({
    type: 'credit' as 'debit' | 'credit',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
    status: 'pending' as 'pending' | 'paid' | 'partial'
  });
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount) {
      const transactionData = {
        personId,
        type: formData.type,
        amount: parseFloat(formData.amount),
        description: `${formData.type === 'credit' ? 'Credit' : 'Debit'} transaction`,
        date: new Date(formData.date),
        status: formData.status,
        note: formData.note || undefined,
        attachmentUrl: attachment ? URL.createObjectURL(attachment) : undefined,
        attachmentName: attachment?.name
      };
      
      addTransaction(transactionData);
      setFormData({
        type: 'credit',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        note: '',
        status: 'pending'
      });
      setAttachment(null);
      onClose();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {getTranslation('addTransaction', language)}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{personName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleChange('type', 'credit')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.type === 'credit'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">
                    {getTranslation('credit', language)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {language === 'en' ? 'I owe them' : language === 'fr' ? 'Je leur dois' : 'أدين لهم'}
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleChange('type', 'debit')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.type === 'debit'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">
                    {getTranslation('debit', language)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {language === 'en' ? 'They owe me' : language === 'fr' ? 'Ils me doivent' : 'يدينون لي'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('amount', language)}
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                className={`block w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                placeholder={getTranslation('enterAmount', language)}
                required
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('date', language)}
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className={`block w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                required
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('note', language)} ({getTranslation('optional', language)})
            </label>
            <textarea
              value={formData.note}
              onChange={(e) => handleChange('note', e.target.value)}
              rows={2}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
              placeholder={getTranslation('enterNote', language)}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('attachment', language)} ({getTranslation('optional', language)})
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer transition-colors"
              >
                <div className="text-center">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">
                    {attachment ? attachment.name : (
                      language === 'en' ? 'Click to upload file' :
                      language === 'fr' ? 'Cliquez pour télécharger' :
                      'انقر لتحميل الملف'
                    )}
                  </div>
                </div>
              </label>
              {attachment && (
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <Paperclip className="w-4 h-4 mr-2" />
                  {attachment.name}
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {getTranslation('cancel', language)}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all font-medium"
            >
              {getTranslation('save', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};