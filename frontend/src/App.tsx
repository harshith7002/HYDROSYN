import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { VaultsSection } from './components/VaultsSection';
import { EcosystemSection } from './components/EcosystemSection';
import { DemoModal } from './components/DemoModal';
import { DocsModal } from './components/DocsModal';

export const App: React.FC = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f0f0] text-[#1E325A] selection:bg-[rgba(30,50,90,0.2)]">
      {/* 1. Full Hero Screen */}
      <Hero
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* 2. Vaults & Staking Protocols */}
      <VaultsSection onOpenDemo={() => setIsDemoOpen(true)} />

      {/* 3. Ecosystem, Developers & Governance */}
      <EcosystemSection
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Footer */}
      <footer className="w-full max-w-[1536px] mx-auto px-6 md:px-12 py-10 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5E6470]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-[rgba(30,50,90,0.9)]">RIVR</span>
          <span>© 2026 RIVR Protocol Foundation. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setIsDocsOpen(true)} className="hover:text-[#1E325A] cursor-pointer">Documentation</button>
          <button onClick={() => setIsDemoOpen(true)} className="hover:text-[#1E325A] cursor-pointer">Protocol Audits</button>
          <button onClick={() => window.open('https://discord.com', '_blank')} className="hover:text-[#1E325A] cursor-pointer">Discord</button>
          <button onClick={() => window.open('https://twitter.com', '_blank')} className="hover:text-[#1E325A] cursor-pointer">Twitter</button>
        </div>
      </footer>

      {/* Interactive Modals */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </main>
  );
};

export default App;
