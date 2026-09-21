import React, { useState } from 'react';
import { WeatherDashboard } from './components/WeatherDashboard';
import { Hero } from './components/Hero';
import { VaultsSection } from './components/VaultsSection';
import { EcosystemSection } from './components/EcosystemSection';
import { DemoModal } from './components/DemoModal';
import { DocsModal } from './components/DocsModal';
import { CloudRain, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'weather' | 'defi'>('weather');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen relative selection:bg-cyan-500/30">
      {/* ── GLOBAL VIEW SWITCHER FLOATING PILL ── */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center p-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl">
        <button
          onClick={() => setActiveMode('weather')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
            activeMode === 'weather'
              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 scale-105'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <CloudRain className="w-3.5 h-3.5" />
          <span>Weather Dashboard</span>
        </button>
        <button
          onClick={() => setActiveMode('defi')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
            activeMode === 'defi'
              ? 'bg-white text-[#1E325A] shadow-lg scale-105'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>RIVR DeFi Hub</span>
        </button>
      </div>

      {/* ── 1. WEATHER DASHBOARD MODE ── */}
      {activeMode === 'weather' ? (
        <WeatherDashboard />
      ) : (
        /* ── 2. RIVR DEFI PROTOCOL MODE ── */
        <div className="bg-[#f0f0f0] text-[#1E325A]">
          <Hero
            onOpenDemo={() => setIsDemoOpen(true)}
            onOpenDocs={() => setIsDocsOpen(true)}
            onNavigate={handleNavigate}
          />
          <VaultsSection onOpenDemo={() => setIsDemoOpen(true)} />
          <EcosystemSection
            onOpenDemo={() => setIsDemoOpen(true)}
            onOpenDocs={() => setIsDocsOpen(true)}
          />
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
        </div>
      )}

      {/* Interactive Modals */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </main>
  );
};

export default App;
