import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowUpRight, Check, Sparkles } from 'lucide-react';

const VAULTS = [
  {
    name: 'RIVR Liquid Staking',
    token: 'stRIVR',
    apy: '18.4%',
    tvl: '$142.8M',
    risk: 'Conservative',
    desc: 'Auto-compounding single-sided staking with zero lockup penalty.'
  },
  {
    name: 'ETH Yield Supercharger',
    token: 'rETH-Plus',
    apy: '12.2%',
    tvl: '$89.4M',
    risk: 'Low',
    desc: 'LSD basket routing across EigenLayer, Lido, and RocketPool.'
  },
  {
    name: 'Bluechip NFT Collateral',
    token: 'rNFT-Yield',
    apy: '24.6%',
    tvl: '$41.2M',
    risk: 'Moderate',
    desc: 'Borrow liquid USD against verified Pudgy, Punk, and BAYC vaults.'
  },
  {
    name: 'Cross-Chain USDC Stream',
    token: 'rUSD',
    apy: '9.8%',
    tvl: '$210.5M',
    risk: 'Conservative',
    desc: 'High-frequency delta-neutral arbitrage with 100% principal protection.'
  }
];

export const VaultsSection: React.FC<{ onOpenDemo: () => void }> = ({ onOpenDemo }) => {
  const [stakeAmount, setStakeAmount] = useState<number>(1000);
  const estimatedYield = (stakeAmount * 0.184).toFixed(2);

  return (
    <section id="economics" className="w-full max-w-[1536px] mx-auto px-4 md:px-8 py-16 text-[#1E325A]">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-black/5 text-xs text-[rgba(30,50,90,0.8)] font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Smart Yield Protocols</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#1E325A] mb-3">
          High-Velocity Staking Vaults
        </h2>
        <p className="text-sm sm:text-base text-[#5E6470] max-w-xl mx-auto">
          Compound yields automatically across multi-chain liquidity hubs with sub-second redemption.
        </p>
      </div>

      {/* Vaults Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {VAULTS.map((vault, i) => (
          <motion.div
            key={vault.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 hover:bg-white/90 hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-[rgba(30,50,90,0.06)] text-[rgba(30,50,90,0.8)]">
                  {vault.token}
                </span>
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {vault.risk}
                </span>
              </div>
              <h3 className="text-lg font-normal text-[#1E325A] mb-1">{vault.name}</h3>
              <p className="text-xs text-[#5E6470] leading-relaxed mb-4">{vault.desc}</p>
            </div>

            <div>
              <div className="pt-4 border-t border-black/5 flex items-end justify-between mb-4">
                <div>
                  <span className="text-[10px] text-[#5E6470] uppercase tracking-wider block">Net APY</span>
                  <span className="text-2xl font-normal text-emerald-600">{vault.apy}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#5E6470] uppercase tracking-wider block">Vault TVL</span>
                  <span className="text-sm font-medium text-[#1E325A]">{vault.tvl}</span>
                </div>
              </div>

              <button
                onClick={onOpenDemo}
                className="w-full py-2.5 rounded-full bg-[rgba(30,50,90,0.85)] text-white text-xs font-normal hover:bg-[rgba(30,50,90,1)] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Deposit & Stake</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Yield Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-md">
          <span className="text-xs font-normal text-[rgba(30,50,90,0.6)] uppercase tracking-wider">Interactive Simulator</span>
          <h3 className="text-2xl font-normal text-[#1E325A] mt-1 mb-2">Calculate Your Annual Yield</h3>
          <p className="text-sm text-[#5E6470] mb-4">
            Simulate dynamic staking returns with daily compound frequencies across RIVR core vaults.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#5E6470]">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Instant Unstaking</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Zero Gas Routing</span>
          </div>
        </div>

        <div className="w-full md:w-auto min-w-[320px] p-6 rounded-2xl bg-[rgba(30,50,90,0.03)] border border-black/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#5E6470]">Deposit Amount ($)</span>
            <span className="text-sm font-semibold text-[#1E325A]">${stakeAmount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="100"
            max="50000"
            step="100"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Number(e.target.value))}
            className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[rgba(30,50,90,0.9)] mb-6"
          />

          <div className="p-4 rounded-xl bg-white border border-black/5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#5E6470] block">Estimated 1-Year Return</span>
              <span className="text-xl font-normal text-emerald-600">+${estimatedYield} / yr</span>
            </div>
            <button
              onClick={onOpenDemo}
              className="px-4 py-2 bg-[rgba(30,50,90,0.9)] text-white text-xs rounded-full hover:bg-[rgba(30,50,90,1)] transition-colors cursor-pointer"
            >
              Start Earning
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
