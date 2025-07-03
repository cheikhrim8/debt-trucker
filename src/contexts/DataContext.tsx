import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Person, Transaction } from '../types';

interface DataContextType {
  people: Person[];
  transactions: Transaction[];
  addPerson: (person: Omit<Person, 'id' | 'balance' | 'status' | 'lastUpdated' | 'createdAt'>) => void;
  updatePerson: (id: string, updates: Partial<Person>) => void;
  deletePerson: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'personName'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  updatePersonBalance: (personId: string, amount: number, type: 'debit' | 'credit') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      phone: '(555) 123-4567',
      balance: -750, // Negative means they owe me
      status: 'pending',
      lastUpdated: new Date('2024-01-15'),
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'Bob Smith',
      phone: '(555) 234-5678',
      balance: 200, // Positive means I owe them
      status: 'paid',
      lastUpdated: new Date('2024-01-10'),
      createdAt: new Date('2024-01-02')
    },
    {
      id: '3',
      name: 'Charlie Brown',
      phone: '(555) 345-6789',
      balance: -1200, // Negative means they owe me
      status: 'partial',
      lastUpdated: new Date('2024-01-12'),
      createdAt: new Date('2024-01-03')
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      personId: '1',
      personName: 'Alice Johnson',
      type: 'credit',
      amount: 250,
      description: 'Credit transaction',
      date: new Date('2024-01-15'),
      status: 'pending'
    },
    {
      id: '2',
      personId: '2',
      personName: 'Bob Smith',
      type: 'debit',
      amount: 100,
      description: 'Debit transaction',
      date: new Date('2024-01-14'),
      status: 'paid'
    },
    {
      id: '3',
      personId: '3',
      personName: 'Charlie Brown',
      type: 'credit',
      amount: 800,
      description: 'Credit transaction',
      date: new Date('2024-01-12'),
      status: 'partial'
    }
  ]);

  const addPerson = (personData: Omit<Person, 'id' | 'balance' | 'status' | 'lastUpdated' | 'createdAt'>) => {
    const newPerson: Person = {
      ...personData,
      id: Date.now().toString(),
      balance: 0,
      status: 'pending',
      lastUpdated: new Date(),
      createdAt: new Date()
    };
    setPeople(prev => [...prev, newPerson]);
  };

  const updatePerson = (id: string, updates: Partial<Person>) => {
    setPeople(prev => prev.map(person => 
      person.id === id 
        ? { ...person, ...updates, lastUpdated: new Date() }
        : person
    ));
  };

  const deletePerson = (id: string) => {
    setPeople(prev => prev.filter(person => person.id !== id));
    setTransactions(prev => prev.filter(transaction => transaction.personId !== id));
  };

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'personName'>) => {
    const person = people.find(p => p.id === transactionData.personId);
    if (!person) return;

    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      personName: person.name
    };

    setTransactions(prev => [...prev, newTransaction]);
    updatePersonBalance(transactionData.personId, transactionData.amount, transactionData.type);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    // Reverse the old transaction effect
    updatePersonBalance(transaction.personId, -transaction.amount, transaction.type);

    // Apply the new transaction
    const updatedTransaction = { ...transaction, ...updates };
    setTransactions(prev => prev.map(t => t.id === id ? updatedTransaction : t));
    
    // Apply the new transaction effect
    updatePersonBalance(updatedTransaction.personId, updatedTransaction.amount, updatedTransaction.type);
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    // Reverse the transaction effect
    updatePersonBalance(transaction.personId, -transaction.amount, transaction.type);
    
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updatePersonBalance = (personId: string, amount: number, type: 'debit' | 'credit') => {
    setPeople(prev => prev.map(person => {
      if (person.id === personId) {
        // Reversed logic: credit means I owe them (positive), debit means they owe me (negative)
        const balanceChange = type === 'credit' ? amount : -amount;
        const newBalance = person.balance + balanceChange;
        return {
          ...person,
          balance: newBalance,
          lastUpdated: new Date(),
          status: newBalance === 0 ? 'paid' : newBalance > 0 ? 'pending' : 'pending'
        };
      }
      return person;
    }));
  };

  return (
    <DataContext.Provider value={{
      people,
      transactions,
      addPerson,
      updatePerson,
      deletePerson,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      updatePersonBalance
    }}>
      {children}
    </DataContext.Provider>
  );
};