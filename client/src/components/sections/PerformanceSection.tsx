import { AnimatedSection } from "@/components/AnimatedSection";
import { TrendingUp, ArrowUpRight } from "lucide-react";

const CASE_STUDIES = [
  {
    id: "1B",
    label: "Bull Market",
    market: "Bull",
    aar: "303%",
    saai: "4.03x",
    advantage: "104%",
    pf: "6.6",
    wr: "72%",
    dd: "14.93%",
    sor: "22.07",
    color: "#4A90D9",
  },
  {
    id: "2B",
    label: "Bear Market",
    market: "Bear",
    aar: "1,236%",
    saai: "13.36x",
    advantage: "860%",
    pf: "23.1",
    wr: "89%",
    dd: "4.82%",
    sor: "53.49",
    color: "#22D3EE",
  },
  {
    id: "3B",
    label: "Mixed Market",
    market: "Mixed",
    aar: "645%",
    saai: "7.45x",
    advantage: "420%",
    pf: "12.8",
    wr: "81%",
    dd: "8.67%",
    sor: "38.22",
    color: "#9B59B6",
  },
];

export function PerformanceSection() {
  return (
    <section id="performance" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9B59B6]/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 rounded-full mb-4">
              <TrendingUp size={12} />
              Backtested Performance
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Proven <span className="gradient-text">Performance Data</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Real backtested results across bull, bear, and mixed market conditions at 12-hour intervals.
              Past performance is not indicative of future results.
            </p>
          </div>
        </AnimatedSection>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {CASE_STUDIES.map((cs, i) => (
            <AnimatedSection key={cs.id} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ color: cs.color, backgroundColor: `${cs.color}15` }}
                    >
                      Case Study {cs.id}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{cs.label}</h3>
                  </div>
                  <ArrowUpRight size={20} style={{ color: cs.color }} />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs text-white/40">AAR</span>
                    <span className="text-lg font-bold font-mono" style={{ color: cs.color }}>{cs.aar}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs text-white/40">S-AAI</span>
                    <span className="text-base font-bold font-mono text-white">{cs.saai}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs text-white/40">Advantage vs HODL</span>
                    <span className="text-base font-bold font-mono text-emerald-400">{cs.advantage}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs text-white/40">Profit Factor</span>
                    <span className="text-sm font-mono text-white/70">{cs.pf}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs text-white/40">Win Rate</span>
                    <span className="text-sm font-mono text-white/70">{cs.wr}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs text-white/40">Max Drawdown</span>
                    <span className="text-sm font-mono text-white/70">{cs.dd}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-white/40">Sortino Ratio</span>
                    <span className="text-sm font-mono text-white/70">{cs.sor}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Disclaimer */}
        <AnimatedSection delay={0.4}>
          <p className="text-center text-xs text-white/25 max-w-2xl mx-auto">
            Disclaimer: All performance data is based on backtested results using historical market data.
            Past performance is not indicative of future results. Cryptocurrency trading involves substantial
            risk of loss. WealthAAM is designed for asset accumulation but does not guarantee profits.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
