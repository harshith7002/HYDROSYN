import React from 'react';
import { Hero } from './components/Hero';

export const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#f0f0f0]">
      <Hero />
    </main>
  );
};

export default App;
