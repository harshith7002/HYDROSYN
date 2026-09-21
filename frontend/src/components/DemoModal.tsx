import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [vaultType, setVaultType] = useState('Liquid Staking Vault');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/60 text-[#1E325A]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-[#5E6470]"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-normal mb-2">Demo Request Received</h3>
                <p className="text-[#5E6470] text-sm mb-6 max-w-sm mx-auto">
                  Our institutional liquidity specialist will reach out to <span className="font-semibold text-[#1E325A]">{email}</span> within 2 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); onClose(); }}
                  className="px-6 py-2.5 bg-[rgba(30,50,90,0.9)] text-white rounded-full text-sm hover:bg-[rgba(30,50,90,1)] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-normal text-[rgba(30,50,90,0.6)] uppercase tracking-wider">RIVR Protocol</span>
                  <h3 className="text-2xl font-normal tracking-tight text-[#1E325A] mt-1">Book an Institutional Demo</h3>
                  <p className="text-sm text-[#5E6470] mt-1">Explore real-time yields, multi-chain vaults, and high-frequency liquidity routing.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-normal text-[#5E6470] mb-1.5">Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="treasury@fund.xyz"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-black/10 focus:outline-none focus:border-[rgba(30,50,90,0.5)] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-normal text-[#5E6470] mb-1.5">Primary Interest</label>
                    <select
                      value={vaultType}
                      onChange={(e) => setVaultType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-black/10 focus:outline-none focus:border-[rgba(30,50,90,0.5)] text-sm text-[#1E325A]"
                    >
                      <option>Liquid Staking Vaults (18.4% APY)</option>
                      <option>NFT Collateral Yield Stream</option>
                      <option>Cross-Chain Liquidity Router</option>
                      <option>Enterprise Governance & API</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[rgba(30,50,90,0.9)] text-white rounded-full text-sm font-normal hover:bg-[rgba(30,50,90,1)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
                  >
                    <span>Schedule Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
