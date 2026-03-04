import { AnimatedSection } from "@/components/AnimatedSection";
import { Coins, Globe, ArrowLeftRight, TrendingUp, BarChart3, Gem } from "lucide-react";

const ASSET_CLASSES = [
  {
    icon: <Coins size={28} />,
    title: "Cryptocurrency",
    count: "100+",
    description: "Full coverage of major and emerging digital assets across all market capitalizations.",
    examples: ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "AVAX", "DOT", "LINK", "MATIC", "DOGE", "SHIB"],
    color: "#4A90D9",
  },
  {
    icon: <TrendingUp size={28} />,
    title: "xStocks & Stocks",
    count: "10+",
    description: "Tokenized equities and traditional stocks enabling 24/7 trading with fractional ownership.",
    examples: ["TSLA", "NVDA", "AAPL", "AMZN", "GOOGL", "MSFT", "COIN", "HOOD", "META", "AMD"],
    color: "#9B59B6",
  },
  {
    icon: <Gem size={28} />,
    title: "Commodities",
    count: "5+",
    description: "Precious metals and energy commodities for portfolio diversification and inflation hedging.",
    examples: ["GOLD", "SILVER", "OIL", "NGAS", "PLATINUM"],
    color: "#D946A8",
  },
];

const CEX_EXCHANGES = [
  { name: "Binance", tier: "Tier 1" },
  { name: "Bybit", tier: "Tier 1" },
  { name: "Coinbase", tier: "Tier 1" },
  { name: "Bitget", tier: "Tier 1" },
  { name: "OKX", tier: "Tier 1" },
  { name: "MEXC", tier: "Tier 2" },
  { name: "Gate", tier: "Tier 2" },
  { name: "KuCoin", tier: "Tier 2" },
  { name: "Kraken", tier: "Tier 1" },
  { name: "Bitmart", tier: "Tier 2" },
  { name: "Crypto.com", tier: "Tier 1" },
];

const DEX_EXCHANGES = [
  { name: "Hyperliquid", tier: "DEX" },
];

export function AssetsSection() {
  return (
    <section id="assets" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#4A90D9]/5 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#D946A8]/5 rounded-full blur-[150px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#22D3EE] bg-[#22D3EE]/10 rounded-full mb-4">
              <Globe size={12} />
              Asset Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Full Spectrum <span className="gradient-text">Digital Assets</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              WealthAAM covers the complete range of digital tokenized assets — from cryptocurrencies 
              to tokenized stocks and commodities — with seamless exchange connectivity across CEX and DEX platforms.
            </p>
          </div>
        </AnimatedSection>

        {/* Asset Class Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {ASSET_CLASSES.map((asset, i) => (
            <AnimatedSection key={asset.title} delay={0.1 + i * 0.1}>
              <div className="glass-card rounded-2xl p-7 h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${asset.color}15`, color: asset.color }}
                    >
                      {asset.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{asset.title}</h3>
                      <p className="text-xs text-white/40">Digital Tokenized Assets</p>
                    </div>
                  </div>
                  <span
                    className="text-2xl font-extrabold font-mono"
                    style={{ color: asset.color }}
                  >
                    {asset.count}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-white/45 leading-relaxed mb-5">{asset.description}</p>

                {/* Asset Ticker Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {asset.examples.map((ticker) => (
                    <span
                      key={ticker}
                      className="px-2.5 py-1 text-[10px] font-bold font-mono uppercase tracking-wider rounded-md"
                      style={{
                        color: `${asset.color}CC`,
                        backgroundColor: `${asset.color}10`,
                        border: `1px solid ${asset.color}20`,
                      }}
                    >
                      {ticker}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Total Coverage Banner */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {[
              { value: "115+", label: "Total Assets", color: "#4A90D9" },
              { value: "12+", label: "Exchanges", color: "#7C5CBF" },
              { value: "24/7", label: "Market Access", color: "#9B59B6" },
              { value: "CEX + DEX", label: "Connectivity", color: "#D946A8" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center py-5 px-4 rounded-2xl border border-white/5 bg-white/[0.02]"
              >
                <p className="text-2xl font-extrabold font-mono" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Exchange Connectivity */}
        <AnimatedSection delay={0.35}>
          <div className="glass-card rounded-2xl p-8 lg:p-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <ArrowLeftRight size={22} className="text-[#4A90D9]" />
              <h3 className="text-xl font-bold text-white">
                Exchange <span className="gradient-text">Connectivity</span>
              </h3>
            </div>
            <p className="text-center text-white/45 text-sm mb-10 max-w-2xl mx-auto">
              Seamless integration with the world's leading centralized and decentralized exchanges. 
              Non-custodial API connections ensure your assets remain secure in your own accounts.
            </p>

            {/* CEX Exchanges */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="px-3 py-1 rounded-lg bg-[#4A90D9]/10 text-[#4A90D9] text-xs font-bold uppercase tracking-wider">
                  CEX — Centralized Exchange
                </div>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {CEX_EXCHANGES.map((exchange) => (
                  <div
                    key={exchange.name}
                    className="group relative text-center py-4 px-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#4A90D9]/30 hover:bg-[#4A90D9]/5 transition-all"
                  >
                    <p className="text-sm font-bold text-white group-hover:text-[#4A90D9] transition-colors">
                      {exchange.name}
                    </p>
                    <p className="text-[10px] text-white/25 mt-0.5 font-mono">{exchange.tier}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DEX Exchanges */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="px-3 py-1 rounded-lg bg-[#D946A8]/10 text-[#D946A8] text-xs font-bold uppercase tracking-wider">
                  DEX — Decentralized Exchange
                </div>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {DEX_EXCHANGES.map((exchange) => (
                  <div
                    key={exchange.name}
                    className="group relative text-center py-4 px-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#D946A8]/30 hover:bg-[#D946A8]/5 transition-all"
                  >
                    <p className="text-sm font-bold text-white group-hover:text-[#D946A8] transition-colors">
                      {exchange.name}
                    </p>
                    <p className="text-[10px] text-white/25 mt-0.5 font-mono">{exchange.tier}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-Custodial Note */}
            <div className="mt-8 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
              <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                Non-Custodial Security
              </p>
              <p className="text-sm text-white/50">
                All exchange connections use read/trade API keys only — <span className="text-emerald-400 font-semibold">zero withdrawal access</span>. 
                Your assets remain in your own exchange accounts at all times.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
