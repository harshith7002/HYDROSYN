import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Code2, ShieldCheck, Terminal } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/60 text-[#1E325A] max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-[#5E6470]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-normal text-[rgba(30,50,90,0.6)] uppercase tracking-wider">Developer & Protocol Docs</span>
              <h3 className="text-2xl font-normal tracking-tight text-[#1E325A] mt-1">RIVR Documentation Library</h3>
              <p className="text-sm text-[#5E6470] mt-1">SDK references, smart contract specifications, and automated yield algorithms.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-white/60 border border-black/5 hover:border-[rgba(30,50,90,0.2)] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[rgba(30,50,90,0.08)] flex items-center justify-center text-[rgba(30,50,90,0.9)] mb-3">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="font-normal text-base text-[#1E325A] mb-1">RIVR Core SDK</h4>
                <p className="text-xs text-[#5E6470] leading-relaxed mb-3">TypeScript & Rust libraries for seamless cross-vault liquidity dispatch.</p>
                <code className="text-[11px] bg-black/5 px-2 py-1 rounded font-mono text-[#1E325A] block">npm i @rivr/protocol-sdk</code>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 border border-black/5 hover:border-[rgba(30,50,90,0.2)] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[rgba(30,50,90,0.08)] flex items-center justify-center text-[rgba(30,50,90,0.9)] mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-normal text-base text-[#1E325A] mb-1">Security & Audits</h4>
                <p className="text-xs text-[#5E6470] leading-relaxed mb-3">Triple-audited by OpenZeppelin, Trail of Bits, and Certora formal verification.</p>
                <span className="text-[11px] text-emerald-600 font-medium">100% Formal Verification Passed</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 border border-black/5 hover:border-[rgba(30,50,90,0.2)] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[rgba(30,50,90,0.08)] flex items-center justify-center text-[rgba(30,50,90,0.9)] mb-3">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="font-normal text-base text-[#1E325A] mb-1">Smart Vault Routing</h4>
                <p className="text-xs text-[#5E6470] leading-relaxed">Dynamic slippage-free swap curves with instant collateral unlocking.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 border border-black/5 hover:border-[rgba(30,50,90,0.2)] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[rgba(30,50,90,0.08)] flex items-center justify-center text-[rgba(30,50,90,0.9)] mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-normal text-base text-[#1E325A] mb-1">Tokenomics Whitepaper</h4>
                <p className="text-xs text-[#5E6470] leading-relaxed">Staking mechanics, veRIVR governance weights, and fee distribution model.</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-black/5">
              <span className="text-xs text-[#5E6470]">API Status: <span className="text-emerald-600 font-medium">Mainnet Live (v2.4)</span></span>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[rgba(30,50,90,0.9)] text-white rounded-full text-xs font-normal hover:bg-[rgba(30,50,90,1)] transition-colors cursor-pointer"
              >
                Close Reference
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
