import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Vote, ArrowUpRight, CheckCircle2, MessageSquare } from 'lucide-react';

export const EcosystemSection: React.FC<{ onOpenDemo: () => void; onOpenDocs: () => void }> = ({ onOpenDemo, onOpenDocs }) => {
  return (
    <section id="ecosystem" className="w-full max-w-[1536px] mx-auto px-4 md:px-8 py-16 text-[#1E325A]">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
        <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-white/60 text-center">
          <span className="text-3xl sm:text-4xl font-normal text-[rgba(30,50,90,0.9)] tracking-tight block mb-1">$483.9M</span>
          <span className="text-xs text-[#5E6470] uppercase tracking-wider">Total Value Locked</span>
        </div>
        <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-white/60 text-center">
          <span className="text-3xl sm:text-4xl font-normal text-[rgba(30,50,90,0.9)] tracking-tight block mb-1">18,240+</span>
          <span className="text-xs text-[#5E6470] uppercase tracking-wider">Active Streams</span>
        </div>
        <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-white/60 text-center">
          <span className="text-3xl sm:text-4xl font-normal text-[rgba(30,50,90,0.9)] tracking-tight block mb-1">380ms</span>
          <span className="text-xs text-[#5E6470] uppercase tracking-wider">Settlement Latency</span>
        </div>
        <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-white/60 text-center">
          <span className="text-3xl sm:text-4xl font-normal text-emerald-600 tracking-tight block mb-1">100%</span>
          <span className="text-xs text-[#5E6470] uppercase tracking-wider">Audited & Verified</span>
        </div>
      </div>

      {/* Two Column Showcase: Developers & Governance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Developers Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(30,50,90,0.06)] text-xs text-[rgba(30,50,90,0.8)] font-medium mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>Developers SDK</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-normal text-[#1E325A] mb-2">Build with Fluid Liquidity</h3>
            <p className="text-sm text-[#5E6470] mb-6">
              Integrate RIVR liquidity streams, single-sided staking vaults, and instantaneous swaps into your dApp in under 10 lines of code.
            </p>

            <div className="p-4 rounded-2xl bg-[#1E293B] text-emerald-400 font-mono text-xs overflow-x-auto mb-6">
              <p className="text-slate-400">// Initialize RIVR Fluid Stream</p>
              <p className="text-white mt-1">import &#123; RivrVault &#125; from '@rivr/protocol';</p>
              <p className="mt-2 text-cyan-300">const vault = await RivrVault.connect(&#123; chainId: 1 &#125;);</p>
              <p className="text-emerald-400 mt-1">const stream = await vault.createStream(&#123; asset: 'ETH', apy: 0.184 &#125;);</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDocs}
              className="px-5 py-2.5 rounded-full bg-[rgba(30,50,90,0.9)] text-white text-xs font-normal hover:bg-[rgba(30,50,90,1)] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Developer Docs</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Governance Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(30,50,90,0.06)] text-xs text-[rgba(30,50,90,0.8)] font-medium mb-4">
              <Vote className="w-3.5 h-3.5" />
              <span>Decentralized Governance</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-normal text-[#1E325A] mb-2">veRIVR Community Voting</h3>
            <p className="text-sm text-[#5E6470] mb-6">
              Lock RIVR tokens to direct liquidity gauges, adjust vault risk parameters, and receive 100% protocol fee buybacks.
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-white border border-black/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#1E325A] block">RIVR-IP-14: Deploy Arbitrum Vault Hub</span>
                  <span className="text-[11px] text-emerald-600">Passed • 98.4% Yes (4.2M veRIVR)</span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-black/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#1E325A] block">RIVR-IP-15: Increase Base LSD Gauge Weight</span>
                  <span className="text-[11px] text-blue-600">Active Voting • 3 Days Left</span>
                </div>
                <button
                  onClick={onOpenDemo}
                  className="text-xs text-[rgba(30,50,90,0.9)] font-medium underline cursor-pointer"
                >
                  Cast Vote
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-black/5">
            <span className="text-xs text-[#5E6470]">Circulating Governance Power: <strong>32.8M veRIVR</strong></span>
            <button
              onClick={onOpenDemo}
              className="text-xs font-medium text-[rgba(30,50,90,0.9)] hover:underline cursor-pointer"
            >
              View All Proposals →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Community Banner */}
      <div className="p-8 md:p-12 rounded-[2rem] bg-gradient-to-r from-[rgba(30,50,90,0.95)] to-[rgba(15,25,50,0.98)] text-white text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
          <MessageSquare className="w-6 h-6 text-cyan-300" />
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-3">Join 5,200+ Active Yielders on Discord</h3>
        <p className="text-sm sm:text-base text-white/70 max-w-lg mb-6">
          Get real-time vault alerts, discuss new gauge proposals, and interact with the core engineering team.
        </p>
        <button
          onClick={() => window.open('https://discord.com', '_blank')}
          className="px-8 py-3 rounded-full bg-white text-[#1E325A] font-medium text-sm hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <span>Open Discord Community</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
