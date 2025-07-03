import { Person, Transaction } from '../types';

export const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    phone: '(555) 123-4567',
    balance: 750,
    status: 'pending',
    createdAt: new Date('2024-01-01'), // 👈 Add this line
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Bob Smith',
    phone: '(555) 234-5678',
    balance: -200,
    status: 'paid',
    createdAt: new Date('2024-01-01'), // 👈 Add this line
    lastUpdated: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Charlie Brown',
    phone: '(555) 345-6789',
    balance: 1200,
    status: 'partial',
    createdAt: new Date('2024-01-01'), // 👈 Add this line
    lastUpdated: new Date('2024-01-12')
  },
  {
    id: '4',
    name: 'Diana Prince',
    phone: '(555) 456-7890',
    balance: -500,
    status: 'pending',
    createdAt: new Date('2024-01-01'), // 👈 Add this line
    lastUpdated: new Date('2024-01-14')
  },
  {
    id: '5',
    name: 'Edward Wilson',
    phone: '(555) 567-8901',
    balance: 300,
    status: 'pending',
    createdAt: new Date('2024-01-01'), // 👈 Add this line
    lastUpdated: new Date('2024-01-11')
  },
  {
    id: '6',
    name: 'Fiona Davis',
    phone: '(555) 678-9012',
    balance: 0,
    status: 'paid',
    createdAt: new Date('2024-01-01'), // 👈 Add this line
    lastUpdated: new Date('2024-01-08')
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    personId: '1',
    personName: 'Alice Johnson',
    type: 'credit',
    amount: 250,
    description: 'Dinner expenses',
    date: new Date('2024-01-15'),
    status: 'pending'
  },
  {
    id: '2',
    personId: '2',
    personName: 'Bob Smith',
    type: 'debit',
    amount: 100,
    description: 'Partial payment received',
    date: new Date('2024-01-14'),
    status: 'paid'
  },
  {
    id: '3',
    personId: '3',
    personName: 'Charlie Brown',
    type: 'credit',
    amount: 800,
    description: 'Concert tickets',
    date: new Date('2024-01-12'),
    status: 'partial'
  },
  {
    id: '4',
    personId: '4',
    personName: 'Diana Prince',
    type: 'debit',
    amount: 500,
    description: 'Car repair loan',
    date: new Date('2024-01-11'),
    status: 'pending'
  },
  {
    id: '5',
    personId: '5',
    personName: 'Edward Wilson',
    type: 'credit',
    amount: 300,
    description: 'Grocery shopping',
    date: new Date('2024-01-10'),
    status: 'pending'
  },
  {
    id: '6',
    personId: '1',
    personName: 'Alice Johnson',
    type: 'credit',
    amount: 500,
    description: 'Weekend trip',
    date: new Date('2024-01-08'),
    status: 'pending'
  }
];