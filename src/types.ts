export interface Person {
  id: string;
  name: string;
  phone: string;
  balance: number; // positive = they owe you, negative = you owe them
  status: 'pending' | 'paid' | 'partial';
  lastUpdated: Date;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  personId: string;
  personName: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  date: Date;
  status: 'pending' | 'paid' | 'partial';
  note?: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface BalanceSummary {
  totalOwedToMe: number;
  totalIOwe: number;
  netBalance: number;
}

export type Language = 'en' | 'fr' | 'ar';

export interface Translations {
  [key: string]: {
    en: string;
    fr: string;
    ar: string;
  };
}