import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { DataProvider } from './contexts/DataContext';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <Dashboard />
      </DataProvider>
    </LanguageProvider>
  );
}

export default App;